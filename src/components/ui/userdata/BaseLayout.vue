<template>
  <!-- <div style="width: 100%">
    {{ customer.firstname }} {{ customer.lastname }}<br />
    Phone: {{ customer.phone }} <br />
    E-Mail : {{ customer.name }}<br />
    Debitor: {{ customer.debitornr }}<br />
  </div> -->

  <slot name="cart-selection"></slot>

  <div class="viur-shop-cart-address-wrap">
    <div class="viur-shop-cart-address">
      <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.billing") }}
      </div>

      <slot name="billing-address">
        <address-box
          :address-selection="true"
          :type="'billing'"
          @valid="emit('valid', $event)"
        >
        </address-box>
      </slot>
    </div>

    <slot name="mode-switch"></slot>

    <div class="viur-shop-cart-address" v-if="customAddress">
      <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.shipping") }}
      </div>

      <slot name="shipping-address" v-if="customAddress">
        <address-box
          :address-selection="customAddress"
          :type="'shipping'"
          @valid="emit('valid', $event)"
        >
        </address-box>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import AddressBox from "./AddressBox.vue";

const props = defineProps({
  customer: { type: Object, required: true },
  customAddress: { type: Boolean, default: false },
});

const emit = defineEmits(["valid"]);

const state = reactive({ });
</script>

<style scoped>
.viur-shop-cart-address-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--sl-spacing-x-large);
  margin-top: var(--sl-spacing-large);
}

.viur-shop-cart-address-headline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: var(--sl-spacing-medium);
}
</style>
