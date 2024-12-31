import EventEmitter from 'node:events'
import { join } from 'node:path'

import clamp from 'lodash/clamp'
import nconf from 'nconf'

import { Pixel } from './pixels'
import { getSaveFile } from './utilities/get-save-file'

nconf.file({ file: getSaveFile() })

interface ControlRange {
  lower?: number
  upper?: number
  stepSize?: number
  startAt?: number
}

export class Control {
  protected name: string
  public icon: Pixel
  protected lower: number
  public upper: number
  protected stepSize: number
  public value: number
  private saveValueTimeout?: NodeJS.Timeout
  public events: EventEmitter

  constructor(
    name: string,
    iconFile: string,
    { lower, upper, stepSize, startAt }: ControlRange,
  ) {
    this.name = name
    this.icon = new Pixel(join(process.cwd(), 'controls', iconFile), 12, 12)
    this.lower = lower || 0
    this.upper = upper || 100
    this.stepSize = stepSize || 5

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const savedValue = nconf.get(`control:${this.name}:value`)
    const savedInteger =
      typeof savedValue === 'number' ? savedValue : Number(savedValue)
    this.value = isFinite(savedInteger) ? savedInteger : startAt || 0

    this.events = new EventEmitter()
  }

  saveValue() {
    if (this.saveValueTimeout) {
      clearTimeout(this.saveValueTimeout)
    }
    this.saveValueTimeout = setTimeout(() => {
      nconf.set(`control:${this.name}:value`, this.value)
      // @ts-expect-error incomplete types
      nconf.save()
    }, 1000)
  }

  setValue(newValue: number) {
    newValue = clamp(newValue, this.lower, this.upper)
    if (newValue !== this.value) {
      const oldValue = this.value
      this.value = newValue
      this.saveValue()
      this.events.emit('change', this.value, oldValue)
    }
  }

  increment() {
    this.setValue(this.value + this.stepSize)
  }

  decrement() {
    this.setValue(this.value - this.stepSize)
  }
}
