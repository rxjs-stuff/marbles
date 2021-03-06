import 'chai'

declare global {
  export namespace Chai {

    interface Assertion {
      subscribedWith(...subscriptionMarbles: string[]): Assertion
      subscription(subscriptionMarbles: string): Assertion
      marbleValues(values: any): Assertion
      originalContext(context: any): Assertion
    }

  }
}
