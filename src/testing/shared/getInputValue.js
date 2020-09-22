export function getInputValue(element) {
    if (element instanceof HTMLSelectElement) {
        return element.hasAttribute('multiple')
            ? Array.from(element.selectedOptions).map(i => i.value)
            : element.value
    } else if (element instanceof HTMLInputElement && element.getAttribute('type') === 'checkbox') {
        return (element.hasAttribute('value') && element.getAttribute('value') !== '')
            ? (element.checked ? element.getAttribute('value') : undefined)
            : element.checked
    } else if (element instanceof HTMLInputElement && element.getAttribute('type') === 'radio') {
        return element.checked ? element.value : undefined
    } else if (element instanceof HTMLInputElement && element.getAttribute('type') === 'number') {
        return element.value !== '' ? Number(element.value) : null
    } else if (element instanceof HTMLElement) {
        return element.value
    }
}
