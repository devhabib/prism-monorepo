import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    angular({
      tsconfig: join(__dirname, './tsconfig.spec.json')
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    root: __dirname,
    setupFiles: [join(__dirname, 'src/test-setup.ts')],
    include: ['src/**/*.{test,spec}.{ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
  },
  resolve: {
    alias: {
      '@devynelogic/prism-theme': join(__dirname, '../prism-theme/src/lib'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [join(__dirname, '../../libs/prism-theme/src/lib')],
      },
    },
  },
});
