import type { ReadStream } from 'node:fs'
import { readdirSync, createReadStream } from 'node:fs'
import EventEmitter from 'node:events'
import isInteger from 'lodash/isInteger'

const bufferChunk = (buffer: string | Buffer, chunk_size: number): Buffer[] => {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError('Buffer is required.')
  }
  if (!isInteger(chunk_size) || chunk_size < 0) {
    throw new TypeError('Chunk size should be a positve number.')
  }

  const result = []
  const len = buffer.length
  let i = 0

  while (i < len) {
    result.push(buffer.slice(i, (i += chunk_size)))
  }

  return result
}

interface DeviceEventTime {
  tvSec: number
  tvUsec: number
}

export interface DeviceEventRaw {
  time: DeviceEventTime
  type: number
  code: number
  value: number
}

export interface DeviceEvent {
  time: DeviceEventTime
  type: string
  code: string
  value: number
}

export class Device {
  protected directory: string
  protected pattern: RegExp
  protected path: string
  protected streamEvents: EventEmitter
  public events: EventEmitter
  protected stream: ReadStream | undefined

  constructor(directory: string, pattern: RegExp) {
    this.directory = directory
    this.pattern = pattern
    this.path = this.getDevicePath()

    this.streamEvents = new EventEmitter()

    this.events = new EventEmitter()
    this.events.emit('initilisation')

    this.stream = undefined
  }

  getDeviceFileNames() {
    const deviceFileNames = readdirSync(this.directory)

    if (
      !deviceFileNames ||
      deviceFileNames instanceof Error ||
      !deviceFileNames.length
    ) {
      console.log(`${this.directory} contains:`)
      console.log(deviceFileNames)
      throw new Error('No input devices found.')
    }

    return deviceFileNames
  }

  getDevicePath() {
    let device_path = ''
    this.getDeviceFileNames().some((deviceFileName) => {
      if (!this.pattern.test(deviceFileName)) {
        return false
      }

      device_path = `${this.directory}/${deviceFileName}`
      return true
    })

    if (device_path === '') {
      throw new Error('Could not find matching input device path.')
    }

    return device_path
  }

  async createStream() {
    try {
      this.stream = await createReadStream(this.path, {
        flags: 'r',
        autoClose: true,
      })
        .on('data', (buffer) =>
          bufferChunk(buffer, 16).forEach((chunk) => {
            const ev: DeviceEventRaw = {
              time: {
                tvSec: chunk.readInt32LE(0),
                tvUsec: chunk.readInt32LE(4),
              },
              type: chunk.readUInt16LE(8),
              code: chunk.readUInt16LE(10),
              value: chunk.readInt32LE(12),
            }
            this.streamEvents.emit('event', ev)
          }),
        )
        .on('open', (fd) => {
          this.streamEvents.emit('open', fd)
        })
        .on('ready', () => {
          this.streamEvents.emit('ready')
          this.streamEvents.emit('initialisation')
        })
        .on('error', console.error)
    } catch (error) {
      console.log(`Could not read from device: ${this.path}`)
      throw error
    }
  }
}
