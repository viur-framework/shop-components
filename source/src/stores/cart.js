import { reactive } from "vue";
import { Request } from "@viur/vue-utils";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";

export const useCartStore = defineStore("cartstore", () => {
  const state = reactive({
    currentCart: "",
    allCarts: {},
    basketArticle: [],
  });

  async function init() {
    await listCarts();
    console.log("hier", state.currentCart)
    await getBasketItems(state.currentCart);
  }

  async function listCarts() {
    await Request.get("/shop/api/cart_list").then(async (resp) => {
      let data = await resp.json();
      await getBasket(data);
      data.forEach((cart)=>{
        state.allCarts[cart.key] = cart
      })
    });
    // const sc = new ViURShopClient();

    // sc.cart_list().then(async (resp) => console.log("test", await resp.json));
  }

  async function getBasket(skellist) {
    skellist.forEach((cart) => {
      if ((cart.cart_type = "basket")) {
        state.currentCart = cart.key;
      }
    });
  }

  async function getBasketItems(cartKey) {
    Request.get(`/shop/api/cart_list`, {
      dataObj: { cart_key: cartKey },
    }).then(async (resp) => {
      let data = await resp.json();
      console.log("cartStore basket article", data);
      state.basketArticle = data;
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
    init
  };
});
