import {defineConfig} from 'vite';

// NOTE: building for prod will not work with a linked package
// You should install directly from the repo in order to make the build work
// if you need to get the package to use a modified version, one solution
// is to manually copy the build result into the node_modules here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    proxy: {
      '/colyseus': {
        target: 'http://localhost:2567',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/colyseus/, ''),
      },
    },
    allowedHosts: [
      '.trycloudflare.com',
      '.ngrok-free.dev',
      '.ngrok-free.app',
    ],
  },
});
