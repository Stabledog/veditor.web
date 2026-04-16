// Vite dev-server plugin: serves veditor.web/dist/ at a local URL prefix
// so that consumer apps (notehub, metabrowse) can load veditor from the
// same origin during development, avoiding CORS issues.
//
// Usage in a consumer's vite.config.ts:
//   import veditorDev from '../veditor.web/dev-plugin.js';
//   export default defineConfig({ plugins: [veditorDev()] });
//
// Then set VITE_VEDITOR_BASE=/veditor when running the dev server.

import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const distDir = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');

const mimeTypes = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
};

export default function veditorDev(prefix = '/veditor') {
  return {
    name: 'veditor-dev',
    configureServer(server) {
      if (!existsSync(distDir)) {
        console.warn(`[veditor-dev] ${distDir} not found — run "make build-veditor" first`);
        return;
      }
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith(prefix + '/')) return next();
        const relPath = req.url.slice(prefix.length);
        const filePath = join(distDir, relPath);
        if (!existsSync(filePath)) return next();
        const ext = extname(filePath);
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.end(readFileSync(filePath));
      });
    },
  };
}
