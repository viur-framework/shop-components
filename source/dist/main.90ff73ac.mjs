var nt = Object.defineProperty;
var st = (e, n, t) => n in e ? nt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ce = (e, n, t) => (st(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, inject as B, reactive as w, openBlock as m, createElementBlock as f, normalizeClass as H, createElementVNode as i, renderSlot as He, pushScopeId as T, popScopeId as M, Fragment as E, createCommentVNode as $, toDisplayString as A, onMounted as N, ref as z, readonly as at, getCurrentScope as lt, onScopeDispose as ot, unref as R, computed as k, watchEffect as ce, renderList as L, watch as ae, withDirectives as J, vModelText as oe, getCurrentInstance as rt, resolveComponent as le, createBlock as U, vShow as be, withModifiers as de, createTextVNode as O, shallowRef as K, provide as ie, onBeforeMount as Q, useCssVars as it, Transition as ut, withCtx as dt, createVNode as Ie, Teleport as Ge, resolveDynamicComponent as ct, mergeProps as mt } from "vue";
import { defineStore as _e, createPinia as ft } from "pinia";
import Oe from "@viur/ckeditor5-build-classic";
import { Request as gt } from "@viur/vue-utils";
import { ViURShopClient as ht } from "@viur/viur-shop-client";
import { useRoute as pt, createRouter as bt, createWebHashHistory as vt } from "vue-router";
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
const C = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, a] of n)
    t[l] = a;
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
function It(e, n, t, l, a, r) {
  return m(), f("div", {
    class: H(["value-line", {
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
      He(e.$slots, "default", {}, void 0, !0)
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
const Ot = /* @__PURE__ */ C(_t, [["render", It], ["__scopeId", "data-v-141aaf9b"]]), Bt = D({
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
function Rt(e, n, t, l, a, r) {
  return m(), f(E, null, [
    i("label", jt, [
      He(e.$slots, "default", {}, void 0, !0),
      $("", !0)
    ]),
    e.state.debug ? (m(), f("div", Dt, [
      i("div", Vt, A(e.name), 1),
      i("pre", null, "    " + A(e.boneState) + `
    `, 1)
    ])) : $("", !0)
  ], 64);
}
const Nt = /* @__PURE__ */ C(Bt, [["render", Rt], ["__scopeId", "data-v-b7149172"]]), Pt = D({
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const Lt = ["disabled", "value"], Ut = ["disabled", "value"];
function Tt(e, n, t, l, a, r) {
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
const ve = /* @__PURE__ */ C(Pt, [["render", Tt], ["__scopeId", "data-v-0ebe5f0b"]]), Mt = D({
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
function qt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Wt);
}
const Be = /* @__PURE__ */ C(Mt, [["render", qt], ["__scopeId", "data-v-b45a1311"]]);
function zt(e) {
  return lt() ? (ot(e), !0) : !1;
}
function Ft(e) {
  return typeof e == "function" ? e() : R(e);
}
const Kt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function me(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, a = z(!1);
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
    }, Ft(n));
  }
  return l && (a.value = !0, Kt && o()), zt(u), {
    isPending: at(a),
    start: o,
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
    }), a = z(null);
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
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      Utils: Ht,
      boneState: t,
      changeEvent: r,
      stringBone: a
    };
  }
});
const Zt = ["disabled", "value", "required"];
function Jt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s)),
    onKeyup: n[1] || (n[1] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Zt);
}
const je = /* @__PURE__ */ C(Gt, [["render", Jt], ["__scopeId", "data-v-1ccbacc0"]]), Qt = D({
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
    const t = B("boneState"), l = w({}), a = z(null);
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
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: r,
      emailBone: a
    };
  }
});
const Yt = ["disabled", "value"];
function Xt(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, Yt);
}
const De = /* @__PURE__ */ C(Qt, [["render", Xt], ["__scopeId", "data-v-4328e024"]]), xt = D({
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
function tn(e, n, t, l, a, r) {
  return m(), f("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, en);
}
const Ve = /* @__PURE__ */ C(xt, [["render", tn], ["__scopeId", "data-v-f1b8af8c"]]), nn = D({
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
    return N(() => {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: r,
      convertObjToList: a
    };
  }
});
const sn = ["disabled", "value", "multiple"], an = ["value"];
function ln(e, n, t, l, a, r) {
  return m(), f("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, [
    (m(!0), f(E, null, L(e.convertObjToList(), (s) => (m(), f("sl-option", {
      key: s[0],
      value: s[0]
    }, A(s[1]), 9, an))), 128))
  ], 40, sn);
}
const Re = /* @__PURE__ */ C(nn, [["render", ln], ["__scopeId", "data-v-5a38b97f"]]), on = D({
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
    return N(() => {
      let r = e.value;
      r || (r = !1), n.emit("change", e.name, r, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
const rn = ["disabled", "checked"];
function un(e, n, t, l, a, r) {
  return m(), f("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, rn);
}
const Ne = /* @__PURE__ */ C(on, [["render", un], ["__scopeId", "data-v-363598c8"]]), dn = D({
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
    }), a = z(null);
    function r(u) {
      l.value1 === l.value2 ? l.equal = !0 : l.equal = !1, s(l.value1), l.requiredPasswordInfo.length === 0 && l.passwordInfo.length - l.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, l.value1, e.lang, e.index, !0) : n.emit("change", e.name, l.value1, e.lang, e.index, !1);
    }
    N(() => {
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
    }), ae(
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
const cn = ["disabled"], mn = ["name"], fn = ["name"], gn = { class: "errors" };
function hn(e, n, t, l, a, r) {
  return m(), f(E, null, [
    J(i("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": n[0] || (n[0] = (s) => e.state.value1 = s),
      disabled: e.boneState.readonly,
      class: H({ "has-check": !e.boneState.readonly }),
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
    e.boneState.readonly ? $("", !0) : J((m(), f("sl-input", {
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
      (m(!0), f(E, null, L(e.state.passwordInfo, (s, u) => (m(), f("li", { key: u }, A(s), 1))), 128)),
      (m(!0), f(E, null, L(e.state.requiredPasswordInfo, (s, u) => (m(), f("li", {
        key: u,
        class: "requiredInfo"
      }, A(s), 1))), 128))
    ])
  ], 64);
}
const Pe = /* @__PURE__ */ C(dn, [["render", hn], ["__scopeId", "data-v-0ccf18c0"]]), pn = D({
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
          let p = "default", _ = l.structure[g], h = (c = l.value) == null ? void 0 : c[g];
          (d = v == null ? void 0 : v.params) != null && d.category && (p = v.params.category.toLowerCase()), Object.keys(u).includes(p) ? u[p].bones.push({
            boneName: g,
            boneStructure: _,
            boneValue: h
          }) : u[p] = {
            name: v.params.category,
            bones: [
              {
                boneName: g,
                boneStructure: _,
                boneValue: h
              }
            ]
          }, _.visible === !0 && (u[p].groupVisible = !0);
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
    N(() => {
      rt().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
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
const bn = {
  key: 0,
  open: "",
  variant: "danger"
}, vn = {
  key: 1,
  class: "form"
}, _n = ["summary", "open"];
function yn(e, n, t, l, a, r) {
  const s = le("bone");
  return e.state.globalRegistration ? (m(), f("div", vn, [
    (m(!0), f(E, null, L(e.state.formGroups, (u, o) => J((m(), f("sl-details", {
      key: o,
      summary: u.name,
      open: u.groupOpen
    }, [
      (m(!0), f(E, null, L(u.bones, (c) => J((m(), U(s, {
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
    ], 8, _n)), [
      [be, u.groupVisible]
    ])), 128))
  ])) : (m(), f("sl-alert", bn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Je = /* @__PURE__ */ C(pn, [["render", yn], ["__scopeId", "data-v-e6fcfbca"]]), $n = D({
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
    return N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: a
    };
  }
});
function Sn(e, n, t, l, a, r) {
  const s = le("Wrapper_nested");
  return m(), U(s, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Le = /* @__PURE__ */ C($n, [["render", Sn], ["__scopeId", "data-v-84a761ce"]]), kn = D({
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
function En(e, n, t, l, a, r) {
  return m(), f("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...s) => e.changeEvent && e.changeEvent(...s))
  }, null, 40, wn);
}
const Ue = /* @__PURE__ */ C(kn, [["render", En], ["__scopeId", "data-v-534b9149"]]), An = D({
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
    }), a = z(null);
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
    }), N(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: r,
      numericBone: a
    };
  }
});
const Cn = ["disabled", "value", "min", "max", "step"], In = { class: "info" }, On = { key: 0 }, Bn = { key: 1 }, jn = { key: 2 };
function Dn(e, n, t, l, a, r) {
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
    }, null, 40, Cn),
    i("ul", In, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), f("li", On, A(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : $("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), f("li", Bn, A(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : $("", !0),
      e.state.precision ? (m(), f("li", jn, A(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : $("", !0)
    ])
  ], 64);
}
const Te = /* @__PURE__ */ C(An, [["render", Dn], ["__scopeId", "data-v-03d5b399"]]);
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
        for (const [v, p] of Object.entries(c))
          if (Array.isArray(p))
            for (const _ of p)
              g.append(v, _);
          else
            g.append(v, p);
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
        for (let p of g.skellist)
          a.skellistdata[p.key] = p;
        return (v = g.skellist) == null ? void 0 : v.map((p) => ({ text: l(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
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
    return N(() => {
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
const Rn = (e) => (T("data-v-61dd72e0"), e = e(), M(), e), Nn = { class: "record" }, Pn = { class: "single-entry" }, Ln = ["value"], Un = ["disabled", "source"], Tn = ["title"], Mn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Wn = [
  Mn
];
function qn(e, n, t, l, a, r) {
  var u, o;
  const s = le("Wrapper_nested");
  return m(), f("div", Nn, [
    i("div", Pn, [
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
      }, Wn, 8, Tn)) : $("", !0)
    ]),
    (u = e.boneState) != null && u.bonestructure.using ? (m(), U(s, {
      key: 0,
      value: (o = e.value) == null ? void 0 : o.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : $("", !0)
  ]);
}
const Me = /* @__PURE__ */ C(Vn, [["render", qn], ["__scopeId", "data-v-61dd72e0"]]), zn = D({
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
function Kn(e, n, t, l, a, r) {
  return m(), f("div", Fn, A(e.value), 1);
}
const Hn = /* @__PURE__ */ C(zn, [["render", Kn], ["__scopeId", "data-v-343aca69"]]), Gn = D({
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
    const t = B("boneState"), l = z(), a = w({
      loading: !1,
      droparea: !1,
      previewopen: !1
    });
    N(() => {
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
      return new Promise((v, p) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: g }).then(async (_) => {
          let h = await _.json();
          fetch(h.values.uploadUrl, {
            body: d,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let I = await S.json();
              I.action === "addSuccess" ? v(I.values) : p(I);
            }).catch((S) => {
              p(S);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch((_) => {
          p(_);
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
function hs(e, n, t, l, a, r) {
  var s, u, o, c, d, g, v, p, _, h;
  return m(), f("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = de((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = de((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (m(), f("div", Zn, Qn)) : $("", !0),
    e.state.droparea ? (m(), f("div", Yn, " Dateien hier hinziehen ")) : $("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), f("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, es, 8, Xn)) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, ts),
    e.value ? (m(), f("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, as, 8, ns)) : $("", !0),
    i("div", ls, [
      (u = (s = e.value) == null ? void 0 : s.dest) != null && u.mimetype.includes("image") ? (m(), f("div", {
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
          label: decodeURIComponent((c = (o = e.value) == null ? void 0 : o.dest) == null ? void 0 : c.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          i("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, is)
        ], 8, rs)
      ])) : (m(), f("div", us, [
        (g = (d = e.value) == null ? void 0 : d.dest) != null && g.name ? (m(), f("sl-icon", ds)) : $("", !0)
      ])),
      (p = (v = e.value) == null ? void 0 : v.dest) != null && p.name ? (m(), f("div", cs, A(decodeURIComponent((h = (_ = e.value) == null ? void 0 : _.dest) == null ? void 0 : h.name)), 1)) : $("", !0)
    ]),
    e.boneState.multiple ? $("", !0) : (m(), f("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, gs, 8, ms))
  ], 32);
}
const We = /* @__PURE__ */ C(Gn, [["render", hs], ["__scopeId", "data-v-91086308"]]), ps = D({
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
    N(() => {
      e.value !== null && (l.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function s(u) {
      u.editing.view.change((o) => {
        o.setStyle("min-height", "250px", u.editing.view.document.getRoot());
      });
    }
    return ae(
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
const bs = ["disabled", "value"];
function vs(e, n, t, l, a, r) {
  var u, o, c, d;
  const s = le("ckeditor");
  return e.state.editor ? (m(), f(E, { key: 0 }, [
    ((u = e.boneState.bonestructure) == null ? void 0 : u.valid_html) || ((o = e.boneState.bonestructure) == null ? void 0 : o.validHtml) ? (m(), U(s, {
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
    }, null, 40, bs))
  ], 64)) : $("", !0);
}
const qe = /* @__PURE__ */ C(ps, [["render", vs]]), _s = D({
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
function Ss(e, n, t, l, a, r) {
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
    }, null, 40, ys), [
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
    }, null, 40, $s), [
      [oe, e.state.valueLng]
    ])
  ], 64);
}
const ze = /* @__PURE__ */ C(_s, [["render", Ss], ["__scopeId", "data-v-7bc31020"]]), ks = D({
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
    return N(() => {
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
const Qe = (e) => (T("data-v-63e75dee"), e = e(), M(), e), ws = { class: "actionbar" }, Es = ["title"], As = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Cs = [
  As
], Is = ["title"], Os = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Bs(e, n, t, l, a, r) {
  return m(), f("div", ws, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (s) => e.handleRemove(e.lang))
    }, Cs, 8, Es)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (s) => e.handleAdd(e.lang))
    }, [
      Os,
      O(" " + A(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), f(E, { key: 0 }, [
        O("(" + A(e.state.counter) + ")", 1)
      ], 64)) : $("", !0)
    ], 8, Is)) : $("", !0)
  ]);
}
const js = /* @__PURE__ */ C(ks, [["render", Bs], ["__scopeId", "data-v-63e75dee"]]), Ds = D({
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
        return s.skels = g.skellist.reduce((p, _) => (p[_.key] = _, p), {}), (v = g.skellist) == null ? void 0 : v.map((p) => ({ text: a(t.bonestructure.format, { dest: p }), value: p.key, data: p }));
      });
    }
    return N(() => {
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
const Ye = (e) => (T("data-v-eeea51c6"), e = e(), M(), e), Vs = { class: "actionbar" }, Rs = ["title"], Ns = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ps = [
  Ns
], Ls = ["source"], Us = ["title"], Ts = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Ms(e, n, t, l, a, r) {
  return m(), f("div", Vs, [
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
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
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, [
      Ts,
      O(" " + A(e.$t("bone.list")), 1)
    ], 8, Us)) : $("", !0)
  ]);
}
const Ws = /* @__PURE__ */ C(Ds, [["render", Ms], ["__scopeId", "data-v-eeea51c6"]]), qs = D({
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
    const a = null, r = z(), s = w({
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
      return new Promise((v, p) => {
        j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: g }).then(async (_) => {
          let h = await _.json();
          fetch(h.values.uploadUrl, {
            body: d,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: h.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            j.securePost(`/${{ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async (S) => {
              let I = await S.json();
              I.action === "addSuccess" ? v(I.values) : p(I);
            }).catch((S) => {
              p(S);
            });
          }).catch((b) => {
            p(b);
          });
        }).catch((_) => {
          p(_);
        });
      });
    }
    async function o(d) {
      s.loading = !0;
      for (let g of d.target.files) {
        let v = await u(g);
        r.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), l(e.lang, { dest: v, rel: p });
      }
      s.loading = !1;
    }
    async function c(d) {
      s.loading = !0, s.droparea = !1;
      for (let g of d.dataTransfer.files) {
        let v = await u(g);
        r.value.value = null;
        let p = null;
        s.hasUsing && (p = void 0), l(e.lang, { dest: v, rel: p });
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
      uploadinput: r,
      handleUpload: o,
      handleDrop: c
    };
  }
});
const ye = (e) => (T("data-v-9bac9f8a"), e = e(), M(), e), zs = ["title"], Fs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ks = [
  Fs
], Hs = {
  key: 1,
  class: "droparea"
}, Gs = ["multiple"], Zs = ["title"], Js = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Qs = [
  Js
], Ys = ["title"], Xs = /* @__PURE__ */ ye(() => /* @__PURE__ */ i("sl-icon", { name: "upload" }, null, -1)), xs = {
  key: 0,
  slot: "suffix"
};
function ea(e, n, t, l, a, r) {
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
    }, Ks, 8, zs)) : $("", !0),
    e.state.droparea ? (m(), f("div", Hs, " Dateien hier hinziehen ")) : $("", !0),
    i("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...s) => e.handleUpload && e.handleUpload(...s))
    }, null, 40, Gs),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (s) => e.addMultipleEntry(e.lang))
    }, Qs, 8, Zs)) : $("", !0),
    e.boneState.multiple && !e.readonly ? (m(), f("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (s) => e.uploadinput.click())
    }, [
      Xs,
      O(" " + A(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), f("sl-spinner", xs)) : $("", !0)
    ], 8, Ys)) : $("", !0)
  ], 32);
}
const ta = /* @__PURE__ */ C(qs, [["render", ea], ["__scopeId", "data-v-9bac9f8a"]]), $e = _e("boneStore", () => {
  const e = w({
    additionalBones: K({}),
    defaultBones: K({
      rawBone: ve,
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
      jsonBone: Hn,
      fileBone: We,
      textBone: qe,
      spatialBone: ze
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
    return s === "date" ? Ve : s === "key" ? Be : s === "str.email" ? De : s === "str" || s.startsWith("str.") ? je : s === "select" || s.startsWith("select.") ? Re : s === "bool" ? Ne : s === "password" ? Pe : s === "record" ? Le : s === "numeric" || s.startsWith("numeric.") ? Te : s === "relational.tree.leaf.file.file" ? We : s === "relational" || s.startsWith("relational.") ? Me : s === "color" ? Ue : s === "text" ? qe : s === "spatial" ? ze : ve;
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
    return js;
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
function na(e) {
  return $e().getBoneActionbar(e);
}
function x(e) {
  return $e().getBoneWidget(e);
}
function sa(e) {
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
    wrapperMultiple: Ot,
    BoneLabel: Nt
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
        return na((h = t.bonestructure) == null ? void 0 : h.type);
      }),
      isEmpty: k(() => {
        function h(b) {
          for (const [y, S] of Object.entries(b))
            if (S !== null) {
              if (Array.isArray(S) && S.length > 0)
                return !1;
              if (!Array.isArray(S))
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
      const S = y.clientY - y.target.getBoundingClientRect().top, I = y.target.closest(".value-line");
      S < I.offsetHeight / 2 ? (s(b, h, "draggingLineTop"), u("draggingLineBottom"), t.dropIndex.index = h) : (s(b, h, "draggingLineBottom"), u("draggingLineTop"), t.dropIndex.index = h + 1);
      let P = b ? t.bonevalue[b] : t.bonevalue;
      t.dropIndex.index > P.length - 1 && (t.dropIndex.index -= 1);
    }
    function r(h, b, y) {
      let S = null;
      t.dragStartIndex.index !== t.dropIndex.index && (b ? (S = t.bonevalue[b].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[b].splice(t.dropIndex.index, 0, S)) : (S = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, S)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: c(),
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
    function o(h, b, y = null, S = null, I) {
      if (b === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && S !== null ? t.bonevalue[y][S] = b : t.bonevalue[y] = b) : S !== null ? t.bonevalue[S] = b : I === !1 || (t.bonevalue = b), t.readonly))
        return !1;
      let P = {
        name: h,
        value: c(),
        lang: y,
        index: S
      }, V = {
        name: h,
        value: b,
        lang: y,
        index: S
      };
      I != null && (P.pwMatch = I, V.pwMatch = I), n.emit("change", P), n.emit("change-internal", V);
    }
    function c() {
      function h(y, S = null) {
        let I = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            I.push({ [S + ".lat"]: y[0] }), I.push({ [S + ".lng"]: y[1] });
          else if (Object.values(y).filter((P) => P === Object(P)).length > 0)
            for (const [P, V] of y.entries())
              V.rel !== null ? I.push(h(V, S + "." + P)) : I.push(h(V, S));
          else
            for (const [P, V] of y.entries())
              I.push(h(V, S));
        else if (y === Object(y))
          for (const [P, V] of Object.entries(y))
            S ? S.endsWith(".dest") || S.endsWith(".rel") ? S.endsWith(".dest") && P === "key" ? (/\.[0-9]*\.dest$/.test(S) ? I.push(h(V, S.replace(/\.[0-9]*\.dest/, ""))) : I.push(h(V, S.replace(/\.dest/, ""))), I.push(h(V, S.replace(/\.dest/, "") + "." + P))) : S.endsWith(".rel") && I.push(h(V, S.replace(/\.rel/, "") + "." + P)) : I.push(h(V, S + "." + P)) : I.push(h(V, P));
        else
          y == null && (y = ""), S !== null && I.push({ [S]: y });
        return I;
      }
      let b = h(t.bonevalue, e.name);
      return b = b.flat(10), b;
    }
    function d(h = null, b = "") {
      h ? Object.keys(t.bonevalue).includes(h) ? t.bonevalue[h].push(b) : t.bonevalue[h] = [b] : t.bonevalue ? t.bonevalue.push(b) : t.bonevalue = [b];
    }
    ie("addMultipleEntry", d);
    function g(h, b = null) {
      var y;
      b ? (y = t.bonevalue) == null || y[b].splice(h, 1) : t.bonevalue.splice(h, 1), n.emit("change", {
        name: e.name,
        value: c(),
        lang: b,
        index: h
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: b,
        index: h
      });
    }
    function v(h = null) {
      var b;
      h ? (b = t.bonevalue) == null || b[h].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: c(),
        lang: h
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: h
      });
    }
    ie("removeMultipleEntries", v);
    function p(h = null, b = "") {
      d(h, b);
    }
    function _(h, b) {
      function y(V) {
        let Z = [], F = [], se = /\$\((.*?)\)/g;
        for (; F; ) {
          if (F = se.exec(V), !F) {
            F = !1;
            continue;
          }
          Z.push(F[1]);
        }
        return Z;
      }
      function S(V, Z) {
        let F = V.split("."), se = V.split("."), q = Z;
        for (let Y of F)
          if (se.shift(), q && q !== "-" && Object.keys(q).includes(Y) && q[Y])
            if (Array.isArray(q[Y])) {
              let Ae = [];
              for (let tt of q[Y])
                Ae.push(S(se.join("."), tt));
              q = Ae.join(", ");
            } else
              q = q[Y];
          else
            (!q || typeof q[Y] == "object" && !q[Y]) && (q = "-");
        return q;
      }
      let I = y(h), P = [];
      Array.isArray(b) || (b = [b]);
      for (let V of b) {
        let Z = h;
        for (let F of I) {
          let se = S(F, V);
          Z = Z.replace("$(" + F + ")", se);
        }
        P.push(Z);
      }
      return P.join(", ");
    }
    return ie("formatString", _), Q(() => {
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
      updateValue: o,
      addMultipleEntry: d,
      removeMultipleEntry: g,
      removeMultipleEntries: v,
      BoneHasMultipleHandling: sa,
      multipleBonePressEnter: p,
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
  it((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, Ke = Se.setup;
Se.setup = Ke ? (e, n) => (Fe(), Ke(e, n)) : Fe;
const aa = (e) => (T("data-v-46c45785"), e = e(), M(), e), la = {
  key: 0,
  class: "loading"
}, oa = /* @__PURE__ */ aa(() => /* @__PURE__ */ i("sl-spinner", { class: "loader" }, null, -1)), ra = { class: "logo" }, ia = ["src"];
function ua(e, n, t, l, a, r) {
  return m(), U(ut, null, {
    default: dt(() => [
      t.active ? (m(), f("div", la, [
        oa,
        i("div", ra, [
          i("sl-icon", { src: t.logo }, null, 8, ia)
        ])
      ])) : $("", !0)
    ]),
    _: 1
  });
}
const da = /* @__PURE__ */ C(Se, [["render", ua], ["__scopeId", "data-v-46c45785"]]), ee = _e("cartstore", () => {
  const e = new ht({
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
    await a();
  }
  async function l(p) {
    return await e.cart_list({ cart_key: p });
  }
  async function a() {
    (await e.cart_list()).forEach((_) => {
      _.is_root_node && (_.cart_type === "basket" ? n.basketRootNode = _ : n.whishlistRootNodes.push(_));
    });
  }
  async function r(p, _) {
    let h = await e.article_add({
      article_key: p,
      parent_cart_key: _
    });
    console.log("addToCart", h);
  }
  async function s(p, _) {
    let h = await e.article_view({
      article_key: p,
      parent_cart_key: _
    });
    console.log("getArticleView", h);
  }
  async function u(p, _) {
    let h = await e.article_remove({
      article_key: p,
      parent_cart_key: _
    });
    console.log("remove Resp", h);
  }
  async function o(p, _, h) {
    let b = await e.article_update({
      article_key: p,
      parent_cart_key: _,
      quantity: h,
      quantity_mode: "replace"
    });
    console.log("update Resp", b);
  }
  async function c() {
    const p = await e.address_structure();
    n.structure.address = p.addSkel;
  }
  async function d() {
    const p = await e.address_list();
    for (const _ of p)
      _.address_type === "billing" && (n.billingAddress = _), _.address_type === "shipping" && (n.shippingAddress = _);
  }
  async function g(p) {
    await e.discount_add({ code: p });
  }
  async function v() {
    const p = await e.payment_providers_list();
    n.paymentProviders = p, n.selectedPaymentProvider = p[Object.keys(p)[0]];
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
}), ca = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), f("pre", null, A(e.node.name), 1));
  }
};
const ge = (e) => (T("data-v-d313b580"), e = e(), M(), e), ma = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, fa = ["src"], ga = { class: "viur-shop-cart-leaf-headline headline" }, ha = { class: "viur-shop-cart-leaf-artno" }, pa = ["innerHTML"], ba = { class: "viur-shop-cart-leaf-quantity" }, va = { class: "viur-shop-cart-leaf-unitprice" }, _a = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-leaf-label" }, "St\xFCckpreis", -1)), ya = ["value"], $a = { class: "viur-shop-cart-leaf-actions" }, Sa = /* @__PURE__ */ ge(() => /* @__PURE__ */ i("sl-button", {
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
    const t = e, l = n, a = w({
      leaf: {}
    });
    function r(o) {
      return o !== void 0 ? gt.downloadUrlFor(o) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
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
    }), (o, c) => (m(), f("sl-card", ma, [
      i("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: r(a.leaf.shop_image ? a.leaf.shop_image : void 0)
      }, null, 8, fa),
      i("h4", ga, A(a.leaf.shop_name), 1),
      i("h5", ha, A(a.leaf.shop_art_no_or_gtin), 1),
      i("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: a.leaf.shop_description
      }, null, 8, pa),
      i("div", ba, [
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
          onClick: c[2] || (c[2] = (d) => u(a.leaf, a.leaf.article.dest.key, e.node))
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
}, Oa = /* @__PURE__ */ C(Ia, [["__scopeId", "data-v-d313b580"]]), Ba = /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "info-circle"
}, null, -1), ja = { key: 0 }, Da = { key: 0 }, Va = { key: 1 }, Ra = {
  __name: "Discount",
  setup(e) {
    const n = ee(), t = z(null), l = z(null), a = w({
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
          Ba,
          O(" " + A(a.errorMessage), 1)
        ], 512)
      ]),
      i("div", null, [
        R(n).state.basketRootNode.discount ? (m(), f("div", ja, [
          R(n).state.basketRootNode.discount.dest.discount_type === "absolute" ? (m(), f("span", Da, " Sie haben einen Rabattcode im Wert von " + A(R(n).state.basketRootNode.discount.dest.absolute) + " \u20AC eingegeben ", 1)) : $("", !0),
          R(n).state.basketRootNode.discount.dest.discount_type === "percentage" ? (m(), f("span", Va, " Sie haben einen Rabattcode im Wert von " + A(R(n).state.basketRootNode.discount.dest.percentage) + " % eingegeben ", 1)) : $("", !0)
        ])) : $("", !0)
      ])
    ], 64));
  }
};
const G = (e) => (T("data-v-b5419f82"), e = e(), M(), e), Na = { key: 0 }, Pa = /* @__PURE__ */ G(() => /* @__PURE__ */ i("p", null, "M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), La = {
  class: "footer-wrap",
  slot: "footer"
}, Ua = { class: "viur-shop-cart-node" }, Ta = /* @__PURE__ */ G(() => /* @__PURE__ */ i("div", { id: "order_sidebar" }, null, -1)), Ma = /* @__PURE__ */ G(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, " Zusammenfassung ", -1)), Wa = /* @__PURE__ */ G(() => /* @__PURE__ */ i("br", null, null, -1)), qa = { class: "viur-shop-cart-sidebar-info-line" }, za = /* @__PURE__ */ G(() => /* @__PURE__ */ i("span", null, "Zwischensumme", -1)), Fa = { class: "viur-shop-cart-sidebar-info-line" }, Ka = /* @__PURE__ */ G(() => /* @__PURE__ */ i("span", null, "Rabatt", -1)), Ha = /* @__PURE__ */ G(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-sidebar-info-line" }, [
  /* @__PURE__ */ i("span", null, "Versandkosten"),
  /* @__PURE__ */ O(" 0 \u20AC ")
], -1)), Ga = { class: "viur-shop-cart-sidebar-info-line total" }, Za = /* @__PURE__ */ G(() => /* @__PURE__ */ i("span", null, "Gesamt:", -1)), Ja = {
  key: 0,
  class: "viur-shop-cart-sidebar-btn-wrap"
}, Qa = /* @__PURE__ */ G(() => /* @__PURE__ */ i("sl-button", {
  variant: "primary",
  size: "medium"
}, " Jetzt Bestellen ", -1)), Ya = [
  Qa
], Xa = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 },
    inOrderView: { type: Boolean, default: !1 }
  },
  setup(e) {
    const n = e, t = ee(), l = z(null), a = w({
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
      console.log("getChildren children: ", v), v.forEach(async (p) => {
        p.skel_type === "node" ? (a.nodes.push(p), await d(p.key)) : (Object.keys(a.leaves).includes(g) || (a.leaves[g] = []), a.leaves[g].push(p));
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
        Pa,
        i("div", La, [
          i("sl-button", {
            variant: "danger",
            onClick: v[0] || (v[0] = (p) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          i("sl-button", {
            variant: "success",
            onClick: r,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), f(E, null, L(a.nodes, (p) => (m(), f("div", Ua, [
        Object.keys(a.leaves).includes(p.key) ? (m(), f(E, { key: 0 }, [
          Ie(ca, { node: p }, null, 8, ["node"]),
          (m(!0), f(E, null, L(a.leaves[p.key], (_) => (m(), U(Oa, {
            key: _.key,
            leaf: _,
            node: p,
            onRemoveItem: u,
            onUpdateItem: s
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : $("", !0)
      ]))), 256)),
      Ta,
      e.sidebar ? (m(), U(Ge, {
        key: 0,
        to: "#order_sidebar"
      }, [
        e.sidebar ? (m(), f(E, { key: 0 }, [
          Ma,
          Wa,
          i("div", qa, [
            za,
            O(" " + A(e.mode === "basket" ? R(t).state.basketRootNode.total : R(t).state.whishlistRootNodes[e.cartKey].total) + " \u20AC ", 1)
          ]),
          i("div", Fa, [
            Ka,
            O(" " + A(R(t).state.basketRootNode.total - R(t).state.basketRootNode.total_discount_price) + " \u20AC ", 1)
          ]),
          Ha,
          i("div", Ga, [
            Za,
            O(" " + A(R(t).state.basketRootNode.total) + " \u20AC ", 1)
          ]),
          n.inOrderView ? $("", !0) : (m(), f("div", Ja, Ya))
        ], 64)) : $("", !0)
      ])) : $("", !0),
      Ie(Ra)
    ], 64)) : (m(), f("sl-spinner", Na));
  }
}, ke = /* @__PURE__ */ C(Xa, [["__scopeId", "data-v-b5419f82"]]), xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" }));
const te = (e) => (T("data-v-b3e35258"), e = e(), M(), e), el = {
  key: 1,
  class: "list"
}, tl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung pr\xFCfen", -1)), nl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("div", { class: "viur-shop-cart-address-wrap" }, [
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
], -1)), sl = { class: "viur-shop-cart-payment" }, al = { class: "viur-shop-cart-payment-method" }, ll = /* @__PURE__ */ te(() => /* @__PURE__ */ i("span", null, "Zahlungsmethode:", -1)), ol = /* @__PURE__ */ te(() => /* @__PURE__ */ i("sl-button", {
  outline: "",
  size: "small"
}, [
  /* @__PURE__ */ i("sl-icon", {
    name: "pencil",
    slot: "prefix"
  })
], -1)), rl = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), il = /* @__PURE__ */ te(() => /* @__PURE__ */ i("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), ul = /* @__PURE__ */ te(() => /* @__PURE__ */ i("br", null, null, -1)), dl = { class: "viur-shop-cart-sidebar-btn-wrap" }, cl = ["variant", "disabled"], ml = {
  __name: "ConfirmView",
  setup(e) {
    const n = ee(), t = w({
      cartIsInit: k(() => !0),
      itemsIsInit: k(() => {
        var a;
        return !!((a = n.state) != null && a.carts[n.state.basket].items);
      }),
      selectedPaymentProvider: k(() => {
        var a;
        return (a = n.state) == null ? void 0 : a.selectedPaymentProvider.title;
      }),
      images: {},
      showOrderButton: !1
    });
    console.log("se", t.selectedPaymentProvider);
    function l(a) {
      a.target.checked && (t.showOrderButton = !0), a.target.checked || (t.showOrderButton = !1);
    }
    return Q(async () => {
      await n.init();
    }), (a, r) => t.cartIsInit ? (m(), f("div", el, [
      tl,
      nl,
      i("div", sl, [
        i("div", al, [
          ll,
          O(" " + A(t.selectedPaymentProvider), 1)
        ]),
        ol
      ]),
      rl,
      (m(), U(Ge, { to: "#order_sidebar" }, [
        il,
        ul,
        i("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        i("div", dl, [
          i("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, cl)
        ])
      ]))
    ])) : (m(), U(da, { key: 0 }));
  }
}, we = /* @__PURE__ */ C(ml, [["__scopeId", "data-v-b3e35258"]]), fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" }));
const gl = (e) => (T("data-v-50f31583"), e = e(), M(), e), hl = { class: "bind viur-shop-wrap" }, pl = ["panel", "disabled"], bl = { class: "viur-shop-order-step" }, vl = ["name", "library"], _l = { class: "viur-shop-order-status-text" }, yl = { class: "viur-shop-order-status-span" }, $l = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, Sl = ["name"], kl = ["onClick"], wl = ["onClick"], El = /* @__PURE__ */ gl(() => /* @__PURE__ */ i("div", { class: "viur-shop-sidebar-wrap" }, [
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
    const t = e, l = n, a = w({
      tabNames: k(() => s(t.tabs)),
      isFirstTab: (d) => d === 0
    }), r = z(null);
    function s(d) {
      let g = [], v = [];
      for (const p in d)
        d[p].position ? g.push([p, d[p].position]) : g.push([p, 0]);
      return g.sort((p, _) => p[1] - _[1]), g.forEach((p) => {
        v.push(p[0]);
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
    return (d, g) => (m(), f("div", hl, [
      i("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: u,
        ref_key: "tabGroup",
        ref: r
      }, [
        (m(!0), f(E, null, L(a.tabNames, (v, p) => {
          var _;
          return m(), f("sl-tab", {
            class: "viur-shop-order-tab",
            slot: "nav",
            panel: v,
            key: v,
            disabled: e.tabs[v].disabled
          }, [
            i("div", bl, [
              (_ = e.tabs[v].icon) != null && _.name ? (m(), f("sl-icon", {
                key: 0,
                class: "viur-shop-order-step-icon",
                name: e.tabs[v].icon.name,
                library: e.tabs[v].icon.library
              }, null, 8, vl)) : $("", !0),
              i("div", _l, [
                O(A(p + 1) + ". ", 1),
                i("span", yl, A(e.tabs[v].displayName), 1)
              ])
            ]),
            p < a.tabNames.length - 1 ? (m(), f("sl-icon", $l)) : $("", !0)
          ], 8, pl);
        }), 128)),
        (m(!0), f(E, null, L(a.tabNames, (v, p) => (m(), f("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: v,
          key: v
        }, [
          (m(), U(ct(e.tabs[v].component), mt({ ref_for: !0 }, e.tabs[v].props ? e.tabs[v].props : ""), null, 16)),
          p !== a.tabNames.length - 1 ? (m(), f("div", {
            key: 0,
            class: H(["viur-shop-form-footer", { "flex-end": a.isFirstTab(p) }])
          }, [
            J(i("sl-button", {
              type: "submit",
              onClick: (_) => o(a.tabNames[p - 1])
            }, " Zur\xFCck ", 8, kl), [
              [be, p !== 0]
            ]),
            i("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (_) => c(a.tabNames[p + 1])
            }, " Weiter ", 8, wl)
          ], 2)) : $("", !0)
        ], 8, Sl))), 128))
      ], 544),
      El
    ]));
  }
}, Xe = /* @__PURE__ */ C(Al, [["__scopeId", "data-v-50f31583"]]);
const he = (e) => (T("data-v-688e20e0"), e = e(), M(), e), Cl = { class: "bind" }, Il = /* @__PURE__ */ he(() => /* @__PURE__ */ i("h1", { class: "viur-shop-success-headline headline" }, "Vielen Dank f\xFCr Ihre Bestellung", -1)), Ol = /* @__PURE__ */ he(() => /* @__PURE__ */ i("p", { class: "paragraph" }, [
  /* @__PURE__ */ i("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ O(" 123345670 ")
], -1)), Bl = { class: "paragraph" }, jl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("br", null, null, -1)), Dl = { class: "btn-wrap" }, Vl = /* @__PURE__ */ he(() => /* @__PURE__ */ i("sl-button", { size: "medium" }, " Zur Startseite ", -1)), Rl = {
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
    return (t, l) => (m(), f("div", Cl, [
      Il,
      Ol,
      i("p", Bl, [
        O(" Wir haben Ihre Bestellung erhalten und werden diese schenllstm\xF6glich bearbeiten."),
        jl,
        O(" Sie erhalten in wenigen Minuten eine Best\xE4tigung per E-Mail. "),
        i("div", Dl, [
          Vl,
          i("sl-button", {
            variant: "primary",
            onClick: l[0] || (l[0] = (a) => void 0),
            size: "medium"
          }, " Weiter Einkaufen ")
        ])
      ])
    ]));
  }
}, Nl = /* @__PURE__ */ C(Rl, [["__scopeId", "data-v-688e20e0"]]);
const Ee = (e) => (T("data-v-4d14c6fe"), e = e(), M(), e), Pl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Ll = { class: "viur-shop-form-wrap" }, Ul = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Tl = { class: "viur-shop-form-wrap" }, Ml = { key: 0 }, Wl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), ql = { class: "viur-shop-form-wrap" }, zl = {
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
    return ae(t.formValues, (s) => {
      Object.entries(s).forEach(([u, o]) => {
        o === "" && delete t.formValues[u];
      });
    }), Q(async () => {
      await n.getAddressStructure(), await n.getAddress(), t.addSkel = r(n.state.structure.address), t.formValues = n.state.shippingAddress;
    }), (s, u) => {
      const o = le("bone");
      return m(), f(E, null, [
        i("div", null, [
          Pl,
          i("div", Ll, [
            (m(!0), f(E, null, L(t.addSkel, (c, d) => (m(), f(E, { key: d }, [
              c.visible && c.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: H("viur-shop-form-bone-" + d)
              }, [
                c.visible && c.params.group === "Customer Info" ? (m(), U(o, {
                  key: 0,
                  is: R(x)(c.type),
                  name: d,
                  structure: r(t.addSkel),
                  errors: t.errors[d] ? t.errors[d] : [],
                  skel: t.formValues,
                  onChange: (g) => a(d, g),
                  class: "viur-shop-form-grid-w-2"
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        i("div", null, [
          Ul,
          i("div", Tl, [
            (m(!0), f(E, null, L(t.addSkel, (c, d) => (m(), f(E, { key: d }, [
              c.visible && c.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: H("viur-shop-form-bone-" + d)
              }, [
                c.visible && c.params.group === "Customer Address" ? (m(), U(o, {
                  key: 0,
                  is: R(x)(c.type),
                  name: d,
                  structure: r(t.addSkel),
                  errors: t.errors[d] ? t.errors[d] : [],
                  skel: t.formValues,
                  onChange: (g) => a(d, g)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        t.isCustomAdress ? (m(), f("div", Ml, [
          Wl,
          i("div", ql, [
            (m(!0), f(E, null, L(t.addSkel, (c, d) => (m(), f(E, { key: d }, [
              c.visible && c.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: H("viur-shop-form-bone-" + d)
              }, [
                c.visible && c.params.group === "Customer Address" ? (m(), U(o, {
                  key: 0,
                  is: R(x)(c.type),
                  name: d,
                  structure: r(t.addSkel),
                  errors: t.errors[d] ? t.errors[d] : [],
                  skel: t.formValues,
                  onChange: (g) => a(d, g)
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
}, Fl = /* @__PURE__ */ C(zl, [["__scopeId", "data-v-4d14c6fe"]]);
const ne = (e) => (T("data-v-c4232b7a"), e = e(), M(), e), Kl = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Hl = { class: "viur-shop-form-wrap" }, Gl = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Zl = ["onSlChange", "onSlClear", "label"], Jl = ["value"], Ql = { key: 0 }, Yl = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Xl = { class: "viur-shop-form-wrap" }, xl = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), eo = [
  xl
], to = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), no = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), so = /* @__PURE__ */ ne(() => /* @__PURE__ */ i("br", null, null, -1)), ao = {
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
    }), l = z(null), a = z(null);
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
    function u(v, p) {
      for (const [_, h] of Object.entries(p.value[0]))
        t.formValues[_] = h;
    }
    function o() {
      if (t.shippingAdressAmount === 1) {
        t.amountAlert.title = "Zu wenig Lieferadressen", t.amountAlert.msg = "Mindestens eine Lieferadresse muss angegeben werden.", a.value.show();
        return;
      }
      t.shippingAdressAmount -= 1;
    }
    function c(v, p) {
      if (console.log(v.target.value), !v.target.value.length) {
        d();
        return;
      }
      t.selectedItem[p] = v.target.value, t.isItemSelected = !0;
    }
    function d(v, p) {
      console.log("clearing..."), delete t.selectedItem[p], t.isItemSelected = !1;
    }
    function g(v) {
      let p = {};
      return Array.isArray(v) ? (v.forEach((_) => {
        let h = _[0], b = _[1];
        p[h] = b;
      }), p) : v;
    }
    return ae(t.formValues, (v) => {
      Object.entries(v).forEach(([p, _]) => {
        _ === "" && delete t.formValues[p];
      });
    }), Q(async () => {
      await n.getAddressStructure(), t.addSkel = g(n.state.structure.address);
    }), (v, p) => {
      const _ = le("bone");
      return m(), f(E, null, [
        i("div", null, [
          Kl,
          i("div", Hl, [
            (m(!0), f(E, null, L(t.addSkel, (h, b) => (m(), f(E, { key: b }, [
              h.visible && h.params.group === "Customer Info" ? (m(), f("div", {
                key: 0,
                class: H("viur-shop-form-bone-" + b)
              }, [
                h.visible && h.params.group === "Customer Info" ? (m(), U(_, {
                  key: 0,
                  is: R(x)(h.type),
                  name: b,
                  structure: g(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        Gl,
        (m(!0), f(E, null, L(t.shippingAdressAmount, (h) => (m(), f("div", {
          class: "viur-shop-form-wrap",
          key: h
        }, [
          i("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (b) => c(b, h),
            onSlClear: (b) => d(b, h),
            label: t.selectedItem[h] ? R(n).state.carts[t.selectedItem[h]].info.name : "Warenkorb f\xFCr Adresse w\xE4hlen.",
            class: "viur-shop-form-cart-select"
          }, [
            (m(!0), f(E, null, L(R(n).state.carts, (b, y) => (m(), f("sl-option", { value: y }, A(b.info.name), 9, Jl))), 256))
          ], 40, Zl),
          (m(!0), f(E, null, L(t.addSkel, (b, y) => (m(), f(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (m(), f("div", {
              key: 0,
              class: H("viur-shop-form-bone-" + y)
            }, [
              b.visible && b.params.group === "Customer Address" ? (m(), U(_, {
                key: 0,
                is: R(x)(b.type),
                name: y,
                structure: g(t.addSkel),
                errors: t.errors[y] ? t.errors[y] : [],
                skel: t.formValues,
                onChange: (S) => u(y, S)
              }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
            ], 2)) : $("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), f("div", Ql, [
          Yl,
          i("div", Xl, [
            (m(!0), f(E, null, L(t.addSkel, (h, b) => (m(), f(E, { key: b }, [
              h.visible && h.params.group === "Customer Address" ? (m(), f("div", {
                key: 0,
                class: H("viur-shop-form-bone-" + b)
              }, [
                h.visible && h.params.group === "Customer Address" ? (m(), U(_, {
                  key: 0,
                  is: R(x)(h.type),
                  name: b,
                  structure: g(t.addSkel),
                  errors: t.errors[b] ? t.errors[b] : [],
                  skel: t.formValues,
                  onChange: (y) => u(b, y)
                }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : $("", !0)
              ], 2)) : $("", !0)
            ], 64))), 128))
          ])
        ])) : $("", !0),
        i("div", { class: "viur-shop-form-btn-wrap" }, [
          i("sl-button", {
            size: "medium",
            onClick: o,
            title: "Lieferadresse entfernen"
          }, eo),
          i("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: s
          }, [
            to,
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
          no,
          i("strong", null, A(t.amountAlert.title), 1),
          so,
          O(" " + A(t.amountAlert.msg), 1)
        ], 512),
        i("sl-checkbox", {
          onSlChange: r,
          checked: "",
          class: "viur-shop-form-bill-check"
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, lo = /* @__PURE__ */ C(ao, [["__scopeId", "data-v-c4232b7a"]]), xe = {
  __name: "ExampleUsage",
  setup(e) {
    const n = ee(), t = k(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), l = w({
      rootNode: {},
      tabs: {
        cart: {
          component: K(ke),
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
          component: K(we),
          props: {},
          displayName: "Bestellung pr\xFCfen",
          icon: { name: "clipboard-check" },
          position: 5,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        orderComplete: {
          component: K(Nl),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "bag-check" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: K(Fl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "card-list" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: K(lo),
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
    }), (r, s) => (m(), U(Xe, {
      tabs: l.tabs,
      onTabChange: a
    }, null, 8, ["tabs"]));
  }
}, oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" }));
const et = (e) => (T("data-v-d67cb5c9"), e = e(), M(), e), ro = ["id", "selected"], io = /* @__PURE__ */ et(() => /* @__PURE__ */ i("img", {
  slot: "image",
  src: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  alt: "A kitten sits patiently between a terracotta pot and decorative grasses."
}, null, -1)), uo = { slot: "footer" }, co = /* @__PURE__ */ et(() => /* @__PURE__ */ i("br", null, null, -1)), mo = {
  __name: "SelectPaymentProvider",
  setup(e) {
    const n = ee();
    function t(l) {
      l.target.selected ? (console.log("a", n.state.selectedPaymentProvider), console.log("b", n.state.paymentProviders), n.state.selectedPaymentProvider = n.state.paymentProviders[l.target.id.replace("povider__", "")], console.log(n.state.selectedPaymentProvider), document.querySelectorAll("sl-card").forEach((a) => {
        a !== l.target && (a.selected = !1);
      })) : l.target.selected = !0, console.log("provider changed", l);
    }
    return Q(async () => {
      await n.payment_providers_list();
    }), (l, a) => (m(!0), f(E, null, L(R(n).state.paymentProviders, (r, s, u) => (m(), f("div", null, [
      i("sl-card", {
        selectable: "",
        id: "povider__" + s,
        onSlChange: t,
        selected: u === 0
      }, [
        io,
        i("div", uo, [
          O(A(r.title) + " ", 1),
          co,
          O(" " + A(r.descr), 1)
        ])
      ], 40, ro)
    ]))), 256));
  }
}, Ao = /* @__PURE__ */ C(mo, [["__scopeId", "data-v-d67cb5c9"]]), fo = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = pt();
    return { state: w({}), route: t };
  }
}), go = { class: "home" };
function ho(e, n, t, l, a, r) {
  return m(), f("div", go, "View " + A(e.route.path) + " is missing.", 1);
}
const po = /* @__PURE__ */ C(fo, [["render", ho]]), bo = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: po
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView.569ff8b2.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView.473a581c.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => xa)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => oo)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => fl)
  }
];
function Co(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(bo), bt({
    history: vt("/"),
    routes: t
  });
}
const vo = ft(), Io = {
  install(e) {
    e.component("CartView", ke), e.component("ExampleUsage", xe), e.component("ConfirmView", we), e.component("OrderView", Xe), e.use(vo);
  }
};
export {
  ke as C,
  Nl as O,
  Ao as S,
  Fl as U,
  Io as V,
  C as _,
  xe as a,
  we as b,
  Xe as c,
  Co as d,
  ee as u
};
