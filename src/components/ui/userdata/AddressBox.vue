<template>
  <div class="viur-shop-address-box">
    <select-address
      v-if="addressSelection"
      :address-list="state.addressList"
      :modelValue="
        type === 'billing'
          ? addressStore.state.active.billing.key
          : addressStore.state.active.shipping.key
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
import { useCartStore } from "../../../stores/cart";
import SelectAddress from "./SelectAddress.vue";

const props = defineProps({
  type: { type: String, default: "billing" },
  addressSelection: { type: Boolean, default: false },
  modelValue: { type: Object },
});

const emit = defineEmits(["update:modelValue", "valid"]);

const addressStore = useAddressStore();
const orderStore = useOrderStore();
const cartStore = useCartStore();

const state = reactive({
  addressList: computed(() =>
    props.type === "billing"
      ? addressStore.getList()
      : addressStore.getList("shipping"),
  ),
  address: computed(() => {
    return props.type === "billing"
      ? addressStore.state.active.billing
      : addressStore.state.active.shipping;
  }),
});

function isValid() {
  if (props.type === "billing") {
    if (addressStore.state.active.billing.key) {
      orderStore.updateParams({
        billing_address_key: addressStore.state.active.billing.key,
      });

      if (addressStore.state.clone) {
        cartStore.update({
          key: orderStore.state.currentOrder
            ? orderStore.state.currentOrder.cart.dest.key
            : cartStore.state.basket.key,
          shippingAddress: addressStore.state.active.shipping.key,
        });
      }

      emit("valid", true);
    } else {
      emit("valid", false);
    }
  } else {
    if (addressStore.state.active.shipping.key) {
      cartStore.update({
        key: orderStore.state.currentOrder.cart.dest.key,
        shippingAddress: addressStore.state.active.shipping.key,
      });

      emit("valid", true);
    } else {
      emit("valid", false);
    }
  }
}

function handleSelection(e) {
  let address = state.addressList.filter((address) => address.key === e);

  if (props.type === "billing") {
    addressStore.state.active.billing = address[0];

    orderStore.updateParams({
      billing_address_key: addressStore.state.active.billing.key,
    });

    if (addressStore.state.clone) {
      cartStore.update({
        key: orderStore.state.currentOrder.cart.dest.key,
        shippingAddress: addressStore.state.active.shipping.key,
      });
    }

    emit("valid", true);
  } else {
    addressStore.state.active.shipping = address[0];

    cartStore.update({
      key: orderStore.state.currentOrder.cart.dest.key,
      shippingAddress: addressStore.state.active.shipping.key,
    });

    emit("valid", true);
  }
}

onBeforeMount(() => {
  isValid();
});
</script>

<style scoped>
.viur-shop-address-box-preview {
  margin: var(--sl-spacing-medium) 0;
}
</style>
