import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        // constructor exposed by the externally loaded Unzer SDK
        unzer: 'readonly',
      },
    },
    rules: {
      // carried over from the retired .eslintrc.cjs
      'no-unused-vars': 'warn',
      'vue/html-self-closing': 'off',
      'vue/order-in-components': 'off',
      'vue/no-deprecated-slot-attribute': 'off',

      // the exported entry components of this package are named after their
      // domain concept and are part of the public API
      'vue/multi-word-component-names': 'off',
    },
  },

  // must stay last: turns off everything Prettier owns
  skipFormatting,
]
