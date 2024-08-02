var et = Object.defineProperty;
var tt = (e, n, t) => n in e ? et(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Ie = (e, n, t) => tt(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as D, inject as C, reactive as w, openBlock as m, createElementBlock as h, normalizeClass as pe, createElementVNode as d, renderSlot as He, pushScopeId as M, popScopeId as q, Fragment as E, createCommentVNode as _, toDisplayString as B, onMounted as R, ref as z, readonly as nt, getCurrentScope as at, onScopeDispose as st, unref as K, computed as S, watchEffect as de, renderList as U, watch as ne, withDirectives as Z, vModelText as se, getCurrentInstance as lt, resolveComponent as ae, createBlock as T, vShow as be, withModifiers as ue, createTextVNode as j, shallowRef as H, provide as oe, onBeforeMount as x, useCssVars as rt, Transition as ot, withCtx as it, createVNode as ut, Teleport as dt, resolveDynamicComponent as ct, mergeProps as ft } from "vue";
import { defineStore as ye } from "pinia";
import { Request as mt } from "@viur/vue-utils";
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
}, Ge = (e) => (M("data-v-141aaf9b"), e = e(), q(), e), yt = ["draggable"], $t = ["disabled"], St = /* @__PURE__ */ Ge(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "grip-vertical"
}, null, -1)), kt = [
  St
], _t = { class: "value" }, wt = ["disabled", "title"], Et = /* @__PURE__ */ Ge(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), At = [
  Et
];
function It(e, n, t, l, s, o) {
  return m(), h("div", {
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
    d("sl-button", {
      disabled: e.boneState.readonly,
      class: "drag-button",
      onMousedown: n[0] || (n[0] = (a) => e.state.isDraggable = !0)
    }, kt, 40, $t),
    d("div", _t, [
      He(e.$slots, "default", {}, void 0, !0)
    ]),
    d("sl-button", {
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
  return m(), h(E, null, [
    d("label", jt, [
      He(e.$slots, "default", {}, void 0, !0),
      _("", !0)
    ]),
    e.state.debug ? (m(), h("div", Bt, [
      d("div", Dt, B(e.name), 1),
      d("pre", null, "    " + B(e.boneState) + `
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
  return e.boneState.bonestructure.type === "raw.json" ? (m(), h("sl-textarea", {
    key: 0,
    disabled: (a = e.boneState) == null ? void 0 : a.readonly,
    value: JSON.stringify(e.value),
    onInput: n[0] || (n[0] = (...r) => e.changeEvent && e.changeEvent(...r))
  }, null, 40, Lt)) : (m(), h("sl-textarea", {
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
  return m(), h("sl-input", {
    disabled: "",
    value: e.value,
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, null, 40, Mt);
}
const Ce = /* @__PURE__ */ I(Pt, [["render", Wt], ["__scopeId", "data-v-b45a1311"]]);
function qt(e) {
  return at() ? (st(e), !0) : !1;
}
function zt(e) {
  return typeof e == "function" ? e() : K(e);
}
const Ft = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function ce(e, n, t = {}) {
  const {
    immediate: l = !0
  } = t, s = z(!1);
  let o = null;
  function a() {
    o && (clearTimeout(o), o = null);
  }
  function i() {
    s.value = !1, a();
  }
  function r(...c) {
    a(), s.value = !0, o = setTimeout(() => {
      s.value = !1, o = null, e(...c);
    }, zt(n));
  }
  return l && (s.value = !0, Ft && r()), qt(i), {
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
      let i = [], r = [], c = /\$\((.*?)\)/g;
      for (; r; ) {
        if (r = c.exec(a), !r) {
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
        let c = r.split("."), u = a;
        for (let f of c)
          u && u !== "-" && f in u && u[f] ? u = u[f] : u = "-";
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
    }), s = z(null);
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
  return m(), h("sl-input", {
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
    const t = C("boneState"), l = w({}), s = z(null);
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
  return m(), h("sl-input", {
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
  return m(), h("sl-input", {
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
  return m(), h("sl-select", {
    disabled: e.boneState.readonly,
    value: e.state.value,
    hoist: "",
    multiple: e.boneState.bonestructure.multiple,
    "max-options-visible": "0",
    clearable: "",
    onSlChange: n[0] || (n[0] = (...a) => e.changeEvent && e.changeEvent(...a))
  }, [
    (m(!0), h(E, null, U(e.convertObjToList(), (a) => (m(), h("sl-option", {
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
  return m(), h("sl-switch", {
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
    }), s = z(null);
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
}), dn = ["disabled"], cn = ["name"], fn = ["name"], mn = { class: "errors" };
function gn(e, n, t, l, s, o) {
  return m(), h(E, null, [
    Z(d("sl-input", {
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
      d("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, cn)
    ], 42, dn), [
      [se, e.state.value1]
    ]),
    e.boneState.readonly ? _("", !0) : Z((m(), h("sl-input", {
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
      d("sl-icon", {
        slot: "suffix",
        name: e.state.equal && e.state.value1.length ? "check" : "x"
      }, null, 8, fn)
    ], 544)), [
      [se, e.state.value2]
    ]),
    d("ul", mn, [
      (m(!0), h(E, null, U(e.state.passwordInfo, (a, i) => (m(), h("li", { key: i }, B(a), 1))), 128)),
      (m(!0), h(E, null, U(e.state.requiredPasswordInfo, (a, i) => (m(), h("li", {
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
        var c, u;
        let i = { default: { name: "Allgemein", bones: [], groupVisible: !1, groupOpen: !0 } };
        for (const [f, p] of Object.entries(l.structure)) {
          let v = "default", k = l.structure[f], g = (c = l.value) == null ? void 0 : c[f];
          (u = p == null ? void 0 : p.params) != null && u.category && (v = p.params.category.toLowerCase()), Object.keys(i).includes(v) ? i[v].bones.push({
            boneName: f,
            boneStructure: k,
            boneValue: g
          }) : i[v] = {
            name: p.params.category,
            bones: [
              {
                boneName: f,
                boneStructure: k,
                boneValue: g
              }
            ]
          }, k.visible === !0 && (i[v].groupVisible = !0);
        }
        let r = {};
        return Object.keys(i).sort().forEach(function(f) {
          r[f] = i[f];
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
        for (const c in i)
          r[i[c][0]] = i[c][1];
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
  return e.state.globalRegistration ? (m(), h("div", vn, [
    (m(!0), h(E, null, U(e.state.formGroups, (i, r) => Z((m(), h("sl-details", {
      key: r,
      summary: i.name,
      open: i.groupOpen
    }, [
      (m(!0), h(E, null, U(i.bones, (c) => Z((m(), T(a, {
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
    ], 8, pn)), [
      [be, i.groupVisible]
    ])), 128))
  ])) : (m(), h("sl-alert", bn, " In Order to use this Bone register the bone component globally in your main file "));
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
  return m(), T(a, {
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
  return m(), h("sl-color-picker", {
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
    }), s = z(null);
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
  return m(), h(E, null, [
    d("sl-input", {
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
    d("ul", In, [
      e.state.minAmount !== -9223372036854776e3 && e.state.minAmount ? (m(), h("li", Cn, B(e.$t("bones.numeric.min", { val: e.state.minAmount })), 1)) : _("", !0),
      e.state.maxAmount !== 9223372036854776e3 && e.state.maxAmount ? (m(), h("li", On, B(e.$t("bones.numeric.max", { val: e.state.maxAmount })), 1)) : _("", !0),
      e.state.precision ? (m(), h("li", jn, B(e.$t("bones.numeric.precision", { val: e.boneState.bonestructure.precision })), 1)) : _("", !0)
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
      for (const f in t)
        if (Array.isArray(t[f]))
          for (let p of t[f])
            u.append(f, p);
        else
          u.append(f, t[f]);
      return u;
    }
    let c = le.post(O.buildUrl(n), r(), null, a, o, i);
    return c.then(function(u) {
      l && l(u.data);
    }).catch(function(u) {
      s && s(u);
    }), c;
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
    amount: c = 30
  } = {}) {
    let u = null;
    Y().state.sKeys.size === 0 && await O.getBatchSkeys(c);
    const f = [...Y().state.sKeys][0];
    return t instanceof FormData ? (t.append("skey", f), Y().state.sKeys.delete(f)) : (t || (t = {}), t.skey = f, Y().state.sKeys.delete(f)), u = O.post(n, {
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
    mode: c = null,
    //          milli  sec  min  Std  Tage
    cacheTime: u = 1e3 * 60 * 60 * 24 * 1
  } = {}) {
    let f = le.get(O.buildUrl(n), t, a, r, i, c);
    return f.then(function(p) {
      l && l(p.data);
    }).catch(function(p) {
      s && s(p);
    }), f;
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
    let c = `/${r}/${n}/view/${t}`;
    return a && (c = `/${r}/${n}/view/${a}/${t}`), O.get(c, {
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
    let c = `/${r}/${n}/edit/${t}`;
    return a && (c = `/${r}/${n}/edit/${a}/${t}`), O.securePost(c, {
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
    let c = `/${r}/${n}/delete/${t}`;
    return a && (c = `/${r}/${n}/delete/${a}/${t}`), O.securePost(c, {
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
          const c = {
            key: i.values.uploadKey,
            skelType: "leaf"
          };
          O.securePost("/vi/file/add", { dataObj: c }).then(async (u) => {
            let f = await u.json();
            f.action === "addSuccess" ? s(f.values) : o(f);
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
    function i(r, c) {
      let u = new URL(r);
      if (c && Object.keys(c).length > 0) {
        const f = new URLSearchParams();
        for (const [p, v] of Object.entries(c))
          if (Array.isArray(v))
            for (const k of v)
              f.append(p, k);
          else
            f.append(p, v);
        u.search = f.toString();
      }
      return u.toString();
    }
    return fetch(i(n, t), le.buildOptions("GET", null, s, o, a)).then(async (r) => {
      if (r.ok)
        return r;
      {
        const c = `${r.status} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
        return Promise.reject(new ie(r.status, r.statusText, c, r));
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
      const c = `${r.statusCode} ${r.statusText}: ${r.headers ? r.headers.get("x-error-descr") : ""}`;
      return Promise.reject(new ie(r.statusCode, r.statusText, c, r.response));
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
      let c = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), O.get(
        `/${Dn.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${c}limit=99`
      ).then(async (u) => {
        var p;
        const f = await u.json();
        s.skellistdata = {};
        for (let v of f.skellist)
          s.skellistdata[v.key] = v;
        return (p = f.skellist) == null ? void 0 : p.map((v) => ({ text: l(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
      });
    }
    function a(r) {
      s.selection = { dest: s.skellistdata[r.detail.item.value] }, n.emit("change", e.name, s.selection, e.lang, e.index);
    }
    function i(r) {
      var u;
      s.selection || (s.selection = {}), (u = s.selection.rel) != null && u[r.name] || (s.selection.rel ? s.selection.rel[r.name] = null : s.selection.rel = { [r.name]: null });
      let c = s.selection.rel[r.name];
      r.lang ? (c === null && (c = {}), Object.keys(c).includes(r.lang) && r.index !== null ? c[r.lang][r.index] = r.value : c[r.lang] = r.value) : r.index !== null ? (c === null && (c = []), c[r.index] = r.value) : c = r.value, Object.keys(s.selection).includes("rel") && s.selection.rel ? s.selection.rel[r.name] = c : s.selection.rel = { [r.name]: c }, Object.keys(s.selection).includes("dest") && n.emit("change", e.name, s.selection, e.lang, e.index);
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
}), Nn = (e) => (M("data-v-61dd72e0"), e = e(), q(), e), Rn = { class: "record" }, Ln = { class: "single-entry" }, Un = ["value"], Tn = ["disabled", "source"], Pn = ["title"], Mn = /* @__PURE__ */ Nn(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Wn = [
  Mn
];
function qn(e, n, t, l, s, o) {
  var i, r;
  const a = ae("Wrapper_nested");
  return m(), h("div", Rn, [
    d("div", Ln, [
      e.state.selection ? (m(), h("sl-input", {
        key: 0,
        disabled: !0,
        value: e.value ? e.formatString(e.state.format, e.state.selection) : ""
      }, null, 8, Un)) : (m(), h("sl-combobox", {
        key: 1,
        disabled: e.boneState.readonly,
        source: e.getList,
        hoist: "",
        onSlItemSelect: n[0] || (n[0] = (...c) => e.changeEvent && e.changeEvent(...c))
      }, null, 40, Tn)),
      !e.boneState.multiple && !e.boneState.isEmpty ? (m(), h("sl-button", {
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
    (i = e.boneState) != null && i.bonestructure.using ? (m(), T(a, {
      key: 0,
      value: (r = e.value) == null ? void 0 : r.rel,
      name: e.name,
      index: e.index,
      disabled: e.boneState.bonestructure.readonly,
      onChange: e.changeEventNested
    }, null, 8, ["value", "name", "index", "disabled", "onChange"])) : _("", !0)
  ]);
}
const Te = /* @__PURE__ */ I(Vn, [["render", qn], ["__scopeId", "data-v-61dd72e0"]]), zn = D({
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
  return m(), h("div", Fn, B(e.value), 1);
}
const Hn = /* @__PURE__ */ I(zn, [["render", Kn], ["__scopeId", "data-v-343aca69"]]);
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
    const t = C("boneState"), l = z(), s = w({
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
      const f = {
        fileName: u.name,
        mimeType: u.type || "application/octet-stream",
        size: u.size.toString()
      };
      return new Promise((p, v) => {
        O.securePost(`/${Pe.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: f }).then(async (k) => {
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
      for (let f of u.target.files) {
        let p = await i(f);
        l.value.value = null, n.emit("change", e.name, { dest: p, rel: null }, e.lang, e.index);
      }
      s.loading = !1;
    }
    async function c(u) {
      s.loading = !0, s.droparea = !1;
      for (let f of u.dataTransfer.files) {
        let p = await i(f);
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
      handleDrop: c
    };
  }
}), fe = (e) => (M("data-v-91086308"), e = e(), q(), e), Zn = {
  key: 0,
  class: "loader"
}, Jn = /* @__PURE__ */ fe(() => /* @__PURE__ */ d("sl-spinner", { slot: "suffix" }, null, -1)), Qn = [
  Jn
], Yn = {
  key: 1,
  class: "droparea"
}, Xn = ["title"], xn = /* @__PURE__ */ fe(() => /* @__PURE__ */ d("sl-icon", { name: "upload" }, null, -1)), ea = [
  xn
], ta = ["multiple"], na = ["title"], aa = /* @__PURE__ */ fe(() => /* @__PURE__ */ d("sl-icon", {
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
}, ca = { key: 2 }, fa = ["title"], ma = /* @__PURE__ */ fe(() => /* @__PURE__ */ d("sl-icon", { name: "x-lg" }, null, -1)), ga = [
  ma
];
function ha(e, n, t, l, s, o) {
  var a, i, r, c, u, f, p, v, k, g;
  return m(), h("div", {
    class: "file-wrapper",
    onDragover: n[5] || (n[5] = ue((b) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[6] || (n[6] = (b) => e.state.droparea = !1),
    onDrop: n[7] || (n[7] = ue((...b) => e.handleDrop && e.handleDrop(...b), ["prevent"]))
  }, [
    e.state.loading ? (m(), h("div", Zn, Qn)) : _("", !0),
    e.state.droparea ? (m(), h("div", Yn, " Dateien hier hinziehen ")) : _("", !0),
    !e.boneState.readonly && (!e.value || e.state.loading) ? (m(), h("sl-button", {
      key: 2,
      title: e.$t("bone.upload"),
      outline: "",
      class: "upload-btn",
      onClick: n[0] || (n[0] = (b) => e.uploadinput.click())
    }, ea, 8, Xn)) : _("", !0),
    d("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...b) => e.handleUpload && e.handleUpload(...b))
    }, null, 40, ta),
    e.value ? (m(), h("sl-button", {
      key: 3,
      title: e.$t("bone.download"),
      onClick: n[2] || (n[2] = (...b) => e.downloadFile && e.downloadFile(...b))
    }, sa, 8, na)) : _("", !0),
    d("div", la, [
      (i = (a = e.value) == null ? void 0 : a.dest) != null && i.mimetype.includes("image") ? (m(), h("div", {
        key: 0,
        class: "preview has-preview",
        onClick: n[3] || (n[3] = (b) => e.state.previewopen = !e.state.previewopen)
      }, [
        d("img", {
          class: "preview-img",
          src: e.createBackgroundImage(),
          alt: ""
        }, null, 8, ra),
        d("sl-dialog", {
          label: decodeURIComponent((c = (r = e.value) == null ? void 0 : r.dest) == null ? void 0 : c.name),
          class: "preview-overlay",
          open: e.state.previewopen
        }, [
          d("img", {
            src: e.createBackgroundImage(),
            alt: ""
          }, null, 8, ia)
        ], 8, oa)
      ])) : (m(), h("div", ua, [
        (f = (u = e.value) == null ? void 0 : u.dest) != null && f.name ? (m(), h("sl-icon", da)) : _("", !0)
      ])),
      (v = (p = e.value) == null ? void 0 : p.dest) != null && v.name ? (m(), h("div", ca, B(decodeURIComponent((g = (k = e.value) == null ? void 0 : k.dest) == null ? void 0 : g.name)), 1)) : _("", !0)
    ]),
    e.boneState.multiple ? _("", !0) : (m(), h("sl-button", {
      key: 4,
      variant: "danger",
      outline: "",
      title: e.$t("bone.del"),
      class: "delete-btn",
      onClick: n[4] || (n[4] = (b) => e.$emit("change", e.name, "", e.lang, e.index))
    }, ga, 8, fa))
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
  var i, r, c, u;
  const a = ae("ckeditor");
  return e.state.editor ? (m(), h(E, { key: 0 }, [
    (i = e.boneState.bonestructure) != null && i.valid_html || (r = e.boneState.bonestructure) != null && r.validHtml ? (m(), T(a, {
      key: 0,
      modelValue: e.state.value,
      "onUpdate:modelValue": n[0] || (n[0] = (f) => e.state.value = f),
      editor: e.state.editor,
      config: e.state.editorConfig,
      disabled: (c = e.boneState) == null ? void 0 : c.readonly,
      onReady: e.onReady,
      onInput: e.changeEvent
    }, null, 8, ["modelValue", "editor", "config", "disabled", "onReady", "onInput"])) : (m(), h("sl-textarea", {
      key: 1,
      disabled: (u = e.boneState) == null ? void 0 : u.readonly,
      value: e.value,
      onInput: n[1] || (n[1] = (...f) => e.changeEventTextarea && e.changeEventTextarea(...f))
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
  return m(), h(E, null, [
    Z(d("sl-input", {
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
    Z(d("sl-input", {
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
const qe = /* @__PURE__ */ I(ya, [["render", ka], ["__scopeId", "data-v-7bc31020"]]), _a = D({
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
        for (let c = l.counter; c--; )
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
}), Je = (e) => (M("data-v-63e75dee"), e = e(), q(), e), wa = { class: "actionbar" }, Ea = ["title"], Aa = /* @__PURE__ */ Je(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ia = [
  Aa
], Ca = ["title"], Oa = /* @__PURE__ */ Je(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function ja(e, n, t, l, s, o) {
  return m(), h("div", wa, [
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.handleRemove(e.lang))
    }, Ia, 8, Ea)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
      key: 1,
      variant: "success",
      title: e.$t("bone.add"),
      outline: "",
      class: "add-btn",
      onClick: n[1] || (n[1] = (a) => e.handleAdd(e.lang))
    }, [
      Oa,
      j(" " + B(e.$t("bone.add")) + " ", 1),
      e.state.counter > 1 ? (m(), h(E, { key: 0 }, [
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
      let c = "";
      return t.bonestructure.type === "relational.tree.leaf.file" ? c = "skelType=leaf&" : t.bonestructure.type === "relational.tree.node.file" && (c = "skelType=node&"), O.get(
        `/${Da.VITE_DEFAULT_RENDERER || "vi"}/${t.bonestructure.module}/list?${c}limit=99`
      ).then(async (u) => {
        var p;
        const f = await u.json();
        return a.skels = f.skellist.reduce((v, k) => (v[k.key] = k, v), {}), (p = f.skellist) == null ? void 0 : p.map((v) => ({ text: s(t.bonestructure.format, { dest: v }), value: v.key, data: v }));
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
}), Qe = (e) => (M("data-v-eeea51c6"), e = e(), q(), e), Na = { class: "actionbar" }, Ra = ["title"], La = /* @__PURE__ */ Qe(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ua = [
  La
], Ta = ["source"], Pa = ["title"], Ma = /* @__PURE__ */ Qe(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1));
function Wa(e, n, t, l, s, o) {
  return m(), h("div", Na, [
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.openSelector())
    }, Ua, 8, Ra)) : _("", !0),
    d("sl-combobox", {
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
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
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
const qa = /* @__PURE__ */ I(Va, [["render", Wa], ["__scopeId", "data-v-eeea51c6"]]);
var ze = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const za = D({
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
    const s = null, o = z(), a = w({
      skels: {},
      uploadinput: null,
      loading: !1,
      droparea: !1,
      hasUsing: S(() => t == null ? void 0 : t.bonestructure.using)
    });
    function i(u) {
      const f = {
        fileName: u.name,
        mimeType: u.type || "application/octet-stream",
        size: u.size.toString()
      };
      return new Promise((p, v) => {
        O.securePost(`/${ze.VITE_DEFAULT_RENDERER || "vi"}/file/getUploadURL`, { dataObj: f }).then(async (k) => {
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
            O.securePost(`/${ze.VITE_DEFAULT_RENDERER || "vi"}/file/add`, { dataObj: y }).then(async ($) => {
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
      for (let f of u.target.files) {
        let p = await i(f);
        o.value.value = null;
        let v = null;
        a.hasUsing && (v = void 0), l(e.lang, { dest: p, rel: v });
      }
      a.loading = !1;
    }
    async function c(u) {
      a.loading = !0, a.droparea = !1;
      for (let f of u.dataTransfer.files) {
        let p = await i(f);
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
      handleDrop: c
    };
  }
}), $e = (e) => (M("data-v-9bac9f8a"), e = e(), q(), e), Fa = ["title"], Ka = /* @__PURE__ */ $e(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "x-lg"
}, null, -1)), Ha = [
  Ka
], Ga = {
  key: 1,
  class: "droparea"
}, Za = ["multiple"], Ja = ["title"], Qa = /* @__PURE__ */ $e(() => /* @__PURE__ */ d("sl-icon", {
  slot: "prefix",
  name: "plus-lg"
}, null, -1)), Ya = [
  Qa
], Xa = ["title"], xa = /* @__PURE__ */ $e(() => /* @__PURE__ */ d("sl-icon", { name: "upload" }, null, -1)), es = {
  key: 0,
  slot: "suffix"
};
function ts(e, n, t, l, s, o) {
  return m(), h("div", {
    class: "actionbar",
    onDragover: n[4] || (n[4] = ue((a) => e.state.droparea = !0, ["prevent"])),
    onDragleave: n[5] || (n[5] = (a) => e.state.droparea = !1),
    onDrop: n[6] || (n[6] = ue((...a) => e.handleDrop && e.handleDrop(...a), ["prevent"]))
  }, [
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
      key: 0,
      variant: "danger",
      title: e.$t("bone.del"),
      outline: "",
      class: "delete-btn",
      onClick: n[0] || (n[0] = (a) => e.openSelector())
    }, Ha, 8, Fa)) : _("", !0),
    e.state.droparea ? (m(), h("div", Ga, " Dateien hier hinziehen ")) : _("", !0),
    d("input", {
      ref: "uploadinput",
      hidden: "",
      type: "file",
      multiple: e.boneState.multiple,
      onChange: n[1] || (n[1] = (...a) => e.handleUpload && e.handleUpload(...a))
    }, null, 40, Za),
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
      key: 2,
      outline: "",
      title: e.$t("bone.list"),
      class: "add-btn",
      onClick: n[2] || (n[2] = (a) => e.addMultipleEntry(e.lang))
    }, Ya, 8, Ja)) : _("", !0),
    e.boneState.multiple && !e.readonly ? (m(), h("sl-button", {
      key: 3,
      variant: "success",
      outline: "",
      title: e.$t("bone.upload"),
      class: "upload-btn",
      onClick: n[3] || (n[3] = (a) => e.uploadinput.click())
    }, [
      xa,
      j(" " + B(e.$t("bone.upload")) + " ", 1),
      e.state.loading ? (m(), h("sl-spinner", es)) : _("", !0)
    ], 8, Xa)) : _("", !0)
  ], 32);
}
const ns = /* @__PURE__ */ I(za, [["render", ts], ["__scopeId", "data-v-9bac9f8a"]]), Se = ye("boneStore", () => {
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
      spatialBone: qe
    }),
    actionbars: H({
      "relational.tree.leaf.file.file": ns,
      "relational.": qa
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
        (c) => c[0].startsWith(i[0] + ".")
      );
      if (r.length > 0) {
        r.sort((c, u) => u.length - c.length);
        for (let c of r)
          if (a.startsWith(c[0]))
            return e.additionalBones[c[0]];
      }
    }
    return a === "date" ? Be : a === "key" ? Ce : a === "str.email" ? je : a === "str" || a.startsWith("str.") ? Oe : a === "select" || a.startsWith("select.") ? De : a === "bool" ? Ve : a === "password" ? Ne : a === "record" ? Re : a === "numeric" || a.startsWith("numeric.") ? Ue : a === "relational.tree.leaf.file.file" ? Me : a === "relational" || a.startsWith("relational.") ? Te : a === "color" ? Le : a === "text" ? We : a === "spatial" ? qe : ve;
  }
  function s(a, i) {
    e.actionbars[a] = i;
  }
  function o(a) {
    if (Object.keys(e.actionbars).includes(a))
      return e.actionbars[a];
    {
      let i = a.split("."), r = Object.entries(e.actionbars).filter(
        (c) => c[0].startsWith(i[0] + ".")
      );
      if (r.length > 0) {
        r.sort((c, u) => u.length - c.length);
        for (let c of r)
          if (a.startsWith(c[0]))
            return e.actionbars[c[0]];
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
        value: c(),
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
        value: c(),
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
    function c() {
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
    function f(g, b = null) {
      var y;
      b ? (y = t.bonevalue) == null || y[b].splice(g, 1) : t.bonevalue.splice(g, 1), n.emit("change", {
        name: e.name,
        value: c(),
        lang: b,
        index: g
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
        lang: b,
        index: g
      });
    }
    function p(g = null) {
      var b;
      g ? (b = t.bonevalue) == null || b[g].splice(0) : t.bonevalue.splice(0), n.emit("change", {
        name: e.name,
        value: c(),
        lang: g
      }), n.emit("change-internal", {
        name: e.name,
        value: c(),
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
      removeMultipleEntry: f,
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
const ls = (e) => (M("data-v-46c45785"), e = e(), q(), e), rs = {
  key: 0,
  class: "loading"
}, os = /* @__PURE__ */ ls(() => /* @__PURE__ */ d("sl-spinner", { class: "loader" }, null, -1)), is = { class: "logo" }, us = ["src"];
function ds(e, n, t, l, s, o) {
  return m(), T(ot, null, {
    default: it(() => [
      t.active ? (m(), h("div", rs, [
        os,
        d("div", is, [
          d("sl-icon", { src: t.logo }, null, 8, us)
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
    (await e.cart_list()).forEach((f) => {
      f.is_root_node && (f.cart_type === "basket" ? n.basketRootNode = f : n.whishlistRootNodes.push(f));
    });
  }
  async function o(u, f) {
    let p = await e.article_add({
      article_key: u,
      parent_cart_key: f
    });
    console.log("addToCart", p);
  }
  async function a(u, f) {
    let p = await e.article_view({
      article_key: u,
      parent_cart_key: f
    });
    console.log("getArticleView", p);
  }
  async function i(u, f) {
    let p = await e.article_remove({
      article_key: u,
      parent_cart_key: f
    });
    console.log("remove Resp", p);
  }
  async function r(u, f, p) {
    let v = await e.article_update({
      article_key: u,
      parent_cart_key: f,
      quantity: p,
      quantity_mode: "replace"
    });
    console.log("update Resp", v);
  }
  async function c() {
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
    getAdressStructure: c,
    getChildren: l
  };
}), fs = {
  __name: "CartNode",
  props: {
    node: { type: Object, required: !0 }
  },
  setup(e) {
    return w({}), (n, t) => (m(), h("pre", null, B(e.node.name), 1));
  }
}, me = (e) => (M("data-v-be87ea38"), e = e(), q(), e), ms = {
  horizontal: "",
  class: "viur-shop-cart-leaf"
}, gs = ["src"], hs = { class: "viur-shop-cart-leaf-headline headline" }, bs = { class: "viur-shop-cart-leaf-artno" }, vs = ["innerHTML"], ps = { class: "viur-shop-cart-leaf-actions" }, ys = /* @__PURE__ */ me(() => /* @__PURE__ */ d("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-cart-leaf-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ d("sl-icon", {
    name: "heart",
    slot: "prefix"
  })
], -1)), $s = /* @__PURE__ */ me(() => /* @__PURE__ */ d("sl-icon", {
  name: "trash",
  slot: "prefix"
}, null, -1)), Ss = [
  $s
], ks = { class: "viur-shop-cart-leaf-quantity" }, _s = { class: "viur-shop-cart-leaf-unitprice" }, ws = /* @__PURE__ */ me(() => /* @__PURE__ */ d("div", { class: "viur-shop-cart-leaf-label" }, "Stückpreis", -1)), Es = ["value"], As = { class: "viur-shop-cart-leaf-price" }, Is = /* @__PURE__ */ me(() => /* @__PURE__ */ d("div", { class: "viur-shop-cart-leaf-label" }, "Gesamtpreis", -1)), Cs = ["value"], Os = {
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
      return r !== void 0 ? mt.downloadUrlFor(r) : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    }
    function a(r, c, u, f) {
      l("updateItem", {
        item: r,
        articleKey: c,
        node: u,
        quantity: f
      });
    }
    function i(r, c, u) {
      l("removeItem", { item: r, articleKey: c, node: u });
    }
    return x(() => {
      s.leaf = t.leaf;
    }), (r, c) => (m(), h("sl-card", ms, [
      d("img", {
        class: "viur-shop-cart-leaf-image",
        slot: "image",
        src: o(s.leaf.shop_image ? s.leaf.shop_image : void 0)
      }, null, 8, gs),
      d("h4", hs, B(s.leaf.shop_name), 1),
      d("h5", bs, B(s.leaf.shop_art_no_or_gtin), 1),
      d("div", {
        class: "viur-shop-cart-leaf-description",
        innerHTML: s.leaf.shop_description
      }, null, 8, vs),
      d("div", ps, [
        ys,
        d("sl-button", {
          size: "small",
          outline: "",
          class: "viur-shop-cart-leaf-delete-btn",
          variant: "primary",
          title: "Remove from cart",
          onClick: c[0] || (c[0] = (u) => i(s.leaf, s.leaf.article.dest.key, e.node))
        }, Ss)
      ]),
      d("div", ks, [
        Z(d("sl-input", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity",
          type: "number",
          label: "Anzahl",
          placeholder: "Number",
          min: "0",
          "onUpdate:modelValue": c[1] || (c[1] = (u) => s.leaf.quantity = u),
          onInput: c[2] || (c[2] = (u) => a(
            s.leaf,
            s.leaf.article.dest.key,
            e.node,
            s.leaf.quantity
          ))
        }, null, 544), [
          [se, s.leaf.quantity]
        ])
      ]),
      d("div", _s, [
        ws,
        d("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail
        }, null, 8, Es),
        j(" " + B(e.leaf.price.retail), 1)
      ]),
      d("div", As, [
        Is,
        d("sl-format-number", {
          class: "viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price",
          lang: "de",
          type: "currency",
          currency: "EUR",
          value: e.leaf.price.retail * e.leaf.quantity
        }, null, 8, Cs),
        j(" " + B(e.leaf.price.retail * e.leaf.quantity), 1)
      ])
    ]));
  }
}, js = /* @__PURE__ */ I(Os, [["__scopeId", "data-v-be87ea38"]]), Ye = (e) => (M("data-v-8dd1e557"), e = e(), q(), e), Bs = { key: 0 }, Ds = /* @__PURE__ */ Ye(() => /* @__PURE__ */ d("p", null, "Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?", -1)), Vs = {
  class: "footer-wrap",
  slot: "footer"
}, Ns = { class: "viur-shop-cart-node" }, Rs = /* @__PURE__ */ Ye(() => /* @__PURE__ */ d("div", { class: "viur-shop-cart-mobile-footer" }, [
  /* @__PURE__ */ d("sl-button", {
    variant: "primary",
    size: "medium"
  }, " Jetzt Bestellen ")
], -1)), Ls = {
  __name: "CartView",
  props: {
    mode: { type: String, default: "basket" },
    cartKey: { type: String, required: !0 },
    sidebar: { type: Boolean, default: !0 }
  },
  setup(e) {
    const n = e, t = re(), l = z(null), s = w({
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
      ), await c(), l.value.hide();
    }
    async function a(f) {
      console.log("updateItem :", f), f.quantity === 0 ? (l.value.show(), s.currentItem = f.item, s.currentNode = f.node) : (await t.updateItem(f.articleKey, f.node.key, f.quantity), await t.init());
    }
    function i(f) {
      console.log("removeItem :", f), l.value.show(), s.currentItem = f.item, s.currentNode = f.node;
    }
    async function r() {
      s.leaves[s.currentNode.key].forEach((f) => {
        f.key === s.currentItem.key && (f.quantity = 1);
      }), s.currentItem = {}, s.currentNode = {};
    }
    async function c() {
      s.nodes = [], s.leaves = {}, await t.init(), await u();
    }
    async function u(f = n.cartKey) {
      console.log("debug getChildren parentKey from comp: ", f);
      const p = await t.getChildren(f);
      console.log("getChildren children: ", p), p.forEach(async (v) => {
        v.skel_type === "node" ? (s.nodes.push(v), await u(v.key)) : (Object.keys(s.leaves).includes(f) || (s.leaves[f] = []), s.leaves[f].push(v));
      });
    }
    return x(async () => {
      await t.init(), await u(), n.mode === "basket" && s.nodes.push(t.state.basketRootNode), console.log("state.nodes test", s.nodes), console.log("state.leaves", s.leaves);
    }), (f, p) => e.cartKey.length ? (m(), h(E, { key: 1 }, [
      d("sl-dialog", {
        ref_key: "confirm",
        ref: l,
        onSlHide: r
      }, [
        Ds,
        d("div", Vs, [
          d("sl-button", {
            variant: "danger",
            onClick: p[0] || (p[0] = (v) => l.value.hide()),
            size: "medium"
          }, " Abbrechen "),
          d("sl-button", {
            variant: "success",
            onClick: o,
            size: "medium"
          }, " Aus Warenkorb entfernen ")
        ])
      ], 544),
      (m(!0), h(E, null, U(s.nodes, (v) => (m(), h("div", Ns, [
        Object.keys(s.leaves).includes(v.key) ? (m(), h(E, { key: 0 }, [
          ut(fs, { node: v }, null, 8, ["node"]),
          (m(!0), h(E, null, U(s.leaves[v.key], (k) => (m(), T(js, {
            key: k.key,
            leaf: k,
            node: v,
            onRemoveItem: i,
            onUpdateItem: a
          }, null, 8, ["leaf", "node"]))), 128))
        ], 64)) : _("", !0)
      ]))), 256)),
      Rs
    ], 64)) : (m(), h("sl-spinner", Bs));
  }
}, _e = /* @__PURE__ */ I(Ls, [["__scopeId", "data-v-8dd1e557"]]), Us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), J = (e) => (M("data-v-b7b745be"), e = e(), q(), e), Ts = {
  key: 1,
  class: "list"
}, Ps = /* @__PURE__ */ J(() => /* @__PURE__ */ d("h2", { class: "viur-shop-cart-headline headline" }, "Bestellung prüfen", -1)), Ms = /* @__PURE__ */ J(() => /* @__PURE__ */ d("br", null, null, -1)), Ws = /* @__PURE__ */ J(() => /* @__PURE__ */ d("div", { class: "viur-shop-cart-address-wrap" }, [
  /* @__PURE__ */ d("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ d("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ j(" Versandadresse "),
      /* @__PURE__ */ d("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ d("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ j(" Roland Brose"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" Speicherstraße 33"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" 44147 Dortmund, DE"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" rb@mausbrand.de"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" 0231 21 34 68 90 ")
  ]),
  /* @__PURE__ */ d("div", { class: "viur-shop-cart-address" }, [
    /* @__PURE__ */ d("div", { class: "viur-shop-cart-address-headline" }, [
      /* @__PURE__ */ j(" Rechnungsadresse "),
      /* @__PURE__ */ d("sl-button", {
        outline: "",
        size: "small"
      }, [
        /* @__PURE__ */ d("sl-icon", {
          name: "pencil",
          slot: "prefix"
        })
      ])
    ]),
    /* @__PURE__ */ j(" Roland Brose"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" Speicherstraße 33"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" 44147 Dortmund, DE"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" rb@mausbrand.de"),
    /* @__PURE__ */ d("br"),
    /* @__PURE__ */ j(" 0231 21 34 68 90 ")
  ])
], -1)), qs = /* @__PURE__ */ J(() => /* @__PURE__ */ d("div", { class: "viur-shop-cart-payment" }, [
  /* @__PURE__ */ d("div", { class: "viur-shop-cart-payment-method" }, [
    /* @__PURE__ */ d("span", null, "Zahlungsmethode:"),
    /* @__PURE__ */ j(" Paypal ")
  ]),
  /* @__PURE__ */ d("sl-button", {
    outline: "",
    size: "small"
  }, [
    /* @__PURE__ */ d("sl-icon", {
      name: "pencil",
      slot: "prefix"
    })
  ])
], -1)), zs = /* @__PURE__ */ J(() => /* @__PURE__ */ d("h2", { class: "viur-shop-cart-headline headline" }, "Warenkorb", -1)), Fs = /* @__PURE__ */ J(() => /* @__PURE__ */ d("br", null, null, -1)), Ks = /* @__PURE__ */ J(() => /* @__PURE__ */ d("h2", { class: "viur-shop-cart-sidebar-headline headline" }, "Jetzt Bestellen", -1)), Hs = /* @__PURE__ */ J(() => /* @__PURE__ */ d("br", null, null, -1)), Gs = { class: "viur-shop-cart-sidebar-btn-wrap" }, Zs = ["variant", "disabled"], Js = {
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
    }), (s, o) => t.cartIsInit ? (m(), h("div", Ts, [
      Ps,
      Ms,
      Ws,
      qs,
      zs,
      Fs,
      (m(), T(dt, { to: "#order_sidebar" }, [
        Ks,
        Hs,
        d("sl-checkbox", { onSlChange: l }, " Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ", 32),
        d("div", Gs, [
          d("sl-button", {
            variant: t.showOrderButton ? "info" : "disabled",
            size: "small",
            disabled: !t.showOrderButton
          }, " Zahlungspflichtig bestellen ", 8, Zs)
        ])
      ]))
    ])) : (m(), T(cs, { key: 0 }));
  }
}, we = /* @__PURE__ */ I(Js, [["__scopeId", "data-v-b7b745be"]]), Qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), Ys = (e) => (M("data-v-0e63188d"), e = e(), q(), e), Xs = { class: "bind viur-shop-wrap" }, xs = ["panel", "disabled"], el = { class: "viur-shop-order-step" }, tl = ["name", "library"], nl = { class: "viur-shop-order-status-text" }, al = {
  key: 0,
  name: "chevron-right",
  class: "viur-shop-order-tab-check"
}, sl = ["name"], ll = ["onClick"], rl = ["onClick"], ol = /* @__PURE__ */ Ys(() => /* @__PURE__ */ d("div", { class: "viur-shop-sidebar-wrap" }, [
  /* @__PURE__ */ d("div", {
    class: "viur-shop-sidebar",
    id: "order_sidebar"
  })
], -1)), il = {
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
    }), o = z(null);
    function a(u) {
      let f = [], p = [];
      for (const v in u)
        u[v].position ? f.push([v, u[v].position]) : f.push([v, 0]);
      return f.sort((v, k) => v[1] - k[1]), f.forEach((v) => {
        p.push(v[0]);
      }), p;
    }
    function i(u) {
      l("tabChange", u);
    }
    function r(u) {
      o.value.show(u);
    }
    function c(u) {
      o.value.show(u);
    }
    return (u, f) => (m(), h("div", Xs, [
      d("sl-tab-group", {
        class: "viur-shop-order-tabgroup",
        noScrollControls: "",
        onSlTabShow: i,
        ref_key: "tabGroup",
        ref: o
      }, [
        (m(!0), h(E, null, U(s.tabNames, (p, v) => (m(), h("sl-tab", {
          class: "viur-shop-order-tab",
          slot: "nav",
          panel: p,
          key: p,
          disabled: e.tabs[p].disabled
        }, [
          d("div", el, [
            d("sl-icon", {
              class: "viur-shop-order-step-icon",
              name: e.tabs[p].icon.name,
              library: e.tabs[p].icon.library
            }, null, 8, tl),
            d("div", nl, B(v + 1) + ". " + B(e.tabs[p].displayName), 1)
          ]),
          v < s.tabNames.length - 1 ? (m(), h("sl-icon", al)) : _("", !0)
        ], 8, xs))), 128)),
        (m(!0), h(E, null, U(s.tabNames, (p, v) => (m(), h("sl-tab-panel", {
          class: "viur-shop-order-tab-panel",
          name: p,
          key: p
        }, [
          (m(), T(ct(e.tabs[p].component), ft({ ref_for: !0 }, e.tabs[p].props ? e.tabs[p].props : ""), null, 16)),
          v !== s.tabNames.length - 1 ? (m(), h("div", {
            key: 0,
            class: pe(["viur-shop-form-footer", { "flex-end": s.isFirstTab(v) }])
          }, [
            Z(d("sl-button", {
              type: "submit",
              onClick: (k) => r(s.tabNames[v - 1])
            }, " Zurück ", 8, ll), [
              [be, v !== 0]
            ]),
            d("sl-button", {
              type: "submit",
              variant: "primary",
              onClick: (k) => c(s.tabNames[v + 1])
            }, " Weiter ", 8, rl)
          ], 2)) : _("", !0)
        ], 8, sl))), 128))
      ], 544),
      ol
    ]));
  }
}, ul = /* @__PURE__ */ I(il, [["__scopeId", "data-v-0e63188d"]]), dl = {}, ge = (e) => (M("data-v-36ccc280"), e = e(), q(), e), cl = { class: "bind" }, fl = /* @__PURE__ */ ge(() => /* @__PURE__ */ d("h1", { class: "headline" }, "Vielen Dank für Ihre Bestellung", -1)), ml = /* @__PURE__ */ ge(() => /* @__PURE__ */ d("br", null, null, -1)), gl = /* @__PURE__ */ ge(() => /* @__PURE__ */ d("p", { class: "paragraph" }, [
  /* @__PURE__ */ d("strong", null, "Ihre Bestellnummer:"),
  /* @__PURE__ */ j(" 123345670 ")
], -1)), hl = /* @__PURE__ */ ge(() => /* @__PURE__ */ d("p", { class: "paragraph" }, [
  /* @__PURE__ */ j(" Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten."),
  /* @__PURE__ */ d("br"),
  /* @__PURE__ */ j(" Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail. "),
  /* @__PURE__ */ d("div", { class: "btn-wrap" }, [
    /* @__PURE__ */ d("sl-button", { size: "medium" }, " Zur Startseite "),
    /* @__PURE__ */ d("sl-button", {
      variant: "primary",
      size: "medium"
    }, " Weiter Einkaufen ")
  ])
], -1)), bl = [
  fl,
  ml,
  gl,
  hl
];
function vl(e, n) {
  return m(), h("div", cl, bl);
}
const pl = /* @__PURE__ */ I(dl, [["render", vl], ["__scopeId", "data-v-36ccc280"]]), Ee = (e) => (M("data-v-b68a2bfa"), e = e(), q(), e), yl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ d("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), $l = /* @__PURE__ */ Ee(() => /* @__PURE__ */ d("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Sl = { key: 0 }, kl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ d("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), _l = {
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
      for (const [r, c] of Object.entries(i.value[0]))
        t.formValues[r] = c;
    }
    function o(a) {
      let i = {};
      return Array.isArray(a) ? (a.forEach((r) => {
        let c = r[0], u = r[1];
        i[c] = u;
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
      return m(), h(E, null, [
        d("div", null, [
          j(" test "),
          yl,
          (m(!0), h(E, null, U(t.addSkel, (c, u) => (m(), h(E, { key: u }, [
            j(B(u) + " ", 1),
            c.visible && c.params.group === "Customer Info" ? (m(), T(r, {
              key: 0,
              is: K(X)(c.type),
              name: u,
              structure: o(t.addSkel),
              errors: t.errors[u] ? t.errors[u] : [],
              skel: t.formValues,
              onChange: (f) => s(u, f),
              class: "viur-shop-form-grid-w-2"
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        d("div", null, [
          $l,
          (m(!0), h(E, null, U(t.addSkel, (c, u) => (m(), h(E, { key: u }, [
            c.visible && c.params.group === "Customer Address" ? (m(), T(r, {
              key: 0,
              is: K(X)(c.type),
              name: u,
              structure: o(t.addSkel),
              errors: t.errors[u] ? t.errors[u] : [],
              skel: t.formValues,
              onChange: (f) => s(u, f)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        t.isCustomAdress ? (m(), h("div", Sl, [
          kl,
          (m(!0), h(E, null, U(t.addSkel, (c, u) => (m(), h(E, { key: u }, [
            c.visible && c.params.group === "Customer Address" ? (m(), T(r, {
              key: 0,
              is: K(X)(c.type),
              name: u,
              structure: o(t.addSkel),
              errors: t.errors[u] ? t.errors[u] : [],
              skel: t.formValues,
              onChange: (f) => s(u, f)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ])) : _("", !0),
        d("sl-checkbox", {
          onSlChange: l,
          checked: ""
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, wl = /* @__PURE__ */ I(_l, [["__scopeId", "data-v-b68a2bfa"]]), ee = (e) => (M("data-v-a4accf28"), e = e(), q(), e), El = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("h2", { class: "viur-shop-form-headline headline" }, "Nutzterdaten", -1)), Al = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("h2", { class: "viur-shop-form-headline headline" }, "Lieferadresse", -1)), Il = ["onSlChange", "onSlClear", "label"], Cl = ["value"], Ol = { key: 0 }, jl = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("h2", { class: "viur-shop-form-headline headline" }, "Rechnungsadresse", -1)), Bl = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("sl-icon", {
  name: "x-lg",
  slot: "prefix"
}, null, -1)), Dl = [
  Bl
], Vl = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("sl-icon", {
  name: "plus-lg",
  slot: "prefix"
}, null, -1)), Nl = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("sl-icon", {
  slot: "icon",
  name: "exclamation-triangle"
}, null, -1)), Rl = /* @__PURE__ */ ee(() => /* @__PURE__ */ d("br", null, null, -1)), Ll = {
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
    }), l = z(null), s = z(null);
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
    function c(p, v) {
      if (console.log(p.target.value), !p.target.value.length) {
        u();
        return;
      }
      t.selectedItem[v] = p.target.value, t.isItemSelected = !0;
    }
    function u(p, v) {
      console.log("clearing..."), delete t.selectedItem[v], t.isItemSelected = !1;
    }
    function f(p) {
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
      await n.getAdressStructure(), t.addSkel = f(n.state.structure.address);
    }), (p, v) => {
      const k = ae("bone");
      return m(), h(E, null, [
        d("div", null, [
          El,
          (m(!0), h(E, null, U(t.addSkel, (g, b) => (m(), h(E, { key: b }, [
            g.visible && g.params.group === "Customer Info" ? (m(), T(k, {
              key: 0,
              is: K(X)(g.type),
              name: b,
              structure: f(t.addSkel),
              errors: t.errors[b] ? t.errors[b] : [],
              skel: t.formValues,
              onChange: (y) => i(b, y),
              class: "viur-shop-form-grid-w-2"
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]),
        Al,
        (m(!0), h(E, null, U(t.shippingAdressAmount, (g) => (m(), h("div", { key: g }, [
          d("sl-select", {
            clearable: "",
            ref_for: !0,
            ref_key: "itemSelection",
            ref: l,
            onSlChange: (b) => c(b, g),
            onSlClear: (b) => u(b, g),
            label: t.selectedItem[g] ? K(n).state.carts[t.selectedItem[g]].info.name : "Warenkorb für Adresse wählen.",
            class: "grid-w-4"
          }, [
            (m(!0), h(E, null, U(K(n).state.carts, (b, y) => (m(), h("sl-option", { value: y }, B(b.info.name), 9, Cl))), 256))
          ], 40, Il),
          (m(!0), h(E, null, U(t.addSkel, (b, y) => (m(), h(E, { key: y }, [
            b.visible && b.params.group === "Customer Address" ? (m(), T(k, {
              key: 0,
              is: K(X)(b.type),
              name: y,
              structure: f(t.addSkel),
              errors: t.errors[y] ? t.errors[y] : [],
              skel: t.formValues,
              onChange: ($) => i(y, $)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ]))), 128)),
        t.isCustomAdress ? (m(), h("div", Ol, [
          jl,
          (m(!0), h(E, null, U(t.addSkel, (g, b) => (m(), h(E, { key: b }, [
            g.visible && g.params.group === "Customer Address" ? (m(), T(k, {
              key: 0,
              is: K(X)(g.type),
              name: b,
              structure: f(t.addSkel),
              errors: t.errors[b] ? t.errors[b] : [],
              skel: t.formValues,
              onChange: (y) => i(b, y)
            }, null, 8, ["is", "name", "structure", "errors", "skel", "onChange"])) : _("", !0)
          ], 64))), 128))
        ])) : _("", !0),
        d("div", { class: "viur-shop-form-btn-wrap" }, [
          d("sl-button", {
            size: "medium",
            onClick: r,
            title: "Lieferadresse entfernen"
          }, Dl),
          d("sl-button", {
            size: "medium",
            variant: "primary",
            onClick: a
          }, [
            Vl,
            j(" Lieferadresse hinzufügen ")
          ])
        ]),
        d("sl-alert", {
          variant: "warning",
          duration: "2000",
          ref_key: "shippingWarning",
          ref: s,
          closable: ""
        }, [
          Nl,
          d("strong", null, B(t.amountAlert.title), 1),
          Rl,
          j(" " + B(t.amountAlert.msg), 1)
        ], 512),
        d("sl-checkbox", {
          onSlChange: o,
          checked: ""
        }, " Rechnungsadresse wie Lieferadresse ", 32)
      ], 64);
    };
  }
}, Ul = /* @__PURE__ */ I(Ll, [["__scopeId", "data-v-a4accf28"]]), Xe = {
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
          component: H(pl),
          props: {},
          displayName: "Bestellung Abgeschlossen",
          icon: { name: "order-confirmed", library: "hsk" },
          position: 6,
          disabled: !0,
          atShow: null,
          atHide: null
        },
        userInfo: {
          component: H(wl),
          props: {},
          displayName: "Daten Eingeben",
          icon: { name: "user", library: "hsk" },
          position: 3,
          disabled: !1,
          atShow: null,
          atHide: null
        },
        userInfoMulti: {
          component: H(Ul),
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
    }), (o, a) => (m(), T(ul, {
      tabs: l.tabs,
      onTabChange: s
    }, null, 8, ["tabs"]));
  }
}, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" })), Pl = D({
  props: {},
  components: {},
  setup(e, n) {
    const t = ht();
    return { state: w({}), route: t };
  }
}), Ml = { class: "home" };
function Wl(e, n, t, l, s, o) {
  return m(), h("div", Ml, "View " + B(e.route.path) + " is missing.", 1);
}
const ql = /* @__PURE__ */ I(Pl, [["render", Wl]]), zl = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: ql
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("./CategoryView-BDsw60Bb.mjs")
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("./ItemView-Dxwh9gVC.mjs")
  },
  {
    path: "/shop/cart/view",
    name: "CartView",
    component: () => Promise.resolve().then(() => Us)
  },
  {
    path: "/shop/order/",
    name: "OrderView",
    component: () => Promise.resolve().then(() => Tl)
  },
  {
    path: "/shop/order/confirm",
    name: "ConfirmView",
    component: () => Promise.resolve().then(() => Qs)
  }
];
function Ql(e, n = !1) {
  let t = [];
  return n ? t = e : t = e.concat(zl), bt({
    // @ts-ignore
    history: vt("/"),
    routes: t
  });
}
const Yl = {
  install(e) {
    e.component("CartView", _e), e.component("ExampleUsage", Xe), e.component("ConfirmView", we);
  }
};
export {
  _e as C,
  Yl as V,
  I as _,
  Xe as a,
  we as b,
  Ql as c,
  re as u
};
