#! /bin/sh

PREFIXES='INPUT_PROP_
EV_
SYN_
KEY_
BTN_
REL_
ABS_
SW_
MSC_
LED_
REP_
SND_';

CODES_URL='https://raw.githubusercontent.com/torvalds/linux/master/include/uapi/linux/input-event-codes.h';
CODES_FILE='/tmp/evdev-codes.txt';
curl $CODES_URL > $CODES_FILE;

for PREFIX in $PREFIXES;
do
  echo $PREFIX;
  echo "'use strict';" > $PREFIX.js;
  echo 'module.exports = {' >> $PREFIX.js;
  cat $CODES_FILE | grep '#define' | grep "$PREFIX" | sed -E s/#define\\s+\($PREFIX[A-Z0-9_]+\)\\s+\(0x[0-9a-f]+\)/\ \ \\2:\ \\\'\\1\\\',/ | sed /^#/d >> $PREFIX.js
  echo '};' >> $PREFIX.js;
done;
