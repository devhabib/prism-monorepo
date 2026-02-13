// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    // --- GLOBAL IGNORES ---
    ignores: ['**/*.spec.ts', '**/dist/**', '**/node_modules/**', '**/.angular/**'],
  },
  {
    // --- FILES TO LINT ---
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // --- 1. CLEAN CODE & IMPORTS ---
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // --- 2. ANGULAR BEST PRACTICES ---
      '@angular-eslint/prefer-on-push-component-change-detection': 'error', // FORCE OnPush
      '@angular-eslint/component-selector': 'off', // Disabled by default, only enabled for libs
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'prism', style: 'camelCase' },
      ],
      '@angular-eslint/no-output-on-prefix': 'off', // Allow outputs like onPageChange

      // --- 3. THE "ANGULAR 21" ENFORCER (BANNING LEGACY) ---
      // This is the specific logic that prevents mistakes.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Decorator[expression.callee.name="Input"]',
          message: '❌ LEGACY DETECTED: Use "input()" or "input.required()" signal instead of @Input.',
        },
        {
          selector: 'Decorator[expression.callee.name="Output"]',
          message: '❌ LEGACY DETECTED: Use "output()" function instead of @Output.',
        },
        {
          selector: 'Decorator[expression.callee.name="ViewChild"]',
          message: '❌ LEGACY DETECTED: Use "viewChild()" signal instead of @ViewChild.',
        },
        {
          selector: 'Decorator[expression.callee.name="ContentChild"]',
          message: '❌ LEGACY DETECTED: Use "contentChild()" signal instead of @ContentChild.',
        },
        {
          selector: 'Decorator[expression.callee.name="HostBinding"]',
          message: '❌ LEGACY DETECTED: Use the "host" property in @Component metadata instead of @HostBinding.',
        },
        {
          selector: 'Decorator[expression.callee.name="HostListener"]',
          message: '❌ LEGACY DETECTED: Use the "host" property in @Component metadata (e.g. "(click)": "...") instead of @HostListener.',
        },
        {
          selector: 'ClassDeclaration:has(Decorator[expression.callee.name=/^(Component|Directive|Injectable)$/]) MethodDefinition[kind="constructor"][value.params.length > 0]',
          message: '❌ LEGACY DETECTED: Do not inject dependencies via constructor. Use "inject()" instead.',
        },
      ],

      // --- 4. TYPESCRIPT STRICTNESS (Adjusted for practicality) ---
      '@typescript-eslint/explicit-function-return-type': 'warn', // Warn instead of error
      '@typescript-eslint/no-explicit-any': 'error', // NO ANY - keep strict
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'], // Warn for type preference
      '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit types even if inferrable
    },
  },
  {
    // --- LIBRARY COMPONENTS (Enforce 'prism' prefix) ---
    files: ['libs/**/*.component.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'prism', style: 'kebab-case' },
      ],
    },
  },
  {
    // --- APP COMPONENTS (No selector enforcement) ---
    files: ['apps/**/*.component.ts', 'apps/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': 'off', // Apps can use any selector
    },
  },
  {
    // --- HTML TEMPLATE RULES ---
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'warn', // Warn for accessibility
      '@angular-eslint/template/conditional-complexity': ['warn', { maxComplexity: 5 }], // Relaxed to 5
      '@angular-eslint/template/label-has-associated-control': 'off', // Disabled for demo components
      '@angular-eslint/template/prefer-control-flow': 'warn', // Warn for new control flow
    },
  }
);
