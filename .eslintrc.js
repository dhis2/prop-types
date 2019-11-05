const { config } = require('@dhis2/cli-style')

module.exports = {
    parser: 'babel-eslint',
    extends: ['eslint:recommended', config.eslint],
    rules: {
        'max-params': ['error', { max: 5 }],
    },
}
