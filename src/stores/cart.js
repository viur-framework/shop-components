import {reactive} from "vue";
import {useUrlSearchParams} from '@vueuse/core'
import {defineStore} from "pinia";
import {ViURShopClient} from "../client";
import {useMessageStore} from "./message";
import {useOrderStore} from "./order";
import {useAddressStore} from "./address";
import {useShippingStore} from "./shipping";

/*
TODO:
Error Handling. A UI Component (../components/generic/alerts/ShopAlert.vue)
should be triggered when state.errors has an entry.
Every Error in this store should be routed into state.errors
 */
export const useCartStore = defineStore("shop-cart", () => {
  const messageStore = useMessageStore();
  const orderStore = useOrderStore();
  const addressStore = useAddressStore();
  let shippingStore = null;

  const state = reactive({
    shopClient: null,
    shopModuleName: "shop",
    currentbasketKey: null,
    cart: {},
    basket: {},
    childrenByNode: {},
    paymentProviders: {},
    selectedPaymentProvider: {},
    selectedPaymentProviderName: "",
    customer: {},
    isLoggedIn: false,
    isReady: false,
    isFetching: false,
    hasError: false,
    placeholder: "",
    freeze: false,
    onlyUser: true,
  });

  function setConfig({
                       shopModuleName = "shop",
                       placeholder = "",
                       onlyUser = true,
                     } = {}) {
    /* function set set initial states */
    state.shopModuleName = shopModuleName; // change default module shop to something else
    state.placeholder = placeholder; // define image placeholder for missing images
    state.onlyUser = onlyUser; // define order with or without userAccount
    state.shopClient =
      addressStore.state.shopClient =
        orderStore.state.shopClient =
          new ViURShopClient({
            host_url: import.meta.env.VITE_API_URL
              ? import.meta.env.VITE_API_URL
              : window.location.origin, //use vite config, because all utils requests are using this.
            shop_module: state.shopModuleName, //change default module shop to something else
          });

    //get Orderkey from url, to continue orderprozess after reload
    const params = useUrlSearchParams('hash')
    if (Object.keys(params).includes('order')) {
      orderStore.state.currentOrderkey = params['order']
    }
  }

  async function init(update = false) {
    console.log("Init Shop");
    if (state.isFetching) {
      return false; // currently we fetch data
    }
    state.isFetching = true;
    if (state.isReady && !update) {
      //block datafetching if shop is ready and no forced update is needed
      return true;
    }

    try {
      const customer = await getCustomer();
      const loadOrder = await orderStore.getOrder();
      await getCart();
      const shopRequests = await Promise.all([
        addressStore.init(),
        getBasket()
      ]);

      state.isReady = true;
      console.log("%c Shopdata is ready", "color:lime");
    } catch (error) {
      state.isReady = false;
      state.hasError = true;
      console.error(
        "Error: Cant Init because of Error in a essential Shoprequest",
        error,
      );
      messageStore.state.errors.push({
        msg: error,
        variant: "danger",
        iconName: "x-lg",
        id: new Date().getTime(),
        duration: "Infinity",
        closeable: false,
      });
    }
    state.isFetching = false;
  }

  async function getCustomer() {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await state.shopClient.user_view();
        state.customer = resp;
        state.isLoggedIn = true;
        resolve(resp);
      } catch (error) {
        state.isLoggedIn = false;
        state.customer = {};
        reject(error);
      }
    });
  }

  async function getCart(key = null) {
    if (!key) {
      if (orderStore.state.currentOrder?.['cart']?.['dest']?.['key']) {
        //Cart is detached from the session
        key = orderStore.state.currentOrder['cart']['dest']['key'];
        const resp=await Request.view("shop.cart",key);
        const data = await  resp.json();
        state.cart = data["values"];

      } else { //We have no key so we must get it form cart
        const resp = await state.shopClient.cart_list();
        state.cart=resp[0];
      }

    }

  }

  async function getBasket(key = null) {
    return new Promise(async (resolve, reject) => {
      if (!key) {
        if (orderStore.state.currentOrder?.['cart']?.['dest']?.['key']) {
          key = orderStore.state.currentOrder['cart']['dest']['key'];
          state.freeze = true;
        } else { //We have no key so we must get it form cart
          const resp = await state.shopClient.cart_list();
          key = resp[0]["key"];
        }

      }
      try {
        const resp = await state.shopClient.cart_list({cart_key: key});
        state.basket = resp[0];
        state.currentbasketKey = state.basket['parentrepo']//fixme this total unnecessary
        resolve(state.basket);
      } catch (error) {
        state.basket = []; //reset basket on error
        reject(error);
      }
    });
  }

  async function getOrderCart() {

  }

  async function getChildren(parentKey) {
    return await state.shopClient.cart_list({cart_key: parentKey});
  }

  async function addToCart(articleKey, cartKey) {
    let resp = await state.shopClient.article_add({
      article_key: articleKey,
      parent_cart_key: cartKey,
    });
    state.basket = await getChildren(cartKey);
    state.currentbasketKey = state.basket['parentrepo']
  }

  async function removeItem(articleKey, cartKey) {
    try {
      let resp = await state.shopClient.article_remove({
        article_key: articleKey,
        parent_cart_key: cartKey,
      });
      if (resp === null) {
        await updateCart();
      } else {
        throw resp;
      }
    } catch (error) {
      console.log("remove Resp", error); //TODO: Errorhandling as soon as shop module works again
    }
  }

  async function updateItem(articleKey, cartKey, quantity) {
    const resp = await state.shopClient.article_update({
      article_key: articleKey,
      parent_cart_key: cartKey,
      quantity: quantity,
      quantity_mode: "replace",
    });

    if (resp) {
      await updateCart();
    }

    console.log("update Resp", resp); //TODO: Errorhandling as soon as shop module works again
  }

  async function updateCart() {
    state.basket = {};
    await getCart();
    await getBasket();
    if (shippingStore === null) {
      //Can not import at the top because then the watcher in the shippingstore not work
      shippingStore = useShippingStore();
    }
    shippingStore.updateShipping();
  }

  async function addDiscount(code) {
    await state.shopClient.discount_add({code});
  }

  async function update({
                          key,
                          type,
                          name,
                          customerComment,
                          shippingAddress,
                          shipping,
                          discount,
                        } = {}) {
    if (!key) {
      key = state.basket.key;
    }

    let params = {
      cart_key: key,
      cart_type: type,
      name: name,
      customer_comment: customerComment,
      shipping_address_key: shippingAddress,
      shipping_key: shipping,
      discount_key: discount,
    };

    try {
      const resp = await state.shopClient.cart_update(params);
      if (resp) {
        console.log("cart update resp", resp);
      } else {
        throw resp;
      }
    } catch (error) {
      console.error("cart.update error", error);
    }
  }

  // core rc2 needed to work with all parameters
  async function addNode(
    parentCart,
    cartType = "whishlist",
    cartName = undefined,
    comment = undefined,
    shipping_key = undefined,
    shipping_address_key = undefined,
    discount_key = undefined,
  ) {
    return await state.shopClient.cart_add({
      parent_cart_key: parentCart,
      cart_type: cartType, // "basket" for main cart, "whishlist" for everything else
      name: cartName,
      customer_comment: comment,
      shipping_address_key: shipping_address_key,
      shipping_key: shipping_key,
      discount_key: discount_key,
    });
  }


  return {
    state,
    setConfig,
    addToCart,
    removeItem,
    updateItem,
    init,
    getChildren,
    addDiscount,
    addNode,
    getBasket,
    update,
  };
});
