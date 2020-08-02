'use strict';

const fs = require('fs');
const path = require('path');

const { Brightness } = require('./lib/brightness');
const { Moods } = require('./lib/moods');
const { Screen } = require('./lib/screen');

const PIDFILE = path.join(__dirname, 'screen.pid');

const processExists = pid => {
  try {
    return process.kill(pid, 0);
  } catch (error) {
    return error.code === 'EPERM';
  }
}

try {
  if (fs.existsSync(PIDFILE)) {
    const existing_pid = String(fs.readFileSync(PIDFILE));
    if (existing_pid && processExists(existing_pid)) {
      process.kill(existing_pid, 'SIGKILL');
    }
  }
} catch (error) {
  console.error('SCREEN PID ERROR!!!'); // eslint-disable-line
  console.error(error); // eslint-disable-line
}

try {
  fs.writeFileSync(PIDFILE, process.pid);

  const brightness = new Brightness();
  const moods = new Moods();
  const screen = new Screen();

  process.on('message', ({ action, ev }) => {
    switch (action) {
      case 'on':
        moods.touch();
        break;

      case 'off':
        screen.clear().sync();
        break;

      case 'load':
        moods.touch();
        break;

      case 'click':
        if (ev.code === 'BTN_RIGHT') {
          moods.decrement();
        } else {
          moods.increment();
        }
        break;

      case 'scrollup':
        brightness.increment();
        break;

      case 'scrolldown':
        brightness.decrement();
        break;

      default:
        break;
    }
  });

  moods.events.on('change', async mood => {
    const buffer = await mood.buffer();
    if (!buffer) {
      screen.clear().sync();
      return;
    }
    screen.clear().drawBuffer(buffer).sync();
  });

  brightness.events.on('change', async () => {
    await screen.control(brightness, screen.brightness.bind(screen), moods.touch.bind(moods));
  });

  setInterval(() => {
    screen.sync();
  }, 0);
} catch (error) {
  console.error('SCREEN ERROR!!!'); // eslint-disable-line
  console.error(error); // eslint-disable-line
}
