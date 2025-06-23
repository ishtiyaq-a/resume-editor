import { next } from '@next/eslint-plugin-next';

export default [
  next({
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
    },
  }),
];
