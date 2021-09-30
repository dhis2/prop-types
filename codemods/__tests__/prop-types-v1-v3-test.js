jest.autoMockOff()
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const defineTest = require('jscodeshift/dist/testUtils').defineTest
const transform = require('../prop-types-v1-v3.js')
const transformOptions = {}

/*******************************
 * DHIS2 prop-types transforms *
 *******************************/

// optional props
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-dhis2-prop-types-import-and-declarations'
)

// required props
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-required-dhis2-prop-types-import-and-declarations'
)

// optional props declared in static class property declaration
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-dhis2-prop-types-import-and-static-declarations'
)

// required props declared in static class property declaration
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-required-dhis2-prop-types-import-and-static-declarations'
)

/*************************
 * prop-types transforms *
 *************************/

// optional props
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-prop-types-import-and-declarations'
)

// required props
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-required-prop-types-import-and-declarations'
)

// optional props declared in static class property declaration
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-prop-types-import-and-static-declarations'
)

// required props declared in static class property declaration
defineTest(
    __dirname,
    'prop-types-v1-v3',
    null,
    'transforms-required-prop-types-import-and-static-declarations'
)

/************
 * Assorted *
 ************/

defineInlineTest(
    transform,
    transformOptions,
    // input
    `import PropTypes from '@dhis2/prop-types'`,
    // output
    '',
    'Clears the @dhis2/prop-types import if not used'
)

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
    import PropTypes from '@dhis2/prop-types'
    import propTypes from 'prop-types'
    `,
    // output
    '',
    'Clears the prop-types import if not used'
)

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
    import A from 'aaaa'
    import PropTypes from '@dhis2/prop-types'
    import React from 'react'

    const SomeComponent = {}

    SomeComponent.propTypes = {
        flag: PropTypes.bool,
    }
    `,
    // output
    `
    import A from 'aaaa'
    import PropTypes from 'prop-types'
    import React from 'react'

    const SomeComponent = {}

    SomeComponent.propTypes = {
        flag: PropTypes.bool,
    }
    `,
    'Replaces the @dhis2/prop-types import with prop-types if no DHIS2 prop types are used'
)

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
    import PropTypes, { number } from '@dhis2/prop-types'

    const SomeComponent = {}

    const dummy = () => {
        const PropTypes = {
            bool,
        }
        const number =  1
        const object = {
            p: PropTypes,
            n: number
        }
    }

    SomeComponent.propTypes = {
        flag: PropTypes.bool,
        count: number
    }
    `,
    // output
    `
    import PropTypes from 'prop-types'

    const SomeComponent = {}

    const dummy = () => {
        const PropTypes = {
            bool,
        }
        const number =  1
        const object = {
            p: PropTypes,
            n: number
        }
    }

    SomeComponent.propTypes = {
        flag: PropTypes.bool,
        count: PropTypes.number
    }
    `,
    'Does not tranform variables in non-global scope that share names with prop-types functions'
)

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
    import PropTypes from '@dhis2/prop-types'

    const SomeComponent = {}

    SomeComponent.propTypes = {
        flag: PropTypes.bool,
        customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error('OOPS');
            }
        },
    }
    `,
    // output
    `
    import PropTypes from 'prop-types'

    const SomeComponent = {}

    SomeComponent.propTypes = {
        flag: PropTypes.bool,
        customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error('OOPS');
            }
        },
    }
    `,
    'Does not transform custom propType functions'
)
