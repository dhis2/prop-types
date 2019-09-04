import propTypes from 'prop-types'

import { arrayWithLength } from './arrayWithLength.js'
import { instanceOfComponent } from './instanceOfComponent.js'
import { mutuallyExclusive } from './mutuallyExclusive.js'

const customPropTypes = {
    arrayWithLength,
    instanceOfComponent,
    mutuallyExclusive,
}

export default {
    ...propTypes,
    ...customPropTypes,
}
