import propTypes from 'prop-types'
import { conditional } from '../conditional'

describe('conditional', () => {
    const propType = {
        multiple: propTypes.bool,
        selected: conditional(props =>
            props.multiple
                ? propTypes.arrayOf(propTypes.string)
                : propTypes.string
        ),
    }

    jest.spyOn(console, 'error').mockImplementation(() => null)
    afterEach(() => console.error.mockClear())

    describe('Valid', () => {
        let props

        afterEach(() => {
            propTypes.checkPropTypes(
                propType,
                props,
                'selected',
                'TestComponent'
            )

            expect(console.error).toBeCalledTimes(0)
        })

        it('Multiple is false and selected is a stirng', () => {
            props = {
                multiple: false,
                selected: 'foo',
            }
        })

        it('Multiple is true and selected is a stirng-array', () => {
            props = {
                multiple: true,
                selected: ['foo', 'bar'],
            }
        })
    })

    describe('Invalid', () => {
        let props
        // for some reason the checkPropTypes function does not print an error
        // again if the error message AND the component name are identical
        // So we need different component names
        let componentName

        afterEach(() => {
            propTypes.checkPropTypes(propType, props, 'prop', componentName)
            expect(console.error).toBeCalledTimes(1)
        })

        it('Multiple is true and selected is a string', () => {
            props = {
                multiple: true,
                selected: 'foo',
            }
        })

        it('Multiple is false and selected is a stirng-array', () => {
            props = {
                multiple: false,
                selected: ['foo', 'bar'],
            }
        })
    })
})
