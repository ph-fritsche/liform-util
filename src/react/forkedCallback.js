import { useMemo } from 'react'

export function forkCallback (...func) {
    return (...args) => {
        for (const f of func) {
            if (typeof (f) === 'function') {
                f(...args)
            }
        }
    }
}

export function useForkedCallback (func, newFunc, deps = []) {
    if (!Array.isArray(func)) {
        func = [func]
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    return useMemo(() => forkCallback(...func, newFunc), func.concat(deps))
}
