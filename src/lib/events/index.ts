import { inputProp } from './input-prop'
import { ev } from './ev'
import { syn } from './syn'
import { key } from './key'
import { btn } from './btn'
import { rel } from './rel'
import { abs } from './abs'
import { sw } from './sw'
import { msc } from './msc'
import { led } from './led'
import { rep } from './rep'
import { snd } from './snd'

export const events: Record<string, Record<number, string>> = {
  inputProp,
  ev,
  syn,
  key,
  btn,
  rel,
  abs,
  sw,
  msc,
  led,
  rep,
  snd,
}
