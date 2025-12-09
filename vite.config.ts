import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This ensures process.env.API_KEY works in your existing code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // CRITICAL FIX: Do not inject the entire process.env object.
      // We stub it with an empty object to prevent browser crashes.
      'process.env': {}
    }
  };
});