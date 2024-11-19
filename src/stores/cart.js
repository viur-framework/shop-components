import { reactive, computed, watch, provide } from "vue";
import { defineStore } from "pinia";
import { ViURShopClient } from "../client";

/*
TODO:
Error Handling. A UI Component (../components/generic/alerts/ShopAlert.vue)
should be triggered when state.errors has an entry.
Every Error in this store should be routed into state.errors
 */
export const useCartStore = defineStore("shop-cart", () => {
  const state = reactive({
    shopClient: null,
    shopModuleName: "shop",
    basket: {},
    childrenByNode: {},
    structure: { address: {}, cart: {} },
    paymentProviders: {},
    billingAddressList: [],
    shippingAddressList: [],
    cloneBilling: true,
    activeBillingAddress: {},
    activeShippingAddress: {},
    selectedPaymentProvider: {},
    selectedPaymentProviderName: "",
    customer: {},
    isLoggedIn: false,
    isReady: false,
    isFetching: false,
    placeholder: "",
  });

  function setConfig({ shopModuleName = "shop", placeholder = "" } = {}) {
    /* function set set initial states */
    state.shopModuleName = shopModuleName; //change default module shop to something else
    state.placeholder = placeholder; // define image placeholder for missing images
    state.shopClient = new ViURShopClient({
      host_url: import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL
        : window.location.origin, //use vite config, because all utils requests are using this.
      shop_module: state.shopModuleName, //change default module shop to something else
    });
  }

  async function init(update = false) {
    console.log("Init Shop");
    if (state.isFetching) {
      return false; // currently we fetch data
    }
    state.isFetching = true;
    if (state.isReady && !update) {
      //block datafetching if shop is ready and no forced update is needed
      return true;
    }

    try {
      const customer = await getCustomer();
      const shopRequests = await Promise.all([getAddress(), getBasket()]);

      state.isReady = true;
      console.log(state.shopClient);
      console.log("%c Shopdata is ready", "color:lime");
    } catch (error) {
      state.isReady = false;
      console.error(
        "Error: Cant Init because of Error in a essential Shoprequest",
        error,
      );
    }
    state.isFetching = false;
  }

  async function getCustomer() {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await state.shopClient.user_view();
        state.customer = resp;
        state.isLoggedIn = true;
        resolve(resp);
      } catch (error) {
        state.isLoggedIn = false;
        state.customer = {};
        reject(error);
      }
    });
  }
  async function getBasket() {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await state.shopClient.cart_list();
        state.basket = resp[0];
        resolve(state.basket);
      } catch (error) {
        state.basket = []; //reset basket on error
        reject(error);
      }
    });
  }

  async function getChildren(parentKey) {
    return await state.shopClient.cart_list({ cart_key: parentKey });
  }

  async function addToCart(articleKey, cartKey) {
    let resp = await state.shopClient.article_add({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });
    state.basket = await getChildren(cartKey);
  }

  async function removeItem(articleKey, cartKey) {
    let resp = await state.shopClient.article_remove({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });
    if (resp) {
      updateCart();
    }
    console.log("remove Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  async function updateItem(articleKey, cartKey, quantity) {
    const resp = await state.shopClient.article_update({
      article_key: articleKey,
      parent_cart_key: cartKey,
      quantity: quantity,
      quantity_mode: "replace",
    });

    if (resp) {
      updateCart();
    }

    console.log("update Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  // async function updateCart(cartKey) {
  //   await getChildren(cartKey);
  // }

  async function getAddressStructure() {
    const structure = await state.shopClient.address_structure();
    state.structure.address = struct2dict(structure.addSkel);
  }

  function getDefaultAddress() {
    if (!!state.billingAddressList) {
      state.billingAddressList.forEach((address) => {
        if (address.is_default) {
          state.activeBillingAddress = address;
        }
      });
    } else {
      state.activeBillingAddress = setAddressValues("billing");
    }
    if (!!state.shippingAddressList) {
      state.shippingAddressList.forEach((address) => {
        if (address.is_default && !state.cloneBilling) {
          state.activeShippingAddress = address;
        }
      });
    } else {
      if (state.cloneBilling) {
        state.activeShippingAddress = { ...state.activeBillingAddress };
      } else {
        state.activeShippingAddress = setAddressValues("shipping");
      }
    }
  }

  function setAddressValues(mode) {
    let structure = state.structure.address;
    let skel = {};

    Object.entries(structure).forEach(([boneName, boneValue]) => {
      if (boneName === "customer") {
        skel[boneName] = state.customer.key;
      } else if (boneName === "address_type") {
        skel[boneName] = mode;
      } else {
        skel[boneName] = boneValue.emptyvalue;
      }
    });

    return skel;
  }

  function updateCart() {
    state.basket = {};
    getBasket();
  }

  async function getAddress() {
    return new Promise(async (resolve, reject) => {
      console.log("hier komme rein");
      if (!state.isLoggedIn) {
        reject("not logged in");
      }
      let addressList = [];
      try {
        addressList = await state.shopClient.address_list();
      } catch (error) {
        reject(error);
      }

      state.billingAddressList = [];
      state.shippingAddressList = [];

      for (const address of addressList) {
        if (address.address_type === "billing") {
          state.billingAddressList.push(address);
        }
        if (address.address_type === "shipping") {
          state.shippingAddressList.push(address);
        }
      }

      getDefaultAddress();
      resolve([state.activeBillingAddress, state.activeShippingAddress]);
    });
  }

  async function addDiscount(code) {
    await state.shopClient.discount_add({ code });
  }

  // core rc2 needed to work with all parameters
  async function addNode(
    parentCart,
    cartType = "whishlist",
    cartName = undefined,
    comment = undefined,
    shipping_key = undefined,
    shipping_address_key = undefined,
    discount_key = undefined,
  ) {
    return await state.shopClient.cart_add({
      parent_cart_key: parentCart,
      cart_type: cartType, // "basket" for main cart, "whishlist" for everything else
      // name: cartName,
      // customer_comment: comment,
      // shipping_address_key: shipping_address_key,
      // shipping_key: shipping_key,
      // discount_key: discount_key,
    });
  }

  async function getPaymentProviders() {
    const paymentProvieders = await state.shopClient.payment_providers_list();
    state.paymentProviders = paymentProvieders;
    //select first paymentprovider as default
    state.selectedPaymentProvider =
      paymentProvieders[Object.keys(paymentProvieders)[0]];
    state.selectedPaymentProviderName = Object.keys(paymentProvieders)[0];
  }

  function struct2dict(structure) {
    if (!Array.isArray(structure)) {
      return structure;
    }

    let result = {};
    structure.forEach((bone) => (result[bone[0]] = bone[1]));

    return result;
  }

  async function orderAdd() {
    const order = await state.shopClient.order_add({
      cart_key: state.basket.key,
      payment_provider: state.selectedPaymentProviderName,
      billing_address_key: state.activeBillingAddress["key"],
      customer_key: state.customer["key"],
    });
    return order;
  }
  async function setShipping() {
    const shipping_skel = state.shopClient;
  }

  watch(
    () => state.activeBillingAddress,
    (newValue, oldValue) => {
      if (oldValue) {
        const isAddress = (address) => address.key === newValue.key;

        let index = state.billingAddressList.findIndex(isAddress);

        state.billingAddressList[index] = newValue;
      }
      if (state.cloneBilling) {
        state.activeShippingAddress = newValue;
      }
    },
  );

  watch(
    () => state.activeShippingAddress,
    (newValue, oldValue) => {
      if (oldValue) {
        const isAddress = (address) => address.key === newValue.key;

        let index = state.shippingAddressList.findIndex(isAddress);

        state.shippingAddressList[index] = newValue;
      }
    },
  );

  watch(
    () => state.cloneBilling,
    (newValue, oldValue) => {
      if (newValue) {
        let temp = { ...state.activeBillingAddress };
        temp.address_type = "shipping";
        state.activeShippingAddress = { ...temp };
      }
    },
  );

  return {
    state,
    setConfig,
    addToCart,
    removeItem,
    updateItem,
    init,
    getAddressStructure,
    getChildren,
    addDiscount,
    getPaymentProviders,
    getAddress,
    addNode,
    getDefaultAddress,
    orderAdd,
    getBasket,
  };
});
