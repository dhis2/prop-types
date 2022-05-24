import PropTypes from '@dhis2/prop-types'
import React from 'react'

const statusProp = PropTypes.mutuallyExclusive(['success', 'warning', 'error'], PropTypes.bool)

const Child = () => <span>child</span>

export class MyComponent extends React.Component {
    static propTypes = {
        arr: PropTypes.arrayWithLength(1, 2, PropTypes.number),
        cond: PropTypes.conditional((props) => (props.multiple ? PropTypes.arrayOf(PropTypes.number) : PropTypes.number)),
        multiple: PropTypes.bool,
        success: statusProp,
        warning: statusProp,
        error: statusProp,
        child: PropTypes.instanceOfComponent(Child),
        errorMsg: PropTypes.requiredIf((props) => props.error, PropTypes.string),
    }

    render() {
        return <div>{this.props.child}</div>
    }
}
