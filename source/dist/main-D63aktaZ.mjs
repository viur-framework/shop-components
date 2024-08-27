var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => st(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as D, inject as O, reactive as w, openBlock as m, createElementBlock as g, normalizeClass as G, createElementVNode as i, renderSlot as Ze, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as S, toDisplayString as B, onMounted as R, ref as F, readonly as at, getCurrentScope as lt, onScopeDispose as rt, unref as T, computed as k, watchEffect as ce, renderList as U, watch as se, withDirectives as J, vModelText as re, getCurrentInstance as ot, resolveComponent as ae, createBlock as P, vShow as pe, withModifiers as de, createTextVNode as C, shallowRef as H, provide as ie, onBeforeMount as Q, useCssVars as it, Transition as ut, withCtx as dt, createVNode as ve, Teleport as ct, resolveDynamicComponent as mt, mergeProps as ft } from "vue";
import { defineStore as $e, createPinia as gt } from "pinia";
import Oe from "@viur/ckeditor5-build-classic";
import { Request as ht } from "@viur/vue-utils";
import { ViURShopClient as bt } from "@viur/viur-shop-client";
import { useRoute as pt, createRouter as vt, createWebHashHistory as yt } from "vue-router";
const $t = D({
  props: {
    isDragging: Boolean,
    draggingLineBottom: Boolean,
    draggingLineTop: Boolean
  },
  components: {},
  emits: ["change", "delete", "handleDragStart", "handleDragEnd", "handleDragOver", "handleDrop"],
  setup(e, n) {
    const t = O("boneState");
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
}, Je = (e) => (z("data-v-141aaf9b"), e = e(), q(), e), St = ["draggable"], _t = ["disabled"], kt = /* @__PURE__ */ Je(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), wt = [
  kt
], Et = { class: "value" }, At = ["disabled", "title"], It = /* @__PURE__ */ Je(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ct = [
  It
];
function Ot(e, n, t, l, a, o) {
  return m(), g("div", {
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
    const t = O("boneState");
    return {
      state: w({
        debug: !1
      }),
      boneState: t
    };
  }
}), Dt = { class: "bone-name" }, Nt = { key: 0 }, Vt = { class: "bone" };
function Rt(e, n, t, l, a, o) {
  return m(), g(E, null, [
    i("label", Dt, [
      Ze(e.$slots, "default", {}, void 0, !0),
      S("", !0)
    ]),
    e.state.debug ? (m(), g("div", Nt, [
      i("div", Vt, B(e.name), 1),
      i("pre", null, "    " + B(e.boneState) + `
    `, 1)
    ])) : S("", !0)
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
    const t = O("boneState"), l = w({});
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
  return e.boneState.bonestructure.type === "raw.json" ? (m(), g("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Tt)) : (m(), g("sl-textarea", {
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
  return m(), g("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, zt);
}
const je = /* @__PURE__ */ I(Wt, [["render", qt], ["__scopeId", "data-v-b45a1311"]]);
function Ft(e) {
  return lt() ? (rt(e), !0) : !1;
}
function Kt(e) {
  return typeof e == "function" ? e() : T(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
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
    isPending: at(a),
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
        for (let f of d)
          c && c !== "-" && f in c && c[f] ? c = c[f] : c = "-";
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
    const t = O("boneState"), l = w({
      value: k(() => e.value)
    }), a = F(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return ce(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = me(() => {
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
  return m(), g("sl-input", {
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
    const t = O("boneState"), l = w({}), a = F(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return ce(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = me(() => {
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
  return m(), g("sl-input", {
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
    const t = O("boneState"), l = w({
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
  return m(), g("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, tn);
}
const Ne = /* @__PURE__ */ I(en, [["render", nn], ["__scopeId", "data-v-f1b8af8c"]]), sn = D({
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
    const t = O("boneState"), l = w({
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
  return m(), g("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), g(E, null, U(e.convertObjToList(), (s) => (m(), g("sl-option", {
      key: s[0],
      value: s[0]
    }, B(s[1]), 9, ln))), 128))
  ], 40, an);
}
const Ve = /* @__PURE__ */ I(sn, [["render", rn], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
    const t = O("boneState"), l = w({
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
  return m(), g("sl-switch", {
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
    const t = O("boneState"), l = w({
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
    return ce(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: u } = me(() => {
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
  return m(), g(E, null, [
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
      }, null, 8, fn)
    ], 42, mn), [
      [re, e.state.value1]
    ]),
    e.boneState.readonly ? S("", !0) : J((m(), g("sl-input", {
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
      [re, e.state.value2]
    ]),
    i("ul", hn, [
      (m(!0), g(E, null, U(e.state.passwordInfo, (s, u) => (m(), g("li", { key: u }, B(s), 1))), 128)),
      (m(!0), g(E, null, U(e.state.requiredPasswordInfo, (s, u) => (m(), g("li", {
        key: u,
        class: "requiredInfo"
      }, B(s), 1))), 128))
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
    const t = O("boneState"), l = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [f, v] of Object.entries(l.structure)) {
          let p = "default", _ = l.structure[f], h = (d = l.value) == null ? void 0 : d[f];
          (c = v == null ? void 0 : v.params) != null && c.category && (p = v.params.category.toLowerCase()), Object.keys(u).includes(p) ? u[p].bones.push({
            boneName: f,
            boneStructure: _,
            boneValue: h
          }) : u[p] = {
            name: v.params.category,
            bones: [
              {
                boneName: f,
                boneStructure: _,
                boneValue: h
              }
            ]
          }, _.visible === !0 && (u[p].groupVisible = !0);
        }
        let r = {};
        return Object.keys(u).sort().forEach(function(f) {
          r[f] = u[f];
        }), r;
      })
    });
    function a(u) {
      n.emit("change", u);
    }
    R(() => {
      ot().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
  return e.state.globalRegistration ? (m(), g("div", yn, [
    (m(!0), g(E, null, U(e.state.formGroups, (u, r) => J((m(), g("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), g(E, null, U(u.bones, (d) => J((m(), P(s, {
        key: d.name,
        is: e.getBoneWidget(e.state.structure[d.boneName].type),
        name: d.boneName,
        structure: e.state.structure,
        skel: e.state.value,
        errors: e.boneState.errors,
        readonly: e.boneState.bonestructure.readonly ? !0 : void 0,
        onChangeInternal: e.changeEvent
      }, null, 8, ["is", "name", "structure", "skel", "errors", "readonly", "onChangeInternal"])), [
        [pe, e.state.structure[d.boneName].visible]
      ])), 128))
    ], 8, $n)), [
      [pe, u.groupVisible]
    ])), 128))
  ])) : (m(), g("sl-alert", vn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Qe = /* @__PURE__ */ I(pn, [["render", Sn], ["__scopeId", "data-v-e6fcfbca"]]), _n = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Qe },
  emits: ["change"],
  setup(e, n) {
    const t = O("boneState"), l = w({
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
    const t = O("boneState"), l = w({});
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
  return m(), g("sl-color-picker", {
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
    const t = O("boneState"), l = w({
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
    return ce(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = me(() => {
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
function Nn(e, n, t, l, a, o) {
  return m(), g(E, null, [
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
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), g("li", jn, B(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : S("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), g("li", Bn, B(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : S("", !0),
      e.state.precision ? (m(), g("li", Dn, B(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : S("", !0)
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ I(In, [["render", Nn], ["__scopeId", "data-v-03d5b399"]]);
var V = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class ue extends Error {
  constructor(n, t, l, a) {
    super(l || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
  }
}
let be = null;
function X() {
  return be || (be = $e("requestStore", () => {
    const e = w({ sKeys: /* @__PURE__ */ new Set() });
    function n() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: n
    };
  })), be();
}
class j {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = (V.VITE_API_URL ? V.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: a = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
    function r() {
      if (t instanceof FormData)
        return t;
      const c = new FormData();
      for (const f in t)
        if (Array.isArray(t[f]))
          for (let v of t[f])
            c.append(f, v);
        else
          c.append(f, t[f]);
      return c;
    }
    let d = oe.post(j.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      l && l(c.data);
    }).catch(function(c) {
      a && a(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = V.VITE_DEFAULT_RENDERER || "json") {
    await j.get(`/${t}/skey`, {
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
    renderer: s = V.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let c = null;
    X().state.sKeys.size === 0 && await j.getBatchSkeys(d);
    const f = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", f), X().state.sKeys.delete(f)) : (t || (t = {}), t.skey = f, X().state.sKeys.delete(f)), c = j.post(n, {
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
    let f = oe.get(j.buildUrl(n), t, s, r, u, d);
    return f.then(function(v) {
      l && l(v.data);
    }).catch(function(v) {
      a && a(v);
    }), f;
  }
  static list(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${u}/${n}/list`;
    return o && (r += `/${o}`), j.get(r, {
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
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let r = `/${u}/getStructure/${n}`;
    return o && (r += `/${o}`), j.get(r, {
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
    renderer: r = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/view/${t}`;
    return s && (d = `/${r}/${n}/view/${s}/${t}`), j.get(d, {
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
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${u}/${n}/add`;
    return o && (r = `/${u}/${n}/add/${o}`), j.securePost(r, {
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
    renderer: r = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/edit/${t}`;
    return s && (d = `/${r}/${n}/edit/${s}/${t}`), j.securePost(d, {
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
    renderer: r = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/delete/${t}`;
    return s && (d = `/${r}/${n}/delete/${s}/${t}`), j.securePost(d, {
      dataObj: l,
      callback: a,
      failedCallback: o,
      abortController: u,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? j.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? j.buildUrl(n.dest.downloadUrl) : j.buildUrl(null) : j.buildUrl(n);
  }
  static uploadFile(n, t = void 0) {
    const l = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((a, o) => {
      j.securePost("/vi/file/getUploadURL", { dataObj: l }).then(async (s) => {
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
          j.securePost("/vi/file/add", { dataObj: d }).then(async (c) => {
            let f = await c.json();
            f.action === "addSuccess" ? a(f.values) : o(f);
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
class oe {
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
        const f = new URLSearchParams();
        for (const [v, p] of Object.entries(d))
          if (Array.isArray(p))
            for (const _ of p)
              f.append(v, _);
          else
            f.append(v, p);
        c.search = f.toString();
      }
      return c.toString();
    }
    return fetch(u(n, t), oe.buildOptions("GET", null, a, o, s)).then(async (r) => {
      if (r.ok)
        return r;
      {
        const d = `${r.status} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(r.status, r.statusText, d, r));
      }
    }).catch((r) => {
      if (r instanceof TypeError) {
        const c = `503 ${r.message}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(503, r.message, c, r));
      }
      if (r instanceof DOMException && r.name == "AbortError") {
        const c = `${r.code} ${r.name}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(r.code, r.name, c, { url: n }));
      }
      const d = `${r.statusCode} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ue(r.statusCode, r.statusText, d, r.response));
    });
  }
  static post(n, t = null, l = null, a = null, o = null, s = null) {
    return fetch(n, oe.buildOptions("POST", t, a, o, s));
  }
}
var Vn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Rn = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Qe },
  emits: ["change"],
  setup(e, n) {
    const t = O("boneState"), l = O("formatString"), a = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), j.get(
        `/${Vn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const f = await c.json();
        a.skellistdata = {};
        for (let p of f.skellist)
          a.skellistdata[p.key] = p;
        return (v = f.skellist) == null ? void 0 : v.map((p) => ({ text: l(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
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
  return m(), g("div", Un, [
    i("div", Tn, [
      e.state.selection ? (m(), g("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Pn)) : (m(), g("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Mn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), g("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, qn, 8, Wn)) : S("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (m(), P(s, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : S("", !0)
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
    const t = O("boneState"), l = w({});
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
  return m(), g("div", Hn, B(e.value), 1);
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
    const t = O("boneState"), l = F(), a = w({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o() {
      console.log(j.downloadUrlFor(e.value)), window.open(j.downloadUrlFor(e.value));
    }
    function s() {
      return j.downloadUrlFor(e.value, !1);
    }
    function u(c) {
      const f = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, p) => {
        j.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: f }).then(async (_) => {
          let h = await _.json();
          fetch(h.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? v(A.values) : p(A);
            }).catch(($) => {
              p($);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch((_) => {
          p(_);
        });
      });
    }
    async function r(c) {
      a.loading = !0;
      for (let f of c.target.files) {
        let v = await u(f);
        l.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function d(c) {
      a.loading = !0, a.droparea = !1;
      for (let f of c.dataTransfer.files) {
        let v = await u(f);
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
}), fe = (e) => (z("data-v-91086308"), e = e(), q(), e), Qn = {
  key: 0,
  class: "loader"
}, Yn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Xn = [
  Yn
], xn = {
  key: 1,
  class: "droparea"
}, es = ["title"], ts = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), ns = [
  ts
], ss = ["multiple"], as = ["title"], ls = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", {
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
}, fs = { key: 2 }, gs = ["title"], hs = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), bs = [
  hs
];
function ps(e, n, t, l, a, o) {
  var s, u, r, d, c, f, v, p, _, h;
  return m(), g("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (m(), g("div", Qn, Xn)) : S("", !0),
    e.state.droparea ? (m(), g("div", xn, " Dateien hier hinziehen ")) : S("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), g("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, ns, 8, es)) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, ss),
    e.value ? (m(), g("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, rs, 8, as)) : S("", !0),
    i("div", os, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), g("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
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
      ])) : (m(), g("div", cs, [
        (f = (c = e.value) == null ? void 0 : c.dest) != null && f.name ? (m(), g("sl-icon", ms)) : S("", !0)
      ])),
      (p = (v = e.value) == null ? void 0 : v.dest) != null && p.name ? (m(), g("div", fs, B(decodeURIComponent((h = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : h.name)), 1)) : S("", !0)
    ]),
    e.boneState.multiple ? S("", !0) : (m(), g("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
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
    const t = O("boneState"), l = w({
      value: "",
      editorConfig: {},
      editor: k(() => Oe)
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
      ClassicEditor: Oe,
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
  return e.state.editor ? (m(), g(E, { key: 0 }, [
    (u = e.boneState.bonestructure) != null && u.valid_html || (r = e.boneState.bonestructure) != null && r.validHtml ? (m(), P(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (f) => e.state.value = f),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), g("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...f) => e.changeEventTextarea && e.changeEventTextarea(...f))
    }, null, 40, ys))
  ], 64)) : S("", !0);
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
    const t = O("boneState"), l = w({
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
  return m(), g(E, null, [
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
    }, null, 40, _s), [
      [re, e.state.valueLat]
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
    }, null, 40, ks), [
      [re, e.state.valueLng]
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
    const t = O("boneState"), l = w({
      counter: 0,
      debounce: null
    }), a = O("addMultipleEntry"), o = O("removeMultipleEntries");
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
}), Ye = (e) => (z("data-v-63e75dee"), e = e(), q(), e), As = { class: "actionbar" }, Is = ["title"], Cs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Os = [
  Cs
], js = ["title"], Bs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ds(e, n, t, l, a, o) {
  return m(), g("div", As, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Os, 8, Is)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Bs,
      C(" " + B(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), g(E, { key: 0 }, [
        C("(" + B(e.state.counter) + ")", 1)
      ], 64)) : S("", !0)
    ], 8, js)) : S("", !0)
  ]);
}
const Ns = /* @__PURE__ */ I(Es, [["render", Ds], ["__scopeId", "data-v-63e75dee"]]);
var Vs = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
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
    const t = O("boneState"), l = O("addMultipleEntry"), a = O("formatString"), o = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), j.get(
        `/${Vs.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const f = await c.json();
        return s.skels = f.skellist.reduce((p, _) => (p[_.key] = _, p), {}), (v = f.skellist) == null ? void 0 : v.map((p) => ({ text: a(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
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
}), Xe = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), Ls = { class: "actionbar" }, Us = ["title"], Ts = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ps = [
  Ts
], Ms = ["source"], Ws = ["title"], zs = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function qs(e, n, t, l, a, o) {
  return m(), g("div", Ls, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ps, 8, Us)) : S("", !0),
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
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      zs,
      C(" " + B(e.$t("bone.list")), 1)
    ], 8, Ws)) : S("", !0)
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
    const t = O("boneState"), l = O("addMultipleEntry");
    O("formatString");
    const a = null, o = F(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(c) {
      const f = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, p) => {
        j.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: f }).then(async (_) => {
          let h = await _.json();
          fetch(h.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? v(A.values) : p(A);
            }).catch(($) => {
              p($);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch((_) => {
          p(_);
        });
      });
    }
    async function r(c) {
      s.loading = !0;
      for (let f of c.target.files) {
        let v = await u(f);
        o.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), l(e.lang, { dest: v, rel: p });
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let f of c.dataTransfer.files) {
        let v = await u(f);
        o.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), l(e.lang, { dest: v, rel: p });
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
  return m(), g("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = de((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = de((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Zs, 8, Hs)) : S("", !0),
    e.state.droparea ? (m(), g("div", Js, " Dateien hier hinziehen ")) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Qs),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, xs, 8, Ys)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      ta,
      C(" " + B(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), g("sl-spinner", na)) : S("", !0)
    ], 8, ea)) : S("", !0)
  ], 32);
}
const aa = /* @__PURE__ */ I(Ks, [["render", sa], ["__scopeId", "data-v-9bac9f8a"]]), _e = $e("boneStore", () => {
  const e = w({
    additionalBones: H({}),
    defaultBones: H({
      rawBone: ye,
      keyBone: je,
      stringBone: Be,
      emailBone: De,
      dateBone: Ne,
      booleanBone: Re,
      selectBone: Ve,
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
    actionbars: H({
      "relational.tree.leaf.file.file": aa,
      "relational.": Fs
    }),
    multibones: H(["select", "select."])
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
    return s === "date" ? Ne : s === "key" ? je : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? Be : s === "select" || s.startsWith("select.") ? Ve : s === "bool" ? Re : s === "password" ? Le : s === "record" ? Ue : s === "numeric" || s.startsWith("numeric.") ? Pe : s === "relational.tree.leaf.file.file" ? ze : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Te : s === "text" ? qe : s === "spatial" ? Fe : ye;
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
    return Ns;
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
        var h;
        return (h = e.structure) == null ? void 0 : h[e.name];
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
        var h;
        return ((h = t.languages) == null ? void 0 : h.length) && t.languages.length > 0;
      }),
      languages: k(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: k(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: k(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: k(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: k(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: k(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: k(() => {
        var h;
        return la((h = t.bonestructure) == null ? void 0 : h.type);
      }),
      isEmpty: k(() => {
        function h(b) {
          for (const [y, $] of Object.entries(b))
            if ($ !== null) {
              if (Array.isArray($) && $.length > 0)
                return !1;
              if (!Array.isArray($))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? h(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: k(() => {
        let h = [];
        for (let b of e.errors)
          b.fieldPath[0] === e.name && (b.severity > 2 || t.required && (b.severity === 2 || b.severity === 0)) && h.push(b.errorMessage);
        return h;
      })
    });
    ie("boneState", t);
    function l(h, b, y) {
      s(b, h, "isDragging"), s(b, h, "dragStartIndex");
    }
    function a(h, b, y) {
      y.preventDefault();
      const $ = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      $ < A.offsetHeight / 2 ? (s(b, h, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = h) : (s(b, h, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = h + 1);
      let L = b ? t.bonevalue[b] : t.bonevalue;
      t.dropIndex.index > L.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(h, b, y) {
      let $ = null;
      t.dragStartIndex.index !== t.dropIndex.index && (b ? ($ = t.bonevalue[b].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[b].splice(t.dropIndex.index, 0, $)) : ($ = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, $)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: b,
        index: h
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(h, b, y) {
      t[y].lang = h || null, t[y].index = b;
    }
    function u(...h) {
      h.forEach((b) => {
        t[b] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(h, b, y = null, $ = null, A) {
      if (b === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && $ !== null ? t.bonevalue[y][$] = b : t.bonevalue[y] = b) : $ !== null ? t.bonevalue[$] = b : A === !1 || (t.bonevalue = b), t.readonly)) return !1;
      let L = {
        name: h,
        value: d(),
        lang: y,
        index: $
      }, N = {
        name: h,
        value: b,
        lang: y,
        index: $
      };
      A != null && (L.pwMatch = A, N.pwMatch = A), n.emit("change", L), n.emit("change-internal", N);
    }
    function d() {
      function h(y, $ = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [$ + ".lat"]: y[0] }), A.push({ [$ + ".lng"]: y[1] });
          else if (Object.values(y).filter((L) => L === Object(L)).length > 0)
            for (const [L, N] of y.entries())
              N.rel !== null ? A.push(h(N, $ + "." + L)) : A.push(h(N, $));
          else
            for (const [L, N] of y.entries())
              A.push(h(N, $));
        else if (y === Object(y))
          for (const [L, N] of Object.entries(y))
            $ ? $.endsWith(".dest") || $.endsWith(".rel") ? $.endsWith(".dest") && L === "key" ? (/\.[0-9]*\.dest$/.test($) ? A.push(h(N, $.replace(/\.[0-9]*\.dest/, ""))) : A.push(h(N, $.replace(/\.dest/, ""))), A.push(h(N, $.replace(/\.dest/, "") + "." + L))) : $.endsWith(".rel") && A.push(h(N, $.replace(/\.rel/, "") + "." + L)) : A.push(h(N, $ + "." + L)) : A.push(h(N, L));
        else
          y == null && (y = ""), $ !== null && A.push({ [$]: y });
        return A;
      }
      let b = h(t.bonevalue, e.name);
      return b = b.flat(10), b;
    }
    function c(h = null, b = "") {
      h ? Object.keys(t.bonevalue).includes(h) ? t.bonevalue[h].push(b) : t.bonevalue[h] = [b] : t.bonevalue ? t.bonevalue.push(b) : t.bonevalue = [b];
    }
    ie("addMultipleEntry", c);
    function f(h, b = null) {
      var y;
      b ? (y = t.bonevalue) == null || y[b].splice(h, 1) : t.bonevalue.splice(h, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: b,
        index: h
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: b,
        index: h
      });
    }
    function v(h = null) {
      var b;
      h ? (b = t.bonevalue) == null || b[h].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: d(),
        lang: h
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: h
      });
    }
    ie("removeMultipleEntries", v);
    function p(h = null, b = "") {
      c(h, b);
    }
    function _(h, b) {
      function y(N) {
        let Z = [], K = [], ne = /\$\((.*?)\)/g;
        for (; K; ) {
          if (K = ne.exec(N), !K) {
            K = !1;
            continue;
          }
          Z.push(K[1]);
        }
        return Z;
      }
      function $(N, Z) {
        let K = N.split("."), ne = N.split("."), M = Z;
        for (let Y of K)
          if (ne.shift(), M && M !== "-" && Object.keys(M).includes(Y) && M[Y])
            if (Array.isArray(M[Y])) {
              let Ie = [];
              for (let tt of M[Y])
                Ie.push($(ne.join("."), tt));
              M = Ie.join(", ");
            } else
              M = M[Y];
          else (!M || typeof M[Y] == "object" && !M[Y]) && (M = "-");
        return M;
      }
      let A = y(h), L = [];
      Array.isArray(b) || (b = [b]);
      for (let N of b) {
        let Z = h;
        for (let K of A) {
          let ne = $(K, N);
          Z = Z.replace("$(" + K + ")", ne);
        }
        L.push(Z);
      }
      return L.join(", ");
    }
    return ie("formatString", _), Q(() => {
      var h;
      e.value ? t.bonevalue = e.value : t.bonevalue = (h = e.skel) == null ? void 0 : h[e.name];
    }), se(
      () => e.skel,
      (h, b) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), se(
      () => {
        var h;
        return (h = e.errors) == null ? void 0 : h[e.name];
      },
      (h, b) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: c,
      removeMultipleEntry: f,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: ra,
      multipleBonePressEnter: p,
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
  it((e) => ({
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
  return m(), P(ut, null, {
    default: dt(() => [
      t.active ? (m(), g("div", ia, [
        ua,
        i("div", da, [
          i("sl-icon", { src: t.logo }, null, 8, ca)
        ])
      ])) : S("", !0)
    ]),
    _: 1
  });
}
const fa = /* @__PURE__ */ I(ke, [["render", ma], ["__scopeId", "data-v-46c45785"]]), ee = $e("cartstore", () => {
  const e = new bt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = w({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} }
  });
  async function t() {
    await a();
  }
  async function l(f) {
    return await e.cart_list({ cart_key: f });
  }
  async function a() {
    (await e.cart_list()).forEach((v) => {
      v.is_root_node && (v.cart_type === "basket" ? n.basketRootNode = v : n.whishlistRootNodes.push(v));
    });
  }
  async function o(f, v) {
    let p = await e.article_add({
      article_key: f,
      parent_cart_key: v
    });
    console.log("addToCart", p);
  }
  async function s(f, v) {
    let p = await e.article_view({
      article_key: f,
      parent_cart_key: v
    });
    console.log("getArticleView", p);
  }
  async function u(f, v) {
    let p = await e.article_remove({
      article_key: f,
      parent_cart_key: v
    });
    console.log("remove Resp", p);
  }
  async function r(f, v, p) {
    let _ = await e.article_update({
      article_key: f,
      parent_cart_key: v,
      quantity: p,
      quantity_mode: "replace"
    });
    console.log("update Resp", _);
  }
  async function d() {
    let f = await e.address_structure();
    n.structure.address = f.addSkel, console.log("adress add", n.structure.address);
  }
  async function c(f) {
    await e.discount_add({ code: f });
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: s,
    removeItem: u,
    updateItem: r,
    init: t,
    getAdressStructure: d,
    getChildren: l,
    addDiscount: c
  };
}), ga = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), g("pre", null, B(e.node.name), 1));
  }
}, ge = (e) => (z("data-v-d313b580"), e = e(), q(), e), ha = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ba = ["src"], pa = { class: "viur-shop-cart-leaf-headline headline" }, va = { class: "viur-shop-cart-leaf-artno" }, ya = ["innerHTML"], $a = { class: "viur-shop-cart-leaf-quantity" }, Sa = { class: "viur-shop-cart-leaf-unitprice" }, _a = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), ka = ["value"], wa = { class: "viur-shop-cart-leaf-actions" }, Ea = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), Aa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Ia = [
  Aa
], Ca = { class: "viur-shop-cart-leaf-price" }, Oa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), ja = ["value"], Ba = {
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
      return r !== void 0 ? ht.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(r, d, c, f) {
      l("updateItem", {
        item: r,
        articleKey: d,
        node: c,
        quantity: f
      });
    }
    function u(r, d, c) {
      l("removeItem", { item: r, articleKey: d, node: c });
    }
    return Q(() => {
      a.leaf = t.leaf;
    }), (r, d) => (m(), g("sl-card", ha, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, ba),
      i("h4", pa, B(a.leaf.shop_name), 1),
      i("h5", va, B(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, ya),
      i("div", $a, [
        J(i("sl-input", {
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
          [re, a.leaf.quantity]
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
}, Da = /* @__PURE__ */ I(Ba, [["__scopeId", "data-v-d313b580"]]), Na = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Va = { key: 0 }, Ra = { key: 0 }, La = { key: 1 }, Ua = {
  __name: "Discount",
  setup(e) {
    const n = ee(), t = F(null), l = F(null), a = w({
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
    return (s, u) => (m(), g(E, null, [
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
          Na,
          C(" " + B(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        T(n).state.basketRootNode.discount ? (m(), g("div", Va, [
          T(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), g("span", Ra, " Sie haben einen Rabattcode im Wert von " + B(T(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : S("", !0),
          T(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), g("span", La, " Sie haben einen Rabattcode im Wert von " + B(T(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : S("", !0)
        ])) : S("", !0)
      ])
    ], 64));
  }
}, xe = (e) => (z("data-v-127e3313"), e = e(), q(), e), Ta = { key: 0 }, Pa = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Ma = {
  class: "footer-wrap",
  slot: "footer"
}, Wa = { class: "viur-shop-cart-node" }, za = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), qa = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(e) {
    const n = e, t = ee(), l = F(null), a = w({
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
    async function s(f) {
      console.log("updateItem :", f), f.quantity === 0 ? (l.value.show(), a.currentItem = f.item, a.currentNode = f.node) : (await t.updateItem(f.articleKey, f.node.key, f.quantity), await t.init());
    }
    function u(f) {
      console.log("removeItem :", f), l.value.show(), a.currentItem = f.item, a.currentNode = f.node;
    }
    async function r() {
      a.leaves[a.currentNode.key].forEach((f) => {
        f.key === a.currentItem.key && (f.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function d() {
      a.nodes = [], a.leaves = {}, await t.init(), await c();
    }
    async function c(f = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", f);
      const v = await t.getChildren(f);
      console.log("getChildren children: ", v), v.forEach(async (p) => {
        p.skel_type === "node" ? (a.nodes.push(p), await c(p.key)) : (Object.keys(a.leaves).includes(f) || (a.leaves[f] = []), a.leaves[f].push(p));
      });
    }
    return Q(async () => {
      await t.init(), await c(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (f, v) => e.cartKey.length ? (m(), g(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: r
      }, [
        Pa,
        i("div", Ma, [
          i("sl-button", {
            variant: "danger",
            onClick: v[0] || (v[0] = (p) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), g(E, null, U(a.nodes, (p) => (m(), g("div", Wa, [
        Object.keys(a.leaves).includes(p.key) ? (m(), g(E, { key: 0 }, [
          ve(ga, { node: p }, null, 8, ["node"]),
          (m(!0), g(E, null, U(a.leaves[p.key], (_) => (m(), P(Da, {
            key: _.key,
            leaf: _,
            node: p,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : S("", !0)
      ]))), 256)),
      ve(Ua),
      za
    ], 64)) : (m(), g("sl-spinner", Ta));
  }
}, we = /* @__PURE__ */ I(qa, [["__scopeId", "data-v-127e3313"]]), Fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), le = (e) => (z("data-v-4082d346"), e = e(), q(), e), Ka = {
  key: 1,
  class: "list"
}, Ha = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), Ga = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), Za = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), Ja = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), Qa = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Ya = /* @__PURE__ */ le(() => /* @__PURE__ */ i("br", null, null, -1)), Xa = { class: "viur-shop-cart-sidebar-btn-wrap" }, xa = ["variant", "disabled"], el = {
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
    function l(a) {
      a.target.checked && (t.showOrderButton = !0), a.target.checked || (t.showOrderButton = !1);
    }
    return Q(async () => {
      await n.init();
    }), (a, o) => t.cartIsInit ? (m(), g("div", Ka, [
      Ha,
      Ga,
      Za,
      Ja,
      (m(), P(ct, { to: "#order_sidebar" }, [
        Qa,
        Ya,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", Xa, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, xa)
        ])
      ]))
    ])) : (m(), P(fa, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ I(el, [["__scopeId", "data-v-4082d346"]]), tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" })), nl = { class: "viur-shop-sidebar" }, sl = /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1), al = /* @__PURE__ */ i("br", null, null, -1), ll = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Zwischensumme"),
  /* @__PURE__ */ C(" 999.99 € ")
], -1), rl = { class: "viur-shop-cart-sidebar-info-line" }, ol = /* @__PURE__ */ i("span", null, "Rabatt", -1), il = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ C(" 0 € ")
], -1), ul = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ C(" € ")
], -1), dl = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
], -1), cl = {
  __name: "OrderSidebar",
  setup(e) {
    const n = ee();
    return Q(() => {
      n.init();
    }), (t, l) => (m(), g("div", nl, [
      sl,
      al,
      ll,
      i("div", rl, [
        ol,
        C(" " + B(T(n).state.basketRootNode.total - T(n).state.basketRootNode.total_discount_price) + " € ", 1)
      ]),
      il,
      ul,
      dl
    ]));
  }
}, ml = (e) => (z("data-v-35bee132"), e = e(), q(), e), fl = { class: "bind viur-shop-wrap" }, gl = ["panel", "disabled"], hl = { class: "viur-shop-order-step" }, bl = ["name", "library"], pl = { class: "viur-shop-order-status-text" }, vl = { class: "viur-shop-order-status-span" }, yl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, $l = ["name"], Sl = {
  key: 0,
  class: "sidebar"
}, _l = ["onClick"], kl = ["onClick"], wl = /* @__PURE__ */ ml(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), El = {
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
    const t = e, l = n, a = w({
      tabNames: k(() => s(t.tabs)),
      isFirstTab: (c) => c === 0
    }), o = F(null);
    function s(c) {
      let f = [], v = [];
      for (const p in c)
        c[p].position ? f.push([p, c[p].position]) : f.push([p, 0]);
      return f.sort((p, _) => p[1] - _[1]), f.forEach((p) => {
        v.push(p[0]);
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
    return (c, f) => (m(), g("div", fl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (m(!0), g(E, null, U(a.tabNames, (v, p) => {
          var _;
          return m(), g("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", hl, [
              (_ = e.tabs[v].icon) != null && _.name ? (m(), g("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, bl)) : S("", !0),
              i("div", pl, [
                C(B(p + 1) + ". ", 1),
                i("span", vl, B(e.tabs[v].displayName), 1)
              ])
            ]),
            p < a.tabNames.length - 1 ? (m(), g("sl-icon", yl)) : S("", !0)
          ], 8, gl);
        }), 128)),
        (m(!0), g(E, null, U(a.tabNames, (v, p) => (m(), g("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), P(mt(e.tabs[v].component), ft({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          e.sidebar && p !== a.tabNames.length - 1 ? (m(), g("div", Sl, [
            ve(cl)
          ])) : S("", !0),
          p !== a.tabNames.length - 1 ? (m(), g("div", {
            key: 1,
            class: G(["viur-shop-form-footer", { "flex-end": a.isFirstTab(p) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (_) => r(a.tabNames[p - 1])
            }, " Zurück ", 8, _l), [
              [pe, p !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => d(a.tabNames[p + 1])
            }, " Weiter ", 8, kl)
          ], 2)) : S("", !0)
        ], 8, $l))), 128))
      ], 544),
      wl
    ]));
  }
}, Al = /* @__PURE__ */ I(El, [["__scopeId", "data-v-35bee132"]]), he = (e) => (z("data-v-688e20e0"), e = e(), q(), e), Il = { class: "bind" }, Cl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank für Ihre Bestellung", -1)), Ol = /* @__PURE__ */ he(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ C(" 123345670 ")
], -1)), jl = { class: "paragraph" }, Bl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("br", null, null, -1)), Dl = { class: "btn-wrap" }, Nl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Vl = {
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
    return (t, l) => (m(), g("div", Il, [
      Cl,
      Ol,
      i("p", jl, [
        C(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        Bl,
        C(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
        i("div", Dl, [
          Nl,
          i("sl-button", {
            variant: "primary",
            onClick: l[0] || (l[0] = (a) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Rl = /* @__PURE__ */ I(Vl, [["__scopeId", "data-v-688e20e0"]]), Ae = (e) => (z("data-v-903d08d7"), e = e(), q(), e), Ll = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Ul = { class: "viur-shop-form-wrap" }, Tl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Pl = { class: "viur-shop-form-wrap" }, Ml = { key: 0 }, Wl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), zl = { class: "viur-shop-form-wrap" }, ql = {
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
    function l(s) {
      s.target.checked && (t.isCustomAdress = !1), s.target.checked || (t.isCustomAdress = !0);
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
    }), Q(async () => {
      await n.getAdressStructure(), t.addSkel = o(n.state.structure.address);
    }), (s, u) => {
      const r = ae("bone");
      return m(), g(E, null, [
        i("div", null, [
          Ll,
          i("div", Ul, [
            (m(!0), g(E, null, U(t.addSkel, (d, c) => (m(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Info" ? (m(), P(r, {
                  key: 0,
                  is: T(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (f) => a(c, f),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Tl,
          i("div", Pl, [
            (m(!0), g(E, null, U(t.addSkel, (d, c) => (m(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), P(r, {
                  key: 0,
                  is: T(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (f) => a(c, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (m(), g("div", Ml, [
          Wl,
          i("div", zl, [
            (m(!0), g(E, null, U(t.addSkel, (d, c) => (m(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), P(r, {
                  key: 0,
                  is: T(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (f) => a(c, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ])) : S("", !0),
        i("sl-checkbox", {
          onSlChange: l,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Fl = /* @__PURE__ */ I(ql, [["__scopeId", "data-v-903d08d7"]]), te = (e) => (z("data-v-489988f4"), e = e(), q(), e), Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Hl = { class: "viur-shop-form-wrap" }, Gl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Zl = ["onSlChange", "onSlClear", "label"], Jl = ["value"], Ql = { key: 0 }, Yl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Xl = { class: "viur-shop-form-wrap" }, xl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), er = [
  xl
], tr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), nr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), sr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), ar = {
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
    function u(v, p) {
      for (const [_, h] of Object.entries(p.value[0]))
        t.formValues[_] = h;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(v, p) {
      if (console.log(v.target.value), !v.target.value.length) {
        c();
        return;
      }
      t.selectedItem[p] = v.target.value, t.isItemSelected = !0;
    }
    function c(v, p) {
      console.log("clearing..."), delete t.selectedItem[p], t.isItemSelected = !1;
    }
    function f(v) {
      let p = {};
      return Array.isArray(v) ? (v.forEach((_) => {
        let h = _[0], b = _[1];
        p[h] = b;
      }), p) : v;
    }
    return se(t.formValues, (v) => {
      Object.entries(v).forEach(([p, _]) => {
        _ === "" && delete t.formValues[p];
      });
    }), Q(async () => {
      await n.getAdressStructure(), t.addSkel = f(n.state.structure.address);
    }), (v, p) => {
      const _ = ae("bone");
      return m(), g(E, null, [
        i("div", null, [
          Kl,
          i("div", Hl, [
            (m(!0), g(E, null, U(t.addSkel, (h, b) => (m(), g(E, { key: b }, [
              h.visible && h.params.group === "Customer Info" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                h.visible && h.params.group === "Customer Info" ? (m(), P(_, {
                  key: 0,
                  is: T(x)(h.type),
                  name: b,
                  structure: f(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        Gl,
        (m(!0), g(E, null, U(t.shippingAdressAmount, (h) => (m(), g("div", {
          class: "viur-shop-form-wrap",
          key: h
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (b) => d(b, h),
            onSlClear: (b) => c(b, h),
            label: t.selectedItem[h] ? T(n).state.carts[t.selectedItem[h]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), g(E, null, U(T(n).state.carts, (b, y) => (m(), g("sl-option", { value: y }, B(b.info.name), 9, Jl))), 256))
          ], 40, Zl),
          (m(!0), g(E, null, U(t.addSkel, (b, y) => (m(), g(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (m(), g("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              b.visible && b.params.group === "Customer Address" ? (m(), P(_, {
                key: 0,
                is: T(x)(b.type),
                name: y,
                structure: f(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: ($) => u(y, $)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
            ], 2)) : S("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), g("div", Ql, [
          Yl,
          i("div", Xl, [
            (m(!0), g(E, null, U(t.addSkel, (h, b) => (m(), g(E, { key: b }, [
              h.visible && h.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                h.visible && h.params.group === "Customer Address" ? (m(), P(_, {
                  key: 0,
                  is: T(x)(h.type),
                  name: b,
                  structure: f(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ])) : S("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: r,
            title: "Lieferadresse entfernen"
          }, er),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            tr,
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
          nr,
          i("strong", null, B(t.amountAlert.title), 1),
          sr,
          C(" " + B(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, lr = /* @__PURE__ */ I(ar, [["__scopeId", "data-v-489988f4"]]), et = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), l = w({
      rootNode: {},
      tabs: {
        cart: {
          component: H(we),
          props: {
            sidebar: !0,
            mode: "basket",
            cartKey: t
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
          component: H(Ee),
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
          component: H(Rl),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: H(Fl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: H(lr),
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
    return Q(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (m(), P(Al, {
      tabs: l.tabs,
      onTabChange: a,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), or = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = pt();
    return { state: w({}), route: t };
  }
}), ir = { class: "home" };
function ur(e, n, t, l, a, o) {
  return m(), g("div", ir, "View " + B(e.route.path) + " is missing.", 1);
}
const dr = /* @__PURE__ */ I(or, [["render", ur]]), cr = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: dr
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-D74440Dm.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-BN7przVR.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Fa)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => rr)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => tl)
  }
];
function $r(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(cr), vt({
    // @ts-ignore
    history: yt("/"),
    routes: t
  });
}
const mr = gt(), Sr = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", et), e.component("ConfirmView", Ee), e.use(mr);
  }
};
export {
  we as C,
  Sr as V,
  I as _,
  et as a,
  Ee as b,
  $r as c,
  ee as u
};
