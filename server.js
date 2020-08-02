'use strict';

const forever = require('forever-monitor');

const { Mouse } = require('./lib/mouse');

(async () => {
  try {
    const mouse = new Mouse([
      'click',
      'scrollup',
      'scrolldown'
    ]);
    await mouse.createStream();

    const screen = new forever.Monitor('screen.js', {
      fork: true,
      killTree: false,
      watch: false
    });

    [
      'start',
      'restart'
    ].forEach(ev => {
      screen.on(ev, () => {
        console.log('Screen (re)started'); // eslint-disable-line
        screen.send({
          action: 'load'
        });
      });
    });

    screen.start();

    [
      'SIGINT',
      'SIGTERM'
    ].forEach(ev => {
      process.on(ev, () => {
        screen.stop();
        process.exit(0);
      });
    });

    process.on('SIGUSR1', () => {
      screen.send({
        action: 'on'
      });
    });

    process.on('SIGUSR2', () => {
      screen.send({
        action: 'off'
      });
    });

    mouse.events.on('click', ev => {
      screen.send({
        action: 'click',
        ev
      });
    });

    mouse.events.on('scrollup', ev => {
      screen.send({
        action: 'scrollup',
        ev
      });
    });

    mouse.events.on('scrolldown', ev => {
      screen.send({
        action: 'scrolldown',
        ev
      });
    });
  } catch (error) {
    console.error('SERVER ERROR!!!'); // eslint-disable-line
    console.error(error); // eslint-disable-line
  }
})();
