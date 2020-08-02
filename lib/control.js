'use strict';

const path = require('path');
const EventEmitter = require('events');

const _ = require('lodash');

const { Pixel } = require('./pixels');

const nconf = require('nconf');
nconf.file({
  file: 'saved-state.json'
});

class Control {
  constructor (name, icon_file, { lower, upper, step_size, start_at }) {
    this.name = name;
    this.icon = new Pixel(path.join(process.cwd(), 'controls', icon_file), 12, 12);
    this.lower = lower || 0;
    this.upper = upper || 100;
    this.step_size = step_size || 5;

    const saved_value = nconf.get(`control:${this.name}:value`);
    if (saved_value === 0) {
      this.value = 0;
    } else {
      this.value = saved_value || start_at || 0;
    }

    this.save_value_timeout = null;

    this.events = new EventEmitter();
  }

  saveValue () {
    if (this.save_value_timeout) {
      clearTimeout(this.save_value_timeout);
    }
    this.save_value_timeout = setTimeout(
      () => {
        nconf.set(`control:${this.name}:value`, this.value);
        nconf.save();
      },
      1000
    );
  }

  setValue (new_value) {
    new_value = _.clamp(new_value, this.lower, this.upper);
    if (new_value !== this.value) {
      const old_value = this.value;
      this.value = new_value;
      this.saveValue();
      this.events.emit('change', this.value, old_value);
    }
  }

  increment () {
    this.setValue(this.value + this.step_size);
  }

  decrement () {
    this.setValue(this.value - this.step_size);
  }
}

module.exports = {
  Control
};
