import type { MatrixOptions } from 'rpi-led-matrix'

export const VALID_COLS: MatrixOptions['cols'][] = [16, 32, 64, 40]
export const VALID_ROWS: MatrixOptions['rows'][] = [16, 32, 64]

export function getCols(cols: number = VALID_COLS[0]): MatrixOptions['cols'] {
  return VALID_COLS.includes(cols as MatrixOptions['cols'])
    ? (cols as MatrixOptions['cols'])
    : VALID_COLS[0]
}

export function getRows(rows: number = VALID_ROWS[0]): MatrixOptions['rows'] {
  return VALID_ROWS.includes(rows as MatrixOptions['rows'])
    ? (rows as MatrixOptions['rows'])
    : VALID_ROWS[0]
}
