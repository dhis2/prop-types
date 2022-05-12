import { arrayWithLength, conditional, instanceOfComponent, mutuallyExclusive, requiredIf } from '@dhis2/prop-types'
import PropTypes from 'prop-types'
import React from 'react'

const Child = () => <span>child</span>

const MyComponent = ({ child }) => <div>{child}</div>

const statusProp = mutuallyExclusive(['success', 'warning', 'error'], PropTypes.bool)

MyComponent.propTypes = {
    arr: arrayWithLength(1, 2, PropTypes.number).isRequired,
    cond: conditional((props) => (props.multiple ? PropTypes.arrayOf(PropTypes.number) : PropTypes.number)).isRequired,
    multiple: PropTypes.bool.isRequired,
    success: statusProp.isRequired,
    warning: statusProp.isRequired,
    error: statusProp.isRequired,
    child: instanceOfComponent(Child).isRequired,
    errorMsg: requiredIf((props) => props.error, PropTypes.string).isRequired,
}
