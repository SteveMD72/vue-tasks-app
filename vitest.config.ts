import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue()],
	test: {
		exclude: [
			"e2e/**",
			"playwright.config.ts",
			"node_modules/**",
			"src/App.vue",
			"src/main.ts",
			"vite-env.d.ts",
			"src/types.ts",
			"**.js",
		],
		environment: "jsdom",
		coverage: {
			reporter: ["text", "html"],
			exclude: [
				"src/main.ts",
				"src/types.ts",
				"playwright.config.ts",
				"vite.config.ts",
				"vitest.config.ts",
				"vite-env.d.ts",
				"**.js",
			],
		},
	},
});
