<template>
  <div class="viur-shop-item-wrapper">
    <sl-card
      horizontal
      class="viur-shop-cart-leaf-small"
    >
      <img
        class="viur-shop-cart-leaf-image"
        slot="image"
        :src="getImage(item?.shop_image ? item.shop_image : undefined)"
      />
      <h4
        class="viur-shop-cart-leaf-headline headline"
        v-html="getValue(item.shop_name)"
      ></h4>

      <sl-input
        :disabled="!edit"
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity"
        type="number"
        placeholder="Number"
        min="0"
        noSpinButtons
        :value="item.quantity"
        @sl-change="changeAmount($event.target.value)"
      >
        <dialog-Button
          slot="prefix"
          class="decent"
          v-if="item.quantity === 1"
          variant="danger"
          outline
          :disabled="!edit"
        >
          <sl-icon name="trash"></sl-icon>
          <template #dialog="{ close }">
            {{ $t("messages.remove_article_from_cart") }}
            <sl-bar>
              <sl-button
                slot="left"
                @click="close"
                >{{ $t("actions.cancel") }}</sl-button
              >
              <sl-button
                slot="right"
                variant="danger"
                @click="
                  removeArticle()
                  close()
                "
                >{{ $t("actions.delete") }}</sl-button
              >
            </sl-bar>
          </template>
        </dialog-Button>
        <sl-button
          slot="prefix"
          v-else
          :disabled="!edit"
          @click="changeAmount((item.quantity -= 1))"
        >
          <sl-icon name="dash-lg"></sl-icon>
        </sl-button>
        <sl-button
          slot="suffix"
          :disabled="!edit"
          @click="changeAmount((item.quantity += 1))"
        >
          <sl-icon name="plus-lg"></sl-icon>
        </sl-button>
      </sl-input>

      <div class="viur-shop-cart-leaf-article-number">
        <div class="viur-shop-cart-leaf-label">{{ $t("viur.shop.article_number") }}</div>
        {{ getValue(item.shop_art_no_or_gtin) }}
      </div>

      <div class="viur-shop-cart-leaf-unitprice">
        <div class="viur-shop-cart-leaf-label">{{ $t("viur.shop.unit_price") }}</div>
        <price-box :item="item"></price-box>
      </div>

      <div class="viur-shop-cart-leaf-price">
        <div class="viur-shop-cart-leaf-label">{{ $t("viur.shop.total_price") }}</div>
        <price-box
          :item="item"
          :amount="item.quantity"
          :retail="false"
        ></price-box>
      </div>
    </sl-card>
    <div
      class="loading"
      v-if="cartState.isUpdating"
    >
      <sl-spinner></sl-spinner>
    </div>
  </div>
</template>
<script setup>
import { useDebounceFn } from "@vueuse/core"
import { getImage } from "../utils"
import { useCart } from "../composables/cart"
import dialogButton from "./dialogButton.vue"
import PriceBox from "./PriceBox.vue"

const { addItem, removeItem, state: cartState, getValue } = useCart()

const changeAmount = useDebounceFn((amount) => {
  props.item.quantity = amount
  addItem(props.item["article"]["dest"]["key"], amount)
}, 1000)

const props = defineProps({
  item: {
    required: true
  },
  edit: {
    type: Boolean,
    default: false //true
  }
})

function removeArticle() {
  removeItem(props.item["article"]["dest"]["key"])
}
</script>
<style scoped>
@layer foundation.shop {
  .viur-shop-cart-leaf-small {
    --shop-leaf-label-color: var(--ignt-color-primary);
    --shop-leaf-label-font-weight: 600;
    --shop-leaf-label-font-size: 1em;
    --shop-leaf-price-font-size: 1em;
    --shop-leaf-headline-font-size: 1.3em;

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
      flex-basis: 120px;
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

  .viur-shop-cart-leaf-price {
    grid-column: 5 / span 1;
    align-self: flex-end;
    text-align: right;
    font-size: var(--shop-leaf-price-font-size);
  }

  .viur-shop-cart-leaf-article-number {
    align-self: flex-end;
    grid-column: span 2;
  }

  .viur-shop-cart-leaf-quantity {
    align-self: flex-end;
  }

  .viur-shop-cart-leaf-unitprice {
    align-self: flex-end;
    grid-column: 4 / span 1;
    text-align: right;
  }

  .viur-shop-cart-leaf-label,
  .viur-shop-cart-leaf-value--quantity::part(form-control-label) {
    color: var(--shop-leaf-label-color);
    font-weight: var(--shop-leaf-label-font-weight);
    font-size: calc(var(--shop-leaf-label-font-size) * 0.75);
    margin-bottom: var(--ignt-spacing-2x-small);
  }

  .loading {
    position: absolute;
    top: 0;
    background: #ffffffcc;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    & sl-spinner {
      font-size: 3rem;
    }
  }

  .viur-shop-item-wrapper {
    position: relative;
  }

  .viur-shop-cart-leaf-value--quantity {
    align-self: center;
    grid-column: span 1;

    &::part(input) {
      text-align: center;
      padding: 0;
    }

    sl-button {
      margin: 0;
      transition: all ease 0.3s;

      &::part(base) {
        background-color: transparent;
        border: none;
      }

      &::part(label) {
        padding: 0;
        height: var(--sl-input-height-medium);
        width: calc(var(--sl-input-height-medium) / 5 * 4);
      }
    }
  }
}
</style>
