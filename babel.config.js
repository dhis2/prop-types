module.exports = function(api) {
    api.cache.forever()

    let defaultPresets
    const ignore = []

    if (process.env.NODE_ENV === 'test') {
        defaultPresets = ['@babel/preset-env', '@babel/preset-react']
    } else if (process.env.BABEL_ENV === 'modules') {
        defaultPresets = []
        ignore.push('**/*.test.js')
    } else {
        defaultPresets = [
            [
                '@babel/preset-env',
                {
                    modules: 'commonjs',
                },
            ],
        ]
        ignore.push('**/*.test.js')
    }

    return {
        presets: defaultPresets,
        ignore,
    }
}
