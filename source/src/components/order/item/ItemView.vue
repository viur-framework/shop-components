<template>
  <div class="wrap">
    <div class="viur-shop-item-view-image-wrap">
      <sl-carousel class="viur-shop-item-view-carousel-thumbnails" navigation loop>
        <sl-carousel-item>
          <img
            :alt="state.item.shop_name"
            :src="getImage(state.item)"
          />
        </sl-carousel-item>
      </sl-carousel>

      <div class="viur-shop-item-view-thumbnails">
        <div class="viur-shop-item-view-thumbnails-scroller">
          <img :alt="state.item.shop_name"
               class="viur-shop-item-view-thumbnails-image active"
               :src="getImage(state.item)" />
        </div>
      </div>
    </div>

    <div class="viur-shop-item-view-info-wrap">
      <h1 class="viur-shop-item-view-headline">{{ state.item.shop_name }}</h1>
      <h2 class="viur-shop-item-view-subline">B 21 x H 6,5 x T 19 cm</h2>

      <div class="viur-shop-item-view-price">
        {{ state.item.shop_price_retail }} €
      </div>

      <div class="viur-shop-item-view-paragraph">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </div>

      <div class="viur-shop-item-view-btn-wrap">
        <sl-button
            size="small"
            class="viur-shop-item-view-add-to-cart-btn"
            variant="primary"
            title="Add to cart"
            @click.stop="cartStore.addToCart(item.key, cartStore.state.currentCart)"
          >
            <sl-icon name="bag-plus"
                     slot="prefix"
                     ></sl-icon>

            In den Warenkorb
          </sl-button>

          <sl-button
            size="small"
            outline
            class="viur-shop-item-view-add-to-favourites-btn"
            variant="primary"
            title="Add to favourites"
          >
            <sl-icon name="heart"
                     slot="prefix"
                     ></sl-icon>
            Auf die Wunschliste
          </sl-button>
      </div>
    </div>

  </div>
  <br>
  <h1 class="viur-shop-item-view-headline">Ähnliche Artikel</h1>
  <div class="viur-shop-item-view-item-grid">
      <ItemCard :item="state.item">
      </ItemCard>

  </div>

</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { Request } from "@viur/vue-utils";
import { useRoute } from "vue-router";
// component imports
import ItemCard from "../item/ItemCard.vue";
import '@viur/shoelace/dist/components/carousel/carousel.js';

const route = useRoute();

const state = reactive({
  item: {},
});

function getImage(item) {
  console.log("hier", item.dk_artikel);
  let imageUrl =
    "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
  if (item?.dk_artikel.dest.image) {
    return Request.downloadUrlFor(item.dk_artikel.dest.image);
  }

  return imageUrl;
}

onBeforeMount(async () => {
  Request.get(`/json/variante/view/${route.params.item}`).then(async (resp) => {
    let data = await resp.json();

    state.item = data.values;
  });
});
</script>

<style scoped>
  .wrap{
    display: grid;
    grid-template-columns: 45% minmax(0 ,1fr);
  }

  .viur-shop-item-view-info-wrap{
    padding: var(--sl-spacing-x-large);
  }

  .viur-shop-item-view-image-wrap{
    display: flex;
    flex-direction: column;
  }

  sl-carousel{
    aspect-ratio: 1;
    background-color: var(--sl-color-neutral-200);

    &::part(base){
      display: flex;
      gap: 0;
     }

     &::part(scroll-container){
      border-radius: 0;
      }

    &::part(navigation-button){
      position: absolute;
      background-color: color-mix(in hsl, var(--sl-color-neutral-0) 85%, transparent);
      color: var(--app-primary-color);
      border-radius: 0;
      transition: all ease.3s;
      opacity: 0;
     }

    &::part(navigation-button--previous){
      left: 0;
     }

    &::part(navigation-button--next){
      right: 0;
     }

    &:hover{
      &::part(navigation-button){
        opacity: 1;
       }
     }
  }

  .viur-shop-item-view-thumbnails {
    display: flex;
    justify-content: start;
    margin-top: vaR(--sl-spacing-medium)
  }

  .viur-shop-item-view-thumbnails-scroller {
    display: flex;
    gap: var(--sl-spacing-small);
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-padding: var(--sl-spacing-small);

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .viur-shop-item-view-thumbnails-image {
    width: 64px;
    height: 64px;
    object-fit: cover;
    opacity: 0.3;
    will-change: opacity;
    transition: 250ms opacity;
    cursor: pointer;

    &.active {
      opacity: 1;
    }
  }


  .viur-shop-item-view-headline{
    margin-bottom: var(--sl-spacing-small);
  }

  .viur-shop-item-view-subline{
    margin-bottom: var(--sl-spacing-small);
  }

  .viur-shop-item-view-price{
    font-size: 1.4em;
    margin-bottom: var(--sl-spacing-small);
  }

  .viur-shop-item-view-paragraph{
    margin-bottom: var(--sl-spacing-x-large);
  }

  .viur-shop-item-view-btn-wrap{
    display: flex;
    flex-direction: column;

    sl-button{
      margin-bottom: var(--sl-spacing-x-small);
    }
  }

  .viur-shop-item-view-item-grid{
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-gap: var(--sl-spacing-medium);
  }
</style>
