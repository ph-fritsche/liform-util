export function normalizeFormValues<T>(
    values: {key: string, value: T}[],
): Record<string, T> {
    const normalized: Record<string, T> = {}
    const length: Record<string, number> = {}

    values.forEach(o => {
        let k = o.key

        const r = /\[(\d*)\]/g
        for(;;) {
            const m = r.exec(k)
            if (!m) {
                break
            }

            const sub = k.substring(0, r.lastIndex - m[0].length)

            if (m[1] !== '') {
                length[sub] = Math.max(length[sub] ?? 0, Number(m[1]))
            } else {
                length[sub] = (length[sub] ?? -1) + 1
                k = k.substring(0, r.lastIndex - 1) + String(length[sub] ?? 0) + k.substring(r.lastIndex - 1)
            }
        }

        normalized[k] = o.value
    })

    return normalized
}
