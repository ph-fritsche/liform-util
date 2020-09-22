import React from 'react'
import Renderer from 'react-test-renderer'
import { useBoundFunction } from '../../src/react/boundFunction'

it('Use bound function hook', () => {
    let args

    let i = 0
    const TestComponent = (props) => {
        const boundFunc = useBoundFunction((...a) => { args = a }, props.a)
        boundFunc('bar' + (i++))

        props.setBound(boundFunc)

        return null
    }

    let func0
    const component = Renderer.create(<TestComponent
        a="foo"
        setBound={v => { func0 = v }}
    />)

    expect(args).toEqual(['foo', 'bar0'])

    let func1
    component.update(<TestComponent
        a="foo"
        setBound={v => { func1 = v }}
    />)

    expect(args).toEqual(['foo', 'bar1'])
    expect(func1).toBe(func0)

    let func2
    component.update(<TestComponent
        a="baz"
        setBound={v => { func2 = v }}
    />)

    expect(args).toEqual(['baz', 'bar2'])
    expect(func2).not.toBe(func0)
})
