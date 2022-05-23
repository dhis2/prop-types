import propTypes from 'prop-types'

export const deprecated = (propType, explanation) => {
    const emmittedWarnings = new Set()

    return (props, propName, componentName) => {
        const message = `"${propName}" property of "${componentName}" has been deprecated. ${explanation}`

        if (!emmittedWarnings.has(message)) {
            console.warn(message)
            emmittedWarnings.add(message)
        }

        propTypes.checkPropTypes(
            { [propName]: propType },
            props,
            'prop',
            componentName
        )

        return null
    }
}
