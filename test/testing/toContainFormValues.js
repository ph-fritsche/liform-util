import '../../src/testing'

const body = document.createElement('body')
body.innerHTML = `
    <form id='testform'>
        <input type='text' name='foo' value='fooValue'/>
        <input type='text' name='bar' value='barValue'/>
    </form>
`

const form = body.querySelector('#testform')

it('Pass for equal values', () => {
    expect(() => {
        expect(form).toContainFormValues({
            'foo': 'fooValue',
            'bar': 'barValue',
        })
    }).not.toThrowError()
})

it('Fail for missing field', () => {
    expect(() => {
        expect(form).toContainFormValues({
            'foo': 'fooValue',
            'bar': 'barValue',
            'baz': 'bazValue',
        })
    }).toThrowErrorMatchingSnapshot()
})

it('Fail for wrong value', () => {
    expect(() => {
        expect(form).toContainFormValues({
            'foo': 'fooValue',
            'bar': 'bazValue',
        })
    }).toThrowErrorMatchingSnapshot()
})

it('Pass for extra field', () => {
    expect(() => {
        expect(form).toContainFormValues({
            'foo': 'fooValue',
        })
    }).not.toThrowError()
})
