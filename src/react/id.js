import { useRef } from 'react'

export function useId (value) {
    const random = useRef(Math.random().toString(36).substring(2, 10)).current

    return value !== undefined ? value : random
}
