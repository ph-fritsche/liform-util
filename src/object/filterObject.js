/**
 * Filter objects own properties
 *
 * @param object The object
 * @param filterFn Callback to determine if a property should be included in the filter result
 *  It will receive 1) the property value, 2) the property name, 3) the property descriptor
 *
 * @returns A new object with the filtered properties
 */
export function filterObject (object, filterFn = v => v !== undefined) {
    const filtered = Object.create(Object.getPrototypeOf(object))

    const props = Object.getOwnPropertyDescriptors(object)
    Object.keys(props).forEach(k => {
        if (filterFn(object[k], k, props[k])) {
            Object.defineProperty(filtered, k, props[k])
        }
    })

    return filtered
}
