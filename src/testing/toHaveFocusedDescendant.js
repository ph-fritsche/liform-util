import { checkHtmlElement } from '@testing-library/jest-dom/dist/utils'
import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toHaveFocusedDescendant(element) {
    checkHtmlElement(element, toHaveFocusedDescendant, this)

    return {
        pass: element.ownerDocument.activeElement && element.contains(element.ownerDocument.activeElement),
        message: createExpectResultMessage(this, toHaveFocusedDescendant, {
            received: element,
            expectedStringify: () => element,
            receivedStringify: () => element.ownerDocument.activeElement,
        }),
    }
}
