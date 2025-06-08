import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Tutte le richieste a /api verranno inoltrate a http://localhost:3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        // riscrive il path rimuovendo il /api iniziale
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});