import { getFormValues } from './shared/getFormValues'
import { normalizeFormValues } from './shared/normalizeFormValues'
import { resemblesFormValue } from './shared/resemblesFormValue'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toResembleFormValues(
    this: jest.MatcherContext,
    formElement: Element,
    valueMap: Record<string, unknown>,
): jest.CustomMatcherResult {
    const formValues = normalizeFormValues(getFormValues(formElement, toResembleFormValues, this))

    return {
        pass: Object.keys(Object.assign({}, valueMap, formValues)).every(
            k => Object.keys(valueMap).includes(k) && Object.keys(formValues).includes(k) && resemblesFormValue(valueMap[k], formValues[k]),
        ),
        message: createExpectResultMessage(this, toResembleFormValues, {
            expected: valueMap,
            received: formElement,
            expectedDiff: () => {
                const filtered: Partial<typeof valueMap> = {}
                Object.keys(valueMap).forEach(k => {
                    if (!Object.keys(formValues).includes(k) || !resemblesFormValue(valueMap[k], formValues[k])) {
                        filtered[k] = valueMap[k]
                    }
                })
                return filtered
            },
            receivedDiff: () => {
                const filtered: Partial<typeof formValues> = {}
                Object.keys(formValues).forEach(k => {
                    if (!Object.keys(valueMap).includes(k) || !resemblesFormValue(valueMap[k], formValues[k])) {
                        filtered[k] = formValues[k]
                    }
                })
                return filtered
            },
        }),
    }
}
