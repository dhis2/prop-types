import propTypes from 'prop-types'

import { arrayWithLength } from './arrayWithLength.js'
import { conditional } from './conditional';
import { instanceOfComponent } from './instanceOfComponent.js'
import { mutuallyExclusive } from './mutuallyExclusive.js'
import { requiredIf } from './requiredIf.js'

propTypes.arrayWithLength = arrayWithLength
propTypes.conditional = conditional
propTypes.instanceOfComponent = instanceOfComponent
propTypes.mutuallyExclusive = mutuallyExclusive
propTypes.requiredIf = requiredIf

export {
    arrayWithLength,
    conditional,
    instanceOfComponent,
    mutuallyExclusive,
    requiredIf,
}

export default propTypes
