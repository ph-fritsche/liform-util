import { useMemo } from 'react'

export function useBoundFunction (func, ...args) {
    /* eslint-disable react-hooks/exhaustive-deps */
    return useMemo(() => func.bind(undefined, ...args), args)
}
