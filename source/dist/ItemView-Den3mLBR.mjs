import { reactive as Ft, onBeforeMount as Wt, openBlock as Kt, createElementBlock as Jt, Fragment as Yt, createElementVNode as p, toDisplayString as lt, withModifiers as Zt, createTextVNode as Tt, createVNode as Gt, pushScopeId as Qt, popScopeId as Xt } from "vue";
import { Request as ct } from "@viur/vue-utils";
import { useRoute as te } from "vue-router";
import { I as ee } from "./ItemCard-Cyjlw1FW.mjs";
import { w as se, a as ie, g as ht, _ as oe } from "./main-BAXph9jY.mjs";
var Lt = Object.defineProperty, re = Object.getOwnPropertyDescriptor, dt = Object.getOwnPropertySymbols, ne = Object.prototype.hasOwnProperty, ae = Object.prototype.propertyIsEnumerable, ut = (s, t, e) => t in s ? Lt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, It = (s, t) => {
  for (var e in t || (t = {}))
    ne.call(t, e) && ut(s, e, t[e]);
  if (dt)
    for (var e of dt(t))
      ae.call(t, e) && ut(s, e, t[e]);
  return s;
}, c = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? re(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && Lt(t, e, o), o;
};
function pt(s, t, e) {
  const i = (o) => Object.is(o, -0) ? 0 : o;
  return s < t ? i(t) : s > e ? i(e) : i(s);
}
var le = class {
  constructor(s, t) {
    this.timerId = 0, this.activeInteractions = 0, this.paused = !1, this.stopped = !0, this.pause = () => {
      this.activeInteractions++ || (this.paused = !0, this.host.requestUpdate());
    }, this.resume = () => {
      --this.activeInteractions || (this.paused = !1, this.host.requestUpdate());
    }, s.addController(this), this.host = s, this.tickCallback = t;
  }
  hostConnected() {
    this.host.addEventListener("mouseenter", this.pause), this.host.addEventListener("mouseleave", this.resume), this.host.addEventListener("focusin", this.pause), this.host.addEventListener("focusout", this.resume), this.host.addEventListener("touchstart", this.pause, { passive: !0 }), this.host.addEventListener("touchend", this.resume);
  }
  hostDisconnected() {
    this.stop(), this.host.removeEventListener("mouseenter", this.pause), this.host.removeEventListener("mouseleave", this.resume), this.host.removeEventListener("focusin", this.pause), this.host.removeEventListener("focusout", this.resume), this.host.removeEventListener("touchstart", this.pause), this.host.removeEventListener("touchend", this.resume);
  }
  start(s) {
    this.stop(), this.stopped = !1, this.timerId = window.setInterval(() => {
      this.paused || this.tickCallback();
    }, s);
  }
  stop() {
    clearInterval(this.timerId), this.stopped = !0, this.host.requestUpdate();
  }
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, ot = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), gt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ot && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ce = (s) => new Ut(typeof s == "string" ? s : s + "", void 0, rt), nt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[r + 1], s[0]);
  return new Ut(e, s, rt);
}, he = (s, t) => {
  if (ot) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = W.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, vt = ot ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ce(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: de, defineProperty: ue, getOwnPropertyDescriptor: pe, getOwnPropertyNames: ge, getOwnPropertySymbols: ve, getPrototypeOf: me } = Object, w = globalThis, mt = w.trustedTypes, fe = mt ? mt.emptyScript : "", G = w.reactiveElementPolyfillSupport, R = (s, t) => s, K = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? fe : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (s, t) => !de(s, t), ft = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: at };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class T extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && ue(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: r } = pe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return o == null ? void 0 : o.call(this);
    }, set(n) {
      const l = o == null ? void 0 : o.call(this);
      r.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, i = [...ge(e), ...ve(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(vt(o));
    } else t !== void 0 && e.push(vt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return he(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EC(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : K).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : K;
      this._$Em = o, this[o] = l.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? at)(this[t], e)) return;
      this.P(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) n.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.P(r, this[r], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(e)) : this._$EU();
    } catch (o) {
      throw t = !1, this._$EU(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[R("elementProperties")] = /* @__PURE__ */ new Map(), T[R("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: T }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, J = N.trustedTypes, _t = J ? J.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Mt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + $, _e = `<${Ot}>`, C = document, D = () => C.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", kt = Array.isArray, ye = (s) => kt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, bt = />/g, S = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $t = /'/g, wt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, be = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), y = be(1), P = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), St = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function Nt(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(t) : t;
}
const $e = (s, t) => {
  const e = s.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : "", n = O;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let d, g, h = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, g = n.exec(a), g !== null); ) _ = n.lastIndex, n === O ? g[1] === "!--" ? n = yt : g[1] !== void 0 ? n = bt : g[2] !== void 0 ? (Rt.test(g[2]) && (o = RegExp("</" + g[2], "g")), n = S) : g[3] !== void 0 && (n = S) : n === S ? g[0] === ">" ? (n = o ?? O, h = -1) : g[1] === void 0 ? h = -2 : (h = n.lastIndex - g[2].length, d = g[1], n = g[3] === void 0 ? S : g[3] === '"' ? wt : $t) : n === wt || n === $t ? n = S : n === yt || n === bt ? n = O : (n = S, o = void 0);
    const b = n === S && s[l + 1].startsWith("/>") ? " " : "";
    r += n === O ? a + _e : h >= 0 ? (i.push(d), a.slice(0, h) + Mt + a.slice(h) + $ + b) : a + $ + (h === -2 ? l : b);
  }
  return [Nt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class j {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, g] = $e(t, e);
    if (this.el = j.createElement(d, i), E.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = E.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Mt)) {
          const _ = g[n++], b = o.getAttribute(h).split($), q = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: r, name: q[2], strings: b, ctor: q[1] === "." ? Se : q[1] === "?" ? Ae : q[1] === "@" ? Ee : Y }), o.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: r }), o.removeAttribute(h));
        if (Rt.test(o.tagName)) {
          const h = o.textContent.split($), _ = h.length - 1;
          if (_ > 0) {
            o.textContent = J ? J.emptyScript : "";
            for (let b = 0; b < _; b++) o.append(h[b], D()), E.nextNode(), a.push({ type: 2, index: ++r });
            o.append(h[_], D());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ot) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = o.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(s, t, e = s, i) {
  var n, l;
  if (t === P) return t;
  let o = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const r = H(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), r === void 0 ? o = void 0 : (o = new r(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = I(s, o._$AS(s, t.values), o, i)), t;
}
class we {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? C).importNode(e, !0);
    E.currentNode = o;
    let r = E.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new B(r, r.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (d = new Ce(r, this, t)), this._$AV.push(d), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (r = E.nextNode(), n++);
    }
    return E.currentNode = C, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class B {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = I(this, t, e), H(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ye(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== v && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = j.createElement(Nt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(e);
    else {
      const n = new we(o, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = St.get(t.strings);
    return e === void 0 && St.set(t.strings, e = new j(t)), e;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const r of t) o === e.length ? e.push(i = new B(this.S(D()), this.S(D()), this, this.options)) : i = e[o], i._$AI(r), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, r) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, e = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = I(this, t, e, 0), n = !H(t) || t !== this._$AH && t !== P, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = r[0], a = 0; a < r.length - 1; a++) d = I(this, l[i + a], e, a), d === P && (d = this._$AH[a]), n || (n = !H(d) || d !== this._$AH[a]), d === v ? t = v : t !== v && (t += (d ?? "") + r[a + 1]), this._$AH[a] = d;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Se extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Ae extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class Ee extends Y {
  constructor(t, e, i, o, r) {
    super(t, e, i, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? v) === P) return;
    const i = this._$AH, o = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== v && (i === v || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ce {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const X = N.litHtmlPolyfillSupport;
X == null || X(j, B), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.1.4");
const Pe = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new B(t.insertBefore(D(), r), r, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class z extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return P;
  }
}
var xt;
z._$litElement$ = !0, z.finalized = !0, (xt = globalThis.litElementHydrateSupport) == null || xt.call(globalThis, { LitElement: z });
const tt = globalThis.litElementPolyfillSupport;
tt == null || tt({ LitElement: z });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.6");
var xe = nt`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;
function Te(s, t) {
  return new Promise((e) => {
    function i(o) {
      o.target === s && (s.removeEventListener(t, i), e());
    }
    s.addEventListener(t, i);
  });
}
function At() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const it = /* @__PURE__ */ new Set(), Le = new MutationObserver(jt), L = /* @__PURE__ */ new Map();
let zt = document.documentElement.dir || "ltr", Dt = document.documentElement.lang || navigator.language, A;
Le.observe(document.documentElement, {
  attributes: !0,
  attributeFilter: ["dir", "lang"]
});
function Ht(...s) {
  s.map((t) => {
    const e = t.$code.toLowerCase();
    L.has(e) ? L.set(e, Object.assign(Object.assign({}, L.get(e)), t)) : L.set(e, t), A || (A = t);
  }), jt();
}
function jt() {
  zt = document.documentElement.dir || "ltr", Dt = document.documentElement.lang || navigator.language, [...it.keys()].map((s) => {
    typeof s.requestUpdate == "function" && s.requestUpdate();
  });
}
let Ie = class {
  constructor(t) {
    this.host = t, this.host.addController(this);
  }
  hostConnected() {
    it.add(this.host);
  }
  hostDisconnected() {
    it.delete(this.host);
  }
  dir() {
    return `${this.host.dir || zt}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || Dt}`.toLowerCase();
  }
  getTranslationData(t) {
    var e, i;
    const o = new Intl.Locale(t.replace(/_/g, "-")), r = o == null ? void 0 : o.language.toLowerCase(), n = (i = (e = o == null ? void 0 : o.region) === null || e === void 0 ? void 0 : e.toLowerCase()) !== null && i !== void 0 ? i : "", l = L.get(`${r}-${n}`), a = L.get(r);
    return { locale: o, language: r, region: n, primary: l, secondary: a };
  }
  exists(t, e) {
    var i;
    const { primary: o, secondary: r } = this.getTranslationData((i = e.lang) !== null && i !== void 0 ? i : this.lang());
    return e = Object.assign({ includeFallback: !1 }, e), !!(o && o[t] || r && r[t] || e.includeFallback && A && A[t]);
  }
  term(t, ...e) {
    const { primary: i, secondary: o } = this.getTranslationData(this.lang());
    let r;
    if (i && i[t])
      r = i[t];
    else if (o && o[t])
      r = o[t];
    else if (A && A[t])
      r = A[t];
    else
      return console.error(`No translation found for: ${String(t)}`), String(t);
    return typeof r == "function" ? r(...e) : r;
  }
  date(t, e) {
    return t = new Date(t), new Intl.DateTimeFormat(this.lang(), e).format(t);
  }
  number(t, e) {
    return t = Number(t), isNaN(t) ? "" : new Intl.NumberFormat(this.lang(), e).format(t);
  }
  relativeTime(t, e, i) {
    return new Intl.RelativeTimeFormat(this.lang(), i).format(t, e);
  }
};
var Bt = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (s, t) => `Go to slide ${s} of ${t}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextMonth: "Next month",
  nextSlide: "Next slide",
  numOptionsSelected: (s) => s === 0 ? "No options selected" : s === 1 ? "1 option selected" : `${s} options selected`,
  previousMonth: "Previous month",
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (s) => `Slide ${s}`,
  toggleColorFormat: "Toggle color format"
};
Ht(Bt);
var Ue = Bt, Me = class extends Ie {
};
Ht(Ue);
var Oe = nt`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
function x(s, t) {
  const e = It({
    waitUntilFirstUpdate: !1
  }, t);
  return (i, o) => {
    const { update: r } = i, n = Array.isArray(s) ? s : [s];
    i.update = function(l) {
      n.forEach((a) => {
        const d = a;
        if (l.has(d)) {
          const g = l.get(d), h = this[d];
          g !== h && (!e.waitUntilFirstUpdate || this.hasUpdated) && this[o](g, h);
        }
      }), r.call(this, l);
    };
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: at }, Re = (s = ke, t, e) => {
  const { kind: i, metadata: o } = e;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), r.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s);
    }, init(l) {
      return l !== void 0 && this.P(n, void 0, s), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(s) {
  return (t, e) => typeof e == "object" ? Re(s, t, e) : ((i, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n ? { ...i, wrapped: !0 } : i), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ne(s) {
  return (t, e) => {
    const i = typeof t == "function" ? t : t[e];
    Object.assign(i, s);
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = (s, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(s, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qt(s, t) {
  return (e, i, o) => {
    const r = (n) => {
      var l;
      return ((l = n.renderRoot) == null ? void 0 : l.querySelector(s)) ?? null;
    };
    return ze(e, i, { get() {
      return r(this);
    } });
  };
}
var U = class extends z {
  constructor() {
    super(), Object.entries(this.constructor.dependencies).forEach(([s, t]) => {
      this.constructor.define(s, t);
    });
  }
  emit(s, t) {
    const e = new CustomEvent(s, It({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, t));
    return this.dispatchEvent(e), e;
  }
  /* eslint-enable */
  static define(s, t = this, e = {}) {
    const i = customElements.get(s);
    if (!i) {
      customElements.define(s, class extends t {
      }, e);
      return;
    }
    let o = " (unknown version)", r = o;
    "version" in t && t.version && (o = " v" + t.version), "version" in i && i.version && (r = " v" + i.version), !(o && r && o === r) && console.warn(
      `Attempted to register <${s}>${o}, but <${s}>${r} has already been registered.`
    );
  }
};
U.version = "1.0.6-v2.15.1";
U.dependencies = {};
c([
  m()
], U.prototype, "dir", 2);
c([
  m()
], U.prototype, "lang", 2);
var Vt = nt`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }
`;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = (s, t) => (s == null ? void 0 : s._$litType$) !== void 0;
var k = Symbol(), V = Symbol(), et, st = /* @__PURE__ */ new Map(), f = class extends U {
  constructor() {
    super(...arguments), this.initialRender = !1, this.svg = null, this.label = "", this.library = "default", this.vueonce = !0, this.sprite = !1;
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(s, t) {
    var e;
    let i;
    if (t != null && t.spriteSheet) {
      this.svg = y`<svg part="svg">
        <use part="use" href="${s}"></use>
      </svg>`, await this.updateComplete;
      const o = this.shadowRoot.querySelector("[part='svg']");
      return typeof t.mutator == "function" && t.mutator(o), this.svg;
    }
    try {
      if (i = await fetch(s, { mode: "cors" }), !i.ok)
        return i.status === 410 ? k : V;
    } catch {
      return V;
    }
    try {
      const o = document.createElement("div");
      o.innerHTML = await i.text();
      const r = o.firstElementChild;
      if (((e = r == null ? void 0 : r.tagName) == null ? void 0 : e.toLowerCase()) !== "svg")
        return k;
      et || (et = new DOMParser());
      const l = et.parseFromString(r.outerHTML, "text/html").body.querySelector("svg");
      return l ? (l.part.add("svg"), document.adoptNode(l)) : k;
    } catch {
      return k;
    }
  }
  connectedCallback() {
    super.connectedCallback(), se(this);
  }
  firstUpdated() {
    this.sprite || this.setIcon(), this.initialRender = !0, this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ie(this);
  }
  getIconSource(s = !1) {
    const t = ht(this.library);
    return this.name && t ? {
      url: t.resolver(this.name, s),
      fromLibrary: !0
    } : {
      url: this.src,
      fromLibrary: !1
    };
  }
  getDir() {
    const { url: s } = this.getIconSource(!0);
    return s == null ? void 0 : s.substring(0, s == null ? void 0 : s.lastIndexOf("/"));
  }
  // Fetches the icon and redraws it. Used to handle library registrations.
  redraw() {
    this.sprite || this.setIcon();
  }
  handleLabelChange() {
    typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
  }
  async setIcon() {
    var s;
    const { url: t, fromLibrary: e } = this.getIconSource(), i = e ? ht(this.library) : void 0;
    if (!t) {
      this.svg = null;
      return;
    }
    let o = st.get(t);
    if (o || (o = this.resolveIcon(t, i), st.set(t, o)), !this.initialRender)
      return;
    const r = await o;
    if (r === V && st.delete(t), t === this.getIconSource().url) {
      if (De(r)) {
        this.svg = r;
        return;
      }
      switch (r) {
        case V:
        case k:
          this.svg = null, this.emit("sl-error");
          break;
        default:
          this.svg = r.cloneNode(!0), (s = i == null ? void 0 : i.mutator) == null || s.call(i, this.svg), this.emit("sl-load");
      }
    }
  }
  handleChange() {
    this.sprite || this.setIcon();
  }
  render() {
    return y`
    ${this.sprite ? y`<svg width="1em" height="1em">
            <use href="${this.getDir()}/_sprite.svg#${this.name}"></use>
          </svg>` : y`${this.svg}`}`;
  }
};
f.styles = [Vt, Oe];
c([
  Z()
], f.prototype, "svg", 2);
c([
  m({ reflect: !0 })
], f.prototype, "name", 2);
c([
  m()
], f.prototype, "src", 2);
c([
  m()
], f.prototype, "label", 2);
c([
  m({ reflect: !0 })
], f.prototype, "library", 2);
c([
  m({ reflect: !0, type: Boolean, attribute: "v-once" })
], f.prototype, "vueonce", 2);
c([
  m({ reflect: !0, type: Boolean })
], f.prototype, "sprite", 2);
c([
  x("label")
], f.prototype, "handleLabelChange", 1);
c([
  x(["name", "src", "library"])
], f.prototype, "setIcon", 1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, je = (s) => (...t) => ({ _$litDirective$: s, values: t });
class Be {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = je(class extends Be {
  constructor(s) {
    var t;
    if (super(s), s.type !== He.ATTRIBUTE || s.name !== "class" || ((t = s.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return " " + Object.keys(s).filter((t) => s[t]).join(" ") + " ";
  }
  update(s, [t]) {
    var i, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), s.strings !== void 0 && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in t) t[r] && !((i = this.nt) != null && i.has(r)) && this.st.add(r);
      return this.render(t);
    }
    const e = s.element.classList;
    for (const r of this.st) r in t || (e.remove(r), this.st.delete(r));
    for (const r in t) {
      const n = !!t[r];
      n === this.st.has(r) || (o = this.nt) != null && o.has(r) || (n ? (e.add(r), this.st.add(r)) : (e.remove(r), this.st.delete(r)));
    }
    return P;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* Et(s, t) {
  if (s !== void 0) {
    let e = 0;
    for (const i of s) yield t(i, e++);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* Ct(s, t, e = 1) {
  const i = t === void 0 ? 0 : s;
  t ?? (t = s);
  for (let o = i; e > 0 ? o < t : t < o; o += e) yield o;
}
var qe = (s, t) => {
  let e = 0;
  return function(...i) {
    window.clearTimeout(e), e = window.setTimeout(() => {
      s.call(this, ...i);
    }, t);
  };
}, Pt = (s, t, e) => {
  const i = s[t];
  s[t] = function(...o) {
    i.call(this, ...o), e.call(this, i, ...o);
  };
}, Ve = "onscrollend" in window;
if (!Ve) {
  const s = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new WeakMap(), e = (o) => {
    for (const r of o.changedTouches)
      s.add(r.identifier);
  }, i = (o) => {
    for (const r of o.changedTouches)
      s.delete(r.identifier);
  };
  document.addEventListener("touchstart", e, !0), document.addEventListener("touchend", i, !0), document.addEventListener("touchcancel", i, !0), Pt(EventTarget.prototype, "addEventListener", function(o, r) {
    if (r !== "scrollend")
      return;
    const n = qe(() => {
      s.size ? n() : this.dispatchEvent(new Event("scrollend"));
    }, 100);
    o.call(this, "scroll", n, { passive: !0 }), t.set(this, n);
  }), Pt(EventTarget.prototype, "removeEventListener", function(o, r) {
    if (r !== "scrollend")
      return;
    const n = t.get(this);
    n && o.call(this, "scroll", n, { passive: !0 });
  });
}
var u = class extends U {
  constructor() {
    super(...arguments), this.loop = !1, this.navigation = !1, this.pagination = !1, this.autoplay = !1, this.autoplayInterval = 3e3, this.slidesPerPage = 1, this.slidesPerMove = 1, this.orientation = "horizontal", this.mouseDragging = !1, this.activeSlide = 0, this.scrolling = !1, this.dragging = !1, this.autoplayController = new le(this, () => this.next()), this.localize = new Me(this), this.handleMouseDrag = (s) => {
      this.dragging || (this.scrollContainer.style.setProperty("scroll-snap-type", "none"), this.dragging = !0), this.scrollContainer.scrollBy({
        left: -s.movementX,
        top: -s.movementY,
        behavior: "instant"
      });
    }, this.handleMouseDragEnd = () => {
      const s = this.scrollContainer;
      document.removeEventListener("pointermove", this.handleMouseDrag, { capture: !0 });
      const t = s.scrollLeft, e = s.scrollTop;
      s.style.removeProperty("scroll-snap-type"), s.style.setProperty("overflow", "hidden");
      const i = s.scrollLeft, o = s.scrollTop;
      s.style.removeProperty("overflow"), s.style.setProperty("scroll-snap-type", "none"), s.scrollTo({ left: t, top: e, behavior: "instant" }), requestAnimationFrame(async () => {
        (t !== i || e !== o) && (s.scrollTo({
          left: i,
          top: o,
          behavior: At() ? "auto" : "smooth"
        }), await Te(s, "scrollend")), s.style.removeProperty("scroll-snap-type"), this.dragging = !1, this.handleScrollEnd();
      });
    }, this.handleSlotChange = (s) => {
      s.some(
        (e) => [...e.addedNodes, ...e.removedNodes].some(
          (i) => this.isCarouselItem(i) && !i.hasAttribute("data-clone")
        )
      ) && this.initializeSlides(), this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "region"), this.setAttribute("aria-label", this.localize.term("carousel"));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver.disconnect();
  }
  firstUpdated() {
    this.initializeSlides(), this.mutationObserver = new MutationObserver(this.handleSlotChange), this.mutationObserver.observe(this, {
      childList: !0,
      subtree: !0
    });
  }
  willUpdate(s) {
    (s.has("slidesPerMove") || s.has("slidesPerPage")) && (this.slidesPerMove = Math.min(this.slidesPerMove, this.slidesPerPage));
  }
  getPageCount() {
    const s = this.getSlides().length, { slidesPerPage: t, slidesPerMove: e, loop: i } = this, o = i ? s / e : (s - t) / e + 1;
    return Math.ceil(o);
  }
  getCurrentPage() {
    return Math.ceil(this.activeSlide / this.slidesPerMove);
  }
  getShadowSlideCount() {
    return this.slidesPerPage - this.getSlides().length % this.slidesPerPage;
  }
  canScrollNext() {
    return this.loop || this.getCurrentPage() < this.getPageCount() - 1;
  }
  canScrollPrev() {
    return this.loop || this.getCurrentPage() > 0;
  }
  /** @internal Gets all carousel items. */
  getSlides({ excludeClones: s = !0 } = {}) {
    return [...this.children].filter(
      (t) => this.isCarouselItem(t) && (!s || !t.hasAttribute("data-clone"))
    );
  }
  handleKeyDown(s) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(s.key)) {
      const t = s.target, e = this.localize.dir() === "rtl", i = t.closest('[part~="pagination-item"]') !== null, o = s.key === "ArrowDown" || !e && s.key === "ArrowRight" || e && s.key === "ArrowLeft", r = s.key === "ArrowUp" || !e && s.key === "ArrowLeft" || e && s.key === "ArrowRight";
      s.preventDefault(), r && this.previous(), o && this.next(), s.key === "Home" && this.goToSlide(0), s.key === "End" && this.goToSlide(this.getSlides().length - 1), i && this.updateComplete.then(() => {
        var n;
        const l = (n = this.shadowRoot) == null ? void 0 : n.querySelector(
          '[part~="pagination-item--active"]'
        );
        l && l.focus();
      });
    }
  }
  handleMouseDragStart(s) {
    this.mouseDragging && s.button === 0 && (s.preventDefault(), document.addEventListener("pointermove", this.handleMouseDrag, { capture: !0, passive: !0 }), document.addEventListener("pointerup", this.handleMouseDragEnd, { capture: !0, once: !0 }));
  }
  handleScroll() {
    this.scrolling = !0;
  }
  /** @internal Synchronizes the slides with the IntersectionObserver API. */
  synchronizeSlides() {
    const s = new IntersectionObserver(
      (t) => {
        s.disconnect();
        for (const i of t) {
          const o = i.target;
          o.toggleAttribute("inert", !i.isIntersecting), o.classList.toggle("--in-view", i.isIntersecting), o.setAttribute("aria-hidden", i.isIntersecting ? "false" : "true");
        }
        const e = t.find((i) => i.isIntersecting);
        if (e)
          if (this.loop && e.target.hasAttribute("data-clone")) {
            const i = Number(e.target.getAttribute("data-clone"));
            this.goToSlide(i, "instant");
          } else {
            const o = this.getSlides().indexOf(e.target);
            this.activeSlide = Math.ceil(o / this.slidesPerMove) * this.slidesPerMove;
          }
      },
      {
        root: this.scrollContainer,
        threshold: 0.6
      }
    );
    this.getSlides({ excludeClones: !1 }).forEach((t) => {
      s.observe(t);
    });
  }
  handleScrollEnd() {
    !this.scrolling || this.dragging || (this.synchronizeSlides(), this.scrolling = !1);
  }
  isCarouselItem(s) {
    return s instanceof Element && s.tagName.toLowerCase() === "sl-carousel-item";
  }
  initializeSlides() {
    this.getSlides({ excludeClones: !1 }).forEach((s, t) => {
      s.classList.remove("--in-view"), s.classList.remove("--is-active"), s.setAttribute("aria-label", this.localize.term("slideNum", t + 1)), s.hasAttribute("data-clone") && s.remove();
    }), this.updateSlidesSnap(), this.loop && this.createClones(), this.synchronizeSlides(), this.goToSlide(this.activeSlide, "auto");
  }
  createClones() {
    const s = this.getSlides(), t = this.slidesPerPage, e = s.slice(-t), i = s.slice(0, t);
    e.reverse().forEach((o, r) => {
      const n = o.cloneNode(!0);
      n.setAttribute("data-clone", String(s.length - r - 1)), this.prepend(n);
    }), i.forEach((o, r) => {
      const n = o.cloneNode(!0);
      n.setAttribute("data-clone", String(r)), this.append(n);
    });
  }
  handelSlideChange() {
    const s = this.getSlides();
    s.forEach((t, e) => {
      t.classList.toggle("--is-active", e === this.activeSlide);
    }), this.hasUpdated && this.emit("sl-slide-change", {
      detail: {
        index: this.activeSlide,
        slide: s[this.activeSlide]
      }
    });
  }
  updateSlidesSnap() {
    const s = this.getSlides(), t = this.slidesPerMove;
    s.forEach((e, i) => {
      (i + t) % t === 0 ? e.style.removeProperty("scroll-snap-align") : e.style.setProperty("scroll-snap-align", "none");
    });
  }
  handleAutoplayChange() {
    this.autoplayController.stop(), this.autoplay && this.autoplayController.start(this.autoplayInterval);
  }
  /**
   * Move the carousel backward by `slides-per-move` slides.
   *
   * @param behavior - The behavior used for scrolling.
   */
  previous(s = "smooth") {
    this.goToSlide(this.activeSlide - this.slidesPerMove, s);
  }
  /**
   * Move the carousel forward by `slides-per-move` slides.
   *
   * @param behavior - The behavior used for scrolling.
   */
  next(s = "smooth") {
    this.goToSlide(this.activeSlide + this.slidesPerMove, s);
  }
  /**
   * Scrolls the carousel to the slide specified by `index`.
   *
   * @param index - The slide index.
   * @param behavior - The behavior used for scrolling.
   */
  goToSlide(s, t = "smooth") {
    const { slidesPerPage: e, loop: i } = this, o = this.getSlides(), r = this.getSlides({ excludeClones: !1 });
    if (!o.length)
      return;
    const n = i ? (s + o.length) % o.length : pt(s, 0, o.length - 1);
    this.activeSlide = n;
    const l = pt(s + (i ? e : 0), 0, r.length - 1), a = r[l];
    this.scrollToSlide(a, At() ? "auto" : t);
  }
  scrollToSlide(s, t = "smooth") {
    const e = this.scrollContainer, i = e.getBoundingClientRect(), o = s.getBoundingClientRect(), r = o.left - i.left, n = o.top - i.top;
    e.scrollTo({
      left: r + e.scrollLeft,
      top: n + e.scrollTop,
      behavior: t
    });
  }
  render() {
    const { slidesPerMove: s, scrolling: t } = this, e = this.getPageCount(), i = this.getCurrentPage(), o = this.canScrollPrev(), r = this.canScrollNext(), n = this.localize.dir() === "ltr";
    return y`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${F({
      carousel__slides: !0,
      "carousel__slides--horizontal": this.orientation === "horizontal",
      "carousel__slides--vertical": this.orientation === "vertical",
      "carousel__slides--dragging": this.dragging
    })}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${t ? "true" : "false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
        >
          <slot></slot>
          ${Et(Ct(this.getShadowSlideCount()), () => y`
            <sl-carousel-item class="shadow-slide"></sl-carousel-item>
            `)}

        </div>

        ${this.navigation ? y`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${F({
      "carousel__navigation-button": !0,
      "carousel__navigation-button--previous": !0,
      "carousel__navigation-button--disabled": !o
    })}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${o ? "false" : "true"}"
                  @click=${o ? () => this.previous() : null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${n ? "chevron-left" : "chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${F({
      "carousel__navigation-button": !0,
      "carousel__navigation-button--next": !0,
      "carousel__navigation-button--disabled": !r
    })}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${r ? "false" : "true"}"
                  @click=${r ? () => this.next() : null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${n ? "chevron-right" : "chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            ` : ""}
        ${this.pagination ? y`
              <div part="pagination" role="tablist" class="carousel__pagination" aria-controls="scroll-container">
                ${Et(Ct(e), (l) => {
      const a = l === i;
      return y`
                    <button
                      part="pagination-item ${a ? "pagination-item--active" : ""}"
                      class="${F({
        "carousel__pagination-item": !0,
        "carousel__pagination-item--active": a
      })}"
                      role="tab"
                      aria-selected="${a ? "true" : "false"}"
                      aria-label="${this.localize.term("goToSlide", l + 1, e)}"
                      tabindex=${a ? "0" : "-1"}
                      @click=${() => this.goToSlide(l * s)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `;
    })}
              </div>
            ` : ""}
      </div>
    `;
  }
};
u.styles = [Vt, xe];
u.dependencies = { "sl-icon": f };
c([
  m({ type: Boolean, reflect: !0 })
], u.prototype, "loop", 2);
c([
  m({ type: Boolean, reflect: !0 })
], u.prototype, "navigation", 2);
c([
  m({ type: Boolean, reflect: !0 })
], u.prototype, "pagination", 2);
c([
  m({ type: Boolean, reflect: !0 })
], u.prototype, "autoplay", 2);
c([
  m({ type: Number, attribute: "autoplay-interval" })
], u.prototype, "autoplayInterval", 2);
c([
  m({ type: Number, attribute: "slides-per-page" })
], u.prototype, "slidesPerPage", 2);
c([
  m({ type: Number, attribute: "slides-per-move" })
], u.prototype, "slidesPerMove", 2);
c([
  m()
], u.prototype, "orientation", 2);
c([
  m({ type: Boolean, reflect: !0, attribute: "mouse-dragging" })
], u.prototype, "mouseDragging", 2);
c([
  qt(".carousel__slides")
], u.prototype, "scrollContainer", 2);
c([
  qt(".carousel__pagination")
], u.prototype, "paginationContainer", 2);
c([
  Z()
], u.prototype, "activeSlide", 2);
c([
  Z()
], u.prototype, "scrolling", 2);
c([
  Z()
], u.prototype, "dragging", 2);
c([
  Ne({ passive: !0 })
], u.prototype, "handleScroll", 1);
c([
  x("loop", { waitUntilFirstUpdate: !0 }),
  x("slidesPerPage", { waitUntilFirstUpdate: !0 })
], u.prototype, "initializeSlides", 1);
c([
  x("activeSlide")
], u.prototype, "handelSlideChange", 1);
c([
  x("slidesPerMove")
], u.prototype, "updateSlidesSnap", 1);
c([
  x("autoplay")
], u.prototype, "handleAutoplayChange", 1);
u.define("sl-carousel");
const M = (s) => (Qt("data-v-720fb199"), s = s(), Xt(), s), Fe = { class: "wrap" }, We = { class: "viur-shop-item-view-image-wrap" }, Ke = {
  class: "viur-shop-item-view-carousel-thumbnails",
  navigation: "",
  loop: ""
}, Je = ["alt", "src"], Ye = { class: "viur-shop-item-view-thumbnails" }, Ze = { class: "viur-shop-item-view-thumbnails-scroller" }, Ge = ["alt", "src"], Qe = { class: "viur-shop-item-view-info-wrap" }, Xe = { class: "viur-shop-item-view-headline" }, ts = /* @__PURE__ */ M(() => /* @__PURE__ */ p("h2", { class: "viur-shop-item-view-subline" }, "B 21 x H 6,5 x T 19 cm", -1)), es = { class: "viur-shop-item-view-price" }, ss = /* @__PURE__ */ M(() => /* @__PURE__ */ p("div", { class: "viur-shop-item-view-paragraph" }, " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ", -1)), is = { class: "viur-shop-item-view-btn-wrap" }, os = /* @__PURE__ */ M(() => /* @__PURE__ */ p("sl-icon", {
  name: "bag-plus",
  slot: "prefix"
}, null, -1)), rs = /* @__PURE__ */ M(() => /* @__PURE__ */ p("sl-button", {
  size: "small",
  outline: "",
  class: "viur-shop-item-view-add-to-favourites-btn",
  variant: "primary",
  title: "Add to favourites"
}, [
  /* @__PURE__ */ p("sl-icon", {
    name: "heart",
    slot: "prefix"
  }),
  /* @__PURE__ */ Tt(" Auf die Wunschliste ")
], -1)), ns = /* @__PURE__ */ M(() => /* @__PURE__ */ p("br", null, null, -1)), as = /* @__PURE__ */ M(() => /* @__PURE__ */ p("h1", { class: "viur-shop-item-view-headline" }, "Ähnliche Artikel", -1)), ls = { class: "viur-shop-item-view-item-grid" }, cs = {
  __name: "ItemView",
  setup(s) {
    const t = te(), e = Ft({
      item: {}
    });
    function i(o) {
      console.log("hier", o.dk_artikel);
      let r = "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
      return o != null && o.dk_artikel.dest.image ? ct.downloadUrlFor(o.dk_artikel.dest.image) : r;
    }
    return Wt(async () => {
      ct.get(`/json/variante/view/${t.params.item}`).then(async (o) => {
        let r = await o.json();
        e.item = r.values;
      });
    }), (o, r) => (Kt(), Jt(Yt, null, [
      p("div", Fe, [
        p("div", We, [
          p("sl-carousel", Ke, [
            p("sl-carousel-item", null, [
              p("img", {
                alt: e.item.shop_name,
                src: i(e.item)
              }, null, 8, Je)
            ])
          ]),
          p("div", Ye, [
            p("div", Ze, [
              p("img", {
                alt: e.item.shop_name,
                class: "viur-shop-item-view-thumbnails-image active",
                src: i(e.item)
              }, null, 8, Ge)
            ])
          ])
        ]),
        p("div", Qe, [
          p("h1", Xe, lt(e.item.shop_name), 1),
          ts,
          p("div", es, lt(e.item.shop_price_retail) + " € ", 1),
          ss,
          p("div", is, [
            p("sl-button", {
              size: "small",
              class: "viur-shop-item-view-add-to-cart-btn",
              variant: "primary",
              title: "Add to cart",
              onClick: r[0] || (r[0] = Zt((n) => o.cartStore.addToCart(o.item.key, o.cartStore.state.currentCart), ["stop"]))
            }, [
              os,
              Tt(" In den Warenkorb ")
            ]),
            rs
          ])
        ])
      ]),
      ns,
      as,
      p("div", ls, [
        Gt(ee, {
          item: e.item
        }, null, 8, ["item"])
      ])
    ], 64));
  }
}, fs = /* @__PURE__ */ oe(cs, [["__scopeId", "data-v-720fb199"]]);
export {
  fs as default
};
