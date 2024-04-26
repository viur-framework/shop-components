import { reactive } from "vue";
import { Request, ListRequest } from "@viur/vue-utils";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";

export const useCartStore = defineStore("cartstore", () => {
  const shopClient = new ViURShopClient({
    host_url: import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL
      : window.location.origin,
  });

  const state = reactive({
    basket: "",
    carts: {},
    structure: { address: {}, cart: {} },
  });

  async function init() {
    await getCarts();
  }

  async function getCarts() {
    let carts = await shopClient.cart_list();
    carts.forEach(async (cart) => {
      state.carts[cart.key] = {};
      state.carts[cart.key].info = cart;
      if (cart.cart_type === "basket") {
        state.basket = cart.key;
      }
      await getCartItems(cart.key);
    });
  }

  async function getCartItems(cartKey) {
    let cartItems = await shopClient.cart_list({ cart_key: cartKey });
    state.carts[cartKey].items = cartItems;
  }

  async function addToCart(articleKey, cartKey) {
    let resp = await shopClient.article_add({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });

    await updateCart(cartKey);
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

    await updateCart(cartKey);

    console.log("remove Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  async function updateItem(articleKey, cartKey, quantity) {
    let resp = await shopClient.article_update({
      article_key: articleKey,
      parent_cart_key: cartKey,
      quantity: quantity,
      quantity_mode: "replace",
    });

    if (quantity === 0) {
      await updateCart(cartKey);
    }
    console.log("update Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  async function updateCart(cartKey) {
    await getCartItems(cartKey);
  }

  async function getAdressStructure() {
    let addSkel = await shopClient.address_structure()
    state.structure.address = addSkel.addSkel

    console.log("adress add", state.structure.address);

    // Request.getStructure("shop.address").then(async (resp) => {
    //   let data = await resp.json();
    //   state.structure.address = data.addSkel;

    //   console.log("adress add", state.structure.address);
    // });
  }

  return {
    state,
    addToCart,
    getArticleView,
    removeItem,
    updateItem,
    init,
    getAdressStructure,
  };
});
