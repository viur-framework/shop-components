var tt = Object.defineProperty;
var nt = (e, n, t) => n in e ? tt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => (nt(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, inject as B, reactive as w, openBlock as m, createElementBlock as f, normalizeClass as G, createElementVNode as i, renderSlot as He, pushScopeId as M, popScopeId as z, Fragment as E, createCommentVNode as S, toDisplayString as I, onMounted as R, ref as q, readonly as st, getCurrentScope as at, onScopeDispose as lt, unref as L, computed as k, watchEffect as ce, renderList as U, watch as se, withDirectives as J, vModelText as oe, getCurrentInstance as ot, resolveComponent as ae, createBlock as P, vShow as be, withModifiers as de, createTextVNode as O, shallowRef as H, provide as ie, onBeforeMount as Q, useCssVars as rt, Transition as it, withCtx as ut, createVNode as Ie, Teleport as Ge, resolveDynamicComponent as dt, mergeProps as ct } from "vue";
import { defineStore as _e, createPinia as mt } from "pinia";
import Oe from "@viur/ckeditor5-build-classic";
import { Request as ft } from "@viur/vue-utils";
import { ViURShopClient as gt } from "@viur/viur-shop-client";
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
}, Ze = (e) => (M("data-v-141aaf9b"), e = e(), z(), e), _t = ["draggable"], yt = ["disabled"], $t = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
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
function Ct(e, n, t, l, a, r) {
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
    }, St, 40, yt),
    i("div", kt, [
      He(e.$slots, "default", {}, void 0, !0)
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
    const t = B("boneState");
    return {
      state: w({
        debug: !1
      }),
      boneState: t
    };
  }
});
const Bt = { class: "bone-name" }, jt = { key: 0 }, Dt = { class: "bone" };
function Vt(e, n, t, l, a, r) {
  return m(), f(E, null, [
    i("label", Bt, [
      He(e.$slots, "default", {}, void 0, !0),
      S("", !0)
    ]),
    e.state.debug ? (m(), f("div", jt, [
      i("div", Dt, I(e.name), 1),
      i("pre", null, "    " + I(e.boneState) + `
    `, 1)
    ])) : S("", !0)
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
const Lt = ["disabled", "value"], Ut = ["disabled", "value"];
function Pt(e, n, t, l, a, r) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (m(), f("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...o) => e.changeEvent && e.changeEvent(...o))
  }, null, 40, Lt)) : (m(), f("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...o) => e.changeEvent && e.changeEvent(...o))
  }, null, 40, Ut));
}
const ve = /* @__PURE__ */ C(Nt, [["render", Pt], ["__scopeId", "data-v-0ebe5f0b"]]), Tt = D({
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
const Mt = ["value"];
function Wt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Mt);
}
const Be = /* @__PURE__ */ C(Tt, [["render", Wt], ["__scopeId", "data-v-b45a1311"]]);
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
    }, qt(n));
  }
  return l && (a.value = !0, Ft && o()), zt(u), {
    isPending: st(a),
    start: o,
    stop: u
  };
}
class Kt {
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
const Ht = D({
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
      Utils: Kt,
      boneState: t,
      changeEvent: r,
      stringBone: a
    };
  }
});
const Gt = ["disabled", "value", "required"];
function Zt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Gt);
}
const je = /* @__PURE__ */ C(Ht, [["render", Zt], ["__scopeId", "data-v-1ccbacc0"]]), Jt = D({
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
const Qt = ["disabled", "value"];
function Yt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
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
const xt = ["disabled", "type", "value"];
function en(e, n, t, l, a, r) {
  return m(), f("sl-input", {
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
const nn = ["disabled", "value", "multiple"], sn = ["value"];
function an(e, n, t, l, a, r) {
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
    }, I(s[1]), 9, sn))), 128))
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
const on = ["disabled", "checked"];
function rn(e, n, t, l, a, r) {
  return m(), f("sl-switch", {
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
const dn = ["disabled"], cn = ["name"], mn = ["name"], fn = { class: "errors" };
function gn(e, n, t, l, a, r) {
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
      }, null, 8, cn)
    ], 42, dn), [
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
      }, null, 8, mn)
    ], 544)), [
      [oe, e.state.value2]
    ]),
    i("ul", fn, [
      (m(!0), f(E, null, U(e.state.passwordInfo, (s, u) => (m(), f("li", { key: u }, I(s), 1))), 128)),
      (m(!0), f(E, null, U(e.state.requiredPasswordInfo, (s, u) => (m(), f("li", {
        key: u,
        class: "requiredInfo"
      }, I(s), 1))), 128))
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
    const t = B("boneState"), l = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var c, d;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [g, v] of Object.entries(l.structure)) {
          let h = "default", _ = l.structure[g], p = (c = l.value) == null ? void 0 : c[g];
          (d = v == null ? void 0 : v.params) != null && d.category && (h = v.params.category.toLowerCase()), Object.keys(u).includes(h) ? u[h].bones.push({
            boneName: g,
            boneStructure: _,
            boneValue: p
          }) : u[h] = {
            name: v.params.category,
            bones: [
              {
                boneName: g,
                boneStructure: _,
                boneValue: p
              }
            ]
          }, _.visible === !0 && (u[h].groupVisible = !0);
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
      ot().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
}, bn = {
  key: 1,
  class: "form"
}, vn = ["summary", "open"];
function _n(e, n, t, l, a, r) {
  const s = ae("bone");
  return e.state.globalRegistration ? (m(), f("div", bn, [
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
        [be, e.state.structure[c.boneName].visible]
      ])), 128))
    ], 8, vn)), [
      [be, u.groupVisible]
    ])), 128))
  ])) : (m(), f("sl-alert", hn, " In Order to use this Bone register the bone component globally in your main file "));
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
function $n(e, n, t, l, a, r) {
  const s = ae("Wrapper_nested");
  return m(), P(s, {
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
const kn = ["disabled", "value"];
function wn(e, n, t, l, a, r) {
  return m(), f("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, kn);
}
const Pe = /* @__PURE__ */ C(Sn, [["render", wn], ["__scopeId", "data-v-534b9149"]]), En = D({
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
const An = ["disabled", "value", "min", "max", "step"], Cn = { class: "info" }, In = { key: 0 }, On = { key: 1 }, Bn = { key: 2 };
function jn(e, n, t, l, a, r) {
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
    }, null, 40, An),
    i("ul", Cn, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), f("li", In, I(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : S("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), f("li", On, I(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : S("", !0),
      e.state.precision ? (m(), f("li", Bn, I(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : S("", !0)
    ])
  ], 64);
}
const Te = /* @__PURE__ */ C(En, [["render", jn], ["__scopeId", "data-v-03d5b399"]]);
class ue extends Error {
  constructor(n, t, l, a) {
    super(l || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
  }
}
let he = null;
function X() {
  return he || (he = _e("requestStore", () => {
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
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = ({ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL ? { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: a = null, abortController: r = null, headers: s = null, mode: u = null } = {}) {
    function o() {
      if (t instanceof FormData)
        return t;
      const d = new FormData();
      for (const g in t)
        if (Array.isArray(t[g]))
          for (let v of t[g])
            d.append(g, v);
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
    return g.then(function(v) {
      l && l(v.data);
    }).catch(function(v) {
      a && a(v);
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
        for (const [v, h] of Object.entries(c))
          if (Array.isArray(h))
            for (const _ of h)
              g.append(v, _);
          else
            g.append(v, h);
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
        var v;
        const g = await d.json();
        a.skellistdata = {};
        for (let h of g.skellist)
          a.skellistdata[h.key] = h;
        return (v = g.skellist) == null ? void 0 : v.map((h) => ({ text: l(t.bonestructure.format, { dest: h }), value: h.key, data: h }));
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
const Vn = (e) => (M("data-v-61dd72e0"), e = e(), z(), e), Rn = { class: "record" }, Nn = { class: "single-entry" }, Ln = ["value"], Un = ["disabled", "source"], Pn = ["title"], Tn = /* @__PURE__ */ Vn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Mn = [
  Tn
];
function Wn(e, n, t, l, a, r) {
  var u, o;
  const s = ae("Wrapper_nested");
  return m(), f("div", Rn, [
    i("div", Nn, [
      e.state.selection ? (m(), f("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Ln)) : (m(), f("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...c) => e.changeEvent && e.changeEvent(...c))
      }, null, 40, Un)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), f("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Mn, 8, Pn)) : S("", !0)
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
const qn = { class: "box" };
function Fn(e, n, t, l, a, r) {
  return m(), f("div", qn, I(e.value), 1);
}
const Kn = /* @__PURE__ */ C(zn, [["render", Fn], ["__scopeId", "data-v-343aca69"]]), Hn = D({
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
      return new Promise((v, h) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: g }).then(async (_) => {
          let p = await _.json();
          fetch(p.values.uploadUrl, {
            body: d,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: p.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? v(A.values) : h(A);
            }).catch(($) => {
              h($);
            });
          }).catch((b) => {
            h(b);
          });
        }).catch((_) => {
          h(_);
        });
      });
    }
    async function o(d) {
      a.loading = !0;
      for (let g of d.target.files) {
        let v = await u(g);
        l.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function c(d) {
      a.loading = !0, a.droparea = !1;
      for (let g of d.dataTransfer.files) {
        let v = await u(g);
        l.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
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
const fe = (e) => (M("data-v-91086308"), e = e(), z(), e), Gn = {
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
function gs(e, n, t, l, a, r) {
  var s, u, o, c, d, g, v, h, _, p;
  return m(), f("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (m(), f("div", Gn, Jn)) : S("", !0),
    e.state.droparea ? (m(), f("div", Qn, " Dateien hier hinziehen ")) : S("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), f("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, xn, 8, Yn)) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, es),
    e.value ? (m(), f("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, ss, 8, ts)) : S("", !0),
    i("div", as, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), f("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        i("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, ls),
        i("sl-dialog", {
          label: decodeURIComponent((c = (o = e.value) == null ? void 0 : o.dest) == null ? void 0 : c.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, rs)
        ], 8, os)
      ])) : (m(), f("div", is, [
        (g = (d = e.value) == null ? void 0 : d.dest) != null && g.name ? (m(), f("sl-icon", us)) : S("", !0)
      ])),
      (h = (v = e.value) == null ? void 0 : v.dest) != null && h.name ? (m(), f("div", ds, I(decodeURIComponent((p = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : p.name)), 1)) : S("", !0)
    ]),
    e.boneState.multiple ? S("", !0) : (m(), f("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, fs, 8, cs))
  ], 32);
}
const We = /* @__PURE__ */ C(Hn, [["render", gs], ["__scopeId", "data-v-91086308"]]), ps = D({
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
function bs(e, n, t, l, a, r) {
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
const _s = ["name", "min", "max", "disabled"], ys = ["name", "min", "max", "disabled"];
function $s(e, n, t, l, a, r) {
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
const Qe = (e) => (M("data-v-63e75dee"), e = e(), z(), e), ks = { class: "actionbar" }, ws = ["title"], Es = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), As = [
  Es
], Cs = ["title"], Is = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Os(e, n, t, l, a, r) {
  return m(), f("div", ks, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, As, 8, ws)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Is,
      O(" " + I(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), f(E, { key: 0 }, [
        O("(" + I(e.state.counter) + ")", 1)
      ], 64)) : S("", !0)
    ], 8, Cs)) : S("", !0)
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
    const t = B("boneState"), l = B("addMultipleEntry"), a = B("formatString"), r = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(o) {
      let c = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), j.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${c}limit=99`
      ).then(async (d) => {
        var v;
        const g = await d.json();
        return s.skels = g.skellist.reduce((h, _) => (h[_.key] = _, h), {}), (v = g.skellist) == null ? void 0 : v.map((h) => ({ text: a(t.bonestructure.format, { dest: h }), value: h.key, data: h }));
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
const Ye = (e) => (M("data-v-eeea51c6"), e = e(), z(), e), Ds = { class: "actionbar" }, Vs = ["title"], Rs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ns = [
  Rs
], Ls = ["source"], Us = ["title"], Ps = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ts(e, n, t, l, a, r) {
  return m(), f("div", Ds, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ns, 8, Vs)) : S("", !0),
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
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ps,
      O(" " + I(e.$t("bone.list")), 1)
    ], 8, Us)) : S("", !0)
  ]);
}
const Ms = /* @__PURE__ */ C(js, [["render", Ts], ["__scopeId", "data-v-eeea51c6"]]), Ws = D({
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
      return new Promise((v, h) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: g }).then(async (_) => {
          let p = await _.json();
          fetch(p.values.uploadUrl, {
            body: d,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: p.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
              let A = await $.json();
              A.action === "addSuccess" ? v(A.values) : h(A);
            }).catch(($) => {
              h($);
            });
          }).catch((b) => {
            h(b);
          });
        }).catch((_) => {
          h(_);
        });
      });
    }
    async function o(d) {
      s.loading = !0;
      for (let g of d.target.files) {
        let v = await u(g);
        r.value.value = null;
        let h = null;
        s.hasUsing && (h = void 0), l(e.lang, { dest: v, rel: h });
      }
      s.loading = !1;
    }
    async function c(d) {
      s.loading = !0, s.droparea = !1;
      for (let g of d.dataTransfer.files) {
        let v = await u(g);
        r.value.value = null;
        let h = null;
        s.hasUsing && (h = void 0), l(e.lang, { dest: v, rel: h });
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
const ye = (e) => (M("data-v-9bac9f8a"), e = e(), z(), e), zs = ["title"], qs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Fs = [
  qs
], Ks = {
  key: 1,
  class: "droparea"
}, Hs = ["multiple"], Gs = ["title"], Zs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Js = [
  Zs
], Qs = ["title"], Ys = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), Xs = {
  key: 0,
  slot: "suffix"
};
function xs(e, n, t, l, a, r) {
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
    }, Fs, 8, zs)) : S("", !0),
    e.state.droparea ? (m(), f("div", Ks, " Dateien hier hinziehen ")) : S("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Hs),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Js, 8, Gs)) : S("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Ys,
      O(" " + I(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), f("sl-spinner", Xs)) : S("", !0)
    ], 8, Qs)) : S("", !0)
  ], 32);
}
const ea = /* @__PURE__ */ C(Ws, [["render", xs], ["__scopeId", "data-v-9bac9f8a"]]), $e = _e("boneStore", () => {
  const e = w({
    additionalBones: H({}),
    defaultBones: H({
      rawBone: ve,
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
      jsonBone: Kn,
      fileBone: We,
      textBone: ze,
      spatialBone: qe
    }),
    actionbars: H({
      "relational.tree.leaf.file.file": ea,
      "relational.": Ms
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
    return s === "date" ? Ve : s === "key" ? Be : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? je : s === "select" || s.startsWith("select.") ? Re : s === "bool" ? Ne : s === "password" ? Le : s === "record" ? Ue : s === "numeric" || s.startsWith("numeric.") ? Te : s === "relational.tree.leaf.file.file" ? We : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Pe : s === "text" ? ze : s === "spatial" ? qe : ve;
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
    return Bs;
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
function ta(e) {
  return $e().getBoneActionbar(e);
}
function x(e) {
  return $e().getBoneWidget(e);
}
function na(e) {
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
    wrapperMultiple: It,
    BoneLabel: Rt
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
        var p;
        return (p = e.structure) == null ? void 0 : p[e.name];
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
        var p;
        return ((p = t.languages) == null ? void 0 : p.length) && t.languages.length > 0;
      }),
      languages: k(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: k(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: k(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: k(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: k(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: k(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: k(() => {
        var p;
        return ta((p = t.bonestructure) == null ? void 0 : p.type);
      }),
      isEmpty: k(() => {
        function p(b) {
          for (const [y, $] of Object.entries(b))
            if ($ !== null) {
              if (Array.isArray($) && $.length > 0)
                return !1;
              if (!Array.isArray($))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? p(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: k(() => {
        let p = [];
        for (let b of e.errors)
          b.fieldPath[0] === e.name && (b.severity > 2 || t.required && (b.severity === 2 || b.severity === 0)) && p.push(b.errorMessage);
        return p;
      })
    });
    ie("boneState", t);
    function l(p, b, y) {
      s(b, p, "isDragging"), s(b, p, "dragStartIndex");
    }
    function a(p, b, y) {
      y.preventDefault();
      const $ = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      $ < A.offsetHeight / 2 ? (s(b, p, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = p) : (s(b, p, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = p + 1);
      let N = b ? t.bonevalue[b] : t.bonevalue;
      t.dropIndex.index > N.length - 1 && (t.dropIndex.index -= 1);
    }
    function r(p, b, y) {
      let $ = null;
      t.dragStartIndex.index !== t.dropIndex.index && (b ? ($ = t.bonevalue[b].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[b].splice(t.dropIndex.index, 0, $)) : ($ = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, $)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: c(),
        lang: b,
        index: p
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(p, b, y) {
      t[y].lang = p || null, t[y].index = b;
    }
    function u(...p) {
      p.forEach((b) => {
        t[b] = {
          lang: null,
          index: Number
        };
      });
    }
    function o(p, b, y = null, $ = null, A) {
      if (b === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && $ !== null ? t.bonevalue[y][$] = b : t.bonevalue[y] = b) : $ !== null ? t.bonevalue[$] = b : A === !1 || (t.bonevalue = b), t.readonly))
        return !1;
      let N = {
        name: p,
        value: c(),
        lang: y,
        index: $
      }, V = {
        name: p,
        value: b,
        lang: y,
        index: $
      };
      A != null && (N.pwMatch = A, V.pwMatch = A), n.emit("change", N), n.emit("change-internal", V);
    }
    function c() {
      function p(y, $ = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [$ + ".lat"]: y[0] }), A.push({ [$ + ".lng"]: y[1] });
          else if (Object.values(y).filter((N) => N === Object(N)).length > 0)
            for (const [N, V] of y.entries())
              V.rel !== null ? A.push(p(V, $ + "." + N)) : A.push(p(V, $));
          else
            for (const [N, V] of y.entries())
              A.push(p(V, $));
        else if (y === Object(y))
          for (const [N, V] of Object.entries(y))
            $ ? $.endsWith(".dest") || $.endsWith(".rel") ? $.endsWith(".dest") && N === "key" ? (/\.[0-9]*\.dest$/.test($) ? A.push(p(V, $.replace(/\.[0-9]*\.dest/, ""))) : A.push(p(V, $.replace(/\.dest/, ""))), A.push(p(V, $.replace(/\.dest/, "") + "." + N))) : $.endsWith(".rel") && A.push(p(V, $.replace(/\.rel/, "") + "." + N)) : A.push(p(V, $ + "." + N)) : A.push(p(V, N));
        else
          y == null && (y = ""), $ !== null && A.push({ [$]: y });
        return A;
      }
      let b = p(t.bonevalue, e.name);
      return b = b.flat(10), b;
    }
    function d(p = null, b = "") {
      p ? Object.keys(t.bonevalue).includes(p) ? t.bonevalue[p].push(b) : t.bonevalue[p] = [b] : t.bonevalue ? t.bonevalue.push(b) : t.bonevalue = [b];
    }
    ie("addMultipleEntry", d);
    function g(p, b = null) {
      var y;
      b ? (y = t.bonevalue) == null || y[b].splice(p, 1) : t.bonevalue.splice(p, 1), n.emit("change", {
        name: e.name,
        value: c(),
        lang: b,
        index: p
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: b,
        index: p
      });
    }
    function v(p = null) {
      var b;
      p ? (b = t.bonevalue) == null || b[p].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: c(),
        lang: p
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: p
      });
    }
    ie("removeMultipleEntries", v);
    function h(p = null, b = "") {
      d(p, b);
    }
    function _(p, b) {
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
      function $(V, Z) {
        let F = V.split("."), ne = V.split("."), T = Z;
        for (let Y of F)
          if (ne.shift(), T && T !== "-" && Object.keys(T).includes(Y) && T[Y])
            if (Array.isArray(T[Y])) {
              let Ae = [];
              for (let et of T[Y])
                Ae.push($(ne.join("."), et));
              T = Ae.join(", ");
            } else
              T = T[Y];
          else
            (!T || typeof T[Y] == "object" && !T[Y]) && (T = "-");
        return T;
      }
      let A = y(p), N = [];
      Array.isArray(b) || (b = [b]);
      for (let V of b) {
        let Z = p;
        for (let F of A) {
          let ne = $(F, V);
          Z = Z.replace("$(" + F + ")", ne);
        }
        N.push(Z);
      }
      return N.join(", ");
    }
    return ie("formatString", _), Q(() => {
      var p;
      e.value ? t.bonevalue = e.value : t.bonevalue = (p = e.skel) == null ? void 0 : p[e.name];
    }), se(
      () => e.skel,
      (p, b) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), se(
      () => {
        var p;
        return (p = e.errors) == null ? void 0 : p[e.name];
      },
      (p, b) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: o,
      addMultipleEntry: d,
      removeMultipleEntry: g,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: na,
      multipleBonePressEnter: h,
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
  rt((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, Ke = Se.setup;
Se.setup = Ke ? (e, n) => (Fe(), Ke(e, n)) : Fe;
const sa = (e) => (M("data-v-46c45785"), e = e(), z(), e), aa = {
  key: 0,
  class: "loading"
}, la = /* @__PURE__ */ sa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), oa = { class: "logo" }, ra = ["src"];
function ia(e, n, t, l, a, r) {
  return m(), P(it, null, {
    default: ut(() => [
      t.active ? (m(), f("div", aa, [
        la,
        i("div", oa, [
          i("sl-icon", { src: t.logo }, null, 8, ra)
        ])
      ])) : S("", !0)
    ]),
    _: 1
  });
}
const ua = /* @__PURE__ */ C(Se, [["render", ia], ["__scopeId", "data-v-46c45785"]]), ee = _e("cartstore", () => {
  const e = new gt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = w({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    paymentProviders: {},
    billingAddress: {},
    shippingAddress: {}
  });
  async function t() {
    await a();
  }
  async function l(h) {
    return await e.cart_list({ cart_key: h });
  }
  async function a() {
    (await e.cart_list()).forEach((_) => {
      _.is_root_node && (_.cart_type === "basket" ? n.basketRootNode = _ : n.whishlistRootNodes.push(_));
    });
  }
  async function r(h, _) {
    let p = await e.article_add({
      article_key: h,
      parent_cart_key: _
    });
    console.log("addToCart", p);
  }
  async function s(h, _) {
    let p = await e.article_view({
      article_key: h,
      parent_cart_key: _
    });
    console.log("getArticleView", p);
  }
  async function u(h, _) {
    let p = await e.article_remove({
      article_key: h,
      parent_cart_key: _
    });
    console.log("remove Resp", p);
  }
  async function o(h, _, p) {
    let b = await e.article_update({
      article_key: h,
      parent_cart_key: _,
      quantity: p,
      quantity_mode: "replace"
    });
    console.log("update Resp", b);
  }
  async function c() {
    const h = await e.address_structure();
    n.structure.address = h.addSkel;
  }
  async function d() {
    const h = await e.address_list();
    for (const _ of h)
      _.address_type === "billing" && (n.billingAddress = _), _.address_type === "shipping" && (n.shippingAddress = _);
  }
  async function g(h) {
    await e.discount_add({ code: h });
  }
  async function v() {
    const h = await e.payment_providers_list();
    console.log(h), n.paymentProviders = h;
  }
  return {
    state: n,
    addToCart: r,
    getArticleView: s,
    removeItem: u,
    updateItem: o,
    init: t,
    getAddressStructure: c,
    getChildren: l,
    addDiscount: g,
    payment_providers_list: v,
    getAddress: d
  };
}), da = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), f("pre", null, I(e.node.name), 1));
  }
};
const ge = (e) => (M("data-v-d313b580"), e = e(), z(), e), ca = {
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
    const t = e, l = n, a = w({
      leaf: {}
    });
    function r(o) {
      return o !== void 0 ? ft.downloadUrlFor(o) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
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
    }), (o, c) => (m(), f("sl-card", ca, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: r(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, ma),
      i("h4", fa, I(a.leaf.shop_name), 1),
      i("h5", ga, I(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, pa),
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
          onClick: c[2] || (c[2] = (d) => u(a.leaf, a.leaf.article.dest.key, e.node))
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
          Oa,
          O(" " + I(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        L(n).state.basketRootNode.discount ? (m(), f("div", Ba, [
          L(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), f("span", ja, " Sie haben einen Rabattcode im Wert von " + I(L(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : S("", !0),
          L(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), f("span", Da, " Sie haben einen Rabattcode im Wert von " + I(L(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : S("", !0)
        ])) : S("", !0)
      ])
    ], 64));
  }
};
const K = (e) => (M("data-v-84507113"), e = e(), z(), e), Ra = { key: 0 }, Na = /* @__PURE__ */ K(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), La = {
  class: "footer-wrap",
  slot: "footer"
}, Ua = { class: "viur-shop-cart-node" }, Pa = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), Ta = /* @__PURE__ */ K(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Ma = /* @__PURE__ */ K(() => /* @__PURE__ */ i("br", null, null, -1)), Wa = { class: "viur-shop-cart-sidebar-info-line" }, za = /* @__PURE__ */ K(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), qa = { class: "viur-shop-cart-sidebar-info-line" }, Fa = /* @__PURE__ */ K(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Ka = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ O(" 0 \u20AC ")
], -1)), Ha = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ O(" \u20AC ")
], -1)), Ga = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
], -1)), Za = /* @__PURE__ */ K(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), Ja = {
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
      const v = await t.getChildren(g);
      console.log("getChildren children: ", v), v.forEach(async (h) => {
        h.skel_type === "node" ? (a.nodes.push(h), await d(h.key)) : (Object.keys(a.leaves).includes(g) || (a.leaves[g] = []), a.leaves[g].push(h));
      });
    }
    return Q(async () => {
      await t.init(), await d(), n.mode === "basket" && a.nodes.push(t.state.basketRootNode), console.log("state.nodes test", a.nodes), console.log("state.leaves", a.leaves);
    }), (g, v) => e.cartKey.length ? (m(), f(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: o
      }, [
        Na,
        i("div", La, [
          i("sl-button", {
            variant: "danger",
            onClick: v[0] || (v[0] = (h) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: r,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), f(E, null, U(a.nodes, (h) => (m(), f("div", Ua, [
        Object.keys(a.leaves).includes(h.key) ? (m(), f(E, { key: 0 }, [
          Ie(da, { node: h }, null, 8, ["node"]),
          (m(!0), f(E, null, U(a.leaves[h.key], (_) => (m(), P(Ia, {
            key: _.key,
            leaf: _,
            node: h,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : S("", !0)
      ]))), 256)),
      Pa,
      e.sidebar ? (m(), P(Ge, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), f(E, { key: 0 }, [
          Ta,
          Ma,
          i("div", Wa, [
            za,
            O(" " + I(e.mode === "basket" ? L(t).state.basketRootNode.total : L(t).state.whishlistRootNodes[e.cartKey].total) + " \u20AC ", 1)
          ]),
          i("div", qa, [
            Fa,
            O(" " + I(L(t).state.basketRootNode.total - L(t).state.basketRootNode.total_discount_price) + " \u20AC ", 1)
          ]),
          Ka,
          Ha,
          Ga
        ], 64)) : S("", !0)
      ])) : S("", !0),
      Ie(Va),
      Za
    ], 64)) : (m(), f("sl-spinner", Ra));
  }
}, ke = /* @__PURE__ */ C(Ja, [["__scopeId", "data-v-84507113"]]), Qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" }));
const le = (e) => (M("data-v-4082d346"), e = e(), z(), e), Ya = {
  key: 1,
  class: "list"
}, Xa = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), xa = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), el = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), tl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), nl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), sl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("br", null, null, -1)), al = { class: "viur-shop-cart-sidebar-btn-wrap" }, ll = ["variant", "disabled"], ol = {
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
    }), (a, r) => t.cartIsInit ? (m(), f("div", Ya, [
      Xa,
      xa,
      el,
      tl,
      (m(), P(Ge, { to: "#order_sidebar" }, [
        nl,
        sl,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", al, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, ll)
        ])
      ]))
    ])) : (m(), P(ua, { key: 0 }));
  }
}, we = /* @__PURE__ */ C(ol, [["__scopeId", "data-v-4082d346"]]), rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
const il = (e) => (M("data-v-50f31583"), e = e(), z(), e), ul = { class: "bind viur-shop-wrap" }, dl = ["panel", "disabled"], cl = { class: "viur-shop-order-step" }, ml = ["name", "library"], fl = { class: "viur-shop-order-status-text" }, gl = { class: "viur-shop-order-status-span" }, pl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, hl = ["name"], bl = ["onClick"], vl = ["onClick"], _l = /* @__PURE__ */ il(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), yl = {
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
      let g = [], v = [];
      for (const h in d)
        d[h].position ? g.push([h, d[h].position]) : g.push([h, 0]);
      return g.sort((h, _) => h[1] - _[1]), g.forEach((h) => {
        v.push(h[0]);
      }), v;
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
    return (d, g) => (m(), f("div", ul, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: r
      }, [
        (m(!0), f(E, null, U(a.tabNames, (v, h) => {
          var _;
          return m(), f("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", cl, [
              (_ = e.tabs[v].icon) != null && _.name ? (m(), f("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, ml)) : S("", !0),
              i("div", fl, [
                O(I(h + 1) + ". ", 1),
                i("span", gl, I(e.tabs[v].displayName), 1)
              ])
            ]),
            h < a.tabNames.length - 1 ? (m(), f("sl-icon", pl)) : S("", !0)
          ], 8, dl);
        }), 128)),
        (m(!0), f(E, null, U(a.tabNames, (v, h) => (m(), f("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), P(dt(e.tabs[v].component), ct({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          h !== a.tabNames.length - 1 ? (m(), f("div", {
            key: 0,
            class: G(["viur-shop-form-footer", { "flex-end": a.isFirstTab(h) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (_) => o(a.tabNames[h - 1])
            }, " Zur\xFCck ", 8, bl), [
              [be, h !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => c(a.tabNames[h + 1])
            }, " Weiter ", 8, vl)
          ], 2)) : S("", !0)
        ], 8, hl))), 128))
      ], 544),
      _l
    ]));
  }
}, Xe = /* @__PURE__ */ C(yl, [["__scopeId", "data-v-50f31583"]]);
const pe = (e) => (M("data-v-688e20e0"), e = e(), z(), e), $l = { class: "bind" }, Sl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), kl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ O(" 123345670 ")
], -1)), wl = { class: "paragraph" }, El = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("br", null, null, -1)), Al = { class: "btn-wrap" }, Cl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Il = {
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
const Ee = (e) => (M("data-v-4d14c6fe"), e = e(), z(), e), Bl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), jl = { class: "viur-shop-form-wrap" }, Dl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Vl = { class: "viur-shop-form-wrap" }, Rl = { key: 0 }, Nl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ll = { class: "viur-shop-form-wrap" }, Ul = {
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
      t.isCustomAdress = !s.target.checked;
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
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = r(n.state.structure.address), t.formValues = n.state.shippingAddress;
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
}, Pl = /* @__PURE__ */ C(Ul, [["__scopeId", "data-v-4d14c6fe"]]);
const te = (e) => (M("data-v-c4232b7a"), e = e(), z(), e), Tl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Ml = { class: "viur-shop-form-wrap" }, Wl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), zl = ["onSlChange", "onSlClear", "label"], ql = ["value"], Fl = { key: 0 }, Kl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Hl = { class: "viur-shop-form-wrap" }, Gl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-icon", {
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
    function r(v) {
      v.target.checked && (t.isCustomAdress = !1), v.target.checked || (t.isCustomAdress = !0);
    }
    function s() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie k\xF6nnen nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, a.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(v, h) {
      for (const [_, p] of Object.entries(h.value[0]))
        t.formValues[_] = p;
    }
    function o() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function c(v, h) {
      if (console.log(v.target.value), !v.target.value.length) {
        d();
        return;
      }
      t.selectedItem[h] = v.target.value, t.isItemSelected = !0;
    }
    function d(v, h) {
      console.log("clearing..."), delete t.selectedItem[h], t.isItemSelected = !1;
    }
    function g(v) {
      let h = {};
      return Array.isArray(v) ? (v.forEach((_) => {
        let p = _[0], b = _[1];
        h[p] = b;
      }), h) : v;
    }
    return se(t.formValues, (v) => {
      Object.entries(v).forEach(([h, _]) => {
        _ === "" && delete t.formValues[h];
      });
    }), Q(async () => {
      await n.getAddressStructure(), t.addSkel = g(n.state.structure.address);
    }), (v, h) => {
      const _ = ae("bone");
      return m(), f(E, null, [
        i("div", null, [
          Tl,
          i("div", Ml, [
            (m(!0), f(E, null, U(t.addSkel, (p, b) => (m(), f(E, { key: b }, [
              p.visible && p.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                p.visible && p.params.group === "Customer Info" ? (m(), P(_, {
                  key: 0,
                  is: L(x)(p.type),
                  name: b,
                  structure: g(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 128))
          ])
        ]),
        Wl,
        (m(!0), f(E, null, U(t.shippingAdressAmount, (p) => (m(), f("div", {
          class: "viur-shop-form-wrap",
          key: p
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (b) => c(b, p),
            onSlClear: (b) => d(b, p),
            label: t.selectedItem[p] ? L(n).state.carts[t.selectedItem[p]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), f(E, null, U(L(n).state.carts, (b, y) => (m(), f("sl-option", { value: y }, I(b.info.name), 9, ql))), 256))
          ], 40, zl),
          (m(!0), f(E, null, U(t.addSkel, (b, y) => (m(), f(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (m(), f("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              b.visible && b.params.group === "Customer Address" ? (m(), P(_, {
                key: 0,
                is: L(x)(b.type),
                name: y,
                structure: g(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: ($) => u(y, $)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : S("", !0)
            ], 2)) : S("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), f("div", Fl, [
          Kl,
          i("div", Hl, [
            (m(!0), f(E, null, U(t.addSkel, (p, b) => (m(), f(E, { key: b }, [
              p.visible && p.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + b)
              }, [
                p.visible && p.params.group === "Customer Address" ? (m(), P(_, {
                  key: 0,
                  is: L(x)(p.type),
                  name: b,
                  structure: g(t.addSkel),
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
}, xl = /* @__PURE__ */ C(Xl, [["__scopeId", "data-v-c4232b7a"]]), xe = {
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
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (r, s) => (m(), P(Xe, {
      tabs: l.tabs,
      onTabChange: a
    }, null, 8, ["tabs"]));
  }
}, eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" })), po = {
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
    const t = pt();
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
    component: () => import("./CategoryView.177fd889.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.27ff9ff2.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Qa)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => eo)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => rl)
  }
];
function ho(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(lo), ht({
    history: bt("/"),
    routes: t
  });
}
const oo = mt(), bo = {
  install(e) {
    e.component("CartView", ke), e.component("ExampleUsage", xe), e.component("ConfirmView", we), e.component("OrderView", Xe), e.use(oo);
  }
};
export {
  ke as C,
  Ol as O,
  Pl as U,
  bo as V,
  C as _,
  xe as a,
  we as b,
  Xe as c,
  po as d,
  ho as e,
  ee as u
};
