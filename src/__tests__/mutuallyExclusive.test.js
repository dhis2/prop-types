import propTypes from 'prop-types'
import { mutuallyExclusive } from '../mutuallyExclusive'

const toWarning = message => `Warning: Failed prop type: ${message}`

describe('mutuallyExclusive', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    afterEach(() => console.error.mockClear())

    describe('Valid', () => {
        it('should work when only one mutually exclusive prop is provided', () => {
            const props = { foo: 42 }
            const mutuallyExclusiveTypes = mutuallyExclusive(
                ['foo', 'bar', 'baz'],
                propTypes.number
            )
            const types = {
                foo: mutuallyExclusiveTypes,
                bar: mutuallyExclusiveTypes,
                baz: mutuallyExclusiveTypes,
            }

            propTypes.checkPropTypes(types, props, 'foo', 'TestComponent')
            propTypes.checkPropTypes(types, props, 'bar', 'TestComponent')
            propTypes.checkPropTypes(types, props, 'baz', 'TestComponent')
            expect(console.error).toBeCalledTimes(0)
        })
    })

    describe('Invalid', () => {
        it('should fail when the provided type is wrong', () => {
            const props = { foo: 'string' }
            const types = {
                bar: mutuallyExclusive(['foo', 'bar', 'baz'], propTypes.number),
                foo: mutuallyExclusive(['foo', 'bar', 'baz'], propTypes.number),
                baz: mutuallyExclusive(['foo', 'bar', 'baz'], propTypes.number),
            }
            const errorMessage = toWarning(
                'Invalid prop `foo` of type `string` supplied to `TestComponent`, expected `number`.'
            )

            propTypes.checkPropTypes(types, props, '____', 'TestComponent')

            expect(console.error).toBeCalledTimes(1)
            expect(console.error).toHaveBeenCalledWith(errorMessage)
        })

        it('should fail when multiple exclusive props are provided', () => {
            const props = { foo: 42, bar: 1337 }
            const mutuallyExclusiveTypes = mutuallyExclusive(
                ['foo', 'bar', 'baz'],
                propTypes.number
            )
            const types = {
                foo: mutuallyExclusiveTypes,
                bar: mutuallyExclusiveTypes,
                baz: mutuallyExclusiveTypes,
            }
            const errorMessage1 = toWarning(
                "Invalid prop `foo` supplied to `TestComponent`, Property 'foo' is mutually exclusive with 'bar', but both have a thruthy value."
            )
            const errorMessage2 = toWarning(
                "Invalid prop `bar` supplied to `TestComponent`, Property 'bar' is mutually exclusive with 'foo', but both have a thruthy value."
            )

            propTypes.checkPropTypes(types, props, 'prop', 'TestComponent')
            propTypes.checkPropTypes(types, props, 'prop', 'TestComponent')
            propTypes.checkPropTypes(types, props, 'prop', 'TestComponent')

            expect(console.error).toBeCalledTimes(2)
            expect(console.error).toHaveBeenNthCalledWith(1, errorMessage1)
            expect(console.error).toHaveBeenNthCalledWith(2, errorMessage2)
        })
    })
})
