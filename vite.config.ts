/// <reference types="vitest" />
// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    port: 3000,
    proxy: {
      '^/v\\d+/.*': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      common: `${path.resolve(__dirname, './src/common/')}`,
      components: `${path.resolve(__dirname, './src/components/')}`,
      routes: `${path.resolve(__dirname, './src/routes')}`,
      router: `${path.resolve(__dirname, './src/Router')}`,
    },
  },
});
