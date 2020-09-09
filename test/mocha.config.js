const chai = require('chai')

const { chaiMarbles, config } = require('../lib/chai')
chai.use(chaiMarbles)
require('../lib/mocha/node').mochaMarbles(config)
