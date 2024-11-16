import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";
import { Request } from "@viur/vue-utils";
import { useMessageStore } from "./message";
import { uuid } from "../lib/utils";

/*
? Error Handling:

? A UI Component (../components/generic/alerts/ShopAlert.vue)
? should be triggered when messageStore.state.errors has an entry.
? Every Error in this store should be added
? into messageStore with addError() if u want a feedback for the user
? otherwise use console.error()
*/

export const useCartStore = defineStore("shop-cart", () => {
  const messageStore = useMessageStore();
  let shopClient = null;

  const addError = (
    msg = "Alert!",
    iconName = "exclamation-octagon",
    variant = "danger",
  ) => {
    messageStore.state.errors.push({
      id: uuid(),
      msg: msg,
      iconName: iconName,
      variant: variant,
    });
  };

  const state = reactive({
    shopModuleName: "shop",
    basketRootNode: {}, // TODO: rename to session cart at a later point
    basket: [],
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
    shopClient = new ViURShopClient({
      host_url: import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL
        : window.location.origin, //use vite config, because all utils requests are using this.
      shop_module: state.shopModuleName, //change default module shop to something else
    });
  }

  async function init(update = false, onlyUser = true) {
    // update flag for example for rerendering
    console.log("Init Shop");

    if (state.isFetching) {
      return false; // currently we fetch data
    }

    state.isFetching = true;

    if (state.isReady && !update) {
      //block datafetching if shop is ready and no forced update is needed
      return true;
    }

    Promise.all([
      await getCustomer(),
      await getAddress(onlyUser),
      await getSessionCart(),
      //getBasket(),  // TODO: why? cart_list shows all carts basket_list doesnt render anything at all if not logged in
    ]);

    if (Object.keys(state.basketRootNode).length) {
      state.isReady = true;
      console.log("%c Shopata is ready", "color:lime");
    } else {
      state.isReady = false;
      console.error(
        "Error: Cant Init because of Error in a essential Shoprequest",
        error,
      );
    }

    state.isFetching = false;
  }

  async function getCustomer() {
    try {
      const resp = await shopClient.user_view();

      if (resp.name) {
        state.customer = resp;
        state.isLoggedIn = true;
        return resp;
      } else {
        throw resp;
      }
    } catch (error) {
      state.isLoggedIn = false;
      state.customer = {};
      addError("Nicht Eingelogged!");
    }
  }

  async function getChildren(parentKey) {
    try {
      const resp = await shopClient.cart_list({ cart_key: parentKey });
      if (Array.isArray(resp) && resp.length) {
        return resp;
      } else {
        throw resp;
      }
    } catch (error) {
      return error;
    }
  }

  async function getSessionCart() {
    try {
      const resp = await shopClient.cart_list();
      if (Array.isArray(resp)) {
        resp.forEach(async (rootNode) => {
          if (rootNode.is_root_node) {
            state.basketRootNode = rootNode;

            const rootChildren = await getChildren(rootNode.key);

            if (Array.isArray(rootChildren)) {
              state.childrenByNode[rootNode.key] = rootChildren;
            } else {
              state.childrenByNode[rootNode.key] = [];
            }
          }
        });
      } else {
        throw resp;
      }
    } catch (error) {
      state.basketRootNode = {};
      state.childrenByNode = {};
      console.error(
        "Error: Cant Init because of Error in a essential Shoprequest",
        error,
      );
      addError("Konnte Warenkorb nicht laden");
    }
  }

  async function addToCart(articleKey, cartKey) {
    let resp = await shopClient.article_add({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });

    console.log("addToCart", resp); //TODO: Errorhandling as soon as shop module works again
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

  async function getAddress(onlyUser) {
    if (!state.isLoggedIn && onlyUser === true) {
      throw "not logged in";
    }
    try {
      const addressList = await shopClient.address_list();

      if (Array.isArray(addressList)) {
        for (const address of addressList) {
          if (address.address_type === "billing") {
            state.billingAddressList.push(address);
          }
          if (address.address_type === "shipping") {
            state.shippingAddressList.push(address);
          }
        }
        if (
          state.billingAddressList.length ||
          state.shippingAddressList.length
        ) {
          getDefaultAddress();
        }
        return [state.billingAddressList, state.shippingAddressList];
      } else {
        throw addressList;
      }
    } catch (error) {
      return error;
    }
  }

  async function addDiscount(code) {
    await shopClient.discount_add({ code });
  }

  // core rc2 needed to work with all parameters
  async function addNode(
    parentCart,
    cartType = "wishlist",
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
    setConfig,
    addToCart,
    // getArticleView,
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
    // getBasket,
    setShiping,
  };
});
