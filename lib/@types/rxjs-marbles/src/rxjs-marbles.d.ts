import * as chai from 'chai'
import * as mocha from 'mocha'
import { MarblesHelpers } from '@rxjs-stuff/marbles'

declare global {
  export namespace Mocha {

    interface ExclusiveMarblesSuiteFunction {
      (title: string): Suite
      (title: string, fn: (this: Suite, helpers?: MarblesHelpers) => void): Suite
    }

    interface PendingMarblesSuiteFunction {
      (title: string, fn: (this: Suite, helpers?: MarblesHelpers) => void): Suite
    }

    interface MarblesSuiteFunction {
      (title: string): Suite
      (title: string, fn: (this: Suite, helpers?: MarblesHelpers) => void): Suite
      only: ExclusiveMarblesSuiteFunction
      skip: PendingMarblesSuiteFunction
    }

    interface PendingSuiteFunction {
      marbles: MarblesSuiteFunction
    }

    interface SuiteFunction {
      marbles: MarblesSuiteFunction
    }

    interface TestFunction {
      noMarbles: TestFunction
    }

  }

  export namespace Chai {
    interface Assertion {
      subscribedWith(...subscriptionMarbles: string[]): Assertion
      subscription(subscriptionMarbles: string): Assertion
      marbleValues(values: any): Assertion
      originalContext(context: any): Assertion
    }
  }
}
