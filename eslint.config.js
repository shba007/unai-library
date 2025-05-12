import unjs from 'eslint-config-unjs'

export default unjs({
  ignores: ['dist', 'node_modules', '.changeset'],
  rules: {
    'unicorn/no-anonymous-default-export': 0,
  },
})
