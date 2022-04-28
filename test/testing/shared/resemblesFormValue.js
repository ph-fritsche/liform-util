const { resemblesFormValue } = require('../../../src/testing/shared/resemblesFormValue')

it.each([
    ['foo', 'foo', true],
    ['1', 1, true],
    ['0', 0, true],
    ['false', false, true],
    ['', '', true],
    ['', null, true],
    ['', undefined, true],
    ['', [], true],
    ['', 'foo', false],
    ['', 1, false],
    ['', 0, false],
    ['', false, false],
    ['', ['0'], false],
    [0, 0, true],
    [0, '0', true],
    [0, '', false],
    [0, false, false],
    [1, 1, true],
    [1, '1', true],
    [1, 'foo', false],
    [1, true, false],
    [true, true, true],
    [true, 'true', true],
    [true, '1', true],
    [true, 1, true],
    [true, 'foo', true],
    [true, ['a'], true],
    [true, '0', false],
    [true, 0, false],
    [true, [], false],
    [true, '', false],
    [false, false, true],
    [false, 'false', true],
    [false, '', true],
    [false, [], true],
    [false, 0, true],
    [false, null, true],
    [false, '0', true],
    [null, null, true],
    [null, undefined, true],
    [null, '', true],
    [null, '0', false],
    [null, false, false],
    [null, 0, false],
    [undefined, null, true],
    [undefined, undefined, true],
    [undefined, '', true],
    [undefined, '0', false],
    [undefined, false, false],
    [undefined, 0, false],
    [[], '', true],
    [[], null, true],
    [[], undefined, true],
    [[], true, false],
    [[], 0, false],
    [['a', 'b'], 'a,b', true],
    [['a', 'b'], true, false],
])('Compare to %p - %p should result in %p', (expectedValue, receivedValue, expectedComparison) => {
    expect(resemblesFormValue(expectedValue, receivedValue)).toBe(expectedComparison)
})