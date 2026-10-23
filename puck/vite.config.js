import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': path.resolve(__dirname, './src/router/mini-router.jsx'),
      'lucide-react': path.resolve(__dirname, './src/components/common/icons.jsx'),
    },
  },
})
