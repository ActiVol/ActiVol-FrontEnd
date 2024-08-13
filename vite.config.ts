import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 5173,
    open: false, // Automatically open the browser
    cors: true, // Allow cross-origin resource sharing
    host: '0.0.0.0', // Allow external access
  }
})
