import '../../src/testing'

const body = document.createElement('body')
body.innerHTML = `
    <form id='testform'>
        <input type='text' name='foo' value='fooValue'/>
        <input type='number' name='bar' value=''/>
        <input type='checkbox' name='baz' value='fooValue' checked/>
        <select multiple name='choice'><option value='foo'/><option selected value='bar'/><option selected value='baz'/></select>
        <select multiple name='choiceB[]'><option value='foo'/><option selected value='bar'/><option selected value='baz'/></select>
    </form>
`

const form = body.querySelector('#testform')

it('Pass for resembling values', () => {
    expect(() => {
        expect(form).toResembleFormValues({
            'foo': true,
            'bar': undefined,
            'baz': true,
            'choice': 'bar,baz',
            'choiceB[0]': true,
            'choiceB[1]': 'baz',
        })
    }).not.toThrowError()

    expect(() => {
        expect(form).toResembleFormValues({
            'foo': 'fooValue',
            'bar': '',
            'baz': 'fooValue',
            'choice': ['bar', 'baz'],
            'choiceB[0]': 'bar',
            'choiceB[1]': 'baz',
        })
    }).not.toThrowError()
})

it('Fail for missing field', () => {
    expect(() => {
        expect(form).toResembleFormValues({
            'foo': 'fooValue',
            'bar': '',
            'baz': 'fooValue',
            'choice': ['bar', 'baz'],
            'choiceB[0]': 'bar',
            'choiceB[1]': 'baz',
            'anotherField': 'fooValue',
        })
    }).toThrowErrorMatchingSnapshot()
})

it('Fail for wrong value', () => {
    expect(() => {
        expect(form).toResembleFormValues({
            'foo': 'fooValue',
            'bar': 0,
            'baz': 'fooValue',
            'choice': ['bar', 'baz'],
            'choiceB[0]': 'bar',
            'choiceB[1]': 'baz',
        })
    }).toThrowErrorMatchingSnapshot()
})

it('Fail for extra field', () => {
    expect(() => {
        expect(form).toResembleFormValues({
            'foo': 'fooValue',
        })
    }).toThrowErrorMatchingSnapshot()
})
