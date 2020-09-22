import { getFormValues } from './shared/getFormValues'
import { normalizeFormValues } from './shared/normalizeFormValues'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toContainFormValues(formElement, valueMap) {
    const formValues = normalizeFormValues(getFormValues(formElement, toContainFormValues, this))

    return {
        pass: this.equals(formValues, valueMap, [this.utils.subsetEquality], false),
        message: createExpectResultMessage(this, toContainFormValues, {
            expected: valueMap,
            received: formElement,
            receivedDiff: () => {
                const filtered = {}
                Object.keys(valueMap).forEach(k => {
                    if (Object.keys(formValues).includes(k)) {
                        filtered[k] = formValues[k]
                    }
                })
                return filtered
            },
        }),
    }
}
