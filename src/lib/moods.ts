import { join } from 'node:path'
import { Pixels } from './pixels'

export class Moods extends Pixels {
  constructor() {
    const directory_path = join(process.cwd(), 'moods')
    super('moods', directory_path, 64, 32, 'black', true)
  }
}
