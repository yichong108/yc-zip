import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'yc-zip',
      fileName: 'yc-zip'
    },
    rollupOptions: {
      external: ['archiver', 'commander', 'crypto-js', 'fs', 'path'],
      output: {
        globals: {
          archiver: 'archiver',
          commander: 'commander',
          'crypto-js': 'CryptoJS',
          fs: 'fs',
          path: 'path'
        }
      }
    },
    sourcemap: true,
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'node'
  }
})