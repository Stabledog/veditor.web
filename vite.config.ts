import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
});
