const { normalizeFormValues } = require('../../../src/testing/shared/normalizeFormValues')

it('Create key value map', () => {
    expect(normalizeFormValues([
        { key: 'foo', value: 'fooValue' },
        { key: 'bar', value: 'barValue' },
        { key: 'bar', value: 'bazValue' },
    ])).toEqual({
        'foo': 'fooValue',
        'bar': 'bazValue',
    })

    expect(normalizeFormValues([
        { key: 'foo', value: 'fooValue' },
        { key: 'bar', value: 'barValue' },
        { key: 'bar', value: 'bazValue' },
    ])).toEqual({
        'foo': 'fooValue',
        'bar': 'bazValue',
    })
})

it('Resolve []', () => {
    expect(normalizeFormValues([
        { key: 'foo[]', value: 'foo0' },
        { key: 'foo[]', value: 'foo1' },
        { key: 'foo[]', value: 'foo2' },
    ])).toEqual({
        'foo[0]': 'foo0',
        'foo[1]': 'foo1',
        'foo[2]': 'foo2',
    })

    expect(normalizeFormValues([
        { key: 'foo[]', value: 'foo0' },
        { key: 'foo[]bar[]', value: 'foo1' },
        { key: 'foo[]bar[]', value: 'foo2' },
    ])).toEqual({
        'foo[0]': 'foo0',
        'foo[1]bar[0]': 'foo1',
        'foo[2]bar[0]': 'foo2',
    })

    expect(normalizeFormValues([
        { key: 'foo[2]', value: 'foo0' },
        { key: 'foo[]bar[]', value: 'foo1' },
        { key: 'foo[2]bar[]', value: 'foo2' },
        { key: 'foo[0]bar[]', value: 'foo3' },
        { key: 'foo[2]bar[]', value: 'foo4' },
    ])).toEqual({
        'foo[2]': 'foo0',
        'foo[3]bar[0]': 'foo1',
        'foo[2]bar[0]': 'foo2',
        'foo[0]bar[0]': 'foo3',
        'foo[2]bar[1]': 'foo4',
    })
})
