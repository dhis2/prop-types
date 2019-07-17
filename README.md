# DHIS2 propTypes

This package contains common prop types used across dhis2 apps and libraries.

## Installation
```bash
yarn add @dhis2/prop-types
```

## Usage

Just import the propType that you'd like to use

```jsx
import React from 'react'
import propTypes from 'propTypes'
import { mutuallyExclusive } from '@dhis2/prop-types'

const Comp = (foo, bar, baz) => (
  foo ? 'foo'
    : bar ? 'bar'
      : baz ? 'baz'
        : 'foobarbaz'
)

const propTypeFooBarBaz = mutuallyExclusive(
  [ 'foo', 'bar', 'baz' ],
  propTypes.bool,
)

Comp.propTypes = {
  foo: propTypeFooBarBaz,
  bar: propTypeFooBarBaz,
  baz: propTypeFooBarBaz,
}
```
