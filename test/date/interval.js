import { intervalFromString, intervalToString } from '../../src/date/interval'

const isoIntervals = [
    ['P12Y', { years: 12 }],
    ['P12M', { months: 12 }],
    ['P12W', { weeks: 12 }],
    ['P12D', { days: 12 }],
    ['PT12H', { hours: 12 }],
    ['PT12M', { minutes: 12 }],
    ['PT12S', { seconds: 12 }],
    ['P1Y3M5D7WT2H4M6S', { years: 1, months: 3, days: 5, weeks: 7, hours: 2, minutes: 4, seconds: 6 }],
]

const signedIntervals = [
    ['P-12Y', { years: -12 }],
    ['P-12M', { months: -12 }],
    ['P-12W', { weeks: -12 }],
    ['P-12D', { days: -12 }],
    ['PT-12H', { hours: -12 }],
    ['PT-12M', { minutes: -12 }],
    ['PT-12S', { seconds: -12 }],
    ['+P1Y3M5D7WT2H4M6S', { sign: '+', years: 1, months: 3, days: 5, weeks: 7, hours: 2, minutes: 4, seconds: 6 }],
    ['-P1Y3M5D7WT2H4M6S', { sign: '-', years: 1, months: 3, days: 5, weeks: 7, hours: 2, minutes: 4, seconds: 6 }],
]

it.each(isoIntervals)('ISO 8601 interval: %p', (str, expected) => {
    const interval = intervalFromString(str)

    expect(interval).toEqual(expected)
    expect(String(interval)).toBe(str)
})

it.each(signedIntervals)('Signed intervals: %p', (str, expected) => {
    const interval = intervalFromString(str)

    expect(interval).toEqual(expected)
    expect(String(interval)).toBe(str)
})

it('Return undefined for invalid strings', () => {
    expect(intervalFromString('foo')).toEqual(undefined)
})

it('Return empty string for 0 values', () => {
    expect(intervalToString({ years: 0 })).toEqual('')
    expect(intervalToString({ sign: '-', years: 0 })).toEqual('')
})
