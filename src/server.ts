import { join } from 'node:path'

import forever from 'forever-monitor'

import type { MouseEvent } from './lib/mouse'
import { Mouse } from './lib/mouse'
import { isDevelopment } from './lib/utilities/is-environment'

function main() {
  try {
    const mouse = new Mouse(['click', 'scrollup', 'scrolldown'])
    mouse.createStream()

    const screen = isDevelopment()
      ? forever.start(['ts-node', join(__dirname, 'screen.ts')], {})
      : new forever.Monitor(join(__dirname, 'screen.js'), {
          // @ts-expect-error missing option in types
          fork: true,
          killTree: false,
          watch: false,
        })

    const RESTART_EVENTS = ['start', 'restart'] as const
    RESTART_EVENTS.forEach((ev) => {
      screen.on(ev, () => {
        console.log('Screen (re)started')
        screen.send({ action: 'load' })
      })
    })

    screen.start()

    const STOP_EVENTS = ['SIGINT', 'SIGTERM'] as const
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

    mouse.events.on('click', (ev: MouseEvent) => {
      screen.send({ action: 'click', ev })
    })

    mouse.events.on('scrollup', () => {
      screen.send({ action: 'scrollup' })
    })

    mouse.events.on('scrolldown', () => {
      screen.send({ action: 'scrolldown' })
    })
  } catch (error) {
    console.error('SERVER ERROR!!!')
    console.error(error)
  }
}

// IIFE
;(() => {
  main()
})()
