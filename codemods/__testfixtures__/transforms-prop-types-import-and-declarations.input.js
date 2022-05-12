import { any, array, arrayOf, bool, element, elementType, exact, func, instanceOf, node, number, object, objectOf, oneOf, oneOfType, shape, string, symbol } from 'prop-types'
import React from 'react'

const MyComponent = () => {}

const specialProp = shape({
    flag: bool,
    id: number,
})

MyComponent.propTypes = {
    optionalArray: array,
    optionalBool: bool,
    optionalFunc: func,
    optionalNumber: number,
    optionalObject: object,
    optionalString: string,
    optionalSymbol: symbol,
    optionalNode: node,
    optionalElement: element,
    optionalElementType: elementType,
    optionalMessage: instanceOf(Message),
    optionalEnum: oneOf(['News', 'Photos']),
    optionalUnion: oneOfType([string, number, instanceOf(Message)]),
    optionalArrayOf: arrayOf(number),
    optionalObjectOf: objectOf(number),
    optionalObjectWithShape: shape({
        optionalProperty: string,
        requiredProperty: number,
    }),
    optionalObjectWithStrictShape: exact({
        optionalProperty: string,
        requiredProperty: number,
    }),
    requiredFunc: func,
    requiredAny: any,
    aDeeplyNestedThing: arrayOf(
        shape({
            subList: arrayOf(
                shape({
                    id: number,
                    content: oneOfType([bool, number, string]),
                })
            ),
            id: oneOf([1, 2, 3]),
        })
    ),
    aSpecialProp: specialProp,
}
