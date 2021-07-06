import sum from '../utils/sum'

describe('Sum function test', () => {
  it('should sum numbers correctly', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
