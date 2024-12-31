import { existsSync, readFileSync, writeFileSync } from 'node:fs'

import { Brightness } from './lib/brightness'
import { Moods } from './lib/moods'
import type { MouseEvent } from './lib/mouse'
import type { Pixel } from './lib/pixels'
import { Screen } from './lib/screen'
import { getCols, getRows } from './lib/utilities/dimensions'

const PIDFILE = 'screen.pid'

const processExists = (pid: number) => {
  try {
    return process.kill(pid, 0)
  } catch (error) {
    return (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'EPERM'
    )
  }
}

try {
  if (existsSync(PIDFILE)) {
    const existing_pid = Number(readFileSync(PIDFILE))
    if (existing_pid && processExists(existing_pid)) {
      process.kill(existing_pid, 'SIGKILL')
    }
  }
} catch (error) {
  console.error('SCREEN PID ERROR!!!')
  console.error(error)
}

try {
  writeFileSync(PIDFILE, String(process.pid))

  console.log(`Screen process started: ${process.pid.toString()}`)

  const width = getCols(Number(process.env.LED_WIDTH))
  const height = getRows(Number(process.env.LED_HEIGHT))

  const brightness = new Brightness()
  const moods = new Moods(width, height)
  const screen = new Screen(width, height)

  process.on(
    'message',
    ({ action, ev }: { action: string; ev?: MouseEvent }) => {
      switch (action) {
        case 'on':
          moods.touch()
          break

        case 'off':
          screen.clear().sync()
          break

        case 'load':
          moods.touch()
          break

        case 'click':
          if (ev?.code === 'BTN_RIGHT') {
            moods.decrement()
          } else {
            moods.increment()
          }
          break

        case 'scrollup':
          brightness.increment()
          break

        case 'scrolldown':
          brightness.decrement()
          break

        default:
          break
      }
    },
  )

  moods.events.on('change', (mood: Pixel) => {
    mood
      .buffer()
      .then((buffer) => {
        if (!buffer) {
          screen.clear().sync()
          return
        }
        screen.clear().drawBuffer(buffer).sync()
      })
      .catch((error: unknown) => {
        console.error('MOODS ERROR!!!')
        console.error(error)
      })
  })

  brightness.events.on('change', () => {
    screen
      .control(
        brightness,
        screen.brightness.bind(screen),
        moods.touch.bind(moods),
      )
      .catch((error: unknown) => {
        console.error('BRIGHTNESS ERROR!!!')
        console.error(error)
      })
  })

  setInterval(() => {
    screen.sync()
  }, 0)
} catch (error) {
  console.error('SCREEN ERROR!!!')
  console.error(error)
}
