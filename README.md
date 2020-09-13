# @rxjs-stuff/marbles

Provides a natural feeling integration with Mocha and Chai for RxJS "marbles" testing.

See the [RxJS documentation on Marble Tests](https://rxjs-dev.firebaseapp.com/guide/testing/internal-marble-tests) for more information.

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

## Configuration

### TypeScript (NodeJS or Browser)
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

### NodeJS
 
Add the Mocha and Chai integrations from `@rxjs-stuff/marbles` in your `mocha.config.js` file:

```javascript
const chai = require('chai')

const { chaiMarbles, config } = require('@rxjs-stuff/marbles/chai')
chai.use(chaiMarbles)
require('@rxjs-stuff/marbles/mocha/node').mochaMarbles(config)
```

This file must be run before any specs, so it is easiest to include as a `require` entry in your
mocha config.

### Karma (Browsers)

Use with either the `webpack-karma` plugin or the Angular CLI, and load `@rxjs-stuff/marbles/karma`
from your entry point. No other changes are required for `karma.conf.js`.

#### Angular

Include `@rxjs-stuff/marbles/karma` after Angular's initialization:

```typescript
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())

import '@rxjs-stuff/marbles/karma'
```

#### Non-Angular
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


## Usage

`@rxjs-stuff/marbles` provides API extensions for Mocha and Chai that allow you to do marbles testing
using the same syntax and patterns you're already used to.

### Mocha
Use the `.marbles` chain when defining a suite to enable marbles testing for all tests and nested suites.
When marbles testing is enabled, the framework automatically takes care of setting up a `TestScheduler`
instance, as well as calling `TestScheduler.flush` for each test.

The suite definition function will be passed an object with the same `RunHelpers` utilities provided
when calling RxJS's `TestScheduler.run`. 

```
describe.marbles('example', ({ cold, hot }) => {
  ...
})
```

The usual suite definition modifiers are also supported when using `describe.marbles`:
```
xdescribe.marbles(..)
describe.marbles.only(..)
describe.marbles.skip(..)
```

To disable marbles testing within a nested suite, use `describe.noMarbles`:
```
describe.marbles('marbles tests', () => {

  describe.noMarbles('non marbles tests', () => {
  })

})
```

### Chai

`@rxjs-stuff/marbles/chai` adds several language chain functions and properties to assist in configuring
your assertions, and also overrides `equal` to automatically handle comparisons between Observables
and marbles strings.

#### Basic Comparison
You do not need to use `expectObservable` to compare marbles - Chai's existing `equal` assertion is
overridden to use `expectObservable` internally.

```typescript
import { expect } from 'chai'

describe.marbles('simple example', ({ cold }) => {
  it('emits and completes', () => {
    const example$ = cold('--a|')
    const expected =      '--a|'

    expect(example$).to.equal(expected)
  })  
}) 
```

#### Using marbleValues
Use `.with.marbleValues(...)` to compare observables using a value map for marbles events.

```typescript
import { expect } from 'chai'

describe.marbles('simple example', ({ cold }) => {
  it('emits and completes', () => {
    const marbleValues = { a: { foo: 'bar' }}
    const example$ = cold('--a|', marbleValues)
    const expected =      '--a|'

    expect(example$).with.marbleValues(marbleValues).to.equal(expected)
  })  
}) 
```

#### Comparing Subscriptions
Use the `subscribedWith(...)` assertion to compare subscriptions

```typescript
import { expect } from 'chai'

describe.marbles('simple example', ({ cold }) => {
  it('emits and completes', () => {
    const example$ = cold('--a|')
    const expected =      '--a|'
    const expectedSub =   '^--!'

    expect(example$).to.equal(expected)
    expect(example$).to.have.been.subscribedWith(expectedSub)
  })  
}) 
```

#### Controlling Subscriptions
Use the `subscription` language chain to provide finer control of subscription behavior during
the test run.

```typescript
import { expect } from 'chai'

describe.marbles('simple example', ({ hot }) => {
  it('emits and completes', () => {
    const example$ = hot('--a--a--a|')
    const sub =          '-----^---!'
    const expected =     '-----a--a|'

    expect(example$).with.subscription(sub).to.equal(expected)
  })  
}) 
```

### Utilities

#### marbleValues

Use the `marbleValues` helper function to generate typed marble values objects to use with the
`cold` and `hot` observable generators and `with.marbleValues(...)` language chain.

```typescript
// infers type to MarbleValues<string, 'a' | 'b'> // { a: string, b: string }
const myMarbles = marbleValues({ a: 'foo', b: 'bar' })
```

**boolean marble values**
The `booleanMarbles` object includes marble values for working with boolean values.

```typescript
export const booleanMarbles = marbleValues({
  f: false,
  t: true,
  u: undefined,
})
```
