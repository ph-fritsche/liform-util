import { useMemo } from 'react'

export function updateRef (ref, node) {
    if (typeof (ref) === 'function') {
        ref(node)
    } else if (ref && typeof (ref) === 'object') {
        ref.current = node
    }
}

export function forkRef (...ref) {
    return (node) => {
        for (const r of ref) {
            updateRef(r, node)
        }
    }
}

export function useForkedRef (...ref) {
    /* eslint-disable react-hooks/exhaustive-deps */
    return useMemo(() => forkRef(...ref), ref)
}
