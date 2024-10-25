import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.35.17.206',
    port: 5173 // o el puerto que prefieras
  }
})
