/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

/**
 * Infer the ForwardedRef from a component
 */
export type ComponentForwardRef<T extends React.ElementType> = React.ForwardedRef<React.ElementRef<T>>

/**
 * Properties of a wrapper component
 */
export type WrapperProps<
    /**
     * The property key for the component to be wrapped.
     */
    ComponentProp extends PropertyKey,
    /**
     * Additional properties for the wrapper.
     */
    AdditionalProps extends unknown,
    /**
     * The property key for properties passed down to the wrapped component.
     * `unknown` if properties of wrapper and wrapped are merged.
     */
    PropertiesProp extends PropertyKey | unknown,
    /**
     * The wrapped component.
     */
    Component extends React.ElementType,
    > = {
        [k in ComponentProp]: Component
    } & (
        PropertiesProp extends PropertyKey
        ? { [k in PropertiesProp]: React.ComponentProps<Component> }
        : Omit<React.ComponentProps<Component>, keyof AdditionalProps | ComponentProp>
    ) & AdditionalProps

/**
 * A wrapper component with ForwardRef
 */
export interface ForwardRefWrapper<
    /**
     * The property key for the component to be wrapped.
     */
    ComponentProp extends PropertyKey,
    /**
     * Additional properties for the wrapper.
     */
    AdditionalProps extends unknown = unknown,
    /**
     * The property key for properties passed down to the wrapped component.
     * `unknown` if properties of wrapper and wrapped are merged.
     */
    PropertiesProp extends PropertyKey | unknown = unknown,
    /**
     * Base type for the wrapped component.
     */
    ComponentType extends React.ElementType = React.ElementType,
> extends OmitCallable<React.ForwardRefExoticComponent<any>> {
    <T extends ComponentType>(
        props: WrapperProps<ComponentProp, AdditionalProps, PropertiesProp, T>,
    ): React.ReactElement | null
}
type OmitCallable<T> = Pick<T, keyof T>

/**
 * Create a React.FordwardRefExoticComponent with types infered from an injected component.
 */
export function createForwardRefWrapper<
    /**
     * The property key for the component to be wrapped.
     */
    ComponentProp extends PropertyKey,
    /**
     * Additional properties for the wrapper.
     */
    AdditionalProps extends unknown = unknown,
    /**
     * The property key for properties passed down to the wrapped component.
     * `unknown` if properties of wrapper and wrapped are merged.
     */
    PropertiesProp extends PropertyKey | unknown = unknown,
    /**
     * Base type for the wrapped component.
     */
    ComponentType extends React.ElementType = React.ElementType,
>(
    wrapper: (
        props: WrapperProps<ComponentProp, AdditionalProps, PropertiesProp, ComponentType>,
        ref: ComponentForwardRef<ComponentType>
    ) => React.ReactElement | null,
): ForwardRefWrapper<ComponentProp, AdditionalProps, PropertiesProp, ComponentType> {
    return React.forwardRef(wrapper)
}
