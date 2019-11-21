import propTypes from 'prop-types'

const isEmpty = value =>
    typeof value === 'undefined' || value === null || value === ''

const requiredIfFactory = (condition, propType, isRequired) => (
    props,
    propSelector, // normally a propName, but when wrapped in arrayOf an index
    componentName,
    _location,
    propFullName // normally null but a string like "propName[index]" when wrapped in arrayOf
) => {
    const propName = propFullName || propSelector
    const propValue = props[propSelector]

    // Usage errors
    if (isRequired) {
        return new Error(
            `Property \`${propName}\` on component \`${componentName}\` is using the \`requiredIf\` prop-validator combined with \`.isRequired\`. This is an invalid combination.`
        )
    }

    if (typeof condition !== 'function') {
        return new Error(
            `The \`condition\` argument passed to the \`requiredIf\` prop-validator was not a function.`
        )
    }

    if (typeof propType !== 'function') {
        return new Error(
            `The \`propType\` argument passed to the \`requiredIf\` prop-validator was not a function.`
        )
    }

    // Validation errors
    if (condition(props) && isEmpty(propValue)) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`, this prop is conditionally required but has value \`${propValue}\`.`
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
 * Ensure the prop has a value (i.e. treat it as required) when a given sibling prop
 * also has a value, and ensure the prop is of the correct prop-type
 * @param {function} siblingPropName - The name of the sibling prop
 * @return {Error|null} Returns null if all conditions are met, or an error
 * @example
 * import React from 'react'
 * import { requiredIf } from '@dhis2/prop-types'
 *
 * const Test = ({ someBool, someString }) => (
 *     <div>
 *         <h1>someBool: {someBool ? 'true' : 'false'}</h1>
 *         <h1>someString: {someString}</h1>
 *     </div>
 * )
 * Test.propTypes = {
 *     someBool: propTypes.bool,
 *     someString: requiredIf(props => props.someBool, propTypes.string),
 * }
 */

export function requiredIf(condition, propType) {
    const fn = requiredIfFactory(condition, propType, false)
    fn.isRequired = requiredIfFactory(condition, propType, true)
    return fn
}
