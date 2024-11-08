<template>
  <div class="viur-shop-sub-cart-wrap" v-if="node.children" :summary="node.name">
    <div class="viur-shop-sub-cart-head">
      <div class="viur-shop-sub-cart-preview">
        <!-- hier bis zu 4 bilder der nodes einfügen -->
        <img src="https://serene-allen-537100.netlify.app/assets/examples/carousel/mountains.jpg">
        <img src="https://serene-allen-537100.netlify.app/assets/examples/carousel/mountains.jpg">
        <img src="https://serene-allen-537100.netlify.app/assets/examples/carousel/mountains.jpg">
        <img src="https://serene-allen-537100.netlify.app/assets/examples/carousel/mountains.jpg">
      </div>
      <div class="viur-shop-sub-cart-head-inner">
        <h3 class="viur-shop-sub-cart-headline headline">{{ node.name }}</h3>
        <div>Artikel: 12</div>
        <div>Gesamtpreis: 12.345,00 €</div>
      </div>
      <sl-button size="large" class="viur-shop-sub-cart-btn">
        <sl-icon name="chevron-drown"></sl-icon>
      </sl-button>
    </div>
    <div class="viur-shop-sub-cart-list">
      <slot></slot>
    </div>
  </div>
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

.viur-shop-sub-cart-head{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--sl-spacing-large);
  margin-bottom: var(--sl-spacing-x-large);
}

.viur-shop-sub-cart-head-inner{
  flex: 1 1 auto;
  width: 1px;

}

.viur-shop-sub-cart-headline{
  margin-bottom: var(--sl-spacing-2x-small);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.viur-shop-sub-cart-preview{
  aspect-ratio: 1;
  overflow: hidden;
  min-width: 5em;
  width: 5.5em;
  display: grid;
  grid-template-columns: 50% 50%;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    &:nth-child(1){
      grid-column: span 2;

      &:has(+ img){
        grid-column: span 1;
        aspect-ratio: 1;
      }
    }

    &:nth-child(3){
      grid-column: span 2;
      aspect-ratio: 2/1;

      &:has(+ img){
        grid-column: span 1;
        aspect-ratio: 1;
      }
    }
  }
}

.viur-shop-sub-cart-btn{
  margin-left: auto;

  &::part(base){
    width: var(--sl-input-height-large);
  }
}

.viur-shop-sub-cart-wrap{
  margin-bottom: var(--sl-spacing-2x-large);
  border-bottom: 1px solid var(--sl-color-neutral-400);

  & .viur-shop-sub-cart-wrap{
    margin-left: var(--sl-spacing-large);
  }
}
</style>
