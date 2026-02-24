import assert from 'node:assert/strict'
import { dirname as dirnamePath } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, filename, isMain, join, requireJson } from './index.js'

const __dirname = dirnamePath(fileURLToPath(import.meta.url))
const __filename = fileURLToPath(import.meta.url)

test('dirname', () => {
  assert.equal(
    dirname(import.meta.url),
    __dirname,
    'dirname should return the current directory'
  )
})

test('filename', () => {
  assert.equal(
    filename(import.meta.url),
    __filename,
    'filename should return the current file'
  )
})

test('join', () => {
  assert.equal(
    join(import.meta.url, 'a', 'b', 'c'),
    `${__dirname}/a/b/c`,
    'join should join the given paths'
  )
})

test('requireJson', () => {
  assert.equal(
    requireJson(import.meta.url, './package.json').name,
    '@uscreen.de/common-esm',
    'requireJson should require a JSON file'
  )
})

test('isMain', () => {
  assert.equal(isMain(import.meta.url), true, 'isMain should return true')
})
