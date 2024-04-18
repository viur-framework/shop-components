import { reactive } from "vue";
import { Request, ListRequest } from "@viur/vue-utils";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";

export const useCartStore = defineStore("cartstore", () => {
  const shopClient = new ViURShopClient({ host_url: "http://localhost:8080" });

  const state = reactive({
    basket: "",
    carts: {},
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
  }

  async function getArticleView(articleKey, cartKey) {
    let article = await shopClient.article_view({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });

    console.log("getArticleView", article);
  }

  return {
    state,
    addToCart,
    getArticleView,
    init,
  };
});
