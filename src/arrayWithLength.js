import propTypes from 'prop-types'

const arrayWithLengthFactory = ({
    min = 0,
    max = Infinity,
    propType,
    isRequired,
}) => (props, propName, componentName) => {
    const arr = props[propName]

    if (isRequired && typeof arr === 'undefined') {
        return new Error(`${propName} is required.`)
    }

    if (arr && !Array.isArray(arr)) {
        return new Error(`${propName} is not an array.`)
    }

    if (arr && arr.length > max) {
        return new Error(
            // prettier-ignore
            `${propName} array has a length of ${arr.length}, but the maximum is ${max}`
        )
    }

    if (arr && arr.length < min) {
        return new Error(
            // prettier-ignore
            `${propName} array has a length of ${arr.length}, but the minimum is ${min}`
        )
    }

    if (arr && propType) {
        const len = arr.length
        for (let i = 0; i < len; i++) {
            propTypes.checkPropTypes(
                {
                    [i]: propType,
                },
                arr,
                propName,
                componentName
            )
        }
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
