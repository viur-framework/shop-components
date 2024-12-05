<template>
  <div class="item-wrapper">
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
        @sl-change="changeAmount"
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
      <dialogButton
        v-if="edit"
        size="small"
        outline
        class="viur-shop-cart-leaf-delete-btn"
        variant="danger"
        title="Remove from cart"
      >
        <sl-icon name="trash" slot="prefix"></sl-icon>
        <template #dialog="{close}">
          Wollen sie den Artikel wirklich entfernen?
          <sl-bar>
            <sl-button slot="left" @click="close">Abbrechen</sl-button>
            <sl-button slot="right" variant="danger" @click="removeArticle(); close()">Löschen</sl-button>
          </sl-bar>
        </template>
      </dialogButton>
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
  <div class="loading" v-if="cartState.isUpdating">
      <sl-spinner></sl-spinner>
    </div>
  </div>
</template>
<script setup>
import { useDebounceFn } from '@vueuse/core'
import { getImage } from '../utils';
import { useCart } from '../composables/cart';
import dialogButton from './dialogButton.vue';

const {addItem, removeItem, state:cartState} = useCart()

const changeAmount = useDebounceFn((event) => {
  props.item.quantity = event.target.value
  addItem(props.item['article']['dest']['key'],event.target.value)
}, 1000)
const props = defineProps({
    item:{
        required:true
    },
    edit:{
      type:Boolean,
      default:false //true
    }
})

function removeArticle(){
  removeItem(props.item['article']['dest']['key'])
}

</script>
<style scoped>
@layer foundation.shop {
  .viur-shop-cart-leaf {
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

  .loading{
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


    & sl-spinner{
      font-size:3rem;
    }
  }

  .item-wrapper{
    position: relative;
  }

}
</style>