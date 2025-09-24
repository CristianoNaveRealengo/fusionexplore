import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	plugins: [basicSsl()],
	server: {
		port: 3000,
		https: true, // Necessário para WebXR
		host: true,
	},
	build: {
		target: "es2020",
	},
});
