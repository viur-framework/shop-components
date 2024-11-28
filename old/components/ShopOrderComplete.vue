<template>
  <div class="bind">
    <h1 class="viur-shop-success-headline headline">
      Vielen Dank für Ihre Bestellung
    </h1>
    <p class="paragraph"><strong>Ihre Bestellnummer:</strong> 123345670</p>
    <p class="paragraph">
      Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich
      bearbeiten.<br />
      Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail.
    </p>

    <div
      class="viur-shop-order-complete-slot"
      v-if="additionalComponents.length"
    >
      <template v-for="component in additionalComponents">
        <component
          :is="component.component"
          v-bind="component.props ? component.props : ''"
        >
        </component>
      </template>
    </div>

    <div class="btn-wrap">
      <sl-button size="medium" @click="goToStart()"> Zur Startseite </sl-button>

      <sl-button variant="primary" @click="goToShop()" size="medium">
        Weiter Einkaufen
      </sl-button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  redirectUrl: {
    type: String,
    required: true,
  },
  additionalComponents: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["goToStart"]);

function goToStart() {
  emit("goToStart");
}

function goToShop() {
  window.location.href = props.redirectUrl;
}
</script>

<style scoped>
.btn-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  margin-top: var(--sl-spacing-x-large);
}

.viur-shop-success-headline {
  margin: 0 0 var(--sl-spacing-x-large) 0;
  font-size: var(--shop-success-headline-size);
}
</style>
