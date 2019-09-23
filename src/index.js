import propTypes from 'prop-types'

import { arrayWithLength } from './arrayWithLength.js'
import { whitelistProps } from './whitelistProps.js'
import { instanceOfComponent } from './instanceOfComponent.js'
import { mutuallyExclusive } from './mutuallyExclusive.js'

const customPropTypes = {
    arrayWithLength,
    whitelistProps,
    instanceOfComponent,
    mutuallyExclusive,
}

export {
    arrayWithLength,
    whitelistProps,
    instanceOfComponent,
    mutuallyExclusive,
}

export default {
    ...propTypes,
    ...customPropTypes,
}
