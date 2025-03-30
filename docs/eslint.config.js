// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['.changeset'],
    rules: {
      'astro/html-self-closing': 'off',
    },
  },
]
