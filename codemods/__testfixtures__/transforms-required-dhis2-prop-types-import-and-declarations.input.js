import PropTypes from '@dhis2/prop-types'
import React from 'react'

const Child = () => <span>child</span>

const MyComponent = ({ child }) => <div>{child}</div>

const statusProp = PropTypes.mutuallyExclusive(['success', 'warning', 'error'], PropTypes.bool)

MyComponent.propTypes = {
    arr: PropTypes.arrayWithLength(1, 2, PropTypes.number).isRequired,
    cond: PropTypes.conditional((props) => (props.multiple ? PropTypes.arrayOf(PropTypes.number) : PropTypes.number)).isRequired,
    multiple: PropTypes.bool.isRequired,
    success: statusProp.isRequired,
    warning: statusProp.isRequired,
    error: statusProp.isRequired,
    child: PropTypes.instanceOfComponent(Child).isRequired,
    errorMsg: PropTypes.requiredIf((props) => props.error, PropTypes.string).isRequired,
}
