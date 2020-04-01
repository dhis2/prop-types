import propTypes from 'prop-types'

import { arrayWithLength } from './propTypes/arrayWithLength.js'
import { conditional } from './propTypes/conditional'
import { instanceOfComponent } from './propTypes/instanceOfComponent.js'
import { mutuallyExclusive } from './propTypes/mutuallyExclusive.js'
import { requiredIf } from './propTypes/requiredIf.js'

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
