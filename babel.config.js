module.exports = function(api) {
    api.cache.forever()

    let defaultPresets

    if (process.env.BABEL_ENV === 'modules') {
        defaultPresets = []
    } else {
        defaultPresets = [
            [
                '@babel/preset-env',
                {
                    modules: 'commonjs',
                },
            ],
        ]
    }

    return {
        presets: defaultPresets,
    }
}