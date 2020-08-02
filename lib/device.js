'use strict';

const fs = require('fs');
const EventEmitter = require('events');

const _ = require('lodash');

const bufferChunk = (buffer, chunk_size) => {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError('Buffer is required.');
  }
  if (!_.isInteger(chunk_size) || chunk_size < 0) {
    throw new TypeError('Chunk size should be a positve number.');
  }

  const result = [];
  const len = buffer.length;
  let i = 0;

  while (i < len) {
    result.push(buffer.slice(i, i += chunk_size));
  }

  return result;
};

class Device {
  constructor (directory, pattern) {
    this.directory = directory;
    this.pattern = pattern;
    this.path = this.getDevicePath();

    this.stream_events = new EventEmitter();

    this.events = new EventEmitter();
    this.events.emit('initilisation');

    this.stream = undefined;
  }

  getDeviceFileNames () {
    const device_file_names = fs.readdirSync(this.directory);

    if (!device_file_names || device_file_names instanceof Error || !device_file_names.length) {
      console.log(`${this.directory} contains:`); // eslint-disable-line
      console.log(device_file_names); // eslint-disable-line
      throw new Error('No input devices found.');
    }

    return device_file_names;
  }

  getDevicePath () {
    let device_path;
    this.getDeviceFileNames(this.directory).some(device_file_name => {
      if (!this.pattern.test(device_file_name)) {
        return false;
      }

      device_path = `${this.directory}/${device_file_name}`;
      return true;
    });

    if (!device_path) {
      throw new Error('Could not find matching input device path.');
    }

    return device_path;
  }

  async createStream () {
    try {
      const options = {
        flags: 'r',
        encoding: null,
        fd: null,
        autoClose: true
      };

      this.stream = await fs
        .createReadStream(this.path, options)
        .on('data', buffer => bufferChunk(buffer, 16).forEach(chunk => {
          const ev = {
            time: {
              tv_sec: chunk.readInt32LE(0),
              tv_usec: chunk.readInt32LE(4)
            },
            type: chunk.readUInt16LE(8),
            code: chunk.readUInt16LE(10),
            value: chunk.readInt32LE(12)
          };
          this.stream_events.emit('event', ev);
        }))
        .on('open', fd => {
          this.stream_events.emit('open', fd);
        })
        .on('ready', () => {
          this.stream_events.emit('ready');
          this.stream_events.emit('initialisation');
        })
        .on('error', console.error); // eslint-disable-line
    } catch (error) {
      console.log(`Could not read from device: ${this.path}`); // eslint-disable-line
      throw error;
    }
  }
}

module.exports = {
  Device
};
