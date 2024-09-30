<template>
  <sl-select
    :value="modelValue"
    @sl-change="emit('update:modelValue', $event.target.value)"
  >
    <sl-option
      v-for="address in addressList"
      :key="address.key"
      :value="address.key"
    >
      {{ address.street_name }} {{ address.street_number }}
    </sl-option>
  </sl-select>
</template>
<script setup>
const props = defineProps({
  addressList: { type: Array, required: true },
  modelValue: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
</script>
