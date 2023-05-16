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
    extensions: ['.js', '.vue', '.css']
  }
})
