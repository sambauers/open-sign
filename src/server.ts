import { Mouse } from './lib/mouse'
import { isDevelopment } from './lib/utilities/is-environment'
import forever from 'forever-monitor'
import { join } from 'node:path'

// IIFE
;(async () => {
  try {
    const mouse = new Mouse(['click', 'scrollup', 'scrolldown'])
    await mouse.createStream()

    const screen = isDevelopment()
      ? forever.start(['ts-node', join(__dirname, 'screen.ts')], {})
      : new forever.Monitor(join(__dirname, 'screen.js'), {
          // @ts-expect-error missing option in types
          fork: true,
          killTree: false,
          watch: false,
        })

    const RESTART_EVENTS = ['start', 'restart']
    RESTART_EVENTS.forEach((ev) => {
      screen.on(ev, () => {
        console.log('Screen (re)started')
        screen.send({ action: 'load' })
      })
    })

    screen.start()

    const STOP_EVENTS = ['SIGINT', 'SIGTERM']
    STOP_EVENTS.forEach((ev) => {
      process.on(ev, () => {
        screen.stop()
        process.exit(0)
      })
    })

    process.on('SIGUSR1', () => {
      screen.send({ action: 'on' })
    })

    process.on('SIGUSR2', () => {
      screen.send({ action: 'off' })
    })

    mouse.events.on('click', (ev) => {
      screen.send({ action: 'click', ev })
    })

    mouse.events.on('scrollup', (ev) => {
      screen.send({ action: 'scrollup', ev })
    })

    mouse.events.on('scrolldown', (ev) => {
      screen.send({ action: 'scrolldown', ev })
    })
  } catch (error) {
    console.error('SERVER ERROR!!!')
    console.error(error)
  }
})()
