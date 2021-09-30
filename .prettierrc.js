const { config } = require('@dhis2/cli-style')

module.exports = {
    ...require(config.prettier),
    overrides: [
        {
            files: '**/__testfixtures__/*.js',
            options: {
                // Codemod does not support spreading imports over multiple lines
                printWidth: 10000,
            },
        },
    ],
}
