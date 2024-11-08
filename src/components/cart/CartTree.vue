<template>
  <div class="viur-shop-tree-head">
    <sl-input class="viur-shop-tree-headline headline">
      <sl-icon name="pencil" slot="suffix"></sl-icon>
    </sl-input>
    <sl-dropdown class="viur-shop-tree-dropdown">
      <sl-icon name="dots" slot="trigger"></sl-icon>
      <sl-menu class="viur-shop-tree-menu">
        <sl-menu-item class="viur-shop-tree-menu-item">Warenkorb kopieren</sl-menu-item>
        <sl-menu-item class="viur-shop-tree-menu-item">Warenkorb löschen</sl-menu-item>
      </sl-menu>
    </sl-dropdown>
  </div>
  <sl-input size="medium" class="viur-shop-tree-descr">
    <sl-icon name="pencil" slot="suffix"></sl-icon>
  </sl-input>
  <CartTreeWrapper :tree="state.tree" @update:modelValue="handleChange">
  </CartTreeWrapper>
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import CartTreeWrapper from "./CartTreeWrapper.vue";

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

<style scoped>

  .viur-shop-tree-head{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--sl-spacing-medium);
    margin-bottom: var(--sl-spacing-small);
  }

  .viur-shop-tree-headline{
    width: 100%;
    border-bottom: 1px solid transparent;
    transition: all ease .3s;

    &:hover{
      border-bottom: 1px solid var(--ignt-color-text-default);
    }

    &::part(base){
      border: none;
    }

    &::part(prefix){
      display: none;
    }

    &::part(suffix){
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 1rem;
    }

    &::part(input){
      padding-right: 0;
      padding-left: 0;
      font-size: 1.8em;
      color: var(--ignt-color-primary);
    }
  }

  .viur-shop-tree-descr{
    width: 100%;
    border-bottom: 1px solid transparent;
    transition: all ease .3s;
    margin-bottom: var(--sl-spacing-x-large);


    &:hover{
      border-bottom: 1px solid var(--ignt-color-text-default);
    }

    &::part(base){
      border: none;
    }

    &::part(prefix){
      display: none;
    }

    &::part(suffix){
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 1rem;
    }

    &::part(input){
      padding-right: 0;
      padding-left: 0;
      font-size: 1rem;
      color: var(--ignt-color-text-default);
    }
  }

  .viur-shop-tree-dropdown{
    &::part(trigger){
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.8em;
      height: 1.8em;;
    }
  }
</style>
