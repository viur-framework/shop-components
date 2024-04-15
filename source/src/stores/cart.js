import { reactive } from "vue";
import { Request } from "@viur/vue-utils";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";

export const useCartStore = defineStore("cartstore", () => {
  const state = reactive({
    currentCart: "",
    allCarts: {},
    cartItems: {},
    basketArticle: [],
  });

  function init() {
    listCarts().then(async (resp) => {
      let data = await resp.json();
      getBasket(data);
      data.forEach((cart) => {
        state.allCarts[cart.key] = cart;
        getCartItems(cart.key).then(async (resp) => {
          let data = await resp.json();
          state.cartItems[cart.key] = data;
        });
      });
    });

    console.log("hier", state.currentCart);

    getBasketItems(state.currentCart).then(async (resp) => {
      let data = await resp.json();
      console.log("cartStore basket article", data);
      state.basketArticle = data;
    });

    // state.allCarts.forEach((cart) => {
    //   getCartItems(cart.key).then(async (resp) => {
    //     let data = await resp.json();
    //     state.cartItems[cartKey] = data;
    //   });
    // });
  }

  function listCarts() {
    return Request.get("/shop/api/cart_list");
    // const sc = new ViURShopClient();

    // sc.cart_list().then(async (resp) => console.log("test", await resp.json));
  }

  function getBasket(skellist) {
    skellist.forEach((cart) => {
      if ((cart.cart_type = "basket")) {
        state.currentCart = cart.key;
      }
    });
  }

  function getBasketItems(cartKey) {
    return Request.get(`/shop/api/cart_list`, {
      dataObj: { cart_key: cartKey },
    });
  }

  function getCartItems(cartKey) {
    return Request.get(`/shop/api/cart_list`, {
      dataObj: { cart_key: cartKey },
    });
  }

  function addToCart(articleKey, cartKey) {
    // let skey = "";
    // Request.get("/vi/skey?amount=1").then(async (resp) => {
    //   let data = await resp.json();
    //   console.log("skey", data);
    //   skey = data;
    // });
    Request.securePost("/shop/api/article_add", {
      dataObj: {
        article_key: articleKey,
        parent_cart_key: cartKey,
        quantity: 1,
        quantity_mode: "increase",
        // skey: skey,
      },
    }).then(async (resp) => {
      let data = await resp.json();
      console.log("article add", data);
    });
  }

  return {
    state,
    listCarts,
    addToCart,
    getBasketItems,
    init,
  };
});
