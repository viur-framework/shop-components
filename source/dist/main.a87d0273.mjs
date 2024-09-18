var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ie = (e, n, t) => (st(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, inject as O, reactive as w, openBlock as f, createElementBlock as g, normalizeClass as G, createElementVNode as i, renderSlot as Ke, pushScopeId as T, popScopeId as M, Fragment as E, createCommentVNode as $, toDisplayString as I, onMounted as R, ref as q, readonly as at, getCurrentScope as lt, onScopeDispose as ot, unref as P, computed as k, watchEffect as ce, renderList as L, watch as ae, withDirectives as Q, vModelText as oe, getCurrentInstance as rt, resolveComponent as le, createBlock as U, vShow as be, withModifiers as de, createTextVNode as j, shallowRef as K, provide as ie, onBeforeMount as Z, useCssVars as it, Transition as ut, withCtx as dt, createVNode as he, Teleport as Ge, resolveDynamicComponent as ct, mergeProps as mt } from "vue";
import { defineStore as ye, createPinia as ft } from "pinia";
import Oe from "@viur/ckeditor5-build-classic";
import { ViURShopClient as gt } from "@viur/viur-shop-client";
import { Request as pt } from "@viur/vue-utils";
import { useRoute as ht, createRouter as vt, createWebHashHistory as bt } from "vue-router";
const _t = D({
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
});
const A = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
}, Ze = (e) => (T("data-v-141aaf9b"), e = e(), M(), e), yt = ["draggable"], $t = ["disabled"], St = /* @__PURE__ */ Ze(() => /* @__PURE__ */ i("sl-icon", {
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
function It(e, n, t, a, l, o) {
  return f(), g("div", {
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
const Ot = /* @__PURE__ */ A(_t, [["render", It], ["__scopeId", "data-v-141aaf9b"]]), Bt = D({
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
});
const jt = { class: "bone-name" }, Dt = { key: 0 }, Vt = { class: "bone" };
function Rt(e, n, t, a, l, o) {
  return f(), g(E, null, [
    i("label", jt, [
      Ke(e.$slots, "default", {}, void 0, !0),
      $("", !0)
    ]),
    e.state.debug ? (f(), g("div", Dt, [
      i("div", Vt, I(e.name), 1),
      i("pre", null, "    " + I(e.boneState) + `
    `, 1)
    ])) : $("", !0)
  ], 64);
}
const Nt = /* @__PURE__ */ A(Bt, [["render", Rt], ["__scopeId", "data-v-b7149172"]]), Pt = D({
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
    const t = O("boneState"), a = w({});
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
  return e.boneState.bonestructure.type === "raw.json" ? (f(), g("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Lt)) : (f(), g("sl-textarea", {
    key: 1,
    disabled: (u = e.boneState) == null ? void 0 : u.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ut));
}
const _e = /* @__PURE__ */ A(Pt, [["render", Tt], ["__scopeId", "data-v-0ebe5f0b"]]), Mt = D({
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
const Wt = ["value"];
function zt(e, n, t, a, l, o) {
  return f(), g("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Wt);
}
const Be = /* @__PURE__ */ A(Mt, [["render", zt], ["__scopeId", "data-v-b45a1311"]]);
function qt(e) {
  return lt() ? (ot(e), !0) : !1;
}
function Ft(e) {
  return typeof e == "function" ? e() : P(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: a = !0
  } = t, l = q(!1);
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
        for (let v of d)
          c && c !== "-" && v in c && c[v] ? c = c[v] : c = "-";
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
    const t = O("boneState"), a = w({
      value: k(() => e.value)
    }), l = q(null);
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
      Utils: Kt,
      boneState: t,
      changeEvent: o,
      stringBone: l
    };
  }
});
const Zt = ["disabled", "value", "required"];
function Jt(e, n, t, a, l, o) {
  return f(), g("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Zt);
}
const je = /* @__PURE__ */ A(Gt, [["render", Jt], ["__scopeId", "data-v-1ccbacc0"]]), Qt = D({
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
    const t = O("boneState"), a = w({}), l = q(null);
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
const Yt = ["disabled", "value"];
function Xt(e, n, t, a, l, o) {
  return f(), g("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Yt);
}
const De = /* @__PURE__ */ A(Qt, [["render", Xt], ["__scopeId", "data-v-4328e024"]]), xt = D({
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
    const t = O("boneState"), a = w({
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
const en = ["disabled", "type", "value"];
function tn(e, n, t, a, l, o) {
  return f(), g("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, en);
}
const Ve = /* @__PURE__ */ A(xt, [["render", tn], ["__scopeId", "data-v-f1b8af8c"]]), nn = D({
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
    const t = O("boneState"), a = w({
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
const sn = ["disabled", "value", "multiple"], an = ["value"];
function ln(e, n, t, a, l, o) {
  return f(), g("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (f(!0), g(E, null, L(e.convertObjToList(), (s) => (f(), g("sl-option", {
      key: s[0],
      value: s[0]
    }, I(s[1]), 9, an))), 128))
  ], 40, sn);
}
const Re = /* @__PURE__ */ A(nn, [["render", ln], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
    const t = O("boneState"), a = w({
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
const rn = ["disabled", "checked"];
function un(e, n, t, a, l, o) {
  return f(), g("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, rn);
}
const Ne = /* @__PURE__ */ A(on, [["render", un], ["__scopeId", "data-v-363598c8"]]), dn = D({
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
    const t = O("boneState"), a = w({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), l = q(null);
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
  return f(), g(E, null, [
    Q(i("sl-input", {
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
    e.boneState.readonly ? $("", !0) : Q((f(), g("sl-input", {
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
      (f(!0), g(E, null, L(e.state.passwordInfo, (s, u) => (f(), g("li", { key: u }, I(s), 1))), 128)),
      (f(!0), g(E, null, L(e.state.requiredPasswordInfo, (s, u) => (f(), g("li", {
        key: u,
        class: "requiredInfo"
      }, I(s), 1))), 128))
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ A(dn, [["render", pn], ["__scopeId", "data-v-0ccf18c0"]]), hn = D({
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
    const t = O("boneState"), a = w({
      value: k(() => e.value),
      structure: k(() => s(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: k(() => {
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [v, b] of Object.entries(a.structure)) {
          let h = "default", _ = a.structure[v], m = (d = a.value) == null ? void 0 : d[v];
          (c = b == null ? void 0 : b.params) != null && c.category && (h = b.params.category.toLowerCase()), Object.keys(u).includes(h) ? u[h].bones.push({
            boneName: v,
            boneStructure: _,
            boneValue: m
          }) : u[h] = {
            name: b.params.category,
            bones: [
              {
                boneName: v,
                boneStructure: _,
                boneValue: m
              }
            ]
          }, _.visible === !0 && (u[h].groupVisible = !0);
        }
        let r = {};
        return Object.keys(u).sort().forEach(function(v) {
          r[v] = u[v];
        }), r;
      })
    });
    function l(u) {
      n.emit("change", u);
    }
    R(() => {
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
      getBoneWidget: ee,
      structureToDict: s,
      changeEvent: l,
      updateValue: o
    };
  }
});
const vn = {
  key: 0,
  open: "",
  variant: "danger"
}, bn = {
  key: 1,
  class: "form"
}, _n = ["summary", "open"];
function yn(e, n, t, a, l, o) {
  const s = le("bone");
  return e.state.globalRegistration ? (f(), g("div", bn, [
    (f(!0), g(E, null, L(e.state.formGroups, (u, r) => Q((f(), g("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (f(!0), g(E, null, L(u.bones, (d) => Q((f(), U(s, {
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
    ], 8, _n)), [
      [be, u.groupVisible]
    ])), 128))
  ])) : (f(), g("sl-alert", vn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Je = /* @__PURE__ */ A(hn, [["render", yn], ["__scopeId", "data-v-e6fcfbca"]]), $n = D({
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
    const t = O("boneState"), a = w({
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
function Sn(e, n, t, a, l, o) {
  const s = le("Wrapper_nested");
  return f(), U(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Le = /* @__PURE__ */ A($n, [["render", Sn], ["__scopeId", "data-v-84a761ce"]]), kn = D({
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
    const t = O("boneState"), a = w({});
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
const wn = ["disabled", "value"];
function En(e, n, t, a, l, o) {
  return f(), g("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, wn);
}
const Ue = /* @__PURE__ */ A(kn, [["render", En], ["__scopeId", "data-v-534b9149"]]), An = D({
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
    const t = O("boneState"), a = w({
      minAmount: k(() => t.bonestructure.minAmount),
      maxAmount: k(() => t.bonestructure.maxAmount),
      precision: k(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), l = q(null);
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
const Cn = ["disabled", "value", "min", "max", "step"], In = { class: "info" }, On = { key: 0 }, Bn = { key: 1 }, jn = { key: 2 };
function Dn(e, n, t, a, l, o) {
  return f(), g(E, null, [
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
    i("ul", In, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (f(), g("li", On, I(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : $("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (f(), g("li", Bn, I(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : $("", !0),
      e.state.precision ? (f(), g("li", jn, I(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : $("", !0)
    ])
  ], 64);
}
const Te = /* @__PURE__ */ A(An, [["render", Dn], ["__scopeId", "data-v-03d5b399"]]);
class ue extends Error {
  constructor(n, t, a, l) {
    super(a || t), arguments.length >= 4 && l && Object.assign(this, l), this.statusText = t, this.statusCode = n, this.response = l;
  }
}
let ve = null;
function x() {
  return ve || (ve = ye("requestStore", () => {
    const e = w({ sKeys: /* @__PURE__ */ new Set() });
    function n() {
      e.sKeys = /* @__PURE__ */ new Set();
    }
    return {
      state: e,
      $reset: n
    };
  })), ve();
}
class B {
  static resetState() {
    x().$reset(), x().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = ({ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL ? { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: a = null, failedCallback: l = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
    function r() {
      if (t instanceof FormData)
        return t;
      const c = new FormData();
      for (const v in t)
        if (Array.isArray(t[v]))
          for (let b of t[v])
            c.append(v, b);
        else
          c.append(v, t[v]);
      return c;
    }
    let d = re.post(B.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      a && a(c.data);
    }).catch(function(c) {
      l && l(c);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json") {
    await B.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (a) => {
      let l = await a.json();
      Array.isArray(l) || (l = [l]), x().state.sKeys = new Set(l);
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
    x().state.sKeys.size === 0 && await B.getBatchSkeys(d);
    const v = [...x().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", v), x().state.sKeys.delete(v)) : (t || (t = {}), t.skey = v, x().state.sKeys.delete(v)), c = B.post(n, {
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
    let v = re.get(B.buildUrl(n), t, s, r, u, d);
    return v.then(function(b) {
      a && a(b.data);
    }).catch(function(b) {
      l && l(b);
    }), v;
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
    return o && (c += `/${o}`), B.get(c, {
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
    return o && (c += `/${o}`), B.get(c, {
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
    let v = `/${r}/${n}/view/${t}`;
    return s && (v = `/${r}/${n}/view/${s}/${t}`), B.get(v, {
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
    return o && (c = `/${u}/${n}/add/${o}`), B.securePost(c, {
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
    let v = `/${r}/${n}/edit/${t}`;
    return s && (v = `/${r}/${n}/edit/${s}/${t}`), B.securePost(v, {
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
    let v = `/${r}/${n}/delete/${t}`;
    return s && (v = `/${r}/${n}/delete/${s}/${t}`), B.securePost(v, {
      dataObj: a,
      callback: l,
      failedCallback: o,
      abortController: u,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? B.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? B.buildUrl(n.dest.downloadUrl) : B.buildUrl(null) : B.buildUrl(n);
  }
  static uploadFile(n, t = void 0) {
    const a = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((l, o) => {
      B.securePost("/vi/file/getUploadURL", { dataObj: a }).then(async (s) => {
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
            let v = await c.json();
            v.action === "addSuccess" ? l(v.values) : o(v);
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
        const v = new URLSearchParams();
        for (const [b, h] of Object.entries(d))
          if (Array.isArray(h))
            for (const _ of h)
              v.append(b, _);
          else
            v.append(b, h);
        c.search = v.toString();
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
const Vn = D({
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
    const t = O("boneState"), a = O("formatString"), l = w({
      format: k(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var b;
        const v = await c.json();
        l.skellistdata = {};
        for (let h of v.skellist)
          l.skellistdata[h.key] = h;
        return (b = v.skellist) == null ? void 0 : b.map((h) => ({ text: a(t.bonestructure.format, { dest: h }), value: h.key, data: h }));
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
const Rn = (e) => (T("data-v-61dd72e0"), e = e(), M(), e), Nn = { class: "record" }, Pn = { class: "single-entry" }, Ln = ["value"], Un = ["disabled", "source"], Tn = ["title"], Mn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Wn = [
  Mn
];
function zn(e, n, t, a, l, o) {
  var u, r;
  const s = le("Wrapper_nested");
  return f(), g("div", Nn, [
    i("div", Pn, [
      e.state.selection ? (f(), g("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Ln)) : (f(), g("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Un)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (f(), g("sl-button", {
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
    (u = e.boneState) != null && u.bonestructure.using ? (f(), U(s, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : $("", !0)
  ]);
}
const Me = /* @__PURE__ */ A(Vn, [["render", zn], ["__scopeId", "data-v-61dd72e0"]]), qn = D({
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
    const t = O("boneState"), a = w({});
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
const Fn = { class: "box" };
function Hn(e, n, t, a, l, o) {
  return f(), g("div", Fn, I(e.value), 1);
}
const Kn = /* @__PURE__ */ A(qn, [["render", Hn], ["__scopeId", "data-v-343aca69"]]), Gn = D({
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
    const t = O("boneState"), a = q(), l = w({
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
      const v = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((b, h) => {
        B.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: v }).then(async (_) => {
          let m = await _.json();
          fetch(m.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const y = {
              key: m.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let C = await S.json();
              C.action === "addSuccess" ? b(C.values) : h(C);
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
      for (let v of c.target.files) {
        let b = await u(v);
        a.value.value = null, n.emit("change", e.name, { dest: b, rel: null }, e.lang, e.index);
      }
      l.loading = !1;
    }
    async function d(c) {
      l.loading = !0, l.droparea = !1;
      for (let v of c.dataTransfer.files) {
        let b = await u(v);
        a.value.value = null, n.emit("change", e.name, { dest: b, rel: null }, e.lang, e.index);
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
const fe = (e) => (T("data-v-91086308"), e = e(), M(), e), Zn = {
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
  var s, u, r, d, c, v, b, h, _, m;
  return f(), g("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((p) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (p) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...p) => e.handleDrop && e.handleDrop(...p), ["prevent"]))
  }, [
    e.state.loading ? (f(), g("div", Zn, Qn)) : $("", !0),
    e.state.droparea ? (f(), g("div", Yn, " Dateien hier hinziehen ")) : $("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (f(), g("sl-button", {
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
    e.value ? (f(), g("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...p) => e.downloadFile && e.downloadFile(...p))
    }, as, 8, ns)) : $("", !0),
    i("div", ls, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (f(), g("div", {
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
      ])) : (f(), g("div", us, [
        (v = (c = e.value) == null ? void 0 : c.dest) != null && v.name ? (f(), g("sl-icon", ds)) : $("", !0)
      ])),
      (h = (b = e.value) == null ? void 0 : b.dest) != null && h.name ? (f(), g("div", cs, I(decodeURIComponent((m = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : m.name)), 1)) : $("", !0)
    ]),
    e.boneState.multiple ? $("", !0) : (f(), g("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (p) => e.$emit("change", e.name, "", e.lang, e.index))
    }, gs, 8, ms))
  ], 32);
}
const We = /* @__PURE__ */ A(Gn, [["render", ps], ["__scopeId", "data-v-91086308"]]), hs = D({
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
    const t = O("boneState"), a = w({
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
    return ae(
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
const vs = ["disabled", "value"];
function bs(e, n, t, a, l, o) {
  var u, r, d, c;
  const s = le("ckeditor");
  return e.state.editor ? (f(), g(E, { key: 0 }, [
    ((u = e.boneState.bonestructure) == null ? void 0 : u.valid_html) || ((r = e.boneState.bonestructure) == null ? void 0 : r.validHtml) ? (f(), U(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (v) => e.state.value = v),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (f(), g("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...v) => e.changeEventTextarea && e.changeEventTextarea(...v))
    }, null, 40, vs))
  ], 64)) : $("", !0);
}
const ze = /* @__PURE__ */ A(hs, [["render", bs]]), _s = D({
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
    const t = O("boneState"), a = w({
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
const ys = ["name", "min", "max", "disabled"], $s = ["name", "min", "max", "disabled"];
function Ss(e, n, t, a, l, o) {
  return f(), g(E, null, [
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
    }, null, 40, ys), [
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
    }, null, 40, $s), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const qe = /* @__PURE__ */ A(_s, [["render", Ss], ["__scopeId", "data-v-7bc31020"]]), ks = D({
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
    const t = O("boneState"), a = w({
      counter: 0,
      debounce: null
    }), l = O("addMultipleEntry"), o = O("removeMultipleEntries");
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
const Qe = (e) => (T("data-v-63e75dee"), e = e(), M(), e), ws = { class: "actionbar" }, Es = ["title"], As = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Cs = [
  As
], Is = ["title"], Os = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Bs(e, n, t, a, l, o) {
  return f(), g("div", ws, [
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Cs, 8, Es)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Os,
      j(" " + I(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (f(), g(E, { key: 0 }, [
        j("(" + I(e.state.counter) + ")", 1)
      ], 64)) : $("", !0)
    ], 8, Is)) : $("", !0)
  ]);
}
const js = /* @__PURE__ */ A(ks, [["render", Bs], ["__scopeId", "data-v-63e75dee"]]), Ds = D({
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
    const t = O("boneState"), a = O("addMultipleEntry"), l = O("formatString"), o = null, s = w({
      skels: {},
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), B.get(
        `/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (c) => {
        var b;
        const v = await c.json();
        return s.skels = v.skellist.reduce((h, _) => (h[_.key] = _, h), {}), (b = v.skellist) == null ? void 0 : b.map((h) => ({ text: l(t.bonestructure.format, { dest: h }), value: h.key, data: h }));
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
const Ye = (e) => (T("data-v-eeea51c6"), e = e(), M(), e), Vs = { class: "actionbar" }, Rs = ["title"], Ns = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ps = [
  Ns
], Ls = ["source"], Us = ["title"], Ts = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ms(e, n, t, a, l, o) {
  return f(), g("div", Vs, [
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
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
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ts,
      j(" " + I(e.$t("bone.list")), 1)
    ], 8, Us)) : $("", !0)
  ]);
}
const Ws = /* @__PURE__ */ A(Ds, [["render", Ms], ["__scopeId", "data-v-eeea51c6"]]), zs = D({
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
    const t = O("boneState"), a = O("addMultipleEntry");
    O("formatString");
    const l = null, o = q(), s = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: k(() => t == null ? void 0 : t.bonestructure.using)
    });
    function u(c) {
      const v = {
        fileName: c.name,
        mimeType: c.type || "application/octet-stream",
        size: c.size.toString()
      };
      return new Promise((b, h) => {
        B.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: v }).then(async (_) => {
          let m = await _.json();
          fetch(m.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (p) => {
            const y = {
              key: m.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            B.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let C = await S.json();
              C.action === "addSuccess" ? b(C.values) : h(C);
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
      for (let v of c.target.files) {
        let b = await u(v);
        o.value.value = null;
        let h = null;
        s.hasUsing && (h = void 0), a(e.lang, { dest: b, rel: h });
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let v of c.dataTransfer.files) {
        let b = await u(v);
        o.value.value = null;
        let h = null;
        s.hasUsing && (h = void 0), a(e.lang, { dest: b, rel: h });
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
const $e = (e) => (T("data-v-9bac9f8a"), e = e(), M(), e), qs = ["title"], Fs = /* @__PURE__ */ $e(() => /* @__PURE__ */ i("sl-icon", {
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
  return f(), g("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = de((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = de((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Hs, 8, qs)) : $("", !0),
    e.state.droparea ? (f(), g("div", Ks, " Dateien hier hinziehen ")) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Gs),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Qs, 8, Zs)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (f(), g("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Xs,
      j(" " + I(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (f(), g("sl-spinner", xs)) : $("", !0)
    ], 8, Ys)) : $("", !0)
  ], 32);
}
const ta = /* @__PURE__ */ A(zs, [["render", ea], ["__scopeId", "data-v-9bac9f8a"]]), Se = ye("boneStore", () => {
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
function ee(e) {
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
D({
  inheritAttrs: !1,
  emits: ["change", "change-internal", "handleClick"],
  components: {
    wrapperMultiple: Ot,
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
    const t = w({
      bonestructure: k(() => {
        var m;
        return (m = e.structure) == null ? void 0 : m[e.name];
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
        var m;
        return ((m = t.languages) == null ? void 0 : m.length) && t.languages.length > 0;
      }),
      languages: k(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: k(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: k(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: k(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: k(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: k(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: k(() => {
        var m;
        return na((m = t.bonestructure) == null ? void 0 : m.type);
      }),
      isEmpty: k(() => {
        function m(p) {
          for (const [y, S] of Object.entries(p))
            if (S !== null) {
              if (Array.isArray(S) && S.length > 0)
                return !1;
              if (!Array.isArray(S))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? m(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: k(() => {
        let m = [];
        for (let p of e.errors)
          p.fieldPath[0] === e.name && (p.severity > 2 || t.required && (p.severity === 2 || p.severity === 0)) && m.push(p.errorMessage);
        return m;
      })
    });
    ie("boneState", t);
    function a(m, p, y) {
      s(p, m, "isDragging"), s(p, m, "dragStartIndex");
    }
    function l(m, p, y) {
      y.preventDefault();
      const S = y.clientY - y.target.getBoundingClientRect().top, C = y.target.closest(".value-line");
      S < C.offsetHeight / 2 ? (s(p, m, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = m) : (s(p, m, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = m + 1);
      let N = p ? t.bonevalue[p] : t.bonevalue;
      t.dropIndex.index > N.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(m, p, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (p ? (S = t.bonevalue[p].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[p].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: p,
        index: m
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(m, p, y) {
      t[y].lang = m || null, t[y].index = p;
    }
    function u(...m) {
      m.forEach((p) => {
        t[p] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(m, p, y = null, S = null, C) {
      if (p === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = p : t.bonevalue[y] = p) : S !== null ? t.bonevalue[S] = p : C === !1 || (t.bonevalue = p), t.readonly))
        return !1;
      let N = {
        name: m,
        value: d(),
        lang: y,
        index: S
      }, V = {
        name: m,
        value: p,
        lang: y,
        index: S
      };
      C != null && (N.pwMatch = C, V.pwMatch = C), n.emit("change", N), n.emit("change-internal", V);
    }
    function d() {
      function m(y, S = null) {
        let C = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            C.push({ [S + ".lat"]: y[0] }), C.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((N) => N === Object(N)).length > 0)
            for (const [N, V] of y.entries())
              V.rel !== null ? C.push(m(V, S + "." + N)) : C.push(m(V, S));
          else
            for (const [N, V] of y.entries())
              C.push(m(V, S));
        else if (y === Object(y))
          for (const [N, V] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && N === "key" ? (/\.[0-9]*\.dest$/.test(S) ? C.push(m(V, S.replace(/\.[0-9]*\.dest/, ""))) : C.push(m(V, S.replace(/\.dest/, ""))), C.push(m(V, S.replace(/\.dest/, "") + "." + N))) : S.endsWith(".rel") && C.push(m(V, S.replace(/\.rel/, "") + "." + N)) : C.push(m(V, S + "." + N)) : C.push(m(V, N));
        else
          y == null && (y = ""), S !== null && C.push({ [S]: y });
        return C;
      }
      let p = m(t.bonevalue, e.name);
      return p = p.flat(10), p;
    }
    function c(m = null, p = "") {
      m ? Object.keys(t.bonevalue).includes(m) ? t.bonevalue[m].push(p) : t.bonevalue[m] = [p] : t.bonevalue ? t.bonevalue.push(p) : t.bonevalue = [p];
    }
    ie("addMultipleEntry", c);
    function v(m, p = null) {
      var y;
      p ? (y = t.bonevalue) == null || y[p].splice(m, 1) : t.bonevalue.splice(m, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: p,
        index: m
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: p,
        index: m
      });
    }
    function b(m = null) {
      var p;
      m ? (p = t.bonevalue) == null || p[m].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: d(),
        lang: m
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: m
      });
    }
    ie("removeMultipleEntries", b);
    function h(m = null, p = "") {
      c(m, p);
    }
    function _(m, p) {
      function y(V) {
        let J = [], F = [], se = /\$\((.*?)\)/g;
        for (; F; ) {
          if (F = se.exec(V), !F) {
            F = !1;
            continue;
          }
          J.push(F[1]);
        }
        return J;
      }
      function S(V, J) {
        let F = V.split("."), se = V.split("."), z = J;
        for (let X of F)
          if (se.shift(), z && z !== "-" && Object.keys(z).includes(X) && z[X])
            if (Array.isArray(z[X])) {
              let Ce = [];
              for (let tt of z[X])
                Ce.push(S(se.join("."), tt));
              z = Ce.join(", ");
            } else
              z = z[X];
          else
            (!z || typeof z[X] == "object" && !z[X]) && (z = "-");
        return z;
      }
      let C = y(m), N = [];
      Array.isArray(p) || (p = [p]);
      for (let V of p) {
        let J = m;
        for (let F of C) {
          let se = S(F, V);
          J = J.replace("$(" + F + ")", se);
        }
        N.push(J);
      }
      return N.join(", ");
    }
    return ie("formatString", _), Z(() => {
      var m;
      e.value ? t.bonevalue = e.value : t.bonevalue = (m = e.skel) == null ? void 0 : m[e.name];
    }), ae(
      () => e.skel,
      (m, p) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), ae(
      () => {
        var m;
        return (m = e.errors) == null ? void 0 : m[e.name];
      },
      (m, p) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: c,
      removeMultipleEntry: v,
      removeMultipleEntries: b,
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
const aa = (e) => (T("data-v-46c45785"), e = e(), M(), e), la = {
  key: 0,
  class: "loading"
}, oa = /* @__PURE__ */ aa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ra = { class: "logo" }, ia = ["src"];
function ua(e, n, t, a, l, o) {
  return f(), U(ut, null, {
    default: dt(() => [
      t.active ? (f(), g("div", la, [
        oa,
        i("div", ra, [
          i("sl-icon", { src: t.logo }, null, 8, ia)
        ])
      ])) : $("", !0)
    ]),
    _: 1
  });
}
const da = /* @__PURE__ */ A(ke, [["render", ua], ["__scopeId", "data-v-46c45785"]]), Y = ye("cartstore", () => {
  const e = new gt({
    host_url: window.location.origin === "http://localhost:8081" ? "http://localhost:8080" : window.location.origin
  }), n = w({
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
    (await e.cart_list()).forEach((m) => {
      m.is_root_node && (m.cart_type === "basket" ? n.basketRootNode = m : n.whishlistRootNodes.push(m));
    });
  }
  async function o(_, m) {
    let p = await e.article_add({
      article_key: _,
      parent_cart_key: m
    });
    console.log("addToCart", p);
  }
  async function s(_, m) {
    let p = await e.article_view({
      article_key: _,
      parent_cart_key: m
    });
    console.log("getArticleView", p);
  }
  async function u(_, m) {
    let p = await e.article_remove({
      article_key: _,
      parent_cart_key: m
    });
    console.log("remove Resp", p);
  }
  async function r(_, m, p) {
    let y = await e.article_update({
      article_key: _,
      parent_cart_key: m,
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
    for (const m of _)
      m.address_type === "billing" && (n.billingAddress = m), m.address_type === "shipping" && (n.shippingAddress = m);
  }
  async function v(_) {
    await e.discount_add({ code: _ });
  }
  async function b() {
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
    addDiscount: v,
    getAddress: c,
    getShippingData: b,
    payment_providers_list: h
  };
}), ca = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (f(), g("pre", null, I(e.node.name), 1));
  }
};
const ge = (e) => (T("data-v-d313b580"), e = e(), M(), e), ma = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, fa = ["src"], ga = { class: "viur-shop-cart-leaf-headline headline" }, pa = { class: "viur-shop-cart-leaf-artno" }, ha = ["innerHTML"], va = { class: "viur-shop-cart-leaf-quantity" }, ba = { class: "viur-shop-cart-leaf-unitprice" }, _a = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "St\xFCckpreis", -1)), ya = ["value"], $a = { class: "viur-shop-cart-leaf-actions" }, Sa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-button", {
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
], Ea = { class: "viur-shop-cart-leaf-price" }, Aa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Ca = ["value"], Ia = {
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
      return r !== void 0 ? pt.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(r, d, c, v) {
      a("updateItem", {
        item: r,
        articleKey: d,
        node: c,
        quantity: v
      });
    }
    function u(r, d, c) {
      a("removeItem", { item: r, articleKey: d, node: c });
    }
    return Z(() => {
      l.leaf = t.leaf;
    }), (r, d) => (f(), g("sl-card", ma, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(l.leaf.shop_image ? l.leaf.shop_image : void 0)
      }, null, 8, fa),
      i("h4", ga, I(l.leaf.shop_name), 1),
      i("h5", pa, I(l.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: l.leaf.shop_description
      }, null, 8, ha),
      i("div", va, [
        Q(i("sl-input", {
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
}, Oa = /* @__PURE__ */ A(Ia, [["__scopeId", "data-v-d313b580"]]), Ba = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), ja = { key: 0 }, Da = { key: 0 }, Va = { key: 1 }, Ra = {
  __name: "Discount",
  setup(e) {
    const n = Y(), t = q(null), a = q(null), l = w({
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
    return (s, u) => (f(), g(E, null, [
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
          Ba,
          j(" " + I(l.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        P(n).state.basketRootNode.discount ? (f(), g("div", ja, [
          P(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (f(), g("span", Da, " Sie haben einen Rabattcode im Wert von " + I(P(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : $("", !0),
          P(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (f(), g("span", Va, " Sie haben einen Rabattcode im Wert von " + I(P(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : $("", !0)
        ])) : $("", !0)
      ])
    ], 64));
  }
}, Na = { key: 0 }, Pa = ["value"], La = {
  __name: "Shipping",
  setup(e, { expose: n }) {
    const t = Y(), a = w({
      shippingData: [],
      cheapestShipping: {},
      isShipping: !1
    });
    async function l() {
      a.shippingData = await t.getShippingData(), a.shippingData.sort((o, s) => o.dest.shipping_cost < o.dest.shipping_cost ? -1 : o.dest.shipping_cost > o.dest.shipping_cost ? 1 : 0), a.cheapestShipping = a.shippingData[a.shippingData.length - 1], a.isShipping = !0, console.log("cheapestShipping", a.cheapestShipping);
    }
    return n({ getShipping: l }), Z(async () => {
      await t.init(), await l();
    }), (o, s) => a.isShipping ? (f(), g("div", Na, [
      j(" Versandkosten: "),
      i("sl-format-number", {
        type: "currency",
        currency: "EUR",
        value: a.cheapestShipping.dest.shipping_cost,
        lang: "de"
      }, null, 8, Pa)
    ])) : $("", !0);
  }
};
const H = (e) => (T("data-v-d8a81103"), e = e(), M(), e), Ua = { key: 0 }, Ta = /* @__PURE__ */ H(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Ma = {
  class: "footer-wrap",
  slot: "footer"
}, Wa = { class: "viur-shop-cart-node" }, za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Fa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("br", null, null, -1)), Ha = { class: "viur-shop-cart-sidebar-info-line" }, Ka = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Ga = ["value"], Za = { class: "viur-shop-cart-sidebar-info-line" }, Ja = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Qa = ["value"], Ya = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ i("sl-format-number", {
    type: "currency",
    currency: "EUR",
    value: 0,
    lang: "de"
  })
], -1)), Xa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line total" }, [
  /* @__PURE__ */ i("span", null, "Gesamt:"),
  /* @__PURE__ */ i("sl-format-number", {
    type: "currency",
    currency: "EUR",
    value: 0,
    lang: "de"
  })
], -1)), xa = {
  key: 0,
  class: "viur-shop-cart-sidebar-btn-wrap"
}, el = /* @__PURE__ */ H(() => /* @__PURE__ */ i("sl-button", {
  variant: "primary",
  size: "medium"
}, " Jetzt Bestellen ", -1)), tl = [
  el
], nl = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ i("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen")
], -1)), sl = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    inOrderView: { type: Boolean, default: !1 }
  },
  setup(e) {
    const n = e, t = Y(), a = q(null), l = q(null), o = w({
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
      ), await v(), a.value.hide();
    }
    async function r(h) {
      console.log("updateItem :", h), h.quantity === 0 ? (a.value.show(), o.currentItem = h.item, o.currentNode = h.node) : (await t.updateItem(h.articleKey, h.node.key, h.quantity), await t.init()), console.log("shipping", l), l.value.getShipping();
    }
    function d(h) {
      console.log("removeItem :", h), a.value.show(), o.currentItem = h.item, o.currentNode = h.node;
    }
    async function c() {
      o.leaves[o.currentNode.key].forEach((h) => {
        h.key === o.currentItem.key && (h.quantity = 1);
      }), o.currentItem = {}, o.currentNode = {};
    }
    async function v() {
      o.nodes = [], o.leaves = {}, await t.init(), await b();
    }
    async function b(h = s) {
      h = h.value, console.log("debug getChildren parentKey from comp: ", h);
      const _ = await t.getChildren(h);
      console.log("getChildren children: ", _), _.forEach(async (m) => {
        m.skel_type === "node" ? (o.nodes.push(m), await b(m.key)) : (Object.keys(o.leaves).includes(h) || (o.leaves[h] = []), o.leaves[h].push(m));
      });
    }
    return Z(async () => {
      await t.init(), await b(), n.mode === "basket" && o.nodes.push(t.state.basketRootNode), console.log("state.nodes test", o.nodes), console.log("state.leaves", o.leaves);
    }), (h, _) => s.value ? (f(), g(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: a,
        onSlHide: c
      }, [
        Ta,
        i("div", Ma, [
          i("sl-button", {
            variant: "danger",
            onClick: _[0] || (_[0] = (m) => a.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: u,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (f(!0), g(E, null, L(o.nodes, (m) => (f(), g("div", Wa, [
        Object.keys(o.leaves).includes(m.key) ? (f(), g(E, { key: 0 }, [
          he(ca, { node: m }, null, 8, ["node"]),
          (f(!0), g(E, null, L(o.leaves[m.key], (p) => (f(), U(Oa, {
            key: p.key,
            leaf: p,
            node: m,
            onRemoveItem: d,
            onUpdateItem: r
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : $("", !0)
      ]))), 256)),
      za,
      e.sidebar ? (f(), U(Ge, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (f(), g(E, { key: 0 }, [
          qa,
          Fa,
          i("div", Ha, [
            Ka,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: P(t).state.basketRootNode.total
            }, null, 8, Ga)
          ]),
          i("div", Za, [
            Ja,
            i("sl-format-number", {
              type: "currency",
              currency: "EUR",
              value: P(t).state.basketRootNode.total - P(t).state.basketRootNode.total_discount_price,
              lang: "de"
            }, null, 8, Qa)
          ]),
          Ya,
          Xa,
          n.inOrderView ? $("", !0) : (f(), g("div", xa, tl))
        ], 64)) : $("", !0)
      ])) : $("", !0),
      he(Ra),
      he(La, {
        ref_key: "shipping",
        ref: l
      }, null, 512),
      nl
    ], 64)) : (f(), g("sl-spinner", Ua));
  }
}, we = /* @__PURE__ */ A(sl, [["__scopeId", "data-v-d8a81103"]]), al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
const te = (e) => (T("data-v-b3e35258"), e = e(), M(), e), ll = {
  key: 1,
  class: "list"
}, ol = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), rl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ j(" Versandadresse "),
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
    /* @__PURE__ */ j(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" Speicherstra\xDFe 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ i("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ j(" Rechnungsadresse "),
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
    /* @__PURE__ */ j(" Roland Brose"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" Speicherstra\xDFe 33"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" 44147 Dortmund, DE"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" rb@mausbrand.de"),
    /* @__PURE__ */ i("br"),
    /* @__PURE__ */ j(" 0231 21 34 68 90 ")
  ])
], -1)), il = { class: "viur-shop-cart-payment" }, ul = { class: "viur-shop-cart-payment-method" }, dl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("span", null, "Zahlungsmethode:", -1)), cl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-button", {
  outline: "",
  size: "small"
}, [
  /* @__PURE__ */ i("sl-icon", {
    name: "pencil",
    slot: "prefix"
  })
], -1)), ml = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), fl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), gl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), pl = { class: "viur-shop-cart-sidebar-btn-wrap" }, hl = ["variant", "disabled"], vl = {
  __name: "ConfirmView",
  setup(e) {
    const n = Y(), t = w({
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
    console.log("se", t.selectedPaymentProvider);
    function a(l) {
      l.target.checked && (t.showOrderButton = !0), l.target.checked || (t.showOrderButton = !1);
    }
    return Z(async () => {
      await n.init();
    }), (l, o) => t.cartIsInit ? (f(), g("div", ll, [
      ol,
      rl,
      i("div", il, [
        i("div", ul, [
          dl,
          j(" " + I(t.selectedPaymentProvider), 1)
        ]),
        cl
      ]),
      ml,
      (f(), U(Ge, { to: "#order_sidebar" }, [
        fl,
        gl,
        i("sl-checkbox", { onSlChange: a }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", pl, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, hl)
        ])
      ]))
    ])) : (f(), U(da, { key: 0 }));
  }
}, Ee = /* @__PURE__ */ A(vl, [["__scopeId", "data-v-b3e35258"]]), bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
const _l = (e) => (T("data-v-50f31583"), e = e(), M(), e), yl = { class: "bind viur-shop-wrap" }, $l = ["panel", "disabled"], Sl = { class: "viur-shop-order-step" }, kl = ["name", "library"], wl = { class: "viur-shop-order-status-text" }, El = { class: "viur-shop-order-status-span" }, Al = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Cl = ["name"], Il = ["onClick"], Ol = ["onClick"], Bl = /* @__PURE__ */ _l(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ i("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), jl = {
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
    }), o = q(null);
    function s(c) {
      let v = [], b = [];
      for (const h in c)
        c[h].position ? v.push([h, c[h].position]) : v.push([h, 0]);
      return v.sort((h, _) => h[1] - _[1]), v.forEach((h) => {
        b.push(h[0]);
      }), b;
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
    return (c, v) => (f(), g("div", yl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (f(!0), g(E, null, L(l.tabNames, (b, h) => {
          var _;
          return f(), g("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: b,
            key: b,
            disabled: e.tabs[b].disabled
          }, [
            i("div", Sl, [
              (_ = e.tabs[b].icon) != null && _.name ? (f(), g("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[b].icon.name,
                library: e.tabs[b].icon.library
              }, null, 8, kl)) : $("", !0),
              i("div", wl, [
                j(I(h + 1) + ". ", 1),
                i("span", El, I(e.tabs[b].displayName), 1)
              ])
            ]),
            h < l.tabNames.length - 1 ? (f(), g("sl-icon", Al)) : $("", !0)
          ], 8, $l);
        }), 128)),
        (f(!0), g(E, null, L(l.tabNames, (b, h) => (f(), g("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: b,
          key: b
        }, [
          (f(), U(ct(e.tabs[b].component), mt({ ref_for: !0 }, e.tabs[b].props ? e.tabs[b].props : ""), null, 16)),
          h !== l.tabNames.length - 1 ? (f(), g("div", {
            key: 0,
            class: G(["viur-shop-form-footer", { "flex-end": l.isFirstTab(h) }])
          }, [
            Q(i("sl-button", {
              type: "submit",
              onClick: (_) => r(l.tabNames[h - 1])
            }, " Zur\xFCck ", 8, Il), [
              [be, h !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => d(l.tabNames[h + 1])
            }, " Weiter ", 8, Ol)
          ], 2)) : $("", !0)
        ], 8, Cl))), 128))
      ], 544),
      Bl
    ]));
  }
}, Xe = /* @__PURE__ */ A(jl, [["__scopeId", "data-v-50f31583"]]);
const pe = (e) => (T("data-v-688e20e0"), e = e(), M(), e), Dl = { class: "bind" }, Vl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), Rl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ j(" 123345670 ")
], -1)), Nl = { class: "paragraph" }, Pl = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("br", null, null, -1)), Ll = { class: "btn-wrap" }, Ul = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Tl = {
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
    return (t, a) => (f(), g("div", Dl, [
      Vl,
      Rl,
      i("p", Nl, [
        j(" Wir haben Ihre Bestellung erhalten und werden diese schenllstm\xF6glich bearbeiten."),
        Pl,
        j(" Sie erhalten in wenigen Minuten eine Best\xE4tigung per E-Mail. "),
        i("div", Ll, [
          Ul,
          i("sl-button", {
            variant: "primary",
            onClick: a[0] || (a[0] = (l) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Ml = /* @__PURE__ */ A(Tl, [["__scopeId", "data-v-688e20e0"]]);
const Ae = (e) => (T("data-v-4d14c6fe"), e = e(), M(), e), Wl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), zl = { class: "viur-shop-form-wrap" }, ql = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Fl = { class: "viur-shop-form-wrap" }, Hl = { key: 0 }, Kl = /* @__PURE__ */ Ae(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Gl = { class: "viur-shop-form-wrap" }, Zl = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = Y(), t = w({
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
      return f(), g(E, null, [
        i("div", null, [
          Wl,
          i("div", zl, [
            (f(!0), g(E, null, L(t.addSkel, (d, c) => (f(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (f(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Info" ? (f(), U(r, {
                  key: 0,
                  is: P(ee)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (v) => l(c, v),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          ql,
          i("div", Fl, [
            (f(!0), g(E, null, L(t.addSkel, (d, c) => (f(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (f(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (f(), U(r, {
                  key: 0,
                  is: P(ee)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (v) => l(c, v)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (f(), g("div", Hl, [
          Kl,
          i("div", Gl, [
            (f(!0), g(E, null, L(t.addSkel, (d, c) => (f(), g(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (f(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (f(), U(r, {
                  key: 0,
                  is: P(ee)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (v) => l(c, v)
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
}, Jl = /* @__PURE__ */ A(Zl, [["__scopeId", "data-v-4d14c6fe"]]);
const ne = (e) => (T("data-v-c4232b7a"), e = e(), M(), e), Ql = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Yl = { class: "viur-shop-form-wrap" }, Xl = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), xl = ["onSlChange", "onSlClear", "label"], eo = ["value"], to = { key: 0 }, no = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), so = { class: "viur-shop-form-wrap" }, ao = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), lo = [
  ao
], oo = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), ro = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), io = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("br", null, null, -1)), uo = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = Y(), t = w({
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
    }), a = q(null), l = q(null);
    function o(b) {
      b.target.checked && (t.isCustomAdress = !1), b.target.checked || (t.isCustomAdress = !0);
    }
    function s() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie k\xF6nnen nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, l.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(b, h) {
      for (const [_, m] of Object.entries(h.value[0]))
        t.formValues[_] = m;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", l.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function d(b, h) {
      if (console.log(b.target.value), !b.target.value.length) {
        c();
        return;
      }
      t.selectedItem[h] = b.target.value, t.isItemSelected = !0;
    }
    function c(b, h) {
      console.log("clearing..."), delete t.selectedItem[h], t.isItemSelected = !1;
    }
    function v(b) {
      let h = {};
      return Array.isArray(b) ? (b.forEach((_) => {
        let m = _[0], p = _[1];
        h[m] = p;
      }), h) : b;
    }
    return ae(t.formValues, (b) => {
      Object.entries(b).forEach(([h, _]) => {
        _ === "" && delete t.formValues[h];
      });
    }), Z(async () => {
      await n.getAddressStructure(), t.addSkel = v(n.state.structure.address);
    }), (b, h) => {
      const _ = le("bone");
      return f(), g(E, null, [
        i("div", null, [
          Ql,
          i("div", Yl, [
            (f(!0), g(E, null, L(t.addSkel, (m, p) => (f(), g(E, { key: p }, [
              m.visible && m.params.group === "Customer Info" ? (f(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + p)
              }, [
                m.visible && m.params.group === "Customer Info" ? (f(), U(_, {
                  key: 0,
                  is: P(ee)(m.type),
                  name: p,
                  structure: v(t.addSkel),
                  errors: t.errors[p] ? t.errors[p] : [],
                  skel: t.formValues,
                  onChange: (y) => u(p, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        Xl,
        (f(!0), g(E, null, L(t.shippingAdressAmount, (m) => (f(), g("div", {
          class: "viur-shop-form-wrap",
          key: m
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: a,
            onSlChange: (p) => d(p, m),
            onSlClear: (p) => c(p, m),
            label: t.selectedItem[m] ? P(n).state.carts[t.selectedItem[m]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (f(!0), g(E, null, L(P(n).state.carts, (p, y) => (f(), g("sl-option", { value: y }, I(p.info.name), 9, eo))), 256))
          ], 40, xl),
          (f(!0), g(E, null, L(t.addSkel, (p, y) => (f(), g(E, { key: y }, [
            p.visible && p.params.group === "Customer Address" ? (f(), g("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              p.visible && p.params.group === "Customer Address" ? (f(), U(_, {
                key: 0,
                is: P(ee)(p.type),
                name: y,
                structure: v(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
            ], 2)) : $("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (f(), g("div", to, [
          no,
          i("div", so, [
            (f(!0), g(E, null, L(t.addSkel, (m, p) => (f(), g(E, { key: p }, [
              m.visible && m.params.group === "Customer Address" ? (f(), g("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + p)
              }, [
                m.visible && m.params.group === "Customer Address" ? (f(), U(_, {
                  key: 0,
                  is: P(ee)(m.type),
                  name: p,
                  structure: v(t.addSkel),
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
          }, lo),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            oo,
            j(" Lieferadresse hinzuf\xFCgen ")
          ])
        ]),
        i("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: l,
          closable: ""
        }, [
          ro,
          i("strong", null, I(t.amountAlert.title), 1),
          io,
          j(" " + I(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, co = /* @__PURE__ */ A(uo, [["__scopeId", "data-v-c4232b7a"]]), xe = {
  __name: "ExampleUsage",
  setup(e) {
    const n = Y(), t = k(
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
          component: K(Ml),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: K(Jl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: K(co),
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
    }), (o, s) => (f(), U(Xe, {
      tabs: a.tabs,
      onTabChange: l
    }, null, 8, ["tabs"]));
  }
}, mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" }));
const et = (e) => (T("data-v-d67cb5c9"), e = e(), M(), e), fo = ["id", "selected"], go = /* @__PURE__ */ et(() => /* @__PURE__ */ i("img", {
  slot: "image",
  src: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  alt: "A kitten sits patiently between a terracotta pot and decorative grasses."
}, null, -1)), po = { slot: "footer" }, ho = /* @__PURE__ */ et(() => /* @__PURE__ */ i("br", null, null, -1)), vo = {
  __name: "SelectPaymentProvider",
  setup(e) {
    const n = Y();
    function t(a) {
      a.target.selected ? (console.log("a", n.state.selectedPaymentProvider), console.log("b", n.state.paymentProviders), n.state.selectedPaymentProvider = n.state.paymentProviders[a.target.id.replace("povider__", "")], console.log(n.state.selectedPaymentProvider), document.querySelectorAll("sl-card").forEach((l) => {
        l !== a.target && (l.selected = !1);
      })) : a.target.selected = !0, console.log("provider changed", a);
    }
    return Z(async () => {
      await n.payment_providers_list();
    }), (a, l) => (f(!0), g(E, null, L(P(n).state.paymentProviders, (o, s, u) => (f(), g("div", null, [
      i("sl-card", {
        selectable: "",
        id: "povider__" + s,
        onSlChange: t,
        selected: u === 0
      }, [
        go,
        i("div", po, [
          j(I(o.title) + " ", 1),
          ho,
          j(" " + I(o.descr), 1)
        ])
      ], 40, fo)
    ]))), 256));
  }
}, jo = /* @__PURE__ */ A(vo, [["__scopeId", "data-v-d67cb5c9"]]), bo = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = ht();
    return { state: w({}), route: t };
  }
}), _o = { class: "home" };
function yo(e, n, t, a, l, o) {
  return f(), g("div", _o, "View " + I(e.route.path) + " is missing.", 1);
}
const $o = /* @__PURE__ */ A(bo, [["render", yo]]), So = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: $o
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView.3069e87b.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.7d5bd902.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => al)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => mo)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => bl)
  }
];
function Do(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(So), vt({
    history: bt("/"),
    routes: t
  });
}
const ko = ft(), Vo = {
  install(e) {
    e.component("CartView", we), e.component("ExampleUsage", xe), e.component("ConfirmView", Ee), e.component("OrderView", Xe), e.use(ko);
  }
};
export {
  we as C,
  Ml as O,
  jo as S,
  Jl as U,
  Vo as V,
  A as _,
  xe as a,
  Ee as b,
  Xe as c,
  Do as d,
  Y as u
};
