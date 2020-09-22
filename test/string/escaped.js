import { isEscaped, indexOfUnescaped, hasUnescaped, countUnescaped } from '../../src/string/escaped'

it.each([
    [['abc', 1], false],
    [['a\\bc', 2], true],
    [['a\\\\bc', 3], false],
    [['a\\\\\\bc', 4], true],
])('Check if character is escaped', ([str, pos], expected) => {
    expect(isEscaped(str, pos)).toEqual(expected)
})

it.each([
    [['abc', 'b'], 1],
    [['a\\bcabc', 'b'], 5],
    [['abca\\bcabc', 'b', 3], 8],
])('Find unescaped character', ([str, needle, start, end], expected) => {
    expect(indexOfUnescaped(str, needle, start, end)).toEqual(expected)
})

it.each([
    [['abca\\bc', 'd']],
    [['abca\\bc', 'b', 3]],
    [['a\\bcabc', 'b', 0, 3]],
])('Return undefined if unescaped character cannot be found', ([str, needle, start, end]) => {
    expect(indexOfUnescaped(str, needle, start, end)).toEqual(undefined)
})

it.each([
    [['abca\\bc', 'd'], false],
    [['abca\\bc', 'b'], true],
    [['a\\bcabc', 'b', 0, 3], false],
])('Test for unescaped characters', ([str, needle, start, end], expected) => {
    expect(hasUnescaped(str, needle, start, end)).toBe(expected)
})

it.each([
    [['abcabcabc', 'b'], 3],
    [['abcabcabc', 'b', 2], 2],
    [['abcabcabc', 'b', 2, 5], 1],
    [['abca\\bcabc', 'b'], 2],
])('Count unescaped characters', ([str, needle, start, end], expected) => {
    expect(countUnescaped(str, needle, start, end)).toEqual(expected)
})
