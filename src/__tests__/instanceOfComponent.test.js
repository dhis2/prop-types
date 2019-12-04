// eslint-disable-next-line no-unused-vars
import React from 'react'
import propTypes from 'prop-types'
import { instanceOfComponent } from '../instanceOfComponent'

const toWarning = message => `Warning: Failed prop type: ${message}`
const Foo = () => <span />
const Bar = () => <span />
Bar.displayName = 'Bar'

describe('instanceOfComponent', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    afterEach(() => console.error.mockClear())

    const validator = instanceOfComponent(Foo)

    describe('Not inside arrayOf - Valid', () => {
        it('does not return an error with valid props when exactly max length', () => {
            const props = { foo: <Foo /> }
            propTypes.checkPropTypes(
                { foo: validator },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(0)
        })
    })

    describe('Not inside arrayOf - Invalid', () => {
        it('does not return an error with valid props when exactly max length', () => {
            const props = { foo: <Bar /> }
            const errorMessage = toWarning(
                'Invalid prop `foo` supplied to `TestComponent`, expected an instance of `Foo` but found an instance of `Bar`.'
            )
            propTypes.checkPropTypes(
                { foo: validator },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(1)
            expect(console.error).toBeCalledWith(errorMessage)
        })
    })

    describe('Inside arrayOf - Valid', () => {
        it('does not return an error with valid props when exactly max length', () => {
            const props = { foo: [<Foo />, <Foo />, <Foo />] }
            propTypes.checkPropTypes(
                { foo: propTypes.arrayOf(validator) },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(0)
        })
    })

    describe('Inside arrayOf - Invalid', () => {
        it('does not return an error with valid props when exactly max length', () => {
            const props = { foo: [<Foo />, <Bar />, <Foo />] }
            const errorMessage = toWarning(
                'Invalid prop `foo[1]` supplied to `TestComponent`, expected an instance of `Foo` but found an instance of `Bar`.'
            )
            propTypes.checkPropTypes(
                { foo: propTypes.arrayOf(validator) },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(1)
            expect(console.error).toBeCalledWith(errorMessage)
        })
    })
})
