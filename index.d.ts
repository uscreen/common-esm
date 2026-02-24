/**
 * Read and parse a JSON file relative to the calling module.
 * ESM equivalent of `const data = require('./package.json')`.
 *
 * @param metaUrl - The calling module's `import.meta.url`.
 * @param file - Relative path to the JSON file.
 * @returns The parsed JSON content.
 *
 * @example
 * ```js
 * import { requireJson } from '@uscreen.de/common-esm'
 * const pkg = requireJson(import.meta.url, './package.json')
 * console.log(pkg.name)
 * ```
 */
export function requireJson(metaUrl: string, file: string): any

/**
 * Check whether the calling module is the main entry point of the process.
 * ESM equivalent of `require.main === module` or `if (!module.parent)`.
 *
 * @param metaUrl - The calling module's `import.meta.url`.
 * @returns `true` if the module was invoked directly via `node`.
 *
 * @example
 * ```js
 * import { isMain } from '@uscreen.de/common-esm'
 * if (isMain(import.meta.url)) {
 *   console.log('running as main script')
 * }
 * ```
 */
export function isMain(metaUrl: string): boolean

/**
 * Get the directory name of the calling module.
 * ESM equivalent of CommonJS `__dirname`.
 * Re-exported from the `desm` package.
 *
 * @param metaUrl - The calling module's `import.meta.url`.
 * @returns The absolute directory path of the module.
 *
 * @example
 * ```js
 * import { dirname } from '@uscreen.de/common-esm'
 * const dir = dirname(import.meta.url)
 * ```
 */
export function dirname(metaUrl: string): string

/**
 * Get the file name of the calling module.
 * ESM equivalent of CommonJS `__filename`.
 * Re-exported from the `desm` package.
 *
 * @param metaUrl - The calling module's `import.meta.url`.
 * @returns The absolute file path of the module.
 *
 * @example
 * ```js
 * import { filename } from '@uscreen.de/common-esm'
 * const file = filename(import.meta.url)
 * ```
 */
export function filename(metaUrl: string): string

/**
 * Join path segments relative to the calling module's directory.
 * Combines `dirname(metaUrl)` with the provided path segments.
 * Re-exported from the `desm` package.
 *
 * @param metaUrl - The calling module's `import.meta.url`.
 * @param args - Path segments to join relative to the module's directory.
 * @returns The resolved absolute path.
 *
 * @example
 * ```js
 * import { join } from '@uscreen.de/common-esm'
 * const configPath = join(import.meta.url, 'config', 'settings.json')
 * ```
 */
export function join(metaUrl: string, ...args: string[]): string

interface CommonESMInstance {
  /** Absolute directory path of the module (like CommonJS `__dirname`). */
  __dirname: string

  /** Absolute file path of the module (like CommonJS `__filename`). */
  __filename: string

  /** `true` if the module is the main entry point of the process. */
  __isMain: boolean

  /** Returns the directory name of the module. */
  dirname: () => string

  /** Returns the file name of the module. */
  filename: () => string

  /** Returns whether the module is the main entry point. */
  isMain: () => boolean

  /**
   * Join path segments relative to the module's directory.
   * @param args - Path segments to append.
   */
  join: (...args: string[]) => string

  /**
   * Read and parse a JSON file relative to the module.
   * @param file - Relative path to the JSON file.
   */
  requireJson: (file: string) => any
}

/**
 * Create a CommonESM instance with all utilities bound to the given
 * `import.meta.url`. Can be called with or without `new`.
 *
 * @param metaUrl - The calling module's `import.meta.url`.
 * @returns An object providing `__dirname`, `__filename`, `__isMain`, and
 *   bound helper methods (`dirname`, `filename`, `isMain`, `join`, `requireJson`).
 *
 * @example
 * ```js
 * import CommonESM from '@uscreen.de/common-esm'
 * const { __dirname, __filename, join } = CommonESM(import.meta.url)
 * console.log(__dirname)
 * console.log(join('lib', 'utils.js'))
 * ```
 */
declare function CommonESM(metaUrl: string): CommonESMInstance
export default CommonESM
