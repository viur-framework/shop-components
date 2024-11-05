<template>
  <shop-alert
    v-if="state.alert.show"
    :variant="state.alert.variant"
    :iconName="state.alert.iconName"
    @on-hide="resetAlert()"
  >
    <template #alertMsg> {{ state.alert.msg }} </template>
  </shop-alert>

  <div class="viur-shop-multi-address-wrap">
    <div class="viur-shop-multi-adress-box" v-for="n in state.amount" :key="n">
      <BaseLayout
        :customer="state.customer"
        :custom-address="!state.customAddress['grp' + n]"
        @edit-billing="state.editBilling = $event"
        @edit-shipping="state.editShipping = $event"
      >
        <template #cart-selection v-if="multiMode">
          <CartSelection
            :carts="reduce(carts, n)"
            @cart-selected="onCartSelect($event, n)"
          >
          </CartSelection>
        </template>
        <template #mode-switch>
          <sl-checkbox
            :checked="state.hasBillingAddress"
            :ref="
              (el) => {
                if (el === null) return;

                state.customAddress['grp' + n] = el.checked;
              }
            "
            @sl-change="onCustomBillingAddress($event, n)"
            class="viur-shop-form-bill-check"
            :v-html="$t('viur.shop.userdata.shipping_to_billaddress')"
          >
            Versandadresse wie Rechnungsadresse
          </sl-checkbox></template
        >
        <template
          #shipping-address
          v-if="
            (state.editShipping && !state.customAddress['grp' + n]) ||
            (!state.hasShippingAddress && !state.customAddress['grp' + n])
          "
        >
          <UserDataForm
            :customer="state.customer"
            v-model="cartStore.state.activeShippingAddress"
            @add-success="state.alert = $event"
            :layout="layout"
          >
          </UserDataForm>
        </template>
        <template
          #billing-address
          v-if="state.editBilling || !state.hasBillingAddress"
        >
          <UserDataForm
            :customer="state.customer"
            :mode="'billing'"
            v-model="cartStore.state.activeBillingAddress"
            @add-success="state.alert = $event"
            :layout="layout"
          >
          </UserDataForm>
        </template>
      </BaseLayout>
    </div>

    <ActionBar
      @on-address-add="addAddress"
      @on-address-remove="removeAddress"
      v-if="multiMode"
    >
    </ActionBar>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount, watch } from "vue";
import UserDataForm from "./ui/userdata/AddForm.vue";
import CartSelection from "./ui/userdata/multi/CartSelection.vue";
import ActionBar from "./ui/userdata/multi/ActionBar.vue";
import ShopAlert from "./ui/generic/alerts/ShopAlert.vue";
import { useCartStore } from "../stores/cart";
import BaseLayout from "./ui/userdata/BaseLayout.vue";

const props = defineProps({
  multiMode: {
    type: Boolean,
    default: true,
  },
  layout: {
    default: null,
  },
});

const cartStore = useCartStore();

const state = reactive({
  selection: {},
  customer: computed(() => cartStore.state.customer),
  alert: {
    show: false,
    msg: "",
    variant: "",
    iconName: "",
  },
  amount: 1,
  maxAmount: computed(() => {
    return state.remainingCarts.length;
  }),
  remainingCarts: computed(() => {
    const r=  carts.value.filter((cart) => {
      return !selection().includes(cart.key);
    });
    return r;
  }),
  customAddress: {},
  hasBillingAddress: computed(() =>  !!cartStore.state.billingAddressList.length),
  hasShippingAddress: computed(() =>  !!cartStore.state.shippingAddressList.length),
  editBilling: false,
  editShipping: false,
  billingData: {},
  shippingData: {},
});

const carts = ref([
  { name: 1, key: "6437" },
]);

function selection() {
  let result = [];
  Object.values(state.selection).forEach((selection) => {
    result.push(...selection);
  });
  return result;
}

function onCartSelect(e, grp) {
  state.selection["grp" + grp] = e;
}

function resetAlert() {
  state.alert.show = false;
  state.alert.msg = "";
  state.alert.variant = "";
  state.alert.iconName = "";
}

function addAddress() {
  if (state.maxAmount > 0) state.amount += 1;
  else {
    state.alert.variant = "danger";
    state.alert.show = true;
    state.alert.iconName = "exclamation-octagon";
    state.alert.msg =
      "Keine weiteren Warenkörbe zum zuweisen von Adressen vorhanden.";
  }
}

function removeAddress() {
  if (state.amount === 1) {
    state.alert.variant = "danger";
    state.alert.show = true;
    state.alert.iconName = "exclamation-octagon";
    state.alert.msg = "Mindestens eine Adresse muss angegeben werden.";
    return;
  }
  if (Object.keys(state.selection).includes("grp" + state.amount)) {
    delete state.selection["grp" + state.amount];
  }
  if (Object.keys(state.customAddress).includes("grp" + state.amount)) {
    delete state.customAddress["grp" + state.amount];
  }
  state.amount -= 1;
}

function reduce(arr, grp) {
  let result = [];
  let temp = [];

  Object.entries(state.selection).forEach(([key, value]) => {
    if (key === "grp" + grp) return;
    temp.push(...value);
  });

  result = arr.filter((item) => !temp.includes(item.key));
  return result;
}

function onCustomBillingAddress(e, grp) {
  state.customAddress["grp" + grp] = e.target.checked;
}
</script>
<style scoped>
.viur-shop-form-bill-check {
  margin: var(--sl-spacing-medium) 0;
}

.viur-shop-custom-billing-address-wrap {
  display: flex;
  flex-direction: row;
}
.viur-shop-cart-address-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sl-spacing-x-large);
  margin-bottom: var(--sl-spacing-x-large);
}
</style>
