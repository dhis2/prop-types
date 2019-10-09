import propTypes from 'prop-types'

const mutuallyExclusiveFactory = (exlusivePropNames, propType, isRequired) => (
    props,
    propSelector, // normally a propName, but when wrapped in arrayOf an index
    componentName,
    _location,
    propFullName // normally null but a string like "propName[index]" when wrapped in arrayOf
) => {
    const propName = propFullName || propSelector
    const baseMsg = `Invalid prop \`${propName}\` supplied to \`${componentName}\`,`

    // Usage errors
    if (exlusivePropNames.length === 0) {
        return new Error(
            `mutuallyExclusive was called without any arguments for property \`${propName}\` on component \`${componentName}\`. Please add the required arguments.`
        )
    }

    // Validation errors
    if (isRequired && typeof props[propName] === 'undefined') {
        return new Error(
            `${baseMsg} this prop is required but no value was found.`
        )
    }

    // This is how to programatically invoke a propTypes check
    // https://github.com/facebook/prop-types#proptypescheckproptypes
    propTypes.checkPropTypes(
        {
            [propName]: propType,
        },
        props,
        propName,
        componentName
    )

    if (props[propName]) {
        const thruthySiblingPropName = exlusivePropNames.find(
            name => props[name] && name !== propName
        )

        if (thruthySiblingPropName) {
            return new Error(
                `${baseMsg} Property '${propName}' is mutually exclusive with '${thruthySiblingPropName}', but both have a thruthy value.`
            )
        }
    }

    return null
}

/**
 * Ensure that only one property within a specified list is thruthy
 * This function will also check if the current property value is of the specified type
 * @param {array<string>} exlusivePropNames - The prop names to be checked
 * @param {function} propType - The prop-type that the current prop-value needs to conform to
 * @return {Error|null} Returns null if all conditions are met, or an error
 * @example
 * import React from 'react'
 * import cx from 'classnames'
 * import propTypes from 'prop-types'
 * import { mutuallyExclusive } from '@dhis2/prop-types'
 *
 * const Alert = ({ danger, warning, success, children }) => (
 *     <div className={cx({danger, warning, success})}>
 *         {children}
 *     </div>
 * )
 *
 * const statusPropType = mutuallyExclusive(['danger', 'warning', 'success'], propTypes.bool)
 *
 * Alert.propTypes = {
 *     children: propTypes.node,
 *     danger: statusPropType,
 *     warning: statusPropType,
 *     success: statusPropType,
 * }
 */
export function mutuallyExclusive(exlusivePropNames, propType) {
    const fn = mutuallyExclusiveFactory(exlusivePropNames, propType, false)
    fn.isRequired = mutuallyExclusiveFactory(exlusivePropNames, propType, true)
    return fn
}
