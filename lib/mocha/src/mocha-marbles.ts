import { MarblesHelpers, marblesTesting } from '@rxjs-stuff/marbles'

import { MochaMarblesConfig } from './mocha-marbles-config'

function setUpMarblesContext(config: MochaMarblesConfig, context: any): void {

  function makeMarblesTest(test: Function): Function {
    return function marblesTest(title: string, fn: (helpers: MarblesHelpers) => void): void {
      if (typeof fn === 'function') {
        return test(title, function (this: any) {
          if (typeof config.beforeEach === 'function') {
            config.beforeEach(MarblesHelpers, this)
          }
          const returnValue = MarblesHelpers.run((helpers) => {
            fn.call(this, helpers)
          })
          if (typeof config.afterEach === 'function') {
            config.afterEach(MarblesHelpers, this)
          }
          return returnValue
        })
      }
      return test(title, fn)
    }
  }

  function makeMarblesSuite(context: any, action: Mocha.SuiteFunction, marblesEnabled?: boolean): Function {

    return function marblesSuite(this: any, title: string, fn: (helpers: MarblesHelpers) => void): Mocha.Suite {
      const { it, xit } = context
      context.it = makeMarblesTest(it)
      context.it.only = makeMarblesTest(it.only)
      context.it.skip = makeMarblesTest(it.skip)
      context.it.noMarbles = it
      context.xit = makeMarblesTest(xit)
      context.xit.noMarbles = xit

      return action(title, function (this: Mocha.Suite) {
        this.marblesEnabled = typeof marblesEnabled === 'undefined' ? this.marblesEnabled : marblesEnabled
        if (this.marblesEnabled) {
          marblesTesting()
          return fn.call(this, MarblesHelpers)
        }
        return fn.call(this, undefined)
      })
    }
  }

  const describe = context.describe
  context.describe = makeMarblesSuite(context, describe)
  context.describe.only = makeMarblesSuite(context, describe.only)
  context.describe.skip = makeMarblesSuite(context, describe.skip)
  context.describe.marbles = makeMarblesSuite(context, describe, true)
  context.describe.marbles.only = makeMarblesSuite(context, describe.only, true)
  context.describe.marbles.skip = makeMarblesSuite(context, describe.skip, true)
  context.describe.noMarbles = makeMarblesSuite(context, describe, false)
  context.xdescribe.marbles = makeMarblesSuite(context, context.xdescribe, true)

}

export const setUpMochaMarbles = (mocha: typeof Mocha, config: MochaMarblesConfig, targetContext?: any) => {
  MarblesHelpers.init(config.assertDeepEqual)
  const setupContext = setUpMarblesContext.bind(undefined, config)
  const bdd = mocha.interfaces.bdd.bind(mocha.interfaces)
  mocha.interfaces.bdd = function marblesBddInterface(suite: Mocha.Suite) {
    bdd(suite)
    const { EVENT_FILE_PRE_REQUIRE } = mocha.Suite.constants

    suite.on(EVENT_FILE_PRE_REQUIRE, setupContext)
  }

  if (targetContext) {
    setupContext(targetContext)
  }
}
