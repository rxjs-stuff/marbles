# @rxjs-stuff/marbles

Provides a natural feeling integration with Mocha and Chai for RxJS "marbles" testing.

```typescript
import { expect } from 'chai'

describe.marbles('simple example', ({ cold }) => {
  it('emits and closes', () => {
    const example$ = cold('--a|')
    const expected =      '--a|'

    expect(example$).to.equal(expected)
  })  
}) 
```

# Configuration

**TypeScript - tsconfig.json**
Add `node_modules/@rxjs-stuff/marbles/@types` to your `tsconfig.json`'s `typeRoots`:

```json
{
  "compilerOptions": {
    ...
    "typeRoots": [
      "node_modules/@rxjs-stuff/marbles/@types",
      "node_modules/@types"
    ] 
  }
}
```

`@rxjs-stuff/marbles` augments ambient types from Mocha and Chai in order to add the `.marbles`
modifier, as well as additional Chai assertions. Since these do not require importing from
`@rxjs-stuff/marbles` in the modules where those would be referenced, the additional `typeRoots`
entry is required to allow TypeScript to pick up the augmented types.

## NodeJS
 
Add the Mocha and Chai integrations from `@rxjs-stuff/marbles` in your `mocha.config.js` file:

```javascript
const chai = require('chai')

const { chaiMarbles, config } = require('@rxjs-stuff/marbles/chai')
chai.use(chaiMarbles)
require('@rxjs-stuff/marbles/mocha/node').mochaMarbles(config)
```

This file must be run before any specs, so it is easiest to include as a `require` entry in your
mocha config.

## Karma (Browsers)

Use with either the `webpack-karma` plugin or the Angular CLI, and load `@rxjs-stuff/marbles/karma`
from your entry point. No other changes are required for `karma.conf.js`.

### Angular

Include `@rxjs-stuff/marbles/karma` after Angular's initialization:

```typescript
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())

import '@rxjs-stuff/marbles/karma'
```

### Non-Angular
For non-Angular uses, use the "bundle" approach for loading your test files:

```typescript
import '@rxjs-stuff/marbles/karma'

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    keys(): string[]
    <T>(id: string): T
  }
}

const context = require.context('./src', true, /\.spec\.ts$/)
context.keys().map(context)
```
