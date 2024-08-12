<template>
  <div class="bind">
    <h1 class="viur-shop-success-headline headline">Vielen Dank für Ihre Bestellung</h1>
    <p class="paragraph">
      <strong>Ihre Bestellnummer:</strong> 123345670
    </p>
    <p class="paragraph">
      Wir haben Ihre Bestellung erhalten und werden diese schenllstmöglich bearbeiten.<br>
      Sie erhalten in wenigen Minuten eine Bestätigung per E-Mail.

      <div class="btn-wrap">
        <sl-button size="medium">
          Zur Startseite
        </sl-button>

        <sl-button variant="primary" @click="goToShop()"
                   size="medium">
          Weiter Einkaufen
        </sl-button>
      </div>
    </p>

  </div>
</template>

<script setup>
const props = defineProps({
  redirectUrl: {
    type: Object,
    required: true,
  },
});

function goToShop() {

}
</script>

<style scoped>

.btn-wrap{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  margin-top: var(--sl-spacing-x-large);
}

.viur-shop-success-headline{
  margin: 0 0 var(--sl-spacing-x-large) 0;
  font-size: var(--shop-success-headline-size);
}
</style>
