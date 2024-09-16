import { openBlock as l, createElementBlock as n, createElementVNode as e, toDisplayString as o, withModifiers as m, unref as a, createTextVNode as c } from "vue";
import { Request as u } from "@viur/vue-utils";
import { _ as p, u as f } from "./main-S28xq-1k.mjs";
const h = { class: "viur-shop-item-card-card" }, v = ["src", "alt"], b = { class: "viur-shop-item-card-headline" }, g = { class: "viur-shop-item-card-price" }, _ = {
  class: "viur-shop-item-card-footer",
  slot: "footer"
}, k = {
  __name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: !0
    }
  },
  setup(i) {
    const s = f();
    function d(r) {
      let t = "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
      return r.dk_artikel.dest.image ? u.downloadUrlFor(r.dk_artikel.dest.image) : t;
    }
    return (r, t) => (l(), n("sl-card", h, [
      e("img", {
        slot: "image",
        src: d(i.item),
        alt: i.item.shop_name,
        loading: "lazy",
        class: "viur-shop-item-card-image"
      }, null, 8, v),
      e("h3", b, o(i.item.shop_name), 1),
      t[3] || (t[3] = e("h4", { class: "viur-shop-item-card-subline" }, "B 21 x H 6,5 x T 19 cm", -1)),
      e("div", g, o(i.item.shop_price_retail) + " €", 1),
      e("div", _, [
        e("sl-button", {
          size: "small",
          class: "viur-shop-item-card-add-to-cart-btn",
          variant: "primary",
          title: "Add to cart",
          onClick: t[0] || (t[0] = m((x) => a(s).addToCart(i.item.key, a(s).state.basket), ["stop"]))
        }, t[1] || (t[1] = [
          e("sl-icon", {
            name: "bag-plus",
            slot: "prefix"
          }, null, -1),
          c(" In den Warenkorb ")
        ])),
        t[2] || (t[2] = e("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-item-card-add-to-favourites-btn",
          variant: "primary",
          title: "Add to favourites"
        }, [
          e("sl-icon", {
            name: "heart",
            slot: "prefix"
          })
        ], -1))
      ])
    ]));
  }
}, B = /* @__PURE__ */ p(k, [["__scopeId", "data-v-dc32dd0b"]]);
export {
  B as I
};
