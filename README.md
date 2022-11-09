# @uscreen.de/common-esm

> make ESM a bit more commonJS

ESM still lacks some features that are "common" in commonJS. This package aims to fill that gap. 

## Prior art

* The [desm](https://www.npmjs.com/package/desm) package already provides us with `dirname`, `filename`, `join`. Straight simple and robust. This package aims to decorate it with some more commonJS features.

* And there is [esm-utils](https://www.npmjs.com/package/esm-utils) which provides a bigger api surface. But I found its codebase a bit too complex and it does not provide a solution for `if (require.main === module)`, either.

## Install

```bash
npm install @uscreen.de/common-esm
```

## Usage

The default export is a function that returns an object with "common" commonJS properties and functions that depend on the `import.meta.url`:

```js
// file:/app/demo/index.js
import CommonESM from '@uscreen.de/common-esm'

const { __dirname, __filename, __isMain, join, requireJson } = new CommonESM(import.meta.url)

/**
 * properties
 */
console.log(__dirname) // /app/demo
console.log(__filename) // /app/demo/index.js
console.log(__isMain) // true with node ./index.js like require.main === module

/**
 * functions
 */
console.log(join('foo', 'bar')) // /app/demo/foo/bar
console.log(requireJson('./package.json')) // { name: '@uscreen.de/common-esm', ... }
```

Inherited from [desm](https://www.npmjs.com/package/desm) there are the following functional exports:

```js
// file:/app/demo/index.js
import { dirname, filename, join, requireJson, isMain } from '@uscreen.de/common-esm'

/**
 * --- as provided by desm ---
 */
console.log(dirname(import.meta.url)) // /app/demo
console.log(filename(import.meta.url)) // /app/demo/index.js
console.log(join(import.meta.url, 'routes')) // /app/demo/routes
console.log(join(import.meta.url, '..', 'other')) // /app/other

/**
 * --- extras ---
 */
console.log(requireJson(import.meta.url, './package.json')) // { name: '@uscreen.de/common-esm', ... }
console.log(isMain(import.meta.url)) // true with node ./index.js like require.main === module

```
---

## License

Licensed under [MIT](./LICENSE).

Published, Supported and Sponsored by [u|screen](https://uscreen.de)
