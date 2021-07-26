/* istanbul ignore file */

/*
MIT License (MIT)
Copyright (c) 2017 Kent C. Dodds

Original code at https://github.com/testing-library/jest-dom/blob/main/src/utils.js
Reduced and converted to TS
*/

// eslint-disable-next-line @typescript-eslint/ban-types
export type MatcherFn = Function

export class GenericTypeError extends Error {
    constructor(
        expectedString: string,
        received: unknown,
        matcherFn: MatcherFn,
        context: jest.MatcherContext,
    ) {
        super()

        /* istanbul ignore next */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, matcherFn)
        }
        let withType = ''
        try {
            withType = context.utils.printWithType(
                'Received',
                received,
                context.utils.printReceived,
            )
        } catch (e) {
            // Can throw for Document:
            // https://github.com/jsdom/jsdom/issues/2304
        }
        this.message = [
            context.utils.matcherHint(
                `${context.isNot ? '.not' : ''}.${matcherFn.name}`,
                'received',
                '',
            ),
            '',
            `${context.utils.RECEIVED_COLOR(
                'received',
            )} value must ${expectedString}.`,
            withType,
        ].join('\n')
    }
}
