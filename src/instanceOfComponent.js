import React from 'react'

const instanceOfComponentFactory = (Component, isRequired) => (
    props,
    propSelector, // normally a propName, but when wrapped in arrayOf an index
    componentName,
    _location,
    propFullName // normally null but a string like "propName[index]" when wrapped in arrayOf
) => {
    const children = props[propSelector]
    const propName = propFullName || propSelector
    const baseMsg = `Invalid prop \`${propName}\` supplied to \`${componentName}\`,`

    if (Array.isArray(children)) {
        return new Error(
            `${baseMsg} expected a single component instance but received an array.`
        )
    }

    if (!children) {
        if (isRequired) {
            return new Error(
                `${baseMsg} this is a required property but its value is \`${children}\`.`
            )
        } else {
            return null
        }
    }

    if (!React.isValidElement(children)) {
        return new Error(`${baseMsg} not a valid React element.`)
    }

    if (children.type !== Component) {
        const expectedComponent =
            typeof Component === 'string'
                ? Component
                : Component.name || Component.displayName
        const foundComponent =
            typeof children.type === 'string' // native elements
                ? children.type
                : children.type.name || children.type.displayName
        return new Error(
            `${baseMsg} expected an instance of \`${expectedComponent}\` but found an instance of \`${foundComponent}\`.`
        )
    }

    return null
}

/**
 * Ensure the prop value is an instance of a certain component
 * @param {function} Component - The component that is expected
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
 */
export function instanceOfComponent(Component) {
    const fn = instanceOfComponentFactory(Component, false)
    fn.isRequired = instanceOfComponentFactory(Component, true)
    return fn
}
