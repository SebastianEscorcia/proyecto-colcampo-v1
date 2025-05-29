import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // tu frontend con Vite
    setupNodeEvents(on, config) {
      // Puedes agregar eventos aquí si lo necesitas en el futuro
    },
  },
});
