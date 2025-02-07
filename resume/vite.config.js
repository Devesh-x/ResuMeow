import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import { start } from 'repl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
