import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import regexpEslint from 'eslint-plugin-regexp';
import pluginSecurity from 'eslint-plugin-security';
import astroPlugin from 'eslint-plugin-astro';

// Prettier options that mirror the demo's `.prettierrc.json`
const prettierOptions = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  proseWrap: 'preserve',
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 400,
  endOfLine: 'lf',
};

export default [
  // general ignores
  {
    ignores: ['**/*.d.ts', '**/*.min.*', 'dist/', 'scripts/', 'node_modules/', '.github/', '.ai/', '.astro/', 'public/api/**'],
  },
  // general rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  regexpEslint.configs['flat/recommended'],
  pluginSecurity.configs.recommended,
  {
    plugins: { prettier: prettierPlugin },
  },
  // turn off all ESLint rules that conflict with Prettier
  eslintConfigPrettier,
  // overrides for JS/TS files - run prettier/prettier with synced options.
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      'prettier/prettier': ['error', prettierOptions],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // overrides for Astro files - prettier/prettier is intentionally NOT
  // enabled here. Standalone Prettier (via `npm run fix:prettier`) handles
  // .astro formatting using prettier-plugin-astro.
  {
    files: ['**/*.astro'],
    rules: {
      'prettier/prettier': 'off',
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // eslint-plugin-astro extracts inline <script> blocks from .astro files
  // into virtual `*.astro/*.ts` files. The JS/TS override above re-enables
  // prettier/prettier on them, which causes spurious parsing errors. Turn
  // it back off here (matching the astro plugin's own recommendation).
  {
    files: ['**/*.astro/*.{js,ts}'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
