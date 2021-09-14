const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../prop-types-v1-v3.js')
const transformOptions = {}

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
    import React from 'react'
    import yes, { no, maybe } from 'something'
    import yes2, { no2, maybe2 } from 'something2'
    import PropTypes, { node, bool } from 'prop-types'
    import weirdName, { requiredIf } from '@dhis2/prop-types'
    
    const SomeComponent = () => <h1>Yippee</h1>
    
    SomeComponent.propTypes = {
        label: PropTypes.string,
        test: PropTypes.requiredIf,
        flag: bool.isRequired,
        condition: PropTypes.requiredIf(props => props.flag).isRequired,
        aShape: PropTypes.shape({
            something: PropTypes.bool,
            anotherThing: PropTypes.number,
        }).isRequired,
    }
    
    class AnotherComponent extends React.Component {
        static propTypes = {
            label: PropTypes.string.isRequired,
            test: weirdName.func,
            flag: PropTypes.bool,
            bShape: shape({
                something: PropTypes.bool,
                anotherThing: PropTypes.number,
            }).isRequired,
            condition: PropTypes.requiredIf(props => props.flag)
        }
        render() {
            return <h1>Hi there</h1>
        }
    }
    const Bliep = {}
    
    Bliep.test = {
        proppie: {
        propTypes: {
            label: PropTypes.string,
            test: PropTypes.func,
            flag: PropTypes.bool,
            condition: PropTypes.requiredIf(props => props.flag)
            }
        }
    }
    `,
    // output
    '',
    'Correctly transforms a typical file'
)
