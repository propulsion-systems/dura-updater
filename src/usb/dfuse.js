import { reset, pollUntil, REQUESTS as DFU_REQUESTS, STATES } from './dfu.js'
import { controlTransferOut } from './usb.js'

export const REQUESTS = {
  GET_COMMANDS: 0x00,
  SET_ADRESS: 0x21,
  ERASE_SECTOR: 0x41
}

export async function dfuseCommand({ device, command, paramater, length }) {
  const data = new ArrayBuffer(length + 1)
  const view = new DataView(data)

  view.setUint8(0, command)
  view.setUint32(1, paramater, true)

  await controlTransferOut({
    device,
    request: DFU_REQUESTS.DOWNLOAD,
    data,
  })

  await pollUntil(device, state => (state != STATES.DOWNLOAD_BUSY))
}

export async function erase(device, file, start, segments) {
  let bytesErased = 0

  let segment = getSegment(start, segments)
  let address = getSectorStart(start, segment)

  const end = getSectorEnd(start + file.byteLength - 1, segment)

  const bytesToErase = end - address

  while (address < end) {
    if (segment.end <= address) {
      segment = getSegment(address, segments)
    }

    // Skip over the non-erasable section
    if (!segment.erasable) {
      bytesErased = Math.min(bytesErased + segment.end - address, bytesToErase)
      address = segment.end

      continue
    }

    const sectorIndex = Math.floor((address - segment.start) / segment.sectorSize)
    const sectorAddr = segment.start + sectorIndex * segment.sectorSize

    //console.log(`Erasing ${segment.sectorSize}B at 0x${sectorAddr.toString(16)}`)
    console.log(`Erasing: ${Math.floor(bytesErased / bytesToErase * 100)}%`)

    await dfuseCommand({
      device,
      command: REQUESTS.ERASE_SECTOR,
      paramater: sectorAddr,
      length: 4
    })

    address = sectorAddr + segment.sectorSize
    bytesErased += segment.sectorSize
  }
}

export async function download(device, file, start) {
  await device.open()
  await device.selectConfiguration(1)
  await device.claimInterface(0)
  await device.selectAlternateInterface(0, 0)

  const segments = parseMemoryDescriptor('@Internal Flash /0x08000000/1536*128 g') // space in between g

  await reset(device)
  await erase(device, file, start, segments)

  let address = start
  let bytes_sent = 0
  let transfer_size = 2048

  console.log('Starting download')

  while (bytes_sent < file.byteLength) {
    //console.log(`Bytes send: ${bytes_sent}`)
    console.log(`Uploading: ${Math.floor(bytes_sent / file.byteLength * 100)}%`)

    const bytes_left = file.byteLength - bytes_sent
    const chunk_size = Math.min(bytes_left, transfer_size)

    const data = file.slice(bytes_sent, bytes_sent + chunk_size)

    //console.log(`Set adress to: 0x${address.toString(16)}`)

    await dfuseCommand({
      device,
      command: REQUESTS.SET_ADRESS,
      paramater: address,
      length: 4
    })

    const { bytesWritten } = await controlTransferOut({
      device,
      request: DFU_REQUESTS.DOWNLOAD,
      value: 2,
      data,
    })

    //console.log(`Bytes writen: ${bytesWritten}`)
    console.log(`Uploading: ${Math.floor(bytes_sent / file.byteLength * 100)}%`)

    await pollUntil(device, state => (state == STATES.DOWNLOAD_IDLE))

    address += chunk_size
    bytes_sent += bytesWritten
  }

  // Send empty data to signal end of download and exit DFU mode
  await dfuseCommand({
    device,
    command: REQUESTS.SET_ADRESS,
    paramater: start,
    length: 4
  })

  await controlTransferOut({
    device,
    request: DFU_REQUESTS.DOWNLOAD,
    data: new ArrayBuffer([])
  })

  await pollUntil(device, state => (state == STATES.MANIFEST))

  console.log('Download finished')
}

export function parseMemoryDescriptor(descriptor) {
  const nameEndIndex = descriptor.indexOf("/")

  const name = descriptor.substring(1, nameEndIndex).trim()
  const segmentString = descriptor.substring(nameEndIndex)

  let segments = []

  const sectorMultipliers = {
    ' ': 1,
    'B': 1,
    'K': 1024,
    'M': 1048576
  }

  let contiguousSegmentRegex = /\/\s*(0x[0-9a-fA-F]{1,8})\s*\/(\s*[0-9]+\s*\*\s*[0-9]+\s?[ BKM]\s*[abcdefg]\s*,?\s*)+/g
  let contiguousSegmentMatch

  while (contiguousSegmentMatch = contiguousSegmentRegex.exec(segmentString)) {
    let segmentRegex = /([0-9]+)\s*\*\s*([0-9]+)\s?([ BKM])\s*([abcdefg])\s*,?\s*/g
    let startAddress = parseInt(contiguousSegmentMatch[1], 16)
    let segmentMatch

    while (segmentMatch = segmentRegex.exec(contiguousSegmentMatch[0])) {
      let segment = {}
      let sectorCount = parseInt(segmentMatch[1], 10)
      let sectorSize = parseInt(segmentMatch[2]) * sectorMultipliers[segmentMatch[3]]
      let properties = segmentMatch[4].charCodeAt(0) - 'a'.charCodeAt(0) + 1

      segment.start = startAddress
      segment.sectorSize = sectorSize
      segment.end = startAddress + sectorSize * sectorCount

      segment.readable = (properties & 0x1) != 0
      segment.erasable = (properties & 0x2) != 0
      segment.writable = (properties & 0x4) != 0

      segments.push(segment)

      startAddress += sectorSize * sectorCount
    }
  }

  return segments
}

export function getSegment(address, segments) {
  for (let segment of segments) {
    if (segment.start <= address && address < segment.end) {
      return segment
    }
  }
}

export function getSectorStart(address, segment) {
  const index = Math.floor((address - segment.start) / segment.sectorSize)
  return segment.start + index * segment.sectorSize
}

export function getSectorEnd(address, segment) {
  const index = Math.floor((address - segment.start) / segment.sectorSize)
  return segment.start + (index + 1) * segment.sectorSize
}