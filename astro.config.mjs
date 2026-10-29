// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Netlify define URL al compilar. Hace falta para las URL absolutas de
  // Open Graph (WhatsApp no acepta imágenes con ruta relativa).
  site: process.env.URL ?? 'http://localhost:4321',
  trailingSlash: 'ignore',
  build: {
    // CSS pequeño en línea: una petición menos en 3G.
    inlineStylesheets: 'auto',
  },
});
