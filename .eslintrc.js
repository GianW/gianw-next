module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true
    },
    "extends": [
        "plugin:react/recommended",
        'eslint:recommended',
        // 'plugin:jest/recommended',
        // 'plugin:jest/style',
        // 'plugin:testing-library/react',
        // 'plugin:jest-dom/recommended',
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react", 'react-hooks'
    ],
    "rules": {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/default-props-match-prop-types': ['error'],
        'react/no-unused-prop-types': ['error'],
        'react/sort-prop-types': ['error'],
        'react/display-name': ['off'],
        'linebreak-style': ['error', 'unix'],
        'prefer-template': 'error',
        'no-alert': 'warn',
        'no-console': 'warn',
        'no-template-curly-in-string': 'error',
        'dot-location': ['error', 'property'],
        'prefer-regex-literals': ['warn'],
    }
};
