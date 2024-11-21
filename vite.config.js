import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendUrl = 'https://prjtesting-production.up.railway.app';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    root: './', // Use the root directory for index.html
    publicDir: './public', // Adjust if you have assets in a public folder
    build: {
      outDir: './dist', // Output the build files to /dist in the root
      rollupOptions: {
        input: './index.html', // Specify the path to index.html
      },
    },
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': backendUrl,
      '/api/register': backendUrl,
      '/api/login': backendUrl,
      '/api/stats/drones': backendUrl,
      '/api/settings/updateUser': backendUrl,
      '/api/settings/updateUserPassword': backendUrl,
      '/api/settings/getUser': backendUrl,
      '/api/data': backendUrl,
    },
  },
})
