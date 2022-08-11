import { MatcherFn } from './import/GenericTypeError'

/**
 * Create the callback for error message if a test fails
 *
 * @param expectContext The 'this' of jest extension
 * @param matcherFn The matcher function applied
 * @param expected Expected value
 * @param received Received value
 * @param expectedDiff Callback filtering expected value before printing diff
 * @param receivedDiff Callback filtering received value before printing diff
 *
 * @returns The message callback for the jest matcher result
 */
export function createExpectResultMessage(
    expectContext: jest.MatcherContext,
    matcherFn: MatcherFn,
    {
        expected,
        received,
        expectedHint,
        receivedHint,
        expectedDiff,
        receivedDiff,
        expectedStringify,
        receivedStringify,
        printStringify = Boolean(expectedStringify || receivedStringify),
    }: {
        expected?: unknown,
        received?: unknown,
        expectedHint?: () => string,
        receivedHint?: () => string,
        expectedDiff?: () => unknown,
        receivedDiff?: () => unknown,
        expectedStringify?: () => unknown,
        receivedStringify?: () => unknown,
        printStringify?: boolean,
    },
) {
    return (): string => {
        const hint = expectContext.utils.matcherHint(
            matcherFn.name,
            receivedHint ? receivedHint() : String(
                received instanceof HTMLElement
                    ? received.tagName
                    : received,
            ),
            expectedHint ? expectedHint() : (
                expected === undefined
                    ? 'undefined'
                    : JSON.stringify(expected, null, 2)
            ),
            expectContext,
        )

        const diff = printStringify
            ? [
                'Expected',
                '  ' + expectContext.utils.printExpected(expectedStringify ? expectedStringify() : expected),
                'Received',
                '  ' + expectContext.utils.printReceived(receivedStringify ? receivedStringify() : received),
            ].join('\n')
            : expectContext.utils.printDiffOrStringify(
                expectedDiff ? expectedDiff() : expected,
                receivedDiff ? receivedDiff() : received,
                'Expected',
                'Received',
                false,
            )

        return `${hint}\n\n${diff}`
    }
}
