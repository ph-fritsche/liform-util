export function isEscaped(
    haystack: string,
    position: number,
    escapeChar = '\\',
): boolean {
    let i: number
    for (
        i = position - 1;
        i > 0 && haystack.charAt(i) === escapeChar;
        i--
    ) { true }

    return (position - i - 1) % 2 > 0
}

export function indexOfUnescaped(
    haystack: string,
    needle: string,
    offset = 0,
    end: number|undefined = undefined,
): number|undefined {
    const i = haystack.indexOf(needle, offset)

    if (i < 0 || end !== undefined && i >= end) {
        return undefined
    } else if (!isEscaped(haystack, i)) {
        return i
    }

    return indexOfUnescaped(haystack, needle, i + 1, end)
}

export function hasUnescaped(
    haystack: string,
    needle: string,
    offset = 0,
    end: number|undefined = undefined,
): boolean {
    return indexOfUnescaped(haystack, needle, offset, end) !== undefined
}

export function countUnescaped(
    haystack: string,
    needle: string,
    start = 0,
    end: number|undefined = undefined,
): number {
    let count = 0
    for (let i: number|undefined = start; i < (end ?? haystack.length); count++, i++) {
        i = indexOfUnescaped(haystack, needle, i)
        if (i === undefined) {
            break
        }
    }

    return count
}
