import { openBlock as l, createElementBlock as n, createElementVNode as e, toDisplayString as r, withModifiers as m, unref as d, createTextVNode as p, pushScopeId as u, popScopeId as h } from "vue";
import { Request as _ } from "@viur/vue-utils";
import { _ as f, u as v } from "./main-CEGQE3KO.mjs";
const i = (t) => (u("data-v-dc32dd0b"), t = t(), h(), t), b = { class: "viur-shop-item-card-card" }, g = ["src", "alt"], k = { class: "viur-shop-item-card-headline" }, x = /* @__PURE__ */ i(() => /* @__PURE__ */ e("h4", { class: "viur-shop-item-card-subline" }, "B 21 x H 6,5 x T 19 cm", -1)), I = { class: "viur-shop-item-card-price" }, y = {
  class: "viur-shop-item-card-footer",
  slot: "footer"
}, S = /* @__PURE__ */ i(() => /* @__PURE__ */ e("sl-icon", {
  name: "bag-plus",
  slot: "prefix"
}, null, -1)), C = /* @__PURE__ */ i(() => /* @__PURE__ */ e("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-item-card-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ e("sl-icon", {
    name: "heart",
    slot: "prefix"
  })
], -1)), w = {
  __name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    const a = v();
    function c(s) {
      let o = "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
      return s.dk_artikel.dest.image ? _.downloadUrlFor(s.dk_artikel.dest.image) : o;
    }
    return (s, o) => (l(), n("sl-card", b, [
      e("img", {
        slot: "image",
        src: c(t.item),
        alt: t.item.shop_name,
        loading: "lazy",
        class: "viur-shop-item-card-image"
      }, null, 8, g),
      e("h3", k, r(t.item.shop_name), 1),
      x,
      e("div", I, r(t.item.shop_price_retail) + " €", 1),
      e("div", y, [
        e("sl-button", {
          size: "small",
          class: "viur-shop-item-card-add-to-cart-btn",
          variant: "primary",
          title: "Add to cart",
          onClick: o[0] || (o[0] = m((B) => d(a).addToCart(t.item.key, d(a).state.basket), ["stop"]))
        }, [
          S,
          p(" In den Warenkorb ")
        ]),
        C
      ])
    ]));
  }
}, T = /* @__PURE__ */ f(w, [["__scopeId", "data-v-dc32dd0b"]]);
export {
  T as I
};
