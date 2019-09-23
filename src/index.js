import propTypes from 'prop-types'

import { arrayWithLength } from './arrayWithLength.js'
import { forbidUnknowProps } from './forbidUnknowProps.js'
import { instanceOfComponent } from './instanceOfComponent.js'
import { mutuallyExclusive } from './mutuallyExclusive.js'

const customPropTypes = {
    arrayWithLength,
    forbidUnknowProps,
    instanceOfComponent,
    mutuallyExclusive,
}

export {
    arrayWithLength,
    forbidUnknowProps,
    instanceOfComponent,
    mutuallyExclusive,
}

export default {
    ...propTypes,
    ...customPropTypes,
}
