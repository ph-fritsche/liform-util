import { toContainFormValues } from './toContainFormValues'
import { toEqualFormValues } from './toEqualFormValues'
import { toHaveFocusedDescendant } from './toHaveFocusedDescendant'
import { toResembleFormValues } from './toResembleFormValues'
import { toResembleInputValue } from './toResembleInputValue'

expect.extend({
    toContainFormValues,
    toEqualFormValues,
    toHaveFocusedDescendant,
    toResembleFormValues,
    toResembleInputValue,
})
