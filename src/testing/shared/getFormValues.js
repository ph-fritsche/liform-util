import { HtmlElementTypeError } from '@testing-library/jest-dom/dist/utils'
import { getInputValue } from './getInputValue'

export function getFormValues(formElement, matcherFn, context) {
    if (!(formElement instanceof HTMLFormElement)) {
        throw new HtmlElementTypeError(formElement, matcherFn, context)
    }

    let domain = formElement

    let parent = formElement
    while ((parent = parent.parentNode)) {
        if (parent instanceof HTMLBodyElement || parent instanceof DocumentFragment) {
            domain = parent
        }
    }

    const values = []

    domain.querySelectorAll('select,input,textarea').forEach(e => {
        if (e.form === formElement && e.getAttribute('name') !== '') {
            const v = getInputValue(e)
            if (v !== undefined) {
                if (Array.isArray(v) && e.getAttribute('name').includes('[]')) {
                    values.push(...v.map(v_ => ({
                        key: e.getAttribute('name'),
                        value: v_,
                    })))
                } else {
                    values.push({
                        key: e.getAttribute('name'),
                        value: v,
                    })
                }
            }
        }
    })

    return values
}
