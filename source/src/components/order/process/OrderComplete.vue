<template>
  <div class="bind">
    <h1 class="headline">Vielen Dank für Ihre Bestellung</h1>
    <br>
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

        <sl-button variant="primary"
                   size="medium">
          Weiter Einkaufen
        </sl-button>
      </div>
    </p>

  </div>
</template>

<script setup></script>

<style scoped>

.btn-wrap{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  margin-top: var(--sl-spacing-x-large);
}

</style>
