// imports
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { de_translations, en_translations } from "@viur/vue-utils";

import { useAddressStore } from "./stores/address";
import { useCartStore } from "./stores/cart";
import { useMessageStore } from "./stores/message";
import { useOrderStore } from "./stores/order";
import { usePaymentStore } from "./stores/payment";
import { useShippingStore } from "./stores/shipping";

export {
  useAddressStore,
  useCartStore,
  useMessageStore,
  useOrderStore,
  usePaymentStore,
  useShippingStore,
};

// export all main components
export { default as ShopCart } from "./components/ShopCart.vue";
export { default as ShopOrderComplete } from "./components/ShopOrderComplete.vue";
export { default as ShopOrderConfirm } from "./components/ShopOrderConfirm.vue";
export { default as ShopOrderStepper } from "./components/ShopOrderStepper.vue";
export { default as ShopPaymentProvider } from "./components/ShopPaymentProvider.vue";
export { default as ShopShippingMethod } from "./components/ShopShippingMethod.vue";
export { default as ShopUserData } from "./components/ShopUserData.vue";
export { default as ShopSummary } from "./components/ShopSummary.vue";

// deleted after docs are written
export { default as ExampleUsage } from "./components/ExampleUsage.vue";

// Plugin registration
const pinia = createPinia();

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages: {
    en: { ...en_translations },
    de: { ...de_translations },
  },
});

const ViurShopComponents = {
  install(app) {
    app.use(pinia);
    app.use(i18n);
  },
};

// Export the plugin as default
export default ViurShopComponents;
