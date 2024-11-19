import { reactive } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import { ViURShopClient } from "../client";

export const useOrderStore = defineStore("shop-order", () => {
  const cartStore = useCartStore();
  const state = reactive({
    currentOrder: {},
  });

  const client = new ViURShopClient({
    host_url: import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL
      : window.location.origin, //use vite config, because all utils requests are using this.
    shop_module: cartStore.state.shopModuleName, //change default module shop to something else
  });

  function add(cartKey) {
    return new Promise((resolve, reject) => {
      client
        .order_add({
          cart_key: cartKey,
          customer_key: cartStore.state.customer.key,
        })
        .then(async (resp) => {
          let data = await resp.json();
          state.currentOrder = data.values;
          resolve(data);
        })
        .catch((error) => console.log("Fehler!")); // TODO: Error handling (console error would show error in console twice);
    });
  }

  function update(obj) {
    Object.assign(obj, {
      order_key: state.currentOrder.key,
    });

    return new Promise((resolve, reject) => {
      client
        .order_update(obj)
        .then(async (resp) => {
          let data = await resp.json();
          state.currentOrder = data.values;
          resolve(data);
        })
        .catch((error) => console.log("Fehler!")); // TODO: Error handling (console error would show error in console twice);
    });
  }

  return {
    state,
    add,
    update,
  };
});
