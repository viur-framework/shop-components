<template>
  <pre>{{ node.name }}</pre>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  node: { type: Object, required: true },
});

const state = reactive({});
</script>
