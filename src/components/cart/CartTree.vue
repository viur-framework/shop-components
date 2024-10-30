<template>
  <CartTreeWrapper :tree="state.tree"></CartTreeWrapper>
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import CartTreeWrapper from "./CartTreeWrapper.vue";

const props = defineProps({
  modelValue: { type: Set, required: true },
});

const arrayToTree = (arr, parent = null) =>
  arr
    .filter((item) => item.parententry === parent)
    .map((child) => ({ ...child, children: arrayToTree(arr, child.key) }));

const state = reactive({
  loading: computed(() => {
    return props.modelValue ? false : true;
  }),
  tree: computed(() => {
    let temp = props.modelValue ? arrayToTree([...props.modelValue]) : [""];
    return temp[0];
  }),
});

// watch(() => props.modelValue,
//  (oldVal, newVal) => {
//   if(oldVal === )
//  }
//  );
</script>
