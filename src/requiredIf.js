import propTypes from 'prop-types'

const requiredIfFactory = (siblingPropName, propType, isRequired) => (
    props,
    propSelector, // normally a propName, but when wrapped in arrayOf an index
    componentName,
    _location,
    propFullName // normally null but a string like "propName[index]" when wrapped in arrayOf
) => {
    const propName = propFullName || propSelector
    const siblingPropValue = !!props[siblingPropName]
    const propValue = props[propSelector]

    // Usage errors
    if (isRequired) {
        return new Error(
            `Property \`${propName}\` on component \`${componentName}\` is using the \`requiredIf\` prop-validator combined with \`.isRequired\`. This is an invalid combination.`
        )
    }

    // Validation errors
    if (siblingPropValue && !propValue) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`, this prop is required when \`${siblingPropName}\` is thruthy.`
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

    return null
}

/**
 * Ensure the prop value is thruthy when a sibling prop also has a thruthy value,
 * and ensure the prop is of the correct prop-type
 * @param {string} siblingPropName - The name of the sibling prop
 * @return {Error|null} Returns null if all conditions are met, or an error
 * @example
 * import React from 'react'
 * import { propTypes } from '@dhis2/prop-types'
 *
 * const Test = ({ someBool, someString }) => (
 *     <div>
 *         <h1>someBool: {someBool ? 'true' : 'false'}</h1>
 *         <h1>someString: {someString}</h1>
 *     </div>
 * )
 * Test.propTypes = {
 *     someBool: propTypes.bool,
 *     someString: propTypes.requiredIf('someBool', propTypes.string),
 * }
 */
export function requiredIf(siblingPropName, propType) {
    const fn = requiredIfFactory(siblingPropName, propType, false)
    fn.isRequired = requiredIfFactory(siblingPropName, propType, true)
    return fn
}
