// ABS
export const abs: Record<number, string> = {
  0x00: 'ABS_X',
  0x01: 'ABS_Y',
  0x02: 'ABS_Z',
  0x03: 'ABS_RX',
  0x04: 'ABS_RY',
  0x05: 'ABS_RZ',
  0x06: 'ABS_THROTTLE',
  0x07: 'ABS_RUDDER',
  0x08: 'ABS_WHEEL',
  0x09: 'ABS_GAS',
  0x0a: 'ABS_BRAKE',
  0x10: 'ABS_HAT0X',
  0x11: 'ABS_HAT0Y',
  0x12: 'ABS_HAT1X',
  0x13: 'ABS_HAT1Y',
  0x14: 'ABS_HAT2X',
  0x15: 'ABS_HAT2Y',
  0x16: 'ABS_HAT3X',
  0x17: 'ABS_HAT3Y',
  0x18: 'ABS_PRESSURE',
  0x19: 'ABS_DISTANCE',
  0x1a: 'ABS_TILT_X',
  0x1b: 'ABS_TILT_Y',
  0x1c: 'ABS_TOOL_WIDTH',
  0x20: 'ABS_VOLUME',
  0x21: 'ABS_PROFILE',
  0x28: 'ABS_MISC',
  0x2e: 'ABS_RESERVED',
  // MT slot being modified
  0x2f: 'ABS_MT_SLOT',
  // Major axis of touching ellipse
  0x30: 'ABS_MT_TOUCH_MAJOR',
  // Minor axis (omit if circular)
  0x31: 'ABS_MT_TOUCH_MINOR',
  // Major axis of approaching ellipse
  0x32: 'ABS_MT_WIDTH_MAJOR',
  // Minor axis (omit if circular)
  0x33: 'ABS_MT_WIDTH_MINOR',
  // Ellipse orientation
  0x34: 'ABS_MT_ORIENTATION',
  // Center X touch position
  0x35: 'ABS_MT_POSITION_X',
  // Center Y touch position
  0x36: 'ABS_MT_POSITION_Y',
  // Type of touching device
  0x37: 'ABS_MT_TOOL_TYPE',
  // Group a set of packets as a blob
  0x38: 'ABS_MT_BLOB_ID',
  // Unique ID of initiated contact
  0x39: 'ABS_MT_TRACKING_ID',
  // Pressure on contact area
  0x3a: 'ABS_MT_PRESSURE',
  // Contact hover distance
  0x3b: 'ABS_MT_DISTANCE',
  // Center X tool position
  0x3c: 'ABS_MT_TOOL_X',
  // Center Y tool position
  0x3d: 'ABS_MT_TOOL_Y',
  0x3f: 'ABS_MAX',
}
