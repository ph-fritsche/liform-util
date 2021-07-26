import { MutableRefObject, RefCallback, useMemo } from 'react'

export function updateRef<
    T extends unknown
>(
    ref: MutableRefObject<T> | RefCallback<T>,
    node: T,
): void {
    if (typeof (ref) === 'function') {
        ref(node)
    } else if (ref && typeof (ref) === 'object') {
        ref.current = node
    }
}

export function forkRef<
    T extends unknown
>(
    ...ref: (MutableRefObject<T> | RefCallback<T>)[]
): RefCallback<T> {
    return (node) => {
        for (const r of ref) {
            updateRef(r, node)
        }
    }
}

export function useForkedRef<
    T extends unknown
>(
    ...ref: (MutableRefObject<T> | RefCallback<T>)[]
): RefCallback<T> {
    return useMemo(
        () => forkRef(...ref),
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        ref,
    )
}
