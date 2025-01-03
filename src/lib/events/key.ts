// KEY
export const key: Record<number, string> = {
  0: 'KEY_RESERVED',
  1: 'KEY_ESC',
  2: 'KEY_1',
  3: 'KEY_2',
  4: 'KEY_3',
  5: 'KEY_4',
  6: 'KEY_5',
  7: 'KEY_6',
  8: 'KEY_7',
  9: 'KEY_8',
  10: 'KEY_9',
  11: 'KEY_0',
  12: 'KEY_MINUS',
  13: 'KEY_EQUAL',
  14: 'KEY_BACKSPACE',
  15: 'KEY_TAB',
  16: 'KEY_Q',
  17: 'KEY_W',
  18: 'KEY_E',
  19: 'KEY_R',
  20: 'KEY_T',
  21: 'KEY_Y',
  22: 'KEY_U',
  23: 'KEY_I',
  24: 'KEY_O',
  25: 'KEY_P',
  26: 'KEY_LEFTBRACE',
  27: 'KEY_RIGHTBRACE',
  28: 'KEY_ENTER',
  29: 'KEY_LEFTCTRL',
  30: 'KEY_A',
  31: 'KEY_S',
  32: 'KEY_D',
  33: 'KEY_F',
  34: 'KEY_G',
  35: 'KEY_H',
  36: 'KEY_J',
  37: 'KEY_K',
  38: 'KEY_L',
  39: 'KEY_SEMICOLON',
  40: 'KEY_APOSTROPHE',
  41: 'KEY_GRAVE',
  42: 'KEY_LEFTSHIFT',
  43: 'KEY_BACKSLASH',
  44: 'KEY_Z',
  45: 'KEY_X',
  46: 'KEY_C',
  47: 'KEY_V',
  48: 'KEY_B',
  49: 'KEY_N',
  50: 'KEY_M',
  51: 'KEY_COMMA',
  52: 'KEY_DOT',
  53: 'KEY_SLASH',
  54: 'KEY_RIGHTSHIFT',
  55: 'KEY_KPASTERISK',
  56: 'KEY_LEFTALT',
  57: 'KEY_SPACE',
  58: 'KEY_CAPSLOCK',
  59: 'KEY_F1',
  60: 'KEY_F2',
  61: 'KEY_F3',
  62: 'KEY_F4',
  63: 'KEY_F5',
  64: 'KEY_F6',
  65: 'KEY_F7',
  66: 'KEY_F8',
  67: 'KEY_F9',
  68: 'KEY_F10',
  69: 'KEY_NUMLOCK',
  70: 'KEY_SCROLLLOCK',
  71: 'KEY_KP7',
  72: 'KEY_KP8',
  73: 'KEY_KP9',
  74: 'KEY_KPMINUS',
  75: 'KEY_KP4',
  76: 'KEY_KP5',
  77: 'KEY_KP6',
  78: 'KEY_KPPLUS',
  79: 'KEY_KP1',
  80: 'KEY_KP2',
  81: 'KEY_KP3',
  82: 'KEY_KP0',
  83: 'KEY_KPDOT',
  85: 'KEY_ZENKAKUHANKAKU',
  86: 'KEY_102ND',
  87: 'KEY_F11',
  88: 'KEY_F12',
  89: 'KEY_RO',
  90: 'KEY_KATAKANA',
  91: 'KEY_HIRAGANA',
  92: 'KEY_HENKAN',
  93: 'KEY_KATAKANAHIRAGANA',
  94: 'KEY_MUHENKAN',
  95: 'KEY_KPJPCOMMA',
  96: 'KEY_KPENTER',
  97: 'KEY_RIGHTCTRL',
  98: 'KEY_KPSLASH',
  99: 'KEY_SYSRQ',
  100: 'KEY_RIGHTALT',
  101: 'KEY_LINEFEED',
  102: 'KEY_HOME',
  103: 'KEY_UP',
  104: 'KEY_PAGEUP',
  105: 'KEY_LEFT',
  106: 'KEY_RIGHT',
  107: 'KEY_END',
  108: 'KEY_DOWN',
  109: 'KEY_PAGEDOWN',
  110: 'KEY_INSERT',
  111: 'KEY_DELETE',
  112: 'KEY_MACRO',
  113: 'KEY_MUTE',
  114: 'KEY_VOLUMEDOWN',
  115: 'KEY_VOLUMEUP',
  // SC System Power Down
  116: 'KEY_POWER',
  117: 'KEY_KPEQUAL',
  118: 'KEY_KPPLUSMINUS',
  119: 'KEY_PAUSE',
  // AL Compiz Scale (Expose)
  120: 'KEY_SCALE',
  121: 'KEY_KPCOMMA',
  122: 'KEY_HANGEUL',
  123: 'KEY_HANJA',
  124: 'KEY_YEN',
  125: 'KEY_LEFTMETA',
  126: 'KEY_RIGHTMETA',
  127: 'KEY_COMPOSE',
  // AC Stop
  128: 'KEY_STOP',
  129: 'KEY_AGAIN',
  // AC Properties
  130: 'KEY_PROPS',
  // AC Undo
  131: 'KEY_UNDO',
  132: 'KEY_FRONT',
  // AC Copy
  133: 'KEY_COPY',
  // AC Open
  134: 'KEY_OPEN',
  // AC Paste
  135: 'KEY_PASTE',
  // AC Search
  136: 'KEY_FIND',
  // AC Cut
  137: 'KEY_CUT',
  // AL Integrated Help Center
  138: 'KEY_HELP',
  // Menu (show menu)
  139: 'KEY_MENU',
  // AL Calculator
  140: 'KEY_CALC',
  141: 'KEY_SETUP',
  // SC System Sleep
  142: 'KEY_SLEEP',
  // System Wake Up
  143: 'KEY_WAKEUP',
  // AL Local Machine Browser
  144: 'KEY_FILE',
  145: 'KEY_SENDFILE',
  146: 'KEY_DELETEFILE',
  147: 'KEY_XFER',
  148: 'KEY_PROG1',
  149: 'KEY_PROG2',
  // AL Internet Browser
  150: 'KEY_WWW',
  151: 'KEY_MSDOS',
  // AL Terminal Lock/Screensaver
  152: 'KEY_COFFEE',
  // Display orientation for e.g. tablets
  153: 'KEY_ROTATE_DISPLAY',
  154: 'KEY_CYCLEWINDOWS',
  155: 'KEY_MAIL',
  // AC Bookmarks
  156: 'KEY_BOOKMARKS',
  157: 'KEY_COMPUTER',
  // AC Back
  158: 'KEY_BACK',
  // AC Forward
  159: 'KEY_FORWARD',
  160: 'KEY_CLOSECD',
  161: 'KEY_EJECTCD',
  162: 'KEY_EJECTCLOSECD',
  163: 'KEY_NEXTSONG',
  164: 'KEY_PLAYPAUSE',
  165: 'KEY_PREVIOUSSONG',
  166: 'KEY_STOPCD',
  167: 'KEY_RECORD',
  168: 'KEY_REWIND',
  // Media Select Telephone
  169: 'KEY_PHONE',
  170: 'KEY_ISO',
  // AL Consumer Control Configuration
  171: 'KEY_CONFIG',
  // AC Home
  172: 'KEY_HOMEPAGE',
  // AC Refresh
  173: 'KEY_REFRESH',
  // AC Exit
  174: 'KEY_EXIT',
  175: 'KEY_MOVE',
  176: 'KEY_EDIT',
  177: 'KEY_SCROLLUP',
  178: 'KEY_SCROLLDOWN',
  179: 'KEY_KPLEFTPAREN',
  180: 'KEY_KPRIGHTPAREN',
  // AC New
  181: 'KEY_NEW',
  // AC Redo/Repeat
  182: 'KEY_REDO',
  183: 'KEY_F13',
  184: 'KEY_F14',
  185: 'KEY_F15',
  186: 'KEY_F16',
  187: 'KEY_F17',
  188: 'KEY_F18',
  189: 'KEY_F19',
  190: 'KEY_F20',
  191: 'KEY_F21',
  192: 'KEY_F22',
  193: 'KEY_F23',
  194: 'KEY_F24',
  200: 'KEY_PLAYCD',
  201: 'KEY_PAUSECD',
  202: 'KEY_PROG3',
  203: 'KEY_PROG4',
  // AC Desktop Show All Applications
  204: 'KEY_ALL_APPLICATIONS',
  205: 'KEY_SUSPEND',
  // AC Close
  206: 'KEY_CLOSE',
  207: 'KEY_PLAY',
  208: 'KEY_FASTFORWARD',
  209: 'KEY_BASSBOOST',
  // AC Print
  210: 'KEY_PRINT',
  211: 'KEY_HP',
  212: 'KEY_CAMERA',
  213: 'KEY_SOUND',
  214: 'KEY_QUESTION',
  215: 'KEY_EMAIL',
  216: 'KEY_CHAT',
  217: 'KEY_SEARCH',
  218: 'KEY_CONNECT',
  // AL Checkbook/Finance
  219: 'KEY_FINANCE',
  220: 'KEY_SPORT',
  221: 'KEY_SHOP',
  222: 'KEY_ALTERASE',
  // AC Cancel
  223: 'KEY_CANCEL',
  224: 'KEY_BRIGHTNESSDOWN',
  225: 'KEY_BRIGHTNESSUP',
  226: 'KEY_MEDIA',
  // Cycle between available video
  227: 'KEY_SWITCHVIDEOMODE',
  228: 'KEY_KBDILLUMTOGGLE',
  229: 'KEY_KBDILLUMDOWN',
  230: 'KEY_KBDILLUMUP',
  // AC Send
  231: 'KEY_SEND',
  // AC Reply
  232: 'KEY_REPLY',
  // AC Forward Msg
  233: 'KEY_FORWARDMAIL',
  // AC Save
  234: 'KEY_SAVE',
  235: 'KEY_DOCUMENTS',
  236: 'KEY_BATTERY',
  237: 'KEY_BLUETOOTH',
  238: 'KEY_WLAN',
  239: 'KEY_UWB',
  240: 'KEY_UNKNOWN',
  // drive next video source
  241: 'KEY_VIDEO_NEXT',
  // drive previous video source
  242: 'KEY_VIDEO_PREV',
  // brightness up, after max is min
  243: 'KEY_BRIGHTNESS_CYCLE',
  // Set Auto Brightness: manual
  244: 'KEY_BRIGHTNESS_AUTO',
  // display device to off state
  245: 'KEY_DISPLAY_OFF',
  // Wireless WAN (LTE, UMTS, GSM, etc.)
  246: 'KEY_WWAN',
  // Key that controls all radios
  247: 'KEY_RFKILL',
  // Mute / unmute the microphone
  248: 'KEY_MICMUTE',
  0x160: 'KEY_OK',
  0x161: 'KEY_SELECT',
  0x162: 'KEY_GOTO',
  0x163: 'KEY_CLEAR',
  0x164: 'KEY_POWER2',
  0x165: 'KEY_OPTION',
  // AL OEM Features/Tips/Tutorial
  0x166: 'KEY_INFO',
  0x167: 'KEY_TIME',
  0x168: 'KEY_VENDOR',
  0x169: 'KEY_ARCHIVE',
  // Media Select Program Guide
  0x16a: 'KEY_PROGRAM',
  0x16b: 'KEY_CHANNEL',
  0x16c: 'KEY_FAVORITES',
  0x16d: 'KEY_EPG',
  // Media Select Home
  0x16e: 'KEY_PVR',
  0x16f: 'KEY_MHP',
  0x170: 'KEY_LANGUAGE',
  0x171: 'KEY_TITLE',
  0x172: 'KEY_SUBTITLE',
  0x173: 'KEY_ANGLE',
  // AC View Toggle
  0x174: 'KEY_FULL_SCREEN',
  0x175: 'KEY_MODE',
  0x176: 'KEY_KEYBOARD',
  // HUTRR37: Aspect
  0x177: 'KEY_ASPECT_RATIO',
  // Media Select Computer
  0x178: 'KEY_PC',
  // Media Select TV
  0x179: 'KEY_TV',
  // Media Select Cable
  0x17a: 'KEY_TV2',
  // Media Select VCR
  0x17b: 'KEY_VCR',
  // VCR Plus
  0x17c: 'KEY_VCR2',
  // Media Select Satellite
  0x17d: 'KEY_SAT',
  0x17e: 'KEY_SAT2',
  // Media Select CD
  0x17f: 'KEY_CD',
  // Media Select Tape
  0x180: 'KEY_TAPE',
  0x181: 'KEY_RADIO',
  // Media Select Tuner
  0x182: 'KEY_TUNER',
  0x183: 'KEY_PLAYER',
  0x184: 'KEY_TEXT',
  // Media Select DVD
  0x185: 'KEY_DVD',
  0x186: 'KEY_AUX',
  0x187: 'KEY_MP3',
  // AL Audio Browser
  0x188: 'KEY_AUDIO',
  // AL Movie Browser
  0x189: 'KEY_VIDEO',
  0x18a: 'KEY_DIRECTORY',
  0x18b: 'KEY_LIST',
  // Media Select Messages
  0x18c: 'KEY_MEMO',
  0x18d: 'KEY_CALENDAR',
  0x18e: 'KEY_RED',
  0x18f: 'KEY_GREEN',
  0x190: 'KEY_YELLOW',
  0x191: 'KEY_BLUE',
  // Channel Increment
  0x192: 'KEY_CHANNELUP',
  // Channel Decrement
  0x193: 'KEY_CHANNELDOWN',
  0x194: 'KEY_FIRST',
  // Recall Last
  0x195: 'KEY_LAST',
  0x196: 'KEY_AB',
  0x197: 'KEY_NEXT',
  0x198: 'KEY_RESTART',
  0x199: 'KEY_SLOW',
  0x19a: 'KEY_SHUFFLE',
  0x19b: 'KEY_BREAK',
  0x19c: 'KEY_PREVIOUS',
  0x19d: 'KEY_DIGITS',
  0x19e: 'KEY_TEEN',
  0x19f: 'KEY_TWEN',
  // Media Select Video Phone
  0x1a0: 'KEY_VIDEOPHONE',
  // Media Select Games
  0x1a1: 'KEY_GAMES',
  // AC Zoom In
  0x1a2: 'KEY_ZOOMIN',
  // AC Zoom Out
  0x1a3: 'KEY_ZOOMOUT',
  // AC Zoom
  0x1a4: 'KEY_ZOOMRESET',
  // AL Word Processor
  0x1a5: 'KEY_WORDPROCESSOR',
  // AL Text Editor
  0x1a6: 'KEY_EDITOR',
  // AL Spreadsheet
  0x1a7: 'KEY_SPREADSHEET',
  // AL Graphics Editor
  0x1a8: 'KEY_GRAPHICSEDITOR',
  // AL Presentation App
  0x1a9: 'KEY_PRESENTATION',
  // AL Database App
  0x1aa: 'KEY_DATABASE',
  // AL Newsreader
  0x1ab: 'KEY_NEWS',
  // AL Voicemail
  0x1ac: 'KEY_VOICEMAIL',
  // AL Contacts/Address Book
  0x1ad: 'KEY_ADDRESSBOOK',
  // AL Instant Messaging
  0x1ae: 'KEY_MESSENGER',
  // Turn display (LCD) on and off
  0x1af: 'KEY_DISPLAYTOGGLE',
  // AL Spell Check
  0x1b0: 'KEY_SPELLCHECK',
  // AL Logoff
  0x1b1: 'KEY_LOGOFF',
  0x1b2: 'KEY_DOLLAR',
  0x1b3: 'KEY_EURO',
  // Consumer - transport controls
  0x1b4: 'KEY_FRAMEBACK',
  0x1b5: 'KEY_FRAMEFORWARD',
  // GenDesc - system context menu
  0x1b6: 'KEY_CONTEXT_MENU',
  // Consumer - transport control
  0x1b7: 'KEY_MEDIA_REPEAT',
  // 10 channels up (10+)
  0x1b8: 'KEY_10CHANNELSUP',
  // 10 channels down (10-)
  0x1b9: 'KEY_10CHANNELSDOWN',
  // AL Image Browser
  0x1ba: 'KEY_IMAGES',
  // Show/hide the notification center
  0x1bc: 'KEY_NOTIFICATION_CENTER',
  // Answer incoming call
  0x1bd: 'KEY_PICKUP_PHONE',
  // Decline incoming call
  0x1be: 'KEY_HANGUP_PHONE',
  0x1c0: 'KEY_DEL_EOL',
  0x1c1: 'KEY_DEL_EOS',
  0x1c2: 'KEY_INS_LINE',
  0x1c3: 'KEY_DEL_LINE',
  0x1d0: 'KEY_FN',
  0x1d1: 'KEY_FN_ESC',
  0x1d2: 'KEY_FN_F1',
  0x1d3: 'KEY_FN_F2',
  0x1d4: 'KEY_FN_F3',
  0x1d5: 'KEY_FN_F4',
  0x1d6: 'KEY_FN_F5',
  0x1d7: 'KEY_FN_F6',
  0x1d8: 'KEY_FN_F7',
  0x1d9: 'KEY_FN_F8',
  0x1da: 'KEY_FN_F9',
  0x1db: 'KEY_FN_F10',
  0x1dc: 'KEY_FN_F11',
  0x1dd: 'KEY_FN_F12',
  0x1de: 'KEY_FN_1',
  0x1df: 'KEY_FN_2',
  0x1e0: 'KEY_FN_D',
  0x1e1: 'KEY_FN_E',
  0x1e2: 'KEY_FN_F',
  0x1e3: 'KEY_FN_S',
  0x1e4: 'KEY_FN_B',
  0x1e5: 'KEY_FN_RIGHT_SHIFT',
  0x1f1: 'KEY_BRL_DOT1',
  0x1f2: 'KEY_BRL_DOT2',
  0x1f3: 'KEY_BRL_DOT3',
  0x1f4: 'KEY_BRL_DOT4',
  0x1f5: 'KEY_BRL_DOT5',
  0x1f6: 'KEY_BRL_DOT6',
  0x1f7: 'KEY_BRL_DOT7',
  0x1f8: 'KEY_BRL_DOT8',
  0x1f9: 'KEY_BRL_DOT9',
  0x1fa: 'KEY_BRL_DOT10',
  // used by phones, remote controls,
  0x200: 'KEY_NUMERIC_0',
  // and other keypads
  0x201: 'KEY_NUMERIC_1',
  0x202: 'KEY_NUMERIC_2',
  0x203: 'KEY_NUMERIC_3',
  0x204: 'KEY_NUMERIC_4',
  0x205: 'KEY_NUMERIC_5',
  0x206: 'KEY_NUMERIC_6',
  0x207: 'KEY_NUMERIC_7',
  0x208: 'KEY_NUMERIC_8',
  0x209: 'KEY_NUMERIC_9',
  0x20a: 'KEY_NUMERIC_STAR',
  0x20b: 'KEY_NUMERIC_POUND',
  // Phone key A - HUT Telephony 0xb9
  0x20c: 'KEY_NUMERIC_A',
  0x20d: 'KEY_NUMERIC_B',
  0x20e: 'KEY_NUMERIC_C',
  0x20f: 'KEY_NUMERIC_D',
  0x210: 'KEY_CAMERA_FOCUS',
  // WiFi Protected Setup key
  0x211: 'KEY_WPS_BUTTON',
  // Request switch touchpad on or off
  0x212: 'KEY_TOUCHPAD_TOGGLE',
  0x213: 'KEY_TOUCHPAD_ON',
  0x214: 'KEY_TOUCHPAD_OFF',
  0x215: 'KEY_CAMERA_ZOOMIN',
  0x216: 'KEY_CAMERA_ZOOMOUT',
  0x217: 'KEY_CAMERA_UP',
  0x218: 'KEY_CAMERA_DOWN',
  0x219: 'KEY_CAMERA_LEFT',
  0x21a: 'KEY_CAMERA_RIGHT',
  0x21b: 'KEY_ATTENDANT_ON',
  0x21c: 'KEY_ATTENDANT_OFF',
  // Attendant call on or off
  0x21d: 'KEY_ATTENDANT_TOGGLE',
  // Reading light on or off
  0x21e: 'KEY_LIGHTS_TOGGLE',
  // Ambient light sensor
  0x230: 'KEY_ALS_TOGGLE',
  // Display rotation lock
  0x231: 'KEY_ROTATE_LOCK_TOGGLE',
  // Display refresh rate toggle
  0x232: 'KEY_REFRESH_RATE_TOGGLE',
  // AL Button Configuration
  0x240: 'KEY_BUTTONCONFIG',
  // AL Task/Project Manager
  0x241: 'KEY_TASKMANAGER',
  // AL Log/Journal/Timecard
  0x242: 'KEY_JOURNAL',
  // AL Control Panel
  0x243: 'KEY_CONTROLPANEL',
  // AL Select Task/Application
  0x244: 'KEY_APPSELECT',
  // AL Screen Saver
  0x245: 'KEY_SCREENSAVER',
  // Listening Voice Command
  0x246: 'KEY_VOICECOMMAND',
  // AL Context-aware desktop assistant
  0x247: 'KEY_ASSISTANT',
  // AC Next Keyboard Layout Select
  0x248: 'KEY_KBD_LAYOUT_NEXT',
  // Show/hide emoji picker (HUTRR101)
  0x249: 'KEY_EMOJI_PICKER',
  // Start or Stop Voice Dictation Session (HUTRR99)
  0x24a: 'KEY_DICTATE',
  // Enables programmatic access to camera devices. (HUTRR72)
  0x24b: 'KEY_CAMERA_ACCESS_ENABLE',
  // Disables programmatic access to camera devices. (HUTRR72)
  0x24c: 'KEY_CAMERA_ACCESS_DISABLE',
  // Toggles the current state of the camera access control. (HUTRR72)
  0x24d: 'KEY_CAMERA_ACCESS_TOGGLE',
  // Toggles the system bound accessibility UI/command (HUTRR116)
  0x24e: 'KEY_ACCESSIBILITY',
  // Toggles the system-wide "Do Not Disturb" control (HUTRR94)
  0x24f: 'KEY_DO_NOT_DISTURB',
  // Set Brightness to Minimum
  0x250: 'KEY_BRIGHTNESS_MIN',
  // Set Brightness to Maximum
  0x251: 'KEY_BRIGHTNESS_MAX',
  0x260: 'KEY_KBDINPUTASSIST_PREV',
  0x261: 'KEY_KBDINPUTASSIST_NEXT',
  0x262: 'KEY_KBDINPUTASSIST_PREVGROUP',
  0x263: 'KEY_KBDINPUTASSIST_NEXTGROUP',
  0x264: 'KEY_KBDINPUTASSIST_ACCEPT',
  0x265: 'KEY_KBDINPUTASSIST_CANCEL',
  0x266: 'KEY_RIGHT_UP',
  0x267: 'KEY_RIGHT_DOWN',
  0x268: 'KEY_LEFT_UP',
  0x269: 'KEY_LEFT_DOWN',
  // Show Device's Root Menu
  0x26a: 'KEY_ROOT_MENU',
  0x26b: 'KEY_MEDIA_TOP_MENU',
  0x26c: 'KEY_NUMERIC_11',
  0x26d: 'KEY_NUMERIC_12',
  0x26e: 'KEY_AUDIO_DESC',
  0x26f: 'KEY_3D_MODE',
  0x270: 'KEY_NEXT_FAVORITE',
  0x271: 'KEY_STOP_RECORD',
  0x272: 'KEY_PAUSE_RECORD',
  // Video on Demand
  0x273: 'KEY_VOD',
  0x274: 'KEY_UNMUTE',
  0x275: 'KEY_FASTREVERSE',
  0x276: 'KEY_SLOWREVERSE',
  0x277: 'KEY_DATA',
  0x278: 'KEY_ONSCREEN_KEYBOARD',
  0x279: 'KEY_PRIVACY_SCREEN_TOGGLE',
  0x27a: 'KEY_SELECTIVE_SCREENSHOT',
  0x27b: 'KEY_NEXT_ELEMENT',
  0x27c: 'KEY_PREVIOUS_ELEMENT',
  0x27d: 'KEY_AUTOPILOT_ENGAGE_TOGGLE',
  0x27e: 'KEY_MARK_WAYPOINT',
  0x27f: 'KEY_SOS',
  0x280: 'KEY_NAV_CHART',
  0x281: 'KEY_FISHING_CHART',
  0x282: 'KEY_SINGLE_RANGE_RADAR',
  0x283: 'KEY_DUAL_RANGE_RADAR',
  0x284: 'KEY_RADAR_OVERLAY',
  0x285: 'KEY_TRADITIONAL_SONAR',
  0x286: 'KEY_CLEARVU_SONAR',
  0x287: 'KEY_SIDEVU_SONAR',
  0x288: 'KEY_NAV_INFO',
  0x289: 'KEY_BRIGHTNESS_MENU',
  0x290: 'KEY_MACRO1',
  0x291: 'KEY_MACRO2',
  0x292: 'KEY_MACRO3',
  0x293: 'KEY_MACRO4',
  0x294: 'KEY_MACRO5',
  0x295: 'KEY_MACRO6',
  0x296: 'KEY_MACRO7',
  0x297: 'KEY_MACRO8',
  0x298: 'KEY_MACRO9',
  0x299: 'KEY_MACRO10',
  0x29a: 'KEY_MACRO11',
  0x29b: 'KEY_MACRO12',
  0x29c: 'KEY_MACRO13',
  0x29d: 'KEY_MACRO14',
  0x29e: 'KEY_MACRO15',
  0x29f: 'KEY_MACRO16',
  0x2a0: 'KEY_MACRO17',
  0x2a1: 'KEY_MACRO18',
  0x2a2: 'KEY_MACRO19',
  0x2a3: 'KEY_MACRO20',
  0x2a4: 'KEY_MACRO21',
  0x2a5: 'KEY_MACRO22',
  0x2a6: 'KEY_MACRO23',
  0x2a7: 'KEY_MACRO24',
  0x2a8: 'KEY_MACRO25',
  0x2a9: 'KEY_MACRO26',
  0x2aa: 'KEY_MACRO27',
  0x2ab: 'KEY_MACRO28',
  0x2ac: 'KEY_MACRO29',
  0x2ad: 'KEY_MACRO30',
  0x2b0: 'KEY_MACRO_RECORD_START',
  0x2b1: 'KEY_MACRO_RECORD_STOP',
  0x2b2: 'KEY_MACRO_PRESET_CYCLE',
  0x2b3: 'KEY_MACRO_PRESET1',
  0x2b4: 'KEY_MACRO_PRESET2',
  0x2b5: 'KEY_MACRO_PRESET3',
  0x2b8: 'KEY_KBD_LCD_MENU1',
  0x2b9: 'KEY_KBD_LCD_MENU2',
  0x2ba: 'KEY_KBD_LCD_MENU3',
  0x2bb: 'KEY_KBD_LCD_MENU4',
  0x2bc: 'KEY_KBD_LCD_MENU5',
  0x2ff: 'KEY_MAX',
}
