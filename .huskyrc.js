module.exports = {
    hooks: {
        'commit-msg': 'd2-style commit check',
        'pre-commit': 'd2-style validate',
        'pre-push':
            'yarn docs && git add README.md && git commit --amend --no-edit',
    },
}
