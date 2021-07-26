import { useMemo } from 'react'

type Callback<Args extends unknown[]> = (...args: Args) => unknown

export function forkCallback<
    Args extends unknown[],
>(
    ...func: Callback<Args>[]
) {
    return (...args: Args): void => {
        for (const f of func) {
            if (typeof (f) === 'function') {
                f(...args)
            }
        }
    }
}

export function useForkedCallback<
    Args extends unknown[],
>(
    func: Callback<Args> | Callback<Args>[],
    newFunc: Callback<Args>,
    deps: unknown[] = [],
): (...args: Args) => void {
    const funcA = Array.isArray(func) ? func : [func]

    return useMemo(
        () => forkCallback(...funcA, newFunc),
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        ([] as unknown[]).concat(funcA, deps),
    )
}
