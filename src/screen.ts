import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { Brightness } from './lib/brightness'
import { Moods } from './lib/moods'
import { Screen } from './lib/screen'

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

  console.log(`Screen process started: ${process.pid}`)

  const brightness = new Brightness()
  const moods = new Moods()
  const screen = new Screen()

  process.on('message', ({ action, ev }) => {
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
        if (ev.code === 'BTN_RIGHT') {
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
  })

  moods.events.on('change', async (mood) => {
    const buffer = await mood.buffer()
    if (!buffer) {
      screen.clear().sync()
      return
    }
    screen.clear().drawBuffer(buffer).sync()
  })

  brightness.events.on('change', async () => {
    await screen.control(
      brightness,
      screen.brightness.bind(screen),
      moods.touch.bind(moods)
    )
  })

  setInterval(() => {
    screen.sync()
  }, 0)
} catch (error) {
  console.error('SCREEN ERROR!!!')
  console.error(error)
}
