import { abs } from './abs'
import { btn } from './btn'
import { ev } from './ev'
import { inputProp } from './input-prop'
import { key } from './key'
import { led } from './led'
import { msc } from './msc'
import { rel } from './rel'
import { rep } from './rep'
import { snd } from './snd'
import { sw } from './sw'
import { syn } from './syn'

export const events: Record<string, Record<number, string>> = {
  abs,
  btn,
  ev,
  inputProp,
  key,
  led,
  msc,
  rel,
  rep,
  snd,
  sw,
  syn,
}
