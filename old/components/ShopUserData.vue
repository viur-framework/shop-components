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
        :custom-address="!addressStore.state.clone"
        @valid="emit('valid', $event)"
      >
        <!-- <template #cart-selection v-if="multiMode">
          <CartSelection
            :carts="reduce(carts, n)"
            @cart-selected="onCartSelect($event, n)"
          >
          </CartSelection>
        </template> -->

        <template #billing-address v-if="state.billingList.length <= 1">
          <AddForm
            :customer="state.customer"
            :layout="layout"
            v-model="addressStore.state.active.billing"
            @add-success="state.alert = $event"
            @valid="emit('valid', $event)"
          >
          </AddForm>
        </template>

        <template #shipping-address v-if="state.shippingList.length <= 1">
          <AddForm
            :customer="state.customer"
            :type="'shipping'"
            :layout="layout"
            v-model="addressStore.state.active.shipping"
            @add-success="state.alert = $event"
            @valid="emit('valid', $event)"
          >
          </AddForm>
        </template>

        <template #mode-switch>
          <sl-checkbox
            :checked="addressStore.state.clone"
            class="viur-shop-form-bill-check"
            v-html="$t('viur.shop.userdata.shipping_to_billaddress')"
            @sl-change="onCustomShipping"
          >
          </sl-checkbox>
        </template>
      </BaseLayout>
    </div>

    <!-- <ActionBar
      @on-address-add="addAddress"
      @on-address-remove="removeAddress"
      v-if="multiMode"
    >
    </ActionBar> -->
  </div>
</template>

<script setup>
// Functions
import { ref, reactive, computed, onBeforeMount, watch } from "vue";

// Stores
import { useCartStore } from "../stores/cart";
import { useAddressStore } from "../stores/address";

// Components
import CartSelection from "./ui/userdata/multi/CartSelection.vue";
import AddForm from "./ui/userdata/AddForm.vue";
import ActionBar from "./ui/userdata/multi/ActionBar.vue";
import ShopAlert from "./ui/generic/alerts/ShopAlert.vue";
import BaseLayout from "./ui/userdata/BaseLayout.vue";

const emit = defineEmits(["valid"]);

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
const addressStore = useAddressStore();

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
    const r = carts.value.filter((cart) => {
      return !selection().includes(cart.key);
    });
    return r;
  }),
  customAddress: {},
  billingList: computed(() => addressStore.getList()),
  shippingList: computed(() => addressStore.getList("shipping")),
});

const carts = ref(
  cartStore.state.childrenByNode?.[cartStore.state.basket.key]
    ? cartStore.state.childrenByNode?.[cartStore.state.basket.key].filter(
        (cart) => cart.skel_type === "node",
      )
    : [
        { name: "Warenkorb1", key: "213123123123" },
        { name: "Warenkorb2", key: "2131231232131233123" },
      ],
);

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

function onCustomShipping(e, grp) {
  // state.customAddress["grp" + grp] = e.target.checked;
  addressStore.state.clone = e.target.checked;
}

onBeforeMount(() => {});
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
