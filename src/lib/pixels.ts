import EventEmitter from 'node:events'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import color from 'color'
import clamp from 'lodash/clamp'
import compact from 'lodash/compact'
import toInteger from 'lodash/toInteger'
import nconf from 'nconf'
import sharp from 'sharp'

import { getSaveFile } from './utilities/get-save-file'

nconf.file({ file: getSaveFile() })

interface BufferPosition {
  top: number
  left: number
  width?: number
  height?: number
}

class Blank {
  protected filePath: string
  protected width: number
  protected height: number

  constructor() {
    this.filePath = ''
    this.width = 0
    this.height = 0
  }

  buffer() {
    return false
  }
}

export class Pixel {
  protected filePath: string
  public width: number
  public height: number
  protected backgroundColor: string
  protected bufferCache?: Buffer

  constructor(
    filePath: string,
    width: number,
    height: number,
    backgroundColor?: string,
  ) {
    this.filePath = filePath
    this.width = width
    this.height = height
    this.backgroundColor = backgroundColor || 'black'
  }

  async buffer(
    position: BufferPosition = { top: 0, left: 0, width: 0, height: 0 },
  ) {
    if (this.bufferCache) {
      return this.bufferCache
    }

    const png = await sharp(this.filePath)
      .flatten({ background: color(this.backgroundColor).rgb().string() })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const top = toInteger(position.top)
    const left = toInteger(position.left)
    const width = toInteger(position.width)
    const height = toInteger(position.height)

    if (!top && !left && !width && !height) {
      this.bufferCache = png.data
      return this.bufferCache
    }

    let compositeWidth = width
    if (!width) {
      if (!png.info.width) {
        return false
      }
      compositeWidth = left + png.info.width
    }

    let compositeHeight = height
    if (!height) {
      if (!png.info.height) {
        return false
      }
      compositeHeight = top + png.info.height
    }

    this.bufferCache = await sharp({
      create: {
        width: compositeWidth,
        height: compositeHeight,
        channels: 3,
        background: color(this.backgroundColor).rgb().string(),
      },
    })
      .composite([
        {
          input: png.data,
          raw: {
            width: png.info.width,
            height: png.info.height,
            channels: png.info.channels,
          },
          top,
          left,
        },
      ])
      .removeAlpha()
      .raw()
      .toBuffer()

    return this.bufferCache
  }
}

export class Pixels {
  protected name: string
  protected directoryPath: string
  protected width: number
  protected height: number
  protected backgroundColor: string
  private filePaths: string[]
  private pixels: Array<Blank | Pixel>
  private currentIndex: number
  private saveCurrentIndexTimeout?: NodeJS.Timeout
  public events: EventEmitter

  constructor(
    name: string,
    directoryPath: string,
    width: number,
    height: number,
    backgroundColor?: string,
    hasBlank = false,
  ) {
    this.name = name
    this.directoryPath = directoryPath
    this.width = width
    this.height = height
    this.backgroundColor = backgroundColor || 'black'
    this.filePaths = readdirSync(this.directoryPath)
    this.pixels = [
      ...(hasBlank ? [new Blank()] : []),
      ...compact(
        this.filePaths.map((filePath) => {
          if (/\.png$/.test(filePath)) {
            return new Pixel(
              join(this.directoryPath, filePath),
              this.width,
              this.height,
              this.backgroundColor,
            )
          }
          return false
        }),
      ),
    ]

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const savedIndex = nconf.get(`pixel:${this.name}:index`) ?? 0
    this.currentIndex = clamp(toInteger(savedIndex), 0, this.pixels.length - 1)

    this.events = new EventEmitter()
  }

  get current() {
    return this.pixels[this.currentIndex]
  }

  saveCurrentIndex() {
    if (this.saveCurrentIndexTimeout) {
      clearTimeout(this.saveCurrentIndexTimeout)
    }
    this.saveCurrentIndexTimeout = setTimeout(() => {
      nconf.set(`pixel:${this.name}:index`, this.currentIndex)
      // @ts-expect-error incomplete types
      nconf.save()
    }, 1000)
  }

  increment() {
    if (this.currentIndex >= this.pixels.length - 1) {
      this.currentIndex = 0
    } else {
      this.currentIndex++
    }
    this.saveCurrentIndex()
    this.events.emit('change', this.current)
  }

  decrement() {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.pixels.length - 1
    } else {
      this.currentIndex--
    }
    this.saveCurrentIndex()
    this.events.emit('change', this.current)
  }

  touch() {
    this.events.emit('change', this.current)
  }
}
