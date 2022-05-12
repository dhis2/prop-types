import { arrayWithLength, conditional, instanceOfComponent, mutuallyExclusive, requiredIf } from '@dhis2/prop-types'
import PropTypes from 'prop-types'
import React from 'react'

const statusProp = mutuallyExclusive(['success', 'warning', 'error'], PropTypes.bool).isRequired

const Child = () => <span>child</span>

export class MyComponent extends React.Component {
    static propTypes = {
        arr: arrayWithLength(1, 2, PropTypes.number).isRequired,
        cond: conditional((props) => (props.multiple ? PropTypes.arrayOf(PropTypes.number) : PropTypes.number)).isRequired,
        multiple: PropTypes.bool.isRequired,
        success: statusProp,
        warning: statusProp,
        error: statusProp,
        child: instanceOfComponent(Child).isRequired,
        errorMsg: requiredIf((props) => props.error, PropTypes.string).isRequired,
    }

    render() {
        return <div>{this.props.child}</div>
    }
}
