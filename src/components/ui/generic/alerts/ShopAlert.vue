<template>
  <sl-alert :variant="variant" open closable duration="3000" @sl-hide="onHide">
    <sl-icon slot="icon" :name="iconName"></sl-icon>
    <slot name="alertMsg">{{ msg }}</slot>
  </sl-alert>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: "primary" },
  iconName: { type: String, default: "info-circle" },
  msg: { type: String, default: "ALERT!" },
});

const emit = defineEmits(["onHide"]);

function onHide() {
  emit("onHide");
}
</script>
