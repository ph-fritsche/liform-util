import { createExpectResultMessage } from './shared/createExpectResultMessage'

export function toHaveFocusedDescendant(
    this: jest.MatcherContext,
    element: Element,
): jest.CustomMatcherResult {
    return {
        pass: Boolean(element.ownerDocument.activeElement && element.contains(element.ownerDocument.activeElement)),
        message: createExpectResultMessage(this, toHaveFocusedDescendant, {
            received: element,
            expectedStringify: () => element,
            receivedStringify: () => element.ownerDocument.activeElement,
        }),
    }
}
