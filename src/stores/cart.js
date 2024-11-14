import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";

export const useCartStore = defineStore("cartstore", () => {
  const shopClient = new ViURShopClient({
    host_url:
      window.location.origin === "http://localhost:8081"
        ? "http://localhost:8080"
        : window.location.origin,
  });
  let isFetching = false;
  const waitForFetching = [];
  const waitForFetchingResolver = [];
  const state = reactive({
    basketRootNode: {},
    basket: [],
    wishlistRootNodes: [],
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
    placeholder: "",
  });

  async function init(placeholder = "") {
    if (!isFetching) {
      isFetching = true;
      await getRootNodes();
      await getCustomer();
      await getAddress();
      await getBasket();

      isFetching = false;
      for (const waiter of waitForFetchingResolver) {
        waiter();
      }
      waitForFetchingResolver.splice(0, waitForFetchingResolver.length);
      waitForFetching.splice(0, waitForFetchingResolver.length);
    } else {
      const p = new Promise((resolve, reject) => {
        waitForFetchingResolver.push(resolve);
      });
      waitForFetching.push(p);
      return p;
    }
    state.placeholder = placeholder;
  }

  async function getCustomer() {
    try {
      const resp = await shopClient.user_view();
      state.customer = resp;
      state.isLoggedIn = true;
    } catch (e) {
      state.isLoggedIn = false;
    }

    console.log("passiert", state.customer);
  }
  async function getBasket() {
    state.basket = await shopClient.basket_list();
  }

  async function getChildren(parentKey) {
    return await shopClient.cart_list({ cart_key: parentKey });
  }

  async function getRootNodes() {
    let resp = await shopClient.cart_list();

    resp.forEach(async (rootNode) => {
      if (rootNode.is_root_node) {
        if (rootNode.cart_type === "basket") {
          state.basketRootNode = rootNode;
          const rootChildren = await getChildren(rootNode.key);
          state.childrenByNode[rootNode.key] = rootChildren;
        } else {
          state.whishlistRootNodes.push(rootNode);
        }
      }
    });
  }

  async function addToCart(articleKey, cartKey) {
    let resp = await shopClient.article_add({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });

    // await updateCart(cartKey);
    console.log("addToCart", resp); //TODO: Errorhandling as soon as shop module works again
  }

  async function getArticleView(articleKey, cartKey) {
    let article = await shopClient.article_view({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });

    console.log("getArticleView", article); // ? Talk about necessarity
  }

  async function removeItem(articleKey, cartKey) {
    let resp = await shopClient.article_remove({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });

    console.log("remove Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  async function updateItem(articleKey, cartKey, quantity) {
    const resp = await shopClient.article_update({
      article_key: articleKey,
      parent_cart_key: cartKey,
      quantity: quantity,
      quantity_mode: "replace",
    });

    console.log("update Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  // async function updateCart(cartKey) {
  //   await getChildren(cartKey);
  // }

  async function getAddressStructure() {
    const structure = await shopClient.address_structure();
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

  async function getAddress() {
    if (!state.isLoggedIn) {
      return;
    }
    try {
      const addressList = await shopClient.address_list();
    } catch (e) {
      console.log("error", e);
      return;
    }

    const addressList = await shopClient.address_list();
    state.billingAddressList = [];
    state.shippingAddressList = [];

    for (const address of addressList) {
      if (address.address_type === "billing") {
        console.log("add to bill address ?", address);
        state.billingAddressList.push(address);
      }
      if (address.address_type === "shipping") {
        state.shippingAddressList.push(address);
      }
    }

    getDefaultAddress();
  }

  async function addDiscount(code) {
    await shopClient.discount_add({ code });
  }

  async function addNode(
    parentCart,
    cartType = "whishlist",
    cartName = undefined,
    comment = undefined,
    shipping_key = undefined,
    shipping_address_key = undefined,
    discount_key = undefined,
  ) {
    return await shopClient.cart_add({
      parent_cart_key: parentCart,
      cart_type: cartType, // "basket" for main cart, "whishlist" for everything else
      // name: cartName,
      // customer_comment: comment,
      // shipping_address_key: shipping_address_key,
      // shipping_key: shipping_key,
      // discount_key: discount_key,
    });
  }

  async function getShippingData() {
    return await shopClient.shipping_list({
      cart_key: state.basketRootNode.key,
    });
  }
  async function setShiping() {
    return await shopClient.shipping_set();
  }

  async function getPaymentProviders() {
    const paymentProvieders = await shopClient.payment_providers_list();
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
    const order = await shopClient.order_add({
      cart_key: state.basketRootNode.key,
      payment_provider: state.selectedPaymentProviderName,
      billing_address_key: state.activeBillingAddress["key"],
      customer_key: state.customer["key"],
    });
    return order;
  }
  async function setShipping() {
    const shipping_skel = shopClient;
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
    addToCart,
    getArticleView,
    removeItem,
    updateItem,
    init,
    getAddressStructure,
    getChildren,
    addDiscount,
    getPaymentProviders,
    getAddress,
    addNode,
    getShippingData,
    getDefaultAddress,
    orderAdd,
    getBasket,
    setShiping,
  };
});
