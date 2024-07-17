import "vue"


import {
  setBasePath,
  getBasePath,
} from "@viur/shoelace/dist/utilities/base-path";
import { registerIconLibrary } from "@viur/shoelace/dist/utilities/icon-library.js";

if (import.meta.env.DEV) {
  setBasePath(`/static/partnerbereich/shoelace`);
} else {
  setBasePath(`shoelace`);
}

// Register a custom icons repository for this app
registerIconLibrary("hsk", {
  resolver: (name) => `/static/partnerbereich/icons/${name}.svg`,
  mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});

import { createApp } from "vue";
import bone from "@viur/vue-utils/bones/edit/bone.vue";
import Wrapper_nested from "@viur/vue-utils/bones/edit/wrapper_nested.vue";

// Import all components from the components folder
import CartView from "./components/cart/CartView.vue";
import ExampleUsage from "./components/order/process/ExampleUsage.vue";
import ConfirmView from "./components/cart/ConfirmView.vue";
import { useCartStore } from "./stores/cart";
import createRouterInstance from "./router/index";

// Export the components so they can be used in other projects
export {
  CartView,
  ExampleUsage,
  ConfirmView,
  useCartStore,
  createRouterInstance,
};

// Optionally, you can create a plugin to install all components
const ViurShopComponents = {
  install(app) {
    // Register each component globally
    app.component("CartView", CartView);
    app.component("ExampleUsage", ExampleUsage);
    app.component("ConfirmView", ConfirmView);
    // Note: useCartStore is not a component, so it should not be registered as one
  },
};

// Export the plugin as default
export default ViurShopComponents;
