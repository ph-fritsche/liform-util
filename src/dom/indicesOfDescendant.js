export function getIndicesOfDescendant(ancestor, descendant) {
    if (!(ancestor instanceof HTMLElement) || !ancestor.contains(descendant)) {
        return
    }

    let indices = []
    while (descendant instanceof HTMLElement && descendant.parentElement instanceof HTMLElement) {
        indices.unshift(Array.prototype.indexOf.call(descendant.parentElement.children, descendant))
        if (descendant.parentElement === ancestor) {
            return indices
        }
        descendant = descendant.parentElement
    }
}
