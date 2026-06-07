import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}', 'app/**/*.{test,spec}.{ts,tsx}', 'components/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: [],
  },
  resolve: {
    alias: {
      '@': new URL('.', import.meta.url).pathname,
    },
  },
});
