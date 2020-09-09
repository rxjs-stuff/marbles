import * as chai from 'chai'
import { chaiMarbles, config } from '@rxjs-stuff/marbles/chai'
import { mochaMarbles } from '@rxjs-stuff/marbles/mocha/browser'

chai.use(chaiMarbles)
mochaMarbles(config)
