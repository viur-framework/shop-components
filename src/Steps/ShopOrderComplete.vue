<template>
<div class="bind">
    <h1 class="viur-shop-success-headline headline">
      Vielen Dank für Ihre Bestellung
    </h1>
    <p class="paragraph"><strong>Ihre Bestellnummer:</strong> {{ shopStore.state.order?.["order_uid"] }}</p>
    <p class="paragraph">
      Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich
      bearbeiten.<br />
      Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail.
    </p>

    <p class="paragraph" v-if="shopStore.state.order?.['is_paid']">
      Ihre Zahlung ist bei uns eingegangen.
    </p>

    <p class="paragraph" v-if="shopStore.state.order?.['is_rts']">
      Ihre Bestellung ist fertig für den Versand.
    </p>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue'
import { useViurShopStore } from '../shop';
const shopStore = useViurShopStore()
</script>