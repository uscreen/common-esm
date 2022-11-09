# @uscreen.de/common-esm

> makes ESM a bit more commonJS

ESM still lacks some features that are common in commonJS. This package aims to fill that gap. 

## Prior art

The wonderfull [desm](https://www.npmjs.com/package/desm) package already provides us with `dirname`, `filename`, `join`. This package aims to decorate it with some more commonJS features.

## Install

```bash
npm install @uscreen.de/common-esm
```

## Usage

```js
import { dirname, filename, join, json, isMain } from '@uscreen.de/common-esm'

// --- provided by desm ---

// same as CommonJS __dirname
console.log(dirname(import.meta.url))

// same as CommonJS __filename
console.log(filename(import.meta.url))

// same as CommonJS path.join(__dirname, 'routes')
console.log(join(import.meta.url, 'routes'))

// same as CommonJS path.join(__dirname, '..', 'other')
console.log(join(import.meta.url, '..', 'other'))

// --- extras ---

// same as CommonJS require('./package.json')
console.log(requireJson(import.meta.url, './package.json'))

// same as CommonJS require.main === module
console.log(isMain(import.meta.url))
```

---

## License

Licensed under [MIT](./LICENSE).

Published, Supported and Sponsored by [u|screen](https://uscreen.de)
