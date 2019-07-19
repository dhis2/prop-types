import React from 'react'

const instanceOfComponentFactory = (Component, isRequired) => (
    props,
    propName
) => {
    const children = props[propName]
    const count = React.Children.count(children)

    if (isRequired && count === 0) {
        return new Error(`${propName} is required.`)
    }

    if (count > 1) {
        return new Error(
            `Prop validator 'instanceOfComponent' expected 1 component instance, instead found ${count}.`
        )
    }

    if (children.type !== Component) {
        const componentName = Component.name || Component.displayName
        return new Error(
            `Child at index ${propName} is not an instance of component ${componentName}.`
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
