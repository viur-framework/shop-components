<template>
  <div v-for="item in list" :key="item">
    <RouterLink :to="{ name: 'CategoryView', params: { identifier: 'dk' } }">
      <ItemCard :item="item">
        <img
          slot="image"
          src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
          alt="A kitten."
        />
        <strong> {{ item }}</strong>
        <br />

        <div slot="footer">
          <sl-button variant="primary" pill>Alle anzeigen</sl-button>
        </div>
      </ItemCard>
    </RouterLink>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import ItemCard from "../item/ItemCard.vue";
import { useCartStore } from "../../../stores/cart";

const cartStore = useCartStore();
const props = defineProps({
  list: { type: Array, required: true },
});

onBeforeMount(async () => {
  cartStore.listCarts();

});
</script>
