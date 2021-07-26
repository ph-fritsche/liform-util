import { getInputValue } from './shared/getInputValue'
import { resemblesFormValue } from './shared/resemblesFormValue'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toResembleInputValue(
    this: jest.MatcherContext,
    inputElement: Element,
    expectedValue: unknown,
): jest.CustomMatcherResult {
    const value = getInputValue(inputElement)

    return {
        pass: resemblesFormValue(expectedValue, value),
        message: createExpectResultMessage(this, toResembleInputValue, {
            expected: expectedValue,
            received: inputElement,
            receivedDiff: () => value,
        }),
    }
}
