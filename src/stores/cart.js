import {reactive, computed, watch} from "vue";
import {defineStore} from "pinia";
import {ViURShopClient} from "@viur/viur-shop-client";
// import { Utils } from "../components/lib/utils";
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
    whishlistRootNodes: [],
    children: {},
    structure: {address: {}, cart: {}},
    paymentProviders: {},
    billingAddressList: [],
    shippingAddressList: [],
    activeBillingAddress: {},
    activeShippingAddress: {},
    selectedPaymentProvider: {},
    selectedPaymentProviderName: "",
    customer: {},


  });

  async function init() {
    if (!isFetching) {
      isFetching = true;
      await getRootNodes();
      await getAddress();
      await getCustomer();
      isFetching = false;
      for (const waiter of waitForFetchingResolver) {
        waiter();
      }
      waitForFetchingResolver.splice(0,waitForFetchingResolver.length);
      waitForFetching.splice(0,waitForFetchingResolver.length);
    } else {
      const p = new Promise((resolve,reject)=>{
        waitForFetchingResolver.push(resolve)
      });
      waitForFetching.push(p)
      return p;
    }


    // const testData = await Utils.getAllNodes(state.basketRootNode)
    // console.log("hier kadir 222", testData);

    // const test = await Utils.buildTree(testData);
    // console.log("hier kadir 111", test);
  }

  async function getCustomer() {
    let resp = await shopClient.user_view();
    state.customer = resp;
    console.log("passiert", state.customer);
  }

  async function getChildren(parentKey) {
    return await shopClient.cart_list({cart_key: parentKey});
  }

  async function getRootNodes() {
    let resp = await shopClient.cart_list();

    resp.forEach((rootNode) => {
      if (rootNode.is_root_node) {
        if (rootNode.cart_type === "basket") {
          state.basketRootNode = rootNode;
        } else {
          state.whishlistRootNodes.push(rootNode);
        }
      }
    });
  }

  async function addToCart(articleKey, cartKey) {
    console.log("hier2", cartKey);
    console.log("hier2", articleKey);

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
    let resp = await shopClient.article_update({
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
    console.log("get address struct");
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
        if (address.is_default) {
          state.activeShippingAddress = address;
        }
      });
    } else {
      state.activeShippingAddress = setAddressValues("shipping");
    }
  }

  function setAddressValues(mode) {
    const structure = state.structure.address;
    console.log("set adress list ", structure);
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

    const addressList = await shopClient.address_list();
    state.billingAddressList = [];
    state.shippingAddressList = [];

    for (const address of addressList) {
      if (address.address_type === "billing") {
        console.log("add to bill address ?", address)
        state.billingAddressList.push(address);
      }
      if (address.address_type === "shipping") {
        state.shippingAddressList.push(address);
      }
    }

    getDefaultAddress();
  }

  async function addDiscount(code) {
    await shopClient.discount_add({code});
  }

  async function addNode(
    parentCart,
    name,
    shippingAddressKey,
    shippingKey,
    discount,
    cartType = "whishlist",
    comment = "",
  ) {
    return await shopClient.cart_add({
      parent_cart_key: parentCart,
      cart_type: cartType, // "basket" for main cart, "whishlist" for everything else
      name: name,
      customer_comment: comment,
      shipping_address_key: shippingAddressKey,
      shipping_key: shippingKey,
      discount_key: discount,
    });
  }

  async function getShippingData() {
    return await shopClient.shipping_list({
      cart_key: state.basketRootNode.key,
    });
  }

  async function getPaymentProviders() {
    const paymentProvieders = await shopClient.payment_providers_list();
    state.paymentProviders = paymentProvieders;
    //select first paymentprovider as default
    state.selectedPaymentProvider = paymentProvieders[Object.keys(paymentProvieders)[0]];
    state.selectedPaymentProviderName = Object.keys(paymentProvieders)[0]
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
    const order = await shopClient.order_add(
      {
        cart_key: state.basketRootNode.key,
        payment_provider: state.selectedPaymentProviderName,
        billing_address_key: state.activeBillingAddress["key"],
        customer_key: state.customer["key"]
      }
    )
    return order;
  }

  watch(
    () => state.activeBillingAddress,
    (newValue, oldValue) => {
      if (oldValue) {
        const isAddress = (address) => address.key === newValue.key;

        let index = state.billingAddressList.findIndex(isAddress);

        state.billingAddressList[index] = newValue;
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
  };
});
