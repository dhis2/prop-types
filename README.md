# DHIS2 propTypes

This package contains common prop types used across dhis2 apps and libraries.

## Installation
```bash
yarn add @dhis2/prop-types
```

## Available prop-types

## Functions

<dl>
<dt><a href="#arrayWithLength">arrayWithLength([min], [max], [propType])</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure the prop value is an array with a length between a minimum and maximum.
If a third <code>propType</code> argument is passed each item in the array needs to be of that prop-type</p>
</dd>
<dt><a href="#instanceOfComponent">instanceOfComponent(Component)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure the prop value is an instance of a certain component</p>
</dd>
<dt><a href="#mutuallyExclusive">mutuallyExclusive(exlusivePropNames, propType)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure that only one property within a specified list is thruthy
This function will also check if the current property value is of the specified type</p>
</dd>
<dt><a href="#requiredIf">requiredIf(siblingPropName)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure the prop value is thruthy when a sibling prop also has a thruthy value,
and ensure the prop is of the correct prop-type</p>
</dd>
</dl>

<a name="arrayWithLength"></a>

## arrayWithLength([min], [max], [propType]) ⇒ <code>Error</code> \| <code>null</code>
Ensure the prop value is an array with a length between a minimum and maximum.
If a third `propType` argument is passed each item in the array needs to be of that prop-type

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>0</code> | The minimal array length |
| [max] | <code>number</code> | <code>Infinity</code> | The maximal array length |
| [propType] | <code>function</code> |  | The prop-type that each array item needs to conform to |

**Example**  
```js
import React from 'react'
import { arrayWithLength } from '@dhis2/prop-types'

const LotsOfLists = props => <div {...props}>Does nothing</div>

LotsOfLists.propTypes = {
    arrayWithMaxThreeNumbers: arrayWithLength(0, 3, propTypes.number),
    arrayWithAtLeastSixStrings: arrayWithLength(6, undefined, propTypes.string),
    arrayWithAtLeastTenItems: arrayWithLength(10),
    mandatoryArrayBetweenOneAndTen: arrayWithLength(1,10).isRequired,
}
```
<a name="instanceOfComponent"></a>

## instanceOfComponent(Component) ⇒ <code>Error</code> \| <code>null</code>
Ensure the prop value is an instance of a certain component

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error  

| Param | Type | Description |
| --- | --- | --- |
| Component | <code>function</code> \| <code>string</code> | The component that is expected. Can either be a React component, or a string for built-in components, such as 'span', 'div', etc. |

**Example**  
```js
import React from 'react'
import { instanceOfComponent } from '@dhis2/prop-types'
import { Button } from './Button'

const ButtonWrap = ({ children }) => <div>{children}</div>
// This would allow the ButtonWrap to be empty
ButtonWrap.propTypes = {
    children: instanceOfComponent(Button)
}

// Enforce presence of a Button instance
ButtonWrap.propTypes = {
    children: instanceOfComponent(Button).isRequired
}
```
<a name="mutuallyExclusive"></a>

## mutuallyExclusive(exlusivePropNames, propType) ⇒ <code>Error</code> \| <code>null</code>
Ensure that only one property within a specified list is thruthy
This function will also check if the current property value is of the specified type

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error  

| Param | Type | Description |
| --- | --- | --- |
| exlusivePropNames | <code>array.&lt;string&gt;</code> | The prop names to be checked |
| propType | <code>function</code> | The prop-type that the current prop-value needs to conform to |

**Example**  
```js
import React from 'react'
import cx from 'classnames'
import propTypes from 'prop-types'
import { mutuallyExclusive } from '@dhis2/prop-types'

const Alert = ({ danger, warning, success, children }) => (
    <div className={cx({danger, warning, success})}>
        {children}
    </div>
)

const statusPropType = mutuallyExclusive(['danger', 'warning', 'success'], propTypes.bool)

Alert.propTypes = {
    children: propTypes.node,
    danger: statusPropType,
    warning: statusPropType,
    success: statusPropType,
}
```
<a name="requiredIf"></a>

## requiredIf(siblingPropName) ⇒ <code>Error</code> \| <code>null</code>
Ensure the prop value is thruthy when a sibling prop also has a thruthy value,
and ensure the prop is of the correct prop-type

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error  

| Param | Type | Description |
| --- | --- | --- |
| siblingPropName | <code>string</code> | The name of the sibling prop |

**Example**  
```js
import React from 'react'
import { propTypes } from '@dhis2/prop-types'

const Test = ({ someBool, someString }) => (
    <div>
        <h1>someBool: {someBool ? 'true' : 'false'}</h1>
        <h1>someString: {someString}</h1>
    </div>
)
Test.propTypes = {
    someBool: propTypes.bool,
    someString: propTypes.requiredIf('someBool', propTypes.string),
}
```
