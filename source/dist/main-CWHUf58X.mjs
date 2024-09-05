var rt = Object.defineProperty;
var lt = (e, n, t) => n in e ? rt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => lt(e, typeof n != "symbol" ? n + "" : n, t);
import { reactive as w, defineComponent as D, inject as j, openBlock as c, createElementBlock as f, normalizeClass as G, createElementVNode as i, renderSlot as Ze, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as S, toDisplayString as O, onMounted as R, ref as F, readonly as ot, getCurrentScope as it, onScopeDispose as ut, unref as P, computed as k, watchEffect as me, renderList as U, watch as se, withDirectives as J, vModelText as le, getCurrentInstance as dt, resolveComponent as ae, createBlock as T, vShow as be, withModifiers as de, createTextVNode as C, shallowRef as K, provide as ie, onBeforeMount as Y, useCssVars as ct, Transition as mt, withCtx as ft, createVNode as ye, Teleport as gt, resolveDynamicComponent as Je, mergeProps as Ye } from "vue";
import { Request as ht } from "@viur/vue-utils";
import { defineStore as $e, createPinia as pt } from "pinia";
import { ViURShopClient as bt } from "@viur/viur-shop-client";
import { useRoute as vt, createRouter as yt, createWebHashHistory as $t } from "vue-router";
const ee = $e("cartstore", () => {
  const e = new bt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = w({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    billingAddress: {},
    shippingAddress: {}
  });
  async function t() {
    await a();
  }
  async function r(v) {
    return await e.cart_list({ cart_key: v });
  }
  async function a() {
    (await e.cart_list()).forEach((p) => {
      p.is_root_node && (p.cart_type === "basket" ? n.basketRootNode = p : n.whishlistRootNodes.push(p));
    });
  }
  async function o(v, p) {
    let y = await e.article_add({
      article_key: v,
      parent_cart_key: p
    });
    console.log("addToCart", y);
  }
  async function s(v, p) {
    let y = await e.article_view({
      article_key: v,
      parent_cart_key: p
    });
    console.log("getArticleView", y);
  }
  async function u(v, p) {
    let y = await e.article_remove({
      article_key: v,
      parent_cart_key: p
    });
    console.log("remove Resp", y);
  }
  async function l(v, p, y) {
    let g = await e.article_update({
      article_key: v,
      parent_cart_key: p,
      quantity: y,
      quantity_mode: "replace"
    });
    console.log("update Resp", g);
  }
  async function d() {
    const v = await e.address_structure();
    n.structure.address = v.addSkel;
  }
  async function m() {
    const v = await e.address_list();
    for (const p of v)
      p.address_type === "billing" && (n.billingAddress = p), p.address_type === "shipping" && (n.shippingAddress = p);
  }
  async function h(v) {
    await e.discount_add({ code: v, discount_key: void 0 });
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: s,
    removeItem: u,
    updateItem: l,
    init: t,
    getAddressStructure: d,
    getChildren: r,
    addDiscount: h,
    getAddress: m
  };
}), St = D({
  props: {
    isDragging: Boolean,
    draggingLineBottom: Boolean,
    draggingLineTop: Boolean
  },
  components: {},
  emits: ["change", "delete", "handleDragStart", "handleDragEnd", "handleDragOver", "handleDrop"],
  setup(e, n) {
    const t = j("boneState");
    return {
      state: w({
        isDraggable: !1
      }),
      boneState: t
    };
  }
}), I = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [r, a] of n)
    t[r] = a;
  return t;
}, Qe = (e) => (z("data-v-783517f3"), e = e(), q(), e), _t = ["draggable"], kt = ["disabled"], wt = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), Et = [
  wt
], At = { class: "value" }, It = ["disabled", "title"], Ct = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ot = [
  Ct
];
function jt(e, n, t, r, a, o) {
  return c(), f("div", {
    class: G(["value-line", {
      "is-dragging": e.isDragging,
      "dragging-line-bottom": e.draggingLineBottom,
      "dragging-line-top": e.draggingLineTop
    }]),
    draggable: e.state.isDraggable,
    onDragover: n[2] || (n[2] = (s) => e.$emit("handleDragOver", s)),
    onDrop: n[3] || (n[3] = (s) => e.$emit("handleDrop", s)),
    onDragstart: n[4] || (n[4] = (s) => e.$emit("handleDragStart", s)),
    onDragend: n[5] || (n[5] = (s) => e.$emit("handleDragEnd"))
  }, [
    i("sl-button", {
      disabled: e.boneState.readonly,
      class: "drag-button",
      onMousedown: n[0] || (n[0] = (s) => e.state.isDraggable = !0)
    }, Et, 40, kt),
    i("div", At, [
      Ze(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (s) => e.$emit("delete"))
    }, Ot, 8, It)
  ], 42, _t);
}
const Bt = /* @__PURE__ */ I(St, [["render", jt], ["__scopeId", "data-v-783517f3"]]), Dt = D({
  props: {
    name: String,
    value: Object,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  components: {},
  emits: ["change", "handleClick"],
  setup(e, n) {
    const t = j("boneState");
    return {
      state: w({
        debug: !1
      }),
      boneState: t
    };
  }
}), Vt = { class: "bone-name" }, Nt = { key: 0 }, Rt = { class: "bone" };
function Lt(e, n, t, r, a, o) {
  return c(), f(E, null, [
    i("label", Vt, [
      Ze(e.$slots, "default", {}, void 0, !0),
      S("", !0)
    ]),
    e.state.debug ? (c(), f("div", Nt, [
      i("div", Rt, O(e.name), 1),
      i("pre", null, "    " + O(e.boneState) + `
    `, 1)
    ])) : S("", !0)
  ], 64);
}
const Ut = /* @__PURE__ */ I(Dt, [["render", Lt], ["__scopeId", "data-v-e36916ff"]]), Tt = D({
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
    const t = j("boneState"), r = w({});
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
}), Pt = ["disabled", "value"], Mt = ["disabled", "value"];
function zt(e, n, t, r, a, o) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (c(), f("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Pt)) : (c(), f("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Mt));
}
const ve = /* @__PURE__ */ I(Tt, [["render", zt], ["__scopeId", "data-v-1347257f"]]), Wt = D({
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
    const t = w({});
    function r(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: r
    };
  }
}), qt = ["value"];
function Ft(e, n, t, r, a, o) {
  return c(), f("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, qt);
}
const Oe = /* @__PURE__ */ I(Wt, [["render", Ft], ["__scopeId", "data-v-eadb6225"]]);
function Kt(e) {
  return it() ? (ut(e), !0) : !1;
}
function Ht(e) {
  return typeof e == "function" ? e() : P(e);
}
const Gt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function fe(e, n, t = {}) {
  const {
    immediate: r = !0
  } = t, a = F(!1);
  let o = null;
  function s() {
    o && (clearTimeout(o), o = null);
  }
  function u() {
    a.value = !1, s();
  }
  function l(...d) {
    s(), a.value = !0, o = setTimeout(() => {
      a.value = !1, o = null, e(...d);
    }, Ht(n));
  }
  return r && (a.value = !0, Gt && l()), Kt(u), {
    isPending: ot(a),
    start: l,
    stop: u
  };
}
class Zt {
  static objectEmpty(n) {
    return Object.keys(n).length === 0 && n.constructor === Object;
  }
  static getDescr(n, t) {
    try {
      return n.values.filter((r) => r[0] === t)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(n) {
    return n || (n = ""), String(n).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(n, t) {
    function r(s) {
      let u = [], l = [], d = /\$\((.*?)\)/g;
      for (; l; ) {
        if (l = d.exec(s), !l) {
          l = !1;
          continue;
        }
        u.push(l[1]);
      }
      return u;
    }
    let a = r(n), o = [];
    Array.isArray(t) || (t = [t]);
    for (let s of t) {
      let u = n;
      for (let l of a) {
        let d = l.split("."), m = s;
        for (let h of d)
          m && m !== "-" && h in m && m[h] ? m = m[h] : m = "-";
        m = this.unescape(m), u = u.replace("$(" + l + ")", m);
      }
      o.push(u);
    }
    return o.join(", ");
  }
}
const Jt = D({
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
    const t = j("boneState"), r = w({
      value: k(() => e.value)
    }), a = F(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return me(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = fe(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      Utils: Zt,
      boneState: t,
      changeEvent: o,
      stringBone: a
    };
  }
}), Yt = ["disabled", "value", "required"];
function Qt(e, n, t, r, a, o) {
  return c(), f("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Yt);
}
const je = /* @__PURE__ */ I(Jt, [["render", Qt], ["__scopeId", "data-v-307247ea"]]), Xt = D({
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
    const t = j("boneState"), r = w({}), a = F(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return me(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = fe(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: o,
      emailBone: a
    };
  }
}), xt = ["disabled", "value"];
function en(e, n, t, r, a, o) {
  return c(), f("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, xt);
}
const Be = /* @__PURE__ */ I(Xt, [["render", en], ["__scopeId", "data-v-c934def3"]]), tn = D({
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
    const t = j("boneState"), r = w({
      value: k(() => {
        var s;
        let o = e.value;
        return t.bonestructure.time ? o = (s = e.value) == null ? void 0 : s.split("+")[0] : e.value && (o = new Date(e.value).toISOString().substr(0, 10)), o;
      }),
      typeString: k(() => {
        let o = "datetime-local";
        return t.bonestructure.time || (o = "date"), o;
      })
    });
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
}), nn = ["disabled", "type", "value"];
function sn(e, n, t, r, a, o) {
  return c(), f("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, nn);
}
const De = /* @__PURE__ */ I(tn, [["render", sn], ["__scopeId", "data-v-b1e3e36d"]]), an = D({
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
    const t = j("boneState"), r = w({
      value: k(() => {
        let s = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? s = s.filter((u) => t.bonestructure.values.map((l) => l[0].toString()).includes(u)) : s = s.filter(
          (u) => Object.keys(t.bonestructure.values).map((l) => l.toString()).includes(u)
        ), s.map((u) => u.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function a() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let s = [];
        for (const [u, l] of Object.entries(t.bonestructure.values))
          s.push([u, l]);
        return s;
      }
    }
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index), W;
    }
    return R(() => {
      n.emit("change", e.name, r.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: o,
      convertObjToList: a
    };
  }
}), rn = ["disabled", "value", "multiple"], ln = ["value"];
function on(e, n, t, r, a, o) {
  return c(), f("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (c(!0), f(E, null, U(e.convertObjToList(), (s) => (c(), f("sl-option", {
      key: s[0],
      value: s[0]
    }, O(s[1]), 9, ln))), 128))
  ], 40, rn);
}
const Ve = /* @__PURE__ */ I(an, [["render", on], ["__scopeId", "data-v-ec843c91"]]), un = D({
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
    const t = j("boneState"), r = w({
      value: k(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function a(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return R(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
}), dn = ["disabled", "checked"];
function cn(e, n, t, r, a, o) {
  return c(), f("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, dn);
}
const Ne = /* @__PURE__ */ I(un, [["render", cn], ["__scopeId", "data-v-43289693"]]), mn = D({
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
    const t = j("boneState"), r = w({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), a = F(null);
    function o(u) {
      r.value1 === r.value2 ? r.equal = !0 : r.equal = !1, s(r.value1), r.requiredPasswordInfo.length === 0 && r.passwordInfo.length - r.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, r.value1, e.lang, e.index, !0) : n.emit("change", e.name, r.value1, e.lang, e.index, !1);
    }
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      r.passwordInfo = [], r.requiredPasswordInfo = [];
      for (const l of t.bonestructure.tests)
        new RegExp(l[0]).test(u) || (l[2] ? r.requiredPasswordInfo.push(l[1]) : r.passwordInfo.push(l[1]));
      r.equal || r.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), r.value1 || r.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return me(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: u } = fe(() => {
          a.value.focus();
        }, 600);
        u();
      }
    }), se(
      () => e.value,
      (u, l) => {
        r.value1 = u;
      }
    ), {
      state: r,
      boneState: t,
      changeEvent: o,
      passwordBone: a
    };
  }
}), fn = ["disabled"], gn = ["name"], hn = ["name"], pn = { class: "errors" };
function bn(e, n, t, r, a, o) {
  return c(), f(E, null, [
    J(i("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": n[0] || (n[0] = (s) => e.state.value1 = s),
      disabled: e.boneState.readonly,
      class: G({ "has-check": !e.boneState.readonly }),
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s)),
      onSlClear: n[2] || (n[2] = (s) => e.state.value1 = ""),
      onKeyup: n[3] || (n[3] = (...s) => e.changeEvent && e.changeEvent(...s))
    }, [
      i("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, gn)
    ], 42, fn), [
      [le, e.state.value1]
    ]),
    e.boneState.readonly ? S("", !0) : J((c(), f("sl-input", {
      key: 0,
      "onUpdate:modelValue": n[4] || (n[4] = (s) => e.state.value2 = s),
      class: "password-check",
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[5] || (n[5] = (...s) => e.changeEvent && e.changeEvent(...s)),
      onSlClear: n[6] || (n[6] = (s) => e.state.value2 = ""),
      onKeyup: n[7] || (n[7] = (...s) => e.changeEvent && e.changeEvent(...s))
    }, [
      i("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, hn)
    ], 544)), [
      [le, e.state.value2]
    ]),
    i("ul", pn, [
      (c(!0), f(E, null, U(e.state.passwordInfo, (s, u) => (c(), f("li", { key: u }, O(s), 1))), 128)),
      (c(!0), f(E, null, U(e.state.requiredPasswordInfo, (s, u) => (c(), f("li", {
        key: u,
        class: "requiredInfo"
      }, O(s), 1))), 128))
    ])
  ], 64);
}
const Re = /* @__PURE__ */ I(mn, [["render", bn], ["__scopeId", "data-v-84a55b3d"]]), vn = D({
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String,
    readonly: Boolean,
    params: Object
  },
  emits: ["change"],
  setup(e, n) {
    const t = j("boneState"), r = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, m;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [h, v] of Object.entries(r.structure)) {
          let p = "default", y = r.structure[h], g = (d = r.value) == null ? void 0 : d[h];
          (m = v == null ? void 0 : v.params) != null && m.category && (p = v.params.category.toLowerCase()), Object.keys(u).includes(p) ? u[p].bones.push({
            boneName: h,
            boneStructure: y,
            boneValue: g
          }) : u[p] = {
            name: v.params.category,
            bones: [
              {
                boneName: h,
                boneStructure: y,
                boneValue: g
              }
            ]
          }, y.visible === !0 && (u[p].groupVisible = !0);
        }
        let l = {};
        return Object.keys(u).sort().forEach(function(h) {
          l[h] = u[h];
        }), l;
      })
    });
    function a(u) {
      n.emit("change", u);
    }
    R(() => {
      dt().appContext.components.Bone ? r.globalRegistration = !0 : r.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o(u) {
      console.log(u);
    }
    function s(u) {
      if (Array.isArray(u)) {
        let l = {};
        for (const d in u)
          l[u[d][0]] = u[d][1];
        return l;
      } else
        return u;
    }
    return {
      state: r,
      boneState: t,
      getBoneWidget: x,
      structureToDict: s,
      changeEvent: a,
      updateValue: o
    };
  }
}), yn = {
  key: 0,
  open: "",
  variant: "danger"
}, $n = {
  key: 1,
  class: "form"
}, Sn = ["summary", "open"];
function _n(e, n, t, r, a, o) {
  const s = ae("bone");
  return e.state.globalRegistration ? (c(), f("div", $n, [
    (c(!0), f(E, null, U(e.state.formGroups, (u, l) => J((c(), f("sl-details", {
      key: l,
      summary: u.name,
      open: u.groupOpen
    }, [
      (c(!0), f(E, null, U(u.bones, (d) => J((c(), T(s, {
        key: d.name,
        is: e.getBoneWidget(e.state.structure[d.boneName].type),
        name: d.boneName,
        structure: e.state.structure,
        skel: e.state.value,
        errors: e.boneState.errors,
        readonly: e.boneState.bonestructure.readonly ? !0 : void 0,
        onChangeInternal: e.changeEvent
      }, null, 8, ["is", "name", "structure", "skel", "errors", "readonly", "onChangeInternal"])), [
        [be, e.state.structure[d.boneName].visible]
      ])), 128))
    ], 8, Sn)), [
      [be, u.groupVisible]
    ])), 128))
  ])) : (c(), f("sl-alert", yn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Xe = /* @__PURE__ */ I(vn, [["render", _n], ["__scopeId", "data-v-4d96a203"]]), kn = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Xe },
  emits: ["change"],
  setup(e, n) {
    const t = j("boneState"), r = w({
      value: {},
      index: k(() => e.index),
      lang: k(() => e.lang)
    });
    function a(o) {
      var u;
      (u = r.value) != null && u[o.name] || (r.value ? r.value[o.name] = null : r.value = { [o.name]: null });
      let s = r.value[o.name];
      o.lang ? (s === null && (s = {}), Object.keys(s).includes(o.lang) && o.index !== null ? s[o.lang][o.index] = o.value : s[o.lang] = o.value) : o.index !== null ? (s === null && (s = []), s[o.index] = o.value) : s = o.value, r.value[o.name] = s, n.emit("change", e.name, r.value, e.lang, e.index, !0);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
});
function wn(e, n, t, r, a, o) {
  const s = ae("Wrapper_nested");
  return c(), T(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Le = /* @__PURE__ */ I(kn, [["render", wn], ["__scopeId", "data-v-ca74eb8e"]]), En = D({
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
    const t = j("boneState"), r = w({});
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
}), An = ["disabled", "value"];
function In(e, n, t, r, a, o) {
  return c(), f("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, An);
}
const Ue = /* @__PURE__ */ I(En, [["render", In], ["__scopeId", "data-v-67e2148c"]]), Cn = D({
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
    const t = j("boneState"), r = w({
      minAmount: k(() => t.bonestructure.minAmount),
      maxAmount: k(() => t.bonestructure.maxAmount),
      precision: k(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), a = F(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return me(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = fe(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: o,
      numericBone: a
    };
  }
}), On = ["disabled", "value", "min", "max", "step"], jn = { class: "info" }, Bn = { key: 0 }, Dn = { key: 1 }, Vn = { key: 2 };
function Nn(e, n, t, r, a, o) {
  return c(), f(E, null, [
    i("sl-input", {
      ref: "numericBone",
      type: "number",
      disabled: e.boneState.readonly,
      value: e.value,
      min: e.state.minAmount,
      max: e.state.maxAmount,
      step: e.state.precision,
      onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
      onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
    }, null, 40, On),
    i("ul", jn, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (c(), f("li", Bn, O(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : S("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (c(), f("li", Dn, O(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : S("", !0),
      e.state.precision ? (c(), f("li", Vn, O(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : S("", !0)
    ])
  ], 64);
}
const Te = /* @__PURE__ */ I(Cn, [["render", Nn], ["__scopeId", "data-v-c3333ce1"]]);
var N = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class ue extends Error {
  constructor(n, t, r, a) {
    super(r || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
  }
}
let pe = null;
function X() {
  return pe || (pe = $e("requestStore", () => {
    const e = w({ sKeys: /* @__PURE__ */ new Set() });
    function n() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: n
    };
  })), pe();
}
class B {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = (N.VITE_API_URL ? N.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: r = null, failedCallback: a = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
    function l() {
      if (t instanceof FormData)
        return t;
      const m = new FormData();
      for (const h in t)
        if (Array.isArray(t[h]))
          for (let v of t[h])
            m.append(h, v);
        else
          m.append(h, t[h]);
      return m;
    }
    let d = oe.post(B.buildUrl(n), l(), null, s, o, u);
    return d.then(function(m) {
      r && r(m.data);
    }).catch(function(m) {
      a && a(m);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = N.VITE_DEFAULT_RENDERER || "json") {
    await B.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (r) => {
      let a = await r.json();
      Array.isArray(a) || (a = [a]), X().state.sKeys = new Set(a);
    });
  }
  static async securePost(n, {
    dataObj: t = null,
    callback: r = null,
    failedCallback: a = null,
    abortController: o = null,
    renderer: s = N.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: l = null,
    amount: d = 30
  } = {}) {
    let m = null;
    X().state.sKeys.size === 0 && await B.getBatchSkeys(d);
    const h = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", h), X().state.sKeys.delete(h)) : (t || (t = {}), t.skey = h, X().state.sKeys.delete(h)), m = B.post(n, {
      dataObj: t,
      callback: r,
      abortController: o,
      headers: u,
      mode: l
    }), m;
  }
  static get(n, {
    dataObj: t = null,
    callback: r = null,
    failedCallback: a = null,
    cached: o = !1,
    clearCache: s = !1,
    abortController: u = null,
    headers: l = null,
    mode: d = null,
    //          milli  sec  min  Std  Tage
    cacheTime: m = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let h = oe.get(B.buildUrl(n), t, s, l, u, d);
    return h.then(function(v) {
      r && r(v.data);
    }).catch(function(v) {
      a && a(v);
    }), h;
  }
  static list(n, {
    dataObj: t = null,
    callback: r = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let l = `/${u}/${n}/list`;
    return o && (l += `/${o}`), B.get(l, {
      dataObj: t,
      callback: r,
      failedCallback: a,
      abortController: s
    });
  }
  static getStructure(n, {
    dataObj: t = null,
    callback: r = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let l = `/${u}/getStructure/${n}`;
    return o && (l += `/${o}`), B.get(l, {
      dataObj: t,
      callback: r,
      failedCallback: a,
      abortController: s
    });
  }
  static view(n, t, {
    dataObj: r = null,
    callback: a = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: l = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${l}/${n}/view/${t}`;
    return s && (d = `/${l}/${n}/view/${s}/${t}`), B.get(d, {
      dataObj: r,
      callback: a,
      failedCallback: o,
      abortController: u
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: r = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let l = `/${u}/${n}/add`;
    return o && (l = `/${u}/${n}/add/${o}`), B.securePost(l, {
      dataObj: t,
      callback: r,
      failedCallback: a,
      abortController: s
    });
  }
  static edit(n, t, {
    dataObj: r = null,
    callback: a = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: l = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${l}/${n}/edit/${t}`;
    return s && (d = `/${l}/${n}/edit/${s}/${t}`), B.securePost(d, {
      dataObj: r,
      callback: a,
      failedCallback: o,
      abortController: u
    });
  }
  static delete(n, t, {
    dataObj: r = null,
    callback: a = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: l = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${l}/${n}/delete/${t}`;
    return s && (d = `/${l}/${n}/delete/${s}/${t}`), B.securePost(d, {
      dataObj: r,
      callback: a,
      failedCallback: o,
      abortController: u,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? B.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? B.buildUrl(n.dest.downloadUrl) : B.buildUrl(null) : B.buildUrl(n);
  }
  static uploadFile(n, t = void 0) {
    const r = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((a, o) => {
      B.securePost("/vi/file/getUploadURL", { dataObj: r }).then(async (s) => {
        let u = await s.json();
        fetch(u.values.uploadUrl, {
          body: n,
          method: "POST",
          mode: "no-cors"
        }).then(async (l) => {
          const d = {
            key: u.values.uploadKey,
            skelType: "leaf"
          };
          B.securePost("/vi/file/add", { dataObj: d }).then(async (m) => {
            let h = await m.json();
            h.action === "addSuccess" ? a(h.values) : o(h);
          }).catch((m) => {
            o(m);
          });
        }).catch((l) => {
          o(l);
        });
      }).catch((s) => {
        o(s);
      });
    });
  }
}
class oe {
  constructor() {
    Ce(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, r = null, a = null, o = null) {
    let s = { method: n };
    return s.credentials = "include", s.headers = {
      Accept: "application/json, text/plain, */*"
    }, r && (s.headers = { ...s.headers, ...r }), t && (s.body = t), a && (s.signal = a.signal), o && (s.mode = o), s;
  }
  static get(n, t = null, r = null, a = null, o = null, s = null) {
    function u(l, d) {
      let m = new URL(l);
      if (d && Object.keys(d).length > 0) {
        const h = new URLSearchParams();
        for (const [v, p] of Object.entries(d))
          if (Array.isArray(p))
            for (const y of p)
              h.append(v, y);
          else
            h.append(v, p);
        m.search = h.toString();
      }
      return m.toString();
    }
    return fetch(u(n, t), oe.buildOptions("GET", null, a, o, s)).then(async (l) => {
      if (l.ok)
        return l;
      {
        const d = `${l.status} ${l.statusText}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(l.status, l.statusText, d, l));
      }
    }).catch((l) => {
      if (l instanceof TypeError) {
        const m = `503 ${l.message}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(503, l.message, m, l));
      }
      if (l instanceof DOMException && l.name == "AbortError") {
        const m = `${l.code} ${l.name}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(l.code, l.name, m, { url: n }));
      }
      const d = `${l.statusCode} ${l.statusText}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ue(l.statusCode, l.statusText, d, l.response));
    });
  }
  static post(n, t = null, r = null, a = null, o = null, s = null) {
    return fetch(n, oe.buildOptions("POST", t, a, o, s));
  }
}
var Rn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ln = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Xe },
  emits: ["change"],
  setup(e, n) {
    const t = j("boneState"), r = j("formatString"), a = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(l) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Rn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (m) => {
        var v;
        const h = await m.json();
        a.skellistdata = {};
        for (let p of h.skellist)
          a.skellistdata[p.key] = p;
        return (v = h.skellist) == null ? void 0 : v.map((p) => ({ text: r(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
      });
    }
    function s(l) {
      a.selection = { dest: a.skellistdata[l.detail.item.value] }, n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function u(l) {
      var m;
      a.selection || (a.selection = {}), (m = a.selection.rel) != null && m[l.name] || (a.selection.rel ? a.selection.rel[l.name] = null : a.selection.rel = { [l.name]: null });
      let d = a.selection.rel[l.name];
      l.lang ? (d === null && (d = {}), Object.keys(d).includes(l.lang) && l.index !== null ? d[l.lang][l.index] = l.value : d[l.lang] = l.value) : l.index !== null ? (d === null && (d = []), d[l.index] = l.value) : d = l.value, Object.keys(a.selection).includes("rel") && a.selection.rel ? a.selection.rel[l.name] = d : a.selection.rel = { [l.name]: d }, Object.keys(a.selection).includes("dest") && n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    return R(() => {
      a.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      formatString: r,
      changeEvent: s,
      changeEventNested: u,
      getList: o
    };
  }
}), Un = (e) => (z("data-v-68322b2d"), e = e(), q(), e), Tn = { class: "record" }, Pn = { class: "single-entry" }, Mn = ["value"], zn = ["disabled", "source"], Wn = ["title"], qn = /* @__PURE__ */ Un(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Fn = [
  qn
];
function Kn(e, n, t, r, a, o) {
  var u, l;
  const s = ae("Wrapper_nested");
  return c(), f("div", Tn, [
    i("div", Pn, [
      e.state.selection ? (c(), f("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Mn)) : (c(), f("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, zn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (c(), f("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Fn, 8, Wn)) : S("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (c(), T(s, {
      key: 0,
      value: (l = e.value) == null ? void 0 : l.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : S("", !0)
  ]);
}
const Pe = /* @__PURE__ */ I(Ln, [["render", Kn], ["__scopeId", "data-v-68322b2d"]]), Hn = D({
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
    const t = j("boneState"), r = w({});
    function a(o, s) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
}), Gn = { class: "box" };
function Zn(e, n, t, r, a, o) {
  return c(), f("div", Gn, O(e.value), 1);
}
const Jn = /* @__PURE__ */ I(Hn, [["render", Zn], ["__scopeId", "data-v-5b6fa95d"]]);
var Me = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Yn = D({
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
    const t = j("boneState"), r = F(), a = w({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o() {
      console.log(B.downloadUrlFor(e.value)), window.open(B.downloadUrlFor(e.value));
    }
    function s() {
      return B.downloadUrlFor(e.value, !1);
    }
    function u(m) {
      const h = {
        fileName: m.name,
        mimeType: m.type || "application/octet-stream",
        size: m.size.toString()
      };
      return new Promise((v, p) => {
        B.securePost(`/${Me.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: h }).then(async (y) => {
          let g = await y.json();
          fetch(g.values.uploadUrl, {
            body: m,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const $ = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost(`/${Me.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: $ }).then(async (_) => {
              let A = await _.json();
              A.action === "addSuccess" ? v(A.values) : p(A);
            }).catch((_) => {
              p(_);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch((y) => {
          p(y);
        });
      });
    }
    async function l(m) {
      a.loading = !0;
      for (let h of m.target.files) {
        let v = await u(h);
        r.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function d(m) {
      a.loading = !0, a.droparea = !1;
      for (let h of m.dataTransfer.files) {
        let v = await u(h);
        r.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
        break;
      }
      a.loading = !1;
    }
    return {
      state: a,
      boneState: t,
      downloadFile: o,
      createBackgroundImage: s,
      handleUpload: l,
      uploadinput: r,
      handleDrop: d
    };
  }
}), ge = (e) => (z("data-v-64b3e67e"), e = e(), q(), e), Qn = {
  key: 0,
  class: "loader"
}, Xn = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), xn = [
  Xn
], es = {
  key: 1,
  class: "droparea"
}, ts = ["title"], ns = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), ss = [
  ns
], as = ["multiple"], rs = ["title"], ls = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), os = [
  ls
], is = { class: "box" }, us = ["src"], ds = ["label", "open"], cs = ["src"], ms = {
  key: 1,
  class: "preview"
}, fs = {
  key: 0,
  name: "file-earmark"
}, gs = { key: 2 }, hs = ["title"], ps = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), bs = [
  ps
];
function vs(e, n, t, r, a, o) {
  var s, u, l, d, m, h, v, p, y, g;
  return c(), f("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (c(), f("div", Qn, xn)) : S("", !0),
    e.state.droparea ? (c(), f("div", es, " Dateien hier hinziehen ")) : S("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (c(), f("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, ss, 8, ts)) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, as),
    e.value ? (c(), f("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, os, 8, rs)) : S("", !0),
    i("div", is, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (c(), f("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, us),
        i("sl-dialog", {
          label: decodeURIComponent((d = (l = e.value) == null ? void 0 : l.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, cs)
        ], 8, ds)
      ])) : (c(), f("div", ms, [
        (h = (m = e.value) == null ? void 0 : m.dest) != null && h.name ? (c(), f("sl-icon", fs)) : S("", !0)
      ])),
      (p = (v = e.value) == null ? void 0 : v.dest) != null && p.name ? (c(), f("div", gs, O(decodeURIComponent((g = (y = e.value) == null ? void 0 : y.dest) == null ? void 0 : g.name)), 1)) : S("", !0)
    ]),
    e.boneState.multiple ? S("", !0) : (c(), f("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, bs, 8, hs))
  ], 32);
}
const ze = /* @__PURE__ */ I(Yn, [["render", vs], ["__scopeId", "data-v-64b3e67e"]]), ys = D({
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
    const t = j("boneState"), r = w({
      value: "",
      editorConfig: {},
      editor: k(() => ClassicEditor)
    });
    function a(u) {
      n.emit("change", e.name, r.value, e.lang, e.index);
    }
    function o(u) {
      r.value = u.target.value, n.emit("change", e.name, r.value, e.lang, e.index);
    }
    R(() => {
      e.value !== null && (r.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      u.editing.view.change((l) => {
        l.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return se(
      () => e.value,
      (u, l) => {
        r.value = u;
      }
    ), {
      state: r,
      ClassicEditor,
      boneState: t,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: o
    };
  }
}), $s = ["disabled", "value"];
function Ss(e, n, t, r, a, o) {
  var u, l, d, m;
  const s = ae("ckeditor");
  return e.state.editor ? (c(), f(E, { key: 0 }, [
    (u = e.boneState.bonestructure) != null && u.valid_html || (l = e.boneState.bonestructure) != null && l.validHtml ? (c(), T(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (h) => e.state.value = h),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (c(), f("sl-textarea", {
      key: 1,
      disabled: (m = e.boneState) == null ? void 0 : m.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...h) => e.changeEventTextarea && e.changeEventTextarea(...h))
    }, null, 40, $s))
  ], 64)) : S("", !0);
}
const We = /* @__PURE__ */ I(ys, [["render", Ss]]), _s = D({
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
    const t = j("boneState"), r = w({
      valueLat: null,
      valueLng: null
    });
    function a() {
      n.emit("change", e.name, [r.valueLat, r.valueLng], e.lang, e.index);
    }
    return R(() => {
      try {
        r.valueLat = e.value[0], r.valueLng = e.value[1];
      } catch {
      }
      n.emit("change", e.name, [r.valueLat, r.valueLng], e.lang, e.index);
    }), {
      state: r,
      boneState: t,
      changeEvent: a
    };
  }
}), ks = ["name", "min", "max", "disabled"], ws = ["name", "min", "max", "disabled"];
function Es(e, n, t, r, a, o) {
  return c(), f(E, null, [
    J(i("sl-input", {
      "onUpdate:modelValue": n[0] || (n[0] = (s) => e.state.valueLat = s),
      index: "lat",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s)),
      placeholder: "Lat"
    }, null, 40, ks), [
      [le, e.state.valueLat]
    ]),
    J(i("sl-input", {
      "onUpdate:modelValue": n[2] || (n[2] = (s) => e.state.valueLng = s),
      index: "lng",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: n[3] || (n[3] = (...s) => e.changeEvent && e.changeEvent(...s)),
      placeholder: "Long"
    }, null, 40, ws), [
      [le, e.state.valueLng]
    ])
  ], 64);
}
const qe = /* @__PURE__ */ I(_s, [["render", Es], ["__scopeId", "data-v-54369cfc"]]), As = D({
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
    const t = j("boneState"), r = w({
      counter: 0,
      debounce: null
    }), a = j("addMultipleEntry"), o = j("removeMultipleEntries");
    function s() {
      r.counter += 1;
      let l = 200;
      r.counter > 1 && (l = 500), r.debounce && clearTimeout(r.debounce), r.debounce = setTimeout(() => {
        for (let d = r.counter; d--; )
          a(e.lang);
        r.counter = 0;
      }, l);
    }
    function u() {
      let l = 200;
      r.debounce && clearTimeout(r.debounce), r.debounce = setTimeout(() => {
        o(e.lang);
      }, l);
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: r,
      boneState: t,
      handleAdd: s,
      handleRemove: u,
      removeMultipleEntries: o
    };
  }
}), xe = (e) => (z("data-v-91feef37"), e = e(), q(), e), Is = { class: "actionbar" }, Cs = ["title"], Os = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), js = [
  Os
], Bs = ["title"], Ds = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Vs(e, n, t, r, a, o) {
  return c(), f("div", Is, [
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, js, 8, Cs)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Ds,
      C(" " + O(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (c(), f(E, { key: 0 }, [
        C("(" + O(e.state.counter) + ")", 1)
      ], 64)) : S("", !0)
    ], 8, Bs)) : S("", !0)
  ]);
}
const Ns = /* @__PURE__ */ I(As, [["render", Vs], ["__scopeId", "data-v-91feef37"]]);
var Rs = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ls = D({
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
    const t = j("boneState"), r = j("addMultipleEntry"), a = j("formatString"), o = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(l) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Rs.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (m) => {
        var v;
        const h = await m.json();
        return s.skels = h.skellist.reduce((p, y) => (p[y.key] = y, p), {}), (v = h.skellist) == null ? void 0 : v.map((p) => ({ text: a(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
      });
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: r,
      removeMultipleEntries: o,
      getList: u
    };
  }
}), et = (e) => (z("data-v-f9a556f3"), e = e(), q(), e), Us = { class: "actionbar" }, Ts = ["title"], Ps = /* @__PURE__ */ et(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ms = [
  Ps
], zs = ["source"], Ws = ["title"], qs = /* @__PURE__ */ et(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Fs(e, n, t, r, a, o) {
  return c(), f("div", Us, [
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ms, 8, Ts)) : S("", !0),
    i("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: n[1] || (n[1] = (s) => {
        var u;
        return e.addMultipleEntry(e.lang, {
          dest: (u = e.state.skels) == null ? void 0 : u[s.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, zs),
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      qs,
      C(" " + O(e.$t("bone.list")), 1)
    ], 8, Ws)) : S("", !0)
  ]);
}
const Ks = /* @__PURE__ */ I(Ls, [["render", Fs], ["__scopeId", "data-v-f9a556f3"]]);
var Fe = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Hs = D({
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
    const t = j("boneState"), r = j("addMultipleEntry");
    j("formatString");
    const a = null, o = F(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(m) {
      const h = {
        fileName: m.name,
        mimeType: m.type || "application/octet-stream",
        size: m.size.toString()
      };
      return new Promise((v, p) => {
        B.securePost(`/${Fe.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: h }).then(async (y) => {
          let g = await y.json();
          fetch(g.values.uploadUrl, {
            body: m,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const $ = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost(`/${Fe.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: $ }).then(async (_) => {
              let A = await _.json();
              A.action === "addSuccess" ? v(A.values) : p(A);
            }).catch((_) => {
              p(_);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch((y) => {
          p(y);
        });
      });
    }
    async function l(m) {
      s.loading = !0;
      for (let h of m.target.files) {
        let v = await u(h);
        o.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), r(e.lang, { dest: v, rel: p });
      }
      s.loading = !1;
    }
    async function d(m) {
      s.loading = !0, s.droparea = !1;
      for (let h of m.dataTransfer.files) {
        let v = await u(h);
        o.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), r(e.lang, { dest: v, rel: p });
      }
      s.loading = !1;
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: r,
      removeMultipleEntries: a,
      uploadFile: u,
      uploadinput: o,
      handleUpload: l,
      handleDrop: d
    };
  }
}), Se = (e) => (z("data-v-3c1b10df"), e = e(), q(), e), Gs = ["title"], Zs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Js = [
  Zs
], Ys = {
  key: 1,
  class: "droparea"
}, Qs = ["multiple"], Xs = ["title"], xs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), ea = [
  xs
], ta = ["title"], na = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), sa = {
  key: 0,
  slot: "suffix"
};
function aa(e, n, t, r, a, o) {
  return c(), f("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = de((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = de((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Js, 8, Gs)) : S("", !0),
    e.state.droparea ? (c(), f("div", Ys, " Dateien hier hinziehen ")) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Qs),
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, ea, 8, Xs)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (c(), f("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      na,
      C(" " + O(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (c(), f("sl-spinner", sa)) : S("", !0)
    ], 8, ta)) : S("", !0)
  ], 32);
}
const ra = /* @__PURE__ */ I(Hs, [["render", aa], ["__scopeId", "data-v-3c1b10df"]]), _e = $e("boneStore", () => {
  const e = w({
    additionalBones: K({}),
    defaultBones: K({
      rawBone: ve,
      keyBone: Oe,
      stringBone: je,
      emailBone: Be,
      dateBone: De,
      booleanBone: Ne,
      selectBone: Ve,
      passwordBone: Re,
      recordBone: Le,
      numericBone: Te,
      colorBone: Ue,
      relationalBone: Pe,
      jsonBone: Jn,
      fileBone: ze,
      textBone: We,
      spatialBone: qe
    }),
    actionbars: K({
      "relational.tree.leaf.file.file": ra,
      "relational.": Ks
    }),
    multibones: K(["select", "select."])
  });
  function n(s, u) {
    e.additionalBones[s] = u;
  }
  function t() {
    let s = e.defaultBones;
    for (const [u, l] of Object.entries(e.additionalBones))
      s.add(l);
    return s;
  }
  function r(s) {
    if (Object.keys(e.additionalBones).includes(s))
      return e.additionalBones[s];
    {
      let u = s.split("."), l = Object.entries(e.additionalBones).filter(
        (d) => d[0].startsWith(u[0] + ".")
      );
      if (l.length > 0) {
        l.sort((d, m) => m.length - d.length);
        for (let d of l)
          if (s.startsWith(d[0]))
            return e.additionalBones[d[0]];
      }
    }
    return s === "date" ? De : s === "key" ? Oe : s === "str.email" ? Be : s === "str" || s.startsWith("str.") ? je : s === "select" || s.startsWith("select.") ? Ve : s === "bool" ? Ne : s === "password" ? Re : s === "record" ? Le : s === "numeric" || s.startsWith("numeric.") ? Te : s === "relational.tree.leaf.file.file" ? ze : s === "relational" || s.startsWith("relational.") ? Pe : s === "color" ? Ue : s === "text" ? We : s === "spatial" ? qe : ve;
  }
  function a(s, u) {
    e.actionbars[s] = u;
  }
  function o(s) {
    if (Object.keys(e.actionbars).includes(s))
      return e.actionbars[s];
    {
      let u = s.split("."), l = Object.entries(e.actionbars).filter(
        (d) => d[0].startsWith(u[0] + ".")
      );
      if (l.length > 0) {
        l.sort((d, m) => m.length - d.length);
        for (let d of l)
          if (s.startsWith(d[0]))
            return e.actionbars[d[0]];
      }
    }
    return Ns;
  }
  return {
    state: e,
    addBoneWidget: n,
    getBoneWidget: r,
    importWidgets: t,
    addBoneActionbar: a,
    getBoneActionbar: o
  };
});
function la(e) {
  return _e().getBoneActionbar(e);
}
function x(e) {
  return _e().getBoneWidget(e);
}
function oa(e) {
  const n = _e();
  if (n.state.multibones.includes(e))
    return !0;
  {
    let t = e.split("."), r = Object.entries(n.state.multibones).filter(
      (a) => a[1].startsWith(t[0] + ".")
    );
    if (r.length > 0) {
      r.sort((a, o) => o.length - a.length);
      for (let a of r)
        if (e.startsWith(a[1]))
          return !0;
    }
  }
  return !1;
}
D({
  inheritAttrs: !1,
  emits: ["change", "change-internal", "handleClick"],
  components: {
    wrapperMultiple: Bt,
    BoneLabel: Ut
  },
  props: {
    is: {
      type: Object,
      default: ve
    },
    name: {
      type: String,
      required: !0
    },
    languages: Array,
    multiple: Boolean,
    readonly: Boolean,
    required: Boolean,
    params: Object,
    value: [Object, String, Number, Boolean, Array],
    structure: {
      type: Object,
      required: !0
    },
    skel: {
      type: null,
      required: !0
    },
    errors: Object,
    showLabelInfo: { type: Boolean, required: !1, default: !1 },
    autofocus: { type: Boolean, required: !1, default: !1 }
  },
  setup(e, n) {
    const t = w({
      bonestructure: k(() => {
        var g;
        return (g = e.structure) == null ? void 0 : g[e.name];
      }),
      bonevalue: null,
      dragStartIndex: {
        lang: null,
        index: Number
      },
      dropIndex: {
        lang: null,
        index: Number
      },
      draggingLineBottom: {
        lang: String,
        index: Number
      },
      draggingLineTop: {
        lang: String,
        index: Number
      },
      isDragging: {
        lang: String,
        index: Number
      },
      multilanguage: k(() => {
        var g;
        return ((g = t.languages) == null ? void 0 : g.length) && t.languages.length > 0;
      }),
      languages: k(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: k(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: k(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: k(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: k(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: k(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: k(() => {
        var g;
        return la((g = t.bonestructure) == null ? void 0 : g.type);
      }),
      isEmpty: k(() => {
        function g(b) {
          for (const [$, _] of Object.entries(b))
            if (_ !== null) {
              if (Array.isArray(_) && _.length > 0)
                return !1;
              if (!Array.isArray(_))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? g(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: k(() => {
        let g = [];
        for (let b of e.errors)
          b.fieldPath[0] === e.name && (b.severity > 2 || t.required && (b.severity === 2 || b.severity === 0)) && g.push(b.errorMessage);
        return g;
      })
    });
    ie("boneState", t);
    function r(g, b, $) {
      s(b, g, "isDragging"), s(b, g, "dragStartIndex");
    }
    function a(g, b, $) {
      $.preventDefault();
      const _ = $.clientY - $.target.getBoundingClientRect().top, A = $.target.closest(".value-line");
      _ < A.offsetHeight / 2 ? (s(b, g, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = g) : (s(b, g, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = g + 1);
      let L = b ? t.bonevalue[b] : t.bonevalue;
      t.dropIndex.index > L.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(g, b, $) {
      let _ = null;
      t.dragStartIndex.index !== t.dropIndex.index && (b ? (_ = t.bonevalue[b].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[b].splice(t.dropIndex.index, 0, _)) : (_ = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, _)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: b,
        index: g
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(g, b, $) {
      t[$].lang = g || null, t[$].index = b;
    }
    function u(...g) {
      g.forEach((b) => {
        t[b] = {
          lang: null,
          index: Number
        };
      });
    }
    function l(g, b, $ = null, _ = null, A) {
      if (b === void 0 || ($ ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes($) && _ !== null ? t.bonevalue[$][_] = b : t.bonevalue[$] = b) : _ !== null ? t.bonevalue[_] = b : A === !1 || (t.bonevalue = b), t.readonly)) return !1;
      let L = {
        name: g,
        value: d(),
        lang: $,
        index: _
      }, V = {
        name: g,
        value: b,
        lang: $,
        index: _
      };
      A != null && (L.pwMatch = A, V.pwMatch = A), n.emit("change", L), n.emit("change-internal", V);
    }
    function d() {
      function g($, _ = null) {
        let A = [];
        if (Array.isArray($))
          if (t.bonestructure.type == "spatial" && $.length === 2 && !Array.isArray($[0]))
            A.push({ [_ + ".lat"]: $[0] }), A.push({ [_ + ".lng"]: $[1] });
          else if (Object.values($).filter((L) => L === Object(L)).length > 0)
            for (const [L, V] of $.entries())
              V.rel !== null ? A.push(g(V, _ + "." + L)) : A.push(g(V, _));
          else
            for (const [L, V] of $.entries())
              A.push(g(V, _));
        else if ($ === Object($))
          for (const [L, V] of Object.entries($))
            _ ? _.endsWith(".dest") || _.endsWith(".rel") ? _.endsWith(".dest") && L === "key" ? (/\.[0-9]*\.dest$/.test(_) ? A.push(g(V, _.replace(/\.[0-9]*\.dest/, ""))) : A.push(g(V, _.replace(/\.dest/, ""))), A.push(g(V, _.replace(/\.dest/, "") + "." + L))) : _.endsWith(".rel") && A.push(g(V, _.replace(/\.rel/, "") + "." + L)) : A.push(g(V, _ + "." + L)) : A.push(g(V, L));
        else
          $ == null && ($ = ""), _ !== null && A.push({ [_]: $ });
        return A;
      }
      let b = g(t.bonevalue, e.name);
      return b = b.flat(10), b;
    }
    function m(g = null, b = "") {
      g ? Object.keys(t.bonevalue).includes(g) ? t.bonevalue[g].push(b) : t.bonevalue[g] = [b] : t.bonevalue ? t.bonevalue.push(b) : t.bonevalue = [b];
    }
    ie("addMultipleEntry", m);
    function h(g, b = null) {
      var $;
      b ? ($ = t.bonevalue) == null || $[b].splice(g, 1) : t.bonevalue.splice(g, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: b,
        index: g
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: b,
        index: g
      });
    }
    function v(g = null) {
      var b;
      g ? (b = t.bonevalue) == null || b[g].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: d(),
        lang: g
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: g
      });
    }
    ie("removeMultipleEntries", v);
    function p(g = null, b = "") {
      m(g, b);
    }
    function y(g, b) {
      function $(V) {
        let Z = [], H = [], ne = /\$\((.*?)\)/g;
        for (; H; ) {
          if (H = ne.exec(V), !H) {
            H = !1;
            continue;
          }
          Z.push(H[1]);
        }
        return Z;
      }
      function _(V, Z) {
        let H = V.split("."), ne = V.split("."), M = Z;
        for (let Q of H)
          if (ne.shift(), M && M !== "-" && Object.keys(M).includes(Q) && M[Q])
            if (Array.isArray(M[Q])) {
              let Ie = [];
              for (let at of M[Q])
                Ie.push(_(ne.join("."), at));
              M = Ie.join(", ");
            } else
              M = M[Q];
          else (!M || typeof M[Q] == "object" && !M[Q]) && (M = "-");
        return M;
      }
      let A = $(g), L = [];
      Array.isArray(b) || (b = [b]);
      for (let V of b) {
        let Z = g;
        for (let H of A) {
          let ne = _(H, V);
          Z = Z.replace("$(" + H + ")", ne);
        }
        L.push(Z);
      }
      return L.join(", ");
    }
    return ie("formatString", y), Y(() => {
      var g;
      e.value ? t.bonevalue = e.value : t.bonevalue = (g = e.skel) == null ? void 0 : g[e.name];
    }), se(
      () => e.skel,
      (g, b) => {
        var $;
        t.bonevalue = ($ = e.skel) == null ? void 0 : $[e.name];
      }
    ), se(
      () => {
        var g;
        return (g = e.errors) == null ? void 0 : g[e.name];
      },
      (g, b) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: l,
      addMultipleEntry: m,
      removeMultipleEntry: h,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: oa,
      multipleBonePressEnter: p,
      handleDragStart: r,
      handleDragOver: a,
      handleDrop: o,
      setStateProperties: s,
      resetStateProperties: u
    };
  }
});
const ke = {
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
    const t = w({
      trackWidth: k(() => `${e.size / 30}rem`),
      outerSize: k(() => `calc(${e.size}rem + ${t.trackWidth})`),
      spinnerSize: k(() => `${e.size}rem`),
      logoSize: k(() => `calc(${e.size}rem - ${t.trackWidth} * 10)`),
      shadow: k(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: t };
  }
}, Ke = () => {
  ct((e) => ({
    "362218f4": e.state.outerSize,
    "13ac2e48": e.state.shadow,
    "7f485774": e.state.logoSize,
    "57a89592": e.state.spinnerSize,
    "18fc7098": e.color,
    "6b864463": e.state.trackWidth
  }));
}, He = ke.setup;
ke.setup = He ? (e, n) => (Ke(), He(e, n)) : Ke;
const ia = (e) => (z("data-v-0cc923f1"), e = e(), q(), e), ua = {
  key: 0,
  class: "loading"
}, da = /* @__PURE__ */ ia(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ca = { class: "logo" }, ma = ["src"];
function fa(e, n, t, r, a, o) {
  return c(), T(mt, null, {
    default: ft(() => [
      t.active ? (c(), f("div", ua, [
        da,
        i("div", ca, [
          i("sl-icon", { src: t.logo }, null, 8, ma)
        ])
      ])) : S("", !0)
    ]),
    _: 1
  });
}
const ga = /* @__PURE__ */ I(ke, [["render", fa], ["__scopeId", "data-v-0cc923f1"]]), ha = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (c(), f("pre", null, O(e.node.name), 1));
  }
}, he = (e) => (z("data-v-d028edef"), e = e(), q(), e), pa = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ba = ["src"], va = { class: "viur-shop-cart-leaf-headline headline" }, ya = { class: "viur-shop-cart-leaf-artno" }, $a = ["innerHTML"], Sa = { class: "viur-shop-cart-leaf-quantity" }, _a = { class: "viur-shop-cart-leaf-unitprice" }, ka = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), wa = ["value"], Ea = { class: "viur-shop-cart-leaf-actions" }, Aa = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-cart-leaf-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ i("sl-icon", {
    name: "heart",
    slot: "prefix"
  })
], -1)), Ia = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Ca = [
  Ia
], Oa = { class: "viur-shop-cart-leaf-price" }, ja = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Ba = ["value"], Da = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 },
    placeholder: { type: String, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: n }) {
    const t = e, r = n, a = w({
      leaf: {}
    });
    function o(l) {
      return l !== void 0 ? ht.downloadUrlFor(l) : t.placeholder;
    }
    function s(l, d, m, h) {
      r("updateItem", {
        item: l,
        articleKey: d,
        node: m,
        quantity: h
      });
    }
    function u(l, d, m) {
      r("removeItem", { item: l, articleKey: d, node: m });
    }
    return Y(() => {
      a.leaf = t.leaf;
    }), (l, d) => (c(), f("sl-card", pa, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(
          a.leaf.article.dest.shop_image ? a.leaf.article.dest.shop_image : void 0
        )
      }, null, 8, ba),
      i("h4", va, O(a.leaf.shop_name), 1),
      i("h5", ya, O(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, $a),
      i("div", Sa, [
        J(i("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": d[0] || (d[0] = (m) => a.leaf.quantity = m),
          onInput: d[1] || (d[1] = (m) => s(
            a.leaf,
            a.leaf.article.dest.key,
            e.node,
            a.leaf.quantity
          ))
        }, null, 544), [
          [le, a.leaf.quantity]
        ])
      ]),
      i("div", _a, [
        ka,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, wa)
      ]),
      i("div", Ea, [
        Aa,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[2] || (d[2] = (m) => u(a.leaf, a.leaf.article.dest.key, e.node))
        }, Ca)
      ]),
      i("div", Oa, [
        ja,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, Ba)
      ])
    ]));
  }
}, Va = /* @__PURE__ */ I(Da, [["__scopeId", "data-v-d028edef"]]), tt = (e) => (z("data-v-df7b65d0"), e = e(), q(), e), Na = { key: 0 }, Ra = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), La = {
  class: "footer-wrap",
  slot: "footer"
}, Ua = { class: "viur-shop-cart-node" }, Ta = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), Pa = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    placeholder: { type: String, required: !0 }
  },
  setup(e) {
    const n = e, t = ee(), r = F(null), a = w({
      itemsIsInit: k(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    k(() => n.mode === "basket" ? t.state.basketRootNode.key : n.cartKey);
    async function o() {
      await t.updateItem(
        a.currentItem.article.dest.key,
        a.currentNode.key,
        0
      ), await d(), r.value.hide();
    }
    async function s(h) {
      console.log("updateItem :", h), h.quantity === 0 ? (r.value.show(), a.currentItem = h.item, a.currentNode = h.node) : (await t.updateItem(h.articleKey, h.node.key, h.quantity), await t.init());
    }
    function u(h) {
      console.log("removeItem :", h), r.value.show(), a.currentItem = h.item, a.currentNode = h.node;
    }
    async function l() {
      a.leaves[a.currentNode.key].forEach((h) => {
        h.key === a.currentItem.key && (h.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function d() {
      a.nodes = [], a.leaves = {}, await t.init(), await m();
    }
    async function m(h = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", h);
      const v = await t.getChildren(h);
      console.log("getChildren children: ", v), v.forEach(async (p) => {
        p.skel_type === "node" ? (a.nodes.push(p), await m(p.key)) : (Object.keys(a.leaves).includes(h) || (a.leaves[h] = []), a.leaves[h].push(p));
      });
    }
    return Y(async () => {
      await t.init(), await m(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (h, v) => e.cartKey.length ? (c(), f(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: r,
        onSlHide: l
      }, [
        Ra,
        i("div", La, [
          i("sl-button", {
            variant: "danger",
            onClick: v[0] || (v[0] = (p) => r.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (c(!0), f(E, null, U(a.nodes, (p) => (c(), f("div", Ua, [
        Object.keys(a.leaves).includes(p.key) ? (c(), f(E, { key: 0 }, [
          ye(ha, { node: p }, null, 8, ["node"]),
          (c(!0), f(E, null, U(a.leaves[p.key], (y) => (c(), T(Va, {
            key: y.key,
            leaf: y,
            node: p,
            placeholder: e.placeholder,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node", "placeholder"]))), 128))
        ], 64)) : S("", !0)
      ]))), 256)),
      Ta
    ], 64)) : (c(), f("sl-spinner", Na));
  }
}, ce = /* @__PURE__ */ I(Pa, [["__scopeId", "data-v-df7b65d0"]]), Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ce
}, Symbol.toStringTag, { value: "Module" })), re = (e) => (z("data-v-4082d346"), e = e(), q(), e), za = {
  key: 1,
  class: "list"
}, Wa = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), qa = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ C(" Versandadresse "),
      /* @__PURE__ */ i("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ i("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ C(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" Speicherstraße 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ C(" Rechnungsadresse "),
      /* @__PURE__ */ i("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ i("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ C(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" Speicherstraße 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ C(" 0231 21 34 68 90 ")
  ])
], -1)), Fa = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ i("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ C(" Paypal ")
  ]),
  /* @__PURE__ */ i("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ i("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), Ka = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), Ha = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Ga = /* @__PURE__ */ re(() => /* @__PURE__ */ i("br", null, null, -1)), Za = { class: "viur-shop-cart-sidebar-btn-wrap" }, Ja = ["variant", "disabled"], Ya = {
  __name: "ConfirmView",
  setup(e) {
    const n = ee(), t = w({
      cartIsInit: k(() => !0),
      itemsIsInit: k(() => {
        var a;
        return !!((a = n.state) != null && a.carts[n.state.basket].items);
      }),
      images: {},
      showOrderButton: !1
    });
    function r(a) {
      a.target.checked && (t.showOrderButton = !0), a.target.checked || (t.showOrderButton = !1);
    }
    return Y(async () => {
      await n.init();
    }), (a, o) => t.cartIsInit ? (c(), f("div", za, [
      Wa,
      qa,
      Fa,
      Ka,
      (c(), T(gt, { to: "#order_sidebar" }, [
        Ha,
        Ga,
        i("sl-checkbox", { onSlChange: r }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", Za, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Ja)
        ])
      ]))
    ])) : (c(), T(ga, { key: 0 }));
  }
}, we = /* @__PURE__ */ I(Ya, [["__scopeId", "data-v-4082d346"]]), Qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), Xa = { class: "viur-shop-discount" }, xa = { class: "viur-shop-discount-alert" }, er = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), tr = { key: 0 }, nr = { key: 0 }, sr = { key: 1 }, ar = {
  __name: "Discount",
  setup(e) {
    const n = ee(), t = F(null), r = F(null), a = w({
      errorMessage: ""
    });
    async function o() {
      r.value.hide();
      const s = t.value.value;
      if (!s) {
        r.value.show(), a.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      let u = await n.addDiscount(s);
      console.log("resp", u);
    }
    return (s, u) => (c(), f(E, null, [
      i("div", Xa, [
        i("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: t,
          class: "viur-shop-discount-input"
        }, null, 512),
        i("sl-button", {
          onClick: o,
          class: "viur-shop-discount-submit-btn"
        }, "Einlösen")
      ]),
      i("div", xa, [
        i("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: r,
          closable: "",
          duration: "2000"
        }, [
          er,
          C(" " + O(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        P(n).state.basketRootNode.discount ? (c(), f("div", tr, [
          P(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (c(), f("span", nr, " Sie haben einen Rabattcode im Wert von " + O(P(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : S("", !0),
          P(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (c(), f("span", sr, " Sie haben einen Rabattcode im Wert von " + O(P(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : S("", !0)
        ])) : S("", !0)
      ])
    ], 64));
  }
}, rr = { class: "viur-shop-sidebar" }, lr = /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1), or = /* @__PURE__ */ i("br", null, null, -1), ir = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Zwischensumme"),
  /* @__PURE__ */ C(" 999.99 € ")
], -1), ur = { class: "viur-shop-cart-sidebar-info-line" }, dr = /* @__PURE__ */ i("span", null, "Rabatt", -1), cr = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ C(" 0 € ")
], -1), mr = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ C(" € ")
], -1), fr = { class: "viur-shop-cart-sidebar-btn-wrap" }, gr = { class: "viur-shop-discount-wrap" }, hr = /* @__PURE__ */ i("sl-button", {
  variant: "primary",
  size: "medium"
}, " Jetzt Bestellen ", -1), pr = /* @__PURE__ */ i("sl-button", {
  size: "medium",
  variant: "info"
}, [
  /* @__PURE__ */ i("sl-icon", {
    name: "paypal",
    slot: "prefix"
  }),
  /* @__PURE__ */ C(" Paypal ")
], -1), br = {
  __name: "OrderSidebar",
  setup(e) {
    const n = ee();
    return Y(() => {
      n.init();
    }), (t, r) => (c(), f("div", rr, [
      lr,
      or,
      ir,
      i("div", ur, [
        dr,
        C(" " + O(P(n).state.basketRootNode.total - P(n).state.basketRootNode.total_discount_price) + " € ", 1)
      ]),
      cr,
      mr,
      i("div", fr, [
        i("div", gr, [
          ye(ar)
        ]),
        hr,
        pr
      ])
    ]));
  }
}, vr = (e) => (z("data-v-d92aa645"), e = e(), q(), e), yr = { class: "bind viur-shop-wrap" }, $r = ["panel", "disabled"], Sr = { class: "viur-shop-order-step" }, _r = ["name", "library"], kr = { class: "viur-shop-order-status-text" }, wr = { class: "viur-shop-order-status-span" }, Er = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Ar = ["name"], Ir = {
  key: 0,
  class: "sidebar"
}, Cr = ["onClick"], Or = ["onClick"], jr = /* @__PURE__ */ vr(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), Br = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: !0
    },
    sidebar: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: n }) {
    const t = e, r = n, a = w({
      tabNames: k(() => s(t.tabs)),
      isFirstTab: (h) => h === 0
    }), o = F(null);
    function s(h) {
      let v = [], p = [];
      for (const y in h)
        h[y].position ? v.push([y, h[y].position]) : v.push([y, 0]);
      return v.sort((y, g) => y[1] - g[1]), v.forEach((y) => {
        p.push(y[0]);
      }), p;
    }
    function u(h) {
      r("tabChange", h);
    }
    function l(h) {
      o.value.show(h);
    }
    function d(h) {
      o.value.show(h);
    }
    function m() {
      o.value.show(a.tabNames[0]);
    }
    return (h, v) => (c(), f("div", yr, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (c(!0), f(E, null, U(a.tabNames, (p, y) => {
          var g;
          return c(), f("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: p,
            key: p,
            disabled: e.tabs[p].disabled
          }, [
            i("div", Sr, [
              (g = e.tabs[p].icon) != null && g.name ? (c(), f("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[p].icon.name,
                library: e.tabs[p].icon.library
              }, null, 8, _r)) : S("", !0),
              i("div", kr, [
                C(O(y + 1) + ". ", 1),
                i("span", wr, O(e.tabs[p].displayName), 1)
              ])
            ]),
            y < a.tabNames.length - 1 ? (c(), f("sl-icon", Er)) : S("", !0)
          ], 8, $r);
        }), 128)),
        (c(!0), f(E, null, U(a.tabNames, (p, y) => (c(), f("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: p,
          key: p
        }, [
          (c(), T(Je(e.tabs[p].component), Ye({ ref_for: !0 }, e.tabs[p].props ? e.tabs[p].props : "", {
            onGoToStart: v[0] || (v[0] = (g) => m())
          }), null, 16)),
          e.sidebar && y !== a.tabNames.length - 1 ? (c(), f("div", Ir, [
            ye(br)
          ])) : S("", !0),
          y !== a.tabNames.length - 1 ? (c(), f("div", {
            key: 1,
            class: G(["viur-shop-form-footer", { "flex-end": a.isFirstTab(y) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (g) => l(a.tabNames[y - 1])
            }, " Zurück ", 8, Cr), [
              [be, y !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (g) => d(a.tabNames[y + 1])
            }, " Weiter ", 8, Or)
          ], 2)) : S("", !0)
        ], 8, Ar))), 128))
      ], 544),
      jr
    ]));
  }
}, nt = /* @__PURE__ */ I(Br, [["__scopeId", "data-v-d92aa645"]]), Ee = (e) => (z("data-v-7b25a71c"), e = e(), q(), e), Dr = { class: "bind" }, Vr = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, " Vielen Dank für Ihre Bestellung ", -1)), Nr = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ C(" 123345670")
], -1)), Rr = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ C(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
  /* @__PURE__ */ i("br"),
  /* @__PURE__ */ C(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. ")
], -1)), Lr = {
  key: 0,
  class: "viur-shop-order-complete-slot"
}, Ur = { class: "btn-wrap" }, Tr = {
  __name: "OrderComplete",
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
    const t = e, r = n;
    function a() {
      r("goToStart");
    }
    function o() {
      window.location.href = t.redirectUrl;
    }
    return (s, u) => (c(), f("div", Dr, [
      Vr,
      Nr,
      Rr,
      e.additionalComponents.length ? (c(), f("div", Lr, [
        (c(!0), f(E, null, U(e.additionalComponents, (l) => (c(), T(Je(l.component), Ye({ ref_for: !0 }, l.props ? l.props : ""), null, 16))), 256))
      ])) : S("", !0),
      i("div", Ur, [
        i("sl-button", {
          size: "medium",
          onClick: u[0] || (u[0] = (l) => a())
        }, " Zur Startseite "),
        i("sl-button", {
          variant: "primary",
          onClick: u[1] || (u[1] = (l) => o()),
          size: "medium"
        }, " Weiter Einkaufen ")
      ])
    ]));
  }
}, Pr = /* @__PURE__ */ I(Tr, [["__scopeId", "data-v-7b25a71c"]]), Ae = (e) => (z("data-v-4d14c6fe"), e = e(), q(), e), Mr = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), zr = { class: "viur-shop-form-wrap" }, Wr = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), qr = { class: "viur-shop-form-wrap" }, Fr = { key: 0 }, Kr = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Hr = { class: "viur-shop-form-wrap" }, Gr = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = ee(), t = w({
      formValues: {},
      requiredFieldsFilled: k(() => {
        if (t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("billing.city") && Object.keys(t.formValues).includes("billing.street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
        if (!t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      addSkel: null,
      errors: {}
    });
    function r(s) {
      t.isCustomAdress = !s.target.checked;
    }
    function a(s, u) {
      for (const [l, d] of Object.entries(u.value[0]))
        t.formValues[l] = d;
    }
    function o(s) {
      let u = {};
      return Array.isArray(s) ? (s.forEach((l) => {
        let d = l[0], m = l[1];
        u[d] = m;
      }), console.log("output", u), u) : s;
    }
    return se(t.formValues, (s) => {
      Object.entries(s).forEach(([u, l]) => {
        l === "" && delete t.formValues[u];
      });
    }), Y(async () => {
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = o(n.state.structure.address), t.formValues = n.state.shippingAddress;
    }), (s, u) => {
      const l = ae("bone");
      return c(), f(E, null, [
        i("div", null, [
          Mr,
          i("div", zr, [
            (c(!0), f(E, null, U(t.addSkel, (d, m) => (c(), f(E, { key: m }, [
              d.visible && d.params.group === "Customer Info" ? (c(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + m)
              }, [
                d.visible && d.params.group === "Customer Info" ? (c(), T(l, {
                  key: 0,
                  is: P(x)(d.type),
                  name: m,
                  structure: o(t.addSkel),
                  errors: t.errors[m] ? t.errors[m] : [],
                  skel: t.formValues,
                  onChange: (h) => a(m, h),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Wr,
          i("div", qr, [
            (c(!0), f(E, null, U(t.addSkel, (d, m) => (c(), f(E, { key: m }, [
              d.visible && d.params.group === "Customer Address" ? (c(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + m)
              }, [
                d.visible && d.params.group === "Customer Address" ? (c(), T(l, {
                  key: 0,
                  is: P(x)(d.type),
                  name: m,
                  structure: o(t.addSkel),
                  errors: t.errors[m] ? t.errors[m] : [],
                  skel: t.formValues,
                  onChange: (h) => a(m, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (c(), f("div", Fr, [
          Kr,
          i("div", Hr, [
            (c(!0), f(E, null, U(t.addSkel, (d, m) => (c(), f(E, { key: m }, [
              d.visible && d.params.group === "Customer Address" ? (c(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + m)
              }, [
                d.visible && d.params.group === "Customer Address" ? (c(), T(l, {
                  key: 0,
                  is: P(x)(d.type),
                  name: m,
                  structure: o(t.addSkel),
                  errors: t.errors[m] ? t.errors[m] : [],
                  skel: t.formValues,
                  onChange: (h) => a(m, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ])) : S("", !0),
        i("sl-checkbox", {
          onSlChange: r,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Zr = /* @__PURE__ */ I(Gr, [["__scopeId", "data-v-4d14c6fe"]]), te = (e) => (z("data-v-c4232b7a"), e = e(), q(), e), Jr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Yr = { class: "viur-shop-form-wrap" }, Qr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Xr = ["onSlChange", "onSlClear", "label"], xr = ["value"], el = { key: 0 }, tl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), nl = { class: "viur-shop-form-wrap" }, sl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), al = [
  sl
], rl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), ll = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), ol = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), il = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = ee(), t = w({
      formValues: {},
      requiredFieldsFilled: k(() => {
        if (t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("billing.city") && Object.keys(t.formValues).includes("billing.street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
        if (!t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      shippingAdressAmount: 1,
      maxShippingAdress: k(
        () => Object.keys(n.state.carts).length + 2
      ),
      amountAlert: { title: "", msg: "" },
      items: null,
      addSkel: null,
      errors: {},
      selectedItem: {},
      isInit: k(() => !!n.state.carts[n.state.basket])
    }), r = F(null), a = F(null);
    function o(v) {
      v.target.checked && (t.isCustomAdress = !1), v.target.checked || (t.isCustomAdress = !0);
    }
    function s() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie können nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, a.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(v, p) {
      for (const [y, g] of Object.entries(p.value[0]))
        t.formValues[y] = g;
    }
    function l() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(v, p) {
      if (console.log(v.target.value), !v.target.value.length) {
        m();
        return;
      }
      t.selectedItem[p] = v.target.value, t.isItemSelected = !0;
    }
    function m(v, p) {
      console.log("clearing..."), delete t.selectedItem[p], t.isItemSelected = !1;
    }
    function h(v) {
      let p = {};
      return Array.isArray(v) ? (v.forEach((y) => {
        let g = y[0], b = y[1];
        p[g] = b;
      }), p) : v;
    }
    return se(t.formValues, (v) => {
      Object.entries(v).forEach(([p, y]) => {
        y === "" && delete t.formValues[p];
      });
    }), Y(async () => {
      await n.getAddressStructure(), t.addSkel = h(n.state.structure.address);
    }), (v, p) => {
      const y = ae("bone");
      return c(), f(E, null, [
        i("div", null, [
          Jr,
          i("div", Yr, [
            (c(!0), f(E, null, U(t.addSkel, (g, b) => (c(), f(E, { key: b }, [
              g.visible && g.params.group === "Customer Info" ? (c(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                g.visible && g.params.group === "Customer Info" ? (c(), T(y, {
                  key: 0,
                  is: P(x)(g.type),
                  name: b,
                  structure: h(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: ($) => u(b, $)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        Qr,
        (c(!0), f(E, null, U(t.shippingAdressAmount, (g) => (c(), f("div", {
          class: "viur-shop-form-wrap",
          key: g
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: r,
            onSlChange: (b) => d(b, g),
            onSlClear: (b) => m(b, g),
            label: t.selectedItem[g] ? P(n).state.carts[t.selectedItem[g]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (c(!0), f(E, null, U(P(n).state.carts, (b, $) => (c(), f("sl-option", { value: $ }, O(b.info.name), 9, xr))), 256))
          ], 40, Xr),
          (c(!0), f(E, null, U(t.addSkel, (b, $) => (c(), f(E, { key: $ }, [
            b.visible && b.params.group === "Customer Address" ? (c(), f("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + $)
            }, [
              b.visible && b.params.group === "Customer Address" ? (c(), T(y, {
                key: 0,
                is: P(x)(b.type),
                name: $,
                structure: h(t.addSkel),
                errors: t.errors[$] ? t.errors[$] : [],
                skel: t.formValues,
                onChange: (_) => u($, _)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
            ], 2)) : S("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (c(), f("div", el, [
          tl,
          i("div", nl, [
            (c(!0), f(E, null, U(t.addSkel, (g, b) => (c(), f(E, { key: b }, [
              g.visible && g.params.group === "Customer Address" ? (c(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                g.visible && g.params.group === "Customer Address" ? (c(), T(y, {
                  key: 0,
                  is: P(x)(g.type),
                  name: b,
                  structure: h(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: ($) => u(b, $)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ])) : S("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: l,
            title: "Lieferadresse entfernen"
          }, al),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            rl,
            C(" Lieferadresse hinzufügen ")
          ])
        ]),
        i("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: a,
          closable: ""
        }, [
          ll,
          i("strong", null, O(t.amountAlert.title), 1),
          ol,
          C(" " + O(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ul = /* @__PURE__ */ I(il, [["__scopeId", "data-v-c4232b7a"]]), dl = { key: 0 }, cl = { key: 1 }, Ge = {
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
    return (n, t) => (c(), f(E, null, [
      C(" HALLO "),
      e.a ? (c(), f("div", dl, O(e.a), 1)) : S("", !0),
      e.b ? (c(), f("div", cl, O(e.b), 1)) : S("", !0)
    ], 64));
  }
}, st = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), r = w({
      rootNode: {},
      tabs: {
        cart: {
          component: K(ce),
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
          disabled: !1,
          atShow: null,
          atHide: null
        },
        confirm: {
          component: K(we),
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
          component: K(Pr),
          props: {
            redirectUrl: "http://localhost:8081",
            additionalComponents: [
              {
                component: K(Ge),
                props: {}
              },
              {
                component: K(Ge),
                props: { a: "TERRT" }
              },
              {
                component: K(ce),
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
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: K(Zr),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: K(ul),
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
    function a(o) {
      (o == null ? void 0 : o.detail.name) === "confirm" && (r.tabs.orderComplete.disabled = !1);
    }
    return Y(async () => {
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (c(), T(nt, {
      tabs: r.tabs,
      onTabChange: a,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: st
}, Symbol.toStringTag, { value: "Module" })), fl = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = vt();
    return { state: w({}), route: t };
  }
}), gl = { class: "home" };
function hl(e, n, t, r, a, o) {
  return c(), f("div", gl, "View " + O(e.route.path) + " is missing.", 1);
}
const pl = /* @__PURE__ */ I(fl, [["render", hl]]), bl = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: pl
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-ICp7qvKG.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-D8IhJRRw.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Ma)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => ml)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Qa)
  }
];
function El(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(bl), yt({
    // @ts-ignore
    history: $t("/"),
    routes: t
  });
}
const vl = pt(), Al = {
  install(e) {
    e.component("CartView", ce), e.component("ExampleUsage", st), e.component("ConfirmView", we), e.component("OrderView", nt), e.use(vl);
  }
};
export {
  ce as C,
  Pr as O,
  Zr as U,
  Al as V,
  I as _,
  st as a,
  we as b,
  El as c,
  nt as d,
  ee as u
};
