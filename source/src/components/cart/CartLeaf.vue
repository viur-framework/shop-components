<template>
  <!-- Debugging -->
  <!-- <pre>{{ state.leaf.article.dest.key }}</pre>
  <pre>{{ state.leaf.article.dest.article }}</pre> -->

  <sl-card horizontal class="viur-shop-cart-leaf">
    <img
      class="viur-shop-cart-leaf-image"
      slot="image"
      :src="
        getImage(
          state.leaf.article.dest.shop_image
            ? state.leaf.article.dest.shop_image
            : undefined,
        )
      "
    />
    <h4
      class="viur-shop-cart-leaf-headline headline"
      v-html="state.leaf.article.dest.shop_name"
    ></h4>
    <h5 class="viur-shop-cart-leaf-artno">
      {{ state.leaf.article.dest.shop_art_no_or_gtin }}
    </h5>
    <div
      class="viur-shop-cart-leaf-description"
      v-html="state.leaf.article.dest.shop_description"
    ></div>
    <div class="viur-shop-cart-leaf-quantity">
      <sl-input
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity"
        type="number"
        label="Anzahl"
        placeholder="Number"
        min="0"
        v-model="state.leaf.quantity"
        @input="
          updateItem(
            state.leaf,
            state.leaf.article.dest.key,
            node,
            state.leaf.quantity,
          )
        "
      >
      </sl-input>
    </div>
    <div class="viur-shop-cart-leaf-unitprice">
      <div class="viur-shop-cart-leaf-label">Stückpreis</div>
      <sl-format-number
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice"
        lang="de"
        type="currency"
        currency="EUR"
        :value="leaf.shop_price_retail"
      >
      </sl-format-number>
    </div>

    <div class="viur-shop-cart-leaf-actions">
      <sl-button
        size="small"
        outline
        class="viur-shop-cart-leaf-add-to-favourites-btn"
        variant="primary"
        title="Add to favourites"
      >
        <sl-icon name="heart" slot="prefix"></sl-icon>
      </sl-button>
      <sl-button
        size="small"
        outline
        class="viur-shop-cart-leaf-delete-btn"
        variant="primary"
        title="Remove from cart"
        @click="removeItem(state.leaf, state.leaf.article.dest.key, node)"
      >
        <sl-icon name="trash" slot="prefix"></sl-icon>
      </sl-button>
    </div>

    <div class="viur-shop-cart-leaf-price">
      <div class="viur-shop-cart-leaf-label">Gesamtpreis</div>
      <sl-format-number
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price"
        lang="de"
        type="currency"
        currency="EUR"
        :value="leaf.shop_price_retail * leaf.quantity"
      >
      </sl-format-number>
    </div>
  </sl-card>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { Request } from "@viur/vue-utils";

const props = defineProps({
  leaf: { type: Object, required: true },
  node: { type: Object, required: true },
  placeholder: { type: String, required: true },
});

const emit = defineEmits(["updateItem", "removeItem"]);

const state = reactive({
  leaf: {},
});

function getImage(image) {
  if (image !== undefined) return Request.downloadUrlFor(image);

  return props.placeholder;
}

function updateItem(item, articleKey, node, quantity) {
  emit("updateItem", {
    item: item,
    articleKey: articleKey,
    node: node,
    quantity: quantity,
  });
}

function removeItem(item, articleKey, node) {
  emit("removeItem", { item: item, articleKey: articleKey, node: node });
}

onBeforeMount(() => {
  state.leaf = props.leaf;
});
</script>

<style scoped>
.viur-shop-cart-leaf {
  --shop-leaf-label-color: var(--ignt-color-primary);
  --shop-leaf-label-font-weight: 600;
  --shop-leaf-label-font-size: 1em;
  --shop-leaf-price-font-size: 1em;
  --shop-leaf-headline-font-size: 1.3em;

  margin-bottom: var(--ignt-spacing-x-large);

  &::part(base) {
    display: flex;
    position: relative;
  }

  &::part(header) {
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
  }

  &::part(image) {
    aspect-ratio: 1;
  }

  &::part(body) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--sl-spacing-medium);
    padding: var(--sl-spacing-large);
    height: 100%;
  }

  &::part(group) {
    padding: 0;
  }

  @media (max-width: 600px) {
    &::part(body) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--sl-spacing-medium);
      padding: var(--sl-spacing-large);
      height: 100%;
    }

    &::part(image) {
      border-radius: var(--border-radius);
      align-self: baseline;
    }
  }
}

.viur-shop-cart-leaf-image {
  aspect-ratio: 1;
}

.viur-shop-cart-leaf-headline {
  grid-column: 1 / span 4;
  order: -2;
  margin: 0;
  font-size: var(--shop-leaf-headline-font-size);

  @media (max-width: 600px) {
    grid-column: 1 / span 2;
  }
}

.viur-shop-cart-leaf-artno {
  grid-column: 1 / span 5;
  margin: 0;

  @media (max-width: 600px) {
    grid-column: 1 / span 2;
  }
}

.viur-shop-cart-leaf-actions {
  display: flex;
  justify-content: start;
  gap: var(--sl-spacing-x-small);

  @media (min-width: 600px) {
    grid-column: 5 / span 1;
    order: -1;
    justify-content: end;
    align-items: end;
  }
}

.viur-shop-cart-leaf-description {
  grid-column: 1 / span 5;
  margin-bottom: var(--ignt-spacing-small);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:deep(*) {
    margin: 0;
  }

  @media (max-width: 600px) {
    grid-column: span 2;
  }

  @media (max-width: 500px) {
    display: none;
  }
}

.viur-shop-cart-leaf-price {
  align-self: flex-end;
  text-align: right;
  font-size: var(--shop-leaf-price-font-size);
}

.viur-shop-cart-leaf-quantity {
  align-self: flex-end;
}

.viur-shop-cart-leaf-unitprice {
  align-self: flex-end;

  @media (max-width: 600px) {
    text-align: right;
  }
}

.viur-shop-cart-leaf-label,
.viur-shop-cart-leaf-value--quantity::part(form-control-label) {
  color: var(--shop-leaf-label-color);
  font-weight: var(--shop-leaf-label-font-weight);
  font-size: var(--shop-leaf-label-font-size);
  margin-bottom: var(--ignt-spacing-x-small);
}
</style>
