const instanceOfComponentFactory = (Component, isRequired) => (
    props,
    propSelector, // normally a propName, but when wrapped in arrayOf an index
    componentName,
    _location,
    propFullName // normally null but a string like "propName[index]" when wrapped in arrayOf
) => {
    const child = props[propSelector]
    const propName = propFullName || propSelector
    const hasRenderableChild = child === 0 || !!child
    const baseMsg = `Invalid prop \`${propName}\` supplied to \`${componentName}\`,`

    if (Array.isArray(child)) {
        return new Error(
            `${baseMsg} expected a single component instance but received an array.`
        )
    }

    if (!hasRenderableChild) {
        if (isRequired) {
            return new Error(
                `${baseMsg} this is a required property but its value is \`${child}\`.`
            )
        } else {
            return null
        }
    }

    const expectedComponentName =
        typeof Component === 'string'
            ? Component
            : Component.name || Component.displayName
    const foundComponentName =
        typeof child.type !== 'string'
            ? child.type && child.type.name
                ? child.type.name
                : child.type
            : child.type && (child.type.name || child.type.displayName)

    if (!foundComponentName) {
        return new Error(
            `${baseMsg} could not read component name. Property value does not look like a component instance.`
        )
    }

    if (child.type !== Component) {
        return new Error(
            `${baseMsg} expected an instance of \`${expectedComponentName}\` but found an instance of \`${foundComponentName}\`.`
        )
    }

    return null
}

/**
 * Ensure the prop value is an instance of a certain component
 * @param {function|string} Component - The component that is expected. Can either be a React component,
 * or a string for built-in components, such as 'span', 'div', etc.
 * @return {Error|null} Returns null if all conditions are met, or an error
 * @example
 * import React from 'react'
 * import { instanceOfComponent } from '@dhis2/prop-types'
 * import { Button } from './Button'
 *
 * const ButtonWrap = ({ children }) => <div>{children}</div>
 * // This would allow the ButtonWrap to be empty
 * ButtonWrap.propTypes = {
 *     children: instanceOfComponent(Button)
 * }
 *
 * // Enforce presence of a Button instance
 * ButtonWrap.propTypes = {
 *     children: instanceOfComponent(Button).isRequired
 * }
 *
 * // Enforce presence of a multiple children, all Button instances
 * ButtonWrap.propTypes = {
 *     children: proptypes.arrayOf(instanceOfComponent(Button)).isRequired
 * }
 */
export function instanceOfComponent(Component) {
    const fn = instanceOfComponentFactory(Component, false)
    fn.isRequired = instanceOfComponentFactory(Component, true)
    return fn
}
