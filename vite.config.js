import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['redux-persist'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // ✅ gestisce i moduli CJS come redux-persist
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})