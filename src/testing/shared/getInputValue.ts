import { isElementType } from './import/isElementType'

export function getInputValue(
    element: Element,
): unknown {
    if (isElementType(element, 'select') && element.hasAttribute('multiple')) {
        return Array.from(element.selectedOptions).map(i => i.value)
    }

    if (isElementType(element, 'input')) {
        if (element.getAttribute('type') === 'checkbox') {
            return (element.hasAttribute('value') && element.getAttribute('value') !== '')
                ? (element.checked ? element.getAttribute('value') : undefined)
                : element.checked
        } else if (element.getAttribute('type') === 'radio') {
            return element.checked ? element.value : undefined
        } else if (element.getAttribute('type') === 'number') {
            return element.value !== '' ? Number(element.value) : null
        }
    }

    if ('value' in element) {
        return (element as HTMLInputElement).value
    }
}
