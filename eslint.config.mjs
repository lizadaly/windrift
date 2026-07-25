import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'

export default [
    {
        ignores: ['.next/', 'out/', 'node_modules/', 'playwright-report/']
    },
    js.configs.recommended,
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    tsPlugin.configs['flat/eslint-recommended'],
    ...tsPlugin.configs['flat/recommended'],
    prettierRecommended,
    {
        languageOptions: {
            parser: tsParser
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
            '@typescript-eslint/no-explicit-any': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': ['off'],
            'react/no-unescaped-entities': 0
        }
    }
]
