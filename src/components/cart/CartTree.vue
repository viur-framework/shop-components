<template>
  <CartTreeWrapper :tree="state.tree" @update:modelValue="handleChange">
  </CartTreeWrapper>

  <sl-button
    @click="
      cartStore.addNode(
        cartStore.state.basketRootNode.key,
        (cartType = 'basket'),
      )
    "
    >addbutton</sl-button
  >
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import CartTreeWrapper from "./CartTreeWrapper.vue";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();

const props = defineProps({
  modelValue: { type: Array, required: true },
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
    // ! NOTE: it is very important to unpack the prop (copy the array) at this point to avoid prop mutation!!!
    let temp = props.modelValue ? arrayToTree([...props.modelValue]) : [""];

    return temp[0];
  }),
});

function handleChange(e) {
  // ! NOTE: it is very important to unpack the prop (copy the array) at this point to avoid prop mutation!!!
  let temp = [...props.modelValue];

  temp.forEach((item, index) => {
    if (item.key === e.key) {
      if (e.quantity < 1) {
        temp.splice(index, 1);
      } else {
        temp[index] = e;
      }
    }
  });

  emits("update:modelValue", temp);
}

// watch(() => props.modelValue,
//  (oldVal, newVal) => {
//   if(oldVal === )
//  }
//  );
</script>
