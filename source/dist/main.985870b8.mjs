var et = Object.defineProperty;
var tt = (e, n, t) => n in e ? et(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => (tt(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, inject as B, reactive as w, openBlock as m, createElementBlock as f, normalizeClass as G, createElementVNode as i, renderSlot as He, pushScopeId as M, popScopeId as z, Fragment as E, createCommentVNode as S, toDisplayString as I, onMounted as R, ref as q, readonly as nt, getCurrentScope as st, onScopeDispose as at, unref as L, computed as k, watchEffect as ce, renderList as U, watch as se, withDirectives as J, vModelText as oe, getCurrentInstance as lt, resolveComponent as ae, createBlock as P, vShow as ve, withModifiers as de, createTextVNode as O, shallowRef as H, provide as ie, onBeforeMount as Q, useCssVars as ot, Transition as rt, withCtx as it, createVNode as Ie, Teleport as Ge, resolveDynamicComponent as ut, mergeProps as dt } from "vue";
import { defineStore as _e, createPinia as ct } from "pinia";
import Oe from "@viur/ckeditor5-build-classic";
import { Request as mt } from "@viur/vue-utils";
import { ViURShopClient as ft } from "@viur/viur-shop-client";
import { useRoute as gt, createRouter as ht, createWebHashHistory as pt } from "vue-router";
const vt = D({
  props: {
    isDragging: Boolean,
    draggingLineBottom: Boolean,
    draggingLineTop: Boolean
  },
  components: {},
  emits: ["change", "delete", "handleDragStart", "handleDragEnd", "handleDragOver", "handleDrop"],
  setup(e, n) {
    const t = B("boneState");
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
  for (const [l, a] of n)
    t[l] = a;
  return t;
}, Ze = (e) => (M("data-v-141aaf9b"), e = e(), z(), e), bt = ["draggable"], _t = ["disabled"], yt = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), $t = [
  yt
], St = { class: "value" }, kt = ["disabled", "title"], wt = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Et = [
  wt
];
function At(e, n, t, l, a, r) {
  return m(), f("div", {
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
    }, $t, 40, _t),
    i("div", St, [
      He(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (s) => e.$emit("delete"))
    }, Et, 8, kt)
  ], 42, bt);
}
const Ct = /* @__PURE__ */ C(vt, [["render", At], ["__scopeId", "data-v-141aaf9b"]]), It = D({
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
    const t = B("boneState");
    return {
      state: w({
        debug: !1
      }),
      boneState: t
    };
  }
});
const Ot = { class: "bone-name" }, Bt = { key: 0 }, jt = { class: "bone" };
function Dt(e, n, t, l, a, r) {
  return m(), f(E, null, [
    i("label", Ot, [
      He(e.$slots, "default", {}, void 0, !0),
      S("", !0)
    ]),
    e.state.debug ? (m(), f("div", Bt, [
      i("div", jt, I(e.name), 1),
      i("pre", null, "    " + I(e.boneState) + `
    `, 1)
    ])) : S("", !0)
  ], 64);
}
const Vt = /* @__PURE__ */ C(It, [["render", Dt], ["__scopeId", "data-v-b7149172"]]), Rt = D({
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
    const t = B("boneState"), l = w({});
    function a(r) {
      n.emit("change", e.name, r.target.value, e.lang, e.index);
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
const Nt = ["disabled", "value"], Lt = ["disabled", "value"];
function Ut(e, n, t, l, a, r) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (m(), f("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...o) => e.changeEvent && e.changeEvent(...o))
  }, null, 40, Nt)) : (m(), f("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...o) => e.changeEvent && e.changeEvent(...o))
  }, null, 40, Lt));
}
const be = /* @__PURE__ */ C(Rt, [["render", Ut], ["__scopeId", "data-v-0ebe5f0b"]]), Pt = D({
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
});
const Tt = ["value"];
function Mt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Tt);
}
const Be = /* @__PURE__ */ C(Pt, [["render", Mt], ["__scopeId", "data-v-b45a1311"]]);
function Wt(e) {
  return st() ? (at(e), !0) : !1;
}
function zt(e) {
  return typeof e == "function" ? e() : L(e);
}
const qt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, a = q(!1);
  let r = null;
  function s() {
    r && (clearTimeout(r), r = null);
  }
  function u() {
    a.value = !1, s();
  }
  function o(...c) {
    s(), a.value = !0, r = setTimeout(() => {
      a.value = !1, r = null, e(...c);
    }, zt(n));
  }
  return l && (a.value = !0, qt && o()), Wt(u), {
    isPending: nt(a),
    start: o,
    stop: u
  };
}
class Ft {
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
      let u = [], o = [], c = /\$\((.*?)\)/g;
      for (; o; ) {
        if (o = c.exec(s), !o) {
          o = !1;
          continue;
        }
        u.push(o[1]);
      }
      return u;
    }
    let a = l(n), r = [];
    Array.isArray(t) || (t = [t]);
    for (let s of t) {
      let u = n;
      for (let o of a) {
        let c = o.split("."), d = s;
        for (let g of c)
          d && d !== "-" && g in d && d[g] ? d = d[g] : d = "-";
        d = this.unescape(d), u = u.replace("$(" + o + ")", d);
      }
      r.push(u);
    }
    return r.join(", ");
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
    const t = B("boneState"), l = w({
      value: k(() => e.value)
    }), a = q(null);
    function r(s) {
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
      Utils: Ft,
      boneState: t,
      changeEvent: r,
      stringBone: a
    };
  }
});
const Ht = ["disabled", "value", "required"];
function Gt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Ht);
}
const je = /* @__PURE__ */ C(Kt, [["render", Gt], ["__scopeId", "data-v-1ccbacc0"]]), Zt = D({
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
    const t = B("boneState"), l = w({}), a = q(null);
    function r(s) {
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
      changeEvent: r,
      emailBone: a
    };
  }
});
const Jt = ["disabled", "value"];
function Qt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Jt);
}
const De = /* @__PURE__ */ C(Zt, [["render", Qt], ["__scopeId", "data-v-4328e024"]]), Yt = D({
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
    const t = B("boneState"), l = w({
      value: k(() => {
        var s;
        let r = e.value;
        return t.bonestructure.time ? r = (s = e.value) == null ? void 0 : s.split("+")[0] : e.value && (r = new Date(e.value).toISOString().substr(0, 10)), r;
      }),
      typeString: k(() => {
        let r = "datetime-local";
        return t.bonestructure.time || (r = "date"), r;
      })
    });
    function a(r) {
      n.emit("change", e.name, r.target.value, e.lang, e.index);
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
const Xt = ["disabled", "type", "value"];
function xt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Xt);
}
const Ve = /* @__PURE__ */ C(Yt, [["render", xt], ["__scopeId", "data-v-f1b8af8c"]]), en = D({
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
    const t = B("boneState"), l = w({
      value: k(() => {
        let s = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? s = s.filter((u) => t.bonestructure.values.map((o) => o[0].toString()).includes(u)) : s = s.filter(
          (u) => Object.keys(t.bonestructure.values).map((o) => o.toString()).includes(u)
        ), s.map((u) => u.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function a() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let s = [];
        for (const [u, o] of Object.entries(t.bonestructure.values))
          s.push([u, o]);
        return s;
      }
    }
    function r(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index), W;
    }
    return R(() => {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: r,
      convertObjToList: a
    };
  }
});
const tn = ["disabled", "value", "multiple"], nn = ["value"];
function sn(e, n, t, l, a, r) {
  return m(), f("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), f(E, null, U(e.convertObjToList(), (s) => (m(), f("sl-option", {
      key: s[0],
      value: s[0]
    }, I(s[1]), 9, nn))), 128))
  ], 40, tn);
}
const Re = /* @__PURE__ */ C(en, [["render", sn], ["__scopeId", "data-v-5a38b97f"]]), an = D({
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
    const t = B("boneState"), l = w({
      value: k(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function a(r) {
      n.emit("change", e.name, r.target.checked, e.lang, e.index);
    }
    return R(() => {
      let r = e.value;
      r || (r = !1), n.emit("change", e.name, r, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const ln = ["disabled", "checked"];
function on(e, n, t, l, a, r) {
  return m(), f("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, ln);
}
const Ne = /* @__PURE__ */ C(an, [["render", on], ["__scopeId", "data-v-363598c8"]]), rn = D({
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
    const t = B("boneState"), l = w({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), a = q(null);
    function r(u) {
      l.value1 === l.value2 ? l.equal = !0 : l.equal = !1, s(l.value1), l.requiredPasswordInfo.length === 0 && l.passwordInfo.length - l.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, l.value1, e.lang, e.index, !0) : n.emit("change", e.name, l.value1, e.lang, e.index, !1);
    }
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      l.passwordInfo = [], l.requiredPasswordInfo = [];
      for (const o of t.bonestructure.tests)
        new RegExp(o[0]).test(u) || (o[2] ? l.requiredPasswordInfo.push(o[1]) : l.passwordInfo.push(o[1]));
      l.equal || l.requiredPasswordInfo.push("Die eingegebenen Passw\xF6rter stimmen nicht \xFCberein."), l.value1 || l.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
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
      (u, o) => {
        l.value1 = u;
      }
    ), {
      state: l,
      boneState: t,
      changeEvent: r,
      passwordBone: a
    };
  }
});
const un = ["disabled"], dn = ["name"], cn = ["name"], mn = { class: "errors" };
function fn(e, n, t, l, a, r) {
  return m(), f(E, null, [
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
      }, null, 8, dn)
    ], 42, un), [
      [oe, e.state.value1]
    ]),
    e.boneState.readonly ? S("", !0) : J((m(), f("sl-input", {
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
      }, null, 8, cn)
    ], 544)), [
      [oe, e.state.value2]
    ]),
    i("ul", mn, [
      (m(!0), f(E, null, U(e.state.passwordInfo, (s, u) => (m(), f("li", { key: u }, I(s), 1))), 128)),
      (m(!0), f(E, null, U(e.state.requiredPasswordInfo, (s, u) => (m(), f("li", {
        key: u,
        class: "requiredInfo"
      }, I(s), 1))), 128))
    ])
  ], 64);
}
const Le = /* @__PURE__ */ C(rn, [["render", fn], ["__scopeId", "data-v-0ccf18c0"]]), gn = D({
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
    const t = B("boneState"), l = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var c, d;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [g, b] of Object.entries(l.structure)) {
          let v = "default", y = l.structure[g], h = (c = l.value) == null ? void 0 : c[g];
          (d = b == null ? void 0 : b.params) != null && d.category && (v = b.params.category.toLowerCase()), Object.keys(u).includes(v) ? u[v].bones.push({
            boneName: g,
            boneStructure: y,
            boneValue: h
          }) : u[v] = {
            name: b.params.category,
            bones: [
              {
                boneName: g,
                boneStructure: y,
                boneValue: h
              }
            ]
          }, y.visible === !0 && (u[v].groupVisible = !0);
        }
        let o = {};
        return Object.keys(u).sort().forEach(function(g) {
          o[g] = u[g];
        }), o;
      })
    });
    function a(u) {
      n.emit("change", u);
    }
    R(() => {
      lt().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function r(u) {
      console.log(u);
    }
    function s(u) {
      if (Array.isArray(u)) {
        let o = {};
        for (const c in u)
          o[u[c][0]] = u[c][1];
        return o;
      } else
        return u;
    }
    return {
      state: l,
      boneState: t,
      getBoneWidget: x,
      structureToDict: s,
      changeEvent: a,
      updateValue: r
    };
  }
});
const hn = {
  key: 0,
  open: "",
  variant: "danger"
}, pn = {
  key: 1,
  class: "form"
}, vn = ["summary", "open"];
function bn(e, n, t, l, a, r) {
  const s = ae("bone");
  return e.state.globalRegistration ? (m(), f("div", pn, [
    (m(!0), f(E, null, U(e.state.formGroups, (u, o) => J((m(), f("sl-details", {
      key: o,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), f(E, null, U(u.bones, (c) => J((m(), P(s, {
        key: c.name,
        is: e.getBoneWidget(e.state.structure[c.boneName].type),
        name: c.boneName,
        structure: e.state.structure,
        skel: e.state.value,
        errors: e.boneState.errors,
        readonly: e.boneState.bonestructure.readonly ? !0 : void 0,
        onChangeInternal: e.changeEvent
      }, null, 8, ["is", "name", "structure", "skel", "errors", "readonly", "onChangeInternal"])), [
        [ve, e.state.structure[c.boneName].visible]
      ])), 128))
    ], 8, vn)), [
      [ve, u.groupVisible]
    ])), 128))
  ])) : (m(), f("sl-alert", hn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Je = /* @__PURE__ */ C(gn, [["render", bn], ["__scopeId", "data-v-e6fcfbca"]]), _n = D({
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
    const t = B("boneState"), l = w({
      value: {},
      index: k(() => e.index),
      lang: k(() => e.lang)
    });
    function a(r) {
      var u;
      (u = l.value) != null && u[r.name] || (l.value ? l.value[r.name] = null : l.value = { [r.name]: null });
      let s = l.value[r.name];
      r.lang ? (s === null && (s = {}), Object.keys(s).includes(r.lang) && r.index !== null ? s[r.lang][r.index] = r.value : s[r.lang] = r.value) : r.index !== null ? (s === null && (s = []), s[r.index] = r.value) : s = r.value, l.value[r.name] = s, n.emit("change", e.name, l.value, e.lang, e.index, !0);
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
function yn(e, n, t, l, a, r) {
  const s = ae("Wrapper_nested");
  return m(), P(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Ue = /* @__PURE__ */ C(_n, [["render", yn], ["__scopeId", "data-v-84a761ce"]]), $n = D({
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
    const t = B("boneState"), l = w({});
    function a(r) {
      n.emit("change", e.name, r.target.value, e.lang, e.index);
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
const Sn = ["disabled", "value"];
function kn(e, n, t, l, a, r) {
  return m(), f("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Sn);
}
const Pe = /* @__PURE__ */ C($n, [["render", kn], ["__scopeId", "data-v-534b9149"]]), wn = D({
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
    const t = B("boneState"), l = w({
      minAmount: k(() => t.bonestructure.minAmount),
      maxAmount: k(() => t.bonestructure.maxAmount),
      precision: k(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), a = q(null);
    function r(s) {
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
      changeEvent: r,
      numericBone: a
    };
  }
});
const En = ["disabled", "value", "min", "max", "step"], An = { class: "info" }, Cn = { key: 0 }, In = { key: 1 }, On = { key: 2 };
function Bn(e, n, t, l, a, r) {
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
    }, null, 40, En),
    i("ul", An, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), f("li", Cn, I(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : S("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), f("li", In, I(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : S("", !0),
      e.state.precision ? (m(), f("li", On, I(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : S("", !0)
    ])
  ], 64);
}
const Te = /* @__PURE__ */ C(wn, [["render", Bn], ["__scopeId", "data-v-03d5b399"]]);
class ue extends Error {
  constructor(n, t, l, a) {
    super(l || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
  }
}
let pe = null;
function X() {
  return pe || (pe = _e("requestStore", () => {
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
class j {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = ({ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL ? { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: a = null, abortController: r = null, headers: s = null, mode: u = null } = {}) {
    function o() {
      if (t instanceof FormData)
        return t;
      const d = new FormData();
      for (const g in t)
        if (Array.isArray(t[g]))
          for (let b of t[g])
            d.append(g, b);
        else
          d.append(g, t[g]);
      return d;
    }
    let c = re.post(j.buildUrl(n), o(), null, s, r, u);
    return c.then(function(d) {
      l && l(d.data);
    }).catch(function(d) {
      a && a(d);
    }), c;
  }
  static async getBatchSkeys(n = 30, t = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json") {
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
    abortController: r = null,
    renderer: s = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: o = null,
    amount: c = 30
  } = {}) {
    let d = null;
    X().state.sKeys.size === 0 && await j.getBatchSkeys(c);
    const g = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", g), X().state.sKeys.delete(g)) : (t || (t = {}), t.skey = g, X().state.sKeys.delete(g)), d = j.post(n, {
      dataObj: t,
      callback: l,
      abortController: r,
      headers: u,
      mode: o
    }), d;
  }
  static get(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    cached: r = !1,
    clearCache: s = !1,
    abortController: u = null,
    headers: o = null,
    mode: c = null,
    cacheTime: d = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let g = re.get(j.buildUrl(n), t, s, o, u, c);
    return g.then(function(b) {
      l && l(b.data);
    }).catch(function(b) {
      a && a(b);
    }), g;
  }
  static list(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: r = null,
    abortController: s = null,
    renderer: u = ((c) => (c = ((o) => (o = import.meta) == null ? void 0 : o.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let d = `/${u}/${n}/list`;
    return r && (d += `/${r}`), j.get(d, {
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
    group: r = null,
    abortController: s = null,
    renderer: u = ((c) => (c = ((o) => (o = import.meta) == null ? void 0 : o.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let d = `/${u}/getStructure/${n}`;
    return r && (d += `/${r}`), j.get(d, {
      dataObj: t,
      callback: l,
      failedCallback: a,
      abortController: s
    });
  }
  static view(n, t, {
    dataObj: l = null,
    callback: a = null,
    failedCallback: r = null,
    group: s = null,
    abortController: u = null,
    renderer: o = ((d) => (d = ((c) => (c = import.meta) == null ? void 0 : c.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let g = `/${o}/${n}/view/${t}`;
    return s && (g = `/${o}/${n}/view/${s}/${t}`), j.get(g, {
      dataObj: l,
      callback: a,
      failedCallback: r,
      abortController: u
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: r = null,
    abortController: s = null,
    renderer: u = ((c) => (c = ((o) => (o = import.meta) == null ? void 0 : o.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let d = `/${u}/${n}/add`;
    return r && (d = `/${u}/${n}/add/${r}`), j.securePost(d, {
      dataObj: t,
      callback: l,
      failedCallback: a,
      abortController: s
    });
  }
  static edit(n, t, {
    dataObj: l = null,
    callback: a = null,
    failedCallback: r = null,
    group: s = null,
    abortController: u = null,
    renderer: o = ((d) => (d = ((c) => (c = import.meta) == null ? void 0 : c.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let g = `/${o}/${n}/edit/${t}`;
    return s && (g = `/${o}/${n}/edit/${s}/${t}`), j.securePost(g, {
      dataObj: l,
      callback: a,
      failedCallback: r,
      abortController: u
    });
  }
  static delete(n, t, {
    dataObj: l = null,
    callback: a = null,
    failedCallback: r = null,
    group: s = null,
    abortController: u = null,
    renderer: o = ((d) => (d = ((c) => (c = import.meta) == null ? void 0 : c.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let g = `/${o}/${n}/delete/${t}`;
    return s && (g = `/${o}/${n}/delete/${s}/${t}`), j.securePost(g, {
      dataObj: l,
      callback: a,
      failedCallback: r,
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
    return new Promise((a, r) => {
      j.securePost("/vi/file/getUploadURL", { dataObj: l }).then(async (s) => {
        let u = await s.json();
        fetch(u.values.uploadUrl, {
          body: n,
          method: "POST",
          mode: "no-cors"
        }).then(async (o) => {
          const c = {
            key: u.values.uploadKey,
            skelType: "leaf"
          };
          j.securePost("/vi/file/add", { dataObj: c }).then(async (d) => {
            let g = await d.json();
            g.action === "addSuccess" ? a(g.values) : r(g);
          }).catch((d) => {
            r(d);
          });
        }).catch((o) => {
          r(o);
        });
      }).catch((s) => {
        r(s);
      });
    });
  }
}
class re {
  constructor() {
    Ce(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, l = null, a = null, r = null) {
    let s = { method: n };
    return s.credentials = "include", s.headers = {
      Accept: "application/json, text/plain, */*"
    }, l && (s.headers = { ...s.headers, ...l }), t && (s.body = t), a && (s.signal = a.signal), r && (s.mode = r), s;
  }
  static get(n, t = null, l = null, a = null, r = null, s = null) {
    function u(o, c) {
      let d = new URL(o);
      if (c && Object.keys(c).length > 0) {
        const g = new URLSearchParams();
        for (const [b, v] of Object.entries(c))
          if (Array.isArray(v))
            for (const y of v)
              g.append(b, y);
          else
            g.append(b, v);
        d.search = g.toString();
      }
      return d.toString();
    }
    return fetch(u(n, t), re.buildOptions("GET", null, a, r, s)).then(async (o) => {
      if (o.ok)
        return o;
      {
        const c = `${o.status} ${o.statusText}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(o.status, o.statusText, c, o));
      }
    }).catch((o) => {
      if (o instanceof TypeError) {
        const d = `503 ${o.message}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(503, o.message, d, o));
      }
      if (o instanceof DOMException && o.name == "AbortError") {
        const d = `${o.code} ${o.name}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ue(o.code, o.name, d, { url: n }));
      }
      const c = `${o.statusCode} ${o.statusText}: ${o.headers ? o.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ue(o.statusCode, o.statusText, c, o.response));
    });
  }
  static post(n, t = null, l = null, a = null, r = null, s = null) {
    return fetch(n, re.buildOptions("POST", t, a, r, s));
  }
}
const jn = D({
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
    const t = B("boneState"), l = B("formatString"), a = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function r(o) {
      let c = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), j.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${c}limit=99`
      ).then(async (d) => {
        var b;
        const g = await d.json();
        a.skellistdata = {};
        for (let v of g.skellist)
          a.skellistdata[v.key] = v;
        return (b = g.skellist) == null ? void 0 : b.map((v) => ({ text: l(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    function s(o) {
      a.selection = { dest: a.skellistdata[o.detail.item.value] }, n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    function u(o) {
      var d;
      a.selection || (a.selection = {}), (d = a.selection.rel) != null && d[o.name] || (a.selection.rel ? a.selection.rel[o.name] = null : a.selection.rel = { [o.name]: null });
      let c = a.selection.rel[o.name];
      o.lang ? (c === null && (c = {}), Object.keys(c).includes(o.lang) && o.index !== null ? c[o.lang][o.index] = o.value : c[o.lang] = o.value) : o.index !== null ? (c === null && (c = []), c[o.index] = o.value) : c = o.value, Object.keys(a.selection).includes("rel") && a.selection.rel ? a.selection.rel[o.name] = c : a.selection.rel = { [o.name]: c }, Object.keys(a.selection).includes("dest") && n.emit("change", e.name, a.selection, e.lang, e.index);
    }
    return R(() => {
      a.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      formatString: l,
      changeEvent: s,
      changeEventNested: u,
      getList: r
    };
  }
});
const Dn = (e) => (M("data-v-61dd72e0"), e = e(), z(), e), Vn = { class: "record" }, Rn = { class: "single-entry" }, Nn = ["value"], Ln = ["disabled", "source"], Un = ["title"], Pn = /* @__PURE__ */ Dn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Tn = [
  Pn
];
function Mn(e, n, t, l, a, r) {
  var u, o;
  const s = ae("Wrapper_nested");
  return m(), f("div", Vn, [
    i("div", Rn, [
      e.state.selection ? (m(), f("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Nn)) : (m(), f("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...c) => e.changeEvent && e.changeEvent(...c))
      }, null, 40, Ln)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), f("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Tn, 8, Un)) : S("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (m(), P(s, {
      key: 0,
      value: (o = e.value) == null ? void 0 : o.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : S("", !0)
  ]);
}
const Me = /* @__PURE__ */ C(jn, [["render", Mn], ["__scopeId", "data-v-61dd72e0"]]), Wn = D({
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
    const t = B("boneState"), l = w({});
    function a(r, s) {
      n.emit("change", e.name, r, e.lang, e.index);
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
const zn = { class: "box" };
function qn(e, n, t, l, a, r) {
  return m(), f("div", zn, I(e.value), 1);
}
const Fn = /* @__PURE__ */ C(Wn, [["render", qn], ["__scopeId", "data-v-343aca69"]]), Kn = D({
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
    const t = B("boneState"), l = q(), a = w({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function r() {
      console.log(j.downloadUrlFor(e.value)), window.open(j.downloadUrlFor(e.value));
    }
    function s() {
      return j.downloadUrlFor(e.value, !1);
    }
    function u(d) {
      const g = {
        fileName: d.name,
        mimeType: d.type || "application/octet-stream",
        size: d.size.toString()
      };
      return new Promise((b, v) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: g }).then(async (y) => {
          let h = await y.json();
          fetch(h.values.uploadUrl, {
            body: d,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const _ = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: _ }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? b(A.values) : v(A);
            }).catch(($) => {
              v($);
            });
          }).catch((p) => {
            v(p);
          });
        }).catch((y) => {
          v(y);
        });
      });
    }
    async function o(d) {
      a.loading = !0;
      for (let g of d.target.files) {
        let b = await u(g);
        l.value.value = null, n.emit("change", e.name, { dest: b, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function c(d) {
      a.loading = !0, a.droparea = !1;
      for (let g of d.dataTransfer.files) {
        let b = await u(g);
        l.value.value = null, n.emit("change", e.name, { dest: b, rel: null }, e.lang, e.index);
        break;
      }
      a.loading = !1;
    }
    return {
      state: a,
      boneState: t,
      downloadFile: r,
      createBackgroundImage: s,
      handleUpload: o,
      uploadinput: l,
      handleDrop: c
    };
  }
});
const fe = (e) => (M("data-v-91086308"), e = e(), z(), e), Hn = {
  key: 0,
  class: "loader"
}, Gn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Zn = [
  Gn
], Jn = {
  key: 1,
  class: "droparea"
}, Qn = ["title"], Yn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), Xn = [
  Yn
], xn = ["multiple"], es = ["title"], ts = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), ns = [
  ts
], ss = { class: "box" }, as = ["src"], ls = ["label", "open"], os = ["src"], rs = {
  key: 1,
  class: "preview"
}, is = {
  key: 0,
  name: "file-earmark"
}, us = { key: 2 }, ds = ["title"], cs = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), ms = [
  cs
];
function fs(e, n, t, l, a, r) {
  var s, u, o, c, d, g, b, v, y, h;
  return m(), f("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((p) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (p) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...p) => e.handleDrop && e.handleDrop(...p), ["prevent"]))
  }, [
    e.state.loading ? (m(), f("div", Hn, Zn)) : S("", !0),
    e.state.droparea ? (m(), f("div", Jn, " Dateien hier hinziehen ")) : S("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), f("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (p) => e.uploadinput.click())
    }, Xn, 8, Qn)) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...p) => e.handleUpload && e.handleUpload(...p))
    }, null, 40, xn),
    e.value ? (m(), f("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...p) => e.downloadFile && e.downloadFile(...p))
    }, ns, 8, es)) : S("", !0),
    i("div", ss, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), f("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (p) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, as),
        i("sl-dialog", {
          label: decodeURIComponent((c = (o = e.value) == null ? void 0 : o.dest) == null ? void 0 : c.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, os)
        ], 8, ls)
      ])) : (m(), f("div", rs, [
        (g = (d = e.value) == null ? void 0 : d.dest) != null && g.name ? (m(), f("sl-icon", is)) : S("", !0)
      ])),
      (v = (b = e.value) == null ? void 0 : b.dest) != null && v.name ? (m(), f("div", us, I(decodeURIComponent((h = (y = e.value) == null ? void 0 : y.dest) == null ? void 0 : h.name)), 1)) : S("", !0)
    ]),
    e.boneState.multiple ? S("", !0) : (m(), f("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (p) => e.$emit("change", e.name, "", e.lang, e.index))
    }, ms, 8, ds))
  ], 32);
}
const We = /* @__PURE__ */ C(Kn, [["render", fs], ["__scopeId", "data-v-91086308"]]), gs = D({
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
    const t = B("boneState"), l = w({
      value: "",
      editorConfig: {},
      editor: k(() => Oe)
    });
    function a(u) {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }
    function r(u) {
      l.value = u.target.value, n.emit("change", e.name, l.value, e.lang, e.index);
    }
    R(() => {
      e.value !== null && (l.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      u.editing.view.change((o) => {
        o.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return se(
      () => e.value,
      (u, o) => {
        l.value = u;
      }
    ), {
      state: l,
      ClassicEditor: Oe,
      boneState: t,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: r
    };
  }
});
const hs = ["disabled", "value"];
function ps(e, n, t, l, a, r) {
  var u, o, c, d;
  const s = ae("ckeditor");
  return e.state.editor ? (m(), f(E, { key: 0 }, [
    ((u = e.boneState.bonestructure) == null ? void 0 : u.valid_html) || ((o = e.boneState.bonestructure) == null ? void 0 : o.validHtml) ? (m(), P(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (g) => e.state.value = g),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), f("sl-textarea", {
      key: 1,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...g) => e.changeEventTextarea && e.changeEventTextarea(...g))
    }, null, 40, hs))
  ], 64)) : S("", !0);
}
const ze = /* @__PURE__ */ C(gs, [["render", ps]]), vs = D({
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
    const t = B("boneState"), l = w({
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
});
const bs = ["name", "min", "max", "disabled"], _s = ["name", "min", "max", "disabled"];
function ys(e, n, t, l, a, r) {
  return m(), f(E, null, [
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
    }, null, 40, bs), [
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
    }, null, 40, _s), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const qe = /* @__PURE__ */ C(vs, [["render", ys], ["__scopeId", "data-v-7bc31020"]]), $s = D({
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
    const t = B("boneState"), l = w({
      counter: 0,
      debounce: null
    }), a = B("addMultipleEntry"), r = B("removeMultipleEntries");
    function s() {
      l.counter += 1;
      let o = 200;
      l.counter > 1 && (o = 500), l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        for (let c = l.counter; c--; )
          a(e.lang);
        l.counter = 0;
      }, o);
    }
    function u() {
      let o = 200;
      l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        r(e.lang);
      }, o);
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: l,
      boneState: t,
      handleAdd: s,
      handleRemove: u,
      removeMultipleEntries: r
    };
  }
});
const Qe = (e) => (M("data-v-63e75dee"), e = e(), z(), e), Ss = { class: "actionbar" }, ks = ["title"], ws = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Es = [
  ws
], As = ["title"], Cs = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Is(e, n, t, l, a, r) {
  return m(), f("div", Ss, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Es, 8, ks)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Cs,
      O(" " + I(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), f(E, { key: 0 }, [
        O("(" + I(e.state.counter) + ")", 1)
      ], 64)) : S("", !0)
    ], 8, As)) : S("", !0)
  ]);
}
const Os = /* @__PURE__ */ C($s, [["render", Is], ["__scopeId", "data-v-63e75dee"]]), Bs = D({
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
    const t = B("boneState"), l = B("addMultipleEntry"), a = B("formatString"), r = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(o) {
      let c = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), j.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${c}limit=99`
      ).then(async (d) => {
        var b;
        const g = await d.json();
        return s.skels = g.skellist.reduce((v, y) => (v[y.key] = y, v), {}), (b = g.skellist) == null ? void 0 : b.map((v) => ({ text: a(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: r,
      getList: u
    };
  }
});
const Ye = (e) => (M("data-v-eeea51c6"), e = e(), z(), e), js = { class: "actionbar" }, Ds = ["title"], Vs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Rs = [
  Vs
], Ns = ["source"], Ls = ["title"], Us = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ps(e, n, t, l, a, r) {
  return m(), f("div", js, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Rs, 8, Ds)) : S("", !0),
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
    }, null, 40, Ns),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Us,
      O(" " + I(e.$t("bone.list")), 1)
    ], 8, Ls)) : S("", !0)
  ]);
}
const Ts = /* @__PURE__ */ C(Bs, [["render", Ps], ["__scopeId", "data-v-eeea51c6"]]), Ms = D({
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
    const t = B("boneState"), l = B("addMultipleEntry");
    B("formatString");
    const a = null, r = q(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(d) {
      const g = {
        fileName: d.name,
        mimeType: d.type || "application/octet-stream",
        size: d.size.toString()
      };
      return new Promise((b, v) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: g }).then(async (y) => {
          let h = await y.json();
          fetch(h.values.uploadUrl, {
            body: d,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const _ = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: _ }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? b(A.values) : v(A);
            }).catch(($) => {
              v($);
            });
          }).catch((p) => {
            v(p);
          });
        }).catch((y) => {
          v(y);
        });
      });
    }
    async function o(d) {
      s.loading = !0;
      for (let g of d.target.files) {
        let b = await u(g);
        r.value.value = null;
        let v = null;
        s.hasUsing && (v = void 0), l(e.lang, { dest: b, rel: v });
      }
      s.loading = !1;
    }
    async function c(d) {
      s.loading = !0, s.droparea = !1;
      for (let g of d.dataTransfer.files) {
        let b = await u(g);
        r.value.value = null;
        let v = null;
        s.hasUsing && (v = void 0), l(e.lang, { dest: b, rel: v });
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
      uploadinput: r,
      handleUpload: o,
      handleDrop: c
    };
  }
});
const ye = (e) => (M("data-v-9bac9f8a"), e = e(), z(), e), Ws = ["title"], zs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), qs = [
  zs
], Fs = {
  key: 1,
  class: "droparea"
}, Ks = ["multiple"], Hs = ["title"], Gs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Zs = [
  Gs
], Js = ["title"], Qs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), Ys = {
  key: 0,
  slot: "suffix"
};
function Xs(e, n, t, l, a, r) {
  return m(), f("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = de((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = de((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, qs, 8, Ws)) : S("", !0),
    e.state.droparea ? (m(), f("div", Fs, " Dateien hier hinziehen ")) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Ks),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Zs, 8, Hs)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Qs,
      O(" " + I(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), f("sl-spinner", Ys)) : S("", !0)
    ], 8, Js)) : S("", !0)
  ], 32);
}
const xs = /* @__PURE__ */ C(Ms, [["render", Xs], ["__scopeId", "data-v-9bac9f8a"]]), $e = _e("boneStore", () => {
  const e = w({
    additionalBones: H({}),
    defaultBones: H({
      rawBone: be,
      keyBone: Be,
      stringBone: je,
      emailBone: De,
      dateBone: Ve,
      booleanBone: Ne,
      selectBone: Re,
      passwordBone: Le,
      recordBone: Ue,
      numericBone: Te,
      colorBone: Pe,
      relationalBone: Me,
      jsonBone: Fn,
      fileBone: We,
      textBone: ze,
      spatialBone: qe
    }),
    actionbars: H({
      "relational.tree.leaf.file.file": xs,
      "relational.": Ts
    }),
    multibones: H(["select", "select."])
  });
  function n(s, u) {
    e.additionalBones[s] = u;
  }
  function t() {
    let s = e.defaultBones;
    for (const [u, o] of Object.entries(e.additionalBones))
      s.add(o);
    return s;
  }
  function l(s) {
    if (Object.keys(e.additionalBones).includes(s))
      return e.additionalBones[s];
    {
      let u = s.split("."), o = Object.entries(e.additionalBones).filter(
        (c) => c[0].startsWith(u[0] + ".")
      );
      if (o.length > 0) {
        o.sort((c, d) => d.length - c.length);
        for (let c of o)
          if (s.startsWith(c[0]))
            return e.additionalBones[c[0]];
      }
    }
    return s === "date" ? Ve : s === "key" ? Be : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? je : s === "select" || s.startsWith("select.") ? Re : s === "bool" ? Ne : s === "password" ? Le : s === "record" ? Ue : s === "numeric" || s.startsWith("numeric.") ? Te : s === "relational.tree.leaf.file.file" ? We : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Pe : s === "text" ? ze : s === "spatial" ? qe : be;
  }
  function a(s, u) {
    e.actionbars[s] = u;
  }
  function r(s) {
    if (Object.keys(e.actionbars).includes(s))
      return e.actionbars[s];
    {
      let u = s.split("."), o = Object.entries(e.actionbars).filter(
        (c) => c[0].startsWith(u[0] + ".")
      );
      if (o.length > 0) {
        o.sort((c, d) => d.length - c.length);
        for (let c of o)
          if (s.startsWith(c[0]))
            return e.actionbars[c[0]];
      }
    }
    return Os;
  }
  return {
    state: e,
    addBoneWidget: n,
    getBoneWidget: l,
    importWidgets: t,
    addBoneActionbar: a,
    getBoneActionbar: r
  };
});
function ea(e) {
  return $e().getBoneActionbar(e);
}
function x(e) {
  return $e().getBoneWidget(e);
}
function ta(e) {
  const n = $e();
  if (n.state.multibones.includes(e))
    return !0;
  {
    let t = e.split("."), l = Object.entries(n.state.multibones).filter(
      (a) => a[1].startsWith(t[0] + ".")
    );
    if (l.length > 0) {
      l.sort((a, r) => r.length - a.length);
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
    wrapperMultiple: Ct,
    BoneLabel: Vt
  },
  props: {
    is: {
      type: Object,
      default: be
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
        return ea((h = t.bonestructure) == null ? void 0 : h.type);
      }),
      isEmpty: k(() => {
        function h(p) {
          for (const [_, $] of Object.entries(p))
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
        for (let p of e.errors)
          p.fieldPath[0] === e.name && (p.severity > 2 || t.required && (p.severity === 2 || p.severity === 0)) && h.push(p.errorMessage);
        return h;
      })
    });
    ie("boneState", t);
    function l(h, p, _) {
      s(p, h, "isDragging"), s(p, h, "dragStartIndex");
    }
    function a(h, p, _) {
      _.preventDefault();
      const $ = _.clientY - _.target.getBoundingClientRect().top, A = _.target.closest(".value-line");
      $ < A.offsetHeight / 2 ? (s(p, h, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = h) : (s(p, h, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = h + 1);
      let N = p ? t.bonevalue[p] : t.bonevalue;
      t.dropIndex.index > N.length - 1 && (t.dropIndex.index -= 1);
    }
    function r(h, p, _) {
      let $ = null;
      t.dragStartIndex.index !== t.dropIndex.index && (p ? ($ = t.bonevalue[p].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[p].splice(t.dropIndex.index, 0, $)) : ($ = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, $)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: c(),
        lang: p,
        index: h
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(h, p, _) {
      t[_].lang = h || null, t[_].index = p;
    }
    function u(...h) {
      h.forEach((p) => {
        t[p] = {
          lang: null,
          index: Number
        };
      });
    }
    function o(h, p, _ = null, $ = null, A) {
      if (p === void 0 || (_ ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(_) && $ !== null ? t.bonevalue[_][$] = p : t.bonevalue[_] = p) : $ !== null ? t.bonevalue[$] = p : A === !1 || (t.bonevalue = p), t.readonly))
        return !1;
      let N = {
        name: h,
        value: c(),
        lang: _,
        index: $
      }, V = {
        name: h,
        value: p,
        lang: _,
        index: $
      };
      A != null && (N.pwMatch = A, V.pwMatch = A), n.emit("change", N), n.emit("change-internal", V);
    }
    function c() {
      function h(_, $ = null) {
        let A = [];
        if (Array.isArray(_))
          if (t.bonestructure.type == "spatial" && _.length === 2 && !Array.isArray(_[0]))
            A.push({ [$ + ".lat"]: _[0] }), A.push({ [$ + ".lng"]: _[1] });
          else if (Object.values(_).filter((N) => N === Object(N)).length > 0)
            for (const [N, V] of _.entries())
              V.rel !== null ? A.push(h(V, $ + "." + N)) : A.push(h(V, $));
          else
            for (const [N, V] of _.entries())
              A.push(h(V, $));
        else if (_ === Object(_))
          for (const [N, V] of Object.entries(_))
            $ ? $.endsWith(".dest") || $.endsWith(".rel") ? $.endsWith(".dest") && N === "key" ? (/\.[0-9]*\.dest$/.test($) ? A.push(h(V, $.replace(/\.[0-9]*\.dest/, ""))) : A.push(h(V, $.replace(/\.dest/, ""))), A.push(h(V, $.replace(/\.dest/, "") + "." + N))) : $.endsWith(".rel") && A.push(h(V, $.replace(/\.rel/, "") + "." + N)) : A.push(h(V, $ + "." + N)) : A.push(h(V, N));
        else
          _ == null && (_ = ""), $ !== null && A.push({ [$]: _ });
        return A;
      }
      let p = h(t.bonevalue, e.name);
      return p = p.flat(10), p;
    }
    function d(h = null, p = "") {
      h ? Object.keys(t.bonevalue).includes(h) ? t.bonevalue[h].push(p) : t.bonevalue[h] = [p] : t.bonevalue ? t.bonevalue.push(p) : t.bonevalue = [p];
    }
    ie("addMultipleEntry", d);
    function g(h, p = null) {
      var _;
      p ? (_ = t.bonevalue) == null || _[p].splice(h, 1) : t.bonevalue.splice(h, 1), n.emit("change", {
        name: e.name,
        value: c(),
        lang: p,
        index: h
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: p,
        index: h
      });
    }
    function b(h = null) {
      var p;
      h ? (p = t.bonevalue) == null || p[h].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: c(),
        lang: h
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: h
      });
    }
    ie("removeMultipleEntries", b);
    function v(h = null, p = "") {
      d(h, p);
    }
    function y(h, p) {
      function _(V) {
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
      function $(V, Z) {
        let F = V.split("."), ne = V.split("."), T = Z;
        for (let Y of F)
          if (ne.shift(), T && T !== "-" && Object.keys(T).includes(Y) && T[Y])
            if (Array.isArray(T[Y])) {
              let Ae = [];
              for (let xe of T[Y])
                Ae.push($(ne.join("."), xe));
              T = Ae.join(", ");
            } else
              T = T[Y];
          else
            (!T || typeof T[Y] == "object" && !T[Y]) && (T = "-");
        return T;
      }
      let A = _(h), N = [];
      Array.isArray(p) || (p = [p]);
      for (let V of p) {
        let Z = h;
        for (let F of A) {
          let ne = $(F, V);
          Z = Z.replace("$(" + F + ")", ne);
        }
        N.push(Z);
      }
      return N.join(", ");
    }
    return ie("formatString", y), Q(() => {
      var h;
      e.value ? t.bonevalue = e.value : t.bonevalue = (h = e.skel) == null ? void 0 : h[e.name];
    }), se(
      () => e.skel,
      (h, p) => {
        var _;
        t.bonevalue = (_ = e.skel) == null ? void 0 : _[e.name];
      }
    ), se(
      () => {
        var h;
        return (h = e.errors) == null ? void 0 : h[e.name];
      },
      (h, p) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: o,
      addMultipleEntry: d,
      removeMultipleEntry: g,
      removeMultipleEntries: b,
      BoneHasMultipleHandling: ta,
      multipleBonePressEnter: v,
      handleDragStart: l,
      handleDragOver: a,
      handleDrop: r,
      setStateProperties: s,
      resetStateProperties: u
    };
  }
});
const Se = {
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
  ot((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, Ke = Se.setup;
Se.setup = Ke ? (e, n) => (Fe(), Ke(e, n)) : Fe;
const na = (e) => (M("data-v-46c45785"), e = e(), z(), e), sa = {
  key: 0,
  class: "loading"
}, aa = /* @__PURE__ */ na(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), la = { class: "logo" }, oa = ["src"];
function ra(e, n, t, l, a, r) {
  return m(), P(rt, null, {
    default: it(() => [
      t.active ? (m(), f("div", sa, [
        aa,
        i("div", la, [
          i("sl-icon", { src: t.logo }, null, 8, oa)
        ])
      ])) : S("", !0)
    ]),
    _: 1
  });
}
const ia = /* @__PURE__ */ C(Se, [["render", ra], ["__scopeId", "data-v-46c45785"]]), ee = _e("cartstore", () => {
  const e = new ft({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = w({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    paymentProviders: {}
  });
  async function t() {
    await a();
  }
  async function l(b) {
    return await e.cart_list({ cart_key: b });
  }
  async function a() {
    (await e.cart_list()).forEach((v) => {
      v.is_root_node && (v.cart_type === "basket" ? n.basketRootNode = v : n.whishlistRootNodes.push(v));
    });
  }
  async function r(b, v) {
    let y = await e.article_add({
      article_key: b,
      parent_cart_key: v
    });
    console.log("addToCart", y);
  }
  async function s(b, v) {
    let y = await e.article_view({
      article_key: b,
      parent_cart_key: v
    });
    console.log("getArticleView", y);
  }
  async function u(b, v) {
    let y = await e.article_remove({
      article_key: b,
      parent_cart_key: v
    });
    console.log("remove Resp", y);
  }
  async function o(b, v, y) {
    let h = await e.article_update({
      article_key: b,
      parent_cart_key: v,
      quantity: y,
      quantity_mode: "replace"
    });
    console.log("update Resp", h);
  }
  async function c() {
    let b = await e.address_structure();
    n.structure.address = b.addSkel, console.log("adress add", n.structure.address);
  }
  async function d(b) {
    await e.discount_add({ code: b });
  }
  async function g() {
    const b = await e.payment_providers_list();
    console.log(b), n.paymentProviders = b;
  }
  return {
    state: n,
    addToCart: r,
    getArticleView: s,
    removeItem: u,
    updateItem: o,
    init: t,
    getAdressStructure: c,
    getChildren: l,
    addDiscount: d,
    payment_providers_list: g
  };
}), ua = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), f("pre", null, I(e.node.name), 1));
  }
};
const ge = (e) => (M("data-v-d313b580"), e = e(), z(), e), da = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ca = ["src"], ma = { class: "viur-shop-cart-leaf-headline headline" }, fa = { class: "viur-shop-cart-leaf-artno" }, ga = ["innerHTML"], ha = { class: "viur-shop-cart-leaf-quantity" }, pa = { class: "viur-shop-cart-leaf-unitprice" }, va = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "St\xFCckpreis", -1)), ba = ["value"], _a = { class: "viur-shop-cart-leaf-actions" }, ya = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), $a = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Sa = [
  $a
], ka = { class: "viur-shop-cart-leaf-price" }, wa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Ea = ["value"], Aa = {
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
    function r(o) {
      return o !== void 0 ? mt.downloadUrlFor(o) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(o, c, d, g) {
      l("updateItem", {
        item: o,
        articleKey: c,
        node: d,
        quantity: g
      });
    }
    function u(o, c, d) {
      l("removeItem", { item: o, articleKey: c, node: d });
    }
    return Q(() => {
      a.leaf = t.leaf;
    }), (o, c) => (m(), f("sl-card", da, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: r(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, ca),
      i("h4", ma, I(a.leaf.shop_name), 1),
      i("h5", fa, I(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, ga),
      i("div", ha, [
        J(i("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": c[0] || (c[0] = (d) => a.leaf.quantity = d),
          onInput: c[1] || (c[1] = (d) => s(
            a.leaf,
            a.leaf.article.dest.key,
            e.node,
            a.leaf.quantity
          ))
        }, null, 544), [
          [oe, a.leaf.quantity]
        ])
      ]),
      i("div", pa, [
        va,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, ba)
      ]),
      i("div", _a, [
        ya,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: c[2] || (c[2] = (d) => u(a.leaf, a.leaf.article.dest.key, e.node))
        }, Sa)
      ]),
      i("div", ka, [
        wa,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, Ea)
      ])
    ]));
  }
}, Ca = /* @__PURE__ */ C(Aa, [["__scopeId", "data-v-d313b580"]]), Ia = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Oa = { key: 0 }, Ba = { key: 0 }, ja = { key: 1 }, Da = {
  __name: "Discount",
  setup(e) {
    const n = ee(), t = q(null), l = q(null), a = w({
      errorMessage: ""
    });
    function r() {
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
        i("sl-button", { onClick: r }, "Einl\xF6sen"),
        i("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: l
        }, [
          Ia,
          O(" " + I(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        L(n).state.basketRootNode.discount ? (m(), f("div", Oa, [
          L(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), f("span", Ba, " Sie haben einen Rabattcode im Wert von " + I(L(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : S("", !0),
          L(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), f("span", ja, " Sie haben einen Rabattcode im Wert von " + I(L(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : S("", !0)
        ])) : S("", !0)
      ])
    ], 64));
  }
};
const K = (e) => (M("data-v-84507113"), e = e(), z(), e), Va = { key: 0 }, Ra = /* @__PURE__ */ K(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Na = {
  class: "footer-wrap",
  slot: "footer"
}, La = { class: "viur-shop-cart-node" }, Ua = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), Pa = /* @__PURE__ */ K(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Ta = /* @__PURE__ */ K(() => /* @__PURE__ */ i("br", null, null, -1)), Ma = { class: "viur-shop-cart-sidebar-info-line" }, Wa = /* @__PURE__ */ K(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), za = { class: "viur-shop-cart-sidebar-info-line" }, qa = /* @__PURE__ */ K(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Fa = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ O(" 0 \u20AC ")
], -1)), Ka = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ O(" \u20AC ")
], -1)), Ha = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
    /* @__PURE__ */ O(" Paypal ")
  ])
], -1)), Ga = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), Za = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(e) {
    const n = e, t = ee(), l = q(null), a = w({
      itemsIsInit: k(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    k(() => n.mode === "basket" ? t.state.basketRootNode.key : n.cartKey);
    async function r() {
      await t.updateItem(
        a.currentItem.article.dest.key,
        a.currentNode.key,
        0
      ), await c(), l.value.hide();
    }
    async function s(g) {
      console.log("updateItem :", g), g.quantity === 0 ? (l.value.show(), a.currentItem = g.item, a.currentNode = g.node) : (await t.updateItem(g.articleKey, g.node.key, g.quantity), await t.init());
    }
    function u(g) {
      console.log("removeItem :", g), l.value.show(), a.currentItem = g.item, a.currentNode = g.node;
    }
    async function o() {
      a.leaves[a.currentNode.key].forEach((g) => {
        g.key === a.currentItem.key && (g.quantity = 1);
      }), a.currentItem = {}, a.currentNode = {};
    }
    async function c() {
      a.nodes = [], a.leaves = {}, await t.init(), await d();
    }
    async function d(g = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", g);
      const b = await t.getChildren(g);
      console.log("getChildren children: ", b), b.forEach(async (v) => {
        v.skel_type === "node" ? (a.nodes.push(v), await d(v.key)) : (Object.keys(a.leaves).includes(g) || (a.leaves[g] = []), a.leaves[g].push(v));
      });
    }
    return Q(async () => {
      await t.init(), await d(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (g, b) => e.cartKey.length ? (m(), f(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: o
      }, [
        Ra,
        i("div", Na, [
          i("sl-button", {
            variant: "danger",
            onClick: b[0] || (b[0] = (v) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: r,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), f(E, null, U(a.nodes, (v) => (m(), f("div", La, [
        Object.keys(a.leaves).includes(v.key) ? (m(), f(E, { key: 0 }, [
          Ie(ua, { node: v }, null, 8, ["node"]),
          (m(!0), f(E, null, U(a.leaves[v.key], (y) => (m(), P(Ca, {
            key: y.key,
            leaf: y,
            node: v,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : S("", !0)
      ]))), 256)),
      Ua,
      e.sidebar ? (m(), P(Ge, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), f(E, { key: 0 }, [
          Pa,
          Ta,
          i("div", Ma, [
            Wa,
            O(" " + I(e.mode === "basket" ? L(t).state.basketRootNode.total : L(t).state.whishlistRootNodes[e.cartKey].total) + " \u20AC ", 1)
          ]),
          i("div", za, [
            qa,
            O(" " + I(L(t).state.basketRootNode.total - L(t).state.basketRootNode.total_discount_price) + " \u20AC ", 1)
          ]),
          Fa,
          Ka,
          Ha
        ], 64)) : S("", !0)
      ])) : S("", !0),
      Ie(Da),
      Ga
    ], 64)) : (m(), f("sl-spinner", Va));
  }
}, ke = /* @__PURE__ */ C(Za, [["__scopeId", "data-v-84507113"]]), Ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" }));
const le = (e) => (M("data-v-4082d346"), e = e(), z(), e), Qa = {
  key: 1,
  class: "list"
}, Ya = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), Xa = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ O(" Versandadresse "),
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
    /* @__PURE__ */ O(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" Speicherstra\xDFe 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ O(" Rechnungsadresse "),
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
    /* @__PURE__ */ O(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" Speicherstra\xDFe 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ O(" 0231 21 34 68 90 ")
  ])
], -1)), xa = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ i("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ O(" Paypal ")
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
], -1)), el = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), tl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), nl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("br", null, null, -1)), sl = { class: "viur-shop-cart-sidebar-btn-wrap" }, al = ["variant", "disabled"], ll = {
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
    }), (a, r) => t.cartIsInit ? (m(), f("div", Qa, [
      Ya,
      Xa,
      xa,
      el,
      (m(), P(Ge, { to: "#order_sidebar" }, [
        tl,
        nl,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", sl, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, al)
        ])
      ]))
    ])) : (m(), P(ia, { key: 0 }));
  }
}, we = /* @__PURE__ */ C(ll, [["__scopeId", "data-v-4082d346"]]), ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
const rl = (e) => (M("data-v-50f31583"), e = e(), z(), e), il = { class: "bind viur-shop-wrap" }, ul = ["panel", "disabled"], dl = { class: "viur-shop-order-step" }, cl = ["name", "library"], ml = { class: "viur-shop-order-status-text" }, fl = { class: "viur-shop-order-status-span" }, gl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, hl = ["name"], pl = ["onClick"], vl = ["onClick"], bl = /* @__PURE__ */ rl(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), _l = {
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
      isFirstTab: (d) => d === 0
    }), r = q(null);
    function s(d) {
      let g = [], b = [];
      for (const v in d)
        d[v].position ? g.push([v, d[v].position]) : g.push([v, 0]);
      return g.sort((v, y) => v[1] - y[1]), g.forEach((v) => {
        b.push(v[0]);
      }), b;
    }
    function u(d) {
      l("tabChange", d);
    }
    function o(d) {
      r.value.show(d);
    }
    function c(d) {
      r.value.show(d);
    }
    return (d, g) => (m(), f("div", il, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: r
      }, [
        (m(!0), f(E, null, U(a.tabNames, (b, v) => {
          var y;
          return m(), f("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: b,
            key: b,
            disabled: e.tabs[b].disabled
          }, [
            i("div", dl, [
              (y = e.tabs[b].icon) != null && y.name ? (m(), f("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[b].icon.name,
                library: e.tabs[b].icon.library
              }, null, 8, cl)) : S("", !0),
              i("div", ml, [
                O(I(v + 1) + ". ", 1),
                i("span", fl, I(e.tabs[b].displayName), 1)
              ])
            ]),
            v < a.tabNames.length - 1 ? (m(), f("sl-icon", gl)) : S("", !0)
          ], 8, ul);
        }), 128)),
        (m(!0), f(E, null, U(a.tabNames, (b, v) => (m(), f("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: b,
          key: b
        }, [
          (m(), P(ut(e.tabs[b].component), dt({ ref_for: !0 }, e.tabs[b].props ? e.tabs[b].props : ""), null, 16)),
          v !== a.tabNames.length - 1 ? (m(), f("div", {
            key: 0,
            class: G(["viur-shop-form-footer", { "flex-end": a.isFirstTab(v) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (y) => o(a.tabNames[v - 1])
            }, " Zur\xFCck ", 8, pl), [
              [ve, v !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (y) => c(a.tabNames[v + 1])
            }, " Weiter ", 8, vl)
          ], 2)) : S("", !0)
        ], 8, hl))), 128))
      ], 544),
      bl
    ]));
  }
}, yl = /* @__PURE__ */ C(_l, [["__scopeId", "data-v-50f31583"]]);
const he = (e) => (M("data-v-688e20e0"), e = e(), z(), e), $l = { class: "bind" }, Sl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), kl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ O(" 123345670 ")
], -1)), wl = { class: "paragraph" }, El = /* @__PURE__ */ he(() => /* @__PURE__ */ i("br", null, null, -1)), Al = { class: "btn-wrap" }, Cl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Il = {
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
    return (t, l) => (m(), f("div", $l, [
      Sl,
      kl,
      i("p", wl, [
        O(" Wir haben Ihre Bestellung erhalten und werden diese schenllstm\xF6glich bearbeiten."),
        El,
        O(" Sie erhalten in wenigen Minuten eine Best\xE4tigung per E-Mail. "),
        i("div", Al, [
          Cl,
          i("sl-button", {
            variant: "primary",
            onClick: l[0] || (l[0] = (a) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Ol = /* @__PURE__ */ C(Il, [["__scopeId", "data-v-688e20e0"]]);
const Ee = (e) => (M("data-v-903d08d7"), e = e(), z(), e), Bl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), jl = { class: "viur-shop-form-wrap" }, Dl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Vl = { class: "viur-shop-form-wrap" }, Rl = { key: 0 }, Nl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ll = { class: "viur-shop-form-wrap" }, Ul = {
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
      for (const [o, c] of Object.entries(u.value[0]))
        t.formValues[o] = c;
    }
    function r(s) {
      let u = {};
      return Array.isArray(s) ? (s.forEach((o) => {
        let c = o[0], d = o[1];
        u[c] = d;
      }), console.log("output", u), u) : s;
    }
    return se(t.formValues, (s) => {
      Object.entries(s).forEach(([u, o]) => {
        o === "" && delete t.formValues[u];
      });
    }), Q(async () => {
      await n.getAdressStructure(), t.addSkel = r(n.state.structure.address);
    }), (s, u) => {
      const o = ae("bone");
      return m(), f(E, null, [
        i("div", null, [
          Bl,
          i("div", jl, [
            (m(!0), f(E, null, U(t.addSkel, (c, d) => (m(), f(E, { key: d }, [
              c.visible && c.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + d)
              }, [
                c.visible && c.params.group === "Customer Info" ? (m(), P(o, {
                  key: 0,
                  is: L(x)(c.type),
                  name: d,
                  structure: r(t.addSkel),
                  errors: t.errors[d] ? t.errors[d] : [],
                  skel: t.formValues,
                  onChange: (g) => a(d, g),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Dl,
          i("div", Vl, [
            (m(!0), f(E, null, U(t.addSkel, (c, d) => (m(), f(E, { key: d }, [
              c.visible && c.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + d)
              }, [
                c.visible && c.params.group === "Customer Address" ? (m(), P(o, {
                  key: 0,
                  is: L(x)(c.type),
                  name: d,
                  structure: r(t.addSkel),
                  errors: t.errors[d] ? t.errors[d] : [],
                  skel: t.formValues,
                  onChange: (g) => a(d, g)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (m(), f("div", Rl, [
          Nl,
          i("div", Ll, [
            (m(!0), f(E, null, U(t.addSkel, (c, d) => (m(), f(E, { key: d }, [
              c.visible && c.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + d)
              }, [
                c.visible && c.params.group === "Customer Address" ? (m(), P(o, {
                  key: 0,
                  is: L(x)(c.type),
                  name: d,
                  structure: r(t.addSkel),
                  errors: t.errors[d] ? t.errors[d] : [],
                  skel: t.formValues,
                  onChange: (g) => a(d, g)
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
}, Pl = /* @__PURE__ */ C(Ul, [["__scopeId", "data-v-903d08d7"]]);
const te = (e) => (M("data-v-489988f4"), e = e(), z(), e), Tl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Ml = { class: "viur-shop-form-wrap" }, Wl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), zl = ["onSlChange", "onSlClear", "label"], ql = ["value"], Fl = { key: 0 }, Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Hl = { class: "viur-shop-form-wrap" }, Gl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), Zl = [
  Gl
], Jl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), Ql = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), Yl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), Xl = {
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
    }), l = q(null), a = q(null);
    function r(b) {
      b.target.checked && (t.isCustomAdress = !1), b.target.checked || (t.isCustomAdress = !0);
    }
    function s() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie k\xF6nnen nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, a.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(b, v) {
      for (const [y, h] of Object.entries(v.value[0]))
        t.formValues[y] = h;
    }
    function o() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function c(b, v) {
      if (console.log(b.target.value), !b.target.value.length) {
        d();
        return;
      }
      t.selectedItem[v] = b.target.value, t.isItemSelected = !0;
    }
    function d(b, v) {
      console.log("clearing..."), delete t.selectedItem[v], t.isItemSelected = !1;
    }
    function g(b) {
      let v = {};
      return Array.isArray(b) ? (b.forEach((y) => {
        let h = y[0], p = y[1];
        v[h] = p;
      }), v) : b;
    }
    return se(t.formValues, (b) => {
      Object.entries(b).forEach(([v, y]) => {
        y === "" && delete t.formValues[v];
      });
    }), Q(async () => {
      await n.getAdressStructure(), t.addSkel = g(n.state.structure.address);
    }), (b, v) => {
      const y = ae("bone");
      return m(), f(E, null, [
        i("div", null, [
          Tl,
          i("div", Ml, [
            (m(!0), f(E, null, U(t.addSkel, (h, p) => (m(), f(E, { key: p }, [
              h.visible && h.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + p)
              }, [
                h.visible && h.params.group === "Customer Info" ? (m(), P(y, {
                  key: 0,
                  is: L(x)(h.type),
                  name: p,
                  structure: g(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (_) => u(p, _)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        Wl,
        (m(!0), f(E, null, U(t.shippingAdressAmount, (h) => (m(), f("div", {
          class: "viur-shop-form-wrap",
          key: h
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (p) => c(p, h),
            onSlClear: (p) => d(p, h),
            label: t.selectedItem[h] ? L(n).state.carts[t.selectedItem[h]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), f(E, null, U(L(n).state.carts, (p, _) => (m(), f("sl-option", { value: _ }, I(p.info.name), 9, ql))), 256))
          ], 40, zl),
          (m(!0), f(E, null, U(t.addSkel, (p, _) => (m(), f(E, { key: _ }, [
            p.visible && p.params.group === "Customer Address" ? (m(), f("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + _)
            }, [
              p.visible && p.params.group === "Customer Address" ? (m(), P(y, {
                key: 0,
                is: L(x)(p.type),
                name: _,
                structure: g(t.addSkel),
                errors: t.errors[_] ? t.errors[_] : [],
                skel: t.formValues,
                onChange: ($) => u(_, $)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
            ], 2)) : S("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), f("div", Fl, [
          Kl,
          i("div", Hl, [
            (m(!0), f(E, null, U(t.addSkel, (h, p) => (m(), f(E, { key: p }, [
              h.visible && h.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + p)
              }, [
                h.visible && h.params.group === "Customer Address" ? (m(), P(y, {
                  key: 0,
                  is: L(x)(h.type),
                  name: p,
                  structure: g(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (_) => u(p, _)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ])) : S("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: o,
            title: "Lieferadresse entfernen"
          }, Zl),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            Jl,
            O(" Lieferadresse hinzuf\xFCgen ")
          ])
        ]),
        i("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: a,
          closable: ""
        }, [
          Ql,
          i("strong", null, I(t.amountAlert.title), 1),
          Yl,
          O(" " + I(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: r,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, xl = /* @__PURE__ */ C(Xl, [["__scopeId", "data-v-489988f4"]]), Xe = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), l = w({
      rootNode: {},
      tabs: {
        cart: {
          component: H(ke),
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
          component: H(we),
          props: {},
          displayName: "Bestellung pr\xFCfen",
          icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        orderComplete: {
          component: H(Ol),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: H(Pl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: H(xl),
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
    function a(r) {
      (r == null ? void 0 : r.detail.name) === "confirm" && (l.tabs.orderComplete.disabled = !1);
    }
    return Q(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (r, s) => (m(), P(yl, {
      tabs: l.tabs,
      onTabChange: a
    }, null, 8, ["tabs"]));
  }
}, eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" })), ho = {
  __name: "SelectPaymentProvider",
  setup(e) {
    const n = ee();
    return Q(async () => {
      await n.payment_providers_list(), console.log(n.state.paymentProviders);
    }), (t, l) => (m(!0), f(E, null, U(L(n).state.paymentProviders, (a, r) => (m(), f("div", null, [
      i("sl-card", null, I(r) + " " + I(a), 1)
    ]))), 256));
  }
}, to = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = gt();
    return { state: w({}), route: t };
  }
}), no = { class: "home" };
function so(e, n, t, l, a, r) {
  return m(), f("div", no, "View " + I(e.route.path) + " is missing.", 1);
}
const ao = /* @__PURE__ */ C(to, [["render", so]]), lo = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: ao
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView.b671e5ab.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.35be3c3f.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Ja)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => eo)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => ol)
  }
];
function po(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(lo), ht({
    history: pt("/"),
    routes: t
  });
}
const oo = ct(), vo = {
  install(e) {
    e.component("CartView", ke), e.component("ExampleUsage", Xe), e.component("ConfirmView", we), e.use(oo);
  }
};
export {
  ke as C,
  Ol as O,
  Pl as U,
  vo as V,
  C as _,
  Xe as a,
  we as b,
  yl as c,
  ho as d,
  po as e,
  ee as u
};
