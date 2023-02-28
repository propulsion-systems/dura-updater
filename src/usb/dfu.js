import { controlTransferIn, controlTransferOut } from './usb.js'

export const REQUESTS = {
  DETACH: 0x00,
  DOWNLOAD: 0x01,
  UPLOAD: 0x02,
  GET_STATUS: 0x03,
  CLEAR_STATUS: 0x04,
  GET_STATE: 0x05,
  ABORT: 0x06
}

export const STATES = {
  APP_IDLE: 0,
  APP_DETACH: 1,
  IDLE: 2,
  DOWNLOAD_SYNC: 3,
  DOWNLOAD_BUSY: 4,
  DOWNLOAD_IDLE: 5,
  MANIFEST_SYNC: 6,
  MANIFEST: 7,
  MANIFEST_WAIT_RESET: 8,
  UPLOAD_IDLE: 9,
  ERROR: 10
}

const STATUS_OK = 0x0

export async function dfuMode(port) {
  await port.open({
    baudRate: 9600,
  })

  const textEncoder = new TextEncoderStream()
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable)

  const writer = textEncoder.writable.getWriter()

  await writer.write('dfu\r\n')

  await writer.close()

  await writableStreamClosed

  await port.close()
}

export async function getStatus(device) {
  const { data } = await controlTransferIn({
    device,
    request: REQUESTS.GET_STATUS,
    data: 6
  })

  return {
    "status": data.getUint8(0),
    "timeout": data.getUint32(1, true) & 0xFFFFFF,
    "state": data.getUint8(4)
  }
}

export async function clearStatus(device) {
  return controlTransferOut({
    device,
    request: REQUESTS.CLEAR_STATUS,
  })
}

export async function reset(device) {
  // Check if state equals DFU_IDLE and that there are no errors in status
  let status = await getStatus(device)

  console.log(`Start status | state=${status.state}, status=${status.status}`)

  if (status.state == STATES.ERROR) {
    console.log('Cleaning status')

    await clearStatus(device)

    status = await getStatus(device)

    console.log(`Cleaned status | state=${status.state}, status=${status.status}`)
  }
}

export async function pollUntil(device, predicate) {
  let status = await getStatus(device)

  console.log(`Initial idle status | state=${status.state}, status=${status.status}, timeout=${status.timeout}`)

  const sleep = duration => new Promise((resolve, reject) => setTimeout(resolve, duration))

  while (!predicate(status.state) && status.status != STATES.ERROR) {
    await sleep(status.timeout)

    status = await getStatus(device)

    if (status.status != STATUS_OK) {
      throw `DFU download failed | state=${status.state}, status=${status.status}`
    }
  }
}

export async function download(device, file) {
  await reset(device)

  let bytes_sent = 0
  let transfer_size = 2048
  let transaction = 0

  console.log('Starting download')

  while (bytes_sent < file.byteLength) {
    console.log(`Bytes send: ${bytes_sent}`)

    const bytes_left = file.byteLength - bytes_sent
    const chunk_size = Math.min(bytes_left, transfer_size)

    const data = file.slice(bytes_sent, bytes_sent + chunk_size)

    const { bytesWritten } = await controlTransferOut({
      device,
      request: REQUESTS.DOWNLOAD,
      value: transaction++,
      data,
    })

    await pollUntil(device, state => (state == STATES.DOWNLOAD_IDLE))

    console.log(`Bytes writen: ${bytesWritten}`)

    bytes_sent += bytesWritten
  }

  // Send empty data to signal end of download and exit DFU mode
  await controlTransferOut({
    device,
    request: REQUESTS.DOWNLOAD,
    data: new ArrayBuffer([]),
    value: transaction++
  })

  console.log('Download finished')

  console.log(bytes_sent === file.byteLength)
}