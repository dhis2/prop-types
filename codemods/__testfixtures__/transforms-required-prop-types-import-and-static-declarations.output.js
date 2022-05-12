import PropTypes from 'prop-types'
import React from 'react'

const specialProp = PropTypes.shape({
    flag: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
}).isRequired

export class MyComponent extends React.Component {
    static propTypes = {
        requiredArray: PropTypes.array.isRequired,
        requiredBool: PropTypes.bool.isRequired,
        requiredFunc: PropTypes.func.isRequired,
        requiredNumber: PropTypes.number.isRequired,
        requiredObject: PropTypes.object.isRequired,
        requiredString: PropTypes.string.isRequired,
        requiredSymbol: PropTypes.symbol.isRequired,
        requiredNode: PropTypes.node.isRequired,
        requiredElement: PropTypes.element.isRequired,
        requiredElementType: PropTypes.elementType.isRequired,
        requiredMessage: PropTypes.instanceOf(Message).isRequired,
        requiredEnum: PropTypes.oneOf(['News'.isRequired, 'Photos']).isRequired,
        requiredUnion: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired, PropTypes.instanceOf(Message).isRequired]).isRequired,
        requiredArrayOf: PropTypes.arrayOf(PropTypes.number).isRequired,
        requiredObjectOf: PropTypes.objectOf(PropTypes.number).isRequired,
        requiredObjectWithShape: PropTypes.shape({
            requiredProperty: PropTypes.string.isRequired,
            requiredProperty2: PropTypes.number.isRequired,
        }).isRequired,
        requiredObjectWithStrictShape: PropTypes.exact({
            requiredProperty: PropTypes.string.isRequired,
            requiredProperty2: PropTypes.number.isRequired,
        }).isRequired,
        requiredFunc2: PropTypes.func.isRequired,
        requiredAny: PropTypes.any.isRequired,
        aDeeplyNestedThing: PropTypes.arrayOf(
            PropTypes.shape({
                subList: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        content: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.number.isRequired, PropTypes.string]).isRequired,
                    }).isRequired
                ).isRequired,
                id: PropTypes.oneOf([1, 2, 3]).isRequired,
            }).isRequired
        ).isRequired,
        aSpecialProp: specialProp,
    }

    render() {
        return <h1>Hello</h1>
    }
}
