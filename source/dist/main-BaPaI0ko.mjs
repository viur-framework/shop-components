var st = Object.defineProperty;
var at = (e, n, t) => n in e ? st(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => at(e, typeof n != "symbol" ? n + "" : n, t);
import { reactive as w, defineComponent as D, inject as j, openBlock as m, createElementBlock as f, normalizeClass as Z, createElementVNode as i, renderSlot as Ze, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as _, toDisplayString as O, onMounted as R, ref as F, readonly as lt, getCurrentScope as rt, onScopeDispose as ot, unref as U, computed as k, watchEffect as me, renderList as T, watch as se, withDirectives as Q, vModelText as oe, getCurrentInstance as it, resolveComponent as ae, createBlock as P, vShow as ve, withModifiers as ce, createTextVNode as C, shallowRef as G, provide as ue, onBeforeMount as ee, useCssVars as ut, Transition as dt, withCtx as ct, createVNode as Oe, Teleport as Je, resolveDynamicComponent as mt, mergeProps as ft } from "vue";
import { Request as gt } from "@viur/vue-utils";
import { defineStore as $e, createPinia as ht } from "pinia";
import { ViURShopClient as bt } from "@viur/viur-shop-client";
import { useRoute as pt, createRouter as vt, createWebHashHistory as yt } from "vue-router";
const le = $e("cartstore", () => {
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
  async function l(v) {
    return await e.cart_list({ cart_key: v });
  }
  async function a() {
    (await e.cart_list()).forEach((b) => {
      b.is_root_node && (b.cart_type === "basket" ? n.basketRootNode = b : n.whishlistRootNodes.push(b));
    });
  }
  async function o(v, b) {
    let $ = await e.article_add({
      article_key: v,
      parent_cart_key: b
    });
    console.log("addToCart", $);
  }
  async function s(v, b) {
    let $ = await e.article_view({
      article_key: v,
      parent_cart_key: b
    });
    console.log("getArticleView", $);
  }
  async function u(v, b) {
    let $ = await e.article_remove({
      article_key: v,
      parent_cart_key: b
    });
    console.log("remove Resp", $);
  }
  async function r(v, b, $) {
    let g = await e.article_update({
      article_key: v,
      parent_cart_key: b,
      quantity: $,
      quantity_mode: "replace"
    });
    console.log("update Resp", g);
  }
  async function d() {
    const v = await e.address_structure();
    n.structure.address = v.addSkel;
  }
  async function c() {
    const v = await e.address_list();
    for (const b of v)
      b.address_type === "billing" && (n.billingAddress = b), b.address_type === "shipping" && (n.shippingAddress = b);
  }
  async function h(v) {
    await e.discount_add({ code: v });
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: s,
    removeItem: u,
    updateItem: r,
    init: t,
    getAddressStructure: d,
    getChildren: l,
    addDiscount: h,
    getAddress: c
  };
}), $t = D({
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
  for (const [l, a] of n)
    t[l] = a;
  return t;
}, Qe = (e) => (z("data-v-141aaf9b"), e = e(), q(), e), St = ["draggable"], _t = ["disabled"], kt = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), wt = [
  kt
], Et = { class: "value" }, At = ["disabled", "title"], It = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ct = [
  It
];
function Ot(e, n, t, l, a, o) {
  return m(), f("div", {
    class: Z(["value-line", {
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
    }, wt, 40, _t),
    i("div", Et, [
      Ze(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (s) => e.$emit("delete"))
    }, Ct, 8, At)
  ], 42, St);
}
const jt = /* @__PURE__ */ I($t, [["render", Ot], ["__scopeId", "data-v-141aaf9b"]]), Bt = D({
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
}), Dt = { class: "bone-name" }, Vt = { key: 0 }, Nt = { class: "bone" };
function Rt(e, n, t, l, a, o) {
  return m(), f(E, null, [
    i("label", Dt, [
      Ze(e.$slots, "default", {}, void 0, !0),
      _("", !0)
    ]),
    e.state.debug ? (m(), f("div", Vt, [
      i("div", Nt, O(e.name), 1),
      i("pre", null, "    " + O(e.boneState) + `
    `, 1)
    ])) : _("", !0)
  ], 64);
}
const Lt = /* @__PURE__ */ I(Bt, [["render", Rt], ["__scopeId", "data-v-b7149172"]]), Ut = D({
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
    const t = j("boneState"), l = w({});
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
}), Tt = ["disabled", "value"], Pt = ["disabled", "value"];
function Mt(e, n, t, l, a, o) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (m(), f("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Tt)) : (m(), f("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Pt));
}
const ye = /* @__PURE__ */ I(Ut, [["render", Mt], ["__scopeId", "data-v-0ebe5f0b"]]), Wt = D({
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
    function l(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: l
    };
  }
}), zt = ["value"];
function qt(e, n, t, l, a, o) {
  return m(), f("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, zt);
}
const je = /* @__PURE__ */ I(Wt, [["render", qt], ["__scopeId", "data-v-b45a1311"]]);
function Ft(e) {
  return rt() ? (ot(e), !0) : !1;
}
function Kt(e) {
  return typeof e == "function" ? e() : U(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function fe(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, a = F(!1);
  let o = null;
  function s() {
    o && (clearTimeout(o), o = null);
  }
  function u() {
    a.value = !1, s();
  }
  function r(...d) {
    s(), a.value = !0, o = setTimeout(() => {
      a.value = !1, o = null, e(...d);
    }, Kt(n));
  }
  return l && (a.value = !0, Ht && r()), Ft(u), {
    isPending: lt(a),
    start: r,
    stop: u
  };
}
class Gt {
  static objectEmpty(n) {
    return Object.keys(n).length === 0 && n.constructor === Object;
  }
  static getDescr(n, t) {
    try {
      return n.values.filter((l) => l[0] === t)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(n) {
    return n || (n = ""), String(n).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(n, t) {
    function l(s) {
      let u = [], r = [], d = /\$\((.*?)\)/g;
      for (; r; ) {
        if (r = d.exec(s), !r) {
          r = !1;
          continue;
        }
        u.push(r[1]);
      }
      return u;
    }
    let a = l(n), o = [];
    Array.isArray(t) || (t = [t]);
    for (let s of t) {
      let u = n;
      for (let r of a) {
        let d = r.split("."), c = s;
        for (let h of d)
          c && c !== "-" && h in c && c[h] ? c = c[h] : c = "-";
        c = this.unescape(c), u = u.replace("$(" + r + ")", c);
      }
      o.push(u);
    }
    return o.join(", ");
  }
}
const Zt = D({
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
    const t = j("boneState"), l = w({
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
      state: l,
      Utils: Gt,
      boneState: t,
      changeEvent: o,
      stringBone: a
    };
  }
}), Jt = ["disabled", "value", "required"];
function Qt(e, n, t, l, a, o) {
  return m(), f("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Jt);
}
const Be = /* @__PURE__ */ I(Zt, [["render", Qt], ["__scopeId", "data-v-1ccbacc0"]]), Yt = D({
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
    const t = j("boneState"), l = w({}), a = F(null);
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
      state: l,
      boneState: t,
      changeEvent: o,
      emailBone: a
    };
  }
}), Xt = ["disabled", "value"];
function xt(e, n, t, l, a, o) {
  return m(), f("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Xt);
}
const De = /* @__PURE__ */ I(Yt, [["render", xt], ["__scopeId", "data-v-4328e024"]]), en = D({
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
    const t = j("boneState"), l = w({
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
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
}), tn = ["disabled", "type", "value"];
function nn(e, n, t, l, a, o) {
  return m(), f("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, tn);
}
const Ve = /* @__PURE__ */ I(en, [["render", nn], ["__scopeId", "data-v-f1b8af8c"]]), sn = D({
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
    const t = j("boneState"), l = w({
      value: k(() => {
        let s = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? s = s.filter((u) => t.bonestructure.values.map((r) => r[0].toString()).includes(u)) : s = s.filter(
          (u) => Object.keys(t.bonestructure.values).map((r) => r.toString()).includes(u)
        ), s.map((u) => u.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function a() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let s = [];
        for (const [u, r] of Object.entries(t.bonestructure.values))
          s.push([u, r]);
        return s;
      }
    }
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index), W;
    }
    return R(() => {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      convertObjToList: a
    };
  }
}), an = ["disabled", "value", "multiple"], ln = ["value"];
function rn(e, n, t, l, a, o) {
  return m(), f("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), f(E, null, T(e.convertObjToList(), (s) => (m(), f("sl-option", {
      key: s[0],
      value: s[0]
    }, O(s[1]), 9, ln))), 128))
  ], 40, an);
}
const Ne = /* @__PURE__ */ I(sn, [["render", rn], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
    const t = j("boneState"), l = w({
      value: k(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function a(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return R(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
}), un = ["disabled", "checked"];
function dn(e, n, t, l, a, o) {
  return m(), f("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, un);
}
const Re = /* @__PURE__ */ I(on, [["render", dn], ["__scopeId", "data-v-363598c8"]]), cn = D({
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
    const t = j("boneState"), l = w({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), a = F(null);
    function o(u) {
      l.value1 === l.value2 ? l.equal = !0 : l.equal = !1, s(l.value1), l.requiredPasswordInfo.length === 0 && l.passwordInfo.length - l.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, l.value1, e.lang, e.index, !0) : n.emit("change", e.name, l.value1, e.lang, e.index, !1);
    }
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      l.passwordInfo = [], l.requiredPasswordInfo = [];
      for (const r of t.bonestructure.tests)
        new RegExp(r[0]).test(u) || (r[2] ? l.requiredPasswordInfo.push(r[1]) : l.passwordInfo.push(r[1]));
      l.equal || l.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), l.value1 || l.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
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
      (u, r) => {
        l.value1 = u;
      }
    ), {
      state: l,
      boneState: t,
      changeEvent: o,
      passwordBone: a
    };
  }
}), mn = ["disabled"], fn = ["name"], gn = ["name"], hn = { class: "errors" };
function bn(e, n, t, l, a, o) {
  return m(), f(E, null, [
    Q(i("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": n[0] || (n[0] = (s) => e.state.value1 = s),
      disabled: e.boneState.readonly,
      class: Z({ "has-check": !e.boneState.readonly }),
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
      }, null, 8, fn)
    ], 42, mn), [
      [oe, e.state.value1]
    ]),
    e.boneState.readonly ? _("", !0) : Q((m(), f("sl-input", {
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
      }, null, 8, gn)
    ], 544)), [
      [oe, e.state.value2]
    ]),
    i("ul", hn, [
      (m(!0), f(E, null, T(e.state.passwordInfo, (s, u) => (m(), f("li", { key: u }, O(s), 1))), 128)),
      (m(!0), f(E, null, T(e.state.requiredPasswordInfo, (s, u) => (m(), f("li", {
        key: u,
        class: "requiredInfo"
      }, O(s), 1))), 128))
    ])
  ], 64);
}
const Le = /* @__PURE__ */ I(cn, [["render", bn], ["__scopeId", "data-v-0ccf18c0"]]), pn = D({
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
    const t = j("boneState"), l = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [h, v] of Object.entries(l.structure)) {
          let b = "default", $ = l.structure[h], g = (d = l.value) == null ? void 0 : d[h];
          (c = v == null ? void 0 : v.params) != null && c.category && (b = v.params.category.toLowerCase()), Object.keys(u).includes(b) ? u[b].bones.push({
            boneName: h,
            boneStructure: $,
            boneValue: g
          }) : u[b] = {
            name: v.params.category,
            bones: [
              {
                boneName: h,
                boneStructure: $,
                boneValue: g
              }
            ]
          }, $.visible === !0 && (u[b].groupVisible = !0);
        }
        let r = {};
        return Object.keys(u).sort().forEach(function(h) {
          r[h] = u[h];
        }), r;
      })
    });
    function a(u) {
      n.emit("change", u);
    }
    R(() => {
      it().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o(u) {
      console.log(u);
    }
    function s(u) {
      if (Array.isArray(u)) {
        let r = {};
        for (const d in u)
          r[u[d][0]] = u[d][1];
        return r;
      } else
        return u;
    }
    return {
      state: l,
      boneState: t,
      getBoneWidget: x,
      structureToDict: s,
      changeEvent: a,
      updateValue: o
    };
  }
}), vn = {
  key: 0,
  open: "",
  variant: "danger"
}, yn = {
  key: 1,
  class: "form"
}, $n = ["summary", "open"];
function Sn(e, n, t, l, a, o) {
  const s = ae("bone");
  return e.state.globalRegistration ? (m(), f("div", yn, [
    (m(!0), f(E, null, T(e.state.formGroups, (u, r) => Q((m(), f("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), f(E, null, T(u.bones, (d) => Q((m(), P(s, {
        key: d.name,
        is: e.getBoneWidget(e.state.structure[d.boneName].type),
        name: d.boneName,
        structure: e.state.structure,
        skel: e.state.value,
        errors: e.boneState.errors,
        readonly: e.boneState.bonestructure.readonly ? !0 : void 0,
        onChangeInternal: e.changeEvent
      }, null, 8, ["is", "name", "structure", "skel", "errors", "readonly", "onChangeInternal"])), [
        [ve, e.state.structure[d.boneName].visible]
      ])), 128))
    ], 8, $n)), [
      [ve, u.groupVisible]
    ])), 128))
  ])) : (m(), f("sl-alert", vn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Ye = /* @__PURE__ */ I(pn, [["render", Sn], ["__scopeId", "data-v-e6fcfbca"]]), _n = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Ye },
  emits: ["change"],
  setup(e, n) {
    const t = j("boneState"), l = w({
      value: {},
      index: k(() => e.index),
      lang: k(() => e.lang)
    });
    function a(o) {
      var u;
      (u = l.value) != null && u[o.name] || (l.value ? l.value[o.name] = null : l.value = { [o.name]: null });
      let s = l.value[o.name];
      o.lang ? (s === null && (s = {}), Object.keys(s).includes(o.lang) && o.index !== null ? s[o.lang][o.index] = o.value : s[o.lang] = o.value) : o.index !== null ? (s === null && (s = []), s[o.index] = o.value) : s = o.value, l.value[o.name] = s, n.emit("change", e.name, l.value, e.lang, e.index, !0);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
function kn(e, n, t, l, a, o) {
  const s = ae("Wrapper_nested");
  return m(), P(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Ue = /* @__PURE__ */ I(_n, [["render", kn], ["__scopeId", "data-v-84a761ce"]]), wn = D({
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
    const t = j("boneState"), l = w({});
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
}), En = ["disabled", "value"];
function An(e, n, t, l, a, o) {
  return m(), f("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, En);
}
const Te = /* @__PURE__ */ I(wn, [["render", An], ["__scopeId", "data-v-534b9149"]]), In = D({
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
    const t = j("boneState"), l = w({
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
      state: l,
      boneState: t,
      changeEvent: o,
      numericBone: a
    };
  }
}), Cn = ["disabled", "value", "min", "max", "step"], On = { class: "info" }, jn = { key: 0 }, Bn = { key: 1 }, Dn = { key: 2 };
function Vn(e, n, t, l, a, o) {
  return m(), f(E, null, [
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
    }, null, 40, Cn),
    i("ul", On, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), f("li", jn, O(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : _("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), f("li", Bn, O(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : _("", !0),
      e.state.precision ? (m(), f("li", Dn, O(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : _("", !0)
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ I(In, [["render", Vn], ["__scopeId", "data-v-03d5b399"]]);
var N = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class de extends Error {
  constructor(n, t, l, a) {
    super(l || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
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
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: a = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
    function r() {
      if (t instanceof FormData)
        return t;
      const c = new FormData();
      for (const h in t)
        if (Array.isArray(t[h]))
          for (let v of t[h])
            c.append(h, v);
        else
          c.append(h, t[h]);
      return c;
    }
    let d = ie.post(B.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      l && l(c.data);
    }).catch(function(c) {
      a && a(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = N.VITE_DEFAULT_RENDERER || "json") {
    await B.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (l) => {
      let a = await l.json();
      Array.isArray(a) || (a = [a]), X().state.sKeys = new Set(a);
    });
  }
  static async securePost(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    abortController: o = null,
    renderer: s = N.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let c = null;
    X().state.sKeys.size === 0 && await B.getBatchSkeys(d);
    const h = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", h), X().state.sKeys.delete(h)) : (t || (t = {}), t.skey = h, X().state.sKeys.delete(h)), c = B.post(n, {
      dataObj: t,
      callback: l,
      abortController: o,
      headers: u,
      mode: r
    }), c;
  }
  static get(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    cached: o = !1,
    clearCache: s = !1,
    abortController: u = null,
    headers: r = null,
    mode: d = null,
    //          milli  sec  min  Std  Tage
    cacheTime: c = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let h = ie.get(B.buildUrl(n), t, s, r, u, d);
    return h.then(function(v) {
      l && l(v.data);
    }).catch(function(v) {
      a && a(v);
    }), h;
  }
  static list(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${u}/${n}/list`;
    return o && (r += `/${o}`), B.get(r, {
      dataObj: t,
      callback: l,
      failedCallback: a,
      abortController: s
    });
  }
  static getStructure(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let r = `/${u}/getStructure/${n}`;
    return o && (r += `/${o}`), B.get(r, {
      dataObj: t,
      callback: l,
      failedCallback: a,
      abortController: s
    });
  }
  static view(n, t, {
    dataObj: l = null,
    callback: a = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: r = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/view/${t}`;
    return s && (d = `/${r}/${n}/view/${s}/${t}`), B.get(d, {
      dataObj: l,
      callback: a,
      failedCallback: o,
      abortController: u
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${u}/${n}/add`;
    return o && (r = `/${u}/${n}/add/${o}`), B.securePost(r, {
      dataObj: t,
      callback: l,
      failedCallback: a,
      abortController: s
    });
  }
  static edit(n, t, {
    dataObj: l = null,
    callback: a = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: r = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/edit/${t}`;
    return s && (d = `/${r}/${n}/edit/${s}/${t}`), B.securePost(d, {
      dataObj: l,
      callback: a,
      failedCallback: o,
      abortController: u
    });
  }
  static delete(n, t, {
    dataObj: l = null,
    callback: a = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: r = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/delete/${t}`;
    return s && (d = `/${r}/${n}/delete/${s}/${t}`), B.securePost(d, {
      dataObj: l,
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
    const l = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((a, o) => {
      B.securePost("/vi/file/getUploadURL", { dataObj: l }).then(async (s) => {
        let u = await s.json();
        fetch(u.values.uploadUrl, {
          body: n,
          method: "POST",
          mode: "no-cors"
        }).then(async (r) => {
          const d = {
            key: u.values.uploadKey,
            skelType: "leaf"
          };
          B.securePost("/vi/file/add", { dataObj: d }).then(async (c) => {
            let h = await c.json();
            h.action === "addSuccess" ? a(h.values) : o(h);
          }).catch((c) => {
            o(c);
          });
        }).catch((r) => {
          o(r);
        });
      }).catch((s) => {
        o(s);
      });
    });
  }
}
class ie {
  constructor() {
    Ce(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, l = null, a = null, o = null) {
    let s = { method: n };
    return s.credentials = "include", s.headers = {
      Accept: "application/json, text/plain, */*"
    }, l && (s.headers = { ...s.headers, ...l }), t && (s.body = t), a && (s.signal = a.signal), o && (s.mode = o), s;
  }
  static get(n, t = null, l = null, a = null, o = null, s = null) {
    function u(r, d) {
      let c = new URL(r);
      if (d && Object.keys(d).length > 0) {
        const h = new URLSearchParams();
        for (const [v, b] of Object.entries(d))
          if (Array.isArray(b))
            for (const $ of b)
              h.append(v, $);
          else
            h.append(v, b);
        c.search = h.toString();
      }
      return c.toString();
    }
    return fetch(u(n, t), ie.buildOptions("GET", null, a, o, s)).then(async (r) => {
      if (r.ok)
        return r;
      {
        const d = `${r.status} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new de(r.status, r.statusText, d, r));
      }
    }).catch((r) => {
      if (r instanceof TypeError) {
        const c = `503 ${r.message}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new de(503, r.message, c, r));
      }
      if (r instanceof DOMException && r.name == "AbortError") {
        const c = `${r.code} ${r.name}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new de(r.code, r.name, c, { url: n }));
      }
      const d = `${r.statusCode} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new de(r.statusCode, r.statusText, d, r.response));
    });
  }
  static post(n, t = null, l = null, a = null, o = null, s = null) {
    return fetch(n, ie.buildOptions("POST", t, a, o, s));
  }
}
var Nn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Rn = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Ye },
  emits: ["change"],
  setup(e, n) {
    const t = j("boneState"), l = j("formatString"), a = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Nn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const h = await c.json();
        a.skellistdata = {};
        for (let b of h.skellist)
          a.skellistdata[b.key] = b;
        return (v = h.skellist) == null ? void 0 : v.map((b) => ({ text: l(t.bonestructure.format, { dest: b }), value: b.key, data: b }));
      });
    }
    function s(r) {
      a.selection = { dest: a.skellistdata[r.detail.item.value] }, n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function u(r) {
      var c;
      a.selection || (a.selection = {}), (c = a.selection.rel) != null && c[r.name] || (a.selection.rel ? a.selection.rel[r.name] = null : a.selection.rel = { [r.name]: null });
      let d = a.selection.rel[r.name];
      r.lang ? (d === null && (d = {}), Object.keys(d).includes(r.lang) && r.index !== null ? d[r.lang][r.index] = r.value : d[r.lang] = r.value) : r.index !== null ? (d === null && (d = []), d[r.index] = r.value) : d = r.value, Object.keys(a.selection).includes("rel") && a.selection.rel ? a.selection.rel[r.name] = d : a.selection.rel = { [r.name]: d }, Object.keys(a.selection).includes("dest") && n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    return R(() => {
      a.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      formatString: l,
      changeEvent: s,
      changeEventNested: u,
      getList: o
    };
  }
}), Ln = (e) => (z("data-v-61dd72e0"), e = e(), q(), e), Un = { class: "record" }, Tn = { class: "single-entry" }, Pn = ["value"], Mn = ["disabled", "source"], Wn = ["title"], zn = /* @__PURE__ */ Ln(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), qn = [
  zn
];
function Fn(e, n, t, l, a, o) {
  var u, r;
  const s = ae("Wrapper_nested");
  return m(), f("div", Un, [
    i("div", Tn, [
      e.state.selection ? (m(), f("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Pn)) : (m(), f("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Mn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), f("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, qn, 8, Wn)) : _("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (m(), P(s, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : _("", !0)
  ]);
}
const Me = /* @__PURE__ */ I(Rn, [["render", Fn], ["__scopeId", "data-v-61dd72e0"]]), Kn = D({
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
    const t = j("boneState"), l = w({});
    function a(o, s) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
}), Hn = { class: "box" };
function Gn(e, n, t, l, a, o) {
  return m(), f("div", Hn, O(e.value), 1);
}
const Zn = /* @__PURE__ */ I(Kn, [["render", Gn], ["__scopeId", "data-v-343aca69"]]);
var We = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Jn = D({
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
    const t = j("boneState"), l = F(), a = w({
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
    function u(c) {
      const h = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, b) => {
        B.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: h }).then(async ($) => {
          let g = await $.json();
          fetch(g.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const y = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let A = await S.json();
              A.action === "addSuccess" ? v(A.values) : b(A);
            }).catch((S) => {
              b(S);
            });
          }).catch((p) => {
            b(p);
          });
        }).catch(($) => {
          b($);
        });
      });
    }
    async function r(c) {
      a.loading = !0;
      for (let h of c.target.files) {
        let v = await u(h);
        l.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function d(c) {
      a.loading = !0, a.droparea = !1;
      for (let h of c.dataTransfer.files) {
        let v = await u(h);
        l.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
        break;
      }
      a.loading = !1;
    }
    return {
      state: a,
      boneState: t,
      downloadFile: o,
      createBackgroundImage: s,
      handleUpload: r,
      uploadinput: l,
      handleDrop: d
    };
  }
}), ge = (e) => (z("data-v-91086308"), e = e(), q(), e), Qn = {
  key: 0,
  class: "loader"
}, Yn = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Xn = [
  Yn
], xn = {
  key: 1,
  class: "droparea"
}, es = ["title"], ts = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), ns = [
  ts
], ss = ["multiple"], as = ["title"], ls = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), rs = [
  ls
], os = { class: "box" }, is = ["src"], us = ["label", "open"], ds = ["src"], cs = {
  key: 1,
  class: "preview"
}, ms = {
  key: 0,
  name: "file-earmark"
}, fs = { key: 2 }, gs = ["title"], hs = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), bs = [
  hs
];
function ps(e, n, t, l, a, o) {
  var s, u, r, d, c, h, v, b, $, g;
  return m(), f("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = ce((p) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (p) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = ce((...p) => e.handleDrop && e.handleDrop(...p), ["prevent"]))
  }, [
    e.state.loading ? (m(), f("div", Qn, Xn)) : _("", !0),
    e.state.droparea ? (m(), f("div", xn, " Dateien hier hinziehen ")) : _("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), f("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (p) => e.uploadinput.click())
    }, ns, 8, es)) : _("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...p) => e.handleUpload && e.handleUpload(...p))
    }, null, 40, ss),
    e.value ? (m(), f("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...p) => e.downloadFile && e.downloadFile(...p))
    }, rs, 8, as)) : _("", !0),
    i("div", os, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), f("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (p) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, is),
        i("sl-dialog", {
          label: decodeURIComponent((d = (r = e.value) == null ? void 0 : r.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, ds)
        ], 8, us)
      ])) : (m(), f("div", cs, [
        (h = (c = e.value) == null ? void 0 : c.dest) != null && h.name ? (m(), f("sl-icon", ms)) : _("", !0)
      ])),
      (b = (v = e.value) == null ? void 0 : v.dest) != null && b.name ? (m(), f("div", fs, O(decodeURIComponent((g = ($ = e.value) == null ? void 0 : $.dest) == null ? void 0 : g.name)), 1)) : _("", !0)
    ]),
    e.boneState.multiple ? _("", !0) : (m(), f("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (p) => e.$emit("change", e.name, "", e.lang, e.index))
    }, bs, 8, gs))
  ], 32);
}
const ze = /* @__PURE__ */ I(Jn, [["render", ps], ["__scopeId", "data-v-91086308"]]), vs = D({
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
    const t = j("boneState"), l = w({
      value: "",
      editorConfig: {},
      editor: k(() => ClassicEditor)
    });
    function a(u) {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }
    function o(u) {
      l.value = u.target.value, n.emit("change", e.name, l.value, e.lang, e.index);
    }
    R(() => {
      e.value !== null && (l.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      u.editing.view.change((r) => {
        r.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return se(
      () => e.value,
      (u, r) => {
        l.value = u;
      }
    ), {
      state: l,
      ClassicEditor,
      boneState: t,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: o
    };
  }
}), ys = ["disabled", "value"];
function $s(e, n, t, l, a, o) {
  var u, r, d, c;
  const s = ae("ckeditor");
  return e.state.editor ? (m(), f(E, { key: 0 }, [
    (u = e.boneState.bonestructure) != null && u.valid_html || (r = e.boneState.bonestructure) != null && r.validHtml ? (m(), P(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (h) => e.state.value = h),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), f("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...h) => e.changeEventTextarea && e.changeEventTextarea(...h))
    }, null, 40, ys))
  ], 64)) : _("", !0);
}
const qe = /* @__PURE__ */ I(vs, [["render", $s]]), Ss = D({
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
    const t = j("boneState"), l = w({
      valueLat: null,
      valueLng: null
    });
    function a() {
      n.emit("change", e.name, [l.valueLat, l.valueLng], e.lang, e.index);
    }
    return R(() => {
      try {
        l.valueLat = e.value[0], l.valueLng = e.value[1];
      } catch {
      }
      n.emit("change", e.name, [l.valueLat, l.valueLng], e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
}), _s = ["name", "min", "max", "disabled"], ks = ["name", "min", "max", "disabled"];
function ws(e, n, t, l, a, o) {
  return m(), f(E, null, [
    Q(i("sl-input", {
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
    }, null, 40, _s), [
      [oe, e.state.valueLat]
    ]),
    Q(i("sl-input", {
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
    }, null, 40, ks), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const Fe = /* @__PURE__ */ I(Ss, [["render", ws], ["__scopeId", "data-v-7bc31020"]]), Es = D({
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
    const t = j("boneState"), l = w({
      counter: 0,
      debounce: null
    }), a = j("addMultipleEntry"), o = j("removeMultipleEntries");
    function s() {
      l.counter += 1;
      let r = 200;
      l.counter > 1 && (r = 500), l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        for (let d = l.counter; d--; )
          a(e.lang);
        l.counter = 0;
      }, r);
    }
    function u() {
      let r = 200;
      l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        o(e.lang);
      }, r);
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: l,
      boneState: t,
      handleAdd: s,
      handleRemove: u,
      removeMultipleEntries: o
    };
  }
}), Xe = (e) => (z("data-v-63e75dee"), e = e(), q(), e), As = { class: "actionbar" }, Is = ["title"], Cs = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Os = [
  Cs
], js = ["title"], Bs = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ds(e, n, t, l, a, o) {
  return m(), f("div", As, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Os, 8, Is)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Bs,
      C(" " + O(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), f(E, { key: 0 }, [
        C("(" + O(e.state.counter) + ")", 1)
      ], 64)) : _("", !0)
    ], 8, js)) : _("", !0)
  ]);
}
const Vs = /* @__PURE__ */ I(Es, [["render", Ds], ["__scopeId", "data-v-63e75dee"]]);
var Ns = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Rs = D({
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
    const t = j("boneState"), l = j("addMultipleEntry"), a = j("formatString"), o = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Ns.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const h = await c.json();
        return s.skels = h.skellist.reduce((b, $) => (b[$.key] = $, b), {}), (v = h.skellist) == null ? void 0 : v.map((b) => ({ text: a(t.bonestructure.format, { dest: b }), value: b.key, data: b }));
      });
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: o,
      getList: u
    };
  }
}), xe = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), Ls = { class: "actionbar" }, Us = ["title"], Ts = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ps = [
  Ts
], Ms = ["source"], Ws = ["title"], zs = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function qs(e, n, t, l, a, o) {
  return m(), f("div", Ls, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ps, 8, Us)) : _("", !0),
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
    }, null, 40, Ms),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      zs,
      C(" " + O(e.$t("bone.list")), 1)
    ], 8, Ws)) : _("", !0)
  ]);
}
const Fs = /* @__PURE__ */ I(Rs, [["render", qs], ["__scopeId", "data-v-eeea51c6"]]);
var Ke = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ks = D({
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
    const t = j("boneState"), l = j("addMultipleEntry");
    j("formatString");
    const a = null, o = F(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(c) {
      const h = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, b) => {
        B.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: h }).then(async ($) => {
          let g = await $.json();
          fetch(g.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const y = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let A = await S.json();
              A.action === "addSuccess" ? v(A.values) : b(A);
            }).catch((S) => {
              b(S);
            });
          }).catch((p) => {
            b(p);
          });
        }).catch(($) => {
          b($);
        });
      });
    }
    async function r(c) {
      s.loading = !0;
      for (let h of c.target.files) {
        let v = await u(h);
        o.value.value = null;
        let b = null;
        s.hasUsing && (b = void 0), l(e.lang, { dest: v, rel: b });
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let h of c.dataTransfer.files) {
        let v = await u(h);
        o.value.value = null;
        let b = null;
        s.hasUsing && (b = void 0), l(e.lang, { dest: v, rel: b });
      }
      s.loading = !1;
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: a,
      uploadFile: u,
      uploadinput: o,
      handleUpload: r,
      handleDrop: d
    };
  }
}), Se = (e) => (z("data-v-9bac9f8a"), e = e(), q(), e), Hs = ["title"], Gs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Zs = [
  Gs
], Js = {
  key: 1,
  class: "droparea"
}, Qs = ["multiple"], Ys = ["title"], Xs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), xs = [
  Xs
], ea = ["title"], ta = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), na = {
  key: 0,
  slot: "suffix"
};
function sa(e, n, t, l, a, o) {
  return m(), f("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = ce((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = ce((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Zs, 8, Hs)) : _("", !0),
    e.state.droparea ? (m(), f("div", Js, " Dateien hier hinziehen ")) : _("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Qs),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, xs, 8, Ys)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      ta,
      C(" " + O(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), f("sl-spinner", na)) : _("", !0)
    ], 8, ea)) : _("", !0)
  ], 32);
}
const aa = /* @__PURE__ */ I(Ks, [["render", sa], ["__scopeId", "data-v-9bac9f8a"]]), _e = $e("boneStore", () => {
  const e = w({
    additionalBones: G({}),
    defaultBones: G({
      rawBone: ye,
      keyBone: je,
      stringBone: Be,
      emailBone: De,
      dateBone: Ve,
      booleanBone: Re,
      selectBone: Ne,
      passwordBone: Le,
      recordBone: Ue,
      numericBone: Pe,
      colorBone: Te,
      relationalBone: Me,
      jsonBone: Zn,
      fileBone: ze,
      textBone: qe,
      spatialBone: Fe
    }),
    actionbars: G({
      "relational.tree.leaf.file.file": aa,
      "relational.": Fs
    }),
    multibones: G(["select", "select."])
  });
  function n(s, u) {
    e.additionalBones[s] = u;
  }
  function t() {
    let s = e.defaultBones;
    for (const [u, r] of Object.entries(e.additionalBones))
      s.add(r);
    return s;
  }
  function l(s) {
    if (Object.keys(e.additionalBones).includes(s))
      return e.additionalBones[s];
    {
      let u = s.split("."), r = Object.entries(e.additionalBones).filter(
        (d) => d[0].startsWith(u[0] + ".")
      );
      if (r.length > 0) {
        r.sort((d, c) => c.length - d.length);
        for (let d of r)
          if (s.startsWith(d[0]))
            return e.additionalBones[d[0]];
      }
    }
    return s === "date" ? Ve : s === "key" ? je : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? Be : s === "select" || s.startsWith("select.") ? Ne : s === "bool" ? Re : s === "password" ? Le : s === "record" ? Ue : s === "numeric" || s.startsWith("numeric.") ? Pe : s === "relational.tree.leaf.file.file" ? ze : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Te : s === "text" ? qe : s === "spatial" ? Fe : ye;
  }
  function a(s, u) {
    e.actionbars[s] = u;
  }
  function o(s) {
    if (Object.keys(e.actionbars).includes(s))
      return e.actionbars[s];
    {
      let u = s.split("."), r = Object.entries(e.actionbars).filter(
        (d) => d[0].startsWith(u[0] + ".")
      );
      if (r.length > 0) {
        r.sort((d, c) => c.length - d.length);
        for (let d of r)
          if (s.startsWith(d[0]))
            return e.actionbars[d[0]];
      }
    }
    return Vs;
  }
  return {
    state: e,
    addBoneWidget: n,
    getBoneWidget: l,
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
function ra(e) {
  const n = _e();
  if (n.state.multibones.includes(e))
    return !0;
  {
    let t = e.split("."), l = Object.entries(n.state.multibones).filter(
      (a) => a[1].startsWith(t[0] + ".")
    );
    if (l.length > 0) {
      l.sort((a, o) => o.length - a.length);
      for (let a of l)
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
    wrapperMultiple: jt,
    BoneLabel: Lt
  },
  props: {
    is: {
      type: Object,
      default: ye
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
        function g(p) {
          for (const [y, S] of Object.entries(p))
            if (S !== null) {
              if (Array.isArray(S) && S.length > 0)
                return !1;
              if (!Array.isArray(S))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? g(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: k(() => {
        let g = [];
        for (let p of e.errors)
          p.fieldPath[0] === e.name && (p.severity > 2 || t.required && (p.severity === 2 || p.severity === 0)) && g.push(p.errorMessage);
        return g;
      })
    });
    ue("boneState", t);
    function l(g, p, y) {
      s(p, g, "isDragging"), s(p, g, "dragStartIndex");
    }
    function a(g, p, y) {
      y.preventDefault();
      const S = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      S < A.offsetHeight / 2 ? (s(p, g, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = g) : (s(p, g, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = g + 1);
      let L = p ? t.bonevalue[p] : t.bonevalue;
      t.dropIndex.index > L.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(g, p, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (p ? (S = t.bonevalue[p].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[p].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: p,
        index: g
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(g, p, y) {
      t[y].lang = g || null, t[y].index = p;
    }
    function u(...g) {
      g.forEach((p) => {
        t[p] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(g, p, y = null, S = null, A) {
      if (p === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = p : t.bonevalue[y] = p) : S !== null ? t.bonevalue[S] = p : A === !1 || (t.bonevalue = p), t.readonly)) return !1;
      let L = {
        name: g,
        value: d(),
        lang: y,
        index: S
      }, V = {
        name: g,
        value: p,
        lang: y,
        index: S
      };
      A != null && (L.pwMatch = A, V.pwMatch = A), n.emit("change", L), n.emit("change-internal", V);
    }
    function d() {
      function g(y, S = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [S + ".lat"]: y[0] }), A.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((L) => L === Object(L)).length > 0)
            for (const [L, V] of y.entries())
              V.rel !== null ? A.push(g(V, S + "." + L)) : A.push(g(V, S));
          else
            for (const [L, V] of y.entries())
              A.push(g(V, S));
        else if (y === Object(y))
          for (const [L, V] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && L === "key" ? (/\.[0-9]*\.dest$/.test(S) ? A.push(g(V, S.replace(/\.[0-9]*\.dest/, ""))) : A.push(g(V, S.replace(/\.dest/, ""))), A.push(g(V, S.replace(/\.dest/, "") + "." + L))) : S.endsWith(".rel") && A.push(g(V, S.replace(/\.rel/, "") + "." + L)) : A.push(g(V, S + "." + L)) : A.push(g(V, L));
        else
          y == null && (y = ""), S !== null && A.push({ [S]: y });
        return A;
      }
      let p = g(t.bonevalue, e.name);
      return p = p.flat(10), p;
    }
    function c(g = null, p = "") {
      g ? Object.keys(t.bonevalue).includes(g) ? t.bonevalue[g].push(p) : t.bonevalue[g] = [p] : t.bonevalue ? t.bonevalue.push(p) : t.bonevalue = [p];
    }
    ue("addMultipleEntry", c);
    function h(g, p = null) {
      var y;
      p ? (y = t.bonevalue) == null || y[p].splice(g, 1) : t.bonevalue.splice(g, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: p,
        index: g
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: p,
        index: g
      });
    }
    function v(g = null) {
      var p;
      g ? (p = t.bonevalue) == null || p[g].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: d(),
        lang: g
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: g
      });
    }
    ue("removeMultipleEntries", v);
    function b(g = null, p = "") {
      c(g, p);
    }
    function $(g, p) {
      function y(V) {
        let J = [], K = [], ne = /\$\((.*?)\)/g;
        for (; K; ) {
          if (K = ne.exec(V), !K) {
            K = !1;
            continue;
          }
          J.push(K[1]);
        }
        return J;
      }
      function S(V, J) {
        let K = V.split("."), ne = V.split("."), M = J;
        for (let Y of K)
          if (ne.shift(), M && M !== "-" && Object.keys(M).includes(Y) && M[Y])
            if (Array.isArray(M[Y])) {
              let Ie = [];
              for (let nt of M[Y])
                Ie.push(S(ne.join("."), nt));
              M = Ie.join(", ");
            } else
              M = M[Y];
          else (!M || typeof M[Y] == "object" && !M[Y]) && (M = "-");
        return M;
      }
      let A = y(g), L = [];
      Array.isArray(p) || (p = [p]);
      for (let V of p) {
        let J = g;
        for (let K of A) {
          let ne = S(K, V);
          J = J.replace("$(" + K + ")", ne);
        }
        L.push(J);
      }
      return L.join(", ");
    }
    return ue("formatString", $), ee(() => {
      var g;
      e.value ? t.bonevalue = e.value : t.bonevalue = (g = e.skel) == null ? void 0 : g[e.name];
    }), se(
      () => e.skel,
      (g, p) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), se(
      () => {
        var g;
        return (g = e.errors) == null ? void 0 : g[e.name];
      },
      (g, p) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: c,
      removeMultipleEntry: h,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: ra,
      multipleBonePressEnter: b,
      handleDragStart: l,
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
}, He = () => {
  ut((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, Ge = ke.setup;
ke.setup = Ge ? (e, n) => (He(), Ge(e, n)) : He;
const oa = (e) => (z("data-v-46c45785"), e = e(), q(), e), ia = {
  key: 0,
  class: "loading"
}, ua = /* @__PURE__ */ oa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), da = { class: "logo" }, ca = ["src"];
function ma(e, n, t, l, a, o) {
  return m(), P(dt, null, {
    default: ct(() => [
      t.active ? (m(), f("div", ia, [
        ua,
        i("div", da, [
          i("sl-icon", { src: t.logo }, null, 8, ca)
        ])
      ])) : _("", !0)
    ]),
    _: 1
  });
}
const fa = /* @__PURE__ */ I(ke, [["render", ma], ["__scopeId", "data-v-46c45785"]]), ga = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), f("pre", null, O(e.node.name), 1));
  }
}, he = (e) => (z("data-v-4af59b39"), e = e(), q(), e), ha = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ba = ["src"], pa = { class: "viur-shop-cart-leaf-headline headline" }, va = { class: "viur-shop-cart-leaf-artno" }, ya = ["innerHTML"], $a = { class: "viur-shop-cart-leaf-quantity" }, Sa = { class: "viur-shop-cart-leaf-unitprice" }, _a = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), ka = ["value"], wa = { class: "viur-shop-cart-leaf-actions" }, Ea = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), Aa = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Ia = [
  Aa
], Ca = { class: "viur-shop-cart-leaf-price" }, Oa = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), ja = ["value"], Ba = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: n }) {
    const t = e, l = n, a = w({
      leaf: {}
    });
    function o(r) {
      return r !== void 0 ? gt.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(r, d, c, h) {
      l("updateItem", {
        item: r,
        articleKey: d,
        node: c,
        quantity: h
      });
    }
    function u(r, d, c) {
      l("removeItem", { item: r, articleKey: d, node: c });
    }
    return ee(() => {
      a.leaf = t.leaf;
    }), (r, d) => (m(), f("sl-card", ha, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, ba),
      C(" " + O(a.leaf.shop_image) + " ", 1),
      i("h4", pa, O(a.leaf.shop_name), 1),
      i("h5", va, O(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, ya),
      i("div", $a, [
        Q(i("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": d[0] || (d[0] = (c) => a.leaf.quantity = c),
          onInput: d[1] || (d[1] = (c) => s(
            a.leaf,
            a.leaf.article.dest.key,
            e.node,
            a.leaf.quantity
          ))
        }, null, 544), [
          [oe, a.leaf.quantity]
        ])
      ]),
      i("div", Sa, [
        _a,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, ka)
      ]),
      i("div", wa, [
        Ea,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[2] || (d[2] = (c) => u(a.leaf, a.leaf.article.dest.key, e.node))
        }, Ia)
      ]),
      i("div", Ca, [
        Oa,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, ja)
      ])
    ]));
  }
}, Da = /* @__PURE__ */ I(Ba, [["__scopeId", "data-v-4af59b39"]]), Va = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Na = { key: 0 }, Ra = { key: 0 }, La = { key: 1 }, Ua = {
  __name: "Discount",
  setup(e) {
    const n = le(), t = F(null), l = F(null), a = w({
      errorMessage: ""
    });
    function o() {
      l.value.hide();
      const s = t.value.value;
      if (!s) {
        l.value.show(), a.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      n.addDiscount(s);
    }
    return (s, u) => (m(), f(E, null, [
      i("div", null, [
        i("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: t
        }, null, 512),
        i("sl-button", { onClick: o }, "Einlösen"),
        i("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: l
        }, [
          Va,
          C(" " + O(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        U(n).state.basketRootNode.discount ? (m(), f("div", Na, [
          U(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), f("span", Ra, " Sie haben einen Rabattcode im Wert von " + O(U(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : _("", !0),
          U(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), f("span", La, " Sie haben einen Rabattcode im Wert von " + O(U(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : _("", !0)
        ])) : _("", !0)
      ])
    ], 64));
  }
}, H = (e) => (z("data-v-84507113"), e = e(), q(), e), Ta = { key: 0 }, Pa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Ma = {
  class: "footer-wrap",
  slot: "footer"
}, Wa = { class: "viur-shop-cart-node" }, za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Fa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("br", null, null, -1)), Ka = { class: "viur-shop-cart-sidebar-info-line" }, Ha = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Ga = { class: "viur-shop-cart-sidebar-info-line" }, Za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Ja = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ C(" 0 € ")
], -1)), Qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ C(" € ")
], -1)), Ya = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen "),
  /* @__PURE__ */ i("sl-button", {
    size: "medium",
    variant: "info"
  }, [
    /* @__PURE__ */ i("sl-icon", {
      name: "paypal",
      slot: "prefix"
    }),
    /* @__PURE__ */ C(" Paypal ")
  ])
], -1)), Xa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), xa = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(e) {
    const n = e, t = le(), l = F(null), a = w({
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
      ), await d(), l.value.hide();
    }
    async function s(h) {
      console.log("updateItem :", h), h.quantity === 0 ? (l.value.show(), a.currentItem = h.item, a.currentNode = h.node) : (await t.updateItem(h.articleKey, h.node.key, h.quantity), await t.init());
    }
    function u(h) {
      console.log("removeItem :", h), l.value.show(), a.currentItem = h.item, a.currentNode = h.node;
    }
    async function r() {
      a.leaves[a.currentNode.key].forEach((h) => {
        h.key === a.currentItem.key && (h.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function d() {
      a.nodes = [], a.leaves = {}, await t.init(), await c();
    }
    async function c(h = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", h);
      const v = await t.getChildren(h);
      console.log("getChildren children: ", v), v.forEach(async (b) => {
        b.skel_type === "node" ? (a.nodes.push(b), await c(b.key)) : (Object.keys(a.leaves).includes(h) || (a.leaves[h] = []), a.leaves[h].push(b));
      });
    }
    return ee(async () => {
      await t.init(), await c(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (h, v) => e.cartKey.length ? (m(), f(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: r
      }, [
        Pa,
        i("div", Ma, [
          i("sl-button", {
            variant: "danger",
            onClick: v[0] || (v[0] = (b) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), f(E, null, T(a.nodes, (b) => (m(), f("div", Wa, [
        Object.keys(a.leaves).includes(b.key) ? (m(), f(E, { key: 0 }, [
          Oe(ga, { node: b }, null, 8, ["node"]),
          (m(!0), f(E, null, T(a.leaves[b.key], ($) => (m(), P(Da, {
            key: $.key,
            leaf: $,
            node: b,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : _("", !0)
      ]))), 256)),
      za,
      e.sidebar ? (m(), P(Je, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), f(E, { key: 0 }, [
          qa,
          Fa,
          i("div", Ka, [
            Ha,
            C(" " + O(e.mode === "basket" ? U(t).state.basketRootNode.total : U(t).state.whishlistRootNodes[e.cartKey].total) + " € ", 1)
          ]),
          i("div", Ga, [
            Za,
            C(" " + O(U(t).state.basketRootNode.total - U(t).state.basketRootNode.total_discount_price) + " € ", 1)
          ]),
          Ja,
          Qa,
          Ya
        ], 64)) : _("", !0)
      ])) : _("", !0),
      Oe(Ua),
      Xa
    ], 64)) : (m(), f("sl-spinner", Ta));
  }
}, we = /* @__PURE__ */ I(xa, [["__scopeId", "data-v-84507113"]]), el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), re = (e) => (z("data-v-4082d346"), e = e(), q(), e), tl = {
  key: 1,
  class: "list"
}, nl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), sl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), al = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), ll = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), rl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), ol = /* @__PURE__ */ re(() => /* @__PURE__ */ i("br", null, null, -1)), il = { class: "viur-shop-cart-sidebar-btn-wrap" }, ul = ["variant", "disabled"], dl = {
  __name: "ConfirmView",
  setup(e) {
    const n = le(), t = w({
      cartIsInit: k(() => !0),
      itemsIsInit: k(() => {
        var a;
        return !!((a = n.state) != null && a.carts[n.state.basket].items);
      }),
      images: {},
      showOrderButton: !1
    });
    function l(a) {
      a.target.checked && (t.showOrderButton = !0), a.target.checked || (t.showOrderButton = !1);
    }
    return ee(async () => {
      await n.init();
    }), (a, o) => t.cartIsInit ? (m(), f("div", tl, [
      nl,
      sl,
      al,
      ll,
      (m(), P(Je, { to: "#order_sidebar" }, [
        rl,
        ol,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", il, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, ul)
        ])
      ]))
    ])) : (m(), P(fa, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ I(dl, [["__scopeId", "data-v-4082d346"]]), cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" })), ml = (e) => (z("data-v-50f31583"), e = e(), q(), e), fl = { class: "bind viur-shop-wrap" }, gl = ["panel", "disabled"], hl = { class: "viur-shop-order-step" }, bl = ["name", "library"], pl = { class: "viur-shop-order-status-text" }, vl = { class: "viur-shop-order-status-span" }, yl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, $l = ["name"], Sl = ["onClick"], _l = ["onClick"], kl = /* @__PURE__ */ ml(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), wl = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: !0
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: n }) {
    const t = e, l = n, a = w({
      tabNames: k(() => s(t.tabs)),
      isFirstTab: (c) => c === 0
    }), o = F(null);
    function s(c) {
      let h = [], v = [];
      for (const b in c)
        c[b].position ? h.push([b, c[b].position]) : h.push([b, 0]);
      return h.sort((b, $) => b[1] - $[1]), h.forEach((b) => {
        v.push(b[0]);
      }), v;
    }
    function u(c) {
      l("tabChange", c);
    }
    function r(c) {
      o.value.show(c);
    }
    function d(c) {
      o.value.show(c);
    }
    return (c, h) => (m(), f("div", fl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (m(!0), f(E, null, T(a.tabNames, (v, b) => {
          var $;
          return m(), f("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", hl, [
              ($ = e.tabs[v].icon) != null && $.name ? (m(), f("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, bl)) : _("", !0),
              i("div", pl, [
                C(O(b + 1) + ". ", 1),
                i("span", vl, O(e.tabs[v].displayName), 1)
              ])
            ]),
            b < a.tabNames.length - 1 ? (m(), f("sl-icon", yl)) : _("", !0)
          ], 8, gl);
        }), 128)),
        (m(!0), f(E, null, T(a.tabNames, (v, b) => (m(), f("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), P(mt(e.tabs[v].component), ft({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          b !== a.tabNames.length - 1 ? (m(), f("div", {
            key: 0,
            class: Z(["viur-shop-form-footer", { "flex-end": a.isFirstTab(b) }])
          }, [
            Q(i("sl-button", {
              type: "submit",
              onClick: ($) => r(a.tabNames[b - 1])
            }, " Zurück ", 8, Sl), [
              [ve, b !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: ($) => d(a.tabNames[b + 1])
            }, " Weiter ", 8, _l)
          ], 2)) : _("", !0)
        ], 8, $l))), 128))
      ], 544),
      kl
    ]));
  }
}, et = /* @__PURE__ */ I(wl, [["__scopeId", "data-v-50f31583"]]), be = (e) => (z("data-v-688e20e0"), e = e(), q(), e), El = { class: "bind" }, Al = /* @__PURE__ */ be(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank für Ihre Bestellung", -1)), Il = /* @__PURE__ */ be(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ C(" 123345670 ")
], -1)), Cl = { class: "paragraph" }, Ol = /* @__PURE__ */ be(() => /* @__PURE__ */ i("br", null, null, -1)), jl = { class: "btn-wrap" }, Bl = /* @__PURE__ */ be(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Dl = {
  __name: "OrderComplete",
  props: {
    redirectUrl: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    function n() {
    }
    return (t, l) => (m(), f("div", El, [
      Al,
      Il,
      i("p", Cl, [
        C(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        Ol,
        C(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
        i("div", jl, [
          Bl,
          i("sl-button", {
            variant: "primary",
            onClick: l[0] || (l[0] = (a) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Vl = /* @__PURE__ */ I(Dl, [["__scopeId", "data-v-688e20e0"]]), Ae = (e) => (z("data-v-4d14c6fe"), e = e(), q(), e), Nl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Rl = { class: "viur-shop-form-wrap" }, Ll = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Ul = { class: "viur-shop-form-wrap" }, Tl = { key: 0 }, Pl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ml = { class: "viur-shop-form-wrap" }, Wl = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = le(), t = w({
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
    function l(s) {
      t.isCustomAdress = !s.target.checked;
    }
    function a(s, u) {
      for (const [r, d] of Object.entries(u.value[0]))
        t.formValues[r] = d;
    }
    function o(s) {
      let u = {};
      return Array.isArray(s) ? (s.forEach((r) => {
        let d = r[0], c = r[1];
        u[d] = c;
      }), console.log("output", u), u) : s;
    }
    return se(t.formValues, (s) => {
      Object.entries(s).forEach(([u, r]) => {
        r === "" && delete t.formValues[u];
      });
    }), ee(async () => {
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = o(n.state.structure.address), t.formValues = n.state.shippingAddress;
    }), (s, u) => {
      const r = ae("bone");
      return m(), f(E, null, [
        i("div", null, [
          Nl,
          i("div", Rl, [
            (m(!0), f(E, null, T(t.addSkel, (d, c) => (m(), f(E, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Info" ? (m(), P(r, {
                  key: 0,
                  is: U(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (h) => a(c, h),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Ll,
          i("div", Ul, [
            (m(!0), f(E, null, T(t.addSkel, (d, c) => (m(), f(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), P(r, {
                  key: 0,
                  is: U(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (h) => a(c, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (m(), f("div", Tl, [
          Pl,
          i("div", Ml, [
            (m(!0), f(E, null, T(t.addSkel, (d, c) => (m(), f(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), P(r, {
                  key: 0,
                  is: U(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (h) => a(c, h)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ])) : _("", !0),
        i("sl-checkbox", {
          onSlChange: l,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, zl = /* @__PURE__ */ I(Wl, [["__scopeId", "data-v-4d14c6fe"]]), te = (e) => (z("data-v-c4232b7a"), e = e(), q(), e), ql = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Fl = { class: "viur-shop-form-wrap" }, Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Hl = ["onSlChange", "onSlClear", "label"], Gl = ["value"], Zl = { key: 0 }, Jl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ql = { class: "viur-shop-form-wrap" }, Yl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), Xl = [
  Yl
], xl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), er = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), tr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), nr = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = le(), t = w({
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
    }), l = F(null), a = F(null);
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
    function u(v, b) {
      for (const [$, g] of Object.entries(b.value[0]))
        t.formValues[$] = g;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(v, b) {
      if (console.log(v.target.value), !v.target.value.length) {
        c();
        return;
      }
      t.selectedItem[b] = v.target.value, t.isItemSelected = !0;
    }
    function c(v, b) {
      console.log("clearing..."), delete t.selectedItem[b], t.isItemSelected = !1;
    }
    function h(v) {
      let b = {};
      return Array.isArray(v) ? (v.forEach(($) => {
        let g = $[0], p = $[1];
        b[g] = p;
      }), b) : v;
    }
    return se(t.formValues, (v) => {
      Object.entries(v).forEach(([b, $]) => {
        $ === "" && delete t.formValues[b];
      });
    }), ee(async () => {
      await n.getAddressStructure(), t.addSkel = h(n.state.structure.address);
    }), (v, b) => {
      const $ = ae("bone");
      return m(), f(E, null, [
        i("div", null, [
          ql,
          i("div", Fl, [
            (m(!0), f(E, null, T(t.addSkel, (g, p) => (m(), f(E, { key: p }, [
              g.visible && g.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + p)
              }, [
                g.visible && g.params.group === "Customer Info" ? (m(), P($, {
                  key: 0,
                  is: U(x)(g.type),
                  name: p,
                  structure: h(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (y) => u(p, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ]),
        Kl,
        (m(!0), f(E, null, T(t.shippingAdressAmount, (g) => (m(), f("div", {
          class: "viur-shop-form-wrap",
          key: g
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (p) => d(p, g),
            onSlClear: (p) => c(p, g),
            label: t.selectedItem[g] ? U(n).state.carts[t.selectedItem[g]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), f(E, null, T(U(n).state.carts, (p, y) => (m(), f("sl-option", { value: y }, O(p.info.name), 9, Gl))), 256))
          ], 40, Hl),
          (m(!0), f(E, null, T(t.addSkel, (p, y) => (m(), f(E, { key: y }, [
            p.visible && p.params.group === "Customer Address" ? (m(), f("div", {
              key: 0,
              class: Z("viur-shop-form-bone-" + y)
            }, [
              p.visible && p.params.group === "Customer Address" ? (m(), P($, {
                key: 0,
                is: U(x)(p.type),
                name: y,
                structure: h(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
            ], 2)) : _("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), f("div", Zl, [
          Jl,
          i("div", Ql, [
            (m(!0), f(E, null, T(t.addSkel, (g, p) => (m(), f(E, { key: p }, [
              g.visible && g.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + p)
              }, [
                g.visible && g.params.group === "Customer Address" ? (m(), P($, {
                  key: 0,
                  is: U(x)(g.type),
                  name: p,
                  structure: h(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (y) => u(p, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ])) : _("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: r,
            title: "Lieferadresse entfernen"
          }, Xl),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            xl,
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
          er,
          i("strong", null, O(t.amountAlert.title), 1),
          tr,
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
}, sr = /* @__PURE__ */ I(nr, [["__scopeId", "data-v-c4232b7a"]]), tt = {
  __name: "ExampleUsage",
  setup(e) {
    const n = le(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), l = w({
      rootNode: {},
      tabs: {
        cart: {
          component: G(we),
          props: {
            sidebar: !0,
            mode: "basket",
            cartKey: t
          },
          // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
          displayName: "Warenkorb",
          icon: { name: "bag" },
          position: 2,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        confirm: {
          component: G(Ee),
          props: {},
          displayName: "Bestellung prüfen",
          icon: { name: "clipboard-check" },
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
          component: G(Vl),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: G(zl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: G(sr),
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
      (o == null ? void 0 : o.detail.name) === "confirm" && (l.tabs.orderComplete.disabled = !1);
    }
    return ee(async () => {
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (m(), P(et, {
      tabs: l.tabs,
      onTabChange: a
    }, null, 8, ["tabs"]));
  }
}, ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tt
}, Symbol.toStringTag, { value: "Module" })), lr = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = pt();
    return { state: w({}), route: t };
  }
}), rr = { class: "home" };
function or(e, n, t, l, a, o) {
  return m(), f("div", rr, "View " + O(e.route.path) + " is missing.", 1);
}
const ir = /* @__PURE__ */ I(lr, [["render", or]]), ur = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: ir
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-BiVIJOXD.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-mnJ_kfqo.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => el)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => ar)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => cl)
  }
];
function pr(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(ur), vt({
    // @ts-ignore
    history: yt("/"),
    routes: t
  });
}
const dr = ht(), vr = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", tt), e.component("ConfirmView", Ee), e.component("OrderView", et), e.use(dr);
  }
};
export {
  we as C,
  Vl as O,
  zl as U,
  vr as V,
  I as _,
  tt as a,
  Ee as b,
  pr as c,
  et as d,
  le as u
};
