<template>
  <div class="viur-shop-form-btn-wrap">
    <sl-button
      size="medium"
      title="Lieferadresse entfernen"
      @click="removeAddress"
    >
      <sl-icon name="x-lg" slot="prefix"></sl-icon>
    </sl-button>
    <sl-button size="medium" variant="primary" @click="addAddress">
      <sl-icon name="plus-lg" slot="prefix"></sl-icon>
      Lieferadresse hinzufügen
    </sl-button>
  </div>
</template>

<script setup>
const emit = defineEmits(["onAddressAdd", "onAddressRemove"]);
function addAddress() {
  emit("onAddressAdd");
}

function removeAddress() {
  emit("onAddressRemove");
}
</script>

<style scoped>
.viur-shop-form-btn-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  margin-top: var(--sl-spacing-medium);
}
</style>
