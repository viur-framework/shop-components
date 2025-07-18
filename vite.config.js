import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("sl-")
        }
      }
    })
  ],
  build: {
    lib: {
      entry: "./src/main.js", // Adjust the entry point as needed
      name: "ViurShopComponents",
      fileName: (format) => `viur-shop-components.${format}.js`
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        "vue",
        "pinia",
        "@viur/shoelace",
        "@viur/ignite",
        "@viur/vue-utils",
        "vue-router",
        "@ckeditor/ckeditor5-vue",
        "@ckeditor/ckeditor5-build-classic",
        "@viur/ckeditor5-build-classic"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.name
        },
        globals: {
          vue: "Vue",
          pinia: "Pinia",
          "@viur/shoelace": "ViurShoelace",
          "@viur/ignite": "ViurIgnite",
          "vue-router": "VueRouter",
          "@ckeditor/ckeditor5-vue": "CKEditor5Vue",
          "@ckeditor/ckeditor5-build-classic": "ClassicEditor",
          "@viur/ckeditor5-build-classic": "ViurCkeditor",
          "@viur/vue-utils": "ViurVueUtils"
        }
      }
    }
  }
})
