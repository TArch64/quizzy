import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
      vue()
  ],

  server: {
    port: Number(process.env.UI_PORT),
    host: process.env.UI_HOST,
  },

  clearScreen: false,

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url))
    },
    extensions: ['.js', '.vue', '.css']
  }
})
