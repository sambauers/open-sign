import { join } from 'node:path'

import { isDevelopment } from './is-environment'

export const getSaveFile = () =>
  isDevelopment()
    ? join(__dirname, '..', '..', 'open-sign-saved-state.json')
    : join(__dirname, '..', '..', '..', 'open-sign-saved-state.json')
