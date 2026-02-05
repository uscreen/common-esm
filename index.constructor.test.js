import { test } from 'node:test'
import assert from 'node:assert/strict'
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

test('__dirname', () => {
  assert.equal(
    __dirname,
    ___dirname,
    '__dirname should return the current directory'
  )
})

test('__filename', () => {
  assert.equal(
    __filename,
    ___filename,
    '__filename should return the current file'
  )
})

test('__isMain', () => {
  assert.equal(__isMain, true, '__isMain should return true')
})

test('dirname()', () => {
  assert.equal(
    dirname(),
    ___dirname,
    'dirname should return the current directory'
  )
})

test('filename()', () => {
  assert.equal(
    filename(),
    ___filename,
    'filename should return the current file'
  )
})

test('isMain()', () => {
  assert.equal(isMain(), true, 'isMain should return true')
})

test('join()', () => {
  assert.equal(
    join('a', 'b', 'c'),
    `${___dirname}/a/b/c`,
    'join should join the given paths'
  )
})

test('requireJson()', () => {
  assert.equal(
    requireJson('./package.json').name,
    '@uscreen.de/common-esm',
    'requireJson should require a JSON file'
  )
})
