import { reactive } from "vue";
import { Request } from "@viur/vue-utils";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cartstore", () => {
  const state = reactive({
    currentCart: "",
    allCarts: [],
  });

  function listCarts() {
    Request.get("/shop/api/cart_list").then(async (resp) => {
      let data = await resp.json();
      console.log("cartStore listCarts", data);
      state.allCarts = data;
      getCurrentCart(data);
    });
  }

  function getCurrentCart(skellist) {
    skellist.forEach((cart) => {
      if ((cart.cart_type = "basket")) {
        state.currentCart = cart.key;
      }
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
      console.log("article add", resp);

      let data = await resp.json();
    });
  }

  return {
    state,
    listCarts,
    addToCart,
  };
});
