export async function controlTransferIn({ device, request, value = 0, data }) {
  return device.controlTransferIn({
    'requestType': 'class',
    'recipient': 'interface',
    'request': request,
    'value': value,
    'index': 0
  }, data)
}

export async function controlTransferOut({ device, request, value = 0, data }) {
  return device.controlTransferOut({
    'requestType': 'class',
    'recipient': 'interface',
    'request': request,
    'value': value,
    'index': 0
  }, data)
}