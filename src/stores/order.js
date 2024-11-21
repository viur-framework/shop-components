import { reactive } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import { useMessageStore } from "./message";
import { ViURShopClient } from "../client";

export const useOrderStore = defineStore("shop-order", () => {
  const cartStore = useCartStore();
  const messageStore = useMessageStore();

  const state = reactive({
    currentOrder: null,
    shopClient: undefined,
  });

  function add(obj) {
    return new Promise((resolve, reject) => {
      state.shopClient
        .order_add(obj)
        .then((resp) => {
          let data = resp.json();
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  }

  function update(obj) {
    Object.assign(obj, {
      order_key: state.currentOrder.key,
    });

    return new Promise((resolve, reject) => {
      state.shopClient
        .order_update(obj)
        .then(async (resp) => {
          let data = await resp.json();
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  }

  function getExistingOrder() {
    // needs clarification
  }

  function checkoutHandler(params = {}) {
    /* Accepted Parameters
      (*** required fields; only 1 of the required fields need to be set)
      obj = {
        cart_key: "key",
        payment_provider: "payment_provider key",
        billing_address_key: "billing_address_key",
        email: "email", ***
        customer_key: "customer_key", ***
        state_ordered: "state",
        state_paid: "state",
        state_rts: "state",
      }; */
    let resp = null;

    if (!(params && (params.email || params.customer_key))) {
      params.customer_key = cartStore.state.customer.key;
    }

    if (!state.currentOrder) {
      // TODO: getExistingOrder().then(state.currentOrder = value).error(add(params)...)

      if (!params.cart_key) {
        params.cart_key = cartStore.state.basket.key;
      }

      add(params)
        .then(async (resp) => {
          let data = await resp.json();
          state.currentOrder = data.values;
        })
        .catch((error) => {
          console.log("warum")
          messageStore.state.errors.push({
            msg: error,
            variant: "danger",
            iconName: "x-lg",
            id: new Date().getTime(),
            duration: "Infinity",
            closeable: false,
          });
        });
    } else {
      update(params)
        .then(async (resp) => {
          let data = await resp.json();

          state.currentOrder = data.values;
        })
        .catch((error) => {
          messageStore.state.errors.push({
            msg: error,
            variant: "danger",
            iconName: "x-lg",
            id: new Date().getTime(),
            duration: "Infinity",
            closeable: false,
          });
        });
    }
  }

  return {
    state,
    checkoutHandler,
  };
});
