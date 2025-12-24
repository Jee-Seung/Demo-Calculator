import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        history: path.resolve(__dirname, 'src/history.html'),
        converter: path.resolve(__dirname, 'src/converter.html')
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    root: 'src'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.js',
        '**/*.spec.js'
      ]
    }
  }
});
