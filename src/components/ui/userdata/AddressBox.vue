<template>
  <div class="viur-shop-address-box">
    <select-address
      v-if="addressSelection"
      :address-list="state.addressList"
      @valid="emit('valid', $event)"
      v-model="state.activeAddress"
    >
    </select-address>
    {{ state.addressList.length }}
    <br />
    {{ addressStore.state.billingAddressList.length }}
    <!-- debugging -->
    <!-- {{ mode === "billing" ? addressStore.state.activeBillingAddress : "" }} -->
    <!-- {{ mode === "billing" ? "" : addressStore.state.activeShippingAddress }} -->
    <!-- <pre>{{ customer }}</pre> -->
    <div class="viur-shop-address-box-preview" v-if="state.address">
      <span>Ausgewählte Adresse :</span>
      <br />
      {{ state.address?.street_name }} {{ state.address?.street_number }}<br />
      {{ state.address?.zip_code }} {{ state.address?.city }}
      <br />
      {{ state.address?.country }}
      <br />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeMount, watch } from "vue";
import { useAddressStore } from "../../../stores/address";
import { useOrderStore } from "../../../stores/order";
import SelectAddress from "./SelectAddress.vue";

const props = defineProps({
  mode: { type: String, default: "billing" },
  addressSelection: { type: Boolean, default: false },
  modelValue: { type: Object },
});

const emit = defineEmits(["update:modelValue", "valid"]);

const addressStore = useAddressStore();
const orderStore = useOrderStore();

const state = reactive({
  addressList: computed(() =>
    props.mode === "billing"
      ? addressStore.state.billingAddressList
      : addressStore.state.shippingAddressList,
  ),
  activeAddress: "",
  address: computed(() => {
    if (!state.activeAddress) return {};

    return state.addressList.filter(
      (address) => address.key === state.activeAddress,
    )[0];
  }),
});

function getDefaultAddress() {
  if (props.mode === "billing") {
    if (addressStore.state.activeBillingAddress.key) {
      state.activeAddress = addressStore.state.activeBillingAddress.key;

      orderStore.updateParams({
        billing_address_key: addressStore.state.activeBillingAddress.key,
      });
      emit("valid", true);
    } else {
      state.activeAddress = "";
    }
  } else {
    state.activeAddress = addressStore.state.activeShippingAddress.key
      ? addressStore.state.activeShippingAddress.key
      : "";
  }
}

watch(
  () => state.address,
  (newAddress) => {
    if (props.mode === "billing") {
      addressStore.state.activeBillingAddress = newAddress;
    } else addressStore.state.activeShippingAddress = newAddress;
  },
);

watch(
  () => addressStore.state.activeBillingAddress,
  (newValue, oldValue) => {
    state.activeAddress = newValue.key;
  },
);

watch(
  () => addressStore.state.activeShippingAddress,
  (newValue, oldValue) => {
    state.activeAddress = newValue.key;
  },
);

watch(
  () => state.activeAddress,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      orderStore.updateParams({
        billing_address_key: newValue,
      });
      emit("valid", true);
    }
  },
);

onBeforeMount(() => {
  getDefaultAddress();
});
</script>

<style scoped>
.viur-shop-address-box-preview {
  margin: var(--sl-spacing-medium) 0;
}
</style>
