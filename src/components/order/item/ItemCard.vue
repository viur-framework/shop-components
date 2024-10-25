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
    <div class="viur-shop-item-card-footer" slot="footer">
      <!-- <sl-button-group label="Amount">
              <sl-tooltip content="Remove">
                <sl-icon-button
                  variant="primary"
                  name="cart-dash"
                  label="Remove Amount"
                  style="font-size: 2em"
                >
                </sl-icon-button>
              </sl-tooltip>
              <sl-tooltip content="Plus">
                <sl-icon-button
                  variant="primary"
                  name="cart-plus"
                  label="Add Amount"
                  style="font-size: 2em"
                >
                </sl-icon-button>
              </sl-tooltip>
              <sl-tooltip content="Add to cart">
                <sl-icon-button
                  variant="primary"
                  name="cart-check"
                  label="Add to cart"
                  style="font-size: 2em"
                  @click="
                    cartStore.addToCart(item.key, cartStore.state.currentCart)
                  "
                >
                </sl-icon-button>
              </sl-tooltip>
            </sl-button-group> -->
      <sl-button
        size="small"
        class="viur-shop-item-card-add-to-cart-btn"
        variant="primary"
        title="Add to cart"
        @click.stop="cartStore.addToCart(item.key, cartStore.state.basket)"
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
    </div>
  </sl-card>
</template>

<script setup>
import { Request } from "@viur/vue-utils";
import { useCartStore } from "../../../stores/cart";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

function getImage(item) {
  let imageUrl =
    "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
  if (item.dk_artikel.dest.image) {
    return Request.downloadUrlFor(item.dk_artikel.dest.image);
  }

  return imageUrl;
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
