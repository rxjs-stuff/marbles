import { MochaMarblesConfig } from '@rxjs-stuff/marbles/mocha'

import { afterEach, assertDeepEqual, beforeEach, chaiMarbles } from './src/chai-marbles'

export { chaiMarbles }
export const config: MochaMarblesConfig = { assertDeepEqual, beforeEach, afterEach }
