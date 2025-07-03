/**
 * Vite Configuration
 * 
 * Build tool configuration for React application with TailwindCSS.
 * Defines plugins for React JSX transformation and Tailwind CSS processing.
 * Optimizes development server and production build settings.
 */

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(), // Enable TailwindCSS processing
    react() // Enable React JSX and hot reload support
  ],
})
