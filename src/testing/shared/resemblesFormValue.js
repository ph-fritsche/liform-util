export function resemblesFormValue(expected, received) {
    if (typeof (expected) === 'string') {
        return expected === String(received ?? '')
    } else if (typeof (expected) === 'number') {
        return expected === Number(received) && ['string', 'number', 'array'].includes(typeof (received)) && received.length !== 0
    } else if (typeof (expected) === 'boolean') {
        return expected === (Boolean(received) && received !== '0' && received !== 'false' && received.length !== 0)
    } else if (Array.isArray(expected)) {
        const convertedReceived = Array.isArray(received) ? received : String(received ?? '').split(',')
        for (let i = 0; i < Math.max(expected.length, convertedReceived.length); i++) {
            if (!resemblesFormValue(expected[i], convertedReceived[i])) {
                return false
            }
        }
        return true
    } else if (expected === null || expected === undefined) {
        return received === null || received === undefined || received.length === 0
    }
}
