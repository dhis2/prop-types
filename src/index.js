import PropTypes from 'prop-types'
import * as customPropTypes from './propTypes'

/*
 * Export our own prop-types as named exports, this allows this import style:
 * import { arrayWithLength } from '@dhis2/prop-types'
 */
export * from './propTypes'

/*
 * Reexport the prop-types lib under a namespace, as is our convention. The
 * name is Pascalcased, this allows for this import style:
 * import { PropTypes } from '@dhis2/prop-types'
 */
export { PropTypes }

/*
 * Export custom prop-types as the default export. This only contains our
 * own prop-types. Import style is (naming is up to the user of course):
 * import dhis2PropTypes from '@dhis2/prop-types'
 */
export default customPropTypes
