<template>
  <pre>{{ state.headline }}</pre>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  node: { type: Object, required: true },
});

const state = reactive({
  headline: computed(() => {
    props.node;
  }),
});
</script>
