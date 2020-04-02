import propTypes from 'prop-types'
import { arrayWithLength } from './propTypes/arrayWithLength.js'
import { conditional } from './propTypes/conditional'
import { instanceOfComponent } from './propTypes/instanceOfComponent.js'
import { mutuallyExclusive } from './propTypes/mutuallyExclusive.js'
import { requiredIf } from './propTypes/requiredIf.js'

const dhis2PropTypes = {
    ...propTypes,
    arrayWithLength,
    conditional,
    instanceOfComponent,
    mutuallyExclusive,
    requiredIf,
}

export default dhis2PropTypes
