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
<dt><a href="#conditional">conditional(propsToPropType)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Conditionally determines a prop type bases on the passed props</p>
</dd>
<dt><a href="#instanceOfComponent">instanceOfComponent(Component)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure the prop value is an instance of a certain component</p>
</dd>
<dt><a href="#mutuallyExclusive">mutuallyExclusive(exlusivePropNames, propType)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure that only one property within a specified list is thruthy
This function will also check if the current property value is of the specified type</p>
</dd>
<dt><a href="#requiredIf">requiredIf(siblingPropName)</a> ⇒ <code>Error</code> | <code>null</code></dt>
<dd><p>Ensure the prop has a value (i.e. treat it as required) when a given sibling prop
also has a value, and ensure the prop is of the correct prop-type</p>
</dd>
</dl>

<a name="arrayWithLength"></a>

## arrayWithLength([min], [max], [propType]) ⇒ <code>Error</code> \| <code>null</code>

Ensure the prop value is an array with a length between a minimum and maximum.
If a third `propType` argument is passed each item in the array needs to be of that prop-type

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error

| Param      | Type                  | Default               | Description                                            |
| ---------- | --------------------- | --------------------- | ------------------------------------------------------ |
| [min]      | <code>number</code>   | <code>0</code>        | The minimal array length                               |
| [max]      | <code>number</code>   | <code>Infinity</code> | The maximal array length                               |
| [propType] | <code>function</code> |                       | The prop-type that each array item needs to conform to |

**Example**

```js
import React from 'react'
import { arrayWithLength } from '@dhis2/prop-types'

const LotsOfLists = (props) => <div {...props}>Does nothing</div>

LotsOfLists.propTypes = {
    arrayWithMaxThreeNumbers: arrayWithLength(0, 3, propTypes.number),
    arrayWithAtLeastSixStrings: arrayWithLength(6, undefined, propTypes.string),
    arrayWithAtLeastTenItems: arrayWithLength(10),
    mandatoryArrayBetweenOneAndTen: arrayWithLength(1, 10).isRequired,
}
```

<a name="conditional"></a>

## conditional(propsToPropTypes) ⇒ <code>Error</code> \| <code>null</code>

Determine the prop type of a prop by the value(s) of a/several passed prop(s).
This will restrict the propType in contrast to `oneOfType`.

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error

| Param           | Type                  | Default | Description                                           |
| --------------- | --------------------- | ------- | ----------------------------------------------------- |
| propsToPropType | <code>Function</code> |         | The function that will determine the actual prop type |

**Example**

```js
import React from 'react'
import { conditional } from '@dhis2/prop-types'

const Select = ({ multiple, selected: _selected, options }) => {
    const selected = multiple ? _selected : [ _selected ]

    return (
        // ...
    )
}

const option = propTypes.shape({
    value: propTypes.string.isReuqired,
    labe: propTypes.string.isReuqired,
})

LotsOfLists.propTypes = {
    // ...
    options: propTypes.arrayOf(option).isRequired,
    selected: conditional(
        props => props.multiple ? propTypes.arrayOf(option) : option
    ).isRequired,
    // ...
}
```

<a name="instanceOfComponent"></a>

## instanceOfComponent(Component) ⇒ <code>Error</code> \| <code>null</code>

Ensure the prop value is an instance of a certain component

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error

| Param     | Type                                         | Description                                                                                                                       |
| --------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Component | <code>function</code> \| <code>string</code> | The component that is expected. Can either be a React component, or a string for built-in components, such as 'span', 'div', etc. |

**Example**

```js
import React from 'react'
import { instanceOfComponent } from '@dhis2/prop-types'
import { Button } from './Button'

const ButtonWrap = ({ children }) => <div>{children}</div>
// This would allow the ButtonWrap to be empty
ButtonWrap.propTypes = {
    children: instanceOfComponent(Button),
}

// Enforce presence of a Button instance
ButtonWrap.propTypes = {
    children: instanceOfComponent(Button).isRequired,
}

// Enforce presence of a multiple children, all Button instances
ButtonWrap.propTypes = {
    children: proptypes.arrayOf(instanceOfComponent(Button)).isRequired,
}
```

<a name="mutuallyExclusive"></a>

## mutuallyExclusive(exlusivePropNames, propType) ⇒ <code>Error</code> \| <code>null</code>

Ensure that only one property within a specified list is thruthy
This function will also check if the current property value is of the specified type

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error

| Param             | Type                              | Description                                                   |
| ----------------- | --------------------------------- | ------------------------------------------------------------- |
| exlusivePropNames | <code>array.&lt;string&gt;</code> | The prop names to be checked                                  |
| propType          | <code>function</code>             | The prop-type that the current prop-value needs to conform to |

**Example**

```js
import React from 'react'
import cx from 'classnames'
import propTypes from 'prop-types'
import { mutuallyExclusive } from '@dhis2/prop-types'

const Alert = ({ danger, warning, success, children }) => (
    <div className={cx({ danger, warning, success })}>{children}</div>
)

const statusPropType = mutuallyExclusive(
    ['danger', 'warning', 'success'],
    propTypes.bool
)

Alert.propTypes = {
    children: propTypes.node,
    danger: statusPropType,
    warning: statusPropType,
    success: statusPropType,
}
```

<a name="requiredIf"></a>

## requiredIf(siblingPropName) ⇒ <code>Error</code> \| <code>null</code>

Ensure the prop has a value (i.e. treat it as required) when a given sibling prop
also has a value, and ensure the prop is of the correct prop-type

**Kind**: global function  
**Returns**: <code>Error</code> \| <code>null</code> - Returns null if all conditions are met, or an error

| Param           | Type                  | Description                  |
| --------------- | --------------------- | ---------------------------- |
| siblingPropName | <code>function</code> | The name of the sibling prop |

**Example**

```js
import React from 'react'
import { requiredIf } from '@dhis2/prop-types'

const Test = ({ someBool, someString }) => (
    <div>
        <h1>someBool: {someBool ? 'true' : 'false'}</h1>
        <h1>someString: {someString}</h1>
    </div>
)
Test.propTypes = {
    someBool: propTypes.bool,
    someString: requiredIf((props) => props.someBool, propTypes.string),
}
```

## Migrating to `@dhis2/prop-types` V3

### Change summary

`@dhis2/prop-types` previously had a direct dependency on the `prop-types` library and also re-exported its exports:

-   In v1 we used to export a default object that included all of the regular prop-types and the DHIS2 custom prop-types. We also exposed all the regular and custom prop-types as named exports.
-   In v2 we took a slightly different approach:
    -   DHIS2 custom prop-types were available as named exports
    -   The default export was an object containing all the custom prop-types
    -   Regular prop-types were exported via the `PropTypes` export
-   And now in v3 we do not re-export anything from the `prop-types` package anymore. Instead we simply expose our own custom prop-types functions as named exports.

### Migrating from v1 to v3

These are the steps to take:

1. Install version v3.0.0, for example by running `yarn upgrade @dhis2/prop-types --latest`. Ensure the `package.json` has an entry for `"@dhis2/prop-types": "^3.x.x"`
1. Prepare the files for the new version by running the codemod provided with this release:
    - Ensure a recent version of `@dhis2/cli` is installed.
    - Ensure the codemod is available by running:
        ```
        d2 utils codemod list
        ```
        You should see `@dhis2/prop-types:prop-types-v1-v3.js` listed.
    - Apply the codemod by running:
        ```
        d2 utils codemod apply @dhis2/prop-types:prop-types-v1-v3.js **/*.js`
        ```
1. Ensure the `prop-types` package is listed as a regular dependency in `package.json`.
1. Scan the project for imports from `@dhis2/prop-types` (doing a global search for `from '@dhis2/prop-types'` will do the trick).
    - If any of these imports are encountered, the project still needs this dependency.
    - Quite likely, the search will yield no results, which means the `@dhis2/prop-types` dependency should be removed.

### Migrating from v2 to v3

No codemod is available to transform the component files, but this should be fairly straightforward:

1. Replace `import { PropTypes } from '@dhis2/prop-types'` with `import PropTypes from 'prop-types'`.
1. The previous step should update most of the component files in the project correctly. If there are still component files left that import from `@dhis2/prop-types`, then probably these are actually using DHIS2 custom prop-types and these files should be addressed individually.

Once the component files have been updated, the dependencies in `package.json` need to be updated in eaxtly the same way as illustrated in step 3 and 4 of the v1 -> 3 migration section.

## Report an issue

The issue tracker can be found in [DHIS2 JIRA](https://jira.dhis2.org)
under the [LIBS](https://jira.dhis2.org/projects/LIBS) project.

Deep links:

-   [Bug](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10006&components=11008)
-   [Feature](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10300&components=11008)
-   [Task](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10003&components=11008)
