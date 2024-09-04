// import "vue"

// import { createApp } from "vue";
import bone from "@viur/vue-utils/bones/edit/bone.vue";
import Wrapper_nested from "@viur/vue-utils/bones/edit/wrapper_nested.vue";

// Import all components from the components folder
import CartView from "./components/cart/CartView.vue";
import ExampleUsage from "./components/order/process/ExampleUsage.vue";
import OrderView from "./components/order/process/OrderView.vue";
import ConfirmView from "./components/cart/ConfirmView.vue";
import OrderComplete from "./components/order/process/OrderComplete.vue";
import UserInformation from "./components/order/information/UserInformation.vue";
import SelectPaymentProvider from "./components/order/process/SelectPaymentProvider.vue";

import { useCartStore } from "./stores/cart";
import createRouterInstance from "./router/index";
import { createPinia } from 'pinia'
// Export the components so they can be used in other projects
export {
  CartView,
  ExampleUsage,
  ConfirmView,
  OrderComplete,
  UserInformation,
  OrderView,
  SelectPaymentProvider,
  useCartStore,
  createRouterInstance,
};
const pinia = createPinia()
// Optionally, you can create a plugin to install all components
const ViurShopComponents = {
  install(app) {
    // Register each component globally
    app.component("CartView", CartView);
    app.component("ExampleUsage", ExampleUsage);
    app.component("ConfirmView", ConfirmView);
    app.component("OrderView", OrderView);
    // Note: useCartStore is not a component, so it should not be registered as one
    app.use(pinia)
  },
};

// Export the plugin as default
export default ViurShopComponents;
