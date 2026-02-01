import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './'
  npm run dev -- --host 0.0.0.0 --port 4321
  