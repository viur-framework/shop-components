var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Oe = (e, n, t) => (st(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, inject as B, reactive as w, openBlock as f, createElementBlock as p, normalizeClass as G, createElementVNode as i, renderSlot as Ge, pushScopeId as z, popScopeId as q, Fragment as E, createCommentVNode as $, toDisplayString as C, onMounted as N, ref as M, readonly as at, getCurrentScope as lt, onScopeDispose as ot, unref as V, computed as k, watchEffect as fe, renderList as U, watch as se, withDirectives as J, vModelText as re, getCurrentInstance as rt, resolveComponent as ae, createBlock as T, vShow as _e, withModifiers as ce, createTextVNode as O, shallowRef as K, provide as ue, onBeforeMount as Q, useCssVars as it, Transition as ut, withCtx as dt, createVNode as be, Teleport as Ze, resolveDynamicComponent as ct, mergeProps as ft } from "vue";
import { defineStore as $e, createPinia as mt } from "pinia";
import Be from "@viur/ckeditor5-build-classic";
import { ViURShopClient as gt } from "@viur/viur-shop-client";
import { Request as pt } from "@viur/vue-utils";
import { useRoute as ht, createRouter as bt, createWebHashHistory as vt } from "vue-router";
const _t = D({
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
const I = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, a] of n)
    t[l] = a;
  return t;
}, Je = (e) => (z("data-v-141aaf9b"), e = e(), q(), e), yt = ["draggable"], $t = ["disabled"], St = /* @__PURE__ */ Je(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), kt = [
  St
], wt = { class: "value" }, Et = ["disabled", "title"], At = /* @__PURE__ */ Je(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ct = [
  At
];
function It(e, n, t, l, a, o) {
  return f(), p("div", {
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
      Ge(e.$slots, "default", {}, void 0, !0)
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
const Ot = /* @__PURE__ */ I(_t, [["render", It], ["__scopeId", "data-v-141aaf9b"]]), Bt = D({
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
const jt = { class: "bone-name" }, Dt = { key: 0 }, Vt = { class: "bone" };
function Rt(e, n, t, l, a, o) {
  return f(), p(E, null, [
    i("label", jt, [
      Ge(e.$slots, "default", {}, void 0, !0),
      $("", !0)
    ]),
    e.state.debug ? (f(), p("div", Dt, [
      i("div", Vt, C(e.name), 1),
      i("pre", null, "    " + C(e.boneState) + `
    `, 1)
    ])) : $("", !0)
  ], 64);
}
const Nt = /* @__PURE__ */ I(Bt, [["render", Rt], ["__scopeId", "data-v-b7149172"]]), Lt = D({
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
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const Ut = ["disabled", "value"], Tt = ["disabled", "value"];
function Pt(e, n, t, l, a, o) {
  var s, u;
  return e.boneState.bonestructure.type === "raw.json" ? (f(), p("sl-textarea", {
    key: 0,
    disabled: (s = e.boneState) == null ? void 0 : s.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ut)) : (f(), p("sl-textarea", {
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: l
    };
  }
});
const Wt = ["value"];
function zt(e, n, t, l, a, o) {
  return f(), p("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Wt);
}
const je = /* @__PURE__ */ I(Mt, [["render", zt], ["__scopeId", "data-v-b45a1311"]]);
function qt(e) {
  return lt() ? (ot(e), !0) : !1;
}
function Ft(e) {
  return typeof e == "function" ? e() : V(e);
}
const Ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, a = M(!1);
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
  return l && (a.value = !0, Ht && r()), qt(u), {
    isPending: at(a),
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
        for (let b of d)
          c && c !== "-" && b in c && c[b] ? c = c[b] : c = "-";
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
    const t = B("boneState"), l = w({
      value: k(() => e.value)
    }), a = M(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return fe(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = me(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      Utils: Kt,
      boneState: t,
      changeEvent: o,
      stringBone: a
    };
  }
});
const Zt = ["disabled", "value", "required"];
function Jt(e, n, t, l, a, o) {
  return f(), p("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Zt);
}
const De = /* @__PURE__ */ I(Gt, [["render", Jt], ["__scopeId", "data-v-1ccbacc0"]]), Qt = D({
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
    const t = B("boneState"), l = w({}), a = M(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return fe(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = me(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      emailBone: a
    };
  }
});
const Yt = ["disabled", "value"];
function Xt(e, n, t, l, a, o) {
  return f(), p("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Yt);
}
const Ve = /* @__PURE__ */ I(Qt, [["render", Xt], ["__scopeId", "data-v-4328e024"]]), xt = D({
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const en = ["disabled", "type", "value"];
function tn(e, n, t, l, a, o) {
  return f(), p("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, en);
}
const Re = /* @__PURE__ */ I(xt, [["render", tn], ["__scopeId", "data-v-f1b8af8c"]]), nn = D({
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
    return N(() => {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      convertObjToList: a
    };
  }
});
const sn = ["disabled", "value", "multiple"], an = ["value"];
function ln(e, n, t, l, a, o) {
  return f(), p("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (f(!0), p(E, null, U(e.convertObjToList(), (s) => (f(), p("sl-option", {
      key: s[0],
      value: s[0]
    }, C(s[1]), 9, an))), 128))
  ], 40, sn);
}
const Ne = /* @__PURE__ */ I(nn, [["render", ln], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
    function a(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return N(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const rn = ["disabled", "checked"];
function un(e, n, t, l, a, o) {
  return f(), p("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, rn);
}
const Le = /* @__PURE__ */ I(on, [["render", un], ["__scopeId", "data-v-363598c8"]]), dn = D({
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
    }), a = M(null);
    function o(u) {
      l.value1 === l.value2 ? l.equal = !0 : l.equal = !1, s(l.value1), l.requiredPasswordInfo.length === 0 && l.passwordInfo.length - l.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, l.value1, e.lang, e.index, !0) : n.emit("change", e.name, l.value1, e.lang, e.index, !1);
    }
    N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      l.passwordInfo = [], l.requiredPasswordInfo = [];
      for (const r of t.bonestructure.tests)
        new RegExp(r[0]).test(u) || (r[2] ? l.requiredPasswordInfo.push(r[1]) : l.passwordInfo.push(r[1]));
      l.equal || l.requiredPasswordInfo.push("Die eingegebenen Passw\xF6rter stimmen nicht \xFCberein."), l.value1 || l.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return fe(() => {
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
});
const cn = ["disabled"], fn = ["name"], mn = ["name"], gn = { class: "errors" };
function pn(e, n, t, l, a, o) {
  return f(), p(E, null, [
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
    ], 42, cn), [
      [re, e.state.value1]
    ]),
    e.boneState.readonly ? $("", !0) : J((f(), p("sl-input", {
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
      [re, e.state.value2]
    ]),
    i("ul", gn, [
      (f(!0), p(E, null, U(e.state.passwordInfo, (s, u) => (f(), p("li", { key: u }, C(s), 1))), 128)),
      (f(!0), p(E, null, U(e.state.requiredPasswordInfo, (s, u) => (f(), p("li", {
        key: u,
        class: "requiredInfo"
      }, C(s), 1))), 128))
    ])
  ], 64);
}
const Ue = /* @__PURE__ */ I(dn, [["render", pn], ["__scopeId", "data-v-0ccf18c0"]]), hn = D({
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
        var d, c;
        let u = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [b, v] of Object.entries(l.structure)) {
          let g = "default", _ = l.structure[b], m = (d = l.value) == null ? void 0 : d[b];
          (c = v == null ? void 0 : v.params) != null && c.category && (g = v.params.category.toLowerCase()), Object.keys(u).includes(g) ? u[g].bones.push({
            boneName: b,
            boneStructure: _,
            boneValue: m
          }) : u[g] = {
            name: v.params.category,
            bones: [
              {
                boneName: b,
                boneStructure: _,
                boneValue: m
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
    function a(u) {
      n.emit("change", u);
    }
    N(() => {
      rt().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
});
const bn = {
  key: 0,
  open: "",
  variant: "danger"
}, vn = {
  key: 1,
  class: "form"
}, _n = ["summary", "open"];
function yn(e, n, t, l, a, o) {
  const s = ae("bone");
  return e.state.globalRegistration ? (f(), p("div", vn, [
    (f(!0), p(E, null, U(e.state.formGroups, (u, r) => J((f(), p("sl-details", {
      key: r,
      summary: u.name,
      open: u.groupOpen
    }, [
      (f(!0), p(E, null, U(u.bones, (d) => J((f(), T(s, {
        key: d.name,
        is: e.getBoneWidget(e.state.structure[d.boneName].type),
        name: d.boneName,
        structure: e.state.structure,
        skel: e.state.value,
        errors: e.boneState.errors,
        readonly: e.boneState.bonestructure.readonly ? !0 : void 0,
        onChangeInternal: e.changeEvent
      }, null, 8, ["is", "name", "structure", "skel", "errors", "readonly", "onChangeInternal"])), [
        [_e, e.state.structure[d.boneName].visible]
      ])), 128))
    ], 8, _n)), [
      [_e, u.groupVisible]
    ])), 128))
  ])) : (f(), p("sl-alert", bn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Qe = /* @__PURE__ */ I(hn, [["render", yn], ["__scopeId", "data-v-e6fcfbca"]]), $n = D({
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
    const t = B("boneState"), l = w({
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
function Sn(e, n, t, l, a, o) {
  const s = ae("Wrapper_nested");
  return f(), T(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Te = /* @__PURE__ */ I($n, [["render", Sn], ["__scopeId", "data-v-84a761ce"]]), kn = D({
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
    function a(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const wn = ["disabled", "value"];
function En(e, n, t, l, a, o) {
  return f(), p("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, wn);
}
const Pe = /* @__PURE__ */ I(kn, [["render", En], ["__scopeId", "data-v-534b9149"]]), An = D({
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
    }), a = M(null);
    function o(s) {
      n.emit("change", e.name, s.target.value, e.lang, e.index);
    }
    return fe(() => {
      if (e.autofocus && a.value && a.value !== null && a !== null) {
        const { start: s } = me(() => {
          a.value.focus();
        }, 600);
        s();
      }
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      numericBone: a
    };
  }
});
const Cn = ["disabled", "value", "min", "max", "step"], In = { class: "info" }, On = { key: 0 }, Bn = { key: 1 }, jn = { key: 2 };
function Dn(e, n, t, l, a, o) {
  return f(), p(E, null, [
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
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (f(), p("li", On, C(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : $("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (f(), p("li", Bn, C(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : $("", !0),
      e.state.precision ? (f(), p("li", jn, C(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : $("", !0)
    ])
  ], 64);
}
const Me = /* @__PURE__ */ I(An, [["render", Dn], ["__scopeId", "data-v-03d5b399"]]);
class de extends Error {
  constructor(n, t, l, a) {
    super(l || t), arguments.length >= 4 && a && Object.assign(this, a), this.statusText = t, this.statusCode = n, this.response = a;
  }
}
let ve = null;
function X() {
  return ve || (ve = $e("requestStore", () => {
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
class j {
  static resetState() {
    X().$reset(), X().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = ({ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL ? { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: a = null, abortController: o = null, headers: s = null, mode: u = null } = {}) {
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
    let d = ie.post(j.buildUrl(n), r(), null, s, o, u);
    return d.then(function(c) {
      l && l(c.data);
    }).catch(function(c) {
      a && a(c);
    }), d;
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
    abortController: o = null,
    renderer: s = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "json",
    headers: u = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let c = null;
    X().state.sKeys.size === 0 && await j.getBatchSkeys(d);
    const b = [...X().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", b), X().state.sKeys.delete(b)) : (t || (t = {}), t.skey = b, X().state.sKeys.delete(b)), c = j.post(n, {
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
    cacheTime: c = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let b = ie.get(j.buildUrl(n), t, s, r, u, d);
    return b.then(function(v) {
      l && l(v.data);
    }).catch(function(v) {
      a && a(v);
    }), b;
  }
  static list(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: a = null,
    group: o = null,
    abortController: s = null,
    renderer: u = ((d) => (d = ((r) => (r = import.meta) == null ? void 0 : r.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let c = `/${u}/${n}/list`;
    return o && (c += `/${o}`), j.get(c, {
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
    renderer: u = ((d) => (d = ((r) => (r = import.meta) == null ? void 0 : r.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let c = `/${u}/getStructure/${n}`;
    return o && (c += `/${o}`), j.get(c, {
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
    renderer: r = ((c) => (c = ((d) => (d = import.meta) == null ? void 0 : d.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let b = `/${r}/${n}/view/${t}`;
    return s && (b = `/${r}/${n}/view/${s}/${t}`), j.get(b, {
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
    renderer: u = ((d) => (d = ((r) => (r = import.meta) == null ? void 0 : r.env)()) == null ? void 0 : d.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let c = `/${u}/${n}/add`;
    return o && (c = `/${u}/${n}/add/${o}`), j.securePost(c, {
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
    renderer: r = ((c) => (c = ((d) => (d = import.meta) == null ? void 0 : d.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let b = `/${r}/${n}/edit/${t}`;
    return s && (b = `/${r}/${n}/edit/${s}/${t}`), j.securePost(b, {
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
    renderer: r = ((c) => (c = ((d) => (d = import.meta) == null ? void 0 : d.env)()) == null ? void 0 : c.VITE_DEFAULT_RENDERER)() || "json"
  } = {}) {
    let b = `/${r}/${n}/delete/${t}`;
    return s && (b = `/${r}/${n}/delete/${s}/${t}`), j.securePost(b, {
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
            let b = await c.json();
            b.action === "addSuccess" ? a(b.values) : o(b);
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
    Oe(this, "withCredentials", !0);
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
const Vn = D({
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
    const t = B("boneState"), l = B("formatString"), a = w({
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
        a.skellistdata = {};
        for (let g of b.skellist)
          a.skellistdata[g.key] = g;
        return (v = b.skellist) == null ? void 0 : v.map((g) => ({ text: l(t.bonestructure.format, { dest: g }), value: g.key, data: g }));
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
    return N(() => {
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
});
const Rn = (e) => (z("data-v-61dd72e0"), e = e(), q(), e), Nn = { class: "record" }, Ln = { class: "single-entry" }, Un = ["value"], Tn = ["disabled", "source"], Pn = ["title"], Mn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Wn = [
  Mn
];
function zn(e, n, t, l, a, o) {
  var u, r;
  const s = ae("Wrapper_nested");
  return f(), p("div", Nn, [
    i("div", Ln, [
      e.state.selection ? (f(), p("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Un)) : (f(), p("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Tn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (f(), p("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Wn, 8, Pn)) : $("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (f(), T(s, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : $("", !0)
  ]);
}
const We = /* @__PURE__ */ I(Vn, [["render", zn], ["__scopeId", "data-v-61dd72e0"]]), qn = D({
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
    function a(o, s) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const Fn = { class: "box" };
function Hn(e, n, t, l, a, o) {
  return f(), p("div", Fn, C(e.value), 1);
}
const Kn = /* @__PURE__ */ I(qn, [["render", Hn], ["__scopeId", "data-v-343aca69"]]), Gn = D({
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
    const t = B("boneState"), l = M(), a = w({
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
      return new Promise((v, g) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: b }).then(async (_) => {
          let m = await _.json();
          fetch(m.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (h) => {
            const y = {
              key: m.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
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
      a.loading = !0;
      for (let b of c.target.files) {
        let v = await u(b);
        l.value.value = null, n.emit("change", e.name, { dest: v, rel: null }, e.lang, e.index);
      }
      a.loading = !1;
    }
    async function d(c) {
      a.loading = !0, a.droparea = !1;
      for (let b of c.dataTransfer.files) {
        let v = await u(b);
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
});
const ge = (e) => (z("data-v-91086308"), e = e(), q(), e), Zn = {
  key: 0,
  class: "loader"
}, Jn = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-spinner", { slot: "suffix" }, null, -1)), Qn = [
  Jn
], Yn = {
  key: 1,
  class: "droparea"
}, Xn = ["title"], xn = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), es = [
  xn
], ts = ["multiple"], ns = ["title"], ss = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", {
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
}, cs = { key: 2 }, fs = ["title"], ms = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-icon", { name: "x-lg" }, null, -1)), gs = [
  ms
];
function ps(e, n, t, l, a, o) {
  var s, u, r, d, c, b, v, g, _, m;
  return f(), p("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = ce((h) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (h) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = ce((...h) => e.handleDrop && e.handleDrop(...h), ["prevent"]))
  }, [
    e.state.loading ? (f(), p("div", Zn, Qn)) : $("", !0),
    e.state.droparea ? (f(), p("div", Yn, " Dateien hier hinziehen ")) : $("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (f(), p("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (h) => e.uploadinput.click())
    }, es, 8, Xn)) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...h) => e.handleUpload && e.handleUpload(...h))
    }, null, 40, ts),
    e.value ? (f(), p("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...h) => e.downloadFile && e.downloadFile(...h))
    }, as, 8, ns)) : $("", !0),
    i("div", ls, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (f(), p("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (h) => e.state.previewopen = !e.state.previewopen)
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
      ])) : (f(), p("div", us, [
        (b = (c = e.value) == null ? void 0 : c.dest) != null && b.name ? (f(), p("sl-icon", ds)) : $("", !0)
      ])),
      (g = (v = e.value) == null ? void 0 : v.dest) != null && g.name ? (f(), p("div", cs, C(decodeURIComponent((m = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : m.name)), 1)) : $("", !0)
    ]),
    e.boneState.multiple ? $("", !0) : (f(), p("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (h) => e.$emit("change", e.name, "", e.lang, e.index))
    }, gs, 8, fs))
  ], 32);
}
const ze = /* @__PURE__ */ I(Gn, [["render", ps], ["__scopeId", "data-v-91086308"]]), hs = D({
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
      editor: k(() => Be)
    });
    function a(u) {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }
    function o(u) {
      l.value = u.target.value, n.emit("change", e.name, l.value, e.lang, e.index);
    }
    N(() => {
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
      ClassicEditor: Be,
      boneState: t,
      changeEvent: a,
      onReady: s,
      changeEventTextarea: o
    };
  }
});
const bs = ["disabled", "value"];
function vs(e, n, t, l, a, o) {
  var u, r, d, c;
  const s = ae("ckeditor");
  return e.state.editor ? (f(), p(E, { key: 0 }, [
    ((u = e.boneState.bonestructure) == null ? void 0 : u.valid_html) || ((r = e.boneState.bonestructure) == null ? void 0 : r.validHtml) ? (f(), T(s, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (b) => e.state.value = b),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (f(), p("sl-textarea", {
      key: 1,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...b) => e.changeEventTextarea && e.changeEventTextarea(...b))
    }, null, 40, bs))
  ], 64)) : $("", !0);
}
const qe = /* @__PURE__ */ I(hs, [["render", vs]]), _s = D({
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
    return N(() => {
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
const ys = ["name", "min", "max", "disabled"], $s = ["name", "min", "max", "disabled"];
function Ss(e, n, t, l, a, o) {
  return f(), p(E, null, [
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
    }, null, 40, ys), [
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
    }, null, 40, $s), [
      [re, e.state.valueLng]
    ])
  ], 64);
}
const Fe = /* @__PURE__ */ I(_s, [["render", Ss], ["__scopeId", "data-v-7bc31020"]]), ks = D({
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
    }), a = B("addMultipleEntry"), o = B("removeMultipleEntries");
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
    return N(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: l,
      boneState: t,
      handleAdd: s,
      handleRemove: u,
      removeMultipleEntries: o
    };
  }
});
const Ye = (e) => (z("data-v-63e75dee"), e = e(), q(), e), ws = { class: "actionbar" }, Es = ["title"], As = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Cs = [
  As
], Is = ["title"], Os = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Bs(e, n, t, l, a, o) {
  return f(), p("div", ws, [
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Cs, 8, Es)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Os,
      O(" " + C(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (f(), p(E, { key: 0 }, [
        O("(" + C(e.state.counter) + ")", 1)
      ], 64)) : $("", !0)
    ], 8, Is)) : $("", !0)
  ]);
}
const js = /* @__PURE__ */ I(ks, [["render", Bs], ["__scopeId", "data-v-63e75dee"]]), Ds = D({
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
    const t = B("boneState"), l = B("addMultipleEntry"), a = B("formatString"), o = null, s = w({
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
        return s.skels = b.skellist.reduce((g, _) => (g[_.key] = _, g), {}), (v = b.skellist) == null ? void 0 : v.map((g) => ({ text: a(t.bonestructure.format, { dest: g }), value: g.key, data: g }));
      });
    }
    return N(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: s,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: o,
      getList: u
    };
  }
});
const Xe = (e) => (z("data-v-eeea51c6"), e = e(), q(), e), Vs = { class: "actionbar" }, Rs = ["title"], Ns = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ls = [
  Ns
], Us = ["source"], Ts = ["title"], Ps = /* @__PURE__ */ Xe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ms(e, n, t, l, a, o) {
  return f(), p("div", Vs, [
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Ls, 8, Rs)) : $("", !0),
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
    }, null, 40, Us),
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ps,
      O(" " + C(e.$t("bone.list")), 1)
    ], 8, Ts)) : $("", !0)
  ]);
}
const Ws = /* @__PURE__ */ I(Ds, [["render", Ms], ["__scopeId", "data-v-eeea51c6"]]), zs = D({
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
    const a = null, o = M(), s = w({
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
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: b }).then(async (_) => {
          let m = await _.json();
          fetch(m.values.uploadUrl, {
            body: c,
            method: "POST",
            mode: "no-cors"
          }).then(async (h) => {
            const y = {
              key: m.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
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
        s.hasUsing && (g = void 0), l(e.lang, { dest: v, rel: g });
      }
      s.loading = !1;
    }
    async function d(c) {
      s.loading = !0, s.droparea = !1;
      for (let b of c.dataTransfer.files) {
        let v = await u(b);
        o.value.value = null;
        let g = null;
        s.hasUsing && (g = void 0), l(e.lang, { dest: v, rel: g });
      }
      s.loading = !1;
    }
    return N(() => {
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
});
const Se = (e) => (z("data-v-9bac9f8a"), e = e(), q(), e), qs = ["title"], Fs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Hs = [
  Fs
], Ks = {
  key: 1,
  class: "droparea"
}, Gs = ["multiple"], Zs = ["title"], Js = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Qs = [
  Js
], Ys = ["title"], Xs = /* @__PURE__ */ Se(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), xs = {
  key: 0,
  slot: "suffix"
};
function ea(e, n, t, l, a, o) {
  return f(), p("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = ce((s) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (s) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = ce((...s) => e.handleDrop && e.handleDrop(...s), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.openSelector())
    }, Hs, 8, qs)) : $("", !0),
    e.state.droparea ? (f(), p("div", Ks, " Dateien hier hinziehen ")) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Gs),
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Qs, 8, Zs)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (f(), p("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Xs,
      O(" " + C(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (f(), p("sl-spinner", xs)) : $("", !0)
    ], 8, Ys)) : $("", !0)
  ], 32);
}
const ta = /* @__PURE__ */ I(zs, [["render", ea], ["__scopeId", "data-v-9bac9f8a"]]), ke = $e("boneStore", () => {
  const e = w({
    additionalBones: K({}),
    defaultBones: K({
      rawBone: ye,
      keyBone: je,
      stringBone: De,
      emailBone: Ve,
      dateBone: Re,
      booleanBone: Le,
      selectBone: Ne,
      passwordBone: Ue,
      recordBone: Te,
      numericBone: Me,
      colorBone: Pe,
      relationalBone: We,
      jsonBone: Kn,
      fileBone: ze,
      textBone: qe,
      spatialBone: Fe
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
    return s === "date" ? Re : s === "key" ? je : s === "str.email" ? Ve : s === "str" || s.startsWith("str.") ? De : s === "select" || s.startsWith("select.") ? Ne : s === "bool" ? Le : s === "password" ? Ue : s === "record" ? Te : s === "numeric" || s.startsWith("numeric.") ? Me : s === "relational.tree.leaf.file.file" ? ze : s === "relational" || s.startsWith("relational.") ? We : s === "color" ? Pe : s === "text" ? qe : s === "spatial" ? Fe : ye;
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
    return js;
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
function na(e) {
  return ke().getBoneActionbar(e);
}
function x(e) {
  return ke().getBoneWidget(e);
}
function sa(e) {
  const n = ke();
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
    BoneLabel: Nt
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
        function m(h) {
          for (const [y, S] of Object.entries(h))
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
        for (let h of e.errors)
          h.fieldPath[0] === e.name && (h.severity > 2 || t.required && (h.severity === 2 || h.severity === 0)) && m.push(h.errorMessage);
        return m;
      })
    });
    ue("boneState", t);
    function l(m, h, y) {
      s(h, m, "isDragging"), s(h, m, "dragStartIndex");
    }
    function a(m, h, y) {
      y.preventDefault();
      const S = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      S < A.offsetHeight / 2 ? (s(h, m, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = m) : (s(h, m, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = m + 1);
      let L = h ? t.bonevalue[h] : t.bonevalue;
      t.dropIndex.index > L.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(m, h, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (h ? (S = t.bonevalue[h].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[h].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: h,
        index: m
      })), u("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function s(m, h, y) {
      t[y].lang = m || null, t[y].index = h;
    }
    function u(...m) {
      m.forEach((h) => {
        t[h] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(m, h, y = null, S = null, A) {
      if (h === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = h : t.bonevalue[y] = h) : S !== null ? t.bonevalue[S] = h : A === !1 || (t.bonevalue = h), t.readonly))
        return !1;
      let L = {
        name: m,
        value: d(),
        lang: y,
        index: S
      }, R = {
        name: m,
        value: h,
        lang: y,
        index: S
      };
      A != null && (L.pwMatch = A, R.pwMatch = A), n.emit("change", L), n.emit("change-internal", R);
    }
    function d() {
      function m(y, S = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [S + ".lat"]: y[0] }), A.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((L) => L === Object(L)).length > 0)
            for (const [L, R] of y.entries())
              R.rel !== null ? A.push(m(R, S + "." + L)) : A.push(m(R, S));
          else
            for (const [L, R] of y.entries())
              A.push(m(R, S));
        else if (y === Object(y))
          for (const [L, R] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && L === "key" ? (/\.[0-9]*\.dest$/.test(S) ? A.push(m(R, S.replace(/\.[0-9]*\.dest/, ""))) : A.push(m(R, S.replace(/\.dest/, ""))), A.push(m(R, S.replace(/\.dest/, "") + "." + L))) : S.endsWith(".rel") && A.push(m(R, S.replace(/\.rel/, "") + "." + L)) : A.push(m(R, S + "." + L)) : A.push(m(R, L));
        else
          y == null && (y = ""), S !== null && A.push({ [S]: y });
        return A;
      }
      let h = m(t.bonevalue, e.name);
      return h = h.flat(10), h;
    }
    function c(m = null, h = "") {
      m ? Object.keys(t.bonevalue).includes(m) ? t.bonevalue[m].push(h) : t.bonevalue[m] = [h] : t.bonevalue ? t.bonevalue.push(h) : t.bonevalue = [h];
    }
    ue("addMultipleEntry", c);
    function b(m, h = null) {
      var y;
      h ? (y = t.bonevalue) == null || y[h].splice(m, 1) : t.bonevalue.splice(m, 1), n.emit("change", {
        name: e.name,
        value: d(),
        lang: h,
        index: m
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: h,
        index: m
      });
    }
    function v(m = null) {
      var h;
      m ? (h = t.bonevalue) == null || h[m].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: d(),
        lang: m
      }), n.emit("change-internal", {
        name: e.name,
        value: d(),
        lang: m
      });
    }
    ue("removeMultipleEntries", v);
    function g(m = null, h = "") {
      c(m, h);
    }
    function _(m, h) {
      function y(R) {
        let Z = [], F = [], ne = /\$\((.*?)\)/g;
        for (; F; ) {
          if (F = ne.exec(R), !F) {
            F = !1;
            continue;
          }
          Z.push(F[1]);
        }
        return Z;
      }
      function S(R, Z) {
        let F = R.split("."), ne = R.split("."), P = Z;
        for (let Y of F)
          if (ne.shift(), P && P !== "-" && Object.keys(P).includes(Y) && P[Y])
            if (Array.isArray(P[Y])) {
              let Ie = [];
              for (let tt of P[Y])
                Ie.push(S(ne.join("."), tt));
              P = Ie.join(", ");
            } else
              P = P[Y];
          else
            (!P || typeof P[Y] == "object" && !P[Y]) && (P = "-");
        return P;
      }
      let A = y(m), L = [];
      Array.isArray(h) || (h = [h]);
      for (let R of h) {
        let Z = m;
        for (let F of A) {
          let ne = S(F, R);
          Z = Z.replace("$(" + F + ")", ne);
        }
        L.push(Z);
      }
      return L.join(", ");
    }
    return ue("formatString", _), Q(() => {
      var m;
      e.value ? t.bonevalue = e.value : t.bonevalue = (m = e.skel) == null ? void 0 : m[e.name];
    }), se(
      () => e.skel,
      (m, h) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), se(
      () => {
        var m;
        return (m = e.errors) == null ? void 0 : m[e.name];
      },
      (m, h) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: c,
      removeMultipleEntry: b,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: sa,
      multipleBonePressEnter: g,
      handleDragStart: l,
      handleDragOver: a,
      handleDrop: o,
      setStateProperties: s,
      resetStateProperties: u
    };
  }
});
const we = {
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
}, Ke = we.setup;
we.setup = Ke ? (e, n) => (He(), Ke(e, n)) : He;
const aa = (e) => (z("data-v-46c45785"), e = e(), q(), e), la = {
  key: 0,
  class: "loading"
}, oa = /* @__PURE__ */ aa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ra = { class: "logo" }, ia = ["src"];
function ua(e, n, t, l, a, o) {
  return f(), T(ut, null, {
    default: dt(() => [
      t.active ? (f(), p("div", la, [
        oa,
        i("div", ra, [
          i("sl-icon", { src: t.logo }, null, 8, ia)
        ])
      ])) : $("", !0)
    ]),
    _: 1
  });
}
const da = /* @__PURE__ */ I(we, [["render", ua], ["__scopeId", "data-v-46c45785"]]), ee = $e("cartstore", () => {
  const e = new gt({
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
  async function l(g) {
    return await e.cart_list({ cart_key: g });
  }
  async function a() {
    (await e.cart_list()).forEach((_) => {
      _.is_root_node && (_.cart_type === "basket" ? n.basketRootNode = _ : n.whishlistRootNodes.push(_));
    });
  }
  async function o(g, _) {
    let m = await e.article_add({
      article_key: g,
      parent_cart_key: _
    });
    console.log("addToCart", m);
  }
  async function s(g, _) {
    let m = await e.article_view({
      article_key: g,
      parent_cart_key: _
    });
    console.log("getArticleView", m);
  }
  async function u(g, _) {
    let m = await e.article_remove({
      article_key: g,
      parent_cart_key: _
    });
    console.log("remove Resp", m);
  }
  async function r(g, _, m) {
    let h = await e.article_update({
      article_key: g,
      parent_cart_key: _,
      quantity: m,
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
    return await e.shippingData({ cart_key: n.basketRootNode.key });
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
    addDiscount: b,
    getAddress: c,
    getShippingData: v
  };
}), ca = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (f(), p("pre", null, C(e.node.name), 1));
  }
};
const pe = (e) => (z("data-v-d313b580"), e = e(), q(), e), fa = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, ma = ["src"], ga = { class: "viur-shop-cart-leaf-headline headline" }, pa = { class: "viur-shop-cart-leaf-artno" }, ha = ["innerHTML"], ba = { class: "viur-shop-cart-leaf-quantity" }, va = { class: "viur-shop-cart-leaf-unitprice" }, _a = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "St\xFCckpreis", -1)), ya = ["value"], $a = { class: "viur-shop-cart-leaf-actions" }, Sa = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("sl-button", {
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
], -1)), ka = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), wa = [
  ka
], Ea = { class: "viur-shop-cart-leaf-price" }, Aa = /* @__PURE__ */ pe(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Ca = ["value"], Ia = {
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
      return r !== void 0 ? pt.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function s(r, d, c, b) {
      l("updateItem", {
        item: r,
        articleKey: d,
        node: c,
        quantity: b
      });
    }
    function u(r, d, c) {
      l("removeItem", { item: r, articleKey: d, node: c });
    }
    return Q(() => {
      a.leaf = t.leaf;
    }), (r, d) => (f(), p("sl-card", fa, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, ma),
      i("h4", ga, C(a.leaf.shop_name), 1),
      i("h5", pa, C(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, ha),
      i("div", ba, [
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
          onClick: d[2] || (d[2] = (c) => u(a.leaf, a.leaf.article.dest.key, e.node))
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
}, Oa = /* @__PURE__ */ I(Ia, [["__scopeId", "data-v-d313b580"]]), Ba = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), ja = { key: 0 }, Da = { key: 0 }, Va = { key: 1 }, Ra = {
  __name: "Discount",
  setup(e) {
    const n = ee(), t = M(null), l = M(null), a = w({
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
    return (s, u) => (f(), p(E, null, [
      i("div", null, [
        i("sl-input", {
          label: "Rabatt Code",
          ref_key: "codeInput",
          ref: t
        }, null, 512),
        i("sl-button", { onClick: o }, "Einl\xF6sen"),
        i("sl-alert", {
          ref_key: "errorMessageContainer",
          ref: l
        }, [
          Ba,
          O(" " + C(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        V(n).state.basketRootNode.discount ? (f(), p("div", ja, [
          V(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (f(), p("span", Da, " Sie haben einen Rabattcode im Wert von " + C(V(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : $("", !0),
          V(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (f(), p("span", Va, " Sie haben einen Rabattcode im Wert von " + C(V(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : $("", !0)
        ])) : $("", !0)
      ])
    ], 64));
  }
};
function oe(e, n = "EUR", t = "de-DE") {
  return new Intl.NumberFormat(t, { style: "currency", currency: n }).format(e);
}
const Na = { key: 0 }, La = {
  __name: "Shipping",
  setup(e, { expose: n }) {
    const t = ee(), l = w({
      shippingData: [],
      cheapestShipping: {},
      isShipping: !1
    });
    async function a() {
      l.shippingData = await t.getShippingData(), l.shippingData.sort((o, s) => o.dest.shipping_cost < o.dest.shipping_cost ? -1 : o.dest.shipping_cost > o.dest.shipping_cost ? 1 : 0), l.cheapestShipping = l.shippingData[l.shippingData.length - 1], l.isShipping = !0;
    }
    return n({ getShipping: a }), Q(async () => {
      await t.init(), await a();
    }), (o, s) => l.isShipping ? (f(), p("div", Na, " Versandkosten: " + C(V(oe)(l.cheapestShipping.dest.shipping_cost)), 1)) : $("", !0);
  }
};
const H = (e) => (z("data-v-aadf5f25"), e = e(), q(), e), Ua = { key: 0 }, Ta = /* @__PURE__ */ H(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Pa = {
  class: "footer-wrap",
  slot: "footer"
}, Ma = { class: "viur-shop-cart-node" }, Wa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), za = /* @__PURE__ */ H(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), qa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("br", null, null, -1)), Fa = { class: "viur-shop-cart-sidebar-info-line" }, Ha = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Ka = { class: "viur-shop-cart-sidebar-info-line" }, Ga = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Za = { class: "viur-shop-cart-sidebar-info-line" }, Ja = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Versandkosten", -1)), Qa = { class: "viur-shop-cart-sidebar-info-line total" }, Ya = /* @__PURE__ */ H(() => /* @__PURE__ */ i("span", null, "Gesamt:", -1)), Xa = /* @__PURE__ */ H(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-btn-wrap" }, [
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
    const n = e, t = ee(), l = M(null), a = M(null), o = w({
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
      ), await b(), l.value.hide();
    }
    async function r(g) {
      console.log("updateItem :", g), g.quantity === 0 ? (l.value.show(), o.currentItem = g.item, o.currentNode = g.node) : (await t.updateItem(g.articleKey, g.node.key, g.quantity), await t.init()), console.log("shipping", a), a.value.getShipping();
    }
    function d(g) {
      console.log("removeItem :", g), l.value.show(), o.currentItem = g.item, o.currentNode = g.node;
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
      console.log("getChildren children: ", _), _.forEach(async (m) => {
        m.skel_type === "node" ? (o.nodes.push(m), await v(m.key)) : (Object.keys(o.leaves).includes(g) || (o.leaves[g] = []), o.leaves[g].push(m));
      });
    }
    return Q(async () => {
      await t.init(), await v(), n.mode === "basket" && o.nodes.push(t.state.basketRootNode), console.log("state.nodes test", o.nodes), console.log("state.leaves", o.leaves);
    }), (g, _) => s.value ? (f(), p(E, { key: 1 }, [
      i("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: c
      }, [
        Ta,
        i("div", Pa, [
          i("sl-button", {
            variant: "danger",
            onClick: _[0] || (_[0] = (m) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: u,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (f(!0), p(E, null, U(o.nodes, (m) => (f(), p("div", Ma, [
        Object.keys(o.leaves).includes(m.key) ? (f(), p(E, { key: 0 }, [
          be(ca, { node: m }, null, 8, ["node"]),
          (f(!0), p(E, null, U(o.leaves[m.key], (h) => (f(), T(Oa, {
            key: h.key,
            leaf: h,
            node: m,
            onRemoveItem: d,
            onUpdateItem: r
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : $("", !0)
      ]))), 256)),
      Wa,
      e.sidebar ? (f(), T(Ze, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (f(), p(E, { key: 0 }, [
          za,
          qa,
          i("div", Fa, [
            Ha,
            O(" " + C(V(oe)(
              e.mode === "basket" ? V(t).state.basketRootNode.total : V(t).state.whishlistRootNodes[s.value].total
            )), 1)
          ]),
          i("div", Ka, [
            Ga,
            O(" " + C(V(oe)(V(t).state.basketRootNode.total - V(t).state.basketRootNode.total_discount_price)), 1)
          ]),
          i("div", Za, [
            Ja,
            O(" " + C(V(oe)(0)), 1)
          ]),
          i("div", Qa, [
            Ya,
            O(" " + C(V(oe)(0)), 1)
          ]),
          Xa
        ], 64)) : $("", !0)
      ])) : $("", !0),
      be(Ra),
      be(La, {
        ref_key: "shipping",
        ref: a
      }, null, 512),
      xa
    ], 64)) : (f(), p("sl-spinner", Ua));
  }
}, Ee = /* @__PURE__ */ I(el, [["__scopeId", "data-v-aadf5f25"]]), tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
const le = (e) => (z("data-v-4082d346"), e = e(), q(), e), nl = {
  key: 1,
  class: "list"
}, sl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), al = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), ll = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-payment" }, [
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
], -1)), ol = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), rl = /* @__PURE__ */ le(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), il = /* @__PURE__ */ le(() => /* @__PURE__ */ i("br", null, null, -1)), ul = { class: "viur-shop-cart-sidebar-btn-wrap" }, dl = ["variant", "disabled"], cl = {
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
    }), (a, o) => t.cartIsInit ? (f(), p("div", nl, [
      sl,
      al,
      ll,
      ol,
      (f(), T(Ze, { to: "#order_sidebar" }, [
        rl,
        il,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", ul, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, dl)
        ])
      ]))
    ])) : (f(), T(da, { key: 0 }));
  }
}, Ae = /* @__PURE__ */ I(cl, [["__scopeId", "data-v-4082d346"]]), fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
}, Symbol.toStringTag, { value: "Module" }));
const ml = (e) => (z("data-v-50f31583"), e = e(), q(), e), gl = { class: "bind viur-shop-wrap" }, pl = ["panel", "disabled"], hl = { class: "viur-shop-order-step" }, bl = ["name", "library"], vl = { class: "viur-shop-order-status-text" }, _l = { class: "viur-shop-order-status-span" }, yl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, $l = ["name"], Sl = ["onClick"], kl = ["onClick"], wl = /* @__PURE__ */ ml(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
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
    const t = e, l = n, a = w({
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
      l("tabChange", c);
    }
    function r(c) {
      o.value.show(c);
    }
    function d(c) {
      o.value.show(c);
    }
    return (c, b) => (f(), p("div", gl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: o
      }, [
        (f(!0), p(E, null, U(a.tabNames, (v, g) => {
          var _;
          return f(), p("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", hl, [
              (_ = e.tabs[v].icon) != null && _.name ? (f(), p("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, bl)) : $("", !0),
              i("div", vl, [
                O(C(g + 1) + ". ", 1),
                i("span", _l, C(e.tabs[v].displayName), 1)
              ])
            ]),
            g < a.tabNames.length - 1 ? (f(), p("sl-icon", yl)) : $("", !0)
          ], 8, pl);
        }), 128)),
        (f(!0), p(E, null, U(a.tabNames, (v, g) => (f(), p("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (f(), T(ct(e.tabs[v].component), ft({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          g !== a.tabNames.length - 1 ? (f(), p("div", {
            key: 0,
            class: G(["viur-shop-form-footer", { "flex-end": a.isFirstTab(g) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (_) => r(a.tabNames[g - 1])
            }, " Zur\xFCck ", 8, Sl), [
              [_e, g !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => d(a.tabNames[g + 1])
            }, " Weiter ", 8, kl)
          ], 2)) : $("", !0)
        ], 8, $l))), 128))
      ], 544),
      wl
    ]));
  }
}, xe = /* @__PURE__ */ I(El, [["__scopeId", "data-v-50f31583"]]);
const he = (e) => (z("data-v-688e20e0"), e = e(), q(), e), Al = { class: "bind" }, Cl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), Il = /* @__PURE__ */ he(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ O(" 123345670 ")
], -1)), Ol = { class: "paragraph" }, Bl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("br", null, null, -1)), jl = { class: "btn-wrap" }, Dl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Vl = {
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
    return (t, l) => (f(), p("div", Al, [
      Cl,
      Il,
      i("p", Ol, [
        O(" Wir haben Ihre Bestellung erhalten und werden diese schenllstm\xF6glich bearbeiten."),
        Bl,
        O(" Sie erhalten in wenigen Minuten eine Best\xE4tigung per E-Mail. "),
        i("div", jl, [
          Dl,
          i("sl-button", {
            variant: "primary",
            onClick: l[0] || (l[0] = (a) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Rl = /* @__PURE__ */ I(Vl, [["__scopeId", "data-v-688e20e0"]]);
const Ce = (e) => (z("data-v-4d14c6fe"), e = e(), q(), e), Nl = /* @__PURE__ */ Ce(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Ll = { class: "viur-shop-form-wrap" }, Ul = /* @__PURE__ */ Ce(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Tl = { class: "viur-shop-form-wrap" }, Pl = { key: 0 }, Ml = /* @__PURE__ */ Ce(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Wl = { class: "viur-shop-form-wrap" }, zl = {
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
      return f(), p(E, null, [
        i("div", null, [
          Nl,
          i("div", Ll, [
            (f(!0), p(E, null, U(t.addSkel, (d, c) => (f(), p(E, { key: c }, [
              d.visible && d.params.group === "Customer Info" ? (f(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Info" ? (f(), T(r, {
                  key: 0,
                  is: V(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (b) => a(c, b),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Ul,
          i("div", Tl, [
            (f(!0), p(E, null, U(t.addSkel, (d, c) => (f(), p(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (f(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (f(), T(r, {
                  key: 0,
                  is: V(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (b) => a(c, b)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (f(), p("div", Pl, [
          Ml,
          i("div", Wl, [
            (f(!0), p(E, null, U(t.addSkel, (d, c) => (f(), p(E, { key: c }, [
              d.visible && d.params.group === "Customer Address" ? (f(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + c)
              }, [
                d.visible && d.params.group === "Customer Address" ? (f(), T(r, {
                  key: 0,
                  is: V(x)(d.type),
                  name: c,
                  structure: o(t.addSkel),
                  errors: t.errors[c] ? t.errors[c] : [],
                  skel: t.formValues,
                  onChange: (b) => a(c, b)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ])) : $("", !0),
        i("sl-checkbox", {
          onSlChange: l,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ql = /* @__PURE__ */ I(zl, [["__scopeId", "data-v-4d14c6fe"]]);
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
    }), l = M(null), a = M(null);
    function o(v) {
      v.target.checked && (t.isCustomAdress = !1), v.target.checked || (t.isCustomAdress = !0);
    }
    function s() {
      if (t.shippingAdressAmount === t.maxShippingAdress) {
        t.amountAlert.title = "Zu viele Lieferadressen", t.amountAlert.msg = `Sie k\xF6nnen nur maximal: "${t.maxShippingAdress}" Lieferadressen verwenden.`, a.value.show();
        return;
      }
      t.shippingAdressAmount += 1;
    }
    function u(v, g) {
      for (const [_, m] of Object.entries(g.value[0]))
        t.formValues[_] = m;
    }
    function r() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
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
        let m = _[0], h = _[1];
        g[m] = h;
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
      return f(), p(E, null, [
        i("div", null, [
          Fl,
          i("div", Hl, [
            (f(!0), p(E, null, U(t.addSkel, (m, h) => (f(), p(E, { key: h }, [
              m.visible && m.params.group === "Customer Info" ? (f(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + h)
              }, [
                m.visible && m.params.group === "Customer Info" ? (f(), T(_, {
                  key: 0,
                  is: V(x)(m.type),
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
        (f(!0), p(E, null, U(t.shippingAdressAmount, (m) => (f(), p("div", {
          class: "viur-shop-form-wrap",
          key: m
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (h) => d(h, m),
            onSlClear: (h) => c(h, m),
            label: t.selectedItem[m] ? V(n).state.carts[t.selectedItem[m]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (f(!0), p(E, null, U(V(n).state.carts, (h, y) => (f(), p("sl-option", { value: y }, C(h.info.name), 9, Zl))), 256))
          ], 40, Gl),
          (f(!0), p(E, null, U(t.addSkel, (h, y) => (f(), p(E, { key: y }, [
            h.visible && h.params.group === "Customer Address" ? (f(), p("div", {
              key: 0,
              class: G("viur-shop-form-bone-" + y)
            }, [
              h.visible && h.params.group === "Customer Address" ? (f(), T(_, {
                key: 0,
                is: V(x)(h.type),
                name: y,
                structure: b(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
            ], 2)) : $("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (f(), p("div", Jl, [
          Ql,
          i("div", Yl, [
            (f(!0), p(E, null, U(t.addSkel, (m, h) => (f(), p(E, { key: h }, [
              m.visible && m.params.group === "Customer Address" ? (f(), p("div", {
                key: 0,
                class: G("viur-shop-form-bone-" + h)
              }, [
                m.visible && m.params.group === "Customer Address" ? (f(), T(_, {
                  key: 0,
                  is: V(x)(m.type),
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
          to,
          i("strong", null, C(t.amountAlert.title), 1),
          no,
          O(" " + C(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: o,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, ao = /* @__PURE__ */ I(so, [["__scopeId", "data-v-c4232b7a"]]), et = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), l = w({
      rootNode: {},
      tabs: {
        cart: {
          component: K(Ee),
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
          component: K(Ae),
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
    function a(o) {
      (o == null ? void 0 : o.detail.name) === "confirm" && (l.tabs.orderComplete.disabled = !1);
    }
    return Q(async () => {
      await n.init(), await n.getAddressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, s) => (f(), T(xe, {
      tabs: l.tabs,
      onTabChange: a
    }, null, 8, ["tabs"]));
  }
}, lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), oo = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = ht();
    return { state: w({}), route: t };
  }
}), ro = { class: "home" };
function io(e, n, t, l, a, o) {
  return f(), p("div", ro, "View " + C(e.route.path) + " is missing.", 1);
}
const uo = /* @__PURE__ */ I(oo, [["render", io]]), co = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: uo
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView.77b9f88d.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.5e496eae.mjs")
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
    component: () => Promise.resolve().then(() => fl)
  }
];
function yo(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(co), bt({
    history: vt("/"),
    routes: t
  });
}
const fo = mt(), $o = {
  install(e) {
    e.component("CartView", Ee), e.component("ExampleUsage", et), e.component("ConfirmView", Ae), e.component("OrderView", xe), e.use(fo);
  }
};
export {
  Ee as C,
  Rl as O,
  ql as U,
  $o as V,
  I as _,
  et as a,
  Ae as b,
  yo as c,
  xe as d,
  ee as u
};
