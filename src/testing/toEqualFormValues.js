import { getFormValues } from './shared/getFormValues'
import { normalizeFormValues } from './shared/normalizeFormValues'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toEqualFormValues(formElement, valueMap) {
    const formValues = normalizeFormValues(getFormValues(formElement, toEqualFormValues, this))

    return {
        pass: this.equals(formValues, valueMap, [], false),
        message: createExpectResultMessage(this, toEqualFormValues, {
            expected: valueMap,
            received: formElement,
            receivedDiff: () => formValues,
        }),
    }
}
