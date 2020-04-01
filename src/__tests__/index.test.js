import fs from 'fs'
import path from 'path'
import propTypes from '../index.js'

const propTypesPath = path.join(__dirname, '../propTypes')
const customPropTypes = fs
    .readdirSync(propTypesPath)
    .filter(file => {
        if (file === '.') return false
        if (file === '..') return false

        const filePath = path.join(propTypesPath, file)
        if (fs.lstatSync(filePath).isDirectory()) return false

        return true
    })
    .map(fileName => fileName.replace('.js', ''))

describe('index', () => {
    it('should have a prop type for each custom prop type', () => {
        const actual = Object.keys(propTypes)
        const expected = expect.arrayContaining(customPropTypes)
        expect(actual).toEqual(expected)
    })

    it('should have the actual function as prop type', () => {
        customPropTypes.forEach(customPropType => {
            const propTypePath = path.join(
                propTypesPath,
                `${customPropType}.js`
            )
            const exportedModule = require(propTypePath)
            const exportedPropType = exportedModule[customPropType]

            expect(exportedPropType).toBe(propTypes[customPropType])
        })
    })
})
