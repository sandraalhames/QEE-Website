module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'] },
    },
  },
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
  },
};
