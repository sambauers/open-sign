// INPUT_PROP
export const inputProp: Record<number, string> = {
  0x00: 'INPUT_PROP_POINTER' /* needs a pointer */,
  0x01: 'INPUT_PROP_DIRECT' /* direct input devices */,
  0x02: 'INPUT_PROP_BUTTONPAD' /* has button(s) under pad */,
  0x03: 'INPUT_PROP_SEMI_MT' /* touch rectangle only */,
  0x04: 'INPUT_PROP_TOPBUTTONPAD' /* softbuttons at top of pad */,
  0x05: 'INPUT_PROP_POINTING_STICK' /* is a pointing stick */,
  0x06: 'INPUT_PROP_ACCELEROMETER' /* has accelerometer */,
  0x1f: 'INPUT_PROP_MAX',
}
