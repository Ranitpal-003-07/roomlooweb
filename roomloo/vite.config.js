import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: "/",
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.webp","**/*.jpeg"],
  build: {
    sourcemap: false, // Disables source maps
  },
  resolve: {
    alias: {
      '@': '/src',
      crypto: 'crypto-browserify',  // Polyfill for crypto
      stream: 'stream-browserify',  // Polyfill for stream
      process: 'process/browser',   // Polyfill for process
    },
  },
  define: {
    global: 'globalThis', // Ensures global is defined for frontend use
  },
  server: {
    mimeTypes: {
      'js': 'application/javascript',
    },
  },
});
