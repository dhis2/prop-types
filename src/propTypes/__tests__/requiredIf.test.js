import propTypes from 'prop-types'
import { requiredIf } from '../requiredIf'

const toWarning = message => `Warning: Failed prop type: ${message}`

describe('requiredIf', () => {
    const propType = { foo: requiredIf(props => !!props.bar, propTypes.string) }

    jest.spyOn(console, 'error').mockImplementation(() => null)
    afterEach(() => console.error.mockClear())

    describe('Valid', () => {
        let props

        afterEach(() => {
            propTypes.checkPropTypes(propType, props, 'foo', 'TestComponent')

            expect(console.error).toBeCalledTimes(0)
        })

        it('Condition is true, prop is given', () => {
            props = { foo: 'foo', bar: 'bar' }
        })

        it('Condition is false, prop is not given', () => {
            props = {}
        })
    })

    describe('Invalid', () => {
        let props
        let errorMessage
        // for some reason the checkPropTypes function does not print an error
        // again if the error message AND the component name are identical
        // So we need different component names
        let componentName

        afterEach(() => {
            propTypes.checkPropTypes(propType, props, 'prop', componentName)

            expect(console.error).toBeCalledTimes(1)
            expect(console.error).toBeCalledWith(errorMessage)
        })

        it('Condition is false, prop has wrong type', () => {
            props = { foo: 42 }
            componentName = 'TestComponent1'
            errorMessage = toWarning(
                'Invalid prop `foo` of type `number` supplied to `TestComponent1`, expected `string`.'
            )
        })

        it('Condition is true, prop has wrong type', () => {
            props = { foo: 42, bar: 'foo' }
            componentName = 'TestComponent2'
            errorMessage = toWarning(
                'Invalid prop `foo` of type `number` supplied to `TestComponent2`, expected `string`.'
            )
        })

        it('Condition is true, prop is not given', () => {
            props = { bar: 42 }
            componentName = 'TestComponent3'
            errorMessage = toWarning(
                'Invalid prop `foo` supplied to `TestComponent3`, this prop is conditionally required but has value `undefined`.'
            )
        })
    })
})
