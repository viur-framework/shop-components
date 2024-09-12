import {reactive} from "vue";
import {defineStore} from "pinia";
import {ViURShopClient} from "@viur/viur-shop-client";

export const useCartStore = defineStore("cartstore", () => {
  const shopClient = new ViURShopClient({
    host_url:
      window.location.origin === "http://localhost:8081"
        ? "http://localhost:8080"
        : window.location.origin,
  });

  const state = reactive({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: {address: {}, cart: {}},
    billingAddress: {},
    shippingAddress: {}
  });

  async function init() {
    await getRootNodes();
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
    await shopClient.discount_add({code});
  }

  async function getShippingData() {
    return await shopClient.shippingData({cart_key: state.basketRootNode.key});

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
    getShippingData
  };
});
