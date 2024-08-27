import { reactive as Yt, onBeforeMount as Gt, openBlock as Qt, createElementBlock as Xt, Fragment as te, createElementVNode as p, toDisplayString as dt, withModifiers as ee, createTextVNode as It, createVNode as se, pushScopeId as ie, popScopeId as re } from "vue";
import { Request as ut } from "@viur/vue-utils";
import { useRoute as oe } from "vue-router";
import { I as ne } from "./ItemCard-BJX2Iokr.mjs";
import { _ as ae } from "./main-CaTAD2ie.mjs";
function pt(s, t, e) {
  const i = (r) => Object.is(r, -0) ? 0 : r;
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
const W = globalThis, at = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lt = Symbol(), gt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (at && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ce = (s) => new Ut(typeof s == "string" ? s : s + "", void 0, lt), ct = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new Ut(e, s, lt);
}, he = (s, t) => {
  if (at) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = W.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, vt = at ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ce(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: de, defineProperty: ue, getOwnPropertyDescriptor: pe, getOwnPropertyNames: ge, getOwnPropertySymbols: ve, getPrototypeOf: fe } = Object, $ = globalThis, ft = $.trustedTypes, me = ft ? ft.emptyScript : "", G = $.reactiveElementPolyfillSupport, O = (s, t) => s, Z = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? me : null;
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
} }, ht = (s, t) => !de(s, t), mt = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class L extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = mt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && ue(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = pe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(n) {
      const l = r == null ? void 0 : r.call(this);
      o.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = fe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...ge(e), ...ve(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(vt(r));
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
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Z).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : Z;
      this._$Em = r, this[r] = l.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? ht)(this[t], e)) return;
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) n.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[O("elementProperties")] = /* @__PURE__ */ new Map(), L[O("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: L }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, K = R.trustedTypes, _t = K ? K.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ot = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Rt = "?" + w, _e = `<${Rt}>`, E = document, B = () => E.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", Nt = Array.isArray, be = (s) => Nt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, yt = />/g, S = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wt = /'/g, $t = /"/g, Bt = /^(?:script|style|textarea|title)$/i, ye = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), b = ye(1), x = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), St = /* @__PURE__ */ new WeakMap(), C = E.createTreeWalker(E, 129);
function Ht(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(t) : t;
}
const we = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : "", n = I;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let d, g, h = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, g = n.exec(a), g !== null); ) _ = n.lastIndex, n === I ? g[1] === "!--" ? n = bt : g[1] !== void 0 ? n = yt : g[2] !== void 0 ? (Bt.test(g[2]) && (r = RegExp("</" + g[2], "g")), n = S) : g[3] !== void 0 && (n = S) : n === S ? g[0] === ">" ? (n = r ?? I, h = -1) : g[1] === void 0 ? h = -2 : (h = n.lastIndex - g[2].length, d = g[1], n = g[3] === void 0 ? S : g[3] === '"' ? $t : wt) : n === $t || n === wt ? n = S : n === bt || n === yt ? n = I : (n = S, r = void 0);
    const y = n === S && s[l + 1].startsWith("/>") ? " " : "";
    o += n === I ? a + _e : h >= 0 ? (i.push(d), a.slice(0, h) + Ot + a.slice(h) + w + y) : a + w + (h === -2 ? l : y);
  }
  return [Ht(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class D {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, g] = we(t, e);
    if (this.el = D.createElement(d, i), C.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = C.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Ot)) {
          const _ = g[n++], y = r.getAttribute(h).split(w), V = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: V[2], strings: y, ctor: V[1] === "." ? Se : V[1] === "?" ? Ae : V[1] === "@" ? Ce : J }), r.removeAttribute(h);
        } else h.startsWith(w) && (a.push({ type: 6, index: o }), r.removeAttribute(h));
        if (Bt.test(r.tagName)) {
          const h = r.textContent.split(w), _ = h.length - 1;
          if (_ > 0) {
            r.textContent = K ? K.emptyScript : "";
            for (let y = 0; y < _; y++) r.append(h[y], B()), C.nextNode(), a.push({ type: 2, index: ++o });
            r.append(h[_], B());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Rt) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(w, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += w.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = E.createElement("template");
    return i.innerHTML = t, i;
  }
}
function k(s, t, e = s, i) {
  var n, l;
  if (t === x) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = H(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = k(s, r._$AS(s, t.values), r, i)), t;
}
class $e {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    C.currentNode = r;
    let o = C.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new j(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Ee(o, this, t)), this._$AV.push(d), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = C.nextNode(), n++);
    }
    return C.currentNode = E, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = k(this, t, e), H(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : be(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== v && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = D.createElement(Ht(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new $e(r, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = St.get(t.strings);
    return e === void 0 && St.set(t.strings, e = new D(t)), e;
  }
  k(t) {
    Nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new j(this.S(B()), this.S(B()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = k(this, t, e, 0), n = !H(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = k(this, l[i + a], e, a), d === x && (d = this._$AH[a]), n || (n = !H(d) || d !== this._$AH[a]), d === v ? t = v : t !== v && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Se extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Ae extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class Ce extends J {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = k(this, t, e, 0) ?? v) === x) return;
    const i = this._$AH, r = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== v && (i === v || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ee {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const X = R.litHtmlPolyfillSupport;
X == null || X(D, j), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.1.4");
const xe = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new j(t.insertBefore(B(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class N extends L {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xe(e, this.renderRoot, this.renderOptions);
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
    return x;
  }
}
var zt;
N._$litElement$ = !0, N.finalized = !0, (zt = globalThis.litElementHydrateSupport) == null || zt.call(globalThis, { LitElement: N });
const tt = globalThis.litElementPolyfillSupport;
tt == null || tt({ LitElement: N });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.6");
var Pe = ct`
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
`, Dt = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, At = Object.getOwnPropertySymbols, Me = Object.prototype.hasOwnProperty, ke = Object.prototype.propertyIsEnumerable, Ct = (s, t, e) => t in s ? Dt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, jt = (s, t) => {
  for (var e in t || (t = {}))
    Me.call(t, e) && Ct(s, e, t[e]);
  if (At)
    for (var e of At(t))
      ke.call(t, e) && Ct(s, e, t[e]);
  return s;
}, c = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Le(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Dt(t, e, r), r;
};
function Te(s, t) {
  return new Promise((e) => {
    function i(r) {
      r.target === s && (s.removeEventListener(t, i), e());
    }
    s.addEventListener(t, i);
  });
}
function Et() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const it = /* @__PURE__ */ new Set(), ze = new MutationObserver(Wt), M = /* @__PURE__ */ new Map();
let Vt = document.documentElement.dir || "ltr", qt = document.documentElement.lang || navigator.language, A;
ze.observe(document.documentElement, {
  attributes: !0,
  attributeFilter: ["dir", "lang"]
});
function Ft(...s) {
  s.map((t) => {
    const e = t.$code.toLowerCase();
    M.has(e) ? M.set(e, Object.assign(Object.assign({}, M.get(e)), t)) : M.set(e, t), A || (A = t);
  }), Wt();
}
function Wt() {
  Vt = document.documentElement.dir || "ltr", qt = document.documentElement.lang || navigator.language, [...it.keys()].map((s) => {
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
    return `${this.host.dir || Vt}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || qt}`.toLowerCase();
  }
  getTranslationData(t) {
    var e, i;
    const r = new Intl.Locale(t.replace(/_/g, "-")), o = r == null ? void 0 : r.language.toLowerCase(), n = (i = (e = r == null ? void 0 : r.region) === null || e === void 0 ? void 0 : e.toLowerCase()) !== null && i !== void 0 ? i : "", l = M.get(`${o}-${n}`), a = M.get(o);
    return { locale: r, language: o, region: n, primary: l, secondary: a };
  }
  exists(t, e) {
    var i;
    const { primary: r, secondary: o } = this.getTranslationData((i = e.lang) !== null && i !== void 0 ? i : this.lang());
    return e = Object.assign({ includeFallback: !1 }, e), !!(r && r[t] || o && o[t] || e.includeFallback && A && A[t]);
  }
  term(t, ...e) {
    const { primary: i, secondary: r } = this.getTranslationData(this.lang());
    let o;
    if (i && i[t])
      o = i[t];
    else if (r && r[t])
      o = r[t];
    else if (A && A[t])
      o = A[t];
    else
      return console.error(`No translation found for: ${String(t)}`), String(t);
    return typeof o == "function" ? o(...e) : o;
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
var Zt = {
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
Ft(Zt);
var Ue = Zt, Oe = class extends Ie {
};
Ft(Ue);
var rt = "";
function xt(s) {
  rt = s;
}
function ot(s = "") {
  if (!rt) {
    const t = [...document.getElementsByTagName("script")], e = t.find((i) => i.hasAttribute("data-shoelace"));
    if (e)
      xt(e.getAttribute("data-shoelace"));
    else {
      const i = t.find((o) => /shoelace(\.min)?\.js($|\?)/.test(o.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src));
      let r = "";
      i && (r = i.getAttribute("src")), xt(r.split("/").slice(0, -1).join("/"));
    }
  }
  return rt.replace(/\/$/, "") + (s ? `/${s.replace(/^\//, "")}` : "");
}
var Re = {
  name: "default",
  resolver: (s, t = !1) => ot(t ? `assets/bootstrap-icons/${s}.svg` : `assets/bootstrap-icons/${s.substring(0, 1)}/${s}.svg`)
}, Ne = Re, Be = {
  name: "viur",
  resolver: (s, t = !1) => ot(`/assets/icons/${s}.svg`),
  mutator: (s) => {
    s.setAttribute("fill", "currentColor"), [...s.querySelectorAll("*")].map((t) => t.setAttribute("fill", "inherit"));
  }
}, He = Be, Pt = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  checked: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="12" height="12" stroke-width="2"></rect>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="6"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `,
  search: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"></path>
    </svg>
  `
}, De = {
  name: "system",
  resolver: (s, t = !1) => s in Pt ? `data:image/svg+xml,${encodeURIComponent(Pt[s])}` : ""
}, je = De, Ve = [He, Ne, je], nt = [];
function qe(s) {
  nt.push(s);
}
function Fe(s) {
  nt = nt.filter((t) => t !== s);
}
function Lt(s) {
  return Ve.find((t) => t.name === s);
}
var We = ct`
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
function P(s, t) {
  const e = jt({
    waitUntilFirstUpdate: !1
  }, t);
  return (i, r) => {
    const { update: o } = i, n = Array.isArray(s) ? s : [s];
    i.update = function(l) {
      n.forEach((a) => {
        const d = a;
        if (l.has(d)) {
          const g = l.get(d), h = this[d];
          g !== h && (!e.waitUntilFirstUpdate || this.hasUpdated) && this[r](g, h);
        }
      }), o.call(this, l);
    };
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ze = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: ht }, Ke = (s = Ze, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), o.set(e.name, s), i === "accessor") {
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
function f(s) {
  return (t, e) => typeof e == "object" ? Ke(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n ? { ...i, wrapped: !0 } : i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Y(s) {
  return f({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Je(s) {
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
const Ye = (s, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(s, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Kt(s, t) {
  return (e, i, r) => {
    const o = (n) => {
      var l;
      return ((l = n.renderRoot) == null ? void 0 : l.querySelector(s)) ?? null;
    };
    return Ye(e, i, { get() {
      return o(this);
    } });
  };
}
var T = class extends N {
  constructor() {
    super(), Object.entries(this.constructor.dependencies).forEach(([s, t]) => {
      this.constructor.define(s, t);
    });
  }
  emit(s, t) {
    const e = new CustomEvent(s, jt({
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
    let r = " (unknown version)", o = r;
    "version" in t && t.version && (r = " v" + t.version), "version" in i && i.version && (o = " v" + i.version), !(r && o && r === o) && console.warn(
      `Attempted to register <${s}>${r}, but <${s}>${o} has already been registered.`
    );
  }
};
T.version = "1.0.6-v2.15.1";
T.dependencies = {};
c([
  f()
], T.prototype, "dir", 2);
c([
  f()
], T.prototype, "lang", 2);
var Jt = ct`
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
const Ge = (s, t) => (s == null ? void 0 : s._$litType$) !== void 0;
var U = Symbol(), q = Symbol(), et, st = /* @__PURE__ */ new Map(), m = class extends T {
  constructor() {
    super(...arguments), this.initialRender = !1, this.svg = null, this.label = "", this.library = "default", this.vueonce = !0, this.sprite = !1;
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(s, t) {
    var e;
    let i;
    if (t != null && t.spriteSheet) {
      this.svg = b`<svg part="svg">
        <use part="use" href="${s}"></use>
      </svg>`, await this.updateComplete;
      const r = this.shadowRoot.querySelector("[part='svg']");
      return typeof t.mutator == "function" && t.mutator(r), this.svg;
    }
    try {
      if (i = await fetch(s, { mode: "cors" }), !i.ok)
        return i.status === 410 ? U : q;
    } catch {
      return q;
    }
    try {
      const r = document.createElement("div");
      r.innerHTML = await i.text();
      const o = r.firstElementChild;
      if (((e = o == null ? void 0 : o.tagName) == null ? void 0 : e.toLowerCase()) !== "svg")
        return U;
      et || (et = new DOMParser());
      const l = et.parseFromString(o.outerHTML, "text/html").body.querySelector("svg");
      return l ? (l.part.add("svg"), document.adoptNode(l)) : U;
    } catch {
      return U;
    }
  }
  connectedCallback() {
    super.connectedCallback(), qe(this);
  }
  firstUpdated() {
    this.sprite || this.setIcon(), this.initialRender = !0, this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Fe(this);
  }
  getIconSource(s = !1) {
    const t = Lt(this.library);
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
    const { url: t, fromLibrary: e } = this.getIconSource(), i = e ? Lt(this.library) : void 0;
    if (!t) {
      this.svg = null;
      return;
    }
    let r = st.get(t);
    if (r || (r = this.resolveIcon(t, i), st.set(t, r)), !this.initialRender)
      return;
    const o = await r;
    if (o === q && st.delete(t), t === this.getIconSource().url) {
      if (Ge(o)) {
        this.svg = o;
        return;
      }
      switch (o) {
        case q:
        case U:
          this.svg = null, this.emit("sl-error");
          break;
        default:
          this.svg = o.cloneNode(!0), (s = i == null ? void 0 : i.mutator) == null || s.call(i, this.svg), this.emit("sl-load");
      }
    }
  }
  handleChange() {
    this.sprite || this.setIcon();
  }
  render() {
    return b`
    ${this.sprite ? b`<svg width="1em" height="1em">
            <use href="${this.getDir()}/_sprite.svg#${this.name}"></use>
          </svg>` : b`${this.svg}`}`;
  }
};
m.styles = [Jt, We];
c([
  Y()
], m.prototype, "svg", 2);
c([
  f({ reflect: !0 })
], m.prototype, "name", 2);
c([
  f()
], m.prototype, "src", 2);
c([
  f()
], m.prototype, "label", 2);
c([
  f({ reflect: !0 })
], m.prototype, "library", 2);
c([
  f({ reflect: !0, type: Boolean, attribute: "v-once" })
], m.prototype, "vueonce", 2);
c([
  f({ reflect: !0, type: Boolean })
], m.prototype, "sprite", 2);
c([
  P("label")
], m.prototype, "handleLabelChange", 1);
c([
  P(["name", "src", "library"])
], m.prototype, "setIcon", 1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Xe = (s) => (...t) => ({ _$litDirective$: s, values: t });
class ts {
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
const F = Xe(class extends ts {
  constructor(s) {
    var t;
    if (super(s), s.type !== Qe.ATTRIBUTE || s.name !== "class" || ((t = s.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return " " + Object.keys(s).filter((t) => s[t]).join(" ") + " ";
  }
  update(s, [t]) {
    var i, r;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), s.strings !== void 0 && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t) t[o] && !((i = this.nt) != null && i.has(o)) && this.st.add(o);
      return this.render(t);
    }
    const e = s.element.classList;
    for (const o of this.st) o in t || (e.remove(o), this.st.delete(o));
    for (const o in t) {
      const n = !!t[o];
      n === this.st.has(o) || (r = this.nt) != null && r.has(o) || (n ? (e.add(o), this.st.add(o)) : (e.remove(o), this.st.delete(o)));
    }
    return x;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* Mt(s, t) {
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
function* kt(s, t, e = 1) {
  const i = t === void 0 ? 0 : s;
  t ?? (t = s);
  for (let r = i; e > 0 ? r < t : t < r; r += e) yield r;
}
var es = (s, t) => {
  let e = 0;
  return function(...i) {
    window.clearTimeout(e), e = window.setTimeout(() => {
      s.call(this, ...i);
    }, t);
  };
}, Tt = (s, t, e) => {
  const i = s[t];
  s[t] = function(...r) {
    i.call(this, ...r), e.call(this, i, ...r);
  };
}, ss = "onscrollend" in window;
if (!ss) {
  const s = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new WeakMap(), e = (r) => {
    for (const o of r.changedTouches)
      s.add(o.identifier);
  }, i = (r) => {
    for (const o of r.changedTouches)
      s.delete(o.identifier);
  };
  document.addEventListener("touchstart", e, !0), document.addEventListener("touchend", i, !0), document.addEventListener("touchcancel", i, !0), Tt(EventTarget.prototype, "addEventListener", function(r, o) {
    if (o !== "scrollend")
      return;
    const n = es(() => {
      s.size ? n() : this.dispatchEvent(new Event("scrollend"));
    }, 100);
    r.call(this, "scroll", n, { passive: !0 }), t.set(this, n);
  }), Tt(EventTarget.prototype, "removeEventListener", function(r, o) {
    if (o !== "scrollend")
      return;
    const n = t.get(this);
    n && r.call(this, "scroll", n, { passive: !0 });
  });
}
var u = class extends T {
  constructor() {
    super(...arguments), this.loop = !1, this.navigation = !1, this.pagination = !1, this.autoplay = !1, this.autoplayInterval = 3e3, this.slidesPerPage = 1, this.slidesPerMove = 1, this.orientation = "horizontal", this.mouseDragging = !1, this.activeSlide = 0, this.scrolling = !1, this.dragging = !1, this.autoplayController = new le(this, () => this.next()), this.localize = new Oe(this), this.handleMouseDrag = (s) => {
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
      const i = s.scrollLeft, r = s.scrollTop;
      s.style.removeProperty("overflow"), s.style.setProperty("scroll-snap-type", "none"), s.scrollTo({ left: t, top: e, behavior: "instant" }), requestAnimationFrame(async () => {
        (t !== i || e !== r) && (s.scrollTo({
          left: i,
          top: r,
          behavior: Et() ? "auto" : "smooth"
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
    const s = this.getSlides().length, { slidesPerPage: t, slidesPerMove: e, loop: i } = this, r = i ? s / e : (s - t) / e + 1;
    return Math.ceil(r);
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
      const t = s.target, e = this.localize.dir() === "rtl", i = t.closest('[part~="pagination-item"]') !== null, r = s.key === "ArrowDown" || !e && s.key === "ArrowRight" || e && s.key === "ArrowLeft", o = s.key === "ArrowUp" || !e && s.key === "ArrowLeft" || e && s.key === "ArrowRight";
      s.preventDefault(), o && this.previous(), r && this.next(), s.key === "Home" && this.goToSlide(0), s.key === "End" && this.goToSlide(this.getSlides().length - 1), i && this.updateComplete.then(() => {
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
          const r = i.target;
          r.toggleAttribute("inert", !i.isIntersecting), r.classList.toggle("--in-view", i.isIntersecting), r.setAttribute("aria-hidden", i.isIntersecting ? "false" : "true");
        }
        const e = t.find((i) => i.isIntersecting);
        if (e)
          if (this.loop && e.target.hasAttribute("data-clone")) {
            const i = Number(e.target.getAttribute("data-clone"));
            this.goToSlide(i, "instant");
          } else {
            const r = this.getSlides().indexOf(e.target);
            this.activeSlide = Math.ceil(r / this.slidesPerMove) * this.slidesPerMove;
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
    e.reverse().forEach((r, o) => {
      const n = r.cloneNode(!0);
      n.setAttribute("data-clone", String(s.length - o - 1)), this.prepend(n);
    }), i.forEach((r, o) => {
      const n = r.cloneNode(!0);
      n.setAttribute("data-clone", String(o)), this.append(n);
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
    const { slidesPerPage: e, loop: i } = this, r = this.getSlides(), o = this.getSlides({ excludeClones: !1 });
    if (!r.length)
      return;
    const n = i ? (s + r.length) % r.length : pt(s, 0, r.length - 1);
    this.activeSlide = n;
    const l = pt(s + (i ? e : 0), 0, o.length - 1), a = o[l];
    this.scrollToSlide(a, Et() ? "auto" : t);
  }
  scrollToSlide(s, t = "smooth") {
    const e = this.scrollContainer, i = e.getBoundingClientRect(), r = s.getBoundingClientRect(), o = r.left - i.left, n = r.top - i.top;
    e.scrollTo({
      left: o + e.scrollLeft,
      top: n + e.scrollTop,
      behavior: t
    });
  }
  render() {
    const { slidesPerMove: s, scrolling: t } = this, e = this.getPageCount(), i = this.getCurrentPage(), r = this.canScrollPrev(), o = this.canScrollNext(), n = this.localize.dir() === "ltr";
    return b`
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
          ${Mt(kt(this.getShadowSlideCount()), () => b`
            <sl-carousel-item class="shadow-slide"></sl-carousel-item>
            `)}

        </div>

        ${this.navigation ? b`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${F({
      "carousel__navigation-button": !0,
      "carousel__navigation-button--previous": !0,
      "carousel__navigation-button--disabled": !r
    })}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${r ? "false" : "true"}"
                  @click=${r ? () => this.previous() : null}
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
      "carousel__navigation-button--disabled": !o
    })}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${o ? "false" : "true"}"
                  @click=${o ? () => this.next() : null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${n ? "chevron-right" : "chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            ` : ""}
        ${this.pagination ? b`
              <div part="pagination" role="tablist" class="carousel__pagination" aria-controls="scroll-container">
                ${Mt(kt(e), (l) => {
      const a = l === i;
      return b`
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
u.styles = [Jt, Pe];
u.dependencies = { "sl-icon": m };
c([
  f({ type: Boolean, reflect: !0 })
], u.prototype, "loop", 2);
c([
  f({ type: Boolean, reflect: !0 })
], u.prototype, "navigation", 2);
c([
  f({ type: Boolean, reflect: !0 })
], u.prototype, "pagination", 2);
c([
  f({ type: Boolean, reflect: !0 })
], u.prototype, "autoplay", 2);
c([
  f({ type: Number, attribute: "autoplay-interval" })
], u.prototype, "autoplayInterval", 2);
c([
  f({ type: Number, attribute: "slides-per-page" })
], u.prototype, "slidesPerPage", 2);
c([
  f({ type: Number, attribute: "slides-per-move" })
], u.prototype, "slidesPerMove", 2);
c([
  f()
], u.prototype, "orientation", 2);
c([
  f({ type: Boolean, reflect: !0, attribute: "mouse-dragging" })
], u.prototype, "mouseDragging", 2);
c([
  Kt(".carousel__slides")
], u.prototype, "scrollContainer", 2);
c([
  Kt(".carousel__pagination")
], u.prototype, "paginationContainer", 2);
c([
  Y()
], u.prototype, "activeSlide", 2);
c([
  Y()
], u.prototype, "scrolling", 2);
c([
  Y()
], u.prototype, "dragging", 2);
c([
  Je({ passive: !0 })
], u.prototype, "handleScroll", 1);
c([
  P("loop", { waitUntilFirstUpdate: !0 }),
  P("slidesPerPage", { waitUntilFirstUpdate: !0 })
], u.prototype, "initializeSlides", 1);
c([
  P("activeSlide")
], u.prototype, "handelSlideChange", 1);
c([
  P("slidesPerMove")
], u.prototype, "updateSlidesSnap", 1);
c([
  P("autoplay")
], u.prototype, "handleAutoplayChange", 1);
u.define("sl-carousel");
const z = (s) => (ie("data-v-720fb199"), s = s(), re(), s), is = { class: "wrap" }, rs = { class: "viur-shop-item-view-image-wrap" }, os = {
  class: "viur-shop-item-view-carousel-thumbnails",
  navigation: "",
  loop: ""
}, ns = ["alt", "src"], as = { class: "viur-shop-item-view-thumbnails" }, ls = { class: "viur-shop-item-view-thumbnails-scroller" }, cs = ["alt", "src"], hs = { class: "viur-shop-item-view-info-wrap" }, ds = { class: "viur-shop-item-view-headline" }, us = /* @__PURE__ */ z(() => /* @__PURE__ */ p("h2", { class: "viur-shop-item-view-subline" }, "B 21 x H 6,5 x T 19 cm", -1)), ps = { class: "viur-shop-item-view-price" }, gs = /* @__PURE__ */ z(() => /* @__PURE__ */ p("div", { class: "viur-shop-item-view-paragraph" }, " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ", -1)), vs = { class: "viur-shop-item-view-btn-wrap" }, fs = /* @__PURE__ */ z(() => /* @__PURE__ */ p("sl-icon", {
  name: "bag-plus",
  slot: "prefix"
}, null, -1)), ms = /* @__PURE__ */ z(() => /* @__PURE__ */ p("sl-button", {
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
  /* @__PURE__ */ It(" Auf die Wunschliste ")
], -1)), _s = /* @__PURE__ */ z(() => /* @__PURE__ */ p("br", null, null, -1)), bs = /* @__PURE__ */ z(() => /* @__PURE__ */ p("h1", { class: "viur-shop-item-view-headline" }, "Ähnliche Artikel", -1)), ys = { class: "viur-shop-item-view-item-grid" }, ws = {
  __name: "ItemView",
  setup(s) {
    const t = oe(), e = Yt({
      item: {}
    });
    function i(r) {
      console.log("hier", r.dk_artikel);
      let o = "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
      return r != null && r.dk_artikel.dest.image ? ut.downloadUrlFor(r.dk_artikel.dest.image) : o;
    }
    return Gt(async () => {
      ut.get(`/json/variante/view/${t.params.item}`).then(async (r) => {
        let o = await r.json();
        e.item = o.values;
      });
    }), (r, o) => (Qt(), Xt(te, null, [
      p("div", is, [
        p("div", rs, [
          p("sl-carousel", os, [
            p("sl-carousel-item", null, [
              p("img", {
                alt: e.item.shop_name,
                src: i(e.item)
              }, null, 8, ns)
            ])
          ]),
          p("div", as, [
            p("div", ls, [
              p("img", {
                alt: e.item.shop_name,
                class: "viur-shop-item-view-thumbnails-image active",
                src: i(e.item)
              }, null, 8, cs)
            ])
          ])
        ]),
        p("div", hs, [
          p("h1", ds, dt(e.item.shop_name), 1),
          us,
          p("div", ps, dt(e.item.shop_price_retail) + " € ", 1),
          gs,
          p("div", vs, [
            p("sl-button", {
              size: "small",
              class: "viur-shop-item-view-add-to-cart-btn",
              variant: "primary",
              title: "Add to cart",
              onClick: o[0] || (o[0] = ee((n) => r.cartStore.addToCart(r.item.key, r.cartStore.state.currentCart), ["stop"]))
            }, [
              fs,
              It(" In den Warenkorb ")
            ]),
            ms
          ])
        ])
      ]),
      _s,
      bs,
      p("div", ys, [
        se(ne, {
          item: e.item
        }, null, 8, ["item"])
      ])
    ], 64));
  }
}, Ls = /* @__PURE__ */ ae(ws, [["__scopeId", "data-v-720fb199"]]);
export {
  Ls as default
};
