# Agent Guidelines for @uscreen.de/common-esm

Utility library bridging ESM and CommonJS patterns, providing `__dirname`,
`__filename`, and `require.main === module` equivalents in ESM modules.

- **Language**: JavaScript (ESM, Node.js)
- **Package Manager**: pnpm (v10.28.2+)
- **Test Framework**: Node.js built-in test runner with c8 for coverage
- **Supported Node versions**: 20, 22, 24

## Build, Lint & Test Commands

```bash
pnpm install              # Install dependencies
pnpm test                 # Run all tests with coverage
pnpm lint                 # Check for lint errors
pnpm lint:fix             # Auto-fix lint errors

# Run a single test file
node --test index.constructor.test.js
node --test index.function.test.js

# Run tests matching a name pattern
node --test --test-name-pattern="dirname"

# CI variants
pnpm test:cov             # HTML + text coverage report
pnpm test:ci              # LCOV output for CI
```

## Project Structure

```
index.js                      # Main entry point (~39 lines, all logic here)
index.d.ts                    # TypeScript declarations
index.constructor.test.js     # Tests for CommonESM constructor pattern
index.function.test.js        # Tests for functional API
eslint.config.js              # ESLint flat config (@antfu/eslint-config)
manifest.json                 # Version manifest
```

## Code Style Guidelines

### Module System
- **ALWAYS use ESM syntax** (`"type": "module"` in package.json)
- Use `.js` extension in all local imports
- Never use CommonJS (`require`, `module.exports`)

### Import Style
```javascript
// Node builtins: use node: protocol
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'

// External packages
import { dirname, filename, join } from 'desm'

// Local imports: always include .js extension
import CommonESM from './index.js'
```

### Formatting (enforced by @antfu/eslint-config)
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes
- **Semicolons**: None (antfu default)
- **Trailing commas**: Never (`comma-dangle: ['error', 'never']`)
- **Curly braces**: Required for multi-line, consistent (`curly: multi-line, consistent`)
- **Top-level functions**: Arrow functions allowed (`antfu/top-level-function: off`)

### Naming Conventions
- **Functions**: camelCase (`requireJson`, `isMain`)
- **Constants**: camelCase for function references
- **Private/internal**: No prefix needed (module scoping is sufficient)
- **Test names**: Plain English strings (`test('__dirname', ...)`)

### Function Style
```javascript
// Preferred: concise arrow functions for pure utilities
const requireJson = (metaUrl, file) =>
  JSON.parse(readFileSync(join(metaUrl, file)))

// Function declarations for constructors
function CommonESM(metaUrl) {
  return { __dirname: dirname(metaUrl), /* ... */ }
}
```

### Error Handling
- **Let errors bubble up** - this is a low-level utility library
- No try-catch in production code unless specifically needed
- Let Node.js native errors propagate to the consumer

### Type Safety
- **No TypeScript** in source - pure JavaScript
- TypeScript declarations are maintained in `index.d.ts`
- Use JSDoc comments sparingly, only when they add real value

### Testing Conventions
```javascript
import assert from 'node:assert/strict'
import { test } from 'node:test'

test('__dirname', () => {
  assert.equal(actual, expected, 'descriptive failure message')
})
```
- Use `assert.equal` for comparisons
- Always include a descriptive third argument (failure message)
- No `console.log` in tests

## Key Implementation Patterns

### Dual API
Every feature must support both patterns:
- **Constructor**: `const { __dirname } = CommonESM(import.meta.url)`
- **Functional**: `dirname(import.meta.url)`

### Pure Functions
All utilities are pure - given the same `import.meta.url`, always return the same output.

## Dependencies

### Production
- `desm` - Core dirname/filename/join functionality

### Development
- `@antfu/eslint-config` - ESLint configuration (flat config)
- `eslint-plugin-format` - Formatter integration
- `c8` - Coverage reporting

**Keep dependencies minimal** - this is a foundational utility package.

## CI

- GitHub Actions on pushes and PRs to `main`
- Tests run on Node 20, 22, 24
- Coverage uploaded to Coveralls
- Dependabot auto-merge for passing dependency updates

## Making Changes

1. Read existing code first - the entire codebase is ~39 lines
2. **Maintain backward compatibility** - this is a published npm package
3. Add tests for new features - both constructor and functional patterns
4. Update `index.d.ts` if API changes
5. Update `README.md` if API changes
6. Follow existing patterns - consistency is critical
7. Run `pnpm test` before committing
8. Run `pnpm lint` to check style compliance

## Notes for Agents

- This is a **utility library**, not an application - prioritize simplicity
- **Dual API support** is critical - any new feature needs both patterns
- **Don't add dependencies** without strong justification
- Test files may be longer than implementation - this is expected and good
- The entire codebase is intentionally tiny; every line matters
