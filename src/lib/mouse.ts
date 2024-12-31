import clamp from 'lodash/clamp'
import isInteger from 'lodash/isInteger'

import type { DeviceEvent, DeviceEventRaw } from './device'
import { Device } from './device'
import { events } from './events'

const EVENT_TYPES = events.ev

const EVENT_CODES: Record<string, Record<number, string>> = {
  EV_SYN: events.syn,
  EV_KEY: { ...events.key, ...events.btn },
  EV_REL: events.rel,
  EV_ABS: events.abs,
  EV_MSC: events.msc,
  EV_SW: events.sw,
  EV_LED: events.led,
  EV_SND: events.snd,
  EV_REP: events.rep,
}

const EMITTER_ACTIONS: Record<string, string> = {
  EV_SYN: 'synchronization',
  EV_KEY: 'key_or_button',
  EV_REL: 'relative_axes',
  EV_ABS: 'absolute_axes',
  EV_MSC: 'misc',
  EV_SW: 'switch',
  EV_LED: 'led',
  EV_SND: 'sound',
  EV_REP: 'autorepeat',
}

interface Coordinates {
  x: number
  y: number
}

export interface MouseEvent extends DeviceEvent {
  position?: Coordinates
}

export class Mouse extends Device {
  protected eventActions: string[]
  protected raw: Coordinates
  protected tracked: Coordinates
  protected x: number
  protected y: number
  protected tracking: number

  constructor(eventActions: string[]) {
    super('/dev/input/by-id', /^usb-[a-zA-Z0-9_-]*?-event-mouse$/i)

    this.eventActions =
      eventActions.length > 0
        ? eventActions
        : [
            'all',
            'down',
            'up',
            'click',
            'move',
            'scrollup',
            'scrolldown',
            'scroll',
          ]

    this.raw = { x: 0, y: 0 }
    this.tracked = { x: 0, y: 0 }
    this.x = 0
    this.y = 0
    this.tracking = 0

    this.streamEvents.on('event', (ev: DeviceEventRaw) => {
      this.parse(ev)
    })
  }

  setMousePosition({
    x,
    y,
    dx,
    dy,
  }: {
    x?: number
    y?: number
    dx?: number
    dy?: number
  }) {
    if (!isInteger(x) && typeof dx === 'number' && isInteger(dx)) {
      x = this.raw.x + dx
    }
    if (!isInteger(y) && typeof dy === 'number' && isInteger(dy)) {
      y = this.raw.y + dy
    }

    const tracking = (10 + this.tracking) / 10
    if (typeof x === 'number' && isInteger(x)) {
      this.raw.x = x
      this.x = this.tracked.x = Math.round(x * tracking)
    }
    if (typeof y === 'number' && isInteger(y)) {
      this.raw.y = y
      this.y = this.tracked.y = Math.round(y * tracking)
    }
  }

  setMouseTracking(tracking = 0) {
    if (typeof tracking === 'number') {
      tracking = clamp(tracking, -10, 10)
      this.tracking = Math.round(tracking)
      this.setMousePosition(this.raw)
    }
  }

  emit(action: string, ev: MouseEvent | DeviceEventRaw) {
    if (this.eventActions.includes(action)) {
      this.events.emit(action, ev)
    }
  }

  parse(ev: DeviceEventRaw) {
    if (EVENT_TYPES[ev.type]) {
      const emittedEvent: MouseEvent = {
        time: ev.time,
        type: EVENT_TYPES[ev.type],
        code: EVENT_CODES[EVENT_TYPES[ev.type]][ev.code],
        value: ev.value,
        position: this.tracked,
      }

      let emitterAction = EMITTER_ACTIONS[emittedEvent.type]
      switch (emitterAction) {
        case 'key_or_button':
          switch (emittedEvent.code.substring(0, 4)) {
            case 'KEY_':
              emitterAction = 'key'
              break

            case 'BTN_':
              emitterAction = 'button'
              switch (emittedEvent.code) {
                case 'BTN_LEFT':
                case 'BTN_RIGHT':
                case 'BTN_MIDDLE':
                  if (ev.value === 1) {
                    this.emit('down', emittedEvent)
                  } else if (ev.value === 0) {
                    this.emit('up', emittedEvent)
                    this.emit('click', emittedEvent)
                  }
                  break

                default:
                  break
              }
              break

            default:
              break
          }
          break

        case 'relative_axes':
          switch (emittedEvent.code) {
            case 'REL_X':
              this.setMousePosition({ dx: ev.value })
              emittedEvent.position = this.tracked
              this.emit('move', emittedEvent)
              break

            case 'REL_Y':
              this.setMousePosition({ dy: ev.value })
              emittedEvent.position = this.tracked
              this.emit('move', emittedEvent)
              break

            case 'REL_WHEEL':
              if (ev.value > 0) {
                this.emit('scrollup', emittedEvent)
              } else if (ev.value < 0) {
                this.emit('scrolldown', emittedEvent)
              }
              if (ev.value) {
                this.emit('scroll', emittedEvent)
              }
              break

            default:
              break
          }
          break

        default:
          break
      }

      this.emit('all', emittedEvent)
    } else {
      this.emit('all', ev)
    }
  }
}
