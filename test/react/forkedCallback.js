import React from 'react'
import Renderer from 'react-test-renderer'
import { forkCallback, useForkedCallback } from '../../src/react/forkedCallback'

it('Fork callbacks', () => {
    let a
    let b
    const funcA = v => { a = v }
    const funcB = v => { b = v }

    const forked = forkCallback(funcA, undefined, () => { }, funcB)

    forked('foo')

    expect(a).toEqual('foo')
    expect(b).toEqual('foo')
})

it('Use fork callbacks hook', () => {
    let a
    let b
    let c
    const funcA = v => { a = v }
    const funcB = v => { b = v }

    const TestComponent = (props) => {
        const forkedOne = useForkedCallback(props.callback, v => { c = v })
        const forkedTwo = useForkedCallback([props.some, props.callback, props.otherCallback], v => { c = v })

        props.valueOne && forkedOne(props.valueOne)
        props.valueTwo && forkedTwo(props.valueTwo)

        props.setForked([forkedOne, forkedTwo])

        return <div></div>
    }

    let fork0
    const component0 = Renderer.create(<TestComponent
        callback={funcA}
        valueOne="foo"
        setForked={v => { fork0 = v }}
    />)

    expect(a).toEqual('foo')
    expect(c).toEqual('foo')

    let fork0a
    component0.update(<TestComponent
        callback={funcA}
        valueOne="foobar"
        setForked={v => { fork0a = v }}
    />)

    expect(a).toEqual('foobar')
    expect(c).toEqual('foobar')
    expect(fork0a[0]).toBe(fork0[0])
    expect(fork0a[1]).toBe(fork0[1])

    let fork0b
    component0.update(<TestComponent
        callback={v => { a = v }}
        valueOne="foobaz"
        setForked={v => { fork0b = v }}
    />)

    expect(a).toEqual('foobaz')
    expect(c).toEqual('foobaz')
    expect(fork0b[0]).not.toBe(fork0[0])
    expect(fork0b[1]).not.toBe(fork0[1])

    let fork1
    const component1 = Renderer.create(<TestComponent
        callback={funcA}
        otherCallback={funcB}
        valueTwo="bar"
        setForked={v => { fork1 = v }}
    />)

    expect(a).toEqual('bar')
    expect(b).toEqual('bar')
    expect(c).toEqual('bar')

    let fork1a
    component1.update(<TestComponent
        callback={funcA}
        otherCallback={funcB}
        valueTwo="baz"
        setForked={v => { fork1a = v }}
    />)

    expect(a).toEqual('baz')
    expect(b).toEqual('baz')
    expect(c).toEqual('baz')
    expect(fork1a[0]).toBe(fork1[0])
    expect(fork1a[1]).toBe(fork1[1])
})
