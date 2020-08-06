module.exports = {
  root: true,
  extends: ['scratch', 'scratch/es6', 'scratch/node'],
  env: {
      browser: true
  },
  rules: {
      "no-console": "warn",
      camelcase: "off",
      "space-before-function-paren": ["off"],
      "valid-jsdoc": "warn",
      "global-require": "warn",
      "no-unused-vars": "warn",
      "no-undefined": "warn",
      "eqeqeq": "warn",
      "no-eq-null": "warn",
      "no-alert": "warn",
      "indent": [
        "error",
        2
      ],
  }
};
