import javascriptEslint from '@eslint/js'
import importXPlugin from 'eslint-plugin-import-x'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

const config = typescriptEslint.config(
  // Ignore patterns
  {
    ignores: ['dist'],
  },

  // Include patterns
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },

  // Node environment
  { languageOptions: { globals: globals.node } },

  // Javascript recommended
  javascriptEslint.configs.recommended,

  // Typescript strict type checking
  ...typescriptEslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'src/lib/events/fetch.ts',
            '*.config.mjs',
            '*.config.js',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },

  // Consistent imports
  {
    plugins: {
      'import-x': importXPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'import-x/consistent-type-specifier-style': 'error',
      'import-x/no-duplicates': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Prettier
  prettierPluginRecommended,
)

export default config
