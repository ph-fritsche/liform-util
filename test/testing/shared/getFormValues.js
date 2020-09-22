const { getFormValues } = require('../../../src/testing/shared/getFormValues')

const body = document.createElement('body')

it('Get input in form', () => {
    body.innerHTML = `
        <input type='text' name='foo' value='fooValue'/>
        <form id='testform'>
            <input type='text' name='bar' value='barValue'/>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'bar', value: 'barValue' },
    ])
})

it('Get associated input', () => {
    body.innerHTML = `
        <input form='testform' type='text' name='foo' value='fooValue'/>
        <form id='testform'>
            <input type='text' name='bar' value='barValue'/>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'foo', value: 'fooValue' },
        { key: 'bar', value: 'barValue' },
    ])

    body.innerHTML = `
        <input form='testform' type='text' name='foo' value='fooValue'/>
        <form id='testform'>
            <input form='anotherform' type='text' name='bar' value='barValue'/>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'foo', value: 'fooValue' },
    ])
})

it('Get textarea', () => {
    body.innerHTML = `
        <form id='testform'>
            <textarea name='foo'>bar</textarea>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'foo', value: 'bar' },
    ])
})

it('Get select value', () => {
    body.innerHTML = `
        <form id='testform'>
            <select name='field'>
                <option>foo</option>
                <option selected>bar</option>
                <option value='baz'>BAZ</option>
            </select>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'field', value: 'bar' },
    ])

    body.innerHTML = `
        <form id='testform'>
            <select name='field'>
                <option>foo</option>
                <option>bar</option>
                <option selected value='baz'>BAZ</option>
            </select>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'field', value: 'baz' },
    ])

    body.innerHTML = `
        <form id='testform'>
            <select name='field' multiple>
                <option>foo</option>
                <option selected>bar</option>
                <option selected value='baz'>BAZ</option>
            </select>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'field', value: ['bar', 'baz'] },
    ])

    body.innerHTML = `
        <form id='testform'>
            <select name='field[]' multiple>
                <option>foo</option>
                <option selected>bar</option>
                <option selected value='baz'>BAZ</option>
            </select>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'field[]', value: 'bar' },
        { key: 'field[]', value: 'baz' },
    ])
})

it('Get checkbox input', () => {
    body.innerHTML = `
        <form id='testform'>
            <input type='checkbox' name='fieldA' checked/>
            <input type='checkbox' name='fieldB'/>
            <input type='checkbox' name='fieldC' value='foo' checked/>
            <input type='checkbox' name='fieldD' value='bar'/>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'fieldA', value: true },
        { key: 'fieldB', value: false },
        { key: 'fieldC', value: 'foo' },
    ])
})

it('Get radio input', () => {
    body.innerHTML = `
        <form id='testform'>
            <input type='radio' name='fieldA' value='foo'/>
            <input type='radio' name='fieldA' value='bar'/>
            <input type='radio' name='fieldA' value='baz'/>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
    ])

    body.innerHTML = `
        <form id='testform'>
            <input type='radio' name='fieldA' value='foo'/>
            <input type='radio' name='fieldA' value='bar' checked/>
            <input type='radio' name='fieldA' value='baz'/>
        </form>
    `

    expect(getFormValues(body.querySelector('#testform'))).toEqual([
        { key: 'fieldA', value: 'bar' },
    ])
})

it('Throw error when element is not a form', () => {
    expect(() => getFormValues(document.createElement('div'))).toThrowErrorMatchingSnapshot()
})
