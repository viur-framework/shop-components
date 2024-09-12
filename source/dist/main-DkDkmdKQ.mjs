var jt = Object.defineProperty;
var Nt = (e, n, t) => n in e ? jt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var et = (e, n, t) => Nt(e, typeof n != "symbol" ? n + "" : n, t);
import { defineStore as Ge, createPinia as xt } from "pinia";
import { reactive as E, defineComponent as B, openBlock as p, createElementBlock as v, toDisplayString as M, createElementVNode as m, createCommentVNode as C, createTextVNode as O, createBlock as x, resolveDynamicComponent as Ue, mergeProps as It, Fragment as k, withDirectives as te, vShow as qe, ref as G, unref as D, onBeforeMount as Y, createVNode as ne, computed as A, normalizeClass as X, renderSlot as re, renderList as L, useCssVars as zt, Transition as Tt, withCtx as We, vModelText as fe, h as Le, isRef as Ht, shallowRef as W, watch as ae, watchEffect as pe, Text as Gt, Teleport as Ut, inject as P, onMounted as j, readonly as qt, getCurrentScope as Wt, onScopeDispose as Kt, provide as ke, resolveComponent as ue, getCurrentInstance as Xt, withModifiers as Ce } from "vue";
import { Request as Zt } from "@viur/vue-utils";
import { ViURShopClient as Jt } from "@viur/viur-shop-client";
import { useRoute as Yt, createRouter as Qt, createWebHashHistory as en } from "vue-router";
import tt from "@viur/ckeditor5-build-classic";
const le = Ge("cartstore", () => {
  const e = new Jt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = E({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    billingAddress: {},
    shippingAddress: {}
  });
  async function t() {
    await r();
  }
  async function o(c) {
    return await e.cart_list({ cart_key: c });
  }
  async function r() {
    (await e.cart_list()).forEach((d) => {
      d.is_root_node && (d.cart_type === "basket" ? n.basketRootNode = d : n.whishlistRootNodes.push(d));
    });
  }
  async function s(c, d) {
    let h = await e.article_add({
      article_key: c,
      parent_cart_key: d
    });
    console.log("addToCart", h);
  }
  async function l(c, d) {
    let h = await e.article_view({
      article_key: c,
      parent_cart_key: d
    });
    console.log("getArticleView", h);
  }
  async function a(c, d) {
    let h = await e.article_remove({
      article_key: c,
      parent_cart_key: d
    });
    console.log("remove Resp", h);
  }
  async function i(c, d, h) {
    let S = await e.article_update({
      article_key: c,
      parent_cart_key: d,
      quantity: h,
      quantity_mode: "replace"
    });
    console.log("update Resp", S);
  }
  async function u() {
    const c = await e.address_structure();
    n.structure.address = c.addSkel;
  }
  async function g() {
    const c = await e.address_list();
    for (const d of c)
      d.address_type === "billing" && (n.billingAddress = d), d.address_type === "shipping" && (n.shippingAddress = d);
  }
  async function f(c) {
    await e.discount_add({ code: c, discount_key: void 0 });
  }
  return {
    state: n,
    addToCart: s,
    getArticleView: l,
    removeItem: a,
    updateItem: i,
    init: t,
    getAddressStructure: u,
    getChildren: o,
    addDiscount: f,
    getAddress: g
  };
}), V = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, r] of n)
    t[o] = r;
  return t;
}, tn = B({
  props: {},
  components: {},
  setup(e, n) {
    const t = Yt();
    return { state: E({}), route: t };
  }
}), nn = { class: "home" };
function on(e, n, t, o, r, s) {
  return p(), v("div", nn, "View " + M(e.route.path) + " is missing.", 1);
}
const rn = /* @__PURE__ */ V(tn, [["render", on]]), sn = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: rn
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-xE1AA9y2.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-D-osgfP9.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => go)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => li)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => vr)
  }
];
function pi(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(sn), Qt({
    // @ts-ignore
    history: en("/"),
    routes: t
  });
}
const ln = ["panel", "disabled"], an = { class: "viur-shop-order-step" }, un = ["name", "library"], dn = { class: "viur-shop-order-status-text" }, cn = { class: "viur-shop-order-status-span" }, gn = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, fn = {
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
    return (n, t) => {
      var o;
      return p(), v("sl-tab", {
        class: "viur-shop-order-tab",
        slot: "nav",
        panel: e.tab,
        disabled: e.tabs[e.tab].disabled
      }, [
        m("div", an, [
          (o = e.tabs[e.tab].icon) != null && o.name ? (p(), v("sl-icon", {
            key: 0,
            class: "viur-shop-order-step-icon",
            name: e.tabs[e.tab].icon.name,
            library: e.tabs[e.tab].icon.library
          }, null, 8, un)) : C("", !0),
          m("div", dn, [
            O(M(e.tabIdx + 1) + ". ", 1),
            m("span", cn, M(e.tabs[e.tab].displayName), 1)
          ])
        ]),
        e.tabIdx < e.stepperLength - 1 ? (p(), v("sl-icon", gn)) : C("", !0)
      ], 8, ln);
    };
  }
}, mn = /* @__PURE__ */ V(fn, [["__scopeId", "data-v-e6e66706"]]), pn = ["name"], vn = {
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
  setup(e, { emit: n }) {
    const t = n;
    function o() {
      t("goToStart");
    }
    return (r, s) => (p(), v("sl-tab-panel", {
      class: "viur-shop-order-tab-panel",
      name: e.tab
    }, [
      (p(), x(Ue(e.tabs[e.tab].component), It(e.tabs[e.tab].props ? e.tabs[e.tab].props : "", {
        onGoToStart: s[0] || (s[0] = (l) => o())
      }), null, 16))
    ], 8, pn));
  }
}, hn = /* @__PURE__ */ V(vn, [["__scopeId", "data-v-f815b85b"]]), Sn = {
  __name: "StepperTrigger",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  emits: { prevTab: null, nextTab: null },
  setup(e, { emit: n }) {
    const t = n;
    function o() {
      t("prevTab");
    }
    function r() {
      t("nextTab");
    }
    return (s, l) => (p(), v(k, null, [
      te(m("sl-button", {
        type: "submit",
        onClick: l[0] || (l[0] = (a) => o())
      }, " Zurück ", 512), [
        [qe, e.index !== 0]
      ]),
      m("sl-button", {
        type: "submit",
        variant: "primary",
        onClick: l[1] || (l[1] = (a) => r())
      }, " Weiter ")
    ], 64));
  }
}, bn = /* @__PURE__ */ V(Sn, [["__scopeId", "data-v-90b8c464"]]), yn = { class: "viur-shop-discount" }, $n = { class: "viur-shop-discount-alert" }, Cn = { key: 0 }, wn = { key: 0 }, Rn = { key: 1 }, kn = {
  __name: "Discount",
  setup(e) {
    const n = le(), t = G(null), o = G(null), r = E({
      errorMessage: ""
    });
    async function s() {
      o.value.hide();
      const l = t.value.value;
      if (!l) {
        o.value.show(), r.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      let a = await n.addDiscount(l);
      console.log("resp", a);
    }
    return (l, a) => (p(), v(k, null, [
      m("div", yn, [
        m("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: t,
          class: "viur-shop-discount-input"
        }, null, 512),
        m("sl-button", {
          onClick: s,
          class: "viur-shop-discount-submit-btn"
        }, "Einlösen")
      ]),
      m("div", $n, [
        m("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: o,
          closable: "",
          duration: "2000"
        }, [
          a[0] || (a[0] = m("sl-icon", {
            slot: "icon",
            name: "info-circle"
          }, null, -1)),
          O(" " + M(r.errorMessage), 1)
        ], 512)
      ]),
      m("div", null, [
        D(n).state.basketRootNode.discount ? (p(), v("div", Cn, [
          D(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (p(), v("span", wn, " Sie haben einen Rabattcode im Wert von " + M(D(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : C("", !0),
          D(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (p(), v("span", Rn, " Sie haben einen Rabattcode im Wert von " + M(D(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : C("", !0)
        ])) : C("", !0)
      ])
    ], 64));
  }
}, _n = { key: 0 }, In = { key: 1 }, En = { class: "viur-shop-cart-sidebar-info-line" }, Vn = ["value"], An = { class: "viur-shop-cart-sidebar-info-line" }, Fn = ["value"], Pn = { class: "viur-shop-cart-sidebar-info-line" }, Mn = ["value"], On = { class: "viur-shop-cart-sidebar-info-line total" }, Dn = ["value"], Ln = { class: "viur-shop-cart-sidebar-btn-wrap" }, Bn = { class: "viur-shop-discount-wrap" }, jn = {
  __name: "ShopSummary",
  setup(e) {
    const n = le(), t = E({ basketRootNode: {}, loading: !0 });
    return Y(async () => {
      await n.init(), t.basketRootNode = n.state.basketRootNode, t.loading = !1;
    }), (o, r) => {
      var s, l, a;
      return t.loading ? (p(), v("sl-spinner", _n)) : (p(), v("div", In, [
        r[7] || (r[7] = m("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1)),
        r[8] || (r[8] = m("br", null, null, -1)),
        m("div", En, [
          r[0] || (r[0] = m("span", null, "Zwischensumme", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: t.basketRootNode.total
          }, null, 8, Vn),
          r[1] || (r[1] = m("br", null, null, -1))
        ]),
        m("div", An, [
          r[2] || (r[2] = m("span", null, "Rabatt", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: (s = t.basketRootNode) != null && s.discount ? t.basketRootNode.discount : 0
          }, null, 8, Fn)
        ]),
        m("div", Pn, [
          r[3] || (r[3] = m("span", null, "Versandkosten", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: (l = t.basketRootNode) != null && l.shipping ? t.basketRootNode.shipping : 0
          }, null, 8, Mn)
        ]),
        m("div", On, [
          r[4] || (r[4] = m("span", null, "Gesamt:", -1)),
          m("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: t.basketRootNode.total + ((a = t.basketRootNode) == null ? void 0 : a.shipping) - t.basketRootNode.discount
          }, null, 8, Dn)
        ]),
        m("div", Ln, [
          m("div", Bn, [
            ne(kn)
          ]),
          r[5] || (r[5] = m("sl-button", {
            variant: "primary",
            size: "medium"
          }, " Jetzt Bestellen ", -1)),
          r[6] || (r[6] = m("sl-button", {
            size: "medium",
            variant: "info"
          }, [
            m("sl-icon", {
              name: "paypal",
              slot: "prefix"
            }),
            O(" Paypal ")
          ], -1))
        ])
      ]));
    };
  }
}, Nn = { class: "bind viur-shop-wrap" }, xn = {
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = E({
      tabNames: A(() => l(t.tabs)),
      tabIdx: 0,
      currentTab: ""
    }), s = G(null);
    function l(f) {
      let c = [], d = [];
      for (const h in f)
        f[h].position ? c.push([h, f[h].position]) : c.push([h, 0]);
      return c.sort((h, S) => h[1] - S[1]), c.forEach((h) => {
        d.push(h[0]);
      }), d;
    }
    function a(f) {
      r.currentTab = f == null ? void 0 : f.detail.name, r.tabIdx = r.tabNames.indexOf(r.currentTab), o("tabChange", f);
    }
    function i() {
      r.tabIdx > 0 && s.value.show(r.tabNames[r.tabIdx - 1]);
    }
    function u() {
      r.tabIdx < r.tabNames.length - 1 && s.value.show(r.tabNames[r.tabIdx + 1]);
    }
    function g() {
      s.value.show(r.tabNames[0]);
    }
    return Y(() => {
      const f = l(t.tabs);
      r.currentTab = f[0];
    }), (f, c) => (p(), v("div", Nn, [
      m("div", {
        class: X(["viur-shop-stepper-wrap", { "full-width": e.sidebarBottom }])
      }, [
        re(f.$slots, "main", {}, () => [
          m("sl-tab-group", {
            class: "viur-shop-order-tabgroup",
            noScrollControls: "",
            onSlTabShow: c[1] || (c[1] = (d) => a(d)),
            ref_key: "tabGroup",
            ref: s
          }, [
            (p(!0), v(k, null, L(r.tabNames, (d, h) => (p(), x(mn, {
              key: d,
              tab: d,
              tabs: e.tabs,
              tabIdx: h,
              stepperLength: r.tabNames.length
            }, null, 8, ["tab", "tabs", "tabIdx", "stepperLength"]))), 128)),
            (p(!0), v(k, null, L(r.tabNames, (d) => (p(), x(hn, {
              tab: d,
              tabs: e.tabs,
              key: d,
              onGoToStart: c[0] || (c[0] = (h) => g())
            }, null, 8, ["tab", "tabs"]))), 128))
          ], 544)
        ], !0),
        e.trigger ? re(f.$slots, "trigger", { key: 0 }, () => [
          r.tabIdx !== r.tabNames.length - 1 ? (p(), v("div", {
            key: 0,
            class: X(["viur-shop-form-footer", { "flex-end": r.tabIdx === 0, "last-row": e.sidebarBottom }])
          }, [
            ne(bn, {
              index: r.tabIdx,
              onPrevTab: i,
              onNextTab: u
            }, null, 8, ["index"])
          ], 2)) : C("", !0)
        ], !0) : C("", !0)
      ], 2),
      e.sidebar && r.tabIdx < r.tabNames.length - 1 ? re(f.$slots, "sidebar", { key: 0 }, () => [
        m("div", {
          class: X(["viur-shop-sidebar-wrap", { bottom: e.sidebarBottom }])
        }, [
          ne(jn)
        ], 2)
      ], !0) : C("", !0)
    ]));
  }
}, zn = /* @__PURE__ */ V(xn, [["__scopeId", "data-v-1c7a5ff9"]]), Ke = {
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
  setup(e, n) {
    const t = E({
      trackWidth: A(() => `${e.size / 30}rem`),
      outerSize: A(() => `calc(${e.size}rem + ${t.trackWidth})`),
      spinnerSize: A(() => `${e.size}rem`),
      logoSize: A(() => `calc(${e.size}rem - ${t.trackWidth} * 10)`),
      shadow: A(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: t };
  }
}, nt = () => {
  zt((e) => ({
    "093d3ce6": e.state.outerSize,
    59135762: e.state.shadow,
    "752117bb": e.state.logoSize,
    "6b8fc82a": e.state.spinnerSize,
    "7aa7f471": e.color,
    "4e300eea": e.state.trackWidth
  }));
}, ot = Ke.setup;
Ke.setup = ot ? (e, n) => (nt(), ot(e, n)) : nt;
const Tn = {
  key: 0,
  class: "loading"
}, Hn = { class: "logo" }, Gn = ["src"];
function Un(e, n, t, o, r, s) {
  return p(), x(Tt, null, {
    default: We(() => [
      t.active ? (p(), v("div", Tn, [
        n[0] || (n[0] = m("sl-spinner", { class: "loader" }, null, -1)),
        m("div", Hn, [
          m("sl-icon", {
            src: t.logo,
            class: "logo-color"
          }, null, 8, Gn)
        ])
      ])) : C("", !0)
    ]),
    _: 1
  });
}
const qn = /* @__PURE__ */ V(Ke, [["render", Un], ["__scopeId", "data-v-b78f8b7f"]]), Wn = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return E({}), (n, t) => (p(), v("pre", null, M(e.node.name), 1));
  }
}, Kn = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, Xn = ["src"], Zn = ["innerHTML"], Jn = { class: "viur-shop-cart-leaf-artno" }, Yn = ["innerHTML"], Qn = { class: "viur-shop-cart-leaf-quantity" }, eo = { class: "viur-shop-cart-leaf-unitprice" }, to = ["value"], no = { class: "viur-shop-cart-leaf-actions" }, oo = { class: "viur-shop-cart-leaf-price" }, ro = ["value"], so = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 },
    placeholder: { type: String, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = E({
      leaf: {}
    });
    function s(i) {
      return i !== void 0 ? Zt.downloadUrlFor(i) : t.placeholder;
    }
    function l(i, u, g, f) {
      o("updateItem", {
        item: i,
        articleKey: u,
        node: g,
        quantity: f
      });
    }
    function a(i, u, g) {
      o("removeItem", { item: i, articleKey: u, node: g });
    }
    return Y(() => {
      r.leaf = t.leaf;
    }), (i, u) => (p(), v("sl-card", Kn, [
      m("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: s(
          r.leaf.article.dest.shop_image ? r.leaf.article.dest.shop_image : void 0
        )
      }, null, 8, Xn),
      m("h4", {
        class: "viur-shop-cart-leaf-headline headline",
        innerHTML: r.leaf.article.dest.shop_name
      }, null, 8, Zn),
      m("h5", Jn, M(r.leaf.article.dest.shop_art_no_or_gtin), 1),
      m("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: r.leaf.article.dest.shop_description
      }, null, 8, Yn),
      m("div", Qn, [
        te(m("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": u[0] || (u[0] = (g) => r.leaf.quantity = g),
          onInput: u[1] || (u[1] = (g) => l(
            r.leaf,
            r.leaf.article.dest.key,
            e.node,
            r.leaf.quantity
          ))
        }, null, 544), [
          [fe, r.leaf.quantity]
        ])
      ]),
      m("div", eo, [
        u[3] || (u[3] = m("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)),
        m("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail
        }, null, 8, to)
      ]),
      m("div", no, [
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
          onClick: u[2] || (u[2] = (g) => a(r.leaf, r.leaf.article.dest.key, e.node))
        }, u[4] || (u[4] = [
          m("sl-icon", {
            name: "trash",
            slot: "prefix"
          }, null, -1)
        ]))
      ]),
      m("div", oo, [
        u[6] || (u[6] = m("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)),
        m("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail * e.leaf.quantity
        }, null, 8, ro)
      ])
    ]));
  }
}, lo = /* @__PURE__ */ V(so, [["__scopeId", "data-v-a8bf8404"]]), io = { key: 0 }, ao = {
  class: "footer-wrap",
  slot: "footer"
}, uo = { class: "viur-shop-cart-node" }, co = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    placeholder: { type: String, required: !0 }
  },
  setup(e) {
    const n = e, t = le(), o = G(null), r = E({
      itemsIsInit: A(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    A(() => n.mode === "basket" ? t.state.basketRootNode.key : n.cartKey);
    async function s() {
      o.value.hide(), await t.updateItem(
        r.currentItem.article.dest.key,
        r.currentNode.key,
        0
      ), await u();
    }
    async function l(f) {
      console.log("updateItem :", f), f.quantity === 0 ? (o.value.show(), r.currentItem = f.item, r.currentNode = f.node) : (await t.updateItem(f.articleKey, f.node.key, f.quantity), await t.init());
    }
    function a(f) {
      console.log("removeItem :", f), o.value.show(), r.currentItem = f.item, r.currentNode = f.node;
    }
    async function i() {
      r.leaves[r.currentNode.key].forEach((f) => {
        f.key === r.currentItem.key && (f.quantity = 1);
      }), r.currentItem = {}, r.currentNode = {};
    }
    async function u() {
      r.nodes = [], r.leaves = {}, await t.init(), await g();
    }
    async function g(f = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", f);
      const c = await t.getChildren(f);
      console.log("getChildren children: ", c), c.forEach(async (d) => {
        d.skel_type === "node" ? (r.nodes.push(d), await g(d.key)) : (Object.keys(r.leaves).includes(f) || (r.leaves[f] = []), r.leaves[f].push(d));
      });
    }
    return Y(async () => {
      await t.init(), await g(), n.mode === "basket" && r.nodes.push(t.state.basketRootNode), console.log("state.nodes test", r.nodes), console.log("state.leaves", r.leaves);
    }), (f, c) => e.cartKey.length ? (p(), v(k, { key: 1 }, [
      m("sl-dialog", {
        ref_key: "confirm",
        ref: o,
        onSlHide: i
      }, [
        c[1] || (c[1] = m("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)),
        m("div", ao, [
          m("sl-button", {
            variant: "danger",
            onClick: c[0] || (c[0] = (d) => o.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          m("sl-button", {
            variant: "success",
            onClick: s,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (p(!0), v(k, null, L(r.nodes, (d) => (p(), v("div", uo, [
        Object.keys(r.leaves).includes(d.key) ? (p(), v(k, { key: 0 }, [
          ne(Wn, { node: d }, null, 8, ["node"]),
          (p(!0), v(k, null, L(r.leaves[d.key], (h) => (p(), x(lo, {
            key: h.key,
            leaf: h,
            node: d,
            placeholder: e.placeholder,
            onRemoveItem: a,
            onUpdateItem: l
          }, null, 8, ["leaf", "node", "placeholder"]))), 128))
        ], 64)) : C("", !0)
      ]))), 256)),
      c[2] || (c[2] = m("div", { class: "viur-shop-cart-mobile-footer" }, [
        m("sl-button", {
          variant: "primary",
          size: "medium"
        }, " Jetzt Bestellen")
      ], -1))
    ], 64)) : (p(), v("sl-spinner", io));
  }
}, Be = /* @__PURE__ */ V(co, [["__scopeId", "data-v-915785ee"]]), go = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
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
function fo() {
  return {
    accessor: (e, n) => typeof e == "function" ? {
      ...n,
      accessorFn: e
    } : {
      ...n,
      accessorKey: e
    },
    display: (e) => e,
    group: (e) => e
  };
}
function ee(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function q(e, n) {
  return (t) => {
    n.setState((o) => ({
      ...o,
      [e]: ee(t, o[e])
    }));
  };
}
function we(e) {
  return e instanceof Function;
}
function mo(e) {
  return Array.isArray(e) && e.every((n) => typeof n == "number");
}
function po(e, n) {
  const t = [], o = (r) => {
    r.forEach((s) => {
      t.push(s);
      const l = n(s);
      l != null && l.length && o(l);
    });
  };
  return o(e), t;
}
function w(e, n, t) {
  let o = [], r;
  return (s) => {
    let l;
    t.key && t.debug && (l = Date.now());
    const a = e(s);
    if (!(a.length !== o.length || a.some((g, f) => o[f] !== g)))
      return r;
    o = a;
    let u;
    if (t.key && t.debug && (u = Date.now()), r = n(...a), t == null || t.onChange == null || t.onChange(r), t.key && t.debug && t != null && t.debug()) {
      const g = Math.round((Date.now() - l) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, c = f / 16, d = (h, S) => {
        for (h = String(h); h.length < S; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${d(f, 5)} /${d(g, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * c, 120))}deg 100% 31%);`, t == null ? void 0 : t.key);
    }
    return r;
  };
}
function R(e, n, t, o) {
  return {
    debug: () => {
      var r;
      return (r = e == null ? void 0 : e.debugAll) != null ? r : e[n];
    },
    key: process.env.NODE_ENV === "development" && t,
    onChange: o
  };
}
function vo(e, n, t, o) {
  const r = () => {
    var l;
    return (l = s.getValue()) != null ? l : e.options.renderFallbackValue;
  }, s = {
    id: `${n.id}_${t.id}`,
    row: n,
    column: t,
    getValue: () => n.getValue(o),
    renderValue: r,
    getContext: w(() => [e, t, n, s], (l, a, i, u) => ({
      table: l,
      column: a,
      row: i,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), R(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((l) => {
    l.createCell == null || l.createCell(s, t, n, e);
  }, {}), s;
}
function ho(e, n, t, o) {
  var r, s;
  const a = {
    ...e._getDefaultColumnDef(),
    ...n
  }, i = a.accessorKey;
  let u = (r = (s = a.id) != null ? s : i ? typeof String.prototype.replaceAll == "function" ? i.replaceAll(".", "_") : i.replace(/\./g, "_") : void 0) != null ? r : typeof a.header == "string" ? a.header : void 0, g;
  if (a.accessorFn ? g = a.accessorFn : i && (i.includes(".") ? g = (c) => {
    let d = c;
    for (const S of i.split(".")) {
      var h;
      d = (h = d) == null ? void 0 : h[S], process.env.NODE_ENV !== "production" && d === void 0 && console.warn(`"${S}" in deeply nested key "${i}" returned undefined.`);
    }
    return d;
  } : g = (c) => c[a.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: g,
    parent: o,
    depth: t,
    columnDef: a,
    columns: [],
    getFlatColumns: w(() => [!0], () => {
      var c;
      return [f, ...(c = f.columns) == null ? void 0 : c.flatMap((d) => d.getFlatColumns())];
    }, R(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: w(() => [e._getOrderColumnsFn()], (c) => {
      var d;
      if ((d = f.columns) != null && d.length) {
        let h = f.columns.flatMap((S) => S.getLeafColumns());
        return c(h);
      }
      return [f];
    }, R(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const c of e._features)
    c.createColumn == null || c.createColumn(f, e);
  return f;
}
const U = "debugHeaders";
function rt(e, n, t) {
  var o;
  let s = {
    id: (o = t.id) != null ? o : n.id,
    column: n,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const l = [], a = (i) => {
        i.subHeaders && i.subHeaders.length && i.subHeaders.map(a), l.push(i);
      };
      return a(s), l;
    },
    getContext: () => ({
      table: e,
      header: s,
      column: n
    })
  };
  return e._features.forEach((l) => {
    l.createHeader == null || l.createHeader(s, e);
  }), s;
}
const So = {
  createTable: (e) => {
    e.getHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o, r) => {
      var s, l;
      const a = (s = o == null ? void 0 : o.map((f) => t.find((c) => c.id === f)).filter(Boolean)) != null ? s : [], i = (l = r == null ? void 0 : r.map((f) => t.find((c) => c.id === f)).filter(Boolean)) != null ? l : [], u = t.filter((f) => !(o != null && o.includes(f.id)) && !(r != null && r.includes(f.id)));
      return he(n, [...a, ...u, ...i], e);
    }, R(e.options, U, "getHeaderGroups")), e.getCenterHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o, r) => (t = t.filter((s) => !(o != null && o.includes(s.id)) && !(r != null && r.includes(s.id))), he(n, t, e, "center")), R(e.options, U, "getCenterHeaderGroups")), e.getLeftHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (n, t, o) => {
      var r;
      const s = (r = o == null ? void 0 : o.map((l) => t.find((a) => a.id === l)).filter(Boolean)) != null ? r : [];
      return he(n, s, e, "left");
    }, R(e.options, U, "getLeftHeaderGroups")), e.getRightHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (n, t, o) => {
      var r;
      const s = (r = o == null ? void 0 : o.map((l) => t.find((a) => a.id === l)).filter(Boolean)) != null ? r : [];
      return he(n, s, e, "right");
    }, R(e.options, U, "getRightHeaderGroups")), e.getFooterGroups = w(() => [e.getHeaderGroups()], (n) => [...n].reverse(), R(e.options, U, "getFooterGroups")), e.getLeftFooterGroups = w(() => [e.getLeftHeaderGroups()], (n) => [...n].reverse(), R(e.options, U, "getLeftFooterGroups")), e.getCenterFooterGroups = w(() => [e.getCenterHeaderGroups()], (n) => [...n].reverse(), R(e.options, U, "getCenterFooterGroups")), e.getRightFooterGroups = w(() => [e.getRightHeaderGroups()], (n) => [...n].reverse(), R(e.options, U, "getRightFooterGroups")), e.getFlatHeaders = w(() => [e.getHeaderGroups()], (n) => n.map((t) => t.headers).flat(), R(e.options, U, "getFlatHeaders")), e.getLeftFlatHeaders = w(() => [e.getLeftHeaderGroups()], (n) => n.map((t) => t.headers).flat(), R(e.options, U, "getLeftFlatHeaders")), e.getCenterFlatHeaders = w(() => [e.getCenterHeaderGroups()], (n) => n.map((t) => t.headers).flat(), R(e.options, U, "getCenterFlatHeaders")), e.getRightFlatHeaders = w(() => [e.getRightHeaderGroups()], (n) => n.map((t) => t.headers).flat(), R(e.options, U, "getRightFlatHeaders")), e.getCenterLeafHeaders = w(() => [e.getCenterFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), R(e.options, U, "getCenterLeafHeaders")), e.getLeftLeafHeaders = w(() => [e.getLeftFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), R(e.options, U, "getLeftLeafHeaders")), e.getRightLeafHeaders = w(() => [e.getRightFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), R(e.options, U, "getRightLeafHeaders")), e.getLeafHeaders = w(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (n, t, o) => {
      var r, s, l, a, i, u;
      return [...(r = (s = n[0]) == null ? void 0 : s.headers) != null ? r : [], ...(l = (a = t[0]) == null ? void 0 : a.headers) != null ? l : [], ...(i = (u = o[0]) == null ? void 0 : u.headers) != null ? i : []].map((g) => g.getLeafHeaders()).flat();
    }, R(e.options, U, "getLeafHeaders"));
  }
};
function he(e, n, t, o) {
  var r, s;
  let l = 0;
  const a = function(c, d) {
    d === void 0 && (d = 1), l = Math.max(l, d), c.filter((h) => h.getIsVisible()).forEach((h) => {
      var S;
      (S = h.columns) != null && S.length && a(h.columns, d + 1);
    }, 0);
  };
  a(e);
  let i = [];
  const u = (c, d) => {
    const h = {
      depth: d,
      id: [o, `${d}`].filter(Boolean).join("_"),
      headers: []
    }, S = [];
    c.forEach((b) => {
      const y = [...S].reverse()[0], $ = b.column.depth === h.depth;
      let _, N = !1;
      if ($ && b.column.parent ? _ = b.column.parent : (_ = b.column, N = !0), y && (y == null ? void 0 : y.column) === _)
        y.subHeaders.push(b);
      else {
        const H = rt(t, _, {
          id: [o, d, _.id, b == null ? void 0 : b.id].filter(Boolean).join("_"),
          isPlaceholder: N,
          placeholderId: N ? `${S.filter((I) => I.column === _).length}` : void 0,
          depth: d,
          index: S.length
        });
        H.subHeaders.push(b), S.push(H);
      }
      h.headers.push(b), b.headerGroup = h;
    }), i.push(h), d > 0 && u(S, d - 1);
  }, g = n.map((c, d) => rt(t, c, {
    depth: l,
    index: d
  }));
  u(g, l - 1), i.reverse();
  const f = (c) => c.filter((h) => h.column.getIsVisible()).map((h) => {
    let S = 0, b = 0, y = [0];
    h.subHeaders && h.subHeaders.length ? (y = [], f(h.subHeaders).forEach((_) => {
      let {
        colSpan: N,
        rowSpan: H
      } = _;
      S += N, y.push(H);
    })) : S = 1;
    const $ = Math.min(...y);
    return b = b + $, h.colSpan = S, h.rowSpan = b, {
      colSpan: S,
      rowSpan: b
    };
  });
  return f((r = (s = i[0]) == null ? void 0 : s.headers) != null ? r : []), i;
}
const bo = (e, n, t, o, r, s, l) => {
  let a = {
    id: n,
    index: o,
    original: t,
    depth: r,
    parentId: l,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (i) => {
      if (a._valuesCache.hasOwnProperty(i))
        return a._valuesCache[i];
      const u = e.getColumn(i);
      if (u != null && u.accessorFn)
        return a._valuesCache[i] = u.accessorFn(a.original, o), a._valuesCache[i];
    },
    getUniqueValues: (i) => {
      if (a._uniqueValuesCache.hasOwnProperty(i))
        return a._uniqueValuesCache[i];
      const u = e.getColumn(i);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (a._uniqueValuesCache[i] = u.columnDef.getUniqueValues(a.original, o), a._uniqueValuesCache[i]) : (a._uniqueValuesCache[i] = [a.getValue(i)], a._uniqueValuesCache[i]);
    },
    renderValue: (i) => {
      var u;
      return (u = a.getValue(i)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => po(a.subRows, (i) => i.subRows),
    getParentRow: () => a.parentId ? e.getRow(a.parentId, !0) : void 0,
    getParentRows: () => {
      let i = [], u = a;
      for (; ; ) {
        const g = u.getParentRow();
        if (!g) break;
        i.push(g), u = g;
      }
      return i.reverse();
    },
    getAllCells: w(() => [e.getAllLeafColumns()], (i) => i.map((u) => vo(e, a, u, u.id)), R(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: w(() => [a.getAllCells()], (i) => i.reduce((u, g) => (u[g.column.id] = g, u), {}), R(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let i = 0; i < e._features.length; i++) {
    const u = e._features[i];
    u == null || u.createRow == null || u.createRow(a, e);
  }
  return a;
}, yo = {
  createColumn: (e, n) => {
    e._getFacetedRowModel = n.options.getFacetedRowModel && n.options.getFacetedRowModel(n, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : n.getPreFilteredRowModel(), e._getFacetedUniqueValues = n.options.getFacetedUniqueValues && n.options.getFacetedUniqueValues(n, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = n.options.getFacetedMinMaxValues && n.options.getFacetedMinMaxValues(n, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Et = (e, n, t) => {
  var o, r;
  const s = t == null || (o = t.toString()) == null ? void 0 : o.toLowerCase();
  return !!(!((r = e.getValue(n)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(s));
};
Et.autoRemove = (e) => K(e);
const Vt = (e, n, t) => {
  var o;
  return !!(!((o = e.getValue(n)) == null || (o = o.toString()) == null) && o.includes(t));
};
Vt.autoRemove = (e) => K(e);
const At = (e, n, t) => {
  var o;
  return ((o = e.getValue(n)) == null || (o = o.toString()) == null ? void 0 : o.toLowerCase()) === (t == null ? void 0 : t.toLowerCase());
};
At.autoRemove = (e) => K(e);
const Ft = (e, n, t) => {
  var o;
  return (o = e.getValue(n)) == null ? void 0 : o.includes(t);
};
Ft.autoRemove = (e) => K(e) || !(e != null && e.length);
const Pt = (e, n, t) => !t.some((o) => {
  var r;
  return !((r = e.getValue(n)) != null && r.includes(o));
});
Pt.autoRemove = (e) => K(e) || !(e != null && e.length);
const Mt = (e, n, t) => t.some((o) => {
  var r;
  return (r = e.getValue(n)) == null ? void 0 : r.includes(o);
});
Mt.autoRemove = (e) => K(e) || !(e != null && e.length);
const Ot = (e, n, t) => e.getValue(n) === t;
Ot.autoRemove = (e) => K(e);
const Dt = (e, n, t) => e.getValue(n) == t;
Dt.autoRemove = (e) => K(e);
const Xe = (e, n, t) => {
  let [o, r] = t;
  const s = e.getValue(n);
  return s >= o && s <= r;
};
Xe.resolveFilterValue = (e) => {
  let [n, t] = e, o = typeof n != "number" ? parseFloat(n) : n, r = typeof t != "number" ? parseFloat(t) : t, s = n === null || Number.isNaN(o) ? -1 / 0 : o, l = t === null || Number.isNaN(r) ? 1 / 0 : r;
  if (s > l) {
    const a = s;
    s = l, l = a;
  }
  return [s, l];
};
Xe.autoRemove = (e) => K(e) || K(e[0]) && K(e[1]);
const J = {
  includesString: Et,
  includesStringSensitive: Vt,
  equalsString: At,
  arrIncludes: Ft,
  arrIncludesAll: Pt,
  arrIncludesSome: Mt,
  equals: Ot,
  weakEquals: Dt,
  inNumberRange: Xe
};
function K(e) {
  return e == null || e === "";
}
const $o = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: q("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, n) => {
    e.getAutoFilterFn = () => {
      const t = n.getCoreRowModel().flatRows[0], o = t == null ? void 0 : t.getValue(e.id);
      return typeof o == "string" ? J.includesString : typeof o == "number" ? J.inNumberRange : typeof o == "boolean" || o !== null && typeof o == "object" ? J.equals : Array.isArray(o) ? J.arrIncludes : J.weakEquals;
    }, e.getFilterFn = () => {
      var t, o;
      return we(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (t = (o = n.options.filterFns) == null ? void 0 : o[e.columnDef.filterFn]) != null ? t : J[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var t, o, r;
      return ((t = e.columnDef.enableColumnFilter) != null ? t : !0) && ((o = n.options.enableColumnFilters) != null ? o : !0) && ((r = n.options.enableFilters) != null ? r : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var t;
      return (t = n.getState().columnFilters) == null || (t = t.find((o) => o.id === e.id)) == null ? void 0 : t.value;
    }, e.getFilterIndex = () => {
      var t, o;
      return (t = (o = n.getState().columnFilters) == null ? void 0 : o.findIndex((r) => r.id === e.id)) != null ? t : -1;
    }, e.setFilterValue = (t) => {
      n.setColumnFilters((o) => {
        const r = e.getFilterFn(), s = o == null ? void 0 : o.find((g) => g.id === e.id), l = ee(t, s ? s.value : void 0);
        if (st(r, l, e)) {
          var a;
          return (a = o == null ? void 0 : o.filter((g) => g.id !== e.id)) != null ? a : [];
        }
        const i = {
          id: e.id,
          value: l
        };
        if (s) {
          var u;
          return (u = o == null ? void 0 : o.map((g) => g.id === e.id ? i : g)) != null ? u : [];
        }
        return o != null && o.length ? [...o, i] : [i];
      });
    };
  },
  createRow: (e, n) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (n) => {
      const t = e.getAllLeafColumns(), o = (r) => {
        var s;
        return (s = ee(n, r)) == null ? void 0 : s.filter((l) => {
          const a = t.find((i) => i.id === l.id);
          if (a) {
            const i = a.getFilterFn();
            if (st(i, l.value, a))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(o);
    }, e.resetColumnFilters = (n) => {
      var t, o;
      e.setColumnFilters(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.columnFilters) != null ? t : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function st(e, n, t) {
  return (e && e.autoRemove ? e.autoRemove(n, t) : !1) || typeof n > "u" || typeof n == "string" && !n;
}
const Co = (e, n, t) => t.reduce((o, r) => {
  const s = r.getValue(e);
  return o + (typeof s == "number" ? s : 0);
}, 0), wo = (e, n, t) => {
  let o;
  return t.forEach((r) => {
    const s = r.getValue(e);
    s != null && (o > s || o === void 0 && s >= s) && (o = s);
  }), o;
}, Ro = (e, n, t) => {
  let o;
  return t.forEach((r) => {
    const s = r.getValue(e);
    s != null && (o < s || o === void 0 && s >= s) && (o = s);
  }), o;
}, ko = (e, n, t) => {
  let o, r;
  return t.forEach((s) => {
    const l = s.getValue(e);
    l != null && (o === void 0 ? l >= l && (o = r = l) : (o > l && (o = l), r < l && (r = l)));
  }), [o, r];
}, _o = (e, n) => {
  let t = 0, o = 0;
  if (n.forEach((r) => {
    let s = r.getValue(e);
    s != null && (s = +s) >= s && (++t, o += s);
  }), t) return o / t;
}, Io = (e, n) => {
  if (!n.length)
    return;
  const t = n.map((s) => s.getValue(e));
  if (!mo(t))
    return;
  if (t.length === 1)
    return t[0];
  const o = Math.floor(t.length / 2), r = t.sort((s, l) => s - l);
  return t.length % 2 !== 0 ? r[o] : (r[o - 1] + r[o]) / 2;
}, Eo = (e, n) => Array.from(new Set(n.map((t) => t.getValue(e))).values()), Vo = (e, n) => new Set(n.map((t) => t.getValue(e))).size, Ao = (e, n) => n.length, _e = {
  sum: Co,
  min: wo,
  max: Ro,
  extent: ko,
  mean: _o,
  median: Io,
  unique: Eo,
  uniqueCount: Vo,
  count: Ao
}, Fo = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var n, t;
      return (n = (t = e.getValue()) == null || t.toString == null ? void 0 : t.toString()) != null ? n : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: q("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, n) => {
    e.toggleGrouping = () => {
      n.setGrouping((t) => t != null && t.includes(e.id) ? t.filter((o) => o !== e.id) : [...t ?? [], e.id]);
    }, e.getCanGroup = () => {
      var t, o;
      return ((t = e.columnDef.enableGrouping) != null ? t : !0) && ((o = n.options.enableGrouping) != null ? o : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.includes(e.id);
    }, e.getGroupedIndex = () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const t = e.getCanGroup();
      return () => {
        t && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const t = n.getCoreRowModel().flatRows[0], o = t == null ? void 0 : t.getValue(e.id);
      if (typeof o == "number")
        return _e.sum;
      if (Object.prototype.toString.call(o) === "[object Date]")
        return _e.extent;
    }, e.getAggregationFn = () => {
      var t, o;
      if (!e)
        throw new Error();
      return we(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (t = (o = n.options.aggregationFns) == null ? void 0 : o[e.columnDef.aggregationFn]) != null ? t : _e[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (n) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(n), e.resetGrouping = (n) => {
      var t, o;
      e.setGrouping(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.grouping) != null ? t : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, n) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (t) => {
      if (e._groupingValuesCache.hasOwnProperty(t))
        return e._groupingValuesCache[t];
      const o = n.getColumn(t);
      return o != null && o.columnDef.getGroupingValue ? (e._groupingValuesCache[t] = o.columnDef.getGroupingValue(e.original), e._groupingValuesCache[t]) : e.getValue(t);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, n, t, o) => {
    e.getIsGrouped = () => n.getIsGrouped() && n.id === t.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && n.getIsGrouped(), e.getIsAggregated = () => {
      var r;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((r = t.subRows) != null && r.length);
    };
  }
};
function Po(e, n, t) {
  if (!(n != null && n.length) || !t)
    return e;
  const o = e.filter((s) => !n.includes(s.id));
  return t === "remove" ? o : [...n.map((s) => e.find((l) => l.id === s)).filter(Boolean), ...o];
}
const Mo = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: q("columnOrder", e)
  }),
  createColumn: (e, n) => {
    e.getIndex = w((t) => [ge(n, t)], (t) => t.findIndex((o) => o.id === e.id), R(n.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (t) => {
      var o;
      return ((o = ge(n, t)[0]) == null ? void 0 : o.id) === e.id;
    }, e.getIsLastColumn = (t) => {
      var o;
      const r = ge(n, t);
      return ((o = r[r.length - 1]) == null ? void 0 : o.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (n) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(n), e.resetColumnOrder = (n) => {
      var t;
      e.setColumnOrder(n ? [] : (t = e.initialState.columnOrder) != null ? t : []);
    }, e._getOrderColumnsFn = w(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (n, t, o) => (r) => {
      let s = [];
      if (!(n != null && n.length))
        s = r;
      else {
        const l = [...n], a = [...r];
        for (; a.length && l.length; ) {
          const i = l.shift(), u = a.findIndex((g) => g.id === i);
          u > -1 && s.push(a.splice(u, 1)[0]);
        }
        s = [...s, ...a];
      }
      return Po(s, t, o);
    }, R(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Ie = () => ({
  left: [],
  right: []
}), Oo = {
  getInitialState: (e) => ({
    columnPinning: Ie(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: q("columnPinning", e)
  }),
  createColumn: (e, n) => {
    e.pin = (t) => {
      const o = e.getLeafColumns().map((r) => r.id).filter(Boolean);
      n.setColumnPinning((r) => {
        var s, l;
        if (t === "right") {
          var a, i;
          return {
            left: ((a = r == null ? void 0 : r.left) != null ? a : []).filter((f) => !(o != null && o.includes(f))),
            right: [...((i = r == null ? void 0 : r.right) != null ? i : []).filter((f) => !(o != null && o.includes(f))), ...o]
          };
        }
        if (t === "left") {
          var u, g;
          return {
            left: [...((u = r == null ? void 0 : r.left) != null ? u : []).filter((f) => !(o != null && o.includes(f))), ...o],
            right: ((g = r == null ? void 0 : r.right) != null ? g : []).filter((f) => !(o != null && o.includes(f)))
          };
        }
        return {
          left: ((s = r == null ? void 0 : r.left) != null ? s : []).filter((f) => !(o != null && o.includes(f))),
          right: ((l = r == null ? void 0 : r.right) != null ? l : []).filter((f) => !(o != null && o.includes(f)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((o) => {
      var r, s, l;
      return ((r = o.columnDef.enablePinning) != null ? r : !0) && ((s = (l = n.options.enableColumnPinning) != null ? l : n.options.enablePinning) != null ? s : !0);
    }), e.getIsPinned = () => {
      const t = e.getLeafColumns().map((a) => a.id), {
        left: o,
        right: r
      } = n.getState().columnPinning, s = t.some((a) => o == null ? void 0 : o.includes(a)), l = t.some((a) => r == null ? void 0 : r.includes(a));
      return s ? "left" : l ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var t, o;
      const r = e.getIsPinned();
      return r ? (t = (o = n.getState().columnPinning) == null || (o = o[r]) == null ? void 0 : o.indexOf(e.id)) != null ? t : -1 : 0;
    };
  },
  createRow: (e, n) => {
    e.getCenterVisibleCells = w(() => [e._getAllVisibleCells(), n.getState().columnPinning.left, n.getState().columnPinning.right], (t, o, r) => {
      const s = [...o ?? [], ...r ?? []];
      return t.filter((l) => !s.includes(l.column.id));
    }, R(n.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = w(() => [e._getAllVisibleCells(), n.getState().columnPinning.left], (t, o) => (o ?? []).map((s) => t.find((l) => l.column.id === s)).filter(Boolean).map((s) => ({
      ...s,
      position: "left"
    })), R(n.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = w(() => [e._getAllVisibleCells(), n.getState().columnPinning.right], (t, o) => (o ?? []).map((s) => t.find((l) => l.column.id === s)).filter(Boolean).map((s) => ({
      ...s,
      position: "right"
    })), R(n.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (n) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(n), e.resetColumnPinning = (n) => {
      var t, o;
      return e.setColumnPinning(n ? Ie() : (t = (o = e.initialState) == null ? void 0 : o.columnPinning) != null ? t : Ie());
    }, e.getIsSomeColumnsPinned = (n) => {
      var t;
      const o = e.getState().columnPinning;
      if (!n) {
        var r, s;
        return !!((r = o.left) != null && r.length || (s = o.right) != null && s.length);
      }
      return !!((t = o[n]) != null && t.length);
    }, e.getLeftLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (n, t) => (t ?? []).map((o) => n.find((r) => r.id === o)).filter(Boolean), R(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (n, t) => (t ?? []).map((o) => n.find((r) => r.id === o)).filter(Boolean), R(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o) => {
      const r = [...t ?? [], ...o ?? []];
      return n.filter((s) => !r.includes(s.id));
    }, R(e.options, "debugColumns", "getCenterLeafColumns"));
  }
}, Se = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Ee = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Do = {
  getDefaultColumnDef: () => Se,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Ee(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: q("columnSizing", e),
    onColumnSizingInfoChange: q("columnSizingInfo", e)
  }),
  createColumn: (e, n) => {
    e.getSize = () => {
      var t, o, r;
      const s = n.getState().columnSizing[e.id];
      return Math.min(Math.max((t = e.columnDef.minSize) != null ? t : Se.minSize, (o = s ?? e.columnDef.size) != null ? o : Se.size), (r = e.columnDef.maxSize) != null ? r : Se.maxSize);
    }, e.getStart = w((t) => [t, ge(n, t), n.getState().columnSizing], (t, o) => o.slice(0, e.getIndex(t)).reduce((r, s) => r + s.getSize(), 0), R(n.options, "debugColumns", "getStart")), e.getAfter = w((t) => [t, ge(n, t), n.getState().columnSizing], (t, o) => o.slice(e.getIndex(t) + 1).reduce((r, s) => r + s.getSize(), 0), R(n.options, "debugColumns", "getAfter")), e.resetSize = () => {
      n.setColumnSizing((t) => {
        let {
          [e.id]: o,
          ...r
        } = t;
        return r;
      });
    }, e.getCanResize = () => {
      var t, o;
      return ((t = e.columnDef.enableResizing) != null ? t : !0) && ((o = n.options.enableColumnResizing) != null ? o : !0);
    }, e.getIsResizing = () => n.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, n) => {
    e.getSize = () => {
      let t = 0;
      const o = (r) => {
        if (r.subHeaders.length)
          r.subHeaders.forEach(o);
        else {
          var s;
          t += (s = r.column.getSize()) != null ? s : 0;
        }
      };
      return o(e), t;
    }, e.getStart = () => {
      if (e.index > 0) {
        const t = e.headerGroup.headers[e.index - 1];
        return t.getStart() + t.getSize();
      }
      return 0;
    }, e.getResizeHandler = (t) => {
      const o = n.getColumn(e.column.id), r = o == null ? void 0 : o.getCanResize();
      return (s) => {
        if (!o || !r || (s.persist == null || s.persist(), Ve(s) && s.touches && s.touches.length > 1))
          return;
        const l = e.getSize(), a = e ? e.getLeafHeaders().map((y) => [y.column.id, y.column.getSize()]) : [[o.id, o.getSize()]], i = Ve(s) ? Math.round(s.touches[0].clientX) : s.clientX, u = {}, g = (y, $) => {
          typeof $ == "number" && (n.setColumnSizingInfo((_) => {
            var N, H;
            const I = n.options.columnResizeDirection === "rtl" ? -1 : 1, z = ($ - ((N = _ == null ? void 0 : _.startOffset) != null ? N : 0)) * I, Q = Math.max(z / ((H = _ == null ? void 0 : _.startSize) != null ? H : 0), -0.999999);
            return _.columnSizingStart.forEach((ie) => {
              let [ve, Qe] = ie;
              u[ve] = Math.round(Math.max(Qe + Qe * Q, 0) * 100) / 100;
            }), {
              ..._,
              deltaOffset: z,
              deltaPercentage: Q
            };
          }), (n.options.columnResizeMode === "onChange" || y === "end") && n.setColumnSizing((_) => ({
            ..._,
            ...u
          })));
        }, f = (y) => g("move", y), c = (y) => {
          g("end", y), n.setColumnSizingInfo(($) => ({
            ...$,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, d = t || typeof document < "u" ? document : null, h = {
          moveHandler: (y) => f(y.clientX),
          upHandler: (y) => {
            d == null || d.removeEventListener("mousemove", h.moveHandler), d == null || d.removeEventListener("mouseup", h.upHandler), c(y.clientX);
          }
        }, S = {
          moveHandler: (y) => (y.cancelable && (y.preventDefault(), y.stopPropagation()), f(y.touches[0].clientX), !1),
          upHandler: (y) => {
            var $;
            d == null || d.removeEventListener("touchmove", S.moveHandler), d == null || d.removeEventListener("touchend", S.upHandler), y.cancelable && (y.preventDefault(), y.stopPropagation()), c(($ = y.touches[0]) == null ? void 0 : $.clientX);
          }
        }, b = Lo() ? {
          passive: !1
        } : !1;
        Ve(s) ? (d == null || d.addEventListener("touchmove", S.moveHandler, b), d == null || d.addEventListener("touchend", S.upHandler, b)) : (d == null || d.addEventListener("mousemove", h.moveHandler, b), d == null || d.addEventListener("mouseup", h.upHandler, b)), n.setColumnSizingInfo((y) => ({
          ...y,
          startOffset: i,
          startSize: l,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: a,
          isResizingColumn: o.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (n) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(n), e.setColumnSizingInfo = (n) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(n), e.resetColumnSizing = (n) => {
      var t;
      e.setColumnSizing(n ? {} : (t = e.initialState.columnSizing) != null ? t : {});
    }, e.resetHeaderSizeInfo = (n) => {
      var t;
      e.setColumnSizingInfo(n ? Ee() : (t = e.initialState.columnSizingInfo) != null ? t : Ee());
    }, e.getTotalSize = () => {
      var n, t;
      return (n = (t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }, e.getLeftTotalSize = () => {
      var n, t;
      return (n = (t = e.getLeftHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }, e.getCenterTotalSize = () => {
      var n, t;
      return (n = (t = e.getCenterHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }, e.getRightTotalSize = () => {
      var n, t;
      return (n = (t = e.getRightHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    };
  }
};
let be = null;
function Lo() {
  if (typeof be == "boolean") return be;
  let e = !1;
  try {
    const n = {
      get passive() {
        return e = !0, !1;
      }
    }, t = () => {
    };
    window.addEventListener("test", t, n), window.removeEventListener("test", t);
  } catch {
    e = !1;
  }
  return be = e, be;
}
function Ve(e) {
  return e.type === "touchstart";
}
const Bo = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: q("columnVisibility", e)
  }),
  createColumn: (e, n) => {
    e.toggleVisibility = (t) => {
      e.getCanHide() && n.setColumnVisibility((o) => ({
        ...o,
        [e.id]: t ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var t, o;
      const r = e.columns;
      return (t = r.length ? r.some((s) => s.getIsVisible()) : (o = n.getState().columnVisibility) == null ? void 0 : o[e.id]) != null ? t : !0;
    }, e.getCanHide = () => {
      var t, o;
      return ((t = e.columnDef.enableHiding) != null ? t : !0) && ((o = n.options.enableHiding) != null ? o : !0);
    }, e.getToggleVisibilityHandler = () => (t) => {
      e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
    };
  },
  createRow: (e, n) => {
    e._getAllVisibleCells = w(() => [e.getAllCells(), n.getState().columnVisibility], (t) => t.filter((o) => o.column.getIsVisible()), R(n.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = w(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (t, o, r) => [...t, ...o, ...r], R(n.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const n = (t, o) => w(() => [o(), o().filter((r) => r.getIsVisible()).map((r) => r.id).join("_")], (r) => r.filter((s) => s.getIsVisible == null ? void 0 : s.getIsVisible()), R(e.options, "debugColumns", t));
    e.getVisibleFlatColumns = n("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = n("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = n("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = n("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = n("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (t) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(t), e.resetColumnVisibility = (t) => {
      var o;
      e.setColumnVisibility(t ? {} : (o = e.initialState.columnVisibility) != null ? o : {});
    }, e.toggleAllColumnsVisible = (t) => {
      var o;
      t = (o = t) != null ? o : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((r, s) => ({
        ...r,
        [s.id]: t || !(s.getCanHide != null && s.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((t) => !(t.getIsVisible != null && t.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((t) => t.getIsVisible == null ? void 0 : t.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (t) => {
      var o;
      e.toggleAllColumnsVisible((o = t.target) == null ? void 0 : o.checked);
    };
  }
};
function ge(e, n) {
  return n ? n === "center" ? e.getCenterVisibleLeafColumns() : n === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const jo = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, No = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: q("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (n) => {
      var t;
      const o = (t = e.getCoreRowModel().flatRows[0]) == null || (t = t._getAllCellsByColumnId()[n.id]) == null ? void 0 : t.getValue();
      return typeof o == "string" || typeof o == "number";
    }
  }),
  createColumn: (e, n) => {
    e.getCanGlobalFilter = () => {
      var t, o, r, s;
      return ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) && ((o = n.options.enableGlobalFilter) != null ? o : !0) && ((r = n.options.enableFilters) != null ? r : !0) && ((s = n.options.getColumnCanGlobalFilter == null ? void 0 : n.options.getColumnCanGlobalFilter(e)) != null ? s : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => J.includesString, e.getGlobalFilterFn = () => {
      var n, t;
      const {
        globalFilterFn: o
      } = e.options;
      return we(o) ? o : o === "auto" ? e.getGlobalAutoFilterFn() : (n = (t = e.options.filterFns) == null ? void 0 : t[o]) != null ? n : J[o];
    }, e.setGlobalFilter = (n) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(n);
    }, e.resetGlobalFilter = (n) => {
      e.setGlobalFilter(n ? void 0 : e.initialState.globalFilter);
    };
  }
}, xo = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: q("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    e._autoResetExpanded = () => {
      var o, r;
      if (!n) {
        e._queue(() => {
          n = !0;
        });
        return;
      }
      if ((o = (r = e.options.autoResetAll) != null ? r : e.options.autoResetExpanded) != null ? o : !e.options.manualExpanding) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetExpanded(), t = !1;
        });
      }
    }, e.setExpanded = (o) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(o), e.toggleAllRowsExpanded = (o) => {
      o ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (o) => {
      var r, s;
      e.setExpanded(o ? {} : (r = (s = e.initialState) == null ? void 0 : s.expanded) != null ? r : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((o) => o.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (o) => {
      o.persist == null || o.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const o = e.getState().expanded;
      return o === !0 || Object.values(o).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const o = e.getState().expanded;
      return typeof o == "boolean" ? o === !0 : !(!Object.keys(o).length || e.getRowModel().flatRows.some((r) => !r.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let o = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((s) => {
        const l = s.split(".");
        o = Math.max(o, l.length);
      }), o;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, n) => {
    e.toggleExpanded = (t) => {
      n.setExpanded((o) => {
        var r;
        const s = o === !0 ? !0 : !!(o != null && o[e.id]);
        let l = {};
        if (o === !0 ? Object.keys(n.getRowModel().rowsById).forEach((a) => {
          l[a] = !0;
        }) : l = o, t = (r = t) != null ? r : !s, !s && t)
          return {
            ...l,
            [e.id]: !0
          };
        if (s && !t) {
          const {
            [e.id]: a,
            ...i
          } = l;
          return i;
        }
        return o;
      });
    }, e.getIsExpanded = () => {
      var t;
      const o = n.getState().expanded;
      return !!((t = n.options.getIsRowExpanded == null ? void 0 : n.options.getIsRowExpanded(e)) != null ? t : o === !0 || o != null && o[e.id]);
    }, e.getCanExpand = () => {
      var t, o, r;
      return (t = n.options.getRowCanExpand == null ? void 0 : n.options.getRowCanExpand(e)) != null ? t : ((o = n.options.enableExpanding) != null ? o : !0) && !!((r = e.subRows) != null && r.length);
    }, e.getIsAllParentsExpanded = () => {
      let t = !0, o = e;
      for (; t && o.parentId; )
        o = n.getRow(o.parentId, !0), t = o.getIsExpanded();
      return t;
    }, e.getToggleExpandedHandler = () => {
      const t = e.getCanExpand();
      return () => {
        t && e.toggleExpanded();
      };
    };
  }
}, je = 0, Ne = 10, Ae = () => ({
  pageIndex: je,
  pageSize: Ne
}), zo = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Ae(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: q("pagination", e)
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    e._autoResetPageIndex = () => {
      var o, r;
      if (!n) {
        e._queue(() => {
          n = !0;
        });
        return;
      }
      if ((o = (r = e.options.autoResetAll) != null ? r : e.options.autoResetPageIndex) != null ? o : !e.options.manualPagination) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetPageIndex(), t = !1;
        });
      }
    }, e.setPagination = (o) => {
      const r = (s) => ee(o, s);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(r);
    }, e.resetPagination = (o) => {
      var r;
      e.setPagination(o ? Ae() : (r = e.initialState.pagination) != null ? r : Ae());
    }, e.setPageIndex = (o) => {
      e.setPagination((r) => {
        let s = ee(o, r.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return s = Math.max(0, Math.min(s, l)), {
          ...r,
          pageIndex: s
        };
      });
    }, e.resetPageIndex = (o) => {
      var r, s;
      e.setPageIndex(o ? je : (r = (s = e.initialState) == null || (s = s.pagination) == null ? void 0 : s.pageIndex) != null ? r : je);
    }, e.resetPageSize = (o) => {
      var r, s;
      e.setPageSize(o ? Ne : (r = (s = e.initialState) == null || (s = s.pagination) == null ? void 0 : s.pageSize) != null ? r : Ne);
    }, e.setPageSize = (o) => {
      e.setPagination((r) => {
        const s = Math.max(1, ee(o, r.pageSize)), l = r.pageSize * r.pageIndex, a = Math.floor(l / s);
        return {
          ...r,
          pageIndex: a,
          pageSize: s
        };
      });
    }, e.setPageCount = (o) => e.setPagination((r) => {
      var s;
      let l = ee(o, (s = e.options.pageCount) != null ? s : -1);
      return typeof l == "number" && (l = Math.max(-1, l)), {
        ...r,
        pageCount: l
      };
    }), e.getPageOptions = w(() => [e.getPageCount()], (o) => {
      let r = [];
      return o && o > 0 && (r = [...new Array(o)].fill(null).map((s, l) => l)), r;
    }, R(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: o
      } = e.getState().pagination, r = e.getPageCount();
      return r === -1 ? !0 : r === 0 ? !1 : o < r - 1;
    }, e.previousPage = () => e.setPageIndex((o) => o - 1), e.nextPage = () => e.setPageIndex((o) => o + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var o;
      return (o = e.options.pageCount) != null ? o : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var o;
      return (o = e.options.rowCount) != null ? o : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Fe = () => ({
  top: [],
  bottom: []
}), To = {
  getInitialState: (e) => ({
    rowPinning: Fe(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: q("rowPinning", e)
  }),
  createRow: (e, n) => {
    e.pin = (t, o, r) => {
      const s = o ? e.getLeafRows().map((i) => {
        let {
          id: u
        } = i;
        return u;
      }) : [], l = r ? e.getParentRows().map((i) => {
        let {
          id: u
        } = i;
        return u;
      }) : [], a = /* @__PURE__ */ new Set([...l, e.id, ...s]);
      n.setRowPinning((i) => {
        var u, g;
        if (t === "bottom") {
          var f, c;
          return {
            top: ((f = i == null ? void 0 : i.top) != null ? f : []).filter((S) => !(a != null && a.has(S))),
            bottom: [...((c = i == null ? void 0 : i.bottom) != null ? c : []).filter((S) => !(a != null && a.has(S))), ...Array.from(a)]
          };
        }
        if (t === "top") {
          var d, h;
          return {
            top: [...((d = i == null ? void 0 : i.top) != null ? d : []).filter((S) => !(a != null && a.has(S))), ...Array.from(a)],
            bottom: ((h = i == null ? void 0 : i.bottom) != null ? h : []).filter((S) => !(a != null && a.has(S)))
          };
        }
        return {
          top: ((u = i == null ? void 0 : i.top) != null ? u : []).filter((S) => !(a != null && a.has(S))),
          bottom: ((g = i == null ? void 0 : i.bottom) != null ? g : []).filter((S) => !(a != null && a.has(S)))
        };
      });
    }, e.getCanPin = () => {
      var t;
      const {
        enableRowPinning: o,
        enablePinning: r
      } = n.options;
      return typeof o == "function" ? o(e) : (t = o ?? r) != null ? t : !0;
    }, e.getIsPinned = () => {
      const t = [e.id], {
        top: o,
        bottom: r
      } = n.getState().rowPinning, s = t.some((a) => o == null ? void 0 : o.includes(a)), l = t.some((a) => r == null ? void 0 : r.includes(a));
      return s ? "top" : l ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var t, o;
      const r = e.getIsPinned();
      if (!r) return -1;
      const s = (t = r === "top" ? n.getTopRows() : n.getBottomRows()) == null ? void 0 : t.map((l) => {
        let {
          id: a
        } = l;
        return a;
      });
      return (o = s == null ? void 0 : s.indexOf(e.id)) != null ? o : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (n) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(n), e.resetRowPinning = (n) => {
      var t, o;
      return e.setRowPinning(n ? Fe() : (t = (o = e.initialState) == null ? void 0 : o.rowPinning) != null ? t : Fe());
    }, e.getIsSomeRowsPinned = (n) => {
      var t;
      const o = e.getState().rowPinning;
      if (!n) {
        var r, s;
        return !!((r = o.top) != null && r.length || (s = o.bottom) != null && s.length);
      }
      return !!((t = o[n]) != null && t.length);
    }, e._getPinnedRows = (n, t, o) => {
      var r;
      return ((r = e.options.keepPinnedRows) == null || r ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (t ?? []).map((l) => {
          const a = e.getRow(l, !0);
          return a.getIsAllParentsExpanded() ? a : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (t ?? []).map((l) => n.find((a) => a.id === l))
      )).filter(Boolean).map((l) => ({
        ...l,
        position: o
      }));
    }, e.getTopRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.top], (n, t) => e._getPinnedRows(n, t, "top"), R(e.options, "debugRows", "getTopRows")), e.getBottomRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (n, t) => e._getPinnedRows(n, t, "bottom"), R(e.options, "debugRows", "getBottomRows")), e.getCenterRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (n, t, o) => {
      const r = /* @__PURE__ */ new Set([...t ?? [], ...o ?? []]);
      return n.filter((s) => !r.has(s.id));
    }, R(e.options, "debugRows", "getCenterRows"));
  }
}, Ho = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: q("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (n) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(n), e.resetRowSelection = (n) => {
      var t;
      return e.setRowSelection(n ? {} : (t = e.initialState.rowSelection) != null ? t : {});
    }, e.toggleAllRowsSelected = (n) => {
      e.setRowSelection((t) => {
        n = typeof n < "u" ? n : !e.getIsAllRowsSelected();
        const o = {
          ...t
        }, r = e.getPreGroupedRowModel().flatRows;
        return n ? r.forEach((s) => {
          s.getCanSelect() && (o[s.id] = !0);
        }) : r.forEach((s) => {
          delete o[s.id];
        }), o;
      });
    }, e.toggleAllPageRowsSelected = (n) => e.setRowSelection((t) => {
      const o = typeof n < "u" ? n : !e.getIsAllPageRowsSelected(), r = {
        ...t
      };
      return e.getRowModel().rows.forEach((s) => {
        xe(r, s.id, o, !0, e);
      }), r;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = w(() => [e.getState().rowSelection, e.getCoreRowModel()], (n, t) => Object.keys(n).length ? Pe(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, R(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = w(() => [e.getState().rowSelection, e.getFilteredRowModel()], (n, t) => Object.keys(n).length ? Pe(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, R(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = w(() => [e.getState().rowSelection, e.getSortedRowModel()], (n, t) => Object.keys(n).length ? Pe(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, R(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const n = e.getFilteredRowModel().flatRows, {
        rowSelection: t
      } = e.getState();
      let o = !!(n.length && Object.keys(t).length);
      return o && n.some((r) => r.getCanSelect() && !t[r.id]) && (o = !1), o;
    }, e.getIsAllPageRowsSelected = () => {
      const n = e.getPaginationRowModel().flatRows.filter((r) => r.getCanSelect()), {
        rowSelection: t
      } = e.getState();
      let o = !!n.length;
      return o && n.some((r) => !t[r.id]) && (o = !1), o;
    }, e.getIsSomeRowsSelected = () => {
      var n;
      const t = Object.keys((n = e.getState().rowSelection) != null ? n : {}).length;
      return t > 0 && t < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const n = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : n.filter((t) => t.getCanSelect()).some((t) => t.getIsSelected() || t.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (n) => {
      e.toggleAllRowsSelected(n.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (n) => {
      e.toggleAllPageRowsSelected(n.target.checked);
    };
  },
  createRow: (e, n) => {
    e.toggleSelected = (t, o) => {
      const r = e.getIsSelected();
      n.setRowSelection((s) => {
        var l;
        if (t = typeof t < "u" ? t : !r, e.getCanSelect() && r === t)
          return s;
        const a = {
          ...s
        };
        return xe(a, e.id, t, (l = o == null ? void 0 : o.selectChildren) != null ? l : !0, n), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return Ze(e, t);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return ze(e, t) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return ze(e, t) === "all";
    }, e.getCanSelect = () => {
      var t;
      return typeof n.options.enableRowSelection == "function" ? n.options.enableRowSelection(e) : (t = n.options.enableRowSelection) != null ? t : !0;
    }, e.getCanSelectSubRows = () => {
      var t;
      return typeof n.options.enableSubRowSelection == "function" ? n.options.enableSubRowSelection(e) : (t = n.options.enableSubRowSelection) != null ? t : !0;
    }, e.getCanMultiSelect = () => {
      var t;
      return typeof n.options.enableMultiRowSelection == "function" ? n.options.enableMultiRowSelection(e) : (t = n.options.enableMultiRowSelection) != null ? t : !0;
    }, e.getToggleSelectedHandler = () => {
      const t = e.getCanSelect();
      return (o) => {
        var r;
        t && e.toggleSelected((r = o.target) == null ? void 0 : r.checked);
      };
    };
  }
}, xe = (e, n, t, o, r) => {
  var s;
  const l = r.getRow(n, !0);
  t ? (l.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), l.getCanSelect() && (e[n] = !0)) : delete e[n], o && (s = l.subRows) != null && s.length && l.getCanSelectSubRows() && l.subRows.forEach((a) => xe(e, a.id, t, o, r));
};
function Pe(e, n) {
  const t = e.getState().rowSelection, o = [], r = {}, s = function(l, a) {
    return l.map((i) => {
      var u;
      const g = Ze(i, t);
      if (g && (o.push(i), r[i.id] = i), (u = i.subRows) != null && u.length && (i = {
        ...i,
        subRows: s(i.subRows)
      }), g)
        return i;
    }).filter(Boolean);
  };
  return {
    rows: s(n.rows),
    flatRows: o,
    rowsById: r
  };
}
function Ze(e, n) {
  var t;
  return (t = n[e.id]) != null ? t : !1;
}
function ze(e, n, t) {
  var o;
  if (!((o = e.subRows) != null && o.length)) return !1;
  let r = !0, s = !1;
  return e.subRows.forEach((l) => {
    if (!(s && !r) && (l.getCanSelect() && (Ze(l, n) ? s = !0 : r = !1), l.subRows && l.subRows.length)) {
      const a = ze(l, n);
      a === "all" ? s = !0 : (a === "some" && (s = !0), r = !1);
    }
  }), r ? "all" : s ? "some" : !1;
}
const Te = /([0-9]+)/gm, Go = (e, n, t) => Lt(oe(e.getValue(t)).toLowerCase(), oe(n.getValue(t)).toLowerCase()), Uo = (e, n, t) => Lt(oe(e.getValue(t)), oe(n.getValue(t))), qo = (e, n, t) => Je(oe(e.getValue(t)).toLowerCase(), oe(n.getValue(t)).toLowerCase()), Wo = (e, n, t) => Je(oe(e.getValue(t)), oe(n.getValue(t))), Ko = (e, n, t) => {
  const o = e.getValue(t), r = n.getValue(t);
  return o > r ? 1 : o < r ? -1 : 0;
}, Xo = (e, n, t) => Je(e.getValue(t), n.getValue(t));
function Je(e, n) {
  return e === n ? 0 : e > n ? 1 : -1;
}
function oe(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Lt(e, n) {
  const t = e.split(Te).filter(Boolean), o = n.split(Te).filter(Boolean);
  for (; t.length && o.length; ) {
    const r = t.shift(), s = o.shift(), l = parseInt(r, 10), a = parseInt(s, 10), i = [l, a].sort();
    if (isNaN(i[0])) {
      if (r > s)
        return 1;
      if (s > r)
        return -1;
      continue;
    }
    if (isNaN(i[1]))
      return isNaN(l) ? -1 : 1;
    if (l > a)
      return 1;
    if (a > l)
      return -1;
  }
  return t.length - o.length;
}
const de = {
  alphanumeric: Go,
  alphanumericCaseSensitive: Uo,
  text: qo,
  textCaseSensitive: Wo,
  datetime: Ko,
  basic: Xo
}, Zo = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: q("sorting", e),
    isMultiSortEvent: (n) => n.shiftKey
  }),
  createColumn: (e, n) => {
    e.getAutoSortingFn = () => {
      const t = n.getFilteredRowModel().flatRows.slice(10);
      let o = !1;
      for (const r of t) {
        const s = r == null ? void 0 : r.getValue(e.id);
        if (Object.prototype.toString.call(s) === "[object Date]")
          return de.datetime;
        if (typeof s == "string" && (o = !0, s.split(Te).length > 1))
          return de.alphanumeric;
      }
      return o ? de.text : de.basic;
    }, e.getAutoSortDir = () => {
      const t = n.getFilteredRowModel().flatRows[0];
      return typeof (t == null ? void 0 : t.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var t, o;
      if (!e)
        throw new Error();
      return we(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (t = (o = n.options.sortingFns) == null ? void 0 : o[e.columnDef.sortingFn]) != null ? t : de[e.columnDef.sortingFn];
    }, e.toggleSorting = (t, o) => {
      const r = e.getNextSortingOrder(), s = typeof t < "u" && t !== null;
      n.setSorting((l) => {
        const a = l == null ? void 0 : l.find((d) => d.id === e.id), i = l == null ? void 0 : l.findIndex((d) => d.id === e.id);
        let u = [], g, f = s ? t : r === "desc";
        if (l != null && l.length && e.getCanMultiSort() && o ? a ? g = "toggle" : g = "add" : l != null && l.length && i !== l.length - 1 ? g = "replace" : a ? g = "toggle" : g = "replace", g === "toggle" && (s || r || (g = "remove")), g === "add") {
          var c;
          u = [...l, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((c = n.options.maxMultiSortColCount) != null ? c : Number.MAX_SAFE_INTEGER));
        } else g === "toggle" ? u = l.map((d) => d.id === e.id ? {
          ...d,
          desc: f
        } : d) : g === "remove" ? u = l.filter((d) => d.id !== e.id) : u = [{
          id: e.id,
          desc: f
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var t, o;
      return ((t = (o = e.columnDef.sortDescFirst) != null ? o : n.options.sortDescFirst) != null ? t : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (t) => {
      var o, r;
      const s = e.getFirstSortDir(), l = e.getIsSorted();
      return l ? l !== s && ((o = n.options.enableSortingRemoval) == null || o) && // If enableSortRemove, enable in general
      (!(t && (r = n.options.enableMultiRemove) != null) || r) ? !1 : l === "desc" ? "asc" : "desc" : s;
    }, e.getCanSort = () => {
      var t, o;
      return ((t = e.columnDef.enableSorting) != null ? t : !0) && ((o = n.options.enableSorting) != null ? o : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var t, o;
      return (t = (o = e.columnDef.enableMultiSort) != null ? o : n.options.enableMultiSort) != null ? t : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var t;
      const o = (t = n.getState().sorting) == null ? void 0 : t.find((r) => r.id === e.id);
      return o ? o.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var t, o;
      return (t = (o = n.getState().sorting) == null ? void 0 : o.findIndex((r) => r.id === e.id)) != null ? t : -1;
    }, e.clearSorting = () => {
      n.setSorting((t) => t != null && t.length ? t.filter((o) => o.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const t = e.getCanSort();
      return (o) => {
        t && (o.persist == null || o.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? n.options.isMultiSortEvent == null ? void 0 : n.options.isMultiSortEvent(o) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (n) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(n), e.resetSorting = (n) => {
      var t, o;
      e.setSorting(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.sorting) != null ? t : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, Jo = [
  So,
  Bo,
  Mo,
  Oo,
  yo,
  $o,
  jo,
  //depends on ColumnFaceting
  No,
  //depends on ColumnFiltering
  Zo,
  Fo,
  //depends on RowSorting
  xo,
  zo,
  To,
  Ho,
  Do
];
function Yo(e) {
  var n, t;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const o = [...Jo, ...(n = e._features) != null ? n : []];
  let r = {
    _features: o
  };
  const s = r._features.reduce((c, d) => Object.assign(c, d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(r)), {}), l = (c) => r.options.mergeOptions ? r.options.mergeOptions(s, c) : {
    ...s,
    ...c
  };
  let i = {
    ...{},
    ...(t = e.initialState) != null ? t : {}
  };
  r._features.forEach((c) => {
    var d;
    i = (d = c.getInitialState == null ? void 0 : c.getInitialState(i)) != null ? d : i;
  });
  const u = [];
  let g = !1;
  const f = {
    _features: o,
    options: {
      ...s,
      ...e
    },
    initialState: i,
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
      r.setState(r.initialState);
    },
    setOptions: (c) => {
      const d = ee(c, r.options);
      r.options = l(d);
    },
    getState: () => r.options.state,
    setState: (c) => {
      r.options.onStateChange == null || r.options.onStateChange(c);
    },
    _getRowId: (c, d, h) => {
      var S;
      return (S = r.options.getRowId == null ? void 0 : r.options.getRowId(c, d, h)) != null ? S : `${h ? [h.id, d].join(".") : d}`;
    },
    getCoreRowModel: () => (r._getCoreRowModel || (r._getCoreRowModel = r.options.getCoreRowModel(r)), r._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => r.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (c, d) => {
      let h = (d ? r.getPrePaginationRowModel() : r.getRowModel()).rowsById[c];
      if (!h && (h = r.getCoreRowModel().rowsById[c], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${c}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: w(() => [r.options.defaultColumn], (c) => {
      var d;
      return c = (d = c) != null ? d : {}, {
        header: (h) => {
          const S = h.header.column.columnDef;
          return S.accessorKey ? S.accessorKey : S.accessorFn ? S.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var S, b;
          return (S = (b = h.renderValue()) == null || b.toString == null ? void 0 : b.toString()) != null ? S : null;
        },
        ...r._features.reduce((h, S) => Object.assign(h, S.getDefaultColumnDef == null ? void 0 : S.getDefaultColumnDef()), {}),
        ...c
      };
    }, R(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => r.options.columns,
    getAllColumns: w(() => [r._getColumnDefs()], (c) => {
      const d = function(h, S, b) {
        return b === void 0 && (b = 0), h.map((y) => {
          const $ = ho(r, y, b, S), _ = y;
          return $.columns = _.columns ? d(_.columns, $, b + 1) : [], $;
        });
      };
      return d(c);
    }, R(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: w(() => [r.getAllColumns()], (c) => c.flatMap((d) => d.getFlatColumns()), R(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: w(() => [r.getAllFlatColumns()], (c) => c.reduce((d, h) => (d[h.id] = h, d), {}), R(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: w(() => [r.getAllColumns(), r._getOrderColumnsFn()], (c, d) => {
      let h = c.flatMap((S) => S.getLeafColumns());
      return d(h);
    }, R(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (c) => {
      const d = r._getAllFlatColumnsById()[c];
      return process.env.NODE_ENV !== "production" && !d && console.error(`[Table] Column with id '${c}' does not exist.`), d;
    }
  };
  Object.assign(r, f);
  for (let c = 0; c < r._features.length; c++) {
    const d = r._features[c];
    d == null || d.createTable == null || d.createTable(r);
  }
  return r;
}
function Qo() {
  return (e) => w(() => [e.options.data], (n) => {
    const t = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, o = function(r, s, l) {
      s === void 0 && (s = 0);
      const a = [];
      for (let u = 0; u < r.length; u++) {
        const g = bo(e, e._getRowId(r[u], u, l), r[u], u, s, void 0, l == null ? void 0 : l.id);
        if (t.flatRows.push(g), t.rowsById[g.id] = g, a.push(g), e.options.getSubRows) {
          var i;
          g.originalSubRows = e.options.getSubRows(r[u], u), (i = g.originalSubRows) != null && i.length && (g.subRows = o(g.originalSubRows, s + 1, g));
        }
      }
      return a;
    };
    return t.rows = o(n), t;
  }, R(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function er() {
  return (e) => w(() => [e.getState().expanded, e.getPreExpandedRowModel(), e.options.paginateExpandedRows], (n, t, o) => !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !o ? t : tr(t), R(e.options, "debugTable", "getExpandedRowModel"));
}
function tr(e) {
  const n = [], t = (o) => {
    var r;
    n.push(o), (r = o.subRows) != null && r.length && o.getIsExpanded() && o.subRows.forEach(t);
  };
  return e.rows.forEach(t), {
    rows: n,
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
function ye() {
  return !0;
}
const nr = Symbol("merge-proxy"), or = {
  get(e, n, t) {
    return n === nr ? t : e.get(n);
  },
  has(e, n) {
    return e.has(n);
  },
  set: ye,
  deleteProperty: ye,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: ye,
      deleteProperty: ye
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Me(e) {
  return "value" in e ? e.value : e;
}
function ce() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return new Proxy({
    get(o) {
      for (let r = n.length - 1; r >= 0; r--) {
        const s = Me(n[r])[o];
        if (s !== void 0) return s;
      }
    },
    has(o) {
      for (let r = n.length - 1; r >= 0; r--)
        if (o in Me(n[r])) return !0;
      return !1;
    },
    keys() {
      const o = [];
      for (let r = 0; r < n.length; r++) o.push(...Object.keys(Me(n[r])));
      return [...Array.from(new Set(o))];
    }
  }, or);
}
const Oe = B({
  props: ["render", "props"],
  setup: (e) => () => typeof e.render == "function" || typeof e.render == "object" ? Le(e.render, e.props) : e.render
});
function lt(e) {
  return ce(e, {
    data: D(e.data)
  });
}
function rr(e) {
  const n = Ht(e.data), t = ce({
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    mergeOptions(s, l) {
      return n ? {
        ...s,
        ...l
      } : ce(s, l);
    }
  }, n ? lt(e) : e), o = Yo(t);
  if (n) {
    const s = W(e.data);
    ae(s, () => {
      o.setState((l) => ({
        ...l,
        data: s.value
      }));
    }, {
      immediate: !0
    });
  }
  const r = G(o.initialState);
  return pe(() => {
    o.setOptions((s) => {
      var l;
      const a = new Proxy({}, {
        get: (i, u) => r.value[u]
      });
      return ce(s, n ? lt(e) : e, {
        // merge the initialState and `options.state`
        // create a new proxy on each `setOptions` call
        // and get the value from state on each property access
        state: ce(a, (l = e.state) != null ? l : {}),
        // Similarly, we'll maintain both our internal state and any user-provided
        // state.
        onStateChange: (i) => {
          i instanceof Function ? r.value = i(r.value) : r.value = i, e.onStateChange == null || e.onStateChange(i);
        }
      });
    });
  }), o;
}
const sr = { class: "p-2" }, lr = ["colSpan"], ir = { key: 0 }, ar = ["colspan"], ur = { style: { fontSize: "10px" } }, dr = ["colSpan"], cr = /* @__PURE__ */ B({
  __name: "ArticleList",
  setup(e) {
    const n = [
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
    ], t = fo();
    function o(u) {
      return u.getCanExpand() ? Le(
        "button",
        {
          onClick: u.getToggleExpandedHandler(),
          style: { cursor: "pointer" }
        },
        u.getIsExpanded() ? "👇" : "👉"
      ) : Le(Gt, "🔵");
    }
    const r = [
      t.group({
        header: "Name",
        footer: (u) => u.column.id,
        columns: [
          t.display({
            id: "expander",
            header: () => null,
            cell: ({ row: u }) => o(u)
          }),
          t.accessor("firstName", {
            footer: (u) => u.column.id
          }),
          t.accessor((u) => u.lastName, {
            id: "lastName",
            cell: (u) => u.getValue(),
            header: () => "Last Name",
            footer: (u) => u.column.id
          })
        ]
      }),
      t.group({
        header: "Info",
        footer: (u) => u.column.id,
        columns: [
          t.accessor("age", {
            header: () => "Age",
            footer: (u) => u.column.id
          }),
          t.group({
            header: "More Info",
            columns: [
              t.accessor("visits", {
                header: () => "Visits",
                footer: (u) => u.column.id
              }),
              t.accessor("status", {
                header: "Status",
                footer: (u) => u.column.id
              }),
              t.accessor("progress", {
                header: "Profile Progress",
                footer: (u) => u.column.id
              })
            ]
          })
        ]
      })
    ], s = G(n), l = G({}), a = () => {
      s.value = n;
    }, i = rr({
      get data() {
        return s.value;
      },
      state: {
        get expanded() {
          return l.value;
        }
      },
      columns: r,
      getRowCanExpand: () => !0,
      getCoreRowModel: Qo(),
      getExpandedRowModel: er(),
      onExpandedChange: (u) => {
        l.value = typeof u == "function" ? u(l.value) : u;
      }
    });
    return (u, g) => (p(), v("div", sr, [
      m("table", null, [
        m("thead", null, [
          (p(!0), v(k, null, L(D(i).getHeaderGroups(), (f) => (p(), v("tr", {
            key: f.id
          }, [
            (p(!0), v(k, null, L(f.headers, (c) => (p(), v("th", {
              key: c.id,
              colSpan: c.colSpan
            }, [
              c.isPlaceholder ? C("", !0) : (p(), x(D(Oe), {
                key: 0,
                render: c.column.columnDef.header,
                props: c.getContext()
              }, null, 8, ["render", "props"]))
            ], 8, lr))), 128))
          ]))), 128))
        ]),
        m("tbody", null, [
          (p(!0), v(k, null, L(D(i).getRowModel().rows, (f) => (p(), v(k, {
            key: f.id
          }, [
            m("tr", null, [
              (p(!0), v(k, null, L(f.getVisibleCells(), (c) => (p(), v("td", {
                key: c.id
              }, [
                ne(D(Oe), {
                  render: c.column.columnDef.cell,
                  props: c.getContext()
                }, null, 8, ["render", "props"])
              ]))), 128))
            ]),
            f.getIsExpanded() ? (p(), v("tr", ir, [
              m("td", {
                colspan: f.getAllCells().length
              }, [
                m("pre", ur, [
                  g[0] || (g[0] = O("                  ")),
                  m("code", null, M(JSON.stringify(f.original, null, 2)), 1),
                  g[1] || (g[1] = O(`
                `))
                ])
              ], 8, ar)
            ])) : C("", !0)
          ], 64))), 128))
        ]),
        m("tfoot", null, [
          (p(!0), v(k, null, L(D(i).getFooterGroups(), (f) => (p(), v("tr", {
            key: f.id
          }, [
            (p(!0), v(k, null, L(f.headers, (c) => (p(), v("th", {
              key: c.id,
              colSpan: c.colSpan
            }, [
              c.isPlaceholder ? C("", !0) : (p(), x(D(Oe), {
                key: 0,
                render: c.column.columnDef.footer,
                props: c.getContext()
              }, null, 8, ["render", "props"]))
            ], 8, dr))), 128))
          ]))), 128))
        ])
      ]),
      g[2] || (g[2] = m("div", { class: "h-4" }, null, -1)),
      m("button", {
        onClick: a,
        class: "border p-2"
      }, "Rerender")
    ]));
  }
}), gr = {
  key: 1,
  class: "list"
}, fr = { class: "viur-shop-cart-sidebar-btn-wrap" }, mr = ["variant", "disabled"], pr = {
  __name: "ConfirmView",
  setup(e) {
    const n = le(), t = E({
      cartIsInit: A(() => !0),
      itemsIsInit: A(() => {
        var r;
        return !!((r = n.state) != null && r.carts[n.state.basket].items);
      }),
      images: {},
      showOrderButton: !1
    });
    function o(r) {
      r.target.checked && (t.showOrderButton = !0), r.target.checked || (t.showOrderButton = !1);
    }
    return Y(async () => {
      await n.init();
    }), (r, s) => t.cartIsInit ? (p(), v("div", gr, [
      s[2] || (s[2] = m("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)),
      s[3] || (s[3] = m("div", { class: "viur-shop-cart-address-wrap" }, [
        m("div", { class: "viur-shop-cart-address" }, [
          m("div", { class: "viur-shop-cart-address-headline" }, [
            O(" Versandadresse "),
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
          O(" Roland Brose"),
          m("br"),
          O(" Speicherstraße 33"),
          m("br"),
          O(" 44147 Dortmund, DE"),
          m("br"),
          m("br"),
          O(" rb@mausbrand.de"),
          m("br"),
          O(" 0231 21 34 68 90 ")
        ]),
        m("div", { class: "viur-shop-cart-address" }, [
          m("div", { class: "viur-shop-cart-address-headline" }, [
            O(" Rechnungsadresse "),
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
          O(" Roland Brose"),
          m("br"),
          O(" Speicherstraße 33"),
          m("br"),
          O(" 44147 Dortmund, DE"),
          m("br"),
          m("br"),
          O(" rb@mausbrand.de"),
          m("br"),
          O(" 0231 21 34 68 90 ")
        ])
      ], -1)),
      s[4] || (s[4] = m("div", { class: "viur-shop-cart-payment" }, [
        m("div", { class: "viur-shop-cart-payment-method" }, [
          m("span", null, "Zahlungsmethode:"),
          O(" Paypal ")
        ]),
        m("sl-button", {
          outline: "",
          size: "small"
        }, [
          m("sl-icon", {
            name: "pencil",
            slot: "prefix"
          })
        ])
      ], -1)),
      s[5] || (s[5] = m("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)),
      ne(cr),
      (p(), x(Ut, { to: "#order_sidebar" }, [
        s[0] || (s[0] = m("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Jetzt Bestellen ", -1)),
        s[1] || (s[1] = m("br", null, null, -1)),
        m("sl-checkbox", { onSlChange: o }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        m("div", fr, [
          m("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, mr)
        ])
      ]))
    ])) : (p(), x(qn, { key: 0 }));
  }
}, Bt = /* @__PURE__ */ V(pr, [["__scopeId", "data-v-81051322"]]), vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bt
}, Symbol.toStringTag, { value: "Module" })), hr = { class: "bind" }, Sr = {
  key: 0,
  class: "viur-shop-order-complete-slot"
}, br = { class: "btn-wrap" }, yr = {
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
  setup(e, { emit: n }) {
    const t = e, o = n;
    function r() {
      o("goToStart");
    }
    function s() {
      window.location.href = t.redirectUrl;
    }
    return (l, a) => (p(), v("div", hr, [
      a[2] || (a[2] = m("h1", { class: "viur-shop-success-headline headline" }, " Vielen Dank für Ihre Bestellung ", -1)),
      a[3] || (a[3] = m("p", { class: "paragraph" }, [
        m("strong", null, "Ihre Bestellnummer:"),
        O(" 123345670")
      ], -1)),
      a[4] || (a[4] = m("p", { class: "paragraph" }, [
        O(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        m("br"),
        O(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. ")
      ], -1)),
      e.additionalComponents.length ? (p(), v("div", Sr, [
        (p(!0), v(k, null, L(e.additionalComponents, (i) => (p(), x(Ue(i.component), It({ ref_for: !0 }, i.props ? i.props : ""), null, 16))), 256))
      ])) : C("", !0),
      m("div", br, [
        m("sl-button", {
          size: "medium",
          onClick: a[0] || (a[0] = (i) => r())
        }, " Zur Startseite "),
        m("sl-button", {
          variant: "primary",
          onClick: a[1] || (a[1] = (i) => s()),
          size: "medium"
        }, " Weiter Einkaufen ")
      ])
    ]));
  }
}, $r = /* @__PURE__ */ V(yr, [["__scopeId", "data-v-1f7efc9d"]]), Cr = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({});
    function r(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), wr = ["disabled", "value"], Rr = ["disabled", "value"];
function kr(e, n, t, o, r, s) {
  var l, a;
  return e.boneState.bonestructure.type === "raw.json" ? (p(), v("sl-textarea", {
    key: 0,
    disabled: (l = e.boneState) == null ? void 0 : l.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...i) => e.changeEvent && e.changeEvent(...i))
  }, null, 40, wr)) : (p(), v("sl-textarea", {
    key: 1,
    disabled: (a = e.boneState) == null ? void 0 : a.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...i) => e.changeEvent && e.changeEvent(...i))
  }, null, 40, Rr));
}
const it = /* @__PURE__ */ V(Cr, [["render", kr], ["__scopeId", "data-v-0ebe5f0b"]]), _r = B({
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
  setup(e, n) {
    const t = E({});
    function o(r) {
      n.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: o
    };
  }
}), Ir = ["value"];
function Er(e, n, t, o, r, s) {
  return p(), v("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Ir);
}
const at = /* @__PURE__ */ V(_r, [["render", Er], ["__scopeId", "data-v-b45a1311"]]);
function Vr(e) {
  return Wt() ? (Kt(e), !0) : !1;
}
function He(e) {
  return typeof e == "function" ? e() : D(e);
}
const Ar = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ut = () => {
};
function Fr(e, n) {
  function t(...o) {
    return new Promise((r, s) => {
      Promise.resolve(e(() => n.apply(this, o), { fn: n, thisArg: this, args: o })).then(r).catch(s);
    });
  }
  return t;
}
function Pr(e, n = {}) {
  let t, o, r = ut;
  const s = (a) => {
    clearTimeout(a), r(), r = ut;
  };
  return (a) => {
    const i = He(e), u = He(n.maxWait);
    return t && s(t), i <= 0 || u !== void 0 && u <= 0 ? (o && (s(o), o = null), Promise.resolve(a())) : new Promise((g, f) => {
      r = n.rejectOnCancel ? f : g, u && !o && (o = setTimeout(() => {
        t && s(t), o = null, g(a());
      }, u)), t = setTimeout(() => {
        o && s(o), o = null, g(a());
      }, i);
    });
  };
}
function Mr(e, n = 200, t = {}) {
  return Fr(
    Pr(n, t),
    e
  );
}
function Re(e, n, t = {}) {
  const {
    immediate: o = !0
  } = t, r = G(!1);
  let s = null;
  function l() {
    s && (clearTimeout(s), s = null);
  }
  function a() {
    r.value = !1, l();
  }
  function i(...u) {
    l(), r.value = !0, s = setTimeout(() => {
      r.value = !1, s = null, e(...u);
    }, He(n));
  }
  return o && (r.value = !0, Ar && i()), Vr(a), {
    isPending: qt(r),
    start: i,
    stop: a
  };
}
class Or {
  static objectEmpty(n) {
    return Object.keys(n).length === 0 && n.constructor === Object;
  }
  static getDescr(n, t) {
    try {
      return n.values.filter((o) => o[0] === t)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(n) {
    return n || (n = ""), String(n).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(n, t) {
    function o(l) {
      let a = [], i = [], u = /\$\((.*?)\)/g;
      for (; i; ) {
        if (i = u.exec(l), !i) {
          i = !1;
          continue;
        }
        a.push(i[1]);
      }
      return a;
    }
    let r = o(n), s = [];
    Array.isArray(t) || (t = [t]);
    for (let l of t) {
      let a = n;
      for (let i of r) {
        let u = i.split("."), g = l;
        for (let f of u)
          g && g !== "-" && f in g && g[f] ? g = g[f] : g = "-";
        g = this.unescape(g), a = a.replace("$(" + i + ")", g);
      }
      s.push(a);
    }
    return s.join(", ");
  }
}
const Dr = B({
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
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => e.value)
    }), r = G(null);
    function s(l) {
      n.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return pe(() => {
      if (e.autofocus && r.value && r.value !== null && r !== null) {
        const { start: l } = Re(() => {
          r.value.focus();
        }, 600);
        l();
      }
    }), j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      Utils: Or,
      boneState: t,
      changeEvent: s,
      stringBone: r
    };
  }
}), Lr = ["disabled", "value", "required"];
function Br(e, n, t, o, r, s) {
  return p(), v("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l)),
    onKeyup: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Lr);
}
const dt = /* @__PURE__ */ V(Dr, [["render", Br], ["__scopeId", "data-v-1ccbacc0"]]), jr = B({
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
  setup(e, n) {
    const t = P("boneState"), o = E({}), r = G(null);
    function s(l) {
      n.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return pe(() => {
      if (e.autofocus && r.value && r.value !== null && r !== null) {
        const { start: l } = Re(() => {
          r.value.focus();
        }, 600);
        l();
      }
    }), j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: s,
      emailBone: r
    };
  }
}), Nr = ["disabled", "value"];
function xr(e, n, t, o, r, s) {
  return p(), v("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Nr);
}
const ct = /* @__PURE__ */ V(jr, [["render", xr], ["__scopeId", "data-v-4328e024"]]), zr = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => {
        var l;
        let s = e.value;
        return t.bonestructure.time ? s = (l = e.value) == null ? void 0 : l.split("+")[0] : e.value && (s = new Date(e.value).toISOString().substr(0, 10)), s;
      }),
      typeString: A(() => {
        let s = "datetime-local";
        return t.bonestructure.time || (s = "date"), s;
      })
    });
    function r(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), Tr = ["disabled", "type", "value"];
function Hr(e, n, t, o, r, s) {
  return p(), v("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Tr);
}
const gt = /* @__PURE__ */ V(zr, [["render", Hr], ["__scopeId", "data-v-f1b8af8c"]]), Gr = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => {
        let l = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? l = l.filter((a) => t.bonestructure.values.map((i) => i[0].toString()).includes(a)) : l = l.filter(
          (a) => Object.keys(t.bonestructure.values).map((i) => i.toString()).includes(a)
        ), l.map((a) => a.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function r() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let l = [];
        for (const [a, i] of Object.entries(t.bonestructure.values))
          l.push([a, i]);
        return l;
      }
    }
    function s(l) {
      n.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, o.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: s,
      convertObjToList: r
    };
  }
}), Ur = ["disabled", "value", "multiple"], qr = ["value"];
function Wr(e, n, t, o, r, s) {
  return p(), v("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, [
    (p(!0), v(k, null, L(e.convertObjToList(), (l) => (p(), v("sl-option", {
      key: l[0],
      value: l[0]
    }, M(l[1]), 9, qr))), 128))
  ], 40, Ur);
}
const ft = /* @__PURE__ */ V(Gr, [["render", Wr], ["__scopeId", "data-v-094c8eff"]]), Kr = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function r(s) {
      n.emit("change", e.name, s.target.checked, e.lang, e.index);
    }
    return j(() => {
      let s = e.value;
      s || (s = !1), n.emit("change", e.name, s, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), Xr = ["disabled", "checked"];
function Zr(e, n, t, o, r, s) {
  return p(), v("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Xr);
}
const mt = /* @__PURE__ */ V(Kr, [["render", Zr], ["__scopeId", "data-v-363598c8"]]), Jr = B({
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
  setup(e, n) {
    const t = P("boneState"), o = E({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), r = G(null);
    function s(a) {
      o.value1 === o.value2 ? o.equal = !0 : o.equal = !1, l(o.value1), o.requiredPasswordInfo.length === 0 && o.passwordInfo.length - o.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, o.value1, e.lang, e.index, !0) : n.emit("change", e.name, o.value1, e.lang, e.index, !1);
    }
    j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function l(a) {
      o.passwordInfo = [], o.requiredPasswordInfo = [];
      for (const i of t.bonestructure.tests)
        new RegExp(i[0]).test(a) || (i[2] ? o.requiredPasswordInfo.push(i[1]) : o.passwordInfo.push(i[1]));
      o.equal || o.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), o.value1 || o.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return pe(() => {
      if (e.autofocus && r.value && r.value !== null && r !== null) {
        const { start: a } = Re(() => {
          r.value.focus();
        }, 600);
        a();
      }
    }), ae(
      () => e.value,
      (a, i) => {
        o.value1 = a;
      }
    ), {
      state: o,
      boneState: t,
      changeEvent: s,
      passwordBone: r
    };
  }
}), Yr = ["disabled"], Qr = ["name"], es = ["name"], ts = { class: "errors" };
function ns(e, n, t, o, r, s) {
  return p(), v(k, null, [
    te(m("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": n[0] || (n[0] = (l) => e.state.value1 = l),
      disabled: e.boneState.readonly,
      class: X({ "has-check": !e.boneState.readonly }),
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l)),
      onSlClear: n[2] || (n[2] = (l) => e.state.value1 = ""),
      onKeyup: n[3] || (n[3] = (...l) => e.changeEvent && e.changeEvent(...l))
    }, [
      m("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, Qr)
    ], 42, Yr), [
      [fe, e.state.value1]
    ]),
    e.boneState.readonly ? C("", !0) : te((p(), v("sl-input", {
      key: 0,
      "onUpdate:modelValue": n[4] || (n[4] = (l) => e.state.value2 = l),
      class: "password-check",
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[5] || (n[5] = (...l) => e.changeEvent && e.changeEvent(...l)),
      onSlClear: n[6] || (n[6] = (l) => e.state.value2 = ""),
      onKeyup: n[7] || (n[7] = (...l) => e.changeEvent && e.changeEvent(...l))
    }, [
      m("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, es)
    ], 544)), [
      [fe, e.state.value2]
    ]),
    m("ul", ts, [
      (p(!0), v(k, null, L(e.state.passwordInfo, (l, a) => (p(), v("li", { key: a }, M(l), 1))), 128)),
      (p(!0), v(k, null, L(e.state.requiredPasswordInfo, (l, a) => (p(), v("li", {
        key: a,
        class: "requiredInfo"
      }, M(l), 1))), 128))
    ])
  ], 64);
}
const pt = /* @__PURE__ */ V(Jr, [["render", ns], ["__scopeId", "data-v-0ccf18c0"]]), T = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 };
class $e extends Error {
  constructor(n, t, o, r) {
    super(o || t), arguments.length >= 4 && r && Object.assign(this, r), this.statusText = t, this.statusCode = n, this.response = r;
  }
}
let De = null;
function Z() {
  return De || (De = Ge("requestStore", () => {
    const e = E({
      sKeys: /* @__PURE__ */ new Set(),
      amount: 1
    });
    function n() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: n
    };
  })), De();
}
class F {
  static resetState() {
    Z().$reset(), Z().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = window.location.origin + n), n;
  }
  static post(n, { dataObj: t = null, callback: o = null, failedCallback: r = null, abortController: s = null, headers: l = null, mode: a = null } = {}) {
    function i() {
      if (t instanceof FormData)
        return t;
      const g = new FormData();
      for (const f in t)
        if (Array.isArray(t[f]))
          for (let c of t[f])
            g.append(f, c);
        else
          g.append(f, t[f]);
      return g;
    }
    let u = me.post(F.buildUrl(n), i(), null, l, s, a);
    return u.then(function(g) {
      o && o(g.data);
    }).catch(function(g) {
      r && r(g);
    }), u;
  }
  static async getBatchSkeys(n = "json") {
    await F.get(`/${n}/skey`, {
      dataObj: { amount: Z().state.amount }
    }).then(async (t) => {
      let o = await t.json();
      Array.isArray(o) || (o = [o]), Z().state.sKeys = new Set(o);
    });
  }
  static async securePost(n, {
    dataObj: t = null,
    callback: o = null,
    failedCallback: r = null,
    abortController: s = null,
    renderer: l = "json",
    headers: a = null,
    mode: i = null,
    amount: u = null
  } = {}) {
    let g = null;
    Z().state.sKeys.size === 0 && (u && (Z().state.amount = u), await F.getBatchSkeys(l));
    const f = [...Z().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", f), Z().state.sKeys.delete(f)) : (t || (t = {}), t.skey = f, Z().state.sKeys.delete(f)), g = F.post(n, {
      dataObj: t,
      callback: o,
      abortController: s,
      headers: a,
      mode: i
    }), g;
  }
  static get(n, {
    dataObj: t = null,
    callback: o = null,
    failedCallback: r = null,
    cached: s = !1,
    clearCache: l = !1,
    abortController: a = null,
    headers: i = null,
    mode: u = null,
    //          milli  sec  min  Std  Tage
    cacheTime: g = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let f = me.get(F.buildUrl(n), t, l, i, a, u);
    return f.then(function(c) {
      o && o(c.data);
    }).catch(function(c) {
      r && r(c);
    }), f;
  }
  static list(n, {
    dataObj: t = null,
    callback: o = null,
    failedCallback: r = null,
    group: s = null,
    abortController: l = null,
    renderer: a = (T == null ? void 0 : T.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let i = `/${a}/${n}/list`;
    return s && (i += `/${s}`), F.get(i, {
      dataObj: t,
      callback: o,
      failedCallback: r,
      abortController: l
    });
  }
  static getStructure(n, {
    dataObj: t = null,
    callback: o = null,
    failedCallback: r = null,
    group: s = null,
    abortController: l = null,
    renderer: a = (T == null ? void 0 : T.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let i = `/${a}/getStructure/${n}`;
    return s && (i += `/${s}`), F.get(i, {
      dataObj: t,
      callback: o,
      failedCallback: r,
      abortController: l
    });
  }
  static view(n, t, {
    dataObj: o = null,
    callback: r = null,
    failedCallback: s = null,
    group: l = null,
    abortController: a = null,
    renderer: i = (T == null ? void 0 : T.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let u = `/${i}/${n}/view/${t}`;
    return l && (u = `/${i}/${n}/view/${l}/${t}`), F.get(u, {
      dataObj: o,
      callback: r,
      failedCallback: s,
      abortController: a
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: o = null,
    failedCallback: r = null,
    group: s = null,
    abortController: l = null,
    renderer: a = (T == null ? void 0 : T.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let i = `/${a}/${n}/add`;
    return s && (i = `/${a}/${n}/add/${s}`), F.securePost(i, {
      dataObj: t,
      callback: o,
      failedCallback: r,
      abortController: l
    });
  }
  static edit(n, t, {
    dataObj: o = null,
    callback: r = null,
    failedCallback: s = null,
    group: l = null,
    abortController: a = null,
    renderer: i = (T == null ? void 0 : T.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let u = `/${i}/${n}/edit/${t}`;
    return l && (u = `/${i}/${n}/edit/${l}/${t}`), F.securePost(u, {
      dataObj: o,
      callback: r,
      failedCallback: s,
      abortController: a
    });
  }
  static delete(n, t, {
    dataObj: o = null,
    callback: r = null,
    failedCallback: s = null,
    group: l = null,
    abortController: a = null,
    renderer: i = (T == null ? void 0 : T.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let u = `/${i}/${n}/delete/${t}`;
    return l && (u = `/${i}/${n}/delete/${l}/${t}`), F.securePost(u, {
      dataObj: o,
      callback: r,
      failedCallback: s,
      abortController: a,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? F.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? F.buildUrl(n.dest.downloadUrl) : F.buildUrl(null) : F.buildUrl(n);
  }
  static serveUrlFor(n, t = null, o = null, r = "", s = !1) {
    const l = /^https:\/\/(.*?)\.googleusercontent\.com\/(.*?)$/;
    let a = "/file/serve";
    const i = n.match(l);
    if (i) {
      const u = i[1], g = i[2];
      a += `/${u}/${g}`, t && (a += `/${t}`), o && (a += `/${o}`);
      let f = [];
      for (const [c, d] of Object.entries({ options: r, download: s }))
        d && f.push(`${c}=${d}`);
      f.length > 0 && (a += `?${f.join("&")}`);
    }
    return F.buildUrl(a);
  }
  static uploadFile(n, t = void 0) {
    const o = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((r, s) => {
      F.securePost("/vi/file/getUploadURL", { dataObj: o }).then(async (l) => {
        let a = await l.json();
        fetch(a.values.uploadUrl, {
          body: n,
          method: "POST",
          mode: "no-cors"
        }).then(async (i) => {
          const u = {
            key: a.values.uploadKey,
            skelType: "leaf"
          };
          F.securePost("/vi/file/add", { dataObj: u }).then(async (g) => {
            let f = await g.json();
            f.action === "addSuccess" ? r(f.values) : s(f);
          }).catch((g) => {
            s(g);
          });
        }).catch((i) => {
          s(i);
        });
      }).catch((l) => {
        s(l);
      });
    });
  }
}
class me {
  constructor() {
    et(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, o = null, r = null, s = null) {
    let l = { method: n };
    return l.credentials = "include", l.headers = {
      Accept: "application/json, text/plain, */*"
    }, o && (l.headers = { ...l.headers, ...o }), t && (l.body = t), r && (l.signal = r.signal), s && (l.mode = s), l;
  }
  static get(n, t = null, o = null, r = null, s = null, l = null) {
    function a(i, u) {
      let g = new URL(i);
      if (u && Object.keys(u).length > 0) {
        const f = new URLSearchParams();
        for (const [c, d] of Object.entries(u))
          if (Array.isArray(d))
            for (const h of d)
              f.append(c, h);
          else
            f.append(c, d);
        g.search = f.toString();
      }
      return g.toString();
    }
    return fetch(a(n, t), me.buildOptions("GET", null, r, s, l)).then(async (i) => {
      if (i.ok)
        return i;
      {
        const u = `${i.status} ${i.statusText}: ${i.headers ? i.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new $e(i.status, i.statusText, u, i));
      }
    }).catch((i) => {
      if (i instanceof TypeError) {
        const g = `503 ${i.message}: ${i.headers ? i.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new $e(503, i.message, g, i));
      }
      if (i instanceof DOMException && i.name == "AbortError") {
        const g = `${i.code} ${i.name}: ${i.headers ? i.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new $e(i.code, i.name, g, { url: n }));
      }
      const u = `${i.statusCode} ${i.statusText}: ${i.headers ? i.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new $e(i.statusCode, i.statusText, u, i.response));
    });
  }
  static post(n, t = null, o = null, r = null, s = null, l = null) {
    return fetch(n, me.buildOptions("POST", t, r, s, l));
  }
}
function os(e, n) {
  function t() {
    let c = `/${e.renderer}/${e.module}/${e.action}`;
    const d = ["node", "leaf"].includes(e.skeltype);
    return e.group ? c += `/${e.group}` : d && (c += `/${e.skeltype}`), (["edit", "clone"].includes(e.action) || d && e.action === "add") && (c += `/${e.skelkey}`), c;
  }
  function o(c) {
    if (Array.isArray(c)) {
      let d = {};
      for (const h in c)
        d[c[h][0]] = c[h][1];
      return d;
    } else
      return c;
  }
  function r() {
    let c = [];
    function d(S, b, y, $) {
      var _, N, H;
      if (y.type.startsWith("record")) {
        let I = o(y.using);
        for (const [z, Q] of Object.entries(I))
          S = S.concat(h(`${b}.${z}`, Q, $ == null ? void 0 : $[z]));
      } else if ($ === Object($) && y.using)
        if ((_ = $.dest) != null && _.key) {
          let I = o(y.using);
          for (const [z, Q] of Object.entries(I))
            S = S.concat(h(`${b}.${z}`, Q, (N = $.rel) == null ? void 0 : N[z]));
          S.push({ [`${b}.key`]: $.dest.key });
        } else
          S.push({ [`${b}`]: null });
      else y.type.startsWith("spatial") && $ ? (S.push({ [b + ".lat"]: $[0] }), S.push({ [b + ".lng"]: $[1] })) : $ === Object($) ? S.push({ [b]: ((H = $.dest) == null ? void 0 : H.key) || null }) : S.push({ [b]: $ });
      return S;
    }
    function h(S, b, y) {
      let $ = [], _ = b.type.startsWith("record"), N = b.languages || ["none"], H = y;
      for (const I of N) {
        let z = S;
        if (I !== "none" && (z += `.${I}`, H && (y = H[I])), b.multiple) {
          y || (y = []);
          for (const [Q, ie] of y.entries()) {
            let ve = z;
            (_ || ie != null && ie.rel) && (ve = `${z}.${Q}`), $ = d($, ve, b, ie);
          }
          y.length === 0 && $.push({ [z]: null });
        } else
          $ = d($, z, b, y);
      }
      return $;
    }
    for (const [S, b] of Object.entries(n.structure))
      e.sendReadOnly ? c.push(h(S, b, n.skel[S])) : n.structure[S].readonly || c.push(h(S, b, n.skel[S]));
    return c = c.flat(10), c;
  }
  function s(c = null, d = null, h = !0) {
    n.loading = !0;
    let S = F.post;
    e.secure && (S = F.securePost);
    let b = t();
    c && (b = c);
    const y = new FormData();
    for (const _ of r())
      for (const [N, H] of Object.entries(_)) {
        let I = H || "";
        y.append(N, I);
      }
    let $ = {};
    for (const _ of y.keys())
      _ === "key" && h || ($[[_]] = y.getAll(_));
    return d && ($ = { ...$, ...d }), S(b, { dataObj: $ }).then(async (_) => {
      let N = await _.clone().json();
      return n.skel = N.values, n.errors = N.errors, n.loading = !1, _;
    });
  }
  function l(c = null, d = null) {
    n.loading = !0;
    let h = F.post;
    e.secure && (h = F.securePost);
    let S = t();
    c && (S = c);
    let b = {};
    return d && (b = { ...b, ...d }), h(S, { dataObj: b }).then(async (y) => {
      let $ = await y.clone().json();
      return f($.values, $.structure), n.errors = $.errors, n.loading = !1, y;
    });
  }
  function a() {
    var h, S;
    n.structure || (n.structure = {});
    let c = { default: { name: "Allgemein", bones: [], visible: !1, open: !0 } };
    for (const [b, y] of Object.entries(n.structure)) {
      if (e.bones.length > 0 && !e.bones.includes(b))
        continue;
      let $ = "default", _ = n.structure[b];
      (h = y == null ? void 0 : y.params) != null && h.category && ($ = y.params.category.toLowerCase()), Object.keys(c).includes($) ? c[$].bones.push({
        name: b
      }) : c[$] = {
        name: y.params.category,
        bones: [
          {
            name: b
          }
        ]
      }, _.visible === !0 && (c[$].visible = !0), e.collapsedCategories && e.collapsedCategories.map((N) => N.toLowerCase()).includes($) || $ === "system" || $ === "internal" || ((S = e.collapsedCategories) == null ? void 0 : S[0]) === "*" ? c[$].open = !1 : c[$].open = !0;
    }
    let d = {};
    return Object.keys(c).sort().forEach(function(b) {
      d[b] = c[b];
    }), d;
  }
  function i(c) {
    const { name: d, lang: h, value: S, index: b } = c;
    let y = n.skel[d];
    if (S === void 0 || n.readonly) return !1;
    h ? (y || (y = {}), Object.keys(y).includes(h) && b !== null ? (y[h] || (y[h] = []), y[h][b] = S) : y[h] = S) : b !== null ? (y || (y = []), y[b] = S) : (y = S, n.skel[d] = y), g();
  }
  function u(c, d) {
    var h, S, b, y, $, _, N;
    for (const [H, I] of Object.entries(c)) {
      if ((h = I == null ? void 0 : I.params) != null && h.evaluate) {
        let z = new Logics((S = I == null ? void 0 : I.params) == null ? void 0 : S.evaluate);
        n.skel[H] = z.run(d);
      }
      if ((b = I == null ? void 0 : I.params) != null && b.visibleIf)
        try {
          let z = new Logics((y = I == null ? void 0 : I.params) == null ? void 0 : y.visibleIf);
          I.visible = z.run(d).toBool();
        } catch {
          console.log(($ = I == null ? void 0 : I.params) == null ? void 0 : $.visibleIf);
        }
      if ((_ = I == null ? void 0 : I.params) != null && _.readonlyIf) {
        let z = new Logics((N = I == null ? void 0 : I.params) == null ? void 0 : N.readonlyIf);
        I.readonly = z.run(d).toBool();
      }
      I != null && I.using && u(I.using, d);
    }
  }
  function g() {
    let c = n.skel;
    e.internal && (c = e.internal.skel), u(n.structure, c);
  }
  function f(c, d) {
    n.skel = c || {}, n.structure = o(d), n.categories = a();
  }
  return {
    fetchData: l,
    sendData: s,
    buildRequestUrl: t,
    updateCategories: a,
    updateSkel: i,
    normalizeStructure: o,
    initForm: f
  };
}
const rs = ["summary", "open"], ss = {
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
    return (n, t) => e.hide ? re(n.$slots, "default", { key: 0 }, void 0, !0) : te((p(), v("sl-details", {
      key: 1,
      summary: e.name,
      open: e.open
    }, [
      re(n.$slots, "default", {}, void 0, !0)
    ], 8, rs)), [
      [qe, e.visible]
    ]);
  }
}, ls = /* @__PURE__ */ V(ss, [["__scopeId", "data-v-812946e1"]]), is = {
  __name: "LayoutCategory",
  setup(e) {
    const n = P("formState");
    return P("formUpdate"), (t, o) => (p(!0), v(k, null, L(D(n).categories, (r, s) => (p(), x(ls, {
      name: r.name,
      identifier: s,
      visible: r.visible,
      open: r.open,
      hide: !D(n).useCategories
    }, {
      default: We(() => [
        (p(!0), v(k, null, L(r.bones, (l) => re(t.$slots, "default", {
          key: l.name,
          boneName: l.name,
          widget: D(se)(D(n).structure[l.name].type),
          visible: D(n).structure[l.name].visible,
          label: D(n).label
        })), 128))
      ]),
      _: 2
    }, 1032, ["name", "identifier", "visible", "open", "hide"]))), 256));
  }
}, as = {
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
      default: is
    },
    label: {
      type: String,
      default: "normal",
      validator(e, n) {
        return ["normal", "top", "hide"].includes(e);
      }
    }
    // add errors, from the outside (maybe relevant if form is build with slots)
    // errors: []
  },
  emits: ["change"],
  setup(e, { expose: n, emit: t }) {
    const o = t, r = e, s = E({
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
      values: A(() => r.values),
      internal: A(() => r.internal),
      useCategories: A(() => r.useCategories),
      label: A(() => r.label)
    });
    ke("formState", s), r.internal || ke("mainformState", s);
    const { fetchData: l, sendData: a, updateSkel: i, initForm: u } = os(r, s), g = Mr((c) => {
      o("change", c);
    }, 500);
    Y(() => {
      s.loading = !0, r.structure ? (u(r.skel, r.structure), s.loading = !1) : r.module && r.action ? l(null, r.params).then(async (c) => {
        s.loading = !1;
      }).catch(async (c) => {
        s.loading = !1;
      }) : (console.log(r), console.error("Error while building Form: you need atleast module and action or structure parameters"));
    }), ae(() => r.skel, (c, d) => {
      u(r.skel, r.structure);
    });
    function f(c) {
      i(c), g(c);
    }
    return ke("formUpdate", f), n({ sendData: a, fetchData: l, updateSkel: i, state: s }), (c, d) => {
      const h = ue("bone");
      return re(c.$slots, "default", {
        structure: s.structure,
        skel: s.skel,
        errors: s.errors,
        categories: s.categories
      }, () => [
        (p(), x(Ue(e.layout), null, {
          default: We(({ boneName: S, widget: b, visible: y, label: $ }) => [
            te(ne(h, {
              is: b,
              name: S,
              structure: s.structure,
              skel: s.skel,
              errors: s.errors,
              label: $,
              onChangeInternal: f
            }, null, 8, ["is", "name", "structure", "skel", "errors", "label"]), [
              [qe, y]
            ])
          ]),
          _: 1
        }))
      ]);
    };
  }
}, us = {
  key: 0,
  open: "",
  variant: "danger"
}, ds = {
  key: 1,
  class: "form"
}, cs = {
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
  setup(e, { emit: n }) {
    const t = n, o = e, r = G(null);
    P("boneState");
    const s = P("mainformState"), l = E({
      renderer: "json",
      globalRegistration: !1
    });
    function a(i) {
      i.value = r.value.state.skel, i.name = o.name, i.index = o.index, i.lang = o.lang, t("change", i);
    }
    return j(() => {
      Xt().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, t("change", o.name, o.value, o.lang, o.index);
    }), (i, u) => {
      var g, f;
      return l.globalRegistration ? (p(), v("div", ds, [
        ne(as, {
          ref_key: "skelRef",
          ref: r,
          internal: D(s),
          skel: e.value,
          structure: e.bone.using,
          renderer: l.renderer,
          collapsedCategories: ((f = (g = e.bone) == null ? void 0 : g.params) == null ? void 0 : f.collapsedCategories) || [],
          onChange: a
        }, null, 8, ["internal", "skel", "structure", "renderer", "collapsedCategories"])
      ])) : (p(), v("sl-alert", us, " In Order to use this Bone register the bone component globally in your main file "));
    };
  }
}, Ye = /* @__PURE__ */ V(cs, [["__scopeId", "data-v-c5d80655"]]), gs = {
  __name: "recordBone",
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String,
    bone: Object
  },
  emits: ["change"],
  setup(e, { emit: n }) {
    const t = n, o = e;
    E({});
    function r(s) {
      t("change", s.name, s.value, s.lang, s.index);
    }
    return j(() => {
      t("change", o.name, o.value, o.lang, o.index);
    }), (s, l) => (p(), x(Ye, {
      value: e.value,
      name: e.name,
      index: e.index,
      lang: e.lang,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: r
    }, null, 8, ["value", "name", "index", "lang", "bone", "disabled"]));
  }
}, vt = /* @__PURE__ */ V(gs, [["__scopeId", "data-v-2567eeb3"]]), fs = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({});
    function r(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), ms = ["disabled", "value"];
function ps(e, n, t, o, r, s) {
  return p(), v("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, ms);
}
const ht = /* @__PURE__ */ V(fs, [["render", ps], ["__scopeId", "data-v-534b9149"]]), vs = B({
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
  setup(e, n) {
    const t = P("boneState"), o = E({
      minAmount: A(() => t.bonestructure.minAmount),
      maxAmount: A(() => t.bonestructure.maxAmount),
      precision: A(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), r = G(null);
    function s(l) {
      n.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return pe(() => {
      if (e.autofocus && r.value && r.value !== null && r !== null) {
        const { start: l } = Re(() => {
          r.value.focus();
        }, 600);
        l();
      }
    }), j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: s,
      numericBone: r
    };
  }
}), hs = ["disabled", "value", "min", "max", "step"], Ss = { class: "info" }, bs = { key: 0 }, ys = { key: 1 }, $s = { key: 2 };
function Cs(e, n, t, o, r, s) {
  return p(), v(k, null, [
    m("sl-input", {
      ref: "numericBone",
      type: "number",
      disabled: e.boneState.readonly,
      value: e.value,
      min: e.state.minAmount,
      max: e.state.maxAmount,
      step: e.state.precision,
      onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l)),
      onKeyup: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l))
    }, null, 40, hs),
    m("ul", Ss, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (p(), v("li", bs, M(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : C("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (p(), v("li", ys, M(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : C("", !0),
      e.state.precision ? (p(), v("li", $s, M(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : C("", !0)
    ])
  ], 64);
}
const St = /* @__PURE__ */ V(vs, [["render", Cs], ["__scopeId", "data-v-03d5b399"]]), ws = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone: Object
  },
  components: { Wrapper_nested: Ye },
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = P("formatString"), r = E({
      format: A(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function s(i) {
      let u = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? u = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (u = "skelType=node&"), F.get(
        `/vi/${t.bonestructure.module}/list?${u}limit=99`
      ).then(async (g) => {
        var c;
        const f = await g.json();
        r.skellistdata = {};
        for (let d of f.skellist)
          r.skellistdata[d.key] = d;
        return (c = f.skellist) == null ? void 0 : c.map((d) => ({ text: o(t.bonestructure.format, { dest: d }), value: d.key, data: d }));
      });
    }
    function l(i) {
      r.selection = { dest: r.skellistdata[i.detail.item.value] }, n.emit("change", e.name, r.selection, e.lang, e.index);
    }
    function a(i) {
      r.selection = { ...r.selection, rel: i.value }, n.emit("change", i.name, r.selection, i.lang, i.index);
    }
    return j(() => {
      r.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      formatString: o,
      changeEvent: l,
      changeEventNested: a,
      getList: s
    };
  }
}), Rs = { class: "record" }, ks = { class: "single-entry" }, _s = ["value"], Is = ["disabled", "source"], Es = ["title"];
function Vs(e, n, t, o, r, s) {
  const l = ue("Wrapper_nested");
  return p(), v("div", Rs, [
    m("div", ks, [
      e.state.selection ? (p(), v("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, _s)) : (p(), v("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
      }, null, 40, Is)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (p(), v("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, n[2] || (n[2] = [
        m("sl-icon", {
          slot: "prefix",
          name: "x-lg"
        }, null, -1)
      ]), 8, Es)) : C("", !0)
    ]),
    e.bone.using ? (p(), x(l, {
      key: 0,
      value: e.value,
      name: e.name,
      index: e.index,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "bone", "disabled", "onChange"])) : C("", !0)
  ]);
}
const bt = /* @__PURE__ */ V(ws, [["render", Vs], ["__scopeId", "data-v-0dd7523e"]]), As = B({
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
  setup(e, n) {
    const t = P("boneState"), o = E({});
    function r(s, l) {
      n.emit("change", e.name, s, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), Fs = { class: "box" };
function Ps(e, n, t, o, r, s) {
  return p(), v("div", Fs, M(e.value), 1);
}
const Ms = /* @__PURE__ */ V(As, [["render", Ps], ["__scopeId", "data-v-343aca69"]]), Os = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = G(), r = E({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    j(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s() {
      console.log(F.downloadUrlFor(e.value)), window.open(F.downloadUrlFor(e.value));
    }
    function l() {
      return F.downloadUrlFor(e.value, !1);
    }
    function a(g) {
      const f = {
        fileName: g.name,
        mimeType: g.type || "application/octet-stream",
        size: g.size.toString()
      };
      return new Promise((c, d) => {
        F.securePost("/vi/file/getUploadURL", { dataObj: f }).then(async (h) => {
          let S = await h.json();
          fetch(S.values.uploadUrl, {
            body: g,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: S.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            F.securePost("/vi/file/add", { dataObj: y }).then(async ($) => {
              let _ = await $.json();
              _.action === "addSuccess" ? c(_.values) : d(_);
            }).catch(($) => {
              d($);
            });
          }).catch((b) => {
            d(b);
          });
        }).catch((h) => {
          d(h);
        });
      });
    }
    async function i(g) {
      r.loading = !0;
      for (let f of g.target.files) {
        let c = await a(f);
        o.value.value = null, n.emit("change", e.name, { dest: c, rel: null }, e.lang, e.index);
      }
      r.loading = !1;
    }
    async function u(g) {
      r.loading = !0, r.droparea = !1;
      for (let f of g.dataTransfer.files) {
        let c = await a(f);
        o.value.value = null, n.emit("change", e.name, { dest: c, rel: null }, e.lang, e.index);
        break;
      }
      r.loading = !1;
    }
    return {
      state: r,
      boneState: t,
      downloadFile: s,
      createBackgroundImage: l,
      handleUpload: i,
      uploadinput: o,
      handleDrop: u
    };
  }
}), Ds = {
  key: 0,
  class: "loader"
}, Ls = {
  key: 1,
  class: "droparea"
}, Bs = ["title"], js = ["multiple"], Ns = ["title"], xs = { class: "box" }, zs = ["src"], Ts = ["label", "open"], Hs = ["src"], Gs = {
  key: 1,
  class: "preview"
}, Us = {
  key: 0,
  name: "file-earmark"
}, qs = { key: 2 }, Ws = ["title"];
function Ks(e, n, t, o, r, s) {
  var l, a, i, u, g, f, c, d, h, S;
  return p(), v("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = Ce((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = Ce((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (p(), v("div", Ds, n[8] || (n[8] = [
      m("sl-spinner", { slot: "suffix" }, null, -1)
    ]))) : C("", !0),
    e.state.droparea ? (p(), v("div", Ls, " Dateien hier hinziehen ")) : C("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (p(), v("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, n[9] || (n[9] = [
      m("sl-icon", { name: "upload" }, null, -1)
    ]), 8, Bs)) : C("", !0),
    m("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, js),
    e.value ? (p(), v("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, n[10] || (n[10] = [
      m("sl-icon", {
        slot: "prefix",
        name: "download"
      }, null, -1)
    ]), 8, Ns)) : C("", !0),
    m("div", xs, [
      (a = (l = e.value) == null ? void 0 : l.dest) != null && a.mimetype.includes("image") ? (p(), v("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        m("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, zs),
        m("sl-dialog", {
          label: decodeURIComponent((u = (i = e.value) == null ? void 0 : i.dest) == null ? void 0 : u.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          m("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, Hs)
        ], 8, Ts)
      ])) : (p(), v("div", Gs, [
        (f = (g = e.value) == null ? void 0 : g.dest) != null && f.name ? (p(), v("sl-icon", Us)) : C("", !0)
      ])),
      (d = (c = e.value) == null ? void 0 : c.dest) != null && d.name ? (p(), v("div", qs, M(decodeURIComponent((S = (h = e.value) == null ? void 0 : h.dest) == null ? void 0 : S.name)), 1)) : C("", !0)
    ]),
    e.boneState.multiple ? C("", !0) : (p(), v("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, n[11] || (n[11] = [
      m("sl-icon", { name: "x-lg" }, null, -1)
    ]), 8, Ws))
  ], 32);
}
const yt = /* @__PURE__ */ V(Os, [["render", Ks], ["__scopeId", "data-v-91086308"]]), Xs = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: "",
      editorConfig: {},
      editor: A(() => tt)
    });
    function r(a) {
      n.emit("change", e.name, o.value, e.lang, e.index);
    }
    function s(a) {
      o.value = a.target.value, n.emit("change", e.name, o.value, e.lang, e.index);
    }
    j(() => {
      e.value !== null && (o.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function l(a) {
      a.editing.view.change((u) => {
        u.setStyle("min-height", "250px", a.editing.view.document.getRoot());
      });
      const i = a.plugins.get("SourceEditing");
      i.on("change:isSourceEditingMode", (u, g, f) => {
        var c, d;
        f && ((d = (c = a.editing.view.getDomRoot()) == null ? void 0 : c.nextSibling) == null ? void 0 : d.firstChild).addEventListener("focusout", (S) => {
          i.isSourceEditingMode = !1;
        });
      });
    }
    return ae(
      () => e.value,
      (a, i) => {
        a ? o.value = a : o.value = "";
      }
    ), {
      state: o,
      ClassicEditor: tt,
      boneState: t,
      changeEvent: r,
      onReady: l,
      changeEventTextarea: s
    };
  }
}), Zs = ["disabled", "value"];
function Js(e, n, t, o, r, s) {
  var a, i, u, g;
  const l = ue("ckeditor");
  return e.state.editor ? (p(), v(k, { key: 0 }, [
    (a = e.boneState.bonestructure) != null && a.valid_html || (i = e.boneState.bonestructure) != null && i.validHtml ? (p(), x(l, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (f) => e.state.value = f),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (u = e.boneState) == null ? void 0 : u.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (p(), v("sl-textarea", {
      key: 1,
      disabled: (g = e.boneState) == null ? void 0 : g.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...f) => e.changeEventTextarea && e.changeEventTextarea(...f))
    }, null, 40, Zs))
  ], 64)) : C("", !0);
}
const $t = /* @__PURE__ */ V(Xs, [["render", Js]]), Ys = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      valueLat: null,
      valueLng: null
    });
    function r() {
      n.emit("change", e.name, [o.valueLat, o.valueLng], e.lang, e.index);
    }
    return j(() => {
      try {
        o.valueLat = e.value[0], o.valueLng = e.value[1];
      } catch {
      }
      n.emit("change", e.name, [o.valueLat, o.valueLng], e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), Qs = ["name", "min", "max", "disabled"], el = ["name", "min", "max", "disabled"];
function tl(e, n, t, o, r, s) {
  return p(), v(k, null, [
    te(m("sl-input", {
      "onUpdate:modelValue": n[0] || (n[0] = (l) => e.state.valueLat = l),
      index: "lat",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l)),
      placeholder: "Lat"
    }, null, 40, Qs), [
      [fe, e.state.valueLat]
    ]),
    te(m("sl-input", {
      "onUpdate:modelValue": n[2] || (n[2] = (l) => e.state.valueLng = l),
      index: "lng",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: n[3] || (n[3] = (...l) => e.changeEvent && e.changeEvent(...l)),
      placeholder: "Long"
    }, null, 40, el), [
      [fe, e.state.valueLng]
    ])
  ], 64);
}
const Ct = /* @__PURE__ */ V(Ys, [["render", tl], ["__scopeId", "data-v-7bc31020"]]), nl = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => "" + ![!1, null, void 0, "", "false"].includes(e.value))
    });
    function r(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return j(() => {
      let s = e.value;
      s || (s = !1), n.emit("change", e.name, s, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), ol = ["disabled", "value"], rl = ["value"];
function sl(e, n, t, o, r, s) {
  return p(), v("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    "max-options-visible": "0",
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, [
    (p(), v(k, null, L([!0, !1], (l) => m("sl-option", {
      key: l,
      value: l
    }, [
      l ? (p(), v(k, { key: 0 }, [
        O(M(e.$t("bones.bool.true")), 1)
      ], 64)) : (p(), v(k, { key: 1 }, [
        O(M(e.$t("bones.bool.false")), 1)
      ], 64))
    ], 8, rl)), 64))
  ], 40, ol);
}
const wt = /* @__PURE__ */ V(nl, [["render", sl], ["__scopeId", "data-v-6c721dfe"]]), ll = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => "" + ![!1, null, void 0, "", "false"].includes(e.value))
    });
    function r(s) {
      console.log(s.target.value), n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return j(() => {
      let s = e.value;
      s || (s = !1), n.emit("change", e.name, s, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: r
    };
  }
}), il = ["value"], al = ["disabled"], ul = ["disabled"];
function dl(e, n, t, o, r, s) {
  return p(), v("sl-radio-group", {
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, [
    m("sl-radio", {
      value: "true",
      disabled: e.boneState.readonly
    }, M(e.$t("bones.bool.true")), 9, al),
    m("sl-radio", {
      value: "false",
      disabled: e.boneState.readonly
    }, M(e.$t("bones.bool.false")), 9, ul)
  ], 40, il);
}
const Rt = /* @__PURE__ */ V(ll, [["render", dl], ["__scopeId", "data-v-93a36330"]]), cl = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: {},
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = E({
      value: A(() => {
        let a = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? a = a.filter((i) => t.bonestructure.values.map((u) => u[0].toString()).includes(i)) : a = a.filter(
          (i) => Object.keys(t.bonestructure.values).map((u) => u.toString()).includes(i)
        ), a.map((i) => i.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function r() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let a = [];
        for (const [i, u] of Object.entries(t.bonestructure.values))
          a.push([i, u]);
        return a;
      }
    }
    function s(a) {
      let i = [...o.value];
      a.target.checked ? i.push(a.target.dataset.value) : i = i.filter((u) => u !== a.target.dataset.value), n.emit("change", e.name, i, e.lang, e.index);
    }
    function l(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return j(() => {
      n.emit("change", e.name, o.value, e.lang, e.index);
    }), {
      state: o,
      boneState: t,
      changeEvent: l,
      changeEventMultiple: s,
      convertObjToList: r
    };
  }
}), gl = {
  key: 0,
  class: "wrapper-multiple"
}, fl = ["data-value", "checked", "disabled"], ml = ["value"], pl = ["value", "disabled"];
function vl(e, n, t, o, r, s) {
  return e.boneState.bonestructure.multiple ? (p(), v("div", gl, [
    (p(!0), v(k, null, L(e.convertObjToList(), (l) => (p(), v("sl-checkbox", {
      "data-value": l[0],
      checked: e.state.value.includes(l[0]),
      disabled: e.boneState.readonly,
      onSlChange: n[0] || (n[0] = (...a) => e.changeEventMultiple && e.changeEventMultiple(...a))
    }, M(l[1]), 41, fl))), 256))
  ])) : (p(), v("sl-radio-group", {
    key: 1,
    value: e.state.value,
    onSlChange: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, [
    (p(!0), v(k, null, L(e.convertObjToList(), (l) => (p(), v("sl-radio", {
      value: l[0],
      disabled: e.boneState.readonly
    }, M(l[1]), 9, pl))), 256))
  ], 40, ml));
}
const kt = /* @__PURE__ */ V(cl, [["render", vl], ["__scopeId", "data-v-d7bcff6b"]]), hl = B({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone: Object
  },
  components: { Wrapper_nested: Ye },
  emits: ["change"],
  setup(e, n) {
    const t = P("boneState"), o = P("formatString"), r = E({
      format: A(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function s(i) {
      let u = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? u = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (u = "skelType=node&"), F.get(
        `/vi/${t.bonestructure.module}/list?${u}limit=99`
      ).then(async (g) => {
        var c;
        const f = await g.json();
        r.skellistdata = {};
        for (let d of f.skellist)
          r.skellistdata[d.key] = d;
        return (c = f.skellist) == null ? void 0 : c.map((d) => ({ text: o(t.bonestructure.format, { dest: d }), value: d.key, data: d }));
      });
    }
    function l(i) {
      r.selection = { dest: r.skellistdata[i.target.value] }, n.emit("change", e.name, r.selection, e.lang, e.index);
    }
    function a(i) {
      r.selection = { ...r.selection, rel: i.value }, n.emit("change", i.name, r.selection, i.lang, i.index);
    }
    return j(() => {
      r.selection = e.value, s(), n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      formatString: o,
      changeEvent: l,
      changeEventNested: a,
      getList: s
    };
  }
}), Sl = { class: "record" }, bl = { class: "single-entry" }, yl = ["disabled", "value"], $l = ["value"];
function Cl(e, n, t, o, r, s) {
  var a;
  const l = ue("Wrapper_nested");
  return p(), v("div", Sl, [
    m("div", bl, [
      m("sl-select", {
        disabled: e.boneState.readonly,
        value: (a = e.state.selection) == null ? void 0 : a.dest.key,
        hoist: "",
        "max-options-visible": "0",
        clearable: "",
        onSlChange: n[0] || (n[0] = (...i) => e.changeEvent && e.changeEvent(...i))
      }, [
        (p(!0), v(k, null, L(e.state.skellistdata, (i, u) => (p(), v("sl-option", {
          key: u,
          value: u
        }, M(e.formatString(e.state.format, i)), 9, $l))), 128))
      ], 40, yl)
    ]),
    e.bone.using ? (p(), x(l, {
      key: 0,
      value: e.value,
      name: e.name,
      index: e.index,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "bone", "disabled", "onChange"])) : C("", !0)
  ]);
}
const _t = /* @__PURE__ */ V(hl, [["render", Cl], ["__scopeId", "data-v-c902615f"]]), wl = B({
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
  setup(e, n) {
    const t = P("boneState"), o = E({
      counter: 0,
      debounce: null
    }), r = P("addMultipleEntry"), s = P("removeMultipleEntries");
    function l() {
      o.counter += 1;
      let i = 200;
      o.counter > 1 && (i = 500), o.debounce && clearTimeout(o.debounce), o.debounce = setTimeout(() => {
        for (let u = o.counter; u--; )
          r(e.lang);
        o.counter = 0;
      }, i);
    }
    function a() {
      let i = 200;
      o.debounce && clearTimeout(o.debounce), o.debounce = setTimeout(() => {
        s(e.lang);
      }, i);
    }
    return j(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: o,
      boneState: t,
      handleAdd: l,
      handleRemove: a,
      removeMultipleEntries: s
    };
  }
}), Rl = { class: "actionbar" }, kl = ["title"], _l = ["title"];
function Il(e, n, t, o, r, s) {
  return p(), v("div", Rl, [
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.delAll"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (l) => e.handleRemove(e.lang))
    }, M(e.$t("bone.delAll")), 9, kl)) : C("", !0),
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (l) => e.handleAdd(e.lang))
    }, [
      n[2] || (n[2] = m("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)),
      O(" " + M(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (p(), v(k, { key: 0 }, [
        O("(" + M(e.state.counter) + ")", 1)
      ], 64)) : C("", !0)
    ], 8, _l)) : C("", !0)
  ]);
}
const El = /* @__PURE__ */ V(wl, [["render", Il], ["__scopeId", "data-v-1b795e43"]]), Vl = B({
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
  setup(e, n) {
    const t = P("boneState"), o = P("addMultipleEntry"), r = P("formatString"), s = null, l = E({
      skels: {},
      hasUsing: A(() => t == null ? void 0 : t.bonestructure.using)
    });
    function a(i) {
      let u = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? u = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (u = "skelType=node&"), F.get(
        `/vi/${t.bonestructure.module}/list?${u}limit=99`
      ).then(async (g) => {
        var c;
        const f = await g.json();
        return l.skels = f.skellist.reduce((d, h) => (d[h.key] = h, d), {}), (c = f.skellist) == null ? void 0 : c.map((d) => ({ text: r(t.bonestructure.format, { dest: d }), value: d.key, data: d }));
      });
    }
    return j(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: l,
      boneState: t,
      addMultipleEntry: o,
      removeMultipleEntries: s,
      getList: a
    };
  }
}), Al = { class: "actionbar" }, Fl = ["title"], Pl = ["source"], Ml = ["title"];
function Ol(e, n, t, o, r, s) {
  return p(), v("div", Al, [
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (l) => e.openSelector())
    }, n[3] || (n[3] = [
      m("sl-icon", {
        slot: "prefix",
        name: "x-lg"
      }, null, -1)
    ]), 8, Fl)) : C("", !0),
    m("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: n[1] || (n[1] = (l) => {
        var a;
        return e.addMultipleEntry(e.lang, {
          dest: (a = e.state.skels) == null ? void 0 : a[l.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, Pl),
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (l) => e.addMultipleEntry(e.lang))
    }, [
      n[4] || (n[4] = m("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)),
      O(" " + M(e.$t("bone.list")), 1)
    ], 8, Ml)) : C("", !0)
  ]);
}
const Dl = /* @__PURE__ */ V(Vl, [["render", Ol], ["__scopeId", "data-v-eeea51c6"]]), Ll = B({
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
  setup(e, n) {
    const t = P("boneState"), o = P("addMultipleEntry");
    P("formatString");
    const r = null, s = G(), l = E({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: A(() => t == null ? void 0 : t.bonestructure.using)
    });
    function a(g) {
      const f = {
        fileName: g.name,
        mimeType: g.type || "application/octet-stream",
        size: g.size.toString()
      };
      return new Promise((c, d) => {
        F.securePost("/vi/file/getUploadURL", { dataObj: f }).then(async (h) => {
          let S = await h.json();
          fetch(S.values.uploadUrl, {
            body: g,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: S.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            F.securePost("/vi/file/add", { dataObj: y }).then(async ($) => {
              let _ = await $.json();
              _.action === "addSuccess" ? c(_.values) : d(_);
            }).catch(($) => {
              d($);
            });
          }).catch((b) => {
            d(b);
          });
        }).catch((h) => {
          d(h);
        });
      });
    }
    async function i(g) {
      l.loading = !0;
      for (let f of g.target.files) {
        let c = await a(f);
        s.value.value = null;
        let d = null;
        l.hasUsing && (d = void 0), o(e.lang, { dest: c, rel: d });
      }
      l.loading = !1;
    }
    async function u(g) {
      l.loading = !0, l.droparea = !1;
      for (let f of g.dataTransfer.files) {
        let c = await a(f);
        s.value.value = null;
        let d = null;
        l.hasUsing && (d = void 0), o(e.lang, { dest: c, rel: d });
      }
      l.loading = !1;
    }
    return j(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: l,
      boneState: t,
      addMultipleEntry: o,
      removeMultipleEntries: r,
      uploadFile: a,
      uploadinput: s,
      handleUpload: i,
      handleDrop: u
    };
  }
}), Bl = ["title"], jl = {
  key: 1,
  class: "droparea"
}, Nl = ["multiple"], xl = ["title"], zl = ["title"], Tl = {
  key: 0,
  slot: "suffix"
};
function Hl(e, n, t, o, r, s) {
  return p(), v("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = Ce((l) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (l) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = Ce((...l) => e.handleDrop && e.handleDrop(...l), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (l) => e.openSelector())
    }, n[7] || (n[7] = [
      m("sl-icon", {
        slot: "prefix",
        name: "x-lg"
      }, null, -1)
    ]), 8, Bl)) : C("", !0),
    e.state.droparea ? (p(), v("div", jl, " Dateien hier hinziehen ")) : C("", !0),
    m("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...l) => e.handleUpload && e.handleUpload(...l))
    }, null, 40, Nl),
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (l) => e.addMultipleEntry(e.lang))
    }, n[8] || (n[8] = [
      m("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)
    ]), 8, xl)) : C("", !0),
    e.boneState.multiple && !e.readonly ? (p(), v("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (l) => e.uploadinput.click())
    }, [
      n[9] || (n[9] = m("sl-icon", { name: "upload" }, null, -1)),
      O(" " + M(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (p(), v("sl-spinner", Tl)) : C("", !0)
    ], 8, zl)) : C("", !0)
  ], 32);
}
const Gl = /* @__PURE__ */ V(Ll, [["render", Hl], ["__scopeId", "data-v-9bac9f8a"]]), Ul = Ge("boneStore", () => {
  const e = E({
    additionalBones: W({}),
    defaultBones: W({
      rawBone: it,
      keyBone: at,
      stringBone: dt,
      emailBone: ct,
      dateBone: gt,
      booleanBone: mt,
      selectBone: ft,
      passwordBone: pt,
      recordBone: vt,
      numericBone: St,
      colorBone: ht,
      relationalBone: bt,
      jsonBone: Ms,
      fileBone: yt,
      textBone: $t,
      spatialBone: Ct,
      booleanBoneSelect: wt,
      booleanBoneChoose: Rt,
      selectBoneChoose: kt,
      relationalBoneSelect: _t
    }),
    actionbars: W({
      "relational.tree.leaf.file.file": Gl,
      "relational.": Dl
    }),
    multibones: W(["select", "select."])
  });
  function n(l, a) {
    e.additionalBones[l] = a;
  }
  function t() {
    let l = e.defaultBones;
    for (const [a, i] of Object.entries(e.additionalBones))
      l.add(i);
    return l;
  }
  function o(l) {
    if (Object.keys(e.additionalBones).includes(l))
      return e.additionalBones[l];
    {
      let a = l.split("."), i = Object.entries(e.additionalBones).filter(
        (u) => u[0].startsWith(a[0] + ".")
      );
      if (i.length > 0) {
        i.sort((u, g) => g.length - u.length);
        for (let u of i)
          if (l.startsWith(u[0]))
            return e.additionalBones[u[0]];
      }
    }
    return l === "date" ? gt : l === "key" ? at : l === "str.email" ? ct : l === "str" || l.startsWith("str.") ? dt : l === "select.choose" ? kt : l === "select" || l.startsWith("select.") ? ft : l === "bool.choose" ? Rt : l === "bool.select" ? wt : l === "bool" || l.startsWith("bool.") ? mt : l === "password" ? pt : l === "record" ? vt : l === "numeric" || l.startsWith("numeric.") ? St : l === "relational.tree.leaf.file.file" ? yt : l === "relational.select" || l.startsWith("relational.select.") ? _t : l === "relational" || l.startsWith("relational.") ? bt : l === "color" ? ht : l === "text" ? $t : l === "spatial" ? Ct : it;
  }
  function r(l, a) {
    e.actionbars[l] = a;
  }
  function s(l) {
    if (Object.keys(e.actionbars).includes(l))
      return e.actionbars[l];
    {
      let a = l.split("."), i = Object.entries(e.actionbars).filter(
        (u) => u[0].startsWith(a[0] + ".")
      );
      if (i.length > 0) {
        i.sort((u, g) => g.length - u.length);
        for (let u of i)
          if (l.startsWith(u[0]))
            return e.actionbars[u[0]];
      }
    }
    return El;
  }
  return {
    state: e,
    addBoneWidget: n,
    getBoneWidget: o,
    importWidgets: t,
    addBoneActionbar: r,
    getBoneActionbar: s
  };
});
function se(e) {
  return Ul().getBoneWidget(e);
}
const ql = { class: "viur-shop-form-wrap" }, Wl = { class: "viur-shop-form-wrap" }, Kl = { key: 0 }, Xl = { class: "viur-shop-form-wrap" }, Zl = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = le(), t = E({
      formValues: {},
      requiredFieldsFilled: A(() => {
        if (t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("billing.city") && Object.keys(t.formValues).includes("billing.street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
        if (!t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      addSkel: null,
      errors: {}
    });
    function o(l) {
      t.isCustomAdress = !l.target.checked;
    }
    function r(l, a) {
      for (const [i, u] of Object.entries(a.value[0]))
        t.formValues[i] = u;
    }
    function s(l) {
      let a = {};
      return Array.isArray(l) ? (l.forEach((i) => {
        let u = i[0], g = i[1];
        a[u] = g;
      }), console.log("output", a), a) : l;
    }
    return ae(t.formValues, (l) => {
      Object.entries(l).forEach(([a, i]) => {
        i === "" && delete t.formValues[a];
      });
    }), Y(async () => {
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = s(n.state.structure.address), t.formValues = n.state.shippingAddress;
    }), (l, a) => {
      const i = ue("bone");
      return p(), v(k, null, [
        m("div", null, [
          a[0] || (a[0] = m("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)),
          m("div", ql, [
            (p(!0), v(k, null, L(t.addSkel, (u, g) => (p(), v(k, { key: g }, [
              u.visible && u.params.group === "Customer Info" ? (p(), v("div", {
                key: 0,
                class: X("viur-shop-form-bone-" + g)
              }, [
                u.visible && u.params.group === "Customer Info" ? (p(), x(i, {
                  key: 0,
                  is: D(se)(u.type),
                  name: g,
                  structure: s(t.addSkel),
                  errors: t.errors[g] ? t.errors[g] : [],
                  skel: t.formValues,
                  onChange: (f) => r(g, f),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : C("", !0)
              ], 2)) : C("", !0)
            ], 64))), 128))
          ])
        ]),
        m("div", null, [
          a[1] || (a[1] = m("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)),
          m("div", Wl, [
            (p(!0), v(k, null, L(t.addSkel, (u, g) => (p(), v(k, { key: g }, [
              u.visible && u.params.group === "Customer Address" ? (p(), v("div", {
                key: 0,
                class: X("viur-shop-form-bone-" + g)
              }, [
                u.visible && u.params.group === "Customer Address" ? (p(), x(i, {
                  key: 0,
                  is: D(se)(u.type),
                  name: g,
                  structure: s(t.addSkel),
                  errors: t.errors[g] ? t.errors[g] : [],
                  skel: t.formValues,
                  onChange: (f) => r(g, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : C("", !0)
              ], 2)) : C("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (p(), v("div", Kl, [
          a[2] || (a[2] = m("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)),
          m("div", Xl, [
            (p(!0), v(k, null, L(t.addSkel, (u, g) => (p(), v(k, { key: g }, [
              u.visible && u.params.group === "Customer Address" ? (p(), v("div", {
                key: 0,
                class: X("viur-shop-form-bone-" + g)
              }, [
                u.visible && u.params.group === "Customer Address" ? (p(), x(i, {
                  key: 0,
                  is: D(se)(u.type),
                  name: g,
                  structure: s(t.addSkel),
                  errors: t.errors[g] ? t.errors[g] : [],
                  skel: t.formValues,
                  onChange: (f) => r(g, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : C("", !0)
              ], 2)) : C("", !0)
            ], 64))), 128))
          ])
        ])) : C("", !0),
        m("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Jl = /* @__PURE__ */ V(Zl, [["__scopeId", "data-v-4d14c6fe"]]), Yl = { class: "viur-shop-form-wrap" }, Ql = ["onSlChange", "onSlClear", "label"], ei = ["value"], ti = { key: 0 }, ni = { class: "viur-shop-form-wrap" }, oi = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = le(), t = E({
      formValues: {},
      requiredFieldsFilled: A(() => {
        if (t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("billing.city") && Object.keys(t.formValues).includes("billing.street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
        if (!t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      shippingAdressAmount: 1,
      maxShippingAdress: A(
        () => Object.keys(n.state.carts).length + 2
      ),
      amountAlert: { title: "", msg: "" },
      items: null,
      addSkel: null,
      errors: {},
      selectedItem: {},
      isInit: A(() => !!n.state.carts[n.state.basket])
    }), o = G(null), r = G(null);
    function s(c) {
      c.target.checked && (t.isCustomAdress = !1), c.target.checked || (t.isCustomAdress = !0);
    }
    function l() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie können nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, r.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function a(c, d) {
      for (const [h, S] of Object.entries(d.value[0]))
        t.formValues[h] = S;
    }
    function i() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", r.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function u(c, d) {
      if (console.log(c.target.value), !c.target.value.length) {
        g();
        return;
      }
      t.selectedItem[d] = c.target.value, t.isItemSelected = !0;
    }
    function g(c, d) {
      console.log("clearing..."), delete t.selectedItem[d], t.isItemSelected = !1;
    }
    function f(c) {
      let d = {};
      return Array.isArray(c) ? (c.forEach((h) => {
        let S = h[0], b = h[1];
        d[S] = b;
      }), d) : c;
    }
    return ae(t.formValues, (c) => {
      Object.entries(c).forEach(([d, h]) => {
        h === "" && delete t.formValues[d];
      });
    }), Y(async () => {
      await n.getAddressStructure(), t.addSkel = f(n.state.structure.address);
    }), (c, d) => {
      const h = ue("bone");
      return p(), v(k, null, [
        m("div", null, [
          d[0] || (d[0] = m("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)),
          m("div", Yl, [
            (p(!0), v(k, null, L(t.addSkel, (S, b) => (p(), v(k, { key: b }, [
              S.visible && S.params.group === "Customer Info" ? (p(), v("div", {
                key: 0,
                class: X("viur-shop-form-bone-" + b)
              }, [
                S.visible && S.params.group === "Customer Info" ? (p(), x(h, {
                  key: 0,
                  is: D(se)(S.type),
                  name: b,
                  structure: f(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => a(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : C("", !0)
              ], 2)) : C("", !0)
            ], 64))), 128))
          ])
        ]),
        d[6] || (d[6] = m("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)),
        (p(!0), v(k, null, L(t.shippingAdressAmount, (S) => (p(), v("div", {
          class: "viur-shop-form-wrap",
          key: S
        }, [
          m("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: o,
            onSlChange: (b) => u(b, S),
            onSlClear: (b) => g(b, S),
            label: t.selectedItem[S] ? D(n).state.carts[t.selectedItem[S]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (p(!0), v(k, null, L(D(n).state.carts, (b, y) => (p(), v("sl-option", { value: y }, M(b.info.name), 9, ei))), 256))
          ], 40, Ql),
          (p(!0), v(k, null, L(t.addSkel, (b, y) => (p(), v(k, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (p(), v("div", {
              key: 0,
              class: X("viur-shop-form-bone-" + y)
            }, [
              b.visible && b.params.group === "Customer Address" ? (p(), x(h, {
                key: 0,
                is: D(se)(b.type),
                name: y,
                structure: f(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: ($) => a(y, $)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : C("", !0)
            ], 2)) : C("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (p(), v("div", ti, [
          d[1] || (d[1] = m("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)),
          m("div", ni, [
            (p(!0), v(k, null, L(t.addSkel, (S, b) => (p(), v(k, { key: b }, [
              S.visible && S.params.group === "Customer Address" ? (p(), v("div", {
                key: 0,
                class: X("viur-shop-form-bone-" + b)
              }, [
                S.visible && S.params.group === "Customer Address" ? (p(), x(h, {
                  key: 0,
                  is: D(se)(S.type),
                  name: b,
                  structure: f(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => a(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : C("", !0)
              ], 2)) : C("", !0)
            ], 64))), 128))
          ])
        ])) : C("", !0),
        m("div", { class: "viur-shop-form-btn-wrap" }, [
          m("sl-button", {
            size: "medium",
            onClick: i,
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
            onClick: l
          }, d[3] || (d[3] = [
            m("sl-icon", {
              name: "plus-lg",
              slot: "prefix"
            }, null, -1),
            O(" Lieferadresse hinzufügen ")
          ]))
        ]),
        m("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: r,
          closable: ""
        }, [
          d[4] || (d[4] = m("sl-icon", {
            slot: "icon",
            name: "exclamation-triangle"
          }, null, -1)),
          m("strong", null, M(t.amountAlert.title), 1),
          d[5] || (d[5] = m("br", null, null, -1)),
          O(" " + M(t.amountAlert.msg), 1)
        ], 512),
        m("sl-checkbox", {
          onSlChange: s,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ri = /* @__PURE__ */ V(oi, [["__scopeId", "data-v-c4232b7a"]]), si = {
  __name: "ExampleUsage",
  setup(e) {
    const n = le(), t = A(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), o = E({
      rootNode: {},
      tabs: {
        cart: {
          component: W(Be),
          props: {
            sidebar: !0,
            mode: "basket",
            cartKey: t,
            placeholder: "/static/partnerbereich/img/placeholder.svg"
          },
          // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
          displayName: "Warenkorb",
          // icon: { name: "bag" },
          position: 2,
          disabled: !1
        },
        confirm: {
          component: W(Bt),
          props: {},
          displayName: "Bestellung prüfen",
          // icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1
        },
        orderComplete: {
          component: W($r),
          props: {
            redirectUrl: "http://localhost:8081",
            additionalComponents: [
              {
                component: W(Be),
                props: {
                  sidebar: !0,
                  mode: "basket",
                  cartKey: t
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
          component: W(Jl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1
        },
        userInfoMulti: {
          component: W(ri),
          props: {},
          displayName: "Daten Eingeben (Multi)",
          icon: { name: "card-list" },
          position: 4,
          disabled: !1
        }
      }
    });
    function r(s) {
      (s == null ? void 0 : s.detail.name) === "confirm" && (o.tabs.orderComplete.disabled = !1);
    }
    return Y(async () => {
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (s, l) => (p(), x(zn, {
      tabs: o.tabs,
      onTabChange: r,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: si
}, Symbol.toStringTag, { value: "Module" })), ii = xt(), vi = {
  install(e) {
    e.use(ii);
  }
};
export {
  Be as C,
  $r as O,
  zn as S,
  Jl as U,
  vi as V,
  V as _,
  si as a,
  Bt as b,
  pi as c,
  ri as d,
  le as u
};
