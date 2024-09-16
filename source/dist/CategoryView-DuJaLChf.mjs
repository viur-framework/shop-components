import { reactive as p, computed as g, onMounted as f, openBlock as o, createElementBlock as i, createElementVNode as s, toDisplayString as k, renderSlot as y, createTextVNode as _, createCommentVNode as h, Fragment as v, renderList as w, createBlock as C } from "vue";
import { _ as b, u as x } from "./main-S28xq-1k.mjs";
import { useRoute as I } from "vue-router";
import "@viur/vue-utils";
import { I as L } from "./ItemCard-OsWVeH1C.mjs";
const S = {
  key: 0,
  class: "viur-shop-loading-wrap"
}, V = {
  key: 1,
  class: "bind"
}, B = { class: "page-header" }, H = { class: "viur-shop-category-view-list" }, T = ["loading", "disabled"], E = {
  __name: "CategoryView",
  props: {
    skellist: { type: Array },
    filter: { type: Boolean, default: !0 },
    pageHeader: { type: String, default: "Artikel Liste" },
    listHandler: { type: Object, required: !0 }
  },
  setup(a) {
    const n = a, d = I(), u = x(), e = p({
      skellist: [],
      loading: !0,
      currentCursor: "",
      isLastItem: !1,
      itemCount: 99,
      itemType: g(() => d.params.identifier)
    }), t = n.listHandler;
    async function c() {
      e.loading = !0, await t.next(), e.skellist.length < t.state.skellist.length ? (e.skellist = t.state.skellist, e.loading = !1) : (e.loading = !1, e.isLastItem = !0);
    }
    return f(async () => {
      await u.init(), await t.fetch(!0), e.skellist = t.state.skellist, e.loading = !1;
    }), (m, r) => e.loading ? (o(), i("div", S, r[0] || (r[0] = [
      s("sl-spinner", null, null, -1)
    ]))) : (o(), i("div", V, [
      s("div", B, [
        s("h1", null, k(a.pageHeader), 1)
      ]),
      a.filter ? y(m.$slots, "filter", { key: 0 }, () => [
        r[1] || (r[1] = _(" text-transform text-transform TEST "))
      ], !0) : h("", !0),
      s("div", H, [
        (o(!0), i(v, null, w(e.skellist, (l) => (o(), C(L, {
          key: l.shop_name,
          item: l
        }, null, 8, ["item"]))), 128))
      ]),
      s("sl-button", {
        onClick: c,
        loading: e.loading,
        disabled: e.isLastItem,
        class: "viur-shop-category-view-more-button"
      }, " Mehr anzeigen ", 8, T)
    ]));
  }
}, z = /* @__PURE__ */ b(E, [["__scopeId", "data-v-532e5cf3"]]);
export {
  z as default
};
