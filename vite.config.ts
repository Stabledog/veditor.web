import { defineConfig } from 'vite';
import { resolve } from 'path';
import pkg from './package.json';

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? 'demo' : undefined,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'veditor',
    },
    cssFileName: 'veditor',
    rollupOptions: {
      // Bundle everything — consumers load from CDN, no node_modules
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
}));
