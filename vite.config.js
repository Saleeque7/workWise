import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,

    proxy: {
      '/workwise': {
        target: 'https://workwise-backend-zr68.onrender.com',
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
    },
  },
})
