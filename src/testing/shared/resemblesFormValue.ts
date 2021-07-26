export function resemblesFormValue(
    expected: unknown,
    received: unknown,
): boolean {
    if (typeof expected === 'string') {
        return expected === String(received ?? '')
    }

    if (typeof expected === 'number') {
        return expected === Number(received)
            && (typeof received === 'number'
                || (typeof received === 'string' || Array.isArray(received))
                    && received.length !== 0
            )
    }

    if (typeof expected === 'boolean') {
        return expected === (Boolean(received)
            && received !== '0'
            && received !== 'false'
            && (!Array.isArray(received) || received.length > 0)
        )
    }

    if (Array.isArray(expected)) {
        const convertedReceived = Array.isArray(received) ? received : String(received ?? '').split(',')
        for (let i = 0; i < Math.max(expected.length, convertedReceived.length); i++) {
            if (!resemblesFormValue(expected[i], convertedReceived[i])) {
                return false
            }
        }
        return true
    }

    if (expected === null || expected === undefined) {
        return received === null || received === undefined || received === '' || Array.isArray(received) && received?.length === 0
    }

    /* istanbul ignore next */
    return false
}
