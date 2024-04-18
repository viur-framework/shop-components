<template>
    <RouterLink :to="{ name: 'CategoryView', params: { identifier: 'dk' } }"
                v-for="item in list"
                :key="item"
                class="item-link"
    >
      <sl-card class="item">
        <img
          slot="image"
          src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
          alt="A kitten."
          class="item-img"
        />
        <h2 class="item-headline"> {{ item }}</h2>
        <div class="fake-link">Alle anzeigen &raquo;</div>

      </sl-card>
    </RouterLink>
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
  await cartStore.init();
});
</script>

<style scoped>

.item-link{
  display: flex;
  flex-direction: column;
  width: 100%;

  &:hover{
    .fake-link{
      text-decoration: underline;
    }

    .item-img{
      transform: scale(1.02);
    }
 }
}

.item{
  width: 100%;

  &::part(header){
    padding: var(--sl-spacing-medium) 0;
   }

  &::part(body){
    padding: var(--sl-spacing-medium) 0;
   }

  &::part(footer){
    padding: var(--sl-spacing-medium) 0;
   }
}

.item-headline{
  font-size: 1.4em;
  margin-bottom: var(--sl-spacing-medium);
  color: var(--ignt-basic-color-text);
}

.item-img{
  aspect-ratio: 1;
  object-fit: cover;
  transition: all ease .3s;
 }


</style>
