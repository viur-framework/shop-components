// @ts-nocheck
import { createRouter, createWebHashHistory } from "vue-router";
import ViewMissing from "../views/ViewMissing.vue";

const default_routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "view_missing",
    component: ViewMissing,
  },
  {
    path: "/shop/category/:identifier",
    name: "CategoryView",
    component: () => import("../components/order/category/CategoryView.vue"),
  },
  {
    path: "/shop/item/:item",
    name: "itemView",
    component: () => import("../components/order/item/ItemView.vue"),
  },
  {
    path: "/shop/basket/",
    name: "BasketView",
    component: () => import("../components/cart/BasketView.vue"),
  },
];

function createRouterInstance(routes, replace = false) {
  let newRoutes = [];
  if (replace) {
    newRoutes = routes;
  } else {
    newRoutes = routes.concat(default_routes);
  }

  const router = createRouter({
    // @ts-ignore
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: newRoutes,
  });

  // router.afterEach((to, from) => {
  //   //useUserStore().addAction();
  // });

  // router.beforeEach((to, from, next) => {
  //   const contextStore = useContextStore();
  //   let localContext = {};
  //   let handlerId = to.query["_"]?.toString();
  //   if (!handlerId) next();
  //   if (Object.keys(contextStore.state.localContext).includes(handlerId)) {
  //     localContext = contextStore.state.localContext[handlerId];
  //   }
  //   let newQuery = {
  //     ...contextStore.state.globalContext,
  //     ...localContext,
  //     ...to.query,
  //   };
  //   if (
  //     Object.keys(to.query).every(
  //       (key) =>
  //         to.query[key] === newQuery[key] &&
  //         to.query.hasOwnProperty(key) &&
  //         newQuery.hasOwnProperty(key),
  //     ) &&
  //     Object.keys(newQuery).every(
  //       (key) =>
  //         to.query[key] === newQuery[key] &&
  //         to.query.hasOwnProperty(key) &&
  //         newQuery.hasOwnProperty(key),
  //     )
  //   ) {
  //     //disabled because of to much context copy and updates
  //     // Writes query to context
  //     /*
  //     for (const [k, v] of Object.entries(to.query)) {
  //       if (k.startsWith("_")) continue
  //       if (Object.keys(contextStore.state.localContext).includes(handlerId)) {
  //         contextStore.state.localContext[handlerId][k] = v
  //       } else {
  //         contextStore.state.localContext[handlerId] = { [k]: v }
  //       }
  //     }*/
  //     next(); // no change
  //   } else {
  //     to.query = newQuery;
  //     next(to);
  //   }
  // });
  return router;
}

export default createRouterInstance;
