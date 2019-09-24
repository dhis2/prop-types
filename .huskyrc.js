module.exports = {
    hooks: {
        'commit-msg': 'd2-style commit check',
        'pre-commit': 'd2-style validate && yarn docs && git add README.md',
    },
}
