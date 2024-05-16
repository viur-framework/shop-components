<template>
  <sl-card class="viur-shop-item-card-card">
    <img
      slot="image"
      :src="getImage(item)"
      :alt="item.shop_name"
      loading="lazy"
      class="viur-shop-item-card-image"
    />
    <h3 class="viur-shop-item-card-headline">{{ item.shop_name }}</h3>
    <h4 class="viur-shop-item-card-subline">B 21 x H 6,5 x T 19 cm</h4>
    <div class="viur-shop-item-card-price">{{ item.shop_price_retail }} €</div>

    <sl-button
      size="small"
      class="viur-shop-item-card-add-to-cart-btn"
      variant="primary"
      title="Add to cart"
      @click.stop="addToCart(item, cartStore.state.basket)"
      :disabled="state.disabledAddToCart"
    >
      <sl-icon name="bag-plus" slot="prefix"></sl-icon>

      In den Warenkorb
    </sl-button>
    <sl-button
      size="small"
      outline
      class="viur-shop-item-card-add-to-favourites-btn"
      variant="primary"
      title="Add to favourites"
    >
      <sl-icon name="heart" slot="prefix"></sl-icon>
    </sl-button>

    <sl-dialog :open="state.addedToCart" @sl-hide="state.addedToCart = false">
      <div>
        Der Artikel {{ item.shop_name }} wurde zum Warencorb hinzugefügt
      </div>
    </sl-dialog>
  </sl-card>
</template>

<script setup>
import { reactive, computed, onBeforeMount, ref } from "vue";
import { useCartStore } from "../../../stores/cart.js";
//import { useShopStore } from "../../../stores/shop.js";
import { Request } from "@viur/vue-utils";

const props = defineProps({
  cartKey: { type: String, default: "" },
  item: { type: Object, default: {} },
});

const cartStore = useCartStore();
// const shopStore = useShopStore();

// Define emits
const emit = defineEmits(["cancel"]);

const state = reactive({
  images: {},
  currentItem: {},
  crossselling: false,
  disabledAddToCart: false,
});

const item = computed(() => {
  return props.item;
});

function getImage(item) {
  let imageUrl =
    "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
  if (item.hk_artikel.dest.image) {
    return Request.downloadUrlFor(item.hk_artikel.dest.image);
  }

  return imageUrl;
}

const cancel = () => {
  // Emit an event to notify parent component to close the dialog
  emit("cancel");
  state.disabledAddToCart = false;
};

function addToCart(item, basket) {
  console.log("item", item);
  cartStore.addToCart(item.key, basket);
  state.addedToCart = true;
  state.disabledAddToCart = true;
}
</script>

<style scoped>
.viur-shop-item-card-card {
  width: 100%;

  &::part(header) {
    padding: var(--sl-spacing-medium) 0;
  }

  &::part(body) {
    padding: var(--sl-spacing-medium) 0;
  }

  &::part(footer) {
    padding: var(--sl-spacing-medium) 0;
  }

  &:hover {
    .viur-shop-item-card-add-to-cart-btn {
      opacity: 1;
    }

    .viur-shop-item-card-headline {
      color: var(--sl-color-primary-500);
    }

    .viur-shop-item-card-image {
      transform: scale(1.02);
    }
  }
}

.viur-shop-item-card-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.viur-shop-item-card-add-to-cart-btn {
  transition: all ease 0.3s;
  margin-right: var(--sl-spacing-medium);
  opacity: 0;
}

.viur-shop-item-card-add-to-favourites-btn {
  margin-left: auto;
}

.viur-shop-item-card-image {
  aspect-ratio: 1;
  object-fit: cover;
  transition: all ease 0.3s;
}

.viur-shop-item-card-headline {
  font-size: 1.1em;
  font-weight: bold;
  color: var(--ignt-basic-color-text);
  margin-bottom: var(--sl-spacing-2x-small);
  transition: all ease 0.3s;
}

.viur-shop-item-card-subline {
  color: var(--ignt-basic-color-text);
  margin-bottom: var(--sl-spacing-2x-small);
}

.viur-shop-item-card-price {
  font-size: 1.1em;
  font-weight: bold;
  color: var(--ignt-basic-color-text);
  margin-left: auto;
}

</style>
