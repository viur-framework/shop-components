<template>
  <pre>{{ leaf }}</pre>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  leaf: { type: Object, required: true },
});

const state = reactive({});
</script>
