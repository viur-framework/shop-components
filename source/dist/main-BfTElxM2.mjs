var at = Object.defineProperty;
var st = (e, n, t) => n in e ? at(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => st(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as D, inject as j, reactive as w, openBlock as f, createElementBlock as g, normalizeClass as ye, createElementVNode as i, renderSlot as Je, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as _, toDisplayString as O, onMounted as V, ref as F, readonly as lt, getCurrentScope as rt, onScopeDispose as ot, unref as U, computed as S, watchEffect as fe, renderList as T, watch as ae, withDirectives as J, vModelText as re, getCurrentInstance as it, resolveComponent as se, createBlock as P, vShow as ve, withModifiers as ce, createTextVNode as C, shallowRef as G, provide as ue, onBeforeMount as ee, useCssVars as ut, Transition as dt, withCtx as ct, createVNode as Oe, Teleport as Qe, resolveDynamicComponent as ft, mergeProps as mt } from "vue";
import { defineStore as $e, createPinia as gt } from "pinia";
import je from "@viur/ckeditor5-build-classic";
import { Request as ht } from "@viur/vue-utils";
import { ViURShopClient as bt } from "@viur/viur-shop-client";
import { useRoute as vt, createRouter as pt, createWebHashHistory as yt } from "vue-router";
const $t = D({
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
  for (const [l, s] of n)
    t[l] = s;
  return t;
}, Ye = (e) => (z("data-v-141aaf9b"), e = e(), q(), e), St = ["draggable"], _t = ["disabled"], kt = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), wt = [
  kt
], Et = { class: "value" }, At = ["disabled", "title"], It = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ct = [
  It
];
function Ot(e, n, t, l, s, o) {
  return f(), g("div", {
    class: ye(["value-line", {
      "is-dragging": e.isDragging,
      "dragging-line-bottom": e.draggingLineBottom,
      "dragging-line-top": e.draggingLineTop
    }]),
    draggable: e.state.isDraggable,
    onDragover: n[2] || (n[2] = (a) => e.$emit("handleDragOver", a)),
    onDrop: n[3] || (n[3] = (a) => e.$emit("handleDrop", a)),
    onDragstart: n[4] || (n[4] = (a) => e.$emit("handleDragStart", a)),
    onDragend: n[5] || (n[5] = (a) => e.$emit("handleDragEnd"))
  }, [
    i("sl-button", {
      disabled: e.boneState.readonly,
      class: "drag-button",
      onMousedown: n[0] || (n[0] = (a) => e.state.isDraggable = !0)
    }, wt, 40, _t),
    i("div", Et, [
      Je(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (a) => e.$emit("delete"))
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
}), Dt = { class: "bone-name" }, Nt = { key: 0 }, Rt = { class: "bone" };
function Vt(e, n, t, l, s, o) {
  return f(), g(E, null, [
    i("label", Dt, [
      Je(e.$slots, "default", {}, void 0, !0),
      _("", !0)
    ]),
    e.state.debug ? (f(), g("div", Nt, [
      i("div", Rt, O(e.name), 1),
      i("pre", null, "    " + O(e.boneState) + `
    `, 1)
    ])) : _("", !0)
  ], 64);
}
const Lt = /* @__PURE__ */ I(Bt, [["render", Vt], ["__scopeId", "data-v-b7149172"]]), Ut = D({
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
    function s(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), Tt = ["disabled", "value"], Pt = ["disabled", "value"];
function Mt(e, n, t, l, s, o) {
  var a, u;
  return e.boneState.bonestructure.type === "raw.json" ? (f(), g("sl-textarea", {
    key: 0,
    disabled: (a = e.boneState) == null ? void 0 : a.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Tt)) : (f(), g("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
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
    function l(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: l
    };
  }
}), zt = ["value"];
function qt(e, n, t, l, s, o) {
  return f(), g("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, zt);
}
const Be = /* @__PURE__ */ I(Wt, [["render", qt], ["__scopeId", "data-v-b45a1311"]]);
function Ft(e) {
  return rt() ? (ot(e), !0) : !1;
}
function Kt(e) {
  return typeof e == "function" ? e() : U(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, s = F(!1);
  let o = null;
  function a() {
    o && (clearTimeout(o), o = null);
  }
  function u() {
    s.value = !1, a();
  }
  function r(...d) {
    a(), s.value = !0, o = setTimeout(() => {
      s.value = !1, o = null, e(...d);
    }, Kt(n));
  }
  return l && (s.value = !0, Ht && r()), Ft(u), {
    isPending: lt(s),
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
    function l(a) {
      let u = [], r = [], d = /\$\((.*?)\)/g;
      for (; r; ) {
        if (r = d.exec(a), !r) {
          r = !1;
          continue;
        }
        u.push(r[1]);
      }
      return u;
    }
    let s = l(n), o = [];
    Array.isArray(t) || (t = [t]);
    for (let a of t) {
      let u = n;
      for (let r of s) {
        let d = r.split("."), c = a;
        for (let m of d)
          c && c !== "-" && m in c && c[m] ? c = c[m] : c = "-";
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
      value: S(() => e.value)
    }), s = F(null);
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return fe(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: a } = me(() => {
          s.value.focus();
        }, 600);
        a();
      }
    }), V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      Utils: Gt,
      boneState: t,
      changeEvent: o,
      stringBone: s
    };
  }
}), Jt = ["disabled", "value", "required"];
function Qt(e, n, t, l, s, o) {
  return f(), g("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a)),
    onKeyup: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Jt);
}
const De = /* @__PURE__ */ I(Zt, [["render", Qt], ["__scopeId", "data-v-1ccbacc0"]]), Yt = D({
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
    const t = j("boneState"), l = w({}), s = F(null);
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return fe(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: a } = me(() => {
          s.value.focus();
        }, 600);
        a();
      }
    }), V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      emailBone: s
    };
  }
}), Xt = ["disabled", "value"];
function xt(e, n, t, l, s, o) {
  return f(), g("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Xt);
}
const Ne = /* @__PURE__ */ I(Yt, [["render", xt], ["__scopeId", "data-v-4328e024"]]), en = D({
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
      value: S(() => {
        var a;
        let o = e.value;
        return t.bonestructure.time ? o = (a = e.value) == null ? void 0 : a.split("+")[0] : e.value && (o = new Date(e.value).toISOString().substr(0, 10)), o;
      }),
      typeString: S(() => {
        let o = "datetime-local";
        return t.bonestructure.time || (o = "date"), o;
      })
    });
    function s(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), tn = ["disabled", "type", "value"];
function nn(e, n, t, l, s, o) {
  return f(), g("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, tn);
}
const Re = /* @__PURE__ */ I(en, [["render", nn], ["__scopeId", "data-v-f1b8af8c"]]), an = D({
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
      value: S(() => {
        let a = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? a = a.filter((u) => t.bonestructure.values.map((r) => r[0].toString()).includes(u)) : a = a.filter(
          (u) => Object.keys(t.bonestructure.values).map((r) => r.toString()).includes(u)
        ), a.map((u) => u.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function s() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let a = [];
        for (const [u, r] of Object.entries(t.bonestructure.values))
          a.push([u, r]);
        return a;
      }
    }
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index), W;
    }
    return V(() => {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      convertObjToList: s
    };
  }
}), sn = ["disabled", "value", "multiple"], ln = ["value"];
function rn(e, n, t, l, s, o) {
  return f(), g("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, [
    (f(!0), g(E, null, T(e.convertObjToList(), (a) => (f(), g("sl-option", {
      key: a[0],
      value: a[0]
    }, O(a[1]), 9, ln))), 128))
  ], 40, sn);
}
const Ve = /* @__PURE__ */ I(an, [["render", rn], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
      value: S(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function s(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return V(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), un = ["disabled", "checked"];
function dn(e, n, t, l, s, o) {
  return f(), g("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, un);
}
const Le = /* @__PURE__ */ I(on, [["render", dn], ["__scopeId", "data-v-363598c8"]]), cn = D({
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
    }), s = F(null);
    function o(u) {
      l.value1 === l.value2 ? l.equal = !0 : l.equal = !1, a(l.value1), l.requiredPasswordInfo.length === 0 && l.passwordInfo.length - l.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, l.value1, e.lang, e.index, !0) : n.emit("change", e.name, l.value1, e.lang, e.index, !1);
    }
    V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function a(u) {
      l.passwordInfo = [], l.requiredPasswordInfo = [];
      for (const r of t.bonestructure.tests)
        new RegExp(r[0]).test(u) || (r[2] ? l.requiredPasswordInfo.push(r[1]) : l.passwordInfo.push(r[1]));
      l.equal || l.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), l.value1 || l.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return fe(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: u } = me(() => {
          s.value.focus();
        }, 600);
        u();
      }
    }), ae(
      () => e.value,
      (u, r) => {
        l.value1 = u;
      }
    ), {
      state: l,
      boneState: t,
      changeEvent: o,
      passwordBone: s
    };
  }
}), fn = ["disabled"], mn = ["name"], gn = ["name"], hn = { class: "errors" };
function bn(e, n, t, l, s, o) {
  return f(), g(E, null, [
    J(i("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": n[0] || (n[0] = (a) => e.state.value1 = a),
      disabled: e.boneState.readonly,
      class: ye({ "has-check": !e.boneState.readonly }),
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a)),
      onSlClear: n[2] || (n[2] = (a) => e.state.value1 = ""),
      onKeyup: n[3] || (n[3] = (...a) => e.changeEvent && e.changeEvent(...a))
    }, [
      i("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, mn)
    ], 42, fn), [
      [re, e.state.value1]
    ]),
    e.boneState.readonly ? _("", !0) : J((f(), g("sl-input", {
      key: 0,
      "onUpdate:modelValue": n[4] || (n[4] = (a) => e.state.value2 = a),
      class: "password-check",
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[5] || (n[5] = (...a) => e.changeEvent && e.changeEvent(...a)),
      onSlClear: n[6] || (n[6] = (a) => e.state.value2 = ""),
      onKeyup: n[7] || (n[7] = (...a) => e.changeEvent && e.changeEvent(...a))
    }, [
      i("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, gn)
    ], 544)), [
      [re, e.state.value2]
    ]),
    i("ul", hn, [
      (f(!0), g(E, null, T(e.state.passwordInfo, (a, u) => (f(), g("li", { key: u }, O(a), 1))), 128)),
      (f(!0), g(E, null, T(e.state.requiredPasswordInfo, (a, u) => (f(), g("li", {
        key: u,
        class: "requiredInfo"
      }, O(a), 1))), 128))
    ])
  ], 64);
}
const Ue = /* @__PURE__ */ I(cn, [["render", bn], ["__scopeId", "data-v-0ccf18c0"]]), vn = D({
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
      value: S(() => e.value),
      structure: S(() => a(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: S(() => {
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [m, p] of Object.entries(l.structure)) {
          let v = "default", k = l.structure[m], h = (d = l.value) == null ? void 0 : d[m];
          (c = p == null ? void 0 : p.params) != null && c.category && (v = p.params.category.toLowerCase()), Object.keys(u).includes(v) ? u[v].bones.push({
            boneName: m,
            boneStructure: k,
            boneValue: h
          }) : u[v] = {
            name: p.params.category,
            bones: [
              {
                boneName: m,
                boneStructure: k,
                boneValue: h
              }
            ]
          }, k.visible === !0 && (u[v].groupVisible = !0);
        }
        let r = {};
        return Object.keys(u).sort().forEach(function(m) {
          r[m] = u[m];
        }), r;
      })
    });
    function s(u) {
      n.emit("change", u);
    }
    V(() => {
      it().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o(u) {
      console.log(u);
    }
    function a(u) {
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
      structureToDict: a,
      changeEvent: s,
      updateValue: o
    };
  }
}), pn = {
  key: 0,
  open: "",
  variant: "danger"
}, yn = {
  key: 1,
  class: "form"
}, $n = ["summary", "open"];
function Sn(e, n, t, l, s, o) {
  const a = se("bone");
  return e.state.globalRegistration ? (f(), g("div", yn, [
    (f(!0), g(E, null, T(e.state.formGroups, (u, r) => J((f(), g("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (f(!0), g(E, null, T(u.bones, (d) => J((f(), P(a, {
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
  ])) : (f(), g("sl-alert", pn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Xe = /* @__PURE__ */ I(vn, [["render", Sn], ["__scopeId", "data-v-e6fcfbca"]]), _n = D({
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
    const t = j("boneState"), l = w({
      value: {},
      index: S(() => e.index),
      lang: S(() => e.lang)
    });
    function s(o) {
      var u;
      (u = l.value) != null && u[o.name] || (l.value ? l.value[o.name] = null : l.value = { [o.name]: null });
      let a = l.value[o.name];
      o.lang ? (a === null && (a = {}), Object.keys(a).includes(o.lang) && o.index !== null ? a[o.lang][o.index] = o.value : a[o.lang] = o.value) : o.index !== null ? (a === null && (a = []), a[o.index] = o.value) : a = o.value, l.value[o.name] = a, n.emit("change", e.name, l.value, e.lang, e.index, !0);
    }
    return V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
});
function kn(e, n, t, l, s, o) {
  const a = se("Wrapper_nested");
  return f(), P(a, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Te = /* @__PURE__ */ I(_n, [["render", kn], ["__scopeId", "data-v-84a761ce"]]), wn = D({
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
    function s(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), En = ["disabled", "value"];
function An(e, n, t, l, s, o) {
  return f(), g("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, En);
}
const Pe = /* @__PURE__ */ I(wn, [["render", An], ["__scopeId", "data-v-534b9149"]]), In = D({
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
      minAmount: S(() => t.bonestructure.minAmount),
      maxAmount: S(() => t.bonestructure.maxAmount),
      precision: S(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), s = F(null);
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return fe(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: a } = me(() => {
          s.value.focus();
        }, 600);
        a();
      }
    }), V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      numericBone: s
    };
  }
}), Cn = ["disabled", "value", "min", "max", "step"], On = { class: "info" }, jn = { key: 0 }, Bn = { key: 1 }, Dn = { key: 2 };
function Nn(e, n, t, l, s, o) {
  return f(), g(E, null, [
    i("sl-input", {
      ref: "numericBone",
      type: "number",
      disabled: e.boneState.readonly,
      value: e.value,
      min: e.state.minAmount,
      max: e.state.maxAmount,
      step: e.state.precision,
      onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a)),
      onKeyup: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a))
    }, null, 40, Cn),
    i("ul", On, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (f(), g("li", jn, O(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : _("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (f(), g("li", Bn, O(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : _("", !0),
      e.state.precision ? (f(), g("li", Dn, O(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : _("", !0)
    ])
  ], 64);
}
const Me = /* @__PURE__ */ I(In, [["render", Nn], ["__scopeId", "data-v-03d5b399"]]);
var R = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class de extends Error {
  constructor(n, t, l, s) {
    super(l || t), arguments.length >= 4 && s && Object.assign(this, s), this.statusText = t, this.statusCode = n, this.response = s;
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
class B {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = (R.VITE_API_URL ? R.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: s = null, abortController: o = null, headers: a = null, mode: u = null } = {}) {
    function r() {
      if (t instanceof FormData)
        return t;
      const c = new FormData();
      for (const m in t)
        if (Array.isArray(t[m]))
          for (let p of t[m])
            c.append(m, p);
        else
          c.append(m, t[m]);
      return c;
    }
    let d = oe.post(B.buildUrl(n), r(), null, a, o, u);
    return d.then(function(c) {
      l && l(c.data);
    }).catch(function(c) {
      s && s(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = R.VITE_DEFAULT_RENDERER || "json") {
    await B.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (l) => {
      let s = await l.json();
      Array.isArray(s) || (s = [s]), X().state.sKeys = new Set(s);
    });
  }
  static async securePost(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    abortController: o = null,
    renderer: a = R.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let c = null;
    X().state.sKeys.size === 0 && await B.getBatchSkeys(d);
    const m = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", m), X().state.sKeys.delete(m)) : (t || (t = {}), t.skey = m, X().state.sKeys.delete(m)), c = B.post(n, {
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
    failedCallback: s = null,
    cached: o = !1,
    clearCache: a = !1,
    abortController: u = null,
    headers: r = null,
    mode: d = null,
    //          milli  sec  min  Std  Tage
    cacheTime: c = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let m = oe.get(B.buildUrl(n), t, a, r, u, d);
    return m.then(function(p) {
      l && l(p.data);
    }).catch(function(p) {
      s && s(p);
    }), m;
  }
  static list(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    group: o = null,
    abortController: a = null,
    renderer: u = (R == null ? void 0 : R.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${u}/${n}/list`;
    return o && (r += `/${o}`), B.get(r, {
      dataObj: t,
      callback: l,
      failedCallback: s,
      abortController: a
    });
  }
  static getStructure(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    group: o = null,
    abortController: a = null,
    renderer: u = (R == null ? void 0 : R.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let r = `/${u}/getStructure/${n}`;
    return o && (r += `/${o}`), B.get(r, {
      dataObj: t,
      callback: l,
      failedCallback: s,
      abortController: a
    });
  }
  static view(n, t, {
    dataObj: l = null,
    callback: s = null,
    failedCallback: o = null,
    group: a = null,
    abortController: u = null,
    renderer: r = (R == null ? void 0 : R.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/view/${t}`;
    return a && (d = `/${r}/${n}/view/${a}/${t}`), B.get(d, {
      dataObj: l,
      callback: s,
      failedCallback: o,
      abortController: u
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    group: o = null,
    abortController: a = null,
    renderer: u = (R == null ? void 0 : R.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${u}/${n}/add`;
    return o && (r = `/${u}/${n}/add/${o}`), B.securePost(r, {
      dataObj: t,
      callback: l,
      failedCallback: s,
      abortController: a
    });
  }
  static edit(n, t, {
    dataObj: l = null,
    callback: s = null,
    failedCallback: o = null,
    group: a = null,
    abortController: u = null,
    renderer: r = (R == null ? void 0 : R.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/edit/${t}`;
    return a && (d = `/${r}/${n}/edit/${a}/${t}`), B.securePost(d, {
      dataObj: l,
      callback: s,
      failedCallback: o,
      abortController: u
    });
  }
  static delete(n, t, {
    dataObj: l = null,
    callback: s = null,
    failedCallback: o = null,
    group: a = null,
    abortController: u = null,
    renderer: r = (R == null ? void 0 : R.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/delete/${t}`;
    return a && (d = `/${r}/${n}/delete/${a}/${t}`), B.securePost(d, {
      dataObj: l,
      callback: s,
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
    return new Promise((s, o) => {
      B.securePost("/vi/file/getUploadURL", { dataObj: l }).then(async (a) => {
        let u = await a.json();
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
            let m = await c.json();
            m.action === "addSuccess" ? s(m.values) : o(m);
          }).catch((c) => {
            o(c);
          });
        }).catch((r) => {
          o(r);
        });
      }).catch((a) => {
        o(a);
      });
    });
  }
}
class oe {
  constructor() {
    Ce(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, l = null, s = null, o = null) {
    let a = { method: n };
    return a.credentials = "include", a.headers = {
      Accept: "application/json, text/plain, */*"
    }, l && (a.headers = { ...a.headers, ...l }), t && (a.body = t), s && (a.signal = s.signal), o && (a.mode = o), a;
  }
  static get(n, t = null, l = null, s = null, o = null, a = null) {
    function u(r, d) {
      let c = new URL(r);
      if (d && Object.keys(d).length > 0) {
        const m = new URLSearchParams();
        for (const [p, v] of Object.entries(d))
          if (Array.isArray(v))
            for (const k of v)
              m.append(p, k);
          else
            m.append(p, v);
        c.search = m.toString();
      }
      return c.toString();
    }
    return fetch(u(n, t), oe.buildOptions("GET", null, s, o, a)).then(async (r) => {
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
  static post(n, t = null, l = null, s = null, o = null, a = null) {
    return fetch(n, oe.buildOptions("POST", t, s, o, a));
  }
}
var Rn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Vn = D({
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
    const t = j("boneState"), l = j("formatString"), s = w({
      format: S(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Rn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var p;
        const m = await c.json();
        s.skellistdata = {};
        for (let v of m.skellist)
          s.skellistdata[v.key] = v;
        return (p = m.skellist) == null ? void 0 : p.map((v) => ({ text: l(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    function a(r) {
      s.selection = { dest: s.skellistdata[r.detail.item.value] }, n.emit("change", e.name, s.selection, e.lang, e.index);
    }
    function u(r) {
      var c;
      s.selection || (s.selection = {}), (c = s.selection.rel) != null && c[r.name] || (s.selection.rel ? s.selection.rel[r.name] = null : s.selection.rel = { [r.name]: null });
      let d = s.selection.rel[r.name];
      r.lang ? (d === null && (d = {}), Object.keys(d).includes(r.lang) && r.index !== null ? d[r.lang][r.index] = r.value : d[r.lang] = r.value) : r.index !== null ? (d === null && (d = []), d[r.index] = r.value) : d = r.value, Object.keys(s.selection).includes("rel") && s.selection.rel ? s.selection.rel[r.name] = d : s.selection.rel = { [r.name]: d }, Object.keys(s.selection).includes("dest") && n.emit("change", e.name, s.selection, e.lang, e.index);
    }
    return V(() => {
      s.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: t,
      formatString: l,
      changeEvent: a,
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
function Fn(e, n, t, l, s, o) {
  var u, r;
  const a = se("Wrapper_nested");
  return f(), g("div", Un, [
    i("div", Tn, [
      e.state.selection ? (f(), g("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Pn)) : (f(), g("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Mn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (f(), g("sl-button", {
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
    (u = e.boneState) != null && u.bonestructure.using ? (f(), P(a, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : _("", !0)
  ]);
}
const We = /* @__PURE__ */ I(Vn, [["render", Fn], ["__scopeId", "data-v-61dd72e0"]]), Kn = D({
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
    function s(o, a) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), Hn = { class: "box" };
function Gn(e, n, t, l, s, o) {
  return f(), g("div", Hn, O(e.value), 1);
}
const Zn = /* @__PURE__ */ I(Kn, [["render", Gn], ["__scopeId", "data-v-343aca69"]]);
var ze = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
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
    const t = j("boneState"), l = F(), s = w({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    V(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o() {
      console.log(B.downloadUrlFor(e.value)), window.open(B.downloadUrlFor(e.value));
    }
    function a() {
      return B.downloadUrlFor(e.value, !1);
    }
    function u(c) {
      const m = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((p, v) => {
        B.securePost(`/${ze.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: m }).then(async (k) => {
          let h = await k.json();
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
            B.securePost(`/${ze.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? p(A.values) : v(A);
            }).catch(($) => {
              v($);
            });
          }).catch((b) => {
            v(b);
          });
        }).catch((k) => {
          v(k);
        });
      });
    }
    async function r(c) {
      s.loading = !0;
      for (let m of c.target.files) {
        let p = await u(m);
        l.value.value = null, n.emit("change", e.name, { dest: p, rel: null }, e.lang, e.index);
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let m of c.dataTransfer.files) {
        let p = await u(m);
        l.value.value = null, n.emit("change", e.name, { dest: p, rel: null }, e.lang, e.index);
        break;
      }
      s.loading = !1;
    }
    return {
      state: s,
      boneState: t,
      downloadFile: o,
      createBackgroundImage: a,
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
}, ea = ["title"], ta = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), na = [
  ta
], aa = ["multiple"], sa = ["title"], la = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), ra = [
  la
], oa = { class: "box" }, ia = ["src"], ua = ["label", "open"], da = ["src"], ca = {
  key: 1,
  class: "preview"
}, fa = {
  key: 0,
  name: "file-earmark"
}, ma = { key: 2 }, ga = ["title"], ha = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), ba = [
  ha
];
function va(e, n, t, l, s, o) {
  var a, u, r, d, c, m, p, v, k, h;
  return f(), g("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = ce((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = ce((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (f(), g("div", Qn, Xn)) : _("", !0),
    e.state.droparea ? (f(), g("div", xn, " Dateien hier hinziehen ")) : _("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (f(), g("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, na, 8, ea)) : _("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, aa),
    e.value ? (f(), g("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, ra, 8, sa)) : _("", !0),
    i("div", oa, [
      (u = (a = e.value) == null ? void 0 : a.dest) != null && u.mimetype.includes("image") ? (f(), g("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, ia),
        i("sl-dialog", {
          label: decodeURIComponent((d = (r = e.value) == null ? void 0 : r.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, da)
        ], 8, ua)
      ])) : (f(), g("div", ca, [
        (m = (c = e.value) == null ? void 0 : c.dest) != null && m.name ? (f(), g("sl-icon", fa)) : _("", !0)
      ])),
      (v = (p = e.value) == null ? void 0 : p.dest) != null && v.name ? (f(), g("div", ma, O(decodeURIComponent((h = (k = e.value) == null ? void 0 : k.dest) == null ? void 0 : h.name)), 1)) : _("", !0)
    ]),
    e.boneState.multiple ? _("", !0) : (f(), g("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, ba, 8, ga))
  ], 32);
}
const qe = /* @__PURE__ */ I(Jn, [["render", va], ["__scopeId", "data-v-91086308"]]), pa = D({
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
      editor: S(() => je)
    });
    function s(u) {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }
    function o(u) {
      l.value = u.target.value, n.emit("change", e.name, l.value, e.lang, e.index);
    }
    V(() => {
      e.value !== null && (l.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function a(u) {
      u.editing.view.change((r) => {
        r.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return ae(
      () => e.value,
      (u, r) => {
        l.value = u;
      }
    ), {
      state: l,
      ClassicEditor: je,
      boneState: t,
      changeEvent: s,
      onReady: a,
      changeEventTextarea: o
    };
  }
}), ya = ["disabled", "value"];
function $a(e, n, t, l, s, o) {
  var u, r, d, c;
  const a = se("ckeditor");
  return e.state.editor ? (f(), g(E, { key: 0 }, [
    (u = e.boneState.bonestructure) != null && u.valid_html || (r = e.boneState.bonestructure) != null && r.validHtml ? (f(), P(a, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (m) => e.state.value = m),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (f(), g("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...m) => e.changeEventTextarea && e.changeEventTextarea(...m))
    }, null, 40, ya))
  ], 64)) : _("", !0);
}
const Fe = /* @__PURE__ */ I(pa, [["render", $a]]), Sa = D({
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
    function s() {
      n.emit("change", e.name, [l.valueLat, l.valueLng], e.lang, e.index);
    }
    return V(() => {
      try {
        l.valueLat = e.value[0], l.valueLng = e.value[1];
      } catch {
      }
      n.emit("change", e.name, [l.valueLat, l.valueLng], e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), _a = ["name", "min", "max", "disabled"], ka = ["name", "min", "max", "disabled"];
function wa(e, n, t, l, s, o) {
  return f(), g(E, null, [
    J(i("sl-input", {
      "onUpdate:modelValue": n[0] || (n[0] = (a) => e.state.valueLat = a),
      index: "lat",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a)),
      placeholder: "Lat"
    }, null, 40, _a), [
      [re, e.state.valueLat]
    ]),
    J(i("sl-input", {
      "onUpdate:modelValue": n[2] || (n[2] = (a) => e.state.valueLng = a),
      index: "lng",
      type: "number",
      name: e.name,
      min: e.boneState.bonestructure.boundslat[0],
      max: e.boneState.bonestructure.boundslat[1],
      disabled: e.boneState.readonly,
      "value-as-number": "",
      step: "0.000001",
      onSlChange: n[3] || (n[3] = (...a) => e.changeEvent && e.changeEvent(...a)),
      placeholder: "Long"
    }, null, 40, ka), [
      [re, e.state.valueLng]
    ])
  ], 64);
}
const Ke = /* @__PURE__ */ I(Sa, [["render", wa], ["__scopeId", "data-v-7bc31020"]]), Ea = D({
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
    }), s = j("addMultipleEntry"), o = j("removeMultipleEntries");
    function a() {
      l.counter += 1;
      let r = 200;
      l.counter > 1 && (r = 500), l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        for (let d = l.counter; d--; )
          s(e.lang);
        l.counter = 0;
      }, r);
    }
    function u() {
      let r = 200;
      l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        o(e.lang);
      }, r);
    }
    return V(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: l,
      boneState: t,
      handleAdd: a,
      handleRemove: u,
      removeMultipleEntries: o
    };
  }
}), xe = (e) => (z("data-v-63e75dee"), e = e(), q(), e), Aa = { class: "actionbar" }, Ia = ["title"], Ca = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Oa = [
  Ca
], ja = ["title"], Ba = /* @__PURE__ */ xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Da(e, n, t, l, s, o) {
  return f(), g("div", Aa, [
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.handleRemove(e.lang))
    }, Oa, 8, Ia)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (a) => e.handleAdd(e.lang))
    }, [
      Ba,
      C(" " + O(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (f(), g(E, { key: 0 }, [
        C("(" + O(e.state.counter) + ")", 1)
      ], 64)) : _("", !0)
    ], 8, ja)) : _("", !0)
  ]);
}
const Na = /* @__PURE__ */ I(Ea, [["render", Da], ["__scopeId", "data-v-63e75dee"]]);
var Ra = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Va = D({
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
    const t = j("boneState"), l = j("addMultipleEntry"), s = j("formatString"), o = null, a = w({
      skels: {},
      hasUsing: S(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${Ra.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var p;
        const m = await c.json();
        return a.skels = m.skellist.reduce((v, k) => (v[k.key] = k, v), {}), (p = m.skellist) == null ? void 0 : p.map((v) => ({ text: s(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    return V(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: a,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: o,
      getList: u
    };
  }
}), et = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), La = { class: "actionbar" }, Ua = ["title"], Ta = /* @__PURE__ */ et(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Pa = [
  Ta
], Ma = ["source"], Wa = ["title"], za = /* @__PURE__ */ et(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function qa(e, n, t, l, s, o) {
  return f(), g("div", La, [
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.openSelector())
    }, Pa, 8, Ua)) : _("", !0),
    i("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: n[1] || (n[1] = (a) => {
        var u;
        return e.addMultipleEntry(e.lang, {
          dest: (u = e.state.skels) == null ? void 0 : u[a.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, Ma),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (a) => e.addMultipleEntry(e.lang))
    }, [
      za,
      C(" " + O(e.$t("bone.list")), 1)
    ], 8, Wa)) : _("", !0)
  ]);
}
const Fa = /* @__PURE__ */ I(Va, [["render", qa], ["__scopeId", "data-v-eeea51c6"]]);
var He = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ka = D({
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
    const s = null, o = F(), a = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: S(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(c) {
      const m = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((p, v) => {
        B.securePost(`/${He.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: m }).then(async (k) => {
          let h = await k.json();
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
            B.securePost(`/${He.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? p(A.values) : v(A);
            }).catch(($) => {
              v($);
            });
          }).catch((b) => {
            v(b);
          });
        }).catch((k) => {
          v(k);
        });
      });
    }
    async function r(c) {
      a.loading = !0;
      for (let m of c.target.files) {
        let p = await u(m);
        o.value.value = null;
        let v = null;
        a.hasUsing && (v = void 0), l(e.lang, { dest: p, rel: v });
      }
      a.loading = !1;
    }
    async function d(c) {
      a.loading = !0, a.droparea = !1;
      for (let m of c.dataTransfer.files) {
        let p = await u(m);
        o.value.value = null;
        let v = null;
        a.hasUsing && (v = void 0), l(e.lang, { dest: p, rel: v });
      }
      a.loading = !1;
    }
    return V(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: a,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: s,
      uploadFile: u,
      uploadinput: o,
      handleUpload: r,
      handleDrop: d
    };
  }
}), Se = (e) => (z("data-v-9bac9f8a"), e = e(), q(), e), Ha = ["title"], Ga = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Za = [
  Ga
], Ja = {
  key: 1,
  class: "droparea"
}, Qa = ["multiple"], Ya = ["title"], Xa = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), xa = [
  Xa
], es = ["title"], ts = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), ns = {
  key: 0,
  slot: "suffix"
};
function as(e, n, t, l, s, o) {
  return f(), g("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = ce((a) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (a) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = ce((...a) => e.handleDrop && e.handleDrop(...a), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.openSelector())
    }, Za, 8, Ha)) : _("", !0),
    e.state.droparea ? (f(), g("div", Ja, " Dateien hier hinziehen ")) : _("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...a) => e.handleUpload && e.handleUpload(...a))
    }, null, 40, Qa),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (a) => e.addMultipleEntry(e.lang))
    }, xa, 8, Ya)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (a) => e.uploadinput.click())
    }, [
      ts,
      C(" " + O(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (f(), g("sl-spinner", ns)) : _("", !0)
    ], 8, es)) : _("", !0)
  ], 32);
}
const ss = /* @__PURE__ */ I(Ka, [["render", as], ["__scopeId", "data-v-9bac9f8a"]]), _e = $e("boneStore", () => {
  const e = w({
    additionalBones: G({}),
    defaultBones: G({
      rawBone: pe,
      keyBone: Be,
      stringBone: De,
      emailBone: Ne,
      dateBone: Re,
      booleanBone: Le,
      selectBone: Ve,
      passwordBone: Ue,
      recordBone: Te,
      numericBone: Me,
      colorBone: Pe,
      relationalBone: We,
      jsonBone: Zn,
      fileBone: qe,
      textBone: Fe,
      spatialBone: Ke
    }),
    actionbars: G({
      "relational.tree.leaf.file.file": ss,
      "relational.": Fa
    }),
    multibones: G(["select", "select."])
  });
  function n(a, u) {
    e.additionalBones[a] = u;
  }
  function t() {
    let a = e.defaultBones;
    for (const [u, r] of Object.entries(e.additionalBones))
      a.add(r);
    return a;
  }
  function l(a) {
    if (Object.keys(e.additionalBones).includes(a))
      return e.additionalBones[a];
    {
      let u = a.split("."), r = Object.entries(e.additionalBones).filter(
        (d) => d[0].startsWith(u[0] + ".")
      );
      if (r.length > 0) {
        r.sort((d, c) => c.length - d.length);
        for (let d of r)
          if (a.startsWith(d[0]))
            return e.additionalBones[d[0]];
      }
    }
    return a === "date" ? Re : a === "key" ? Be : a === "str.email" ? Ne : a === "str" || a.startsWith("str.") ? De : a === "select" || a.startsWith("select.") ? Ve : a === "bool" ? Le : a === "password" ? Ue : a === "record" ? Te : a === "numeric" || a.startsWith("numeric.") ? Me : a === "relational.tree.leaf.file.file" ? qe : a === "relational" || a.startsWith("relational.") ? We : a === "color" ? Pe : a === "text" ? Fe : a === "spatial" ? Ke : pe;
  }
  function s(a, u) {
    e.actionbars[a] = u;
  }
  function o(a) {
    if (Object.keys(e.actionbars).includes(a))
      return e.actionbars[a];
    {
      let u = a.split("."), r = Object.entries(e.actionbars).filter(
        (d) => d[0].startsWith(u[0] + ".")
      );
      if (r.length > 0) {
        r.sort((d, c) => c.length - d.length);
        for (let d of r)
          if (a.startsWith(d[0]))
            return e.actionbars[d[0]];
      }
    }
    return Na;
  }
  return {
    state: e,
    addBoneWidget: n,
    getBoneWidget: l,
    importWidgets: t,
    addBoneActionbar: s,
    getBoneActionbar: o
  };
});
function ls(e) {
  return _e().getBoneActionbar(e);
}
function x(e) {
  return _e().getBoneWidget(e);
}
function rs(e) {
  const n = _e();
  if (n.state.multibones.includes(e))
    return !0;
  {
    let t = e.split("."), l = Object.entries(n.state.multibones).filter(
      (s) => s[1].startsWith(t[0] + ".")
    );
    if (l.length > 0) {
      l.sort((s, o) => o.length - s.length);
      for (let s of l)
        if (e.startsWith(s[1]))
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
      bonestructure: S(() => {
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
      multilanguage: S(() => {
        var h;
        return ((h = t.languages) == null ? void 0 : h.length) && t.languages.length > 0;
      }),
      languages: S(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: S(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: S(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: S(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: S(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: S(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: S(() => {
        var h;
        return ls((h = t.bonestructure) == null ? void 0 : h.type);
      }),
      isEmpty: S(() => {
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
      errorMessages: S(() => {
        let h = [];
        for (let b of e.errors)
          b.fieldPath[0] === e.name && (b.severity > 2 || t.required && (b.severity === 2 || b.severity === 0)) && h.push(b.errorMessage);
        return h;
      })
    });
    ue("boneState", t);
    function l(h, b, y) {
      a(b, h, "isDragging"), a(b, h, "dragStartIndex");
    }
    function s(h, b, y) {
      y.preventDefault();
      const $ = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      $ < A.offsetHeight / 2 ? (a(b, h, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = h) : (a(b, h, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = h + 1);
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
    function a(h, b, y) {
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
    function m(h, b = null) {
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
    function p(h = null) {
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
    ue("removeMultipleEntries", p);
    function v(h = null, b = "") {
      c(h, b);
    }
    function k(h, b) {
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
              for (let nt of M[Y])
                Ie.push($(ne.join("."), nt));
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
    return ue("formatString", k), ee(() => {
      var h;
      e.value ? t.bonevalue = e.value : t.bonevalue = (h = e.skel) == null ? void 0 : h[e.name];
    }), ae(
      () => e.skel,
      (h, b) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), ae(
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
      removeMultipleEntry: m,
      removeMultipleEntries: p,
      BoneHasMultipleHandling: rs,
      multipleBonePressEnter: v,
      handleDragStart: l,
      handleDragOver: s,
      handleDrop: o,
      setStateProperties: a,
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
      trackWidth: S(() => `${e.size / 30}rem`),
      outerSize: S(() => `calc(${e.size}rem + ${t.trackWidth})`),
      spinnerSize: S(() => `${e.size}rem`),
      logoSize: S(() => `calc(${e.size}rem - ${t.trackWidth} * 10)`),
      shadow: S(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: t };
  }
}, Ge = () => {
  ut((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, Ze = ke.setup;
ke.setup = Ze ? (e, n) => (Ge(), Ze(e, n)) : Ge;
const os = (e) => (z("data-v-46c45785"), e = e(), q(), e), is = {
  key: 0,
  class: "loading"
}, us = /* @__PURE__ */ os(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ds = { class: "logo" }, cs = ["src"];
function fs(e, n, t, l, s, o) {
  return f(), P(dt, null, {
    default: ct(() => [
      t.active ? (f(), g("div", is, [
        us,
        i("div", ds, [
          i("sl-icon", { src: t.logo }, null, 8, cs)
        ])
      ])) : _("", !0)
    ]),
    _: 1
  });
}
const ms = /* @__PURE__ */ I(ke, [["render", fs], ["__scopeId", "data-v-46c45785"]]), le = $e("cartstore", () => {
  const e = new bt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = w({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} }
  });
  async function t() {
    await s();
  }
  async function l(m) {
    return await e.cart_list({ cart_key: m });
  }
  async function s() {
    (await e.cart_list()).forEach((p) => {
      p.is_root_node && (p.cart_type === "basket" ? n.basketRootNode = p : n.whishlistRootNodes.push(p));
    });
  }
  async function o(m, p) {
    let v = await e.article_add({
      article_key: m,
      parent_cart_key: p
    });
    console.log("addToCart", v);
  }
  async function a(m, p) {
    let v = await e.article_view({
      article_key: m,
      parent_cart_key: p
    });
    console.log("getArticleView", v);
  }
  async function u(m, p) {
    let v = await e.article_remove({
      article_key: m,
      parent_cart_key: p
    });
    console.log("remove Resp", v);
  }
  async function r(m, p, v) {
    let k = await e.article_update({
      article_key: m,
      parent_cart_key: p,
      quantity: v,
      quantity_mode: "replace"
    });
    console.log("update Resp", k);
  }
  async function d() {
    let m = await e.address_structure();
    n.structure.address = m.addSkel, console.log("adress add", n.structure.address);
  }
  async function c(m) {
    await e.discount_add({ code: m });
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: a,
    removeItem: u,
    updateItem: r,
    init: t,
    getAdressStructure: d,
    getChildren: l,
    addDiscount: c
  };
}), gs = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (f(), g("pre", null, O(e.node.name), 1));
  }
}, he = (e) => (z("data-v-8a06be60"), e = e(), q(), e), hs = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, bs = ["src"], vs = { class: "viur-shop-cart-leaf-headline headline" }, ps = { class: "viur-shop-cart-leaf-artno" }, ys = ["innerHTML"], $s = { class: "viur-shop-cart-leaf-actions" }, Ss = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), _s = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), ks = [
  _s
], ws = { class: "viur-shop-cart-leaf-quantity" }, Es = { class: "viur-shop-cart-leaf-unitprice" }, As = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), Is = ["value"], Cs = { class: "viur-shop-cart-leaf-price" }, Os = /* @__PURE__ */ he(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), js = ["value"], Bs = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: n }) {
    const t = e, l = n, s = w({
      leaf: {}
    });
    function o(r) {
      return r !== void 0 ? ht.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function a(r, d, c, m) {
      l("updateItem", {
        item: r,
        articleKey: d,
        node: c,
        quantity: m
      });
    }
    function u(r, d, c) {
      l("removeItem", { item: r, articleKey: d, node: c });
    }
    return ee(() => {
      s.leaf = t.leaf;
    }), (r, d) => (f(), g("sl-card", hs, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(s.leaf.shop_image ? s.leaf.shop_image : void 0)
      }, null, 8, bs),
      i("h4", vs, O(s.leaf.shop_name), 1),
      i("h5", ps, O(s.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: s.leaf.shop_description
      }, null, 8, ys),
      i("div", $s, [
        Ss,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[0] || (d[0] = (c) => u(s.leaf, s.leaf.article.dest.key, e.node))
        }, ks)
      ]),
      i("div", ws, [
        J(i("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": d[1] || (d[1] = (c) => s.leaf.quantity = c),
          onInput: d[2] || (d[2] = (c) => a(
            s.leaf,
            s.leaf.article.dest.key,
            e.node,
            s.leaf.quantity
          ))
        }, null, 544), [
          [re, s.leaf.quantity]
        ])
      ]),
      i("div", Es, [
        As,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, Is)
      ]),
      i("div", Cs, [
        Os,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, js)
      ])
    ]));
  }
}, Ds = /* @__PURE__ */ I(Bs, [["__scopeId", "data-v-8a06be60"]]), Ns = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Rs = { key: 0 }, Vs = { key: 0 }, Ls = { key: 1 }, Us = {
  __name: "Discount",
  setup(e) {
    const n = le(), t = F(null), l = F(null), s = w({
      errorMessage: ""
    });
    function o() {
      l.value.hide();
      const a = t.value.value;
      if (!a) {
        l.value.show(), s.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      n.addDiscount(a);
    }
    return (a, u) => (f(), g(E, null, [
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
          Ns,
          C(" " + O(s.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        U(n).state.basketRootNode.discount ? (f(), g("div", Rs, [
          U(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (f(), g("span", Vs, " Sie haben einen Rabattcode im Wert von " + O(U(n).state.basketRootNode.discount.dest.absolute) + " € eingegeben ", 1)) : _("", !0),
          U(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (f(), g("span", Ls, " Sie haben einen Rabattcode im Wert von " + O(U(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : _("", !0)
        ])) : _("", !0)
      ])
    ], 64));
  }
}, H = (e) => (z("data-v-6b213382"), e = e(), q(), e), Ts = { key: 0 }, Ps = /* @__PURE__ */ H(() => /* @__PURE__ */ i("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Ms = {
  class: "footer-wrap",
  slot: "footer"
}, Ws = { class: "viur-shop-cart-node" }, zs = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), qs = { key: 0 }, Fs = /* @__PURE__ */ H(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Ks = /* @__PURE__ */ H(() => /* @__PURE__ */ i("br", null, null, -1)), Hs = { class: "viur-shop-cart-sidebar-info-line" }, Gs = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Zs = { class: "viur-shop-cart-sidebar-info-line" }, Js = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Qs = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ C(" 0 € ")
], -1)), Ys = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ C(" € ")
], -1)), Xs = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
], -1)), xs = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), el = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(e) {
    const n = e, t = le(), l = F(null), s = w({
      itemsIsInit: S(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    S(() => n.mode === "basket" ? t.state.basketRootNode.key : n.cartKey);
    async function o() {
      await t.updateItem(
        s.currentItem.article.dest.key,
        s.currentNode.key,
        0
      ), await d(), l.value.hide();
    }
    async function a(m) {
      console.log("updateItem :", m), m.quantity === 0 ? (l.value.show(), s.currentItem = m.item, s.currentNode = m.node) : (await t.updateItem(m.articleKey, m.node.key, m.quantity), await t.init());
    }
    function u(m) {
      console.log("removeItem :", m), l.value.show(), s.currentItem = m.item, s.currentNode = m.node;
    }
    async function r() {
      s.leaves[s.currentNode.key].forEach((m) => {
        m.key === s.currentItem.key && (m.quantity = 1);
      }), s.currentItem = {}, s.currentNode = {};
    }
    async function d() {
      s.nodes = [], s.leaves = {}, await t.init(), await c();
    }
    async function c(m = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", m);
      const p = await t.getChildren(m);
      console.log("getChildren children: ", p), p.forEach(async (v) => {
        v.skel_type === "node" ? (s.nodes.push(v), await c(v.key)) : (Object.keys(s.leaves).includes(m) || (s.leaves[m] = []), s.leaves[m].push(v));
      });
    }
    return ee(async () => {
      await t.init(), await c(), n.mode === "basket" && s.nodes.push(t.state.basketRootNode), console.log("state.nodes test", s.nodes), console.log("state.leaves", s.leaves);
    }), (m, p) => e.cartKey.length ? (f(), g(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: r
      }, [
        Ps,
        i("div", Ms, [
          i("sl-button", {
            variant: "danger",
            onClick: p[0] || (p[0] = (v) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (f(!0), g(E, null, T(s.nodes, (v) => (f(), g("div", Ws, [
        Object.keys(s.leaves).includes(v.key) ? (f(), g(E, { key: 0 }, [
          Oe(gs, { node: v }, null, 8, ["node"]),
          (f(!0), g(E, null, T(s.leaves[v.key], (k) => (f(), P(Ds, {
            key: k.key,
            leaf: k,
            node: v,
            onRemoveItem: u,
            onUpdateItem: a
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : _("", !0)
      ]))), 256)),
      zs,
      e.sidebar ? (f(), P(Qe, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (f(), g("div", qs, [
          Fs,
          Ks,
          i("div", Hs, [
            Gs,
            C(" " + O(e.mode === "basket" ? U(t).state.basketRootNode.total : U(t).state.whishlistRootNodes[e.cartKey].total) + " € ", 1)
          ]),
          i("div", Zs, [
            Js,
            C(" " + O(U(t).state.basketRootNode.total - U(t).state.basketRootNode.total_discount_price) + " € ", 1)
          ]),
          Qs,
          Ys,
          Xs
        ])) : _("", !0)
      ])) : _("", !0),
      Oe(Us),
      xs
    ], 64)) : (f(), g("sl-spinner", Ts));
  }
}, we = /* @__PURE__ */ I(el, [["__scopeId", "data-v-6b213382"]]), tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), Q = (e) => (z("data-v-b7b745be"), e = e(), q(), e), nl = {
  key: 1,
  class: "list"
}, al = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), sl = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("br", null, null, -1)), ll = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), rl = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), ol = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), il = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("br", null, null, -1)), ul = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), dl = /* @__PURE__ */ Q(() => /* @__PURE__ */ i("br", null, null, -1)), cl = { class: "viur-shop-cart-sidebar-btn-wrap" }, fl = ["variant", "disabled"], ml = {
  __name: "ConfirmView",
  setup(e) {
    const n = le(), t = w({
      cartIsInit: S(() => !0),
      itemsIsInit: S(() => {
        var s;
        return !!((s = n.state) != null && s.carts[n.state.basket].items);
      }),
      images: {},
      showOrderButton: !1
    });
    function l(s) {
      s.target.checked && (t.showOrderButton = !0), s.target.checked || (t.showOrderButton = !1);
    }
    return ee(async () => {
      await n.init();
    }), (s, o) => t.cartIsInit ? (f(), g("div", nl, [
      al,
      sl,
      ll,
      rl,
      ol,
      il,
      (f(), P(Qe, { to: "#order_sidebar" }, [
        ul,
        dl,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", cl, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, fl)
        ])
      ]))
    ])) : (f(), P(ms, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ I(ml, [["__scopeId", "data-v-b7b745be"]]), gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" })), hl = (e) => (z("data-v-9ad63f5e"), e = e(), q(), e), bl = { class: "bind viur-shop-wrap" }, vl = ["panel", "disabled"], pl = { class: "viur-shop-order-step" }, yl = ["name", "library"], $l = { class: "viur-shop-order-status-text" }, Sl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, _l = ["name"], kl = ["onClick"], wl = ["onClick"], El = /* @__PURE__ */ hl(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), Al = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: !0
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: n }) {
    const t = e, l = n, s = w({
      tabNames: S(() => a(t.tabs)),
      isFirstTab: (c) => c === 0
    }), o = F(null);
    function a(c) {
      let m = [], p = [];
      for (const v in c)
        c[v].position ? m.push([v, c[v].position]) : m.push([v, 0]);
      return m.sort((v, k) => v[1] - k[1]), m.forEach((v) => {
        p.push(v[0]);
      }), p;
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
    return (c, m) => (f(), g("div", bl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (f(!0), g(E, null, T(s.tabNames, (p, v) => (f(), g("sl-tab", {
          class: "viur-shop-order-tab",
          slot: "nav",
          panel: p,
          key: p,
          disabled: e.tabs[p].disabled
        }, [
          i("div", pl, [
            i("sl-icon", {
              class: "viur-shop-order-step-icon",
              name: e.tabs[p].icon.name,
              library: e.tabs[p].icon.library
            }, null, 8, yl),
            i("div", $l, O(v + 1) + ". " + O(e.tabs[p].displayName), 1)
          ]),
          v < s.tabNames.length - 1 ? (f(), g("sl-icon", Sl)) : _("", !0)
        ], 8, vl))), 128)),
        (f(!0), g(E, null, T(s.tabNames, (p, v) => (f(), g("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: p,
          key: p
        }, [
          (f(), P(ft(e.tabs[p].component), mt({ ref_for: !0 }, e.tabs[p].props ? e.tabs[p].props : ""), null, 16)),
          v !== s.tabNames.length - 1 ? (f(), g("div", {
            key: 0,
            class: ye(["viur-shop-form-footer", { "flex-end": s.isFirstTab(v) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (k) => r(s.tabNames[v - 1])
            }, " Zurück ", 8, kl), [
              [ve, v !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (k) => d(s.tabNames[v + 1])
            }, " Weiter ", 8, wl)
          ], 2)) : _("", !0)
        ], 8, _l))), 128))
      ], 544),
      El
    ]));
  }
}, Il = /* @__PURE__ */ I(Al, [["__scopeId", "data-v-9ad63f5e"]]), ie = (e) => (z("data-v-8f9cefcd"), e = e(), q(), e), Cl = { class: "bind" }, Ol = /* @__PURE__ */ ie(() => /* @__PURE__ */ i("h1", { class: "headline" }, "Vielen Dank für Ihre Bestellung", -1)), jl = /* @__PURE__ */ ie(() => /* @__PURE__ */ i("br", null, null, -1)), Bl = /* @__PURE__ */ ie(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ C(" 123345670 ")
], -1)), Dl = { class: "paragraph" }, Nl = /* @__PURE__ */ ie(() => /* @__PURE__ */ i("br", null, null, -1)), Rl = { class: "btn-wrap" }, Vl = /* @__PURE__ */ ie(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Ll = {
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
    return (t, l) => (f(), g("div", Cl, [
      Ol,
      jl,
      Bl,
      i("p", Dl, [
        C(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
        Nl,
        C(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
        i("div", Rl, [
          Vl,
          i("sl-button", {
            variant: "primary",
            onClick: l[0] || (l[0] = (s) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Ul = /* @__PURE__ */ I(Ll, [["__scopeId", "data-v-8f9cefcd"]]), Ae = (e) => (z("data-v-b68a2bfa"), e = e(), q(), e), Tl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Pl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Ml = { key: 0 }, Wl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), zl = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = le(), t = w({
      formValues: {},
      requiredFieldsFilled: S(() => {
        if (t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("billing.city") && Object.keys(t.formValues).includes("billing.street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
        if (!t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      addSkel: null,
      errors: {}
    });
    function l(a) {
      a.target.checked && (t.isCustomAdress = !1), a.target.checked || (t.isCustomAdress = !0);
    }
    function s(a, u) {
      for (const [r, d] of Object.entries(u.value[0]))
        t.formValues[r] = d;
    }
    function o(a) {
      let u = {};
      return Array.isArray(a) ? (a.forEach((r) => {
        let d = r[0], c = r[1];
        u[d] = c;
      }), console.log("output", u), u) : a;
    }
    return ae(t.formValues, (a) => {
      Object.entries(a).forEach(([u, r]) => {
        r === "" && delete t.formValues[u];
      });
    }), ee(async () => {
      await n.getAdressStructure(), t.addSkel = o(n.state.structure.address);
    }), (a, u) => {
      const r = se("bone");
      return f(), g(E, null, [
        i("div", null, [
          C(" test "),
          Tl,
          (f(!0), g(E, null, T(t.addSkel, (d, c) => (f(), g(E, { key: c }, [
            C(O(c) + " ", 1),
            d.visible && d.params.group === "Customer Info" ? (f(), P(r, {
              key: 0,
              is: U(x)(d.type),
              name: c,
              structure: o(t.addSkel),
              errors: t.errors[c] ? t.errors[c] : [],
              skel: t.formValues,
              onChange: (m) => s(c, m),
              class: "viur-shop-form-grid-w-2"
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        i("div", null, [
          Pl,
          (f(!0), g(E, null, T(t.addSkel, (d, c) => (f(), g(E, { key: c }, [
            d.visible && d.params.group === "Customer Address" ? (f(), P(r, {
              key: 0,
              is: U(x)(d.type),
              name: c,
              structure: o(t.addSkel),
              errors: t.errors[c] ? t.errors[c] : [],
              skel: t.formValues,
              onChange: (m) => s(c, m)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        t.isCustomAdress ? (f(), g("div", Ml, [
          Wl,
          (f(!0), g(E, null, T(t.addSkel, (d, c) => (f(), g(E, { key: c }, [
            d.visible && d.params.group === "Customer Address" ? (f(), P(r, {
              key: 0,
              is: U(x)(d.type),
              name: c,
              structure: o(t.addSkel),
              errors: t.errors[c] ? t.errors[c] : [],
              skel: t.formValues,
              onChange: (m) => s(c, m)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ])) : _("", !0),
        i("sl-checkbox", {
          onSlChange: l,
          checked: ""
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ql = /* @__PURE__ */ I(zl, [["__scopeId", "data-v-b68a2bfa"]]), te = (e) => (z("data-v-a4accf28"), e = e(), q(), e), Fl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Hl = ["onSlChange", "onSlClear", "label"], Gl = ["value"], Zl = { key: 0 }, Jl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ql = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), Yl = [
  Ql
], Xl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), xl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), er = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), tr = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = le(), t = w({
      formValues: {},
      requiredFieldsFilled: S(() => {
        if (t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("billing.city") && Object.keys(t.formValues).includes("billing.street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
        if (!t.isCustomAdress)
          return Object.keys(t.formValues).includes("city") && Object.keys(t.formValues).includes("street") && Object.keys(t.formValues).includes("email") && Object.keys(t.formValues).includes("firstname") && Object.keys(t.formValues).includes("lastname");
      }),
      isCustomAdress: !1,
      shippingAdressAmount: 1,
      maxShippingAdress: S(
        () => Object.keys(n.state.carts).length + 2
      ),
      amountAlert: { title: "", msg: "" },
      items: null,
      addSkel: null,
      errors: {},
      selectedItem: {},
      isInit: S(() => !!n.state.carts[n.state.basket])
    }), l = F(null), s = F(null);
    function o(p) {
      p.target.checked && (t.isCustomAdress = !1), p.target.checked || (t.isCustomAdress = !0);
    }
    function a() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie können nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, s.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(p, v) {
      for (const [k, h] of Object.entries(v.value[0]))
        t.formValues[k] = h;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", s.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(p, v) {
      if (console.log(p.target.value), !p.target.value.length) {
        c();
        return;
      }
      t.selectedItem[v] = p.target.value, t.isItemSelected = !0;
    }
    function c(p, v) {
      console.log("clearing..."), delete t.selectedItem[v], t.isItemSelected = !1;
    }
    function m(p) {
      let v = {};
      return Array.isArray(p) ? (p.forEach((k) => {
        let h = k[0], b = k[1];
        v[h] = b;
      }), v) : p;
    }
    return ae(t.formValues, (p) => {
      Object.entries(p).forEach(([v, k]) => {
        k === "" && delete t.formValues[v];
      });
    }), ee(async () => {
      await n.getAdressStructure(), t.addSkel = m(n.state.structure.address);
    }), (p, v) => {
      const k = se("bone");
      return f(), g(E, null, [
        i("div", null, [
          Fl,
          (f(!0), g(E, null, T(t.addSkel, (h, b) => (f(), g(E, { key: b }, [
            h.visible && h.params.group === "Customer Info" ? (f(), P(k, {
              key: 0,
              is: U(x)(h.type),
              name: b,
              structure: m(t.addSkel),
              errors: t.errors[b] ? t.errors[b] : [],
              skel: t.formValues,
              onChange: (y) => u(b, y),
              class: "viur-shop-form-grid-w-2"
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        Kl,
        (f(!0), g(E, null, T(t.shippingAdressAmount, (h) => (f(), g("div", { key: h }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (b) => d(b, h),
            onSlClear: (b) => c(b, h),
            label: t.selectedItem[h] ? U(n).state.carts[t.selectedItem[h]].info.name : "Warenkorb für Adresse wählen.",
            class: "grid-w-4"
          }, [
            (f(!0), g(E, null, T(U(n).state.carts, (b, y) => (f(), g("sl-option", { value: y }, O(b.info.name), 9, Gl))), 256))
          ], 40, Hl),
          (f(!0), g(E, null, T(t.addSkel, (b, y) => (f(), g(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (f(), P(k, {
              key: 0,
              is: U(x)(b.type),
              name: y,
              structure: m(t.addSkel),
              errors: t.errors[y] ? t.errors[y] : [],
              skel: t.formValues,
              onChange: ($) => u(y, $)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (f(), g("div", Zl, [
          Jl,
          (f(!0), g(E, null, T(t.addSkel, (h, b) => (f(), g(E, { key: b }, [
            h.visible && h.params.group === "Customer Address" ? (f(), P(k, {
              key: 0,
              is: U(x)(h.type),
              name: b,
              structure: m(t.addSkel),
              errors: t.errors[b] ? t.errors[b] : [],
              skel: t.formValues,
              onChange: (y) => u(b, y)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ])) : _("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: r,
            title: "Lieferadresse entfernen"
          }, Yl),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: a
          }, [
            Xl,
            C(" Lieferadresse hinzufügen ")
          ])
        ]),
        i("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: s,
          closable: ""
        }, [
          xl,
          i("strong", null, O(t.amountAlert.title), 1),
          er,
          C(" " + O(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: ""
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, nr = /* @__PURE__ */ I(tr, [["__scopeId", "data-v-a4accf28"]]), tt = {
  __name: "ExampleUsage",
  setup(e) {
    const n = le(), t = S(
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
          icon: { name: "cart", library: "hsk" },
          position: 2,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        confirm: {
          component: G(Ee),
          props: {},
          displayName: "Bestellung prüfen",
          icon: { name: "order-check", library: "hsk" },
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
          component: G(Ul),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "order-confirmed", library: "hsk" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: G(ql),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "user", library: "hsk" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: G(nr),
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
    function s(o) {
      (o == null ? void 0 : o.detail.name) === "confirm" && (l.tabs.orderComplete.disabled = !1);
    }
    return ee(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, a) => (f(), P(Il, {
      tabs: l.tabs,
      onTabChange: s
    }, null, 8, ["tabs"]));
  }
}, ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tt
}, Symbol.toStringTag, { value: "Module" })), sr = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = vt();
    return { state: w({}), route: t };
  }
}), lr = { class: "home" };
function rr(e, n, t, l, s, o) {
  return f(), g("div", lr, "View " + O(e.route.path) + " is missing.", 1);
}
const or = /* @__PURE__ */ I(sr, [["render", rr]]), ir = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: or
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-pWeLEDTV.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-CN7jCduA.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => tl)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => ar)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => gl)
  }
];
function vr(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(ir), pt({
    // @ts-ignore
    history: yt("/"),
    routes: t
  });
}
const ur = gt(), pr = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", tt), e.component("ConfirmView", Ee), e.use(ur);
  }
};
export {
  we as C,
  pr as V,
  I as _,
  tt as a,
  Ee as b,
  vr as c,
  le as u
};
