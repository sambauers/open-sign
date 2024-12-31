import { join } from 'node:path'

import clamp from 'lodash/clamp'
import nconf from 'nconf'
import { Font, GpioMapping, LedMatrix } from 'rpi-led-matrix'

import type { Control } from './control'
import { getCols, getRows } from './utilities/dimensions'
import { getSaveFile } from './utilities/get-save-file'

nconf.file({ file: getSaveFile() })

const DEFAULT_FONT = new Font(
  'default',
  join(process.cwd(), 'node_modules', 'rpi-led-matrix', 'fonts', '6x9.bdf'),
)

const getBrightness = (): number => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const config = nconf.get('control:brightness:value')

  switch (typeof config) {
    case 'number':
      return clamp(config, 0, 100)

    case 'string':
      if (/^\d+$/.test(config.trim())) {
        return clamp(Number(config.trim()), 0, 100)
      }
  }

  return 65
}

export class Screen extends LedMatrix {
  private controlWait?: NodeJS.Timeout

  constructor(width: number, height: number) {
    super(
      {
        ...LedMatrix.defaultMatrixOptions(),
        cols: getCols(width),
        rows: getRows(height),
        hardwareMapping: GpioMapping.AdafruitHatPwm,
        brightness: getBrightness(),
      },
      {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 3,
      },
    )
  }

  async control(
    control: Control,
    action: (value: number) => void,
    reset: () => void,
  ) {
    if (this.controlWait) {
      clearTimeout(this.controlWait)
    }

    const margin = 1
    const height = 15
    const width = this.width() - margin * 2
    const top = this.height() - height - margin
    const left = margin

    const iconBuffer = await control.icon.buffer({ top, left })

    const lineLength = Math.round((control.value / control.upper) * width)

    this.clear()

    action(control.value)

    if (iconBuffer) {
      this.drawBuffer(
        iconBuffer,
        left + control.icon.width,
        top + control.icon.height,
      )
    }

    this.fgColor(0xffffff)
      .font(DEFAULT_FONT)
      .drawText(
        String(control.value),
        left + control.icon.width + 1,
        top + 2,
        -1,
      )
      .fgColor(0x134f5c)
      .drawText(
        new Date().toLocaleTimeString('en-AU', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        }),
        37,
        top + 2,
        -1,
      )
      .fill(1, top + height - 2, width, top + height - 1)

    if (control.value) {
      this.fgColor(0xffffff).fill(
        1,
        top + height - 2,
        lineLength,
        top + height - 1,
      )
    }

    this.sync()

    this.controlWait = setTimeout(reset, 1500)
  }
}
