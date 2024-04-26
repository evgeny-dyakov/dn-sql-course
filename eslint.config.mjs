import js from '@eslint/js'

export default [
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        document: 'readonly',
        exports: 'readonly',
        fetch: 'readonly',
        require: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        structuredClone: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'sort-keys': 'warn',
    },
  },
]
