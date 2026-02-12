import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/signup': {
        target: 'http://localhost:4000', // your backend server address
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:4000', // network scanner backend address
        changeOrigin: true,
        secure: false,
      },
      // add more routes as needed
    },
  },
});
