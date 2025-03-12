module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    module: 'readonly',
    ElMessageBox: 'readonly',
    ElMessage: 'readonly',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'error',
    semi: ['error', 'always'],
    eqeqeq: 'warn',
    'vue/multi-word-component-names': [
      2,
      {
        ignores: ['index', 'create', 'edit', 'detail'],
      },
    ],
    'comma-dangle': [
      2,
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        SwitchCase: 1,
        ignores: [],
      },
    ],
    quotes: [2, 'single'],
  },
};
