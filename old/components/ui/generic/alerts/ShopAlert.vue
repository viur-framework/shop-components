<template>
  <sl-alert :variant="variant" open :closable="closeable" :duration="duration" @sl-hide="onHide">
      <slot name="icon">
          <sl-icon slot="icon" :name="iconName"></sl-icon>
      </slot>
    <slot name="alertMsg">{{ msg }}</slot>
  </sl-alert>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: "primary" },
  iconName: { type: String, default: "info-circle" },
  closeable:{
    type:Boolean,
    default:true
  },
  duration:{
    type: [Number, String],
    default: 3000 // use "Infinity" for fix message
  },
  msg: { type: String, default: "ALERT!" },
});

const emit = defineEmits(["onHide"]);

function onHide() {
  emit("onHide");
}
</script>
