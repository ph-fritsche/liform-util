import '../../src/testing'
import { render } from '../_render'

it.each([
    [`<input value=""/>`, [null, undefined, '', false, []], ['0', 0]],
    [`<input value="0"/>`, [0, false, '0'], [null, undefined, []]],
    [`<input value="1"/>`, [1, true, '1'], ['foo']],
    [`<input value="fooValue"/>`, ['fooValue', true], [1]],
    [`<input type="checkbox" value="fooValue" checked/>`, ['fooValue', true], [1, 'true']],
    [`<input type="checkbox" checked/>`, [true, 'true'], ['foo']],
    [`<input type="checkbox" value="fooValue"/>`, ['', null, undefined, false, []], [0]],
    [`<input type="number" value=""/>`, [null, undefined, '', false], [0]],
    [`<input type="number" value="0"/>`, [0, false, '0'], [null, undefined, '']],
    [`<input type="number" value="1"/>`, [1, true, '1'], [1.2]],
    [`<select><option selected>bar</option></select>`, ['bar', ['bar'], true], [[], null, undefined, '', false]],
    [`<select multiple><option selected>bar</option><option selected>baz</option></select>`, [['bar', 'baz'], 'bar,baz', true], [1]],
    [`<select multiple></select>`, [[], false, null, undefined, ''], [0]],
])('Compare input values %p', (html, expectedValues, unexpectedValues) => {
    const { element } = render(html)

    for (const v of expectedValues) {
        expect(element).toResembleInputValue(v)
    }

    for (const v of unexpectedValues) {
        expect(() => {
            expect(element).toResembleInputValue(v)
        }).toThrowErrorMatchingSnapshot()
    }
})
