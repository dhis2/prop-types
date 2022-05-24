import PropTypes from '@dhis2/prop-types'
import React from 'react'

const statusProp = PropTypes.mutuallyExclusive(['success', 'warning', 'error'], PropTypes.bool).isRequired

const Child = () => <span>child</span>

export class MyComponent extends React.Component {
    static propTypes = {
        arr: PropTypes.arrayWithLength(1, 2, PropTypes.number).isRequired,
        cond: PropTypes.conditional((props) => (props.multiple ? PropTypes.arrayOf(PropTypes.number) : PropTypes.number)).isRequired,
        multiple: PropTypes.bool.isRequired,
        success: statusProp,
        warning: statusProp,
        error: statusProp,
        child: PropTypes.instanceOfComponent(Child).isRequired,
        errorMsg: PropTypes.requiredIf((props) => props.error, PropTypes.string).isRequired,
    }

    render() {
        return <div>{this.props.child}</div>
    }
}
