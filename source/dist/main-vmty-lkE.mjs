var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => st(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as D, inject as O, reactive as w, openBlock as m, createElementBlock as g, normalizeClass as Z, createElementVNode as i, renderSlot as Ze, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as S, toDisplayString as j, onMounted as R, ref as F, readonly as at, getCurrentScope as lt, onScopeDispose as rt, unref as U, computed as k, watchEffect as me, renderList as T, watch as se, withDirectives as Q, vModelText as oe, getCurrentInstance as ot, resolveComponent as ae, createBlock as P, vShow as ve, withModifiers as ce, createTextVNode as C, shallowRef as G, provide as ue, onBeforeMount as ee, useCssVars as it, Transition as ut, withCtx as dt, createVNode as Oe, Teleport as Je, resolveDynamicComponent as ct, mergeProps as mt } from "vue";
import { defineStore as $e, createPinia as ft } from "pinia";
import { Request as gt } from "@viur/vue-utils";
import { ViURShopClient as ht } from "@viur/viur-shop-client";
import { useRoute as bt, createRouter as pt, createWebHashHistory as vt } from "vue-router";
const yt = D({
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
}, Qe = (e) => (z("data-v-141aaf9b"), e = e(), q(), e), $t = ["draggable"], St = ["disabled"], _t = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), kt = [
  _t
], wt = { class: "value" }, Et = ["disabled", "title"], At = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), It = [
  At
];
function Ct(e, n, t, l, a, o) {
  return m(), g("div", {
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
    }, kt, 40, St),
    i("div", wt, [
      Ze(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (s) => e.$emit("delete"))
    }, It, 8, Et)
  ], 42, $t);
}
const Ot = /* @__PURE__ */ I(yt, [["render", Ct], ["__scopeId", "data-v-141aaf9b"]]), jt = D({
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
}), Bt = { class: "bone-name" }, Dt = { key: 0 }, Nt = { class: "bone" };
function Vt(e, n, t, l, a, o) {
  return m(), g(E, null, [
    i("label", Bt, [
      Ze(e.$slots, "default", {}, void 0, !0),
      S("", !0)
    ]),
    e.state.debug ? (m(), g("div", Dt, [
      i("div", Nt, j(e.name), 1),
      i("pre", null, "    " + j(e.boneState) + `
    `, 1)
    ])) : S("", !0)
  ], 64);
}
const Rt = /* @__PURE__ */ I(jt, [["render", Vt], ["__scopeId", "data-v-b7149172"]]), Lt = D({
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
}), Ut = ["disabled", "value"], Tt = ["disabled", "value"];
function Pt(e, n, t, l, a, o) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (m(), g("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ut)) : (m(), g("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Tt));
}
const ye = /* @__PURE__ */ I(Lt, [["render", Pt], ["__scopeId", "data-v-0ebe5f0b"]]), Mt = D({
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
}), Wt = ["value"];
function zt(e, n, t, l, a, o) {
  return m(), g("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Wt);
}
const je = /* @__PURE__ */ I(Mt, [["render", zt], ["__scopeId", "data-v-b45a1311"]]);
function qt(e) {
  return lt() ? (rt(e), !0) : !1;
}
function Ft(e) {
  return typeof e == "function" ? e() : U(e);
}
const Kt = typeof window < "u" && typeof document < "u";
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
    }, Ft(n));
  }
  return l && (a.value = !0, Kt && r()), qt(u), {
    isPending: at(a),
    start: r,
    stop: u
  };
}
class Ht {
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
const Gt = D({
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
      Utils: Ht,
      boneState: t,
      changeEvent: o,
      stringBone: a
    };
  }
}), Zt = ["disabled", "value", "required"];
function Jt(e, n, t, l, a, o) {
  return m(), g("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Zt);
}
const Be = /* @__PURE__ */ I(Gt, [["render", Jt], ["__scopeId", "data-v-1ccbacc0"]]), Qt = D({
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
}), Yt = ["disabled", "value"];
function Xt(e, n, t, l, a, o) {
  return m(), g("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Yt);
}
const De = /* @__PURE__ */ I(Qt, [["render", Xt], ["__scopeId", "data-v-4328e024"]]), xt = D({
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
}), en = ["disabled", "type", "value"];
function tn(e, n, t, l, a, o) {
  return m(), g("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, en);
}
const Ne = /* @__PURE__ */ I(xt, [["render", tn], ["__scopeId", "data-v-f1b8af8c"]]), nn = D({
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
}), sn = ["disabled", "value", "multiple"], an = ["value"];
function ln(e, n, t, l, a, o) {
  return m(), g("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), g(E, null, T(e.convertObjToList(), (s) => (m(), g("sl-option", {
      key: s[0],
      value: s[0]
    }, j(s[1]), 9, an))), 128))
  ], 40, sn);
}
const Ve = /* @__PURE__ */ I(nn, [["render", ln], ["__scopeId", "data-v-5a38b97f"]]), rn = D({
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
}), on = ["disabled", "checked"];
function un(e, n, t, l, a, o) {
  return m(), g("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, on);
}
const Re = /* @__PURE__ */ I(rn, [["render", un], ["__scopeId", "data-v-363598c8"]]), dn = D({
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
}), cn = ["disabled"], mn = ["name"], fn = ["name"], gn = { class: "errors" };
function hn(e, n, t, l, a, o) {
  return m(), g(E, null, [
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
      }, null, 8, mn)
    ], 42, cn), [
      [oe, e.state.value1]
    ]),
    e.boneState.readonly ? S("", !0) : Q((m(), g("sl-input", {
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
      }, null, 8, fn)
    ], 544)), [
      [oe, e.state.value2]
    ]),
    i("ul", gn, [
      (m(!0), g(E, null, T(e.state.passwordInfo, (s, u) => (m(), g("li", { key: u }, j(s), 1))), 128)),
      (m(!0), g(E, null, T(e.state.requiredPasswordInfo, (s, u) => (m(), g("li", {
        key: u,
        class: "requiredInfo"
      }, j(s), 1))), 128))
    ])
  ], 64);
}
const Le = /* @__PURE__ */ I(dn, [["render", hn], ["__scopeId", "data-v-0ccf18c0"]]), bn = D({
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
}), pn = {
  key: 0,
  open: "",
  variant: "danger"
}, vn = {
  key: 1,
  class: "form"
}, yn = ["summary", "open"];
function $n(e, n, t, l, a, o) {
  const s = ae("bone");
  return e.state.globalRegistration ? (m(), g("div", vn, [
    (m(!0), g(E, null, T(e.state.formGroups, (u, r) => Q((m(), g("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), g(E, null, T(u.bones, (d) => Q((m(), P(s, {
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
    ], 8, yn)), [
      [ve, u.groupVisible]
    ])), 128))
  ])) : (m(), g("sl-alert", pn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Ye = /* @__PURE__ */ I(bn, [["render", $n], ["__scopeId", "data-v-e6fcfbca"]]), Sn = D({
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
function _n(e, n, t, l, a, o) {
  const s = ae("Wrapper_nested");
  return m(), P(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Ue = /* @__PURE__ */ I(Sn, [["render", _n], ["__scopeId", "data-v-84a761ce"]]), kn = D({
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
}), wn = ["disabled", "value"];
function En(e, n, t, l, a, o) {
  return m(), g("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, wn);
}
const Te = /* @__PURE__ */ I(kn, [["render", En], ["__scopeId", "data-v-534b9149"]]), An = D({
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
}), In = ["disabled", "value", "min", "max", "step"], Cn = { class: "info" }, On = { key: 0 }, jn = { key: 1 }, Bn = { key: 2 };
function Dn(e, n, t, l, a, o) {
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
    }, null, 40, In),
    i("ul", Cn, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), g("li", On, j(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : S("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), g("li", jn, j(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : S("", !0),
      e.state.precision ? (m(), g("li", Bn, j(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : S("", !0)
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ I(An, [["render", Dn], ["__scopeId", "data-v-03d5b399"]]);
var V = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
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
    let d = ie.post(B.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      l && l(c.data);
    }).catch(function(c) {
      a && a(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = V.VITE_DEFAULT_RENDERER || "json") {
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
    renderer: s = V.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let c = null;
    X().state.sKeys.size === 0 && await B.getBatchSkeys(d);
    const f = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", f), X().state.sKeys.delete(f)) : (t || (t = {}), t.skey = f, X().state.sKeys.delete(f)), c = B.post(n, {
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
    let f = ie.get(B.buildUrl(n), t, s, r, u, d);
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
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
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
    renderer: r = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
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
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
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
    renderer: r = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
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
    renderer: r = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
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
const Vn = D({
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
    const t = O("boneState"), l = O("formatString"), a = w({
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
}), Rn = (e) => (z("data-v-61dd72e0"), e = e(), q(), e), Ln = { class: "record" }, Un = { class: "single-entry" }, Tn = ["value"], Pn = ["disabled", "source"], Mn = ["title"], Wn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), zn = [
  Wn
];
function qn(e, n, t, l, a, o) {
  var u, r;
  const s = ae("Wrapper_nested");
  return m(), g("div", Ln, [
    i("div", Un, [
      e.state.selection ? (m(), g("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Tn)) : (m(), g("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Pn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), g("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, zn, 8, Mn)) : S("", !0)
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
const Me = /* @__PURE__ */ I(Vn, [["render", qn], ["__scopeId", "data-v-61dd72e0"]]), Fn = D({
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
}), Kn = { class: "box" };
function Hn(e, n, t, l, a, o) {
  return m(), g("div", Kn, j(e.value), 1);
}
const Gn = /* @__PURE__ */ I(Fn, [["render", Hn], ["__scopeId", "data-v-343aca69"]]);
var We = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Zn = D({
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
      console.log(B.downloadUrlFor(e.value)), window.open(B.downloadUrlFor(e.value));
    }
    function s() {
      return B.downloadUrlFor(e.value, !1);
    }
    function u(c) {
      const f = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, p) => {
        B.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: f }).then(async (_) => {
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
            B.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
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
}), ge = (e) => (z("data-v-91086308"), e = e(), q(), e), Jn = {
  key: 0,
  class: "loader"
}, Qn = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Yn = [
  Qn
], Xn = {
  key: 1,
  class: "droparea"
}, xn = ["title"], es = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), ts = [
  es
], ns = ["multiple"], ss = ["title"], as = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), ls = [
  as
], rs = { class: "box" }, os = ["src"], is = ["label", "open"], us = ["src"], ds = {
  key: 1,
  class: "preview"
}, cs = {
  key: 0,
  name: "file-earmark"
}, ms = { key: 2 }, fs = ["title"], gs = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), hs = [
  gs
];
function bs(e, n, t, l, a, o) {
  var s, u, r, d, c, f, v, p, _, h;
  return m(), g("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = ce((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = ce((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (m(), g("div", Jn, Yn)) : S("", !0),
    e.state.droparea ? (m(), g("div", Xn, " Dateien hier hinziehen ")) : S("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), g("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, ts, 8, xn)) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, ns),
    e.value ? (m(), g("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, ls, 8, ss)) : S("", !0),
    i("div", rs, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), g("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, os),
        i("sl-dialog", {
          label: decodeURIComponent((d = (r = e.value) == null ? void 0 : r.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, us)
        ], 8, is)
      ])) : (m(), g("div", ds, [
        (f = (c = e.value) == null ? void 0 : c.dest) != null && f.name ? (m(), g("sl-icon", cs)) : S("", !0)
      ])),
      (p = (v = e.value) == null ? void 0 : v.dest) != null && p.name ? (m(), g("div", ms, j(decodeURIComponent((h = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : h.name)), 1)) : S("", !0)
    ]),
    e.boneState.multiple ? S("", !0) : (m(), g("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, hs, 8, fs))
  ], 32);
}
const ze = /* @__PURE__ */ I(Zn, [["render", bs], ["__scopeId", "data-v-91086308"]]), ps = D({
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
}), vs = ["disabled", "value"];
function ys(e, n, t, l, a, o) {
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
    }, null, 40, vs))
  ], 64)) : S("", !0);
}
const qe = /* @__PURE__ */ I(ps, [["render", ys]]), $s = D({
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
}), Ss = ["name", "min", "max", "disabled"], _s = ["name", "min", "max", "disabled"];
function ks(e, n, t, l, a, o) {
  return m(), g(E, null, [
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
    }, null, 40, Ss), [
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
    }, null, 40, _s), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const Fe = /* @__PURE__ */ I($s, [["render", ks], ["__scopeId", "data-v-7bc31020"]]), ws = D({
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
}), Xe = (e) => (z("data-v-63e75dee"), e = e(), q(), e), Es = { class: "actionbar" }, As = ["title"], Is = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Cs = [
  Is
], Os = ["title"], js = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Bs(e, n, t, l, a, o) {
  return m(), g("div", Es, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Cs, 8, As)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      js,
      C(" " + j(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), g(E, { key: 0 }, [
        C("(" + j(e.state.counter) + ")", 1)
      ], 64)) : S("", !0)
    ], 8, Os)) : S("", !0)
  ]);
}
const Ds = /* @__PURE__ */ I(ws, [["render", Bs], ["__scopeId", "data-v-63e75dee"]]);
var Ns = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Vs = D({
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
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Ns.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
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
}), xe = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), Rs = { class: "actionbar" }, Ls = ["title"], Us = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ts = [
  Us
], Ps = ["source"], Ms = ["title"], Ws = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function zs(e, n, t, l, a, o) {
  return m(), g("div", Rs, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ts, 8, Ls)) : S("", !0),
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
    }, null, 40, Ps),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ws,
      C(" " + j(e.$t("bone.list")), 1)
    ], 8, Ms)) : S("", !0)
  ]);
}
const qs = /* @__PURE__ */ I(Vs, [["render", zs], ["__scopeId", "data-v-eeea51c6"]]);
var Ke = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Fs = D({
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
        B.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: f }).then(async (_) => {
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
            B.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
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
}), Se = (e) => (z("data-v-9bac9f8a"), e = e(), q(), e), Ks = ["title"], Hs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Gs = [
  Hs
], Zs = {
  key: 1,
  class: "droparea"
}, Js = ["multiple"], Qs = ["title"], Ys = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Xs = [
  Ys
], xs = ["title"], ea = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), ta = {
  key: 0,
  slot: "suffix"
};
function na(e, n, t, l, a, o) {
  return m(), g("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = ce((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = ce((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Gs, 8, Ks)) : S("", !0),
    e.state.droparea ? (m(), g("div", Zs, " Dateien hier hinziehen ")) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Js),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Xs, 8, Qs)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      ea,
      C(" " + j(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), g("sl-spinner", ta)) : S("", !0)
    ], 8, xs)) : S("", !0)
  ], 32);
}
const sa = /* @__PURE__ */ I(Fs, [["render", na], ["__scopeId", "data-v-9bac9f8a"]]), _e = $e("boneStore", () => {
  const e = w({
    additionalBones: G({}),
    defaultBones: G({
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
      jsonBone: Gn,
      fileBone: ze,
      textBone: qe,
      spatialBone: Fe
    }),
    actionbars: G({
      "relational.tree.leaf.file.file": sa,
      "relational.": qs
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
    return Ds;
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
function aa(e) {
  return _e().getBoneActionbar(e);
}
function x(e) {
  return _e().getBoneWidget(e);
}
function la(e) {
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
    wrapperMultiple: Ot,
    BoneLabel: Rt
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
        return aa((h = t.bonestructure) == null ? void 0 : h.type);
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
    ue("boneState", t);
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
    ue("addMultipleEntry", c);
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
    ue("removeMultipleEntries", v);
    function p(h = null, b = "") {
      c(h, b);
    }
    function _(h, b) {
      function y(N) {
        let J = [], K = [], ne = /\$\((.*?)\)/g;
        for (; K; ) {
          if (K = ne.exec(N), !K) {
            K = !1;
            continue;
          }
          J.push(K[1]);
        }
        return J;
      }
      function $(N, J) {
        let K = N.split("."), ne = N.split("."), M = J;
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
        let J = h;
        for (let K of A) {
          let ne = $(K, N);
          J = J.replace("$(" + K + ")", ne);
        }
        L.push(J);
      }
      return L.join(", ");
    }
    return ue("formatString", _), ee(() => {
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
      BoneHasMultipleHandling: la,
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
const ra = (e) => (z("data-v-46c45785"), e = e(), q(), e), oa = {
  key: 0,
  class: "loading"
}, ia = /* @__PURE__ */ ra(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ua = { class: "logo" }, da = ["src"];
function ca(e, n, t, l, a, o) {
  return m(), P(ut, null, {
    default: dt(() => [
      t.active ? (m(), g("div", oa, [
        ia,
        i("div", ua, [
          i("sl-icon", { src: t.logo }, null, 8, da)
        ])
      ])) : S("", !0)
    ]),
    _: 1
  });
}
const ma = /* @__PURE__ */ I(ke, [["render", ca], ["__scopeId", "data-v-46c45785"]]), le = $e("cartstore", () => {
  const e = new ht({
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
}), fa = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), g("pre", null, j(e.node.name), 1));
  }
}, he = (e) => (z("data-v-d313b580"), e = e(), q(), e), ga = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ha = ["src"], ba = { class: "viur-shop-cart-leaf-headline headline" }, pa = { class: "viur-shop-cart-leaf-artno" }, va = ["innerHTML"], ya = { class: "viur-shop-cart-leaf-quantity" }, $a = { class: "viur-shop-cart-leaf-unitprice" }, Sa = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), _a = ["value"], ka = { class: "viur-shop-cart-leaf-actions" }, wa = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), Ea = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Aa = [
  Ea
], Ia = { class: "viur-shop-cart-leaf-price" }, Ca = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Oa = ["value"], ja = {
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
    return ee(() => {
      a.leaf = t.leaf;
    }), (r, d) => (m(), g("sl-card", ga, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, ha),
      i("h4", ba, j(a.leaf.shop_name), 1),
      i("h5", pa, j(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, va),
      i("div", ya, [
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
      i("div", $a, [
        Sa,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, _a)
      ]),
      i("div", ka, [
        wa,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[2] || (d[2] = (c) => u(a.leaf, a.leaf.article.dest.key, e.node))
        }, Aa)
      ]),
      i("div", Ia, [
        Ca,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, Oa)
      ])
    ]));
  }
}, Ba = /* @__PURE__ */ I(ja, [["__scopeId", "data-v-d313b580"]]), Da = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Na = { key: 0 }, Va = { key: 0 }, Ra = { key: 1 }, La = {
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
          Da,
          C(" " + j(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        U(n).state.basketRootNode.discount ? (m(), g("div", Na, [
          U(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), g("span", Va, " Sie haben einen Rabattcode im Wert von " + j(U(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : S("", !0),
          U(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), g("span", Ra, " Sie haben einen Rabattcode im Wert von " + j(U(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : S("", !0)
        ])) : S("", !0)
      ])
    ], 64));
  }
}, H = (e) => (z("data-v-84507113"), e = e(), q(), e), Ua = { key: 0 }, Ta = /* @__PURE__ */ H(() => /* @__PURE__ */ i("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Pa = {
  class: "footer-wrap",
  slot: "footer"
}, Ma = { class: "viur-shop-cart-node" }, Wa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("br", null, null, -1)), Fa = { class: "viur-shop-cart-sidebar-info-line" }, Ka = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Ha = { class: "viur-shop-cart-sidebar-info-line" }, Ga = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ C(" 0 € ")
], -1)), Ja = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ C(" € ")
], -1)), Qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
], -1)), Ya = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), Xa = {
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
    return ee(async () => {
      await t.init(), await c(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (f, v) => e.cartKey.length ? (m(), g(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: r
      }, [
        Ta,
        i("div", Pa, [
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
      (m(!0), g(E, null, T(a.nodes, (p) => (m(), g("div", Ma, [
        Object.keys(a.leaves).includes(p.key) ? (m(), g(E, { key: 0 }, [
          Oe(fa, { node: p }, null, 8, ["node"]),
          (m(!0), g(E, null, T(a.leaves[p.key], (_) => (m(), P(Ba, {
            key: _.key,
            leaf: _,
            node: p,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : S("", !0)
      ]))), 256)),
      Wa,
      e.sidebar ? (m(), P(Je, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), g(E, { key: 0 }, [
          za,
          qa,
          i("div", Fa, [
            Ka,
            C(" " + j(e.mode === "basket" ? U(t).state.basketRootNode.total : U(t).state.whishlistRootNodes[e.cartKey].total) + " € ", 1)
          ]),
          i("div", Ha, [
            Ga,
            C(" " + j(U(t).state.basketRootNode.total - U(t).state.basketRootNode.total_discount_price) + " € ", 1)
          ]),
          Za,
          Ja,
          Qa
        ], 64)) : S("", !0)
      ])) : S("", !0),
      Oe(La),
      Ya
    ], 64)) : (m(), g("sl-spinner", Ua));
  }
}, we = /* @__PURE__ */ I(Xa, [["__scopeId", "data-v-84507113"]]), xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), re = (e) => (z("data-v-4082d346"), e = e(), q(), e), el = {
  key: 1,
  class: "list"
}, tl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), nl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), sl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), al = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), ll = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), rl = /* @__PURE__ */ re(() => /* @__PURE__ */ i("br", null, null, -1)), ol = { class: "viur-shop-cart-sidebar-btn-wrap" }, il = ["variant", "disabled"], ul = {
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
    }), (a, o) => t.cartIsInit ? (m(), g("div", el, [
      tl,
      nl,
      sl,
      al,
      (m(), P(Je, { to: "#order_sidebar" }, [
        ll,
        rl,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", ol, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, il)
        ])
      ]))
    ])) : (m(), P(ma, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ I(ul, [["__scopeId", "data-v-4082d346"]]), dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" })), cl = (e) => (z("data-v-50f31583"), e = e(), q(), e), ml = { class: "bind viur-shop-wrap" }, fl = ["panel", "disabled"], gl = { class: "viur-shop-order-step" }, hl = ["name", "library"], bl = { class: "viur-shop-order-status-text" }, pl = { class: "viur-shop-order-status-span" }, vl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, yl = ["name"], $l = ["onClick"], Sl = ["onClick"], _l = /* @__PURE__ */ cl(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), kl = {
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
    return (c, f) => (m(), g("div", ml, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (m(!0), g(E, null, T(a.tabNames, (v, p) => {
          var _;
          return m(), g("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", gl, [
              (_ = e.tabs[v].icon) != null && _.name ? (m(), g("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, hl)) : S("", !0),
              i("div", bl, [
                C(j(p + 1) + ". ", 1),
                i("span", pl, j(e.tabs[v].displayName), 1)
              ])
            ]),
            p < a.tabNames.length - 1 ? (m(), g("sl-icon", vl)) : S("", !0)
          ], 8, fl);
        }), 128)),
        (m(!0), g(E, null, T(a.tabNames, (v, p) => (m(), g("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), P(ct(e.tabs[v].component), mt({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          p !== a.tabNames.length - 1 ? (m(), g("div", {
            key: 0,
            class: Z(["viur-shop-form-footer", { "flex-end": a.isFirstTab(p) }])
          }, [
            Q(i("sl-button", {
              type: "submit",
              onClick: (_) => r(a.tabNames[p - 1])
            }, " Zurück ", 8, $l), [
              [ve, p !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => d(a.tabNames[p + 1])
            }, " Weiter ", 8, Sl)
          ], 2)) : S("", !0)
        ], 8, yl))), 128))
      ], 544),
      _l
    ]));
  }
}, wl = /* @__PURE__ */ I(kl, [["__scopeId", "data-v-50f31583"]]), be = (e) => (z("data-v-688e20e0"), e = e(), q(), e), El = { class: "bind" }, Al = /* @__PURE__ */ be(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank für Ihre Bestellung", -1)), Il = /* @__PURE__ */ be(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
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
    return (t, l) => (m(), g("div", El, [
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
}, Nl = /* @__PURE__ */ I(Dl, [["__scopeId", "data-v-688e20e0"]]), Ae = (e) => (z("data-v-903d08d7"), e = e(), q(), e), Vl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Rl = { class: "viur-shop-form-wrap" }, Ll = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Ul = { class: "viur-shop-form-wrap" }, Tl = { key: 0 }, Pl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ml = { class: "viur-shop-form-wrap" }, Wl = {
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
    }), ee(async () => {
      await n.getAdressStructure(), t.addSkel = o(n.state.structure.address);
    }), (s, u) => {
      const r = ae("bone");
      return m(), g(E, null, [
        i("div", null, [
          Vl,
          i("div", Rl, [
            (m(!0), g(E, null, T(t.addSkel, (d, c) => (m(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (m(), g("div", {
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
                  onChange: (f) => a(c, f),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Ll,
          i("div", Ul, [
            (m(!0), g(E, null, T(t.addSkel, (d, c) => (m(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), g("div", {
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
                  onChange: (f) => a(c, f)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (m(), g("div", Tl, [
          Pl,
          i("div", Ml, [
            (m(!0), g(E, null, T(t.addSkel, (d, c) => (m(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), g("div", {
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
}, zl = /* @__PURE__ */ I(Wl, [["__scopeId", "data-v-903d08d7"]]), te = (e) => (z("data-v-489988f4"), e = e(), q(), e), ql = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Fl = { class: "viur-shop-form-wrap" }, Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Hl = ["onSlChange", "onSlClear", "label"], Gl = ["value"], Zl = { key: 0 }, Jl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ql = { class: "viur-shop-form-wrap" }, Yl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
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
    }), ee(async () => {
      await n.getAdressStructure(), t.addSkel = f(n.state.structure.address);
    }), (v, p) => {
      const _ = ae("bone");
      return m(), g(E, null, [
        i("div", null, [
          ql,
          i("div", Fl, [
            (m(!0), g(E, null, T(t.addSkel, (h, b) => (m(), g(E, { key: b }, [
              h.visible && h.params.group === "Customer Info" ? (m(), g("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + b)
              }, [
                h.visible && h.params.group === "Customer Info" ? (m(), P(_, {
                  key: 0,
                  is: U(x)(h.type),
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
        Kl,
        (m(!0), g(E, null, T(t.shippingAdressAmount, (h) => (m(), g("div", {
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
            label: t.selectedItem[h] ? U(n).state.carts[t.selectedItem[h]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), g(E, null, T(U(n).state.carts, (b, y) => (m(), g("sl-option", { value: y }, j(b.info.name), 9, Gl))), 256))
          ], 40, Hl),
          (m(!0), g(E, null, T(t.addSkel, (b, y) => (m(), g(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (m(), g("div", {
              key: 0,
              class: Z("viur-shop-form-bone-" + y)
            }, [
              b.visible && b.params.group === "Customer Address" ? (m(), P(_, {
                key: 0,
                is: U(x)(b.type),
                name: y,
                structure: f(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: ($) => u(y, $)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
            ], 2)) : S("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), g("div", Zl, [
          Jl,
          i("div", Ql, [
            (m(!0), g(E, null, T(t.addSkel, (h, b) => (m(), g(E, { key: b }, [
              h.visible && h.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: Z("viur-shop-form-bone-" + b)
              }, [
                h.visible && h.params.group === "Customer Address" ? (m(), P(_, {
                  key: 0,
                  is: U(x)(h.type),
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
          i("strong", null, j(t.amountAlert.title), 1),
          tr,
          C(" " + j(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, sr = /* @__PURE__ */ I(nr, [["__scopeId", "data-v-489988f4"]]), et = {
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
          component: G(Nl),
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
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (m(), P(wl, {
      tabs: l.tabs,
      onTabChange: a
    }, null, 8, ["tabs"]));
  }
}, ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), lr = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = bt();
    return { state: w({}), route: t };
  }
}), rr = { class: "home" };
function or(e, n, t, l, a, o) {
  return m(), g("div", rr, "View " + j(e.route.path) + " is missing.", 1);
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
    component: () => import("./CategoryView-nJDwLgRu.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-DA05bKgH.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => xa)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => ar)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => dl)
  }
];
function pr(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(ur), pt({
    // @ts-ignore
    history: vt("/"),
    routes: t
  });
}
const dr = ft(), vr = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", et), e.component("ConfirmView", Ee), e.component("OrderView"), e.use(dr);
  }
};
export {
  we as C,
  wl as O,
  sr as U,
  vr as V,
  I as _,
  et as a,
  Ee as b,
  pr as c,
  Nl as d,
  zl as e,
  le as u
};
