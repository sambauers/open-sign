import { writeFileSync } from 'fs'
import { camelCase, kebabCase } from 'lodash'
import { join } from 'path'

const PREFIXES = [
  'ABS',
  'BTN',
  'EV',
  'INPUT_PROP',
  'KEY',
  'LED',
  'MSC',
  'REL',
  'REP',
  'SND',
  'SW',
  'SYN',
]

const EVENTS_URL =
  'https://raw.githubusercontent.com/torvalds/linux/master/include/uapi/linux/input-event-codes.h'

interface Event {
  code: string
  name: string
  comment: string | undefined
}

const fetchEvents = async () => {
  const eventsResponse = await fetch(EVENTS_URL)

  if (!eventsResponse.ok || !eventsResponse.body) {
    console.error('Could not fetch events from source.')
    process.exit(1)
  }

  const eventsBody = await eventsResponse.text()
  const events = eventsBody
    .split('\n')
    .filter((event) => event.startsWith('#define '))

  PREFIXES.forEach((prefix) => {
    console.log(`Evaluating ${prefix}`)

    const prefixEvents = events
      .filter((event) => event.startsWith(`#define ${prefix}_`))
      .map<Event | undefined>((event) => {
        // Tidy up whitespace on the line
        const safeEvent = event
          .replace('#define', '')
          .replace(/\s+/g, ' ')
          .trim()

        // Get the comment
        const commentMatches = safeEvent.match(/\/\*.*$/)
        const comment = commentMatches ? commentMatches[0] : undefined
        const safeComment = comment
          ? comment.replace(/^\/\*/, '').replace(/\*\/$/, '').trim()
          : undefined

        // Get the name and code
        const [name, code] = safeEvent
          .replace(/\s\/\*.*$/, '')
          .trim()
          .split(' ')

        // Ignore codes which are not a number
        if (Number.isNaN(Number(code))) {
          return undefined
        }

        // Return event
        return { code, name, comment: safeComment }
      })
      .filter((event): event is Event => typeof event !== 'undefined')

    if (!prefixEvents.length) {
      return
    }

    const usedCodes: string[] = []

    const uniquePrefixEvents = prefixEvents
      .reverse() // Later event codes are preferred
      .filter((event) => {
        if (usedCodes.includes(event.code)) {
          return false
        }

        usedCodes.push(event.code)
        return true
      })
      .reverse()

    const lines = [
      `// ${prefix}`,
      `export const ${camelCase(prefix)}: Record<number, string> = {`,
    ]

    uniquePrefixEvents.forEach((event) => {
      if (event.comment) {
        lines.push(`  // ${event.comment}`)
      }
      lines.push(`  ${event.code}: '${event.name}',`)
    })

    lines.push('}', '')

    const filePath = join(__dirname, `${kebabCase(prefix)}.ts`)
    console.log(`Writing to: ${filePath}`)
    writeFileSync(filePath, lines.join('\n'))
  })
}

fetchEvents().catch((error: unknown) => {
  console.error('Error fetching events:', error)
  process.exit(1)
})

console.log(`Evaluating index`)

const lines = PREFIXES.map(
  (prefix) => `import { ${camelCase(prefix)} } from './${kebabCase(prefix)}'`,
)
lines.push(
  '',
  'export const events: Record<string, Record<number, string>> = {',
)
PREFIXES.forEach((prefix) => lines.push(`  ${camelCase(prefix)},`))
lines.push('}', '')

const filePath = join(__dirname, 'index.ts')
console.log(`Writing to: ${filePath}`)
writeFileSync(filePath, lines.join('\n'))
