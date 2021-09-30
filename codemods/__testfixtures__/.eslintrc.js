const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'react/no-unused-prop-types': 'off',
        'react/sort-prop-types': 'off',
    },
}
