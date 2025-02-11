import { defineConfig } from 'vitest/config'

export default defineConfig(async () => {
  const tsConfigPaths = (await import('vite-tsconfig-paths')).default
  const swc = (await import('unplugin-swc')).default

  return {
    test: {
      globals: true,
      root: './',
    },
    plugins: [
      tsConfigPaths(),
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
  }
})
