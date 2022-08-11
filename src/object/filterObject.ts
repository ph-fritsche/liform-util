/**
 * Filter objects own properties
 *
 * @returns A new object with the filtered properties
 */
export function filterObject<
    T extends Record<PropertyKey, unknown>,
>(
    object: T,
    filterFn: <K extends keyof T>(
        propValue: T[K],
        propKey: K,
        propDescriptor: PropertyDescriptor
    ) => boolean = v => v !== undefined,
): Partial<T> {
    const filtered = Object.create(Object.getPrototypeOf(object) as T) as T

    const props = Object.getOwnPropertyDescriptors(object)
    Object.keys(props).forEach((k: keyof T) => {
        if (filterFn(object[k], k, props[k])) {
            Object.defineProperty(filtered, k, props[k])
        }
    })

    return filtered
}
