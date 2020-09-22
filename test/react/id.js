import React from 'react'
import Renderer from 'react-test-renderer'
import { useId } from '../../src/react/id'

const TestComponent = ({ id }) => {
    const idRef = useId(id)

    return idRef
}

it('Use id hook with value', () => {
    const component = Renderer.create(<TestComponent id="foo" />)

    expect(component.toJSON()).toBe('foo')
})

it('Use id hook without value', () => {
    const component = Renderer.create(<TestComponent />)

    const id = component.toJSON()
    expect(typeof (id)).toBe('string')
    expect(id).toHaveLength(8)

    component.update(<TestComponent />)

    expect(component.toJSON()).toBe(id)
})
