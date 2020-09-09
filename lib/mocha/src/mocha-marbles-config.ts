import { AssertDeepEqualFn, MarblesHelpers } from '@rxjs-stuff/marbles'

export interface TestHookFn {
  (helpers: MarblesHelpers, context: any): void
}

export interface MochaMarblesConfig {
  assertDeepEqual: AssertDeepEqualFn
  beforeEach?: TestHookFn
  afterEach?: TestHookFn
}
