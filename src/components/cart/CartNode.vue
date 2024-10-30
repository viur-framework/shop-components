<template>
  <sl-details v-if="node.children" :summary="node.name">
    <slot name="summary">{{ node.name }}</slot>
    <template v-for="child in node.children">
      <CartLeaf :leaf="child" v-if="child?.skel_type === 'leaf'" />
    </template>
  </sl-details>
  <h1 class="viur-shop-cart-headline" v-else>
    {{ node.name }}
  </h1>
</template>

<script setup>
import { computed, reactive } from "vue";
import CartLeaf from "./CartLeaf.vue";
const props = defineProps({
  node: { type: Object, required: true },
});

const state = reactive({});
</script>

<style scoped>
.viur-shop-cart-headline {
  font-size: 2rem;
}
</style>
