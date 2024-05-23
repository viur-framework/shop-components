import { reactive } from "vue";
import { Request, ListRequest } from "@viur/vue-utils";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";

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
    structure: { address: {}, cart: {} },
  });

  async function init() {
    // ! initializes only children for cart of type basket
    // ! for whishlists this has to be done in the component
    await getRootNodes();
    await getChildren(state.basketRootNode.key);
  }

  async function getChildren(parentKey) {
    let resp = await shopClient.cart_list({ cart_key: parentKey });

    resp.forEach(async (child) => {
      if (child.skel_type === "node") {
        await getChildren(child.key);
      } else {
        if (!Object.keys(state.children).includes(child.key)) {
          children[parentKey] = [];
        }
        children[parentKey].push(child);
      }
    });
  }

  async function getRootNodes() {
    let resp = await shopClient.cart_list();

    resp.forEach((rootNode) => {
      if (rootNode.is_root_node) {
        if (rootNode.cart_type === "basket") {
          state.basketRootNode = rootNode;
        } else {
          whishlistRootNodes.push(rootNode);
        }
      }
    });
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
    await getChildren(cartKey);
  }

  async function getAdressStructure() {
    let addSkel = await shopClient.address_structure();
    state.structure.address = addSkel.addSkel;

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
