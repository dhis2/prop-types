import propTypes from 'prop-types'

const arrayWithLengthFactory =
    ({ min = 0, max = Infinity, propType, isRequired }) =>
    (
        props,
        propSelector, // normally a propName, but when wrapped in arrayOf an index
        componentName,
        location,
        propFullName // normally null but a string like "propName[index]" when wrapped in arrayOf
    ) => {
        const arr = props[propSelector]
        const propName = propFullName || propSelector
        const baseMsg = `Invalid prop \`${propName}\` supplied to \`${componentName}\`,`
        const insideArrayOf = !!propFullName

        if (isRequired && typeof arr === 'undefined') {
            return new Error(
                `${baseMsg} this prop is required but no value was found.`
            )
        }

        if (arr && !Array.isArray(arr)) {
            return new Error(`${baseMsg} prop value is not an array.`)
        }

        if (arr && arr.length > max) {
            return new Error(
                `${baseMsg} array has a length of ${arr.length}, but the maximum is ${max}`
            )
        }

        if (arr && arr.length < min) {
            return new Error(
                `${baseMsg} array has a length of ${arr.length}, but the minimum is ${min}`
            )
        }

        if (arr && propType) {
            const checkPropName = insideArrayOf ? location : propName
            const checkPropType = insideArrayOf
                ? // array should be array containing only the given type
                  propTypes.arrayOf(propTypes.arrayOf(propType))
                : // array should contain only the given type
                  propTypes.arrayOf(propType)

            const checkPropTypes = { [checkPropName]: checkPropType }
            const checkProps = insideArrayOf ? { [location]: props } : props
            // When not inside an array, the error message only reads correctly
            // when using "prop"
            const checkProp = insideArrayOf ? propName : 'prop'

            propTypes.checkPropTypes(
                checkPropTypes,
                checkProps,
                checkProp,
                componentName
            )
        }

        return null
    }

/**
 * Ensure the prop value is an array with a length between a minimum and maximum.
 * If a third `propType` argument is passed each item in the array needs to be of that prop-type
 * @param {number} [min=0] - The minimal array length
 * @param {number} [max=Infinity] - The maximal array length
 * @param {function} [propType] - The prop-type that each array item needs to conform to
 * @return {Error|null} Returns null if all conditions are met, or an error
 * @example
 * import React from 'react'
 * import { arrayWithLength } from '@dhis2/prop-types'
 *
 * const LotsOfLists = props => <div {...props}>Does nothing</div>
 *
 * LotsOfLists.propTypes = {
 *     arrayWithMaxThreeNumbers: arrayWithLength(0, 3, propTypes.number),
 *     arrayWithAtLeastSixStrings: arrayWithLength(6, undefined, propTypes.string),
 *     arrayWithAtLeastTenItems: arrayWithLength(10),
 *     mandatoryArrayBetweenOneAndTen: arrayWithLength(1,10).isRequired,
 * }
 */
export function arrayWithLength(min, max, propType) {
    const fn = arrayWithLengthFactory({ min, max, propType, isRequired: false })
    fn.isRequired = arrayWithLengthFactory({
        min,
        max,
        propType,
        isRequired: true,
    })
    return fn
}
