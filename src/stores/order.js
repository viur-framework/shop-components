import { reactive } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import { useMessageStore } from "./message";

export const useOrderStore = defineStore("shop-order", () => {
  const cartStore = useCartStore();
  const messageStore = useMessageStore();

  const state = reactive({
    currentOrder: null,
    shopClient: undefined,
    updateParams: {},
    paramsChanged: false,
    checkoutState: null, // null "prepare","start", ...
    checkout: null,
  });

  function add(obj) {
    return new Promise((resolve, reject) => {
      state.shopClient
        .order_add(obj)
        .then(async (resp) => {
          let data = await resp;
          state.currentOrder = data;
          resolve(data);
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
          reject(error);
        });
    });
  }

  function update() {
    Object.assign(state.updateParams, {
      order_key: state.currentOrder.key,
    });

    return new Promise((resolve, reject) => {
      state.shopClient
        .order_update(state.updateParams)
        .then(async (resp) => {
          let data = await resp;
          state.currentOrder = data;
          state.paramsChanged = false;
          resolve(data);
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
          reject(error);
        });
    });
  }

  function getExistingOrder() {
    // needs clarification
  }

  function updateParams(obj = {}) {
    if (!Object.keys(obj).length) {
      return;
    }

    for (let [k, v] of Object.entries(obj)) {
      if (state.updateParams?.[k] !== v) {
        Object.assign(state.updateParams, obj);
        state.paramsChanged = true;
        return;
      }
    }
  }

  function handler() {
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

    if (
      !(
        state.updateParams &&
        (state.updateParams.email || state.updateParams.customer_key)
      )
    ) {
      state.updateParams.customer_key = cartStore.state.customer.key;
    }

    if (!state.currentOrder) {
      // TODO: getExistingOrder().then(state.currentOrder = value).error(add(params)...)

      if (!state.updateParams.cart_key) {
        state.updateParams.cart_key = cartStore.state.basket.key;
      }

      add(state.updateParams);
    } else {
      if (state.paramsChanged) {
        update();
      }
    }
  }

  async function startCheckout() {
    try {
      state.checkout = await state.shopClient.order_checkout_start({
        order_key: state.currentOrder.key,
      });
      cartStore.state.freeze = true;
    } catch (error) {
      console.log(state.checkout);
      console.dir(error);
    }
  }

  return {
    state,
    handler,
    startCheckout,
    updateParams,
  };
});
