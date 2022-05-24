const PROP_TYPES_PACKAGE = 'prop-types'
const PROP_TYPE_NAMES = new Set([
    'array',
    'bool',
    'func',
    'number',
    'object',
    'string',
    'symbol',
    'any',
    'arrayOf',
    'element',
    'elementType',
    'instanceOf',
    'node',
    'objectOf',
    'oneOf',
    'oneOfType',
    'shape',
    'exact',
])

const DHIS2_PROP_TYPES_PACKAGE = '@dhis2/prop-types'
const DHIS2_PROP_TYPE_NAMES = new Set([
    'arrayWithLength',
    'conditional',
    'instanceOfComponent',
    'mutuallyExclusive',
    'requiredIf',
])

class PropTypesV1ToV2Codemod {
    constructor(fileInfo, api) {
        this.j = api.jscodeshift
        this.root = this.j(fileInfo.source)
        this.propTypesImportDeclarations = null
        this.dhis2PropTypesImportDeclarations = null
        this.importedMemberNames = {
            defaults: null,
            named: null,
        }
        this.propTypeNames = {
            propTypes: null,
            dhis2PropTypes: null,
        }

        this.transformPropertyValue = this.transformPropertyValue.bind(this)
        this.transformNodePath = this.transformNodePath.bind(this)
    }

    transform() {
        this.setImportDeclarations()

        if (!this.fileHasPropTypesImport()) {
            // Nothing to do here, just return the file as it was received
            return this.root.toSource({ quote: 'single' })
        }

        this.setImportedNames()
        this.setPropTypeNames()

        this.transformImports()
        this.transformDeclarations()

        return this.root.toSource({ quote: 'single' })
    }

    setImportDeclarations() {
        this.propTypesImportDeclarations = this.root.find(
            this.j.ImportDeclaration,
            {
                source: {
                    type: this.j.Literal.name,
                    value: PROP_TYPES_PACKAGE,
                },
            }
        )

        this.dhis2PropTypesImportDeclarations = this.root.find(
            this.j.ImportDeclaration,
            {
                source: {
                    value: DHIS2_PROP_TYPES_PACKAGE,
                },
            }
        )
    }

    fileHasPropTypesImport() {
        return (
            this.propTypesImportDeclarations.length > 0 ||
            this.dhis2PropTypesImportDeclarations.length > 0
        )
    }

    setImportedNames() {
        this.importedMemberNames = [
            ...this.propTypesImportDeclarations.nodes(),
            ...this.dhis2PropTypesImportDeclarations.nodes(),
        ].reduce(
            (acc, node) => {
                node.specifiers.forEach((specifierNode) => {
                    if (
                        specifierNode.type ===
                        this.j.ImportDefaultSpecifier.name
                    ) {
                        acc.defaults.push(specifierNode.local.name)
                    } else {
                        acc.named.push(specifierNode.imported.name)
                    }
                })
                return acc
            },
            { defaults: [], named: [] }
        )
    }

    setPropTypeNames() {
        const matcherFn = (node) =>
            this.importedMemberNames.defaults.some(
                (name) => name === node.object.name
            )
        const propTypesUsedFromDefaultImports = [
            ...this.getPropTypesExpressionStatements()
                .find(this.j.MemberExpression, matcherFn)
                .nodes(),
            ...this.getStaticClassPropertyDefinitions()
                .find(this.j.MemberExpression, matcherFn)
                .nodes(),
            ...this.getMemberExpressionsInGlobalScope().nodes(),
        ].map((node) => node.property.name)

        // Use a Set to dedupe
        const allPropTypeNames = Array.from(
            new Set(
                this.importedMemberNames.named.concat(
                    propTypesUsedFromDefaultImports
                )
            )
        )
        this.propTypeNames = allPropTypeNames.reduce(
            (acc, name) => {
                if (this.isValidDhis2PropTypeName(name)) {
                    acc.dhis2PropTypes.push(name)
                } else {
                    acc.propTypes.push(name)
                }
                return acc
            },
            {
                propTypes: [],
                dhis2PropTypes: [],
            }
        )
    }

    transformImports() {
        const propTypesImportStr =
            this.propTypeNames.propTypes.length > 0
                ? `import PropTypes from 'prop-types'`
                : null
        const dhis2PropTypesNamedImportsStr = this.propTypeNames.dhis2PropTypes
            .sort()
            .join(', ')
        const dhis2PropTypesImportStr =
            this.propTypeNames.dhis2PropTypes.length > 0
                ? `import { ${dhis2PropTypesNamedImportsStr} } from '@dhis2/prop-types'`
                : null

        if (this.propTypesImportDeclarations.length > 0) {
            this.propTypesImportDeclarations.replaceWith(propTypesImportStr)
        }
        if (this.dhis2PropTypesImportDeclarations.length > 0) {
            this.dhis2PropTypesImportDeclarations.replaceWith(
                dhis2PropTypesImportStr
            )
        }

        if (
            this.propTypesImportDeclarations.length === 0 &&
            propTypesImportStr
        ) {
            this.addImport('prop-types', propTypesImportStr)
        }

        if (
            this.dhis2PropTypesImportDeclarations.length === 0 &&
            dhis2PropTypesImportStr
        ) {
            this.addImport('@dhis2/prop-types', dhis2PropTypesImportStr)
        }
    }

    addImport(packageName, importString) {
        const imports = this.root.find(this.j.ImportDeclaration)

        if (imports.length === 0) {
            this.root.get().node.program.body.unshift(importString)
        } else {
            const insertionIndex = imports
                .nodes()
                .findIndex((node) => node.source.value > packageName)

            this.j(imports.at(insertionIndex).get()).insertBefore(importString)
        }
    }

    getPropTypesExpressionStatements() {
        return this.root.find(this.j.ExpressionStatement, {
            expression: {
                left: {
                    type: this.j.MemberExpression.name,
                    property: {
                        type: this.j.Identifier.name,
                        name: 'propTypes',
                    },
                },
            },
        })
    }

    getStaticClassPropertyDefinitions() {
        return this.root.find(this.j.ClassProperty, {
            static: true,
            key: {
                name: 'propTypes',
            },
        })
    }

    getMemberExpressionsInGlobalScope() {
        return this.root.find(this.j.MemberExpression).filter((nodePath) => {
            const { node, scope } = nodePath

            return (
                this.isAnyValidPropTypeName(node.property.name) &&
                this.isImportedDefault(node.object.name) &&
                scope.isGlobal
            )
        })
    }

    getIdentifiersInGlobalScope() {
        return this.root.find(this.j.Identifier).filter((nodePath) => {
            const { node, scope, parentPath } = nodePath
            const isParentMemberExpression =
                parentPath.value.type === this.j.MemberExpression.name
            const isRequiredProp =
                isParentMemberExpression &&
                parentPath.value.property.name === 'isRequired'

            return (
                (!isParentMemberExpression || isRequiredProp) &&
                this.isAnyValidPropTypeName(node.name) &&
                this.isNamedImport(node.name) &&
                scope.isGlobal
            )
        })
    }

    transformDeclarations() {
        // Transform prop-types defined as expression statement, i.e. `SomeComponent.PropTypes = {}`
        this.getPropTypesExpressionStatements()
            .find(this.j.Property)
            .replaceWith(this.transformPropertyValue)

        // Transform prop-types defined as static class property, i.e. `static propTypes = {}`
        this.getStaticClassPropertyDefinitions()
            .find(this.j.Property)
            .replaceWith(this.transformPropertyValue)

        // Transform prop-types used from the default import in the global scope
        this.getMemberExpressionsInGlobalScope().replaceWith(
            this.transformNodePath
        )

        // Transform prop-types used from the default import in the global scope
        this.getIdentifiersInGlobalScope().replaceWith(this.transformNodePath)
    }

    transformPropertyValue(nodePath) {
        const { node } = nodePath
        node.value = this.transformNode(node.value)
        return node
    }

    transformNodePath(nodePath) {
        const { node } = nodePath

        return this.transformNode(node)
    }

    transformNode(node) {
        if (node.type === this.j.Identifier.name) {
            return this.transformIdentifierNode(node)
        }
        if (node.type === this.j.MemberExpression.name) {
            return this.transformMemberExpressionNode(node)
        }
        if (node.type === this.j.CallExpression.name) {
            return this.transformCallExpressionNode(node)
        }

        return node
    }

    /*
     * IdentifierNodes are propType functions being used directly,
     * i.e. `flag: bool`. This is correct for prop-types from
     * `@dhis2/prop-types`, but not for prop-types imported from
     * `prop-types`, which should be used like this `PropTypes.bool`
     */
    transformIdentifierNode(node) {
        // Transform `propTypeFn` to `PropTypes.propTypeFn`
        // console.log('orginalNode', node)
        if (
            this.isAnyValidPropTypeName(node.name) &&
            !this.isValidDhis2PropTypeName(node.name)
        ) {
            // console.log('WILL GET TRANSFORMED', node.name)
            node = this.j.memberExpression(
                this.j.identifier('PropTypes'),
                this.j.identifier(node.name),
                false
            )
        }
        // console.log(node)
        return node
    }

    /*
     * MemberExpressionNodes are prop-type functions being used as
     * property on a default import, i.e. `PropTypes.bool`. This
     * type of usage is correct for prop-types from `prop-types`,
     * but not for DHIS2 prop-types, which should be imported as
     * named imports and then used directly, i.e. `requiredIf`
     */
    transformMemberExpressionNode(node) {
        const isRequiredProp = node.property.name === 'isRequired'

        if (isRequiredProp) {
            /*
             * Recursively apply transformations for prop-type
             * declarations ending in `.isRequired`
             */
            node.object = this.transformNode(node.object)
            return node
        }

        const name = node.property.name

        if (
            !this.isAnyValidPropTypeName(name) ||
            !this.isImportedDefault(node.object.name)
        ) {
            /*
             * Only transform member expressions based on the imported
             * defaults from `prop-types` or `@dhis2-prop-types`
             */
            return node
        }

        if (this.isValidDhis2PropTypeName(name)) {
            // remove PropTypes and call directly
            return this.j.identifier(name)
        } else {
            // Ensure object name is `PropTypes`
            node.object.name = 'PropTypes'
            return node
        }
    }

    transformCallExpressionNode(node) {
        // `PropTypes.shape()` VS `shape()`
        const isMemberExpression =
            node.callee.type === this.j.MemberExpression.name
        const name = isMemberExpression
            ? node.callee.property.name
            : node.callee.name
        const isDhis2PropType = this.isValidDhis2PropTypeName(name)

        // Recursively transform arguments
        if (node.arguments && node.arguments.length > 0) {
            this.transfromFunctionArguments(node.arguments)
        }

        if (!this.isAnyValidPropTypeName(name)) {
            return node
        }

        if (isMemberExpression && isDhis2PropType) {
            /*
             * prop-types from the `@dhis2/prop-types` package should
             * be named imports which are called directly. So this
             * member expression node needs to be transformed to an
             * identifier node
             */
            node.callee = this.j.identifier(name)
            return node
        } else if (isMemberExpression && !isDhis2PropType) {
            /*
             * prop-types from the `prop-types` package should be
             * used as member expression. So we only need to ensure
             * the correct object name `PropTypes` is being used
             */
            node.callee.object.name = 'PropTypes'
            return node
        } else if (!isMemberExpression && !isDhis2PropType) {
            /*
             * prop-types from the `prop-types` package should
             * used as member expression. So this identifier node
             * needs to be transformed to a member expression node
             */
            node.callee = this.j.memberExpression(
                this.j.identifier('PropTypes'),
                this.j.identifier(name),
                false
            )
            return node
        }
        /*
         * No action taken for `!isMemberExpression && isDhis2PropType`:
         * prop-types from the `@dhis2/prop-types` package should
         * be named imports which are called directly. So this is
         * already correct
         */

        return node
    }

    transfromFunctionArguments(functionArguments) {
        functionArguments.forEach((argNode, argIndex) => {
            // arguments can be arrays themselves
            if (argNode.type === this.j.ArrayExpression.name) {
                if (argNode.elements && argNode.elements.length > 0) {
                    argNode.elements.forEach((argNodeEl, argElIndex) => {
                        argNode.elements[argElIndex] =
                            this.transformNode(argNodeEl)
                    })
                }
            } else {
                functionArguments[argIndex] = this.transformNode(argNode)
            }
        })
    }

    isImportedDefault(name) {
        return this.importedMemberNames.defaults.some((n) => n === name)
    }

    isNamedImport(name) {
        return this.importedMemberNames.named.some((n) => n === name)
    }

    isValidDhis2PropTypeName(name) {
        return DHIS2_PROP_TYPE_NAMES.has(name)
    }

    isAnyValidPropTypeName(name) {
        return PROP_TYPE_NAMES.has(name) || DHIS2_PROP_TYPE_NAMES.has(name)
    }
}

module.exports = function propTypesV1ToV3(fileInfo, api) {
    const codemod = new PropTypesV1ToV2Codemod(fileInfo, api)
    return codemod.transform()
}
