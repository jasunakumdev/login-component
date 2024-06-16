import { defineConfig } from 'vite'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/login-lit-component.ts'),
      name: 'LoginScreen',
      fileName: (format) => `login-lit-component.${format}.js`,
    },
    rollupOptions: {
      external: ['lit'],
    },
  },
  plugins: [svgr(), dts()],
  resolve: {
    alias: {
      '/@assets/': resolve(__dirname, 'src/assets'),
    },
  },
})
