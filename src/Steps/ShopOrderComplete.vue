<template>
  <div>
    <h1 class="viur-shop-success-headline headline">
      {{ $t("viur.shop.order_thanks") }}
    </h1>
    <p class="paragraph">
      <strong>{{ $t("viur.shop.order_number") }}:</strong> {{ shopStore.state.order?.["order_uid"] }}
    </p>
    <p
      class="paragraph"
      v-html="$t('viur.shop.order_message')"
    ></p>

    <p
      class="paragraph"
      v-if="shopStore.state.order?.['is_paid']"
    >
      {{ $t("viur.shop.order_paid") }}
    </p>

    <p
      class="paragraph"
      v-if="shopStore.state.order?.['is_rts']"
    >
      {{ $t("viur.shop.order_ready_to_ship") }}
    </p>

    <slot name="template_complete"> </slot>

    <sl-details :summary="$t('viur.shop.order_summary')">
      <shop-summary></shop-summary>
    </sl-details>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue"
import { useViurShopStore } from "../shop"
import ShopSummary from "../ShopSummary.vue"
const shopStore = useViurShopStore()

const props = defineProps({
  params: {
    type: Object,
    default: {}
  }
})
</script>
