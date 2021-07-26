export function getIndicesOfDescendant(
    ancestor: Element,
    descendant: Element,
): number[]|undefined {
    if (!ancestor.contains(descendant)) {
        return
    }

    const indices: number[] = []
    while (descendant.parentElement instanceof HTMLElement) {
        indices.unshift(Array.prototype.indexOf.call(descendant.parentElement.children, descendant))
        if (descendant.parentElement === ancestor) {
            return indices
        }
        descendant = descendant.parentElement
    }
}
