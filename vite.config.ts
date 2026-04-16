import { defineConfig } from 'vite';
import { resolve } from 'path';
import { execSync } from 'child_process';
import pkg from './package.json';

const buildHash = execSync('../scripts/source-hash.sh').toString().trim();

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
      plugins: [{
        name: 'version-json',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'version.json',
            source: JSON.stringify({ version: pkg.version, hash: buildHash }),
          });
        },
      }],
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
}));
