import { isShallowEqual } from '../../src'

it('Compare arrays', () => {
    expect(isShallowEqual(
        ['a', 'b', 'c'],
        ['a', 'b', 'c'],
    )).toEqual(true)

    expect(isShallowEqual(
        ['a', 'c', 'b'],
        ['a', 'b', 'c'],
    )).toEqual(false)

    expect(isShallowEqual(
        ['a', 'b'],
        ['a', 'b', 'c'],
    )).toEqual(false)

    expect(isShallowEqual(
        ['a', 'b', 'c'],
        ['a', 'b'],
    )).toEqual(false)

    expect(isShallowEqual(
        ['a', 'b', 'c'],
        'abc',
    )).toEqual(false)
})

it('Compare objects', () => {
    expect(isShallowEqual(
        { a: 'a', b: 'b', c: 'c' },
        { a: 'a', b: 'b', c: 'c' },
    )).toEqual(true)

    expect(isShallowEqual(
        { a: 'a', c: 'c', b: 'b' },
        { a: 'a', b: 'b', c: 'c' },
    )).toEqual(true)

    expect(isShallowEqual(
        { a: 'a', b: 'b', c: 'c' },
        { a: 'a', b: 'd', c: 'c' },
    )).toEqual(false)

    expect(isShallowEqual(
        { a: 'a', b: 'b' },
        { a: 'a', b: 'b', c: 'c' },
    )).toEqual(false)

    expect(isShallowEqual(
        { a: 'a', b: 'b', c: 'c' },
        { a: 'a', b: 'b' },
    )).toEqual(false)

    expect(isShallowEqual(
        { a: 'a', b: 'b', c: 'c' },
        ['a', 'b', 'c'],
    )).toEqual(false)

    expect(isShallowEqual(
        { a: 'a', b: 'b', c: 'c' },
        'abc',
    )).toEqual(false)
})

it('Compare scalars', () => {
    expect(isShallowEqual(
        'a',
        'a',
    )).toEqual(true)

    expect(isShallowEqual(
        '2',
        2,
    )).toEqual(true)

    expect(isShallowEqual(
        'a',
        'b',
    )).toEqual(false)

    expect(isShallowEqual(
        '2',
        1,
    )).toEqual(false)
})
