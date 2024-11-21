<template>
  <div v-if="state.loading">keine Einträge im Warenkorb</div>
  <template v-else>
    <div
      class="viur-shop-cart-node"
      v-for="entry in modelValue"
      :key="entry.key"
    >
      <CartLeafModel
        :modelValue="entry"
        v-if="entry.skel_type === 'leaf'"
        @update:modelValue="handleChange"
      />
    </div>
    <shop-summary v-if="standalone">
      <template #custom v-if="customComponent">
        <component :is="customComponent"></component>
      </template>
    </shop-summary>
  </template>
</template>
<script setup>
import { reactive, computed } from "vue";
import CartLeafModel from "./CartLeafModel.vue";
import { useCartStore } from "../../stores/cart";
import ShopSummary from "../ShopSummary.vue";

const props = defineProps({
  modelValue: { type: Array, required: true },
  standalone: { type: Boolean, default: true },
  customComponent: { default: null },
});

const emits = defineEmits(["update:modelValue"]);

const cartStore = useCartStore();

const state = reactive({
  loading: computed(() => {
    return props.modelValue.length ? false : true;
  }),
});

async function handleChange(e) {
  // ! NOTE: it is very important to unpack the prop (copy the array) at this point to avoid prop mutation!!!
  let temp = [...props.modelValue];

  temp.forEach(async (item, index) => {
    if (item.key === e.key) {
      if (item.quantity === e.quantity) {
        return; //return if value has no changes so if value is 0 or remove button is clicked no request will be fired
      }
      if (e.quantity < 1) {
        await cartStore.removeItem(e.article.dest.key, e.parententry);
        temp.splice(index, 1);
      } else {
        await cartStore.updateItem(
          e.article.dest.key,
          e.parententry,
          e.quantity,
        );
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
.viur-shop-cart-node {
  display: flex;
  flex-direction: column;
}
</style>
