import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    {
        ignores: ['.next/', 'out/', 'node_modules/', 'playwright-report/']
    },
    js.configs.recommended,
    tsPlugin.configs['flat/eslint-recommended'],
    ...tsPlugin.configs['flat/recommended'],
    prettierRecommended,
    {
        languageOptions: {
            parser: tsParser
        },
        rules: {
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
]
