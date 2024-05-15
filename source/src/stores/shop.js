import { reactive } from "vue";
import { Request, ListRequest } from "@viur/vue-utils";
import { defineStore } from "pinia";

export const useShopStore = defineStore("shopstore", () => {


  const state = reactive({
    module: "hk",
    hasUpselling: true,
    upsellingBone: "matching_items",
    upsellingVariants: [],
    hasCrossselling: false,
    crosssellingBone: "",
    crossSellingItems: [],
    name: "",
    price: "",
    image: "",
  });

  async function getCrossSellingItems(url, keys) {
    console.log(url, keys)
    console.log("TTTT")
    state.crossSellingItems=[]
    let isCrossSelling=false


    for (let key of keys) {



      Request.get(`http://localhost:8080${url}?key=${key}`).then(async (resp) => {
        let data = await resp.json();


        console.log(data)




        state.crossSellingItems.push(data.skellist[0])

        console.log(state)
        isCrossSelling = true
      })


    };
    console.log(state.crossSellingItems)
    return isCrossSelling
    //Request.get(crossellingURL)

  }

  function getImage(item, image) {
    console.log("item"+image)
    let imageUrl =
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    if (item[image]) {
      return Request.downloadUrlFor("item"+image);
    }

    return imageUrl;
  }

  async function getUpsellingItems(url, keys) {
    console.log(url, keys)
    console.log("TTTT")
    state.upsellingVariants=[]
    console.log(item.matching_items)
    let isUpselling=false


    for (let key of keys) {


      Request.get(`http://localhost:8080${url}?key=${key}`).then(async (resp) => {
        let data = await resp.json();


        console.log(data)
        state.upsellingVariants.push(data.skellist[0])
        isUpselling = true
      })


    };
    console.log(state.upSellingItems)
    return isUpselling
    //Request.get(crossellingURL)

  }

  async function init() {
    console.dir(shopClient)
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
    getCrossSellingItems,
    getUpsellingItems,

  };
});
