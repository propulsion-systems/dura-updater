import { createMachine, assign } from 'xstate'
import { dfuMode } from '../usb/dfu.js'
import { download } from '../usb/dfuse.js'

const response = await fetch('/src/assets/linktouch_binaries/latest.bin')
const file = await response.arrayBuffer()

export const wizard = createMachine({
  id: 'wizard',
  initial: 'usb' in navigator ? 'start' : 'unsupported',
  context: {
    vendor: 0x483,
    linktouch: 0x5740,
    dfu: 0xDF11,
    device: null,
    port: null,
    start: 0x8000000,
    error: null,
  },
  states: {
    start: {
      id: 'start',
      on: {
        'CONTINUE': 'dfu'
      }
    },
    dfu: {
      initial: 'info',
      on: {
        'CONTINUE': 'update',
      },
      states: {
        info: {
            on: {
                'CONTINUE': 'select',
                'SKIP': '#update',
            }
        },
        select: {
          invoke: {
            src: ({ vendor, linktouch }, event) => navigator.serial.requestPort({ filters: [{ usbVendorId: vendor, usbProductId: linktouch }] }),
            onDone: {
              target: 'set',
              actions: assign({
                port: (context, { data }) => data
              })
            },
            onError: 'info'
          }
        },
        set: {
          invoke: {
            src: async ({ port }, event) => {

                console.log('dfu.set')
                await dfuMode(port)
                console.log('done')
            },
            onDone: {
                target: '#update',
            },
            onError: '#error'
          }
        },
      },
    },
    update: {
      id: 'update',
      initial: 'info',
      states: {
        info: {
          on: {
            'CONTINUE': 'select',
            'RETRY': '#start',
          }
        },
        select: {
          invoke: {
            src: ({ vendor }, event) => navigator.usb.requestDevice({ filters: [{ vendorId: vendor }] }),
            onDone: {
              target: 'updating',
              actions: assign({
                device: (context, { data }) => data
              })
            },
            onError: 'info'
          }
        },
        updating: {
          invoke: {
            src: ({ device, start }, event) => download(device, file, start),
            onDone: '#updated',
            onError: '#error'
          }
        },
      }
    },
    updated: {
      id: 'updated',
      on: {
        'AGAIN': 'start'
      }
    },
    error: {
      id: 'error',
      invoke: [
        {
          src: ({ port }, event) => port.close(),
        },
        {
          src: ({ device }, event) => device.close(),
        }
      ],
      on: {
        'RETRY': 'start'
      }
    },
    unsupported: {
      type: 'final'
    }
  }
})