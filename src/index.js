import propTypes from 'prop-types'

import { arrayWithLength } from './arrayWithLength.js'
import { instanceOfComponent } from './instanceOfComponent.js'
import { mutuallyExclusive } from './mutuallyExclusive.js'
import { requiredIf } from './requiredIf.js'

propTypes.arrayWithLength = arrayWithLength
propTypes.instanceOfComponent = instanceOfComponent
propTypes.mutuallyExclusive = mutuallyExclusive
propTypes.requiredIf = requiredIf

export { arrayWithLength, instanceOfComponent, mutuallyExclusive, requiredIf }
export default propTypes
