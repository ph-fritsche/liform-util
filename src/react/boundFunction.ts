import { useMemo } from 'react'

export function useBoundFunction<
    BindArgs extends readonly unknown[],
    MoreArgs extends unknown[],
    Return extends unknown
>(
    func: (...args: [...BindArgs, ...MoreArgs]) => Return,
    ...bind: BindArgs
): (...more: MoreArgs) => Return {
    return useMemo(
        () => (...more: MoreArgs) => func(...bind, ...more),
        /* eslint-disable react-hooks/exhaustive-deps */
        bind,
    )
}
