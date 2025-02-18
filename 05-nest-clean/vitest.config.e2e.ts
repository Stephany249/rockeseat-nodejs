import { defineConfig } from 'vitest/config'

export default defineConfig(async () => {
  const tsConfigPaths = (await import('vite-tsconfig-paths')).default
  const swc = (await import('unplugin-swc')).default

  return {
    test: {
      hookTimeout: 100000,
      include: ['**/*.e2e-spec.ts'],
      globals: true,
      root: './',
      setupFiles: ['./test/setup-e2e.ts'],
    },
    plugins: [
      tsConfigPaths(),
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
  }
})
