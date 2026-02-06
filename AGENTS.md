# Agent Guidelines for @uscreen.de/common-esm

This document provides guidelines for AI coding agents working on this repository.

## Project Overview

**@uscreen.de/common-esm** is a utility library that bridges ESM and CommonJS patterns, providing familiar CommonJS features like `__dirname`, `__filename`, and `require.main === module` equivalents in ESM modules.

- **Language**: JavaScript (ESM modules, Node.js)
- **Package Manager**: pnpm (v10.28.2+)
- **Test Framework**: Node.js built-in test runner with c8 for coverage
- **Supported Node versions**: 20, 22, 24

## Build, Lint & Test Commands

### Installation
```bash
pnpm install
```

### Testing
```bash
# Run all tests with coverage
pnpm test

# Run tests with HTML coverage report
pnpm test:cov

# Run tests with LCOV output (used in CI)
pnpm test:ci

# Run a single test file
node --test index.constructor.test.js
node --test index.function.test.js

# Run tests matching a pattern
node --test --test-name-pattern="dirname"
```

### Linting
```bash
# Check for linting errors
npx eslint .

# Auto-fix linting errors
npx eslint . --fix
```

### Coverage
- Coverage reports are in `coverage/` directory (gitignored)
- Minimum coverage thresholds are enforced in CI via c8
- Coverage badges are updated via Coveralls integration

## Code Style Guidelines

### Module System
- **ALWAYS use ESM syntax** - this is a pure ESM package (`"type": "module"` in package.json)
- Use `.js` extension for all JavaScript files
- Never use CommonJS (`require`, `module.exports`)

### Import Style
```javascript
// ✅ Correct - named imports from node: protocol
import { readFileSync } from 'fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'

// ✅ Correct - external package imports
import { dirname, filename, join } from 'desm'

// ✅ Correct - local imports with .js extension
import CommonESM from './index.js'

// ❌ Wrong - missing .js extension
import CommonESM from './index'

// ❌ Wrong - CommonJS syntax
const CommonESM = require('./index')
```

### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for strings
- **Semicolons**: Optional but not consistently used - follow existing patterns in the file
- **Line length**: Keep reasonable, no strict limit
- **Trailing commas**: Not required but acceptable in multiline

### Naming Conventions
- **Functions**: camelCase - `requireJson`, `isMain`
- **Constants**: camelCase for function references
- **Private/internal**: No special prefix (JavaScript module scoping is sufficient)
- **Test descriptions**: Plain English strings in `test('description', ...)`

### Function Style
```javascript
// ✅ Preferred - concise arrow functions for pure utilities
const requireJson = (metaUrl, file) =>
  JSON.parse(readFileSync(join(metaUrl, file)))

// ✅ Acceptable - function declarations for constructors
function CommonESM(metaUrl) {
  // ...
  return { /* ... */ }
}

// ✅ Correct - arrow functions in returns
return {
  join: (...args) => join(metaUrl, ...args),
  requireJson: (file) => requireJson(metaUrl, file)
}
```

### Error Handling
- **Let errors bubble up** - this is a low-level utility library
- No try-catch in production code unless specifically needed
- Let Node.js native errors (file not found, JSON parse errors) propagate
- Trust the consumer to handle errors appropriately

### Type Safety
- **No TypeScript** - pure JavaScript project
- Use JSDoc comments sparingly, only when they add value
- Rely on descriptive parameter names for clarity
- Keep functions small and single-purpose

### Testing Conventions
```javascript
// ✅ Use Node.js test runner
import { test } from 'node:test'
import assert from 'node:assert/strict'

// ✅ Descriptive test names
test('__dirname', () => {
  assert.equal(
    __dirname,
    expectedValue,
    '__dirname should return the current directory'
  )
})

// ✅ Use assert.equal for comparisons
assert.equal(actual, expected, 'descriptive message')

// ❌ Don't use console.log in tests
```

## Project Structure

```
.
├── index.js                      # Main entry point - all logic here
├── index.constructor.test.js     # Tests for CommonESM constructor pattern
├── index.function.test.js        # Tests for functional API
├── package.json                  # Package configuration
├── .eslintrc                     # ESLint configuration
├── .taprc                        # Test runner configuration
└── README.md                     # User documentation
```

## Key Implementation Patterns

### Pure Functions
All utilities should be pure functions - given the same input (`import.meta.url`), always return the same output:

```javascript
const isMain = (metaUrl) => filename(metaUrl) === process.argv[1]
```

### Constructor Pattern
The default export returns an object with bound methods:

```javascript
function CommonESM(metaUrl) {
  return {
    __dirname: dirname(metaUrl),
    join: (...args) => join(metaUrl, ...args)
  }
}
```

### Dual API
Maintain both constructor and functional exports:
- Constructor: `new CommonESM(import.meta.url)` or `CommonESM(import.meta.url)`
- Functions: `dirname(import.meta.url)`

## Continuous Integration

- **GitHub Actions** runs on pushes and PRs to `main`
- Tests run on Node 20, 22, and 24
- Coverage is uploaded to Coveralls
- Dependabot auto-merge is configured for passing dependency updates

## Git Workflow

- **Main branch**: `main`
- Commit messages: Clear, concise, imperative mood
- No required commit message format
- Keep commits atomic and focused

## Dependencies

### Production
- `desm` - Core functionality for dirname, filename, join

### Development
- `@uscreen.de/eslint-config-prettystandard-node` - ESLint configuration
- `c8` - Coverage reporting

**⚠️ Keep dependencies minimal** - this is a foundational utility package.

## Making Changes

1. **Read existing code first** - the entire codebase is ~40 lines
2. **Maintain backward compatibility** - this is a published npm package
3. **Add tests for new features** - both constructor and functional patterns
4. **Update README.md** if API changes
5. **Follow existing patterns** - consistency is critical for small libraries
6. **Run tests before committing**: `pnpm test`

## Notes for Agents

- This is a **utility library**, not an application - prioritize simplicity and reliability
- **Every line matters** - keep the codebase lean and focused
- **Dual API support** is critical - any new feature needs both patterns
- **Don't add dependencies** without strong justification
- **Performance is secondary** to correctness and clarity
- Test files may be longer than implementation - this is expected and good
