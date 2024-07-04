import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/main.js", // Adjust the entry point as needed
      name: "ViurShopComponents",
      fileName: (format) => `viur-shop-components.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "pinia",
        "@viur/vue-utils",
        "@viur/shoelace",
        "@viur/ignite",
        "@viur/viur-shop-client",
        "vue-router",
      ],
      output: {
        globals: {
          vue: "Vue",
          pinia: "Pinia",
          "@viur/vue-utils": "ViurVueUtils",
          "@viur/shoelace": "ViurShoelace",
          "@viur/ignite": "ViurIgnite",
          "@viur/viur-shop-client": "ViurShopClient",
          "vue-router": "VueRouter",
        },
      },
    },
  },
});
