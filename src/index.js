import propTypes from 'prop-types'

import { arrayWithLength } from './arrayWithLength.js'
import { instanceOfComponent } from './instanceOfComponent.js'
import { mutuallyExclusive } from './mutuallyExclusive.js'

propTypes.arrayWithLength = arrayWithLength
propTypes.instanceOfComponent = instanceOfComponent
propTypes.mutuallyExclusive = mutuallyExclusive

export { arrayWithLength, instanceOfComponent, mutuallyExclusive }
export default propTypes
