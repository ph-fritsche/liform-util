import { getInputValue } from './shared/getInputValue'
import { resemblesFormValue } from './shared/resemblesFormValue'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toResembleInputValue(inputElement, expectedValue) {
    const value = getInputValue(inputElement, toResembleInputValue, this)

    return {
        pass: resemblesFormValue(expectedValue, value),
        message: createExpectResultMessage(this, toResembleInputValue, {
            expected: expectedValue,
            received: inputElement,
            receivedDiff: () => value,
        }),
    }
}
