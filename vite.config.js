import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mywebsite/', // Add this line - must match your GitHub repo name
  server: {
    port: 5174,
  },
})