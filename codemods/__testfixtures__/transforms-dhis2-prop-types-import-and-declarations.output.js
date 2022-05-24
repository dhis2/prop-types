import { arrayWithLength, conditional, instanceOfComponent, mutuallyExclusive, requiredIf } from '@dhis2/prop-types'
import PropTypes from 'prop-types'
import React from 'react'

const Child = () => <span>child</span>

const MyComponent = ({ child }) => <div>{child}</div>

const statusProp = mutuallyExclusive(['success', 'warning', 'error'], PropTypes.bool)

MyComponent.propTypes = {
    arr: arrayWithLength(1, 2, PropTypes.number),
    cond: conditional((props) => (props.multiple ? PropTypes.arrayOf(PropTypes.number) : PropTypes.number)),
    multiple: PropTypes.bool,
    success: statusProp,
    warning: statusProp,
    error: statusProp,
    child: instanceOfComponent(Child),
    errorMsg: requiredIf((props) => props.error, PropTypes.string),
}
