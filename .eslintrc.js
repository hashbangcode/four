module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'no-continue': 'off',
  },
};
