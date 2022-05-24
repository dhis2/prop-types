import { any, array, arrayOf, bool, element, elementType, exact, func, instanceOf, node, number, object, objectOf, oneOf, oneOfType, shape, string, symbol } from 'prop-types'
import React from 'react'

const specialProp = shape({
    flag: bool.isRequired,
    id: number.isRequired,
}).isRequired

export class MyComponent extends React.Component {
    static propTypes = {
        requiredArray: array.isRequired,
        requiredBool: bool.isRequired,
        requiredFunc: func.isRequired,
        requiredNumber: number.isRequired,
        requiredObject: object.isRequired,
        requiredString: string.isRequired,
        requiredSymbol: symbol.isRequired,
        requiredNode: node.isRequired,
        requiredElement: element.isRequired,
        requiredElementType: elementType.isRequired,
        requiredMessage: instanceOf(Message).isRequired,
        requiredEnum: oneOf(['News'.isRequired, 'Photos']).isRequired,
        requiredUnion: oneOfType([string.isRequired, number.isRequired, instanceOf(Message).isRequired]).isRequired,
        requiredArrayOf: arrayOf(number).isRequired,
        requiredObjectOf: objectOf(number).isRequired,
        requiredObjectWithShape: shape({
            requiredProperty: string.isRequired,
            requiredProperty2: number.isRequired,
        }).isRequired,
        requiredObjectWithStrictShape: exact({
            requiredProperty: string.isRequired,
            requiredProperty2: number.isRequired,
        }).isRequired,
        requiredFunc2: func.isRequired,
        requiredAny: any.isRequired,
        aDeeplyNestedThing: arrayOf(
            shape({
                subList: arrayOf(
                    shape({
                        id: number.isRequired,
                        content: oneOfType([bool.isRequired, number.isRequired, string]).isRequired,
                    }).isRequired
                ).isRequired,
                id: oneOf([1, 2, 3]).isRequired,
            }).isRequired
        ).isRequired,
        aSpecialProp: specialProp,
    }

    render() {
        return <h1>Hello</h1>
    }
}
