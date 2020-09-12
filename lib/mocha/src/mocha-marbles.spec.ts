import { expect } from 'chai'
import { NEVER } from 'rxjs'

describe('mocha-marbles', () => {

  describe('without marbles', () => {
    it('works', () => {
      expect(true).to.be.true
    })

    it('does not attempt to compare observables to strings', () => {
      expect(NEVER).not.to.equal('-')
    })
  })

  describe.marbles('with marbles', () => {
    it('works', () => {
      expect(true).to.be.true
    })

    it('compares observables with marbles strings', () => {
      expect(NEVER).to.equal('-')
    })

    describe('implicit nested', () => {
      it('works', () => {
        expect(true).to.be.true
      })

      it('compares observables with marbles strings', () => {
        expect(NEVER).to.equal('-')
      })
    })
  })

})

