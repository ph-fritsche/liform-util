export function normalizeFormValues(values) {
    const normalized = {}
    const length = {}

    values.forEach(o => {
        let k = o.key

        const r = /\[(\d*)\]/g
        let m
        while ((m = r.exec(k))) {
            const sub = k.substring(0, r.lastIndex - m[0].length)

            if (m[1] !== '') {
                length[sub] = Math.max(length[sub] ?? 0, Number(m[1]))
            } else {
                length[sub] = (length[sub] ?? -1) + 1
                k = k.substring(0, r.lastIndex - 1) + (length[sub] ?? 0) + k.substring(r.lastIndex - 1)
            }
        }

        normalized[k] = o.value
    })

    return normalized
}
