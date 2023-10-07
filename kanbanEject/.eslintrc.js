module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-expressions": ['error', { allowShortCircuit: true }],
        "no-param-reassign": ['error', { props: true, ignoreProptyModificationsFor: ['evt'] }],
        'react/prop-types': ['error', { skipUndeclared: true }],
        'react/no-unknown-property': ['error', { ignore: ['css'] }],

    }
}
