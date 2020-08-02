'use strict';

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const _ = require('lodash');
const sharp = require('sharp');
const color = require('color');

const nconf = require('nconf');
nconf.file({
  file: 'saved-state.json'
});

class Blank {
  constructor () {
    this.file_path = null;
    this.width = null;
    this.height = null;
  }

  buffer () {
    return false;
  }
}

class Pixel {
  constructor (file_path, width, height, background_color) {
    this.file_path = file_path;
    this.width = width;
    this.height = height;
    this.background_color = background_color || 'black';
    this.buffer_cache = null;
  }

  async buffer (position = {top: 0, left: 0, width: 0, height: 0}) {
    if (this.buffer_cache) {
      return this.buffer_cache;
    }

    const png = await sharp(this.file_path)
      .flatten({
        background: color(this.background_color).rgb().string()
      })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const [ top, left, width, height ] = Object.keys(position).map(attr => _.toInteger(position[attr]));

    if (!top && !left && !width && !height) {
      this.buffer_cache = png.data;
      return this.buffer_cache;
    }

    let composite_width = width;
    if (!width) {
      if (!png.info.width) {
        return false;
      }
      composite_width = left + png.info.width;
    }

    let composite_height;
    if (!height) {
      if (!png.info.height) {
        return false;
      }
      composite_height = top + png.info.height;
    }

    this.buffer_cache = await sharp({
      create: {
        width: composite_width,
        height: composite_height,
        channels: 3,
        background: color(this.background_color).rgb().string()
      }
    })
      .composite([{
        input: png.data,
        raw: {
          width: png.info.width,
          height: png.info.height,
          channels: png.info.channels
        },
        top,
        left
      }])
      .removeAlpha()
      .raw()
      .toBuffer();

    return this.buffer_cache;
  }
}

class Pixels {
  constructor (name, directory_path, width, height, background_color, has_blank = false) {
    this.name = name;
    this.directory_path = directory_path;
    this.width = width;
    this.height = height;
    this.background_color = background_color || 'black';
    this.file_paths = fs.readdirSync(this.directory_path) || [];
    this.pixels = [
      ...has_blank ? [new Blank()] : [],
      ..._.compact(this.file_paths.map(file_path => {
        if (/\.png$/.test(file_path)) {
          return new Pixel(path.join(this.directory_path, file_path), this.width, this.height, this.background_color);
        }
        return false;
      }))
    ]

    const saved_index = nconf.get(`pixel:${this.name}:index`);
    this.current_index = saved_index || 0;

    this.save_current_index_timeout = null;

    this.events = new EventEmitter();
  }

  get current () {
    return this.pixels[this.current_index]
  }

  saveCurrentIndex () {
    if (this.save_current_index_timeout) {
      clearTimeout(this.save_current_index_timeout);
    }
    this.save_current_index_timeout = setTimeout(
      () => {
        nconf.set(`pixel:${this.name}:index`, this.current_index);
        nconf.save();
      },
      1000
    );
  }

  increment () {
    if (this.current_index >= this.pixels.length - 1) {
      this.current_index = 0;
    } else {
      this.current_index++;
    }
    this.saveCurrentIndex();
    this.events.emit('change', this.current);
  }

  decrement () {
    if (this.current_index <= 0) {
      this.current_index = this.pixels.length - 1;
    } else {
      this.current_index--;
    }
    this.saveCurrentIndex();
    this.events.emit('change', this.current);
  }

  touch () {
    this.events.emit('change', this.current);
  }
}

module.exports = {
  Pixel,
  Pixels
};
