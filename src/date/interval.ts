const units = {
    date_Y: 'years',
    date_M: 'months',
    date_D: 'days',
    date_W: 'weeks',
    time_H: 'hours',
    time_M: 'minutes',
    time_S: 'seconds',
} as const

export function intervalFromString (
    intervalString: string,
): Interval|undefined {
    const m = intervalString.match(/^(?<sign>\+|-)?P(?<date>(?:-?\d+[YMWD])*)(?:T(?<time>(?:-?\d+[HMS])*))?$/)
    if (!m) {
        return undefined
    }

    const interval = new Interval()

    if (m.groups?.sign) {
        interval.sign = m.groups.sign as '+'|'-'
    }

    for (const s of ['date', 'time'] as const) {
        for (const o of (m.groups?.[s] ?? '').match(/-?\d+\w/g) ?? []) {
            const v = Number(o.substring(0, o.length -1))
            const u = o.substr(-1)
            interval[ units[`${s}_${u}` as keyof typeof units] ] = v
        }
    }

    return interval
}

export function intervalToString (
    intervalObject: Interval,
): string {
    let s = ''

    for (const u of ['Y', 'M', 'D', 'W'] as const) {
        const v = intervalObject[units[`date_${u}` as const]]
        if (v) {
            s += `${v}${u}`
        }
    }
    for (const u of ['H', 'M', 'S'] as const) {
        const v = intervalObject[units[`time_${u}` as const]]
        if (v) {
            if (!s.includes('T')) {
                s += 'T'
            }
            s += `${v}${u}`
        }
    }

    return s ? (intervalObject.sign ?? '') + 'P' + s : ''
}

export class Interval {
    sign: '-'|'+'|undefined = undefined
    years = 0
    months = 0
    weeks = 0
    days = 0
    hours = 0
    minutes = 0
    seconds = 0

    toString(): string {
        return intervalToString(this)
    }
}
