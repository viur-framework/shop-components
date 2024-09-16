var pt = Object.defineProperty;
var Fe = (e) => {
  throw TypeError(e);
};
var bt = (e, t, n) => t in e ? pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ye = (e, t, n) => bt(e, typeof t != "symbol" ? t + "" : t, n), Ee = (e, t, n) => t.has(e) || Fe("Cannot " + n);
var k = (e, t, n) => (Ee(e, t, "read from private field"), n ? n.call(e) : t.get(e)), te = (e, t, n) => t.has(e) ? Fe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), re = (e, t, n, i) => (Ee(e, t, "write to private field"), i ? i.call(e, n) : t.set(e, n), n), Y = (e, t, n) => (Ee(e, t, "access private method"), n);
import { defineStore as xe, createPinia as vt } from "pinia";
import { reactive as E, defineComponent as P, openBlock as m, createElementBlock as p, toDisplayString as j, createElementVNode as u, createCommentVNode as w, createTextVNode as R, createBlock as V, resolveDynamicComponent as Te, mergeProps as ct, Fragment as C, withDirectives as ne, vShow as Ue, ref as W, unref as L, onBeforeMount as Q, createVNode as he, computed as O, normalizeClass as J, renderSlot as ae, renderList as D, useCssVars as yt, Transition as $t, withCtx as De, vModelText as ge, Teleport as St, inject as N, onMounted as U, readonly as wt, getCurrentScope as kt, onScopeDispose as _t, watchEffect as _e, watch as be, provide as Ie, resolveComponent as ue, getCurrentInstance as Ct, withModifiers as we, shallowRef as Z } from "vue";
import { Request as Et } from "@viur/vue-utils";
import { ViURShopClient as It } from "@viur/viur-shop-client";
import { useRoute as At, createRouter as Ot, createWebHashHistory as jt } from "vue-router";
import qe from "@viur/ckeditor5-build-classic";
const se = xe("cartstore", () => {
  const e = new It({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), t = E({
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
    await a();
  }
  async function i(c) {
    return await e.cart_list({ cart_key: c });
  }
  async function a() {
    (await e.cart_list()).forEach((v) => {
      v.is_root_node && (v.cart_type === "basket" ? t.basketRootNode = v : t.whishlistRootNodes.push(v));
    });
  }
  async function l(c, v) {
    let y = await e.article_add({
      article_key: c,
      parent_cart_key: v
    });
    console.log("addToCart", y);
  }
  async function s(c, v) {
    let y = await e.article_view({
      article_key: c,
      parent_cart_key: v
    });
    console.log("getArticleView", y);
  }
  async function r(c, v) {
    let y = await e.article_remove({
      article_key: c,
      parent_cart_key: v
    });
    console.log("remove Resp", y);
  }
  async function o(c, v, y) {
    let b = await e.article_update({
      article_key: c,
      parent_cart_key: v,
      quantity: y,
      quantity_mode: "replace"
    });
    console.log("update Resp", b);
  }
  async function d() {
    const c = await e.address_structure();
    t.structure.address = c.addSkel;
  }
  async function f() {
    const c = await e.address_list();
    for (const v of c)
      v.address_type === "billing" && (t.billingAddress = v), v.address_type === "shipping" && (t.shippingAddress = v);
  }
  async function h(c) {
    await e.discount_add({ code: c });
  }
  async function g() {
    const c = await e.payment_providers_list();
    t.paymentProviders = c, t.selectedPaymentProvider = c[Object.keys(c)[0]];
  }
  return {
    state: t,
    addToCart: l,
    getArticleView: s,
    removeItem: r,
    updateItem: o,
    init: n,
    getAddressStructure: d,
    getChildren: i,
    addDiscount: h,
    payment_providers_list: g,
    getAddress: f
  };
}), I = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, a] of t)
    n[i] = a;
  return n;
}, Bt = P({
  props: {},
  components: {},
  setup(e, t) {
    const n = At();
    return { state: E({}), route: n };
  }
}), Nt = { class: "home" };
function Rt(e, t, n, i, a, l) {
  return m(), p("div", Nt, "View " + j(e.route.path) + " is missing.", 1);
}
const xt = /* @__PURE__ */ I(Bt, [["render", Rt]]), Tt = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: xt
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-DuJaLChf.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-Ctgpbya4.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Fn)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => Fa)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Gn)
  }
];
function Ya(e, t = !1) {
  let n = [];
  return t ? n = e : n = e.concat(Tt), Ot({
    // @ts-ignore
    history: jt("/"),
    routes: n
  });
}
const Ut = ["panel", "disabled"], Dt = { class: "viur-shop-order-step" }, Pt = ["name", "library"], Vt = { class: "viur-shop-order-status-text" }, Lt = { class: "viur-shop-order-status-span" }, Ft = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, qt = {
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
      var i;
      return m(), p("sl-tab", {
        class: "viur-shop-order-tab",
        slot: "nav",
        panel: e.tab,
        disabled: e.tabs[e.tab].disabled
      }, [
        u("div", Dt, [
          (i = e.tabs[e.tab].icon) != null && i.name ? (m(), p("sl-icon", {
            key: 0,
            class: "viur-shop-order-step-icon",
            name: e.tabs[e.tab].icon.name,
            library: e.tabs[e.tab].icon.library
          }, null, 8, Pt)) : w("", !0),
          u("div", Vt, [
            R(j(e.tabIdx + 1) + ". ", 1),
            u("span", Lt, j(e.tabs[e.tab].displayName), 1)
          ])
        ]),
        e.tabIdx < e.stepperLength - 1 ? (m(), p("sl-icon", Ft)) : w("", !0)
      ], 8, Ut);
    };
  }
}, zt = /* @__PURE__ */ I(qt, [["__scopeId", "data-v-e6e66706"]]), Mt = ["name"], Wt = {
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
    function i() {
      n("goToStart");
    }
    return (a, l) => (m(), p("sl-tab-panel", {
      class: "viur-shop-order-tab-panel",
      name: e.tab
    }, [
      (m(), V(Te(e.tabs[e.tab].component), ct(e.tabs[e.tab].props ? e.tabs[e.tab].props : "", {
        onGoToStart: l[0] || (l[0] = (s) => i())
      }), null, 16))
    ], 8, Mt));
  }
}, Kt = /* @__PURE__ */ I(Wt, [["__scopeId", "data-v-f815b85b"]]), Ht = {
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
    function i() {
      n("prevTab");
    }
    function a() {
      n("nextTab");
    }
    return (l, s) => (m(), p(C, null, [
      ne(u("sl-button", {
        type: "submit",
        onClick: s[0] || (s[0] = (r) => i())
      }, " Zurück ", 512), [
        [Ue, e.index !== 0]
      ]),
      u("sl-button", {
        type: "submit",
        variant: "primary",
        onClick: s[1] || (s[1] = (r) => a())
      }, " Weiter ")
    ], 64));
  }
}, Gt = /* @__PURE__ */ I(Ht, [["__scopeId", "data-v-90b8c464"]]), Zt = { class: "viur-shop-discount" }, Jt = { class: "viur-shop-discount-alert" }, Qt = { key: 0 }, Xt = { key: 0 }, Yt = { key: 1 }, en = {
  __name: "Discount",
  setup(e) {
    const t = se(), n = W(null), i = W(null), a = E({
      errorMessage: ""
    });
    async function l() {
      i.value.hide();
      const s = n.value.value;
      if (!s) {
        i.value.show(), a.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      let r = await t.addDiscount(s);
      console.log("resp", r);
    }
    return (s, r) => (m(), p(C, null, [
      u("div", Zt, [
        u("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: n,
          class: "viur-shop-discount-input"
        }, null, 512),
        u("sl-button", {
          onClick: l,
          class: "viur-shop-discount-submit-btn"
        }, "Einlösen")
      ]),
      u("div", Jt, [
        u("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: i,
          closable: "",
          duration: "2000"
        }, [
          r[0] || (r[0] = u("sl-icon", {
            slot: "icon",
            name: "info-circle"
          }, null, -1)),
          R(" " + j(a.errorMessage), 1)
        ], 512)
      ]),
      u("div", null, [
        L(t).state.basketRootNode.discount ? (m(), p("div", Qt, [
          L(t).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), p("span", Xt, " Sie haben einen Rabattcode im Wert von " + j(L(t).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : w("", !0),
          L(t).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), p("span", Yt, " Sie haben einen Rabattcode im Wert von " + j(L(t).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : w("", !0)
        ])) : w("", !0)
      ])
    ], 64));
  }
}, tn = { key: 0 }, nn = { key: 1 }, sn = { class: "viur-shop-cart-sidebar-info-line" }, an = ["value"], ln = { class: "viur-shop-cart-sidebar-info-line" }, rn = ["value"], on = { class: "viur-shop-cart-sidebar-info-line" }, un = ["value"], dn = { class: "viur-shop-cart-sidebar-info-line total" }, cn = ["value"], mn = { class: "viur-shop-cart-sidebar-btn-wrap" }, fn = { class: "viur-shop-discount-wrap" }, hn = {
  __name: "ShopSummary",
  setup(e) {
    const t = se(), n = E({ basketRootNode: {}, loading: !0 });
    return Q(async () => {
      await t.init(), n.basketRootNode = t.state.basketRootNode, n.loading = !1;
    }), (i, a) => {
      var l, s, r;
      return n.loading ? (m(), p("sl-spinner", tn)) : (m(), p("div", nn, [
        a[7] || (a[7] = u("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1)),
        a[8] || (a[8] = u("br", null, null, -1)),
        u("div", sn, [
          a[0] || (a[0] = u("span", null, "Zwischensumme", -1)),
          u("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: n.basketRootNode.total
          }, null, 8, an),
          a[1] || (a[1] = u("br", null, null, -1))
        ]),
        u("div", ln, [
          a[2] || (a[2] = u("span", null, "Rabatt", -1)),
          u("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: (l = n.basketRootNode) != null && l.discount ? n.basketRootNode.discount : 0
          }, null, 8, rn)
        ]),
        u("div", on, [
          a[3] || (a[3] = u("span", null, "Versandkosten", -1)),
          u("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: (s = n.basketRootNode) != null && s.shipping ? n.basketRootNode.shipping : 0
          }, null, 8, un)
        ]),
        u("div", dn, [
          a[4] || (a[4] = u("span", null, "Gesamt:", -1)),
          u("sl-format-number", {
            lang: "de",
            type: "currency",
            currency: "EUR",
            value: n.basketRootNode.total + ((r = n.basketRootNode) == null ? void 0 : r.shipping) - n.basketRootNode.discount
          }, null, 8, cn)
        ]),
        u("div", mn, [
          u("div", fn, [
            he(en)
          ]),
          a[5] || (a[5] = u("sl-button", {
            variant: "primary",
            size: "medium"
          }, " Jetzt Bestellen ", -1)),
          a[6] || (a[6] = u("sl-button", {
            size: "medium",
            variant: "info"
          }, [
            u("sl-icon", {
              name: "paypal",
              slot: "prefix"
            }),
            R(" Paypal ")
          ], -1))
        ])
      ]));
    };
  }
}, gn = { class: "bind viur-shop-wrap" }, pn = {
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
    const n = e, i = t, a = E({
      tabNames: O(() => s(n.tabs)),
      tabIdx: 0,
      currentTab: ""
    }), l = W(null);
    function s(h) {
      let g = [], c = [];
      for (const v in h)
        h[v].position ? g.push([v, h[v].position]) : g.push([v, 0]);
      return g.sort((v, y) => v[1] - y[1]), g.forEach((v) => {
        c.push(v[0]);
      }), c;
    }
    function r(h) {
      a.currentTab = h == null ? void 0 : h.detail.name, a.tabIdx = a.tabNames.indexOf(a.currentTab), i("tabChange", h);
    }
    function o() {
      a.tabIdx > 0 && l.value.show(a.tabNames[a.tabIdx - 1]);
    }
    function d() {
      a.tabIdx < a.tabNames.length - 1 && l.value.show(a.tabNames[a.tabIdx + 1]);
    }
    function f() {
      l.value.show(a.tabNames[0]);
    }
    return Q(() => {
      const h = s(n.tabs);
      a.currentTab = h[0];
    }), (h, g) => (m(), p("div", gn, [
      u("div", {
        class: J(["viur-shop-stepper-wrap", { "full-width": e.sidebarBottom }])
      }, [
        ae(h.$slots, "main", {}, () => [
          u("sl-tab-group", {
            class: "viur-shop-order-tabgroup",
            noScrollControls: "",
            onSlTabShow: g[1] || (g[1] = (c) => r(c)),
            ref_key: "tabGroup",
            ref: l
          }, [
            (m(!0), p(C, null, D(a.tabNames, (c, v) => (m(), V(zt, {
              key: c,
              tab: c,
              tabs: e.tabs,
              tabIdx: v,
              stepperLength: a.tabNames.length
            }, null, 8, ["tab", "tabs", "tabIdx", "stepperLength"]))), 128)),
            (m(!0), p(C, null, D(a.tabNames, (c) => (m(), V(Kt, {
              tab: c,
              tabs: e.tabs,
              key: c,
              onGoToStart: g[0] || (g[0] = (v) => f())
            }, null, 8, ["tab", "tabs"]))), 128))
          ], 544)
        ], !0),
        e.trigger ? ae(h.$slots, "trigger", { key: 0 }, () => [
          a.tabIdx !== a.tabNames.length - 1 ? (m(), p("div", {
            key: 0,
            class: J(["viur-shop-form-footer", { "flex-end": a.tabIdx === 0, "last-row": e.sidebarBottom }])
          }, [
            he(Gt, {
              index: a.tabIdx,
              onPrevTab: o,
              onNextTab: d
            }, null, 8, ["index"])
          ], 2)) : w("", !0)
        ], !0) : w("", !0)
      ], 2),
      e.sidebar && a.tabIdx < a.tabNames.length - 1 ? ae(h.$slots, "sidebar", { key: 0 }, () => [
        u("div", {
          class: J(["viur-shop-sidebar-wrap", { bottom: e.sidebarBottom }])
        }, [
          he(hn)
        ], 2)
      ], !0) : w("", !0)
    ]));
  }
}, bn = /* @__PURE__ */ I(pn, [["__scopeId", "data-v-1c7a5ff9"]]), Pe = {
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
    const n = E({
      trackWidth: O(() => `${e.size / 30}rem`),
      outerSize: O(() => `calc(${e.size}rem + ${n.trackWidth})`),
      spinnerSize: O(() => `${e.size}rem`),
      logoSize: O(() => `calc(${e.size}rem - ${n.trackWidth} * 10)`),
      shadow: O(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: n };
  }
}, ze = () => {
  yt((e) => ({
    f436c526: e.state.outerSize,
    "0680b722": e.state.shadow,
    "7156dfdb": e.state.logoSize,
    "7e48406a": e.state.spinnerSize,
    "562aef5e": e.color,
    "14144f0a": e.state.trackWidth
  }));
}, Me = Pe.setup;
Pe.setup = Me ? (e, t) => (ze(), Me(e, t)) : ze;
const vn = {
  key: 0,
  class: "loading"
}, yn = { class: "logo" }, $n = ["src"];
function Sn(e, t, n, i, a, l) {
  return m(), V($t, null, {
    default: De(() => [
      n.active ? (m(), p("div", vn, [
        t[0] || (t[0] = u("sl-spinner", { class: "loader" }, null, -1)),
        u("div", yn, [
          u("sl-icon", {
            src: n.logo,
            class: "logo-color"
          }, null, 8, $n)
        ])
      ])) : w("", !0)
    ]),
    _: 1
  });
}
const wn = /* @__PURE__ */ I(Pe, [["render", Sn], ["__scopeId", "data-v-f3ab632c"]]), kn = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return E({}), (t, n) => (m(), p("pre", null, j(e.node.name), 1));
  }
}, _n = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, Cn = ["src"], En = ["innerHTML"], In = { class: "viur-shop-cart-leaf-artno" }, An = ["innerHTML"], On = { class: "viur-shop-cart-leaf-quantity" }, jn = { class: "viur-shop-cart-leaf-unitprice" }, Bn = ["value"], Nn = { class: "viur-shop-cart-leaf-actions" }, Rn = { class: "viur-shop-cart-leaf-price" }, xn = ["value"], Tn = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 },
    placeholder: { type: String, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: t }) {
    const n = e, i = t, a = E({
      leaf: {}
    });
    function l(o) {
      return o !== void 0 ? Et.downloadUrlFor(o) : n.placeholder;
    }
    function s(o, d, f, h) {
      i("updateItem", {
        item: o,
        articleKey: d,
        node: f,
        quantity: h
      });
    }
    function r(o, d, f) {
      i("removeItem", { item: o, articleKey: d, node: f });
    }
    return Q(() => {
      a.leaf = n.leaf;
    }), (o, d) => (m(), p("sl-card", _n, [
      u("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: l(
          a.leaf.article.dest.shop_image ? a.leaf.article.dest.shop_image : void 0
        )
      }, null, 8, Cn),
      u("h4", {
        class: "viur-shop-cart-leaf-headline headline",
        innerHTML: a.leaf.article.dest.shop_name
      }, null, 8, En),
      u("h5", In, j(a.leaf.article.dest.shop_art_no_or_gtin), 1),
      u("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.article.dest.shop_description
      }, null, 8, An),
      u("div", On, [
        ne(u("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": d[0] || (d[0] = (f) => a.leaf.quantity = f),
          onInput: d[1] || (d[1] = (f) => s(
            a.leaf,
            a.leaf.article.dest.key,
            e.node,
            a.leaf.quantity
          ))
        }, null, 544), [
          [ge, a.leaf.quantity]
        ])
      ]),
      u("div", jn, [
        d[3] || (d[3] = u("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)),
        u("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail
        }, null, 8, Bn)
      ]),
      u("div", Nn, [
        d[5] || (d[5] = u("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-add-to-favourites-btn",
          variant: "primary",
          title: "Add to favourites"
        }, [
          u("sl-icon", {
            name: "heart",
            slot: "prefix"
          })
        ], -1)),
        u("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[2] || (d[2] = (f) => r(a.leaf, a.leaf.article.dest.key, e.node))
        }, d[4] || (d[4] = [
          u("sl-icon", {
            name: "trash",
            slot: "prefix"
          }, null, -1)
        ]))
      ]),
      u("div", Rn, [
        d[6] || (d[6] = u("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)),
        u("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.shop_price_retail * e.leaf.quantity
        }, null, 8, xn)
      ])
    ]));
  }
}, Un = /* @__PURE__ */ I(Tn, [["__scopeId", "data-v-a8bf8404"]]), Dn = { key: 0 }, Pn = {
  class: "footer-wrap",
  slot: "footer"
}, Vn = { class: "viur-shop-cart-node" }, Ln = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    placeholder: { type: String, required: !0 }
  },
  setup(e) {
    const t = e, n = se(), i = W(null), a = E({
      itemsIsInit: O(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    O(() => t.mode === "basket" ? n.state.basketRootNode.key : t.cartKey);
    async function l() {
      i.value.hide(), await n.updateItem(
        a.currentItem.article.dest.key,
        a.currentNode.key,
        0
      ), await d();
    }
    async function s(h) {
      console.log("updateItem :", h), h.quantity === 0 ? (i.value.show(), a.currentItem = h.item, a.currentNode = h.node) : (await n.updateItem(h.articleKey, h.node.key, h.quantity), await n.init());
    }
    function r(h) {
      console.log("removeItem :", h), i.value.show(), a.currentItem = h.item, a.currentNode = h.node;
    }
    async function o() {
      a.leaves[a.currentNode.key].forEach((h) => {
        h.key === a.currentItem.key && (h.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function d() {
      a.nodes = [], a.leaves = {}, await n.init(), await f();
    }
    async function f(h = t.cartKey) {
      console.log("debug getChildren parentKey from comp: ", h);
      const g = await n.getChildren(h);
      console.log("getChildren children: ", g), g.forEach(async (c) => {
        c.skel_type === "node" ? (a.nodes.push(c), await f(c.key)) : (Object.keys(a.leaves).includes(h) || (a.leaves[h] = []), a.leaves[h].push(c));
      });
    }
    return Q(async () => {
      await n.init(), await f(), t.mode === "basket" && a.nodes.push(n.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (h, g) => e.cartKey.length ? (m(), p(C, { key: 1 }, [
      u("sl-dialog", {
        ref_key: "confirm",
        ref: i,
        onSlHide: o
      }, [
        g[1] || (g[1] = u("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)),
        u("div", Pn, [
          u("sl-button", {
            variant: "danger",
            onClick: g[0] || (g[0] = (c) => i.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          u("sl-button", {
            variant: "success",
            onClick: l,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), p(C, null, D(a.nodes, (c) => (m(), p("div", Vn, [
        Object.keys(a.leaves).includes(c.key) ? (m(), p(C, { key: 0 }, [
          he(kn, { node: c }, null, 8, ["node"]),
          (m(!0), p(C, null, D(a.leaves[c.key], (v) => (m(), V(Un, {
            key: v.key,
            leaf: v,
            node: c,
            placeholder: e.placeholder,
            onRemoveItem: r,
            onUpdateItem: s
          }, null, 8, ["leaf", "node", "placeholder"]))), 128))
        ], 64)) : w("", !0)
      ]))), 256)),
      g[2] || (g[2] = u("div", { class: "viur-shop-cart-mobile-footer" }, [
        u("sl-button", {
          variant: "primary",
          size: "medium"
        }, " Jetzt Bestellen")
      ], -1))
    ], 64)) : (m(), p("sl-spinner", Dn));
  }
}, Be = /* @__PURE__ */ I(Ln, [["__scopeId", "data-v-915785ee"]]), Fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
}, Symbol.toStringTag, { value: "Module" })), qn = {
  key: 1,
  class: "list"
}, zn = { class: "viur-shop-cart-payment" }, Mn = { class: "viur-shop-cart-payment-method" }, Wn = { class: "viur-shop-cart-sidebar-btn-wrap" }, Kn = ["variant", "disabled"], Hn = {
  __name: "ConfirmView",
  setup(e) {
    const t = se(), n = E({
      cartIsInit: O(() => !0),
      itemsIsInit: O(() => {
        var a;
        return !!((a = t.state) != null && a.carts[t.state.basket].items);
      }),
      selectedPaymentProvider: O(() => {
        var a;
        return (a = t.state) == null ? void 0 : a.selectedPaymentProvider.title;
      }),
      images: {},
      showOrderButton: !1
    });
    console.log("se", n.selectedPaymentProvider);
    function i(a) {
      a.target.checked && (n.showOrderButton = !0), a.target.checked || (n.showOrderButton = !1);
    }
    return Q(async () => {
      await t.init();
    }), (a, l) => n.cartIsInit ? (m(), p("div", qn, [
      l[4] || (l[4] = u("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)),
      l[5] || (l[5] = u("div", { class: "viur-shop-cart-address-wrap" }, [
        u("div", { class: "viur-shop-cart-address" }, [
          u("div", { class: "viur-shop-cart-address-headline" }, [
            R(" Versandadresse "),
            u("sl-button", {
              outline: "",
              size: "small"
            }, [
              u("sl-icon", {
                name: "pencil",
                slot: "prefix"
              })
            ])
          ]),
          R(" Roland Brose"),
          u("br"),
          R(" Speicherstraße 33"),
          u("br"),
          R(" 44147 Dortmund, DE"),
          u("br"),
          u("br"),
          R(" rb@mausbrand.de"),
          u("br"),
          R(" 0231 21 34 68 90 ")
        ]),
        u("div", { class: "viur-shop-cart-address" }, [
          u("div", { class: "viur-shop-cart-address-headline" }, [
            R(" Rechnungsadresse "),
            u("sl-button", {
              outline: "",
              size: "small"
            }, [
              u("sl-icon", {
                name: "pencil",
                slot: "prefix"
              })
            ])
          ]),
          R(" Roland Brose"),
          u("br"),
          R(" Speicherstraße 33"),
          u("br"),
          R(" 44147 Dortmund, DE"),
          u("br"),
          u("br"),
          R(" rb@mausbrand.de"),
          u("br"),
          R(" 0231 21 34 68 90 ")
        ])
      ], -1)),
      u("div", zn, [
        u("div", Mn, [
          l[0] || (l[0] = u("span", null, "Zahlungsmethode:", -1)),
          R(" " + j(n.selectedPaymentProvider), 1)
        ]),
        l[1] || (l[1] = u("sl-button", {
          outline: "",
          size: "small"
        }, [
          u("sl-icon", {
            name: "pencil",
            slot: "prefix"
          })
        ], -1))
      ]),
      l[6] || (l[6] = u("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)),
      (m(), V(St, { to: "#order_sidebar" }, [
        l[2] || (l[2] = u("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)),
        l[3] || (l[3] = u("br", null, null, -1)),
        u("sl-checkbox", { onSlChange: i }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        u("div", Wn, [
          u("sl-button", {
            variant: n.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !n.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Kn)
        ])
      ]))
    ])) : (m(), V(wn, { key: 0 }));
  }
}, mt = /* @__PURE__ */ I(Hn, [["__scopeId", "data-v-b3e35258"]]), Gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), Zn = { class: "bind" }, Jn = {
  key: 0,
  class: "viur-shop-order-complete-slot"
}, Qn = { class: "btn-wrap" }, Xn = {
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
    const n = e, i = t;
    function a() {
      i("goToStart");
    }
    function l() {
      window.location.href = n.redirectUrl;
    }
    return (s, r) => (m(), p("div", Zn, [
      r[2] || (r[2] = u("h1", { class: "viur-shop-success-headline headline" }, " Vielen Dank für Ihre Bestellung ", -1)),
      r[3] || (r[3] = u("p", { class: "paragraph" }, [
        u("strong", null, "Ihre Bestellnummer:"),
        R(" 123345670")
      ], -1)),
      r[4] || (r[4] = u("p", { class: "paragraph" }, [
        R(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        u("br"),
        R(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. ")
      ], -1)),
      e.additionalComponents.length ? (m(), p("div", Jn, [
        (m(!0), p(C, null, D(e.additionalComponents, (o) => (m(), V(Te(o.component), ct({ ref_for: !0 }, o.props ? o.props : ""), null, 16))), 256))
      ])) : w("", !0),
      u("div", Qn, [
        u("sl-button", {
          size: "medium",
          onClick: r[0] || (r[0] = (o) => a())
        }, " Zur Startseite "),
        u("sl-button", {
          variant: "primary",
          onClick: r[1] || (r[1] = (o) => l()),
          size: "medium"
        }, " Weiter Einkaufen ")
      ])
    ]));
  }
}, Yn = /* @__PURE__ */ I(Xn, [["__scopeId", "data-v-1f7efc9d"]]), es = P({
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
    const n = N("boneState"), i = E({});
    function a(l) {
      t.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), ts = ["disabled", "value"], ns = ["disabled", "value"];
function ss(e, t, n, i, a, l) {
  var s, r;
  return e.boneState.bonestructure.type === "raw.json" ? (m(), p("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: t[0] || (t[0] = (...o) => e.changeEvent && e.changeEvent(...o))
  }, null, 40, ts)) : (m(), p("sl-textarea", {
    key: 1,
    disabled: (r = e.boneState) == null ? void 0 : r.readonly,
    value: e.value,
    onInput: t[1] || (t[1] = (...o) => e.changeEvent && e.changeEvent(...o))
  }, null, 40, ns));
}
const We = /* @__PURE__ */ I(es, [["render", ss], ["__scopeId", "data-v-1347257f"]]), is = P({
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
    const n = E({});
    function i(a) {
      t.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: n,
      changeEvent: i
    };
  }
}), as = ["value"];
function ls(e, t, n, i, a, l) {
  return m(), p("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, as);
}
const Ke = /* @__PURE__ */ I(is, [["render", ls], ["__scopeId", "data-v-eadb6225"]]);
function rs(e) {
  return kt() ? (_t(e), !0) : !1;
}
function Ne(e) {
  return typeof e == "function" ? e() : L(e);
}
const os = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const He = () => {
};
function us(e, t) {
  function n(...i) {
    return new Promise((a, l) => {
      Promise.resolve(e(() => t.apply(this, i), { fn: t, thisArg: this, args: i })).then(a).catch(l);
    });
  }
  return n;
}
function ds(e, t = {}) {
  let n, i, a = He;
  const l = (r) => {
    clearTimeout(r), a(), a = He;
  };
  return (r) => {
    const o = Ne(e), d = Ne(t.maxWait);
    return n && l(n), o <= 0 || d !== void 0 && d <= 0 ? (i && (l(i), i = null), Promise.resolve(r())) : new Promise((f, h) => {
      a = t.rejectOnCancel ? h : f, d && !i && (i = setTimeout(() => {
        n && l(n), i = null, f(r());
      }, d)), n = setTimeout(() => {
        i && l(i), i = null, f(r());
      }, o);
    });
  };
}
function cs(e, t = 200, n = {}) {
  return us(
    ds(t, n),
    e
  );
}
function Ce(e, t, n = {}) {
  const {
    immediate: i = !0
  } = n, a = W(!1);
  let l = null;
  function s() {
    l && (clearTimeout(l), l = null);
  }
  function r() {
    a.value = !1, s();
  }
  function o(...d) {
    s(), a.value = !0, l = setTimeout(() => {
      a.value = !1, l = null, e(...d);
    }, Ne(t));
  }
  return i && (a.value = !0, os && o()), rs(r), {
    isPending: wt(a),
    start: o,
    stop: r
  };
}
class ms {
  static objectEmpty(t) {
    return Object.keys(t).length === 0 && t.constructor === Object;
  }
  static getDescr(t, n) {
    try {
      return t.values.filter((i) => i[0] === n)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(t) {
    return t || (t = ""), String(t).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(t, n) {
    function i(s) {
      let r = [], o = [], d = /\$\((.*?)\)/g;
      for (; o; ) {
        if (o = d.exec(s), !o) {
          o = !1;
          continue;
        }
        r.push(o[1]);
      }
      return r;
    }
    let a = i(t), l = [];
    Array.isArray(n) || (n = [n]);
    for (let s of n) {
      let r = t;
      for (let o of a) {
        let d = o.split("."), f = s;
        for (let h of d)
          f && f !== "-" && h in f && f[h] ? f = f[h] : f = "-";
        f = this.unescape(f), r = r.replace("$(" + o + ")", f);
      }
      l.push(r);
    }
    return l.join(", ");
  }
}
const fs = P({
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
    const n = N("boneState"), i = E({
      value: O(() => e.value)
    }), a = W(null);
    function l(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return _e(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = Ce(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      Utils: ms,
      boneState: n,
      changeEvent: l,
      stringBone: a
    };
  }
}), hs = ["disabled", "value", "required"];
function gs(e, t, n, i, a, l) {
  return m(), p("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: t[1] || (t[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, hs);
}
const Ge = /* @__PURE__ */ I(fs, [["render", gs], ["__scopeId", "data-v-307247ea"]]), ps = P({
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
    const n = N("boneState"), i = E({}), a = W(null);
    function l(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return _e(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = Ce(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: l,
      emailBone: a
    };
  }
}), bs = ["disabled", "value"];
function vs(e, t, n, i, a, l) {
  return m(), p("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, bs);
}
const Ze = /* @__PURE__ */ I(ps, [["render", vs], ["__scopeId", "data-v-c934def3"]]), ys = P({
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
    const n = N("boneState"), i = E({
      value: O(() => {
        var s;
        let l = e.value;
        return n.bonestructure.time ? l = (s = e.value) == null ? void 0 : s.split("+")[0] : e.value && (l = new Date(e.value).toISOString().substr(0, 10)), l;
      }),
      typeString: O(() => {
        let l = "datetime-local";
        return n.bonestructure.time || (l = "date"), l;
      })
    });
    function a(l) {
      t.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), $s = ["disabled", "type", "value"];
function Ss(e, t, n, i, a, l) {
  return m(), p("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, $s);
}
const Je = /* @__PURE__ */ I(ys, [["render", Ss], ["__scopeId", "data-v-b1e3e36d"]]), ws = P({
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
    const n = N("boneState"), i = E({
      value: O(() => {
        let s = e.value;
        return Array.isArray(e.value) ? (n.bonestructure.values instanceof Array ? s = s.filter((r) => n.bonestructure.values.map((o) => o[0].toString()).includes(r)) : s = s.filter(
          (r) => Object.keys(n.bonestructure.values).map((o) => o.toString()).includes(r)
        ), s.map((r) => r.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function a() {
      if (Array.isArray(n.bonestructure.values))
        return n.bonestructure.values;
      {
        let s = [];
        for (const [r, o] of Object.entries(n.bonestructure.values))
          s.push([r, o]);
        return s;
      }
    }
    function l(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, i.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: l,
      convertObjToList: a
    };
  }
}), ks = ["disabled", "value", "multiple"], _s = ["value"];
function Cs(e, t, n, i, a, l) {
  return m(), p("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), p(C, null, D(e.convertObjToList(), (s) => (m(), p("sl-option", {
      key: s[0],
      value: s[0]
    }, j(s[1]), 9, _s))), 128))
  ], 40, ks);
}
const Qe = /* @__PURE__ */ I(ws, [["render", Cs], ["__scopeId", "data-v-b2853f5d"]]), Es = P({
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
    const n = N("boneState"), i = E({
      value: O(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function a(l) {
      t.emit("change", e.name, l.target.checked, e.lang, e.index);
    }
    return U(() => {
      let l = e.value;
      l || (l = !1), t.emit("change", e.name, l, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), Is = ["disabled", "checked"];
function As(e, t, n, i, a, l) {
  return m(), p("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Is);
}
const Xe = /* @__PURE__ */ I(Es, [["render", As], ["__scopeId", "data-v-43289693"]]), Os = P({
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
    const n = N("boneState"), i = E({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), a = W(null);
    function l(r) {
      i.value1 === i.value2 ? i.equal = !0 : i.equal = !1, s(i.value1), i.requiredPasswordInfo.length === 0 && i.passwordInfo.length - i.requiredPasswordInfo.length <= n.bonestructure.test_threshold ? t.emit("change", e.name, i.value1, e.lang, e.index, !0) : t.emit("change", e.name, i.value1, e.lang, e.index, !1);
    }
    U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(r) {
      i.passwordInfo = [], i.requiredPasswordInfo = [];
      for (const o of n.bonestructure.tests)
        new RegExp(o[0]).test(r) || (o[2] ? i.requiredPasswordInfo.push(o[1]) : i.passwordInfo.push(o[1]));
      i.equal || i.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), i.value1 || i.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return _e(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: r } = Ce(() => {
          a.value.focus();
        }, 600);
        r();
      }
    }), be(
      () => e.value,
      (r, o) => {
        i.value1 = r;
      }
    ), {
      state: i,
      boneState: n,
      changeEvent: l,
      passwordBone: a
    };
  }
}), js = ["disabled"], Bs = ["name"], Ns = ["name"], Rs = { class: "errors" };
function xs(e, t, n, i, a, l) {
  return m(), p(C, null, [
    ne(u("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.state.value1 = s),
      disabled: e.boneState.readonly,
      class: J({ "has-check": !e.boneState.readonly }),
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
      }, null, 8, Bs)
    ], 42, js), [
      [ge, e.state.value1]
    ]),
    e.boneState.readonly ? w("", !0) : ne((m(), p("sl-input", {
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
      [ge, e.state.value2]
    ]),
    u("ul", Rs, [
      (m(!0), p(C, null, D(e.state.passwordInfo, (s, r) => (m(), p("li", { key: r }, j(s), 1))), 128)),
      (m(!0), p(C, null, D(e.state.requiredPasswordInfo, (s, r) => (m(), p("li", {
        key: r,
        class: "requiredInfo"
      }, j(s), 1))), 128))
    ])
  ], 64);
}
const Ye = /* @__PURE__ */ I(Os, [["render", xs], ["__scopeId", "data-v-84a55b3d"]]), q = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 };
class $e extends Error {
  constructor(t, n, i, a) {
    super(i || n), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = n, this.statusCode = t, this.response = a;
  }
}
let Ae = null;
function ee() {
  return Ae || (Ae = xe("requestStore", () => {
    const e = E({
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
  })), Ae();
}
class B {
  static resetState() {
    ee().$reset(), ee().$dispose();
  }
  static buildUrl(t) {
    return t && !(t.startsWith("http://") || t.startsWith("https://") || t.startsWith("//")) && (t = window.location.origin + t), t;
  }
  static post(t, { dataObj: n = null, callback: i = null, failedCallback: a = null, abortController: l = null, headers: s = null, mode: r = null } = {}) {
    function o() {
      if (n instanceof FormData)
        return n;
      const f = new FormData();
      for (const h in n)
        if (Array.isArray(n[h]))
          for (let g of n[h])
            f.append(h, g);
        else
          f.append(h, n[h]);
      return f;
    }
    let d = pe.post(B.buildUrl(t), o(), null, s, l, r);
    return d.then(function(f) {
      i && i(f.data);
    }).catch(function(f) {
      a && a(f);
    }), d;
  }
  static async getBatchSkeys(t = "json") {
    await B.get(`/${t}/skey`, {
      dataObj: { amount: ee().state.amount }
    }).then(async (n) => {
      let i = await n.json();
      Array.isArray(i) || (i = [i]), ee().state.sKeys = new Set(i);
    });
  }
  static async securePost(t, {
    dataObj: n = null,
    callback: i = null,
    failedCallback: a = null,
    abortController: l = null,
    renderer: s = "json",
    headers: r = null,
    mode: o = null,
    amount: d = null
  } = {}) {
    let f = null;
    ee().state.sKeys.size === 0 && (d && (ee().state.amount = d), await B.getBatchSkeys(s));
    const h = [...ee().state.sKeys][0];
    return n instanceof FormData ? (n.append("skey", h), ee().state.sKeys.delete(h)) : (n || (n = {}), n.skey = h, ee().state.sKeys.delete(h)), f = B.post(t, {
      dataObj: n,
      callback: i,
      abortController: l,
      headers: r,
      mode: o
    }), f;
  }
  static get(t, {
    dataObj: n = null,
    callback: i = null,
    failedCallback: a = null,
    cached: l = !1,
    clearCache: s = !1,
    abortController: r = null,
    headers: o = null,
    mode: d = null,
    //          milli  sec  min  Std  Tage
    cacheTime: f = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let h = pe.get(B.buildUrl(t), n, s, o, r, d);
    return h.then(function(g) {
      i && i(g.data);
    }).catch(function(g) {
      a && a(g);
    }), h;
  }
  static list(t, {
    dataObj: n = null,
    callback: i = null,
    failedCallback: a = null,
    group: l = null,
    abortController: s = null,
    renderer: r = (q == null ? void 0 : q.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let o = `/${r}/${t}/list`;
    return l && (o += `/${l}`), B.get(o, {
      dataObj: n,
      callback: i,
      failedCallback: a,
      abortController: s
    });
  }
  static getStructure(t, {
    dataObj: n = null,
    callback: i = null,
    failedCallback: a = null,
    group: l = null,
    abortController: s = null,
    renderer: r = (q == null ? void 0 : q.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    t = t.replace(/\//g, ".");
    let o = `/${r}/getStructure/${t}`;
    return l && (o += `/${l}`), B.get(o, {
      dataObj: n,
      callback: i,
      failedCallback: a,
      abortController: s
    });
  }
  static view(t, n, {
    dataObj: i = null,
    callback: a = null,
    failedCallback: l = null,
    group: s = null,
    abortController: r = null,
    renderer: o = (q == null ? void 0 : q.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${o}/${t}/view/${n}`;
    return s && (d = `/${o}/${t}/view/${s}/${n}`), B.get(d, {
      dataObj: i,
      callback: a,
      failedCallback: l,
      abortController: r
    });
  }
  static add(t, {
    dataObj: n = null,
    callback: i = null,
    failedCallback: a = null,
    group: l = null,
    abortController: s = null,
    renderer: r = (q == null ? void 0 : q.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let o = `/${r}/${t}/add`;
    return l && (o = `/${r}/${t}/add/${l}`), B.securePost(o, {
      dataObj: n,
      callback: i,
      failedCallback: a,
      abortController: s
    });
  }
  static edit(t, n, {
    dataObj: i = null,
    callback: a = null,
    failedCallback: l = null,
    group: s = null,
    abortController: r = null,
    renderer: o = (q == null ? void 0 : q.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${o}/${t}/edit/${n}`;
    return s && (d = `/${o}/${t}/edit/${s}/${n}`), B.securePost(d, {
      dataObj: i,
      callback: a,
      failedCallback: l,
      abortController: r
    });
  }
  static delete(t, n, {
    dataObj: i = null,
    callback: a = null,
    failedCallback: l = null,
    group: s = null,
    abortController: r = null,
    renderer: o = (q == null ? void 0 : q.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${o}/${t}/delete/${n}`;
    return s && (d = `/${o}/${t}/delete/${s}/${n}`), B.securePost(d, {
      dataObj: i,
      callback: a,
      failedCallback: l,
      abortController: r,
      amount: 1
    });
  }
  static downloadUrlFor(t, n = !1) {
    return t && "dest" in t ? n && "thumbnail" in t.dest ? B.buildUrl(t.dest.thumbnail) : "downloadUrl" in t.dest ? B.buildUrl(t.dest.downloadUrl) : B.buildUrl(null) : B.buildUrl(t);
  }
  static serveUrlFor(t, n = null, i = null, a = "", l = !1) {
    const s = /^https:\/\/(.*?)\.googleusercontent\.com\/(.*?)$/;
    let r = "/file/serve";
    const o = t.match(s);
    if (o) {
      const d = o[1], f = o[2];
      r += `/${d}/${f}`, n && (r += `/${n}`), i && (r += `/${i}`);
      let h = [];
      for (const [g, c] of Object.entries({ options: a, download: l }))
        c && h.push(`${g}=${c}`);
      h.length > 0 && (r += `?${h.join("&")}`);
    }
    return B.buildUrl(r);
  }
  static uploadFile(t, n = void 0) {
    const i = {
      fileName: t.name,
      mimeType: t.type || "application/octet-stream",
      size: t.size.toString(),
      node: n
    };
    return new Promise((a, l) => {
      B.securePost("/vi/file/getUploadURL", { dataObj: i }).then(async (s) => {
        let r = await s.json();
        fetch(r.values.uploadUrl, {
          body: t,
          method: "POST",
          mode: "no-cors"
        }).then(async (o) => {
          const d = {
            key: r.values.uploadKey,
            skelType: "leaf"
          };
          B.securePost("/vi/file/add", { dataObj: d }).then(async (f) => {
            let h = await f.json();
            h.action === "addSuccess" ? a(h.values) : l(h);
          }).catch((f) => {
            l(f);
          });
        }).catch((o) => {
          l(o);
        });
      }).catch((s) => {
        l(s);
      });
    });
  }
}
class pe {
  constructor() {
    ye(this, "withCredentials", !0);
  }
  static buildOptions(t, n = null, i = null, a = null, l = null) {
    let s = { method: t };
    return s.credentials = "include", s.headers = {
      Accept: "application/json, text/plain, */*"
    }, i && (s.headers = { ...s.headers, ...i }), n && (s.body = n), a && (s.signal = a.signal), l && (s.mode = l), s;
  }
  static get(t, n = null, i = null, a = null, l = null, s = null) {
    function r(o, d) {
      let f = new URL(o);
      if (d && Object.keys(d).length > 0) {
        const h = new URLSearchParams();
        for (const [g, c] of Object.entries(d))
          if (Array.isArray(c))
            for (const v of c)
              h.append(g, v);
          else
            h.append(g, c);
        f.search = h.toString();
      }
      return f.toString();
    }
    return fetch(r(t, n), pe.buildOptions("GET", null, a, l, s)).then(async (o) => {
      if (o.ok)
        return o;
      {
        const d = `${o.status} ${o.statusText}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new $e(o.status, o.statusText, d, o));
      }
    }).catch((o) => {
      if (o instanceof TypeError) {
        const f = `503 ${o.message}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new $e(503, o.message, f, o));
      }
      if (o instanceof DOMException && o.name == "AbortError") {
        const f = `${o.code} ${o.name}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new $e(o.code, o.name, f, { url: t }));
      }
      const d = `${o.statusCode} ${o.statusText}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new $e(o.statusCode, o.statusText, d, o.response));
    });
  }
  static post(t, n = null, i = null, a = null, l = null, s = null) {
    return fetch(t, pe.buildOptions("POST", n, a, l, s));
  }
}
class Oe {
  constructor(t, n, i) {
    this.emit = t, this.match = n, this.children = i;
  }
  dump(t) {
    if (t === void 0 && (t = 0), this.emit !== void 0) {
      let n = this.emit;
      for (let i = 0; i < t; i++)
        n = " " + n;
      this.match && this.match !== this.emit && (n += " (" + this.match + ")"), console.log(n), t++;
    }
    if (this.children)
      for (let n of this.children)
        n && n.dump(t);
  }
}
class je {
  constructor() {
    this.state = 0, this.line = 0, this.column = 0, this.node = null;
  }
}
class Ts extends Error {
  constructor(t, n, i) {
    super(`${t}:${n} Parse error, expecting '${i.join("', '")}'`), this.line = t, this.column = n, this.expecting = i;
  }
}
class Us {
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
var K, H, G, z, ft, Re, Se, ht, gt;
class ce {
  parse(t) {
    var r, o, d;
    let s = new Us();
    for (s.input = t, s.act = 2, s.tos = new je(), s.stack.push(s.tos); ; ) {
      for (; s.act & 1; ) {
        s.lhs = k(this.constructor, K).productions[s.idx]["left-hand-side"], "parse_" + s.idx in s && s["parse_" + s.idx]();
        let f = null, h = null;
        for (let g = 0; g < k(this.constructor, K).productions[s.idx].length; g++) {
          let c = s.stack.pop();
          c.node && (f === null && (f = []), Array.isArray(c.node) ? f = c.node.concat(f) : f.unshift(c.node));
        }
        if (s.tos = s.stack[s.stack.length - 1], s.tos.value = s.ret, k(this.constructor, K).productions[s.idx].emit && (h = new Oe(k(this.constructor, K).productions[s.idx].emit, null, f)), s.lhs === 38 && s.stack.length === 1) {
          s.tos.node = h || f, Y(r = this.constructor, z, Se).call(r, s), s.act = 4;
          break;
        }
        s.act = k(this.constructor, G).goto[s.tos.state][s.lhs][0], s.idx = k(this.constructor, G).goto[s.tos.state][s.lhs][1], s.tos = new je(), s.stack.push(s.tos), s.tos.symbol = k(this.constructor, K).symbols[s.lhs], s.tos.state = s.act & 1 ? -1 : s.idx, s.tos.value = s.ret, s.tos.node = h || f, s.tos.value = s.ret, s.tos.line = s.line, s.tos.column = s.column;
      }
      if (s.act === 4 || s.act === 0)
        break;
      if (Y(o = this.constructor, z, gt).call(o, s), s.sym in k(this.constructor, G).action[s.tos.state] ? (s.act = k(this.constructor, G).action[s.tos.state][s.sym][0], s.idx = k(this.constructor, G).action[s.tos.state][s.sym][1]) : (s.idx = k(this.constructor, G)["default-production"][s.tos.state], s.idx > -1 ? s.act = 1 : s.act = 0), !s.act)
        throw new Ts(
          s.line,
          s.column,
          Object.keys(
            k(this.constructor, G).action[s.tos.state]
          ).map((f) => k(this.constructor, K).symbols[f].symbol).sort()
        );
      s.act & 2 && (s.tos = new je(), s.stack.push(s.tos), "scan_" + s.idx in s && s["parse_" + s.idx](), s.tos.state = s.act & 1 ? -1 : s.idx, s.tos.symbol = k(this.constructor, K).symbols[s.sym], s.tos.line = s.line, s.tos.column = s.column, s.top = s.buf.slice(0, s.len), s.tos.symbol.emit && (s.tos.node = new Oe(s.tos.symbol.emit, s.top)), s.sym !== 0 && s.sym !== -1 && (Y(d = this.constructor, z, Se).call(d, s), s.old_sym = -1));
    }
    return !s.ret && s.tos.node ? Array.isArray(s.tos.node) ? s.tos.node.length > 1 ? new Oe(null, null, s.tos.node) : s.tos.node.pop() : s.tos.node : s.ret;
  }
}
K = new WeakMap(), H = new WeakMap(), G = new WeakMap(), z = new WeakSet(), ft = function(t) {
  if (typeof t.input == "function")
    return t.input();
  let n = t.eof;
  return t.input.length > 0 && (n = t.input[0], t.input = t.input.slice(1)), n;
}, Re = function(t, n) {
  for (; n >= t.buf.length; ) {
    if (t.is_eof)
      return t.eof;
    let i = Y(this, z, ft).call(this, t);
    if (i === t.eof)
      return t.is_eof = !0, t.eof;
    t.buf += i;
  }
  return t.buf.charCodeAt(n);
}, Se = function(t) {
  if (t.buf.length) {
    for (let n = 0; n <= t.len; n++)
      t.buf[n] === `
` ? (t.line++, t.column = 0) : t.column++;
    t.buf = t.buf.slice(t.len);
  }
  t.len = 0, t.sym = -1;
}, ht = function(t) {
  let n = 0, i = 0, a = 0, l = Y(this, z, Re).call(this, t, i);
  if (l === t.eof) {
    t.sym = 0;
    return;
  }
  for (; n > -1 && l !== t.eof; ) {
    let s = k(this, H).index[a][n];
    for (n = -1; k(this, H).chars[s * 2] > -1; ) {
      if (l >= k(this, H).chars[s * 2] && l <= k(this, H).chars[s * 2 + 1]) {
        if (i++, n = k(this, H).transitions[s], k(this, H).accept[a][n] > 0) {
          if (t.sym = k(this, H).accept[a][n] - 1, t.len = i, t.sym === 0) {
            n = -1;
            break;
          }
          if (!k(this, K).symbols[t.sym]["is-greedy"]) {
            n = -1;
            break;
          }
        }
        l = Y(this, z, Re).call(this, t, i);
        break;
      }
      s++;
    }
  }
}, gt = function(t) {
  for (t.sym = -1, t.len = 0; ; ) {
    if (Y(this, z, ht).call(this, t), t.sym > -1 && k(this, K).symbols[t.sym]["is-whitespace"]) {
      Y(this, z, Se).call(this, t);
      continue;
    }
    break;
  }
  return t.sym > -1;
}, te(ce, z), te(ce, K, {
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
}), te(ce, H, {
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
}), te(ce, G, {
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
var T, ie;
const _ = class _ {
  // private property: Logics type name
  /** Constructs a Logics value from a native JS-value, or clones an existing Logics value.
  In case the native value is not JSON-serializable, an Exception is thrown. */
  constructor(t) {
    te(this, T);
    // private property: The native value in JavaScript
    te(this, ie);
    t instanceof _ ? (re(this, T, t.valueOf()), re(this, ie, t.type())) : (re(this, T, t), re(this, ie, this.constructor.type(t)));
  }
  /// Return value's native JS value
  valueOf() {
    return k(this, T);
  }
  /// Returns the Logics value type; The type is cached in this.#type, for further usage.
  type() {
    return k(this, ie) || re(this, ie, this.constructor.type(k(this, T)));
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
        return k(this, T) ? "True" : "False";
      case "int":
      case "float":
        return k(this, T).toString();
      case "str":
        return '"' + k(this, T).toString().replace(/([\\"])/, "\\$1") + '"';
      case "list":
        return "[" + k(this, T).map(
          (t) => (t instanceof _ || (t = new _(t)), t.repr())
        ).join(", ") + "]";
      case "dict":
        return "{" + Object.keys(k(this, T)).map(
          (t) => {
            t instanceof _ || (t = new _(t));
            let n = k(this, T)[t];
            return n instanceof _ || (n = new _(n)), t + ": " + n.repr();
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
        return k(this, T).toString();
      default:
        return this.repr();
    }
  }
  // Returns JS-native boolean value.
  toBool() {
    return !!k(this, T);
  }
  // Returns JS-native int value.
  toInt() {
    return k(this, T) === !0 ? 1 : parseInt(k(this, T)) || 0;
  }
  // Returns JS-native float value.
  toFloat() {
    return k(this, T) === !0 ? 1 : parseFloat(k(this, T)) || 0;
  }
  // Returns JS-native list value.
  toList() {
    let t = this.type();
    return t === "list" ? k(this, T) : t ? [k(this, T)] : null;
  }
  // Returns JS-native dict value.
  toDict() {
    let t = this.type();
    if (t === "dict")
      return k(this, T);
    if (t) {
      let n = {};
      return n[k(this, T)] = k(this, T), n;
    }
    return null;
  }
  // Retrieve length of object
  __len__() {
    switch (this.type()) {
      case "dict":
        return Object.keys(k(this, T)).length;
      case "list":
        return k(this, T).length;
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
        if (n = new _(n), n.__cmp__(this) === 0)
          return !0;
      return !1;
    }
    return t.toString().indexOf(this.toString()) >= 0;
  }
  // Index into value
  __getitem__(t, n) {
    if (this.type() === "dict")
      return console.assert(n === void 0, "Cannot slice into a dict"), this.toDict()[t.toString()];
    let i = this.type() === "list" ? this.toList() : this.toString(), a = t.valueOf() === null ? 0 : t.toInt();
    if (a < 0 && (a = i.length + a), n === void 0)
      return i[a];
    let l = n.valueOf() === null ? i.length : n.toInt();
    return l < 0 && (l = i.length + l), i.slice(a, l);
  }
  // Compare
  __cmp__(t) {
    let n, i;
    if (this.type() === "dict" || t.type() === "dict") {
      n = this.toDict(), i = t.toDict();
      let a = Object.keys(n), l = Object.keys(i);
      if (a.length < l.length)
        return -1;
      if (a.length > l.length)
        return 1;
      for (let s of a) {
        if (typeof i[s] > "u")
          return 1;
        let r = new _(n[s]), o = new _(i[s]), d;
        if ((d = r.__cmp__(o)) !== 0)
          return d;
      }
      return 0;
    } else if (this.type() === "list" || t.type() === "list") {
      if (n = this.toList(), i = t.toList(), n.length < i.length)
        return -1;
      if (n.length > i.length)
        return 1;
      for (let a = 0; a < n.length; a++) {
        let l = new _(n[a]), s = new _(i[a]), r;
        if ((r = l.__cmp__(s)) !== 0)
          return r;
      }
      return 0;
    } else this.type() === "str" || t.type() === "str" ? (n = this.toString(), i = t.toString()) : this.type() === "float" || t.type() === "float" ? (n = this.toFloat(), i = t.toFloat()) : (n = this.toInt(), i = t.toInt());
    return n < i ? -1 : n > i ? 1 : 0;
  }
  // Performs an add-operation with another Value object.
  __add__(t) {
    return this.type() === "str" || t.type() === "str" ? new _(this.toString() + t.toString()) : this.type() === "float" || t.type() === "float" ? new _(this.toFloat() + t.toFloat()) : new _(this.toInt() + t.toInt());
  }
  // Performs a sub-operation with another Value object.
  __sub__(t) {
    return this.type() === "float" || t.type() === "float" ? new _(this.toFloat() - t.toFloat()) : new _(this.toInt() - t.toInt());
  }
  // Performs a mul-operation with another Value object.
  __mul__(t) {
    if (this.type() === "str" || t.type() === "str") {
      let n, i;
      return this.type() === "str" ? (n = this.toString(), i = t.toInt()) : (n = t.toString(), i = this.toInt()), i * n.length > _.maxStringLength ? new _(`#ERR limit of ${_.maxStringLength} reached`) : new _(n.repeat(i));
    }
    return this.type() === "float" || t.type() === "float" ? new _(this.toFloat() * t.toFloat()) : new _(this.toInt() * t.toInt());
  }
  // Performs a div-operation with another Value object.
  __truediv__(t) {
    if (this.type() === "float" || t.type() === "float") {
      let i = t.toFloat();
      return i === 0 ? new _("#ERR:division by zero") : new _(this.toFloat() / i);
    }
    let n = t.toInt();
    return n === 0 ? new _("#ERR:division by zero") : new _(this.toInt() / n);
  }
  __floordiv__(t) {
    let n = t.toInt();
    return n === 0 ? new _("#ERR:division by zero") : new _(Math.floor(this.toInt() / n));
  }
  // Performs a mod-operation with another Value object.
  __mod__(t) {
    if (this.type() === "float" || t.type() === "float") {
      let i = t.toFloat();
      return i === 0 ? new _("#ERR:modulo by zero") : new _(this.toFloat() % i);
    }
    let n = t.toInt();
    return n === 0 ? new _("#ERR:modulo by zero") : new _(this.toInt() % n);
  }
  // Performs a mod-operation with another Value object.
  __pow__(t) {
    return this.type() === "float" || t.type() === "float" ? new _(this.toFloat() ** t.toFloat()) : new _(this.toInt() ** t.toInt());
  }
  // Performs unary plus
  __pos__() {
    return this.type() === "float" ? new _(+this.toFloat()) : new _(+this.toInt());
  }
  // Performs unary minus
  __neg__() {
    return this.type() === "float" ? new _(-this.toFloat()) : new _(-this.toInt());
  }
  // Performs unary complement
  __invert__() {
    return new _(~this.toInt());
  }
};
T = new WeakMap(), ie = new WeakMap(), ye(_, "maxStringLength", 32 * 1024);
let me = _;
function Ds(e) {
  function t(n) {
    const i = n.slice(1);
    if ("xuU".includes(i[0]))
      try {
        return String.fromCodePoint(parseInt(i.slice(1), 16));
      } catch {
        return i;
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
    }[i] || i;
  }
  return e.replace(/\\(?:\\|'|"|a|b|f|n|r|t|v|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g, t);
}
var ke;
const fe = class fe {
  /** Create a new VM with a given piece of code. */
  constructor(t, {
    debug: n = !1
  } = {}) {
    this.ast = k(this.constructor, ke).parse(t), this.debug = !!n, this.debug && this.ast.dump(), this.functions = {
      bool: (i) => i.toBool(),
      currency: (i, a, l, s) => "#todo",
      // todo
      float: (i) => i.toFloat(),
      int: (i) => i.toInt(),
      join: (i, a, l) => i.toList().join(a && a.toString() || ", "),
      keys: (i) => Object.keys(i.toDict().valueOf()),
      len: (i) => i.__len__(),
      lfill: (i, a, l) => i.toString().padStart(a, l),
      lower: (i) => i.toString().toLowerCase(),
      lstrip: (i) => i.toString().trimStart(),
      max: (i) => Math.max(...i.toList().valueOf().map((a) => parseFloat(a) || 0)),
      min: (i) => Math.min(...i.toList().valueOf().map((a) => parseFloat(a) || 0)),
      range: (i, a, l) => (i = i.toInt() || 0, a === void 0 ? (a = i || 0, i = 0) : a = a.toInt() || 0, a < i && (i = a), l = l && l.toInt() || 1, l <= 0 ? [] : [...Array(Math.ceil((a - i) / l)).keys()].map((s) => i + s * l)),
      replace: (i, a, l) => i.toString().replaceAll(
        a && a.toString() || " ",
        l && l.toString() || ""
      ),
      rfill: (i, a, l) => i.toString().padEnd(a, l),
      round: (i, a) => parseFloat(i.toFloat().toFixed(a && a.toInt() || 0)),
      rstrip: (i) => i.toString().trimEnd(),
      split: (i, a) => i.toString().split(a && a.toString() || " "),
      str: (i) => i.toString(),
      strip: (i) => i.toString().trim(),
      sum: (i) => i.toList().valueOf().map((a) => parseFloat(a) || 0).reduce((a, l) => a + l, 0),
      upper: (i) => i.toString().toUpperCase(),
      values: (i) => Object.values(i.toDict().valueOf())
    };
  }
  /** Run the VM with a given set of values.
   * Returns the topmost value of the stack, if any. */
  run(t) {
    let n = [];
    return n.op0 = function(i) {
      i instanceof me || (i = new me(i)), this.push(i);
    }, n.op1 = function(i) {
      this.op0(i(this.pop()));
    }, n.op2 = function(i) {
      let a = this.pop();
      this.op0(i(this.pop(), a));
    }, n.op3 = function(i) {
      let a = this.pop(), l = this.pop();
      this.op0(i(this.pop(), l, a));
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
  traverse(t, n, i) {
    function a(l, s) {
      let r;
      return (r = s[l]) !== void 0 ? r() ?? !0 : (r = s._) !== void 0 ? r() : !1;
    }
    if (!a(t.emit, {
      and: () => {
        console.assert(t.children.length === 2), this.traverse(t.children[0], n, i);
        let l = n.pop();
        l.toBool() ? this.traverse(t.children[1], n, i) : n.push(l);
      },
      call: () => {
        let l = [];
        t.children.length === 2 && (this.traverse(t.children[1], n, i), l = n.pop().toList());
        let s = this.functions[t.children[0].match];
        if (s !== void 0) {
          for (let r in l)
            l[r] = new me(l[r]);
          n.op0(s(...l));
        } else
          throw new Error(`Call to unknown function: ${t.children[0].match}`);
      },
      comprehension: () => {
        console.assert(t.children.length === 3 || t.children.length === 4), this.traverse(t.children[2], n, i);
        let l = n.pop().toList().valueOf(), s = t.children[0], r = t.children[1].match, o = t.children[3], d = [], f = 0;
        for (let h of l) {
          if (++f > fe.maxForIterations)
            break;
          i[r] = h, !(o !== void 0 && (this.traverse(o, n, i), !n.pop().toBool())) && (this.traverse(s, n, i), d.push(n.pop()));
        }
        n.op0(d);
      },
      if: () => {
        console.assert(t.children.length === 3), this.traverse(t.children[1], n, i), this.traverse(t.children[n.pop().toBool() ? 0 : 2], n, i);
      },
      or: () => {
        console.assert(t.children.length === 2), this.traverse(t.children[0], n, i);
        let l = n.pop();
        l.toBool() ? n.push(l) : this.traverse(t.children[1], n, i);
      },
      cmp: () => {
        for (let l = 0; l < t.children.length; l++) {
          if (this.traverse(t.children[l], n, i), l === 0)
            continue;
          let s = n.pop(), r = n.pop(), o = a(t.children[l].emit, {
            eq: () => r.__cmp__(s) === 0,
            gteq: () => r.__cmp__(s) >= 0,
            gt: () => r.__cmp__(s) > 0,
            lteq: () => r.__cmp__(s) <= 0,
            lt: () => r.__cmp__(s) < 0,
            neq: () => r.__cmp__(s) !== 0,
            in: () => r.__contains__(s),
            outer: () => !r.__contains__(s),
            _: () => console.log("unreachable")
          });
          if (n.op0(o ? l === t.children.length - 1 ? !0 : s : !1), !o)
            break;
        }
      }
    }) && (t.children ?? !1))
      for (let l of t.children)
        this.traverse(l, n, i);
    return a(t.emit, {
      // Pushing values
      False: () => n.op0(!1),
      Identifier: () => n.op0(t.match),
      None: () => n.op0(null),
      Number: () => n.op0(parseFloat(t.match)),
      String: () => n.op0(Ds(t.match.substring(1, t.match.length - 1))),
      // cut "..." from string.
      True: () => n.op0(!0),
      // Operations
      add: () => n.op2((l, s) => l.__add__(s)),
      attr: () => n.op2((l, s) => l.toDict()[s]),
      div: () => n.op2((l, s) => l.__truediv__(s)),
      idiv: () => n.op2((l, s) => l.__floordiv__(s)),
      invert: () => n.op1((l) => l.__invert__()),
      list: () => n.op0(n.splice(-t.children.length).map((l) => l.valueOf())),
      mod: () => n.op2((l, s) => l.__mod__(s)),
      mul: () => n.op2((l, s) => l.__mul__(s)),
      neg: () => n.op1((l) => l.__neg__()),
      not: () => n.op1((l) => !l.toBool()),
      pos: () => n.op1((l) => l.__pos__()),
      pow: () => n.op2((l, s) => l.__pow__(s)),
      index: () => n.op2((l, s) => l.__getitem__(s)),
      load: () => n.op1((l) => i[l.toString()]),
      slice: () => n.op3((l, s, r) => l.__getitem__(s, r)),
      strings: () => n.op0(n.splice(-t.children.length).join("")),
      sub: () => n.op2((l, s) => l.__sub__(s)),
      vars: () => n.op0(i)
    });
  }
};
ke = new WeakMap(), te(fe, ke, new ce()), ye(fe, "maxForIterations", 4 * 1024);
let oe = fe;
window !== void 0 && (window.Logics = oe);
function Ps(e, t) {
  function n() {
    let g = `/${e.renderer}/${e.module}/${e.action}`;
    const c = ["node", "leaf"].includes(e.skeltype);
    return e.group ? g += `/${e.group}` : c && (g += `/${e.skeltype}`), (["edit", "clone"].includes(e.action) || c && e.action === "add") && (g += `/${e.skelkey}`), g;
  }
  function i(g) {
    if (Array.isArray(g)) {
      let c = {};
      for (const v in g)
        c[g[v][0]] = g[v][1];
      return c;
    } else
      return g;
  }
  function a() {
    let g = [];
    function c(y, b, $, S) {
      var x, M, X;
      if ($.type.startsWith("record")) {
        let A = i($.using);
        for (const [F, de] of Object.entries(A))
          y = y.concat(v(`${b}.${F}`, de, S == null ? void 0 : S[F]));
      } else if (S === Object(S) && $.using)
        if ((x = S.dest) != null && x.key) {
          let A = i($.using);
          for (const [F, de] of Object.entries(A))
            y = y.concat(v(`${b}.${F}`, de, (M = S.rel) == null ? void 0 : M[F]));
          y.push({ [`${b}.key`]: S.dest.key });
        } else
          y.push({ [`${b}`]: null });
      else $.type.startsWith("spatial") && S ? (y.push({ [b + ".lat"]: S[0] }), y.push({ [b + ".lng"]: S[1] })) : S === Object(S) ? y.push({ [b]: ((X = S.dest) == null ? void 0 : X.key) || null }) : y.push({ [b]: S });
      return y;
    }
    function v(y, b, $) {
      let S = [], x = b.type.startsWith("record"), M = b.languages || ["none"], X = $;
      for (const A of M) {
        let F = y;
        if (A !== "none" && (F += `.${A}`, X && ($ = X[A])), b.multiple) {
          $ || ($ = []);
          for (const [de, ve] of $.entries()) {
            let Le = F;
            (x || ve != null && ve.rel) && (Le = `${F}.${de}`), S = c(S, Le, b, ve);
          }
          $.length === 0 && S.push({ [F]: null });
        } else
          S = c(S, F, b, $);
      }
      return S;
    }
    for (const [y, b] of Object.entries(t.structure))
      e.sendReadOnly ? g.push(v(y, b, t.skel[y])) : t.structure[y].readonly || g.push(v(y, b, t.skel[y]));
    return g = g.flat(10), g;
  }
  function l(g = null, c = null, v = !0) {
    t.loading = !0;
    let y = B.post;
    e.secure && (y = B.securePost);
    let b = n();
    g && (b = g);
    const $ = new FormData();
    for (const x of a())
      for (const [M, X] of Object.entries(x)) {
        let A = X || "";
        $.append(M, A);
      }
    let S = {};
    for (const x of $.keys())
      x === "key" && v || (S[[x]] = $.getAll(x));
    return c && (S = { ...S, ...c }), y(b, { dataObj: S }).then(async (x) => {
      let M = await x.clone().json();
      return t.skel = M.values, t.errors = M.errors, t.loading = !1, x;
    });
  }
  function s(g = null, c = null) {
    t.loading = !0;
    let v = B.post;
    e.secure && (v = B.securePost);
    let y = n();
    g && (y = g);
    let b = {};
    return c && (b = { ...b, ...c }), v(y, { dataObj: b }).then(async ($) => {
      let S = await $.clone().json();
      return h(S.values, S.structure), t.errors = S.errors, t.loading = !1, $;
    });
  }
  function r() {
    var v, y;
    t.structure || (t.structure = {});
    let g = { default: { name: "Allgemein", bones: [], visible: !1, open: !0 } };
    for (const [b, $] of Object.entries(t.structure)) {
      if (e.bones.length > 0 && !e.bones.includes(b))
        continue;
      let S = "default", x = t.structure[b];
      (v = $ == null ? void 0 : $.params) != null && v.category && (S = $.params.category.toLowerCase()), Object.keys(g).includes(S) ? g[S].bones.push({
        name: b
      }) : g[S] = {
        name: $.params.category,
        bones: [
          {
            name: b
          }
        ]
      }, x.visible === !0 && (g[S].visible = !0), e.collapsedCategories && e.collapsedCategories.map((M) => M.toLowerCase()).includes(S) || S === "system" || S === "internal" || ((y = e.collapsedCategories) == null ? void 0 : y[0]) === "*" ? g[S].open = !1 : g[S].open = !0;
    }
    let c = {};
    return Object.keys(g).sort().forEach(function(b) {
      c[b] = g[b];
    }), c;
  }
  function o(g) {
    const { name: c, lang: v, value: y, index: b } = g;
    let $ = t.skel[c];
    if (y === void 0 || t.readonly) return !1;
    v ? ($ || ($ = {}), Object.keys($).includes(v) && b !== null ? ($[v] || ($[v] = []), $[v][b] = y) : $[v] = y) : b !== null ? ($ || ($ = []), $[b] = y) : ($ = y, t.skel[c] = $), f();
  }
  function d(g, c) {
    var v, y, b, $, S, x, M;
    for (const [X, A] of Object.entries(g)) {
      if ((v = A == null ? void 0 : A.params) != null && v.evaluate) {
        let F = new oe((y = A == null ? void 0 : A.params) == null ? void 0 : y.evaluate);
        t.skel[X] = F.run(c);
      }
      if ((b = A == null ? void 0 : A.params) != null && b.visibleIf)
        try {
          let F = new oe(($ = A == null ? void 0 : A.params) == null ? void 0 : $.visibleIf);
          A.visible = F.run(c).toBool();
        } catch {
          console.log((S = A == null ? void 0 : A.params) == null ? void 0 : S.visibleIf);
        }
      if ((x = A == null ? void 0 : A.params) != null && x.readonlyIf) {
        let F = new oe((M = A == null ? void 0 : A.params) == null ? void 0 : M.readonlyIf);
        A.readonly = F.run(c).toBool();
      }
      A != null && A.using && d(A.using, c);
    }
  }
  function f() {
    let g = t.skel;
    e.internal && (g = e.internal.skel), d(t.structure, g);
  }
  function h(g, c) {
    t.skel = g || {}, t.structure = i(c), t.categories = r();
  }
  return {
    fetchData: s,
    sendData: l,
    buildRequestUrl: n,
    updateCategories: r,
    updateSkel: o,
    normalizeStructure: i,
    initForm: h
  };
}
const Vs = ["summary", "open"], Ls = {
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
    return (t, n) => e.hide ? ae(t.$slots, "default", { key: 0 }, void 0, !0) : ne((m(), p("sl-details", {
      key: 1,
      summary: e.name,
      open: e.open
    }, [
      ae(t.$slots, "default", {}, void 0, !0)
    ], 8, Vs)), [
      [Ue, e.visible]
    ]);
  }
}, Fs = /* @__PURE__ */ I(Ls, [["__scopeId", "data-v-063de9c8"]]), qs = {
  __name: "LayoutCategory",
  setup(e) {
    const t = N("formState");
    return N("formUpdate"), (n, i) => (m(!0), p(C, null, D(L(t).categories, (a, l) => (m(), V(Fs, {
      name: a.name,
      identifier: l,
      visible: a.visible,
      open: a.open,
      hide: !L(t).useCategories
    }, {
      default: De(() => [
        (m(!0), p(C, null, D(a.bones, (s) => ae(n.$slots, "default", {
          key: s.name,
          boneName: s.name,
          widget: L(le)(L(t).structure[s.name].type)
        })), 128))
      ]),
      _: 2
    }, 1032, ["name", "identifier", "visible", "open", "hide"]))), 256));
  }
}, zs = {
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
      default: qs
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
    const i = n, a = e, l = E({
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
      values: O(() => a.values),
      internal: O(() => a.internal),
      useCategories: O(() => a.useCategories),
      label: O(() => a.label)
    });
    Ie("formState", l), a.internal || Ie("mainformState", l);
    const { fetchData: s, sendData: r, updateSkel: o, initForm: d } = Ps(a, l), f = cs((g) => {
      i("change", g);
    }, 500);
    Q(() => {
      l.loading = !0, a.structure ? (d(a.skel, a.structure), l.loading = !1) : a.module && a.action ? s(null, a.params).then(async (g) => {
        l.loading = !1;
      }).catch(async (g) => {
        l.loading = !1;
      }) : (console.log(a), console.error("Error while building Form: you need atleast module and action or structure parameters"));
    }), be(() => a.skel, (g, c) => {
      d(a.skel, a.structure);
    });
    function h(g) {
      o(g), f(g);
    }
    return Ie("formUpdate", h), t({ sendData: r, fetchData: s, updateSkel: o, state: l }), (g, c) => {
      const v = ue("bone");
      return ae(g.$slots, "default", {
        structure: l.structure,
        skel: l.skel,
        errors: l.errors,
        categories: l.categories
      }, () => [
        (m(), V(Te(e.layout), null, {
          default: De(({ boneName: y, widget: b, visible: $, label: S }) => [
            b !== void 0 ? ne((m(), V(v, {
              key: 0,
              is: b,
              name: y,
              structure: l.structure,
              skel: l.skel,
              errors: l.errors,
              label: S === void 0 ? l.label : S,
              onChangeInternal: h
            }, null, 8, ["is", "name", "structure", "skel", "errors", "label"])), [
              [Ue, $ === void 0 ? l.structure[y].visible : $]
            ]) : w("", !0)
          ]),
          _: 1
        }))
      ]);
    };
  }
}, Ms = {
  key: 0,
  open: "",
  variant: "danger"
}, Ws = {
  key: 1,
  class: "form"
}, Ks = {
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
    const n = t, i = e, a = W(null);
    N("boneState");
    const l = N("mainformState"), s = E({
      renderer: "json",
      globalRegistration: !1
    });
    function r(o) {
      o.value = a.value.state.skel, o.name = i.name, o.index = i.index, o.lang = i.lang, n("change", o);
    }
    return U(() => {
      Ct().appContext.components.Bone ? s.globalRegistration = !0 : s.globalRegistration = !1, n("change", i.name, i.value, i.lang, i.index);
    }), (o, d) => {
      var f, h;
      return s.globalRegistration ? (m(), p("div", Ws, [
        he(zs, {
          ref_key: "skelRef",
          ref: a,
          internal: L(l),
          skel: e.value,
          structure: e.bone.using,
          renderer: s.renderer,
          collapsedCategories: ((h = (f = e.bone) == null ? void 0 : f.params) == null ? void 0 : h.collapsedCategories) || [],
          onChange: r
        }, null, 8, ["internal", "skel", "structure", "renderer", "collapsedCategories"])
      ])) : (m(), p("sl-alert", Ms, " In Order to use this Bone register the bone component globally in your main file "));
    };
  }
}, Ve = /* @__PURE__ */ I(Ks, [["__scopeId", "data-v-41e8b948"]]), Hs = {
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
    const n = t, i = e;
    E({});
    function a(l) {
      n("change", l.name, l.value, l.lang, l.index);
    }
    return U(() => {
      n("change", i.name, i.value, i.lang, i.index);
    }), (l, s) => (m(), V(Ve, {
      value: e.value,
      name: e.name,
      index: e.index,
      lang: e.lang,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: a
    }, null, 8, ["value", "name", "index", "lang", "bone", "disabled"]));
  }
}, et = /* @__PURE__ */ I(Hs, [["__scopeId", "data-v-158aba44"]]), Gs = P({
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
    const n = N("boneState"), i = E({});
    function a(l) {
      t.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), Zs = ["disabled", "value"];
function Js(e, t, n, i, a, l) {
  return m(), p("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Zs);
}
const tt = /* @__PURE__ */ I(Gs, [["render", Js], ["__scopeId", "data-v-67e2148c"]]), Qs = P({
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
    const n = N("boneState"), i = E({
      minAmount: O(() => n.bonestructure.minAmount),
      maxAmount: O(() => n.bonestructure.maxAmount),
      precision: O(() => {
        if (n.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(n.bonestructure.precision - 1)}1`);
      })
    }), a = W(null);
    function l(s) {
      t.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return _e(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = Ce(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: l,
      numericBone: a
    };
  }
}), Xs = ["disabled", "value", "min", "max", "step"], Ys = { class: "info" }, ei = { key: 0 }, ti = { key: 1 }, ni = { key: 2 };
function si(e, t, n, i, a, l) {
  return m(), p(C, null, [
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
    }, null, 40, Xs),
    u("ul", Ys, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), p("li", ei, j(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : w("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), p("li", ti, j(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : w("", !0),
      e.state.precision ? (m(), p("li", ni, j(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : w("", !0)
    ])
  ], 64);
}
const nt = /* @__PURE__ */ I(Qs, [["render", si], ["__scopeId", "data-v-c3333ce1"]]), ii = P({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone: Object
  },
  components: { Wrapper_nested: Ve },
  emits: ["change"],
  setup(e, t) {
    const n = N("boneState"), i = N("formatString"), a = E({
      format: O(() => n == null ? void 0 : n.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function l(o) {
      let d = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/vi/${n.bonestructure.module}/list?${d}limit=99`
      ).then(async (f) => {
        var g;
        const h = await f.json();
        a.skellistdata = {};
        for (let c of h.skellist)
          a.skellistdata[c.key] = c;
        return (g = h.skellist) == null ? void 0 : g.map((c) => ({ text: i(n.bonestructure.format, { dest: c }), value: c.key, data: c }));
      });
    }
    function s(o) {
      a.selection = { dest: a.skellistdata[o.detail.item.value] }, t.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function r(o) {
      a.selection = { ...a.selection, rel: o.value }, t.emit("change", o.name, a.selection, o.lang, o.index);
    }
    return U(() => {
      a.selection = e.value, t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: n,
      formatString: i,
      changeEvent: s,
      changeEventNested: r,
      getList: l
    };
  }
}), ai = { class: "record" }, li = { class: "single-entry" }, ri = ["value"], oi = ["disabled", "source"], ui = ["title"];
function di(e, t, n, i, a, l) {
  const s = ue("Wrapper_nested");
  return m(), p("div", ai, [
    u("div", li, [
      e.state.selection ? (m(), p("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, ri)) : (m(), p("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: t[0] || (t[0] = (...r) => e.changeEvent && e.changeEvent(...r))
      }, null, 40, oi)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), p("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: t[1] || (t[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, t[2] || (t[2] = [
        u("sl-icon", {
          slot: "prefix",
          name: "x-lg"
        }, null, -1)
      ]), 8, ui)) : w("", !0)
    ]),
    e.bone.using ? (m(), V(s, {
      key: 0,
      value: e.value,
      name: e.name,
      index: e.index,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "bone", "disabled", "onChange"])) : w("", !0)
  ]);
}
const st = /* @__PURE__ */ I(ii, [["render", di], ["__scopeId", "data-v-d0aa8c6a"]]), ci = P({
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
    const n = N("boneState"), i = E({});
    function a(l, s) {
      t.emit("change", e.name, l, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), mi = { class: "box" };
function fi(e, t, n, i, a, l) {
  return m(), p("div", mi, j(e.value), 1);
}
const hi = /* @__PURE__ */ I(ci, [["render", fi], ["__scopeId", "data-v-5b6fa95d"]]), gi = P({
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
    const n = N("boneState"), i = W(), a = E({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    U(() => {
      t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function l() {
      console.log(B.downloadUrlFor(e.value)), window.open(B.downloadUrlFor(e.value));
    }
    function s() {
      return B.downloadUrlFor(e.value, !1);
    }
    function r(f) {
      const h = {
        fileName: f.name,
        mimeType: f.type || "application/octet-stream",
        size: f.size.toString()
      };
      return new Promise((g, c) => {
        B.securePost("/vi/file/getUploadURL", { dataObj: h }).then(async (v) => {
          let y = await v.json();
          fetch(y.values.uploadUrl, {
            body: f,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const $ = {
              key: y.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost("/vi/file/add", { dataObj: $ }).then(async (S) => {
              let x = await S.json();
              x.action === "addSuccess" ? g(x.values) : c(x);
            }).catch((S) => {
              c(S);
            });
          }).catch((b) => {
            c(b);
          });
        }).catch((v) => {
          c(v);
        });
      });
    }
    async function o(f) {
      a.loading = !0;
      for (let h of f.target.files) {
        let g = await r(h);
        i.value.value = null, t.emit("change", e.name, { dest: g, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function d(f) {
      a.loading = !0, a.droparea = !1;
      for (let h of f.dataTransfer.files) {
        let g = await r(h);
        i.value.value = null, t.emit("change", e.name, { dest: g, rel: null }, e.lang, e.index);
        break;
      }
      a.loading = !1;
    }
    return {
      state: a,
      boneState: n,
      downloadFile: l,
      createBackgroundImage: s,
      handleUpload: o,
      uploadinput: i,
      handleDrop: d
    };
  }
}), pi = {
  key: 0,
  class: "loader"
}, bi = {
  key: 1,
  class: "droparea"
}, vi = ["title"], yi = ["multiple"], $i = ["title"], Si = { class: "box" }, wi = ["src"], ki = ["label", "open"], _i = ["src"], Ci = {
  key: 1,
  class: "preview"
}, Ei = {
  key: 0,
  name: "file-earmark"
}, Ii = { key: 2 }, Ai = ["title"];
function Oi(e, t, n, i, a, l) {
  var s, r, o, d, f, h, g, c, v, y;
  return m(), p("div", {
    class: "file-wrapper",
    onDragover: t[5] || (t[5] = we((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: t[6] || (t[6] = (b) => e.state.droparea = !1),
    onDrop: t[7] || (t[7] = we((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (m(), p("div", pi, t[8] || (t[8] = [
      u("sl-spinner", { slot: "suffix" }, null, -1)
    ]))) : w("", !0),
    e.state.droparea ? (m(), p("div", bi, " Dateien hier hinziehen ")) : w("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), p("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: t[0] || (t[0] = (b) => e.uploadinput.click())
    }, t[9] || (t[9] = [
      u("sl-icon", { name: "upload" }, null, -1)
    ]), 8, vi)) : w("", !0),
    u("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: t[1] || (t[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, yi),
    e.value ? (m(), p("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: t[2] || (t[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, t[10] || (t[10] = [
      u("sl-icon", {
        slot: "prefix",
        name: "download"
      }, null, -1)
    ]), 8, $i)) : w("", !0),
    u("div", Si, [
      (r = (s = e.value) == null ? void 0 : s.dest) != null && r.mimetype.includes("image") ? (m(), p("div", {
        key: 0,
        class: "preview has-preview",
        onClick: t[3] || (t[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        u("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, wi),
        u("sl-dialog", {
          label: decodeURIComponent((d = (o = e.value) == null ? void 0 : o.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          u("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, _i)
        ], 8, ki)
      ])) : (m(), p("div", Ci, [
        (h = (f = e.value) == null ? void 0 : f.dest) != null && h.name ? (m(), p("sl-icon", Ei)) : w("", !0)
      ])),
      (c = (g = e.value) == null ? void 0 : g.dest) != null && c.name ? (m(), p("div", Ii, j(decodeURIComponent((y = (v = e.value) == null ? void 0 : v.dest) == null ? void 0 : y.name)), 1)) : w("", !0)
    ]),
    e.boneState.multiple ? w("", !0) : (m(), p("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: t[4] || (t[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, t[11] || (t[11] = [
      u("sl-icon", { name: "x-lg" }, null, -1)
    ]), 8, Ai))
  ], 32);
}
const it = /* @__PURE__ */ I(gi, [["render", Oi], ["__scopeId", "data-v-64b3e67e"]]), ji = P({
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
    const n = N("boneState"), i = E({
      value: "",
      editorConfig: {},
      editor: O(() => qe)
    });
    function a(r) {
      t.emit("change", e.name, i.value, e.lang, e.index);
    }
    function l(r) {
      i.value = r.target.value, t.emit("change", e.name, i.value, e.lang, e.index);
    }
    U(() => {
      e.value !== null && (i.value = e.value), t.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(r) {
      r.editing.view.change((d) => {
        d.setStyle("min-height", "250px", r.editing.view.document.getRoot());
      });
      const o = r.plugins.get("SourceEditing");
      o.on("change:isSourceEditingMode", (d, f, h) => {
        var g, c;
        h && ((c = (g = r.editing.view.getDomRoot()) == null ? void 0 : g.nextSibling) == null ? void 0 : c.firstChild).addEventListener("focusout", (y) => {
          o.isSourceEditingMode = !1;
        });
      });
    }
    return be(
      () => e.value,
      (r, o) => {
        r ? i.value = r : i.value = "";
      }
    ), {
      state: i,
      ClassicEditor: qe,
      boneState: n,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: l
    };
  }
}), Bi = ["disabled", "value"];
function Ni(e, t, n, i, a, l) {
  var r, o, d, f;
  const s = ue("ckeditor");
  return e.state.editor ? (m(), p(C, { key: 0 }, [
    (r = e.boneState.bonestructure) != null && r.valid_html || (o = e.boneState.bonestructure) != null && o.validHtml ? (m(), V(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": t[0] || (t[0] = (h) => e.state.value = h),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), p("sl-textarea", {
      key: 1,
      disabled: (f = e.boneState) == null ? void 0 : f.readonly,
      value: e.value,
      onInput: t[1] || (t[1] = (...h) => e.changeEventTextarea && e.changeEventTextarea(...h))
    }, null, 40, Bi))
  ], 64)) : w("", !0);
}
const at = /* @__PURE__ */ I(ji, [["render", Ni]]), Ri = P({
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
    const n = N("boneState"), i = E({
      valueLat: null,
      valueLng: null
    });
    function a() {
      t.emit("change", e.name, [i.valueLat, i.valueLng], e.lang, e.index);
    }
    return U(() => {
      try {
        i.valueLat = e.value[0], i.valueLng = e.value[1];
      } catch {
      }
      t.emit("change", e.name, [i.valueLat, i.valueLng], e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), xi = ["name", "min", "max", "disabled"], Ti = ["name", "min", "max", "disabled"];
function Ui(e, t, n, i, a, l) {
  return m(), p(C, null, [
    ne(u("sl-input", {
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
    }, null, 40, xi), [
      [ge, e.state.valueLat]
    ]),
    ne(u("sl-input", {
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
    }, null, 40, Ti), [
      [ge, e.state.valueLng]
    ])
  ], 64);
}
const lt = /* @__PURE__ */ I(Ri, [["render", Ui], ["__scopeId", "data-v-54369cfc"]]), Di = P({
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
    const n = N("boneState"), i = E({
      value: O(() => "" + ![!1, null, void 0, "", "false"].includes(e.value))
    });
    function a(l) {
      t.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return U(() => {
      let l = e.value;
      l || (l = !1), t.emit("change", e.name, l, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), Pi = ["disabled", "value"], Vi = ["value"];
function Li(e, t, n, i, a, l) {
  return m(), p("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    "max-options-visible": "0",
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(), p(C, null, D([!0, !1], (s) => u("sl-option", {
      key: s,
      value: s
    }, [
      s ? (m(), p(C, { key: 0 }, [
        R(j(e.$t("bones.bool.true")), 1)
      ], 64)) : (m(), p(C, { key: 1 }, [
        R(j(e.$t("bones.bool.false")), 1)
      ], 64))
    ], 8, Vi)), 64))
  ], 40, Pi);
}
const rt = /* @__PURE__ */ I(Di, [["render", Li], ["__scopeId", "data-v-7d0f49c8"]]), Fi = P({
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
    const n = N("boneState"), i = E({
      value: O(() => "" + ![!1, null, void 0, "", "false"].includes(e.value))
    });
    function a(l) {
      console.log(l.target.value), t.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return U(() => {
      let l = e.value;
      l || (l = !1), t.emit("change", e.name, l, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: a
    };
  }
}), qi = ["value"], zi = ["disabled"], Mi = ["disabled"];
function Wi(e, t, n, i, a, l) {
  return m(), p("sl-radio-group", {
    value: e.state.value,
    onSlChange: t[0] || (t[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    u("sl-radio", {
      value: "true",
      disabled: e.boneState.readonly
    }, j(e.$t("bones.bool.true")), 9, zi),
    u("sl-radio", {
      value: "false",
      disabled: e.boneState.readonly
    }, j(e.$t("bones.bool.false")), 9, Mi)
  ], 40, qi);
}
const ot = /* @__PURE__ */ I(Fi, [["render", Wi], ["__scopeId", "data-v-0e0a6aa6"]]), Ki = P({
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
    const n = N("boneState"), i = E({
      value: O(() => {
        let r = e.value;
        return Array.isArray(e.value) ? (n.bonestructure.values instanceof Array ? r = r.filter((o) => n.bonestructure.values.map((d) => d[0].toString()).includes(o)) : r = r.filter(
          (o) => Object.keys(n.bonestructure.values).map((d) => d.toString()).includes(o)
        ), r.map((o) => o.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function a() {
      if (Array.isArray(n.bonestructure.values))
        return n.bonestructure.values;
      {
        let r = [];
        for (const [o, d] of Object.entries(n.bonestructure.values))
          r.push([o, d]);
        return r;
      }
    }
    function l(r) {
      let o = [...i.value];
      r.target.checked ? o.push(r.target.dataset.value) : o = o.filter((d) => d !== r.target.dataset.value), t.emit("change", e.name, o, e.lang, e.index);
    }
    function s(r) {
      t.emit("change", e.name, r.target.value, e.lang, e.index);
    }
    return U(() => {
      t.emit("change", e.name, i.value, e.lang, e.index);
    }), {
      state: i,
      boneState: n,
      changeEvent: s,
      changeEventMultiple: l,
      convertObjToList: a
    };
  }
}), Hi = {
  key: 0,
  class: "wrapper-multiple"
}, Gi = ["data-value", "checked", "disabled"], Zi = ["value"], Ji = ["value", "disabled"];
function Qi(e, t, n, i, a, l) {
  return e.boneState.bonestructure.multiple ? (m(), p("div", Hi, [
    (m(!0), p(C, null, D(e.convertObjToList(), (s) => (m(), p("sl-checkbox", {
      "data-value": s[0],
      checked: e.state.value.includes(s[0]),
      disabled: e.boneState.readonly,
      onSlChange: t[0] || (t[0] = (...r) => e.changeEventMultiple && e.changeEventMultiple(...r))
    }, j(s[1]), 41, Gi))), 256))
  ])) : (m(), p("sl-radio-group", {
    key: 1,
    value: e.state.value,
    onSlChange: t[1] || (t[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), p(C, null, D(e.convertObjToList(), (s) => (m(), p("sl-radio", {
      value: s[0],
      disabled: e.boneState.readonly
    }, j(s[1]), 9, Ji))), 256))
  ], 40, Zi));
}
const ut = /* @__PURE__ */ I(Ki, [["render", Qi], ["__scopeId", "data-v-63aa8bd2"]]), Xi = P({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone: Object
  },
  components: { Wrapper_nested: Ve },
  emits: ["change"],
  setup(e, t) {
    const n = N("boneState"), i = N("formatString"), a = E({
      format: O(() => n == null ? void 0 : n.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function l(o) {
      let d = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/vi/${n.bonestructure.module}/list?${d}limit=99`
      ).then(async (f) => {
        var g;
        const h = await f.json();
        a.skellistdata = {};
        for (let c of h.skellist)
          a.skellistdata[c.key] = c;
        return (g = h.skellist) == null ? void 0 : g.map((c) => ({ text: i(n.bonestructure.format, { dest: c }), value: c.key, data: c }));
      });
    }
    function s(o) {
      a.selection = { dest: a.skellistdata[o.target.value] }, t.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function r(o) {
      a.selection = { ...a.selection, rel: o.value }, t.emit("change", o.name, a.selection, o.lang, o.index);
    }
    return U(() => {
      a.selection = e.value, l(), t.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: n,
      formatString: i,
      changeEvent: s,
      changeEventNested: r,
      getList: l
    };
  }
}), Yi = { class: "record" }, ea = { class: "single-entry" }, ta = ["disabled", "value"], na = ["value"];
function sa(e, t, n, i, a, l) {
  var r;
  const s = ue("Wrapper_nested");
  return m(), p("div", Yi, [
    u("div", ea, [
      u("sl-select", {
        disabled: e.boneState.readonly,
        value: (r = e.state.selection) == null ? void 0 : r.dest.key,
        hoist: "",
        "max-options-visible": "0",
        clearable: "",
        onSlChange: t[0] || (t[0] = (...o) => e.changeEvent && e.changeEvent(...o))
      }, [
        (m(!0), p(C, null, D(e.state.skellistdata, (o, d) => (m(), p("sl-option", {
          key: d,
          value: d
        }, j(e.formatString(e.state.format, o)), 9, na))), 128))
      ], 40, ta)
    ]),
    e.bone.using ? (m(), V(s, {
      key: 0,
      value: e.value,
      name: e.name,
      index: e.index,
      bone: e.bone,
      disabled: e.bone.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "bone", "disabled", "onChange"])) : w("", !0)
  ]);
}
const dt = /* @__PURE__ */ I(Xi, [["render", sa], ["__scopeId", "data-v-e34665de"]]), ia = P({
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
    const n = N("boneState"), i = E({
      counter: 0,
      debounce: null
    }), a = N("addMultipleEntry"), l = N("removeMultipleEntries");
    function s() {
      i.counter += 1;
      let o = 200;
      i.counter > 1 && (o = 500), i.debounce && clearTimeout(i.debounce), i.debounce = setTimeout(() => {
        for (let d = i.counter; d--; )
          a(e.lang);
        i.counter = 0;
      }, o);
    }
    function r() {
      let o = 200;
      i.debounce && clearTimeout(i.debounce), i.debounce = setTimeout(() => {
        l(e.lang);
      }, o);
    }
    return U(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: i,
      boneState: n,
      handleAdd: s,
      handleRemove: r,
      removeMultipleEntries: l
    };
  }
}), aa = { class: "actionbar" }, la = ["title"], ra = ["title"];
function oa(e, t, n, i, a, l) {
  return m(), p("div", aa, [
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.delAll"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (s) => e.handleRemove(e.lang))
    }, j(e.$t("bone.delAll")), 9, la)) : w("", !0),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: t[1] || (t[1] = (s) => e.handleAdd(e.lang))
    }, [
      t[2] || (t[2] = u("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)),
      R(" " + j(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), p(C, { key: 0 }, [
        R("(" + j(e.state.counter) + ")", 1)
      ], 64)) : w("", !0)
    ], 8, ra)) : w("", !0)
  ]);
}
const ua = /* @__PURE__ */ I(ia, [["render", oa], ["__scopeId", "data-v-3767fe4b"]]), da = P({
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
    const n = N("boneState"), i = N("addMultipleEntry"), a = N("formatString"), l = null, s = E({
      skels: {},
      hasUsing: O(() => n == null ? void 0 : n.bonestructure.using)
    });
    function r(o) {
      let d = "";
      return n.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : n.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/vi/${n.bonestructure.module}/list?${d}limit=99`
      ).then(async (f) => {
        var g;
        const h = await f.json();
        return s.skels = h.skellist.reduce((c, v) => (c[v.key] = v, c), {}), (g = h.skellist) == null ? void 0 : g.map((c) => ({ text: a(n.bonestructure.format, { dest: c }), value: c.key, data: c }));
      });
    }
    return U(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: n,
      addMultipleEntry: i,
      removeMultipleEntries: l,
      getList: r
    };
  }
}), ca = { class: "actionbar" }, ma = ["title"], fa = ["source"], ha = ["title"];
function ga(e, t, n, i, a, l) {
  return m(), p("div", ca, [
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (s) => e.openSelector())
    }, t[3] || (t[3] = [
      u("sl-icon", {
        slot: "prefix",
        name: "x-lg"
      }, null, -1)
    ]), 8, ma)) : w("", !0),
    u("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: t[1] || (t[1] = (s) => {
        var r;
        return e.addMultipleEntry(e.lang, {
          dest: (r = e.state.skels) == null ? void 0 : r[s.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, fa),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: t[2] || (t[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      t[4] || (t[4] = u("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)),
      R(" " + j(e.$t("bone.list")), 1)
    ], 8, ha)) : w("", !0)
  ]);
}
const pa = /* @__PURE__ */ I(da, [["render", ga], ["__scopeId", "data-v-f9a556f3"]]), ba = P({
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
    const n = N("boneState"), i = N("addMultipleEntry");
    N("formatString");
    const a = null, l = W(), s = E({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: O(() => n == null ? void 0 : n.bonestructure.using)
    });
    function r(f) {
      const h = {
        fileName: f.name,
        mimeType: f.type || "application/octet-stream",
        size: f.size.toString()
      };
      return new Promise((g, c) => {
        B.securePost("/vi/file/getUploadURL", { dataObj: h }).then(async (v) => {
          let y = await v.json();
          fetch(y.values.uploadUrl, {
            body: f,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const $ = {
              key: y.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost("/vi/file/add", { dataObj: $ }).then(async (S) => {
              let x = await S.json();
              x.action === "addSuccess" ? g(x.values) : c(x);
            }).catch((S) => {
              c(S);
            });
          }).catch((b) => {
            c(b);
          });
        }).catch((v) => {
          c(v);
        });
      });
    }
    async function o(f) {
      s.loading = !0;
      for (let h of f.target.files) {
        let g = await r(h);
        l.value.value = null;
        let c = null;
        s.hasUsing && (c = void 0), i(e.lang, { dest: g, rel: c });
      }
      s.loading = !1;
    }
    async function d(f) {
      s.loading = !0, s.droparea = !1;
      for (let h of f.dataTransfer.files) {
        let g = await r(h);
        l.value.value = null;
        let c = null;
        s.hasUsing && (c = void 0), i(e.lang, { dest: g, rel: c });
      }
      s.loading = !1;
    }
    return U(() => {
      (!e.value || e.value.length === 0) && t.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: n,
      addMultipleEntry: i,
      removeMultipleEntries: a,
      uploadFile: r,
      uploadinput: l,
      handleUpload: o,
      handleDrop: d
    };
  }
}), va = ["title"], ya = {
  key: 1,
  class: "droparea"
}, $a = ["multiple"], Sa = ["title"], wa = ["title"], ka = {
  key: 0,
  slot: "suffix"
};
function _a(e, t, n, i, a, l) {
  return m(), p("div", {
    class: "actionbar",
    onDragover: t[4] || (t[4] = we((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: t[5] || (t[5] = (s) => e.state.droparea = !1),
    onDrop: t[6] || (t[6] = we((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: t[0] || (t[0] = (s) => e.openSelector())
    }, t[7] || (t[7] = [
      u("sl-icon", {
        slot: "prefix",
        name: "x-lg"
      }, null, -1)
    ]), 8, va)) : w("", !0),
    e.state.droparea ? (m(), p("div", ya, " Dateien hier hinziehen ")) : w("", !0),
    u("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: t[1] || (t[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, $a),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: t[2] || (t[2] = (s) => e.addMultipleEntry(e.lang))
    }, t[8] || (t[8] = [
      u("sl-icon", {
        slot: "prefix",
        name: "plus-lg"
      }, null, -1)
    ]), 8, Sa)) : w("", !0),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: t[3] || (t[3] = (s) => e.uploadinput.click())
    }, [
      t[9] || (t[9] = u("sl-icon", { name: "upload" }, null, -1)),
      R(" " + j(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), p("sl-spinner", ka)) : w("", !0)
    ], 8, wa)) : w("", !0)
  ], 32);
}
const Ca = /* @__PURE__ */ I(ba, [["render", _a], ["__scopeId", "data-v-3c1b10df"]]), Ea = xe("boneStore", () => {
  const e = E({
    additionalBones: Z({}),
    defaultBones: Z({
      rawBone: We,
      keyBone: Ke,
      stringBone: Ge,
      emailBone: Ze,
      dateBone: Je,
      booleanBone: Xe,
      selectBone: Qe,
      passwordBone: Ye,
      recordBone: et,
      numericBone: nt,
      colorBone: tt,
      relationalBone: st,
      jsonBone: hi,
      fileBone: it,
      textBone: at,
      spatialBone: lt,
      booleanBoneSelect: rt,
      booleanBoneChoose: ot,
      selectBoneChoose: ut,
      relationalBoneSelect: dt
    }),
    actionbars: Z({
      "relational.tree.leaf.file.file": Ca,
      "relational.": pa
    }),
    multibones: Z(["select", "select."])
  });
  function t(s, r) {
    e.additionalBones[s] = r;
  }
  function n() {
    let s = e.defaultBones;
    for (const [r, o] of Object.entries(e.additionalBones))
      s.add(o);
    return s;
  }
  function i(s) {
    if (Object.keys(e.additionalBones).includes(s))
      return e.additionalBones[s];
    {
      let r = s.split("."), o = Object.entries(e.additionalBones).filter(
        (d) => d[0].startsWith(r[0] + ".")
      );
      if (o.length > 0) {
        o.sort((d, f) => f.length - d.length);
        for (let d of o)
          if (s.startsWith(d[0]))
            return e.additionalBones[d[0]];
      }
    }
    return s === "date" ? Je : s === "key" ? Ke : s === "str.email" ? Ze : s === "str" || s.startsWith("str.") ? Ge : s === "select.choose" ? ut : s === "select" || s.startsWith("select.") ? Qe : s === "bool.choose" ? ot : s === "bool.select" ? rt : s === "bool" || s.startsWith("bool.") ? Xe : s === "password" ? Ye : s === "record" ? et : s === "numeric" || s.startsWith("numeric.") ? nt : s === "relational.tree.leaf.file.file" ? it : s === "relational.select" || s.startsWith("relational.select.") ? dt : s === "relational" || s.startsWith("relational.") ? st : s === "color" ? tt : s === "text" ? at : s === "spatial" ? lt : We;
  }
  function a(s, r) {
    e.actionbars[s] = r;
  }
  function l(s) {
    if (Object.keys(e.actionbars).includes(s))
      return e.actionbars[s];
    {
      let r = s.split("."), o = Object.entries(e.actionbars).filter(
        (d) => d[0].startsWith(r[0] + ".")
      );
      if (o.length > 0) {
        o.sort((d, f) => f.length - d.length);
        for (let d of o)
          if (s.startsWith(d[0]))
            return e.actionbars[d[0]];
      }
    }
    return ua;
  }
  return {
    state: e,
    addBoneWidget: t,
    getBoneWidget: i,
    importWidgets: n,
    addBoneActionbar: a,
    getBoneActionbar: l
  };
});
function le(e) {
  return Ea().getBoneWidget(e);
}
const Ia = { class: "viur-shop-form-wrap" }, Aa = { class: "viur-shop-form-wrap" }, Oa = { key: 0 }, ja = { class: "viur-shop-form-wrap" }, Ba = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const t = se(), n = E({
      formValues: {},
      requiredFieldsFilled: O(() => {
        if (n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("billing.city") && Object.keys(n.formValues).includes("billing.street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
        if (!n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      addSkel: null,
      errors: {}
    });
    function i(s) {
      n.isCustomAdress = !s.target.checked;
    }
    function a(s, r) {
      for (const [o, d] of Object.entries(r.value[0]))
        n.formValues[o] = d;
    }
    function l(s) {
      let r = {};
      return Array.isArray(s) ? (s.forEach((o) => {
        let d = o[0], f = o[1];
        r[d] = f;
      }), console.log("output", r), r) : s;
    }
    return be(n.formValues, (s) => {
      Object.entries(s).forEach(([r, o]) => {
        o === "" && delete n.formValues[r];
      });
    }), Q(async () => {
      await t.getAddressStructure(), await t.getAddress(), n.addSkel = l(t.state.structure.address), n.formValues = t.state.shippingAddress;
    }), (s, r) => {
      const o = ue("bone");
      return m(), p(C, null, [
        u("div", null, [
          r[0] || (r[0] = u("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)),
          u("div", Ia, [
            (m(!0), p(C, null, D(n.addSkel, (d, f) => (m(), p(C, { key: f }, [
              d.visible && d.params.group === "Customer Info" ? (m(), p("div", {
                key: 0,
                class: J("viur-shop-form-bone-" + f)
              }, [
                d.visible && d.params.group === "Customer Info" ? (m(), V(o, {
                  key: 0,
                  is: L(le)(d.type),
                  name: f,
                  structure: l(n.addSkel),
                  errors: n.errors[f] ? n.errors[f] : [],
                  skel: n.formValues,
                  onChange: (h) => a(f, h),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : w("", !0)
              ], 2)) : w("", !0)
            ], 64))), 128))
          ])
        ]),
        u("div", null, [
          r[1] || (r[1] = u("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)),
          u("div", Aa, [
            (m(!0), p(C, null, D(n.addSkel, (d, f) => (m(), p(C, { key: f }, [
              d.visible && d.params.group === "Customer Address" ? (m(), p("div", {
                key: 0,
                class: J("viur-shop-form-bone-" + f)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), V(o, {
                  key: 0,
                  is: L(le)(d.type),
                  name: f,
                  structure: l(n.addSkel),
                  errors: n.errors[f] ? n.errors[f] : [],
                  skel: n.formValues,
                  onChange: (h) => a(f, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : w("", !0)
              ], 2)) : w("", !0)
            ], 64))), 128))
          ])
        ]),
        n.isCustomAdress ? (m(), p("div", Oa, [
          r[2] || (r[2] = u("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)),
          u("div", ja, [
            (m(!0), p(C, null, D(n.addSkel, (d, f) => (m(), p(C, { key: f }, [
              d.visible && d.params.group === "Customer Address" ? (m(), p("div", {
                key: 0,
                class: J("viur-shop-form-bone-" + f)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), V(o, {
                  key: 0,
                  is: L(le)(d.type),
                  name: f,
                  structure: l(n.addSkel),
                  errors: n.errors[f] ? n.errors[f] : [],
                  skel: n.formValues,
                  onChange: (h) => a(f, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : w("", !0)
              ], 2)) : w("", !0)
            ], 64))), 128))
          ])
        ])) : w("", !0),
        u("sl-checkbox", {
          onSlChange: i,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Na = /* @__PURE__ */ I(Ba, [["__scopeId", "data-v-4d14c6fe"]]), Ra = { class: "viur-shop-form-wrap" }, xa = ["onSlChange", "onSlClear", "label"], Ta = ["value"], Ua = { key: 0 }, Da = { class: "viur-shop-form-wrap" }, Pa = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const t = se(), n = E({
      formValues: {},
      requiredFieldsFilled: O(() => {
        if (n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("billing.city") && Object.keys(n.formValues).includes("billing.street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
        if (!n.isCustomAdress)
          return Object.keys(n.formValues).includes("city") && Object.keys(n.formValues).includes("street") && Object.keys(n.formValues).includes("email") && Object.keys(n.formValues).includes("firstname") && Object.keys(n.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      shippingAdressAmount: 1,
      maxShippingAdress: O(
        () => Object.keys(t.state.carts).length + 2
      ),
      amountAlert: { title: "", msg: "" },
      items: null,
      addSkel: null,
      errors: {},
      selectedItem: {},
      isInit: O(() => !!t.state.carts[t.state.basket])
    }), i = W(null), a = W(null);
    function l(g) {
      g.target.checked && (n.isCustomAdress = !1), g.target.checked || (n.isCustomAdress = !0);
    }
    function s() {
      if (n.shippingAdressAmount === n.maxShippingAdress) {
        n.amountAlert.title = "Zu viele Lieferadressen", n.amountAlert.msg = `Sie können nur maximal: "${n.maxShippingAdress}" Lieferadressen verwenden.`, a.value.show();
        return;
      }
      n.shippingAdressAmount += 1;
    }
    function r(g, c) {
      for (const [v, y] of Object.entries(c.value[0]))
        n.formValues[v] = y;
    }
    function o() {
      if (n.shippingAdressAmount === 1) {
        n.amountAlert.title = "Zu wenig Lieferadressen", n.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      n.shippingAdressAmount -= 1;
    }
    function d(g, c) {
      if (console.log(g.target.value), !g.target.value.length) {
        f();
        return;
      }
      n.selectedItem[c] = g.target.value, n.isItemSelected = !0;
    }
    function f(g, c) {
      console.log("clearing..."), delete n.selectedItem[c], n.isItemSelected = !1;
    }
    function h(g) {
      let c = {};
      return Array.isArray(g) ? (g.forEach((v) => {
        let y = v[0], b = v[1];
        c[y] = b;
      }), c) : g;
    }
    return be(n.formValues, (g) => {
      Object.entries(g).forEach(([c, v]) => {
        v === "" && delete n.formValues[c];
      });
    }), Q(async () => {
      await t.getAddressStructure(), n.addSkel = h(t.state.structure.address);
    }), (g, c) => {
      const v = ue("bone");
      return m(), p(C, null, [
        u("div", null, [
          c[0] || (c[0] = u("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)),
          u("div", Ra, [
            (m(!0), p(C, null, D(n.addSkel, (y, b) => (m(), p(C, { key: b }, [
              y.visible && y.params.group === "Customer Info" ? (m(), p("div", {
                key: 0,
                class: J("viur-shop-form-bone-" + b)
              }, [
                y.visible && y.params.group === "Customer Info" ? (m(), V(v, {
                  key: 0,
                  is: L(le)(y.type),
                  name: b,
                  structure: h(n.addSkel),
                  errors: n.errors[b] ? n.errors[b] : [],
                  skel: n.formValues,
                  onChange: ($) => r(b, $)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : w("", !0)
              ], 2)) : w("", !0)
            ], 64))), 128))
          ])
        ]),
        c[6] || (c[6] = u("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)),
        (m(!0), p(C, null, D(n.shippingAdressAmount, (y) => (m(), p("div", {
          class: "viur-shop-form-wrap",
          key: y
        }, [
          u("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: i,
            onSlChange: (b) => d(b, y),
            onSlClear: (b) => f(b, y),
            label: n.selectedItem[y] ? L(t).state.carts[n.selectedItem[y]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), p(C, null, D(L(t).state.carts, (b, $) => (m(), p("sl-option", { value: $ }, j(b.info.name), 9, Ta))), 256))
          ], 40, xa),
          (m(!0), p(C, null, D(n.addSkel, (b, $) => (m(), p(C, { key: $ }, [
            b.visible && b.params.group === "Customer Address" ? (m(), p("div", {
              key: 0,
              class: J("viur-shop-form-bone-" + $)
            }, [
              b.visible && b.params.group === "Customer Address" ? (m(), V(v, {
                key: 0,
                is: L(le)(b.type),
                name: $,
                structure: h(n.addSkel),
                errors: n.errors[$] ? n.errors[$] : [],
                skel: n.formValues,
                onChange: (S) => r($, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : w("", !0)
            ], 2)) : w("", !0)
          ], 64))), 128))
        ]))), 128)),
        n.isCustomAdress ? (m(), p("div", Ua, [
          c[1] || (c[1] = u("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)),
          u("div", Da, [
            (m(!0), p(C, null, D(n.addSkel, (y, b) => (m(), p(C, { key: b }, [
              y.visible && y.params.group === "Customer Address" ? (m(), p("div", {
                key: 0,
                class: J("viur-shop-form-bone-" + b)
              }, [
                y.visible && y.params.group === "Customer Address" ? (m(), V(v, {
                  key: 0,
                  is: L(le)(y.type),
                  name: b,
                  structure: h(n.addSkel),
                  errors: n.errors[b] ? n.errors[b] : [],
                  skel: n.formValues,
                  onChange: ($) => r(b, $)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : w("", !0)
              ], 2)) : w("", !0)
            ], 64))), 128))
          ])
        ])) : w("", !0),
        u("div", { class: "viur-shop-form-btn-wrap" }, [
          u("sl-button", {
            size: "medium",
            onClick: o,
            title: "Lieferadresse entfernen"
          }, c[2] || (c[2] = [
            u("sl-icon", {
              name: "x-lg",
              slot: "prefix"
            }, null, -1)
          ])),
          u("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, c[3] || (c[3] = [
            u("sl-icon", {
              name: "plus-lg",
              slot: "prefix"
            }, null, -1),
            R(" Lieferadresse hinzufügen ")
          ]))
        ]),
        u("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: a,
          closable: ""
        }, [
          c[4] || (c[4] = u("sl-icon", {
            slot: "icon",
            name: "exclamation-triangle"
          }, null, -1)),
          u("strong", null, j(n.amountAlert.title), 1),
          c[5] || (c[5] = u("br", null, null, -1)),
          R(" " + j(n.amountAlert.msg), 1)
        ], 512),
        u("sl-checkbox", {
          onSlChange: l,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Va = /* @__PURE__ */ I(Pa, [["__scopeId", "data-v-c4232b7a"]]), La = {
  __name: "ExampleUsage",
  setup(e) {
    const t = se(), n = O(
      () => t.state.basketRootNode.key ? t.state.basketRootNode.key : ""
    ), i = E({
      rootNode: {},
      tabs: {
        cart: {
          component: Z(Be),
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
          component: Z(mt),
          props: {},
          displayName: "Bestellung prüfen",
          // icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1
        },
        orderComplete: {
          component: Z(Yn),
          props: {
            redirectUrl: "http://localhost:8081",
            additionalComponents: [
              {
                component: Z(Be),
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
          component: Z(Na),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1
        },
        userInfoMulti: {
          component: Z(Va),
          props: {},
          displayName: "Daten Eingeben (Multi)",
          icon: { name: "card-list" },
          position: 4,
          disabled: !1
        }
      }
    });
    function a(l) {
      (l == null ? void 0 : l.detail.name) === "confirm" && (i.tabs.orderComplete.disabled = !1);
    }
    return Q(async () => {
      await t.init(), await t.getAddressStructure(), console.log("debug init exampleusage :", t.state.basketRootNode);
    }), (l, s) => (m(), V(bn, {
      tabs: i.tabs,
      onTabChange: a,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, Fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: La
}, Symbol.toStringTag, { value: "Module" })), qa = ["id", "selected"], za = { slot: "footer" }, Ma = {
  __name: "SelectPaymentProvider",
  setup(e) {
    const t = se();
    function n(i) {
      i.target.selected ? (console.log("a", t.state.selectedPaymentProvider), console.log("b", t.state.paymentProviders), t.state.selectedPaymentProvider = t.state.paymentProviders[i.target.id.replace("povider__", "")], console.log(t.state.selectedPaymentProvider), document.querySelectorAll("sl-card").forEach((a) => {
        a !== i.target && (a.selected = !1);
      })) : i.target.selected = !0, console.log("provider changed", i);
    }
    return Q(async () => {
      await t.payment_providers_list();
    }), (i, a) => (m(!0), p(C, null, D(L(t).state.paymentProviders, (l, s, r) => (m(), p("div", null, [
      u("sl-card", {
        selectable: "",
        id: "povider__" + s,
        onSlChange: n,
        selected: r === 0
      }, [
        a[1] || (a[1] = u("img", {
          slot: "image",
          src: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
          alt: "A kitten sits patiently between a terracotta pot and decorative grasses."
        }, null, -1)),
        u("div", za, [
          R(j(l.title) + " ", 1),
          a[0] || (a[0] = u("br", null, null, -1)),
          R(" " + j(l.descr), 1)
        ])
      ], 40, qa)
    ]))), 256));
  }
}, el = /* @__PURE__ */ I(Ma, [["__scopeId", "data-v-d67cb5c9"]]), Wa = vt(), tl = {
  install(e) {
    e.use(Wa);
  }
};
export {
  Be as C,
  bn as S,
  Na as U,
  tl as V,
  I as _,
  La as a,
  mt as b,
  Ya as c,
  Yn as d,
  Va as e,
  el as f,
  se as u
};
