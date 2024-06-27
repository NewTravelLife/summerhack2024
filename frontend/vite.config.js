import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    VITE_GOOGLE_MAPS_API_KEY: 'AIzaSyAaxy-BAdWOr9ERDtBsggTgNjFsLvYhlzQ',
  },
})
