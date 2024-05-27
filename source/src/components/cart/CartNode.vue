<template>
  <h1>{{ state.headline }}</h1>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  headline: { type: String, default: "TEST" },
});

const state = reactive({
  headline: computed(() => {
    props.headline;
  }),
});
</script>
