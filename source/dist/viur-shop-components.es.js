import { reactive as R, computed as C, useCssVars as L, resolveComponent as v, openBlock as c, createBlock as N, Transition as M, withCtx as f, createElementBlock as k, createVNode as l, createElementVNode as e, createCommentVNode as B, Fragment as x, createTextVNode as i, toDisplayString as S, onBeforeMount as E, pushScopeId as T, popScopeId as j, ref as P, renderList as q, unref as z, Teleport as Q, resolveDynamicComponent as X, mergeProps as Y, normalizeClass as ee, withDirectives as te, vShow as se, shallowRef as ae } from "vue";
import { Request as U } from "@viur/vue-utils";
import { defineStore as oe } from "pinia";
import { ViURShopClient as ne } from "@viur/viur-shop-client";
import "vue-router";
const O = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [p, s] of n)
    o[p] = s;
  return o;
}, K = {
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
    const o = R({
      trackWidth: C(() => `${t.size / 30}rem`),
      outerSize: C(() => `calc(${t.size}rem + ${o.trackWidth})`),
      spinnerSize: C(() => `${t.size}rem`),
      logoSize: C(() => `calc(${t.size}rem - ${o.trackWidth} * 10)`),
      shadow: C(() => `0px 0px ${t.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: o };
  }
}, Z = () => {
  L((t) => ({
    "93747d92": t.state.outerSize,
    "284424e5": t.state.shadow,
    "6485ca5e": t.state.logoSize,
    "5d833915": t.state.spinnerSize,
    d5b3feca: t.color,
    "2050b700": t.state.trackWidth
  }));
}, H = K.setup;
K.setup = H ? (t, n) => (Z(), H(t, n)) : Z;
const re = {
  key: 0,
  class: "loading"
}, ie = { class: "logo" };
function le(t, n, o, p, s, d) {
  const $ = v("sl-spinner"), b = v("sl-icon");
  return c(), N(M, null, {
    default: f(() => [
      o.active ? (c(), k("div", re, [
        l($, { class: "loader" }),
        e("div", ie, [
          l(b, { src: o.logo }, null, 8, ["src"])
        ])
      ])) : B("", !0)
    ]),
    _: 1
  });
}
const ce = /* @__PURE__ */ O(K, [["render", le], ["__scopeId", "data-v-46c45785"]]), G = oe("cartstore", () => {
  const t = new ne({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = R({
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
  async function d(r, a) {
    let _ = await t.article_add({
      article_key: r,
      parent_cart_key: a
    });
    console.log("addToCart", _);
  }
  async function $(r, a) {
    let _ = await t.article_view({
      article_key: r,
      parent_cart_key: a
    });
    console.log("getArticleView", _);
  }
  async function b(r, a) {
    let _ = await t.article_remove({
      article_key: r,
      parent_cart_key: a
    });
    console.log("remove Resp", _);
  }
  async function m(r, a, _) {
    let h = await t.article_update({
      article_key: r,
      parent_cart_key: a,
      quantity: _,
      quantity_mode: "replace"
    });
    console.log("update Resp", h);
  }
  async function y() {
    let r = await t.address_structure();
    n.structure.address = r.addSkel, console.log("adress add", n.structure.address);
  }
  return {
    state: n,
    addToCart: d,
    getArticleView: $,
    removeItem: b,
    updateItem: m,
    init: o,
    getAdressStructure: y,
    getChildren: p
  };
}), de = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(t) {
    return R({}), (n, o) => (c(), k(x, null, [
      i(" cartnode "),
      e("pre", null, S(t.node.name), 1)
    ], 64));
  }
}, F = (t) => (T("data-v-0e24135f"), t = t(), j(), t), ue = ["src"], _e = {
  class: "viur-shop-cart-card-header",
  slot: "header"
}, he = { class: "viur-shop-cart-card-headline headline" }, pe = { class: "viur-shop-cart-card-body-row" }, me = { class: "viur-shop-cart-card-body-info" }, fe = /* @__PURE__ */ F(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-card-descr" }, [
  /* @__PURE__ */ i(" Version: 900x900x2000 "),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Farbe: Chromoptik "),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Glasart: Klar hell mit Edelglasbeschichtung"),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Anschlag: Beidseitig variabel"),
  /* @__PURE__ */ e("br"),
  /* @__PURE__ */ i(" Griff: Stangengriff Exklusiv (56) ")
], -1)), ve = { class: "viur-shop-cart-card-body-footer" }, be = { class: "viur-shop-cart-card-body-amount" }, ye = {
  class: "viur-shop-cart-card-price-wrap",
  slot: "footer"
}, ke = /* @__PURE__ */ F(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-card-price-label" }, "Preis", -1)), ge = { class: "viur-shop-cart-card-price" }, we = /* @__PURE__ */ F(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-card-small-print" }, "Brutto / Stk.", -1)), $e = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(t, { emit: n }) {
    const o = t, p = n, s = R({
      leaf: {}
    });
    function d(m) {
      return m !== void 0 ? U.downloadUrlFor(m) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function $(m, y, r, a) {
      p("updateItem", {
        item: m,
        articleKey: y,
        node: r,
        quantity: a
      });
    }
    function b(m, y, r) {
      p("removeItem", { item: m, articleKey: y, node: r });
    }
    return E(() => {
      s.leaf = o.leaf;
    }), (m, y) => {
      const r = v("sl-icon"), a = v("sl-button"), _ = v("sl-input"), h = v("sl-card");
      return c(), k(x, null, [
        i(" cartleafe "),
        l(h, {
          horizontal: "",
          class: "viur-shop-cart-card"
        }, {
          default: f(() => [
            e("img", {
              class: "viur-shop-cart-card-img",
              slot: "image",
              src: d(s.leaf.shop_image ? s.leaf.shop_image : void 0)
            }, null, 8, ue),
            e("div", _e, [
              e("h4", he, S(s.leaf.shop_name) + " | " + S(t.leaf.shop_art_no_or_gtin), 1)
            ]),
            e("div", pe, [
              e("div", me, [
                fe,
                e("div", ve, [
                  l(a, {
                    size: "small",
                    outline: "",
                    class: "viur-shop-cart-card-add-to-favourites-btn",
                    variant: "primary",
                    title: "Add to favourites"
                  }, {
                    default: f(() => [
                      l(r, {
                        name: "heart",
                        slot: "prefix"
                      })
                    ]),
                    _: 1
                  }),
                  l(a, {
                    size: "small",
                    outline: "",
                    class: "viur-shop-cart-card-delete-btn",
                    variant: "primary",
                    title: "Remove from cart",
                    onClick: y[0] || (y[0] = (I) => b(s.leaf, s.leaf.article.dest.key, t.node))
                  }, {
                    default: f(() => [
                      l(r, {
                        name: "trash",
                        slot: "prefix"
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              e("div", be, [
                l(_, {
                  class: "amount-input",
                  type: "number",
                  label: "Anzahl",
                  placeholder: "Number",
                  min: "0",
                  modelValue: s.leaf.quantity,
                  "onUpdate:modelValue": y[1] || (y[1] = (I) => s.leaf.quantity = I),
                  onInput: y[2] || (y[2] = (I) => $(
                    s.leaf,
                    s.leaf.article.dest.key,
                    t.node,
                    s.leaf.quantity
                  ))
                }, null, 8, ["modelValue"])
              ]),
              e("div", ye, [
                ke,
                e("div", ge, S(s.leaf.price.retail) + " € ", 1),
                we
              ])
            ])
          ]),
          _: 1
        })
      ], 64);
    };
  }
}, Ie = /* @__PURE__ */ O($e, [["__scopeId", "data-v-0e24135f"]]), V = (t) => (T("data-v-7aae4815"), t = t(), j(), t), Ce = /* @__PURE__ */ V(() => /* @__PURE__ */ e("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Se = {
  class: "footer-wrap",
  slot: "footer"
}, Ne = { key: 0 }, ze = /* @__PURE__ */ V(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1)), xe = /* @__PURE__ */ V(() => /* @__PURE__ */ e("br", null, null, -1)), Re = /* @__PURE__ */ V(() => /* @__PURE__ */ e("br", null, null, -1)), Ve = { class: "viur-shop-cart-sidebar-info-line" }, Be = /* @__PURE__ */ V(() => /* @__PURE__ */ e("span", null, "Zwischensumme", -1)), qe = /* @__PURE__ */ V(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Rabatt"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), Oe = /* @__PURE__ */ V(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Versandkosten"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), Ae = { class: "viur-shop-cart-sidebar-info-line total" }, Ee = /* @__PURE__ */ V(() => /* @__PURE__ */ e("span", null, "Gesamt:", -1)), Te = { class: "viur-shop-cart-sidebar-btn-wrap" }, je = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(t) {
    const n = t, o = G(), p = P(null), s = R({
      cartIsInit: C(() => !!o.state.basketRootNode),
      itemsIsInit: C(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    C(() => n.mode === "basket" ? o.state.basket : n.cartKey);
    async function d() {
      await o.updateItem(
        s.currentItem.article.dest.key,
        s.currentNode.key,
        0
      ), await y(), p.value.hide();
    }
    async function $(a) {
      console.log("updateItem :", a), a.quantity === 0 ? (p.value.show(), s.currentItem = a.item, s.currentNode = a.node) : (await o.updateItem(a.articleKey, a.node.key, a.quantity), await o.init());
    }
    function b(a) {
      console.log("removeItem :", a), p.value.show(), s.currentItem = a.item, s.currentNode = a.node;
    }
    async function m() {
      s.leaves[s.currentNode.key].forEach((a) => {
        a.key === s.currentItem.key && (a.quantity = 1);
      }), s.currentItem = {}, s.currentNode = {};
    }
    async function y() {
      s.nodes = [], s.leaves = {}, await o.init(), await r();
    }
    async function r(a = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", a);
      const _ = await o.getChildren(a);
      console.log("getChildren children: ", _), _.forEach(async (h) => {
        h.skel_type === "node" ? (s.nodes.push(h), await r(h.key)) : (Object.keys(s.leaves).includes(a) || (s.leaves[a] = []), s.leaves[a].push(h));
      });
    }
    return E(async () => {
      await o.init(), await r(), n.mode === "basket" && s.nodes.push(o.state.basketRootNode), console.log("state.nodes test", s.nodes), console.log("state.leaves", s.leaves);
    }), (a, _) => {
      const h = v("sl-spinner"), I = v("sl-button"), D = v("sl-dialog"), W = v("sl-input"), g = v("sl-icon");
      return t.cartKey.length ? (c(), k(x, { key: 1 }, [
        l(D, {
          ref_key: "confirm",
          ref: p,
          onSlHide: m
        }, {
          default: f(() => [
            Ce,
            e("div", Se, [
              l(I, {
                variant: "danger",
                onClick: _[0] || (_[0] = (w) => p.value.hide()),
                size: "medium"
              }, {
                default: f(() => [
                  i(" Abbrechen ")
                ]),
                _: 1
              }),
              l(I, {
                variant: "success",
                onClick: d,
                size: "medium"
              }, {
                default: f(() => [
                  i(" Aus Warenkorb entfernen ")
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 512),
        (c(!0), k(x, null, q(s.nodes, (w) => (c(), k("div", null, [
          Object.keys(s.leaves).includes(w.key) ? (c(), k(x, { key: 0 }, [
            l(de, { node: w }, null, 8, ["node"]),
            (c(!0), k(x, null, q(s.leaves[w.key], (A) => (c(), N(Ie, {
              key: A.key,
              leaf: A,
              node: w,
              onRemoveItem: b,
              onUpdateItem: $
            }, null, 8, ["leaf", "node"]))), 128))
          ], 64)) : B("", !0)
        ]))), 256)),
        t.sidebar ? (c(), k("div", Ne, [
          ze,
          xe,
          l(W, { label: "Rabattcode eingeben" }),
          Re,
          e("div", Ve, [
            Be,
            i(" --> " + S(t.mode === "basket" ? z(o).state.basketRootNode.total : z(o).state.whishlistRootNodes[t.cartKey].total) + " € ", 1)
          ]),
          qe,
          Oe,
          e("div", Ae, [
            Ee,
            i(" " + S(t.mode === "basket" ? z(o).state.basketRootNode.total : z(o).state.whishlistRootNodes[t.cartKey].total) + " € ", 1)
          ]),
          e("div", Te, [
            l(I, {
              variant: "info",
              size: "small"
            }, {
              default: f(() => [
                i(" Jetzt Bestellen ")
              ]),
              _: 1
            }),
            l(I, {
              size: "small",
              variant: "primary"
            }, {
              default: f(() => [
                l(g, {
                  name: "paypal",
                  slot: "prefix"
                }),
                i(" Paypal ")
              ]),
              _: 1
            })
          ])
        ])) : B("", !0)
      ], 64)) : (c(), N(h, { key: 0 }));
    };
  }
}, J = /* @__PURE__ */ O(je, [["__scopeId", "data-v-7aae4815"]]), u = (t) => (T("data-v-75e70e9a"), t = t(), j(), t), De = {
  key: 1,
  class: "list"
}, We = /* @__PURE__ */ u(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), Ue = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), Ke = { class: "viur-shop-cart-address-wrap" }, Ge = { class: "viur-shop-cart-address" }, Fe = { class: "viur-shop-cart-address-headline" }, Ze = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), He = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), Pe = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), Je = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), Le = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), Me = { class: "viur-shop-cart-address" }, Qe = { class: "viur-shop-cart-address-headline" }, Xe = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), Ye = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), et = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), tt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), st = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), at = { class: "viur-shop-cart-payment" }, ot = /* @__PURE__ */ u(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-payment-method" }, [
  /* @__PURE__ */ e("span", null, "Zahlungsmethode:"),
  /* @__PURE__ */ i(" Paypal ")
], -1)), nt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), rt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), it = ["src"], lt = {
  class: "viur-shop-cart-mini-cart-header",
  slot: "header"
}, ct = { class: "viur-shop-cart-mini-headline headline" }, dt = { class: "viur-shop-cart-mini-card-body-row" }, ut = { class: "viur-shop-cart-mini-card-body-info" }, _t = { class: "viur-shop-cart-mini-card-info-wrap" }, ht = /* @__PURE__ */ u(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-mini-card-info" }, [
  /* @__PURE__ */ e("span", null, "Anzahl: "),
  /* @__PURE__ */ i(" 1 ")
], -1)), pt = { class: "viur-shop-cart-mini-card-info" }, mt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("span", null, "Preis: ", -1)), ft = /* @__PURE__ */ u(() => /* @__PURE__ */ e("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), vt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("br", null, null, -1)), bt = { class: "viur-shop-cart-sidebar-info-line" }, yt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("span", null, "Zwischensumme", -1)), kt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Rabatt"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), gt = /* @__PURE__ */ u(() => /* @__PURE__ */ e("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ e("span", null, "Versandkosten"),
  /* @__PURE__ */ i(" 0 € ")
], -1)), wt = { class: "viur-shop-cart-sidebar-info-line total" }, $t = /* @__PURE__ */ u(() => /* @__PURE__ */ e("span", null, "Gesamt:", -1)), It = { class: "viur-shop-cart-sidebar-btn-wrap" }, Ct = {
  __name: "ConfirmView",
  setup(t) {
    const n = G(), o = R({
      cartIsInit: C(() => !!n.state.basket.length),
      itemsIsInit: C(() => !!n.state.carts[n.state.basket].items),
      images: {},
      showOrderButton: !1
    });
    function p(d) {
      return U.get(`/json/dk_variante/view/${d}`).then(async ($) => {
        let b = await $.json();
        b = b.values;
        let m = b.dk_artikel.dest.image ? U.downloadUrlFor(b.dk_artikel.dest.image) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
        o.images[d] = m;
      }), o.images[d];
    }
    function s(d) {
      d.target.checked && (o.showOrderButton = !0), d.target.checked || (o.showOrderButton = !1);
    }
    return E(async () => {
      await n.init();
    }), (d, $) => {
      const b = v("sl-icon"), m = v("sl-button"), y = v("sl-card"), r = v("sl-checkbox");
      return o.cartIsInit ? (c(), k("div", De, [
        We,
        Ue,
        e("div", Ke, [
          e("div", Ge, [
            e("div", Fe, [
              i(" Versandadresse "),
              l(m, {
                outline: "",
                size: "small"
              }, {
                default: f(() => [
                  l(b, {
                    name: "pencil",
                    slot: "prefix"
                  })
                ]),
                _: 1
              })
            ]),
            i(" Roland Brose"),
            Ze,
            i(" Speicherstraße 33"),
            He,
            i(" 44147 Dortmund, DE"),
            Pe,
            Je,
            i(" rb@mausbrand.de"),
            Le,
            i(" 0231 21 34 68 90 ")
          ]),
          e("div", Me, [
            e("div", Qe, [
              i(" Rechnungsadresse "),
              l(m, {
                outline: "",
                size: "small"
              }, {
                default: f(() => [
                  l(b, {
                    name: "pencil",
                    slot: "prefix"
                  })
                ]),
                _: 1
              })
            ]),
            i(" Roland Brose"),
            Xe,
            i(" Speicherstraße 33"),
            Ye,
            i(" 44147 Dortmund, DE"),
            et,
            tt,
            i(" rb@mausbrand.de"),
            st,
            i(" 0231 21 34 68 90 ")
          ])
        ]),
        e("div", at, [
          ot,
          l(m, {
            outline: "",
            size: "small"
          }, {
            default: f(() => [
              l(b, {
                name: "pencil",
                slot: "prefix"
              })
            ]),
            _: 1
          })
        ]),
        nt,
        rt,
        (c(!0), k(x, null, q(z(n).state.carts[z(n).state.basket].items, (a) => (c(), N(y, {
          horizontal: "",
          class: "viur-shop-cart-mini-card"
        }, {
          default: f(() => [
            e("img", {
              class: "viur-shop-cart-mini-card-img",
              slot: "image",
              src: p(a.article.dest.key)
            }, null, 8, it),
            e("div", lt, [
              e("h4", ct, S(a.article.dest.shop_name) + " | 425018", 1)
            ]),
            e("div", dt, [
              e("div", ut, [
                e("div", _t, [
                  ht,
                  e("div", pt, [
                    mt,
                    i(" " + S(a.article.dest.shop_price_recommended) + " € ", 1)
                  ])
                ])
              ])
            ])
          ]),
          _: 2
        }, 1024))), 256)),
        (c(), N(Q, { to: "#order_sidebar" }, [
          ft,
          vt,
          e("div", bt, [
            yt,
            i(" " + S(z(n).state.carts[z(n).state.basket].info.total) + " € ", 1)
          ]),
          kt,
          gt,
          e("div", wt, [
            $t,
            i(" " + S(z(n).state.carts[z(n).state.basket].info.total) + " € ", 1)
          ]),
          l(r, { onSlChange: s }, {
            default: f(() => [
              i(" Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ")
            ]),
            _: 1
          }),
          e("div", It, [
            l(m, {
              variant: o.showOrderButton ? "info" : "disabled",
              size: "small",
              disabled: !o.showOrderButton
            }, {
              default: f(() => [
                i(" Zahlungspflichtig bestellen ")
              ]),
              _: 1
            }, 8, ["variant", "disabled"])
          ])
        ]))
      ])) : (c(), N(ce, { key: 0 }));
    };
  }
}, St = /* @__PURE__ */ O(Ct, [["__scopeId", "data-v-75e70e9a"]]), Nt = (t) => (T("data-v-61488015"), t = t(), j(), t), zt = { class: "bind viur-shop-wrap" }, xt = { class: "viur-shop-order-step" }, Rt = { class: "viur-shop-order-status-text" }, Vt = /* @__PURE__ */ Nt(() => /* @__PURE__ */ e("div", {
  class: "viur-shop-sidebar",
  id: "order_sidebar"
}, null, -1)), Bt = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: !0
    }
  },
  emits: ["tabChange"],
  setup(t, { emit: n }) {
    const o = t, p = n, s = R({
      tabNames: C(() => $(o.tabs)),
      isFirstTab: (r) => r === 0
    }), d = P(null);
    function $(r) {
      let a = [], _ = [];
      for (const h in r)
        r[h].position ? a.push([h, r[h].position]) : a.push([h, 0]);
      return a.sort((h, I) => h[1] - I[1]), a.forEach((h) => {
        _.push(h[0]);
      }), _;
    }
    function b(r) {
      p("tabChange", r);
    }
    function m(r) {
      d.value.show(r);
    }
    function y(r) {
      d.value.show(r);
    }
    return (r, a) => {
      const _ = v("sl-icon"), h = v("sl-tab"), I = v("sl-button"), D = v("sl-tab-panel"), W = v("sl-tab-group");
      return c(), k("div", zt, [
        l(W, {
          class: "viur-shop-order-tab",
          noScrollControls: "",
          onSlTabShow: b,
          ref_key: "tabGroup",
          ref: d
        }, {
          default: f(() => [
            (c(!0), k(x, null, q(s.tabNames, (g, w) => (c(), N(h, {
              slot: "nav",
              panel: g,
              key: g,
              disabled: t.tabs[g].disabled
            }, {
              default: f(() => [
                e("div", xt, [
                  l(_, {
                    name: t.tabs[g].icon.name,
                    library: t.tabs[g].icon.library
                  }, null, 8, ["name", "library"]),
                  e("div", Rt, S(w + 1) + ". " + S(t.tabs[g].displayName), 1)
                ]),
                w < s.tabNames.length - 1 ? (c(), N(_, {
                  key: 0,
                  name: "chevron-right",
                  class: "viur-shop-order-tab-check"
                })) : B("", !0)
              ]),
              _: 2
            }, 1032, ["panel", "disabled"]))), 128)),
            (c(!0), k(x, null, q(s.tabNames, (g, w) => (c(), N(D, {
              name: g,
              key: g
            }, {
              default: f(() => [
                (c(), N(X(t.tabs[g].component), Y({ ref_for: !0 }, t.tabs[g].props ? t.tabs[g].props : ""), null, 16)),
                w !== s.tabNames.length - 1 ? (c(), k("div", {
                  key: 0,
                  class: ee(["viur-shop-form-footer", { "flex-end": s.isFirstTab(w) }])
                }, [
                  te(l(I, {
                    type: "submit",
                    onClick: (A) => m(s.tabNames[w - 1])
                  }, {
                    default: f(() => [
                      i(" Zurück ")
                    ]),
                    _: 2
                  }, 1032, ["onClick"]), [
                    [se, w !== 0]
                  ]),
                  l(I, {
                    type: "submit",
                    variant: "primary",
                    onClick: (A) => y(s.tabNames[w + 1])
                  }, {
                    default: f(() => [
                      i(" Weiter ")
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ], 2)) : B("", !0)
              ]),
              _: 2
            }, 1032, ["name"]))), 128))
          ]),
          _: 1
        }, 512),
        Vt
      ]);
    };
  }
}, qt = /* @__PURE__ */ O(Bt, [["__scopeId", "data-v-61488015"]]), Ot = {
  __name: "ExampleUsage",
  setup(t) {
    const n = G(), o = C(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), p = R({
      rootNode: {},
      tabs: {
        cart: {
          component: ae(J),
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
        }
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
        // orderComplete: {
        //   component: shallowRef(OrderComplete),
        //   props: {},
        //   displayName: "Bestellung Abgeschlossen",
        //   icon: { name: "order-confirmed", library: "hsk" },
        //   position: 6,
        //   disabled: true,
        //   atShow: null,
        //   atHide: null,
        // },
        // userInfo: {
        //   component: shallowRef(UserInformation),
        //   props: {},
        //   displayName: "Daten Eingeben",
        //   icon: { name: "user", library: "hsk" },
        //   position: 3,
        //   disabled: false,
        //   atShow: null,
        //   atHide: null,
        // },
        // userInfoMulti: {
        //   component: shallowRef(UserInfoMulti),
        //   props: {},
        //   displayName: "Daten Eingeben (Multi)",
        //   icon: { name: "user", library: "hsk" },
        //   position: 4,
        //   disabled: false,
        //   atShow: null,
        //   atHide: null,
        // },
      }
    });
    function s(d) {
      (d == null ? void 0 : d.detail.name) === "confirm" && (p.tabs.orderComplete.disabled = !1);
    }
    return E(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (d, $) => (c(), N(qt, {
      tabs: p.tabs,
      onTabChange: s
    }, null, 8, ["tabs"]));
  }
}, Wt = {
  install(t) {
    t.component("CartView", J), t.component("ExampleUsage", Ot), t.component("ConfirmView", St);
  }
};
export {
  J as CartView,
  St as ConfirmView,
  Ot as ExampleUsage,
  Wt as default,
  G as useCartStore
};
