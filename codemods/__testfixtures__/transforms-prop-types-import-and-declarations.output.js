import PropTypes from 'prop-types'
import React from 'react'

const MyComponent = () => {}

const specialProp = PropTypes.shape({
    flag: PropTypes.bool,
    id: PropTypes.number,
})

MyComponent.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
    optionalNode: PropTypes.node,
    optionalElement: PropTypes.element,
    optionalElementType: PropTypes.elementType,
    optionalMessage: PropTypes.instanceOf(Message),
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
    optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
    optionalObjectWithShape: PropTypes.shape({
        optionalProperty: PropTypes.string,
        requiredProperty: PropTypes.number,
    }),
    optionalObjectWithStrictShape: PropTypes.exact({
        optionalProperty: PropTypes.string,
        requiredProperty: PropTypes.number,
    }),
    requiredFunc: PropTypes.func,
    requiredAny: PropTypes.any,
    aDeeplyNestedThing: PropTypes.arrayOf(
        PropTypes.shape({
            subList: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    content: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                })
            ),
            id: PropTypes.oneOf([1, 2, 3]),
        })
    ),
    aSpecialProp: specialProp,
}
