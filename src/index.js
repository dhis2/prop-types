import propTypes from 'prop-types'
import * as customPropTypes from './propTypes'

// Export all prop-types as named exports
export * from './propTypes'
export * from 'prop-types'

// Export all prop-types as a default export as well
const allPropTypes = {
    ...propTypes,
    ...customPropTypes,
}

export default allPropTypes
