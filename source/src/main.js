// Import Vue
import { createApp } from 'vue';

// Import all components from the components folder
import CartView from './components/cart/CartView.vue';
import ExampleUsage from './components/order/process/ExampleUsage.vue';
import ConfirmView from './components/cart/ConfirmView.vue';
import { useCartStore } from './stores/cart';

// Export the components so they can be used in other projects
export { CartView, ExampleUsage, ConfirmView, useCartStore };

// Optionally, you can create a plugin to install all components
const ViurShopComponents = {
  install(app) {
    // Register each component globally
    app.component('CartView', CartView);
    app.component('ExampleUsage', ExampleUsage);
    app.component('ConfirmView', ConfirmView);
    // Note: useCartStore is not a component, so it should not be registered as one
  }
};

// Export the plugin as default
export default ViurShopComponents;