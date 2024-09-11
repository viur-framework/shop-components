// imports
import { createPinia } from "pinia";

import { useCartStore } from "./stores/cart";
import createRouterInstance from "./router/index";

// import { createApp } from "vue";
// import bone from "@viur/vue-utils/bones/edit/bone.vue";
// import Wrapper_nested from "@viur/vue-utils/bones/edit/wrapper_nested.vue";

export { useCartStore, createRouterInstance };

// export all main components
export { default as ShopOrderStepper } from "./components/ShopOrderStepper.vue";
export { default as CartView } from "./components/cart/CartView.vue";
export { default as ExampleUsage } from "./components/order/process/ExampleUsage.vue";
export { default as ConfirmView } from "./components/cart/ConfirmView.vue";
export { default as OrderComplete } from "./components/ShopOrderComplete.vue";
export { default as UserInformation } from "./components/order/information/UserInformation.vue";
export { default as UserInfoMulti } from "./components/order/information/UserInfoMulti.vue";

// Export the components so they can be used in other projects
const pinia = createPinia();
// Optionally, you can create a plugin to install all components
const ViurShopComponents = {
  install(app) {
    // Register each component globally
    // app.component("CartView", CartView);
    // app.component("ExampleUsage", ExampleUsage);
    // app.component("ConfirmView", ConfirmView);
    // app.component("OrderView", OrderView);
    // Note: useCartStore is not a component, so it should not be registered as one
    app.use(pinia);
  },
};

// Export the plugin as default
export default ViurShopComponents;
