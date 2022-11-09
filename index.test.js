import tap from 'tap'
import { fileURLToPath } from 'url'
import { dirname as dirnamePath } from 'path'
import { dirname, filename, join, requireJson, isMain } from './index.js'

tap.test('Test Setup', (t) => {
  t.equal(true, true, 'Tests and assertions should work')
  t.end()
})

const __dirname = dirnamePath(fileURLToPath(import.meta.url))
const __filename = fileURLToPath(import.meta.url)

tap.test('dirname', (t) => {
  t.equal(
    dirname(import.meta.url),
    __dirname,
    'dirname should return the current directory'
  )
  t.end()
})

tap.test('filename', (t) => {
  t.equal(
    filename(import.meta.url),
    __filename,
    'filename should return the current file'
  )
  t.end()
})

tap.test('join', (t) => {
  t.equal(
    join(import.meta.url, 'a', 'b', 'c'),
    `${__dirname}/a/b/c`,
    'join should join the given paths'
  )
  t.end()
})

tap.test('requireJson', (t) => {
  t.equal(
    requireJson(import.meta.url, './package.json').name,
    '@uscreen.de/common-esm',
    'requireJson should require a JSON file'
  )
  t.end()
})

tap.test('isMain', (t) => {
  t.equal(isMain(import.meta.url), true, 'isMain should return true')
  t.end()
})
