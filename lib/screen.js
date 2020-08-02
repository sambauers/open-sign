'use strict';

const path = require('path');

const nconf = require('nconf');
nconf.file({
  file: 'saved-state.json'
});

const { LedMatrix, GpioMapping, Font } = require('rpi-led-matrix');

const DEFAULT_FONT = new Font('default', path.join(process.cwd(), 'node_modules', 'rpi-led-matrix', 'fonts', '6x9.bdf'));

class Screen extends LedMatrix {
  constructor () {
    super(
      {
        ...LedMatrix.defaultMatrixOptions(),
        rows: 32,
        cols: 64,
        hardwareMapping: GpioMapping.AdafruitHatPwm,
        brightness: nconf.get('control:brightness:value') || 65
      },
      {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 3
      }
    );

    this.control_wait = null;
  }

  colors (colors, x = 0, y = 0) {
    const initial = { x, y };
    colors.forEach(pixel_row => {
      pixel_row.forEach(color => {
        if (color) {
          this
            .fgColor(color)
            .setPixel(x, y);
        }
        x++;
      });
      y++;
      x = initial.x;
    });
  }

  async control (control, action, reset) {
    if (this.control_wait) {
      clearTimeout(this.control_wait);
    }

    const margin = 1;
    const height = 15;
    const width = this.width() - margin * 2;
    const top = this.height() - height - margin;
    const left = margin;

    const icon_buffer = await control.icon.buffer({ top, left });

    const line_length = Math.round(control.value / control.upper * width);

    this.clear();

    action(control.value);

    this.drawBuffer(icon_buffer, left + control.icon.width, top + control.icon.height);

    this
      .fgColor(0xFFFFFF)
      .font(DEFAULT_FONT)
      .drawText(String(control.value), left + control.icon.width + 1, top + 2, -1)
      .fgColor(0x134F5C)
      .fill(1, top + height - 2, width, top + height -1);

    if (control.value) {
      this
        .fgColor(0xFFFFFF)
        .fill(1, top + height - 2, line_length, top + height - 1);
    }

    this.sync();

    this.control_wait = setTimeout(reset, 1500);
  }
}

module.exports = {
  Screen
};
