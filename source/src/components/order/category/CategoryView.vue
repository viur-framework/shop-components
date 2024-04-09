<template>
  <div class="item-list">
    <router-link
      :to="{ name: 'itemView', params: { item: item.key } }"
      v-for="item in state.skellist"
      :key="item.shop_name"
    >
      <ItemCard>
        <img slot="image" :src="getImage(item)" alt="A kitten." />
        <strong> {{ item.shop_name }}</strong>
        <br />
        <div slot="footer">
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
          {{ item.shop_price_retail }}
        </div>
      </ItemCard>
    </router-link>
  </div>

  <sl-button
    @click="loadMore"
    :loading="state.loading"
    :disabled="state.isLastItem"
  >
    Mehr anzeigen
  </sl-button>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useCartStore } from "../../../stores/cart";
import { useRoute } from "vue-router";
import { Request, ListRequest } from "@viur/vue-utils";
// import { ViURShopClient } from "@viur/viur-shop-client";

// component imports
import ItemCard from "../item/ItemCard.vue";

const route = useRoute();

const cartStore = useCartStore();

const state = reactive({
  skellist: [],
  loading: true,
  currentCursor: "",
  isLastItem: false,
  itemCount: 99,
  itemType: computed(() => route.params.identifier),
});

const categoryList = ListRequest("categorystore", {
  module: "variante",
  params: { type: state.itemType, limit: state.itemCount },
});

function listItems() {
  let params = {
    limit: state.itemCount,
    cursor: state.currentCursor,
    type: state.itemType,
  };

  state.loading = true;

  Request.get("/json/variante/list", { dataObj: params }).then(async (resp) => {
    let data = await resp.json();

    if (data.cursor !== state.currentCursor && !state.isLastItem) {
      state.currentCursor = data.cursor;
      state.skellist.push(...data.skellist);
      state.loading = false;
    } else if (data.cursor === state.currentCursor) {
      state.isLastItem = true;
      state.loading = false;
    }

    console.log("hier", data);
  });
}

async function loadMore() {
  state.loading = true;
  await categoryList.next();

  if (state.skellist.length < categoryList.state.skellist.length) {
    state.skellist = categoryList.state.skellist;
    state.loading = false;
  } else {
    state.loading = false;
    state.isLastItem = true;
  }
}

function getImage(item) {
  let imageUrl =
    "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
  if (item.dk_artikel.dest.image) {
    return Request.downloadUrlFor(item.dk_artikel.dest.image);
  }

  return imageUrl;
}

onMounted(async () => {
  await categoryList.fetch(true);
  state.skellist = categoryList.state.skellist;
  state.loading = false;
  // listItems();
  // cartStore.listCarts();
});
</script>
