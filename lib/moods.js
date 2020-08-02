'use strict';

const path = require('path');

const { Pixels } = require('./pixels');

class Moods extends Pixels {
  constructor () {
    const directory_path = path.join(process.cwd(), 'moods');
    super('moods', directory_path, 64, 32, 'black', true);
  }
}

module.exports = {
  Moods
};
