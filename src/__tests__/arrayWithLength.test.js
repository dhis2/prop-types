import propTypes from 'prop-types'
import { arrayWithLength } from '../arrayWithLength'

const toWarning = message => `Warning: Failed prop type: ${message}`

describe('arrayWithLength', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    afterEach(() => console.error.mockClear())

    const validator = arrayWithLength(3, 6, propTypes.number)

    describe('Not inside arrayOf - Valid', () => {
        let props

        afterEach(() => {
            propTypes.checkPropTypes(
                { foo: validator },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(0)
        })

        it('does not return an error with valid props when exactly max length', () => {
            props = { foo: [0, 1, 1, 2, 3, 5] }
        })

        it('does not return an error with valid props when exactly min length', () => {
            props = { foo: [0, 1, 1] }
        })

        it('does not return an error with valid props when between min and max length', () => {
            props = { foo: [0, 1, 1, 2] }
        })
    })

    describe('Not inside arrayOf - Invalid', () => {
        let propType = validator
        let props
        let expectedMessage

        afterEach(() => {
            propTypes.checkPropTypes(
                { foo: propType },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(1)
            expect(console.error).toBeCalledWith(expectedMessage)
        })

        it('returns an error when exceeding max length', () => {
            props = { foo: [0, 1, 1, 2, 3, 5, 8] }
            expectedMessage = toWarning(
                'Invalid prop `foo` supplied to `TestComponent`, array has a length of 7, but the maximum is 6'
            )
        })

        it('returns an error when less than min length', () => {
            props = { foo: [0, 1] }
            expectedMessage = toWarning(
                'Invalid prop `foo` supplied to `TestComponent`, array has a length of 2, but the minimum is 3'
            )
        })

        it('returns an error when prop is not an array', () => {
            props = { foo: 'bar' }
            expectedMessage = toWarning(
                'Invalid prop `foo` supplied to `TestComponent`, prop value is not an array.'
            )
        })

        it('returns an error when array items do not match propType', () => {
            props = { foo: [0, 1, 'foo'] }
            expectedMessage = toWarning(
                'Invalid prop `foo[2]` of type `string` supplied to `TestComponent`, expected `number`.'
            )
        })

        it('returns an error when required but nothing provided', () => {
            propType = validator.isRequired
            props = {}
            expectedMessage = toWarning(
                'Invalid prop `foo` supplied to `TestComponent`, this prop is required but no value was found.'
            )
        })
    })

    describe('Inside arrayOf - Valid', () => {
        let props

        afterEach(() => {
            propTypes.checkPropTypes(
                { foo: propTypes.arrayOf(validator) },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(0)
        })

        it('does not return an error with valid props when exactly max length', () => {
            props = { foo: [[0, 1, 1, 2, 3, 5]] }
        })

        it('does not return an error with valid props when exactly min length', () => {
            props = { foo: [[0, 1, 1]] }
        })

        it('does not return an error with valid props when between min and max length', () => {
            props = { foo: [[0, 1, 1, 2]] }
        })
    })

    describe('Inside arrayOf - Invalid', () => {
        let propType = propTypes.arrayOf(validator)
        let props
        let expectedMessage

        afterEach(() => {
            propTypes.checkPropTypes(
                { foo: propType },
                props,
                'prop',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(1)
            expect(console.error).toBeCalledWith(expectedMessage)
        })

        it('returns an error when exceeding max length', () => {
            props = { foo: [[0, 1, 1, 2, 3, 5, 8]] }
            expectedMessage = toWarning(
                'Invalid prop `foo[0]` supplied to `TestComponent`, array has a length of 7, but the maximum is 6'
            )
        })

        it('returns an error when less than min length', () => {
            props = { foo: [[0, 1]] }
            expectedMessage = toWarning(
                'Invalid prop `foo[0]` supplied to `TestComponent`, array has a length of 2, but the minimum is 3'
            )
        })

        it('returns an error when prop is not an array', () => {
            props = { foo: ['bar'] }
            expectedMessage = toWarning(
                'Invalid prop `foo[0]` supplied to `TestComponent`, prop value is not an array.'
            )
        })

        it('returns an error when array items do not match propType', () => {
            props = { foo: [[0, 1, 'foo']] }
            expectedMessage =
                'Warning: Failed foo[0] type: Invalid foo[0] `prop[0][2]` of type `string` supplied to `TestComponent`, expected `number`.'
        })

        it('returns an error when required but nothing provided', () => {
            propType = propTypes.arrayOf(validator).isRequired
            props = {}
            expectedMessage = toWarning(
                'The prop `foo` is marked as required in `TestComponent`, but its value is `undefined`.'
            )
        })
    })
})
