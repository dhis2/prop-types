import propTypes from 'prop-types'
import { deprecated } from '../deprecated.js'

describe('deprecated', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    jest.spyOn(console, 'warn').mockImplementation(() => null)

    afterEach(() => {
        console.error.mockClear()
        console.warn.mockClear()
    })

    it('warns when props are valid', () => {
        const propType = {
            deprecatedBool: deprecated(
                propTypes.bool,
                'Please do not use anymore'
            ),
        }
        const props = {
            deprecatedBool: false,
        }

        propTypes.checkPropTypes(
            propType,
            props,
            'deprecatedMandatoryBool',
            'TestComponent'
        )

        expect(console.error).toBeCalledTimes(0)
        expect(console.warn).toBeCalledTimes(1)
    })
    it('warns when props are invalid', () => {
        const propType = {
            deprecatedBool: deprecated(
                propTypes.bool,
                'Please do not use anymore'
            ),
        }
        const props = {
            deprecatedBool: 'I aint no bool',
        }

        propTypes.checkPropTypes(
            propType,
            props,
            'deprecatedBool',
            'TestComponent'
        )

        expect(console.error).toBeCalledTimes(1)
        expect(console.warn).toBeCalledTimes(1)
    })
    it('produces one warning per deprecated prop', () => {
        const propType = {
            a: deprecated(propTypes.bool, 'Please do not use anymore'),
            b: deprecated(propTypes.bool, 'Please do not use anymore'),
            c: deprecated(propTypes.bool, 'Please do not use anymore'),
        }
        const props = {
            a: true,
            b: true,
            c: true,
        }

        propTypes.checkPropTypes(
            propType,
            props,
            'deprecatedBool',
            'TestComponent'
        )

        expect(console.error).toBeCalledTimes(0)
        expect(console.warn).toBeCalledTimes(3)

        expect(console.warn).toHaveBeenCalledWith(
            '"a" property of "TestComponent" has been deprecated. Please do not use anymore'
        )
        expect(console.warn).toHaveBeenCalledWith(
            '"b" property of "TestComponent" has been deprecated. Please do not use anymore'
        )
        expect(console.warn).toHaveBeenCalledWith(
            '"c" property of "TestComponent" has been deprecated. Please do not use anymore'
        )
    })

    it('does not repeat warnings when props are re-validated', () => {
        const spy = jest.spyOn(propTypes, 'checkPropTypes')
        const propType = {
            deprecatedBool: deprecated(
                propTypes.bool,
                'Please do not use anymore'
            ),
        }
        const props = {
            deprecatedBool: 'I aint no bool',
        }

        propTypes.checkPropTypes(
            propType,
            props,
            'deprecatedBool',
            'TestComponent'
        )
        propTypes.checkPropTypes(
            propType,
            props,
            'deprecatedBool',
            'TestComponent'
        )

        // Can't explain why the spy is called 4 times, but at least
        // this does verify that the warning will only be showed once
        expect(spy).toBeCalledTimes(4)
        expect(console.warn).toBeCalledTimes(1)
    })
    it('does not produce a warning when the deprecated prop is not passed', () => {
        const propType = {
            deprecatedBool: deprecated(
                propTypes.bool,
                'Please do not use anymore'
            ),
        }
        const props = {
            deprecatedBool: undefined,
        }

        propTypes.checkPropTypes(
            propType,
            props,
            'deprecatedMandatoryBool',
            'TestComponent'
        )

        expect(console.error).toBeCalledTimes(0)
        expect(console.warn).toBeCalledTimes(0)
    })
})
