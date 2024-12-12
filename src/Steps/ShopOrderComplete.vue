<template>
<div class="bind">
    <h1 class="viur-shop-success-headline headline">
      {{ $t('shop.order_thanks') }}
    </h1>
    <p class="paragraph"><strong>{{ $t('shop.order_number') }}:</strong> {{ shopStore.state.order?.["order_uid"] }}</p>
    <p class="paragraph" v-html=" $t('shop.order_message')">
    </p>

    <p class="paragraph" v-if="shopStore.state.order?.['is_paid']">
      {{ $t('shop.order_paid') }}
    </p>

    <p class="paragraph" v-if="shopStore.state.order?.['is_rts']">
      {{ $t('shop.order_ready_to_ship') }}
    </p>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue'
import { useViurShopStore } from '../shop';
const shopStore = useViurShopStore()
</script>