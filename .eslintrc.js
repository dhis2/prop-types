const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslint],
    rules: {
        'max-params': ['error', { max: 5 }],
    },
}
