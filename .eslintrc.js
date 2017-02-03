module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  env: {
    browser: true,
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/no-extraneous-dependencies': ['error', {devDependencies: true, optionalDependencies: false, peerDependencies: false}],
    'no-console': 0,
    semi: 0,
    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
      allowAfterSuper: true,
    }],
    'no-param-reassign': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    'prefer-arrow-callback': 0,
    'comma-dangle': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'h' }],
  }
}
