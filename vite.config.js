import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host:'https://prjtesting-production.up.railway.app/',
    port:5173,
    watch: {
      usePolling: true, 
    },
    proxy: {
      '/api': 'http://webapp:8000',
      '/api/register': 'http://webapp:8000',
      '/api/login': 'http://webapp:8000',
      '/api/stats/drones': 'http://webapp:8000',
      '/api/settings/updateUser': 'http://webapp:8000',
      '/api/settings/updateUserPassword': 'http://webapp:8000',
      '/api/settings/getUser': 'http://webapp:8000',
      // '/socket.io': {
      //   target: 'http://webapp:8000', 
      //   ws: true,
      // }
      '/api/data': 'http://webapp:8000'
    },
  },
})
