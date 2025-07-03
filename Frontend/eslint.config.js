/**
 * ESLint Configuration
 * 
 * Linting rules and settings for React/JavaScript code quality.
 * Enforces coding standards, catches potential errors, and ensures
 * consistent formatting across the React application.
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] }, // Ignore build output directory
  {
    files: ['**/*.{js,jsx}'], // Apply rules to JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 2020, // Support for ES2020 features
      globals: globals.browser, // Browser environment globals
      parserOptions: {
        ecmaVersion: 'latest', // Use latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // ES modules support
      },
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks linting rules
      'react-refresh': reactRefresh, // Hot reload compatibility checks
    },
    rules: {
      ...js.configs.recommended.rules, // Base JavaScript recommended rules
      ...reactHooks.configs.recommended.rules, // React Hooks best practices
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Allow unused constants
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports for hot reload
      ],
    },
  },
]
