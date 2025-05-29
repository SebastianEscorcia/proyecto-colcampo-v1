import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/usuarios": { target: "http://localhost:8080", changeOrigin: true },
      "/campesinos": { target: "http://localhost:8080", changeOrigin: true },
      "/clientes": { target: "http://localhost:8080", changeOrigin: true },
      "/producto": { target: "http://localhost:8080", changeOrigin: true },
    },
    historyApiFallback: true, // 👈 ESTA LÍNEA ES CLAVE
  },
});
