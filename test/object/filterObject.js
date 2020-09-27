import { filterObject } from '../../src/object/filterObject'

it('Return a new object of the same prototype with a subset of properties', () => {
    const proto = {
        foo: 'fooValue',
        bar: () => 'barValue',
    }
    const obj = Object.create(proto, {
        baz: {value: 'bazValue'},
        undefinedProp: {value: undefined},
    })

    const filteredUndefined = filterObject(obj)

    expect(filteredUndefined).not.toBe(obj)
    expect(Object.getPrototypeOf(filteredUndefined)).toBe(proto)
    expect(filteredUndefined).toEqual(obj)
    expect(filteredUndefined).not.toHaveProperty('undefinedProp')
    expect(filteredUndefined).toHaveProperty('foo', 'fooValue')
    expect(filteredUndefined).toHaveProperty('bar', proto.bar)
    expect(filteredUndefined).toHaveProperty('baz', obj.baz)

    const filteredBaz = filterObject(obj, (v, k) => k === 'undefinedProp')

    expect(filteredBaz).not.toBe(obj)
    expect(Object.getPrototypeOf(filteredBaz)).toBe(proto)
    expect(filteredBaz).not.toHaveProperty('baz')
    expect(filteredBaz).toHaveProperty('foo', 'fooValue')
    expect(filteredBaz).toHaveProperty('bar', proto.bar)
    expect(filteredBaz).toHaveProperty('undefinedProp', undefined)

})
