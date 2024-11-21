<template>
  <div class="viur-shop-address-box">
    <select-address
      v-if="addressSelection"
      :address-list="state.addressList"
      :modelValue="
        mode === 'billing'
          ? addressStore.state.activeBillingAddress.key
          : addressStore.state.activeShippingAddress.key
      "
      @update:modelValue="handleSelection"
    >
    </select-address>

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
  address: computed(() => {
    return props.mode === "billing"
      ? addressStore.state.activeBillingAddress
      : addressStore.state.activeShippingAddress;
  }),
});

function getDefaultAddress() {
  if (props.mode === "billing") {
    if (addressStore.state.activeBillingAddress.key) {
      orderStore.updateParams({
        billing_address_key: addressStore.state.activeBillingAddress.key,
      });
      emit("valid", true);
    } else {
      emit("valid", false);
    }
  } else {
    if (addressStore.state.activeShippingAddress.key) {
      // orderStore.updateParams({
      //   billing_address_key: addressStore.state.activeBillingAddress.key,
      // });
      emit("valid", true);
    } else {
      emit("valid", false);
    }
  }
}

function handleSelection(e) {
  if (props.mode === "billing") {
    let billingAddress = addressStore.state.billingAddressList.filter(
      (address) => address.key === e,
    );
    addressStore.state.activeBillingAddress = billingAddress[0];
  } else {
    let shippingAddress = addressStore.state.shippingAddressList.filter(
      (address) => address.key === e,
    );
    addressStore.state.activeShippingAddress = shippingAddress[0];
  }
}

onBeforeMount(() => {
  getDefaultAddress();
});
</script>

<style scoped>
.viur-shop-address-box-preview {
  margin: var(--sl-spacing-medium) 0;
}
</style>
