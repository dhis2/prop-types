/**
 * Ensure that no other props, apart from the ones in the prop-types definition
 * have been passed tot the component
 * @param {object} propTypes - The prop-types definition of the component
 * @return {Object} Returns a copy of the original prop-types object with an appended
 * property `forbidUnknowProps`, which is a prop-types validator that will return an error
 * if props have been added that the component that were not in the prop-types object
 * @example
 * import React from 'react'
 * import propTypes from '@dhis2/prop-types'
 *
 * const MyComponent = ({ score, maxScore }) => <div>{score} out of {maxScore}</div>
 * MyComponent.propTypes = propTypes.forbidUnknowProps({
 *     score: propTypes.number,
 *     maxScore: propTypes.number,
 * })
 *
 * Note: `forbidUnknowProps` is different from the `exact` method form the standard
 * prop-types library, because `forbidUnknowProps` is meant to be applied on a full component
 * prop-type definition, while `exact` is meant to be a applied on an individual prop-type
 */

const forbidUnknowProps = propTypes => ({
    ...propTypes,
    forbidUnknowProps: (props, _, componentName) => {
        const unknownProps = Object.keys(props).filter(
            propKey => !propTypes[propKey]
        )
        if (unknownProps.length > 0) {
            const list = unknownProps.join(', ')
            return new Error(`${componentName}: unknown props found: ${list}`)
        }
        return null
    },
})

export { forbidUnknowProps }
