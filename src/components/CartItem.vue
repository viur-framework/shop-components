<template>
    <sl-card horizontal class="viur-shop-cart-leaf small">
    <img
      class="viur-shop-cart-leaf-image"
      slot="image"
      :src="
        getImage(
            item?.shop_image
            ? item.shop_image
            : undefined,
        )
      "
    />
    <h4
      class="viur-shop-cart-leaf-headline headline"
      v-html="item.shop_name"
    ></h4>
    <h5 class="viur-shop-cart-leaf-artno">
      {{ item.shop_art_no_or_gtin }}
    </h5>
    <div
      v-if="itemstyle!=='small'"
      class="viur-shop-cart-leaf-description"
      v-html="item.shop_description"
    ></div>
    <div class="viur-shop-cart-leaf-quantity">
      <sl-input
        :disabled="!edit"
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity"
        type="number"
        label="Anzahl"
        placeholder="Number"
        min="0"
        :value="item.quantity"
        ref="itemCount"
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
        :value="item.shop_price_retail"
      >
      </sl-format-number>
    </div>

    <div class="viur-shop-cart-leaf-actions">
      <sl-button
        v-if="edit"
        size="small"
        outline
        class="viur-shop-cart-leaf-delete-btn"
        variant="primary"
        title="Remove from cart"
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
        :value="item.shop_price_retail * item.quantity"
      >
      </sl-format-number>
    </div>
  </sl-card>
</template>
<script setup>
import { getImage } from '../utils';
const props = defineProps({
    item:{
        required:true
    },
    itemstyle:{
      default:"default" //small
    },
    edit:{
      type:Boolean,
      default:false //true
    }
})

</script>
<style scoped>
@layer foundation.shop {
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
    height: fit-content;
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
}
</style>