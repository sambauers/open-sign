'use strict';

const _ = require('lodash');

const { Device } = require('./device');

const EVENT_TYPES = require('./events/EV_');

const EVENT_CODES = {
  EV_SYN: require('./events/SYN_'),
  EV_KEY: Object.assign(require('./events/KEY_'), require('./events/BTN_')),
  EV_REL: require('./events/REL_'),
  EV_ABS: require('./events/ABS_'),
  EV_MSC: require('./events/MSC_'),
  EV_SW: require('./events/SW_'),
  EV_LED: require('./events/LED_'),
  EV_SND: require('./events/SND_'),
  EV_REP: require('./events/REP_')
};

const EMITTER_ACTIONS = {
  EV_SYN: 'synchronization',
  EV_KEY: 'key_or_button',
  EV_REL: 'relative_axes',
  EV_ABS: 'absolute_axes',
  EV_MSC: 'misc',
  EV_SW: 'switch',
  EV_LED: 'led',
  EV_SND: 'sound',
  EV_REP: 'autorepeat'
};

class Mouse extends Device {
  constructor (event_actions) {
    super('/dev/input/by-id', /^usb-[a-zA-Z0-9_-]*?-event-mouse$/i);

    this.event_actions = event_actions || [
      'all',
      'down',
      'up',
      'click',
      'move',
      'scrollup',
      'scrolldown',
      'scroll'
    ];

    this.raw = {
      x: 0,
      y: 0
    };
    this.tracked = {
      x: 0,
      y: 0
    };
    this.x = 0;
    this.y = 0;
    this.tracking = 0;

    this.stream_events.on('event', ev => this.parse(ev));
  }

  setMousePosition ({x = null, y = null, dx = null, dy = null}) {
    if (!_.isInteger(x) && _.isInteger(dx)) {
      x = this.raw.x + dx;
    }
    if (!_.isInteger(y) && _.isInteger(dy)) {
      y = this.raw.y + dy;
    }

    const tracking = (10 + this.tracking) / 10;
    if (_.isInteger(x)) {
      this.raw.x = x;
      this.x = this.tracked.x = Math.round(x * tracking);
    }
    if (_.isInteger(y)) {
      this.raw.y = y;
      this.y = this.tracked.y = Math.round(y * tracking);
    }
  }

  setMouseTracking (tracking = 0) {
    if (_.isNumber(tracking)) {
      tracking = _.clamp(tracking, -10, 10);
      this.tracking = Math.round(tracking);
      this.setMousePosition(this.raw);
    }
  }

  emit (action, ev) {
    if (this.event_actions.includes(action)) {
      this.events.emit(action, ev);
    }
  }

  parse (ev) {
    if (EVENT_TYPES[ev.type]) {
      ev.type = EVENT_TYPES[ev.type];
      if (ev.type && EVENT_CODES[ev.type] && EVENT_CODES[ev.type][ev.code]) {
        ev.code = EVENT_CODES[ev.type][ev.code];
      }

      let emitter_action = EMITTER_ACTIONS[ev.type];
      switch (emitter_action) {
        case 'key_or_button':
          switch (ev.code.substring(0, 4)) {
            case 'KEY_':
              emitter_action = 'key';
              break;

            case 'BTN_':
              emitter_action = 'button';
              switch (ev.code) {
                case 'BTN_LEFT':
                case 'BTN_RIGHT':
                case 'BTN_MIDDLE':
                  if (ev.value === 1) {
                    this.emit('down', ev);
                  } else if (ev.value === 0) {
                    this.emit('up', ev);
                    this.emit('click', ev);
                  }
                  break;

                default:
                  break;
              }
              break;

            default:
              break;
          }
          break;

        case 'relative_axes':
          switch (ev.code) {
            case 'REL_X':
              this.setMousePosition({dx: ev.value});
              ev.position = this.tracked;
              this.emit('move', ev);
              break;

            case 'REL_Y':
              this.setMousePosition({dy: ev.value});
              ev.position = this.tracked;
              this.emit('move', ev);
              break;

            case 'REL_WHEEL':
              if (ev.value > 0) {
                this.emit('scrollup', ev);
              } else if (ev.value < 0) {
                this.emit('scrolldown', ev);
              }
              if (ev.value) {
                this.emit('scroll', ev);
              }
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }
    }

    this.emit('all', ev);
  }
}

module.exports = {
  Mouse
};
