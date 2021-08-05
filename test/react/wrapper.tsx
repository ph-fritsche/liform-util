import React from 'react'
import reactTestRenderer from 'react-test-renderer'
import { createForwardRefWrapper } from '../../src/react/wrapper'
import { updateRef } from '../../src/react/forkedRef'

it('render a wrapper with injected component and merged props', () => {
    const Wrapper = createForwardRefWrapper<
        'Component',
        {foo: string},
        unknown,
        React.ComponentType<{
            bar: number,
            children?: React.ReactNode,
        }> | React.ForwardRefExoticComponent<{
            bar: number,
            children?: React.ReactNode,
            ref?: React.Ref<boolean>,
        }>
    >(({Component, foo, ...others}, ref) => {
        return <Component {...others} ref={ref}>{foo}</Component>
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const WrappedComponent = (props: {bar: number, baz?: boolean}) => null

    const tree = reactTestRenderer.create(<Wrapper Component={WrappedComponent} foo="text" bar={123}/>)
    const wrappedEl = tree.root.findByType(WrappedComponent)

    expect(wrappedEl).toBeTruthy()
    expect(wrappedEl).toHaveProperty('props', {bar: 123, children: 'text'})

    // @ts-expect-error missing property
    ;(<Wrapper Component={WrappedComponent} bar={123} />)

    // @ts-expect-error missing property
    ;(<Wrapper Component={WrappedComponent} foo="text"/>)

    // @ts-expect-error wrong type
    ;(<Wrapper Component={WrappedComponent} foo="text" bar={123} baz="error"/>)
})

it('render a wrapped with injected component and separate props', () => {
    const Wrapper = createForwardRefWrapper<
        'Component',
        { foo: string },
        'Props',
        React.ComponentType<{
            bar: number,
            children?: React.ReactNode,
        }> | React.ForwardRefExoticComponent<{
            bar: number,
            children?: React.ReactNode,
            ref?: React.Ref<boolean>,
        }>
    >(({ Component, foo, Props}, ref) => {
        return <Component {...Props} ref={ref}>{foo}</Component>
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const WrappedComponent = (props: { bar: number, baz?: boolean }) => null

    const tree = reactTestRenderer.create(<Wrapper Component={WrappedComponent} foo="text" Props={{bar: 123}} />)
    const wrappedEl = tree.root.findByType(WrappedComponent)

    expect(wrappedEl).toBeTruthy()
    expect(wrappedEl).toHaveProperty('props', {bar: 123, children: 'text'})

    // @ts-expect-error missing property
    ; (<Wrapper Component={WrappedComponent} Props={{bar: 123}} />)

    // @ts-expect-error missing property
    ; (<Wrapper Component={WrappedComponent} foo="text" />)

    // @ts-expect-error wrong type
    ;(<Wrapper Component={WrappedComponent} foo="text" Props={{ bar: 123, baz: 'error' }}/>)
})

it('render a wrapper with forwarded ref', () => {
    const Wrapper = createForwardRefWrapper<
        'Component',
        { foo: string },
        unknown,
        React.ComponentType<{
            children?: React.ReactNode,
        }> | React.ForwardRefExoticComponent<{
            children?: React.ReactNode,
            ref?: React.Ref<boolean>,
        }>
    >(({ Component, foo, ...others }, ref) => {
        return <Component {...others} ref={ref}>{foo}</Component>
    })

    const WrappedComponent = React.forwardRef<boolean>(function Wrapped(props, ref) {
        updateRef(ref, true)
        return null
    })
    const refCallback = jest.fn()

    const tree = reactTestRenderer.create(<Wrapper Component={WrappedComponent} foo="text" ref={refCallback}/>)
    const wrappedEl = tree.root.findByType(WrappedComponent)

    expect(wrappedEl).toBeTruthy()
    expect(wrappedEl).toHaveProperty('props', { children: 'text' })

    expect(refCallback).toBeCalledWith(true)

    // @ts-expect-error wrong ref type
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ;(<Wrapper Component={WrappedComponent} foo="text" ref={(a: number): void => undefined}/>)
})
