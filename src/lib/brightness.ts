import { Control } from './control'

export class Brightness extends Control {
  constructor() {
    super('brightness', 'brightness.png', { startAt: 65 })
  }
}
