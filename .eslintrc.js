module.exports = {
  extends: ['react-app', 'eslint:recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-extra-boolean-cast': 'off',
    'prettier/prettier': 'error',
    'spaced-comment': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-process-exit': 'off',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
