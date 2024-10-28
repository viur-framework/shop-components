import {reactive} from "vue";
import {defineStore} from "pinia";
import {ViURShopClient} from "@viur/viur-shop-client";
const host_url=
      window.location.origin === "http://localhost:8081"
        ? "http://localhost:8080"
        : window.location.origin;
export const useCartStore = defineStore("cartstore", () => {
  const shopClient = new ViURShopClient({
host_url:host_url
  });

  const state = reactive({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: {address: {}, cart: {}},
    paymentProviders: {},
    billingAddress: {},
    shippingAddress: {},
    selectedPaymentProvider: {},
    selectedPaymentProviderName:"",
    user:{}
  });

  async function init() {
    await getRootNodes();
    getCurrentUser();
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
    state.structure.address = structure.addSkel;

  }

  async function getAddress() {
    const addressList = await shopClient.address_list();
    for (const address of addressList) {
      if (address.address_type === "billing") {
        state.billingAddress = address;
      }
      if (address.address_type === "shipping") {
        state.shippingAddress = address;
      }
    }
  }

  async function addDiscount(code) {
    return await shopClient.discount_add({code});
  }
  async function removeDiscount(discount_key) {
    return await shopClient.discount_remove({discount_key:discount_key});
  }


  async function getShippingData() {
    return await shopClient.shipping_list({cart_key: state.basketRootNode.key});

  }

  async function payment_providers_list() {
    const paymentProvieders = await shopClient.payment_providers_list();
    state.paymentProviders = paymentProvieders;
    //select first paymentprovider as default
    state.selectedPaymentProviderName = Object.keys(paymentProvieders)[0]
    state.selectedPaymentProvider = paymentProvieders[Object.keys(paymentProvieders)[0]]

  }
  async function getCurrentUser()
  {
    state.user = await shopClient.user_view();
  }
  async function orderAdd()
  {
    const order= await shopClient.order_add(
      {
        cart_key: state.basketRootNode.key,
        payment_provider:state.selectedPaymentProviderName,
        billing_address_key:state.billingAddress["key"],
        email:state.user.name,
        customer_key:state.user.key


      }
    )
  }

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
    getAddress,
    getShippingData,
    payment_providers_list,
    removeDiscount,
    orderAdd

  }
    ;
});
