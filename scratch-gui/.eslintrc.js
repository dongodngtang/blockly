module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react', 'plugin:import/errors'],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    globals: {
        process: true,
        Blockly: true
    },
    rules: {
        'import/no-mutable-exports': 'error',
        'import/no-commonjs': 'off',
        'import/no-amd': 'error',
        'import/no-nodejs-modules': 'error',
        'react/jsx-no-literals': 'error',
        'no-confusing-arrow': ['error', {
            'allowParens': true
        }],
        'no-unused-vars': 'warn',
        'react/forbid-prop-types': 'off',
        'array-callback-return': 'warn',
        'react/jsx-sort-props': 'off',
        'no-console': 'warn',
        'object-curly-spacing': ['error', 'always'],
        'no-invalid-this': 'off',
        'indent': ['error', 2],
        'react/jsx-indent': ['error', 2],
        'react/jsx-indent-props': ['error', 2],
        'space-before-function-paren': 'off',
        'react/jsx-no-bind': 'off',
        'no-alert': 'off',
        "import/no-unresolved": 'off',
        'import/no-nodejs-modules': 'off',
        'no-warning-comments': 'off',
        'react/no-deprecated': 'off',
        'react/jsx-handler-names': 'off',
        "linebreak-style": [0 ,"error", "windows"], 
    },
    settings: {
        react: {
            version: '16.6' // Prevent 16.3 lifecycle method errors
        }
    }
};
