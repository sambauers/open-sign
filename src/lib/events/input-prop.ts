// INPUT_PROP
export const inputProp: Record<number, string> = {
  // needs a pointer
  0x00: 'INPUT_PROP_POINTER',
  // direct input devices
  0x01: 'INPUT_PROP_DIRECT',
  // has button(s) under pad
  0x02: 'INPUT_PROP_BUTTONPAD',
  // touch rectangle only
  0x03: 'INPUT_PROP_SEMI_MT',
  // softbuttons at top of pad
  0x04: 'INPUT_PROP_TOPBUTTONPAD',
  // is a pointing stick
  0x05: 'INPUT_PROP_POINTING_STICK',
  // has accelerometer
  0x06: 'INPUT_PROP_ACCELEROMETER',
  0x1f: 'INPUT_PROP_MAX',
}
