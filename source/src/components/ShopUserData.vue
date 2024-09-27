<template>
  <shop-alert
    v-if="state.alert.show"
    :variant="state.alert.variant"
    :iconName="state.alert.iconName"
    @on-hide="resetAlert()"
  >
    <template #alertMsg> {{ state.alert.msg }} </template>
  </shop-alert>

  <template v-if="multiMode">
    <div class="viur-shop-multi-address-wrap">
      <div
        class="viur-shop-multi-adress-box"
        v-for="n in state.amount"
        :key="n"
      >
        <CartSelection
          :carts="reduce(carts, n)"
          @cart-selected="onCartSelect($event, n)"
        >
        </CartSelection>
        <h3>Lieferadresse</h3>
        <UserDataForm
          @add-success="state.alert = $event"
        >
        </UserDataForm>

        <div class="viur-shop-multi-user-data-billing">
          <h3>Rechnungsadresse</h3>
        </div>

        <sl-checkbox
          @sl-change="onCustomBillingAddress($event, n)"
          checked
          :ref="
            (el) => {
              if (el === null) return;
              state.mixed['grp' + n] = el.checked;
            }
          "
          v-model="state.mixed['grp' + n]"
          class="viur-shop-form-bill-check"
        >
          Lieferadresse wie Rechnungsadresse
        </sl-checkbox>
      </div>

      <ActionBar
        @on-address-add="addAddress"
        @on-address-remove="removeAddress"
      >
      </ActionBar>
    </div>
  </template>

  <div v-else>
    <UserDataForm></UserDataForm>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import UserDataForm from "./ui/userdata/AddForm.vue";
import CartSelection from "./ui/userdata/multi/CartSelection.vue";
import ActionBar from "./ui/userdata/multi/ActionBar.vue";
import ShopAlert from "./ui/generic/alerts/ShopAlert.vue";

const state = reactive({
  selection: {},
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
    let result = carts.value.filter((cart) => {
      return !selection().includes(cart.key);
    });
    return result;
  }),
  mixed: {},
});

const carts = ref([
  { name: 1, key: "6437" },
  { name: 2, key: "534534" },
  { name: 3, key: "5465424556" },
  { name: 4, key: "123123" },
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
  if (Object.keys(state.mixed).includes("grp" + state.amount)) {
    delete state.mixed["grp" + state.amount];
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
  state.mixed["grp" + grp] = e.target.checked;
}

function log(e) {
  console.log("log funktion shopuserdata", e);
}

const props = defineProps({
  multiMode: {
    type: Boolean,
    default: true,
  },
});
</script>
<style scoped>
.viur-shop-form-bill-check {
  margin: var(--sl-spacing-medium) 0;
}

.viur-shop-custom-billing-address-wrap {
  display: flex;
  flex-direction: row;
}
</style>
