var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => st(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as D, inject as O, reactive as w, openBlock as c, createElementBlock as h, normalizeClass as G, createElementVNode as i, renderSlot as Ze, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as _, toDisplayString as B, onMounted as R, ref as F, readonly as at, getCurrentScope as rt, onScopeDispose as lt, unref as T, computed as k, watchEffect as ce, renderList as U, watch as se, withDirectives as J, vModelText as le, getCurrentInstance as ot, resolveComponent as ae, createBlock as P, vShow as be, withModifiers as de, createTextVNode as C, shallowRef as H, provide as ie, onBeforeMount as Q, useCssVars as it, Transition as ut, withCtx as dt, createVNode as ve, Teleport as ct, resolveDynamicComponent as mt, mergeProps as ft } from "vue";
import { defineStore as ye, createPinia as gt } from "pinia";
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
  for (const [r, a] of n)
    t[r] = a;
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
function Ot(e, n, t, r, a, o) {
  return c(), h("div", {
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
function Rt(e, n, t, r, a, o) {
  return c(), h(E, null, [
    i("label", Dt, [
      Ze(e.$slots, "default", {}, void 0, !0),
      _("", !0)
    ]),
    e.state.debug ? (c(), h("div", Nt, [
      i("div", Vt, B(e.name), 1),
      i("pre", null, "    " + B(e.boneState) + `
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
    const t = O("boneState"), r = w({});
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
}), Tt = ["disabled", "value"], Pt = ["disabled", "value"];
function Mt(e, n, t, r, a, o) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (c(), h("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Tt)) : (c(), h("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...l) => e.changeEvent && e.changeEvent(...l))
  }, null, 40, Pt));
}
const pe = /* @__PURE__ */ I(Ut, [["render", Mt], ["__scopeId", "data-v-0ebe5f0b"]]), Wt = D({
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
}), zt = ["value"];
function qt(e, n, t, r, a, o) {
  return c(), h("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, zt);
}
const je = /* @__PURE__ */ I(Wt, [["render", qt], ["__scopeId", "data-v-b45a1311"]]);
function Ft(e) {
  return rt() ? (lt(e), !0) : !1;
}
function Kt(e) {
  return typeof e == "function" ? e() : T(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
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
    }, Kt(n));
  }
  return r && (a.value = !0, Ht && l()), Ft(u), {
    isPending: at(a),
    start: l,
    stop: u
  };
}
class Gt {
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
        let d = l.split("."), f = s;
        for (let m of d)
          f && f !== "-" && m in f && f[m] ? f = f[m] : f = "-";
        f = this.unescape(f), u = u.replace("$(" + l + ")", f);
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
    const t = O("boneState"), r = w({
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
      state: r,
      Utils: Gt,
      boneState: t,
      changeEvent: o,
      stringBone: a
    };
  }
}), Jt = ["disabled", "value", "required"];
function Qt(e, n, t, r, a, o) {
  return c(), h("sl-input", {
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
    const t = O("boneState"), r = w({}), a = F(null);
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
      state: r,
      boneState: t,
      changeEvent: o,
      emailBone: a
    };
  }
}), Xt = ["disabled", "value"];
function xt(e, n, t, r, a, o) {
  return c(), h("sl-input", {
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
    const t = O("boneState"), r = w({
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
}), tn = ["disabled", "type", "value"];
function nn(e, n, t, r, a, o) {
  return c(), h("sl-input", {
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
    const t = O("boneState"), r = w({
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
}), an = ["disabled", "value", "multiple"], rn = ["value"];
function ln(e, n, t, r, a, o) {
  return c(), h("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (c(!0), h(E, null, U(e.convertObjToList(), (s) => (c(), h("sl-option", {
      key: s[0],
      value: s[0]
    }, B(s[1]), 9, rn))), 128))
  ], 40, an);
}
const Ve = /* @__PURE__ */ I(sn, [["render", ln], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
    const t = O("boneState"), r = w({
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
}), un = ["disabled", "checked"];
function dn(e, n, t, r, a, o) {
  return c(), h("sl-switch", {
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
    const t = O("boneState"), r = w({
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
    return ce(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: u } = me(() => {
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
}), mn = ["disabled"], fn = ["name"], gn = ["name"], hn = { class: "errors" };
function bn(e, n, t, r, a, o) {
  return c(), h(E, null, [
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
      [le, e.state.value1]
    ]),
    e.boneState.readonly ? _("", !0) : J((c(), h("sl-input", {
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
      [le, e.state.value2]
    ]),
    i("ul", hn, [
      (c(!0), h(E, null, U(e.state.passwordInfo, (s, u) => (c(), h("li", { key: u }, B(s), 1))), 128)),
      (c(!0), h(E, null, U(e.state.requiredPasswordInfo, (s, u) => (c(), h("li", {
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
    const t = O("boneState"), r = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, f;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [m, v] of Object.entries(r.structure)) {
          let p = "default", $ = r.structure[m], g = (d = r.value) == null ? void 0 : d[m];
          (f = v == null ? void 0 : v.params) != null && f.category && (p = v.params.category.toLowerCase()), Object.keys(u).includes(p) ? u[p].bones.push({
            boneName: m,
            boneStructure: $,
            boneValue: g
          }) : u[p] = {
            name: v.params.category,
            bones: [
              {
                boneName: m,
                boneStructure: $,
                boneValue: g
              }
            ]
          }, $.visible === !0 && (u[p].groupVisible = !0);
        }
        let l = {};
        return Object.keys(u).sort().forEach(function(m) {
          l[m] = u[m];
        }), l;
      })
    });
    function a(u) {
      n.emit("change", u);
    }
    R(() => {
      ot().appContext.components.Bone ? r.globalRegistration = !0 : r.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
}), vn = {
  key: 0,
  open: "",
  variant: "danger"
}, yn = {
  key: 1,
  class: "form"
}, $n = ["summary", "open"];
function Sn(e, n, t, r, a, o) {
  const s = ae("bone");
  return e.state.globalRegistration ? (c(), h("div", yn, [
    (c(!0), h(E, null, U(e.state.formGroups, (u, l) => J((c(), h("sl-details", {
      key: l,
      summary: u.name,
      open: u.groupOpen
    }, [
      (c(!0), h(E, null, U(u.bones, (d) => J((c(), P(s, {
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
    ], 8, $n)), [
      [be, u.groupVisible]
    ])), 128))
  ])) : (c(), h("sl-alert", vn, " In Order to use this Bone register the bone component globally in your main file "));
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
    const t = O("boneState"), r = w({
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
function kn(e, n, t, r, a, o) {
  const s = ae("Wrapper_nested");
  return c(), P(s, {
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
    const t = O("boneState"), r = w({});
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
}), En = ["disabled", "value"];
function An(e, n, t, r, a, o) {
  return c(), h("sl-color-picker", {
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
    const t = O("boneState"), r = w({
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
      state: r,
      boneState: t,
      changeEvent: o,
      numericBone: a
    };
  }
}), Cn = ["disabled", "value", "min", "max", "step"], On = { class: "info" }, jn = { key: 0 }, Bn = { key: 1 }, Dn = { key: 2 };
function Nn(e, n, t, r, a, o) {
  return c(), h(E, null, [
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
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (c(), h("li", jn, B(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : _("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (c(), h("li", Bn, B(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : _("", !0),
      e.state.precision ? (c(), h("li", Dn, B(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : _("", !0)
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ I(In, [["render", Nn], ["__scopeId", "data-v-03d5b399"]]);
var V = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class ue extends Error {
  constructor(n, t, r, a) {
    super(r || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
  }
}
let he = null;
function X() {
  return he || (he = ye("requestStore", () => {
    const e = w({ sKeys: /* @__PURE__ */ new Set() });
    function n() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: n
    };
  })), he();
}
class j {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = (V.VITE_API_URL ? V.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: r = null, failedCallback: a = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
    function l() {
      if (t instanceof FormData)
        return t;
      const f = new FormData();
      for (const m in t)
        if (Array.isArray(t[m]))
          for (let v of t[m])
            f.append(m, v);
        else
          f.append(m, t[m]);
      return f;
    }
    let d = oe.post(j.buildUrl(n), l(), null, s, o, u);
    return d.then(function(f) {
      r && r(f.data);
    }).catch(function(f) {
      a && a(f);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = V.VITE_DEFAULT_RENDERER || "json") {
    await j.get(`/${t}/skey`, {
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
    renderer: s = V.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: l = null,
    amount: d = 30
  } = {}) {
    let f = null;
    X().state.sKeys.size === 0 && await j.getBatchSkeys(d);
    const m = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", m), X().state.sKeys.delete(m)) : (t || (t = {}), t.skey = m, X().state.sKeys.delete(m)), f = j.post(n, {
      dataObj: t,
      callback: r,
      abortController: o,
      headers: u,
      mode: l
    }), f;
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
    cacheTime: f = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let m = oe.get(j.buildUrl(n), t, s, l, u, d);
    return m.then(function(v) {
      r && r(v.data);
    }).catch(function(v) {
      a && a(v);
    }), m;
  }
  static list(n, {
    dataObj: t = null,
    callback: r = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let l = `/${u}/${n}/list`;
    return o && (l += `/${o}`), j.get(l, {
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
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let l = `/${u}/getStructure/${n}`;
    return o && (l += `/${o}`), j.get(l, {
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
    renderer: l = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${l}/${n}/view/${t}`;
    return s && (d = `/${l}/${n}/view/${s}/${t}`), j.get(d, {
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
    renderer: u = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let l = `/${u}/${n}/add`;
    return o && (l = `/${u}/${n}/add/${o}`), j.securePost(l, {
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
    renderer: l = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${l}/${n}/edit/${t}`;
    return s && (d = `/${l}/${n}/edit/${s}/${t}`), j.securePost(d, {
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
    renderer: l = (V == null ? void 0 : V.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${l}/${n}/delete/${t}`;
    return s && (d = `/${l}/${n}/delete/${s}/${t}`), j.securePost(d, {
      dataObj: r,
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
    const r = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((a, o) => {
      j.securePost("/vi/file/getUploadURL", { dataObj: r }).then(async (s) => {
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
          j.securePost("/vi/file/add", { dataObj: d }).then(async (f) => {
            let m = await f.json();
            m.action === "addSuccess" ? a(m.values) : o(m);
          }).catch((f) => {
            o(f);
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
      let f = new URL(l);
      if (d && Object.keys(d).length > 0) {
        const m = new URLSearchParams();
        for (const [v, p] of Object.entries(d))
          if (Array.isArray(p))
            for (const $ of p)
              m.append(v, $);
          else
            m.append(v, p);
        f.search = m.toString();
      }
      return f.toString();
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
        const f = `503 ${l.message}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(503, l.message, f, l));
      }
      if (l instanceof DOMException && l.name == "AbortError") {
        const f = `${l.code} ${l.name}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(l.code, l.name, f, { url: n }));
      }
      const d = `${l.statusCode} ${l.statusText}: ${l.headers ? l.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ue(l.statusCode, l.statusText, d, l.response));
    });
  }
  static post(n, t = null, r = null, a = null, o = null, s = null) {
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
    const t = O("boneState"), r = O("formatString"), a = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(l) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), j.get(
        `/${Vn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (f) => {
        var v;
        const m = await f.json();
        a.skellistdata = {};
        for (let p of m.skellist)
          a.skellistdata[p.key] = p;
        return (v = m.skellist) == null ? void 0 : v.map((p) => ({ text: r(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
      });
    }
    function s(l) {
      a.selection = { dest: a.skellistdata[l.detail.item.value] }, n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function u(l) {
      var f;
      a.selection || (a.selection = {}), (f = a.selection.rel) != null && f[l.name] || (a.selection.rel ? a.selection.rel[l.name] = null : a.selection.rel = { [l.name]: null });
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
}), Ln = (e) => (z("data-v-61dd72e0"), e = e(), q(), e), Un = { class: "record" }, Tn = { class: "single-entry" }, Pn = ["value"], Mn = ["disabled", "source"], Wn = ["title"], zn = /* @__PURE__ */ Ln(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), qn = [
  zn
];
function Fn(e, n, t, r, a, o) {
  var u, l;
  const s = ae("Wrapper_nested");
  return c(), h("div", Un, [
    i("div", Tn, [
      e.state.selection ? (c(), h("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Pn)) : (c(), h("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Mn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (c(), h("sl-button", {
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
    (u = e.boneState) != null && u.bonestructure.using ? (c(), P(s, {
      key: 0,
      value: (l = e.value) == null ? void 0 : l.rel,
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
    const t = O("boneState"), r = w({});
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
}), Hn = { class: "box" };
function Gn(e, n, t, r, a, o) {
  return c(), h("div", Hn, B(e.value), 1);
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
    const t = O("boneState"), r = F(), a = w({
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
    function u(f) {
      const m = {
        fileName: f.name,
        mimeType: f.type || "application/octet-stream",
        size: f.size.toString()
      };
      return new Promise((v, p) => {
        j.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: m }).then(async ($) => {
          let g = await $.json();
          fetch(g.values.uploadUrl, {
            body: f,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${We.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let A = await S.json();
              A.action === "addSuccess" ? v(A.values) : p(A);
            }).catch((S) => {
              p(S);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch(($) => {
          p($);
        });
      });
    }
    async function l(f) {
      a.loading = !0;
      for (let m of f.target.files) {
        let v = await u(m);
        r.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function d(f) {
      a.loading = !0, a.droparea = !1;
      for (let m of f.dataTransfer.files) {
        let v = await u(m);
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
], ss = ["multiple"], as = ["title"], rs = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), ls = [
  rs
], os = { class: "box" }, is = ["src"], us = ["label", "open"], ds = ["src"], cs = {
  key: 1,
  class: "preview"
}, ms = {
  key: 0,
  name: "file-earmark"
}, fs = { key: 2 }, gs = ["title"], hs = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), bs = [
  hs
];
function ps(e, n, t, r, a, o) {
  var s, u, l, d, f, m, v, p, $, g;
  return c(), h("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (c(), h("div", Qn, Xn)) : _("", !0),
    e.state.droparea ? (c(), h("div", xn, " Dateien hier hinziehen ")) : _("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (c(), h("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, ns, 8, es)) : _("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, ss),
    e.value ? (c(), h("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, ls, 8, as)) : _("", !0),
    i("div", os, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (c(), h("div", {
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
          label: decodeURIComponent((d = (l = e.value) == null ? void 0 : l.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, ds)
        ], 8, us)
      ])) : (c(), h("div", cs, [
        (m = (f = e.value) == null ? void 0 : f.dest) != null && m.name ? (c(), h("sl-icon", ms)) : _("", !0)
      ])),
      (p = (v = e.value) == null ? void 0 : v.dest) != null && p.name ? (c(), h("div", fs, B(decodeURIComponent((g = ($ = e.value) == null ? void 0 : $.dest) == null ? void 0 : g.name)), 1)) : _("", !0)
    ]),
    e.boneState.multiple ? _("", !0) : (c(), h("sl-button", {
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
    const t = O("boneState"), r = w({
      value: "",
      editorConfig: {},
      editor: k(() => Oe)
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
      ClassicEditor: Oe,
      boneState: t,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: o
    };
  }
}), ys = ["disabled", "value"];
function $s(e, n, t, r, a, o) {
  var u, l, d, f;
  const s = ae("ckeditor");
  return e.state.editor ? (c(), h(E, { key: 0 }, [
    (u = e.boneState.bonestructure) != null && u.valid_html || (l = e.boneState.bonestructure) != null && l.validHtml ? (c(), P(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (m) => e.state.value = m),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (c(), h("sl-textarea", {
      key: 1,
      disabled: (f = e.boneState) == null ? void 0 : f.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...m) => e.changeEventTextarea && e.changeEventTextarea(...m))
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
    const t = O("boneState"), r = w({
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
}), _s = ["name", "min", "max", "disabled"], ks = ["name", "min", "max", "disabled"];
function ws(e, n, t, r, a, o) {
  return c(), h(E, null, [
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
    }, null, 40, ks), [
      [le, e.state.valueLng]
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
    const t = O("boneState"), r = w({
      counter: 0,
      debounce: null
    }), a = O("addMultipleEntry"), o = O("removeMultipleEntries");
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
}), Ye = (e) => (z("data-v-63e75dee"), e = e(), q(), e), As = { class: "actionbar" }, Is = ["title"], Cs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Os = [
  Cs
], js = ["title"], Bs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ds(e, n, t, r, a, o) {
  return c(), h("div", As, [
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Os, 8, Is)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Bs,
      C(" " + B(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (c(), h(E, { key: 0 }, [
        C("(" + B(e.state.counter) + ")", 1)
      ], 64)) : _("", !0)
    ], 8, js)) : _("", !0)
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
    const t = O("boneState"), r = O("addMultipleEntry"), a = O("formatString"), o = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(l) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), j.get(
        `/${Vs.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (f) => {
        var v;
        const m = await f.json();
        return s.skels = m.skellist.reduce((p, $) => (p[$.key] = $, p), {}), (v = m.skellist) == null ? void 0 : v.map((p) => ({ text: a(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
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
}), Xe = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), Ls = { class: "actionbar" }, Us = ["title"], Ts = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ps = [
  Ts
], Ms = ["source"], Ws = ["title"], zs = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function qs(e, n, t, r, a, o) {
  return c(), h("div", Ls, [
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
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
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      zs,
      C(" " + B(e.$t("bone.list")), 1)
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
    const t = O("boneState"), r = O("addMultipleEntry");
    O("formatString");
    const a = null, o = F(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(f) {
      const m = {
        fileName: f.name,
        mimeType: f.type || "application/octet-stream",
        size: f.size.toString()
      };
      return new Promise((v, p) => {
        j.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: m }).then(async ($) => {
          let g = await $.json();
          fetch(g.values.uploadUrl, {
            body: f,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${Ke.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let A = await S.json();
              A.action === "addSuccess" ? v(A.values) : p(A);
            }).catch((S) => {
              p(S);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch(($) => {
          p($);
        });
      });
    }
    async function l(f) {
      s.loading = !0;
      for (let m of f.target.files) {
        let v = await u(m);
        o.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), r(e.lang, { dest: v, rel: p });
      }
      s.loading = !1;
    }
    async function d(f) {
      s.loading = !0, s.droparea = !1;
      for (let m of f.dataTransfer.files) {
        let v = await u(m);
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
}), $e = (e) => (z("data-v-9bac9f8a"), e = e(), q(), e), Hs = ["title"], Gs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Zs = [
  Gs
], Js = {
  key: 1,
  class: "droparea"
}, Qs = ["multiple"], Ys = ["title"], Xs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), xs = [
  Xs
], ea = ["title"], ta = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), na = {
  key: 0,
  slot: "suffix"
};
function sa(e, n, t, r, a, o) {
  return c(), h("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = de((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = de((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Zs, 8, Hs)) : _("", !0),
    e.state.droparea ? (c(), h("div", Js, " Dateien hier hinziehen ")) : _("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Qs),
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, xs, 8, Ys)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (c(), h("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      ta,
      C(" " + B(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (c(), h("sl-spinner", na)) : _("", !0)
    ], 8, ea)) : _("", !0)
  ], 32);
}
const aa = /* @__PURE__ */ I(Ks, [["render", sa], ["__scopeId", "data-v-9bac9f8a"]]), Se = ye("boneStore", () => {
  const e = w({
    additionalBones: H({}),
    defaultBones: H({
      rawBone: pe,
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
        l.sort((d, f) => f.length - d.length);
        for (let d of l)
          if (s.startsWith(d[0]))
            return e.additionalBones[d[0]];
      }
    }
    return s === "date" ? Ne : s === "key" ? je : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? Be : s === "select" || s.startsWith("select.") ? Ve : s === "bool" ? Re : s === "password" ? Le : s === "record" ? Ue : s === "numeric" || s.startsWith("numeric.") ? Pe : s === "relational.tree.leaf.file.file" ? ze : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Te : s === "text" ? qe : s === "spatial" ? Fe : pe;
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
        l.sort((d, f) => f.length - d.length);
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
function ra(e) {
  return Se().getBoneActionbar(e);
}
function x(e) {
  return Se().getBoneWidget(e);
}
function la(e) {
  const n = Se();
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
    wrapperMultiple: jt,
    BoneLabel: Lt
  },
  props: {
    is: {
      type: Object,
      default: pe
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
        return ra((g = t.bonestructure) == null ? void 0 : g.type);
      }),
      isEmpty: k(() => {
        function g(b) {
          for (const [y, S] of Object.entries(b))
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
        for (let b of e.errors)
          b.fieldPath[0] === e.name && (b.severity > 2 || t.required && (b.severity === 2 || b.severity === 0)) && g.push(b.errorMessage);
        return g;
      })
    });
    ie("boneState", t);
    function r(g, b, y) {
      s(b, g, "isDragging"), s(b, g, "dragStartIndex");
    }
    function a(g, b, y) {
      y.preventDefault();
      const S = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      S < A.offsetHeight / 2 ? (s(b, g, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = g) : (s(b, g, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = g + 1);
      let L = b ? t.bonevalue[b] : t.bonevalue;
      t.dropIndex.index > L.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(g, b, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (b ? (S = t.bonevalue[b].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[b].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: b,
        index: g
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(g, b, y) {
      t[y].lang = g || null, t[y].index = b;
    }
    function u(...g) {
      g.forEach((b) => {
        t[b] = {
          lang: null,
          index: Number
        };
      });
    }
    function l(g, b, y = null, S = null, A) {
      if (b === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = b : t.bonevalue[y] = b) : S !== null ? t.bonevalue[S] = b : A === !1 || (t.bonevalue = b), t.readonly)) return !1;
      let L = {
        name: g,
        value: d(),
        lang: y,
        index: S
      }, N = {
        name: g,
        value: b,
        lang: y,
        index: S
      };
      A != null && (L.pwMatch = A, N.pwMatch = A), n.emit("change", L), n.emit("change-internal", N);
    }
    function d() {
      function g(y, S = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [S + ".lat"]: y[0] }), A.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((L) => L === Object(L)).length > 0)
            for (const [L, N] of y.entries())
              N.rel !== null ? A.push(g(N, S + "." + L)) : A.push(g(N, S));
          else
            for (const [L, N] of y.entries())
              A.push(g(N, S));
        else if (y === Object(y))
          for (const [L, N] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && L === "key" ? (/\.[0-9]*\.dest$/.test(S) ? A.push(g(N, S.replace(/\.[0-9]*\.dest/, ""))) : A.push(g(N, S.replace(/\.dest/, ""))), A.push(g(N, S.replace(/\.dest/, "") + "." + L))) : S.endsWith(".rel") && A.push(g(N, S.replace(/\.rel/, "") + "." + L)) : A.push(g(N, S + "." + L)) : A.push(g(N, L));
        else
          y == null && (y = ""), S !== null && A.push({ [S]: y });
        return A;
      }
      let b = g(t.bonevalue, e.name);
      return b = b.flat(10), b;
    }
    function f(g = null, b = "") {
      g ? Object.keys(t.bonevalue).includes(g) ? t.bonevalue[g].push(b) : t.bonevalue[g] = [b] : t.bonevalue ? t.bonevalue.push(b) : t.bonevalue = [b];
    }
    ie("addMultipleEntry", f);
    function m(g, b = null) {
      var y;
      b ? (y = t.bonevalue) == null || y[b].splice(g, 1) : t.bonevalue.splice(g, 1), n.emit("change", {
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
      f(g, b);
    }
    function $(g, b) {
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
      function S(N, Z) {
        let K = N.split("."), ne = N.split("."), M = Z;
        for (let Y of K)
          if (ne.shift(), M && M !== "-" && Object.keys(M).includes(Y) && M[Y])
            if (Array.isArray(M[Y])) {
              let Ie = [];
              for (let tt of M[Y])
                Ie.push(S(ne.join("."), tt));
              M = Ie.join(", ");
            } else
              M = M[Y];
          else (!M || typeof M[Y] == "object" && !M[Y]) && (M = "-");
        return M;
      }
      let A = y(g), L = [];
      Array.isArray(b) || (b = [b]);
      for (let N of b) {
        let Z = g;
        for (let K of A) {
          let ne = S(K, N);
          Z = Z.replace("$(" + K + ")", ne);
        }
        L.push(Z);
      }
      return L.join(", ");
    }
    return ie("formatString", $), Q(() => {
      var g;
      e.value ? t.bonevalue = e.value : t.bonevalue = (g = e.skel) == null ? void 0 : g[e.name];
    }), se(
      () => e.skel,
      (g, b) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
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
      addMultipleEntry: f,
      removeMultipleEntry: m,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: la,
      multipleBonePressEnter: p,
      handleDragStart: r,
      handleDragOver: a,
      handleDrop: o,
      setStateProperties: s,
      resetStateProperties: u
    };
  }
});
const _e = {
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
}, Ge = _e.setup;
_e.setup = Ge ? (e, n) => (He(), Ge(e, n)) : He;
const oa = (e) => (z("data-v-46c45785"), e = e(), q(), e), ia = {
  key: 0,
  class: "loading"
}, ua = /* @__PURE__ */ oa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), da = { class: "logo" }, ca = ["src"];
function ma(e, n, t, r, a, o) {
  return c(), P(ut, null, {
    default: dt(() => [
      t.active ? (c(), h("div", ia, [
        ua,
        i("div", da, [
          i("sl-icon", { src: t.logo }, null, 8, ca)
        ])
      ])) : _("", !0)
    ]),
    _: 1
  });
}
const fa = /* @__PURE__ */ I(_e, [["render", ma], ["__scopeId", "data-v-46c45785"]]), ee = ye("cartstore", () => {
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
  async function r(m) {
    return await e.cart_list({ cart_key: m });
  }
  async function a() {
    (await e.cart_list()).forEach((v) => {
      v.is_root_node && (v.cart_type === "basket" ? n.basketRootNode = v : n.whishlistRootNodes.push(v));
    });
  }
  async function o(m, v) {
    let p = await e.article_add({
      article_key: m,
      parent_cart_key: v
    });
    console.log("addToCart", p);
  }
  async function s(m, v) {
    let p = await e.article_view({
      article_key: m,
      parent_cart_key: v
    });
    console.log("getArticleView", p);
  }
  async function u(m, v) {
    let p = await e.article_remove({
      article_key: m,
      parent_cart_key: v
    });
    console.log("remove Resp", p);
  }
  async function l(m, v, p) {
    let $ = await e.article_update({
      article_key: m,
      parent_cart_key: v,
      quantity: p,
      quantity_mode: "replace"
    });
    console.log("update Resp", $);
  }
  async function d() {
    let m = await e.address_structure();
    n.structure.address = m.addSkel, console.log("adress add", n.structure.address);
  }
  async function f(m) {
    await e.discount_add({ code: m, discount_key: void 0 });
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: s,
    removeItem: u,
    updateItem: l,
    init: t,
    getAdressStructure: d,
    getChildren: r,
    addDiscount: f
  };
}), ga = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (c(), h("pre", null, B(e.node.name), 1));
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
    const t = e, r = n, a = w({
      leaf: {}
    });
    function o(l) {
      return l !== void 0 ? ht.downloadUrlFor(l) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(l, d, f, m) {
      r("updateItem", {
        item: l,
        articleKey: d,
        node: f,
        quantity: m
      });
    }
    function u(l, d, f) {
      r("removeItem", { item: l, articleKey: d, node: f });
    }
    return Q(() => {
      a.leaf = t.leaf;
    }), (l, d) => (c(), h("sl-card", ha, [
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
          "onUpdate:modelValue": d[0] || (d[0] = (f) => a.leaf.quantity = f),
          onInput: d[1] || (d[1] = (f) => s(
            a.leaf,
            a.leaf.article.dest.key,
            e.node,
            a.leaf.quantity
          ))
        }, null, 544), [
          [le, a.leaf.quantity]
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
          onClick: d[2] || (d[2] = (f) => u(a.leaf, a.leaf.article.dest.key, e.node))
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
}, Da = /* @__PURE__ */ I(Ba, [["__scopeId", "data-v-d313b580"]]), xe = (e) => (z("data-v-6f8e6e8f"), e = e(), q(), e), Na = { key: 0 }, Va = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Ra = {
  class: "footer-wrap",
  slot: "footer"
}, La = { class: "viur-shop-cart-node" }, Ua = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), Ta = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
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
    async function s(m) {
      console.log("updateItem :", m), m.quantity === 0 ? (r.value.show(), a.currentItem = m.item, a.currentNode = m.node) : (await t.updateItem(m.articleKey, m.node.key, m.quantity), await t.init());
    }
    function u(m) {
      console.log("removeItem :", m), r.value.show(), a.currentItem = m.item, a.currentNode = m.node;
    }
    async function l() {
      a.leaves[a.currentNode.key].forEach((m) => {
        m.key === a.currentItem.key && (m.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function d() {
      a.nodes = [], a.leaves = {}, await t.init(), await f();
    }
    async function f(m = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", m);
      const v = await t.getChildren(m);
      console.log("getChildren children: ", v), v.forEach(async (p) => {
        p.skel_type === "node" ? (a.nodes.push(p), await f(p.key)) : (Object.keys(a.leaves).includes(m) || (a.leaves[m] = []), a.leaves[m].push(p));
      });
    }
    return Q(async () => {
      await t.init(), await f(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (m, v) => e.cartKey.length ? (c(), h(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: r,
        onSlHide: l
      }, [
        Va,
        i("div", Ra, [
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
      (c(!0), h(E, null, U(a.nodes, (p) => (c(), h("div", La, [
        Object.keys(a.leaves).includes(p.key) ? (c(), h(E, { key: 0 }, [
          ve(ga, { node: p }, null, 8, ["node"]),
          (c(!0), h(E, null, U(a.leaves[p.key], ($) => (c(), P(Da, {
            key: $.key,
            leaf: $,
            node: p,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : _("", !0)
      ]))), 256)),
      Ua
    ], 64)) : (c(), h("sl-spinner", Na));
  }
}, ke = /* @__PURE__ */ I(Ta, [["__scopeId", "data-v-6f8e6e8f"]]), Pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" })), re = (e) => (z("data-v-4082d346"), e = e(), q(), e), Ma = {
  key: 1,
  class: "list"
}, Wa = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), za = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), qa = /* @__PURE__ */ re(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), Fa = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), Ka = /* @__PURE__ */ re(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Ha = /* @__PURE__ */ re(() => /* @__PURE__ */ i("br", null, null, -1)), Ga = { class: "viur-shop-cart-sidebar-btn-wrap" }, Za = ["variant", "disabled"], Ja = {
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
    return Q(async () => {
      await n.init();
    }), (a, o) => t.cartIsInit ? (c(), h("div", Ma, [
      Wa,
      za,
      qa,
      Fa,
      (c(), P(ct, { to: "#order_sidebar" }, [
        Ka,
        Ha,
        i("sl-checkbox", { onSlChange: r }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", Ga, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Za)
        ])
      ]))
    ])) : (c(), P(fa, { key: 0 }));
  }
}, we = /* @__PURE__ */ I(Ja, [["__scopeId", "data-v-4082d346"]]), Qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), Ya = { class: "viur-shop-discount" }, Xa = { class: "viur-shop-discount-alert" }, xa = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), er = { key: 0 }, tr = { key: 0 }, nr = { key: 1 }, sr = {
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
    return (s, u) => (c(), h(E, null, [
      i("div", Ya, [
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
      i("div", Xa, [
        i("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: r,
          closable: "",
          duration: "2000"
        }, [
          xa,
          C(" " + B(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        T(n).state.basketRootNode.discount ? (c(), h("div", er, [
          T(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (c(), h("span", tr, " Sie haben einen Rabattcode im Wert von " + B(T(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : _("", !0),
          T(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (c(), h("span", nr, " Sie haben einen Rabattcode im Wert von " + B(T(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : _("", !0)
        ])) : _("", !0)
      ])
    ], 64));
  }
}, ar = { class: "viur-shop-sidebar" }, rr = /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Zusammenfassung", -1), lr = /* @__PURE__ */ i("br", null, null, -1), or = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Zwischensumme"),
  /* @__PURE__ */ C(" 999.99 € ")
], -1), ir = { class: "viur-shop-cart-sidebar-info-line" }, ur = /* @__PURE__ */ i("span", null, "Rabatt", -1), dr = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ C(" 0 € ")
], -1), cr = /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ C(" € ")
], -1), mr = { class: "viur-shop-cart-sidebar-btn-wrap" }, fr = { class: "viur-shop-discount-wrap" }, gr = /* @__PURE__ */ i("sl-button", {
  variant: "primary",
  size: "medium"
}, " Jetzt Bestellen ", -1), hr = /* @__PURE__ */ i("sl-button", {
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
    return Q(() => {
      n.init();
    }), (t, r) => (c(), h("div", ar, [
      rr,
      lr,
      or,
      i("div", ir, [
        ur,
        C(" " + B(T(n).state.basketRootNode.total - T(n).state.basketRootNode.total_discount_price) + " € ", 1)
      ]),
      dr,
      cr,
      i("div", mr, [
        i("div", fr, [
          ve(sr)
        ]),
        gr,
        hr
      ])
    ]));
  }
}, pr = (e) => (z("data-v-d92aa645"), e = e(), q(), e), vr = { class: "bind viur-shop-wrap" }, yr = ["panel", "disabled"], $r = { class: "viur-shop-order-step" }, Sr = ["name", "library"], _r = { class: "viur-shop-order-status-text" }, kr = { class: "viur-shop-order-status-span" }, wr = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Er = ["name"], Ar = {
  key: 0,
  class: "sidebar"
}, Ir = ["onClick"], Cr = ["onClick"], Or = /* @__PURE__ */ pr(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), jr = {
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
      isFirstTab: (m) => m === 0
    }), o = F(null);
    function s(m) {
      let v = [], p = [];
      for (const $ in m)
        m[$].position ? v.push([$, m[$].position]) : v.push([$, 0]);
      return v.sort(($, g) => $[1] - g[1]), v.forEach(($) => {
        p.push($[0]);
      }), p;
    }
    function u(m) {
      r("tabChange", m);
    }
    function l(m) {
      o.value.show(m);
    }
    function d(m) {
      o.value.show(m);
    }
    function f() {
      o.value.show(a.tabNames[0]);
    }
    return (m, v) => (c(), h("div", vr, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (c(!0), h(E, null, U(a.tabNames, (p, $) => {
          var g;
          return c(), h("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: p,
            key: p,
            disabled: e.tabs[p].disabled
          }, [
            i("div", $r, [
              (g = e.tabs[p].icon) != null && g.name ? (c(), h("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[p].icon.name,
                library: e.tabs[p].icon.library
              }, null, 8, Sr)) : _("", !0),
              i("div", _r, [
                C(B($ + 1) + ". ", 1),
                i("span", kr, B(e.tabs[p].displayName), 1)
              ])
            ]),
            $ < a.tabNames.length - 1 ? (c(), h("sl-icon", wr)) : _("", !0)
          ], 8, yr);
        }), 128)),
        (c(!0), h(E, null, U(a.tabNames, (p, $) => (c(), h("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: p,
          key: p
        }, [
          (c(), P(mt(e.tabs[p].component), ft({ ref_for: !0 }, e.tabs[p].props ? e.tabs[p].props : "", {
            onGoToStart: v[0] || (v[0] = (g) => f())
          }), null, 16)),
          e.sidebar && $ !== a.tabNames.length - 1 ? (c(), h("div", Ar, [
            ve(br)
          ])) : _("", !0),
          $ !== a.tabNames.length - 1 ? (c(), h("div", {
            key: 1,
            class: G(["viur-shop-form-footer", { "flex-end": a.isFirstTab($) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (g) => l(a.tabNames[$ - 1])
            }, " Zurück ", 8, Ir), [
              [be, $ !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (g) => d(a.tabNames[$ + 1])
            }, " Weiter ", 8, Cr)
          ], 2)) : _("", !0)
        ], 8, Er))), 128))
      ], 544),
      Or
    ]));
  }
}, Br = /* @__PURE__ */ I(jr, [["__scopeId", "data-v-d92aa645"]]), Ee = (e) => (z("data-v-600ed569"), e = e(), q(), e), Dr = { class: "bind" }, Nr = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank für Ihre Bestellung", -1)), Vr = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ C(" 123345670 ")
], -1)), Rr = { class: "paragraph" }, Lr = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("br", null, null, -1)), Ur = { class: "btn-wrap" }, Tr = {
  __name: "OrderComplete",
  props: {
    redirectUrl: {
      type: String,
      required: !0
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
    return (s, u) => (c(), h("div", Dr, [
      Nr,
      Vr,
      i("p", Rr, [
        C(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        Lr,
        C(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
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
      ])
    ]));
  }
}, Pr = /* @__PURE__ */ I(Tr, [["__scopeId", "data-v-600ed569"]]), Ae = (e) => (z("data-v-903d08d7"), e = e(), q(), e), Mr = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Wr = { class: "viur-shop-form-wrap" }, zr = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), qr = { class: "viur-shop-form-wrap" }, Fr = { key: 0 }, Kr = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Hr = { class: "viur-shop-form-wrap" }, Gr = {
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
      s.target.checked && (t.isCustomAdress = !1), s.target.checked || (t.isCustomAdress = !0);
    }
    function a(s, u) {
      for (const [l, d] of Object.entries(u.value[0]))
        t.formValues[l] = d;
    }
    function o(s) {
      let u = {};
      return Array.isArray(s) ? (s.forEach((l) => {
        let d = l[0], f = l[1];
        u[d] = f;
      }), console.log("output", u), u) : s;
    }
    return se(t.formValues, (s) => {
      Object.entries(s).forEach(([u, l]) => {
        l === "" && delete t.formValues[u];
      });
    }), Q(async () => {
      await n.getAdressStructure(), t.addSkel = o(n.state.structure.address);
    }), (s, u) => {
      const l = ae("bone");
      return c(), h(E, null, [
        i("div", null, [
          Mr,
          i("div", Wr, [
            (c(!0), h(E, null, U(t.addSkel, (d, f) => (c(), h(E, { key: f }, [
              d.visible && d.params.group === "Customer Info" ? (c(), h("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + f)
              }, [
                d.visible && d.params.group === "Customer Info" ? (c(), P(l, {
                  key: 0,
                  is: T(x)(d.type),
                  name: f,
                  structure: o(t.addSkel),
                  errors: t.errors[f] ? t.errors[f] : [],
                  skel: t.formValues,
                  onChange: (m) => a(f, m),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          zr,
          i("div", qr, [
            (c(!0), h(E, null, U(t.addSkel, (d, f) => (c(), h(E, { key: f }, [
              d.visible && d.params.group === "Customer Address" ? (c(), h("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + f)
              }, [
                d.visible && d.params.group === "Customer Address" ? (c(), P(l, {
                  key: 0,
                  is: T(x)(d.type),
                  name: f,
                  structure: o(t.addSkel),
                  errors: t.errors[f] ? t.errors[f] : [],
                  skel: t.formValues,
                  onChange: (m) => a(f, m)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (c(), h("div", Fr, [
          Kr,
          i("div", Hr, [
            (c(!0), h(E, null, U(t.addSkel, (d, f) => (c(), h(E, { key: f }, [
              d.visible && d.params.group === "Customer Address" ? (c(), h("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + f)
              }, [
                d.visible && d.params.group === "Customer Address" ? (c(), P(l, {
                  key: 0,
                  is: T(x)(d.type),
                  name: f,
                  structure: o(t.addSkel),
                  errors: t.errors[f] ? t.errors[f] : [],
                  skel: t.formValues,
                  onChange: (m) => a(f, m)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ])) : _("", !0),
        i("sl-checkbox", {
          onSlChange: r,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Zr = /* @__PURE__ */ I(Gr, [["__scopeId", "data-v-903d08d7"]]), te = (e) => (z("data-v-489988f4"), e = e(), q(), e), Jr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Qr = { class: "viur-shop-form-wrap" }, Yr = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Xr = ["onSlChange", "onSlClear", "label"], xr = ["value"], el = { key: 0 }, tl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), nl = { class: "viur-shop-form-wrap" }, sl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
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
      for (const [$, g] of Object.entries(p.value[0]))
        t.formValues[$] = g;
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
        f();
        return;
      }
      t.selectedItem[p] = v.target.value, t.isItemSelected = !0;
    }
    function f(v, p) {
      console.log("clearing..."), delete t.selectedItem[p], t.isItemSelected = !1;
    }
    function m(v) {
      let p = {};
      return Array.isArray(v) ? (v.forEach(($) => {
        let g = $[0], b = $[1];
        p[g] = b;
      }), p) : v;
    }
    return se(t.formValues, (v) => {
      Object.entries(v).forEach(([p, $]) => {
        $ === "" && delete t.formValues[p];
      });
    }), Q(async () => {
      await n.getAdressStructure(), t.addSkel = m(n.state.structure.address);
    }), (v, p) => {
      const $ = ae("bone");
      return c(), h(E, null, [
        i("div", null, [
          Jr,
          i("div", Qr, [
            (c(!0), h(E, null, U(t.addSkel, (g, b) => (c(), h(E, { key: b }, [
              g.visible && g.params.group === "Customer Info" ? (c(), h("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                g.visible && g.params.group === "Customer Info" ? (c(), P($, {
                  key: 0,
                  is: T(x)(g.type),
                  name: b,
                  structure: m(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ]),
        Yr,
        (c(!0), h(E, null, U(t.shippingAdressAmount, (g) => (c(), h("div", {
          class: "viur-shop-form-wrap",
          key: g
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: r,
            onSlChange: (b) => d(b, g),
            onSlClear: (b) => f(b, g),
            label: t.selectedItem[g] ? T(n).state.carts[t.selectedItem[g]].info.name : "Warenkorb für Adresse wählen.",
            class: "viur-shop-form-cart-select"
          }, [
            (c(!0), h(E, null, U(T(n).state.carts, (b, y) => (c(), h("sl-option", { value: y }, B(b.info.name), 9, xr))), 256))
          ], 40, Xr),
          (c(!0), h(E, null, U(t.addSkel, (b, y) => (c(), h(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (c(), h("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              b.visible && b.params.group === "Customer Address" ? (c(), P($, {
                key: 0,
                is: T(x)(b.type),
                name: y,
                structure: m(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
            ], 2)) : _("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (c(), h("div", el, [
          tl,
          i("div", nl, [
            (c(!0), h(E, null, U(t.addSkel, (g, b) => (c(), h(E, { key: b }, [
              g.visible && g.params.group === "Customer Address" ? (c(), h("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                g.visible && g.params.group === "Customer Address" ? (c(), P($, {
                  key: 0,
                  is: T(x)(g.type),
                  name: b,
                  structure: m(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
              ], 2)) : _("", !0)
            ], 64))), 128))
          ])
        ])) : _("", !0),
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
          i("strong", null, B(t.amountAlert.title), 1),
          ol,
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
}, ul = /* @__PURE__ */ I(il, [["__scopeId", "data-v-489988f4"]]), et = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), r = w({
      rootNode: {},
      tabs: {
        cart: {
          component: H(ke),
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
          component: H(we),
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
          component: H(Pr),
          props: { redirectUrl: "http://localhost:8081" },
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: H(Zr),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: H(ul),
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
    return Q(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (c(), P(Br, {
      tabs: r.tabs,
      onTabChange: a,
      sidebar: !0
    }, null, 8, ["tabs"]));
  }
}, dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), cl = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = pt();
    return { state: w({}), route: t };
  }
}), ml = { class: "home" };
function fl(e, n, t, r, a, o) {
  return c(), h("div", ml, "View " + B(e.route.path) + " is missing.", 1);
}
const gl = /* @__PURE__ */ I(cl, [["render", fl]]), hl = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: gl
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-BgSUinb0.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-BXo1SETX.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Pa)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => dl)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Qa)
  }
];
function wl(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(hl), vt({
    // @ts-ignore
    history: yt("/"),
    routes: t
  });
}
const bl = gt(), El = {
  install(e) {
    e.component("CartView", ke), e.component("ExampleUsage", et), e.component("ConfirmView", we), e.use(bl);
  }
};
export {
  ke as C,
  El as V,
  I as _,
  et as a,
  we as b,
  wl as c,
  ee as u
};
