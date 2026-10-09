import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.spec.ts'],
    environment: 'node',
  },
  resolve: {
    alias: {
      '@app/contracts': path.join(root, 'shared/contracts/src/index.ts'),
    },
  },
});
