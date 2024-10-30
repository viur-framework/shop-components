<template>
  <sl-spinner v-if="state.loading"></sl-spinner>
  <template v-else>
    <template
      v-for="child in modelValue.children"
      v-if="modelValue.is_root_node || modelValue.skel_type === 'node'"
    >
      <CartNode :node="child" v-if="child.children.length && child?.skel_type === 'node'">
      </CartNode>

      <CartLeaf :leaf="child" v-else />
      <!-- <CartLeaf :leaf="modelValue" v-else /> -->
    </template>
  </template>

  <!--
    <template
      v-for="child in modelValue.children"
      v-if="modelValue.is_root_node || modelValue.skel_type === 'node'"
    >
      <CartTree
        :modelValue="child"
        v-if="child.children.length && child.skel_type === 'node'"
      />
      <CartLeaf :leaf="child" v-else />
    </template>
    <CartLeaf :leaf="modelValue" v-else /> -->

  <!-- <pre>{{ modelValue }}</pre> -->
</template>
<script setup>
import { computed, reactive } from "vue";
import CartLeaf from "./CartLeaf.vue";
import CartNode from "./CartNode.vue";

const props = defineProps({
  modelValue: { type: Object },
});

const state = reactive({
  loading: computed(() => {
    return props.modelValue ? false : true;
  }),
});
</script>
