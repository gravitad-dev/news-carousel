import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Proxy para Reuters
      '/proxy/reuters': {
        target: 'https://reuters2.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/reuters/, ''),
      },
      '/proxy/testing/reuters': {
        target: 'https://reuters-sg6p.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/cnn/, ''),
      },
    },
  },
});
