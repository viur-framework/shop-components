import { reactive, computed, useCssVars, resolveComponent, openBlock, createBlock, Transition, withCtx, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, createTextVNode, toDisplayString, onBeforeMount, pushScopeId, popScopeId, ref, renderList, unref, Teleport, resolveDynamicComponent, mergeProps, normalizeClass, withDirectives, vShow, shallowRef } from "vue";
import { Request } from "@viur/vue-utils";
import { defineStore } from "pinia";
import { ViURShopClient } from "@viur/viur-shop-client";
import "vue-router";
var Loader_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const __default__ = {
  props: {
    size: {
      type: String,
      default: "2"
    },
    active: {
      type: Boolean,
      default: true
    },
    logo: {
      default: "logo-cube.svg",
      type: String
    },
    color: {
      default: "var(--sl-color-primary-500)",
      type: String
    }
  },
  setup(props, context) {
    const state = reactive({
      trackWidth: computed(() => {
        return `${props.size / 30}rem`;
      }),
      outerSize: computed(() => {
        return `calc(${props.size}rem + ${state.trackWidth})`;
      }),
      spinnerSize: computed(() => {
        return `${props.size}rem`;
      }),
      logoSize: computed(() => {
        return `calc(${props.size}rem - ${state.trackWidth} * 10)`;
      }),
      shadow: computed(() => {
        return `0px 0px ${props.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`;
      })
    });
    return { state };
  }
};
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "4d516391": _ctx.state.outerSize,
    "9cfd9e6a": _ctx.state.shadow,
    "08327592": _ctx.state.logoSize,
    "602facef": _ctx.state.spinnerSize,
    "0a642916": _ctx.color,
    "3a404d66": _ctx.state.trackWidth
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main$6 = __default__;
const _hoisted_1$4 = {
  key: 0,
  class: "loading"
};
const _hoisted_2$4 = { class: "logo" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_sl_spinner = resolveComponent("sl-spinner");
  const _component_sl_icon = resolveComponent("sl-icon");
  return openBlock(), createBlock(Transition, null, {
    default: withCtx(() => [
      $props.active ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
        createVNode(_component_sl_spinner, { class: "loader" }),
        createElementVNode("div", _hoisted_2$4, [
          createVNode(_component_sl_icon, { src: $props.logo }, null, 8, ["src"])
        ])
      ])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
var Loader = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render], ["__scopeId", "data-v-356919e0"]]);
const useCartStore = defineStore("cartstore", () => {
  const shopClient = new ViURShopClient({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  });
  const state = reactive({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} }
  });
  async function init() {
    await getRootNodes();
  }
  async function getChildren(parentKey) {
    let resp = await shopClient.cart_list({ cart_key: parentKey });
    return resp;
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
      parent_cart_key: cartKey
    });
    console.log("addToCart", resp);
  }
  async function getArticleView(articleKey, cartKey) {
    let article = await shopClient.article_view({
      article_key: articleKey,
      parent_cart_key: cartKey
    });
    console.log("getArticleView", article);
  }
  async function removeItem(articleKey, cartKey) {
    let resp = await shopClient.article_remove({
      article_key: articleKey,
      parent_cart_key: cartKey
    });
    console.log("remove Resp", resp);
  }
  async function updateItem(articleKey, cartKey, quantity) {
    let resp = await shopClient.article_update({
      article_key: articleKey,
      parent_cart_key: cartKey,
      quantity,
      quantity_mode: "replace"
    });
    console.log("update Resp", resp);
  }
  async function getAdressStructure() {
    let addSkel = await shopClient.address_structure();
    state.structure.address = addSkel.addSkel;
    console.log("adress add", state.structure.address);
  }
  return {
    state,
    addToCart,
    getArticleView,
    removeItem,
    updateItem,
    init,
    getAdressStructure,
    getChildren
  };
});
const _sfc_main$5 = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: true }
  },
  setup(__props) {
    reactive({});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createTextVNode(" cartnode "),
        createElementVNode("pre", null, toDisplayString(__props.node.name), 1)
      ], 64);
    };
  }
};
var CartLeaf_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-3f1dae7a"), n = n(), popScopeId(), n);
const _hoisted_1$3 = ["src"];
const _hoisted_2$3 = {
  class: "viur-shop-cart-card-header",
  slot: "header"
};
const _hoisted_3$3 = { class: "viur-shop-cart-card-headline headline" };
const _hoisted_4$3 = { class: "viur-shop-cart-card-body-row" };
const _hoisted_5$2 = { class: "viur-shop-cart-card-body-info" };
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-card-descr" }, [
  /* @__PURE__ */ createTextVNode(" Version: 900x900x2000 "),
  /* @__PURE__ */ createElementVNode("br"),
  /* @__PURE__ */ createTextVNode(" Farbe: Chromoptik "),
  /* @__PURE__ */ createElementVNode("br"),
  /* @__PURE__ */ createTextVNode(" Glasart: Klar hell mit Edelglasbeschichtung"),
  /* @__PURE__ */ createElementVNode("br"),
  /* @__PURE__ */ createTextVNode(" Anschlag: Beidseitig variabel"),
  /* @__PURE__ */ createElementVNode("br"),
  /* @__PURE__ */ createTextVNode(" Griff: Stangengriff Exklusiv (56) ")
], -1));
const _hoisted_7$2 = { class: "viur-shop-cart-card-body-footer" };
const _hoisted_8$2 = { class: "viur-shop-cart-card-body-amount" };
const _hoisted_9$2 = {
  class: "viur-shop-cart-card-price-wrap",
  slot: "footer"
};
const _hoisted_10$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-card-price-label" }, "Preis", -1));
const _hoisted_11$2 = { class: "viur-shop-cart-card-price" };
const _hoisted_12$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-card-small-print" }, "Brutto / Stk.", -1));
const _sfc_main$4 = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: true },
    node: { type: Object, required: true }
  },
  emits: ["updateItem", "removeItem"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const state = reactive({
      leaf: {}
    });
    function getImage(image) {
      if (image !== void 0)
        return Request.downloadUrlFor(image);
      return "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function updateItem(item, articleKey, node, quantity) {
      emit("updateItem", {
        item,
        articleKey,
        node,
        quantity
      });
    }
    function removeItem(item, articleKey, node) {
      emit("removeItem", { item, articleKey, node });
    }
    onBeforeMount(() => {
      state.leaf = props.leaf;
    });
    return (_ctx, _cache) => {
      const _component_sl_icon = resolveComponent("sl-icon");
      const _component_sl_button = resolveComponent("sl-button");
      const _component_sl_input = resolveComponent("sl-input");
      const _component_sl_card = resolveComponent("sl-card");
      return openBlock(), createElementBlock(Fragment, null, [
        createTextVNode(" cartleafe "),
        createVNode(_component_sl_card, {
          horizontal: "",
          class: "viur-shop-cart-card"
        }, {
          default: withCtx(() => [
            createElementVNode("img", {
              class: "viur-shop-cart-card-img",
              slot: "image",
              src: getImage(state.leaf.shop_image ? state.leaf.shop_image : void 0)
            }, null, 8, _hoisted_1$3),
            createElementVNode("div", _hoisted_2$3, [
              createElementVNode("h4", _hoisted_3$3, toDisplayString(state.leaf.shop_name) + " | " + toDisplayString(__props.leaf.shop_art_no_or_gtin), 1)
            ]),
            createElementVNode("div", _hoisted_4$3, [
              createElementVNode("div", _hoisted_5$2, [
                _hoisted_6$2,
                createElementVNode("div", _hoisted_7$2, [
                  createVNode(_component_sl_button, {
                    size: "small",
                    outline: "",
                    class: "viur-shop-cart-card-add-to-favourites-btn",
                    variant: "primary",
                    title: "Add to favourites"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_sl_icon, {
                        name: "heart",
                        slot: "prefix"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_sl_button, {
                    size: "small",
                    outline: "",
                    class: "viur-shop-cart-card-delete-btn",
                    variant: "primary",
                    title: "Remove from cart",
                    onClick: _cache[0] || (_cache[0] = ($event) => removeItem(state.leaf, state.leaf.article.dest.key, __props.node))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_sl_icon, {
                        name: "trash",
                        slot: "prefix"
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              createElementVNode("div", _hoisted_8$2, [
                createVNode(_component_sl_input, {
                  class: "amount-input",
                  type: "number",
                  label: "Anzahl",
                  placeholder: "Number",
                  min: "0",
                  modelValue: state.leaf.quantity,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.leaf.quantity = $event),
                  onInput: _cache[2] || (_cache[2] = ($event) => updateItem(
                    state.leaf,
                    state.leaf.article.dest.key,
                    __props.node,
                    state.leaf.quantity
                  ))
                }, null, 8, ["modelValue"])
              ]),
              createElementVNode("div", _hoisted_9$2, [
                _hoisted_10$2,
                createElementVNode("div", _hoisted_11$2, toDisplayString(state.leaf.price.retail) + " \u20AC ", 1),
                _hoisted_12$2
              ])
            ])
          ]),
          _: 1
        })
      ], 64);
    };
  }
};
var CartLeaf = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-3f1dae7a"]]);
var CartView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-6c25a013"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1));
const _hoisted_2$2 = {
  class: "footer-wrap",
  slot: "footer"
};
const _hoisted_3$2 = { key: 0 };
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1));
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_6$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_7$1 = { class: "viur-shop-cart-sidebar-info-line" };
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("span", null, "Zwischensumme", -1));
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ createElementVNode("span", null, "Rabatt"),
  /* @__PURE__ */ createTextVNode(" 0 \u20AC ")
], -1));
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ createElementVNode("span", null, "Versandkosten"),
  /* @__PURE__ */ createTextVNode(" 0 \u20AC ")
], -1));
const _hoisted_11$1 = { class: "viur-shop-cart-sidebar-info-line total" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("span", null, "Gesamt:", -1));
const _hoisted_13$1 = { class: "viur-shop-cart-sidebar-btn-wrap" };
const _sfc_main$3 = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: true },
    sidebar: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const cartStore = useCartStore();
    const confirm = ref(null);
    const state = reactive({
      cartIsInit: computed(() => {
        return cartStore.state.basketRootNode ? true : false;
      }),
      itemsIsInit: computed(() => {
        return true;
      }),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    computed(() => {
      return props.mode === "basket" ? cartStore.state.basket : props.cartKey;
    });
    async function onConfirm() {
      await cartStore.updateItem(
        state.currentItem.article.dest.key,
        state.currentNode.key,
        0
      );
      await updateCart();
      confirm.value.hide();
    }
    async function updateItem(e) {
      console.log("updateItem :", e);
      if (e.quantity === 0) {
        confirm.value.show();
        state.currentItem = e.item;
        state.currentNode = e.node;
      } else {
        await cartStore.updateItem(e.articleKey, e.node.key, e.quantity);
        await cartStore.init();
      }
    }
    function removeItem(e) {
      console.log("removeItem :", e);
      confirm.value.show();
      state.currentItem = e.item;
      state.currentNode = e.node;
    }
    async function onDialogHide() {
      state.leaves[state.currentNode.key].forEach((item) => {
        if (item.key === state.currentItem.key) {
          item.quantity = 1;
        }
      });
      state.currentItem = {};
      state.currentNode = {};
    }
    async function updateCart() {
      state.nodes = [];
      state.leaves = {};
      await cartStore.init();
      await getChildren();
    }
    async function getChildren(parentKey = props.cartKey) {
      console.log("debug getChildren parentKey from comp: ", parentKey);
      const children = await cartStore.getChildren(parentKey);
      console.log("getChildren children: ", children);
      children.forEach(async (child) => {
        if (child.skel_type === "node") {
          state.nodes.push(child);
          await getChildren(child.key);
        } else {
          if (!Object.keys(state.leaves).includes(parentKey)) {
            state.leaves[parentKey] = [];
          }
          state.leaves[parentKey].push(child);
        }
      });
    }
    onBeforeMount(async () => {
      await cartStore.init();
      await getChildren();
      if (props.mode === "basket") {
        state.nodes.push(cartStore.state.basketRootNode);
      }
      console.log("state.nodes test", state.nodes);
      console.log("state.leaves", state.leaves);
    });
    return (_ctx, _cache) => {
      const _component_sl_spinner = resolveComponent("sl-spinner");
      const _component_sl_button = resolveComponent("sl-button");
      const _component_sl_dialog = resolveComponent("sl-dialog");
      const _component_sl_input = resolveComponent("sl-input");
      const _component_sl_icon = resolveComponent("sl-icon");
      return !__props.cartKey.length ? (openBlock(), createBlock(_component_sl_spinner, { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createVNode(_component_sl_dialog, {
          ref_key: "confirm",
          ref: confirm,
          onSlHide: onDialogHide
        }, {
          default: withCtx(() => [
            _hoisted_1$2,
            createElementVNode("div", _hoisted_2$2, [
              createVNode(_component_sl_button, {
                variant: "danger",
                onClick: _cache[0] || (_cache[0] = ($event) => confirm.value.hide()),
                size: "medium"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Abbrechen ")
                ]),
                _: 1
              }),
              createVNode(_component_sl_button, {
                variant: "success",
                onClick: onConfirm,
                size: "medium"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Aus Warenkorb entfernen ")
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 512),
        (openBlock(true), createElementBlock(Fragment, null, renderList(state.nodes, (node) => {
          return openBlock(), createElementBlock("div", null, [
            Object.keys(state.leaves).includes(node.key) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(_sfc_main$5, { node }, null, 8, ["node"]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(state.leaves[node.key], (leaf) => {
                return openBlock(), createBlock(CartLeaf, {
                  key: leaf.key,
                  leaf,
                  node,
                  onRemoveItem: removeItem,
                  onUpdateItem: updateItem
                }, null, 8, ["leaf", "node"]);
              }), 128))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 256)),
        __props.sidebar ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
          _hoisted_4$2,
          _hoisted_5$1,
          createVNode(_component_sl_input, { label: "Rabattcode eingeben" }),
          _hoisted_6$1,
          createElementVNode("div", _hoisted_7$1, [
            _hoisted_8$1,
            createTextVNode(" --> " + toDisplayString(__props.mode === "basket" ? unref(cartStore).state.basketRootNode.total : unref(cartStore).state.whishlistRootNodes[__props.cartKey].total) + " \u20AC ", 1)
          ]),
          _hoisted_9$1,
          _hoisted_10$1,
          createElementVNode("div", _hoisted_11$1, [
            _hoisted_12$1,
            createTextVNode(" " + toDisplayString(__props.mode === "basket" ? unref(cartStore).state.basketRootNode.total : unref(cartStore).state.whishlistRootNodes[__props.cartKey].total) + " \u20AC ", 1)
          ]),
          createElementVNode("div", _hoisted_13$1, [
            createVNode(_component_sl_button, {
              variant: "info",
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(" Jetzt Bestellen ")
              ]),
              _: 1
            }),
            createVNode(_component_sl_button, {
              size: "small",
              variant: "primary"
            }, {
              default: withCtx(() => [
                createVNode(_component_sl_icon, {
                  name: "paypal",
                  slot: "prefix"
                }),
                createTextVNode(" Paypal ")
              ]),
              _: 1
            })
          ])
        ])) : createCommentVNode("", true)
      ], 64));
    };
  }
};
var CartView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6c25a013"]]);
var ConfirmView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-65081a13"), n = n(), popScopeId(), n);
const _hoisted_1$1 = {
  key: 1,
  class: "list"
};
const _hoisted_2$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1));
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_4$1 = { class: "viur-shop-cart-address-wrap" };
const _hoisted_5 = { class: "viur-shop-cart-address" };
const _hoisted_6 = { class: "viur-shop-cart-address-headline" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_10 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_12 = { class: "viur-shop-cart-address" };
const _hoisted_13 = { class: "viur-shop-cart-address-headline" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_18 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_19 = { class: "viur-shop-cart-payment" };
const _hoisted_20 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-payment-method" }, [
  /* @__PURE__ */ createElementVNode("span", null, "Zahlungsmethode:"),
  /* @__PURE__ */ createTextVNode(" Paypal ")
], -1));
const _hoisted_21 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1));
const _hoisted_22 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_23 = ["src"];
const _hoisted_24 = {
  class: "viur-shop-cart-mini-cart-header",
  slot: "header"
};
const _hoisted_25 = { class: "viur-shop-cart-mini-headline headline" };
const _hoisted_26 = { class: "viur-shop-cart-mini-card-body-row" };
const _hoisted_27 = { class: "viur-shop-cart-mini-card-body-info" };
const _hoisted_28 = { class: "viur-shop-cart-mini-card-info-wrap" };
const _hoisted_29 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-mini-card-info" }, [
  /* @__PURE__ */ createElementVNode("span", null, "Anzahl: "),
  /* @__PURE__ */ createTextVNode(" 1 ")
], -1));
const _hoisted_30 = { class: "viur-shop-cart-mini-card-info" };
const _hoisted_31 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", null, "Preis: ", -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1));
const _hoisted_33 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_34 = { class: "viur-shop-cart-sidebar-info-line" };
const _hoisted_35 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", null, "Zwischensumme", -1));
const _hoisted_36 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ createElementVNode("span", null, "Rabatt"),
  /* @__PURE__ */ createTextVNode(" 0 \u20AC ")
], -1));
const _hoisted_37 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ createElementVNode("span", null, "Versandkosten"),
  /* @__PURE__ */ createTextVNode(" 0 \u20AC ")
], -1));
const _hoisted_38 = { class: "viur-shop-cart-sidebar-info-line total" };
const _hoisted_39 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", null, "Gesamt:", -1));
const _hoisted_40 = { class: "viur-shop-cart-sidebar-btn-wrap" };
const _sfc_main$2 = {
  __name: "ConfirmView",
  setup(__props) {
    const cartStore = useCartStore();
    const state = reactive({
      cartIsInit: computed(() => {
        return cartStore.state.basket.length ? true : false;
      }),
      itemsIsInit: computed(() => {
        return cartStore.state.carts[cartStore.state.basket].items ? true : false;
      }),
      images: {},
      showOrderButton: false
    });
    function getImage(item) {
      Request.get(`/json/dk_variante/view/${item}`).then(async (resp) => {
        let data = await resp.json();
        data = data.values;
        let imageUrl = data.dk_artikel.dest.image ? Request.downloadUrlFor(data.dk_artikel.dest.image) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
        state.images[item] = imageUrl;
      });
      return state.images[item];
    }
    function onTosAccept(e) {
      if (e.target.checked)
        state.showOrderButton = true;
      if (!e.target.checked)
        state.showOrderButton = false;
    }
    onBeforeMount(async () => {
      await cartStore.init();
    });
    return (_ctx, _cache) => {
      const _component_sl_icon = resolveComponent("sl-icon");
      const _component_sl_button = resolveComponent("sl-button");
      const _component_sl_card = resolveComponent("sl-card");
      const _component_sl_checkbox = resolveComponent("sl-checkbox");
      return !state.cartIsInit ? (openBlock(), createBlock(Loader, { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_1$1, [
        _hoisted_2$1,
        _hoisted_3$1,
        createElementVNode("div", _hoisted_4$1, [
          createElementVNode("div", _hoisted_5, [
            createElementVNode("div", _hoisted_6, [
              createTextVNode(" Versandadresse "),
              createVNode(_component_sl_button, {
                outline: "",
                size: "small"
              }, {
                default: withCtx(() => [
                  createVNode(_component_sl_icon, {
                    name: "pencil",
                    slot: "prefix"
                  })
                ]),
                _: 1
              })
            ]),
            createTextVNode(" Roland Brose"),
            _hoisted_7,
            createTextVNode(" Speicherstra\xDFe 33"),
            _hoisted_8,
            createTextVNode(" 44147 Dortmund, DE"),
            _hoisted_9,
            _hoisted_10,
            createTextVNode(" rb@mausbrand.de"),
            _hoisted_11,
            createTextVNode(" 0231 21 34 68 90 ")
          ]),
          createElementVNode("div", _hoisted_12, [
            createElementVNode("div", _hoisted_13, [
              createTextVNode(" Rechnungsadresse "),
              createVNode(_component_sl_button, {
                outline: "",
                size: "small"
              }, {
                default: withCtx(() => [
                  createVNode(_component_sl_icon, {
                    name: "pencil",
                    slot: "prefix"
                  })
                ]),
                _: 1
              })
            ]),
            createTextVNode(" Roland Brose"),
            _hoisted_14,
            createTextVNode(" Speicherstra\xDFe 33"),
            _hoisted_15,
            createTextVNode(" 44147 Dortmund, DE"),
            _hoisted_16,
            _hoisted_17,
            createTextVNode(" rb@mausbrand.de"),
            _hoisted_18,
            createTextVNode(" 0231 21 34 68 90 ")
          ])
        ]),
        createElementVNode("div", _hoisted_19, [
          _hoisted_20,
          createVNode(_component_sl_button, {
            outline: "",
            size: "small"
          }, {
            default: withCtx(() => [
              createVNode(_component_sl_icon, {
                name: "pencil",
                slot: "prefix"
              })
            ]),
            _: 1
          })
        ]),
        _hoisted_21,
        _hoisted_22,
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(cartStore).state.carts[unref(cartStore).state.basket].items, (item) => {
          return openBlock(), createBlock(_component_sl_card, {
            horizontal: "",
            class: "viur-shop-cart-mini-card"
          }, {
            default: withCtx(() => [
              createElementVNode("img", {
                class: "viur-shop-cart-mini-card-img",
                slot: "image",
                src: getImage(item.article.dest.key)
              }, null, 8, _hoisted_23),
              createElementVNode("div", _hoisted_24, [
                createElementVNode("h4", _hoisted_25, toDisplayString(item.article.dest.shop_name) + " | 425018", 1)
              ]),
              createElementVNode("div", _hoisted_26, [
                createElementVNode("div", _hoisted_27, [
                  createElementVNode("div", _hoisted_28, [
                    _hoisted_29,
                    createElementVNode("div", _hoisted_30, [
                      _hoisted_31,
                      createTextVNode(" " + toDisplayString(item.article.dest.shop_price_recommended) + " \u20AC ", 1)
                    ])
                  ])
                ])
              ])
            ]),
            _: 2
          }, 1024);
        }), 256)),
        (openBlock(), createBlock(Teleport, { to: "#order_sidebar" }, [
          _hoisted_32,
          _hoisted_33,
          createElementVNode("div", _hoisted_34, [
            _hoisted_35,
            createTextVNode(" " + toDisplayString(unref(cartStore).state.carts[unref(cartStore).state.basket].info.total) + " \u20AC ", 1)
          ]),
          _hoisted_36,
          _hoisted_37,
          createElementVNode("div", _hoisted_38, [
            _hoisted_39,
            createTextVNode(" " + toDisplayString(unref(cartStore).state.carts[unref(cartStore).state.basket].info.total) + " \u20AC ", 1)
          ]),
          createVNode(_component_sl_checkbox, { onSlChange: onTosAccept }, {
            default: withCtx(() => [
              createTextVNode(" Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ")
            ]),
            _: 1
          }),
          createElementVNode("div", _hoisted_40, [
            createVNode(_component_sl_button, {
              variant: state.showOrderButton ? "info" : "disabled",
              size: "small",
              disabled: !state.showOrderButton
            }, {
              default: withCtx(() => [
                createTextVNode(" Zahlungspflichtig bestellen ")
              ]),
              _: 1
            }, 8, ["variant", "disabled"])
          ])
        ]))
      ]));
    };
  }
};
var ConfirmView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-65081a13"]]);
var OrderView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-f09670ea"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "bind viur-shop-wrap" };
const _hoisted_2 = { class: "viur-shop-order-step" };
const _hoisted_3 = { class: "viur-shop-order-status-text" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", {
  class: "viur-shop-sidebar",
  id: "order_sidebar"
}, null, -1));
const _sfc_main$1 = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: true
    }
  },
  emits: ["tabChange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const state = reactive({
      tabNames: computed(() => sortTabs(props.tabs)),
      isFirstTab: (index) => {
        if (index === 0) {
          return true;
        }
        return false;
      }
    });
    const tabGroup = ref(null);
    function sortTabs(tabs) {
      let sortedArray = [];
      let outputArray = [];
      for (const tab in tabs) {
        if (tabs[tab].position) {
          sortedArray.push([tab, tabs[tab].position]);
        } else {
          sortedArray.push([tab, 0]);
        }
      }
      sortedArray.sort((a, b) => {
        return a[1] - b[1];
      });
      sortedArray.forEach((tab) => {
        outputArray.push(tab[0]);
      });
      return outputArray;
    }
    function onTabChange(e) {
      emit("tabChange", e);
    }
    function prevTab(tabName) {
      tabGroup.value.show(tabName);
    }
    function nextTab(tabName) {
      tabGroup.value.show(tabName);
    }
    return (_ctx, _cache) => {
      const _component_sl_icon = resolveComponent("sl-icon");
      const _component_sl_tab = resolveComponent("sl-tab");
      const _component_sl_button = resolveComponent("sl-button");
      const _component_sl_tab_panel = resolveComponent("sl-tab-panel");
      const _component_sl_tab_group = resolveComponent("sl-tab-group");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_sl_tab_group, {
          class: "viur-shop-order-tab",
          noScrollControls: "",
          onSlTabShow: onTabChange,
          ref_key: "tabGroup",
          ref: tabGroup
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.tabNames, (tab, index) => {
              return openBlock(), createBlock(_component_sl_tab, {
                slot: "nav",
                panel: tab,
                key: tab,
                disabled: __props.tabs[tab].disabled
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_2, [
                    createVNode(_component_sl_icon, {
                      name: __props.tabs[tab].icon.name,
                      library: __props.tabs[tab].icon.library
                    }, null, 8, ["name", "library"]),
                    createElementVNode("div", _hoisted_3, toDisplayString(index + 1) + ". " + toDisplayString(__props.tabs[tab].displayName), 1)
                  ]),
                  index < state.tabNames.length - 1 ? (openBlock(), createBlock(_component_sl_icon, {
                    key: 0,
                    name: "chevron-right",
                    class: "viur-shop-order-tab-check"
                  })) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["panel", "disabled"]);
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.tabNames, (tab, index) => {
              return openBlock(), createBlock(_component_sl_tab_panel, {
                name: tab,
                key: tab
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.tabs[tab].component), mergeProps({ ref_for: true }, __props.tabs[tab].props ? __props.tabs[tab].props : ""), null, 16)),
                  index !== state.tabNames.length - 1 ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["viur-shop-form-footer", { "flex-end": state.isFirstTab(index) }])
                  }, [
                    withDirectives(createVNode(_component_sl_button, {
                      type: "submit",
                      onClick: ($event) => prevTab(state.tabNames[index - 1])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Zur\xFCck ")
                      ]),
                      _: 2
                    }, 1032, ["onClick"]), [
                      [vShow, index !== 0]
                    ]),
                    createVNode(_component_sl_button, {
                      type: "submit",
                      variant: "primary",
                      onClick: ($event) => nextTab(state.tabNames[index + 1])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Weiter ")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ], 2)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["name"]);
            }), 128))
          ]),
          _: 1
        }, 512),
        _hoisted_4
      ]);
    };
  }
};
var OrderView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f09670ea"]]);
var ItemCard_vue_vue_type_style_index_0_scoped_true_lang = "";
var CategoryView_vue_vue_type_style_index_0_scoped_true_lang = "";
var OrderComplete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "ExampleUsage",
  setup(__props) {
    const cartStore = useCartStore();
    const rootNode = computed(
      () => cartStore.state.basketRootNode.key ? cartStore.state.basketRootNode.key : ""
    );
    const state = reactive({
      rootNode: {},
      tabs: {
        cart: {
          component: shallowRef(CartView),
          props: {
            sidebar: true,
            mode: "basket",
            cartKey: rootNode
          },
          displayName: "Warenkorb",
          icon: { name: "cart", library: "hsk" },
          position: 2,
          disabled: false,
          atShow: null,
          atHide: null
        }
      }
    });
    function handleTabs(e) {
      if ((e == null ? void 0 : e.detail.name) === "confirm") {
        state.tabs.orderComplete.disabled = false;
      }
    }
    onBeforeMount(async () => {
      await cartStore.init();
      await cartStore.getAdressStructure();
      console.log("debug init exampleusage :", cartStore.state.basketRootNode);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(OrderView, {
        tabs: state.tabs,
        onTabChange: handleTabs
      }, null, 8, ["tabs"]);
    };
  }
};
const ViurShopComponents = {
  install(app) {
    app.component("CartView", CartView);
    app.component("ExampleUsage", _sfc_main);
    app.component("ConfirmView", ConfirmView);
  }
};
export { CartView, ConfirmView, _sfc_main as ExampleUsage, ViurShopComponents as default, useCartStore };
