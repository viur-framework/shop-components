<template>
  <CartTreeWrapper :tree="state.tree" @update:modelValue="handleChange">
  </CartTreeWrapper>
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import CartTreeWrapper from "./CartTreeWrapper.vue";

const props = defineProps({
  modelValue: { type: Set, required: true },
});

const emits = defineEmits(["update:modelValue"]);

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

function handleChange(e) {
  let temp = props.modelValue;
  temp.forEach((item) => {
    if (item.key === e.key) {
      temp.delete(item);
    }
  });
  if (e.quantity > 0) {
    temp.add(e);
  }
  emits("update:modelValue", temp);
}

// watch(() => props.modelValue,
//  (oldVal, newVal) => {
//   if(oldVal === )
//  }
//  );
</script>
