var dn = Object.defineProperty;
var $t = (e) => {
  throw TypeError(e);
};
var cn = (e, t, n) => t in e ? dn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Pe = (e, t, n) => cn(e, typeof t != "symbol" ? t + "" : t, n), He = (e, t, n) => t.has(e) || $t("Cannot " + n);
var I = (e, t, n) => (He(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ae = (e, t, n) => t.has(e) ? $t("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), ye = (e, t, n, s) => (He(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n), se = (e, t, n) => (He(e, t, "access private method"), n);
import { defineStore as gt, createPinia as gn } from "pinia";
import { reactive as A, defineComponent as z, openBlock as p, createElementBlock as y, toDisplayString as V, createElementVNode as m, createCommentVNode as $, createTextVNode as D, createBlock as H, resolveDynamicComponent as ft, mergeProps as Xt, Fragment as C, withDirectives as de, vShow as mt, ref as W, unref as B, createVNode as he, computed as P, onBeforeMount as oe, normalizeClass as ne, renderSlot as me, renderList as L, useCssVars as fn, Transition as mn, withCtx as pt, vModelText as Ee, h as st, isRef as pn, shallowRef as Q, watch as be, watchEffect as Ae, Text as hn, inject as O, onMounted as T, readonly as vn, getCurrentScope as yn, onScopeDispose as Sn, provide as Ge, resolveComponent as we, getCurrentInstance as bn, withModifiers as je } from "vue";
import { ViURShopClient as wn } from "@viur/viur-shop-client";
import { useRoute as $n, createRouter as Cn, createWebHashHistory as _n } from "vue-router";
import { Request as Rn } from "@viur/vue-utils";
import Ct from "@viur/ckeditor5-build-classic";
const ge = gt("cartstore", () => {
  const e = new wn({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), t = A({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    paymentProviders: {},
    billingAddress: {},
    shippingAddress: {},
    selectedPaymentProvider: {}
  });
  async function n() {
    await i();
  }
  async function s(v) {
    return await e.cart_list({ cart_key: v });
  }
  async function i() {
    (await e.cart_list()).forEach((h) => {
      h.is_root_node && (h.cart_type === "basket" ? t.basketRootNode = h : t.whishlistRootNodes.push(h));
    });
  }
  async function o(v, h) {
    let S = await e.article_add({
      article_key: v,
      parent_cart_key: h
    });
    console.log("addToCart", S);
  }
  async function r(v, h) {
    let S = await e.article_view({
      article_key: v,
      parent_cart_key: h
    });
    console.log("getArticleView", S);
  }
  async function l(v, h) {
    let S = await e.article_remove({
      article_key: v,
      parent_cart_key: h
    });
    console.log("remove Resp", S);
  }
  async function a(v, h, S) {
    let b = await e.article_update({
      article_key: v,
      parent_cart_key: h,
      quantity: S,
      quantity_mode: "replace"
    });
    console.log("update Resp", b);
  }
  async function u() {
    const v = await e.address_structure();
    t.structure.address = v.addSkel;
  }
  async function g() {
    const v = await e.address_list();
    for (const h of v)
      h.address_type === "billing" && (t.billingAddress = h), h.address_type === "shipping" && (t.shippingAddress = h);
  }
  async function f(v) {
    await e.discount_add({ code: v });
  }
  async function c(v, h, S, b, w, _ = "whishlist", N = "") {
    return await e.cart_add({
      parent_cart_key: v,
      cart_type: _,
      // "basket" for main cart, "whishlist" for everything else
      name: h,
      customer_comment: N,
      shipping_address_key: S,
      shipping_key: b,
      discount_key: w
    });
  }
  async function d() {
    const v = await e.payment_providers_list();
    t.paymentProviders = v, t.selectedPaymentProvider = v[Object.keys(v)[0]];
  }
  return {
    state: t,
    addToCart: o,
    getArticleView: r,
    removeItem: l,
    updateItem: a,
    init: n,
    getAddressStructure: u,
    getChildren: s,
    addDiscount: f,
    getPaymentProviders: d,
    getAddress: g,
    addNodes: c
  };
}), x = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, kn = z({
  props: {},
  components: {},
  setup(e, t) {
    const n = $n();
    return { state: A({}), route: n };
  }
}), In = { class: "home" };
function En(e, t, n, s, i, o) {
  return p(), y("div", In, "View " + V(e.route.path) + " is missing.", 1);
}
const Fn = /* @__PURE__ */ x(kn, [["render", En]]), An = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: Fn
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-B8gfjSSK.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-C14HtYCr.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Vs)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => xl)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Li)
  }
];
function Hl(e, t = !1) {
  let n = [];
  return t ? n = e : n = e.concat(An), Cn({
    // @ts-ignore
    history: _n("/"),
    routes: n
  });
}
const xn = ["panel", "disabled"], Pn = { class: "viur-shop-order-step" }, Vn = ["name", "library"], Mn = { class: "viur-shop-order-status-text" }, On = { class: "viur-shop-order-status-span" }, Dn = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Ln = {
  __name: "StepperTab",
  props: {
    tab: {
      type: String,
      required: !0
    },
    tabIdx: {
      type: Number,
      required: !0
    },
    stepperLength: {
      type: Number,
      required: !0
    },
    tabs: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => {
      var s;
      return p(), y("sl-tab", {
        class: "viur-shop-order-tab",
        slot: "nav",
        panel: e.tab,
        disabled: e.tabs[e.tab].disabled
      }, [
        m("div", Pn, [
          (s = e.tabs[e.tab].icon) != null && s.name ? (p(), y("sl-icon", {
            key: 0,
            class: "viur-shop-order-step-icon",
            name: e.tabs[e.tab].icon.name,
            library: e.tabs[e.tab].icon.library
          }, null, 8, Vn)) : $("", !0),
          m("div", Mn, [
            D(V(e.tabIdx + 1) + ". ", 1),
            m("span", On, V(e.tabs[e.tab].displayName), 1)
          ])
        ]),
        e.tabIdx < e.stepperLength - 1 ? (p(), y("sl-icon", Dn)) : $("", !0)
      ], 8, xn);
    };
  }
}, Bn = /* @__PURE__ */ x(Ln, [["__scopeId", "data-v-e6e66706"]]), jn = ["name"], Nn = {
  __name: "StepperItem",
  props: {
    tab: {
      type: String,
      required: !0
    },
    tabs: {
      type: Object,
      required: !0
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: t }) {
    const n = t;
    function s() {
      n("goToStart");
    }
    return (i, o) => (p(), y("sl-tab-panel", {
      class: "viur-shop-order-tab-panel",
      name: e.tab
    }, [
      (p(), H(ft(e.tabs[e.tab].component), Xt(e.tabs[e.tab].props ? e.tabs[e.tab].props : "", {
        onGoToStart: o[0] || (o[0] = (r) => s())
      }), null, 16))
    ], 8, jn));
  }
}, zn = /* @__PURE__ */ x(Nn, [["__scopeId", "data-v-f815b85b"]]), Tn = {
  __name: "StepperTrigger",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  emits: { prevTab: null, nextTab: null },
  setup(e, { emit: t }) {
    const n = t;
    function s() {
      n("prevTab");
    }
    function i() {
      n("nextTab");
    }
    return (o, r) => (p(), y(C, null, [
      de(m("sl-button", {
        type: "submit",
        onClick: r[0] || (r[0] = (l) => s())
      }, " Zurück ", 512), [
        [mt, e.index !== 0]
      ]),
      m("sl-button", {
        type: "submit",
        variant: "primary",
        onClick: r[1] || (r[1] = (l) => i())
      }, " Weiter ")
    ], 64));
  }
}, Hn = /* @__PURE__ */ x(Tn, [["__scopeId", "data-v-90b8c464"]]), Gn = { class: "viur-shop-discount" }, Un = { class: "viur-shop-discount-alert" }, qn = { key: 0 }, Wn = { key: 0 }, Kn = { key: 1 }, Xn = {
  __name: "Discount",
  setup(e) {
    const t = ge(), n = W(null), s = W(null), i = A({
      errorMessage: ""
    });
    async function o() {
      s.value.hide();
      const r = n.value.value;
      if (!r) {
        s.value.show(), i.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      let l = await t.addDiscount(r);
      console.log("resp", l);
    }
    return (r, l) => (p(), y(C, null, [
      m("div", Gn, [
        m("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: n,
          class: "viur-shop-discount-input"
        }, null, 512),
        m("sl-button", {
          onClick: o,
          class: "viur-shop-discount-submit-btn"
        }, "Einlösen")
      ]),
      m("div", Un, [
        m("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: s,
          closable: "",
          duration: "2000"
        }, [
          l[0] || (l[0] = m("sl-icon", {
            slot: "icon",
            name: "info-circle"
          }, null, -1)),
          D(" " + V(i.errorMessage), 1)
        ], 512)
      ]),
      m("div", null, [
        B(t).state.basketRootNode.discount ? (p(), y("div", qn, [
          B(t).state.basketRootNode.discount.dest.discount_type === "absolute" ? (p(), y("span", Wn, " Sie haben einen Rabattcode im Wert von " + V(B(t).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : $("", !0),
          B(t).state.basketRootNode.discount.dest.discount_type === "percentage" ? (p(), y("span", Kn, " Sie haben einen Rabattcode im Wert von " + V(B(t).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : $("", !0)
        ])) : $("", !0)
      ])
    ], 64));
  }
}, Zn = { class: "viur-shop-cart-sidebar-info-line" }, Jn = ["value"], Qn = { class: "viur-shop-cart-sidebar-info-line" }, Yn = ["value"], es = { class: "viur-shop-cart-sidebar-info-line" }, ts = ["value"], ns = { class: "viur-shop-cart-sidebar-info-line total" }, ss = ["value"], is = { class: "viur-shop-cart-sidebar-btn-wrap" }, rs = { class: "viur-shop-discount-wrap" }, os = {
  __name: "ShopSummary",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return (t, n) => {
      var s, i, o;
      return p(), y(C, null, [
        n[7] || (n[7] = m("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1)),
        n[8] || (n[8] = m("br", null, null, -1)),
        m("div", Zn, [
          n[0] || (n[0] = m("span", null, "Zwischensumme", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: e.node.total
          }, null, 8, Jn),
          n[1] || (n[1] = m("br", null, null, -1))
        ]),
        m("div", Qn, [
          n[2] || (n[2] = m("span", null, "Rabatt", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: (s = e.node) != null && s.discount ? e.node.discount : 0
          }, null, 8, Yn)
        ]),
        m("div", es, [
          n[3] || (n[3] = m("span", null, "Versandkosten", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: (i = e.node) != null && i.shipping ? e.node.shipping : 0
          }, null, 8, ts)
        ]),
        m("div", ns, [
          n[4] || (n[4] = m("span", null, "Gesamt:", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: e.node.total + ((o = e.node) == null ? void 0 : o.shipping) - e.node.discount
          }, null, 8, ss)
        ]),
        m("div", is, [
          m("div", rs, [
            he(Xn)
          ]),
          n[5] || (n[5] = m("sl-button", {
            variant: "primary",
            size: "medium"
          }, " Jetzt Bestellen ", -1)),
          n[6] || (n[6] = m("sl-button", {
            size: "medium",
            variant: "info"
          }, [
            m("sl-icon", {
              name: "paypal",
              slot: "prefix"
            }),
            D(" Paypal ")
          ], -1))
        ])
      ], 64);
    };
  }
}, ls = { class: "bind viur-shop-wrap" }, as = {
  __name: "ShopOrderStepper",
  props: {
    tabs: {
      type: Object,
      required: !0
    },
    sidebar: {
      type: Boolean,
      default: !0,
      required: !1
    },
    trigger: {
      type: Boolean,
      default: !0,
      required: !1
    },
    sidebarBottom: {
      type: Boolean,
      default: !1,
      required: !1
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: t }) {
    const n = ge(), s = e, i = t, o = A({
      tabNames: P(() => l(s.tabs)),
      tabIdx: 0,
      currentTab: ""
    }), r = W(null);
    function l(c) {
      let d = [], v = [];
      for (const h in c)
        c[h].position ? d.push([h, c[h].position]) : d.push([h, 0]);
      return d.sort((h, S) => h[1] - S[1]), d.forEach((h) => {
        v.push(h[0]);
      }), v;
    }
    function a(c) {
      o.currentTab = c == null ? void 0 : c.detail.name, o.tabIdx = o.tabNames.indexOf(o.currentTab), i("tabChange", c);
    }
    function u() {
      o.tabIdx > 0 && r.value.show(o.tabNames[o.tabIdx - 1]);
    }
    function g() {
      o.tabIdx < o.tabNames.length - 1 && r.value.show(o.tabNames[o.tabIdx + 1]);
    }
    function f() {
      r.value.show(o.tabNames[0]);
    }
    return oe(() => {
      const c = l(s.tabs);
      o.currentTab = c[0];
    }), (c, d) => (p(), y("div", ls, [
      m("div", {
        class: ne(["viur-shop-stepper-wrap", { "full-width": e.sidebarBottom }])
      }, [
        me(c.$slots, "main", {}, () => [
          m("sl-tab-group", {
            class: "viur-shop-order-tabgroup",
            noScrollControls: "",
            onSlTabShow: d[1] || (d[1] = (v) => a(v)),
            ref_key: "tabGroup",
            ref: r
          }, [
            (p(!0), y(C, null, L(o.tabNames, (v, h) => (p(), H(Bn, {
              key: v,
              tab: v,
              tabs: e.tabs,
              tabIdx: h,
              stepperLength: o.tabNames.length
            }, null, 8, ["tab", "tabs", "tabIdx", "stepperLength"]))), 128)),
            (p(!0), y(C, null, L(o.tabNames, (v) => (p(), H(zn, {
              tab: v,
              tabs: e.tabs,
              key: v,
              onGoToStart: d[0] || (d[0] = (h) => f())
            }, null, 8, ["tab", "tabs"]))), 128))
          ], 544)
        ], !0),
        e.trigger ? me(c.$slots, "trigger", { key: 0 }, () => [
          o.tabIdx !== o.tabNames.length - 1 ? (p(), y("div", {
            key: 0,
            class: ne(["viur-shop-form-footer", { "flex-end": o.tabIdx === 0, "last-row": e.sidebarBottom }])
          }, [
            he(Hn, {
              index: o.tabIdx,
              onPrevTab: u,
              onNextTab: g
            }, null, 8, ["index"])
          ], 2)) : $("", !0)
        ], !0) : $("", !0)
      ], 2),
      e.sidebar && o.tabIdx < o.tabNames.length - 1 ? me(c.$slots, "sidebar", { key: 0 }, () => [
        m("div", {
          class: ne(["viur-shop-sidebar-wrap", { bottom: e.sidebarBottom }])
        }, [
          he(os, {
            node: B(n).state.basketRootNode
          }, null, 8, ["node"])
        ], 2)
      ], !0) : $("", !0)
    ]));
  }
}, us = /* @__PURE__ */ x(as, [["__scopeId", "data-v-a1fcc1ec"]]), ht = {
  props: {
    size: {
      type: String,
      default: "2"
    },
    active: {
      type: Boolean,
      default: !0
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
  setup(e, t) {
    const n = A({
      trackWidth: P(() => `${e.size / 30}rem`),
      outerSize: P(() => `calc(${e.size}rem + ${n.trackWidth})`),
      spinnerSize: P(() => `${e.size}rem`),
      logoSize: P(() => `calc(${e.size}rem - ${n.trackWidth} * 10)`),
      shadow: P(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: n };
  }
}, _t = () => {
  fn((e) => ({
    f436c526: e.state.outerSize,
    "0680b722": e.state.shadow,
    "7156dfdb": e.state.logoSize,
    "7e48406a": e.state.spinnerSize,
    "562aef5e": e.color,
    "14144f0a": e.state.trackWidth
  }));
}, Rt = ht.setup;
ht.setup = Rt ? (e, t) => (_t(), Rt(e, t)) : _t;
const ds = {
  key: 0,
  class: "loading"
}, cs = { class: "logo" }, gs = ["src"];
function fs(e, t, n, s, i, o) {
  return p(), H(mn, null, {
    default: pt(() => [
      n.active ? (p(), y("div", ds, [
        t[0] || (t[0] = m("sl-spinner", { class: "loader" }, null, -1)),
        m("div", cs, [
          m("sl-icon", {
            src: n.logo,
            class: "logo-color"
          }, null, 8, gs)
        ])
      ])) : $("", !0)
    ]),
    _: 1
  });
}
const ms = /* @__PURE__ */ x(ht, [["render", fs], ["__scopeId", "data-v-f3ab632c"]]), ps = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return A({}), (t, n) => (p(), y("pre", null, V(e.node.name), 1));
  }
}, hs = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, vs = ["src"], ys = ["innerHTML"], Ss = { class: "viur-shop-cart-leaf-artno" }, bs = ["innerHTML"], ws = { class: "viur-shop-cart-leaf-quantity" }, $s = { class: "viur-shop-cart-leaf-unitprice" }, Cs = ["value"], _s = { class: "viur-shop-cart-leaf-actions" }, Rs = { class: "viur-shop-cart-leaf-price" }, ks = ["value"], Is = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 },
    placeholder: { type: String, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: t }) {
    const n = e, s = t, i = A({
      leaf: {}
    });
    function o(a) {
      return a !== void 0 ? Rn.downloadUrlFor(a) : n.placeholder;
    }
    function r(a, u, g, f) {
      s("updateItem", {
        item: a,
        articleKey: u,
        node: g,
        quantity: f
      });
    }
    function l(a, u, g) {
      s("removeItem", { item: a, articleKey: u, node: g });
    }
    return oe(() => {
      i.leaf = n.leaf;
    }), (a, u) => (p(), y("sl-card", hs, [
      m("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(
          i.leaf.article.dest.shop_image ? i.leaf.article.dest.shop_image : void 0
        )
      }, null, 8, vs),
      m("h4", {
        class: "viur-shop-cart-leaf-headline headline",
        innerHTML: i.leaf.article.dest.shop_name
      }, null, 8, ys),
      m("h5", Ss, V(i.leaf.article.dest.shop_art_no_or_gtin), 1),
      m("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: i.leaf.article.dest.shop_description
      }, null, 8, bs),
      m("div", ws, [
        de(m("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": u[0] || (u[0] = (g) => i.leaf.quantity = g),
          onInput: u[1] || (u[1] = (g) => r(
            i.leaf,
            i.leaf.article.dest.key,
            e.node,
            i.leaf.quantity
          ))
        }, null, 544), [
          [Ee, i.leaf.quantity]
        ])
      ]),
      m("div", $s, [
        u[3] || (u[3] = m("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)),
        m("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail
        }, null, 8, Cs)
      ]),
      m("div", _s, [
        u[5] || (u[5] = m("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-add-to-favourites-btn",
          variant: "primary",
          title: "Add to favourites"
        }, [
          m("sl-icon", {
            name: "heart",
            slot: "prefix"
          })
        ], -1)),
        m("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: u[2] || (u[2] = (g) => l(i.leaf, i.leaf.article.dest.key, e.node))
        }, u[4] || (u[4] = [
          m("sl-icon", {
            name: "trash",
            slot: "prefix"
          }, null, -1)
        ]))
      ]),
      m("div", Rs, [
        u[6] || (u[6] = m("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)),
        m("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail * e.leaf.quantity
        }, null, 8, ks)
      ])
    ]));
  }
}, Es = /* @__PURE__ */ x(Is, [["__scopeId", "data-v-a8bf8404"]]), Fs = { key: 0 }, As = {
  class: "footer-wrap",
  slot: "footer"
}, xs = { class: "viur-shop-cart-node" }, Ps = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    placeholder: { type: String, required: !0 }
  },
  setup(e) {
    const t = e, n = ge(), s = W(null), i = A({
      itemsIsInit: P(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    P(() => t.mode === "basket" ? n.state.basketRootNode.key : t.cartKey);
    async function o() {
      s.value.hide(), await n.updateItem(
        i.currentItem.article.dest.key,
        i.currentNode.key,
        0
      ), await u();
    }
    async function r(f) {
      console.log("updateItem :", f), f.quantity === 0 ? (s.value.show(), i.currentItem = f.item, i.currentNode = f.node) : (await n.updateItem(f.articleKey, f.node.key, f.quantity), await n.init());
    }
    function l(f) {
      console.log("removeItem :", f), s.value.show(), i.currentItem = f.item, i.currentNode = f.node;
    }
    async function a() {
      i.leaves[i.currentNode.key].forEach((f) => {
        f.key === i.currentItem.key && (f.quantity = 1);
      }), i.currentItem = {}, i.currentNode = {};
    }
    async function u() {
      i.nodes = [], i.leaves = {}, await n.init(), await g();
    }
    async function g(f = t.cartKey) {
      console.log("debug getChildren parentKey from comp: ", f);
      const c = await n.getChildren(f);
      console.log("getChildren children: ", c), c.forEach(async (d) => {
        d.skel_type === "node" ? (i.nodes.push(d), await g(d.key)) : (Object.keys(i.leaves).includes(f) || (i.leaves[f] = []), i.leaves[f].push(d));
      });
    }
    return oe(async () => {
      await n.init(), await g(), t.mode === "basket" && i.nodes.push(n.state.basketRootNode), console.log("state.nodes test", i.nodes), console.log("state.leaves", i.leaves);
    }), (f, c) => e.cartKey.length ? (p(), y(C, { key: 1 }, [
      m("sl-dialog", {
        ref_key: "confirm",
        ref: s,
        onSlHide: a
      }, [
        c[1] || (c[1] = m("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)),
        m("div", As, [
          m("sl-button", {
            variant: "danger",
            onClick: c[0] || (c[0] = (d) => s.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          m("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (p(!0), y(C, null, L(i.nodes, (d) => (p(), y("div", xs, [
        Object.keys(i.leaves).includes(d.key) ? (p(), y(C, { key: 0 }, [
          he(ps, { node: d }, null, 8, ["node"]),
          (p(!0), y(C, null, L(i.leaves[d.key], (v) => (p(), H(Es, {
            key: v.key,
            leaf: v,
            node: d,
            placeholder: e.placeholder,
            onRemoveItem: l,
            onUpdateItem: r
          }, null, 8, ["leaf", "node", "placeholder"]))), 128))
        ], 64)) : $("", !0)
      ]))), 256)),
      c[2] || (c[2] = m("div", { class: "viur-shop-cart-mobile-footer" }, [
        m("sl-button", {
          variant: "primary",
          size: "medium"
        }, " Jetzt Bestellen")
      ], -1))
    ], 64)) : (p(), y("sl-spinner", Fs));
  }
}, it = /* @__PURE__ */ x(Ps, [["__scopeId", "data-v-915785ee"]]), Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it
}, Symbol.toStringTag, { value: "Module" }));
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function Ms() {
  return {
    accessor: (e, t) => typeof e == "function" ? {
      ...t,
      accessorFn: e
    } : {
      ...t,
      accessorKey: e
    },
    display: (e) => e,
    group: (e) => e
  };
}
function ue(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Z(e, t) {
  return (n) => {
    t.setState((s) => ({
      ...s,
      [e]: ue(n, s[e])
    }));
  };
}
function ze(e) {
  return e instanceof Function;
}
function Os(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Ds(e, t) {
  const n = [], s = (i) => {
    i.forEach((o) => {
      n.push(o);
      const r = t(o);
      r != null && r.length && s(r);
    });
  };
  return s(e), n;
}
function R(e, t, n) {
  let s = [], i;
  return (o) => {
    let r;
    n.key && n.debug && (r = Date.now());
    const l = e(o);
    if (!(l.length !== s.length || l.some((g, f) => s[f] !== g)))
      return i;
    s = l;
    let u;
    if (n.key && n.debug && (u = Date.now()), i = t(...l), n == null || n.onChange == null || n.onChange(i), n.key && n.debug && n != null && n.debug()) {
      const g = Math.round((Date.now() - r) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, c = f / 16, d = (v, h) => {
        for (v = String(v); v.length < h; )
          v = " " + v;
        return v;
      };
      console.info(`%c⏱ ${d(f, 5)} /${d(g, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * c, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return i;
  };
}
function k(e, t, n, s) {
  return {
    debug: () => {
      var i;
      return (i = e == null ? void 0 : e.debugAll) != null ? i : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: s
  };
}
function Ls(e, t, n, s) {
  const i = () => {
    var r;
    return (r = o.getValue()) != null ? r : e.options.renderFallbackValue;
  }, o = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(s),
    renderValue: i,
    getContext: R(() => [e, n, t, o], (r, l, a, u) => ({
      table: r,
      column: l,
      row: a,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), k(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((r) => {
    r.createCell == null || r.createCell(o, n, t, e);
  }, {}), o;
}
function Bs(e, t, n, s) {
  var i, o;
  const l = {
    ...e._getDefaultColumnDef(),
    ...t
  }, a = l.accessorKey;
  let u = (i = (o = l.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof l.header == "string" ? l.header : void 0, g;
  if (l.accessorFn ? g = l.accessorFn : a && (a.includes(".") ? g = (c) => {
    let d = c;
    for (const h of a.split(".")) {
      var v;
      d = (v = d) == null ? void 0 : v[h], process.env.NODE_ENV !== "production" && d === void 0 && console.warn(`"${h}" in deeply nested key "${a}" returned undefined.`);
    }
    return d;
  } : g = (c) => c[l.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(l.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: g,
    parent: s,
    depth: n,
    columnDef: l,
    columns: [],
    getFlatColumns: R(() => [!0], () => {
      var c;
      return [f, ...(c = f.columns) == null ? void 0 : c.flatMap((d) => d.getFlatColumns())];
    }, k(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: R(() => [e._getOrderColumnsFn()], (c) => {
      var d;
      if ((d = f.columns) != null && d.length) {
        let v = f.columns.flatMap((h) => h.getLeafColumns());
        return c(v);
      }
      return [f];
    }, k(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const c of e._features)
    c.createColumn == null || c.createColumn(f, e);
  return f;
}
const K = "debugHeaders";
function kt(e, t, n) {
  var s;
  let o = {
    id: (s = n.id) != null ? s : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const r = [], l = (a) => {
        a.subHeaders && a.subHeaders.length && a.subHeaders.map(l), r.push(a);
      };
      return l(o), r;
    },
    getContext: () => ({
      table: e,
      header: o,
      column: t
    })
  };
  return e._features.forEach((r) => {
    r.createHeader == null || r.createHeader(o, e);
  }), o;
}
const js = {
  createTable: (e) => {
    e.getHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, s, i) => {
      var o, r;
      const l = (o = s == null ? void 0 : s.map((f) => n.find((c) => c.id === f)).filter(Boolean)) != null ? o : [], a = (r = i == null ? void 0 : i.map((f) => n.find((c) => c.id === f)).filter(Boolean)) != null ? r : [], u = n.filter((f) => !(s != null && s.includes(f.id)) && !(i != null && i.includes(f.id)));
      return Ve(t, [...l, ...u, ...a], e);
    }, k(e.options, K, "getHeaderGroups")), e.getCenterHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, s, i) => (n = n.filter((o) => !(s != null && s.includes(o.id)) && !(i != null && i.includes(o.id))), Ve(t, n, e, "center")), k(e.options, K, "getCenterHeaderGroups")), e.getLeftHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, s) => {
      var i;
      const o = (i = s == null ? void 0 : s.map((r) => n.find((l) => l.id === r)).filter(Boolean)) != null ? i : [];
      return Ve(t, o, e, "left");
    }, k(e.options, K, "getLeftHeaderGroups")), e.getRightHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, s) => {
      var i;
      const o = (i = s == null ? void 0 : s.map((r) => n.find((l) => l.id === r)).filter(Boolean)) != null ? i : [];
      return Ve(t, o, e, "right");
    }, k(e.options, K, "getRightHeaderGroups")), e.getFooterGroups = R(() => [e.getHeaderGroups()], (t) => [...t].reverse(), k(e.options, K, "getFooterGroups")), e.getLeftFooterGroups = R(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), k(e.options, K, "getLeftFooterGroups")), e.getCenterFooterGroups = R(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), k(e.options, K, "getCenterFooterGroups")), e.getRightFooterGroups = R(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), k(e.options, K, "getRightFooterGroups")), e.getFlatHeaders = R(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), k(e.options, K, "getFlatHeaders")), e.getLeftFlatHeaders = R(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), k(e.options, K, "getLeftFlatHeaders")), e.getCenterFlatHeaders = R(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), k(e.options, K, "getCenterFlatHeaders")), e.getRightFlatHeaders = R(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), k(e.options, K, "getRightFlatHeaders")), e.getCenterLeafHeaders = R(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var s;
      return !((s = n.subHeaders) != null && s.length);
    }), k(e.options, K, "getCenterLeafHeaders")), e.getLeftLeafHeaders = R(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var s;
      return !((s = n.subHeaders) != null && s.length);
    }), k(e.options, K, "getLeftLeafHeaders")), e.getRightLeafHeaders = R(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var s;
      return !((s = n.subHeaders) != null && s.length);
    }), k(e.options, K, "getRightLeafHeaders")), e.getLeafHeaders = R(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, s) => {
      var i, o, r, l, a, u;
      return [...(i = (o = t[0]) == null ? void 0 : o.headers) != null ? i : [], ...(r = (l = n[0]) == null ? void 0 : l.headers) != null ? r : [], ...(a = (u = s[0]) == null ? void 0 : u.headers) != null ? a : []].map((g) => g.getLeafHeaders()).flat();
    }, k(e.options, K, "getLeafHeaders"));
  }
};
function Ve(e, t, n, s) {
  var i, o;
  let r = 0;
  const l = function(c, d) {
    d === void 0 && (d = 1), r = Math.max(r, d), c.filter((v) => v.getIsVisible()).forEach((v) => {
      var h;
      (h = v.columns) != null && h.length && l(v.columns, d + 1);
    }, 0);
  };
  l(e);
  let a = [];
  const u = (c, d) => {
    const v = {
      depth: d,
      id: [s, `${d}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    c.forEach((S) => {
      const b = [...h].reverse()[0], w = S.column.depth === v.depth;
      let _, N = !1;
      if (w && S.column.parent ? _ = S.column.parent : (_ = S.column, N = !0), b && (b == null ? void 0 : b.column) === _)
        b.subHeaders.push(S);
      else {
        const q = kt(n, _, {
          id: [s, d, _.id, S == null ? void 0 : S.id].filter(Boolean).join("_"),
          isPlaceholder: N,
          placeholderId: N ? `${h.filter((F) => F.column === _).length}` : void 0,
          depth: d,
          index: h.length
        });
        q.subHeaders.push(S), h.push(q);
      }
      v.headers.push(S), S.headerGroup = v;
    }), a.push(v), d > 0 && u(h, d - 1);
  }, g = t.map((c, d) => kt(n, c, {
    depth: r,
    index: d
  }));
  u(g, r - 1), a.reverse();
  const f = (c) => c.filter((v) => v.column.getIsVisible()).map((v) => {
    let h = 0, S = 0, b = [0];
    v.subHeaders && v.subHeaders.length ? (b = [], f(v.subHeaders).forEach((_) => {
      let {
        colSpan: N,
        rowSpan: q
      } = _;
      h += N, b.push(q);
    })) : h = 1;
    const w = Math.min(...b);
    return S = S + w, v.colSpan = h, v.rowSpan = S, {
      colSpan: h,
      rowSpan: S
    };
  });
  return f((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const Ns = (e, t, n, s, i, o, r) => {
  let l = {
    id: t,
    index: s,
    original: n,
    depth: i,
    parentId: r,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (a) => {
      if (l._valuesCache.hasOwnProperty(a))
        return l._valuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return l._valuesCache[a] = u.accessorFn(l.original, s), l._valuesCache[a];
    },
    getUniqueValues: (a) => {
      if (l._uniqueValuesCache.hasOwnProperty(a))
        return l._uniqueValuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (l._uniqueValuesCache[a] = u.columnDef.getUniqueValues(l.original, s), l._uniqueValuesCache[a]) : (l._uniqueValuesCache[a] = [l.getValue(a)], l._uniqueValuesCache[a]);
    },
    renderValue: (a) => {
      var u;
      return (u = l.getValue(a)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => Ds(l.subRows, (a) => a.subRows),
    getParentRow: () => l.parentId ? e.getRow(l.parentId, !0) : void 0,
    getParentRows: () => {
      let a = [], u = l;
      for (; ; ) {
        const g = u.getParentRow();
        if (!g) break;
        a.push(g), u = g;
      }
      return a.reverse();
    },
    getAllCells: R(() => [e.getAllLeafColumns()], (a) => a.map((u) => Ls(e, l, u, u.id)), k(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: R(() => [l.getAllCells()], (a) => a.reduce((u, g) => (u[g.column.id] = g, u), {}), k(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(l, e);
  }
  return l;
}, zs = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Zt = (e, t, n) => {
  var s, i;
  const o = n == null || (s = n.toString()) == null ? void 0 : s.toLowerCase();
  return !!(!((i = e.getValue(t)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
Zt.autoRemove = (e) => Y(e);
const Jt = (e, t, n) => {
  var s;
  return !!(!((s = e.getValue(t)) == null || (s = s.toString()) == null) && s.includes(n));
};
Jt.autoRemove = (e) => Y(e);
const Qt = (e, t, n) => {
  var s;
  return ((s = e.getValue(t)) == null || (s = s.toString()) == null ? void 0 : s.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Qt.autoRemove = (e) => Y(e);
const Yt = (e, t, n) => {
  var s;
  return (s = e.getValue(t)) == null ? void 0 : s.includes(n);
};
Yt.autoRemove = (e) => Y(e) || !(e != null && e.length);
const en = (e, t, n) => !n.some((s) => {
  var i;
  return !((i = e.getValue(t)) != null && i.includes(s));
});
en.autoRemove = (e) => Y(e) || !(e != null && e.length);
const tn = (e, t, n) => n.some((s) => {
  var i;
  return (i = e.getValue(t)) == null ? void 0 : i.includes(s);
});
tn.autoRemove = (e) => Y(e) || !(e != null && e.length);
const nn = (e, t, n) => e.getValue(t) === n;
nn.autoRemove = (e) => Y(e);
const sn = (e, t, n) => e.getValue(t) == n;
sn.autoRemove = (e) => Y(e);
const vt = (e, t, n) => {
  let [s, i] = n;
  const o = e.getValue(t);
  return o >= s && o <= i;
};
vt.resolveFilterValue = (e) => {
  let [t, n] = e, s = typeof t != "number" ? parseFloat(t) : t, i = typeof n != "number" ? parseFloat(n) : n, o = t === null || Number.isNaN(s) ? -1 / 0 : s, r = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > r) {
    const l = o;
    o = r, r = l;
  }
  return [o, r];
};
vt.autoRemove = (e) => Y(e) || Y(e[0]) && Y(e[1]);
const re = {
  includesString: Zt,
  includesStringSensitive: Jt,
  equalsString: Qt,
  arrIncludes: Yt,
  arrIncludesAll: en,
  arrIncludesSome: tn,
  equals: nn,
  weakEquals: sn,
  inNumberRange: vt
};
function Y(e) {
  return e == null || e === "";
}
const Ts = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Z("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], s = n == null ? void 0 : n.getValue(e.id);
      return typeof s == "string" ? re.includesString : typeof s == "number" ? re.inNumberRange : typeof s == "boolean" || s !== null && typeof s == "object" ? re.equals : Array.isArray(s) ? re.arrIncludes : re.weakEquals;
    }, e.getFilterFn = () => {
      var n, s;
      return ze(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (s = t.options.filterFns) == null ? void 0 : s[e.columnDef.filterFn]) != null ? n : re[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, s, i;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((s = t.options.enableColumnFilters) != null ? s : !0) && ((i = t.options.enableFilters) != null ? i : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((s) => s.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, s;
      return (n = (s = t.getState().columnFilters) == null ? void 0 : s.findIndex((i) => i.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((s) => {
        const i = e.getFilterFn(), o = s == null ? void 0 : s.find((g) => g.id === e.id), r = ue(n, o ? o.value : void 0);
        if (It(i, r, e)) {
          var l;
          return (l = s == null ? void 0 : s.filter((g) => g.id !== e.id)) != null ? l : [];
        }
        const a = {
          id: e.id,
          value: r
        };
        if (o) {
          var u;
          return (u = s == null ? void 0 : s.map((g) => g.id === e.id ? a : g)) != null ? u : [];
        }
        return s != null && s.length ? [...s, a] : [a];
      });
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), s = (i) => {
        var o;
        return (o = ue(t, i)) == null ? void 0 : o.filter((r) => {
          const l = n.find((a) => a.id === r.id);
          if (l) {
            const a = l.getFilterFn();
            if (It(a, r.value, l))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(s);
    }, e.resetColumnFilters = (t) => {
      var n, s;
      e.setColumnFilters(t ? [] : (n = (s = e.initialState) == null ? void 0 : s.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function It(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Hs = (e, t, n) => n.reduce((s, i) => {
  const o = i.getValue(e);
  return s + (typeof o == "number" ? o : 0);
}, 0), Gs = (e, t, n) => {
  let s;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (s > o || s === void 0 && o >= o) && (s = o);
  }), s;
}, Us = (e, t, n) => {
  let s;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (s < o || s === void 0 && o >= o) && (s = o);
  }), s;
}, qs = (e, t, n) => {
  let s, i;
  return n.forEach((o) => {
    const r = o.getValue(e);
    r != null && (s === void 0 ? r >= r && (s = i = r) : (s > r && (s = r), i < r && (i = r)));
  }), [s, i];
}, Ws = (e, t) => {
  let n = 0, s = 0;
  if (t.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, s += o);
  }), n) return s / n;
}, Ks = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((o) => o.getValue(e));
  if (!Os(n))
    return;
  if (n.length === 1)
    return n[0];
  const s = Math.floor(n.length / 2), i = n.sort((o, r) => o - r);
  return n.length % 2 !== 0 ? i[s] : (i[s - 1] + i[s]) / 2;
}, Xs = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Zs = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Js = (e, t) => t.length, Ue = {
  sum: Hs,
  min: Gs,
  max: Us,
  extent: qs,
  mean: Ws,
  median: Ks,
  unique: Xs,
  uniqueCount: Zs,
  count: Js
}, Qs = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var t, n;
      return (t = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? t : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: Z("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, t) => {
    e.toggleGrouping = () => {
      t.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((s) => s !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, s;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((s = t.options.enableGrouping) != null ? s : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = t.getCoreRowModel().flatRows[0], s = n == null ? void 0 : n.getValue(e.id);
      if (typeof s == "number")
        return Ue.sum;
      if (Object.prototype.toString.call(s) === "[object Date]")
        return Ue.extent;
    }, e.getAggregationFn = () => {
      var n, s;
      if (!e)
        throw new Error();
      return ze(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (s = t.options.aggregationFns) == null ? void 0 : s[e.columnDef.aggregationFn]) != null ? n : Ue[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
      var n, s;
      e.setGrouping(t ? [] : (n = (s = e.initialState) == null ? void 0 : s.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, t) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const s = t.getColumn(n);
      return s != null && s.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = s.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, t, n, s) => {
    e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
      var i;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((i = n.subRows) != null && i.length);
    };
  }
};
function Ys(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const s = e.filter((o) => !t.includes(o.id));
  return n === "remove" ? s : [...t.map((o) => e.find((r) => r.id === o)).filter(Boolean), ...s];
}
const ei = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Z("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = R((n) => [Re(t, n)], (n) => n.findIndex((s) => s.id === e.id), k(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var s;
      return ((s = Re(t, n)[0]) == null ? void 0 : s.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var s;
      const i = Re(t, n);
      return ((s = i[i.length - 1]) == null ? void 0 : s.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = R(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, s) => (i) => {
      let o = [];
      if (!(t != null && t.length))
        o = i;
      else {
        const r = [...t], l = [...i];
        for (; l.length && r.length; ) {
          const a = r.shift(), u = l.findIndex((g) => g.id === a);
          u > -1 && o.push(l.splice(u, 1)[0]);
        }
        o = [...o, ...l];
      }
      return Ys(o, n, s);
    }, k(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, qe = () => ({
  left: [],
  right: []
}), ti = {
  getInitialState: (e) => ({
    columnPinning: qe(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Z("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const s = e.getLeafColumns().map((i) => i.id).filter(Boolean);
      t.setColumnPinning((i) => {
        var o, r;
        if (n === "right") {
          var l, a;
          return {
            left: ((l = i == null ? void 0 : i.left) != null ? l : []).filter((f) => !(s != null && s.includes(f))),
            right: [...((a = i == null ? void 0 : i.right) != null ? a : []).filter((f) => !(s != null && s.includes(f))), ...s]
          };
        }
        if (n === "left") {
          var u, g;
          return {
            left: [...((u = i == null ? void 0 : i.left) != null ? u : []).filter((f) => !(s != null && s.includes(f))), ...s],
            right: ((g = i == null ? void 0 : i.right) != null ? g : []).filter((f) => !(s != null && s.includes(f)))
          };
        }
        return {
          left: ((o = i == null ? void 0 : i.left) != null ? o : []).filter((f) => !(s != null && s.includes(f))),
          right: ((r = i == null ? void 0 : i.right) != null ? r : []).filter((f) => !(s != null && s.includes(f)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((s) => {
      var i, o, r;
      return ((i = s.columnDef.enablePinning) != null ? i : !0) && ((o = (r = t.options.enableColumnPinning) != null ? r : t.options.enablePinning) != null ? o : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((l) => l.id), {
        left: s,
        right: i
      } = t.getState().columnPinning, o = n.some((l) => s == null ? void 0 : s.includes(l)), r = n.some((l) => i == null ? void 0 : i.includes(l));
      return o ? "left" : r ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, s;
      const i = e.getIsPinned();
      return i ? (n = (s = t.getState().columnPinning) == null || (s = s[i]) == null ? void 0 : s.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, t) => {
    e.getCenterVisibleCells = R(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, s, i) => {
      const o = [...s ?? [], ...i ?? []];
      return n.filter((r) => !o.includes(r.column.id));
    }, k(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = R(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, s) => (s ?? []).map((o) => n.find((r) => r.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "left"
    })), k(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = R(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, s) => (s ?? []).map((o) => n.find((r) => r.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "right"
    })), k(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, s;
      return e.setColumnPinning(t ? qe() : (n = (s = e.initialState) == null ? void 0 : s.columnPinning) != null ? n : qe());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const s = e.getState().columnPinning;
      if (!t) {
        var i, o;
        return !!((i = s.left) != null && i.length || (o = s.right) != null && o.length);
      }
      return !!((n = s[t]) != null && n.length);
    }, e.getLeftLeafColumns = R(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((s) => t.find((i) => i.id === s)).filter(Boolean), k(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = R(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((s) => t.find((i) => i.id === s)).filter(Boolean), k(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = R(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, s) => {
      const i = [...n ?? [], ...s ?? []];
      return t.filter((o) => !i.includes(o.id));
    }, k(e.options, "debugColumns", "getCenterLeafColumns"));
  }
}, Me = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, We = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), ni = {
  getDefaultColumnDef: () => Me,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: We(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Z("columnSizing", e),
    onColumnSizingInfoChange: Z("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, s, i;
      const o = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Me.minSize, (s = o ?? e.columnDef.size) != null ? s : Me.size), (i = e.columnDef.maxSize) != null ? i : Me.maxSize);
    }, e.getStart = R((n) => [n, Re(t, n), t.getState().columnSizing], (n, s) => s.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), k(t.options, "debugColumns", "getStart")), e.getAfter = R((n) => [n, Re(t, n), t.getState().columnSizing], (n, s) => s.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), k(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
      t.setColumnSizing((n) => {
        let {
          [e.id]: s,
          ...i
        } = n;
        return i;
      });
    }, e.getCanResize = () => {
      var n, s;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((s = t.options.enableColumnResizing) != null ? s : !0);
    }, e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, t) => {
    e.getSize = () => {
      let n = 0;
      const s = (i) => {
        if (i.subHeaders.length)
          i.subHeaders.forEach(s);
        else {
          var o;
          n += (o = i.column.getSize()) != null ? o : 0;
        }
      };
      return s(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const s = t.getColumn(e.column.id), i = s == null ? void 0 : s.getCanResize();
      return (o) => {
        if (!s || !i || (o.persist == null || o.persist(), Ke(o) && o.touches && o.touches.length > 1))
          return;
        const r = e.getSize(), l = e ? e.getLeafHeaders().map((b) => [b.column.id, b.column.getSize()]) : [[s.id, s.getSize()]], a = Ke(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, g = (b, w) => {
          typeof w == "number" && (t.setColumnSizingInfo((_) => {
            var N, q;
            const F = t.options.columnResizeDirection === "rtl" ? -1 : 1, G = (w - ((N = _ == null ? void 0 : _.startOffset) != null ? N : 0)) * F, le = Math.max(G / ((q = _ == null ? void 0 : _.startSize) != null ? q : 0), -0.999999);
            return _.columnSizingStart.forEach((ve) => {
              let [xe, wt] = ve;
              u[xe] = Math.round(Math.max(wt + wt * le, 0) * 100) / 100;
            }), {
              ..._,
              deltaOffset: G,
              deltaPercentage: le
            };
          }), (t.options.columnResizeMode === "onChange" || b === "end") && t.setColumnSizing((_) => ({
            ..._,
            ...u
          })));
        }, f = (b) => g("move", b), c = (b) => {
          g("end", b), t.setColumnSizingInfo((w) => ({
            ...w,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, d = n || typeof document < "u" ? document : null, v = {
          moveHandler: (b) => f(b.clientX),
          upHandler: (b) => {
            d == null || d.removeEventListener("mousemove", v.moveHandler), d == null || d.removeEventListener("mouseup", v.upHandler), c(b.clientX);
          }
        }, h = {
          moveHandler: (b) => (b.cancelable && (b.preventDefault(), b.stopPropagation()), f(b.touches[0].clientX), !1),
          upHandler: (b) => {
            var w;
            d == null || d.removeEventListener("touchmove", h.moveHandler), d == null || d.removeEventListener("touchend", h.upHandler), b.cancelable && (b.preventDefault(), b.stopPropagation()), c((w = b.touches[0]) == null ? void 0 : w.clientX);
          }
        }, S = si() ? {
          passive: !1
        } : !1;
        Ke(o) ? (d == null || d.addEventListener("touchmove", h.moveHandler, S), d == null || d.addEventListener("touchend", h.upHandler, S)) : (d == null || d.addEventListener("mousemove", v.moveHandler, S), d == null || d.addEventListener("mouseup", v.upHandler, S)), t.setColumnSizingInfo((b) => ({
          ...b,
          startOffset: a,
          startSize: r,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: l,
          isResizingColumn: s.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
      var n;
      e.setColumnSizing(t ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (t) => {
      var n;
      e.setColumnSizingInfo(t ? We() : (n = e.initialState.columnSizingInfo) != null ? n : We());
    }, e.getTotalSize = () => {
      var t, n;
      return (t = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((s, i) => s + i.getSize(), 0)) != null ? t : 0;
    }, e.getLeftTotalSize = () => {
      var t, n;
      return (t = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((s, i) => s + i.getSize(), 0)) != null ? t : 0;
    }, e.getCenterTotalSize = () => {
      var t, n;
      return (t = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((s, i) => s + i.getSize(), 0)) != null ? t : 0;
    }, e.getRightTotalSize = () => {
      var t, n;
      return (t = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((s, i) => s + i.getSize(), 0)) != null ? t : 0;
    };
  }
};
let Oe = null;
function si() {
  if (typeof Oe == "boolean") return Oe;
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return Oe = e, Oe;
}
function Ke(e) {
  return e.type === "touchstart";
}
const ii = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Z("columnVisibility", e)
  }),
  createColumn: (e, t) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && t.setColumnVisibility((s) => ({
        ...s,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, s;
      const i = e.columns;
      return (n = i.length ? i.some((o) => o.getIsVisible()) : (s = t.getState().columnVisibility) == null ? void 0 : s[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, s;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((s = t.options.enableHiding) != null ? s : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = R(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((s) => s.column.getIsVisible()), k(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = R(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, s, i) => [...n, ...s, ...i], k(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, s) => R(() => [s(), s().filter((i) => i.getIsVisible()).map((i) => i.id).join("_")], (i) => i.filter((o) => o.getIsVisible == null ? void 0 : o.getIsVisible()), k(e.options, "debugColumns", n));
    e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var s;
      e.setColumnVisibility(n ? {} : (s = e.initialState.columnVisibility) != null ? s : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var s;
      n = (s = n) != null ? s : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((i, o) => ({
        ...i,
        [o.id]: n || !(o.getCanHide != null && o.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var s;
      e.toggleAllColumnsVisible((s = n.target) == null ? void 0 : s.checked);
    };
  }
};
function Re(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const ri = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, oi = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Z("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const s = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof s == "string" || typeof s == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getCanGlobalFilter = () => {
      var n, s, i, o;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((s = t.options.enableGlobalFilter) != null ? s : !0) && ((i = t.options.enableFilters) != null ? i : !0) && ((o = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? o : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => re.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: s
      } = e.options;
      return ze(s) ? s : s === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[s]) != null ? t : re[s];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, li = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Z("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetExpanded = () => {
      var s, i;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((s = (i = e.options.autoResetAll) != null ? i : e.options.autoResetExpanded) != null ? s : !e.options.manualExpanding) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (s) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(s), e.toggleAllRowsExpanded = (s) => {
      s ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (s) => {
      var i, o;
      e.setExpanded(s ? {} : (i = (o = e.initialState) == null ? void 0 : o.expanded) != null ? i : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((s) => s.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (s) => {
      s.persist == null || s.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const s = e.getState().expanded;
      return s === !0 || Object.values(s).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const s = e.getState().expanded;
      return typeof s == "boolean" ? s === !0 : !(!Object.keys(s).length || e.getRowModel().flatRows.some((i) => !i.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let s = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((o) => {
        const r = o.split(".");
        s = Math.max(s, r.length);
      }), s;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, t) => {
    e.toggleExpanded = (n) => {
      t.setExpanded((s) => {
        var i;
        const o = s === !0 ? !0 : !!(s != null && s[e.id]);
        let r = {};
        if (s === !0 ? Object.keys(t.getRowModel().rowsById).forEach((l) => {
          r[l] = !0;
        }) : r = s, n = (i = n) != null ? i : !o, !o && n)
          return {
            ...r,
            [e.id]: !0
          };
        if (o && !n) {
          const {
            [e.id]: l,
            ...a
          } = r;
          return a;
        }
        return s;
      });
    }, e.getIsExpanded = () => {
      var n;
      const s = t.getState().expanded;
      return !!((n = t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) != null ? n : s === !0 || s != null && s[e.id]);
    }, e.getCanExpand = () => {
      var n, s, i;
      return (n = t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) != null ? n : ((s = t.options.enableExpanding) != null ? s : !0) && !!((i = e.subRows) != null && i.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, s = e;
      for (; n && s.parentId; )
        s = t.getRow(s.parentId, !0), n = s.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, rt = 0, ot = 10, Xe = () => ({
  pageIndex: rt,
  pageSize: ot
}), ai = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Xe(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Z("pagination", e)
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetPageIndex = () => {
      var s, i;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((s = (i = e.options.autoResetAll) != null ? i : e.options.autoResetPageIndex) != null ? s : !e.options.manualPagination) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (s) => {
      const i = (o) => ue(s, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (s) => {
      var i;
      e.setPagination(s ? Xe() : (i = e.initialState.pagination) != null ? i : Xe());
    }, e.setPageIndex = (s) => {
      e.setPagination((i) => {
        let o = ue(s, i.pageIndex);
        const r = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, r)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (s) => {
      var i, o;
      e.setPageIndex(s ? rt : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : rt);
    }, e.resetPageSize = (s) => {
      var i, o;
      e.setPageSize(s ? ot : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : ot);
    }, e.setPageSize = (s) => {
      e.setPagination((i) => {
        const o = Math.max(1, ue(s, i.pageSize)), r = i.pageSize * i.pageIndex, l = Math.floor(r / o);
        return {
          ...i,
          pageIndex: l,
          pageSize: o
        };
      });
    }, e.setPageCount = (s) => e.setPagination((i) => {
      var o;
      let r = ue(s, (o = e.options.pageCount) != null ? o : -1);
      return typeof r == "number" && (r = Math.max(-1, r)), {
        ...i,
        pageCount: r
      };
    }), e.getPageOptions = R(() => [e.getPageCount()], (s) => {
      let i = [];
      return s && s > 0 && (i = [...new Array(s)].fill(null).map((o, r) => r)), i;
    }, k(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: s
      } = e.getState().pagination, i = e.getPageCount();
      return i === -1 ? !0 : i === 0 ? !1 : s < i - 1;
    }, e.previousPage = () => e.setPageIndex((s) => s - 1), e.nextPage = () => e.setPageIndex((s) => s + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var s;
      return (s = e.options.pageCount) != null ? s : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var s;
      return (s = e.options.rowCount) != null ? s : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Ze = () => ({
  top: [],
  bottom: []
}), ui = {
  getInitialState: (e) => ({
    rowPinning: Ze(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Z("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, s, i) => {
      const o = s ? e.getLeafRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], r = i ? e.getParentRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], l = /* @__PURE__ */ new Set([...r, e.id, ...o]);
      t.setRowPinning((a) => {
        var u, g;
        if (n === "bottom") {
          var f, c;
          return {
            top: ((f = a == null ? void 0 : a.top) != null ? f : []).filter((h) => !(l != null && l.has(h))),
            bottom: [...((c = a == null ? void 0 : a.bottom) != null ? c : []).filter((h) => !(l != null && l.has(h))), ...Array.from(l)]
          };
        }
        if (n === "top") {
          var d, v;
          return {
            top: [...((d = a == null ? void 0 : a.top) != null ? d : []).filter((h) => !(l != null && l.has(h))), ...Array.from(l)],
            bottom: ((v = a == null ? void 0 : a.bottom) != null ? v : []).filter((h) => !(l != null && l.has(h)))
          };
        }
        return {
          top: ((u = a == null ? void 0 : a.top) != null ? u : []).filter((h) => !(l != null && l.has(h))),
          bottom: ((g = a == null ? void 0 : a.bottom) != null ? g : []).filter((h) => !(l != null && l.has(h)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: s,
        enablePinning: i
      } = t.options;
      return typeof s == "function" ? s(e) : (n = s ?? i) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: s,
        bottom: i
      } = t.getState().rowPinning, o = n.some((l) => s == null ? void 0 : s.includes(l)), r = n.some((l) => i == null ? void 0 : i.includes(l));
      return o ? "top" : r ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, s;
      const i = e.getIsPinned();
      if (!i) return -1;
      const o = (n = i === "top" ? t.getTopRows() : t.getBottomRows()) == null ? void 0 : n.map((r) => {
        let {
          id: l
        } = r;
        return l;
      });
      return (s = o == null ? void 0 : o.indexOf(e.id)) != null ? s : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, s;
      return e.setRowPinning(t ? Ze() : (n = (s = e.initialState) == null ? void 0 : s.rowPinning) != null ? n : Ze());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const s = e.getState().rowPinning;
      if (!t) {
        var i, o;
        return !!((i = s.top) != null && i.length || (o = s.bottom) != null && o.length);
      }
      return !!((n = s[t]) != null && n.length);
    }, e._getPinnedRows = (t, n, s) => {
      var i;
      return ((i = e.options.keepPinnedRows) == null || i ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((r) => {
          const l = e.getRow(r, !0);
          return l.getIsAllParentsExpanded() ? l : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((r) => t.find((l) => l.id === r))
      )).filter(Boolean).map((r) => ({
        ...r,
        position: s
      }));
    }, e.getTopRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), k(e.options, "debugRows", "getTopRows")), e.getBottomRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), k(e.options, "debugRows", "getBottomRows")), e.getCenterRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, s) => {
      const i = /* @__PURE__ */ new Set([...n ?? [], ...s ?? []]);
      return t.filter((o) => !i.has(o.id));
    }, k(e.options, "debugRows", "getCenterRows"));
  }
}, di = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Z("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => {
      var n;
      return e.setRowSelection(t ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (t) => {
      e.setRowSelection((n) => {
        t = typeof t < "u" ? t : !e.getIsAllRowsSelected();
        const s = {
          ...n
        }, i = e.getPreGroupedRowModel().flatRows;
        return t ? i.forEach((o) => {
          o.getCanSelect() && (s[o.id] = !0);
        }) : i.forEach((o) => {
          delete s[o.id];
        }), s;
      });
    }, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
      const s = typeof t < "u" ? t : !e.getIsAllPageRowsSelected(), i = {
        ...n
      };
      return e.getRowModel().rows.forEach((o) => {
        lt(i, o.id, s, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = R(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Je(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, k(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = R(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Je(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, k(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = R(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Je(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, k(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const t = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let s = !!(t.length && Object.keys(n).length);
      return s && t.some((i) => i.getCanSelect() && !n[i.id]) && (s = !1), s;
    }, e.getIsAllPageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows.filter((i) => i.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let s = !!t.length;
      return s && t.some((i) => !n[i.id]) && (s = !1), s;
    }, e.getIsSomeRowsSelected = () => {
      var t;
      const n = Object.keys((t = e.getState().rowSelection) != null ? t : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : t.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (t) => {
      e.toggleAllRowsSelected(t.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
      e.toggleAllPageRowsSelected(t.target.checked);
    };
  },
  createRow: (e, t) => {
    e.toggleSelected = (n, s) => {
      const i = e.getIsSelected();
      t.setRowSelection((o) => {
        var r;
        if (n = typeof n < "u" ? n : !i, e.getCanSelect() && i === n)
          return o;
        const l = {
          ...o
        };
        return lt(l, e.id, n, (r = s == null ? void 0 : s.selectChildren) != null ? r : !0, t), l;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return yt(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return at(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return at(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : (n = t.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : (n = t.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : (n = t.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (s) => {
        var i;
        n && e.toggleSelected((i = s.target) == null ? void 0 : i.checked);
      };
    };
  }
}, lt = (e, t, n, s, i) => {
  var o;
  const r = i.getRow(t, !0);
  n ? (r.getCanMultiSelect() || Object.keys(e).forEach((l) => delete e[l]), r.getCanSelect() && (e[t] = !0)) : delete e[t], s && (o = r.subRows) != null && o.length && r.getCanSelectSubRows() && r.subRows.forEach((l) => lt(e, l.id, n, s, i));
};
function Je(e, t) {
  const n = e.getState().rowSelection, s = [], i = {}, o = function(r, l) {
    return r.map((a) => {
      var u;
      const g = yt(a, n);
      if (g && (s.push(a), i[a.id] = a), (u = a.subRows) != null && u.length && (a = {
        ...a,
        subRows: o(a.subRows)
      }), g)
        return a;
    }).filter(Boolean);
  };
  return {
    rows: o(t.rows),
    flatRows: s,
    rowsById: i
  };
}
function yt(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function at(e, t, n) {
  var s;
  if (!((s = e.subRows) != null && s.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((r) => {
    if (!(o && !i) && (r.getCanSelect() && (yt(r, t) ? o = !0 : i = !1), r.subRows && r.subRows.length)) {
      const l = at(r, t);
      l === "all" ? o = !0 : (l === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const ut = /([0-9]+)/gm, ci = (e, t, n) => rn(ce(e.getValue(n)).toLowerCase(), ce(t.getValue(n)).toLowerCase()), gi = (e, t, n) => rn(ce(e.getValue(n)), ce(t.getValue(n))), fi = (e, t, n) => St(ce(e.getValue(n)).toLowerCase(), ce(t.getValue(n)).toLowerCase()), mi = (e, t, n) => St(ce(e.getValue(n)), ce(t.getValue(n))), pi = (e, t, n) => {
  const s = e.getValue(n), i = t.getValue(n);
  return s > i ? 1 : s < i ? -1 : 0;
}, hi = (e, t, n) => St(e.getValue(n), t.getValue(n));
function St(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function ce(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function rn(e, t) {
  const n = e.split(ut).filter(Boolean), s = t.split(ut).filter(Boolean);
  for (; n.length && s.length; ) {
    const i = n.shift(), o = s.shift(), r = parseInt(i, 10), l = parseInt(o, 10), a = [r, l].sort();
    if (isNaN(a[0])) {
      if (i > o)
        return 1;
      if (o > i)
        return -1;
      continue;
    }
    if (isNaN(a[1]))
      return isNaN(r) ? -1 : 1;
    if (r > l)
      return 1;
    if (l > r)
      return -1;
  }
  return n.length - s.length;
}
const $e = {
  alphanumeric: ci,
  alphanumericCaseSensitive: gi,
  text: fi,
  textCaseSensitive: mi,
  datetime: pi,
  basic: hi
}, vi = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Z("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let s = !1;
      for (const i of n) {
        const o = i == null ? void 0 : i.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return $e.datetime;
        if (typeof o == "string" && (s = !0, o.split(ut).length > 1))
          return $e.alphanumeric;
      }
      return s ? $e.text : $e.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, s;
      if (!e)
        throw new Error();
      return ze(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (s = t.options.sortingFns) == null ? void 0 : s[e.columnDef.sortingFn]) != null ? n : $e[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, s) => {
      const i = e.getNextSortingOrder(), o = typeof n < "u" && n !== null;
      t.setSorting((r) => {
        const l = r == null ? void 0 : r.find((d) => d.id === e.id), a = r == null ? void 0 : r.findIndex((d) => d.id === e.id);
        let u = [], g, f = o ? n : i === "desc";
        if (r != null && r.length && e.getCanMultiSort() && s ? l ? g = "toggle" : g = "add" : r != null && r.length && a !== r.length - 1 ? g = "replace" : l ? g = "toggle" : g = "replace", g === "toggle" && (o || i || (g = "remove")), g === "add") {
          var c;
          u = [...r, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((c = t.options.maxMultiSortColCount) != null ? c : Number.MAX_SAFE_INTEGER));
        } else g === "toggle" ? u = r.map((d) => d.id === e.id ? {
          ...d,
          desc: f
        } : d) : g === "remove" ? u = r.filter((d) => d.id !== e.id) : u = [{
          id: e.id,
          desc: f
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var n, s;
      return ((n = (s = e.columnDef.sortDescFirst) != null ? s : t.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var s, i;
      const o = e.getFirstSortDir(), r = e.getIsSorted();
      return r ? r !== o && ((s = t.options.enableSortingRemoval) == null || s) && // If enableSortRemove, enable in general
      (!(n && (i = t.options.enableMultiRemove) != null) || i) ? !1 : r === "desc" ? "asc" : "desc" : o;
    }, e.getCanSort = () => {
      var n, s;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((s = t.options.enableSorting) != null ? s : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, s;
      return (n = (s = e.columnDef.enableMultiSort) != null ? s : t.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const s = (n = t.getState().sorting) == null ? void 0 : n.find((i) => i.id === e.id);
      return s ? s.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, s;
      return (n = (s = t.getState().sorting) == null ? void 0 : s.findIndex((i) => i.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      t.setSorting((n) => n != null && n.length ? n.filter((s) => s.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (s) => {
        n && (s.persist == null || s.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(s) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
      var n, s;
      e.setSorting(t ? [] : (n = (s = e.initialState) == null ? void 0 : s.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, yi = [
  js,
  ii,
  ei,
  ti,
  zs,
  Ts,
  ri,
  //depends on ColumnFaceting
  oi,
  //depends on ColumnFiltering
  vi,
  Qs,
  //depends on RowSorting
  li,
  ai,
  ui,
  di,
  ni
];
function Si(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const s = [...yi, ...(t = e._features) != null ? t : []];
  let i = {
    _features: s
  };
  const o = i._features.reduce((c, d) => Object.assign(c, d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(i)), {}), r = (c) => i.options.mergeOptions ? i.options.mergeOptions(o, c) : {
    ...o,
    ...c
  };
  let a = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  i._features.forEach((c) => {
    var d;
    a = (d = c.getInitialState == null ? void 0 : c.getInitialState(a)) != null ? d : a;
  });
  const u = [];
  let g = !1;
  const f = {
    _features: s,
    options: {
      ...o,
      ...e
    },
    initialState: a,
    _queue: (c) => {
      u.push(c), g || (g = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        g = !1;
      }).catch((d) => setTimeout(() => {
        throw d;
      })));
    },
    reset: () => {
      i.setState(i.initialState);
    },
    setOptions: (c) => {
      const d = ue(c, i.options);
      i.options = r(d);
    },
    getState: () => i.options.state,
    setState: (c) => {
      i.options.onStateChange == null || i.options.onStateChange(c);
    },
    _getRowId: (c, d, v) => {
      var h;
      return (h = i.options.getRowId == null ? void 0 : i.options.getRowId(c, d, v)) != null ? h : `${v ? [v.id, d].join(".") : d}`;
    },
    getCoreRowModel: () => (i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)), i._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => i.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (c, d) => {
      let v = (d ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[c];
      if (!v && (v = i.getCoreRowModel().rowsById[c], !v))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${c}`) : new Error();
      return v;
    },
    _getDefaultColumnDef: R(() => [i.options.defaultColumn], (c) => {
      var d;
      return c = (d = c) != null ? d : {}, {
        header: (v) => {
          const h = v.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (v) => {
          var h, S;
          return (h = (S = v.renderValue()) == null || S.toString == null ? void 0 : S.toString()) != null ? h : null;
        },
        ...i._features.reduce((v, h) => Object.assign(v, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...c
      };
    }, k(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: R(() => [i._getColumnDefs()], (c) => {
      const d = function(v, h, S) {
        return S === void 0 && (S = 0), v.map((b) => {
          const w = Bs(i, b, S, h), _ = b;
          return w.columns = _.columns ? d(_.columns, w, S + 1) : [], w;
        });
      };
      return d(c);
    }, k(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: R(() => [i.getAllColumns()], (c) => c.flatMap((d) => d.getFlatColumns()), k(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: R(() => [i.getAllFlatColumns()], (c) => c.reduce((d, v) => (d[v.id] = v, d), {}), k(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: R(() => [i.getAllColumns(), i._getOrderColumnsFn()], (c, d) => {
      let v = c.flatMap((h) => h.getLeafColumns());
      return d(v);
    }, k(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (c) => {
      const d = i._getAllFlatColumnsById()[c];
      return process.env.NODE_ENV !== "production" && !d && console.error(`[Table] Column with id '${c}' does not exist.`), d;
    }
  };
  Object.assign(i, f);
  for (let c = 0; c < i._features.length; c++) {
    const d = i._features[c];
    d == null || d.createTable == null || d.createTable(i);
  }
  return i;
}
function bi() {
  return (e) => R(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, s = function(i, o, r) {
      o === void 0 && (o = 0);
      const l = [];
      for (let u = 0; u < i.length; u++) {
        const g = Ns(e, e._getRowId(i[u], u, r), i[u], u, o, void 0, r == null ? void 0 : r.id);
        if (n.flatRows.push(g), n.rowsById[g.id] = g, l.push(g), e.options.getSubRows) {
          var a;
          g.originalSubRows = e.options.getSubRows(i[u], u), (a = g.originalSubRows) != null && a.length && (g.subRows = s(g.originalSubRows, o + 1, g));
        }
      }
      return l;
    };
    return n.rows = s(t), n;
  }, k(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function wi() {
  return (e) => R(() => [e.getState().expanded, e.getPreExpandedRowModel(), e.options.paginateExpandedRows], (t, n, s) => !n.rows.length || t !== !0 && !Object.keys(t ?? {}).length || !s ? n : $i(n), k(e.options, "debugTable", "getExpandedRowModel"));
}
function $i(e) {
  const t = [], n = (s) => {
    var i;
    t.push(s), (i = s.subRows) != null && i.length && s.getIsExpanded() && s.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
/**
   * vue-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function De() {
  return !0;
}
const Ci = Symbol("merge-proxy"), _i = {
  get(e, t, n) {
    return t === Ci ? n : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: De,
  deleteProperty: De,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: De,
      deleteProperty: De
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Qe(e) {
  return "value" in e ? e.value : e;
}
function Ce() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return new Proxy({
    get(s) {
      for (let i = t.length - 1; i >= 0; i--) {
        const o = Qe(t[i])[s];
        if (o !== void 0) return o;
      }
    },
    has(s) {
      for (let i = t.length - 1; i >= 0; i--)
        if (s in Qe(t[i])) return !0;
      return !1;
    },
    keys() {
      const s = [];
      for (let i = 0; i < t.length; i++) s.push(...Object.keys(Qe(t[i])));
      return [...Array.from(new Set(s))];
    }
  }, _i);
}
const Ye = z({
  props: ["render", "props"],
  setup: (e) => () => typeof e.render == "function" || typeof e.render == "object" ? st(e.render, e.props) : e.render
});
function Et(e) {
  return Ce(e, {
    data: B(e.data)
  });
}
function Ri(e) {
  const t = pn(e.data), n = Ce({
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    mergeOptions(o, r) {
      return t ? {
        ...o,
        ...r
      } : Ce(o, r);
    }
  }, t ? Et(e) : e), s = Si(n);
  if (t) {
    const o = Q(e.data);
    be(o, () => {
      s.setState((r) => ({
        ...r,
        data: o.value
      }));
    }, {
      immediate: !0
    });
  }
  const i = W(s.initialState);
  return Ae(() => {
    s.setOptions((o) => {
      var r;
      const l = new Proxy({}, {
        get: (a, u) => i.value[u]
      });
      return Ce(o, t ? Et(e) : e, {
        // merge the initialState and `options.state`
        // create a new proxy on each `setOptions` call
        // and get the value from state on each property access
        state: Ce(l, (r = e.state) != null ? r : {}),
        // Similarly, we'll maintain both our internal state and any user-provided
        // state.
        onStateChange: (a) => {
          a instanceof Function ? i.value = a(i.value) : i.value = a, e.onStateChange == null || e.onStateChange(a);
        }
      });
    });
  }), s;
}
const ki = { class: "p-2" }, Ii = ["colSpan"], Ei = { key: 0 }, Fi = ["colspan"], Ai = { style: { fontSize: "10px" } }, xi = ["colSpan"], Pi = /* @__PURE__ */ z({
  __name: "ArticleList",
  setup(e) {
    const t = [
      {
        firstName: "tanner",
        lastName: "linsley",
        age: 24,
        visits: 100,
        status: "In Relationship",
        progress: 50
      },
      {
        firstName: "tandy",
        lastName: "miller",
        age: 40,
        visits: 40,
        status: "Single",
        progress: 80
      },
      {
        firstName: "joe",
        lastName: "dirte",
        age: 45,
        visits: 20,
        status: "Complicated",
        progress: 10
      }
    ], n = Ms();
    function s(u) {
      return u.getCanExpand() ? st(
        "button",
        {
          onClick: u.getToggleExpandedHandler(),
          style: { cursor: "pointer" }
        },
        u.getIsExpanded() ? "👇" : "👉"
      ) : st(hn, "🔵");
    }
    const i = [
      n.group({
        header: "Name",
        footer: (u) => u.column.id,
        columns: [
          n.display({
            id: "expander",
            header: () => null,
            cell: ({ row: u }) => s(u)
          }),
          n.accessor("firstName", {
            footer: (u) => u.column.id
          }),
          n.accessor((u) => u.lastName, {
            id: "lastName",
            cell: (u) => u.getValue(),
            header: () => "Last Name",
            footer: (u) => u.column.id
          })
        ]
      }),
      n.group({
        header: "Info",
        footer: (u) => u.column.id,
        columns: [
          n.accessor("age", {
            header: () => "Age",
            footer: (u) => u.column.id
          }),
          n.group({
            header: "More Info",
            columns: [
              n.accessor("visits", {
                header: () => "Visits",
                footer: (u) => u.column.id
              }),
              n.accessor("status", {
                header: "Status",
                footer: (u) => u.column.id
              }),
              n.accessor("progress", {
                header: "Profile Progress",
                footer: (u) => u.column.id
              })
            ]
          })
        ]
      })
    ], o = W(t), r = W({}), l = () => {
      o.value = t;
    }, a = Ri({
      get data() {
        return o.value;
      },
      state: {
        get expanded() {
          return r.value;
        }
      },
      columns: i,
      getRowCanExpand: () => !0,
      getCoreRowModel: bi(),
      getExpandedRowModel: wi(),
      onExpandedChange: (u) => {
        r.value = typeof u == "function" ? u(r.value) : u;
      }
    });
    return (u, g) => (p(), y("div", ki, [
      m("table", null, [
        m("thead", null, [
          (p(!0), y(C, null, L(B(a).getHeaderGroups(), (f) => (p(), y("tr", {
            key: f.id
          }, [
            (p(!0), y(C, null, L(f.headers, (c) => (p(), y("th", {
              key: c.id,
              colSpan: c.colSpan
            }, [
              c.isPlaceholder ? $("", !0) : (p(), H(B(Ye), {
                key: 0,
                render: c.column.columnDef.header,
                props: c.getContext()
              }, null, 8, ["render", "props"]))
            ], 8, Ii))), 128))
          ]))), 128))
        ]),
        m("tbody", null, [
          (p(!0), y(C, null, L(B(a).getRowModel().rows, (f) => (p(), y(C, {
            key: f.id
          }, [
            m("tr", null, [
              (p(!0), y(C, null, L(f.getVisibleCells(), (c) => (p(), y("td", {
                key: c.id
              }, [
                he(B(Ye), {
                  render: c.column.columnDef.cell,
                  props: c.getContext()
                }, null, 8, ["render", "props"])
              ]))), 128))
            ]),
            f.getIsExpanded() ? (p(), y("tr", Ei, [
              m("td", {
                colspan: f.getAllCells().length
              }, [
                m("pre", Ai, [
                  g[0] || (g[0] = D("                  ")),
                  m("code", null, V(JSON.stringify(f.original, null, 2)), 1),
                  g[1] || (g[1] = D(`
                `))
                ])
              ], 8, Fi)
            ])) : $("", !0)
          ], 64))), 128))
        ]),
        m("tfoot", null, [
          (p(!0), y(C, null, L(B(a).getFooterGroups(), (f) => (p(), y("tr", {
            key: f.id
          }, [
            (p(!0), y(C, null, L(f.headers, (c) => (p(), y("th", {
              key: c.id,
              colSpan: c.colSpan
            }, [
              c.isPlaceholder ? $("", !0) : (p(), H(B(Ye), {
                key: 0,
                render: c.column.columnDef.footer,
                props: c.getContext()
              }, null, 8, ["render", "props"]))
            ], 8, xi))), 128))
          ]))), 128))
        ])
      ]),
      g[2] || (g[2] = m("div", { class: "h-4" }, null, -1)),
      m("button", {
        onClick: l,
        class: "border p-2"
      }, "Rerender")
    ]));
  }
}), Vi = {
  key: 1,
  class: "list"
}, Mi = { class: "viur-shop-cart-payment" }, Oi = { class: "viur-shop-cart-payment-method" }, Di = {
  __name: "ConfirmView",
  setup(e) {
    const t = ge(), n = A({
      cartIsInit: P(() => !0),
      itemsIsInit: P(() => {
        var s;
        return !!((s = t.state) != null && s.carts[t.state.basket].items);
      }),
      selectedPaymentProvider: P(() => {
        var s;
        return (s = t.state) == null ? void 0 : s.selectedPaymentProvider.title;
      }),
      images: {},
      showOrderButton: !1
    });
    return console.log("se", n.selectedPaymentProvider), oe(async () => {
      await t.init();
    }), (s, i) => n.cartIsInit ? (p(), y("div", Vi, [
      i[2] || (i[2] = m("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)),
      i[3] || (i[3] = m("div", { class: "viur-shop-cart-address-wrap" }, [
        m("div", { class: "viur-shop-cart-address" }, [
          m("div", { class: "viur-shop-cart-address-headline" }, [
            D(" Versandadresse "),
            m("sl-button", {
              outline: "",
              size: "small"
            }, [
              m("sl-icon", {
                name: "pencil",
                slot: "prefix"
              })
            ])
          ]),
          D(" Roland Brose"),
          m("br"),
          D(" Speicherstraße 33"),
          m("br"),
          D(" 44147 Dortmund, DE"),
          m("br"),
          m("br"),
          D(" rb@mausbrand.de"),
          m("br"),
          D(" 0231 21 34 68 90 ")
        ]),
        m("div", { class: "viur-shop-cart-address" }, [
          m("div", { class: "viur-shop-cart-address-headline" }, [
            D(" Rechnungsadresse "),
            m("sl-button", {
              outline: "",
              size: "small"
            }, [
              m("sl-icon", {
                name: "pencil",
                slot: "prefix"
              })
            ])
          ]),
          D(" Roland Brose"),
          m("br"),
          D(" Speicherstraße 33"),
          m("br"),
          D(" 44147 Dortmund, DE"),
          m("br"),
          m("br"),
          D(" rb@mausbrand.de"),
          m("br"),
          D(" 0231 21 34 68 90 ")
        ])
      ], -1)),
      m("div", Mi, [
        m("div", Oi, [
          i[0] || (i[0] = m("span", null, "Zahlungsmethode:", -1)),
          D(" " + V(n.selectedPaymentProvider), 1)
        ]),
        i[1] || (i[1] = m("sl-button", {
          outline: "",
          size: "small"
        }, [
          m("sl-icon", {
            name: "pencil",
            slot: "prefix"
          })
        ], -1))
      ]),
      i[4] || (i[4] = m("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)),
      he(Pi)
    ])) : (p(), H(ms, { key: 0 }));
  }
}, on = /* @__PURE__ */ x(Di, [["__scopeId", "data-v-e263f999"]]), Li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: on
}, Symbol.toStringTag, { value: "Module" })), Bi = { class: "bind" }, ji = {
  key: 0,
  class: "viur-shop-order-complete-slot"
}, Ni = { class: "btn-wrap" }, zi = {
  __name: "ShopOrderComplete",
  props: {
    redirectUrl: {
      type: String,
      required: !0
    },
    additionalComponents: {
      type: Array,
      default: []
    }
  },
  emits: ["goToStart"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    function i() {
      s("goToStart");
    }
    function o() {
      window.location.href = n.redirectUrl;
    }
    return (r, l) => (p(), y("div", Bi, [
      l[2] || (l[2] = m("h1", { class: "viur-shop-success-headline headline" }, " Vielen Dank für Ihre Bestellung ", -1)),
      l[3] || (l[3] = m("p", { class: "paragraph" }, [
        m("strong", null, "Ihre Bestellnummer:"),
        D(" 123345670")
      ], -1)),
      l[4] || (l[4] = m("p", { class: "paragraph" }, [
        D(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        m("br"),
        D(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. ")
      ], -1)),
      e.additionalComponents.length ? (p(), y("div", ji, [
        (p(!0), y(C, null, L(e.additionalComponents, (a) => (p(), H(ft(a.component), Xt({ ref_for: !0 }, a.props ? a.props : ""), null, 16))), 256))
      ])) : $("", !0),
      m("div", Ni, [
        m("sl-button", {
          size: "medium",
          onClick: l[0] || (l[0] = (a) => i())
        }, " Zur Startseite "),
        m("sl-button", {
          variant: "primary",
          onClick: l[1] || (l[1] = (a) => o()),
          size: "medium"
        }, " Weiter Einkaufen ")
      ])
    ]));
  }
}, Ti = /* @__PURE__ */ x(zi, [["__scopeId", "data-v-1f7efc9d"]]), Hi = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({});
    function i(o) {
      t.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), Gi = ["disabled", "value"], Ui = ["disabled", "value"];
function qi(e, t, n, s, i, o) {
  var r, l;
  return e.boneState.bonestructure.type === "raw.json" ? (p(), y("sl-textarea", {
    key: 0,
    disabled: (r = e.boneState) == null ? void 0 : r.readonly,
    value: JSON.stringify(e.value),
    onInput: t[0] || (t[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Gi)) : (p(), y("sl-textarea", {
    key: 1,
    disabled: (l = e.boneState) == null ? void 0 : l.readonly,
    value: e.value,
    onInput: t[1] || (t[1] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Ui));
}
const Ft = /* @__PURE__ */ x(Hi, [["render", qi], ["__scopeId", "data-v-1347257f"]]), Wi = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = A({});
    function s(i) {
      t.emit("change", e.name, i.target.value, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: n,
      changeEvent: s
    };
  }
}), Ki = ["value"];
function Xi(e, t, n, s, i, o) {
  return p(), y("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ki);
}
const At = /* @__PURE__ */ x(Wi, [["render", Xi], ["__scopeId", "data-v-eadb6225"]]);
function Zi(e) {
  return yn() ? (Sn(e), !0) : !1;
}
function dt(e) {
  return typeof e == "function" ? e() : B(e);
}
const Ji = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const xt = () => {
};
function Qi(e, t) {
  function n(...s) {
    return new Promise((i, o) => {
      Promise.resolve(e(() => t.apply(this, s), { fn: t, thisArg: this, args: s })).then(i).catch(o);
    });
  }
  return n;
}
function Yi(e, t = {}) {
  let n, s, i = xt;
  const o = (l) => {
    clearTimeout(l), i(), i = xt;
  };
  return (l) => {
    const a = dt(e), u = dt(t.maxWait);
    return n && o(n), a <= 0 || u !== void 0 && u <= 0 ? (s && (o(s), s = null), Promise.resolve(l())) : new Promise((g, f) => {
      i = t.rejectOnCancel ? f : g, u && !s && (s = setTimeout(() => {
        n && o(n), s = null, g(l());
      }, u)), n = setTimeout(() => {
        s && o(s), s = null, g(l());
      }, a);
    });
  };
}
function er(e, t = 200, n = {}) {
  return Qi(
    Yi(t, n),
    e
  );
}
function Te(e, t, n = {}) {
  const {
    immediate: s = !0
  } = n, i = W(!1);
  let o = null;
  function r() {
    o && (clearTimeout(o), o = null);
  }
  function l() {
    i.value = !1, r();
  }
  function a(...u) {
    r(), i.value = !0, o = setTimeout(() => {
      i.value = !1, o = null, e(...u);
    }, dt(t));
  }
  return s && (i.value = !0, Ji && a()), Zi(l), {
    isPending: vn(i),
    start: a,
    stop: l
  };
}
class tr {
  static objectEmpty(t) {
    return Object.keys(t).length === 0 && t.constructor === Object;
  }
  static getDescr(t, n) {
    try {
      return t.values.filter((s) => s[0] === n)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(t) {
    return t || (t = ""), String(t).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(t, n) {
    function s(r) {
      let l = [], a = [], u = /\$\((.*?)\)/g;
      for (; a; ) {
        if (a = u.exec(r), !a) {
          a = !1;
          continue;
        }
        l.push(a[1]);
      }
      return l;
    }
    let i = s(t), o = [];
    Array.isArray(n) || (n = [n]);
    for (let r of n) {
      let l = t;
      for (let a of i) {
        let u = a.split("."), g = r;
        for (let f of u)
          g && g !== "-" && f in g && g[f] ? g = g[f] : g = "-";
        g = this.unescape(g), l = l.replace("$(" + a + ")", g);
      }
      o.push(l);
    }
    return o.join(", ");
  }
}
const nr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    autofocus: Boolean
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => e.value)
    }), i = W(null);
    function o(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return Ae(() => {
      if (e.autofocus && i.value && i.value !== null && i !== null) {
        const { start: r } = Te(() => {
          i.value.focus();
        }, 600);
        r();
      }
    }), T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      Utils: tr,
      boneState: n,
      changeEvent: o,
      stringBone: i
    };
  }
}), sr = ["disabled", "value", "required"];
function ir(e, t, n, s, i, o) {
  return p(), y("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r)),
    onKeyup: t[1] || (t[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, sr);
}
const Pt = /* @__PURE__ */ x(nr, [["render", ir], ["__scopeId", "data-v-307247ea"]]), rr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    autofocus: Boolean
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({}), i = W(null);
    function o(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return Ae(() => {
      if (e.autofocus && i.value && i.value !== null && i !== null) {
        const { start: r } = Te(() => {
          i.value.focus();
        }, 600);
        r();
      }
    }), T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: o,
      emailBone: i
    };
  }
}), or = ["disabled", "value"];
function lr(e, t, n, s, i, o) {
  return p(), y("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, or);
}
const Vt = /* @__PURE__ */ x(rr, [["render", lr], ["__scopeId", "data-v-c934def3"]]), ar = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => {
        var r;
        let o = e.value;
        return n.bonestructure.time ? o = (r = e.value) == null ? void 0 : r.split("+")[0] : e.value && (o = new Date(e.value).toISOString().substr(0, 10)), o;
      }),
      typeString: P(() => {
        let o = "datetime-local";
        return n.bonestructure.time || (o = "date"), o;
      })
    });
    function i(o) {
      t.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), ur = ["disabled", "type", "value"];
function dr(e, t, n, s, i, o) {
  return p(), y("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, ur);
}
const Mt = /* @__PURE__ */ x(ar, [["render", dr], ["__scopeId", "data-v-b1e3e36d"]]), cr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => {
        let r = e.value;
        return Array.isArray(e.value) ? (n.bonestructure.values instanceof Array ? r = r.filter((l) => n.bonestructure.values.map((a) => a[0].toString()).includes(l)) : r = r.filter(
          (l) => Object.keys(n.bonestructure.values).map((a) => a.toString()).includes(l)
        ), r.map((l) => l.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function i() {
      if (Array.isArray(n.bonestructure.values))
        return n.bonestructure.values;
      {
        let r = [];
        for (const [l, a] of Object.entries(n.bonestructure.values))
          r.push([l, a]);
        return r;
      }
    }
    function o(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, s.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: o,
      convertObjToList: i
    };
  }
}), gr = ["disabled", "value", "multiple"], fr = ["value"];
function mr(e, t, n, s, i, o) {
  return p(), y("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, [
    (p(!0), y(C, null, L(e.convertObjToList(), (r) => (p(), y("sl-option", {
      key: r[0],
      value: r[0]
    }, V(r[1]), 9, fr))), 128))
  ], 40, gr);
}
const Ot = /* @__PURE__ */ x(cr, [["render", mr], ["__scopeId", "data-v-b2853f5d"]]), pr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function i(o) {
      t.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return T(() => {
      let o = e.value;
      o || (o = !1), t.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), hr = ["disabled", "checked"];
function vr(e, t, n, s, i, o) {
  return p(), y("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, hr);
}
const Dt = /* @__PURE__ */ x(pr, [["render", vr], ["__scopeId", "data-v-43289693"]]), yr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    autofocus: Boolean
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), i = W(null);
    function o(l) {
      s.value1 === s.value2 ? s.equal = !0 : s.equal = !1, r(s.value1), s.requiredPasswordInfo.length === 0 && s.passwordInfo.length - s.requiredPasswordInfo.length <= n.bonestructure.test_threshold ? t.emit("change", e.name, s.value1, e.lang, e.index, !0) : t.emit("change", e.name, s.value1, e.lang, e.index, !1);
    }
    T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function r(l) {
      s.passwordInfo = [], s.requiredPasswordInfo = [];
      for (const a of n.bonestructure.tests)
        new RegExp(a[0]).test(l) || (a[2] ? s.requiredPasswordInfo.push(a[1]) : s.passwordInfo.push(a[1]));
      s.equal || s.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), s.value1 || s.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return Ae(() => {
      if (e.autofocus && i.value && i.value !== null && i !== null) {
        const { start: l } = Te(() => {
          i.value.focus();
        }, 600);
        l();
      }
    }), be(
      () => e.value,
      (l, a) => {
        s.value1 = l;
      }
    ), {
      state: s,
      boneState: n,
      changeEvent: o,
      passwordBone: i
    };
  }
}), Sr = ["disabled"], br = ["name"], wr = ["name"], $r = { class: "errors" };
function Cr(e, t, n, s, i, o) {
  return p(), y(C, null, [
    de(m("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": t[0] || (t[0] = (r) => e.state.value1 = r),
      disabled: e.boneState.readonly,
      class: ne({ "has-check": !e.boneState.readonly }),
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: t[1] || (t[1] = (...r) => e.changeEvent && e.changeEvent(...r)),
      onSlClear: t[2] || (t[2] = (r) => e.state.value1 = ""),
      onKeyup: t[3] || (t[3] = (...r) => e.changeEvent && e.changeEvent(...r))
    }, [
      m("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, br)
    ], 42, Sr), [
      [Ee, e.state.value1]
    ]),
    e.boneState.readonly ? $("", !0) : de((p(), y("sl-input", {
      key: 0,
      "onUpdate:modelValue": t[4] || (t[4] = (r) => e.state.value2 = r),
      class: "password-check",
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: t[5] || (t[5] = (...r) => e.changeEvent && e.changeEvent(...r)),
      onSlClear: t[6] || (t[6] = (r) => e.state.value2 = ""),
      onKeyup: t[7] || (t[7] = (...r) => e.changeEvent && e.changeEvent(...r))
    }, [
      m("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, wr)
    ], 544)), [
      [Ee, e.state.value2]
    ]),
    m("ul", $r, [
      (p(!0), y(C, null, L(e.state.passwordInfo, (r, l) => (p(), y("li", { key: l }, V(r), 1))), 128)),
      (p(!0), y(C, null, L(e.state.requiredPasswordInfo, (r, l) => (p(), y("li", {
        key: l,
        class: "requiredInfo"
      }, V(r), 1))), 128))
    ])
  ], 64);
}
const Lt = /* @__PURE__ */ x(yr, [["render", Cr], ["__scopeId", "data-v-84a55b3d"]]), U = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 };
class Le extends Error {
  constructor(t, n, s, i) {
    super(s || n), arguments.length >= 4 && i && Object.assign(this, i), this.statusText = n, this.statusCode = t, this.response = i;
  }
}
let et = null;
function ie() {
  return et || (et = gt("requestStore", () => {
    const e = A({
      sKeys: /* @__PURE__ */ new Set(),
      amount: 1
    });
    function t() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: t
    };
  })), et();
}
class M {
  static resetState() {
    ie().$reset(), ie().$dispose();
  }
  static buildUrl(t) {
    return t && !(t.startsWith("http://") || t.startsWith("https://") || t.startsWith("//")) && (t = window.location.origin + t), t;
  }
  static post(t, { dataObj: n = null, callback: s = null, failedCallback: i = null, abortController: o = null, headers: r = null, mode: l = null } = {}) {
    function a() {
      if (n instanceof FormData)
        return n;
      const g = new FormData();
      for (const f in n)
        if (Array.isArray(n[f]))
          for (let c of n[f])
            g.append(f, c);
        else
          g.append(f, n[f]);
      return g;
    }
    let u = Fe.post(M.buildUrl(t), a(), null, r, o, l);
    return u.then(function(g) {
      s && s(g.data);
    }).catch(function(g) {
      i && i(g);
    }), u;
  }
  static async getBatchSkeys(t = "json") {
    await M.get(`/${t}/skey`, {
      dataObj: { amount: ie().state.amount }
    }).then(async (n) => {
      let s = await n.json();
      Array.isArray(s) || (s = [s]), ie().state.sKeys = new Set(s);
    });
  }
  static async securePost(t, {
    dataObj: n = null,
    callback: s = null,
    failedCallback: i = null,
    abortController: o = null,
    renderer: r = "json",
    headers: l = null,
    mode: a = null,
    amount: u = null
  } = {}) {
    let g = null;
    ie().state.sKeys.size === 0 && (u && (ie().state.amount = u), await M.getBatchSkeys(r));
    const f = [...ie().state.sKeys][0];
    return n instanceof FormData ? (n.append("skey", f), ie().state.sKeys.delete(f)) : (n || (n = {}), n.skey = f, ie().state.sKeys.delete(f)), g = M.post(t, {
      dataObj: n,
      callback: s,
      abortController: o,
      headers: l,
      mode: a
    }), g;
  }
  static get(t, {
    dataObj: n = null,
    callback: s = null,
    failedCallback: i = null,
    cached: o = !1,
    clearCache: r = !1,
    abortController: l = null,
    headers: a = null,
    mode: u = null,
    //          milli  sec  min  Std  Tage
    cacheTime: g = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let f = Fe.get(M.buildUrl(t), n, r, a, l, u);
    return f.then(function(c) {
      s && s(c.data);
    }).catch(function(c) {
      i && i(c);
    }), f;
  }
  static list(t, {
    dataObj: n = null,
    callback: s = null,
    failedCallback: i = null,
    group: o = null,
    abortController: r = null,
    renderer: l = (U == null ? void 0 : U.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let a = `/${l}/${t}/list`;
    return o && (a += `/${o}`), M.get(a, {
      dataObj: n,
      callback: s,
      failedCallback: i,
      abortController: r
    });
  }
  static getStructure(t, {
    dataObj: n = null,
    callback: s = null,
    failedCallback: i = null,
    group: o = null,
    abortController: r = null,
    renderer: l = (U == null ? void 0 : U.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    t = t.replace(/\//g, ".");
    let a = `/${l}/getStructure/${t}`;
    return o && (a += `/${o}`), M.get(a, {
      dataObj: n,
      callback: s,
      failedCallback: i,
      abortController: r
    });
  }
  static view(t, n, {
    dataObj: s = null,
    callback: i = null,
    failedCallback: o = null,
    group: r = null,
    abortController: l = null,
    renderer: a = (U == null ? void 0 : U.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let u = `/${a}/${t}/view/${n}`;
    return r && (u = `/${a}/${t}/view/${r}/${n}`), M.get(u, {
      dataObj: s,
      callback: i,
      failedCallback: o,
      abortController: l
    });
  }
  static add(t, {
    dataObj: n = null,
    callback: s = null,
    failedCallback: i = null,
    group: o = null,
    abortController: r = null,
    renderer: l = (U == null ? void 0 : U.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let a = `/${l}/${t}/add`;
    return o && (a = `/${l}/${t}/add/${o}`), M.securePost(a, {
      dataObj: n,
      callback: s,
      failedCallback: i,
      abortController: r
    });
  }
  static edit(t, n, {
    dataObj: s = null,
    callback: i = null,
    failedCallback: o = null,
    group: r = null,
    abortController: l = null,
    renderer: a = (U == null ? void 0 : U.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let u = `/${a}/${t}/edit/${n}`;
    return r && (u = `/${a}/${t}/edit/${r}/${n}`), M.securePost(u, {
      dataObj: s,
      callback: i,
      failedCallback: o,
      abortController: l
    });
  }
  static delete(t, n, {
    dataObj: s = null,
    callback: i = null,
    failedCallback: o = null,
    group: r = null,
    abortController: l = null,
    renderer: a = (U == null ? void 0 : U.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let u = `/${a}/${t}/delete/${n}`;
    return r && (u = `/${a}/${t}/delete/${r}/${n}`), M.securePost(u, {
      dataObj: s,
      callback: i,
      failedCallback: o,
      abortController: l,
      amount: 1
    });
  }
  static downloadUrlFor(t, n = !1) {
    return t && "dest" in t ? n && "thumbnail" in t.dest ? M.buildUrl(t.dest.thumbnail) : "downloadUrl" in t.dest ? M.buildUrl(t.dest.downloadUrl) : M.buildUrl(null) : M.buildUrl(t);
  }
  static serveUrlFor(t, n = null, s = null, i = "", o = !1) {
    const r = /^https:\/\/(.*?)\.googleusercontent\.com\/(.*?)$/;
    let l = "/file/serve";
    const a = t.match(r);
    if (a) {
      const u = a[1], g = a[2];
      l += `/${u}/${g}`, n && (l += `/${n}`), s && (l += `/${s}`);
      let f = [];
      for (const [c, d] of Object.entries({ options: i, download: o }))
        d && f.push(`${c}=${d}`);
      f.length > 0 && (l += `?${f.join("&")}`);
    }
    return M.buildUrl(l);
  }
  static uploadFile(t, n = void 0) {
    const s = {
      fileName: t.name,
      mimeType: t.type || "application/octet-stream",
      size: t.size.toString(),
      node: n
    };
    return new Promise((i, o) => {
      M.securePost("/vi/file/getUploadURL", { dataObj: s }).then(async (r) => {
        let l = await r.json();
        fetch(l.values.uploadUrl, {
          body: t,
          method: "POST",
          mode: "no-cors"
        }).then(async (a) => {
          const u = {
            key: l.values.uploadKey,
            skelType: "leaf"
          };
          M.securePost("/vi/file/add", { dataObj: u }).then(async (g) => {
            let f = await g.json();
            f.action === "addSuccess" ? i(f.values) : o(f);
          }).catch((g) => {
            o(g);
          });
        }).catch((a) => {
          o(a);
        });
      }).catch((r) => {
        o(r);
      });
    });
  }
}
class Fe {
  constructor() {
    Pe(this, "withCredentials", !0);
  }
  static buildOptions(t, n = null, s = null, i = null, o = null) {
    let r = { method: t };
    return r.credentials = "include", r.headers = {
      Accept: "application/json, text/plain, */*"
    }, s && (r.headers = { ...r.headers, ...s }), n && (r.body = n), i && (r.signal = i.signal), o && (r.mode = o), r;
  }
  static get(t, n = null, s = null, i = null, o = null, r = null) {
    function l(a, u) {
      let g = new URL(a);
      if (u && Object.keys(u).length > 0) {
        const f = new URLSearchParams();
        for (const [c, d] of Object.entries(u))
          if (Array.isArray(d))
            for (const v of d)
              f.append(c, v);
          else
            f.append(c, d);
        g.search = f.toString();
      }
      return g.toString();
    }
    return fetch(l(t, n), Fe.buildOptions("GET", null, i, o, r)).then(async (a) => {
      if (a.ok)
        return a;
      {
        const u = `${a.status} ${a.statusText}: ${a.headers ? a.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new Le(a.status, a.statusText, u, a));
      }
    }).catch((a) => {
      if (a instanceof TypeError) {
        const g = `503 ${a.message}: ${a.headers ? a.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new Le(503, a.message, g, a));
      }
      if (a instanceof DOMException && a.name == "AbortError") {
        const g = `${a.code} ${a.name}: ${a.headers ? a.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new Le(a.code, a.name, g, { url: t }));
      }
      const u = `${a.statusCode} ${a.statusText}: ${a.headers ? a.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new Le(a.statusCode, a.statusText, u, a.response));
    });
  }
  static post(t, n = null, s = null, i = null, o = null, r = null) {
    return fetch(t, Fe.buildOptions("POST", n, i, o, r));
  }
}
class tt {
  constructor(t, n, s) {
    this.emit = t, this.match = n, this.children = s;
  }
  dump(t) {
    if (t === void 0 && (t = 0), this.emit !== void 0) {
      let n = this.emit;
      for (let s = 0; s < t; s++)
        n = " " + n;
      this.match && this.match !== this.emit && (n += " (" + this.match + ")"), console.log(n), t++;
    }
    if (this.children)
      for (let n of this.children)
        n && n.dump(t);
  }
}
class nt {
  constructor() {
    this.state = 0, this.line = 0, this.column = 0, this.node = null;
  }
}
class _r extends Error {
  constructor(t, n, s) {
    super(`${t}:${n} Parse error, expecting '${s.join("', '")}'`), this.line = t, this.column = n, this.expecting = s;
  }
}
class Rr {
  constructor() {
    this.stack = [], this.tos = null, this.ret = null, this.act = null, this.idx = null, this.lhs = null, this.sym = -1, this.old_sym = -1, this.len = 0, this.lexem = null, this.next = null, this.eof = null, this.is_eof = !1, this.input = null, this.buf = "", this.error_delay = 3, this.error_count = 0, this.line = 1, this.column = 1;
  }
  get top() {
    return this.stack[this.stack.length - 1].value;
  }
  set top(t) {
    this.stack[this.stack.length - 1].value = t;
  }
  // Parsing actions
}
var J, ee, te, X, ln, ct, Be, an, un;
class _e {
  parse(t) {
    var l, a, u;
    let r = new Rr();
    for (r.input = t, r.act = 2, r.tos = new nt(), r.stack.push(r.tos); ; ) {
      for (; r.act & 1; ) {
        r.lhs = I(this.constructor, J).productions[r.idx]["left-hand-side"], "parse_" + r.idx in r && r["parse_" + r.idx]();
        let g = null, f = null;
        for (let c = 0; c < I(this.constructor, J).productions[r.idx].length; c++) {
          let d = r.stack.pop();
          d.node && (g === null && (g = []), Array.isArray(d.node) ? g = d.node.concat(g) : g.unshift(d.node));
        }
        if (r.tos = r.stack[r.stack.length - 1], r.tos.value = r.ret, I(this.constructor, J).productions[r.idx].emit && (f = new tt(I(this.constructor, J).productions[r.idx].emit, null, g)), r.lhs === 38 && r.stack.length === 1) {
          r.tos.node = f || g, se(l = this.constructor, X, Be).call(l, r), r.act = 4;
          break;
        }
        r.act = I(this.constructor, te).goto[r.tos.state][r.lhs][0], r.idx = I(this.constructor, te).goto[r.tos.state][r.lhs][1], r.tos = new nt(), r.stack.push(r.tos), r.tos.symbol = I(this.constructor, J).symbols[r.lhs], r.tos.state = r.act & 1 ? -1 : r.idx, r.tos.value = r.ret, r.tos.node = f || g, r.tos.value = r.ret, r.tos.line = r.line, r.tos.column = r.column;
      }
      if (r.act === 4 || r.act === 0)
        break;
      if (se(a = this.constructor, X, un).call(a, r), r.sym in I(this.constructor, te).action[r.tos.state] ? (r.act = I(this.constructor, te).action[r.tos.state][r.sym][0], r.idx = I(this.constructor, te).action[r.tos.state][r.sym][1]) : (r.idx = I(this.constructor, te)["default-production"][r.tos.state], r.idx > -1 ? r.act = 1 : r.act = 0), !r.act)
        throw new _r(
          r.line,
          r.column,
          Object.keys(
            I(this.constructor, te).action[r.tos.state]
          ).map((g) => I(this.constructor, J).symbols[g].symbol).sort()
        );
      r.act & 2 && (r.tos = new nt(), r.stack.push(r.tos), "scan_" + r.idx in r && r["parse_" + r.idx](), r.tos.state = r.act & 1 ? -1 : r.idx, r.tos.symbol = I(this.constructor, J).symbols[r.sym], r.tos.line = r.line, r.tos.column = r.column, r.top = r.buf.slice(0, r.len), r.tos.symbol.emit && (r.tos.node = new tt(r.tos.symbol.emit, r.top)), r.sym !== 0 && r.sym !== -1 && (se(u = this.constructor, X, Be).call(u, r), r.old_sym = -1));
    }
    return !r.ret && r.tos.node ? Array.isArray(r.tos.node) ? r.tos.node.length > 1 ? new tt(null, null, r.tos.node) : r.tos.node.pop() : r.tos.node : r.ret;
  }
}
J = new WeakMap(), ee = new WeakMap(), te = new WeakMap(), X = new WeakSet(), ln = function(t) {
  if (typeof t.input == "function")
    return t.input();
  let n = t.eof;
  return t.input.length > 0 && (n = t.input[0], t.input = t.input.slice(1)), n;
}, ct = function(t, n) {
  for (; n >= t.buf.length; ) {
    if (t.is_eof)
      return t.eof;
    let s = se(this, X, ln).call(this, t);
    if (s === t.eof)
      return t.is_eof = !0, t.eof;
    t.buf += s;
  }
  return t.buf.charCodeAt(n);
}, Be = function(t) {
  if (t.buf.length) {
    for (let n = 0; n <= t.len; n++)
      t.buf[n] === `
` ? (t.line++, t.column = 0) : t.column++;
    t.buf = t.buf.slice(t.len);
  }
  t.len = 0, t.sym = -1;
}, an = function(t) {
  let n = 0, s = 0, i = 0, o = se(this, X, ct).call(this, t, s);
  if (o === t.eof) {
    t.sym = 0;
    return;
  }
  for (; n > -1 && o !== t.eof; ) {
    let r = I(this, ee).index[i][n];
    for (n = -1; I(this, ee).chars[r * 2] > -1; ) {
      if (o >= I(this, ee).chars[r * 2] && o <= I(this, ee).chars[r * 2 + 1]) {
        if (s++, n = I(this, ee).transitions[r], I(this, ee).accept[i][n] > 0) {
          if (t.sym = I(this, ee).accept[i][n] - 1, t.len = s, t.sym === 0) {
            n = -1;
            break;
          }
          if (!I(this, J).symbols[t.sym]["is-greedy"]) {
            n = -1;
            break;
          }
        }
        o = se(this, X, ct).call(this, t, s);
        break;
      }
      r++;
    }
  }
}, un = function(t) {
  for (t.sym = -1, t.len = 0; ; ) {
    if (se(this, X, an).call(this, t), t.sym > -1 && I(this, J).symbols[t.sym]["is-whitespace"]) {
      se(this, X, Be).call(this, t);
      continue;
    }
    break;
  }
  return t.sym > -1;
}, ae(_e, X), ae(_e, J, {
  symbols: [
    { symbol: "&eof", emit: "", "is-terminal": 3, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "for", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "$", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "None", emit: "None", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "False", emit: "False", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "True", emit: "True", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "**", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "//", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "in", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "<>", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "!=", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "<=", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "<", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: ">=", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: ">", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "==", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "not", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "and", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "or", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "else", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "if", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "String", emit: "String", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !1 },
    { symbol: "Number", emit: "Number", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "Identifier", emit: "Identifier", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "whitespace", emit: "", "is-terminal": 2, "is-lexem": !1, "is-whitespace": !0, "is-greedy": !0 },
    { symbol: ",", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: ".", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: ":", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "]", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "[", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: ")", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "(", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "~", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "%", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "/", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "*", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "-", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "+", emit: "", "is-terminal": 1, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "expression'", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: ",?", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "internal_list", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "&embedded_2?", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "&embedded_2", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "String+", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "opt_expression", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "list?", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "list", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "trailer+", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "trailer", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "atom", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "factor", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "pow", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "unary", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "mul_div", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "&embedded_1+", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "&embedded_1", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "&embedded_0", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "add_sub", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "cmp", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "not", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "and", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "or", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 },
    { symbol: "expression", emit: "", "is-terminal": 0, "is-lexem": !1, "is-whitespace": !1, "is-greedy": !0 }
  ],
  productions: [
    { production: 'expression : or "if" expression "else" expression', emit: "if", length: 5, "left-hand-side": 62 },
    { production: "expression : or", emit: "", length: 1, "left-hand-side": 62 },
    { production: 'or : or "or" and', emit: "or", length: 3, "left-hand-side": 61 },
    { production: "or : and", emit: "", length: 1, "left-hand-side": 61 },
    { production: 'and : and "and" not', emit: "and", length: 3, "left-hand-side": 60 },
    { production: "and : not", emit: "", length: 1, "left-hand-side": 60 },
    { production: 'not : "not" not', emit: "not", length: 2, "left-hand-side": 59 },
    { production: "not : cmp", emit: "", length: 1, "left-hand-side": 59 },
    { production: "cmp : add_sub &embedded_1+", emit: "cmp", length: 2, "left-hand-side": 58 },
    { production: '&embedded_1 : "==" add_sub', emit: "eq", length: 2, "left-hand-side": 55 },
    { production: '&embedded_1 : ">" add_sub', emit: "gt", length: 2, "left-hand-side": 55 },
    { production: '&embedded_1 : ">=" add_sub', emit: "gteq", length: 2, "left-hand-side": 55 },
    { production: '&embedded_1 : "<" add_sub', emit: "lt", length: 2, "left-hand-side": 55 },
    { production: '&embedded_1 : "<=" add_sub', emit: "lteq", length: 2, "left-hand-side": 55 },
    { production: '&embedded_0 : "!="', emit: "", length: 1, "left-hand-side": 56 },
    { production: '&embedded_0 : "<>"', emit: "", length: 1, "left-hand-side": 56 },
    { production: "&embedded_1 : &embedded_0 add_sub", emit: "neq", length: 2, "left-hand-side": 55 },
    { production: '&embedded_1 : "in" add_sub', emit: "in", length: 2, "left-hand-side": 55 },
    { production: '&embedded_1 : "not" "in" add_sub', emit: "outer", length: 3, "left-hand-side": 55 },
    { production: "&embedded_1+ : &embedded_1+ &embedded_1", emit: "", length: 2, "left-hand-side": 54 },
    { production: "&embedded_1+ : &embedded_1", emit: "", length: 1, "left-hand-side": 54 },
    { production: "cmp : add_sub", emit: "", length: 1, "left-hand-side": 58 },
    { production: "add_sub : add_sub '+' mul_div", emit: "add", length: 3, "left-hand-side": 57 },
    { production: "add_sub : add_sub '-' mul_div", emit: "sub", length: 3, "left-hand-side": 57 },
    { production: "add_sub : mul_div", emit: "", length: 1, "left-hand-side": 57 },
    { production: "mul_div : mul_div '*' unary", emit: "mul", length: 3, "left-hand-side": 53 },
    { production: "mul_div : mul_div '/' unary", emit: "div", length: 3, "left-hand-side": 53 },
    { production: 'mul_div : mul_div "//" unary', emit: "idiv", length: 3, "left-hand-side": 53 },
    { production: "mul_div : mul_div '%' unary", emit: "mod", length: 3, "left-hand-side": 53 },
    { production: "mul_div : pow", emit: "", length: 1, "left-hand-side": 53 },
    { production: 'pow : pow "**" unary', emit: "pow", length: 3, "left-hand-side": 51 },
    { production: "pow : unary", emit: "", length: 1, "left-hand-side": 51 },
    { production: "unary : '+' unary", emit: "pos", length: 2, "left-hand-side": 52 },
    { production: "unary : '-' unary", emit: "neg", length: 2, "left-hand-side": 52 },
    { production: "unary : '~' unary", emit: "invert", length: 2, "left-hand-side": 52 },
    { production: "unary : factor", emit: "", length: 1, "left-hand-side": 52 },
    { production: "factor : atom", emit: "", length: 1, "left-hand-side": 50 },
    { production: "factor : atom trailer+", emit: "entity", length: 2, "left-hand-side": 50 },
    { production: "trailer+ : trailer+ trailer", emit: "", length: 2, "left-hand-side": 47 },
    { production: "trailer+ : trailer", emit: "", length: 1, "left-hand-side": 47 },
    { production: "factor : @Identifier '(' list? ')'", emit: "call", length: 4, "left-hand-side": 50 },
    { production: "list? : list", emit: "", length: 1, "left-hand-side": 45 },
    { production: "list? : ", emit: "", length: 0, "left-hand-side": 45 },
    { production: "opt_expression : expression", emit: "", length: 1, "left-hand-side": 44 },
    { production: "opt_expression : ", emit: "None", length: 0, "left-hand-side": 44 },
    { production: "trailer : '[' expression ']'", emit: "index", length: 3, "left-hand-side": 48 },
    { production: "trailer : '[' opt_expression ':' opt_expression ']'", emit: "slice", length: 5, "left-hand-side": 48 },
    { production: "trailer : '.' @Identifier", emit: "attr", length: 2, "left-hand-side": 48 },
    { production: 'atom : "True"', emit: "", length: 1, "left-hand-side": 49 },
    { production: 'atom : "False"', emit: "", length: 1, "left-hand-side": 49 },
    { production: 'atom : "None"', emit: "", length: 1, "left-hand-side": 49 },
    { production: 'atom : "$"', emit: "vars", length: 1, "left-hand-side": 49 },
    { production: "atom : @Number", emit: "", length: 1, "left-hand-side": 49 },
    { production: "atom : @Identifier", emit: "load", length: 1, "left-hand-side": 49 },
    { production: "atom : @String", emit: "", length: 1, "left-hand-side": 49 },
    { production: "String+ : String+ @String", emit: "", length: 2, "left-hand-side": 43 },
    { production: "String+ : @String", emit: "", length: 1, "left-hand-side": 43 },
    { production: "atom : String+", emit: "strings", length: 1, "left-hand-side": 49 },
    { production: `atom : '[' expression "for" @Identifier "in" or &embedded_2? ']'`, emit: "comprehension", length: 8, "left-hand-side": 49 },
    { production: '&embedded_2 : "if" expression', emit: "", length: 2, "left-hand-side": 42 },
    { production: "&embedded_2? : &embedded_2", emit: "", length: 1, "left-hand-side": 41 },
    { production: "&embedded_2? : ", emit: "", length: 0, "left-hand-side": 41 },
    { production: "atom : '[' list ']'", emit: "", length: 3, "left-hand-side": 49 },
    { production: "atom : '(' expression ',' ')'", emit: "list", length: 4, "left-hand-side": 49 },
    { production: "atom : '(' expression ',' internal_list ,? ')'", emit: "list", length: 6, "left-hand-side": 49 },
    { production: ",? : ','", emit: "", length: 1, "left-hand-side": 39 },
    { production: ",? : ", emit: "", length: 0, "left-hand-side": 39 },
    { production: "atom : '(' expression ')'", emit: "", length: 3, "left-hand-side": 49 },
    { production: "internal_list : expression", emit: "", length: 1, "left-hand-side": 40 },
    { production: "internal_list : internal_list ',' expression", emit: "", length: 3, "left-hand-side": 40 },
    { production: "list : internal_list ,?", emit: "list", length: 2, "left-hand-side": 46 },
    { production: "expression' : expression ~&eof", emit: "", length: 2, "left-hand-side": 38 }
  ],
  goal: 38
}), ae(_e, ee, {
  select: [],
  index: [
    [0, 44, 53, 54, 58, 59, 60, 62, 65, 66, 69, 71, 73, 74, 75, 76, 78, 79, 80, 81, 82, 87, 92, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 115, 120, 125, 130, 135, 140, 142, 149, 150, 152, 158, 165, 169, 174, 180, 187, 189, 196, 198, 205, 209, 215, 217, 224, 231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301, 308]
  ],
  chars: [
    111,
    111,
    126,
    126,
    9,
    10,
    13,
    13,
    32,
    32,
    65,
    69,
    71,
    77,
    79,
    83,
    85,
    90,
    95,
    95,
    98,
    100,
    103,
    104,
    106,
    109,
    112,
    122,
    110,
    110,
    105,
    105,
    102,
    102,
    101,
    101,
    97,
    97,
    93,
    93,
    91,
    91,
    84,
    84,
    78,
    78,
    70,
    70,
    62,
    62,
    61,
    61,
    60,
    60,
    58,
    58,
    48,
    57,
    47,
    47,
    46,
    46,
    45,
    45,
    44,
    44,
    43,
    43,
    42,
    42,
    41,
    41,
    40,
    40,
    39,
    39,
    37,
    37,
    36,
    36,
    35,
    35,
    34,
    34,
    33,
    33,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    101,
    103,
    109,
    111,
    122,
    110,
    110,
    102,
    102,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    13,
    13,
    32,
    32,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    61,
    61,
    -1,
    -1,
    62,
    62,
    61,
    61,
    -1,
    -1,
    -1,
    -1,
    48,
    57,
    46,
    46,
    -1,
    -1,
    47,
    47,
    -1,
    -1,
    48,
    57,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    42,
    42,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    61,
    61,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    110,
    112,
    122,
    111,
    111,
    -1,
    -1,
    -1,
    -1,
    48,
    57,
    -1,
    -1,
    92,
    92,
    39,
    39,
    0,
    38,
    40,
    91,
    93,
    65535,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    113,
    115,
    122,
    114,
    114,
    -1,
    -1,
    10,
    10,
    0,
    9,
    11,
    65535,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    122,
    -1,
    -1,
    92,
    92,
    34,
    34,
    0,
    33,
    35,
    91,
    93,
    65535,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    107,
    109,
    122,
    108,
    108,
    -1,
    -1,
    61,
    61,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    109,
    111,
    122,
    110,
    110,
    -1,
    -1,
    0,
    65535,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    113,
    115,
    122,
    114,
    114,
    -1,
    -1,
    0,
    9,
    11,
    65535,
    10,
    10,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    98,
    122,
    97,
    97,
    -1,
    -1,
    0,
    65535,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    115,
    117,
    122,
    116,
    116,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    113,
    115,
    122,
    114,
    114,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    114,
    116,
    122,
    115,
    115,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    99,
    101,
    122,
    100,
    100,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    116,
    118,
    122,
    117,
    117,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    100,
    102,
    122,
    101,
    101,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    100,
    102,
    122,
    101,
    101,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    100,
    102,
    122,
    101,
    101,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    100,
    102,
    122,
    101,
    101,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    110,
    112,
    122,
    111,
    111,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    109,
    111,
    122,
    110,
    110,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    114,
    116,
    122,
    115,
    115,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    110,
    112,
    122,
    111,
    111,
    -1,
    -1,
    48,
    57,
    65,
    90,
    95,
    95,
    97,
    107,
    109,
    122,
    108,
    108,
    -1,
    -1
  ],
  transitions: [
    43,
    2,
    3,
    3,
    3,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    39,
    1,
    64,
    47,
    49,
    4,
    5,
    51,
    67,
    53,
    6,
    38,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    42,
    18,
    19,
    44,
    46,
    48,
    -1,
    45,
    45,
    45,
    45,
    45,
    45,
    20,
    21,
    -1,
    -1,
    3,
    3,
    3,
    -1,
    -1,
    -1,
    23,
    -1,
    25,
    26,
    -1,
    -1,
    9,
    41,
    -1,
    27,
    -1,
    41,
    -1,
    -1,
    -1,
    -1,
    28,
    -1,
    -1,
    -1,
    -1,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    45,
    45,
    45,
    45,
    -1,
    24,
    -1,
    45,
    45,
    45,
    45,
    45,
    55,
    -1,
    -1,
    41,
    -1,
    50,
    29,
    42,
    42,
    42,
    -1,
    45,
    45,
    45,
    45,
    45,
    22,
    -1,
    40,
    52,
    52,
    -1,
    45,
    45,
    45,
    45,
    -1,
    54,
    29,
    46,
    46,
    46,
    -1,
    45,
    45,
    45,
    45,
    45,
    57,
    -1,
    30,
    -1,
    45,
    45,
    45,
    45,
    45,
    58,
    -1,
    42,
    -1,
    45,
    45,
    45,
    45,
    45,
    59,
    -1,
    52,
    52,
    40,
    -1,
    45,
    45,
    45,
    45,
    68,
    -1,
    46,
    -1,
    45,
    45,
    45,
    45,
    45,
    31,
    -1,
    45,
    45,
    45,
    45,
    45,
    32,
    -1,
    45,
    45,
    45,
    45,
    45,
    60,
    -1,
    45,
    45,
    45,
    45,
    45,
    33,
    -1,
    45,
    45,
    45,
    45,
    45,
    61,
    -1,
    45,
    45,
    45,
    45,
    45,
    34,
    -1,
    45,
    45,
    45,
    45,
    45,
    35,
    -1,
    45,
    45,
    45,
    45,
    45,
    36,
    -1,
    45,
    45,
    45,
    45,
    45,
    37,
    -1,
    45,
    45,
    45,
    45,
    45,
    56,
    -1,
    45,
    45,
    45,
    45,
    45,
    62,
    -1,
    45,
    45,
    45,
    45,
    45,
    63,
    -1,
    45,
    45,
    45,
    45,
    45,
    65,
    -1,
    45,
    45,
    45,
    45,
    45,
    66,
    -1
  ],
  accept: [
    [0, 24, 33, 25, 29, 30, 15, 13, 28, 23, 35, 27, 37, 26, 38, 36, 31, 32, 34, 3, 9, 21, 19, 14, 16, 10, 12, 8, 7, 22, 11, 17, 2, 18, 20, 6, 4, 5, 0, 24, 25, 23, 0, 24, 0, 24, 0, 24, 0, 24, 0, 24, 0, 24, 0, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
  ]
}), ae(_e, te, {
  action: [
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 31: [2, 17] },
    { 21: [1, 56] },
    { 0: [3, 71] },
    { 20: [2, 18], 18: [2, 19] },
    { 17: [2, 20] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 16: [2, 21], 15: [2, 22], 14: [2, 23], 13: [2, 24], 12: [2, 25], 11: [2, 26], 10: [3, 14], 9: [3, 15], 8: [2, 28], 37: [2, 30], 36: [2, 31] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 35: [2, 32], 34: [2, 33], 7: [2, 34], 33: [2, 35] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 6: [2, 36] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 29: [2, 38], 26: [2, 39] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 21: [3, 55] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 8: [2, 47] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 16: [2, 21], 15: [2, 22], 14: [2, 23], 13: [2, 24], 12: [2, 25], 11: [2, 26], 10: [3, 14], 9: [3, 15], 8: [2, 28] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 29: [2, 38], 26: [2, 39] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [3, 47] },
    { 30: [3, 67], 25: [2, 59] },
    { 1: [2, 60] },
    { 28: [3, 62] },
    { 25: [2, 61] },
    { 30: [3, 40] },
    { 19: [2, 62] },
    { 17: [2, 20] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 37: [2, 30], 36: [2, 31] },
    { 37: [2, 30], 36: [2, 31] },
    { 37: [2, 30], 36: [2, 31] },
    { 37: [2, 30], 36: [2, 31] },
    { 37: [2, 30], 36: [2, 31] },
    { 37: [2, 30], 36: [2, 31] },
    { 37: [2, 30], 36: [2, 31] },
    { 35: [2, 32], 34: [2, 33], 7: [2, 34], 33: [2, 35] },
    { 35: [2, 32], 34: [2, 33], 7: [2, 34], 33: [2, 35] },
    { 28: [3, 45] },
    { 27: [2, 64] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 30: [3, 63], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 66] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 37: [2, 30], 36: [2, 31] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 25: [2, 61] },
    { 8: [2, 69] },
    { 28: [3, 46] },
    { 30: [3, 64] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 20: [2, 71], 18: [2, 19] },
    { 23: [2, 1], 22: [3, 52], 21: [2, 2], 16: [2, 6], 37: [2, 8], 36: [2, 10], 32: [2, 12], 31: [2, 14], 29: [2, 15], 5: [3, 48], 4: [3, 49], 3: [3, 50], 2: [3, 51] },
    { 28: [3, 58] }
  ],
  goto: [
    { 62: [2, 3], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {},
    {},
    {},
    {},
    {},
    { 59: [3, 6], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 56: [2, 27], 55: [3, 20], 54: [2, 29] },
    { 52: [3, 32], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {},
    { 52: [3, 33], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {},
    { 52: [3, 34], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 48: [3, 39], 47: [2, 37] },
    { 62: [2, 40], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 62: [2, 41], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 46: [2, 42], 43: [2, 16], 40: [2, 43] },
    {},
    { 62: [3, 68], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 46: [3, 41], 45: [2, 44], 43: [2, 16], 40: [2, 43] },
    { 62: [2, 45], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 60: [2, 46], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 59: [3, 4], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {},
    { 57: [2, 48], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 57: [2, 49], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 57: [2, 50], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 57: [2, 51], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 57: [2, 52], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 57: [2, 53], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 57: [2, 54], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 56: [2, 27], 55: [3, 19] },
    { 53: [2, 55], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 53: [2, 56], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 52: [3, 25], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 52: [3, 26], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 52: [3, 27], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 52: [3, 28], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 52: [3, 30], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 48: [3, 38] },
    { 62: [2, 57], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 44: [2, 58], 43: [2, 16] },
    {},
    {},
    {},
    {},
    { 39: [3, 70] },
    {},
    {},
    {},
    { 57: [2, 63], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    { 62: [3, 68], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16], 40: [2, 65] },
    {},
    { 62: [3, 69], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 62: [3, 0], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {},
    { 62: [3, 43], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 44: [2, 67], 43: [2, 16] },
    { 39: [2, 68] },
    {},
    {},
    {},
    { 61: [2, 70], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    { 42: [3, 60], 41: [2, 72] },
    { 62: [3, 59], 61: [2, 4], 60: [2, 5], 59: [3, 5], 58: [3, 7], 57: [2, 7], 53: [2, 9], 52: [3, 31], 51: [2, 11], 50: [3, 35], 49: [2, 13], 43: [2, 16] },
    {}
  ],
  "default-production": [
    -1,
    53,
    54,
    -1,
    1,
    3,
    -1,
    21,
    -1,
    24,
    -1,
    29,
    -1,
    36,
    -1,
    -1,
    57,
    42,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    37,
    44,
    -1,
    -1,
    68,
    -1,
    66,
    -1,
    -1,
    2,
    -1,
    9,
    10,
    11,
    12,
    13,
    16,
    17,
    22,
    23,
    43,
    -1,
    -1,
    -1,
    65,
    -1,
    18,
    44,
    66,
    -1,
    -1,
    -1,
    -1,
    61,
    -1,
    -1
  ]
});
var j, fe;
const E = class E {
  // private property: Logics type name
  /** Constructs a Logics value from a native JS-value, or clones an existing Logics value.
  In case the native value is not JSON-serializable, an Exception is thrown. */
  constructor(t) {
    ae(this, j);
    // private property: The native value in JavaScript
    ae(this, fe);
    t instanceof E ? (ye(this, j, t.valueOf()), ye(this, fe, t.type())) : (ye(this, j, t), ye(this, fe, this.constructor.type(t)));
  }
  /// Return value's native JS value
  valueOf() {
    return I(this, j);
  }
  /// Returns the Logics value type; The type is cached in this.#type, for further usage.
  type() {
    return I(this, fe) || ye(this, fe, this.constructor.type(I(this, j)));
  }
  /// Determine Logics value type from a JavaScript native value
  static type(t) {
    switch (typeof t) {
      case "undefined":
        return "NoneType";
      case "boolean":
        return "bool";
      case "number":
        return t % 1 === 0 ? "int" : "float";
      case "string":
        return "str";
      case "object":
        if (t instanceof Array) {
          for (let n of t)
            if (!this.type(n))
              throw new Error("Cannot fully convert Array into a valid Logics type");
          return "list";
        } else if (t === null)
          return "NoneType";
        for (let n of Object.keys(t))
          if (!this.type(t[n]))
            throw new Error("Cannot fully convert Object into a valid Logics type");
        return "dict";
    }
  }
  /// Return the value's representation
  repr() {
    switch (this.type()) {
      case "NoneType":
        return "None";
      case "bool":
        return I(this, j) ? "True" : "False";
      case "int":
      case "float":
        return I(this, j).toString();
      case "str":
        return '"' + I(this, j).toString().replace(/([\\"])/, "\\$1") + '"';
      case "list":
        return "[" + I(this, j).map(
          (t) => (t instanceof E || (t = new E(t)), t.repr())
        ).join(", ") + "]";
      case "dict":
        return "{" + Object.keys(I(this, j)).map(
          (t) => {
            t instanceof E || (t = new E(t));
            let n = I(this, j)[t];
            return n instanceof E || (n = new E(n)), t + ": " + n.repr();
          }
        ).join(", ") + "}";
      default:
        throw new Error("Unimplemented repr for " + this.type());
    }
  }
  /**
   * Convert Value as Logics string representation.
   */
  toString() {
    switch (this.type()) {
      case "str":
      case "float":
      case "int":
        return I(this, j).toString();
      default:
        return this.repr();
    }
  }
  // Returns JS-native boolean value.
  toBool() {
    return !!I(this, j);
  }
  // Returns JS-native int value.
  toInt() {
    return I(this, j) === !0 ? 1 : parseInt(I(this, j)) || 0;
  }
  // Returns JS-native float value.
  toFloat() {
    return I(this, j) === !0 ? 1 : parseFloat(I(this, j)) || 0;
  }
  // Returns JS-native list value.
  toList() {
    let t = this.type();
    return t === "list" ? I(this, j) : t ? [I(this, j)] : null;
  }
  // Returns JS-native dict value.
  toDict() {
    let t = this.type();
    if (t === "dict")
      return I(this, j);
    if (t) {
      let n = {};
      return n[I(this, j)] = I(this, j), n;
    }
    return null;
  }
  // Retrieve length of object
  __len__() {
    switch (this.type()) {
      case "dict":
        return Object.keys(I(this, j)).length;
      case "list":
        return I(this, j).length;
      default:
        return this.toString().length;
    }
  }
  // Checks if a given value is part of another value
  __contains__(t) {
    if (t.type() === "dict")
      return t.valueOf()[this.toString()] !== void 0;
    if (t.type() === "list") {
      for (let n of t.valueOf())
        if (n = new E(n), n.__cmp__(this) === 0)
          return !0;
      return !1;
    }
    return t.toString().indexOf(this.toString()) >= 0;
  }
  // Index into value
  __getitem__(t, n) {
    if (this.type() === "dict")
      return console.assert(n === void 0, "Cannot slice into a dict"), this.toDict()[t.toString()];
    let s = this.type() === "list" ? this.toList() : this.toString(), i = t.valueOf() === null ? 0 : t.toInt();
    if (i < 0 && (i = s.length + i), n === void 0)
      return s[i];
    let o = n.valueOf() === null ? s.length : n.toInt();
    return o < 0 && (o = s.length + o), s.slice(i, o);
  }
  // Compare
  __cmp__(t) {
    let n, s;
    if (this.type() === "dict" || t.type() === "dict") {
      n = this.toDict(), s = t.toDict();
      let i = Object.keys(n), o = Object.keys(s);
      if (i.length < o.length)
        return -1;
      if (i.length > o.length)
        return 1;
      for (let r of i) {
        if (typeof s[r] > "u")
          return 1;
        let l = new E(n[r]), a = new E(s[r]), u;
        if ((u = l.__cmp__(a)) !== 0)
          return u;
      }
      return 0;
    } else if (this.type() === "list" || t.type() === "list") {
      if (n = this.toList(), s = t.toList(), n.length < s.length)
        return -1;
      if (n.length > s.length)
        return 1;
      for (let i = 0; i < n.length; i++) {
        let o = new E(n[i]), r = new E(s[i]), l;
        if ((l = o.__cmp__(r)) !== 0)
          return l;
      }
      return 0;
    } else this.type() === "str" || t.type() === "str" ? (n = this.toString(), s = t.toString()) : this.type() === "float" || t.type() === "float" ? (n = this.toFloat(), s = t.toFloat()) : (n = this.toInt(), s = t.toInt());
    return n < s ? -1 : n > s ? 1 : 0;
  }
  // Performs an add-operation with another Value object.
  __add__(t) {
    return this.type() === "str" || t.type() === "str" ? new E(this.toString() + t.toString()) : this.type() === "float" || t.type() === "float" ? new E(this.toFloat() + t.toFloat()) : new E(this.toInt() + t.toInt());
  }
  // Performs a sub-operation with another Value object.
  __sub__(t) {
    return this.type() === "float" || t.type() === "float" ? new E(this.toFloat() - t.toFloat()) : new E(this.toInt() - t.toInt());
  }
  // Performs a mul-operation with another Value object.
  __mul__(t) {
    if (this.type() === "str" || t.type() === "str") {
      let n, s;
      return this.type() === "str" ? (n = this.toString(), s = t.toInt()) : (n = t.toString(), s = this.toInt()), s * n.length > E.maxStringLength ? new E(`#ERR limit of ${E.maxStringLength} reached`) : new E(n.repeat(s));
    }
    return this.type() === "float" || t.type() === "float" ? new E(this.toFloat() * t.toFloat()) : new E(this.toInt() * t.toInt());
  }
  // Performs a div-operation with another Value object.
  __truediv__(t) {
    if (this.type() === "float" || t.type() === "float") {
      let s = t.toFloat();
      return s === 0 ? new E("#ERR:division by zero") : new E(this.toFloat() / s);
    }
    let n = t.toInt();
    return n === 0 ? new E("#ERR:division by zero") : new E(this.toInt() / n);
  }
  __floordiv__(t) {
    let n = t.toInt();
    return n === 0 ? new E("#ERR:division by zero") : new E(Math.floor(this.toInt() / n));
  }
  // Performs a mod-operation with another Value object.
  __mod__(t) {
    if (this.type() === "float" || t.type() === "float") {
      let s = t.toFloat();
      return s === 0 ? new E("#ERR:modulo by zero") : new E(this.toFloat() % s);
    }
    let n = t.toInt();
    return n === 0 ? new E("#ERR:modulo by zero") : new E(this.toInt() % n);
  }
  // Performs a mod-operation with another Value object.
  __pow__(t) {
    return this.type() === "float" || t.type() === "float" ? new E(this.toFloat() ** t.toFloat()) : new E(this.toInt() ** t.toInt());
  }
  // Performs unary plus
  __pos__() {
    return this.type() === "float" ? new E(+this.toFloat()) : new E(+this.toInt());
  }
  // Performs unary minus
  __neg__() {
    return this.type() === "float" ? new E(-this.toFloat()) : new E(-this.toInt());
  }
  // Performs unary complement
  __invert__() {
    return new E(~this.toInt());
  }
};
j = new WeakMap(), fe = new WeakMap(), Pe(E, "maxStringLength", 32 * 1024);
let ke = E;
function kr(e) {
  function t(n) {
    const s = n.slice(1);
    if ("xuU".includes(s[0]))
      try {
        return String.fromCodePoint(parseInt(s.slice(1), 16));
      } catch {
        return s;
      }
    return {
      a: "\x07",
      b: "\b",
      f: "\f",
      n: `
`,
      r: "\r",
      t: "	",
      v: "\v"
    }[s] || s;
  }
  return e.replace(/\\(?:\\|'|"|a|b|f|n|r|t|v|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g, t);
}
var Ne;
const Ie = class Ie {
  /** Create a new VM with a given piece of code. */
  constructor(t, {
    debug: n = !1
  } = {}) {
    this.ast = I(this.constructor, Ne).parse(t), this.debug = !!n, this.debug && this.ast.dump(), this.functions = {
      bool: (s) => s.toBool(),
      currency: (s, i, o, r) => "#todo",
      // todo
      float: (s) => s.toFloat(),
      int: (s) => s.toInt(),
      join: (s, i, o) => s.toList().join(i && i.toString() || ", "),
      keys: (s) => Object.keys(s.toDict().valueOf()),
      len: (s) => s.__len__(),
      lfill: (s, i, o) => s.toString().padStart(i, o),
      lower: (s) => s.toString().toLowerCase(),
      lstrip: (s) => s.toString().trimStart(),
      max: (s) => Math.max(...s.toList().valueOf().map((i) => parseFloat(i) || 0)),
      min: (s) => Math.min(...s.toList().valueOf().map((i) => parseFloat(i) || 0)),
      range: (s, i, o) => (s = s.toInt() || 0, i === void 0 ? (i = s || 0, s = 0) : i = i.toInt() || 0, i < s && (s = i), o = o && o.toInt() || 1, o <= 0 ? [] : [...Array(Math.ceil((i - s) / o)).keys()].map((r) => s + r * o)),
      replace: (s, i, o) => s.toString().replaceAll(
        i && i.toString() || " ",
        o && o.toString() || ""
      ),
      rfill: (s, i, o) => s.toString().padEnd(i, o),
      round: (s, i) => parseFloat(s.toFloat().toFixed(i && i.toInt() || 0)),
      rstrip: (s) => s.toString().trimEnd(),
      split: (s, i) => s.toString().split(i && i.toString() || " "),
      str: (s) => s.toString(),
      strip: (s) => s.toString().trim(),
      sum: (s) => s.toList().valueOf().map((i) => parseFloat(i) || 0).reduce((i, o) => i + o, 0),
      upper: (s) => s.toString().toUpperCase(),
      values: (s) => Object.values(s.toDict().valueOf())
    };
  }
  /** Run the VM with a given set of values.
   * Returns the topmost value of the stack, if any. */
  run(t) {
    let n = [];
    return n.op0 = function(s) {
      s instanceof ke || (s = new ke(s)), this.push(s);
    }, n.op1 = function(s) {
      this.op0(s(this.pop()));
    }, n.op2 = function(s) {
      let i = this.pop();
      this.op0(s(this.pop(), i));
    }, n.op3 = function(s) {
      let i = this.pop(), o = this.pop();
      this.op0(s(this.pop(), o, i));
    }, this.traverse(this.ast, n, Object.assign({}, t || {})), n.pop();
  }
  /**
   * General traversal function.
   *
   * This function performs pre, loop or pass and post operations.
   * @param node
   * @param stack
   * @param values
   */
  traverse(t, n, s) {
    function i(o, r) {
      let l;
      return (l = r[o]) !== void 0 ? l() ?? !0 : (l = r._) !== void 0 ? l() : !1;
    }
    if (!i(t.emit, {
      and: () => {
        console.assert(t.children.length === 2), this.traverse(t.children[0], n, s);
        let o = n.pop();
        o.toBool() ? this.traverse(t.children[1], n, s) : n.push(o);
      },
      call: () => {
        let o = [];
        t.children.length === 2 && (this.traverse(t.children[1], n, s), o = n.pop().toList());
        let r = this.functions[t.children[0].match];
        if (r !== void 0) {
          for (let l in o)
            o[l] = new ke(o[l]);
          n.op0(r(...o));
        } else
          throw new Error(`Call to unknown function: ${t.children[0].match}`);
      },
      comprehension: () => {
        console.assert(t.children.length === 3 || t.children.length === 4), this.traverse(t.children[2], n, s);
        let o = n.pop().toList().valueOf(), r = t.children[0], l = t.children[1].match, a = t.children[3], u = [], g = 0;
        for (let f of o) {
          if (++g > Ie.maxForIterations)
            break;
          s[l] = f, !(a !== void 0 && (this.traverse(a, n, s), !n.pop().toBool())) && (this.traverse(r, n, s), u.push(n.pop()));
        }
        n.op0(u);
      },
      if: () => {
        console.assert(t.children.length === 3), this.traverse(t.children[1], n, s), this.traverse(t.children[n.pop().toBool() ? 0 : 2], n, s);
      },
      or: () => {
        console.assert(t.children.length === 2), this.traverse(t.children[0], n, s);
        let o = n.pop();
        o.toBool() ? n.push(o) : this.traverse(t.children[1], n, s);
      },
      cmp: () => {
        for (let o = 0; o < t.children.length; o++) {
          if (this.traverse(t.children[o], n, s), o === 0)
            continue;
          let r = n.pop(), l = n.pop(), a = i(t.children[o].emit, {
            eq: () => l.__cmp__(r) === 0,
            gteq: () => l.__cmp__(r) >= 0,
            gt: () => l.__cmp__(r) > 0,
            lteq: () => l.__cmp__(r) <= 0,
            lt: () => l.__cmp__(r) < 0,
            neq: () => l.__cmp__(r) !== 0,
            in: () => l.__contains__(r),
            outer: () => !l.__contains__(r),
            _: () => console.log("unreachable")
          });
          if (n.op0(a ? o === t.children.length - 1 ? !0 : r : !1), !a)
            break;
        }
      }
    }) && (t.children ?? !1))
      for (let o of t.children)
        this.traverse(o, n, s);
    return i(t.emit, {
      // Pushing values
      False: () => n.op0(!1),
      Identifier: () => n.op0(t.match),
      None: () => n.op0(null),
      Number: () => n.op0(parseFloat(t.match)),
      String: () => n.op0(kr(t.match.substring(1, t.match.length - 1))),
      // cut "..." from string.
      True: () => n.op0(!0),
      // Operations
      add: () => n.op2((o, r) => o.__add__(r)),
      attr: () => n.op2((o, r) => o.toDict()[r]),
      div: () => n.op2((o, r) => o.__truediv__(r)),
      idiv: () => n.op2((o, r) => o.__floordiv__(r)),
      invert: () => n.op1((o) => o.__invert__()),
      list: () => n.op0(n.splice(-t.children.length).map((o) => o.valueOf())),
      mod: () => n.op2((o, r) => o.__mod__(r)),
      mul: () => n.op2((o, r) => o.__mul__(r)),
      neg: () => n.op1((o) => o.__neg__()),
      not: () => n.op1((o) => !o.toBool()),
      pos: () => n.op1((o) => o.__pos__()),
      pow: () => n.op2((o, r) => o.__pow__(r)),
      index: () => n.op2((o, r) => o.__getitem__(r)),
      load: () => n.op1((o) => s[o.toString()]),
      slice: () => n.op3((o, r, l) => o.__getitem__(r, l)),
      strings: () => n.op0(n.splice(-t.children.length).join("")),
      sub: () => n.op2((o, r) => o.__sub__(r)),
      vars: () => n.op0(s)
    });
  }
};
Ne = new WeakMap(), ae(Ie, Ne, new _e()), Pe(Ie, "maxForIterations", 4 * 1024);
let Se = Ie;
window !== void 0 && (window.Logics = Se);
function Ir(e, t) {
  function n() {
    let c = `/${e.renderer}/${e.module}/${e.action}`;
    const d = ["node", "leaf"].includes(e.skeltype);
    return e.group ? c += `/${e.group}` : d && (c += `/${e.skeltype}`), (["edit", "clone"].includes(e.action) || d && e.action === "add") && (c += `/${e.skelkey}`), c;
  }
  function s(c) {
    if (Array.isArray(c)) {
      let d = {};
      for (const v in c)
        d[c[v][0]] = c[v][1];
      return d;
    } else
      return c;
  }
  function i() {
    let c = [];
    function d(h, S, b, w) {
      var _, N, q;
      if (b.type.startsWith("record")) {
        let F = s(b.using);
        for (const [G, le] of Object.entries(F))
          h = h.concat(v(`${S}.${G}`, le, w == null ? void 0 : w[G]));
      } else if (w === Object(w) && b.using)
        if ((_ = w.dest) != null && _.key) {
          let F = s(b.using);
          for (const [G, le] of Object.entries(F))
            h = h.concat(v(`${S}.${G}`, le, (N = w.rel) == null ? void 0 : N[G]));
          h.push({ [`${S}.key`]: w.dest.key });
        } else
          h.push({ [`${S}`]: null });
      else b.type.startsWith("spatial") && w ? (h.push({ [S + ".lat"]: w[0] }), h.push({ [S + ".lng"]: w[1] })) : w === Object(w) ? h.push({ [S]: ((q = w.dest) == null ? void 0 : q.key) || null }) : h.push({ [S]: w });
      return h;
    }
    function v(h, S, b) {
      let w = [], _ = S.type.startsWith("record"), N = S.languages || ["none"], q = b;
      for (const F of N) {
        let G = h;
        if (F !== "none" && (G += `.${F}`, q && (b = q[F])), S.multiple) {
          b || (b = []);
          for (const [le, ve] of b.entries()) {
            let xe = G;
            (_ || ve != null && ve.rel) && (xe = `${G}.${le}`), w = d(w, xe, S, ve);
          }
          b.length === 0 && w.push({ [G]: null });
        } else
          w = d(w, G, S, b);
      }
      return w;
    }
    for (const [h, S] of Object.entries(t.structure))
      e.sendReadOnly ? c.push(v(h, S, t.skel[h])) : t.structure[h].readonly || c.push(v(h, S, t.skel[h]));
    return c = c.flat(10), c;
  }
  function o(c = null, d = null, v = !0) {
    t.loading = !0;
    let h = M.post;
    e.secure && (h = M.securePost);
    let S = n();
    c && (S = c);
    const b = new FormData();
    for (const _ of i())
      for (const [N, q] of Object.entries(_)) {
        let F = q || "";
        b.append(N, F);
      }
    let w = {};
    for (const _ of b.keys())
      _ === "key" && v || (w[[_]] = b.getAll(_));
    return d && (w = { ...w, ...d }), h(S, { dataObj: w }).then(async (_) => {
      let N = await _.clone().json();
      return t.skel = N.values, t.errors = N.errors, t.loading = !1, _;
    });
  }
  function r(c = null, d = null) {
    t.loading = !0;
    let v = M.post;
    e.secure && (v = M.securePost);
    let h = n();
    c && (h = c);
    let S = {};
    return d && (S = { ...S, ...d }), v(h, { dataObj: S }).then(async (b) => {
      let w = await b.clone().json();
      return f(w.values, w.structure), t.errors = w.errors, t.loading = !1, b;
    });
  }
  function l() {
    var v, h;
    t.structure || (t.structure = {});
    let c = { default: { name: "Allgemein", bones: [], visible: !1, open: !0 } };
    for (const [S, b] of Object.entries(t.structure)) {
      if (e.bones.length > 0 && !e.bones.includes(S))
        continue;
      let w = "default", _ = t.structure[S];
      (v = b == null ? void 0 : b.params) != null && v.category && (w = b.params.category.toLowerCase()), Object.keys(c).includes(w) ? c[w].bones.push({
        name: S
      }) : c[w] = {
        name: b.params.category,
        bones: [
          {
            name: S
          }
        ]
      }, _.visible === !0 && (c[w].visible = !0), e.collapsedCategories && e.collapsedCategories.map((N) => N.toLowerCase()).includes(w) || w === "system" || w === "internal" || ((h = e.collapsedCategories) == null ? void 0 : h[0]) === "*" ? c[w].open = !1 : c[w].open = !0;
    }
    let d = {};
    return Object.keys(c).sort().forEach(function(S) {
      d[S] = c[S];
    }), d;
  }
  function a(c) {
    const { name: d, lang: v, value: h, index: S } = c;
    let b = t.skel[d];
    if (h === void 0 || t.readonly) return !1;
    v ? (b || (b = {}), Object.keys(b).includes(v) && S !== null ? (b[v] || (b[v] = []), b[v][S] = h) : b[v] = h) : S !== null ? (b || (b = []), b[S] = h) : (b = h, t.skel[d] = b), g();
  }
  function u(c, d) {
    var v, h, S, b, w, _, N;
    for (const [q, F] of Object.entries(c)) {
      if ((v = F == null ? void 0 : F.params) != null && v.evaluate) {
        let G = new Se((h = F == null ? void 0 : F.params) == null ? void 0 : h.evaluate);
        t.skel[q] = G.run(d);
      }
      if ((S = F == null ? void 0 : F.params) != null && S.visibleIf)
        try {
          let G = new Se((b = F == null ? void 0 : F.params) == null ? void 0 : b.visibleIf);
          F.visible = G.run(d).toBool();
        } catch {
          console.log((w = F == null ? void 0 : F.params) == null ? void 0 : w.visibleIf);
        }
      if ((_ = F == null ? void 0 : F.params) != null && _.readonlyIf) {
        let G = new Se((N = F == null ? void 0 : F.params) == null ? void 0 : N.readonlyIf);
        F.readonly = G.run(d).toBool();
      }
      F != null && F.using && u(F.using, d);
    }
  }
  function g() {
    let c = t.skel;
    e.internal && (c = e.internal.skel), u(t.structure, c);
  }
  function f(c, d) {
    t.skel = c || {}, t.structure = s(d), t.categories = l();
  }
  return {
    fetchData: r,
    sendData: o,
    buildRequestUrl: n,
    updateCategories: l,
    updateSkel: a,
    normalizeStructure: s,
    initForm: f
  };
}
const Er = ["summary", "open"], Fr = {
  __name: "ViFormCategory",
  props: {
    // String shown a Category
    name: {
      type: String,
      required: !0
    },
    // internal identifiert mostly lowerCased name
    identifier: {
      type: String,
      required: !0
    },
    //is hidden
    visible: {
      type: Boolean,
      default: !0
    },
    //is open
    open: {
      type: Boolean,
      default: !0
    },
    //hide wrapper
    hide: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => e.hide ? me(t.$slots, "default", { key: 0 }, void 0, !0) : de((p(), y("sl-details", {
      key: 1,
      summary: e.name,
      open: e.open
    }, [
      me(t.$slots, "default", {}, void 0, !0)
    ], 8, Er)), [
      [mt, e.visible]
    ]);
  }
}, Ar = /* @__PURE__ */ x(Fr, [["__scopeId", "data-v-063de9c8"]]), xr = {
  __name: "LayoutCategory",
  setup(e) {
    const t = O("formState");
    return O("formUpdate"), (n, s) => (p(!0), y(C, null, L(B(t).categories, (i, o) => (p(), H(Ar, {
      name: i.name,
      identifier: o,
      visible: i.visible,
      open: i.open,
      hide: !B(t).useCategories
    }, {
      default: pt(() => [
        (p(!0), y(C, null, L(i.bones, (r) => me(n.$slots, "default", {
          key: r.name,
          boneName: r.name,
          widget: B(pe)(B(t).structure[r.name].type)
        })), 128))
      ]),
      _: 2
    }, 1032, ["name", "identifier", "visible", "open", "hide"]))), 256));
  }
}, Pr = {
  __name: "ViForm",
  props: {
    //modulename
    module: {
      type: String
    },
    //like add, edit, clone ...
    action: null,
    // groupedlists subtype
    group: null,
    // edit or clone need a existing skelkey
    skelkey: null,
    // trees need a skeltype like leaf or node
    skeltype: null,
    // use skey or not
    secure: {
      type: Boolean,
      default: !0
    },
    //the above fields are needed for normal form.
    //if skel and structure defined this will be used instead of fetchData
    skel: {
      type: [Object, null, String],
      default: null
    },
    structure: {
      type: [Object, Array],
      default: null
    },
    // show only these bones
    bones: {
      type: Array,
      default: []
    },
    //override server defaultvalues
    values: {
      type: Object,
      default: null
    },
    //used for fetch data
    params: {
      type: Object,
      default: {}
    },
    // define the renderer default is json
    renderer: {
      type: String,
      default: "json"
    },
    useCategories: {
      type: Boolean,
      default: !0
    },
    collapsedCategories: {
      type: Array,
      default: []
    },
    sendReadOnly: {
      type: Boolean,
      default: !1
    },
    internal: {
      type: [Object, null],
      default: null
    },
    layout: {
      type: Object,
      default: xr
    },
    label: {
      type: String,
      default: "normal",
      validator(e, t) {
        return ["normal", "top", "hide"].includes(e);
      }
    }
    // add errors, from the outside (maybe relevant if form is build with slots)
    // errors: []
  },
  emits: ["change"],
  setup(e, { expose: t, emit: n }) {
    const s = n, i = e, o = A({
      skel: {},
      // working data
      structure: {},
      // working data, use dict!
      errors: [],
      // working data
      loading: !1,
      //loading state
      categories: [],
      //categories to render
      values: P(() => i.values),
      internal: P(() => i.internal),
      useCategories: P(() => i.useCategories),
      label: P(() => i.label)
    });
    Ge("formState", o), i.internal || Ge("mainformState", o);
    const { fetchData: r, sendData: l, updateSkel: a, initForm: u } = Ir(i, o), g = er((c) => {
      s("change", c);
    }, 500);
    oe(() => {
      o.loading = !0, i.structure ? (u(i.skel, i.structure), o.loading = !1) : i.module && i.action ? r(null, i.params).then(async (c) => {
        o.loading = !1;
      }).catch(async (c) => {
        o.loading = !1;
      }) : (console.log(i), console.error("Error while building Form: you need atleast module and action or structure parameters"));
    }), be(() => i.skel, (c, d) => {
      u(i.skel, i.structure);
    });
    function f(c) {
      a(c), g(c);
    }
    return Ge("formUpdate", f), t({ sendData: l, fetchData: r, updateSkel: a, state: o }), (c, d) => {
      const v = we("bone");
      return me(c.$slots, "default", {
        structure: o.structure,
        skel: o.skel,
        errors: o.errors,
        categories: o.categories
      }, () => [
        (p(), H(ft(e.layout), null, {
          default: pt(({ boneName: h, widget: S, visible: b, label: w }) => [
            S !== void 0 ? de((p(), H(v, {
              key: 0,
              is: S,
              name: h,
              structure: o.structure,
              skel: o.skel,
              errors: o.errors,
              label: w === void 0 ? o.label : w,
              onChangeInternal: f
            }, null, 8, ["is", "name", "structure", "skel", "errors", "label"])), [
              [mt, b === void 0 ? o.structure[h].visible : b]
            ]) : $("", !0)
          ]),
          _: 1
        }))
      ]);
    };
  }
}, Vr = {
  key: 0,
  open: "",
  variant: "danger"
}, Mr = {
  key: 1,
  class: "form"
}, Or = {
  __name: "wrapper_nested",
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object,
    bone: Object
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t, s = e, i = W(null);
    O("boneState");
    const o = O("mainformState"), r = A({
      renderer: "json",
      globalRegistration: !1
    });
    function l(a) {
      a.value = i.value.state.skel, a.name = s.name, a.index = s.index, a.lang = s.lang, n("change", a);
    }
    return T(() => {
      bn().appContext.components.Bone ? r.globalRegistration = !0 : r.globalRegistration = !1, n("change", s.name, s.value, s.lang, s.index);
    }), (a, u) => {
      var g, f;
      return r.globalRegistration ? (p(), y("div", Mr, [
        he(Pr, {
          ref_key: "skelRef",
          ref: i,
          internal: B(o),
          skel: e.value,
          structure: e.bone.using,
          renderer: r.renderer,
          collapsedCategories: ((f = (g = e.bone) == null ? void 0 : g.params) == null ? void 0 : f.collapsedCategories) || [],
          onChange: l
        }, null, 8, ["internal", "skel", "structure", "renderer", "collapsedCategories"])
      ])) : (p(), y("sl-alert", Vr, " In Order to use this Bone register the bone component globally in your main file "));
    };
  }
}, bt = /* @__PURE__ */ x(Or, [["__scopeId", "data-v-41e8b948"]]), Dr = {
  __name: "recordBone",
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String,
    bone: Object
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t, s = e;
    A({});
    function i(o) {
      n("change", o.name, o.value, o.lang, o.index);
    }
    return T(() => {
      n("change", s.name, s.value, s.lang, s.index);
    }), (o, r) => (p(), H(bt, {
      value: e.value,
      name: e.name,
      index: e.index,
      lang: e.lang,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: i
    }, null, 8, ["value", "name", "index", "lang", "bone", "disabled"]));
  }
}, Bt = /* @__PURE__ */ x(Dr, [["__scopeId", "data-v-158aba44"]]), Lr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({});
    function i(o) {
      t.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), Br = ["disabled", "value"];
function jr(e, t, n, s, i, o) {
  return p(), y("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Br);
}
const jt = /* @__PURE__ */ x(Lr, [["render", jr], ["__scopeId", "data-v-67e2148c"]]), Nr = z({
  inheritAttrs: !1,
  emits: { change: null },
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    autofocus: Boolean
  },
  components: {},
  setup(e, t) {
    const n = O("boneState"), s = A({
      minAmount: P(() => n.bonestructure.minAmount),
      maxAmount: P(() => n.bonestructure.maxAmount),
      precision: P(() => {
        if (n.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(n.bonestructure.precision - 1)}1`);
      })
    }), i = W(null);
    function o(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return Ae(() => {
      if (e.autofocus && i.value && i.value !== null && i !== null) {
        const { start: r } = Te(() => {
          i.value.focus();
        }, 600);
        r();
      }
    }), T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: o,
      numericBone: i
    };
  }
}), zr = ["disabled", "value", "min", "max", "step"], Tr = { class: "info" }, Hr = { key: 0 }, Gr = { key: 1 }, Ur = { key: 2 };
function qr(e, t, n, s, i, o) {
  return p(), y(C, null, [
    m("sl-input", {
      ref: "numericBone",
      type: "number",
      disabled: e.boneState.readonly,
      value: e.value,
      min: e.state.minAmount,
      max: e.state.maxAmount,
      step: e.state.precision,
      onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r)),
      onKeyup: t[1] || (t[1] = (...r) => e.changeEvent && e.changeEvent(...r))
    }, null, 40, zr),
    m("ul", Tr, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (p(), y("li", Hr, V(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : $("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (p(), y("li", Gr, V(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : $("", !0),
      e.state.precision ? (p(), y("li", Ur, V(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : $("", !0)
    ])
  ], 64);
}
const Nt = /* @__PURE__ */ x(Nr, [["render", qr], ["__scopeId", "data-v-c3333ce1"]]), Wr = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone: Object
  },
  components: { Wrapper_nested: bt },
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = O("formatString"), i = A({
      format: P(() => n == null ? void 0 : n.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(a) {
      let u = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? u = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (u = "skelType=node&"), M.get(
        `/vi/${n.bonestructure.module}/list?${u}limit=99`
      ).then(async (g) => {
        var c;
        const f = await g.json();
        i.skellistdata = {};
        for (let d of f.skellist)
          i.skellistdata[d.key] = d;
        return (c = f.skellist) == null ? void 0 : c.map((d) => ({ text: s(n.bonestructure.format, { dest: d }), value: d.key, data: d }));
      });
    }
    function r(a) {
      i.selection = { dest: i.skellistdata[a.detail.item.value] }, t.emit("change", e.name, i.selection, e.lang, e.index);
    }
    function l(a) {
      i.selection = { ...i.selection, rel: a.value }, t.emit("change", a.name, i.selection, a.lang, a.index);
    }
    return T(() => {
      i.selection = e.value, t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      formatString: s,
      changeEvent: r,
      changeEventNested: l,
      getList: o
    };
  }
}), Kr = { class: "record" }, Xr = { class: "single-entry" }, Zr = ["value"], Jr = ["disabled", "source"], Qr = ["title"];
function Yr(e, t, n, s, i, o) {
  const r = we("Wrapper_nested");
  return p(), y("div", Kr, [
    m("div", Xr, [
      e.state.selection ? (p(), y("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Zr)) : (p(), y("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: t[0] || (t[0] = (...l) => e.changeEvent && e.changeEvent(...l))
      }, null, 40, Jr)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (p(), y("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: t[1] || (t[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, t[2] || (t[2] = [
        m("sl-icon", {
          slot: "prefix",
          name: "x-lg"
        }, null, -1)
      ]), 8, Qr)) : $("", !0)
    ]),
    e.bone.using ? (p(), H(r, {
      key: 0,
      value: e.value,
      name: e.name,
      index: e.index,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "bone", "disabled", "onChange"])) : $("", !0)
  ]);
}
const zt = /* @__PURE__ */ x(Wr, [["render", Yr], ["__scopeId", "data-v-d0aa8c6a"]]), eo = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({});
    function i(o, r) {
      t.emit("change", e.name, o, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), to = { class: "box" };
function no(e, t, n, s, i, o) {
  return p(), y("div", to, V(e.value), 1);
}
const so = /* @__PURE__ */ x(eo, [["render", no], ["__scopeId", "data-v-5b6fa95d"]]), io = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = W(), i = A({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    T(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o() {
      console.log(M.downloadUrlFor(e.value)), window.open(M.downloadUrlFor(e.value));
    }
    function r() {
      return M.downloadUrlFor(e.value, !1);
    }
    function l(g) {
      const f = {
        fileName: g.name,
        mimeType: g.type || "application/octet-stream",
        size: g.size.toString()
      };
      return new Promise((c, d) => {
        M.securePost("/vi/file/getUploadURL", { dataObj: f }).then(async (v) => {
          let h = await v.json();
          fetch(h.values.uploadUrl, {
            body: g,
            method: "POST",
            mode: "no-cors"
          }).then(async (S) => {
            const b = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            M.securePost("/vi/file/add", { dataObj: b }).then(async (w) => {
              let _ = await w.json();
              _.action === "addSuccess" ? c(_.values) : d(_);
            }).catch((w) => {
              d(w);
            });
          }).catch((S) => {
            d(S);
          });
        }).catch((v) => {
          d(v);
        });
      });
    }
    async function a(g) {
      i.loading = !0;
      for (let f of g.target.files) {
        let c = await l(f);
        s.value.value = null, t.emit("change", e.name, { dest: c, rel: null }, e.lang, e.index);
      }
      i.loading = !1;
    }
    async function u(g) {
      i.loading = !0, i.droparea = !1;
      for (let f of g.dataTransfer.files) {
        let c = await l(f);
        s.value.value = null, t.emit("change", e.name, { dest: c, rel: null }, e.lang, e.index);
        break;
      }
      i.loading = !1;
    }
    return {
      state: i,
      boneState: n,
      downloadFile: o,
      createBackgroundImage: r,
      handleUpload: a,
      uploadinput: s,
      handleDrop: u
    };
  }
}), ro = {
  key: 0,
  class: "loader"
}, oo = {
  key: 1,
  class: "droparea"
}, lo = ["title"], ao = ["multiple"], uo = ["title"], co = { class: "box" }, go = ["src"], fo = ["label", "open"], mo = ["src"], po = {
  key: 1,
  class: "preview"
}, ho = {
  key: 0,
  name: "file-earmark"
}, vo = { key: 2 }, yo = ["title"];
function So(e, t, n, s, i, o) {
  var r, l, a, u, g, f, c, d, v, h;
  return p(), y("div", {
    class: "file-wrapper",
    onDragover: t[5] || (t[5] = je((S) => e.state.droparea = !0, ["prevent"])),
    onDragleave: t[6] || (t[6] = (S) => e.state.droparea = !1),
    onDrop: t[7] || (t[7] = je((...S) => e.handleDrop && e.handleDrop(...S), ["prevent"]))
  }, [
    e.state.loading ? (p(), y("div", ro, t[8] || (t[8] = [
      m("sl-spinner", { slot: "suffix" }, null, -1)
    ]))) : $("", !0),
    e.state.droparea ? (p(), y("div", oo, " Dateien hier hinziehen ")) : $("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (p(), y("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: t[0] || (t[0] = (S) => e.uploadinput.click())
    }, t[9] || (t[9] = [
      m("sl-icon", { name: "upload" }, null, -1)
    ]), 8, lo)) : $("", !0),
    m("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: t[1] || (t[1] = (...S) => e.handleUpload && e.handleUpload(...S))
    }, null, 40, ao),
    e.value ? (p(), y("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: t[2] || (t[2] = (...S) => e.downloadFile && e.downloadFile(...S))
    }, t[10] || (t[10] = [
      m("sl-icon", {
        slot: "prefix",
        name: "download"
      }, null, -1)
    ]), 8, uo)) : $("", !0),
    m("div", co, [
      (l = (r = e.value) == null ? void 0 : r.dest) != null && l.mimetype.includes("image") ? (p(), y("div", {
        key: 0,
        class: "preview has-preview",
        onClick: t[3] || (t[3] = (S) => e.state.previewopen = !e.state.previewopen)
      }, [
        m("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, go),
        m("sl-dialog", {
          label: decodeURIComponent((u = (a = e.value) == null ? void 0 : a.dest) == null ? void 0 : u.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          m("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, mo)
        ], 8, fo)
      ])) : (p(), y("div", po, [
        (f = (g = e.value) == null ? void 0 : g.dest) != null && f.name ? (p(), y("sl-icon", ho)) : $("", !0)
      ])),
      (d = (c = e.value) == null ? void 0 : c.dest) != null && d.name ? (p(), y("div", vo, V(decodeURIComponent((h = (v = e.value) == null ? void 0 : v.dest) == null ? void 0 : h.name)), 1)) : $("", !0)
    ]),
    e.boneState.multiple ? $("", !0) : (p(), y("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: t[4] || (t[4] = (S) => e.$emit("change", e.name, "", e.lang, e.index))
    }, t[11] || (t[11] = [
      m("sl-icon", { name: "x-lg" }, null, -1)
    ]), 8, yo))
  ], 32);
}
const Tt = /* @__PURE__ */ x(io, [["render", So], ["__scopeId", "data-v-64b3e67e"]]), bo = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: "",
      editorConfig: {},
      editor: P(() => Ct)
    });
    function i(l) {
      t.emit("change", e.name, s.value, e.lang, e.index);
    }
    function o(l) {
      s.value = l.target.value, t.emit("change", e.name, s.value, e.lang, e.index);
    }
    T(() => {
      e.value !== null && (s.value = e.value), t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function r(l) {
      l.editing.view.change((u) => {
        u.setStyle("min-height", "250px", l.editing.view.document.getRoot());
      });
      const a = l.plugins.get("SourceEditing");
      a.on("change:isSourceEditingMode", (u, g, f) => {
        var c, d;
        f && ((d = (c = l.editing.view.getDomRoot()) == null ? void 0 : c.nextSibling) == null ? void 0 : d.firstChild).addEventListener("focusout", (h) => {
          a.isSourceEditingMode = !1;
        });
      });
    }
    return be(
      () => e.value,
      (l, a) => {
        l ? s.value = l : s.value = "";
      }
    ), {
      state: s,
      ClassicEditor: Ct,
      boneState: n,
      changeEvent: i,
      onReady: r,
      changeEventTextarea: o
    };
  }
}), wo = ["disabled", "value"];
function $o(e, t, n, s, i, o) {
  var l, a, u, g;
  const r = we("ckeditor");
  return e.state.editor ? (p(), y(C, { key: 0 }, [
    (l = e.boneState.bonestructure) != null && l.valid_html || (a = e.boneState.bonestructure) != null && a.validHtml ? (p(), H(r, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": t[0] || (t[0] = (f) => e.state.value = f),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (u = e.boneState) == null ? void 0 : u.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (p(), y("sl-textarea", {
      key: 1,
      disabled: (g = e.boneState) == null ? void 0 : g.readonly,
      value: e.value,
      onInput: t[1] || (t[1] = (...f) => e.changeEventTextarea && e.changeEventTextarea(...f))
    }, null, 40, wo))
  ], 64)) : $("", !0);
}
const Ht = /* @__PURE__ */ x(bo, [["render", $o]]), Co = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      valueLat: null,
      valueLng: null
    });
    function i() {
      t.emit("change", e.name, [s.valueLat, s.valueLng], e.lang, e.index);
    }
    return T(() => {
      try {
        s.valueLat = e.value[0], s.valueLng = e.value[1];
      } catch {
      }
      t.emit("change", e.name, [s.valueLat, s.valueLng], e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), _o = ["name", "min", "max", "disabled"], Ro = ["name", "min", "max", "disabled"];
function ko(e, t, n, s, i, o) {
  return p(), y(C, null, [
    de(m("sl-input", {
      "onUpdate:modelValue": t[0] || (t[0] = (r) => e.state.valueLat = r),
      index: "lat",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: t[1] || (t[1] = (...r) => e.changeEvent && e.changeEvent(...r)),
      placeholder: "Lat"
    }, null, 40, _o), [
      [Ee, e.state.valueLat]
    ]),
    de(m("sl-input", {
      "onUpdate:modelValue": t[2] || (t[2] = (r) => e.state.valueLng = r),
      index: "lng",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: t[3] || (t[3] = (...r) => e.changeEvent && e.changeEvent(...r)),
      placeholder: "Long"
    }, null, 40, Ro), [
      [Ee, e.state.valueLng]
    ])
  ], 64);
}
const Gt = /* @__PURE__ */ x(Co, [["render", ko], ["__scopeId", "data-v-54369cfc"]]), Io = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => "" + ![!1, null, void 0, "", "false"].includes(e.value))
    });
    function i(o) {
      t.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return T(() => {
      let o = e.value;
      o || (o = !1), t.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), Eo = ["disabled", "value"], Fo = ["value"];
function Ao(e, t, n, s, i, o) {
  return p(), y("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    "max-options-visible": "0",
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, [
    (p(), y(C, null, L([!0, !1], (r) => m("sl-option", {
      key: r,
      value: r
    }, [
      r ? (p(), y(C, { key: 0 }, [
        D(V(e.$t("bones.bool.true")), 1)
      ], 64)) : (p(), y(C, { key: 1 }, [
        D(V(e.$t("bones.bool.false")), 1)
      ], 64))
    ], 8, Fo)), 64))
  ], 40, Eo);
}
const Ut = /* @__PURE__ */ x(Io, [["render", Ao], ["__scopeId", "data-v-7d0f49c8"]]), xo = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => "" + ![!1, null, void 0, "", "false"].includes(e.value))
    });
    function i(o) {
      console.log(o.target.value), t.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return T(() => {
      let o = e.value;
      o || (o = !1), t.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: i
    };
  }
}), Po = ["value"], Vo = ["disabled"], Mo = ["disabled"];
function Oo(e, t, n, s, i, o) {
  return p(), y("sl-radio-group", {
    value: e.state.value,
    onSlChange: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, [
    m("sl-radio", {
      value: "true",
      disabled: e.boneState.readonly
    }, V(e.$t("bones.bool.true")), 9, Vo),
    m("sl-radio", {
      value: "false",
      disabled: e.boneState.readonly
    }, V(e.$t("bones.bool.false")), 9, Mo)
  ], 40, Po);
}
const qt = /* @__PURE__ */ x(xo, [["render", Oo], ["__scopeId", "data-v-0e0a6aa6"]]), Do = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      value: P(() => {
        let l = e.value;
        return Array.isArray(e.value) ? (n.bonestructure.values instanceof Array ? l = l.filter((a) => n.bonestructure.values.map((u) => u[0].toString()).includes(a)) : l = l.filter(
          (a) => Object.keys(n.bonestructure.values).map((u) => u.toString()).includes(a)
        ), l.map((a) => a.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function i() {
      if (Array.isArray(n.bonestructure.values))
        return n.bonestructure.values;
      {
        let l = [];
        for (const [a, u] of Object.entries(n.bonestructure.values))
          l.push([a, u]);
        return l;
      }
    }
    function o(l) {
      let a = [...s.value];
      l.target.checked ? a.push(l.target.dataset.value) : a = a.filter((u) => u !== l.target.dataset.value), t.emit("change", e.name, a, e.lang, e.index);
    }
    function r(l) {
      t.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return T(() => {
      t.emit("change", e.name, s.value, e.lang, e.index);
    }), {
      state: s,
      boneState: n,
      changeEvent: r,
      changeEventMultiple: o,
      convertObjToList: i
    };
  }
}), Lo = {
  key: 0,
  class: "wrapper-multiple"
}, Bo = ["data-value", "checked", "disabled"], jo = ["value"], No = ["value", "disabled"];
function zo(e, t, n, s, i, o) {
  return e.boneState.bonestructure.multiple ? (p(), y("div", Lo, [
    (p(!0), y(C, null, L(e.convertObjToList(), (r) => (p(), y("sl-checkbox", {
      "data-value": r[0],
      checked: e.state.value.includes(r[0]),
      disabled: e.boneState.readonly,
      onSlChange: t[0] || (t[0] = (...l) => e.changeEventMultiple && e.changeEventMultiple(...l))
    }, V(r[1]), 41, Bo))), 256))
  ])) : (p(), y("sl-radio-group", {
    key: 1,
    value: e.state.value,
    onSlChange: t[1] || (t[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, [
    (p(!0), y(C, null, L(e.convertObjToList(), (r) => (p(), y("sl-radio", {
      value: r[0],
      disabled: e.boneState.readonly
    }, V(r[1]), 9, No))), 256))
  ], 40, jo));
}
const Wt = /* @__PURE__ */ x(Do, [["render", zo], ["__scopeId", "data-v-63aa8bd2"]]), To = z({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone: Object
  },
  components: { Wrapper_nested: bt },
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = O("formatString"), i = A({
      format: P(() => n == null ? void 0 : n.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(a) {
      let u = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? u = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (u = "skelType=node&"), M.get(
        `/vi/${n.bonestructure.module}/list?${u}limit=99`
      ).then(async (g) => {
        var c;
        const f = await g.json();
        i.skellistdata = {};
        for (let d of f.skellist)
          i.skellistdata[d.key] = d;
        return (c = f.skellist) == null ? void 0 : c.map((d) => ({ text: s(n.bonestructure.format, { dest: d }), value: d.key, data: d }));
      });
    }
    function r(a) {
      i.selection = { dest: i.skellistdata[a.target.value] }, t.emit("change", e.name, i.selection, e.lang, e.index);
    }
    function l(a) {
      i.selection = { ...i.selection, rel: a.value }, t.emit("change", a.name, i.selection, a.lang, a.index);
    }
    return T(() => {
      i.selection = e.value, o(), t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      formatString: s,
      changeEvent: r,
      changeEventNested: l,
      getList: o
    };
  }
}), Ho = { class: "record" }, Go = { class: "single-entry" }, Uo = ["disabled", "value"], qo = ["value"];
function Wo(e, t, n, s, i, o) {
  var l;
  const r = we("Wrapper_nested");
  return p(), y("div", Ho, [
    m("div", Go, [
      m("sl-select", {
        disabled: e.boneState.readonly,
        value: (l = e.state.selection) == null ? void 0 : l.dest.key,
        hoist: "",
        "max-options-visible": "0",
        clearable: "",
        onSlChange: t[0] || (t[0] = (...a) => e.changeEvent && e.changeEvent(...a))
      }, [
        (p(!0), y(C, null, L(e.state.skellistdata, (a, u) => (p(), y("sl-option", {
          key: u,
          value: u
        }, V(e.formatString(e.state.format, a)), 9, qo))), 128))
      ], 40, Uo)
    ]),
    e.bone.using ? (p(), H(r, {
      key: 0,
      value: e.value,
      name: e.name,
      index: e.index,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "bone", "disabled", "onChange"])) : $("", !0)
  ]);
}
const Kt = /* @__PURE__ */ x(To, [["render", Wo], ["__scopeId", "data-v-e34665de"]]), Ko = z({
  props: {
    name: String,
    value: Object,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = A({
      counter: 0,
      debounce: null
    }), i = O("addMultipleEntry"), o = O("removeMultipleEntries");
    function r() {
      s.counter += 1;
      let a = 200;
      s.counter > 1 && (a = 500), s.debounce && clearTimeout(s.debounce), s.debounce = setTimeout(() => {
        for (let u = s.counter; u--; )
          i(e.lang);
        s.counter = 0;
      }, a);
    }
    function l() {
      let a = 200;
      s.debounce && clearTimeout(s.debounce), s.debounce = setTimeout(() => {
        o(e.lang);
      }, a);
    }
    return T(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: n,
      handleAdd: r,
      handleRemove: l,
      removeMultipleEntries: o
    };
  }
}), Xo = { class: "actionbar" }, Zo = ["title"], Jo = ["title"];
function Qo(e, t, n, s, i, o) {
  return p(), y("div", Xo, [
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.delAll"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (r) => e.handleRemove(e.lang))
    }, V(e.$t("bone.delAll")), 9, Zo)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: t[1] || (t[1] = (r) => e.handleAdd(e.lang))
    }, [
      t[2] || (t[2] = m("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)),
      D(" " + V(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (p(), y(C, { key: 0 }, [
        D("(" + V(e.state.counter) + ")", 1)
      ], 64)) : $("", !0)
    ], 8, Jo)) : $("", !0)
  ]);
}
const Yo = /* @__PURE__ */ x(Ko, [["render", Qo], ["__scopeId", "data-v-3767fe4b"]]), el = z({
  props: {
    name: String,
    value: Object,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = O("addMultipleEntry"), i = O("formatString"), o = null, r = A({
      skels: {},
      hasUsing: P(() => n == null ? void 0 : n.bonestructure.using)
    });
    function l(a) {
      let u = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? u = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (u = "skelType=node&"), M.get(
        `/vi/${n.bonestructure.module}/list?${u}limit=99`
      ).then(async (g) => {
        var c;
        const f = await g.json();
        return r.skels = f.skellist.reduce((d, v) => (d[v.key] = v, d), {}), (c = f.skellist) == null ? void 0 : c.map((d) => ({ text: i(n.bonestructure.format, { dest: d }), value: d.key, data: d }));
      });
    }
    return T(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: r,
      boneState: n,
      addMultipleEntry: s,
      removeMultipleEntries: o,
      getList: l
    };
  }
}), tl = { class: "actionbar" }, nl = ["title"], sl = ["source"], il = ["title"];
function rl(e, t, n, s, i, o) {
  return p(), y("div", tl, [
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (r) => e.openSelector())
    }, t[3] || (t[3] = [
      m("sl-icon", {
        slot: "prefix",
        name: "x-lg"
      }, null, -1)
    ]), 8, nl)) : $("", !0),
    m("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: t[1] || (t[1] = (r) => {
        var l;
        return e.addMultipleEntry(e.lang, {
          dest: (l = e.state.skels) == null ? void 0 : l[r.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, sl),
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: t[2] || (t[2] = (r) => e.addMultipleEntry(e.lang))
    }, [
      t[4] || (t[4] = m("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)),
      D(" " + V(e.$t("bone.list")), 1)
    ], 8, il)) : $("", !0)
  ]);
}
const ol = /* @__PURE__ */ x(el, [["render", rl], ["__scopeId", "data-v-f9a556f3"]]), ll = z({
  props: {
    name: String,
    value: Object,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  components: {},
  emits: ["change"],
  setup(e, t) {
    const n = O("boneState"), s = O("addMultipleEntry");
    O("formatString");
    const i = null, o = W(), r = A({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: P(() => n == null ? void 0 : n.bonestructure.using)
    });
    function l(g) {
      const f = {
        fileName: g.name,
        mimeType: g.type || "application/octet-stream",
        size: g.size.toString()
      };
      return new Promise((c, d) => {
        M.securePost("/vi/file/getUploadURL", { dataObj: f }).then(async (v) => {
          let h = await v.json();
          fetch(h.values.uploadUrl, {
            body: g,
            method: "POST",
            mode: "no-cors"
          }).then(async (S) => {
            const b = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            M.securePost("/vi/file/add", { dataObj: b }).then(async (w) => {
              let _ = await w.json();
              _.action === "addSuccess" ? c(_.values) : d(_);
            }).catch((w) => {
              d(w);
            });
          }).catch((S) => {
            d(S);
          });
        }).catch((v) => {
          d(v);
        });
      });
    }
    async function a(g) {
      r.loading = !0;
      for (let f of g.target.files) {
        let c = await l(f);
        o.value.value = null;
        let d = null;
        r.hasUsing && (d = void 0), s(e.lang, { dest: c, rel: d });
      }
      r.loading = !1;
    }
    async function u(g) {
      r.loading = !0, r.droparea = !1;
      for (let f of g.dataTransfer.files) {
        let c = await l(f);
        o.value.value = null;
        let d = null;
        r.hasUsing && (d = void 0), s(e.lang, { dest: c, rel: d });
      }
      r.loading = !1;
    }
    return T(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: r,
      boneState: n,
      addMultipleEntry: s,
      removeMultipleEntries: i,
      uploadFile: l,
      uploadinput: o,
      handleUpload: a,
      handleDrop: u
    };
  }
}), al = ["title"], ul = {
  key: 1,
  class: "droparea"
}, dl = ["multiple"], cl = ["title"], gl = ["title"], fl = {
  key: 0,
  slot: "suffix"
};
function ml(e, t, n, s, i, o) {
  return p(), y("div", {
    class: "actionbar",
    onDragover: t[4] || (t[4] = je((r) => e.state.droparea = !0, ["prevent"])),
    onDragleave: t[5] || (t[5] = (r) => e.state.droparea = !1),
    onDrop: t[6] || (t[6] = je((...r) => e.handleDrop && e.handleDrop(...r), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (r) => e.openSelector())
    }, t[7] || (t[7] = [
      m("sl-icon", {
        slot: "prefix",
        name: "x-lg"
      }, null, -1)
    ]), 8, al)) : $("", !0),
    e.state.droparea ? (p(), y("div", ul, " Dateien hier hinziehen ")) : $("", !0),
    m("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: t[1] || (t[1] = (...r) => e.handleUpload && e.handleUpload(...r))
    }, null, 40, dl),
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: t[2] || (t[2] = (r) => e.addMultipleEntry(e.lang))
    }, t[8] || (t[8] = [
      m("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)
    ]), 8, cl)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (p(), y("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: t[3] || (t[3] = (r) => e.uploadinput.click())
    }, [
      t[9] || (t[9] = m("sl-icon", { name: "upload" }, null, -1)),
      D(" " + V(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (p(), y("sl-spinner", fl)) : $("", !0)
    ], 8, gl)) : $("", !0)
  ], 32);
}
const pl = /* @__PURE__ */ x(ll, [["render", ml], ["__scopeId", "data-v-3c1b10df"]]), hl = gt("boneStore", () => {
  const e = A({
    additionalBones: Q({}),
    defaultBones: Q({
      rawBone: Ft,
      keyBone: At,
      stringBone: Pt,
      emailBone: Vt,
      dateBone: Mt,
      booleanBone: Dt,
      selectBone: Ot,
      passwordBone: Lt,
      recordBone: Bt,
      numericBone: Nt,
      colorBone: jt,
      relationalBone: zt,
      jsonBone: so,
      fileBone: Tt,
      textBone: Ht,
      spatialBone: Gt,
      booleanBoneSelect: Ut,
      booleanBoneChoose: qt,
      selectBoneChoose: Wt,
      relationalBoneSelect: Kt
    }),
    actionbars: Q({
      "relational.tree.leaf.file.file": pl,
      "relational.": ol
    }),
    multibones: Q(["select", "select."])
  });
  function t(r, l) {
    e.additionalBones[r] = l;
  }
  function n() {
    let r = e.defaultBones;
    for (const [l, a] of Object.entries(e.additionalBones))
      r.add(a);
    return r;
  }
  function s(r) {
    if (Object.keys(e.additionalBones).includes(r))
      return e.additionalBones[r];
    {
      let l = r.split("."), a = Object.entries(e.additionalBones).filter(
        (u) => u[0].startsWith(l[0] + ".")
      );
      if (a.length > 0) {
        a.sort((u, g) => g.length - u.length);
        for (let u of a)
          if (r.startsWith(u[0]))
            return e.additionalBones[u[0]];
      }
    }
    return r === "date" ? Mt : r === "key" ? At : r === "str.email" ? Vt : r === "str" || r.startsWith("str.") ? Pt : r === "select.choose" ? Wt : r === "select" || r.startsWith("select.") ? Ot : r === "bool.choose" ? qt : r === "bool.select" ? Ut : r === "bool" || r.startsWith("bool.") ? Dt : r === "password" ? Lt : r === "record" ? Bt : r === "numeric" || r.startsWith("numeric.") ? Nt : r === "relational.tree.leaf.file.file" ? Tt : r === "relational.select" || r.startsWith("relational.select.") ? Kt : r === "relational" || r.startsWith("relational.") ? zt : r === "color" ? jt : r === "text" ? Ht : r === "spatial" ? Gt : Ft;
  }
  function i(r, l) {
    e.actionbars[r] = l;
  }
  function o(r) {
    if (Object.keys(e.actionbars).includes(r))
      return e.actionbars[r];
    {
      let l = r.split("."), a = Object.entries(e.actionbars).filter(
        (u) => u[0].startsWith(l[0] + ".")
      );
      if (a.length > 0) {
        a.sort((u, g) => g.length - u.length);
        for (let u of a)
          if (r.startsWith(u[0]))
            return e.actionbars[u[0]];
      }
    }
    return Yo;
  }
  return {
    state: e,
    addBoneWidget: t,
    getBoneWidget: s,
    importWidgets: n,
    addBoneActionbar: i,
    getBoneActionbar: o
  };
});
function pe(e) {
  return hl().getBoneWidget(e);
}
const vl = { class: "viur-shop-form-wrap" }, yl = { class: "viur-shop-form-wrap" }, Sl = { key: 0 }, bl = { class: "viur-shop-form-wrap" }, wl = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const t = ge(), n = A({
      formValues: {},
      requiredFieldsFilled: P(() => {
        if (n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("billing.city") && Object.keys(n.formValues).includes("billing.street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
        if (!n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      addSkel: null,
      errors: {}
    });
    function s(r) {
      n.isCustomAdress = !r.target.checked;
    }
    function i(r, l) {
      for (const [a, u] of Object.entries(l.value[0]))
        n.formValues[a] = u;
    }
    function o(r) {
      let l = {};
      return Array.isArray(r) ? (r.forEach((a) => {
        let u = a[0], g = a[1];
        l[u] = g;
      }), console.log("output", l), l) : r;
    }
    return be(n.formValues, (r) => {
      Object.entries(r).forEach(([l, a]) => {
        a === "" && delete n.formValues[l];
      });
    }), oe(async () => {
      await t.getAddressStructure(), await t.getAddress(), n.addSkel = o(t.state.structure.address), n.formValues = t.state.shippingAddress;
    }), (r, l) => {
      const a = we("bone");
      return p(), y(C, null, [
        m("div", null, [
          l[0] || (l[0] = m("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)),
          m("div", vl, [
            (p(!0), y(C, null, L(n.addSkel, (u, g) => (p(), y(C, { key: g }, [
              u.visible && u.params.group === "Customer Info" ? (p(), y("div", {
                key: 0,
                class: ne("viur-shop-form-bone-" + g)
              }, [
                u.visible && u.params.group === "Customer Info" ? (p(), H(a, {
                  key: 0,
                  is: B(pe)(u.type),
                  name: g,
                  structure: o(n.addSkel),
                  errors: n.errors[g] ? n.errors[g] : [],
                  skel: n.formValues,
                  onChange: (f) => i(g, f),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        m("div", null, [
          l[1] || (l[1] = m("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)),
          m("div", yl, [
            (p(!0), y(C, null, L(n.addSkel, (u, g) => (p(), y(C, { key: g }, [
              u.visible && u.params.group === "Customer Address" ? (p(), y("div", {
                key: 0,
                class: ne("viur-shop-form-bone-" + g)
              }, [
                u.visible && u.params.group === "Customer Address" ? (p(), H(a, {
                  key: 0,
                  is: B(pe)(u.type),
                  name: g,
                  structure: o(n.addSkel),
                  errors: n.errors[g] ? n.errors[g] : [],
                  skel: n.formValues,
                  onChange: (f) => i(g, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        n.isCustomAdress ? (p(), y("div", Sl, [
          l[2] || (l[2] = m("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)),
          m("div", bl, [
            (p(!0), y(C, null, L(n.addSkel, (u, g) => (p(), y(C, { key: g }, [
              u.visible && u.params.group === "Customer Address" ? (p(), y("div", {
                key: 0,
                class: ne("viur-shop-form-bone-" + g)
              }, [
                u.visible && u.params.group === "Customer Address" ? (p(), H(a, {
                  key: 0,
                  is: B(pe)(u.type),
                  name: g,
                  structure: o(n.addSkel),
                  errors: n.errors[g] ? n.errors[g] : [],
                  skel: n.formValues,
                  onChange: (f) => i(g, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ])) : $("", !0),
        m("sl-checkbox", {
          onSlChange: s,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, $l = /* @__PURE__ */ x(wl, [["__scopeId", "data-v-4d14c6fe"]]), Cl = { class: "viur-shop-form-wrap" }, _l = ["onSlChange", "onSlClear", "label"], Rl = ["value"], kl = { key: 0 }, Il = { class: "viur-shop-form-wrap" }, El = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const t = ge(), n = A({
      formValues: {},
      requiredFieldsFilled: P(() => {
        if (n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("billing.city") && Object.keys(n.formValues).includes("billing.street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
        if (!n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      shippingAdressAmount: 1,
      maxShippingAdress: P(
        () => Object.keys(t.state.carts).length + 2
      ),
      amountAlert: { title: "", msg: "" },
      items: null,
      addSkel: null,
      errors: {},
      selectedItem: {},
      isInit: P(() => !!t.state.carts[t.state.basket])
    }), s = W(null), i = W(null);
    function o(c) {
      c.target.checked && (n.isCustomAdress = !1), c.target.checked || (n.isCustomAdress = !0);
    }
    function r() {
      if (n.shippingAdressAmount === n.maxShippingAdress) {
        n.amountAlert.title = "Zu viele Lieferadressen", n.amountAlert.msg = `Sie können nur maximal: "${n.maxShippingAdress}" Lieferadressen verwenden.`, i.value.show();
        return;
      }
      n.shippingAdressAmount += 1;
    }
    function l(c, d) {
      for (const [v, h] of Object.entries(d.value[0]))
        n.formValues[v] = h;
    }
    function a() {
      if (n.shippingAdressAmount === 1) {
        n.amountAlert.title = "Zu wenig Lieferadressen", n.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", i.value.show();
        return;
      }
      n.shippingAdressAmount -= 1;
    }
    function u(c, d) {
      if (console.log(c.target.value), !c.target.value.length) {
        g();
        return;
      }
      n.selectedItem[d] = c.target.value, n.isItemSelected = !0;
    }
    function g(c, d) {
      console.log("clearing..."), delete n.selectedItem[d], n.isItemSelected = !1;
    }
    function f(c) {
      let d = {};
      return Array.isArray(c) ? (c.forEach((v) => {
        let h = v[0], S = v[1];
        d[h] = S;
      }), d) : c;
    }
    return be(n.formValues, (c) => {
      Object.entries(c).forEach(([d, v]) => {
        v === "" && delete n.formValues[d];
      });
    }), oe(async () => {
      await t.getAddressStructure(), n.addSkel = f(t.state.structure.address);
    }), (c, d) => {
      const v = we("bone");
      return p(), y(C, null, [
        m("div", null, [
          d[0] || (d[0] = m("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)),
          m("div", Cl, [
            (p(!0), y(C, null, L(n.addSkel, (h, S) => (p(), y(C, { key: S }, [
              h.visible && h.params.group === "Customer Info" ? (p(), y("div", {
                key: 0,
                class: ne("viur-shop-form-bone-" + S)
              }, [
                h.visible && h.params.group === "Customer Info" ? (p(), H(v, {
                  key: 0,
                  is: B(pe)(h.type),
                  name: S,
                  structure: f(n.addSkel),
                  errors: n.errors[S] ? n.errors[S] : [],
                  skel: n.formValues,
                  onChange: (b) => l(S, b)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        d[6] || (d[6] = m("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)),
        (p(!0), y(C, null, L(n.shippingAdressAmount, (h) => (p(), y("div", {
          class: "viur-shop-form-wrap",
          key: h
        }, [
          m("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: s,
            onSlChange: (S) => u(S, h),
            onSlClear: (S) => g(S, h),
            label: n.selectedItem[h] ? B(t).state.carts[n.selectedItem[h]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (p(!0), y(C, null, L(B(t).state.carts, (S, b) => (p(), y("sl-option", { value: b }, V(S.info.name), 9, Rl))), 256))
          ], 40, _l),
          (p(!0), y(C, null, L(n.addSkel, (S, b) => (p(), y(C, { key: b }, [
            S.visible && S.params.group === "Customer Address" ? (p(), y("div", {
              key: 0,
              class: ne("viur-shop-form-bone-" + b)
            }, [
              S.visible && S.params.group === "Customer Address" ? (p(), H(v, {
                key: 0,
                is: B(pe)(S.type),
                name: b,
                structure: f(n.addSkel),
                errors: n.errors[b] ? n.errors[b] : [],
                skel: n.formValues,
                onChange: (w) => l(b, w)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
            ], 2)) : $("", !0)
          ], 64))), 128))
        ]))), 128)),
        n.isCustomAdress ? (p(), y("div", kl, [
          d[1] || (d[1] = m("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)),
          m("div", Il, [
            (p(!0), y(C, null, L(n.addSkel, (h, S) => (p(), y(C, { key: S }, [
              h.visible && h.params.group === "Customer Address" ? (p(), y("div", {
                key: 0,
                class: ne("viur-shop-form-bone-" + S)
              }, [
                h.visible && h.params.group === "Customer Address" ? (p(), H(v, {
                  key: 0,
                  is: B(pe)(h.type),
                  name: S,
                  structure: f(n.addSkel),
                  errors: n.errors[S] ? n.errors[S] : [],
                  skel: n.formValues,
                  onChange: (b) => l(S, b)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ])) : $("", !0),
        m("div", { class: "viur-shop-form-btn-wrap" }, [
          m("sl-button", {
            size: "medium",
            onClick: a,
            title: "Lieferadresse entfernen"
          }, d[2] || (d[2] = [
            m("sl-icon", {
              name: "x-lg",
              slot: "prefix"
            }, null, -1)
          ])),
          m("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: r
          }, d[3] || (d[3] = [
            m("sl-icon", {
              name: "plus-lg",
              slot: "prefix"
            }, null, -1),
            D(" Lieferadresse hinzufügen ")
          ]))
        ]),
        m("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: i,
          closable: ""
        }, [
          d[4] || (d[4] = m("sl-icon", {
            slot: "icon",
            name: "exclamation-triangle"
          }, null, -1)),
          m("strong", null, V(n.amountAlert.title), 1),
          d[5] || (d[5] = m("br", null, null, -1)),
          D(" " + V(n.amountAlert.msg), 1)
        ], 512),
        m("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Fl = /* @__PURE__ */ x(El, [["__scopeId", "data-v-c4232b7a"]]), Al = {
  __name: "ExampleUsage",
  setup(e) {
    const t = ge(), n = P(
      () => t.state.basketRootNode.key ? t.state.basketRootNode.key : ""
    ), s = A({
      rootNode: {},
      tabs: {
        cart: {
          component: Q(it),
          props: {
            sidebar: !0,
            mode: "basket",
            cartKey: n,
            placeholder: "/static/partnerbereich/img/placeholder.svg"
          },
          // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
          displayName: "Warenkorb",
          // icon: { name: "bag" },
          position: 2,
          disabled: !1
        },
        confirm: {
          component: Q(on),
          props: {},
          displayName: "Bestellung prüfen",
          // icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1
        },
        orderComplete: {
          component: Q(Ti),
          props: {
            redirectUrl: "http://localhost:8081",
            additionalComponents: [
              {
                component: Q(it),
                props: {
                  sidebar: !0,
                  mode: "basket",
                  cartKey: n
                }
              }
            ]
          },
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0
        },
        userInfo: {
          component: Q($l),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1
        },
        userInfoMulti: {
          component: Q(Fl),
          props: {},
          displayName: "Daten Eingeben (Multi)",
          icon: { name: "card-list" },
          position: 4,
          disabled: !1
        }
      }
    });
    function i(o) {
      (o == null ? void 0 : o.detail.name) === "confirm" && (s.tabs.orderComplete.disabled = !1);
    }
    return oe(async () => {
      await t.init(), await t.getAddressStructure(), console.log("debug init exampleusage :", t.state.basketRootNode);
    }), (o, r) => (p(), H(us, {
      tabs: s.tabs,
      onTabChange: i,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Al
}, Symbol.toStringTag, { value: "Module" })), Pl = ["id", "selected"], Vl = { slot: "footer" }, Ml = {
  __name: "SelectPaymentProvider",
  setup(e) {
    const t = ge();
    function n(s) {
      s.target.selected ? (console.log("a", t.state.selectedPaymentProvider), console.log("b", t.state.paymentProviders), t.state.selectedPaymentProvider = t.state.paymentProviders[s.target.id.replace("povider__", "")], console.log(t.state.selectedPaymentProvider), document.querySelectorAll("sl-card").forEach((i) => {
        i !== s.target && (i.selected = !1);
      })) : s.target.selected = !0, console.log("provider changed", s);
    }
    return oe(async () => {
      await t.getPaymentProviders();
    }), (s, i) => (p(!0), y(C, null, L(B(t).state.paymentProviders, (o, r, l) => (p(), y("div", null, [
      m("sl-card", {
        selectable: "",
        id: "povider__" + r,
        onSlChange: n,
        selected: l === 0
      }, [
        i[1] || (i[1] = m("img", {
          slot: "image",
          src: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
          alt: "A kitten sits patiently between a terracotta pot and decorative grasses."
        }, null, -1)),
        m("div", Vl, [
          D(V(o.title) + " ", 1),
          i[0] || (i[0] = m("br", null, null, -1)),
          D(" " + V(o.descr), 1)
        ])
      ], 40, Pl)
    ]))), 256));
  }
}, Gl = /* @__PURE__ */ x(Ml, [["__scopeId", "data-v-c5d8e33f"]]), Ol = gn(), Ul = {
  install(e) {
    e.use(Ol);
  }
};
export {
  it as C,
  us as S,
  $l as U,
  Ul as V,
  x as _,
  Al as a,
  on as b,
  Hl as c,
  Ti as d,
  Fl as e,
  Gl as f,
  ge as u
};
