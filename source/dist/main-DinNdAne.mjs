var Ke = Object.defineProperty;
var He = (e, t, n) => t in e ? Ke(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pe = (e, t, n) => He(e, typeof t != "symbol" ? t + "" : t, n);
import { defineStore as ce, createPinia as Ge } from "pinia";
import { reactive as _, defineComponent as N, openBlock as d, createElementBlock as m, toDisplayString as A, createElementVNode as u, createCommentVNode as v, createTextVNode as E, createBlock as B, resolveDynamicComponent as Le, mergeProps as Pe, Fragment as S, withDirectives as q, vShow as ue, ref as D, unref as T, onBeforeMount as F, createVNode as te, computed as k, renderSlot as Ze, renderList as j, normalizeClass as M, useCssVars as Je, Transition as Qe, withCtx as Xe, pushScopeId as L, popScopeId as P, vModelText as Y, Teleport as Ye, inject as C, onMounted as R, readonly as xe, getCurrentScope as et, onScopeDispose as tt, watchEffect as se, watch as ae, getCurrentInstance as nt, resolveComponent as Q, withModifiers as ne, shallowRef as U } from "vue";
import { Request as st } from "@viur/vue-utils";
import { ViURShopClient as at } from "@viur/viur-shop-client";
import { useRoute as ot, createRouter as lt, createWebHashHistory as rt } from "vue-router";
import be from "@viur/ckeditor5-build-classic";
const Z = ce("cartstore", () => {
  const e = new at({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), t = _({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    billingAddress: {},
    shippingAddress: {}
  });
  async function n() {
    await a();
  }
  async function o(p) {
    return await e.cart_list({ cart_key: p });
  }
  async function a() {
    (await e.cart_list()).forEach((g) => {
      g.is_root_node && (g.cart_type === "basket" ? t.basketRootNode = g : t.whishlistRootNodes.push(g));
    });
  }
  async function r(p, g) {
    let b = await e.article_add({
      article_key: p,
      parent_cart_key: g
    });
    console.log("addToCart", b);
  }
  async function s(p, g) {
    let b = await e.article_view({
      article_key: p,
      parent_cart_key: g
    });
    console.log("getArticleView", b);
  }
  async function i(p, g) {
    let b = await e.article_remove({
      article_key: p,
      parent_cart_key: g
    });
    console.log("remove Resp", b);
  }
  async function l(p, g, b) {
    let $ = await e.article_update({
      article_key: p,
      parent_cart_key: g,
      quantity: b,
      quantity_mode: "replace"
    });
    console.log("update Resp", $);
  }
  async function c() {
    const p = await e.address_structure();
    t.structure.address = p.addSkel;
  }
  async function f() {
    const p = await e.address_list();
    for (const g of p)
      g.address_type === "billing" && (t.billingAddress = g), g.address_type === "shipping" && (t.shippingAddress = g);
  }
  async function h(p) {
    await e.discount_add({ code: p, discount_key: void 0 });
  }
  return {
    state: t,
    addToCart: r,
    getArticleView: s,
    removeItem: i,
    updateItem: l,
    init: n,
    getAddressStructure: c,
    getChildren: o,
    addDiscount: h,
    getAddress: f
  };
}), w = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, it = N({
  props: {},
  components: {},
  setup(e, t) {
    const n = ot();
    return { state: _({}), route: n };
  }
}), ut = { class: "home" };
function dt(e, t, n, o, a, r) {
  return d(), m("div", ut, "View " + A(e.route.path) + " is missing.", 1);
}
const ct = /* @__PURE__ */ w(it, [["render", dt]]), mt = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: ct
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-ChoFNtRc.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-Dq6GELr2.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Vn)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => Qo)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Kn)
  }
];
function ol(e, t = !1) {
  let n = [];
  return t ? n = e : n = e.concat(mt), lt({
    // @ts-ignore
    history: rt("/"),
    routes: n
  });
}
const ft = ["panel", "disabled"], ht = { class: "viur-shop-order-step" }, gt = ["name", "library"], pt = { class: "viur-shop-order-status-text" }, bt = { class: "viur-shop-order-status-span" }, vt = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, yt = {
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
      var o;
      return d(), m("sl-tab", {
        class: "viur-shop-order-tab",
        slot: "nav",
        panel: e.tab,
        disabled: e.tabs[e.tab].disabled
      }, [
        u("div", ht, [
          (o = e.tabs[e.tab].icon) != null && o.name ? (d(), m("sl-icon", {
            key: 0,
            class: "viur-shop-order-step-icon",
            name: e.tabs[e.tab].icon.name,
            library: e.tabs[e.tab].icon.library
          }, null, 8, gt)) : v("", !0),
          u("div", pt, [
            E(A(e.tabIdx + 1) + ". ", 1),
            u("span", bt, A(e.tabs[e.tab].displayName), 1)
          ])
        ]),
        e.tabIdx < e.stepperLength - 1 ? (d(), m("sl-icon", vt)) : v("", !0)
      ], 8, ft);
    };
  }
}, $t = /* @__PURE__ */ w(yt, [["__scopeId", "data-v-e6e66706"]]), St = ["name"], _t = {
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
    function o() {
      n("goToStart");
    }
    return (a, r) => (d(), m("sl-tab-panel", {
      class: "viur-shop-order-tab-panel",
      name: e.tab
    }, [
      (d(), B(Le(e.tabs[e.tab].component), Pe(e.tabs[e.tab].props ? e.tabs[e.tab].props : "", {
        onGoToStart: r[0] || (r[0] = (s) => o())
      }), null, 16))
    ], 8, St));
  }
}, kt = /* @__PURE__ */ w(_t, [["__scopeId", "data-v-f815b85b"]]), wt = {
  __name: "StepperTrigger",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  emits: ["nextTab", "prevTab"],
  setup(e, { emit: t }) {
    const n = t;
    function o() {
      n("prevTab");
    }
    function a() {
      n("nextTab");
    }
    return (r, s) => (d(), m(S, null, [
      q(u("sl-button", {
        type: "submit",
        onClick: s[0] || (s[0] = (i) => o())
      }, " Zurück ", 512), [
        [ue, e.index !== 0]
      ]),
      u("sl-button", {
        type: "submit",
        variant: "primary",
        onClick: s[1] || (s[1] = (i) => a())
      }, " Weiter ")
    ], 64));
  }
}, Et = { class: "viur-shop-discount" }, It = { class: "viur-shop-discount-alert" }, At = /* @__PURE__ */ u("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Ct = { key: 0 }, Ot = { key: 0 }, Nt = { key: 1 }, Rt = {
  __name: "Discount",
  setup(e) {
    const t = Z(), n = D(null), o = D(null), a = _({
      errorMessage: ""
    });
    async function r() {
      o.value.hide();
      const s = n.value.value;
      if (!s) {
        o.value.show(), a.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      let i = await t.addDiscount(s);
      console.log("resp", i);
    }
    return (s, i) => (d(), m(S, null, [
      u("div", Et, [
        u("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: n,
          class: "viur-shop-discount-input"
        }, null, 512),
        u("sl-button", {
          onClick: r,
          class: "viur-shop-discount-submit-btn"
        }, "Einlösen")
      ]),
      u("div", It, [
        u("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: o,
          closable: "",
          duration: "2000"
        }, [
          At,
          E(" " + A(a.errorMessage), 1)
        ], 512)
      ]),
      u("div", null, [
        T(t).state.basketRootNode.discount ? (d(), m("div", Ct, [
          T(t).state.basketRootNode.discount.dest.discount_type === "absolute" ? (d(), m("span", Ot, " Sie haben einen Rabattcode im Wert von " + A(T(t).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : v("", !0),
          T(t).state.basketRootNode.discount.dest.discount_type === "percentage" ? (d(), m("span", Nt, " Sie haben einen Rabattcode im Wert von " + A(T(t).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : v("", !0)
        ])) : v("", !0)
      ])
    ], 64));
  }
}, Bt = { key: 0 }, jt = { key: 1 }, Vt = /* @__PURE__ */ u("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1), Tt = /* @__PURE__ */ u("br", null, null, -1), Dt = { class: "viur-shop-cart-sidebar-info-line" }, Ut = /* @__PURE__ */ u("span", null, "Zwischensumme", -1), Lt = ["value"], Pt = /* @__PURE__ */ u("br", null, null, -1), zt = { class: "viur-shop-cart-sidebar-info-line" }, Mt = /* @__PURE__ */ u("span", null, "Rabatt", -1), qt = /* @__PURE__ */ u("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ u("span", null, "Versandkosten"),
  /* @__PURE__ */ E(" 0 € ")
], -1), Wt = /* @__PURE__ */ u("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ u("span", null, "Gesamt:"),
  /* @__PURE__ */ E(" € ")
], -1), Ft = { class: "viur-shop-cart-sidebar-btn-wrap" }, Kt = { class: "viur-shop-discount-wrap" }, Ht = /* @__PURE__ */ u("sl-button", {
  variant: "primary",
  size: "medium"
}, " Jetzt Bestellen ", -1), Gt = /* @__PURE__ */ u("sl-button", {
  size: "medium",
  variant: "info"
}, [
  /* @__PURE__ */ u("sl-icon", {
    name: "paypal",
    slot: "prefix"
  }),
  /* @__PURE__ */ E(" Paypal ")
], -1), Zt = {
  __name: "ShopSummary",
  setup(e) {
    const t = Z(), n = _({ basketRootNode: {}, loading: !0 });
    return F(async () => {
      await t.init(), n.basketRootNode = t.state.basketRootNode, n.loading = !1;
    }), (o, a) => n.loading ? (d(), m("sl-spinner", Bt)) : (d(), m("div", jt, [
      Vt,
      Tt,
      u("div", Dt, [
        Ut,
        u("sl-format-number", {
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: n.basketRootNode.total
        }, null, 8, Lt),
        Pt
      ]),
      u("div", zt, [
        Mt,
        E(" " + A(n.basketRootNode.total - n.basketRootNode.total_discount_price) + " € ", 1)
      ]),
      qt,
      Wt,
      u("div", Ft, [
        u("div", Kt, [
          te(Rt)
        ]),
        Ht,
        Gt
      ])
    ]));
  }
}, Jt = { class: "bind" }, Qt = { class: "viur-shop-wrap" }, Xt = { class: "viur-shop-stepper-wrap" }, Yt = {
  key: 0,
  class: "viur-shop-sidebar-wrap"
}, xt = {
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
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = _({
      tabNames: k(() => s(n.tabs)),
      isFirstTab: (h) => h === 0,
      tabIdx: 0,
      currentTab: ""
    }), r = D(null);
    function s(h) {
      let p = [], g = [];
      for (const b in h)
        h[b].position ? p.push([b, h[b].position]) : p.push([b, 0]);
      return p.sort((b, $) => b[1] - $[1]), p.forEach((b) => {
        g.push(b[0]);
      }), g;
    }
    function i(h) {
      a.currentTab = h == null ? void 0 : h.detail.name, a.tabIdx = a.tabNames.indexOf(a.currentTab), o("tabChange", h);
    }
    function l() {
      a.tabIdx > 0 && r.value.show(a.tabNames[a.tabIdx - 1]);
    }
    function c() {
      a.tabIdx < a.tabNames.length - 1 && r.value.show(a.tabNames[a.tabIdx + 1]);
    }
    function f() {
      r.value.show(a.tabNames[0]);
    }
    return F(() => {
      const h = s(n.tabs);
      a.currentTab = h[0];
    }), (h, p) => (d(), m("div", Jt, [
      Ze(h.$slots, "default", {}, () => [
        u("div", Qt, [
          u("div", Xt, [
            u("sl-tab-group", {
              class: "viur-shop-order-tabgroup",
              noScrollControls: "",
              onSlTabShow: p[1] || (p[1] = (g) => i(g)),
              ref_key: "tabGroup",
              ref: r
            }, [
              (d(!0), m(S, null, j(a.tabNames, (g, b) => (d(), B($t, {
                key: g,
                tab: g,
                tabs: e.tabs,
                tabIdx: b,
                stepperLength: a.tabNames.length
              }, null, 8, ["tab", "tabs", "tabIdx", "stepperLength"]))), 128)),
              (d(!0), m(S, null, j(a.tabNames, (g) => (d(), B(kt, {
                tab: g,
                tabs: e.tabs,
                key: g,
                onGoToStart: p[0] || (p[0] = (b) => f())
              }, null, 8, ["tab", "tabs"]))), 128))
            ], 544),
            a.tabIdx !== a.tabNames.length - 1 ? (d(), m("div", {
              key: 0,
              class: M(["viur-shop-form-footer", { "flex-end": a.isFirstTab(h.index) }])
            }, [
              te(wt, {
                index: a.tabIdx,
                onPrevTab: l,
                onNextTab: c
              }, null, 8, ["index"])
            ], 2)) : v("", !0)
          ]),
          e.sidebar && a.tabIdx < a.tabNames.length - 1 ? (d(), m("div", Yt, [
            te(Zt)
          ])) : v("", !0)
        ])
      ], !0)
    ]));
  }
}, en = /* @__PURE__ */ w(xt, [["__scopeId", "data-v-2e979e4a"]]), me = {
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
    const n = _({
      trackWidth: k(() => `${e.size / 30}rem`),
      outerSize: k(() => `calc(${e.size}rem + ${n.trackWidth})`),
      spinnerSize: k(() => `${e.size}rem`),
      logoSize: k(() => `calc(${e.size}rem - ${n.trackWidth} * 10)`),
      shadow: k(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: n };
  }
}, ve = () => {
  Je((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, ye = me.setup;
me.setup = ye ? (e, t) => (ve(), ye(e, t)) : ve;
const tn = (e) => (L("data-v-46c45785"), e = e(), P(), e), nn = {
  key: 0,
  class: "loading"
}, sn = /* @__PURE__ */ tn(() => /* @__PURE__ */ u("sl-spinner", { class: "loader" }, null, -1)), an = { class: "logo" }, on = ["src"];
function ln(e, t, n, o, a, r) {
  return d(), B(Qe, null, {
    default: Xe(() => [
      n.active ? (d(), m("div", nn, [
        sn,
        u("div", an, [
          u("sl-icon", { src: n.logo }, null, 8, on)
        ])
      ])) : v("", !0)
    ]),
    _: 1
  });
}
const rn = /* @__PURE__ */ w(me, [["render", ln], ["__scopeId", "data-v-46c45785"]]), un = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return _({}), (t, n) => (d(), m("pre", null, A(e.node.name), 1));
  }
}, oe = (e) => (L("data-v-0e8643b0"), e = e(), P(), e), dn = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, cn = ["src"], mn = { class: "viur-shop-cart-leaf-headline headline" }, fn = { class: "viur-shop-cart-leaf-artno" }, hn = ["innerHTML"], gn = { class: "viur-shop-cart-leaf-quantity" }, pn = { class: "viur-shop-cart-leaf-unitprice" }, bn = /* @__PURE__ */ oe(() => /* @__PURE__ */ u("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), vn = ["value"], yn = { class: "viur-shop-cart-leaf-actions" }, $n = /* @__PURE__ */ oe(() => /* @__PURE__ */ u("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-cart-leaf-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ u("sl-icon", {
    name: "heart",
    slot: "prefix"
  })
], -1)), Sn = /* @__PURE__ */ oe(() => /* @__PURE__ */ u("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), _n = [
  Sn
], kn = { class: "viur-shop-cart-leaf-price" }, wn = /* @__PURE__ */ oe(() => /* @__PURE__ */ u("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), En = ["value"], In = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 },
    placeholder: { type: String, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = _({
      leaf: {}
    });
    function r(l) {
      return l !== void 0 ? st.downloadUrlFor(l) : n.placeholder;
    }
    function s(l, c, f, h) {
      o("updateItem", {
        item: l,
        articleKey: c,
        node: f,
        quantity: h
      });
    }
    function i(l, c, f) {
      o("removeItem", { item: l, articleKey: c, node: f });
    }
    return F(() => {
      a.leaf = n.leaf;
    }), (l, c) => (d(), m("sl-card", dn, [
      u("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: r(
          a.leaf.article.dest.shop_image ? a.leaf.article.dest.shop_image : void 0
        )
      }, null, 8, cn),
      u("h4", mn, A(a.leaf.article.dest.shop_name), 1),
      u("h5", fn, A(a.leaf.article.dest.shop_art_no_or_gtin), 1),
      u("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.article.dest.shop_description
      }, null, 8, hn),
      u("div", gn, [
        q(u("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": c[0] || (c[0] = (f) => a.leaf.quantity = f),
          onInput: c[1] || (c[1] = (f) => s(
            a.leaf,
            a.leaf.article.dest.key,
            e.node,
            a.leaf.quantity
          ))
        }, null, 544), [
          [Y, a.leaf.quantity]
        ])
      ]),
      u("div", pn, [
        bn,
        u("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail
        }, null, 8, vn)
      ]),
      u("div", yn, [
        $n,
        u("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: c[2] || (c[2] = (f) => i(a.leaf, a.leaf.article.dest.key, e.node))
        }, _n)
      ]),
      u("div", kn, [
        wn,
        u("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail * e.leaf.quantity
        }, null, 8, En)
      ])
    ]));
  }
}, An = /* @__PURE__ */ w(In, [["__scopeId", "data-v-0e8643b0"]]), ze = (e) => (L("data-v-df7b65d0"), e = e(), P(), e), Cn = { key: 0 }, On = /* @__PURE__ */ ze(() => /* @__PURE__ */ u("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Nn = {
  class: "footer-wrap",
  slot: "footer"
}, Rn = { class: "viur-shop-cart-node" }, Bn = /* @__PURE__ */ ze(() => /* @__PURE__ */ u("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ u("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), jn = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    placeholder: { type: String, required: !0 }
  },
  setup(e) {
    const t = e, n = Z(), o = D(null), a = _({
      itemsIsInit: k(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    k(() => t.mode === "basket" ? n.state.basketRootNode.key : t.cartKey);
    async function r() {
      await n.updateItem(
        a.currentItem.article.dest.key,
        a.currentNode.key,
        0
      ), await c(), o.value.hide();
    }
    async function s(h) {
      console.log("updateItem :", h), h.quantity === 0 ? (o.value.show(), a.currentItem = h.item, a.currentNode = h.node) : (await n.updateItem(h.articleKey, h.node.key, h.quantity), await n.init());
    }
    function i(h) {
      console.log("removeItem :", h), o.value.show(), a.currentItem = h.item, a.currentNode = h.node;
    }
    async function l() {
      a.leaves[a.currentNode.key].forEach((h) => {
        h.key === a.currentItem.key && (h.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function c() {
      a.nodes = [], a.leaves = {}, await n.init(), await f();
    }
    async function f(h = t.cartKey) {
      console.log("debug getChildren parentKey from comp: ", h);
      const p = await n.getChildren(h);
      console.log("getChildren children: ", p), p.forEach(async (g) => {
        g.skel_type === "node" ? (a.nodes.push(g), await f(g.key)) : (Object.keys(a.leaves).includes(h) || (a.leaves[h] = []), a.leaves[h].push(g));
      });
    }
    return F(async () => {
      await n.init(), await f(), t.mode === "basket" && a.nodes.push(n.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (h, p) => e.cartKey.length ? (d(), m(S, { key: 1 }, [
      u("sl-dialog", {
        ref_key: "confirm",
        ref: o,
        onSlHide: l
      }, [
        On,
        u("div", Nn, [
          u("sl-button", {
            variant: "danger",
            onClick: p[0] || (p[0] = (g) => o.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          u("sl-button", {
            variant: "success",
            onClick: r,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (d(!0), m(S, null, j(a.nodes, (g) => (d(), m("div", Rn, [
        Object.keys(a.leaves).includes(g.key) ? (d(), m(S, { key: 0 }, [
          te(un, { node: g }, null, 8, ["node"]),
          (d(!0), m(S, null, j(a.leaves[g.key], (b) => (d(), B(An, {
            key: b.key,
            leaf: b,
            node: g,
            placeholder: e.placeholder,
            onRemoveItem: i,
            onUpdateItem: s
          }, null, 8, ["leaf", "node", "placeholder"]))), 128))
        ], 64)) : v("", !0)
      ]))), 256)),
      Bn
    ], 64)) : (d(), m("sl-spinner", Cn));
  }
}, de = /* @__PURE__ */ w(jn, [["__scopeId", "data-v-df7b65d0"]]), Vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" })), X = (e) => (L("data-v-4082d346"), e = e(), P(), e), Tn = {
  key: 1,
  class: "list"
}, Dn = /* @__PURE__ */ X(() => /* @__PURE__ */ u("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), Un = /* @__PURE__ */ X(() => /* @__PURE__ */ u("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ u("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ u("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ E(" Versandadresse "),
      /* @__PURE__ */ u("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ u("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ E(" Roland Brose"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" Speicherstraße 33"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" 44147 Dortmund, DE"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" rb@mausbrand.de"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ u("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ u("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ E(" Rechnungsadresse "),
      /* @__PURE__ */ u("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ u("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ E(" Roland Brose"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" Speicherstraße 33"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" 44147 Dortmund, DE"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" rb@mausbrand.de"),
    /* @__PURE__ */ u("br"),
    /* @__PURE__ */ E(" 0231 21 34 68 90 ")
  ])
], -1)), Ln = /* @__PURE__ */ X(() => /* @__PURE__ */ u("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ u("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ u("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ E(" Paypal ")
  ]),
  /* @__PURE__ */ u("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ u("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), Pn = /* @__PURE__ */ X(() => /* @__PURE__ */ u("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), zn = /* @__PURE__ */ X(() => /* @__PURE__ */ u("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Mn = /* @__PURE__ */ X(() => /* @__PURE__ */ u("br", null, null, -1)), qn = { class: "viur-shop-cart-sidebar-btn-wrap" }, Wn = ["variant", "disabled"], Fn = {
  __name: "ConfirmView",
  setup(e) {
    const t = Z(), n = _({
      cartIsInit: k(() => !0),
      itemsIsInit: k(() => {
        var a;
        return !!((a = t.state) != null && a.carts[t.state.basket].items);
      }),
      images: {},
      showOrderButton: !1
    });
    function o(a) {
      a.target.checked && (n.showOrderButton = !0), a.target.checked || (n.showOrderButton = !1);
    }
    return F(async () => {
      await t.init();
    }), (a, r) => n.cartIsInit ? (d(), m("div", Tn, [
      Dn,
      Un,
      Ln,
      Pn,
      (d(), B(Ye, { to: "#order_sidebar" }, [
        zn,
        Mn,
        u("sl-checkbox", { onSlChange: o }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        u("div", qn, [
          u("sl-button", {
            variant: n.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !n.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Wn)
        ])
      ]))
    ])) : (d(), B(rn, { key: 0 }));
  }
}, Me = /* @__PURE__ */ w(Fn, [["__scopeId", "data-v-4082d346"]]), Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), fe = (e) => (L("data-v-1f7efc9d"), e = e(), P(), e), Hn = { class: "bind" }, Gn = /* @__PURE__ */ fe(() => /* @__PURE__ */ u("h1", { class: "viur-shop-success-headline headline" }, " Vielen Dank für Ihre Bestellung ", -1)), Zn = /* @__PURE__ */ fe(() => /* @__PURE__ */ u("p", { class: "paragraph" }, [
  /* @__PURE__ */ u("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ E(" 123345670")
], -1)), Jn = /* @__PURE__ */ fe(() => /* @__PURE__ */ u("p", { class: "paragraph" }, [
  /* @__PURE__ */ E(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
  /* @__PURE__ */ u("br"),
  /* @__PURE__ */ E(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. ")
], -1)), Qn = {
  key: 0,
  class: "viur-shop-order-complete-slot"
}, Xn = { class: "btn-wrap" }, Yn = {
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
    const n = e, o = t;
    function a() {
      o("goToStart");
    }
    function r() {
      window.location.href = n.redirectUrl;
    }
    return (s, i) => (d(), m("div", Hn, [
      Gn,
      Zn,
      Jn,
      e.additionalComponents.length ? (d(), m("div", Qn, [
        (d(!0), m(S, null, j(e.additionalComponents, (l) => (d(), B(Le(l.component), Pe({ ref_for: !0 }, l.props ? l.props : ""), null, 16))), 256))
      ])) : v("", !0),
      u("div", Xn, [
        u("sl-button", {
          size: "medium",
          onClick: i[0] || (i[0] = (l) => a())
        }, " Zur Startseite "),
        u("sl-button", {
          variant: "primary",
          onClick: i[1] || (i[1] = (l) => r()),
          size: "medium"
        }, " Weiter Einkaufen ")
      ])
    ]));
  }
}, xn = /* @__PURE__ */ w(Yn, [["__scopeId", "data-v-1f7efc9d"]]), es = N({
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
    const n = C("boneState"), o = _({});
    function a(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
}), ts = ["disabled", "value"], ns = ["disabled", "value"];
function ss(e, t, n, o, a, r) {
  var s, i;
  return e.boneState.bonestructure.type === "raw.json" ? (d(), m("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: t[0] || (t[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, ts)) : (d(), m("sl-textarea", {
    key: 1,
    disabled: (i = e.boneState) == null ? void 0 : i.readonly,
    value: e.value,
    onInput: t[1] || (t[1] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, ns));
}
const $e = /* @__PURE__ */ w(es, [["render", ss], ["__scopeId", "data-v-0ebe5f0b"]]), as = N({
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
    const n = _({});
    function o(a) {
      t.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: n,
      changeEvent: o
    };
  }
}), os = ["value"];
function ls(e, t, n, o, a, r) {
  return d(), m("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, os);
}
const Se = /* @__PURE__ */ w(as, [["render", ls], ["__scopeId", "data-v-b45a1311"]]);
function rs(e) {
  return et() ? (tt(e), !0) : !1;
}
function is(e) {
  return typeof e == "function" ? e() : T(e);
}
const us = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function le(e, t, n = {}) {
  const {
    immediate: o = !0
  } = n, a = D(!1);
  let r = null;
  function s() {
    r && (clearTimeout(r), r = null);
  }
  function i() {
    a.value = !1, s();
  }
  function l(...c) {
    s(), a.value = !0, r = setTimeout(() => {
      a.value = !1, r = null, e(...c);
    }, is(t));
  }
  return o && (a.value = !0, us && l()), rs(i), {
    isPending: xe(a),
    start: l,
    stop: i
  };
}
class ds {
  static objectEmpty(t) {
    return Object.keys(t).length === 0 && t.constructor === Object;
  }
  static getDescr(t, n) {
    try {
      return t.values.filter((o) => o[0] === n)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(t) {
    return t || (t = ""), String(t).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(t, n) {
    function o(s) {
      let i = [], l = [], c = /\$\((.*?)\)/g;
      for (; l; ) {
        if (l = c.exec(s), !l) {
          l = !1;
          continue;
        }
        i.push(l[1]);
      }
      return i;
    }
    let a = o(t), r = [];
    Array.isArray(n) || (n = [n]);
    for (let s of n) {
      let i = t;
      for (let l of a) {
        let c = l.split("."), f = s;
        for (let h of c)
          f && f !== "-" && h in f && f[h] ? f = f[h] : f = "-";
        f = this.unescape(f), i = i.replace("$(" + l + ")", f);
      }
      r.push(i);
    }
    return r.join(", ");
  }
}
const cs = N({
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
    const n = C("boneState"), o = _({
      value: k(() => e.value)
    }), a = D(null);
    function r(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return se(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = le(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      Utils: ds,
      boneState: n,
      changeEvent: r,
      stringBone: a
    };
  }
}), ms = ["disabled", "value", "required"];
function fs(e, t, n, o, a, r) {
  return d(), m("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: t[1] || (t[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, ms);
}
const _e = /* @__PURE__ */ w(cs, [["render", fs], ["__scopeId", "data-v-1ccbacc0"]]), hs = N({
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
    const n = C("boneState"), o = _({}), a = D(null);
    function r(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return se(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = le(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: r,
      emailBone: a
    };
  }
}), gs = ["disabled", "value"];
function ps(e, t, n, o, a, r) {
  return d(), m("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, gs);
}
const ke = /* @__PURE__ */ w(hs, [["render", ps], ["__scopeId", "data-v-4328e024"]]), bs = N({
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
    const n = C("boneState"), o = _({
      value: k(() => {
        var s;
        let r = e.value;
        return n.bonestructure.time ? r = (s = e.value) == null ? void 0 : s.split("+")[0] : e.value && (r = new Date(e.value).toISOString().substr(0, 10)), r;
      }),
      typeString: k(() => {
        let r = "datetime-local";
        return n.bonestructure.time || (r = "date"), r;
      })
    });
    function a(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
}), vs = ["disabled", "type", "value"];
function ys(e, t, n, o, a, r) {
  return d(), m("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, vs);
}
const we = /* @__PURE__ */ w(bs, [["render", ys], ["__scopeId", "data-v-f1b8af8c"]]), $s = N({
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
    const n = C("boneState"), o = _({
      value: k(() => {
        let s = e.value;
        return Array.isArray(e.value) ? (n.bonestructure.values instanceof Array ? s = s.filter((i) => n.bonestructure.values.map((l) => l[0].toString()).includes(i)) : s = s.filter(
          (i) => Object.keys(n.bonestructure.values).map((l) => l.toString()).includes(i)
        ), s.map((i) => i.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function a() {
      if (Array.isArray(n.bonestructure.values))
        return n.bonestructure.values;
      {
        let s = [];
        for (const [i, l] of Object.entries(n.bonestructure.values))
          s.push([i, l]);
        return s;
      }
    }
    function r(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index), W;
    }
    return R(() => {
      t.emit("change", e.name, o.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: r,
      convertObjToList: a
    };
  }
}), Ss = ["disabled", "value", "multiple"], _s = ["value"];
function ks(e, t, n, o, a, r) {
  return d(), m("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (d(!0), m(S, null, j(e.convertObjToList(), (s) => (d(), m("sl-option", {
      key: s[0],
      value: s[0]
    }, A(s[1]), 9, _s))), 128))
  ], 40, Ss);
}
const Ee = /* @__PURE__ */ w($s, [["render", ks], ["__scopeId", "data-v-5a38b97f"]]), ws = N({
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
    const n = C("boneState"), o = _({
      value: k(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function a(r) {
      t.emit("change", e.name, r.target.checked, e.lang, e.index);
    }
    return R(() => {
      let r = e.value;
      r || (r = !1), t.emit("change", e.name, r, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
}), Es = ["disabled", "checked"];
function Is(e, t, n, o, a, r) {
  return d(), m("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Es);
}
const Ie = /* @__PURE__ */ w(ws, [["render", Is], ["__scopeId", "data-v-363598c8"]]), As = N({
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
    const n = C("boneState"), o = _({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), a = D(null);
    function r(i) {
      o.value1 === o.value2 ? o.equal = !0 : o.equal = !1, s(o.value1), o.requiredPasswordInfo.length === 0 && o.passwordInfo.length - o.requiredPasswordInfo.length <= n.bonestructure.test_threshold ? t.emit("change", e.name, o.value1, e.lang, e.index, !0) : t.emit("change", e.name, o.value1, e.lang, e.index, !1);
    }
    R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(i) {
      o.passwordInfo = [], o.requiredPasswordInfo = [];
      for (const l of n.bonestructure.tests)
        new RegExp(l[0]).test(i) || (l[2] ? o.requiredPasswordInfo.push(l[1]) : o.passwordInfo.push(l[1]));
      o.equal || o.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), o.value1 || o.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return se(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: i } = le(() => {
          a.value.focus();
        }, 600);
        i();
      }
    }), ae(
      () => e.value,
      (i, l) => {
        o.value1 = i;
      }
    ), {
      state: o,
      boneState: n,
      changeEvent: r,
      passwordBone: a
    };
  }
}), Cs = ["disabled"], Os = ["name"], Ns = ["name"], Rs = { class: "errors" };
function Bs(e, t, n, o, a, r) {
  return d(), m(S, null, [
    q(u("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.state.value1 = s),
      disabled: e.boneState.readonly,
      class: M({ "has-check": !e.boneState.readonly }),
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: t[1] || (t[1] = (...s) => e.changeEvent && e.changeEvent(...s)),
      onSlClear: t[2] || (t[2] = (s) => e.state.value1 = ""),
      onKeyup: t[3] || (t[3] = (...s) => e.changeEvent && e.changeEvent(...s))
    }, [
      u("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, Os)
    ], 42, Cs), [
      [Y, e.state.value1]
    ]),
    e.boneState.readonly ? v("", !0) : q((d(), m("sl-input", {
      key: 0,
      "onUpdate:modelValue": t[4] || (t[4] = (s) => e.state.value2 = s),
      class: "password-check",
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: t[5] || (t[5] = (...s) => e.changeEvent && e.changeEvent(...s)),
      onSlClear: t[6] || (t[6] = (s) => e.state.value2 = ""),
      onKeyup: t[7] || (t[7] = (...s) => e.changeEvent && e.changeEvent(...s))
    }, [
      u("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, Ns)
    ], 544)), [
      [Y, e.state.value2]
    ]),
    u("ul", Rs, [
      (d(!0), m(S, null, j(e.state.passwordInfo, (s, i) => (d(), m("li", { key: i }, A(s), 1))), 128)),
      (d(!0), m(S, null, j(e.state.requiredPasswordInfo, (s, i) => (d(), m("li", {
        key: i,
        class: "requiredInfo"
      }, A(s), 1))), 128))
    ])
  ], 64);
}
const Ae = /* @__PURE__ */ w(As, [["render", Bs], ["__scopeId", "data-v-0ccf18c0"]]), js = N({
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  emits: ["change"],
  setup(e, t) {
    const n = C("boneState"), o = _({
      value: k(() => e.value),
      structure: k(() => s(n.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var c, f;
        let i = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [h, p] of Object.entries(o.structure)) {
          let g = "default", b = o.structure[h], $ = (c = o.value) == null ? void 0 : c[h];
          (f = p == null ? void 0 : p.params) != null && f.category && (g = p.params.category.toLowerCase()), Object.keys(i).includes(g) ? i[g].bones.push({
            boneName: h,
            boneStructure: b,
            boneValue: $
          }) : i[g] = {
            name: p.params.category,
            bones: [
              {
                boneName: h,
                boneStructure: b,
                boneValue: $
              }
            ]
          }, b.visible === !0 && (i[g].groupVisible = !0);
        }
        let l = {};
        return Object.keys(i).sort().forEach(function(h) {
          l[h] = i[h];
        }), l;
      })
    });
    function a(i) {
      t.emit("change", i);
    }
    R(() => {
      nt().appContext.components.Bone ? o.globalRegistration = !0 : o.globalRegistration = !1, t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function r(i) {
      console.log(i);
    }
    function s(i) {
      if (Array.isArray(i)) {
        let l = {};
        for (const c in i)
          l[i[c][0]] = i[c][1];
        return l;
      } else
        return i;
    }
    return {
      state: o,
      boneState: n,
      getBoneWidget: G,
      structureToDict: s,
      changeEvent: a,
      updateValue: r
    };
  }
}), Vs = {
  key: 0,
  open: "",
  variant: "danger"
}, Ts = {
  key: 1,
  class: "form"
}, Ds = ["summary", "open"];
function Us(e, t, n, o, a, r) {
  const s = Q("bone");
  return e.state.globalRegistration ? (d(), m("div", Ts, [
    (d(!0), m(S, null, j(e.state.formGroups, (i, l) => q((d(), m("sl-details", {
      key: l,
      summary: i.name,
      open: i.groupOpen
    }, [
      (d(!0), m(S, null, j(i.bones, (c) => q((d(), B(s, {
        key: c.name,
        is: e.getBoneWidget(e.state.structure[c.boneName].type),
        name: c.boneName,
        structure: e.state.structure,
        skel: e.state.value,
        errors: e.boneState.errors,
        readonly: e.boneState.bonestructure.readonly ? !0 : void 0,
        onChangeInternal: e.changeEvent
      }, null, 8, ["is", "name", "structure", "skel", "errors", "readonly", "onChangeInternal"])), [
        [ue, e.state.structure[c.boneName].visible]
      ])), 128))
    ], 8, Ds)), [
      [ue, i.groupVisible]
    ])), 128))
  ])) : (d(), m("sl-alert", Vs, " In Order to use this Bone register the bone component globally in your main file "));
}
const qe = /* @__PURE__ */ w(js, [["render", Us], ["__scopeId", "data-v-e6fcfbca"]]), Ls = N({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: qe },
  emits: ["change"],
  setup(e, t) {
    const n = C("boneState"), o = _({
      value: {},
      index: k(() => e.index),
      lang: k(() => e.lang)
    });
    function a(r) {
      var i;
      (i = o.value) != null && i[r.name] || (o.value ? o.value[r.name] = null : o.value = { [r.name]: null });
      let s = o.value[r.name];
      r.lang ? (s === null && (s = {}), Object.keys(s).includes(r.lang) && r.index !== null ? s[r.lang][r.index] = r.value : s[r.lang] = r.value) : r.index !== null ? (s === null && (s = []), s[r.index] = r.value) : s = r.value, o.value[r.name] = s, t.emit("change", e.name, o.value, e.lang, e.index, !0);
    }
    return R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
});
function Ps(e, t, n, o, a, r) {
  const s = Q("Wrapper_nested");
  return d(), B(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Ce = /* @__PURE__ */ w(Ls, [["render", Ps], ["__scopeId", "data-v-84a761ce"]]), zs = N({
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
    const n = C("boneState"), o = _({});
    function a(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
}), Ms = ["disabled", "value"];
function qs(e, t, n, o, a, r) {
  return d(), m("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Ms);
}
const Oe = /* @__PURE__ */ w(zs, [["render", qs], ["__scopeId", "data-v-534b9149"]]), Ws = N({
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
    const n = C("boneState"), o = _({
      minAmount: k(() => n.bonestructure.minAmount),
      maxAmount: k(() => n.bonestructure.maxAmount),
      precision: k(() => {
        if (n.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(n.bonestructure.precision - 1)}1`);
      })
    }), a = D(null);
    function r(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return se(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = le(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: r,
      numericBone: a
    };
  }
}), Fs = ["disabled", "value", "min", "max", "step"], Ks = { class: "info" }, Hs = { key: 0 }, Gs = { key: 1 }, Zs = { key: 2 };
function Js(e, t, n, o, a, r) {
  return d(), m(S, null, [
    u("sl-input", {
      ref: "numericBone",
      type: "number",
      disabled: e.boneState.readonly,
      value: e.value,
      min: e.state.minAmount,
      max: e.state.maxAmount,
      step: e.state.precision,
      onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
      onKeyup: t[1] || (t[1] = (...s) => e.changeEvent && e.changeEvent(...s))
    }, null, 40, Fs),
    u("ul", Ks, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (d(), m("li", Hs, A(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : v("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (d(), m("li", Gs, A(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : v("", !0),
      e.state.precision ? (d(), m("li", Zs, A(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : v("", !0)
    ])
  ], 64);
}
const Ne = /* @__PURE__ */ w(Ws, [["render", Js], ["__scopeId", "data-v-03d5b399"]]);
var O = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class ee extends Error {
  constructor(t, n, o, a) {
    super(o || n), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = n, this.statusCode = t, this.response = a;
  }
}
let ie = null;
function H() {
  return ie || (ie = ce("requestStore", () => {
    const e = _({ sKeys: /* @__PURE__ */ new Set() });
    function t() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: t
    };
  })), ie();
}
class I {
  static resetState() {
    H().$reset(), H().$dispose();
  }
  static buildUrl(t) {
    return t && !(t.startsWith("http://") || t.startsWith("https://") || t.startsWith("//")) && (t = (O.VITE_API_URL ? O.VITE_API_URL : window.location.origin) + t), t;
  }
  static post(t, { dataObj: n = null, callback: o = null, failedCallback: a = null, abortController: r = null, headers: s = null, mode: i = null } = {}) {
    function l() {
      if (n instanceof FormData)
        return n;
      const f = new FormData();
      for (const h in n)
        if (Array.isArray(n[h]))
          for (let p of n[h])
            f.append(h, p);
        else
          f.append(h, n[h]);
      return f;
    }
    let c = x.post(I.buildUrl(t), l(), null, s, r, i);
    return c.then(function(f) {
      o && o(f.data);
    }).catch(function(f) {
      a && a(f);
    }), c;
  }
  static async getBatchSkeys(t = 30, n = O.VITE_DEFAULT_RENDERER || "json") {
    await I.get(`/${n}/skey`, {
      dataObj: { amount: t }
    }).then(async (o) => {
      let a = await o.json();
      Array.isArray(a) || (a = [a]), H().state.sKeys = new Set(a);
    });
  }
  static async securePost(t, {
    dataObj: n = null,
    callback: o = null,
    failedCallback: a = null,
    abortController: r = null,
    renderer: s = O.VITE_DEFAULT_RENDERER || "json",
    headers: i = null,
    mode: l = null,
    amount: c = 30
  } = {}) {
    let f = null;
    H().state.sKeys.size === 0 && await I.getBatchSkeys(c);
    const h = [...H().state.sKeys][0];
    return n instanceof FormData ? (n.append("skey", h), H().state.sKeys.delete(h)) : (n || (n = {}), n.skey = h, H().state.sKeys.delete(h)), f = I.post(t, {
      dataObj: n,
      callback: o,
      abortController: r,
      headers: i,
      mode: l
    }), f;
  }
  static get(t, {
    dataObj: n = null,
    callback: o = null,
    failedCallback: a = null,
    cached: r = !1,
    clearCache: s = !1,
    abortController: i = null,
    headers: l = null,
    mode: c = null,
    //          milli  sec  min  Std  Tage
    cacheTime: f = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let h = x.get(I.buildUrl(t), n, s, l, i, c);
    return h.then(function(p) {
      o && o(p.data);
    }).catch(function(p) {
      a && a(p);
    }), h;
  }
  static list(t, {
    dataObj: n = null,
    callback: o = null,
    failedCallback: a = null,
    group: r = null,
    abortController: s = null,
    renderer: i = (O == null ? void 0 : O.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let l = `/${i}/${t}/list`;
    return r && (l += `/${r}`), I.get(l, {
      dataObj: n,
      callback: o,
      failedCallback: a,
      abortController: s
    });
  }
  static getStructure(t, {
    dataObj: n = null,
    callback: o = null,
    failedCallback: a = null,
    group: r = null,
    abortController: s = null,
    renderer: i = (O == null ? void 0 : O.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    t = t.replace(/\//g, ".");
    let l = `/${i}/getStructure/${t}`;
    return r && (l += `/${r}`), I.get(l, {
      dataObj: n,
      callback: o,
      failedCallback: a,
      abortController: s
    });
  }
  static view(t, n, {
    dataObj: o = null,
    callback: a = null,
    failedCallback: r = null,
    group: s = null,
    abortController: i = null,
    renderer: l = (O == null ? void 0 : O.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let c = `/${l}/${t}/view/${n}`;
    return s && (c = `/${l}/${t}/view/${s}/${n}`), I.get(c, {
      dataObj: o,
      callback: a,
      failedCallback: r,
      abortController: i
    });
  }
  static add(t, {
    dataObj: n = null,
    callback: o = null,
    failedCallback: a = null,
    group: r = null,
    abortController: s = null,
    renderer: i = (O == null ? void 0 : O.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let l = `/${i}/${t}/add`;
    return r && (l = `/${i}/${t}/add/${r}`), I.securePost(l, {
      dataObj: n,
      callback: o,
      failedCallback: a,
      abortController: s
    });
  }
  static edit(t, n, {
    dataObj: o = null,
    callback: a = null,
    failedCallback: r = null,
    group: s = null,
    abortController: i = null,
    renderer: l = (O == null ? void 0 : O.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let c = `/${l}/${t}/edit/${n}`;
    return s && (c = `/${l}/${t}/edit/${s}/${n}`), I.securePost(c, {
      dataObj: o,
      callback: a,
      failedCallback: r,
      abortController: i
    });
  }
  static delete(t, n, {
    dataObj: o = null,
    callback: a = null,
    failedCallback: r = null,
    group: s = null,
    abortController: i = null,
    renderer: l = (O == null ? void 0 : O.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let c = `/${l}/${t}/delete/${n}`;
    return s && (c = `/${l}/${t}/delete/${s}/${n}`), I.securePost(c, {
      dataObj: o,
      callback: a,
      failedCallback: r,
      abortController: i,
      amount: 1
    });
  }
  static downloadUrlFor(t, n = !1) {
    return t && "dest" in t ? n && "thumbnail" in t.dest ? I.buildUrl(t.dest.thumbnail) : "downloadUrl" in t.dest ? I.buildUrl(t.dest.downloadUrl) : I.buildUrl(null) : I.buildUrl(t);
  }
  static uploadFile(t, n = void 0) {
    const o = {
      fileName: t.name,
      mimeType: t.type || "application/octet-stream",
      size: t.size.toString(),
      node: n
    };
    return new Promise((a, r) => {
      I.securePost("/vi/file/getUploadURL", { dataObj: o }).then(async (s) => {
        let i = await s.json();
        fetch(i.values.uploadUrl, {
          body: t,
          method: "POST",
          mode: "no-cors"
        }).then(async (l) => {
          const c = {
            key: i.values.uploadKey,
            skelType: "leaf"
          };
          I.securePost("/vi/file/add", { dataObj: c }).then(async (f) => {
            let h = await f.json();
            h.action === "addSuccess" ? a(h.values) : r(h);
          }).catch((f) => {
            r(f);
          });
        }).catch((l) => {
          r(l);
        });
      }).catch((s) => {
        r(s);
      });
    });
  }
}
class x {
  constructor() {
    pe(this, "withCredentials", !0);
  }
  static buildOptions(t, n = null, o = null, a = null, r = null) {
    let s = { method: t };
    return s.credentials = "include", s.headers = {
      Accept: "application/json, text/plain, */*"
    }, o && (s.headers = { ...s.headers, ...o }), n && (s.body = n), a && (s.signal = a.signal), r && (s.mode = r), s;
  }
  static get(t, n = null, o = null, a = null, r = null, s = null) {
    function i(l, c) {
      let f = new URL(l);
      if (c && Object.keys(c).length > 0) {
        const h = new URLSearchParams();
        for (const [p, g] of Object.entries(c))
          if (Array.isArray(g))
            for (const b of g)
              h.append(p, b);
          else
            h.append(p, g);
        f.search = h.toString();
      }
      return f.toString();
    }
    return fetch(i(t, n), x.buildOptions("GET", null, a, r, s)).then(async (l) => {
      if (l.ok)
        return l;
      {
        const c = `${l.status} ${l.statusText}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ee(l.status, l.statusText, c, l));
      }
    }).catch((l) => {
      if (l instanceof TypeError) {
        const f = `503 ${l.message}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ee(503, l.message, f, l));
      }
      if (l instanceof DOMException && l.name == "AbortError") {
        const f = `${l.code} ${l.name}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ee(l.code, l.name, f, { url: t }));
      }
      const c = `${l.statusCode} ${l.statusText}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ee(l.statusCode, l.statusText, c, l.response));
    });
  }
  static post(t, n = null, o = null, a = null, r = null, s = null) {
    return fetch(t, x.buildOptions("POST", n, a, r, s));
  }
}
var Qs = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Xs = N({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: qe },
  emits: ["change"],
  setup(e, t) {
    const n = C("boneState"), o = C("formatString"), a = _({
      format: k(() => n == null ? void 0 : n.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function r(l) {
      let c = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), I.get(
        `/${Qs.VITE_DEFAULT_RENDERER || "vi"}/${n.bonestructure.module}/list?${c}limit=99`
      ).then(async (f) => {
        var p;
        const h = await f.json();
        a.skellistdata = {};
        for (let g of h.skellist)
          a.skellistdata[g.key] = g;
        return (p = h.skellist) == null ? void 0 : p.map((g) => ({ text: o(n.bonestructure.format, { dest: g }), value: g.key, data: g }));
      });
    }
    function s(l) {
      a.selection = { dest: a.skellistdata[l.detail.item.value] }, t.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function i(l) {
      var f;
      a.selection || (a.selection = {}), (f = a.selection.rel) != null && f[l.name] || (a.selection.rel ? a.selection.rel[l.name] = null : a.selection.rel = { [l.name]: null });
      let c = a.selection.rel[l.name];
      l.lang ? (c === null && (c = {}), Object.keys(c).includes(l.lang) && l.index !== null ? c[l.lang][l.index] = l.value : c[l.lang] = l.value) : l.index !== null ? (c === null && (c = []), c[l.index] = l.value) : c = l.value, Object.keys(a.selection).includes("rel") && a.selection.rel ? a.selection.rel[l.name] = c : a.selection.rel = { [l.name]: c }, Object.keys(a.selection).includes("dest") && t.emit("change", e.name, a.selection, e.lang, e.index);
    }
    return R(() => {
      a.selection = e.value, t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: n,
      formatString: o,
      changeEvent: s,
      changeEventNested: i,
      getList: r
    };
  }
}), Ys = (e) => (L("data-v-61dd72e0"), e = e(), P(), e), xs = { class: "record" }, ea = { class: "single-entry" }, ta = ["value"], na = ["disabled", "source"], sa = ["title"], aa = /* @__PURE__ */ Ys(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), oa = [
  aa
];
function la(e, t, n, o, a, r) {
  var i, l;
  const s = Q("Wrapper_nested");
  return d(), m("div", xs, [
    u("div", ea, [
      e.state.selection ? (d(), m("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, ta)) : (d(), m("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: t[0] || (t[0] = (...c) => e.changeEvent && e.changeEvent(...c))
      }, null, 40, na)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (d(), m("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: t[1] || (t[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, oa, 8, sa)) : v("", !0)
    ]),
    (i = e.boneState) != null && i.bonestructure.using ? (d(), B(s, {
      key: 0,
      value: (l = e.value) == null ? void 0 : l.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : v("", !0)
  ]);
}
const Re = /* @__PURE__ */ w(Xs, [["render", la], ["__scopeId", "data-v-61dd72e0"]]), ra = N({
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
    const n = C("boneState"), o = _({});
    function a(r, s) {
      t.emit("change", e.name, r, e.lang, e.index);
    }
    return R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
}), ia = { class: "box" };
function ua(e, t, n, o, a, r) {
  return d(), m("div", ia, A(e.value), 1);
}
const da = /* @__PURE__ */ w(ra, [["render", ua], ["__scopeId", "data-v-343aca69"]]);
var Be = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const ca = N({
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
    const n = C("boneState"), o = D(), a = _({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    R(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function r() {
      console.log(I.downloadUrlFor(e.value)), window.open(I.downloadUrlFor(e.value));
    }
    function s() {
      return I.downloadUrlFor(e.value, !1);
    }
    function i(f) {
      const h = {
        fileName: f.name,
        mimeType: f.type || "application/octet-stream",
        size: f.size.toString()
      };
      return new Promise((p, g) => {
        I.securePost(`/${Be.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: h }).then(async (b) => {
          let $ = await b.json();
          fetch($.values.uploadUrl, {
            body: f,
            method: "POST",
            mode: "no-cors"
          }).then(async (y) => {
            const V = {
              key: $.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            I.securePost(`/${Be.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: V }).then(async (z) => {
              let K = await z.json();
              K.action === "addSuccess" ? p(K.values) : g(K);
            }).catch((z) => {
              g(z);
            });
          }).catch((y) => {
            g(y);
          });
        }).catch((b) => {
          g(b);
        });
      });
    }
    async function l(f) {
      a.loading = !0;
      for (let h of f.target.files) {
        let p = await i(h);
        o.value.value = null, t.emit("change", e.name, { dest: p, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function c(f) {
      a.loading = !0, a.droparea = !1;
      for (let h of f.dataTransfer.files) {
        let p = await i(h);
        o.value.value = null, t.emit("change", e.name, { dest: p, rel: null }, e.lang, e.index);
        break;
      }
      a.loading = !1;
    }
    return {
      state: a,
      boneState: n,
      downloadFile: r,
      createBackgroundImage: s,
      handleUpload: l,
      uploadinput: o,
      handleDrop: c
    };
  }
}), re = (e) => (L("data-v-91086308"), e = e(), P(), e), ma = {
  key: 0,
  class: "loader"
}, fa = /* @__PURE__ */ re(() => /* @__PURE__ */ u("sl-spinner", { slot: "suffix" }, null, -1)), ha = [
  fa
], ga = {
  key: 1,
  class: "droparea"
}, pa = ["title"], ba = /* @__PURE__ */ re(() => /* @__PURE__ */ u("sl-icon", { name: "upload" }, null, -1)), va = [
  ba
], ya = ["multiple"], $a = ["title"], Sa = /* @__PURE__ */ re(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), _a = [
  Sa
], ka = { class: "box" }, wa = ["src"], Ea = ["label", "open"], Ia = ["src"], Aa = {
  key: 1,
  class: "preview"
}, Ca = {
  key: 0,
  name: "file-earmark"
}, Oa = { key: 2 }, Na = ["title"], Ra = /* @__PURE__ */ re(() => /* @__PURE__ */ u("sl-icon", { name: "x-lg" }, null, -1)), Ba = [
  Ra
];
function ja(e, t, n, o, a, r) {
  var s, i, l, c, f, h, p, g, b, $;
  return d(), m("div", {
    class: "file-wrapper",
    onDragover: t[5] || (t[5] = ne((y) => e.state.droparea = !0, ["prevent"])),
    onDragleave: t[6] || (t[6] = (y) => e.state.droparea = !1),
    onDrop: t[7] || (t[7] = ne((...y) => e.handleDrop && e.handleDrop(...y), ["prevent"]))
  }, [
    e.state.loading ? (d(), m("div", ma, ha)) : v("", !0),
    e.state.droparea ? (d(), m("div", ga, " Dateien hier hinziehen ")) : v("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (d(), m("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: t[0] || (t[0] = (y) => e.uploadinput.click())
    }, va, 8, pa)) : v("", !0),
    u("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: t[1] || (t[1] = (...y) => e.handleUpload && e.handleUpload(...y))
    }, null, 40, ya),
    e.value ? (d(), m("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: t[2] || (t[2] = (...y) => e.downloadFile && e.downloadFile(...y))
    }, _a, 8, $a)) : v("", !0),
    u("div", ka, [
      (i = (s = e.value) == null ? void 0 : s.dest) != null && i.mimetype.includes("image") ? (d(), m("div", {
        key: 0,
        class: "preview has-preview",
        onClick: t[3] || (t[3] = (y) => e.state.previewopen = !e.state.previewopen)
      }, [
        u("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, wa),
        u("sl-dialog", {
          label: decodeURIComponent((c = (l = e.value) == null ? void 0 : l.dest) == null ? void 0 : c.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          u("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, Ia)
        ], 8, Ea)
      ])) : (d(), m("div", Aa, [
        (h = (f = e.value) == null ? void 0 : f.dest) != null && h.name ? (d(), m("sl-icon", Ca)) : v("", !0)
      ])),
      (g = (p = e.value) == null ? void 0 : p.dest) != null && g.name ? (d(), m("div", Oa, A(decodeURIComponent(($ = (b = e.value) == null ? void 0 : b.dest) == null ? void 0 : $.name)), 1)) : v("", !0)
    ]),
    e.boneState.multiple ? v("", !0) : (d(), m("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: t[4] || (t[4] = (y) => e.$emit("change", e.name, "", e.lang, e.index))
    }, Ba, 8, Na))
  ], 32);
}
const je = /* @__PURE__ */ w(ca, [["render", ja], ["__scopeId", "data-v-91086308"]]), Va = N({
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
    const n = C("boneState"), o = _({
      value: "",
      editorConfig: {},
      editor: k(() => be)
    });
    function a(i) {
      t.emit("change", e.name, o.value, e.lang, e.index);
    }
    function r(i) {
      o.value = i.target.value, t.emit("change", e.name, o.value, e.lang, e.index);
    }
    R(() => {
      e.value !== null && (o.value = e.value), t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(i) {
      i.editing.view.change((l) => {
        l.setStyle("min-height", "250px", i.editing.view.document.getRoot());
      });
    }
    return ae(
      () => e.value,
      (i, l) => {
        o.value = i;
      }
    ), {
      state: o,
      ClassicEditor: be,
      boneState: n,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: r
    };
  }
}), Ta = ["disabled", "value"];
function Da(e, t, n, o, a, r) {
  var i, l, c, f;
  const s = Q("ckeditor");
  return e.state.editor ? (d(), m(S, { key: 0 }, [
    (i = e.boneState.bonestructure) != null && i.valid_html || (l = e.boneState.bonestructure) != null && l.validHtml ? (d(), B(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": t[0] || (t[0] = (h) => e.state.value = h),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (d(), m("sl-textarea", {
      key: 1,
      disabled: (f = e.boneState) == null ? void 0 : f.readonly,
      value: e.value,
      onInput: t[1] || (t[1] = (...h) => e.changeEventTextarea && e.changeEventTextarea(...h))
    }, null, 40, Ta))
  ], 64)) : v("", !0);
}
const Ve = /* @__PURE__ */ w(Va, [["render", Da]]), Ua = N({
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
    const n = C("boneState"), o = _({
      valueLat: null,
      valueLng: null
    });
    function a() {
      t.emit("change", e.name, [o.valueLat, o.valueLng], e.lang, e.index);
    }
    return R(() => {
      try {
        o.valueLat = e.value[0], o.valueLng = e.value[1];
      } catch {
      }
      t.emit("change", e.name, [o.valueLat, o.valueLng], e.lang, e.index);
    }), {
      state: o,
      boneState: n,
      changeEvent: a
    };
  }
}), La = ["name", "min", "max", "disabled"], Pa = ["name", "min", "max", "disabled"];
function za(e, t, n, o, a, r) {
  return d(), m(S, null, [
    q(u("sl-input", {
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.state.valueLat = s),
      index: "lat",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: t[1] || (t[1] = (...s) => e.changeEvent && e.changeEvent(...s)),
      placeholder: "Lat"
    }, null, 40, La), [
      [Y, e.state.valueLat]
    ]),
    q(u("sl-input", {
      "onUpdate:modelValue": t[2] || (t[2] = (s) => e.state.valueLng = s),
      index: "lng",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: t[3] || (t[3] = (...s) => e.changeEvent && e.changeEvent(...s)),
      placeholder: "Long"
    }, null, 40, Pa), [
      [Y, e.state.valueLng]
    ])
  ], 64);
}
const Te = /* @__PURE__ */ w(Ua, [["render", za], ["__scopeId", "data-v-7bc31020"]]), Ma = N({
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
    const n = C("boneState"), o = _({
      counter: 0,
      debounce: null
    }), a = C("addMultipleEntry"), r = C("removeMultipleEntries");
    function s() {
      o.counter += 1;
      let l = 200;
      o.counter > 1 && (l = 500), o.debounce && clearTimeout(o.debounce), o.debounce = setTimeout(() => {
        for (let c = o.counter; c--; )
          a(e.lang);
        o.counter = 0;
      }, l);
    }
    function i() {
      let l = 200;
      o.debounce && clearTimeout(o.debounce), o.debounce = setTimeout(() => {
        r(e.lang);
      }, l);
    }
    return R(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: o,
      boneState: n,
      handleAdd: s,
      handleRemove: i,
      removeMultipleEntries: r
    };
  }
}), We = (e) => (L("data-v-63e75dee"), e = e(), P(), e), qa = { class: "actionbar" }, Wa = ["title"], Fa = /* @__PURE__ */ We(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ka = [
  Fa
], Ha = ["title"], Ga = /* @__PURE__ */ We(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Za(e, t, n, o, a, r) {
  return d(), m("div", qa, [
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (s) => e.handleRemove(e.lang))
    }, Ka, 8, Wa)) : v("", !0),
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: t[1] || (t[1] = (s) => e.handleAdd(e.lang))
    }, [
      Ga,
      E(" " + A(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (d(), m(S, { key: 0 }, [
        E("(" + A(e.state.counter) + ")", 1)
      ], 64)) : v("", !0)
    ], 8, Ha)) : v("", !0)
  ]);
}
const Ja = /* @__PURE__ */ w(Ma, [["render", Za], ["__scopeId", "data-v-63e75dee"]]);
var Qa = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Xa = N({
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
    const n = C("boneState"), o = C("addMultipleEntry"), a = C("formatString"), r = null, s = _({
      skels: {},
      hasUsing: k(() => n == null ? void 0 : n.bonestructure.using)
    });
    function i(l) {
      let c = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), I.get(
        `/${Qa.VITE_DEFAULT_RENDERER || "vi"}/${n.bonestructure.module}/list?${c}limit=99`
      ).then(async (f) => {
        var p;
        const h = await f.json();
        return s.skels = h.skellist.reduce((g, b) => (g[b.key] = b, g), {}), (p = h.skellist) == null ? void 0 : p.map((g) => ({ text: a(n.bonestructure.format, { dest: g }), value: g.key, data: g }));
      });
    }
    return R(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: n,
      addMultipleEntry: o,
      removeMultipleEntries: r,
      getList: i
    };
  }
}), Fe = (e) => (L("data-v-eeea51c6"), e = e(), P(), e), Ya = { class: "actionbar" }, xa = ["title"], eo = /* @__PURE__ */ Fe(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), to = [
  eo
], no = ["source"], so = ["title"], ao = /* @__PURE__ */ Fe(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function oo(e, t, n, o, a, r) {
  return d(), m("div", Ya, [
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (s) => e.openSelector())
    }, to, 8, xa)) : v("", !0),
    u("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: t[1] || (t[1] = (s) => {
        var i;
        return e.addMultipleEntry(e.lang, {
          dest: (i = e.state.skels) == null ? void 0 : i[s.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, no),
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: t[2] || (t[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      ao,
      E(" " + A(e.$t("bone.list")), 1)
    ], 8, so)) : v("", !0)
  ]);
}
const lo = /* @__PURE__ */ w(Xa, [["render", oo], ["__scopeId", "data-v-eeea51c6"]]);
var De = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const ro = N({
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
    const n = C("boneState"), o = C("addMultipleEntry");
    C("formatString");
    const a = null, r = D(), s = _({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => n == null ? void 0 : n.bonestructure.using)
    });
    function i(f) {
      const h = {
        fileName: f.name,
        mimeType: f.type || "application/octet-stream",
        size: f.size.toString()
      };
      return new Promise((p, g) => {
        I.securePost(`/${De.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: h }).then(async (b) => {
          let $ = await b.json();
          fetch($.values.uploadUrl, {
            body: f,
            method: "POST",
            mode: "no-cors"
          }).then(async (y) => {
            const V = {
              key: $.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            I.securePost(`/${De.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: V }).then(async (z) => {
              let K = await z.json();
              K.action === "addSuccess" ? p(K.values) : g(K);
            }).catch((z) => {
              g(z);
            });
          }).catch((y) => {
            g(y);
          });
        }).catch((b) => {
          g(b);
        });
      });
    }
    async function l(f) {
      s.loading = !0;
      for (let h of f.target.files) {
        let p = await i(h);
        r.value.value = null;
        let g = null;
        s.hasUsing && (g = void 0), o(e.lang, { dest: p, rel: g });
      }
      s.loading = !1;
    }
    async function c(f) {
      s.loading = !0, s.droparea = !1;
      for (let h of f.dataTransfer.files) {
        let p = await i(h);
        r.value.value = null;
        let g = null;
        s.hasUsing && (g = void 0), o(e.lang, { dest: p, rel: g });
      }
      s.loading = !1;
    }
    return R(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: n,
      addMultipleEntry: o,
      removeMultipleEntries: a,
      uploadFile: i,
      uploadinput: r,
      handleUpload: l,
      handleDrop: c
    };
  }
}), he = (e) => (L("data-v-9bac9f8a"), e = e(), P(), e), io = ["title"], uo = /* @__PURE__ */ he(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), co = [
  uo
], mo = {
  key: 1,
  class: "droparea"
}, fo = ["multiple"], ho = ["title"], go = /* @__PURE__ */ he(() => /* @__PURE__ */ u("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), po = [
  go
], bo = ["title"], vo = /* @__PURE__ */ he(() => /* @__PURE__ */ u("sl-icon", { name: "upload" }, null, -1)), yo = {
  key: 0,
  slot: "suffix"
};
function $o(e, t, n, o, a, r) {
  return d(), m("div", {
    class: "actionbar",
    onDragover: t[4] || (t[4] = ne((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: t[5] || (t[5] = (s) => e.state.droparea = !1),
    onDrop: t[6] || (t[6] = ne((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (s) => e.openSelector())
    }, co, 8, io)) : v("", !0),
    e.state.droparea ? (d(), m("div", mo, " Dateien hier hinziehen ")) : v("", !0),
    u("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: t[1] || (t[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, fo),
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: t[2] || (t[2] = (s) => e.addMultipleEntry(e.lang))
    }, po, 8, ho)) : v("", !0),
    e.boneState.multiple && !e.readonly ? (d(), m("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: t[3] || (t[3] = (s) => e.uploadinput.click())
    }, [
      vo,
      E(" " + A(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (d(), m("sl-spinner", yo)) : v("", !0)
    ], 8, bo)) : v("", !0)
  ], 32);
}
const So = /* @__PURE__ */ w(ro, [["render", $o], ["__scopeId", "data-v-9bac9f8a"]]), _o = ce("boneStore", () => {
  const e = _({
    additionalBones: U({}),
    defaultBones: U({
      rawBone: $e,
      keyBone: Se,
      stringBone: _e,
      emailBone: ke,
      dateBone: we,
      booleanBone: Ie,
      selectBone: Ee,
      passwordBone: Ae,
      recordBone: Ce,
      numericBone: Ne,
      colorBone: Oe,
      relationalBone: Re,
      jsonBone: da,
      fileBone: je,
      textBone: Ve,
      spatialBone: Te
    }),
    actionbars: U({
      "relational.tree.leaf.file.file": So,
      "relational.": lo
    }),
    multibones: U(["select", "select."])
  });
  function t(s, i) {
    e.additionalBones[s] = i;
  }
  function n() {
    let s = e.defaultBones;
    for (const [i, l] of Object.entries(e.additionalBones))
      s.add(l);
    return s;
  }
  function o(s) {
    if (Object.keys(e.additionalBones).includes(s))
      return e.additionalBones[s];
    {
      let i = s.split("."), l = Object.entries(e.additionalBones).filter(
        (c) => c[0].startsWith(i[0] + ".")
      );
      if (l.length > 0) {
        l.sort((c, f) => f.length - c.length);
        for (let c of l)
          if (s.startsWith(c[0]))
            return e.additionalBones[c[0]];
      }
    }
    return s === "date" ? we : s === "key" ? Se : s === "str.email" ? ke : s === "str" || s.startsWith("str.") ? _e : s === "select" || s.startsWith("select.") ? Ee : s === "bool" ? Ie : s === "password" ? Ae : s === "record" ? Ce : s === "numeric" || s.startsWith("numeric.") ? Ne : s === "relational.tree.leaf.file.file" ? je : s === "relational" || s.startsWith("relational.") ? Re : s === "color" ? Oe : s === "text" ? Ve : s === "spatial" ? Te : $e;
  }
  function a(s, i) {
    e.actionbars[s] = i;
  }
  function r(s) {
    if (Object.keys(e.actionbars).includes(s))
      return e.actionbars[s];
    {
      let i = s.split("."), l = Object.entries(e.actionbars).filter(
        (c) => c[0].startsWith(i[0] + ".")
      );
      if (l.length > 0) {
        l.sort((c, f) => f.length - c.length);
        for (let c of l)
          if (s.startsWith(c[0]))
            return e.actionbars[c[0]];
      }
    }
    return Ja;
  }
  return {
    state: e,
    addBoneWidget: t,
    getBoneWidget: o,
    importWidgets: n,
    addBoneActionbar: a,
    getBoneActionbar: r
  };
});
function G(e) {
  return _o().getBoneWidget(e);
}
const ge = (e) => (L("data-v-4d14c6fe"), e = e(), P(), e), ko = /* @__PURE__ */ ge(() => /* @__PURE__ */ u("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), wo = { class: "viur-shop-form-wrap" }, Eo = /* @__PURE__ */ ge(() => /* @__PURE__ */ u("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Io = { class: "viur-shop-form-wrap" }, Ao = { key: 0 }, Co = /* @__PURE__ */ ge(() => /* @__PURE__ */ u("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Oo = { class: "viur-shop-form-wrap" }, No = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const t = Z(), n = _({
      formValues: {},
      requiredFieldsFilled: k(() => {
        if (n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("billing.city") && Object.keys(n.formValues).includes("billing.street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
        if (!n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      addSkel: null,
      errors: {}
    });
    function o(s) {
      n.isCustomAdress = !s.target.checked;
    }
    function a(s, i) {
      for (const [l, c] of Object.entries(i.value[0]))
        n.formValues[l] = c;
    }
    function r(s) {
      let i = {};
      return Array.isArray(s) ? (s.forEach((l) => {
        let c = l[0], f = l[1];
        i[c] = f;
      }), console.log("output", i), i) : s;
    }
    return ae(n.formValues, (s) => {
      Object.entries(s).forEach(([i, l]) => {
        l === "" && delete n.formValues[i];
      });
    }), F(async () => {
      await t.getAddressStructure(), await t.getAddress(), n.addSkel = r(t.state.structure.address), n.formValues = t.state.shippingAddress;
    }), (s, i) => {
      const l = Q("bone");
      return d(), m(S, null, [
        u("div", null, [
          ko,
          u("div", wo, [
            (d(!0), m(S, null, j(n.addSkel, (c, f) => (d(), m(S, { key: f }, [
              c.visible && c.params.group === "Customer Info" ? (d(), m("div", {
                key: 0,
                class: M("viur-shop-form-bone-" + f)
              }, [
                c.visible && c.params.group === "Customer Info" ? (d(), B(l, {
                  key: 0,
                  is: T(G)(c.type),
                  name: f,
                  structure: r(n.addSkel),
                  errors: n.errors[f] ? n.errors[f] : [],
                  skel: n.formValues,
                  onChange: (h) => a(f, h),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : v("", !0)
              ], 2)) : v("", !0)
            ], 64))), 128))
          ])
        ]),
        u("div", null, [
          Eo,
          u("div", Io, [
            (d(!0), m(S, null, j(n.addSkel, (c, f) => (d(), m(S, { key: f }, [
              c.visible && c.params.group === "Customer Address" ? (d(), m("div", {
                key: 0,
                class: M("viur-shop-form-bone-" + f)
              }, [
                c.visible && c.params.group === "Customer Address" ? (d(), B(l, {
                  key: 0,
                  is: T(G)(c.type),
                  name: f,
                  structure: r(n.addSkel),
                  errors: n.errors[f] ? n.errors[f] : [],
                  skel: n.formValues,
                  onChange: (h) => a(f, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : v("", !0)
              ], 2)) : v("", !0)
            ], 64))), 128))
          ])
        ]),
        n.isCustomAdress ? (d(), m("div", Ao, [
          Co,
          u("div", Oo, [
            (d(!0), m(S, null, j(n.addSkel, (c, f) => (d(), m(S, { key: f }, [
              c.visible && c.params.group === "Customer Address" ? (d(), m("div", {
                key: 0,
                class: M("viur-shop-form-bone-" + f)
              }, [
                c.visible && c.params.group === "Customer Address" ? (d(), B(l, {
                  key: 0,
                  is: T(G)(c.type),
                  name: f,
                  structure: r(n.addSkel),
                  errors: n.errors[f] ? n.errors[f] : [],
                  skel: n.formValues,
                  onChange: (h) => a(f, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : v("", !0)
              ], 2)) : v("", !0)
            ], 64))), 128))
          ])
        ])) : v("", !0),
        u("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Ro = /* @__PURE__ */ w(No, [["__scopeId", "data-v-4d14c6fe"]]), J = (e) => (L("data-v-c4232b7a"), e = e(), P(), e), Bo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), jo = { class: "viur-shop-form-wrap" }, Vo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), To = ["onSlChange", "onSlClear", "label"], Do = ["value"], Uo = { key: 0 }, Lo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Po = { class: "viur-shop-form-wrap" }, zo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), Mo = [
  zo
], qo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), Wo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), Fo = /* @__PURE__ */ J(() => /* @__PURE__ */ u("br", null, null, -1)), Ko = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const t = Z(), n = _({
      formValues: {},
      requiredFieldsFilled: k(() => {
        if (n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("billing.city") && Object.keys(n.formValues).includes("billing.street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
        if (!n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      shippingAdressAmount: 1,
      maxShippingAdress: k(
        () => Object.keys(t.state.carts).length + 2
      ),
      amountAlert: { title: "", msg: "" },
      items: null,
      addSkel: null,
      errors: {},
      selectedItem: {},
      isInit: k(() => !!t.state.carts[t.state.basket])
    }), o = D(null), a = D(null);
    function r(p) {
      p.target.checked && (n.isCustomAdress = !1), p.target.checked || (n.isCustomAdress = !0);
    }
    function s() {
      if (n.shippingAdressAmount === n.maxShippingAdress) {
        n.amountAlert.title = "Zu viele Lieferadressen", n.amountAlert.msg = `Sie können nur maximal: "${n.maxShippingAdress}" Lieferadressen verwenden.`, a.value.show();
        return;
      }
      n.shippingAdressAmount += 1;
    }
    function i(p, g) {
      for (const [b, $] of Object.entries(g.value[0]))
        n.formValues[b] = $;
    }
    function l() {
      if (n.shippingAdressAmount === 1) {
        n.amountAlert.title = "Zu wenig Lieferadressen", n.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      n.shippingAdressAmount -= 1;
    }
    function c(p, g) {
      if (console.log(p.target.value), !p.target.value.length) {
        f();
        return;
      }
      n.selectedItem[g] = p.target.value, n.isItemSelected = !0;
    }
    function f(p, g) {
      console.log("clearing..."), delete n.selectedItem[g], n.isItemSelected = !1;
    }
    function h(p) {
      let g = {};
      return Array.isArray(p) ? (p.forEach((b) => {
        let $ = b[0], y = b[1];
        g[$] = y;
      }), g) : p;
    }
    return ae(n.formValues, (p) => {
      Object.entries(p).forEach(([g, b]) => {
        b === "" && delete n.formValues[g];
      });
    }), F(async () => {
      await t.getAddressStructure(), n.addSkel = h(t.state.structure.address);
    }), (p, g) => {
      const b = Q("bone");
      return d(), m(S, null, [
        u("div", null, [
          Bo,
          u("div", jo, [
            (d(!0), m(S, null, j(n.addSkel, ($, y) => (d(), m(S, { key: y }, [
              $.visible && $.params.group === "Customer Info" ? (d(), m("div", {
                key: 0,
                class: M("viur-shop-form-bone-" + y)
              }, [
                $.visible && $.params.group === "Customer Info" ? (d(), B(b, {
                  key: 0,
                  is: T(G)($.type),
                  name: y,
                  structure: h(n.addSkel),
                  errors: n.errors[y] ? n.errors[y] : [],
                  skel: n.formValues,
                  onChange: (V) => i(y, V)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : v("", !0)
              ], 2)) : v("", !0)
            ], 64))), 128))
          ])
        ]),
        Vo,
        (d(!0), m(S, null, j(n.shippingAdressAmount, ($) => (d(), m("div", {
          class: "viur-shop-form-wrap",
          key: $
        }, [
          u("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: o,
            onSlChange: (y) => c(y, $),
            onSlClear: (y) => f(y, $),
            label: n.selectedItem[$] ? T(t).state.carts[n.selectedItem[$]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (d(!0), m(S, null, j(T(t).state.carts, (y, V) => (d(), m("sl-option", { value: V }, A(y.info.name), 9, Do))), 256))
          ], 40, To),
          (d(!0), m(S, null, j(n.addSkel, (y, V) => (d(), m(S, { key: V }, [
            y.visible && y.params.group === "Customer Address" ? (d(), m("div", {
              key: 0,
              class: M("viur-shop-form-bone-" + V)
            }, [
              y.visible && y.params.group === "Customer Address" ? (d(), B(b, {
                key: 0,
                is: T(G)(y.type),
                name: V,
                structure: h(n.addSkel),
                errors: n.errors[V] ? n.errors[V] : [],
                skel: n.formValues,
                onChange: (z) => i(V, z)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : v("", !0)
            ], 2)) : v("", !0)
          ], 64))), 128))
        ]))), 128)),
        n.isCustomAdress ? (d(), m("div", Uo, [
          Lo,
          u("div", Po, [
            (d(!0), m(S, null, j(n.addSkel, ($, y) => (d(), m(S, { key: y }, [
              $.visible && $.params.group === "Customer Address" ? (d(), m("div", {
                key: 0,
                class: M("viur-shop-form-bone-" + y)
              }, [
                $.visible && $.params.group === "Customer Address" ? (d(), B(b, {
                  key: 0,
                  is: T(G)($.type),
                  name: y,
                  structure: h(n.addSkel),
                  errors: n.errors[y] ? n.errors[y] : [],
                  skel: n.formValues,
                  onChange: (V) => i(y, V)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : v("", !0)
              ], 2)) : v("", !0)
            ], 64))), 128))
          ])
        ])) : v("", !0),
        u("div", { class: "viur-shop-form-btn-wrap" }, [
          u("sl-button", {
            size: "medium",
            onClick: l,
            title: "Lieferadresse entfernen"
          }, Mo),
          u("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            qo,
            E(" Lieferadresse hinzufügen ")
          ])
        ]),
        u("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: a,
          closable: ""
        }, [
          Wo,
          u("strong", null, A(n.amountAlert.title), 1),
          Fo,
          E(" " + A(n.amountAlert.msg), 1)
        ], 512),
        u("sl-checkbox", {
          onSlChange: r,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Ho = /* @__PURE__ */ w(Ko, [["__scopeId", "data-v-c4232b7a"]]), Go = { key: 0 }, Zo = { key: 1 }, Ue = {
  __name: "OrderTabHeader",
  props: {
    a: {
      type: String
    },
    b: {
      type: String
    }
  },
  setup(e) {
    return (t, n) => (d(), m(S, null, [
      E(" HALLO "),
      e.a ? (d(), m("div", Go, A(e.a), 1)) : v("", !0),
      e.b ? (d(), m("div", Zo, A(e.b), 1)) : v("", !0)
    ], 64));
  }
}, Jo = {
  __name: "ExampleUsage",
  setup(e) {
    const t = Z(), n = k(
      () => t.state.basketRootNode.key ? t.state.basketRootNode.key : ""
    ), o = _({
      rootNode: {},
      tabs: {
        cart: {
          component: U(de),
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
          disabled: !1,
          atShow: null,
          atHide: null
        },
        confirm: {
          component: U(Me),
          props: {},
          displayName: "Bestellung prüfen",
          // icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        // order: {
        //   component: shallowRef(CategoryView),
        //   props: {
        //     listHandler: ListRequest("categorystore", {
        //       module: "variante",
        //       params: { type: "dk", limit: 99 },
        //     }),
        //   },
        //   displayName: "Artikel Bestellen",
        //   icon: { name: "cart-add", library: "hsk" },
        //   position: 1,
        //   disabled: false,
        //   atShow: null,
        //   atHide: null,
        // },
        orderComplete: {
          component: U(xn),
          props: {
            redirectUrl: "http://localhost:8081",
            additionalComponents: [
              {
                component: U(Ue),
                props: {}
              },
              {
                component: U(Ue),
                props: { a: "TERRT" }
              },
              {
                component: U(de),
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
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: U(Ro),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: U(Ho),
          props: {},
          displayName: "Daten Eingeben (Multi)",
          icon: { name: "card-list" },
          position: 4,
          disabled: !1,
          atShow: null,
          atHide: null
        }
      }
    });
    function a(r) {
      (r == null ? void 0 : r.detail.name) === "confirm" && (o.tabs.orderComplete.disabled = !1);
    }
    return F(async () => {
      await t.init(), await t.getAddressStructure(), console.log("debug init exampleusage :", t.state.basketRootNode);
    }), (r, s) => (d(), B(en, {
      tabs: o.tabs,
      onTabChange: a,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jo
}, Symbol.toStringTag, { value: "Module" })), Xo = Ge(), ll = {
  install(e) {
    e.use(Xo);
  }
};
export {
  de as C,
  xn as O,
  en as S,
  Ro as U,
  ll as V,
  w as _,
  Jo as a,
  Me as b,
  ol as c,
  Ho as d,
  Z as u
};
