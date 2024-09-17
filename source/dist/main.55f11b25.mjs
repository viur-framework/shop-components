var tt = Object.defineProperty;
var nt = (e, n, t) => n in e ? tt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ie = (e, n, t) => (nt(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, inject as I, reactive as w, openBlock as m, createElementBlock as p, normalizeClass as G, createElementVNode as i, renderSlot as Ke, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as $, toDisplayString as j, onMounted as R, ref as M, readonly as st, getCurrentScope as at, onScopeDispose as lt, unref as L, computed as k, watchEffect as ce, renderList as U, watch as se, withDirectives as J, vModelText as oe, getCurrentInstance as ot, resolveComponent as ae, createBlock as T, vShow as ve, withModifiers as de, createTextVNode as B, shallowRef as K, provide as ie, onBeforeMount as Q, useCssVars as rt, Transition as it, withCtx as ut, createVNode as he, Teleport as Ge, resolveDynamicComponent as dt, mergeProps as ct } from "vue";
import { defineStore as ye, createPinia as mt } from "pinia";
import Oe from "@viur/ckeditor5-build-classic";
import { ViURShopClient as ft } from "@viur/viur-shop-client";
import { Request as gt } from "@viur/vue-utils";
import { useRoute as pt, createRouter as ht, createWebHashHistory as bt } from "vue-router";
const vt = D({
  props: {
    isDragging: Boolean,
    draggingLineBottom: Boolean,
    draggingLineTop: Boolean
  },
  components: {},
  emits: ["change", "delete", "handleDragStart", "handleDragEnd", "handleDragOver", "handleDrop"],
  setup(e, n) {
    const t = I("boneState");
    return {
      state: w({
        isDraggable: !1
      }),
      boneState: t
    };
  }
});
const C = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
}, Ze = (e) => (z("data-v-141aaf9b"), e = e(), q(), e), _t = ["draggable"], yt = ["disabled"], $t = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), St = [
  $t
], kt = { class: "value" }, wt = ["disabled", "title"], Et = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), At = [
  Et
];
function Ct(e, n, t, a, l, o) {
  return m(), p("div", {
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
    }, St, 40, yt),
    i("div", kt, [
      Ke(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (s) => e.$emit("delete"))
    }, At, 8, wt)
  ], 42, _t);
}
const It = /* @__PURE__ */ C(vt, [["render", Ct], ["__scopeId", "data-v-141aaf9b"]]), Ot = D({
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
    const t = I("boneState");
    return {
      state: w({
        debug: !1
      }),
      boneState: t
    };
  }
});
const Bt = { class: "bone-name" }, jt = { key: 0 }, Dt = { class: "bone" };
function Vt(e, n, t, a, l, o) {
  return m(), p(E, null, [
    i("label", Bt, [
      Ke(e.$slots, "default", {}, void 0, !0),
      $("", !0)
    ]),
    e.state.debug ? (m(), p("div", jt, [
      i("div", Dt, j(e.name), 1),
      i("pre", null, "    " + j(e.boneState) + `
    `, 1)
    ])) : $("", !0)
  ], 64);
}
const Rt = /* @__PURE__ */ C(Ot, [["render", Vt], ["__scopeId", "data-v-b7149172"]]), Nt = D({
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
    const t = I("boneState"), a = w({});
    function l(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const Lt = ["disabled", "value"], Ut = ["disabled", "value"];
function Tt(e, n, t, a, l, o) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (m(), p("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Lt)) : (m(), p("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ut));
}
const _e = /* @__PURE__ */ C(Nt, [["render", Tt], ["__scopeId", "data-v-0ebe5f0b"]]), Pt = D({
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
    function a(l) {
      n.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: a
    };
  }
});
const Mt = ["value"];
function Wt(e, n, t, a, l, o) {
  return m(), p("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Mt);
}
const Be = /* @__PURE__ */ C(Pt, [["render", Wt], ["__scopeId", "data-v-b45a1311"]]);
function zt(e) {
  return at() ? (lt(e), !0) : !1;
}
function qt(e) {
  return typeof e == "function" ? e() : L(e);
}
const Ft = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: a = !0
  } = t, l = M(!1);
  let o = null;
  function s() {
    o && (clearTimeout(o), o = null);
  }
  function u() {
    l.value = !1, s();
  }
  function r(...d) {
    s(), l.value = !0, o = setTimeout(() => {
      l.value = !1, o = null, e(...d);
    }, qt(n));
  }
  return a && (l.value = !0, Ft && r()), zt(u), {
    isPending: st(l),
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
      return n.values.filter((a) => a[0] === t)[0][1];
    } catch {
      return "-";
    }
  }
  static unescape(n) {
    return n || (n = ""), String(n).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#61;/g, "=").replace(/&#039;/g, "'").replace(/&#040;/g, "(").replace(/&#041;/g, ")").replace(/&#061;/g, "=");
  }
  static formatString(n, t) {
    function a(s) {
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
    let l = a(n), o = [];
    Array.isArray(t) || (t = [t]);
    for (let s of t) {
      let u = n;
      for (let r of l) {
        let d = r.split("."), c = s;
        for (let b of d)
          c && c !== "-" && b in c && c[b] ? c = c[b] : c = "-";
        c = this.unescape(c), u = u.replace("$(" + r + ")", c);
      }
      o.push(u);
    }
    return o.join(", ");
  }
}
const Kt = D({
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
    const t = I("boneState"), a = w({
      value: k(() => e.value)
    }), l = M(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return ce(() => {
      if (e.autofocus && l.value && l.value !== null && l !== null) {
        const { start: s } = me(() => {
          l.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      Utils: Ht,
      boneState: t,
      changeEvent: o,
      stringBone: l
    };
  }
});
const Gt = ["disabled", "value", "required"];
function Zt(e, n, t, a, l, o) {
  return m(), p("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Gt);
}
const je = /* @__PURE__ */ C(Kt, [["render", Zt], ["__scopeId", "data-v-1ccbacc0"]]), Jt = D({
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
    const t = I("boneState"), a = w({}), l = M(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return ce(() => {
      if (e.autofocus && l.value && l.value !== null && l !== null) {
        const { start: s } = me(() => {
          l.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: o,
      emailBone: l
    };
  }
});
const Qt = ["disabled", "value"];
function Yt(e, n, t, a, l, o) {
  return m(), p("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Qt);
}
const De = /* @__PURE__ */ C(Jt, [["render", Yt], ["__scopeId", "data-v-4328e024"]]), Xt = D({
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
    const t = I("boneState"), a = w({
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
    function l(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const xt = ["disabled", "type", "value"];
function en(e, n, t, a, l, o) {
  return m(), p("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, xt);
}
const Ve = /* @__PURE__ */ C(Xt, [["render", en], ["__scopeId", "data-v-f1b8af8c"]]), tn = D({
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
    const t = I("boneState"), a = w({
      value: k(() => {
        let s = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? s = s.filter((u) => t.bonestructure.values.map((r) => r[0].toString()).includes(u)) : s = s.filter(
          (u) => Object.keys(t.bonestructure.values).map((r) => r.toString()).includes(u)
        ), s.map((u) => u.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function l() {
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
      n.emit("change", e.name, a.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: o,
      convertObjToList: l
    };
  }
});
const nn = ["disabled", "value", "multiple"], sn = ["value"];
function an(e, n, t, a, l, o) {
  return m(), p("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), p(E, null, U(e.convertObjToList(), (s) => (m(), p("sl-option", {
      key: s[0],
      value: s[0]
    }, j(s[1]), 9, sn))), 128))
  ], 40, nn);
}
const Re = /* @__PURE__ */ C(tn, [["render", an], ["__scopeId", "data-v-5a38b97f"]]), ln = D({
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
    const t = I("boneState"), a = w({
      value: k(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function l(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return R(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const on = ["disabled", "checked"];
function rn(e, n, t, a, l, o) {
  return m(), p("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, on);
}
const Ne = /* @__PURE__ */ C(ln, [["render", rn], ["__scopeId", "data-v-363598c8"]]), un = D({
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
    const t = I("boneState"), a = w({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), l = M(null);
    function o(u) {
      a.value1 === a.value2 ? a.equal = !0 : a.equal = !1, s(a.value1), a.requiredPasswordInfo.length === 0 && a.passwordInfo.length - a.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, a.value1, e.lang, e.index, !0) : n.emit("change", e.name, a.value1, e.lang, e.index, !1);
    }
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      a.passwordInfo = [], a.requiredPasswordInfo = [];
      for (const r of t.bonestructure.tests)
        new RegExp(r[0]).test(u) || (r[2] ? a.requiredPasswordInfo.push(r[1]) : a.passwordInfo.push(r[1]));
      a.equal || a.requiredPasswordInfo.push("Die eingegebenen Passw\xF6rter stimmen nicht \xFCberein."), a.value1 || a.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return ce(() => {
      if (e.autofocus && l.value && l.value !== null && l !== null) {
        const { start: u } = me(() => {
          l.value.focus();
        }, 600);
        u();
      }
    }), se(
      () => e.value,
      (u, r) => {
        a.value1 = u;
      }
    ), {
      state: a,
      boneState: t,
      changeEvent: o,
      passwordBone: l
    };
  }
});
const dn = ["disabled"], cn = ["name"], mn = ["name"], fn = { class: "errors" };
function gn(e, n, t, a, l, o) {
  return m(), p(E, null, [
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
      }, null, 8, cn)
    ], 42, dn), [
      [oe, e.state.value1]
    ]),
    e.boneState.readonly ? $("", !0) : J((m(), p("sl-input", {
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
      }, null, 8, mn)
    ], 544)), [
      [oe, e.state.value2]
    ]),
    i("ul", fn, [
      (m(!0), p(E, null, U(e.state.passwordInfo, (s, u) => (m(), p("li", { key: u }, j(s), 1))), 128)),
      (m(!0), p(E, null, U(e.state.requiredPasswordInfo, (s, u) => (m(), p("li", {
        key: u,
        class: "requiredInfo"
      }, j(s), 1))), 128))
    ])
  ], 64);
}
const Le = /* @__PURE__ */ C(un, [["render", gn], ["__scopeId", "data-v-0ccf18c0"]]), pn = D({
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
    const t = I("boneState"), a = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [b, v] of Object.entries(a.structure)) {
          let g = "default", _ = a.structure[b], f = (d = a.value) == null ? void 0 : d[b];
          (c = v == null ? void 0 : v.params) != null && c.category && (g = v.params.category.toLowerCase()), Object.keys(u).includes(g) ? u[g].bones.push({
            boneName: b,
            boneStructure: _,
            boneValue: f
          }) : u[g] = {
            name: v.params.category,
            bones: [
              {
                boneName: b,
                boneStructure: _,
                boneValue: f
              }
            ]
          }, _.visible === !0 && (u[g].groupVisible = !0);
        }
        let r = {};
        return Object.keys(u).sort().forEach(function(b) {
          r[b] = u[b];
        }), r;
      })
    });
    function l(u) {
      n.emit("change", u);
    }
    R(() => {
      ot().appContext.components.Bone ? a.globalRegistration = !0 : a.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
      state: a,
      boneState: t,
      getBoneWidget: x,
      structureToDict: s,
      changeEvent: l,
      updateValue: o
    };
  }
});
const hn = {
  key: 0,
  open: "",
  variant: "danger"
}, bn = {
  key: 1,
  class: "form"
}, vn = ["summary", "open"];
function _n(e, n, t, a, l, o) {
  const s = ae("bone");
  return e.state.globalRegistration ? (m(), p("div", bn, [
    (m(!0), p(E, null, U(e.state.formGroups, (u, r) => J((m(), p("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), p(E, null, U(u.bones, (d) => J((m(), T(s, {
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
    ], 8, vn)), [
      [ve, u.groupVisible]
    ])), 128))
  ])) : (m(), p("sl-alert", hn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Je = /* @__PURE__ */ C(pn, [["render", _n], ["__scopeId", "data-v-e6fcfbca"]]), yn = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Je },
  emits: ["change"],
  setup(e, n) {
    const t = I("boneState"), a = w({
      value: {},
      index: k(() => e.index),
      lang: k(() => e.lang)
    });
    function l(o) {
      var u;
      (u = a.value) != null && u[o.name] || (a.value ? a.value[o.name] = null : a.value = { [o.name]: null });
      let s = a.value[o.name];
      o.lang ? (s === null && (s = {}), Object.keys(s).includes(o.lang) && o.index !== null ? s[o.lang][o.index] = o.value : s[o.lang] = o.value) : o.index !== null ? (s === null && (s = []), s[o.index] = o.value) : s = o.value, a.value[o.name] = s, n.emit("change", e.name, a.value, e.lang, e.index, !0);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
function $n(e, n, t, a, l, o) {
  const s = ae("Wrapper_nested");
  return m(), T(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Ue = /* @__PURE__ */ C(yn, [["render", $n], ["__scopeId", "data-v-84a761ce"]]), Sn = D({
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
    const t = I("boneState"), a = w({});
    function l(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const kn = ["disabled", "value"];
function wn(e, n, t, a, l, o) {
  return m(), p("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, kn);
}
const Te = /* @__PURE__ */ C(Sn, [["render", wn], ["__scopeId", "data-v-534b9149"]]), En = D({
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
    const t = I("boneState"), a = w({
      minAmount: k(() => t.bonestructure.minAmount),
      maxAmount: k(() => t.bonestructure.maxAmount),
      precision: k(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), l = M(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return ce(() => {
      if (e.autofocus && l.value && l.value !== null && l !== null) {
        const { start: s } = me(() => {
          l.value.focus();
        }, 600);
        s();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: o,
      numericBone: l
    };
  }
});
const An = ["disabled", "value", "min", "max", "step"], Cn = { class: "info" }, In = { key: 0 }, On = { key: 1 }, Bn = { key: 2 };
function jn(e, n, t, a, l, o) {
  return m(), p(E, null, [
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
    }, null, 40, An),
    i("ul", Cn, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), p("li", In, j(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : $("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), p("li", On, j(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : $("", !0),
      e.state.precision ? (m(), p("li", Bn, j(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : $("", !0)
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ C(En, [["render", jn], ["__scopeId", "data-v-03d5b399"]]);
class ue extends Error {
  constructor(n, t, a, l) {
    super(a || t), arguments.length >= 4 && l && Object.assign(this, l), this.statusText = t, this.statusCode = n, this.response = l;
  }
}
let be = null;
function X() {
  return be || (be = ye("requestStore", () => {
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
class O {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = ({ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL ? { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: a = null, failedCallback: l = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
    function r() {
      if (t instanceof FormData)
        return t;
      const c = new FormData();
      for (const b in t)
        if (Array.isArray(t[b]))
          for (let v of t[b])
            c.append(b, v);
        else
          c.append(b, t[b]);
      return c;
    }
    let d = re.post(O.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      a && a(c.data);
    }).catch(function(c) {
      l && l(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json") {
    await O.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (a) => {
      let l = await a.json();
      Array.isArray(l) || (l = [l]), X().state.sKeys = new Set(l);
    });
  }
  static async securePost(n, {
    dataObj: t = null,
    callback: a = null,
    failedCallback: l = null,
    abortController: o = null,
    renderer: s = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let c = null;
    X().state.sKeys.size === 0 && await O.getBatchSkeys(d);
    const b = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", b), X().state.sKeys.delete(b)) : (t || (t = {}), t.skey = b, X().state.sKeys.delete(b)), c = O.post(n, {
      dataObj: t,
      callback: a,
      abortController: o,
      headers: u,
      mode: r
    }), c;
  }
  static get(n, {
    dataObj: t = null,
    callback: a = null,
    failedCallback: l = null,
    cached: o = !1,
    clearCache: s = !1,
    abortController: u = null,
    headers: r = null,
    mode: d = null,
    cacheTime: c = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let b = re.get(O.buildUrl(n), t, s, r, u, d);
    return b.then(function(v) {
      a && a(v.data);
    }).catch(function(v) {
      l && l(v);
    }), b;
  }
  static list(n, {
    dataObj: t = null,
    callback: a = null,
    failedCallback: l = null,
    group: o = null,
    abortController: s = null,
    renderer: u = ((d) => (d = ((r) => (r = import.meta) == null ? void 0 : r.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let c = `/${u}/${n}/list`;
    return o && (c += `/${o}`), O.get(c, {
      dataObj: t,
      callback: a,
      failedCallback: l,
      abortController: s
    });
  }
  static getStructure(n, {
    dataObj: t = null,
    callback: a = null,
    failedCallback: l = null,
    group: o = null,
    abortController: s = null,
    renderer: u = ((d) => (d = ((r) => (r = import.meta) == null ? void 0 : r.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let c = `/${u}/getStructure/${n}`;
    return o && (c += `/${o}`), O.get(c, {
      dataObj: t,
      callback: a,
      failedCallback: l,
      abortController: s
    });
  }
  static view(n, t, {
    dataObj: a = null,
    callback: l = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: r = ((c) => (c = ((d) => (d = import.meta) == null ? void 0 : d.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let b = `/${r}/${n}/view/${t}`;
    return s && (b = `/${r}/${n}/view/${s}/${t}`), O.get(b, {
      dataObj: a,
      callback: l,
      failedCallback: o,
      abortController: u
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: a = null,
    failedCallback: l = null,
    group: o = null,
    abortController: s = null,
    renderer: u = ((d) => (d = ((r) => (r = import.meta) == null ? void 0 : r.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let c = `/${u}/${n}/add`;
    return o && (c = `/${u}/${n}/add/${o}`), O.securePost(c, {
      dataObj: t,
      callback: a,
      failedCallback: l,
      abortController: s
    });
  }
  static edit(n, t, {
    dataObj: a = null,
    callback: l = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: r = ((c) => (c = ((d) => (d = import.meta) == null ? void 0 : d.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let b = `/${r}/${n}/edit/${t}`;
    return s && (b = `/${r}/${n}/edit/${s}/${t}`), O.securePost(b, {
      dataObj: a,
      callback: l,
      failedCallback: o,
      abortController: u
    });
  }
  static delete(n, t, {
    dataObj: a = null,
    callback: l = null,
    failedCallback: o = null,
    group: s = null,
    abortController: u = null,
    renderer: r = ((c) => (c = ((d) => (d = import.meta) == null ? void 0 : d.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let b = `/${r}/${n}/delete/${t}`;
    return s && (b = `/${r}/${n}/delete/${s}/${t}`), O.securePost(b, {
      dataObj: a,
      callback: l,
      failedCallback: o,
      abortController: u,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? O.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? O.buildUrl(n.dest.downloadUrl) : O.buildUrl(null) : O.buildUrl(n);
  }
  static uploadFile(n, t = void 0) {
    const a = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((l, o) => {
      O.securePost("/vi/file/getUploadURL", { dataObj: a }).then(async (s) => {
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
          O.securePost("/vi/file/add", { dataObj: d }).then(async (c) => {
            let b = await c.json();
            b.action === "addSuccess" ? l(b.values) : o(b);
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
class re {
  constructor() {
    Ie(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, a = null, l = null, o = null) {
    let s = { method: n };
    return s.credentials = "include", s.headers = {
      Accept: "application/json, text/plain, */*"
    }, a && (s.headers = { ...s.headers, ...a }), t && (s.body = t), l && (s.signal = l.signal), o && (s.mode = o), s;
  }
  static get(n, t = null, a = null, l = null, o = null, s = null) {
    function u(r, d) {
      let c = new URL(r);
      if (d && Object.keys(d).length > 0) {
        const b = new URLSearchParams();
        for (const [v, g] of Object.entries(d))
          if (Array.isArray(g))
            for (const _ of g)
              b.append(v, _);
          else
            b.append(v, g);
        c.search = b.toString();
      }
      return c.toString();
    }
    return fetch(u(n, t), re.buildOptions("GET", null, l, o, s)).then(async (r) => {
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
  static post(n, t = null, a = null, l = null, o = null, s = null) {
    return fetch(n, re.buildOptions("POST", t, l, o, s));
  }
}
const Dn = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Je },
  emits: ["change"],
  setup(e, n) {
    const t = I("boneState"), a = I("formatString"), l = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), O.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const b = await c.json();
        l.skellistdata = {};
        for (let g of b.skellist)
          l.skellistdata[g.key] = g;
        return (v = b.skellist) == null ? void 0 : v.map((g) => ({ text: a(t.bonestructure.format, { dest: g }), value: g.key, data: g }));
      });
    }
    function s(r) {
      l.selection = { dest: l.skellistdata[r.detail.item.value] }, n.emit("change", e.name, l.selection, e.lang, e.index);
    }
    function u(r) {
      var c;
      l.selection || (l.selection = {}), (c = l.selection.rel) != null && c[r.name] || (l.selection.rel ? l.selection.rel[r.name] = null : l.selection.rel = { [r.name]: null });
      let d = l.selection.rel[r.name];
      r.lang ? (d === null && (d = {}), Object.keys(d).includes(r.lang) && r.index !== null ? d[r.lang][r.index] = r.value : d[r.lang] = r.value) : r.index !== null ? (d === null && (d = []), d[r.index] = r.value) : d = r.value, Object.keys(l.selection).includes("rel") && l.selection.rel ? l.selection.rel[r.name] = d : l.selection.rel = { [r.name]: d }, Object.keys(l.selection).includes("dest") && n.emit("change", e.name, l.selection, e.lang, e.index);
    }
    return R(() => {
      l.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      formatString: a,
      changeEvent: s,
      changeEventNested: u,
      getList: o
    };
  }
});
const Vn = (e) => (z("data-v-61dd72e0"), e = e(), q(), e), Rn = { class: "record" }, Nn = { class: "single-entry" }, Ln = ["value"], Un = ["disabled", "source"], Tn = ["title"], Pn = /* @__PURE__ */ Vn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Mn = [
  Pn
];
function Wn(e, n, t, a, l, o) {
  var u, r;
  const s = ae("Wrapper_nested");
  return m(), p("div", Rn, [
    i("div", Nn, [
      e.state.selection ? (m(), p("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Ln)) : (m(), p("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Un)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), p("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Mn, 8, Tn)) : $("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (m(), T(s, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : $("", !0)
  ]);
}
const Me = /* @__PURE__ */ C(Dn, [["render", Wn], ["__scopeId", "data-v-61dd72e0"]]), zn = D({
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
    const t = I("boneState"), a = w({});
    function l(o, s) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const qn = { class: "box" };
function Fn(e, n, t, a, l, o) {
  return m(), p("div", qn, j(e.value), 1);
}
const Hn = /* @__PURE__ */ C(zn, [["render", Fn], ["__scopeId", "data-v-343aca69"]]), Kn = D({
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
    const t = I("boneState"), a = M(), l = w({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o() {
      console.log(O.downloadUrlFor(e.value)), window.open(O.downloadUrlFor(e.value));
    }
    function s() {
      return O.downloadUrlFor(e.value, !1);
    }
    function u(c) {
      const b = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, g) => {
        O.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: b }).then(async (_) => {
          let f = await _.json();
          fetch(f.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (h) => {
            const y = {
              key: f.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            O.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let A = await S.json();
              A.action === "addSuccess" ? v(A.values) : g(A);
            }).catch((S) => {
              g(S);
            });
          }).catch((h) => {
            g(h);
          });
        }).catch((_) => {
          g(_);
        });
      });
    }
    async function r(c) {
      l.loading = !0;
      for (let b of c.target.files) {
        let v = await u(b);
        a.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      l.loading = !1;
    }
    async function d(c) {
      l.loading = !0, l.droparea = !1;
      for (let b of c.dataTransfer.files) {
        let v = await u(b);
        a.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
        break;
      }
      l.loading = !1;
    }
    return {
      state: l,
      boneState: t,
      downloadFile: o,
      createBackgroundImage: s,
      handleUpload: r,
      uploadinput: a,
      handleDrop: d
    };
  }
});
const fe = (e) => (z("data-v-91086308"), e = e(), q(), e), Gn = {
  key: 0,
  class: "loader"
}, Zn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Jn = [
  Zn
], Qn = {
  key: 1,
  class: "droparea"
}, Yn = ["title"], Xn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), xn = [
  Xn
], es = ["multiple"], ts = ["title"], ns = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), ss = [
  ns
], as = { class: "box" }, ls = ["src"], os = ["label", "open"], rs = ["src"], is = {
  key: 1,
  class: "preview"
}, us = {
  key: 0,
  name: "file-earmark"
}, ds = { key: 2 }, cs = ["title"], ms = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), fs = [
  ms
];
function gs(e, n, t, a, l, o) {
  var s, u, r, d, c, b, v, g, _, f;
  return m(), p("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((h) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (h) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...h) => e.handleDrop && e.handleDrop(...h), ["prevent"]))
  }, [
    e.state.loading ? (m(), p("div", Gn, Jn)) : $("", !0),
    e.state.droparea ? (m(), p("div", Qn, " Dateien hier hinziehen ")) : $("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), p("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (h) => e.uploadinput.click())
    }, xn, 8, Yn)) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...h) => e.handleUpload && e.handleUpload(...h))
    }, null, 40, es),
    e.value ? (m(), p("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...h) => e.downloadFile && e.downloadFile(...h))
    }, ss, 8, ts)) : $("", !0),
    i("div", as, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), p("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (h) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, ls),
        i("sl-dialog", {
          label: decodeURIComponent((d = (r = e.value) == null ? void 0 : r.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, rs)
        ], 8, os)
      ])) : (m(), p("div", is, [
        (b = (c = e.value) == null ? void 0 : c.dest) != null && b.name ? (m(), p("sl-icon", us)) : $("", !0)
      ])),
      (g = (v = e.value) == null ? void 0 : v.dest) != null && g.name ? (m(), p("div", ds, j(decodeURIComponent((f = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : f.name)), 1)) : $("", !0)
    ]),
    e.boneState.multiple ? $("", !0) : (m(), p("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (h) => e.$emit("change", e.name, "", e.lang, e.index))
    }, fs, 8, cs))
  ], 32);
}
const We = /* @__PURE__ */ C(Kn, [["render", gs], ["__scopeId", "data-v-91086308"]]), ps = D({
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
    const t = I("boneState"), a = w({
      value: "",
      editorConfig: {},
      editor: k(() => Oe)
    });
    function l(u) {
      n.emit("change", e.name, a.value, e.lang, e.index);
    }
    function o(u) {
      a.value = u.target.value, n.emit("change", e.name, a.value, e.lang, e.index);
    }
    R(() => {
      e.value !== null && (a.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      u.editing.view.change((r) => {
        r.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return se(
      () => e.value,
      (u, r) => {
        a.value = u;
      }
    ), {
      state: a,
      ClassicEditor: Oe,
      boneState: t,
      changeEvent: l,
      onReady: s,
      changeEventTextarea: o
    };
  }
});
const hs = ["disabled", "value"];
function bs(e, n, t, a, l, o) {
  var u, r, d, c;
  const s = ae("ckeditor");
  return e.state.editor ? (m(), p(E, { key: 0 }, [
    ((u = e.boneState.bonestructure) == null ? void 0 : u.valid_html) || ((r = e.boneState.bonestructure) == null ? void 0 : r.validHtml) ? (m(), T(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (b) => e.state.value = b),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), p("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...b) => e.changeEventTextarea && e.changeEventTextarea(...b))
    }, null, 40, hs))
  ], 64)) : $("", !0);
}
const ze = /* @__PURE__ */ C(ps, [["render", bs]]), vs = D({
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
    const t = I("boneState"), a = w({
      valueLat: null,
      valueLng: null
    });
    function l() {
      n.emit("change", e.name, [a.valueLat, a.valueLng], e.lang, e.index);
    }
    return R(() => {
      try {
        a.valueLat = e.value[0], a.valueLng = e.value[1];
      } catch {
      }
      n.emit("change", e.name, [a.valueLat, a.valueLng], e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const _s = ["name", "min", "max", "disabled"], ys = ["name", "min", "max", "disabled"];
function $s(e, n, t, a, l, o) {
  return m(), p(E, null, [
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
      [oe, e.state.valueLat]
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
    }, null, 40, ys), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const qe = /* @__PURE__ */ C(vs, [["render", $s], ["__scopeId", "data-v-7bc31020"]]), Ss = D({
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
    const t = I("boneState"), a = w({
      counter: 0,
      debounce: null
    }), l = I("addMultipleEntry"), o = I("removeMultipleEntries");
    function s() {
      a.counter += 1;
      let r = 200;
      a.counter > 1 && (r = 500), a.debounce && clearTimeout(a.debounce), a.debounce = setTimeout(() => {
        for (let d = a.counter; d--; )
          l(e.lang);
        a.counter = 0;
      }, r);
    }
    function u() {
      let r = 200;
      a.debounce && clearTimeout(a.debounce), a.debounce = setTimeout(() => {
        o(e.lang);
      }, r);
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: a,
      boneState: t,
      handleAdd: s,
      handleRemove: u,
      removeMultipleEntries: o
    };
  }
});
const Qe = (e) => (z("data-v-63e75dee"), e = e(), q(), e), ks = { class: "actionbar" }, ws = ["title"], Es = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), As = [
  Es
], Cs = ["title"], Is = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Os(e, n, t, a, l, o) {
  return m(), p("div", ks, [
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, As, 8, ws)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Is,
      B(" " + j(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), p(E, { key: 0 }, [
        B("(" + j(e.state.counter) + ")", 1)
      ], 64)) : $("", !0)
    ], 8, Cs)) : $("", !0)
  ]);
}
const Bs = /* @__PURE__ */ C(Ss, [["render", Os], ["__scopeId", "data-v-63e75dee"]]), js = D({
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
    const t = I("boneState"), a = I("addMultipleEntry"), l = I("formatString"), o = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), O.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const b = await c.json();
        return s.skels = b.skellist.reduce((g, _) => (g[_.key] = _, g), {}), (v = b.skellist) == null ? void 0 : v.map((g) => ({ text: l(t.bonestructure.format, { dest: g }), value: g.key, data: g }));
      });
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: a,
      removeMultipleEntries: o,
      getList: u
    };
  }
});
const Ye = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), Ds = { class: "actionbar" }, Vs = ["title"], Rs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ns = [
  Rs
], Ls = ["source"], Us = ["title"], Ts = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ps(e, n, t, a, l, o) {
  return m(), p("div", Ds, [
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ns, 8, Vs)) : $("", !0),
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
    }, null, 40, Ls),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ts,
      B(" " + j(e.$t("bone.list")), 1)
    ], 8, Us)) : $("", !0)
  ]);
}
const Ms = /* @__PURE__ */ C(js, [["render", Ps], ["__scopeId", "data-v-eeea51c6"]]), Ws = D({
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
    const t = I("boneState"), a = I("addMultipleEntry");
    I("formatString");
    const l = null, o = M(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(c) {
      const b = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, g) => {
        O.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: b }).then(async (_) => {
          let f = await _.json();
          fetch(f.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (h) => {
            const y = {
              key: f.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            O.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let A = await S.json();
              A.action === "addSuccess" ? v(A.values) : g(A);
            }).catch((S) => {
              g(S);
            });
          }).catch((h) => {
            g(h);
          });
        }).catch((_) => {
          g(_);
        });
      });
    }
    async function r(c) {
      s.loading = !0;
      for (let b of c.target.files) {
        let v = await u(b);
        o.value.value = null;
        let g = null;
        s.hasUsing && (g = void 0), a(e.lang, { dest: v, rel: g });
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let b of c.dataTransfer.files) {
        let v = await u(b);
        o.value.value = null;
        let g = null;
        s.hasUsing && (g = void 0), a(e.lang, { dest: v, rel: g });
      }
      s.loading = !1;
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: a,
      removeMultipleEntries: l,
      uploadFile: u,
      uploadinput: o,
      handleUpload: r,
      handleDrop: d
    };
  }
});
const $e = (e) => (z("data-v-9bac9f8a"), e = e(), q(), e), zs = ["title"], qs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Fs = [
  qs
], Hs = {
  key: 1,
  class: "droparea"
}, Ks = ["multiple"], Gs = ["title"], Zs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Js = [
  Zs
], Qs = ["title"], Ys = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), Xs = {
  key: 0,
  slot: "suffix"
};
function xs(e, n, t, a, l, o) {
  return m(), p("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = de((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = de((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Fs, 8, zs)) : $("", !0),
    e.state.droparea ? (m(), p("div", Hs, " Dateien hier hinziehen ")) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Ks),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Js, 8, Gs)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (m(), p("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Ys,
      B(" " + j(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), p("sl-spinner", Xs)) : $("", !0)
    ], 8, Qs)) : $("", !0)
  ], 32);
}
const ea = /* @__PURE__ */ C(Ws, [["render", xs], ["__scopeId", "data-v-9bac9f8a"]]), Se = ye("boneStore", () => {
  const e = w({
    additionalBones: K({}),
    defaultBones: K({
      rawBone: _e,
      keyBone: Be,
      stringBone: je,
      emailBone: De,
      dateBone: Ve,
      booleanBone: Ne,
      selectBone: Re,
      passwordBone: Le,
      recordBone: Ue,
      numericBone: Pe,
      colorBone: Te,
      relationalBone: Me,
      jsonBone: Hn,
      fileBone: We,
      textBone: ze,
      spatialBone: qe
    }),
    actionbars: K({
      "relational.tree.leaf.file.file": ea,
      "relational.": Ms
    }),
    multibones: K(["select", "select."])
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
  function a(s) {
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
    return s === "date" ? Ve : s === "key" ? Be : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? je : s === "select" || s.startsWith("select.") ? Re : s === "bool" ? Ne : s === "password" ? Le : s === "record" ? Ue : s === "numeric" || s.startsWith("numeric.") ? Pe : s === "relational.tree.leaf.file.file" ? We : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Te : s === "text" ? ze : s === "spatial" ? qe : _e;
  }
  function l(s, u) {
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
    return Bs;
  }
  return {
    state: e,
    addBoneWidget: n,
    getBoneWidget: a,
    importWidgets: t,
    addBoneActionbar: l,
    getBoneActionbar: o
  };
});
function ta(e) {
  return Se().getBoneActionbar(e);
}
function x(e) {
  return Se().getBoneWidget(e);
}
function na(e) {
  const n = Se();
  if (n.state.multibones.includes(e))
    return !0;
  {
    let t = e.split("."), a = Object.entries(n.state.multibones).filter(
      (l) => l[1].startsWith(t[0] + ".")
    );
    if (a.length > 0) {
      a.sort((l, o) => o.length - l.length);
      for (let l of a)
        if (e.startsWith(l[1]))
          return !0;
    }
  }
  return !1;
}
D({
  inheritAttrs: !1,
  emits: ["change", "change-internal", "handleClick"],
  components: {
    wrapperMultiple: It,
    BoneLabel: Rt
  },
  props: {
    is: {
      type: Object,
      default: _e
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
        var f;
        return (f = e.structure) == null ? void 0 : f[e.name];
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
        var f;
        return ((f = t.languages) == null ? void 0 : f.length) && t.languages.length > 0;
      }),
      languages: k(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: k(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: k(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: k(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: k(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: k(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: k(() => {
        var f;
        return ta((f = t.bonestructure) == null ? void 0 : f.type);
      }),
      isEmpty: k(() => {
        function f(h) {
          for (const [y, S] of Object.entries(h))
            if (S !== null) {
              if (Array.isArray(S) && S.length > 0)
                return !1;
              if (!Array.isArray(S))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? f(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: k(() => {
        let f = [];
        for (let h of e.errors)
          h.fieldPath[0] === e.name && (h.severity > 2 || t.required && (h.severity === 2 || h.severity === 0)) && f.push(h.errorMessage);
        return f;
      })
    });
    ie("boneState", t);
    function a(f, h, y) {
      s(h, f, "isDragging"), s(h, f, "dragStartIndex");
    }
    function l(f, h, y) {
      y.preventDefault();
      const S = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      S < A.offsetHeight / 2 ? (s(h, f, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = f) : (s(h, f, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = f + 1);
      let N = h ? t.bonevalue[h] : t.bonevalue;
      t.dropIndex.index > N.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(f, h, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (h ? (S = t.bonevalue[h].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[h].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: h,
        index: f
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(f, h, y) {
      t[y].lang = f || null, t[y].index = h;
    }
    function u(...f) {
      f.forEach((h) => {
        t[h] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(f, h, y = null, S = null, A) {
      if (h === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = h : t.bonevalue[y] = h) : S !== null ? t.bonevalue[S] = h : A === !1 || (t.bonevalue = h), t.readonly))
        return !1;
      let N = {
        name: f,
        value: d(),
        lang: y,
        index: S
      }, V = {
        name: f,
        value: h,
        lang: y,
        index: S
      };
      A != null && (N.pwMatch = A, V.pwMatch = A), n.emit("change", N), n.emit("change-internal", V);
    }
    function d() {
      function f(y, S = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [S + ".lat"]: y[0] }), A.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((N) => N === Object(N)).length > 0)
            for (const [N, V] of y.entries())
              V.rel !== null ? A.push(f(V, S + "." + N)) : A.push(f(V, S));
          else
            for (const [N, V] of y.entries())
              A.push(f(V, S));
        else if (y === Object(y))
          for (const [N, V] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && N === "key" ? (/\.[0-9]*\.dest$/.test(S) ? A.push(f(V, S.replace(/\.[0-9]*\.dest/, ""))) : A.push(f(V, S.replace(/\.dest/, ""))), A.push(f(V, S.replace(/\.dest/, "") + "." + N))) : S.endsWith(".rel") && A.push(f(V, S.replace(/\.rel/, "") + "." + N)) : A.push(f(V, S + "." + N)) : A.push(f(V, N));
        else
          y == null && (y = ""), S !== null && A.push({ [S]: y });
        return A;
      }
      let h = f(t.bonevalue, e.name);
      return h = h.flat(10), h;
    }
    function c(f = null, h = "") {
      f ? Object.keys(t.bonevalue).includes(f) ? t.bonevalue[f].push(h) : t.bonevalue[f] = [h] : t.bonevalue ? t.bonevalue.push(h) : t.bonevalue = [h];
    }
    ie("addMultipleEntry", c);
    function b(f, h = null) {
      var y;
      h ? (y = t.bonevalue) == null || y[h].splice(f, 1) : t.bonevalue.splice(f, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: h,
        index: f
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: h,
        index: f
      });
    }
    function v(f = null) {
      var h;
      f ? (h = t.bonevalue) == null || h[f].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: d(),
        lang: f
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: f
      });
    }
    ie("removeMultipleEntries", v);
    function g(f = null, h = "") {
      c(f, h);
    }
    function _(f, h) {
      function y(V) {
        let Z = [], F = [], ne = /\$\((.*?)\)/g;
        for (; F; ) {
          if (F = ne.exec(V), !F) {
            F = !1;
            continue;
          }
          Z.push(F[1]);
        }
        return Z;
      }
      function S(V, Z) {
        let F = V.split("."), ne = V.split("."), P = Z;
        for (let Y of F)
          if (ne.shift(), P && P !== "-" && Object.keys(P).includes(Y) && P[Y])
            if (Array.isArray(P[Y])) {
              let Ce = [];
              for (let et of P[Y])
                Ce.push(S(ne.join("."), et));
              P = Ce.join(", ");
            } else
              P = P[Y];
          else
            (!P || typeof P[Y] == "object" && !P[Y]) && (P = "-");
        return P;
      }
      let A = y(f), N = [];
      Array.isArray(h) || (h = [h]);
      for (let V of h) {
        let Z = f;
        for (let F of A) {
          let ne = S(F, V);
          Z = Z.replace("$(" + F + ")", ne);
        }
        N.push(Z);
      }
      return N.join(", ");
    }
    return ie("formatString", _), Q(() => {
      var f;
      e.value ? t.bonevalue = e.value : t.bonevalue = (f = e.skel) == null ? void 0 : f[e.name];
    }), se(
      () => e.skel,
      (f, h) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), se(
      () => {
        var f;
        return (f = e.errors) == null ? void 0 : f[e.name];
      },
      (f, h) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: c,
      removeMultipleEntry: b,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: na,
      multipleBonePressEnter: g,
      handleDragStart: a,
      handleDragOver: l,
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
}, Fe = () => {
  rt((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, He = ke.setup;
ke.setup = He ? (e, n) => (Fe(), He(e, n)) : Fe;
const sa = (e) => (z("data-v-46c45785"), e = e(), q(), e), aa = {
  key: 0,
  class: "loading"
}, la = /* @__PURE__ */ sa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), oa = { class: "logo" }, ra = ["src"];
function ia(e, n, t, a, l, o) {
  return m(), T(it, null, {
    default: ut(() => [
      t.active ? (m(), p("div", aa, [
        la,
        i("div", oa, [
          i("sl-icon", { src: t.logo }, null, 8, ra)
        ])
      ])) : $("", !0)
    ]),
    _: 1
  });
}
const ua = /* @__PURE__ */ C(ke, [["render", ia], ["__scopeId", "data-v-46c45785"]]), ee = ye("cartstore", () => {
  const e = new ft({
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
    await l();
  }
  async function a(g) {
    return await e.cart_list({ cart_key: g });
  }
  async function l() {
    (await e.cart_list()).forEach((_) => {
      _.is_root_node && (_.cart_type === "basket" ? n.basketRootNode = _ : n.whishlistRootNodes.push(_));
    });
  }
  async function o(g, _) {
    let f = await e.article_add({
      article_key: g,
      parent_cart_key: _
    });
    console.log("addToCart", f);
  }
  async function s(g, _) {
    let f = await e.article_view({
      article_key: g,
      parent_cart_key: _
    });
    console.log("getArticleView", f);
  }
  async function u(g, _) {
    let f = await e.article_remove({
      article_key: g,
      parent_cart_key: _
    });
    console.log("remove Resp", f);
  }
  async function r(g, _, f) {
    let h = await e.article_update({
      article_key: g,
      parent_cart_key: _,
      quantity: f,
      quantity_mode: "replace"
    });
    console.log("update Resp", h);
  }
  async function d() {
    const g = await e.address_structure();
    n.structure.address = g.addSkel;
  }
  async function c() {
    const g = await e.address_list();
    for (const _ of g)
      _.address_type === "billing" && (n.billingAddress = _), _.address_type === "shipping" && (n.shippingAddress = _);
  }
  async function b(g) {
    await e.discount_add({ code: g });
  }
  async function v() {
    return await e.shipping_list({ cart_key: n.basketRootNode.key });
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: s,
    removeItem: u,
    updateItem: r,
    init: t,
    getAddressStructure: d,
    getChildren: a,
    addDiscount: b,
    getAddress: c,
    getShippingData: v
  };
}), da = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), p("pre", null, j(e.node.name), 1));
  }
};
const ge = (e) => (z("data-v-d313b580"), e = e(), q(), e), ca = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ma = ["src"], fa = { class: "viur-shop-cart-leaf-headline headline" }, ga = { class: "viur-shop-cart-leaf-artno" }, pa = ["innerHTML"], ha = { class: "viur-shop-cart-leaf-quantity" }, ba = { class: "viur-shop-cart-leaf-unitprice" }, va = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "St\xFCckpreis", -1)), _a = ["value"], ya = { class: "viur-shop-cart-leaf-actions" }, $a = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), Sa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), ka = [
  Sa
], wa = { class: "viur-shop-cart-leaf-price" }, Ea = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Aa = ["value"], Ca = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: n }) {
    const t = e, a = n, l = w({
      leaf: {}
    });
    function o(r) {
      return r !== void 0 ? gt.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(r, d, c, b) {
      a("updateItem", {
        item: r,
        articleKey: d,
        node: c,
        quantity: b
      });
    }
    function u(r, d, c) {
      a("removeItem", { item: r, articleKey: d, node: c });
    }
    return Q(() => {
      l.leaf = t.leaf;
    }), (r, d) => (m(), p("sl-card", ca, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(l.leaf.shop_image ? l.leaf.shop_image : void 0)
      }, null, 8, ma),
      i("h4", fa, j(l.leaf.shop_name), 1),
      i("h5", ga, j(l.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: l.leaf.shop_description
      }, null, 8, pa),
      i("div", ha, [
        J(i("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": d[0] || (d[0] = (c) => l.leaf.quantity = c),
          onInput: d[1] || (d[1] = (c) => s(
            l.leaf,
            l.leaf.article.dest.key,
            e.node,
            l.leaf.quantity
          ))
        }, null, 544), [
          [oe, l.leaf.quantity]
        ])
      ]),
      i("div", ba, [
        va,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, _a)
      ]),
      i("div", ya, [
        $a,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[2] || (d[2] = (c) => u(l.leaf, l.leaf.article.dest.key, e.node))
        }, ka)
      ]),
      i("div", wa, [
        Ea,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, Aa)
      ])
    ]));
  }
}, Ia = /* @__PURE__ */ C(Ca, [["__scopeId", "data-v-d313b580"]]), Oa = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Ba = { key: 0 }, ja = { key: 0 }, Da = { key: 1 }, Va = {
  __name: "Discount",
  setup(e) {
    const n = ee(), t = M(null), a = M(null), l = w({
      errorMessage: ""
    });
    function o() {
      a.value.hide();
      const s = t.value.value;
      if (!s) {
        a.value.show(), l.errorMessage = "Es wurde kein Rabattcode eingegeben";
        return;
      }
      n.addDiscount(s);
    }
    return (s, u) => (m(), p(E, null, [
      i("div", null, [
        i("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: t
        }, null, 512),
        i("sl-button", { onClick: o }, "Einl\xF6sen"),
        i("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: a
        }, [
          Oa,
          B(" " + j(l.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        L(n).state.basketRootNode.discount ? (m(), p("div", Ba, [
          L(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), p("span", ja, " Sie haben einen Rabattcode im Wert von " + j(L(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : $("", !0),
          L(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), p("span", Da, " Sie haben einen Rabattcode im Wert von " + j(L(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : $("", !0)
        ])) : $("", !0)
      ])
    ], 64));
  }
}, Ra = { key: 0 }, Na = ["value"], La = {
  __name: "Shipping",
  setup(e, { expose: n }) {
    const t = ee(), a = w({
      shippingData: [],
      cheapestShipping: {},
      isShipping: !1
    });
    async function l() {
      a.shippingData = await t.getShippingData(), a.shippingData.sort((o, s) => o.dest.shipping_cost < o.dest.shipping_cost ? -1 : o.dest.shipping_cost > o.dest.shipping_cost ? 1 : 0), a.cheapestShipping = a.shippingData[a.shippingData.length - 1], a.isShipping = !0, console.log("cheapestShipping", a.cheapestShipping);
    }
    return n({ getShipping: l }), Q(async () => {
      await t.init(), await l();
    }), (o, s) => a.isShipping ? (m(), p("div", Ra, [
      B(" Versandkosten: "),
      i("sl-format-number", {
        type: "currency",
        currency: "EUR",
        value: a.cheapestShipping.dest.shipping_cost,
        lang: "de"
      }, null, 8, Na)
    ])) : $("", !0);
  }
};
const H = (e) => (z("data-v-bee4033d"), e = e(), q(), e), Ua = { key: 0 }, Ta = /* @__PURE__ */ H(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Pa = {
  class: "footer-wrap",
  slot: "footer"
}, Ma = { class: "viur-shop-cart-node" }, Wa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("br", null, null, -1)), Fa = { class: "viur-shop-cart-sidebar-info-line" }, Ha = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Ka = ["value"], Ga = { class: "viur-shop-cart-sidebar-info-line" }, Za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Ja = ["value"], Qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ i("sl-format-number", {
    type: "currency",
    currency: "EUR",
    value: 0,
    lang: "de"
  })
], -1)), Ya = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ i("sl-format-number", {
    type: "currency",
    currency: "EUR",
    value: 0,
    lang: "de"
  })
], -1)), Xa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
    /* @__PURE__ */ B(" Paypal ")
  ])
], -1)), xa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
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
    const n = e, t = ee(), a = M(null), l = M(null), o = w({
      itemsIsInit: k(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    }), s = k(() => n.mode === "basket" ? t.state.basketRootNode.key : n.cartKey);
    async function u() {
      await t.updateItem(
        o.currentItem.article.dest.key,
        o.currentNode.key,
        0
      ), await b(), a.value.hide();
    }
    async function r(g) {
      console.log("updateItem :", g), g.quantity === 0 ? (a.value.show(), o.currentItem = g.item, o.currentNode = g.node) : (await t.updateItem(g.articleKey, g.node.key, g.quantity), await t.init()), console.log("shipping", l), l.value.getShipping();
    }
    function d(g) {
      console.log("removeItem :", g), a.value.show(), o.currentItem = g.item, o.currentNode = g.node;
    }
    async function c() {
      o.leaves[o.currentNode.key].forEach((g) => {
        g.key === o.currentItem.key && (g.quantity = 1);
      }), o.currentItem = {}, o.currentNode = {};
    }
    async function b() {
      o.nodes = [], o.leaves = {}, await t.init(), await v();
    }
    async function v(g = s) {
      g = g.value, console.log("debug getChildren parentKey from comp: ", g);
      const _ = await t.getChildren(g);
      console.log("getChildren children: ", _), _.forEach(async (f) => {
        f.skel_type === "node" ? (o.nodes.push(f), await v(f.key)) : (Object.keys(o.leaves).includes(g) || (o.leaves[g] = []), o.leaves[g].push(f));
      });
    }
    return Q(async () => {
      await t.init(), await v(), n.mode === "basket" && o.nodes.push(t.state.basketRootNode), console.log("state.nodes test", o.nodes), console.log("state.leaves", o.leaves);
    }), (g, _) => s.value ? (m(), p(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: a,
        onSlHide: c
      }, [
        Ta,
        i("div", Pa, [
          i("sl-button", {
            variant: "danger",
            onClick: _[0] || (_[0] = (f) => a.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: u,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), p(E, null, U(o.nodes, (f) => (m(), p("div", Ma, [
        Object.keys(o.leaves).includes(f.key) ? (m(), p(E, { key: 0 }, [
          he(da, { node: f }, null, 8, ["node"]),
          (m(!0), p(E, null, U(o.leaves[f.key], (h) => (m(), T(Ia, {
            key: h.key,
            leaf: h,
            node: f,
            onRemoveItem: d,
            onUpdateItem: r
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : $("", !0)
      ]))), 256)),
      Wa,
      e.sidebar ? (m(), T(Ge, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), p(E, { key: 0 }, [
          za,
          qa,
          i("div", Fa, [
            Ha,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: L(t).state.basketRootNode.total
            }, null, 8, Ka)
          ]),
          i("div", Ga, [
            Za,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: L(t).state.basketRootNode.total - L(t).state.basketRootNode.total_discount_price,
              lang: "de"
            }, null, 8, Ja)
          ]),
          Qa,
          Ya,
          Xa
        ], 64)) : $("", !0)
      ])) : $("", !0),
      he(Va),
      he(La, {
        ref_key: "shipping",
        ref: l
      }, null, 512),
      xa
    ], 64)) : (m(), p("sl-spinner", Ua));
  }
}, we = /* @__PURE__ */ C(el, [["__scopeId", "data-v-bee4033d"]]), tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
const le = (e) => (z("data-v-4082d346"), e = e(), q(), e), nl = {
  key: 1,
  class: "list"
}, sl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), al = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ B(" Versandadresse "),
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
    /* @__PURE__ */ B(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" Speicherstra\xDFe 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ B(" Rechnungsadresse "),
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
    /* @__PURE__ */ B(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" Speicherstra\xDFe 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ B(" 0231 21 34 68 90 ")
  ])
], -1)), ll = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ i("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ B(" Paypal ")
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
], -1)), ol = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), rl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), il = /* @__PURE__ */ le(() => /* @__PURE__ */ i("br", null, null, -1)), ul = { class: "viur-shop-cart-sidebar-btn-wrap" }, dl = ["variant", "disabled"], cl = {
  __name: "ConfirmView",
  setup(e) {
    const n = ee(), t = w({
      cartIsInit: k(() => !0),
      itemsIsInit: k(() => {
        var l;
        return !!((l = n.state) != null && l.carts[n.state.basket].items);
      }),
      images: {},
      showOrderButton: !1
    });
    function a(l) {
      l.target.checked && (t.showOrderButton = !0), l.target.checked || (t.showOrderButton = !1);
    }
    return Q(async () => {
      await n.init();
    }), (l, o) => t.cartIsInit ? (m(), p("div", nl, [
      sl,
      al,
      ll,
      ol,
      (m(), T(Ge, { to: "#order_sidebar" }, [
        rl,
        il,
        i("sl-checkbox", { onSlChange: a }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", ul, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, dl)
        ])
      ]))
    ])) : (m(), T(ua, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ C(cl, [["__scopeId", "data-v-4082d346"]]), ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
const fl = (e) => (z("data-v-50f31583"), e = e(), q(), e), gl = { class: "bind viur-shop-wrap" }, pl = ["panel", "disabled"], hl = { class: "viur-shop-order-step" }, bl = ["name", "library"], vl = { class: "viur-shop-order-status-text" }, _l = { class: "viur-shop-order-status-span" }, yl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, $l = ["name"], Sl = ["onClick"], kl = ["onClick"], wl = /* @__PURE__ */ fl(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
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
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: n }) {
    const t = e, a = n, l = w({
      tabNames: k(() => s(t.tabs)),
      isFirstTab: (c) => c === 0
    }), o = M(null);
    function s(c) {
      let b = [], v = [];
      for (const g in c)
        c[g].position ? b.push([g, c[g].position]) : b.push([g, 0]);
      return b.sort((g, _) => g[1] - _[1]), b.forEach((g) => {
        v.push(g[0]);
      }), v;
    }
    function u(c) {
      a("tabChange", c);
    }
    function r(c) {
      o.value.show(c);
    }
    function d(c) {
      o.value.show(c);
    }
    return (c, b) => (m(), p("div", gl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (m(!0), p(E, null, U(l.tabNames, (v, g) => {
          var _;
          return m(), p("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", hl, [
              (_ = e.tabs[v].icon) != null && _.name ? (m(), p("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, bl)) : $("", !0),
              i("div", vl, [
                B(j(g + 1) + ". ", 1),
                i("span", _l, j(e.tabs[v].displayName), 1)
              ])
            ]),
            g < l.tabNames.length - 1 ? (m(), p("sl-icon", yl)) : $("", !0)
          ], 8, pl);
        }), 128)),
        (m(!0), p(E, null, U(l.tabNames, (v, g) => (m(), p("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), T(dt(e.tabs[v].component), ct({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          g !== l.tabNames.length - 1 ? (m(), p("div", {
            key: 0,
            class: G(["viur-shop-form-footer", { "flex-end": l.isFirstTab(g) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (_) => r(l.tabNames[g - 1])
            }, " Zur\xFCck ", 8, Sl), [
              [ve, g !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => d(l.tabNames[g + 1])
            }, " Weiter ", 8, kl)
          ], 2)) : $("", !0)
        ], 8, $l))), 128))
      ], 544),
      wl
    ]));
  }
}, Xe = /* @__PURE__ */ C(El, [["__scopeId", "data-v-50f31583"]]);
const pe = (e) => (z("data-v-688e20e0"), e = e(), q(), e), Al = { class: "bind" }, Cl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), Il = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ B(" 123345670 ")
], -1)), Ol = { class: "paragraph" }, Bl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("br", null, null, -1)), jl = { class: "btn-wrap" }, Dl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Vl = {
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
    return (t, a) => (m(), p("div", Al, [
      Cl,
      Il,
      i("p", Ol, [
        B(" Wir haben Ihre Bestellung erhalten und werden diese schenllstm\xF6glich bearbeiten."),
        Bl,
        B(" Sie erhalten in wenigen Minuten eine Best\xE4tigung per E-Mail. "),
        i("div", jl, [
          Dl,
          i("sl-button", {
            variant: "primary",
            onClick: a[0] || (a[0] = (l) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Rl = /* @__PURE__ */ C(Vl, [["__scopeId", "data-v-688e20e0"]]);
const Ae = (e) => (z("data-v-4d14c6fe"), e = e(), q(), e), Nl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Ll = { class: "viur-shop-form-wrap" }, Ul = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Tl = { class: "viur-shop-form-wrap" }, Pl = { key: 0 }, Ml = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Wl = { class: "viur-shop-form-wrap" }, zl = {
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
    function a(s) {
      t.isCustomAdress = !s.target.checked;
    }
    function l(s, u) {
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
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = o(n.state.structure.address), t.formValues = n.state.shippingAddress;
    }), (s, u) => {
      const r = ae("bone");
      return m(), p(E, null, [
        i("div", null, [
          Nl,
          i("div", Ll, [
            (m(!0), p(E, null, U(t.addSkel, (d, c) => (m(), p(E, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (m(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Info" ? (m(), T(r, {
                  key: 0,
                  is: L(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (b) => l(c, b),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Ul,
          i("div", Tl, [
            (m(!0), p(E, null, U(t.addSkel, (d, c) => (m(), p(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), T(r, {
                  key: 0,
                  is: L(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (b) => l(c, b)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (m(), p("div", Pl, [
          Ml,
          i("div", Wl, [
            (m(!0), p(E, null, U(t.addSkel, (d, c) => (m(), p(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), T(r, {
                  key: 0,
                  is: L(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (b) => l(c, b)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ])) : $("", !0),
        i("sl-checkbox", {
          onSlChange: a,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ql = /* @__PURE__ */ C(zl, [["__scopeId", "data-v-4d14c6fe"]]);
const te = (e) => (z("data-v-c4232b7a"), e = e(), q(), e), Fl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Hl = { class: "viur-shop-form-wrap" }, Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Gl = ["onSlChange", "onSlClear", "label"], Zl = ["value"], Jl = { key: 0 }, Ql = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Yl = { class: "viur-shop-form-wrap" }, Xl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), xl = [
  Xl
], eo = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), to = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), no = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), so = {
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
    }), a = M(null), l = M(null);
    function o(v) {
      v.target.checked && (t.isCustomAdress = !1), v.target.checked || (t.isCustomAdress = !0);
    }
    function s() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie k\xF6nnen nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, l.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(v, g) {
      for (const [_, f] of Object.entries(g.value[0]))
        t.formValues[_] = f;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", l.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(v, g) {
      if (console.log(v.target.value), !v.target.value.length) {
        c();
        return;
      }
      t.selectedItem[g] = v.target.value, t.isItemSelected = !0;
    }
    function c(v, g) {
      console.log("clearing..."), delete t.selectedItem[g], t.isItemSelected = !1;
    }
    function b(v) {
      let g = {};
      return Array.isArray(v) ? (v.forEach((_) => {
        let f = _[0], h = _[1];
        g[f] = h;
      }), g) : v;
    }
    return se(t.formValues, (v) => {
      Object.entries(v).forEach(([g, _]) => {
        _ === "" && delete t.formValues[g];
      });
    }), Q(async () => {
      await n.getAddressStructure(), t.addSkel = b(n.state.structure.address);
    }), (v, g) => {
      const _ = ae("bone");
      return m(), p(E, null, [
        i("div", null, [
          Fl,
          i("div", Hl, [
            (m(!0), p(E, null, U(t.addSkel, (f, h) => (m(), p(E, { key: h }, [
              f.visible && f.params.group === "Customer Info" ? (m(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + h)
              }, [
                f.visible && f.params.group === "Customer Info" ? (m(), T(_, {
                  key: 0,
                  is: L(x)(f.type),
                  name: h,
                  structure: b(t.addSkel),
                  errors: t.errors[h] ? t.errors[h] : [],
                  skel: t.formValues,
                  onChange: (y) => u(h, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        Kl,
        (m(!0), p(E, null, U(t.shippingAdressAmount, (f) => (m(), p("div", {
          class: "viur-shop-form-wrap",
          key: f
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: a,
            onSlChange: (h) => d(h, f),
            onSlClear: (h) => c(h, f),
            label: t.selectedItem[f] ? L(n).state.carts[t.selectedItem[f]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), p(E, null, U(L(n).state.carts, (h, y) => (m(), p("sl-option", { value: y }, j(h.info.name), 9, Zl))), 256))
          ], 40, Gl),
          (m(!0), p(E, null, U(t.addSkel, (h, y) => (m(), p(E, { key: y }, [
            h.visible && h.params.group === "Customer Address" ? (m(), p("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              h.visible && h.params.group === "Customer Address" ? (m(), T(_, {
                key: 0,
                is: L(x)(h.type),
                name: y,
                structure: b(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
            ], 2)) : $("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), p("div", Jl, [
          Ql,
          i("div", Yl, [
            (m(!0), p(E, null, U(t.addSkel, (f, h) => (m(), p(E, { key: h }, [
              f.visible && f.params.group === "Customer Address" ? (m(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + h)
              }, [
                f.visible && f.params.group === "Customer Address" ? (m(), T(_, {
                  key: 0,
                  is: L(x)(f.type),
                  name: h,
                  structure: b(t.addSkel),
                  errors: t.errors[h] ? t.errors[h] : [],
                  skel: t.formValues,
                  onChange: (y) => u(h, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ])) : $("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: r,
            title: "Lieferadresse entfernen"
          }, xl),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            eo,
            B(" Lieferadresse hinzuf\xFCgen ")
          ])
        ]),
        i("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: l,
          closable: ""
        }, [
          to,
          i("strong", null, j(t.amountAlert.title), 1),
          no,
          B(" " + j(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ao = /* @__PURE__ */ C(so, [["__scopeId", "data-v-c4232b7a"]]), xe = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), a = w({
      rootNode: {},
      tabs: {
        cart: {
          component: K(we),
          props: {
            sidebar: !0,
            mode: "basket",
            cartKey: t
          },
          displayName: "Warenkorb",
          icon: { name: "bag" },
          position: 2,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        confirm: {
          component: K(Ee),
          props: {},
          displayName: "Bestellung pr\xFCfen",
          icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        orderComplete: {
          component: K(Rl),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: K(ql),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: K(ao),
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
    function l(o) {
      (o == null ? void 0 : o.detail.name) === "confirm" && (a.tabs.orderComplete.disabled = !1);
    }
    return Q(async () => {
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (m(), T(Xe, {
      tabs: a.tabs,
      onTabChange: l
    }, null, 8, ["tabs"]));
  }
}, lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" })), oo = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = pt();
    return { state: w({}), route: t };
  }
}), ro = { class: "home" };
function io(e, n, t, a, l, o) {
  return m(), p("div", ro, "View " + j(e.route.path) + " is missing.", 1);
}
const uo = /* @__PURE__ */ C(oo, [["render", io]]), co = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: uo
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView.e3185f16.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.3e61c857.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => tl)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => lo)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => ml)
  }
];
function yo(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(co), ht({
    history: bt("/"),
    routes: t
  });
}
const mo = mt(), $o = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", xe), e.component("ConfirmView", Ee), e.component("OrderView", Xe), e.use(mo);
  }
};
export {
  we as C,
  Rl as O,
  ql as U,
  $o as V,
  C as _,
  xe as a,
  Ee as b,
  yo as c,
  Xe as d,
  ee as u
};
