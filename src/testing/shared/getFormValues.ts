import { getInputValue } from './getInputValue'
import { GenericTypeError, MatcherFn } from './import/GenericTypeError'
import { isElementType } from './import/isElementType'

export function getFormValues(
    formElement: Element,
    matcherFn: MatcherFn,
    context: jest.MatcherContext,
): {key: string, value: unknown}[] {
    if (!isElementType(formElement, 'form')) {
        throw new GenericTypeError('to be HTMLFormElement', formElement, matcherFn, context)
    }

    let domain: HTMLElement|DocumentFragment = formElement

    let parent: Node|null = formElement
    while ((parent = parent.parentNode)) {
        if (parent instanceof HTMLBodyElement || parent instanceof DocumentFragment) {
            domain = parent
        }
    }

    const values: {key: string, value: unknown}[] = []

    domain.querySelectorAll<
        HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement
    >('select,input,textarea').forEach(e => {
        if (e.form === formElement && e.hasAttribute('name') && e.getAttribute('name') !== '') {
            const v = getInputValue(e)
            if (v !== undefined) {
                if (Array.isArray(v) && e.getAttribute('name')?.includes('[]')) {
                    values.push(...v.map((v_: unknown) => ({
                        key: e.getAttribute('name') as string,
                        value: v_,
                    })))
                } else {
                    values.push({
                        key: e.getAttribute('name') as string,
                        value: v,
                    })
                }
            }
        }
    })

    return values
}
