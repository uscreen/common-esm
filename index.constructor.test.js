import tap from 'tap'
import { fileURLToPath } from 'url'
import { dirname as dirnamePath } from 'path'
import CommonESM from './index.js'

const {
  __dirname,
  __filename,
  __isMain,
  dirname,
  filename,
  isMain,
  join,
  requireJson
} = new CommonESM(import.meta.url)

const ___dirname = dirnamePath(fileURLToPath(import.meta.url))
const ___filename = fileURLToPath(import.meta.url)

tap.test('__dirname', (t) => {
  t.equal(
    __dirname,
    ___dirname,
    '__dirname should return the current directory'
  )
  t.end()
})

tap.test('__filename', (t) => {
  t.equal(__filename, ___filename, '__filename should return the current file')
  t.end()
})

tap.test('__isMain', (t) => {
  t.equal(__isMain, true, '__isMain should return true')
  t.end()
})

tap.test('dirname()', (t) => {
  t.equal(dirname(), ___dirname, 'dirname should return the current directory')
  t.end()
})

tap.test('filename()', (t) => {
  t.equal(filename(), ___filename, 'filename should return the current file')
  t.end()
})

tap.test('isMain()', (t) => {
  t.equal(isMain(), true, 'isMain should return true')
  t.end()
})

tap.test('join()', (t) => {
  t.equal(
    join('a', 'b', 'c'),
    `${___dirname}/a/b/c`,
    'join should join the given paths'
  )
  t.end()
})

tap.test('requireJson()', (t) => {
  t.equal(
    requireJson('./package.json').name,
    '@uscreen.de/common-esm',
    'requireJson should require a JSON file'
  )
  t.end()
})
