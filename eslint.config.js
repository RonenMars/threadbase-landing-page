import tailwindCanonicalClasses from 'eslint-plugin-tailwind-canonical-classes';

export default [
  ...tailwindCanonicalClasses.configs['flat/recommended'],
  {
    ignores: ['.next/**', 'node_modules/**', '.vercel/**', 'dist/**', 'build/**'],
  },
  {
    rules: {
      'tailwind-canonical-classes/tailwind-canonical-classes': [
        'warn',
        {
          cssPath: './app/globals.css',
        },
      ],
    },
  },
];
