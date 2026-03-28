import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Prefer modern arrow syntax for callbacks to keep function style consistent.
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],

      // This package intentionally bridges legacy JS modules during migration.
      // Keep lint focused on consistency, not full type purity yet.
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow underscore-prefixed unused vars for destructuring/rest patterns in tests.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'test/_debug_*.mjs'],
  },
);
