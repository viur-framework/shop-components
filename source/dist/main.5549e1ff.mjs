var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Oe = (e, n, t) => (st(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as V, inject as B, reactive as E, openBlock as m, createElementBlock as g, normalizeClass as G, createElementVNode as i, renderSlot as Ke, pushScopeId as M, popScopeId as z, Fragment as A, createCommentVNode as $, toDisplayString as w, onMounted as N, ref as F, readonly as at, getCurrentScope as lt, onScopeDispose as ot, unref as C, computed as k, watchEffect as ce, renderList as L, watch as ae, withDirectives as Y, vModelText as oe, getCurrentInstance as rt, resolveComponent as le, createBlock as T, vShow as ve, withModifiers as de, createTextVNode as D, shallowRef as K, provide as ie, onBeforeMount as Z, useCssVars as it, Transition as ut, withCtx as dt, createVNode as he, Teleport as Ge, resolveDynamicComponent as ct, mergeProps as mt } from "vue";
import { defineStore as ye, createPinia as ft } from "pinia";
import Ie from "@viur/ckeditor5-build-classic";
import { ViURShopClient as gt } from "@viur/viur-shop-client";
import { Request as pt } from "@viur/vue-utils";
import { useRoute as ht, createRouter as bt, createWebHashHistory as vt } from "vue-router";
const _t = V({
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
      state: E({
        isDraggable: !1
      }),
      boneState: t
    };
  }
});
const O = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
}, Ze = (e) => (M("data-v-141aaf9b"), e = e(), z(), e), yt = ["draggable"], $t = ["disabled"], St = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), kt = [
  St
], wt = { class: "value" }, Et = ["disabled", "title"], At = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ct = [
  At
];
function Ot(e, n, t, a, l, o) {
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
    }, kt, 40, $t),
    i("div", wt, [
      Ke(e.$slots, "default", {}, void 0, !0)
    ]),
    i("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (s) => e.$emit("delete"))
    }, Ct, 8, Et)
  ], 42, yt);
}
const It = /* @__PURE__ */ O(_t, [["render", Ot], ["__scopeId", "data-v-141aaf9b"]]), Bt = V({
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
      state: E({
        debug: !1
      }),
      boneState: t
    };
  }
});
const jt = { class: "bone-name" }, Dt = { key: 0 }, Vt = { class: "bone" };
function Rt(e, n, t, a, l, o) {
  return m(), g(A, null, [
    i("label", jt, [
      Ke(e.$slots, "default", {}, void 0, !0),
      $("", !0)
    ]),
    e.state.debug ? (m(), g("div", Dt, [
      i("div", Vt, w(e.name), 1),
      i("pre", null, "    " + w(e.boneState) + `
    `, 1)
    ])) : $("", !0)
  ], 64);
}
const Nt = /* @__PURE__ */ O(Bt, [["render", Rt], ["__scopeId", "data-v-b7149172"]]), Pt = V({
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
    const t = B("boneState"), a = E({});
    function l(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return N(() => {
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
  return e.boneState.bonestructure.type === "raw.json" ? (m(), g("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Lt)) : (m(), g("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ut));
}
const _e = /* @__PURE__ */ O(Pt, [["render", Tt], ["__scopeId", "data-v-0ebe5f0b"]]), Mt = V({
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
    const t = E({});
    function a(l) {
      n.emit("change", e.name, l.target.value, e.lang, e.index);
    }
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: a
    };
  }
});
const Wt = ["value"];
function zt(e, n, t, a, l, o) {
  return m(), g("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Wt);
}
const Be = /* @__PURE__ */ O(Mt, [["render", zt], ["__scopeId", "data-v-b45a1311"]]);
function qt(e) {
  return lt() ? (ot(e), !0) : !1;
}
function Ft(e) {
  return typeof e == "function" ? e() : C(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: a = !0
  } = t, l = F(!1);
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
    }, Ft(n));
  }
  return a && (l.value = !0, Ht && r()), qt(u), {
    isPending: at(l),
    start: r,
    stop: u
  };
}
class Kt {
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
const Gt = V({
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
    const t = B("boneState"), a = E({
      value: k(() => e.value)
    }), l = F(null);
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
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      Utils: Kt,
      boneState: t,
      changeEvent: o,
      stringBone: l
    };
  }
});
const Zt = ["disabled", "value", "required"];
function Jt(e, n, t, a, l, o) {
  return m(), g("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Zt);
}
const je = /* @__PURE__ */ O(Gt, [["render", Jt], ["__scopeId", "data-v-1ccbacc0"]]), Qt = V({
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
    const t = B("boneState"), a = E({}), l = F(null);
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
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: o,
      emailBone: l
    };
  }
});
const Yt = ["disabled", "value"];
function Xt(e, n, t, a, l, o) {
  return m(), g("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Yt);
}
const De = /* @__PURE__ */ O(Qt, [["render", Xt], ["__scopeId", "data-v-4328e024"]]), xt = V({
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
    const t = B("boneState"), a = E({
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const en = ["disabled", "type", "value"];
function tn(e, n, t, a, l, o) {
  return m(), g("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, en);
}
const Ve = /* @__PURE__ */ O(xt, [["render", tn], ["__scopeId", "data-v-f1b8af8c"]]), nn = V({
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
    const t = B("boneState"), a = E({
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
    return N(() => {
      n.emit("change", e.name, a.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: o,
      convertObjToList: l
    };
  }
});
const sn = ["disabled", "value", "multiple"], an = ["value"];
function ln(e, n, t, a, l, o) {
  return m(), g("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), g(A, null, L(e.convertObjToList(), (s) => (m(), g("sl-option", {
      key: s[0],
      value: s[0]
    }, w(s[1]), 9, an))), 128))
  ], 40, sn);
}
const Re = /* @__PURE__ */ O(nn, [["render", ln], ["__scopeId", "data-v-5a38b97f"]]), on = V({
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
    const t = B("boneState"), a = E({
      value: k(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function l(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return N(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const rn = ["disabled", "checked"];
function un(e, n, t, a, l, o) {
  return m(), g("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, rn);
}
const Ne = /* @__PURE__ */ O(on, [["render", un], ["__scopeId", "data-v-363598c8"]]), dn = V({
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
    const t = B("boneState"), a = E({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), l = F(null);
    function o(u) {
      a.value1 === a.value2 ? a.equal = !0 : a.equal = !1, s(a.value1), a.requiredPasswordInfo.length === 0 && a.passwordInfo.length - a.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, a.value1, e.lang, e.index, !0) : n.emit("change", e.name, a.value1, e.lang, e.index, !1);
    }
    N(() => {
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
    }), ae(
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
const cn = ["disabled"], mn = ["name"], fn = ["name"], gn = { class: "errors" };
function pn(e, n, t, a, l, o) {
  return m(), g(A, null, [
    Y(i("sl-input", {
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
      }, null, 8, mn)
    ], 42, cn), [
      [oe, e.state.value1]
    ]),
    e.boneState.readonly ? $("", !0) : Y((m(), g("sl-input", {
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
      (m(!0), g(A, null, L(e.state.passwordInfo, (s, u) => (m(), g("li", { key: u }, w(s), 1))), 128)),
      (m(!0), g(A, null, L(e.state.requiredPasswordInfo, (s, u) => (m(), g("li", {
        key: u,
        class: "requiredInfo"
      }, w(s), 1))), 128))
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ O(dn, [["render", pn], ["__scopeId", "data-v-0ccf18c0"]]), hn = V({
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
    const t = B("boneState"), a = E({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [b, v] of Object.entries(a.structure)) {
          let h = "default", _ = a.structure[b], f = (d = a.value) == null ? void 0 : d[b];
          (c = v == null ? void 0 : v.params) != null && c.category && (h = v.params.category.toLowerCase()), Object.keys(u).includes(h) ? u[h].bones.push({
            boneName: b,
            boneStructure: _,
            boneValue: f
          }) : u[h] = {
            name: v.params.category,
            bones: [
              {
                boneName: b,
                boneStructure: _,
                boneValue: f
              }
            ]
          }, _.visible === !0 && (u[h].groupVisible = !0);
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
    N(() => {
      rt().appContext.components.Bone ? a.globalRegistration = !0 : a.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
      getBoneWidget: te,
      structureToDict: s,
      changeEvent: l,
      updateValue: o
    };
  }
});
const bn = {
  key: 0,
  open: "",
  variant: "danger"
}, vn = {
  key: 1,
  class: "form"
}, _n = ["summary", "open"];
function yn(e, n, t, a, l, o) {
  const s = le("bone");
  return e.state.globalRegistration ? (m(), g("div", vn, [
    (m(!0), g(A, null, L(e.state.formGroups, (u, r) => Y((m(), g("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), g(A, null, L(u.bones, (d) => Y((m(), T(s, {
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
    ], 8, _n)), [
      [ve, u.groupVisible]
    ])), 128))
  ])) : (m(), g("sl-alert", bn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Je = /* @__PURE__ */ O(hn, [["render", yn], ["__scopeId", "data-v-e6fcfbca"]]), $n = V({
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
    const t = B("boneState"), a = E({
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
function Sn(e, n, t, a, l, o) {
  const s = le("Wrapper_nested");
  return m(), T(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Le = /* @__PURE__ */ O($n, [["render", Sn], ["__scopeId", "data-v-84a761ce"]]), kn = V({
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
    const t = B("boneState"), a = E({});
    function l(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const wn = ["disabled", "value"];
function En(e, n, t, a, l, o) {
  return m(), g("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, wn);
}
const Ue = /* @__PURE__ */ O(kn, [["render", En], ["__scopeId", "data-v-534b9149"]]), An = V({
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
    const t = B("boneState"), a = E({
      minAmount: k(() => t.bonestructure.minAmount),
      maxAmount: k(() => t.bonestructure.maxAmount),
      precision: k(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), l = F(null);
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
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: o,
      numericBone: l
    };
  }
});
const Cn = ["disabled", "value", "min", "max", "step"], On = { class: "info" }, In = { key: 0 }, Bn = { key: 1 }, jn = { key: 2 };
function Dn(e, n, t, a, l, o) {
  return m(), g(A, null, [
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
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), g("li", In, w(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : $("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), g("li", Bn, w(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : $("", !0),
      e.state.precision ? (m(), g("li", jn, w(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : $("", !0)
    ])
  ], 64);
}
const Te = /* @__PURE__ */ O(An, [["render", Dn], ["__scopeId", "data-v-03d5b399"]]);
class ue extends Error {
  constructor(n, t, a, l) {
    super(a || t), arguments.length >= 4 && l && Object.assign(this, l), this.statusText = t, this.statusCode = n, this.response = l;
  }
}
let be = null;
function ee() {
  return be || (be = ye("requestStore", () => {
    const e = E({ sKeys: /* @__PURE__ */ new Set() });
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
    ee().$reset(), ee().$dispose();
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
    let d = re.post(j.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      a && a(c.data);
    }).catch(function(c) {
      l && l(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json") {
    await j.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (a) => {
      let l = await a.json();
      Array.isArray(l) || (l = [l]), ee().state.sKeys = new Set(l);
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
    ee().state.sKeys.size === 0 && await j.getBatchSkeys(d);
    const b = [...ee().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", b), ee().state.sKeys.delete(b)) : (t || (t = {}), t.skey = b, ee().state.sKeys.delete(b)), c = j.post(n, {
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
    let b = re.get(j.buildUrl(n), t, s, r, u, d);
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
    return o && (c += `/${o}`), j.get(c, {
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
    return o && (c += `/${o}`), j.get(c, {
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
    return s && (b = `/${r}/${n}/view/${s}/${t}`), j.get(b, {
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
    return o && (c = `/${u}/${n}/add/${o}`), j.securePost(c, {
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
    return s && (b = `/${r}/${n}/edit/${s}/${t}`), j.securePost(b, {
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
    return s && (b = `/${r}/${n}/delete/${s}/${t}`), j.securePost(b, {
      dataObj: a,
      callback: l,
      failedCallback: o,
      abortController: u,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? j.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? j.buildUrl(n.dest.downloadUrl) : j.buildUrl(null) : j.buildUrl(n);
  }
  static uploadFile(n, t = void 0) {
    const a = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((l, o) => {
      j.securePost("/vi/file/getUploadURL", { dataObj: a }).then(async (s) => {
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
    Oe(this, "withCredentials", !0);
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
        for (const [v, h] of Object.entries(d))
          if (Array.isArray(h))
            for (const _ of h)
              b.append(v, _);
          else
            b.append(v, h);
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
const Vn = V({
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
    const t = B("boneState"), a = B("formatString"), l = E({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), j.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const b = await c.json();
        l.skellistdata = {};
        for (let h of b.skellist)
          l.skellistdata[h.key] = h;
        return (v = b.skellist) == null ? void 0 : v.map((h) => ({ text: a(t.bonestructure.format, { dest: h }), value: h.key, data: h }));
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
    return N(() => {
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
const Rn = (e) => (M("data-v-61dd72e0"), e = e(), z(), e), Nn = { class: "record" }, Pn = { class: "single-entry" }, Ln = ["value"], Un = ["disabled", "source"], Tn = ["title"], Mn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Wn = [
  Mn
];
function zn(e, n, t, a, l, o) {
  var u, r;
  const s = le("Wrapper_nested");
  return m(), g("div", Nn, [
    i("div", Pn, [
      e.state.selection ? (m(), g("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Ln)) : (m(), g("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Un)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), g("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Wn, 8, Tn)) : $("", !0)
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
const Me = /* @__PURE__ */ O(Vn, [["render", zn], ["__scopeId", "data-v-61dd72e0"]]), qn = V({
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
    const t = B("boneState"), a = E({});
    function l(o, s) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: a,
      boneState: t,
      changeEvent: l
    };
  }
});
const Fn = { class: "box" };
function Hn(e, n, t, a, l, o) {
  return m(), g("div", Fn, w(e.value), 1);
}
const Kn = /* @__PURE__ */ O(qn, [["render", Hn], ["__scopeId", "data-v-343aca69"]]), Gn = V({
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
    const t = B("boneState"), a = F(), l = E({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o() {
      console.log(j.downloadUrlFor(e.value)), window.open(j.downloadUrlFor(e.value));
    }
    function s() {
      return j.downloadUrlFor(e.value, !1);
    }
    function u(c) {
      const b = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((v, h) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: b }).then(async (_) => {
          let f = await _.json();
          fetch(f.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const y = {
              key: f.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let I = await S.json();
              I.action === "addSuccess" ? v(I.values) : h(I);
            }).catch((S) => {
              h(S);
            });
          }).catch((p) => {
            h(p);
          });
        }).catch((_) => {
          h(_);
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
const fe = (e) => (M("data-v-91086308"), e = e(), z(), e), Zn = {
  key: 0,
  class: "loader"
}, Jn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Qn = [
  Jn
], Yn = {
  key: 1,
  class: "droparea"
}, Xn = ["title"], xn = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), es = [
  xn
], ts = ["multiple"], ns = ["title"], ss = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), as = [
  ss
], ls = { class: "box" }, os = ["src"], rs = ["label", "open"], is = ["src"], us = {
  key: 1,
  class: "preview"
}, ds = {
  key: 0,
  name: "file-earmark"
}, cs = { key: 2 }, ms = ["title"], fs = /* @__PURE__ */ fe(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), gs = [
  fs
];
function ps(e, n, t, a, l, o) {
  var s, u, r, d, c, b, v, h, _, f;
  return m(), g("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((p) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (p) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...p) => e.handleDrop && e.handleDrop(...p), ["prevent"]))
  }, [
    e.state.loading ? (m(), g("div", Zn, Qn)) : $("", !0),
    e.state.droparea ? (m(), g("div", Yn, " Dateien hier hinziehen ")) : $("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), g("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (p) => e.uploadinput.click())
    }, es, 8, Xn)) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...p) => e.handleUpload && e.handleUpload(...p))
    }, null, 40, ts),
    e.value ? (m(), g("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...p) => e.downloadFile && e.downloadFile(...p))
    }, as, 8, ns)) : $("", !0),
    i("div", ls, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), g("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (p) => e.state.previewopen = !e.state.previewopen)
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
          }, null, 8, is)
        ], 8, rs)
      ])) : (m(), g("div", us, [
        (b = (c = e.value) == null ? void 0 : c.dest) != null && b.name ? (m(), g("sl-icon", ds)) : $("", !0)
      ])),
      (h = (v = e.value) == null ? void 0 : v.dest) != null && h.name ? (m(), g("div", cs, w(decodeURIComponent((f = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : f.name)), 1)) : $("", !0)
    ]),
    e.boneState.multiple ? $("", !0) : (m(), g("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (p) => e.$emit("change", e.name, "", e.lang, e.index))
    }, gs, 8, ms))
  ], 32);
}
const We = /* @__PURE__ */ O(Gn, [["render", ps], ["__scopeId", "data-v-91086308"]]), hs = V({
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
    const t = B("boneState"), a = E({
      value: "",
      editorConfig: {},
      editor: k(() => Ie)
    });
    function l(u) {
      n.emit("change", e.name, a.value, e.lang, e.index);
    }
    function o(u) {
      a.value = u.target.value, n.emit("change", e.name, a.value, e.lang, e.index);
    }
    N(() => {
      e.value !== null && (a.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      u.editing.view.change((r) => {
        r.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return ae(
      () => e.value,
      (u, r) => {
        a.value = u;
      }
    ), {
      state: a,
      ClassicEditor: Ie,
      boneState: t,
      changeEvent: l,
      onReady: s,
      changeEventTextarea: o
    };
  }
});
const bs = ["disabled", "value"];
function vs(e, n, t, a, l, o) {
  var u, r, d, c;
  const s = le("ckeditor");
  return e.state.editor ? (m(), g(A, { key: 0 }, [
    ((u = e.boneState.bonestructure) == null ? void 0 : u.valid_html) || ((r = e.boneState.bonestructure) == null ? void 0 : r.validHtml) ? (m(), T(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (b) => e.state.value = b),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), g("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...b) => e.changeEventTextarea && e.changeEventTextarea(...b))
    }, null, 40, bs))
  ], 64)) : $("", !0);
}
const ze = /* @__PURE__ */ O(hs, [["render", vs]]), _s = V({
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
    const t = B("boneState"), a = E({
      valueLat: null,
      valueLng: null
    });
    function l() {
      n.emit("change", e.name, [a.valueLat, a.valueLng], e.lang, e.index);
    }
    return N(() => {
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
const ys = ["name", "min", "max", "disabled"], $s = ["name", "min", "max", "disabled"];
function Ss(e, n, t, a, l, o) {
  return m(), g(A, null, [
    Y(i("sl-input", {
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
    }, null, 40, ys), [
      [oe, e.state.valueLat]
    ]),
    Y(i("sl-input", {
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
    }, null, 40, $s), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const qe = /* @__PURE__ */ O(_s, [["render", Ss], ["__scopeId", "data-v-7bc31020"]]), ks = V({
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
    const t = B("boneState"), a = E({
      counter: 0,
      debounce: null
    }), l = B("addMultipleEntry"), o = B("removeMultipleEntries");
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
    return N(() => {
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
const Qe = (e) => (M("data-v-63e75dee"), e = e(), z(), e), ws = { class: "actionbar" }, Es = ["title"], As = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Cs = [
  As
], Os = ["title"], Is = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Bs(e, n, t, a, l, o) {
  return m(), g("div", ws, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Cs, 8, Es)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Is,
      D(" " + w(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), g(A, { key: 0 }, [
        D("(" + w(e.state.counter) + ")", 1)
      ], 64)) : $("", !0)
    ], 8, Os)) : $("", !0)
  ]);
}
const js = /* @__PURE__ */ O(ks, [["render", Bs], ["__scopeId", "data-v-63e75dee"]]), Ds = V({
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
    const t = B("boneState"), a = B("addMultipleEntry"), l = B("formatString"), o = null, s = E({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), j.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var v;
        const b = await c.json();
        return s.skels = b.skellist.reduce((h, _) => (h[_.key] = _, h), {}), (v = b.skellist) == null ? void 0 : v.map((h) => ({ text: l(t.bonestructure.format, { dest: h }), value: h.key, data: h }));
      });
    }
    return N(() => {
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
const Ye = (e) => (M("data-v-eeea51c6"), e = e(), z(), e), Vs = { class: "actionbar" }, Rs = ["title"], Ns = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ps = [
  Ns
], Ls = ["source"], Us = ["title"], Ts = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ms(e, n, t, a, l, o) {
  return m(), g("div", Vs, [
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ps, 8, Rs)) : $("", !0),
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
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ts,
      D(" " + w(e.$t("bone.list")), 1)
    ], 8, Us)) : $("", !0)
  ]);
}
const Ws = /* @__PURE__ */ O(Ds, [["render", Ms], ["__scopeId", "data-v-eeea51c6"]]), zs = V({
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
    const t = B("boneState"), a = B("addMultipleEntry");
    B("formatString");
    const l = null, o = F(), s = E({
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
      return new Promise((v, h) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: b }).then(async (_) => {
          let f = await _.json();
          fetch(f.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const y = {
              key: f.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let I = await S.json();
              I.action === "addSuccess" ? v(I.values) : h(I);
            }).catch((S) => {
              h(S);
            });
          }).catch((p) => {
            h(p);
          });
        }).catch((_) => {
          h(_);
        });
      });
    }
    async function r(c) {
      s.loading = !0;
      for (let b of c.target.files) {
        let v = await u(b);
        o.value.value = null;
        let h = null;
        s.hasUsing && (h = void 0), a(e.lang, { dest: v, rel: h });
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let b of c.dataTransfer.files) {
        let v = await u(b);
        o.value.value = null;
        let h = null;
        s.hasUsing && (h = void 0), a(e.lang, { dest: v, rel: h });
      }
      s.loading = !1;
    }
    return N(() => {
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
const $e = (e) => (M("data-v-9bac9f8a"), e = e(), z(), e), qs = ["title"], Fs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Hs = [
  Fs
], Ks = {
  key: 1,
  class: "droparea"
}, Gs = ["multiple"], Zs = ["title"], Js = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Qs = [
  Js
], Ys = ["title"], Xs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), xs = {
  key: 0,
  slot: "suffix"
};
function ea(e, n, t, a, l, o) {
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
    }, Hs, 8, qs)) : $("", !0),
    e.state.droparea ? (m(), g("div", Ks, " Dateien hier hinziehen ")) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Gs),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Qs, 8, Zs)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (m(), g("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Xs,
      D(" " + w(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), g("sl-spinner", xs)) : $("", !0)
    ], 8, Ys)) : $("", !0)
  ], 32);
}
const ta = /* @__PURE__ */ O(zs, [["render", ea], ["__scopeId", "data-v-9bac9f8a"]]), Se = ye("boneStore", () => {
  const e = E({
    additionalBones: K({}),
    defaultBones: K({
      rawBone: _e,
      keyBone: Be,
      stringBone: je,
      emailBone: De,
      dateBone: Ve,
      booleanBone: Ne,
      selectBone: Re,
      passwordBone: Pe,
      recordBone: Le,
      numericBone: Te,
      colorBone: Ue,
      relationalBone: Me,
      jsonBone: Kn,
      fileBone: We,
      textBone: ze,
      spatialBone: qe
    }),
    actionbars: K({
      "relational.tree.leaf.file.file": ta,
      "relational.": Ws
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
    return s === "date" ? Ve : s === "key" ? Be : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? je : s === "select" || s.startsWith("select.") ? Re : s === "bool" ? Ne : s === "password" ? Pe : s === "record" ? Le : s === "numeric" || s.startsWith("numeric.") ? Te : s === "relational.tree.leaf.file.file" ? We : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Ue : s === "text" ? ze : s === "spatial" ? qe : _e;
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
    return js;
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
function na(e) {
  return Se().getBoneActionbar(e);
}
function te(e) {
  return Se().getBoneWidget(e);
}
function sa(e) {
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
V({
  inheritAttrs: !1,
  emits: ["change", "change-internal", "handleClick"],
  components: {
    wrapperMultiple: It,
    BoneLabel: Nt
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
    const t = E({
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
        return na((f = t.bonestructure) == null ? void 0 : f.type);
      }),
      isEmpty: k(() => {
        function f(p) {
          for (const [y, S] of Object.entries(p))
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
        for (let p of e.errors)
          p.fieldPath[0] === e.name && (p.severity > 2 || t.required && (p.severity === 2 || p.severity === 0)) && f.push(p.errorMessage);
        return f;
      })
    });
    ie("boneState", t);
    function a(f, p, y) {
      s(p, f, "isDragging"), s(p, f, "dragStartIndex");
    }
    function l(f, p, y) {
      y.preventDefault();
      const S = y.clientY - y.target.getBoundingClientRect().top, I = y.target.closest(".value-line");
      S < I.offsetHeight / 2 ? (s(p, f, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = f) : (s(p, f, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = f + 1);
      let P = p ? t.bonevalue[p] : t.bonevalue;
      t.dropIndex.index > P.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(f, p, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (p ? (S = t.bonevalue[p].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[p].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: p,
        index: f
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(f, p, y) {
      t[y].lang = f || null, t[y].index = p;
    }
    function u(...f) {
      f.forEach((p) => {
        t[p] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(f, p, y = null, S = null, I) {
      if (p === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = p : t.bonevalue[y] = p) : S !== null ? t.bonevalue[S] = p : I === !1 || (t.bonevalue = p), t.readonly))
        return !1;
      let P = {
        name: f,
        value: d(),
        lang: y,
        index: S
      }, R = {
        name: f,
        value: p,
        lang: y,
        index: S
      };
      I != null && (P.pwMatch = I, R.pwMatch = I), n.emit("change", P), n.emit("change-internal", R);
    }
    function d() {
      function f(y, S = null) {
        let I = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            I.push({ [S + ".lat"]: y[0] }), I.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((P) => P === Object(P)).length > 0)
            for (const [P, R] of y.entries())
              R.rel !== null ? I.push(f(R, S + "." + P)) : I.push(f(R, S));
          else
            for (const [P, R] of y.entries())
              I.push(f(R, S));
        else if (y === Object(y))
          for (const [P, R] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && P === "key" ? (/\.[0-9]*\.dest$/.test(S) ? I.push(f(R, S.replace(/\.[0-9]*\.dest/, ""))) : I.push(f(R, S.replace(/\.dest/, ""))), I.push(f(R, S.replace(/\.dest/, "") + "." + P))) : S.endsWith(".rel") && I.push(f(R, S.replace(/\.rel/, "") + "." + P)) : I.push(f(R, S + "." + P)) : I.push(f(R, P));
        else
          y == null && (y = ""), S !== null && I.push({ [S]: y });
        return I;
      }
      let p = f(t.bonevalue, e.name);
      return p = p.flat(10), p;
    }
    function c(f = null, p = "") {
      f ? Object.keys(t.bonevalue).includes(f) ? t.bonevalue[f].push(p) : t.bonevalue[f] = [p] : t.bonevalue ? t.bonevalue.push(p) : t.bonevalue = [p];
    }
    ie("addMultipleEntry", c);
    function b(f, p = null) {
      var y;
      p ? (y = t.bonevalue) == null || y[p].splice(f, 1) : t.bonevalue.splice(f, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: p,
        index: f
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: p,
        index: f
      });
    }
    function v(f = null) {
      var p;
      f ? (p = t.bonevalue) == null || p[f].splice(0) : t.bonevalue.splice(0), n.emit("change", {
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
    function h(f = null, p = "") {
      c(f, p);
    }
    function _(f, p) {
      function y(R) {
        let Q = [], H = [], se = /\$\((.*?)\)/g;
        for (; H; ) {
          if (H = se.exec(R), !H) {
            H = !1;
            continue;
          }
          Q.push(H[1]);
        }
        return Q;
      }
      function S(R, Q) {
        let H = R.split("."), se = R.split("."), q = Q;
        for (let x of H)
          if (se.shift(), q && q !== "-" && Object.keys(q).includes(x) && q[x])
            if (Array.isArray(q[x])) {
              let Ce = [];
              for (let tt of q[x])
                Ce.push(S(se.join("."), tt));
              q = Ce.join(", ");
            } else
              q = q[x];
          else
            (!q || typeof q[x] == "object" && !q[x]) && (q = "-");
        return q;
      }
      let I = y(f), P = [];
      Array.isArray(p) || (p = [p]);
      for (let R of p) {
        let Q = f;
        for (let H of I) {
          let se = S(H, R);
          Q = Q.replace("$(" + H + ")", se);
        }
        P.push(Q);
      }
      return P.join(", ");
    }
    return ie("formatString", _), Z(() => {
      var f;
      e.value ? t.bonevalue = e.value : t.bonevalue = (f = e.skel) == null ? void 0 : f[e.name];
    }), ae(
      () => e.skel,
      (f, p) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), ae(
      () => {
        var f;
        return (f = e.errors) == null ? void 0 : f[e.name];
      },
      (f, p) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: c,
      removeMultipleEntry: b,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: sa,
      multipleBonePressEnter: h,
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
    const t = E({
      trackWidth: k(() => `${e.size / 30}rem`),
      outerSize: k(() => `calc(${e.size}rem + ${t.trackWidth})`),
      spinnerSize: k(() => `${e.size}rem`),
      logoSize: k(() => `calc(${e.size}rem - ${t.trackWidth} * 10)`),
      shadow: k(() => `0px 0px ${e.size / 6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)
    });
    return { state: t };
  }
}, Fe = () => {
  it((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, He = ke.setup;
ke.setup = He ? (e, n) => (Fe(), He(e, n)) : Fe;
const aa = (e) => (M("data-v-46c45785"), e = e(), z(), e), la = {
  key: 0,
  class: "loading"
}, oa = /* @__PURE__ */ aa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ra = { class: "logo" }, ia = ["src"];
function ua(e, n, t, a, l, o) {
  return m(), T(ut, null, {
    default: dt(() => [
      t.active ? (m(), g("div", la, [
        oa,
        i("div", ra, [
          i("sl-icon", { src: t.logo }, null, 8, ia)
        ])
      ])) : $("", !0)
    ]),
    _: 1
  });
}
const da = /* @__PURE__ */ O(ke, [["render", ua], ["__scopeId", "data-v-46c45785"]]), X = ye("cartstore", () => {
  const e = new gt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = E({
    basketRootNode: {},
    whishlistRootNodes: [],
    children: {},
    structure: { address: {}, cart: {} },
    paymentProviders: {},
    billingAddress: {},
    shippingAddress: {},
    selectedPaymentProvider: {}
  });
  async function t() {
    await l();
  }
  async function a(_) {
    return await e.cart_list({ cart_key: _ });
  }
  async function l() {
    (await e.cart_list()).forEach((f) => {
      f.is_root_node && (f.cart_type === "basket" ? n.basketRootNode = f : n.whishlistRootNodes.push(f));
    });
  }
  async function o(_, f) {
    let p = await e.article_add({
      article_key: _,
      parent_cart_key: f
    });
    console.log("addToCart", p);
  }
  async function s(_, f) {
    let p = await e.article_view({
      article_key: _,
      parent_cart_key: f
    });
    console.log("getArticleView", p);
  }
  async function u(_, f) {
    let p = await e.article_remove({
      article_key: _,
      parent_cart_key: f
    });
    console.log("remove Resp", p);
  }
  async function r(_, f, p) {
    let y = await e.article_update({
      article_key: _,
      parent_cart_key: f,
      quantity: p,
      quantity_mode: "replace"
    });
    console.log("update Resp", y);
  }
  async function d() {
    const _ = await e.address_structure();
    n.structure.address = _.addSkel;
  }
  async function c() {
    const _ = await e.address_list();
    for (const f of _)
      f.address_type === "billing" && (n.billingAddress = f), f.address_type === "shipping" && (n.shippingAddress = f);
  }
  async function b(_) {
    await e.discount_add({ code: _ });
  }
  async function v() {
    return await e.shipping_list({ cart_key: n.basketRootNode.key });
  }
  async function h() {
    const _ = await e.payment_providers_list();
    n.paymentProviders = _, n.selectedPaymentProvider = _[Object.keys(_)[0]];
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
    getShippingData: v,
    payment_providers_list: h
  };
}), ca = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return E({}), (n, t) => (m(), g("pre", null, w(e.node.name), 1));
  }
};
const ge = (e) => (M("data-v-d313b580"), e = e(), z(), e), ma = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, fa = ["src"], ga = { class: "viur-shop-cart-leaf-headline headline" }, pa = { class: "viur-shop-cart-leaf-artno" }, ha = ["innerHTML"], ba = { class: "viur-shop-cart-leaf-quantity" }, va = { class: "viur-shop-cart-leaf-unitprice" }, _a = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "St\xFCckpreis", -1)), ya = ["value"], $a = { class: "viur-shop-cart-leaf-actions" }, Sa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), ka = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), wa = [
  ka
], Ea = { class: "viur-shop-cart-leaf-price" }, Aa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Ca = ["value"], Oa = {
  __name: "CartLeaf",
  props: {
    leaf: { type: Object, required: !0 },
    node: { type: Object, required: !0 }
  },
  emits: ["updateItem", "removeItem"],
  setup(e, { emit: n }) {
    const t = e, a = n, l = E({
      leaf: {}
    });
    function o(r) {
      return r !== void 0 ? pt.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
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
    return Z(() => {
      l.leaf = t.leaf;
    }), (r, d) => (m(), g("sl-card", ma, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(l.leaf.shop_image ? l.leaf.shop_image : void 0)
      }, null, 8, fa),
      i("h4", ga, w(l.leaf.shop_name), 1),
      i("h5", pa, w(l.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: l.leaf.shop_description
      }, null, 8, ha),
      i("div", ba, [
        Y(i("sl-input", {
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
      i("div", va, [
        _a,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, ya)
      ]),
      i("div", $a, [
        Sa,
        i("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[2] || (d[2] = (c) => u(l.leaf, l.leaf.article.dest.key, e.node))
        }, wa)
      ]),
      i("div", Ea, [
        Aa,
        i("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, Ca)
      ])
    ]));
  }
}, Ia = /* @__PURE__ */ O(Oa, [["__scopeId", "data-v-d313b580"]]), Ba = /* @__PURE__ */ i("span", null, "Haben Sie noch ein Gutschein?", -1), ja = /* @__PURE__ */ i("br", null, null, -1), Da = { key: 0 }, Va = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), Ra = { key: 0 }, Na = { key: 0 }, Pa = { key: 1 }, La = {
  __name: "Discount",
  setup(e) {
    const n = X(), t = F(null), a = F(null), l = E({
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
    return (s, u) => (m(), g(A, null, [
      i("div", null, [
        Ba,
        ja,
        C(n).state.basketRootNode.discount ? (m(), g("span", Da, "Es befindet sich noch kein Gutschein im Warenkorb.")) : $("", !0),
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
          Va,
          D(" " + w(l.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        C(n).state.basketRootNode.discount ? (m(), g("div", Ra, [
          C(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), g("span", Na, " Sie haben einen Rabattcode im Wert von " + w(C(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : $("", !0),
          C(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), g("span", Pa, " Sie haben einen Rabattcode im Wert von " + w(C(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : $("", !0)
        ])) : $("", !0)
      ])
    ], 64));
  }
};
const Ua = (e) => (M("data-v-6528c033"), e = e(), z(), e), Ta = {
  key: 0,
  class: "viur-shop-cart-sidebar-info-line"
}, Ma = /* @__PURE__ */ Ua(() => /* @__PURE__ */ i("span", null, "Versandkosten:", -1)), Wa = ["value"], za = {
  __name: "Shipping",
  setup(e, { expose: n }) {
    const t = X(), a = E({
      shippingData: [],
      cheapestShipping: {},
      isShipping: !1
    });
    async function l() {
      a.shippingData = await t.getShippingData(), a.shippingData.sort((s, u) => s.dest.shipping_cost < s.dest.shipping_cost ? -1 : s.dest.shipping_cost > s.dest.shipping_cost ? 1 : 0), a.cheapestShipping = a.shippingData[a.shippingData.length - 1], a.isShipping = !0;
    }
    function o() {
      return a.isShipping ? a.cheapestShipping.dest.shipping_cost : 0;
    }
    return n({ updateShipping: l, getShippingCost: o }), Z(async () => {
      await t.init(), await l();
    }), (s, u) => a.isShipping ? (m(), g("div", Ta, [
      Ma,
      i("sl-format-number", {
        type: "currency",
        currency: "EUR",
        value: a.cheapestShipping.dest.shipping_cost,
        lang: "de"
      }, null, 8, Wa)
    ])) : $("", !0);
  }
}, qa = /* @__PURE__ */ O(za, [["__scopeId", "data-v-6528c033"]]);
const J = (e) => (M("data-v-4b46a754"), e = e(), z(), e), Fa = { key: 0 }, Ha = /* @__PURE__ */ J(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Ka = {
  class: "footer-wrap",
  slot: "footer"
}, Ga = { class: "viur-shop-cart-node" }, Za = /* @__PURE__ */ J(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), Ja = /* @__PURE__ */ J(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Qa = /* @__PURE__ */ J(() => /* @__PURE__ */ i("br", null, null, -1)), Ya = { class: "viur-shop-cart-sidebar-info-line" }, Xa = /* @__PURE__ */ J(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), xa = ["value"], el = { class: "viur-shop-cart-sidebar-info-line" }, tl = /* @__PURE__ */ J(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), nl = ["value"], sl = { class: "viur-shop-cart-sidebar-info-line" }, al = { class: "viur-shop-cart-sidebar-info-line total" }, ll = /* @__PURE__ */ J(() => /* @__PURE__ */ i("span", null, "Gesamt:", -1)), ol = ["value"], rl = {
  key: 0,
  class: "viur-shop-cart-sidebar-btn-wrap"
}, il = /* @__PURE__ */ J(() => /* @__PURE__ */ i("sl-button", {
  variant: "primary",
  size: "medium"
}, " Jetzt Bestellen ", -1)), ul = [
  il
], dl = /* @__PURE__ */ J(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), cl = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    inOrderView: { type: Boolean, default: !1 }
  },
  setup(e) {
    const n = e, t = X(), a = F(null), l = F(null), o = E({
      itemsIsInit: k(() => !0),
      totalPrice: k(() => l.value ? t.state.basketRootNode.total + l.value.getShippingCost() : 0),
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
    async function r(h) {
      console.log("updateItem :", h), h.quantity === 0 ? (a.value.show(), o.currentItem = h.item, o.currentNode = h.node) : (await t.updateItem(h.articleKey, h.node.key, h.quantity), await t.init()), await l.value.updateShipping();
    }
    function d(h) {
      console.log("removeItem :", h), a.value.show(), o.currentItem = h.item, o.currentNode = h.node;
    }
    async function c() {
      o.leaves[o.currentNode.key].forEach((h) => {
        h.key === o.currentItem.key && (h.quantity = 1);
      }), o.currentItem = {}, o.currentNode = {};
    }
    async function b() {
      o.nodes = [], o.leaves = {}, await t.init(), await v();
    }
    async function v(h = s) {
      h = h.value, console.log("debug getChildren parentKey from comp: ", h);
      const _ = await t.getChildren(h);
      console.log("getChildren children: ", _), _.forEach(async (f) => {
        f.skel_type === "node" ? (o.nodes.push(f), await v(f.key)) : (Object.keys(o.leaves).includes(h) || (o.leaves[h] = []), o.leaves[h].push(f));
      });
    }
    return Z(async () => {
      await t.init(), await v(), n.mode === "basket" && o.nodes.push(t.state.basketRootNode), console.log("state.nodes test", o.nodes), console.log("state.leaves", o.leaves);
    }), (h, _) => s.value ? (m(), g(A, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: a,
        onSlHide: c
      }, [
        Ha,
        i("div", Ka, [
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
      (m(!0), g(A, null, L(o.nodes, (f) => (m(), g("div", Ga, [
        Object.keys(o.leaves).includes(f.key) ? (m(), g(A, { key: 0 }, [
          he(ca, { node: f }, null, 8, ["node"]),
          (m(!0), g(A, null, L(o.leaves[f.key], (p) => (m(), T(Ia, {
            key: p.key,
            leaf: p,
            node: f,
            onRemoveItem: d,
            onUpdateItem: r
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : $("", !0)
      ]))), 256)),
      Za,
      e.sidebar ? (m(), T(Ge, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), g(A, { key: 0 }, [
          Ja,
          Qa,
          i("div", Ya, [
            Xa,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: C(t).state.basketRootNode.total
            }, null, 8, xa)
          ]),
          i("div", el, [
            tl,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: C(t).state.basketRootNode.total - C(t).state.basketRootNode.total_discount_price,
              lang: "de"
            }, null, 8, nl)
          ]),
          i("div", sl, [
            he(qa, {
              ref_key: "shipping",
              ref: l
            }, null, 512)
          ]),
          i("div", al, [
            ll,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: o.totalPrice,
              lang: "de"
            }, null, 8, ol)
          ]),
          n.inOrderView ? $("", !0) : (m(), g("div", rl, ul))
        ], 64)) : $("", !0)
      ])) : $("", !0),
      he(La),
      dl
    ], 64)) : (m(), g("sl-spinner", Fa));
  }
}, we = /* @__PURE__ */ O(cl, [["__scopeId", "data-v-4b46a754"]]), ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
const U = (e) => (M("data-v-03ee352e"), e = e(), z(), e), fl = {
  key: 1,
  class: "list"
}, gl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), pl = { class: "viur-shop-cart-address-wrap" }, hl = { class: "viur-shop-cart-address" }, bl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
  /* @__PURE__ */ D(" Versandadresse "),
  /* @__PURE__ */ i("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ i("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), vl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), _l = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), yl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), $l = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Sl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), kl = { class: "viur-shop-cart-address" }, wl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
  /* @__PURE__ */ D(" Rechnungsadresse "),
  /* @__PURE__ */ i("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ i("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), El = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Al = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Cl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Ol = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Il = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Bl = { class: "viur-shop-cart-payment" }, jl = { class: "viur-shop-cart-payment-method" }, Dl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("span", null, "Zahlungsmethode:", -1)), Vl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("sl-button", {
  outline: "",
  size: "small"
}, [
  /* @__PURE__ */ i("sl-icon", {
    name: "pencil",
    slot: "prefix"
  })
], -1)), Rl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), Nl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Pl = /* @__PURE__ */ U(() => /* @__PURE__ */ i("br", null, null, -1)), Ll = {
  key: 0,
  class: "viur-shop-cart-sidebar-btn-wrap"
}, Ul = ["variant", "disabled"], Tl = {
  __name: "ConfirmView",
  setup(e) {
    const n = X(), t = E({
      cartIsInit: k(() => !0),
      itemsIsInit: k(() => {
        var l;
        return !!((l = n.state) != null && l.carts[n.state.basket].items);
      }),
      selectedPaymentProvider: k(() => {
        var l;
        return (l = n.state) == null ? void 0 : l.selectedPaymentProvider.title;
      }),
      images: {},
      showOrderButton: !1
    });
    function a(l) {
      l.target.checked && (t.showOrderButton = !0), l.target.checked || (t.showOrderButton = !1);
    }
    return Z(async () => {
      await n.init();
    }), (l, o) => t.cartIsInit ? (m(), g("div", fl, [
      gl,
      i("div", pl, [
        i("div", hl, [
          bl,
          D(" " + w(C(n).state.shippingAddress.firstname) + " " + w(C(n).state.shippingAddress.lastname), 1),
          vl,
          D(" " + w(C(n).state.shippingAddress.street_name) + " " + w(C(n).state.shippingAddress.street_number), 1),
          _l,
          D(" " + w(C(n).state.shippingAddress.zip_code) + " " + w(C(n).state.shippingAddress.city) + " " + w(C(n).state.shippingAddress.country), 1),
          yl,
          $l,
          D(" ##TODO MAIL"),
          Sl,
          D(" ##TODO Phone ")
        ]),
        i("div", kl, [
          wl,
          D(" " + w(C(n).state.billingAddress.firstname) + " " + w(C(n).state.billingAddress.lastname), 1),
          El,
          D(" " + w(C(n).state.billingAddress.street_name) + " " + w(C(n).state.billingAddress.street_number), 1),
          Al,
          D(" " + w(C(n).state.billingAddress.zip_code) + " " + w(C(n).state.billingAddress.city) + " " + w(C(n).state.billingAddress.country), 1),
          Cl,
          Ol,
          D(" ##TODO MAIL"),
          Il,
          D(" ##TODO Phone ")
        ])
      ]),
      i("div", Bl, [
        i("div", jl, [
          Dl,
          D(" " + w(t.selectedPaymentProvider), 1)
        ]),
        Vl
      ]),
      Rl,
      (m(), T(Ge, { to: "#order_sidebar" }, [
        Nl,
        Pl,
        i("sl-checkbox", { onSlChange: a }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        t.showOrderButton ? (m(), g("div", Ll, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Ul)
        ])) : $("", !0)
      ]))
    ])) : (m(), T(da, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ O(Tl, [["__scopeId", "data-v-03ee352e"]]), Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
const Wl = (e) => (M("data-v-50f31583"), e = e(), z(), e), zl = { class: "bind viur-shop-wrap" }, ql = ["panel", "disabled"], Fl = { class: "viur-shop-order-step" }, Hl = ["name", "library"], Kl = { class: "viur-shop-order-status-text" }, Gl = { class: "viur-shop-order-status-span" }, Zl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Jl = ["name"], Ql = ["onClick"], Yl = ["onClick"], Xl = /* @__PURE__ */ Wl(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), xl = {
  __name: "OrderView",
  props: {
    tabs: {
      type: Object,
      required: !0
    }
  },
  emits: ["tabChange"],
  setup(e, { emit: n }) {
    const t = e, a = n, l = E({
      tabNames: k(() => s(t.tabs)),
      isFirstTab: (c) => c === 0
    }), o = F(null);
    function s(c) {
      let b = [], v = [];
      for (const h in c)
        c[h].position ? b.push([h, c[h].position]) : b.push([h, 0]);
      return b.sort((h, _) => h[1] - _[1]), b.forEach((h) => {
        v.push(h[0]);
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
    return (c, b) => (m(), g("div", zl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (m(!0), g(A, null, L(l.tabNames, (v, h) => {
          var _;
          return m(), g("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", Fl, [
              (_ = e.tabs[v].icon) != null && _.name ? (m(), g("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, Hl)) : $("", !0),
              i("div", Kl, [
                D(w(h + 1) + ". ", 1),
                i("span", Gl, w(e.tabs[v].displayName), 1)
              ])
            ]),
            h < l.tabNames.length - 1 ? (m(), g("sl-icon", Zl)) : $("", !0)
          ], 8, ql);
        }), 128)),
        (m(!0), g(A, null, L(l.tabNames, (v, h) => (m(), g("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), T(ct(e.tabs[v].component), mt({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          h !== l.tabNames.length - 1 ? (m(), g("div", {
            key: 0,
            class: G(["viur-shop-form-footer", { "flex-end": l.isFirstTab(h) }])
          }, [
            Y(i("sl-button", {
              type: "submit",
              onClick: (_) => r(l.tabNames[h - 1])
            }, " Zur\xFCck ", 8, Ql), [
              [ve, h !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => d(l.tabNames[h + 1])
            }, " Weiter ", 8, Yl)
          ], 2)) : $("", !0)
        ], 8, Jl))), 128))
      ], 544),
      Xl
    ]));
  }
}, Xe = /* @__PURE__ */ O(xl, [["__scopeId", "data-v-50f31583"]]);
const pe = (e) => (M("data-v-688e20e0"), e = e(), z(), e), eo = { class: "bind" }, to = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), no = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ D(" 123345670 ")
], -1)), so = { class: "paragraph" }, ao = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("br", null, null, -1)), lo = { class: "btn-wrap" }, oo = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), ro = {
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
    return (t, a) => (m(), g("div", eo, [
      to,
      no,
      i("p", so, [
        D(" Wir haben Ihre Bestellung erhalten und werden diese schenllstm\xF6glich bearbeiten."),
        ao,
        D(" Sie erhalten in wenigen Minuten eine Best\xE4tigung per E-Mail. "),
        i("div", lo, [
          oo,
          i("sl-button", {
            variant: "primary",
            onClick: a[0] || (a[0] = (l) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, io = /* @__PURE__ */ O(ro, [["__scopeId", "data-v-688e20e0"]]);
const Ae = (e) => (M("data-v-4d14c6fe"), e = e(), z(), e), uo = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), co = { class: "viur-shop-form-wrap" }, mo = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), fo = { class: "viur-shop-form-wrap" }, go = { key: 0 }, po = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), ho = { class: "viur-shop-form-wrap" }, bo = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = X(), t = E({
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
    return ae(t.formValues, (s) => {
      Object.entries(s).forEach(([u, r]) => {
        r === "" && delete t.formValues[u];
      });
    }), Z(async () => {
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = o(n.state.structure.address), t.formValues = n.state.shippingAddress;
    }), (s, u) => {
      const r = le("bone");
      return m(), g(A, null, [
        i("div", null, [
          uo,
          i("div", co, [
            (m(!0), g(A, null, L(t.addSkel, (d, c) => (m(), g(A, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Info" ? (m(), T(r, {
                  key: 0,
                  is: C(te)(d.type),
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
          mo,
          i("div", fo, [
            (m(!0), g(A, null, L(t.addSkel, (d, c) => (m(), g(A, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), T(r, {
                  key: 0,
                  is: C(te)(d.type),
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
        t.isCustomAdress ? (m(), g("div", go, [
          po,
          i("div", ho, [
            (m(!0), g(A, null, L(t.addSkel, (d, c) => (m(), g(A, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (m(), T(r, {
                  key: 0,
                  is: C(te)(d.type),
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
}, vo = /* @__PURE__ */ O(bo, [["__scopeId", "data-v-4d14c6fe"]]);
const ne = (e) => (M("data-v-c4232b7a"), e = e(), z(), e), _o = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), yo = { class: "viur-shop-form-wrap" }, $o = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), So = ["onSlChange", "onSlClear", "label"], ko = ["value"], wo = { key: 0 }, Eo = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ao = { class: "viur-shop-form-wrap" }, Co = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), Oo = [
  Co
], Io = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), Bo = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), jo = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("br", null, null, -1)), Do = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = X(), t = E({
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
    }), a = F(null), l = F(null);
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
    function u(v, h) {
      for (const [_, f] of Object.entries(h.value[0]))
        t.formValues[_] = f;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", l.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(v, h) {
      if (console.log(v.target.value), !v.target.value.length) {
        c();
        return;
      }
      t.selectedItem[h] = v.target.value, t.isItemSelected = !0;
    }
    function c(v, h) {
      console.log("clearing..."), delete t.selectedItem[h], t.isItemSelected = !1;
    }
    function b(v) {
      let h = {};
      return Array.isArray(v) ? (v.forEach((_) => {
        let f = _[0], p = _[1];
        h[f] = p;
      }), h) : v;
    }
    return ae(t.formValues, (v) => {
      Object.entries(v).forEach(([h, _]) => {
        _ === "" && delete t.formValues[h];
      });
    }), Z(async () => {
      await n.getAddressStructure(), t.addSkel = b(n.state.structure.address);
    }), (v, h) => {
      const _ = le("bone");
      return m(), g(A, null, [
        i("div", null, [
          _o,
          i("div", yo, [
            (m(!0), g(A, null, L(t.addSkel, (f, p) => (m(), g(A, { key: p }, [
              f.visible && f.params.group === "Customer Info" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + p)
              }, [
                f.visible && f.params.group === "Customer Info" ? (m(), T(_, {
                  key: 0,
                  is: C(te)(f.type),
                  name: p,
                  structure: b(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (y) => u(p, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        $o,
        (m(!0), g(A, null, L(t.shippingAdressAmount, (f) => (m(), g("div", {
          class: "viur-shop-form-wrap",
          key: f
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: a,
            onSlChange: (p) => d(p, f),
            onSlClear: (p) => c(p, f),
            label: t.selectedItem[f] ? C(n).state.carts[t.selectedItem[f]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), g(A, null, L(C(n).state.carts, (p, y) => (m(), g("sl-option", { value: y }, w(p.info.name), 9, ko))), 256))
          ], 40, So),
          (m(!0), g(A, null, L(t.addSkel, (p, y) => (m(), g(A, { key: y }, [
            p.visible && p.params.group === "Customer Address" ? (m(), g("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              p.visible && p.params.group === "Customer Address" ? (m(), T(_, {
                key: 0,
                is: C(te)(p.type),
                name: y,
                structure: b(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
            ], 2)) : $("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), g("div", wo, [
          Eo,
          i("div", Ao, [
            (m(!0), g(A, null, L(t.addSkel, (f, p) => (m(), g(A, { key: p }, [
              f.visible && f.params.group === "Customer Address" ? (m(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + p)
              }, [
                f.visible && f.params.group === "Customer Address" ? (m(), T(_, {
                  key: 0,
                  is: C(te)(f.type),
                  name: p,
                  structure: b(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (y) => u(p, y)
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
          }, Oo),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            Io,
            D(" Lieferadresse hinzuf\xFCgen ")
          ])
        ]),
        i("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: l,
          closable: ""
        }, [
          Bo,
          i("strong", null, w(t.amountAlert.title), 1),
          jo,
          D(" " + w(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Vo = /* @__PURE__ */ O(Do, [["__scopeId", "data-v-c4232b7a"]]), xe = {
  __name: "ExampleUsage",
  setup(e) {
    const n = X(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), a = E({
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
          component: K(io),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: K(vo),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: K(Vo),
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
    return Z(async () => {
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (m(), T(Xe, {
      tabs: a.tabs,
      onTabChange: l
    }, null, 8, ["tabs"]));
  }
}, Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" }));
const et = (e) => (M("data-v-7f9ad9b9"), e = e(), z(), e), No = ["id", "selected"], Po = /* @__PURE__ */ et(() => /* @__PURE__ */ i("img", {
  slot: "image",
  src: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  alt: "A kitten sits patiently between a terracotta pot and decorative grasses."
}, null, -1)), Lo = { slot: "footer" }, Uo = /* @__PURE__ */ et(() => /* @__PURE__ */ i("br", null, null, -1)), To = {
  __name: "SelectPaymentProvider",
  setup(e) {
    const n = X();
    function t(a) {
      a.target.selected ? (console.log("a", n.state.selectedPaymentProvider), console.log("b", n.state.paymentProviders), n.state.selectedPaymentProvider = n.state.paymentProviders[a.target.id.replace("povider__", "")], console.log(n.state.selectedPaymentProvider), document.querySelectorAll("sl-card").forEach((l) => {
        l !== a.target && (l.selected = !1);
      })) : a.target.selected = !0, console.log("provider changed", a);
    }
    return Z(async () => {
      await n.payment_providers_list();
    }), (a, l) => (m(!0), g(A, null, L(C(n).state.paymentProviders, (o, s, u) => (m(), g("div", null, [
      i("sl-card", {
        selectable: "",
        id: "povider__" + s,
        onSlChange: t,
        selected: u === 0
      }, [
        Po,
        i("div", Lo, [
          D(w(o == null ? void 0 : o.title) + " ", 1),
          Uo,
          D(" " + w(o == null ? void 0 : o.descr), 1)
        ])
      ], 40, No)
    ]))), 256));
  }
}, xo = /* @__PURE__ */ O(To, [["__scopeId", "data-v-7f9ad9b9"]]), Mo = V({
  props: {},
  components: {},
  setup(e, n) {
    const t = ht();
    return { state: E({}), route: t };
  }
}), Wo = { class: "home" };
function zo(e, n, t, a, l, o) {
  return m(), g("div", Wo, "View " + w(e.route.path) + " is missing.", 1);
}
const qo = /* @__PURE__ */ O(Mo, [["render", zo]]), Fo = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: qo
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView.1b0f87b3.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.a187fcea.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => ml)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => Ro)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Ml)
  }
];
function er(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(Fo), bt({
    history: vt("/"),
    routes: t
  });
}
const Ho = ft(), tr = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", xe), e.component("ConfirmView", Ee), e.component("OrderView", Xe), e.use(Ho);
  }
};
export {
  we as C,
  io as O,
  xo as S,
  vo as U,
  tr as V,
  O as _,
  xe as a,
  Ee as b,
  Xe as c,
  er as d,
  X as u
};
