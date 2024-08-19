import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("sl-"),
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: "./src/main.js", // Adjust the entry point as needed
      name: "ViurShopComponents",
      fileName: (format) => `viur-shop-components.${format}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        "vue",
        "pinia",
        "@viur/vue-utils",
        "@viur/shoelace",
        "@viur/ignite",
        "@viur/viur-shop-client",
        "vue-router",
        "@ckeditor/ckeditor5-vue",
        "@ckeditor/ckeditor5-build-classic",
        "@viur/ckeditor5-build-classic",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.name;
        },
        globals: {
          vue: "Vue",
          pinia: "Pinia",
          "@viur/vue-utils": "ViurVueUtils",
          "@viur/shoelace": "ViurShoelace",
          "@viur/ignite": "ViurIgnite",
          "@viur/viur-shop-client": "ViurShopClient",
          "vue-router": "VueRouter",
          "@ckeditor/ckeditor5-vue": "CKEditor5Vue",
          "@ckeditor/ckeditor5-build-classic": "ClassicEditor",
          "@viur/ckeditor5-build-classic": "ViurCkeditor",
        },
      },
    },
  },
});
