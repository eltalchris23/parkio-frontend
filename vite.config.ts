import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración principal de Vite para la aplicación React de Parkio.
export default defineConfig({
  // Plugins usados durante desarrollo y build.
  // react(): habilita React Fast Refresh y soporte JSX/TSX.
  // tailwindcss(): integra Tailwind CSS con el pipeline de Vite.
  plugins: [react(), tailwindcss()],
});
