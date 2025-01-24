module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:security/recommended',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'security',
    'testing-library'
  ],
  rules: {
    // Strict rules
    'no-console': 'error',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'error',
    'security/detect-object-injection': 'error'
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      extends: ['plugin:testing-library/react']
    }
  ]
};
