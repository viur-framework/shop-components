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

      // the autofix of this rule is not safe here: it also rewrites props on
      // `<slot>` elements, e.g. `boneName` to `bone-name`. Slot props are not
      // HTML attributes, so that renames the key consumers destructure and
      // breaks them silently at runtime. lint-staged runs `eslint --fix` on
      // commit, so leaving it enabled would apply that fix unattended.
      'vue/attribute-hyphenation': 'off',
    },
  },

  // must stay last: turns off everything Prettier owns
  skipFormatting,
]
