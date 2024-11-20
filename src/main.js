// imports
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { de_translations, en_translations } from "@viur/vue-utils";

import { useCartStore } from "./stores/cart";
import { useOrderStore } from "./stores/order";
import { useShippingStore } from "./stores/shipping";

import CartNode from "./components/cart/CartNode.vue";
import CartLeaf from "./components/cart/CartLeaf.vue";
// import { createApp } from "vue";
// import bone from "@viur/vue-utils/bones/edit/bone.vue";
// import Wrapper_nested from "@viur/vue-utils/bones/edit/wrapper_nested.vue";

export { useCartStore };
export { useOrderStore, useShippingStore };

// export all main components
export { default as ShopOrderStepper } from "./components/ShopOrderStepper.vue";
export { default as ShopUserData } from "./components/ShopUserData.vue";

export { default as CartView } from "./components/cart/CartView.vue";
export { default as ExampleUsage } from "./components/ExampleUsage.vue";
export { default as ShopOrderConfirm } from "./components/ShopOrderConfirm.vue";
export { default as OrderComplete } from "./components/ShopOrderComplete.vue";
export { default as ShopShippingMethod } from "./components/ShopShippingMethod.vue";
export { default as ShopPaymentProvider } from "./components/ShopPaymentProvider.vue";
// export { default as UserInformation } from "./components/order/information/UserInformation.vue";
// export { default as UserInfoMulti } from "./components/order/information/UserInfoMulti.vue";
export { default as ShopCart } from "./components/ShopCart.vue";
export { default as ShopOrderComplete } from "./components/ShopOrderComplete.vue";

const pinia = createPinia();
const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages: {
    en: { ...en_translations },
    de: { ...de_translations },
  },
});

// Create a plugin to install all components
const ViurShopComponents = {
  install(app) {
    app.use(pinia);
    app.use(i18n);
  },
};

// Export the plugin as default
export default ViurShopComponents;
