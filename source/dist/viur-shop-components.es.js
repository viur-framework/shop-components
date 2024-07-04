import { reactive as I, computed as v, useCssVars as K, openBlock as d, createBlock as C, Transition as G, withCtx as Z, createElementBlock as h, createElementVNode as e, createCommentVNode as R, pushScopeId as N, popScopeId as z, Fragment as $, createTextVNode as i, toDisplayString as y, onBeforeMount as q, withDirectives as U, vModelText as F, ref as M, renderList as B, createVNode as P, unref as k, Teleport as J, resolveDynamicComponent as L, mergeProps as Q, normalizeClass as X, vShow as Y, shallowRef as E } from "vue";
import { Request as A } from "@viur/vue-utils";
import { defineStore as ee } from "pinia";
import { ViURShopClient as te } from "@viur/viur-shop-client";
import "vue-router";
const x = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [p, s] of n)
    o[p] = s;
  return o;
}, T = {
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
  setup(t, n) {
    const o = I({
      trackWidth: v(() => `${t.size / 30}rem`),
      outerSize: v(() => `calc(${t.size}rem + ${o.trackWidth})`),
      spinnerSize: v(() => `${t.size}rem`),
      logoSize: v(() => `calc(${t.size}rem - ${o.trackWidth} * 10)`),
      shadow: v(() => `0px 0px ${t.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: o };
  }
}, W = () => {
  K((t) => ({
    "93747d92": t.state.outerSize,
    "284424e5": t.state.shadow,
    "6485ca5e": t.state.logoSize,
    "5d833915": t.state.spinnerSize,
    d5b3feca: t.color,
    "2050b700": t.state.trackWidth
  }));
}, j = T.setup;
T.setup = j ? (t, n) => (W(), j(t, n)) : W;
const se = (t) => (N("data-v-46c45785"), t = t(), z(), t), ae = {
  key: 0,
  class: "loading"
}, oe = /* @__PURE__ */ se(() => /* @__PURE__ */ e("sl-spinner", { class: "loader" }, null, -1)), ne = { class: "logo" }, re = ["src"];
function ie(t, n, o, p, s, u) {
  return d(), C(G, null, {
    default: Z(() => [
      o.active ? (d(), h("div", ae, [
        oe,
        e("div", ne, [
          e("sl-icon", { src: o.logo }, null, 8, re)
        ])
      ])) : R("", !0)
    ]),
    _: 1
  });
}
const le = /* @__PURE__ */ x(T, [["render", ie], ["__scopeId", "data-v-46c45785"]]), D = ee("cartstore", () => {
  const t = new te({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = I({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} }
  });
  async function o() {
    await s();
  }
  async function p(r) {
    return await t.cart_list({ cart_key: r });
  }
  async function s() {
    (await t.cart_list()).forEach((a) => {
      a.is_root_node && (a.cart_type === "basket" ? n.basketRootNode = a : n.whishlistRootNodes.push(a));
    });
  }
  async function u(r, a) {
    let c = await t.article_add({
      article_key: r,
      parent_cart_key: a
    });
    console.log("addToCart", c);
  }
  async function g(r, a) {
    let c = await t.article_view({
      article_key: r,
      parent_cart_key: a
    });
    console.log("getArticleView", c);
  }
  async function _(r, a) {
    let c = await t.article_remove({
      article_key: r,
      parent_cart_key: a
    });
    console.log("remove Resp", c);
  }
  async function f(r, a, c) {
    let l = await t.article_update({
      article_key: r,
      parent_cart_key: a,
      quantity: c,
      quantity_mode: "replace"
    });
    console.log("update Resp", l);
  }
  async function m() {
    let r = await t.address_structure();
    n.structure.address = r.addSkel, console.log("adress add", n.structure.address);
  }
  return {
    state: n,
    addToCart: u,
    getArticleView: g,
    removeItem: _,
    updateItem: f,
    init: o,
    getAdressStructure: m,
    getChildren: p
  };
}), ce = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(t) {
    return I({}), (n, o) => (d(), h($, null, [
      i(" cartnode "),
      e("pre", null, y(t.node.name), 1)
    ], 64));
  }
}, V = (t) => (N("data-v-0e24135f"), t = t(), z(), t), de = {
  horizontal: "",
  class: "viur-shop-cart-card"
}, ue = ["src"], he = {
  class: "viur-shop-cart-card-header",
  slot: "header"
}, pe = { class: "viur-shop-cart-card-headline headline" }, _e = { class: "viur-shop-cart-card-body-row" }, me = { class: "viur-shop-cart-card-body-info" }, fe = /* @__PURE__ */ V(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-card-descr" }, [
  /* @__PURE__ */ i(" Version: 900x900x2000 "),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Farbe: Chromoptik "),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Glasart: Klar hell mit Edelglasbeschichtung"),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Anschlag: Beidseitig variabel"),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Griff: Stangengriff Exklusiv (56) ")
], -1)), be = { class: "viur-shop-cart-card-body-footer" }, ve = /* @__PURE__ */ V(() => /* @__PURE__ */ e("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-cart-card-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ e("sl-icon", {
    name: "heart",
    slot: "prefix"
  })
], -1)), ye = /* @__PURE__ */ V(() => /* @__PURE__ */ e("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), ge = [
  ye
], ke = { class: "viur-shop-cart-card-body-amount" }, we = {
  class: "viur-shop-cart-card-price-wrap",
  slot: "footer"
}, $e = /* @__PURE__ */ V(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-card-price-label" }, "Preis", -1)), Ie = { class: "viur-shop-cart-card-price" }, Se = /* @__PURE__ */ V(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-card-small-print" }, "Brutto / Stk.", -1)), Ce = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(t, { emit: n }) {
    const o = t, p = n, s = I({
      leaf: {}
    });
    function u(f) {
      return f !== void 0 ? A.downloadUrlFor(f) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function g(f, m, r, a) {
      p("updateItem", {
        item: f,
        articleKey: m,
        node: r,
        quantity: a
      });
    }
    function _(f, m, r) {
      p("removeItem", { item: f, articleKey: m, node: r });
    }
    return q(() => {
      s.leaf = o.leaf;
    }), (f, m) => (d(), h($, null, [
      i(" cartleafe "),
      e("sl-card", de, [
        e("img", {
          class: "viur-shop-cart-card-img",
          slot: "image",
          src: u(s.leaf.shop_image ? s.leaf.shop_image : void 0)
        }, null, 8, ue),
        e("div", he, [
          e("h4", pe, y(s.leaf.shop_name) + " | " + y(t.leaf.shop_art_no_or_gtin), 1)
        ]),
        e("div", _e, [
          e("div", me, [
            fe,
            e("div", be, [
              ve,
              e("sl-button", {
                size: "small",
                outline: "",
                class: "viur-shop-cart-card-delete-btn",
                variant: "primary",
                title: "Remove from cart",
                onClick: m[0] || (m[0] = (r) => _(s.leaf, s.leaf.article.dest.key, t.node))
              }, ge)
            ])
          ]),
          e("div", ke, [
            U(e("sl-input", {
              class: "amount-input",
              type: "number",
              label: "Anzahl",
              placeholder: "Number",
              min: "0",
              "onUpdate:modelValue": m[1] || (m[1] = (r) => s.leaf.quantity = r),
              onInput: m[2] || (m[2] = (r) => g(
                s.leaf,
                s.leaf.article.dest.key,
                t.node,
                s.leaf.quantity
              ))
            }, null, 544), [
              [F, s.leaf.quantity]
            ])
          ]),
          e("div", we, [
            $e,
            e("div", Ie, y(s.leaf.price.retail) + " € ", 1),
            Se
          ])
        ])
      ])
    ], 64));
  }
}, Ne = /* @__PURE__ */ x(Ce, [["__scopeId", "data-v-0e24135f"]]), w = (t) => (N("data-v-7aae4815"), t = t(), z(), t), ze = { key: 0 }, xe = /* @__PURE__ */ w(() => /* @__PURE__ */ e("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Re = {
  class: "footer-wrap",
  slot: "footer"
}, Be = { key: 0 }, Ve = /* @__PURE__ */ w(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1)), Ee = /* @__PURE__ */ w(() => /* @__PURE__ */ e("br", null, null, -1)), qe = /* @__PURE__ */ w(() => /* @__PURE__ */ e("sl-input", { label: "Rabattcode eingeben" }, null, -1)), Oe = /* @__PURE__ */ w(() => /* @__PURE__ */ e("br", null, null, -1)), Ae = { class: "viur-shop-cart-sidebar-info-line" }, Te = /* @__PURE__ */ w(() => /* @__PURE__ */ e("span", null, "Zwischensumme", -1)), De = /* @__PURE__ */ w(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Rabatt"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), We = /* @__PURE__ */ w(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Versandkosten"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), je = { class: "viur-shop-cart-sidebar-info-line total" }, Ue = /* @__PURE__ */ w(() => /* @__PURE__ */ e("span", null, "Gesamt:", -1)), Me = /* @__PURE__ */ w(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
  /* @__PURE__ */ e("sl-button", {
    variant: "info",
    size: "small"
  }, " Jetzt Bestellen "),
  /* @__PURE__ */ e("sl-button", {
    size: "small",
    variant: "primary"
  }, [
    /* @__PURE__ */ e("sl-icon", {
      name: "paypal",
      slot: "prefix"
    }),
    /* @__PURE__ */ i(" Paypal ")
  ])
], -1)), He = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(t) {
    const n = t, o = D(), p = M(null), s = I({
      cartIsInit: v(() => !!o.state.basketRootNode),
      itemsIsInit: v(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    v(() => n.mode === "basket" ? o.state.basket : n.cartKey);
    async function u() {
      await o.updateItem(
        s.currentItem.article.dest.key,
        s.currentNode.key,
        0
      ), await m(), p.value.hide();
    }
    async function g(a) {
      console.log("updateItem :", a), a.quantity === 0 ? (p.value.show(), s.currentItem = a.item, s.currentNode = a.node) : (await o.updateItem(a.articleKey, a.node.key, a.quantity), await o.init());
    }
    function _(a) {
      console.log("removeItem :", a), p.value.show(), s.currentItem = a.item, s.currentNode = a.node;
    }
    async function f() {
      s.leaves[s.currentNode.key].forEach((a) => {
        a.key === s.currentItem.key && (a.quantity = 1);
      }), s.currentItem = {}, s.currentNode = {};
    }
    async function m() {
      s.nodes = [], s.leaves = {}, await o.init(), await r();
    }
    async function r(a = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", a);
      const c = await o.getChildren(a);
      console.log("getChildren children: ", c), c.forEach(async (l) => {
        l.skel_type === "node" ? (s.nodes.push(l), await r(l.key)) : (Object.keys(s.leaves).includes(a) || (s.leaves[a] = []), s.leaves[a].push(l));
      });
    }
    return q(async () => {
      await o.init(), await r(), n.mode === "basket" && s.nodes.push(o.state.basketRootNode), console.log("state.nodes test", s.nodes), console.log("state.leaves", s.leaves);
    }), (a, c) => t.cartKey.length ? (d(), h($, { key: 1 }, [
      e("sl-dialog", {
        ref_key: "confirm",
        ref: p,
        onSlHide: f
      }, [
        xe,
        e("div", Re, [
          e("sl-button", {
            variant: "danger",
            onClick: c[0] || (c[0] = (l) => p.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          e("sl-button", {
            variant: "success",
            onClick: u,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (d(!0), h($, null, B(s.nodes, (l) => (d(), h("div", null, [
        Object.keys(s.leaves).includes(l.key) ? (d(), h($, { key: 0 }, [
          P(ce, { node: l }, null, 8, ["node"]),
          (d(!0), h($, null, B(s.leaves[l.key], (S) => (d(), C(Ne, {
            key: S.key,
            leaf: S,
            node: l,
            onRemoveItem: _,
            onUpdateItem: g
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : R("", !0)
      ]))), 256)),
      t.sidebar ? (d(), h("div", Be, [
        Ve,
        Ee,
        qe,
        Oe,
        e("div", Ae, [
          Te,
          i(" --> " + y(t.mode === "basket" ? k(o).state.basketRootNode.total : k(o).state.whishlistRootNodes[t.cartKey].total) + " € ", 1)
        ]),
        De,
        We,
        e("div", je, [
          Ue,
          i(" " + y(t.mode === "basket" ? k(o).state.basketRootNode.total : k(o).state.whishlistRootNodes[t.cartKey].total) + " € ", 1)
        ]),
        Me
      ])) : R("", !0)
    ], 64)) : (d(), h("sl-spinner", ze));
  }
}, H = /* @__PURE__ */ x(He, [["__scopeId", "data-v-7aae4815"]]), b = (t) => (N("data-v-75e70e9a"), t = t(), z(), t), Ke = {
  key: 1,
  class: "list"
}, Ge = /* @__PURE__ */ b(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), Ze = /* @__PURE__ */ b(() => /* @__PURE__ */ e("br", null, null, -1)), Fe = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ e("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ e("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ i(" Versandadresse "),
      /* @__PURE__ */ e("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ e("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ i(" Roland Brose"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" Speicherstraße 33"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" 44147 Dortmund, DE"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" rb@mausbrand.de"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ e("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ e("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ i(" Rechnungsadresse "),
      /* @__PURE__ */ e("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ e("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ i(" Roland Brose"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" Speicherstraße 33"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" 44147 Dortmund, DE"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" rb@mausbrand.de"),
    /* @__PURE__ */ e("br"),
    /* @__PURE__ */ i(" 0231 21 34 68 90 ")
  ])
], -1)), Pe = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ e("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ e("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ i(" Paypal ")
  ]),
  /* @__PURE__ */ e("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ e("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), Je = /* @__PURE__ */ b(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), Le = /* @__PURE__ */ b(() => /* @__PURE__ */ e("br", null, null, -1)), Qe = {
  horizontal: "",
  class: "viur-shop-cart-mini-card"
}, Xe = ["src"], Ye = {
  class: "viur-shop-cart-mini-cart-header",
  slot: "header"
}, et = { class: "viur-shop-cart-mini-headline headline" }, tt = { class: "viur-shop-cart-mini-card-body-row" }, st = { class: "viur-shop-cart-mini-card-body-info" }, at = { class: "viur-shop-cart-mini-card-info-wrap" }, ot = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-mini-card-info" }, [
  /* @__PURE__ */ e("span", null, "Anzahl: "),
  /* @__PURE__ */ i(" 1 ")
], -1)), nt = { class: "viur-shop-cart-mini-card-info" }, rt = /* @__PURE__ */ b(() => /* @__PURE__ */ e("span", null, "Preis: ", -1)), it = /* @__PURE__ */ b(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), lt = /* @__PURE__ */ b(() => /* @__PURE__ */ e("br", null, null, -1)), ct = { class: "viur-shop-cart-sidebar-info-line" }, dt = /* @__PURE__ */ b(() => /* @__PURE__ */ e("span", null, "Zwischensumme", -1)), ut = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Rabatt"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), ht = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Versandkosten"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), pt = { class: "viur-shop-cart-sidebar-info-line total" }, _t = /* @__PURE__ */ b(() => /* @__PURE__ */ e("span", null, "Gesamt:", -1)), mt = { class: "viur-shop-cart-sidebar-btn-wrap" }, ft = ["variant", "disabled"], bt = {
  __name: "ConfirmView",
  setup(t) {
    const n = D(), o = I({
      cartIsInit: v(() => !!n.state.basket.length),
      itemsIsInit: v(() => !!n.state.carts[n.state.basket].items),
      images: {},
      showOrderButton: !1
    });
    function p(u) {
      return A.get(`/json/dk_variante/view/${u}`).then(async (g) => {
        let _ = await g.json();
        _ = _.values;
        let f = _.dk_artikel.dest.image ? A.downloadUrlFor(_.dk_artikel.dest.image) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
        o.images[u] = f;
      }), o.images[u];
    }
    function s(u) {
      u.target.checked && (o.showOrderButton = !0), u.target.checked || (o.showOrderButton = !1);
    }
    return q(async () => {
      await n.init();
    }), (u, g) => o.cartIsInit ? (d(), h("div", Ke, [
      Ge,
      Ze,
      Fe,
      Pe,
      Je,
      Le,
      (d(!0), h($, null, B(k(n).state.carts[k(n).state.basket].items, (_) => (d(), h("sl-card", Qe, [
        e("img", {
          class: "viur-shop-cart-mini-card-img",
          slot: "image",
          src: p(_.article.dest.key)
        }, null, 8, Xe),
        e("div", Ye, [
          e("h4", et, y(_.article.dest.shop_name) + " | 425018", 1)
        ]),
        e("div", tt, [
          e("div", st, [
            e("div", at, [
              ot,
              e("div", nt, [
                rt,
                i(" " + y(_.article.dest.shop_price_recommended) + " € ", 1)
              ])
            ])
          ])
        ])
      ]))), 256)),
      (d(), C(J, { to: "#order_sidebar" }, [
        it,
        lt,
        e("div", ct, [
          dt,
          i(" " + y(k(n).state.carts[k(n).state.basket].info.total) + " € ", 1)
        ]),
        ut,
        ht,
        e("div", pt, [
          _t,
          i(" " + y(k(n).state.carts[k(n).state.basket].info.total) + " € ", 1)
        ]),
        e("sl-checkbox", { onSlChange: s }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        e("div", mt, [
          e("sl-button", {
            variant: o.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !o.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, ft)
        ])
      ]))
    ])) : (d(), C(le, { key: 0 }));
  }
}, vt = /* @__PURE__ */ x(bt, [["__scopeId", "data-v-75e70e9a"]]), yt = (t) => (N("data-v-61488015"), t = t(), z(), t), gt = { class: "bind viur-shop-wrap" }, kt = ["panel", "disabled"], wt = { class: "viur-shop-order-step" }, $t = ["name", "library"], It = { class: "viur-shop-order-status-text" }, St = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Ct = ["name"], Nt = ["onClick"], zt = ["onClick"], xt = /* @__PURE__ */ yt(() => /* @__PURE__ */ e("div", {
  class: "viur-shop-sidebar",
  id: "order_sidebar"
}, null, -1)), Rt = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: !0
    }
  },
  emits: ["tabChange"],
  setup(t, { emit: n }) {
    const o = t, p = n, s = I({
      tabNames: v(() => g(o.tabs)),
      isFirstTab: (r) => r === 0
    }), u = M(null);
    function g(r) {
      let a = [], c = [];
      for (const l in r)
        r[l].position ? a.push([l, r[l].position]) : a.push([l, 0]);
      return a.sort((l, S) => l[1] - S[1]), a.forEach((l) => {
        c.push(l[0]);
      }), c;
    }
    function _(r) {
      p("tabChange", r);
    }
    function f(r) {
      u.value.show(r);
    }
    function m(r) {
      u.value.show(r);
    }
    return (r, a) => (d(), h("div", gt, [
      e("sl-tab-group", {
        class: "viur-shop-order-tab",
        noScrollControls: "",
        onSlTabShow: _,
        ref_key: "tabGroup",
        ref: u
      }, [
        (d(!0), h($, null, B(s.tabNames, (c, l) => (d(), h("sl-tab", {
          slot: "nav",
          panel: c,
          key: c,
          disabled: t.tabs[c].disabled
        }, [
          e("div", wt, [
            e("sl-icon", {
              name: t.tabs[c].icon.name,
              library: t.tabs[c].icon.library
            }, null, 8, $t),
            e("div", It, y(l + 1) + ". " + y(t.tabs[c].displayName), 1)
          ]),
          l < s.tabNames.length - 1 ? (d(), h("sl-icon", St)) : R("", !0)
        ], 8, kt))), 128)),
        (d(!0), h($, null, B(s.tabNames, (c, l) => (d(), h("sl-tab-panel", {
          name: c,
          key: c
        }, [
          (d(), C(L(t.tabs[c].component), Q({ ref_for: !0 }, t.tabs[c].props ? t.tabs[c].props : ""), null, 16)),
          l !== s.tabNames.length - 1 ? (d(), h("div", {
            key: 0,
            class: X(["viur-shop-form-footer", { "flex-end": s.isFirstTab(l) }])
          }, [
            U(e("sl-button", {
              type: "submit",
              onClick: (S) => f(s.tabNames[l - 1])
            }, " Zurück ", 8, Nt), [
              [Y, l !== 0]
            ]),
            e("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (S) => m(s.tabNames[l + 1])
            }, " Weiter ", 8, zt)
          ], 2)) : R("", !0)
        ], 8, Ct))), 128))
      ], 544),
      xt
    ]));
  }
}, Bt = /* @__PURE__ */ x(Rt, [["__scopeId", "data-v-61488015"]]), Vt = {}, O = (t) => (N("data-v-36ccc280"), t = t(), z(), t), Et = { class: "bind" }, qt = /* @__PURE__ */ O(() => /* @__PURE__ */ e("h1", { class: "headline" }, "Vielen Dank für Ihre Bestellung", -1)), Ot = /* @__PURE__ */ O(() => /* @__PURE__ */ e("br", null, null, -1)), At = /* @__PURE__ */ O(() => /* @__PURE__ */ e("p", { class: "paragraph" }, [
  /* @__PURE__ */ e("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ i(" 123345670 ")
], -1)), Tt = /* @__PURE__ */ O(() => /* @__PURE__ */ e("p", { class: "paragraph" }, [
  /* @__PURE__ */ i(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
  /* @__PURE__ */ e("div", { class: "btn-wrap" }, [
    /* @__PURE__ */ e("sl-button", { size: "medium" }, " Zur Startseite "),
    /* @__PURE__ */ e("sl-button", {
      variant: "primary",
      size: "medium"
    }, " Weiter Einkaufen ")
  ])
], -1)), Dt = [
  qt,
  Ot,
  At,
  Tt
];
function Wt(t, n) {
  return d(), h("div", Et, Dt);
}
const jt = /* @__PURE__ */ x(Vt, [["render", Wt], ["__scopeId", "data-v-36ccc280"]]), Ut = {
  __name: "ExampleUsage",
  setup(t) {
    const n = D(), o = v(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), p = I({
      rootNode: {},
      tabs: {
        cart: {
          component: E(H),
          props: {
            sidebar: !0,
            mode: "basket",
            cartKey: o
          },
          // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
          displayName: "Warenkorb",
          icon: { name: "cart", library: "hsk" },
          position: 2,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        // confirm: {
        //   component: shallowRef(ConfirmView),
        //   props: {},
        //   displayName: "Bestellung prüfen",
        //   icon: { name: "order-check", library: "hsk" },
        //   position: 5,
        //   disabled: false,
        //   atShow: null,
        //   atHide: null,
        // },
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
          component: E(jt),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "order-confirmed", library: "hsk" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: E(UserInformation),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "user", library: "hsk" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: E(UserInfoMulti),
          props: {},
          displayName: "Daten Eingeben (Multi)",
          icon: { name: "user", library: "hsk" },
          position: 4,
          disabled: !1,
          atShow: null,
          atHide: null
        }
      }
    });
    function s(u) {
      (u == null ? void 0 : u.detail.name) === "confirm" && (p.tabs.orderComplete.disabled = !1);
    }
    return q(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (u, g) => (d(), C(Bt, {
      tabs: p.tabs,
      onTabChange: s
    }, null, 8, ["tabs"]));
  }
}, Ft = {
  install(t) {
    t.component("CartView", H), t.component("ExampleUsage", Ut), t.component("ConfirmView", vt);
  }
};
export {
  H as CartView,
  vt as ConfirmView,
  Ut as ExampleUsage,
  Ft as default,
  D as useCartStore
};
