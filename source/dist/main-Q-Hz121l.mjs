var et = Object.defineProperty;
var tt = (e, n, t) => n in e ? et(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ie = (e, n, t) => tt(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as D, inject as C, reactive as w, openBlock as f, createElementBlock as h, normalizeClass as pe, createElementVNode as c, renderSlot as He, pushScopeId as M, popScopeId as z, Fragment as E, createCommentVNode as _, toDisplayString as B, onMounted as R, ref as q, readonly as nt, getCurrentScope as at, onScopeDispose as st, unref as K, computed as S, watchEffect as de, renderList as U, watch as ne, withDirectives as Z, vModelText as se, getCurrentInstance as lt, resolveComponent as ae, createBlock as T, vShow as be, withModifiers as ue, createTextVNode as j, shallowRef as H, provide as oe, onBeforeMount as x, useCssVars as rt, Transition as ot, withCtx as it, createVNode as ut, Teleport as dt, resolveDynamicComponent as ct, mergeProps as mt } from "vue";
import { defineStore as ye } from "pinia";
import { Request as ft } from "@viur/vue-utils";
import { ViURShopClient as gt } from "@viur/viur-shop-client";
import { useRoute as ht, createRouter as bt, createWebHashHistory as vt } from "vue-router";
const pt = D({
  props: {
    isDragging: Boolean,
    draggingLineBottom: Boolean,
    draggingLineTop: Boolean
  },
  components: {},
  emits: ["change", "delete", "handleDragStart", "handleDragEnd", "handleDragOver", "handleDrop"],
  setup(e, n) {
    const t = C("boneState");
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
}, Ge = (e) => (M("data-v-141aaf9b"), e = e(), z(), e), yt = ["draggable"], $t = ["disabled"], St = /* @__PURE__ */ Ge(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), kt = [
  St
], _t = { class: "value" }, wt = ["disabled", "title"], Et = /* @__PURE__ */ Ge(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), At = [
  Et
];
function It(e, n, t, l, s, o) {
  return f(), h("div", {
    class: pe(["value-line", {
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
    c("sl-button", {
      disabled: e.boneState.readonly,
      class: "drag-button",
      onMousedown: n[0] || (n[0] = (a) => e.state.isDraggable = !0)
    }, kt, 40, $t),
    c("div", _t, [
      He(e.$slots, "default", {}, void 0, !0)
    ]),
    c("sl-button", {
      variant: "danger",
      disabled: e.boneState.readonly,
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[1] || (n[1] = (a) => e.$emit("delete"))
    }, At, 8, wt)
  ], 42, yt);
}
const Ct = /* @__PURE__ */ I(pt, [["render", It], ["__scopeId", "data-v-141aaf9b"]]), Ot = D({
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
    const t = C("boneState");
    return {
      state: w({
        debug: !1
      }),
      boneState: t
    };
  }
}), jt = { class: "bone-name" }, Bt = { key: 0 }, Dt = { class: "bone" };
function Vt(e, n, t, l, s, o) {
  return f(), h(E, null, [
    c("label", jt, [
      He(e.$slots, "default", {}, void 0, !0),
      _("", !0)
    ]),
    e.state.debug ? (f(), h("div", Bt, [
      c("div", Dt, B(e.name), 1),
      c("pre", null, "    " + B(e.boneState) + `
    `, 1)
    ])) : _("", !0)
  ], 64);
}
const Nt = /* @__PURE__ */ I(Ot, [["render", Vt], ["__scopeId", "data-v-b7149172"]]), Rt = D({
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
    const t = C("boneState"), l = w({});
    function s(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), Lt = ["disabled", "value"], Ut = ["disabled", "value"];
function Tt(e, n, t, l, s, o) {
  var a, i;
  return e.boneState.bonestructure.type === "raw.json" ? (f(), h("sl-textarea", {
    key: 0,
    disabled: (a = e.boneState) == null ? void 0 : a.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Lt)) : (f(), h("sl-textarea", {
    key: 1,
    disabled: (i = e.boneState) == null ? void 0 : i.readonly,
    value: e.value,
    onInput: n[1] || (n[1] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Ut));
}
const ve = /* @__PURE__ */ I(Rt, [["render", Tt], ["__scopeId", "data-v-0ebe5f0b"]]), Pt = D({
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
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: t,
      changeEvent: l
    };
  }
}), Mt = ["value"];
function Wt(e, n, t, l, s, o) {
  return f(), h("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Mt);
}
const Ce = /* @__PURE__ */ I(Pt, [["render", Wt], ["__scopeId", "data-v-b45a1311"]]);
function zt(e) {
  return at() ? (st(e), !0) : !1;
}
function qt(e) {
  return typeof e == "function" ? e() : K(e);
}
const Ft = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function ce(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, s = q(!1);
  let o = null;
  function a() {
    o && (clearTimeout(o), o = null);
  }
  function i() {
    s.value = !1, a();
  }
  function r(...d) {
    a(), s.value = !0, o = setTimeout(() => {
      s.value = !1, o = null, e(...d);
    }, qt(n));
  }
  return l && (s.value = !0, Ft && r()), zt(i), {
    isPending: nt(s),
    start: r,
    stop: i
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
    function l(a) {
      let i = [], r = [], d = /\$\((.*?)\)/g;
      for (; r; ) {
        if (r = d.exec(a), !r) {
          r = !1;
          continue;
        }
        i.push(r[1]);
      }
      return i;
    }
    let s = l(n), o = [];
    Array.isArray(t) || (t = [t]);
    for (let a of t) {
      let i = n;
      for (let r of s) {
        let d = r.split("."), u = a;
        for (let m of d)
          u && u !== "-" && m in u && u[m] ? u = u[m] : u = "-";
        u = this.unescape(u), i = i.replace("$(" + r + ")", u);
      }
      o.push(i);
    }
    return o.join(", ");
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
    const t = C("boneState"), l = w({
      value: S(() => e.value)
    }), s = q(null);
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return de(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: a } = ce(() => {
          s.value.focus();
        }, 600);
        a();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      Utils: Kt,
      boneState: t,
      changeEvent: o,
      stringBone: s
    };
  }
}), Gt = ["disabled", "value", "required"];
function Zt(e, n, t, l, s, o) {
  return f(), h("sl-input", {
    ref: "stringBone",
    disabled: e.boneState.readonly,
    value: e.Utils.unescape(e.value),
    required: e.boneState.bonestructure.required,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a)),
    onKeyup: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Gt);
}
const Oe = /* @__PURE__ */ I(Ht, [["render", Zt], ["__scopeId", "data-v-1ccbacc0"]]), Jt = D({
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
    const t = C("boneState"), l = w({}), s = q(null);
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return de(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: a } = ce(() => {
          s.value.focus();
        }, 600);
        a();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      emailBone: s
    };
  }
}), Qt = ["disabled", "value"];
function Yt(e, n, t, l, s, o) {
  return f(), h("sl-input", {
    ref: "emailBone",
    disabled: e.boneState.readonly,
    type: "email",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Qt);
}
const je = /* @__PURE__ */ I(Jt, [["render", Yt], ["__scopeId", "data-v-4328e024"]]), Xt = D({
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
    const t = C("boneState"), l = w({
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
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), xt = ["disabled", "type", "value"];
function en(e, n, t, l, s, o) {
  return f(), h("sl-input", {
    disabled: e.boneState.readonly,
    type: e.state.typeString,
    value: e.state.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, xt);
}
const Be = /* @__PURE__ */ I(Xt, [["render", en], ["__scopeId", "data-v-f1b8af8c"]]), tn = D({
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
    const t = C("boneState"), l = w({
      value: S(() => {
        let a = e.value;
        return Array.isArray(e.value) ? (t.bonestructure.values instanceof Array ? a = a.filter((i) => t.bonestructure.values.map((r) => r[0].toString()).includes(i)) : a = a.filter(
          (i) => Object.keys(t.bonestructure.values).map((r) => r.toString()).includes(i)
        ), a.map((i) => i.toString())) : e.value ? e.value.toString() : "";
      })
    });
    function s() {
      if (Array.isArray(t.bonestructure.values))
        return t.bonestructure.values;
      {
        let a = [];
        for (const [i, r] of Object.entries(t.bonestructure.values))
          a.push([i, r]);
        return a;
      }
    }
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index), W;
    }
    return R(() => {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      convertObjToList: s
    };
  }
}), nn = ["disabled", "value", "multiple"], an = ["value"];
function sn(e, n, t, l, s, o) {
  return f(), h("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, [
    (f(!0), h(E, null, U(e.convertObjToList(), (a) => (f(), h("sl-option", {
      key: a[0],
      value: a[0]
    }, B(a[1]), 9, an))), 128))
  ], 40, nn);
}
const De = /* @__PURE__ */ I(tn, [["render", sn], ["__scopeId", "data-v-5a38b97f"]]), ln = D({
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
    const t = C("boneState"), l = w({
      value: S(() => ![!1, null, void 0, ""].includes(e.value))
    });
    function s(o) {
      n.emit("change", e.name, o.target.checked, e.lang, e.index);
    }
    return R(() => {
      let o = e.value;
      o || (o = !1), n.emit("change", e.name, o, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), rn = ["disabled", "checked"];
function on(e, n, t, l, s, o) {
  return f(), h("sl-switch", {
    disabled: e.boneState.readonly,
    checked: e.state.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, rn);
}
const Ve = /* @__PURE__ */ I(ln, [["render", on], ["__scopeId", "data-v-363598c8"]]), un = D({
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
    const t = C("boneState"), l = w({
      value1: "",
      value2: null,
      equal: !1,
      passwordInfo: [],
      requiredPasswordInfo: []
    }), s = q(null);
    function o(i) {
      l.value1 === l.value2 ? l.equal = !0 : l.equal = !1, a(l.value1), l.requiredPasswordInfo.length === 0 && l.passwordInfo.length - l.requiredPasswordInfo.length <= t.bonestructure.test_threshold ? n.emit("change", e.name, l.value1, e.lang, e.index, !0) : n.emit("change", e.name, l.value1, e.lang, e.index, !1);
    }
    R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function a(i) {
      l.passwordInfo = [], l.requiredPasswordInfo = [];
      for (const r of t.bonestructure.tests)
        new RegExp(r[0]).test(i) || (r[2] ? l.requiredPasswordInfo.push(r[1]) : l.passwordInfo.push(r[1]));
      l.equal || l.requiredPasswordInfo.push("Die eingegebenen Passwörter stimmen nicht überein."), l.value1 || l.requiredPasswordInfo.push("Das eingegebene Passwort ist leer.");
    }
    return de(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: i } = ce(() => {
          s.value.focus();
        }, 600);
        i();
      }
    }), ne(
      () => e.value,
      (i, r) => {
        l.value1 = i;
      }
    ), {
      state: l,
      boneState: t,
      changeEvent: o,
      passwordBone: s
    };
  }
}), dn = ["disabled"], cn = ["name"], mn = ["name"], fn = { class: "errors" };
function gn(e, n, t, l, s, o) {
  return f(), h(E, null, [
    Z(c("sl-input", {
      ref: "passwordBone",
      "onUpdate:modelValue": n[0] || (n[0] = (a) => e.state.value1 = a),
      disabled: e.boneState.readonly,
      class: pe({ "has-check": !e.boneState.readonly }),
      type: "password",
      clearable: "",
      "password-toggle": "true",
      onSlChange: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a)),
      onSlClear: n[2] || (n[2] = (a) => e.state.value1 = ""),
      onKeyup: n[3] || (n[3] = (...a) => e.changeEvent && e.changeEvent(...a))
    }, [
      c("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, cn)
    ], 42, dn), [
      [se, e.state.value1]
    ]),
    e.boneState.readonly ? _("", !0) : Z((f(), h("sl-input", {
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
      c("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, mn)
    ], 544)), [
      [se, e.state.value2]
    ]),
    c("ul", fn, [
      (f(!0), h(E, null, U(e.state.passwordInfo, (a, i) => (f(), h("li", { key: i }, B(a), 1))), 128)),
      (f(!0), h(E, null, U(e.state.requiredPasswordInfo, (a, i) => (f(), h("li", {
        key: i,
        class: "requiredInfo"
      }, B(a), 1))), 128))
    ])
  ], 64);
}
const Ne = /* @__PURE__ */ I(un, [["render", gn], ["__scopeId", "data-v-0ccf18c0"]]), hn = D({
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
    const t = C("boneState"), l = w({
      value: S(() => e.value),
      structure: S(() => a(t.bonestructure.using)),
      globalRegistration: !1,
      formGroups: S(() => {
        var d, u;
        let i = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [m, p] of Object.entries(l.structure)) {
          let v = "default", k = l.structure[m], g = (d = l.value) == null ? void 0 : d[m];
          (u = p == null ? void 0 : p.params) != null && u.category && (v = p.params.category.toLowerCase()), Object.keys(i).includes(v) ? i[v].bones.push({
            boneName: m,
            boneStructure: k,
            boneValue: g
          }) : i[v] = {
            name: p.params.category,
            bones: [
              {
                boneName: m,
                boneStructure: k,
                boneValue: g
              }
            ]
          }, k.visible === !0 && (i[v].groupVisible = !0);
        }
        let r = {};
        return Object.keys(i).sort().forEach(function(m) {
          r[m] = i[m];
        }), r;
      })
    });
    function s(i) {
      n.emit("change", i);
    }
    R(() => {
      lt().appContext.components.Bone ? l.globalRegistration = !0 : l.globalRegistration = !1, n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function o(i) {
      console.log(i);
    }
    function a(i) {
      if (Array.isArray(i)) {
        let r = {};
        for (const d in i)
          r[i[d][0]] = i[d][1];
        return r;
      } else
        return i;
    }
    return {
      state: l,
      boneState: t,
      getBoneWidget: X,
      structureToDict: a,
      changeEvent: s,
      updateValue: o
    };
  }
}), bn = {
  key: 0,
  open: "",
  variant: "danger"
}, vn = {
  key: 1,
  class: "form"
}, pn = ["summary", "open"];
function yn(e, n, t, l, s, o) {
  const a = ae("bone");
  return e.state.globalRegistration ? (f(), h("div", vn, [
    (f(!0), h(E, null, U(e.state.formGroups, (i, r) => Z((f(), h("sl-details", {
      key: r,
      summary: i.name,
      open: i.groupOpen
    }, [
      (f(!0), h(E, null, U(i.bones, (d) => Z((f(), T(a, {
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
    ], 8, pn)), [
      [be, i.groupVisible]
    ])), 128))
  ])) : (f(), h("sl-alert", bn, " In Order to use this Bone register the bone component globally in your main file "));
}
const Ze = /* @__PURE__ */ I(hn, [["render", yn], ["__scopeId", "data-v-e6fcfbca"]]), $n = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: null,
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Ze },
  emits: ["change"],
  setup(e, n) {
    const t = C("boneState"), l = w({
      value: {},
      index: S(() => e.index),
      lang: S(() => e.lang)
    });
    function s(o) {
      var i;
      (i = l.value) != null && i[o.name] || (l.value ? l.value[o.name] = null : l.value = { [o.name]: null });
      let a = l.value[o.name];
      o.lang ? (a === null && (a = {}), Object.keys(a).includes(o.lang) && o.index !== null ? a[o.lang][o.index] = o.value : a[o.lang] = o.value) : o.index !== null ? (a === null && (a = []), a[o.index] = o.value) : a = o.value, l.value[o.name] = a, n.emit("change", e.name, l.value, e.lang, e.index, !0);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
});
function Sn(e, n, t, l, s, o) {
  const a = ae("Wrapper_nested");
  return f(), T(a, {
    value: e.value,
    name: e.name,
    index: e.state.index,
    disabled: e.boneState.bonestructure.readonly,
    onChange: e.changeEvent
  }, null, 8, ["value", "name", "index", "disabled", "onChange"]);
}
const Re = /* @__PURE__ */ I($n, [["render", Sn], ["__scopeId", "data-v-84a761ce"]]), kn = D({
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
    const t = C("boneState"), l = w({});
    function s(o) {
      n.emit("change", e.name, o.target.value, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), _n = ["disabled", "value"];
function wn(e, n, t, l, s, o) {
  return f(), h("sl-color-picker", {
    disabled: e.boneState.readonly,
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, _n);
}
const Le = /* @__PURE__ */ I(kn, [["render", wn], ["__scopeId", "data-v-534b9149"]]), En = D({
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
    const t = C("boneState"), l = w({
      minAmount: S(() => t.bonestructure.minAmount),
      maxAmount: S(() => t.bonestructure.maxAmount),
      precision: S(() => {
        if (t.bonestructure.precision > 1)
          return parseFloat(`0.${"0".repeat(t.bonestructure.precision - 1)}1`);
      })
    }), s = q(null);
    function o(a) {
      n.emit("change", e.name, a.target.value, e.lang, e.index);
    }
    return de(() => {
      if (e.autofocus && s.value && s.value !== null && s !== null) {
        const { start: a } = ce(() => {
          s.value.focus();
        }, 600);
        a();
      }
    }), R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: o,
      numericBone: s
    };
  }
}), An = ["disabled", "value", "min", "max", "step"], In = { class: "info" }, Cn = { key: 0 }, On = { key: 1 }, jn = { key: 2 };
function Bn(e, n, t, l, s, o) {
  return f(), h(E, null, [
    c("sl-input", {
      ref: "numericBone",
      type: "number",
      disabled: e.boneState.readonly,
      value: e.value,
      min: e.state.minAmount,
      max: e.state.maxAmount,
      step: e.state.precision,
      onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a)),
      onKeyup: n[1] || (n[1] = (...a) => e.changeEvent && e.changeEvent(...a))
    }, null, 40, An),
    c("ul", In, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (f(), h("li", Cn, B(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : _("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (f(), h("li", On, B(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : _("", !0),
      e.state.precision ? (f(), h("li", jn, B(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : _("", !0)
    ])
  ], 64);
}
const Ue = /* @__PURE__ */ I(En, [["render", Bn], ["__scopeId", "data-v-03d5b399"]]);
var N = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class ie extends Error {
  constructor(n, t, l, s) {
    super(l || t), arguments.length >= 4 && s && Object.assign(this, s), this.statusText = t, this.statusCode = n, this.response = s;
  }
}
let he = null;
function Y() {
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
class O {
  static resetState() {
    Y().$reset(), Y().$dispose();
  }
  static buildUrl(n) {
    return n && !(n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) && (n = (N.VITE_API_URL ? N.VITE_API_URL : window.location.origin) + n), n;
  }
  static post(n, { dataObj: t = null, callback: l = null, failedCallback: s = null, abortController: o = null, headers: a = null, mode: i = null } = {}) {
    function r() {
      if (t instanceof FormData)
        return t;
      const u = new FormData();
      for (const m in t)
        if (Array.isArray(t[m]))
          for (let p of t[m])
            u.append(m, p);
        else
          u.append(m, t[m]);
      return u;
    }
    let d = le.post(O.buildUrl(n), r(), null, a, o, i);
    return d.then(function(u) {
      l && l(u.data);
    }).catch(function(u) {
      s && s(u);
    }), d;
  }
  static async getBatchSkeys(n = 30, t = N.VITE_DEFAULT_RENDERER || "json") {
    await O.get(`/${t}/skey`, {
      dataObj: { amount: n }
    }).then(async (l) => {
      let s = await l.json();
      Array.isArray(s) || (s = [s]), Y().state.sKeys = new Set(s);
    });
  }
  static async securePost(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    abortController: o = null,
    renderer: a = N.VITE_DEFAULT_RENDERER || "json",
    headers: i = null,
    mode: r = null,
    amount: d = 30
  } = {}) {
    let u = null;
    Y().state.sKeys.size === 0 && await O.getBatchSkeys(d);
    const m = [...Y().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", m), Y().state.sKeys.delete(m)) : (t || (t = {}), t.skey = m, Y().state.sKeys.delete(m)), u = O.post(n, {
      dataObj: t,
      callback: l,
      abortController: o,
      headers: i,
      mode: r
    }), u;
  }
  static get(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    cached: o = !1,
    clearCache: a = !1,
    abortController: i = null,
    headers: r = null,
    mode: d = null,
    //          milli  sec  min  Std  Tage
    cacheTime: u = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let m = le.get(O.buildUrl(n), t, a, r, i, d);
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
    renderer: i = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${i}/${n}/list`;
    return o && (r += `/${o}`), O.get(r, {
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
    renderer: i = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    n = n.replace(/\//g, ".");
    let r = `/${i}/getStructure/${n}`;
    return o && (r += `/${o}`), O.get(r, {
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
    abortController: i = null,
    renderer: r = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/view/${t}`;
    return a && (d = `/${r}/${n}/view/${a}/${t}`), O.get(d, {
      dataObj: l,
      callback: s,
      failedCallback: o,
      abortController: i
    });
  }
  static add(n, {
    dataObj: t = null,
    callback: l = null,
    failedCallback: s = null,
    group: o = null,
    abortController: a = null,
    renderer: i = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let r = `/${i}/${n}/add`;
    return o && (r = `/${i}/${n}/add/${o}`), O.securePost(r, {
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
    abortController: i = null,
    renderer: r = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/edit/${t}`;
    return a && (d = `/${r}/${n}/edit/${a}/${t}`), O.securePost(d, {
      dataObj: l,
      callback: s,
      failedCallback: o,
      abortController: i
    });
  }
  static delete(n, t, {
    dataObj: l = null,
    callback: s = null,
    failedCallback: o = null,
    group: a = null,
    abortController: i = null,
    renderer: r = (N == null ? void 0 : N.VITE_DEFAULT_RENDERER) || "json"
  } = {}) {
    let d = `/${r}/${n}/delete/${t}`;
    return a && (d = `/${r}/${n}/delete/${a}/${t}`), O.securePost(d, {
      dataObj: l,
      callback: s,
      failedCallback: o,
      abortController: i,
      amount: 1
    });
  }
  static downloadUrlFor(n, t = !1) {
    return n && "dest" in n ? t && "thumbnail" in n.dest ? O.buildUrl(n.dest.thumbnail) : "downloadUrl" in n.dest ? O.buildUrl(n.dest.downloadUrl) : O.buildUrl(null) : O.buildUrl(n);
  }
  static uploadFile(n, t = void 0) {
    const l = {
      fileName: n.name,
      mimeType: n.type || "application/octet-stream",
      size: n.size.toString(),
      node: t
    };
    return new Promise((s, o) => {
      O.securePost("/vi/file/getUploadURL", { dataObj: l }).then(async (a) => {
        let i = await a.json();
        fetch(i.values.uploadUrl, {
          body: n,
          method: "POST",
          mode: "no-cors"
        }).then(async (r) => {
          const d = {
            key: i.values.uploadKey,
            skelType: "leaf"
          };
          O.securePost("/vi/file/add", { dataObj: d }).then(async (u) => {
            let m = await u.json();
            m.action === "addSuccess" ? s(m.values) : o(m);
          }).catch((u) => {
            o(u);
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
class le {
  constructor() {
    Ie(this, "withCredentials", !0);
  }
  static buildOptions(n, t = null, l = null, s = null, o = null) {
    let a = { method: n };
    return a.credentials = "include", a.headers = {
      Accept: "application/json, text/plain, */*"
    }, l && (a.headers = { ...a.headers, ...l }), t && (a.body = t), s && (a.signal = s.signal), o && (a.mode = o), a;
  }
  static get(n, t = null, l = null, s = null, o = null, a = null) {
    function i(r, d) {
      let u = new URL(r);
      if (d && Object.keys(d).length > 0) {
        const m = new URLSearchParams();
        for (const [p, v] of Object.entries(d))
          if (Array.isArray(v))
            for (const k of v)
              m.append(p, k);
          else
            m.append(p, v);
        u.search = m.toString();
      }
      return u.toString();
    }
    return fetch(i(n, t), le.buildOptions("GET", null, s, o, a)).then(async (r) => {
      if (r.ok)
        return r;
      {
        const d = `${r.status} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ie(r.status, r.statusText, d, r));
      }
    }).catch((r) => {
      if (r instanceof TypeError) {
        const u = `503 ${r.message}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ie(503, r.message, u, r));
      }
      if (r instanceof DOMException && r.name == "AbortError") {
        const u = `${r.code} ${r.name}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ie(r.code, r.name, u, { url: n }));
      }
      const d = `${r.statusCode} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ie(r.statusCode, r.statusText, d, r.response));
    });
  }
  static post(n, t = null, l = null, s = null, o = null, a = null) {
    return fetch(n, le.buildOptions("POST", t, s, o, a));
  }
}
var Dn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Vn = D({
  inheritAttrs: !1,
  props: {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String
  },
  components: { Wrapper_nested: Ze },
  emits: ["change"],
  setup(e, n) {
    const t = C("boneState"), l = C("formatString"), s = w({
      format: S(() => t == null ? void 0 : t.bonestructure.format),
      skellistdata: null,
      selection: null
    });
    function o(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), O.get(
        `/${Dn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (u) => {
        var p;
        const m = await u.json();
        s.skellistdata = {};
        for (let v of m.skellist)
          s.skellistdata[v.key] = v;
        return (p = m.skellist) == null ? void 0 : p.map((v) => ({ text: l(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    function a(r) {
      s.selection = { dest: s.skellistdata[r.detail.item.value] }, n.emit("change", e.name, s.selection, e.lang, e.index);
    }
    function i(r) {
      var u;
      s.selection || (s.selection = {}), (u = s.selection.rel) != null && u[r.name] || (s.selection.rel ? s.selection.rel[r.name] = null : s.selection.rel = { [r.name]: null });
      let d = s.selection.rel[r.name];
      r.lang ? (d === null && (d = {}), Object.keys(d).includes(r.lang) && r.index !== null ? d[r.lang][r.index] = r.value : d[r.lang] = r.value) : r.index !== null ? (d === null && (d = []), d[r.index] = r.value) : d = r.value, Object.keys(s.selection).includes("rel") && s.selection.rel ? s.selection.rel[r.name] = d : s.selection.rel = { [r.name]: d }, Object.keys(s.selection).includes("dest") && n.emit("change", e.name, s.selection, e.lang, e.index);
    }
    return R(() => {
      s.selection = e.value, n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: s,
      boneState: t,
      formatString: l,
      changeEvent: a,
      changeEventNested: i,
      getList: o
    };
  }
}), Nn = (e) => (M("data-v-61dd72e0"), e = e(), z(), e), Rn = { class: "record" }, Ln = { class: "single-entry" }, Un = ["value"], Tn = ["disabled", "source"], Pn = ["title"], Mn = /* @__PURE__ */ Nn(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Wn = [
  Mn
];
function zn(e, n, t, l, s, o) {
  var i, r;
  const a = ae("Wrapper_nested");
  return f(), h("div", Rn, [
    c("div", Ln, [
      e.state.selection ? (f(), h("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Un)) : (f(), h("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...d) => e.changeEvent && e.changeEvent(...d))
      }, null, 40, Tn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (f(), h("sl-button", {
        key: 2,
        variant: "danger",
        outline: "",
        title: e.$t("bone.del"),
        class: "delete-btn square-btn",
        onClick: n[1] || (n[1] = () => {
          e.$emit("change", e.name, "", e.lang, e.index), e.state.selection = null;
        })
      }, Wn, 8, Pn)) : _("", !0)
    ]),
    (i = e.boneState) != null && i.bonestructure.using ? (f(), T(a, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : _("", !0)
  ]);
}
const Te = /* @__PURE__ */ I(Vn, [["render", zn], ["__scopeId", "data-v-61dd72e0"]]), qn = D({
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
    const t = C("boneState"), l = w({});
    function s(o, a) {
      n.emit("change", e.name, o, e.lang, e.index);
    }
    return R(() => {
      n.emit("change", e.name, e.value, e.lang, e.index);
    }), {
      state: l,
      boneState: t,
      changeEvent: s
    };
  }
}), Fn = { class: "box" };
function Kn(e, n, t, l, s, o) {
  return f(), h("div", Fn, B(e.value), 1);
}
const Hn = /* @__PURE__ */ I(qn, [["render", Kn], ["__scopeId", "data-v-343aca69"]]);
var Pe = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Gn = D({
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
    const t = C("boneState"), l = q(), s = w({
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
    function a() {
      return O.downloadUrlFor(e.value, !1);
    }
    function i(u) {
      const m = {
        fileName: u.name,
        mimeType: u.type || "application/octet-stream",
        size: u.size.toString()
      };
      return new Promise((p, v) => {
        O.securePost(`/${Pe.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: m }).then(async (k) => {
          let g = await k.json();
          fetch(g.values.uploadUrl, {
            body: u,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            O.securePost(`/${Pe.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
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
    async function r(u) {
      s.loading = !0;
      for (let m of u.target.files) {
        let p = await i(m);
        l.value.value = null, n.emit("change", e.name, { dest: p, rel: null }, e.lang, e.index);
      }
      s.loading = !1;
    }
    async function d(u) {
      s.loading = !0, s.droparea = !1;
      for (let m of u.dataTransfer.files) {
        let p = await i(m);
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
}), me = (e) => (M("data-v-91086308"), e = e(), z(), e), Zn = {
  key: 0,
  class: "loader"
}, Jn = /* @__PURE__ */ me(() => /* @__PURE__ */ c("sl-spinner", { slot: "suffix" }, null, -1)), Qn = [
  Jn
], Yn = {
  key: 1,
  class: "droparea"
}, Xn = ["title"], xn = /* @__PURE__ */ me(() => /* @__PURE__ */ c("sl-icon", { name: "upload" }, null, -1)), ea = [
  xn
], ta = ["multiple"], na = ["title"], aa = /* @__PURE__ */ me(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "download"
}, null, -1)), sa = [
  aa
], la = { class: "box" }, ra = ["src"], oa = ["label", "open"], ia = ["src"], ua = {
  key: 1,
  class: "preview"
}, da = {
  key: 0,
  name: "file-earmark"
}, ca = { key: 2 }, ma = ["title"], fa = /* @__PURE__ */ me(() => /* @__PURE__ */ c("sl-icon", { name: "x-lg" }, null, -1)), ga = [
  fa
];
function ha(e, n, t, l, s, o) {
  var a, i, r, d, u, m, p, v, k, g;
  return f(), h("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = ue((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = ue((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (f(), h("div", Zn, Qn)) : _("", !0),
    e.state.droparea ? (f(), h("div", Yn, " Dateien hier hinziehen ")) : _("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (f(), h("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, ea, 8, Xn)) : _("", !0),
    c("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, ta),
    e.value ? (f(), h("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, sa, 8, na)) : _("", !0),
    c("div", la, [
      (i = (a = e.value) == null ? void 0 : a.dest) != null && i.mimetype.includes("image") ? (f(), h("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        c("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, ra),
        c("sl-dialog", {
          label: decodeURIComponent((d = (r = e.value) == null ? void 0 : r.dest) == null ? void 0 : d.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          c("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, ia)
        ], 8, oa)
      ])) : (f(), h("div", ua, [
        (m = (u = e.value) == null ? void 0 : u.dest) != null && m.name ? (f(), h("sl-icon", da)) : _("", !0)
      ])),
      (v = (p = e.value) == null ? void 0 : p.dest) != null && v.name ? (f(), h("div", ca, B(decodeURIComponent((g = (k = e.value) == null ? void 0 : k.dest) == null ? void 0 : g.name)), 1)) : _("", !0)
    ]),
    e.boneState.multiple ? _("", !0) : (f(), h("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, ga, 8, ma))
  ], 32);
}
const Me = /* @__PURE__ */ I(Gn, [["render", ha], ["__scopeId", "data-v-91086308"]]), ba = D({
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
    const t = C("boneState"), l = w({
      value: "",
      editorConfig: {},
      editor: S(() => ClassicEditor)
    });
    function s(i) {
      n.emit("change", e.name, l.value, e.lang, e.index);
    }
    function o(i) {
      l.value = i.target.value, n.emit("change", e.name, l.value, e.lang, e.index);
    }
    R(() => {
      e.value !== null && (l.value = e.value), n.emit("change", e.name, e.value, e.lang, e.index);
    });
    function a(i) {
      i.editing.view.change((r) => {
        r.setStyle("min-height", "250px", i.editing.view.document.getRoot());
      });
    }
    return ne(
      () => e.value,
      (i, r) => {
        l.value = i;
      }
    ), {
      state: l,
      ClassicEditor,
      boneState: t,
      changeEvent: s,
      onReady: a,
      changeEventTextarea: o
    };
  }
}), va = ["disabled", "value"];
function pa(e, n, t, l, s, o) {
  var i, r, d, u;
  const a = ae("ckeditor");
  return e.state.editor ? (f(), h(E, { key: 0 }, [
    (i = e.boneState.bonestructure) != null && i.valid_html || (r = e.boneState.bonestructure) != null && r.validHtml ? (f(), T(a, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (m) => e.state.value = m),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (d = e.boneState) == null ? void 0 : d.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (f(), h("sl-textarea", {
      key: 1,
      disabled: (u = e.boneState) == null ? void 0 : u.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...m) => e.changeEventTextarea && e.changeEventTextarea(...m))
    }, null, 40, va))
  ], 64)) : _("", !0);
}
const We = /* @__PURE__ */ I(ba, [["render", pa]]), ya = D({
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
    const t = C("boneState"), l = w({
      valueLat: null,
      valueLng: null
    });
    function s() {
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
      changeEvent: s
    };
  }
}), $a = ["name", "min", "max", "disabled"], Sa = ["name", "min", "max", "disabled"];
function ka(e, n, t, l, s, o) {
  return f(), h(E, null, [
    Z(c("sl-input", {
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
    }, null, 40, $a), [
      [se, e.state.valueLat]
    ]),
    Z(c("sl-input", {
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
    }, null, 40, Sa), [
      [se, e.state.valueLng]
    ])
  ], 64);
}
const ze = /* @__PURE__ */ I(ya, [["render", ka], ["__scopeId", "data-v-7bc31020"]]), _a = D({
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
    const t = C("boneState"), l = w({
      counter: 0,
      debounce: null
    }), s = C("addMultipleEntry"), o = C("removeMultipleEntries");
    function a() {
      l.counter += 1;
      let r = 200;
      l.counter > 1 && (r = 500), l.debounce && clearTimeout(l.debounce), l.debounce = setTimeout(() => {
        for (let d = l.counter; d--; )
          s(e.lang);
        l.counter = 0;
      }, r);
    }
    function i() {
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
      handleAdd: a,
      handleRemove: i,
      removeMultipleEntries: o
    };
  }
}), Je = (e) => (M("data-v-63e75dee"), e = e(), z(), e), wa = { class: "actionbar" }, Ea = ["title"], Aa = /* @__PURE__ */ Je(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ia = [
  Aa
], Ca = ["title"], Oa = /* @__PURE__ */ Je(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function ja(e, n, t, l, s, o) {
  return f(), h("div", wa, [
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.handleRemove(e.lang))
    }, Ia, 8, Ea)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (a) => e.handleAdd(e.lang))
    }, [
      Oa,
      j(" " + B(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (f(), h(E, { key: 0 }, [
        j("(" + B(e.state.counter) + ")", 1)
      ], 64)) : _("", !0)
    ], 8, Ca)) : _("", !0)
  ]);
}
const Ba = /* @__PURE__ */ I(_a, [["render", ja], ["__scopeId", "data-v-63e75dee"]]);
var Da = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
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
    const t = C("boneState"), l = C("addMultipleEntry"), s = C("formatString"), o = null, a = w({
      skels: {},
      hasUsing: S(() => t == null ? void 0 : t.bonestructure.using)
    });
    function i(r) {
      let d = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? d = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (d = "skelType=node&"), O.get(
        `/${Da.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${d}limit=99`
      ).then(async (u) => {
        var p;
        const m = await u.json();
        return a.skels = m.skellist.reduce((v, k) => (v[k.key] = k, v), {}), (p = m.skellist) == null ? void 0 : p.map((v) => ({ text: s(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: a,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: o,
      getList: i
    };
  }
}), Qe = (e) => (M("data-v-eeea51c6"), e = e(), z(), e), Na = { class: "actionbar" }, Ra = ["title"], La = /* @__PURE__ */ Qe(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ua = [
  La
], Ta = ["source"], Pa = ["title"], Ma = /* @__PURE__ */ Qe(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Wa(e, n, t, l, s, o) {
  return f(), h("div", Na, [
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.openSelector())
    }, Ua, 8, Ra)) : _("", !0),
    c("sl-combobox", {
      source: e.getList,
      hoist: "",
      onSlItemSelect: n[1] || (n[1] = (a) => {
        var i;
        return e.addMultipleEntry(e.lang, {
          dest: (i = e.state.skels) == null ? void 0 : i[a.detail.item.value],
          rel: e.state.hasUsing ? void 0 : null
        });
      })
    }, null, 40, Ta),
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[2] || (n[2] = (a) => e.addMultipleEntry(e.lang))
    }, [
      Ma,
      j(" " + B(e.$t("bone.list")), 1)
    ], 8, Pa)) : _("", !0)
  ]);
}
const za = /* @__PURE__ */ I(Va, [["render", Wa], ["__scopeId", "data-v-eeea51c6"]]);
var qe = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const qa = D({
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
    const t = C("boneState"), l = C("addMultipleEntry");
    C("formatString");
    const s = null, o = q(), a = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: S(() => t == null ? void 0 : t.bonestructure.using)
    });
    function i(u) {
      const m = {
        fileName: u.name,
        mimeType: u.type || "application/octet-stream",
        size: u.size.toString()
      };
      return new Promise((p, v) => {
        O.securePost(`/${qe.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: m }).then(async (k) => {
          let g = await k.json();
          fetch(g.values.uploadUrl, {
            body: u,
            method: "POST",
            mode: "no-cors"
          }).then(async (b) => {
            const y = {
              key: g.values.uploadKey,
              node: void 0,
              skelType: "leaf"
            };
            O.securePost(`/${qe.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
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
    async function r(u) {
      a.loading = !0;
      for (let m of u.target.files) {
        let p = await i(m);
        o.value.value = null;
        let v = null;
        a.hasUsing && (v = void 0), l(e.lang, { dest: p, rel: v });
      }
      a.loading = !1;
    }
    async function d(u) {
      a.loading = !0, a.droparea = !1;
      for (let m of u.dataTransfer.files) {
        let p = await i(m);
        o.value.value = null;
        let v = null;
        a.hasUsing && (v = void 0), l(e.lang, { dest: p, rel: v });
      }
      a.loading = !1;
    }
    return R(() => {
      (!e.value || e.value.length === 0) && n.emit("change", e.name, [], e.lang);
    }), {
      state: a,
      boneState: t,
      addMultipleEntry: l,
      removeMultipleEntries: s,
      uploadFile: i,
      uploadinput: o,
      handleUpload: r,
      handleDrop: d
    };
  }
}), $e = (e) => (M("data-v-9bac9f8a"), e = e(), z(), e), Fa = ["title"], Ka = /* @__PURE__ */ $e(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ha = [
  Ka
], Ga = {
  key: 1,
  class: "droparea"
}, Za = ["multiple"], Ja = ["title"], Qa = /* @__PURE__ */ $e(() => /* @__PURE__ */ c("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Ya = [
  Qa
], Xa = ["title"], xa = /* @__PURE__ */ $e(() => /* @__PURE__ */ c("sl-icon", { name: "upload" }, null, -1)), es = {
  key: 0,
  slot: "suffix"
};
function ts(e, n, t, l, s, o) {
  return f(), h("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = ue((a) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (a) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = ue((...a) => e.handleDrop && e.handleDrop(...a), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.openSelector())
    }, Ha, 8, Fa)) : _("", !0),
    e.state.droparea ? (f(), h("div", Ga, " Dateien hier hinziehen ")) : _("", !0),
    c("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...a) => e.handleUpload && e.handleUpload(...a))
    }, null, 40, Za),
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (a) => e.addMultipleEntry(e.lang))
    }, Ya, 8, Ja)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (f(), h("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (a) => e.uploadinput.click())
    }, [
      xa,
      j(" " + B(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (f(), h("sl-spinner", es)) : _("", !0)
    ], 8, Xa)) : _("", !0)
  ], 32);
}
const ns = /* @__PURE__ */ I(qa, [["render", ts], ["__scopeId", "data-v-9bac9f8a"]]), Se = ye("boneStore", () => {
  const e = w({
    additionalBones: H({}),
    defaultBones: H({
      rawBone: ve,
      keyBone: Ce,
      stringBone: Oe,
      emailBone: je,
      dateBone: Be,
      booleanBone: Ve,
      selectBone: De,
      passwordBone: Ne,
      recordBone: Re,
      numericBone: Ue,
      colorBone: Le,
      relationalBone: Te,
      jsonBone: Hn,
      fileBone: Me,
      textBone: We,
      spatialBone: ze
    }),
    actionbars: H({
      "relational.tree.leaf.file.file": ns,
      "relational.": za
    }),
    multibones: H(["select", "select."])
  });
  function n(a, i) {
    e.additionalBones[a] = i;
  }
  function t() {
    let a = e.defaultBones;
    for (const [i, r] of Object.entries(e.additionalBones))
      a.add(r);
    return a;
  }
  function l(a) {
    if (Object.keys(e.additionalBones).includes(a))
      return e.additionalBones[a];
    {
      let i = a.split("."), r = Object.entries(e.additionalBones).filter(
        (d) => d[0].startsWith(i[0] + ".")
      );
      if (r.length > 0) {
        r.sort((d, u) => u.length - d.length);
        for (let d of r)
          if (a.startsWith(d[0]))
            return e.additionalBones[d[0]];
      }
    }
    return a === "date" ? Be : a === "key" ? Ce : a === "str.email" ? je : a === "str" || a.startsWith("str.") ? Oe : a === "select" || a.startsWith("select.") ? De : a === "bool" ? Ve : a === "password" ? Ne : a === "record" ? Re : a === "numeric" || a.startsWith("numeric.") ? Ue : a === "relational.tree.leaf.file.file" ? Me : a === "relational" || a.startsWith("relational.") ? Te : a === "color" ? Le : a === "text" ? We : a === "spatial" ? ze : ve;
  }
  function s(a, i) {
    e.actionbars[a] = i;
  }
  function o(a) {
    if (Object.keys(e.actionbars).includes(a))
      return e.actionbars[a];
    {
      let i = a.split("."), r = Object.entries(e.actionbars).filter(
        (d) => d[0].startsWith(i[0] + ".")
      );
      if (r.length > 0) {
        r.sort((d, u) => u.length - d.length);
        for (let d of r)
          if (a.startsWith(d[0]))
            return e.actionbars[d[0]];
      }
    }
    return Ba;
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
function as(e) {
  return Se().getBoneActionbar(e);
}
function X(e) {
  return Se().getBoneWidget(e);
}
function ss(e) {
  const n = Se();
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
    wrapperMultiple: Ct,
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
      bonestructure: S(() => {
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
      multilanguage: S(() => {
        var g;
        return ((g = t.languages) == null ? void 0 : g.length) && t.languages.length > 0;
      }),
      languages: S(() => e.languages ? e.languages : t.bonestructure && Object.keys(t.bonestructure).includes("languages") ? t.bonestructure.languages : []),
      readonly: S(() => e.readonly ? e.readonly : t.bonestructure && Object.keys(t.bonestructure).includes("readonly") ? t.bonestructure.readonly : !1),
      required: S(() => e.required ? e.required : t.bonestructure && Object.keys(t.bonestructure).includes("required") ? t.bonestructure.required : !1),
      hasTooltip: S(() => !!(t.bonestructure && Object.keys(t.bonestructure.params).includes("tooltip"))),
      multiple: S(() => e.multiple ? e.multiple : t.bonestructure && Object.keys(t.bonestructure).includes("multiple") ? t.bonestructure.multiple : !1),
      params: S(() => e.params ? e.params : t.bonestructure && Object.keys(t.bonestructure).includes("params") ? t.bonestructure.params : {}),
      actionbar: S(() => {
        var g;
        return as((g = t.bonestructure) == null ? void 0 : g.type);
      }),
      isEmpty: S(() => {
        function g(b) {
          for (const [y, $] of Object.entries(b))
            if ($ !== null) {
              if (Array.isArray($) && $.length > 0)
                return !1;
              if (!Array.isArray($))
                return !1;
            }
          return !0;
        }
        return t.readonly ? !1 : !t.bonevalue || Array.isArray(t.bonevalue) && t.bonevalue.length === 0 ? !0 : t.bonevalue === Object(t.bonevalue) && !Array.isArray(t.bonevalue) ? g(t.bonevalue) : !1;
      }),
      errors: [],
      errorMessages: S(() => {
        let g = [];
        for (let b of e.errors)
          b.fieldPath[0] === e.name && (b.severity > 2 || t.required && (b.severity === 2 || b.severity === 0)) && g.push(b.errorMessage);
        return g;
      })
    });
    oe("boneState", t);
    function l(g, b, y) {
      a(b, g, "isDragging"), a(b, g, "dragStartIndex");
    }
    function s(g, b, y) {
      y.preventDefault();
      const $ = y.clientY - y.target.getBoundingClientRect().top, A = y.target.closest(".value-line");
      $ < A.offsetHeight / 2 ? (a(b, g, "draggingLineTop"), i("draggingLineBottom"), t.dropIndex.index = g) : (a(b, g, "draggingLineBottom"), i("draggingLineTop"), t.dropIndex.index = g + 1);
      let L = b ? t.bonevalue[b] : t.bonevalue;
      t.dropIndex.index > L.length - 1 && (t.dropIndex.index -= 1);
    }
    function o(g, b, y) {
      let $ = null;
      t.dragStartIndex.index !== t.dropIndex.index && (b ? ($ = t.bonevalue[b].splice(t.dragStartIndex.index, 1)[0], t.bonevalue[b].splice(t.dropIndex.index, 0, $)) : ($ = t.bonevalue.splice(t.dragStartIndex.index, 1)[0], t.bonevalue.splice(t.dropIndex.index, 0, $)), console.dir(t.bonevalue[0]), n.emit("change", {
        name: e.name,
        value: d(),
        lang: b,
        index: g
      })), i("draggingLineBottom", "draggingLineTop", "isDragging", "dragStartIndex", "dropIndex");
    }
    function a(g, b, y) {
      t[y].lang = g || null, t[y].index = b;
    }
    function i(...g) {
      g.forEach((b) => {
        t[b] = {
          lang: null,
          index: Number
        };
      });
    }
    function r(g, b, y = null, $ = null, A) {
      if (b === void 0 || (y ? (t.bonevalue || (t.bonevalue = {}), Object.keys(t.bonevalue).includes(y) && $ !== null ? t.bonevalue[y][$] = b : t.bonevalue[y] = b) : $ !== null ? t.bonevalue[$] = b : A === !1 || (t.bonevalue = b), t.readonly)) return !1;
      let L = {
        name: g,
        value: d(),
        lang: y,
        index: $
      }, V = {
        name: g,
        value: b,
        lang: y,
        index: $
      };
      A != null && (L.pwMatch = A, V.pwMatch = A), n.emit("change", L), n.emit("change-internal", V);
    }
    function d() {
      function g(y, $ = null) {
        let A = [];
        if (Array.isArray(y))
          if (t.bonestructure.type == "spatial" && y.length === 2 && !Array.isArray(y[0]))
            A.push({ [$ + ".lat"]: y[0] }), A.push({ [$ + ".lng"]: y[1] });
          else if (Object.values(y).filter((L) => L === Object(L)).length > 0)
            for (const [L, V] of y.entries())
              V.rel !== null ? A.push(g(V, $ + "." + L)) : A.push(g(V, $));
          else
            for (const [L, V] of y.entries())
              A.push(g(V, $));
        else if (y === Object(y))
          for (const [L, V] of Object.entries(y))
            $ ? $.endsWith(".dest") || $.endsWith(".rel") ? $.endsWith(".dest") && L === "key" ? (/\.[0-9]*\.dest$/.test($) ? A.push(g(V, $.replace(/\.[0-9]*\.dest/, ""))) : A.push(g(V, $.replace(/\.dest/, ""))), A.push(g(V, $.replace(/\.dest/, "") + "." + L))) : $.endsWith(".rel") && A.push(g(V, $.replace(/\.rel/, "") + "." + L)) : A.push(g(V, $ + "." + L)) : A.push(g(V, L));
        else
          y == null && (y = ""), $ !== null && A.push({ [$]: y });
        return A;
      }
      let b = g(t.bonevalue, e.name);
      return b = b.flat(10), b;
    }
    function u(g = null, b = "") {
      g ? Object.keys(t.bonevalue).includes(g) ? t.bonevalue[g].push(b) : t.bonevalue[g] = [b] : t.bonevalue ? t.bonevalue.push(b) : t.bonevalue = [b];
    }
    oe("addMultipleEntry", u);
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
    function p(g = null) {
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
    oe("removeMultipleEntries", p);
    function v(g = null, b = "") {
      u(g, b);
    }
    function k(g, b) {
      function y(V) {
        let G = [], F = [], te = /\$\((.*?)\)/g;
        for (; F; ) {
          if (F = te.exec(V), !F) {
            F = !1;
            continue;
          }
          G.push(F[1]);
        }
        return G;
      }
      function $(V, G) {
        let F = V.split("."), te = V.split("."), P = G;
        for (let Q of F)
          if (te.shift(), P && P !== "-" && Object.keys(P).includes(Q) && P[Q])
            if (Array.isArray(P[Q])) {
              let Ae = [];
              for (let xe of P[Q])
                Ae.push($(te.join("."), xe));
              P = Ae.join(", ");
            } else
              P = P[Q];
          else (!P || typeof P[Q] == "object" && !P[Q]) && (P = "-");
        return P;
      }
      let A = y(g), L = [];
      Array.isArray(b) || (b = [b]);
      for (let V of b) {
        let G = g;
        for (let F of A) {
          let te = $(F, V);
          G = G.replace("$(" + F + ")", te);
        }
        L.push(G);
      }
      return L.join(", ");
    }
    return oe("formatString", k), x(() => {
      var g;
      e.value ? t.bonevalue = e.value : t.bonevalue = (g = e.skel) == null ? void 0 : g[e.name];
    }), ne(
      () => e.skel,
      (g, b) => {
        var y;
        t.bonevalue = (y = e.skel) == null ? void 0 : y[e.name];
      }
    ), ne(
      () => {
        var g;
        return (g = e.errors) == null ? void 0 : g[e.name];
      },
      (g, b) => {
        t.errors = e.errors;
      }
    ), {
      state: t,
      updateValue: r,
      addMultipleEntry: u,
      removeMultipleEntry: m,
      removeMultipleEntries: p,
      BoneHasMultipleHandling: ss,
      multipleBonePressEnter: v,
      handleDragStart: l,
      handleDragOver: s,
      handleDrop: o,
      setStateProperties: a,
      resetStateProperties: i
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
}, Fe = () => {
  rt((e) => ({
    "93747d92": e.state.outerSize,
    "284424e5": e.state.shadow,
    "6485ca5e": e.state.logoSize,
    "5d833915": e.state.spinnerSize,
    d5b3feca: e.color,
    "2050b700": e.state.trackWidth
  }));
}, Ke = ke.setup;
ke.setup = Ke ? (e, n) => (Fe(), Ke(e, n)) : Fe;
const ls = (e) => (M("data-v-46c45785"), e = e(), z(), e), rs = {
  key: 0,
  class: "loading"
}, os = /* @__PURE__ */ ls(() => /* @__PURE__ */ c("sl-spinner", { class: "loader" }, null, -1)), is = { class: "logo" }, us = ["src"];
function ds(e, n, t, l, s, o) {
  return f(), T(ot, null, {
    default: it(() => [
      t.active ? (f(), h("div", rs, [
        os,
        c("div", is, [
          c("sl-icon", { src: t.logo }, null, 8, us)
        ])
      ])) : _("", !0)
    ]),
    _: 1
  });
}
const cs = /* @__PURE__ */ I(ke, [["render", ds], ["__scopeId", "data-v-46c45785"]]), re = ye("cartstore", () => {
  const e = new gt({
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
  async function l(u) {
    return await e.cart_list({ cart_key: u });
  }
  async function s() {
    (await e.cart_list()).forEach((m) => {
      m.is_root_node && (m.cart_type === "basket" ? n.basketRootNode = m : n.whishlistRootNodes.push(m));
    });
  }
  async function o(u, m) {
    let p = await e.article_add({
      article_key: u,
      parent_cart_key: m
    });
    console.log("addToCart", p);
  }
  async function a(u, m) {
    let p = await e.article_view({
      article_key: u,
      parent_cart_key: m
    });
    console.log("getArticleView", p);
  }
  async function i(u, m) {
    let p = await e.article_remove({
      article_key: u,
      parent_cart_key: m
    });
    console.log("remove Resp", p);
  }
  async function r(u, m, p) {
    let v = await e.article_update({
      article_key: u,
      parent_cart_key: m,
      quantity: p,
      quantity_mode: "replace"
    });
    console.log("update Resp", v);
  }
  async function d() {
    let u = await e.address_structure();
    n.structure.address = u.addSkel, console.log("adress add", n.structure.address);
  }
  return {
    state: n,
    addToCart: o,
    getArticleView: a,
    removeItem: i,
    updateItem: r,
    init: t,
    getAdressStructure: d,
    getChildren: l
  };
}), ms = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (f(), h("pre", null, B(e.node.name), 1));
  }
}, fe = (e) => (M("data-v-1150a917"), e = e(), z(), e), fs = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, gs = ["src"], hs = { class: "viur-shop-cart-leaf-headline headline" }, bs = { class: "viur-shop-cart-leaf-artno" }, vs = ["innerHTML"], ps = { class: "viur-shop-cart-leaf-actions" }, ys = /* @__PURE__ */ fe(() => /* @__PURE__ */ c("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-cart-leaf-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ c("sl-icon", {
    name: "heart",
    slot: "prefix"
  })
], -1)), $s = /* @__PURE__ */ fe(() => /* @__PURE__ */ c("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Ss = [
  $s
], ks = { class: "viur-shop-cart-leaf-quantity" }, _s = { class: "viur-shop-cart-leaf-unitprice" }, ws = /* @__PURE__ */ fe(() => /* @__PURE__ */ c("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), Es = { class: "viur-shop-cart-leaf-price" }, As = /* @__PURE__ */ fe(() => /* @__PURE__ */ c("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Is = {
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
      return r !== void 0 ? ft.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function a(r, d, u, m) {
      l("updateItem", {
        item: r,
        articleKey: d,
        node: u,
        quantity: m
      });
    }
    function i(r, d, u) {
      l("removeItem", { item: r, articleKey: d, node: u });
    }
    return x(() => {
      s.leaf = t.leaf;
    }), (r, d) => (f(), h("sl-card", fs, [
      c("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(s.leaf.shop_image ? s.leaf.shop_image : void 0)
      }, null, 8, gs),
      c("h4", hs, B(s.leaf.shop_name), 1),
      c("h5", bs, B(s.leaf.shop_art_no_or_gtin), 1),
      c("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: s.leaf.shop_description
      }, null, 8, vs),
      c("div", ps, [
        ys,
        c("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: d[0] || (d[0] = (u) => i(s.leaf, s.leaf.article.dest.key, e.node))
        }, Ss)
      ]),
      c("div", ks, [
        Z(c("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": d[1] || (d[1] = (u) => s.leaf.quantity = u),
          onInput: d[2] || (d[2] = (u) => a(
            s.leaf,
            s.leaf.article.dest.key,
            e.node,
            s.leaf.quantity
          ))
        }, null, 544), [
          [se, s.leaf.quantity]
        ])
      ]),
      c("div", _s, [
        ws,
        j(" " + B(e.leaf.price.retail), 1)
      ]),
      c("div", Es, [
        As,
        j(" " + B(e.leaf.price.retail * e.leaf.quantity), 1)
      ])
    ]));
  }
}, Cs = /* @__PURE__ */ I(Is, [["__scopeId", "data-v-1150a917"]]), Ye = (e) => (M("data-v-8dd1e557"), e = e(), z(), e), Os = { key: 0 }, js = /* @__PURE__ */ Ye(() => /* @__PURE__ */ c("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Bs = {
  class: "footer-wrap",
  slot: "footer"
}, Ds = { class: "viur-shop-cart-node" }, Vs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ c("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ c("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen ")
], -1)), Ns = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(e) {
    const n = e, t = re(), l = q(null), s = w({
      itemsIsInit: S(() => !0),
      images: {},
      currentItem: {},
      currentNode: {},
      nodes: [],
      leaves: {}
    });
    S(() => n.mode === "basket" ? t.state.basket : n.cartKey);
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
    function i(m) {
      console.log("removeItem :", m), l.value.show(), s.currentItem = m.item, s.currentNode = m.node;
    }
    async function r() {
      s.leaves[s.currentNode.key].forEach((m) => {
        m.key === s.currentItem.key && (m.quantity = 1);
      }), s.currentItem = {}, s.currentNode = {};
    }
    async function d() {
      s.nodes = [], s.leaves = {}, await t.init(), await u();
    }
    async function u(m = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", m);
      const p = await t.getChildren(m);
      console.log("getChildren children: ", p), p.forEach(async (v) => {
        v.skel_type === "node" ? (s.nodes.push(v), await u(v.key)) : (Object.keys(s.leaves).includes(m) || (s.leaves[m] = []), s.leaves[m].push(v));
      });
    }
    return x(async () => {
      await t.init(), await u(), n.mode === "basket" && s.nodes.push(t.state.basketRootNode), console.log("state.nodes test", s.nodes), console.log("state.leaves", s.leaves);
    }), (m, p) => e.cartKey.length ? (f(), h(E, { key: 1 }, [
      c("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: r
      }, [
        js,
        c("div", Bs, [
          c("sl-button", {
            variant: "danger",
            onClick: p[0] || (p[0] = (v) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          c("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (f(!0), h(E, null, U(s.nodes, (v) => (f(), h("div", Ds, [
        Object.keys(s.leaves).includes(v.key) ? (f(), h(E, { key: 0 }, [
          ut(ms, { node: v }, null, 8, ["node"]),
          (f(!0), h(E, null, U(s.leaves[v.key], (k) => (f(), T(Cs, {
            key: k.key,
            leaf: k,
            node: v,
            onRemoveItem: i,
            onUpdateItem: a
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : _("", !0)
      ]))), 256)),
      Vs
    ], 64)) : (f(), h("sl-spinner", Os));
  }
}, _e = /* @__PURE__ */ I(Ns, [["__scopeId", "data-v-8dd1e557"]]), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), J = (e) => (M("data-v-b7b745be"), e = e(), z(), e), Ls = {
  key: 1,
  class: "list"
}, Us = /* @__PURE__ */ J(() => /* @__PURE__ */ c("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), Ts = /* @__PURE__ */ J(() => /* @__PURE__ */ c("br", null, null, -1)), Ps = /* @__PURE__ */ J(() => /* @__PURE__ */ c("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ c("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ c("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ j(" Versandadresse "),
      /* @__PURE__ */ c("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ c("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ j(" Roland Brose"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" Speicherstraße 33"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" 44147 Dortmund, DE"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" rb@mausbrand.de"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ c("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ c("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ j(" Rechnungsadresse "),
      /* @__PURE__ */ c("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ c("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ j(" Roland Brose"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" Speicherstraße 33"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" 44147 Dortmund, DE"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" rb@mausbrand.de"),
    /* @__PURE__ */ c("br"),
    /* @__PURE__ */ j(" 0231 21 34 68 90 ")
  ])
], -1)), Ms = /* @__PURE__ */ J(() => /* @__PURE__ */ c("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ c("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ c("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ j(" Paypal ")
  ]),
  /* @__PURE__ */ c("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ c("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), Ws = /* @__PURE__ */ J(() => /* @__PURE__ */ c("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), zs = /* @__PURE__ */ J(() => /* @__PURE__ */ c("br", null, null, -1)), qs = /* @__PURE__ */ J(() => /* @__PURE__ */ c("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Fs = /* @__PURE__ */ J(() => /* @__PURE__ */ c("br", null, null, -1)), Ks = { class: "viur-shop-cart-sidebar-btn-wrap" }, Hs = ["variant", "disabled"], Gs = {
  __name: "ConfirmView",
  setup(e) {
    const n = re(), t = w({
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
    return x(async () => {
      await n.init();
    }), (s, o) => t.cartIsInit ? (f(), h("div", Ls, [
      Us,
      Ts,
      Ps,
      Ms,
      Ws,
      zs,
      (f(), T(dt, { to: "#order_sidebar" }, [
        qs,
        Fs,
        c("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        c("div", Ks, [
          c("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Hs)
        ])
      ]))
    ])) : (f(), T(cs, { key: 0 }));
  }
}, we = /* @__PURE__ */ I(Gs, [["__scopeId", "data-v-b7b745be"]]), Zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), Js = (e) => (M("data-v-0e63188d"), e = e(), z(), e), Qs = { class: "bind viur-shop-wrap" }, Ys = ["panel", "disabled"], Xs = { class: "viur-shop-order-step" }, xs = ["name", "library"], el = { class: "viur-shop-order-status-text" }, tl = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, nl = ["name"], al = ["onClick"], sl = ["onClick"], ll = /* @__PURE__ */ Js(() => /* @__PURE__ */ c("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ c("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), rl = {
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
      isFirstTab: (u) => u === 0
    }), o = q(null);
    function a(u) {
      let m = [], p = [];
      for (const v in u)
        u[v].position ? m.push([v, u[v].position]) : m.push([v, 0]);
      return m.sort((v, k) => v[1] - k[1]), m.forEach((v) => {
        p.push(v[0]);
      }), p;
    }
    function i(u) {
      l("tabChange", u);
    }
    function r(u) {
      o.value.show(u);
    }
    function d(u) {
      o.value.show(u);
    }
    return (u, m) => (f(), h("div", Qs, [
      c("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: i,
        ref_key: "tabGroup",
        ref: o
      }, [
        (f(!0), h(E, null, U(s.tabNames, (p, v) => (f(), h("sl-tab", {
          class: "viur-shop-order-tab",
          slot: "nav",
          panel: p,
          key: p,
          disabled: e.tabs[p].disabled
        }, [
          c("div", Xs, [
            c("sl-icon", {
              class: "viur-shop-order-step-icon",
              name: e.tabs[p].icon.name,
              library: e.tabs[p].icon.library
            }, null, 8, xs),
            c("div", el, B(v + 1) + ". " + B(e.tabs[p].displayName), 1)
          ]),
          v < s.tabNames.length - 1 ? (f(), h("sl-icon", tl)) : _("", !0)
        ], 8, Ys))), 128)),
        (f(!0), h(E, null, U(s.tabNames, (p, v) => (f(), h("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: p,
          key: p
        }, [
          (f(), T(ct(e.tabs[p].component), mt({ ref_for: !0 }, e.tabs[p].props ? e.tabs[p].props : ""), null, 16)),
          v !== s.tabNames.length - 1 ? (f(), h("div", {
            key: 0,
            class: pe(["viur-shop-form-footer", { "flex-end": s.isFirstTab(v) }])
          }, [
            Z(c("sl-button", {
              type: "submit",
              onClick: (k) => r(s.tabNames[v - 1])
            }, " Zurück ", 8, al), [
              [be, v !== 0]
            ]),
            c("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (k) => d(s.tabNames[v + 1])
            }, " Weiter ", 8, sl)
          ], 2)) : _("", !0)
        ], 8, nl))), 128))
      ], 544),
      ll
    ]));
  }
}, ol = /* @__PURE__ */ I(rl, [["__scopeId", "data-v-0e63188d"]]), il = {}, ge = (e) => (M("data-v-36ccc280"), e = e(), z(), e), ul = { class: "bind" }, dl = /* @__PURE__ */ ge(() => /* @__PURE__ */ c("h1", { class: "headline" }, "Vielen Dank für Ihre Bestellung", -1)), cl = /* @__PURE__ */ ge(() => /* @__PURE__ */ c("br", null, null, -1)), ml = /* @__PURE__ */ ge(() => /* @__PURE__ */ c("p", { class: "paragraph" }, [
  /* @__PURE__ */ c("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ j(" 123345670 ")
], -1)), fl = /* @__PURE__ */ ge(() => /* @__PURE__ */ c("p", { class: "paragraph" }, [
  /* @__PURE__ */ j(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
  /* @__PURE__ */ c("br"),
  /* @__PURE__ */ j(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
  /* @__PURE__ */ c("div", { class: "btn-wrap" }, [
    /* @__PURE__ */ c("sl-button", { size: "medium" }, " Zur Startseite "),
    /* @__PURE__ */ c("sl-button", {
      variant: "primary",
      size: "medium"
    }, " Weiter Einkaufen ")
  ])
], -1)), gl = [
  dl,
  cl,
  ml,
  fl
];
function hl(e, n) {
  return f(), h("div", ul, gl);
}
const bl = /* @__PURE__ */ I(il, [["render", hl], ["__scopeId", "data-v-36ccc280"]]), Ee = (e) => (M("data-v-b68a2bfa"), e = e(), z(), e), vl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ c("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), pl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ c("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), yl = { key: 0 }, $l = /* @__PURE__ */ Ee(() => /* @__PURE__ */ c("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Sl = {
  __name: "UserInformation",
  props: {
    mode: { type: String, default: "form" },
    conditions: { type: Function }
  },
  setup(e) {
    const n = re(), t = w({
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
    function s(a, i) {
      for (const [r, d] of Object.entries(i.value[0]))
        t.formValues[r] = d;
    }
    function o(a) {
      let i = {};
      return Array.isArray(a) ? (a.forEach((r) => {
        let d = r[0], u = r[1];
        i[d] = u;
      }), console.log("output", i), i) : a;
    }
    return ne(t.formValues, (a) => {
      Object.entries(a).forEach(([i, r]) => {
        r === "" && delete t.formValues[i];
      });
    }), x(async () => {
      await n.getAdressStructure(), t.addSkel = o(n.state.structure.address);
    }), (a, i) => {
      const r = ae("bone");
      return f(), h(E, null, [
        c("div", null, [
          j(" test "),
          vl,
          (f(!0), h(E, null, U(t.addSkel, (d, u) => (f(), h(E, { key: u }, [
            j(B(u) + " ", 1),
            d.visible && d.params.group === "Customer Info" ? (f(), T(r, {
              key: 0,
              is: K(X)(d.type),
              name: u,
              structure: o(t.addSkel),
              errors: t.errors[u] ? t.errors[u] : [],
              skel: t.formValues,
              onChange: (m) => s(u, m),
              class: "viur-shop-form-grid-w-2"
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        c("div", null, [
          pl,
          (f(!0), h(E, null, U(t.addSkel, (d, u) => (f(), h(E, { key: u }, [
            d.visible && d.params.group === "Customer Address" ? (f(), T(r, {
              key: 0,
              is: K(X)(d.type),
              name: u,
              structure: o(t.addSkel),
              errors: t.errors[u] ? t.errors[u] : [],
              skel: t.formValues,
              onChange: (m) => s(u, m)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        t.isCustomAdress ? (f(), h("div", yl, [
          $l,
          (f(!0), h(E, null, U(t.addSkel, (d, u) => (f(), h(E, { key: u }, [
            d.visible && d.params.group === "Customer Address" ? (f(), T(r, {
              key: 0,
              is: K(X)(d.type),
              name: u,
              structure: o(t.addSkel),
              errors: t.errors[u] ? t.errors[u] : [],
              skel: t.formValues,
              onChange: (m) => s(u, m)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ])) : _("", !0),
        c("sl-checkbox", {
          onSlChange: l,
          checked: ""
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, kl = /* @__PURE__ */ I(Sl, [["__scopeId", "data-v-b68a2bfa"]]), ee = (e) => (M("data-v-a4accf28"), e = e(), z(), e), _l = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), wl = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), El = ["onSlChange", "onSlClear", "label"], Al = ["value"], Il = { key: 0 }, Cl = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Ol = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), jl = [
  Ol
], Bl = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), Dl = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), Vl = /* @__PURE__ */ ee(() => /* @__PURE__ */ c("br", null, null, -1)), Nl = {
  __name: "UserInfoMulti",
  props: {
    mode: { type: String, default: "form" }
  },
  setup(e) {
    const n = re(), t = w({
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
    }), l = q(null), s = q(null);
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
    function i(p, v) {
      for (const [k, g] of Object.entries(v.value[0]))
        t.formValues[k] = g;
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
        u();
        return;
      }
      t.selectedItem[v] = p.target.value, t.isItemSelected = !0;
    }
    function u(p, v) {
      console.log("clearing..."), delete t.selectedItem[v], t.isItemSelected = !1;
    }
    function m(p) {
      let v = {};
      return Array.isArray(p) ? (p.forEach((k) => {
        let g = k[0], b = k[1];
        v[g] = b;
      }), v) : p;
    }
    return ne(t.formValues, (p) => {
      Object.entries(p).forEach(([v, k]) => {
        k === "" && delete t.formValues[v];
      });
    }), x(async () => {
      await n.getAdressStructure(), t.addSkel = m(n.state.structure.address);
    }), (p, v) => {
      const k = ae("bone");
      return f(), h(E, null, [
        c("div", null, [
          _l,
          (f(!0), h(E, null, U(t.addSkel, (g, b) => (f(), h(E, { key: b }, [
            g.visible && g.params.group === "Customer Info" ? (f(), T(k, {
              key: 0,
              is: K(X)(g.type),
              name: b,
              structure: m(t.addSkel),
              errors: t.errors[b] ? t.errors[b] : [],
              skel: t.formValues,
              onChange: (y) => i(b, y),
              class: "viur-shop-form-grid-w-2"
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        wl,
        (f(!0), h(E, null, U(t.shippingAdressAmount, (g) => (f(), h("div", { key: g }, [
          c("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (b) => d(b, g),
            onSlClear: (b) => u(b, g),
            label: t.selectedItem[g] ? K(n).state.carts[t.selectedItem[g]].info.name : "Warenkorb für Adresse wählen.",
            class: "grid-w-4"
          }, [
            (f(!0), h(E, null, U(K(n).state.carts, (b, y) => (f(), h("sl-option", { value: y }, B(b.info.name), 9, Al))), 256))
          ], 40, El),
          (f(!0), h(E, null, U(t.addSkel, (b, y) => (f(), h(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (f(), T(k, {
              key: 0,
              is: K(X)(b.type),
              name: y,
              structure: m(t.addSkel),
              errors: t.errors[y] ? t.errors[y] : [],
              skel: t.formValues,
              onChange: ($) => i(y, $)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (f(), h("div", Il, [
          Cl,
          (f(!0), h(E, null, U(t.addSkel, (g, b) => (f(), h(E, { key: b }, [
            g.visible && g.params.group === "Customer Address" ? (f(), T(k, {
              key: 0,
              is: K(X)(g.type),
              name: b,
              structure: m(t.addSkel),
              errors: t.errors[b] ? t.errors[b] : [],
              skel: t.formValues,
              onChange: (y) => i(b, y)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ])) : _("", !0),
        c("div", { class: "viur-shop-form-btn-wrap" }, [
          c("sl-button", {
            size: "medium",
            onClick: r,
            title: "Lieferadresse entfernen"
          }, jl),
          c("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: a
          }, [
            Bl,
            j(" Lieferadresse hinzufügen ")
          ])
        ]),
        c("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: s,
          closable: ""
        }, [
          Dl,
          c("strong", null, B(t.amountAlert.title), 1),
          Vl,
          j(" " + B(t.amountAlert.msg), 1)
        ], 512),
        c("sl-checkbox", {
          onSlChange: o,
          checked: ""
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Rl = /* @__PURE__ */ I(Nl, [["__scopeId", "data-v-a4accf28"]]), Xe = {
  __name: "ExampleUsage",
  setup(e) {
    const n = re(), t = S(
      () => n.state.basketRootNode.key ? n.state.basketRootNode.key : ""
    ), l = w({
      rootNode: {},
      tabs: {
        cart: {
          component: H(_e),
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
          component: H(we),
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
          component: H(bl),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "order-confirmed", library: "hsk" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: H(kl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "user", library: "hsk" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: H(Rl),
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
    return x(async () => {
      await n.init(), await n.getAdressStructure(), console.log("debug init exampleusage :", n.state.basketRootNode);
    }), (o, a) => (f(), T(ol, {
      tabs: l.tabs,
      onTabChange: s
    }, null, 8, ["tabs"]));
  }
}, Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" })), Ul = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = ht();
    return { state: w({}), route: t };
  }
}), Tl = { class: "home" };
function Pl(e, n, t, l, s, o) {
  return f(), h("div", Tl, "View " + B(e.route.path) + " is missing.", 1);
}
const Ml = /* @__PURE__ */ I(Ul, [["render", Pl]]), Wl = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: Ml
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-DLR9I242.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-DRYuO8SK.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Rs)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => Ll)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Zs)
  }
];
function Zl(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(Wl), bt({
    // @ts-ignore
    history: vt("/"),
    routes: t
  });
}
const Jl = {
  install(e) {
    e.component("CartView", _e), e.component("ExampleUsage", Xe), e.component("ConfirmView", we);
  }
};
export {
  _e as C,
  Jl as V,
  I as _,
  Xe as a,
  we as b,
  Zl as c,
  re as u
};
