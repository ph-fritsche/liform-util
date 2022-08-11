import { MutableRefObject, RefCallback, useMemo } from 'react'

export function updateRef<T>(
    ref: MutableRefObject<T> | RefCallback<T> | null,
    node: T,
): void {
    if (typeof (ref) === 'function') {
        ref(node)
    } else if (ref && typeof (ref) === 'object') {
        ref.current = node
    }
}

export function forkRef<T>(
    ...ref: (MutableRefObject<T|null> | RefCallback<T> | null)[]
): RefCallback<T> {
    return (node) => {
        for (const r of ref) {
            updateRef(r, node)
        }
    }
}

export function useForkedRef<T>(
    ...ref: (MutableRefObject<T|null> | RefCallback<T> | null)[]
): RefCallback<T> {
    return useMemo(
        () => forkRef(...ref),
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        ref,
    )
}
