import nconf from 'nconf'
import { getSaveFile } from './utilities/get-save-file'
import { join } from 'node:path'
import type { MatrixOptions } from 'rpi-led-matrix'
import clamp from 'lodash/clamp'
import { LedMatrix, GpioMapping, Font } from 'rpi-led-matrix'
import { Control } from './control'

nconf.file({ file: getSaveFile() })

const DEFAULT_FONT = new Font(
  'default',
  join(process.cwd(), 'node_modules', 'rpi-led-matrix', 'fonts', '6x9.bdf'),
)

const getRows = (envRows?: string): MatrixOptions['rows'] => {
  const rows = envRows ? Number(envRows) : 0
  return ([16, 32, 64].includes(rows) ? rows : 16) as MatrixOptions['rows']
}

const getCols = (envCols?: string): MatrixOptions['cols'] => {
  const cols = envCols ? Number(envCols) : 0
  return ([16, 32, 40, 64].includes(cols) ? cols : 16) as MatrixOptions['cols']
}

const getBrightness = (): number => {
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

  constructor() {
    super(
      {
        ...LedMatrix.defaultMatrixOptions(),
        rows: getRows(process.env.LED_HEIGHT),
        cols: getCols(process.env.LED_WIDTH),
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
