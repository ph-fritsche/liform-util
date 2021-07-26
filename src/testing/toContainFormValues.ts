import { getFormValues } from './shared/getFormValues'
import { normalizeFormValues } from './shared/normalizeFormValues'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toContainFormValues(
    this: jest.MatcherContext,
    formElement: Element,
    valueMap: Record<string, unknown>,
): jest.CustomMatcherResult {
    const formValues = normalizeFormValues(getFormValues(formElement, toContainFormValues, this))

    return {
        pass: this.equals(formValues, valueMap, [this.utils.subsetEquality], false),
        message: createExpectResultMessage(this, toContainFormValues, {
            expected: valueMap,
            received: formElement,
            receivedDiff: () => {
                const filtered: Partial<typeof valueMap> = {}
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
