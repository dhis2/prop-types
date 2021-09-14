const PROP_TYPES_PACKAGE = 'prop-types'
const DHIS2_PROP_TYPES_PACKAGE = '@dhis2/prop-types'
const DHIS2_PROP_TYPES_EXPORTS = new Set([
    'arrayWithLength',
    'conditional',
    'instanceOfComponent',
    'mutuallyExclusive',
    'requiredIf',
])

module.exports = function propTypesV1ToV3(fileInfo, api) {
    const j = api.jscodeshift
    const root = j(fileInfo.source)

    // No import from @dhis2/prop-types, nothing to transform
    if (getDhis2PropTypesImportDeclarations(j, root).length === 0) {
        return root.toSource({ quote: 'single' })
    }

    const {
        defaultImportNames,
        propTypeNames,
        dhis2PropTypeNames,
    } = getPropTypeNames(j, root)

    transformImports(j, root, propTypeNames, dhis2PropTypeNames)

    // Transform prop-types defined as expression statement, i.e. `SomeComponent.PropTypes = {}`
    getPropTypesExpressionStatements(j, root)
        .find(j.Property)
        .replaceWith(
            transformPropTypesDeclaration.bind(null, j, defaultImportNames)
        )

    // Transform prop-types defined as static class property, i.e. `static propTypes = {}`
    getStaticClassPropertyDefinitions(j, root)
        .find(j.Property)
        .replaceWith(
            transformPropTypesDeclaration.bind(null, j, defaultImportNames)
        )

    return root.toSource({ quote: 'single' })
}

function getPropTypesImportDeclarations(j, root) {
    return root.find(j.ImportDeclaration, {
        source: {
            type: j.Literal.name,
            value: PROP_TYPES_PACKAGE,
        },
    })
}

function getDhis2PropTypesImportDeclarations(j, root) {
    return root.find(j.ImportDeclaration, {
        source: {
            value: DHIS2_PROP_TYPES_PACKAGE,
        },
    })
}

function getPropTypesExpressionStatements(j, root) {
    return root.find(j.ExpressionStatement, {
        expression: {
            left: {
                type: j.MemberExpression.name,
                property: {
                    type: j.Identifier.name,
                    name: 'propTypes',
                },
            },
        },
    })
}

function getStaticClassPropertyDefinitions(j, root) {
    return root.find(j.ClassProperty, {
        static: true,
        key: {
            name: 'propTypes',
        },
    })
}

function getPropTypeNames(j, root) {
    const allImportDeclarationNodes = [
        ...getPropTypesImportDeclarations(j, root).nodes(),
        ...getDhis2PropTypesImportDeclarations(j, root).nodes(),
    ]
    const {
        defaultImportNames,
        namedImports,
    } = allImportDeclarationNodes.reduce(
        (acc, node) => {
            node.specifiers.forEach(specifierNode => {
                if (specifierNode.type === j.ImportDefaultSpecifier.name) {
                    acc.defaultImportNames.push(specifierNode.local.name)
                } else {
                    acc.namedImports.push(specifierNode.imported.name)
                }
            })
            return acc
        },
        { defaultImportNames: [], namedImports: [] }
    )
    const matcherFn = node =>
        defaultImportNames.some(name => name === node.object.name)
    const propTypesUsedFromDefaultImports = [
        ...getPropTypesExpressionStatements(j, root)
            .find(j.MemberExpression, matcherFn)
            .nodes(),
        ...getStaticClassPropertyDefinitions(j, root)
            .find(j.MemberExpression, matcherFn)
            .nodes(),
    ].map(node => node.property.name)
    // Use a Set to dedupe
    const allPropTypeNames = Array.from(
        new Set(namedImports.concat(propTypesUsedFromDefaultImports))
    )
    const { propTypeNames, dhis2PropTypeNames } = allPropTypeNames.reduce(
        (acc, name) => {
            if (DHIS2_PROP_TYPES_EXPORTS.has(name)) {
                acc.dhis2PropTypeNames.push(name)
            } else {
                acc.propTypeNames.push(name)
            }
            return acc
        },
        {
            propTypeNames: [],
            dhis2PropTypeNames: [],
        }
    )

    return { defaultImportNames, propTypeNames, dhis2PropTypeNames }
}

function transformImports(j, root, propTypeNames, dhis2PropTypeNames) {
    const propTypesImportStr =
        propTypeNames.length > 0 ? `import PropTypes from 'prop-types` : null
    const dhis2PropTypesNamedImportsStr = dhis2PropTypeNames.join(', ')
    const dhis2PropTypesImportStr =
        dhis2PropTypeNames.length > 0
            ? `import { ${dhis2PropTypesNamedImportsStr} } from '@dhis2/prop-types`
            : null
    const propTypesImports = getPropTypesImportDeclarations(j, root)
    const dhis2PropTypesImports = getDhis2PropTypesImportDeclarations(j, root)

    if (propTypesImports.length > 0) {
        propTypesImports.replaceWith(propTypesImportStr)
    }
    if (dhis2PropTypesImports.length > 0) {
        dhis2PropTypesImports.replaceWith(dhis2PropTypesImportStr)
    }

    if (propTypesImports.length === 0 && propTypesImportStr) {
        addImport(j, root, 'prop-types', propTypesImportStr)
    }

    if (dhis2PropTypesImports.length === 0 && dhis2PropTypesImportStr) {
        addImport(j, root, '@dhis2/prop-types', dhis2PropTypesImportStr)
    }
}

function addImport(j, root, packageName, importString) {
    const imports = root.find(j.ImportDeclaration)

    if (imports.length === 0) {
        root.get().node.program.body.unshift(importString)
    } else {
        const insertionIndex = imports
            .nodes()
            .findIndex(node => node.source.value > packageName)

        j(imports.at(insertionIndex).get()).insertBefore(importString)
    }
}

function transformPropTypesDeclaration(j, defaultImportNames, nodePath) {
    const { node } = nodePath
    node.value = transformNodeValue(j, defaultImportNames, node.value)
    return node
}

function transformNodeValue(j, defaultImportNames, nodeValue) {
    if (nodeValue.type === j.Identifier.name) {
        return transformIdentifierNodeValue(j, nodeValue)
    }
    if (nodeValue.type === j.MemberExpression.name) {
        return transformMemberExpressionNodeValue(
            j,
            defaultImportNames,
            nodeValue
        )
    }
    if (nodeValue.type === j.CallExpression.name) {
        return transformCallExpressionNode(j, nodeValue)
    }
}

/*
 * IdentifierNodes are propType functions being used directly,
 * i.e. `flag: bool`. This is correct for prop-types from
 * `@dhis2/prop-types`, but not for prop-types imported from
 * `prop-types`, which should be used like this `PropTypes.bool`
 */
function transformIdentifierNodeValue(j, nodeValue) {
    const name = nodeValue.name
    const isDhis2PropType = DHIS2_PROP_TYPES_EXPORTS.has(name)

    if (isDhis2PropType) {
        return nodeValue
    }

    // Transform `propTypeFn` to `PropTypes.propTypeFn`
    return j.memberExpression(
        j.identifier('PropTypes'),
        j.identifier(name),
        false
    )
}

/*
 * MemberExpressionNodes are prop-type functions being used as
 * property on a default import, i.e. `PropTypes.bool`. This
 * type of usage is correct for prop-types from `prop-types`,
 * but not for DHIS2 prop-types, which should be imported as
 * named imports and then used directly, i.e. `requiredIf`
 */
function transformMemberExpressionNodeValue(j, defaultImportNames, nodeValue) {
    const isRequiredProp = nodeValue.property.name === 'isRequired'

    if (isRequiredProp) {
        /*
         * Recursively apply transformations for prop-type
         * declarations ending in `.isRequired`
         */
        nodeValue.object = transformNodeValue(
            j,
            defaultImportNames,
            nodeValue.object
        )
        return nodeValue
    }

    const name = nodeValue.property.name
    const isDhis2PropType = DHIS2_PROP_TYPES_EXPORTS.has(name)
    const objectName = nodeValue.object.name
    const isImportedDefault = defaultImportNames.some(
        name => name === objectName
    )

    if (!isImportedDefault) {
        /*
         * Only transform member expressions based on the imported
         * defaults from `prop-types` or `@dhis2-prop-types`
         */
        return nodeValue
    }

    if (isDhis2PropType) {
        // remove PropTypes and call directly
        return j.identifier(name)
    } else {
        // Ensure object name is `PropTypes`
        nodeValue.object.name = 'PropTypes'
        return nodeValue
    }
}

function transformCallExpressionNode(j, nodeValue) {
    // `PropTypes.shape()` VS `shape()`
    const isMemberExpression = nodeValue.callee.type === j.MemberExpression.name
    const name = isMemberExpression
        ? nodeValue.callee.property.name
        : nodeValue.callee.name
    const isDhis2PropType = DHIS2_PROP_TYPES_EXPORTS.has(name)

    if (isMemberExpression && isDhis2PropType) {
        /*
         * prop-types from the `@dhis2/prop-types` package should
         * be named imports which are called directly. So this
         * member expression node needs to be transformed to an
         * identifier node
         */
        nodeValue.callee = j.identifier(name)
        return nodeValue
    } else if (isMemberExpression && !isDhis2PropType) {
        /*
         * prop-types from the `prop-types` package should be
         * used as member expression. So we only need to ensure
         * the correct object name `PropTypes` is being used
         */
        nodeValue.callee.object.name = 'PropTypes'
        return nodeValue
    } else if (!isMemberExpression && !isDhis2PropType) {
        /*
         * prop-types from the `prop-types` package should
         * used as member expression. So this identifier node
         * needs to be transformed to a member expression node
         */
        nodeValue.callee = j.memberExpression(
            j.identifier('PropTypes'),
            j.identifier(name),
            false
        )
        return nodeValue
    }
    /*
     * No action taken for `!isMemberExpression && isDhis2PropType`:
     * prop-types from the `@dhis2/prop-types` package should
     * be named imports which are called directly. So this is
     * already correct
     */

    return nodeValue
}
