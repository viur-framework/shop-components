<template>
  <div class="viur-shop-address-box">
    <select-address
      v-if="addressSelection"
      :address-list="state.addressList"
      v-model="state.activeAddress"
    >
    </select-address>
    <!-- debugging -->
    <!-- {{ mode === "billing" ? cartStore.state.activeBillingAddress : "" }} -->
    <!-- {{ mode === "billing" ? "" : cartStore.state.activeShippingAddress }} -->
    <!-- <pre>{{ customer }}</pre> -->
    {{ state.address?.street_name }}, {{ state.address?.street_number }}<br />
    {{ state.address?.zip_code }} {{ state.address?.city }}
    <br />
    {{ state.address?.country }}<br />
    Default:{{ state.address?.is_default }}
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  onBeforeMount,
  watch,
  onUpdated,
  onUnmounted,
} from "vue";
import { useCartStore } from "../../../stores/cart";
import SelectAddress from "./SelectAddress.vue";

const props = defineProps({
  mode: { type: String, default: "billing" },
  addressSelection: { type: Boolean, default: false },
  modelValue: { type: Object },
});

const emit = defineEmits(["update:modelValue"]);

const cartStore = useCartStore();

const state = reactive({
  addressList: computed(() =>
    props.mode === "billing"
      ? cartStore.state.billingAddressList
      : cartStore.state.shippingAddressList,
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
    state.activeAddress = cartStore.state.activeBillingAddress.key
      ? cartStore.state.activeBillingAddress.key
      : "";
  } else {
    state.activeAddress = cartStore.state.activeShippingAddress.key
      ? cartStore.state.activeShippingAddress.key
      : "";
  }
}

watch(
  () => state.address,
  (newAddress) => {
    if (props.mode === "billing") {
      cartStore.state.activeBillingAddress = newAddress;
    } else cartStore.state.activeShippingAddress = newAddress;
  },
);

watch(
  () => cartStore.state.activeBillingAddress,
  (newValue, oldValue) => {
    state.activeAddress = newValue.key;
  },
);

watch(
  () => cartStore.state.activeShippingAddress,
  (newValue, oldValue) => {
    state.activeAddress = newValue.key;
  },
);
onBeforeMount(() => {
  getDefaultAddress();
});

onUnmounted(() => {
  state.activeAddress = "";
});

onUpdated(() => {
  getDefaultAddress();
});
</script>
