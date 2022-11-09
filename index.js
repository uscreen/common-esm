import { readFileSync } from 'fs'
import desm, { dirname, filename, join } from 'desm'

/**
 * like const { name } = require('./package.json')
 */
const requireJson = (metaUrl, file) =>
  JSON.parse(readFileSync(join(metaUrl, file)))

/**
 * like if (!module.parent)
 */
const isMain = (metaUrl) => filename(metaUrl) === process.argv[1]

export { dirname, filename, join, requireJson, isMain }
export default desm
