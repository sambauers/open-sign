import { join } from 'node:path'

import { Pixels } from './pixels'

export class Moods extends Pixels {
  constructor(width: number, height: number) {
    const directoryPath = join(process.cwd(), 'moods')
    super('moods', directoryPath, width, height, 'black', true)
  }
}
