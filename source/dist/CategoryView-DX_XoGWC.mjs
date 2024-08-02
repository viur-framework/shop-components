import { reactive as p, computed as m, onMounted as f, openBlock as a, createElementBlock as i, createElementVNode as o, toDisplayString as g, renderSlot as _, createTextVNode as h, createCommentVNode as k, Fragment as y, renderList as v, createBlock as w, pushScopeId as I, popScopeId as S } from "vue";
import { _ as C, u as b } from "./main-CuU2Dx6p.mjs";
import { useRoute as x } from "vue-router";
import "@viur/vue-utils";
import { I as L } from "./ItemCard-BXlP3aQy.mjs";
const V = (t) => (I("data-v-532e5cf3"), t = t(), S(), t), B = {
  key: 0,
  class: "viur-shop-loading-wrap"
}, H = /* @__PURE__ */ V(() => /* @__PURE__ */ o("sl-spinner", null, null, -1)), T = [
  H
], E = {
  key: 1,
  class: "bind"
}, M = { class: "page-header" }, N = { class: "viur-shop-category-view-list" }, A = ["loading", "disabled"], j = {
  __name: "CategoryView",
  props: {
    skellist: { type: Array },
    filter: { type: Boolean, default: !0 },
    pageHeader: { type: String, default: "Artikel Liste" },
    listHandler: { type: Object, required: !0 }
  },
  setup(t) {
    const l = t, n = x(), c = b(), e = p({
      skellist: [],
      loading: !0,
      currentCursor: "",
      isLastItem: !1,
      itemCount: 99,
      itemType: m(() => n.params.identifier)
    }), s = l.listHandler;
    async function d() {
      e.loading = !0, await s.next(), e.skellist.length < s.state.skellist.length ? (e.skellist = s.state.skellist, e.loading = !1) : (e.loading = !1, e.isLastItem = !0);
    }
    return f(async () => {
      await c.init(), await s.fetch(!0), e.skellist = s.state.skellist, e.loading = !1;
    }), (u, q) => e.loading ? (a(), i("div", B, T)) : (a(), i("div", E, [
      o("div", M, [
        o("h1", null, g(t.pageHeader), 1)
      ]),
      t.filter ? _(u.$slots, "filter", { key: 0 }, () => [
        h(" text-transform text-transform TEST ")
      ], !0) : k("", !0),
      o("div", N, [
        (a(!0), i(y, null, v(e.skellist, (r) => (a(), w(L, {
          key: r.shop_name,
          item: r
        }, null, 8, ["item"]))), 128))
      ]),
      o("sl-button", {
        onClick: d,
        loading: e.loading,
        disabled: e.isLastItem,
        class: "viur-shop-category-view-more-button"
      }, " Mehr anzeigen ", 8, A)
    ]));
  }
}, $ = /* @__PURE__ */ C(j, [["__scopeId", "data-v-532e5cf3"]]);
export {
  $ as default
};
