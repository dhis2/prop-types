import propTypes from 'prop-types'

export const conditionalFactory = (propsToPropType, isRequired) => (
    props,
    propName,
    componentName
) => {
    const isDefined = typeof props[propName] !== 'undefined'

    if (typeof propsToPropType !== 'function') {
        return new Error(
            `The \`propsToPropType\` argument passed to the \`propsToPropTypeal\` prop-validator was not a function.`
        )
    }

    const propType = propsToPropType(props)

    if (typeof propType !== 'function') {
        return new Error(
            `The response of \`propsToPropType\` call with the props was not a function.`
        )
    }

    // Validation errors
    if (isRequired && !isDefined) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`, this prop is required but no value was found.`
        )
    }

    propTypes.checkPropTypes(
        { [propName]: propType },
        props,
        'prop',
        componentName
    )

    return null
}

/**
 * Uses either one or another propType, based on the result of the
 * propsToPropType callback, called with the props
 *
 * @param {Function} propsToPropType - A callback for determining which propType to use
 * @param {Function} eitherPropType
 * @param {Function} orPropType
 * @return {Error|null} Returns null if all propsToPropTypes are met, or an error
 *
 * @example
 * import React from 'react'
 * import { propsToPropTypeal } from '@dhis2/prop-types'
 *
 * const List = ({ multiple, selected, items }) => (
 *     const selectedItems = multiple ? selected : [selected]
 *
 *     <div>
 *         {items.map(item => (
 *             <li className={selectedItems.includes(item) ? 'active' : ''}>
 *                 {item}
 *             </li>
 *         ))}
 *     </div>
 * )
 *
 * List.propTypes = {
 *     multiple: propTypes.bool,
 *     items: props.arrayOf(prpoTypes.string),
 *     selected: propsToPropTypeal(
 *         props => propTypes.multiple
 *           ? propTypes.arrayOf(prpoTypes.string)
 *           : propTypes.string,
 *     ),
 * }
 */
export const conditional = propsToPropType => {
    const fn = conditionalFactory(propsToPropType, false)
    fn.isRequired = conditionalFactory(propsToPropType, true)
    return fn
}
