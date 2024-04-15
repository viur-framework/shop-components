<template>
  <div class="item-list">
    <router-link
      v-for="item in state.skellist"
      :key="item.shop_name"
      :to="{ name: 'itemView', params: { item: item.key } }"
    >
      <ItemCard :item="item"> </ItemCard>
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

onMounted(async () => {
  await categoryList.fetch(true);
  state.skellist = categoryList.state.skellist;
  state.loading = false;

  // await cartStore.init();
});
</script>

<style scoped>
.item-list {
  display: grid;
  width: 100%;
  grid-gap: var(--sl-spacing-medium);
  grid-template-columns: repeat(4, 1fr);
}
</style>
