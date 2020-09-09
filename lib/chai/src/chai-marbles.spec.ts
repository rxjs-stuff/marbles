import { expect } from 'chai'

describe.marbles('chai-marbles', ({ cold }) => {

  it('can test observables', () => {
    expect(cold('a-b-c-d-e-f')).to.equal('a-b-c-d-e-f')
  })

  it('can test observables with marble values', () => {
    expect(cold('a-b-c')).with.marbleValues({a: 'a', b: 'b', c: 'c'}).to.equal('a-b-c')
  })

  xit('shows the right stack trace', () => {
    expect(cold('a-b-c-d')).equal('a-bcd')
  })

})
