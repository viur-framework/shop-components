// import "./shoelaceConfig.js";

import CartView from "./components/cart/CartView.vue";
import CategoryView from "./components/order/category/CategoryView.vue";
import ConfirmView from "./components/cart/ConfirmView.vue";
import CategoryList from "./components/order/category/CategoryList.vue";
import ShippingAdress from "./components/order/information/adress/ShippingAdress.vue";
import UserInfoMulti from "./components/order/information/UserInfoMulti.vue";
import UserInformation from "./components/order/information/UserInformation.vue";
import ItemCard from "./components/order/item/ItemCard.vue";
import ItemView from "./components/order/item/ItemView.vue";
import OrderComplete from "./components/order/process/OrderComplete.vue";
import OrderTabHeader from "./components/order/process/OrderTabHeader.vue";
import OrderView from "./components/order/process/OrderView.vue";
import ExampleUsage from "./components/order/process/ExampleUsage.vue";
import createRouterInstance from "./router/index";
import { useCartStore } from "./stores/cart";

export {
  ExampleUsage,
  createRouterInstance,
  CartView,
  CategoryList,
  CategoryView,
  ShippingAdress,
  ConfirmView,
  UserInfoMulti,
  UserInformation,
  ItemCard,
  ItemView,
  OrderComplete,
  OrderTabHeader,
  OrderView,
  useCartStore,
};
