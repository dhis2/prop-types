import fs from 'fs'
import path from 'path'
import dhis2PropTypes from '../index.js'

const customPropTypesPath = path.join(__dirname, '../propTypes')
const customPropTypeFilenames = fs
    .readdirSync(customPropTypesPath)
    .filter(file => {
        if (file === '.') return false
        if (file === '..') return false

        const filePath = path.join(customPropTypesPath, file)
        if (fs.lstatSync(filePath).isDirectory()) return false

        return true
    })
    .map(filename => filename.replace('.js', ''))

describe('index', () => {
    it('should export a prop type for each custom prop type file', () => {
        const actual = Object.keys(dhis2PropTypes)
        const expected = expect.arrayContaining(customPropTypeFilenames)

        expect(actual).toEqual(expected)
    })

    it('should reexport the named export in each custom prop type file', () => {
        customPropTypeFilenames.forEach(filename => {
            const fullPath = path.join(customPropTypesPath, `${filename}.js`)
            const exportedModule = require(fullPath)
            // The filename is equal to the name of the named export
            const exportedPropType = exportedModule[filename]

            expect(exportedPropType).toBe(dhis2PropTypes[filename])
        })
    })

    it('should not overwrite existing prop-types in the prop-types package', () => {
        const originalPropTypes = require('prop-types')

        Object.keys(originalPropTypes).forEach(propType => {
            expect(dhis2PropTypes[propType]).toBe(originalPropTypes[propType])
        })
    })
})
