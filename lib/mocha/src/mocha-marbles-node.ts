import * as mocha from 'mocha'
import { setUpMochaMarbles } from './mocha-marbles'
import { MochaMarblesConfig } from './mocha-marbles-config'

export const mochaMarbles = (config: MochaMarblesConfig) => {
  return setUpMochaMarbles(mocha, config)
}
