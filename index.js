import { readFileSync } from 'node:fs'
import process from 'node:process'
import { dirname, filename, join } from 'desm'

/**
 * like const { name } = require('./package.json')
 */
const requireJson = (metaUrl, file) =>
  JSON.parse(readFileSync(join(metaUrl, file)))

/**
 * like if (!module.parent)
 */
const isMain = metaUrl => filename(metaUrl) === process.argv[1]

/**
 * pure function
 * import CommonESM = from '@uscreen.de/common-esm'
 * const { __dirname, __filename } = new CommonESM(import.meta.url)
 */
function CommonESM(metaUrl) {
  const __dirname = dirname(metaUrl)
  const __filename = filename(metaUrl)
  const __isMain = isMain(metaUrl)

  return {
    __dirname,
    __filename,
    __isMain,
    dirname: () => dirname(metaUrl),
    filename: () => filename(metaUrl),
    isMain: () => isMain(metaUrl),
    join: (...args) => join(metaUrl, ...args),
    requireJson: file => requireJson(metaUrl, file)
  }
}

export { dirname, filename, isMain, join, requireJson }
export default CommonESM
