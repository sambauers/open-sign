'use strict';

const { Control } = require('./control');

class Brightness extends Control {
  constructor () {
    super('brightness', 'brightness.png', { start_at: 65 });
  }
}

module.exports = {
  Brightness
};
