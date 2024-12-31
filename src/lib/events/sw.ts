// SW
export const sw: Record<number, string> = {
  // set = lid shut
  0x00: 'SW_LID',
  // set = tablet mode
  0x01: 'SW_TABLET_MODE',
  // set = inserted
  0x02: 'SW_HEADPHONE_INSERT',
  // rfkill master switch, type "any"
  0x03: 'SW_RFKILL_ALL',
  // set = inserted
  0x04: 'SW_MICROPHONE_INSERT',
  // set = plugged into dock
  0x05: 'SW_DOCK',
  // set = inserted
  0x06: 'SW_LINEOUT_INSERT',
  // set = mechanical switch set
  0x07: 'SW_JACK_PHYSICAL_INSERT',
  // set = inserted
  0x08: 'SW_VIDEOOUT_INSERT',
  // set = lens covered
  0x09: 'SW_CAMERA_LENS_COVER',
  // set = keypad slide out
  0x0a: 'SW_KEYPAD_SLIDE',
  // set = front proximity sensor active
  0x0b: 'SW_FRONT_PROXIMITY',
  // set = rotate locked/disabled
  0x0c: 'SW_ROTATE_LOCK',
  // set = inserted
  0x0d: 'SW_LINEIN_INSERT',
  // set = device disabled
  0x0e: 'SW_MUTE_DEVICE',
  // set = pen inserted
  0x0f: 'SW_PEN_INSERTED',
  0x10: 'SW_MAX',
}
