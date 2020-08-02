'use strict';

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2020: true
  },
  // globals: {
  //   process: 'readonly'
  // },
  extends: 'eslint:recommended',
  ignorePatterns: [
    'lib/events/*.js'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    // Mostly from https://github.com/serverless/eslint-config/blob/master/index.js
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    // 'camelcase': ['error', { properties: 'never' }],
    'consistent-return': 'error',
    'curly': ['error', 'multi-line'],
    'default-case': ['error', { commentPattern: '^no default$' }],
    'dot-notation': ['error', { allowKeywords: true }],
    'eqeqeq': ['error', 'allow-null'],
    'guard-for-in': 'error',

    // Removed "import" plugin rules

    'new-cap': ['error', { newIsCap: true }],
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-extra-semi': 'error', // 'no-extra-semi': 'off', // Handled by Prettier
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-mixed-spaces-and-tabs': 'error', // 'no-mixed-spaces-and-tabs': 'off', // Handled by Prettier
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-restricted-syntax': ['error', 'DebuggerStatement', 'ForInStatement', 'WithStatement'],
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': ['error', { allowAfterThis: false }],
    'no-unexpected-multiline': 'error', // 'no-unexpected-multiline': 'off', // Handled by Prettier
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unused-expressions': ['error'],
    'no-unused-vars': ['error', { vars: 'local', args: 'after-used' }],
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': [
      'error',
      { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }
    ],
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
    'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'radix': 'error',
    'require-atomic-updates': 'off', // Reports false positives: https://github.com/eslint/eslint/issues/11899
    'vars-on-top': 'error',
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'], markers: ['=', '!'] }],
    'strict': ['error', 'safe'],
    'yoda': 'error',

    // Now add our rules
    'no-extra-parens': 'error',
    'no-loss-of-precision': 'error',
    'no-promise-executor-return': 'error',
    'no-constructor-return': 'error',
    'no-multi-spaces': 'error',
    'no-return-await': 'error',
    'no-useless-return': 'error',
    'require-await': 'error',

    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error'
  }
};
