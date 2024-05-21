<template>
  <div class="viur-shop-loading-wrap" v-if="state.loading">
    <sl-spinner></sl-spinner>
  </div>

  <div class="bind" v-else>
    <div class="page-header">
      <h1>{{ pageHeader }}</h1>
    </div>
    <slot name="filter" v-if="filter">
      text-transform text-transform TEST
    </slot>
    <div class="viur-shop-category-view-list">
      <!-- <router-link
        v-for="item in state.skellist"
        :key="item.shop_name"
        :to="{ name: 'itemView', params: { item: item.key } }"
      > -->

      <div v-for="item in state.skellist" :key="item.shop_name">
        <sl-button @click="openItemView(item.key)">ItemView</sl-button>
        <ItemCard
          :item="item"
          :hasCrossSelling="true"
          :crossSellingFunction="getCrossSellingFunction(item)"
        >
        </ItemCard>
        <sl-dialog :open="isOpen(item.key)" @sl-hide="isClosed(item.key)">
          <ItemView
            :item="item"
            :hasCrossSelling="shopStore.state.hasCrossselling"
            :crossSellingFunction="getCrossSellingFunction(item)"
            :hasUpSelling="shopStore.state.hasUpSelling"
            :upSellingFunction="getCrossSellingFunction(item)"
          ></ItemView>
        </sl-dialog>
        <!-- </router-link> -->
      </div>
    </div>

    <sl-button
      @click="loadMore"
      :loading="state.loading"
      :disabled="state.isLastItem"
      class="viur-shop-category-view-more-button"
    >
      Mehr anzeigen
    </sl-button>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useCartStore } from "../../../stores/cart";
import { useShopStore } from "../../../stores/shop";
import { useRoute } from "vue-router";
import { Request, ListRequest } from "@viur/vue-utils";
// import { ViURShopClient } from "@viur/viur-shop-client";

// component imports
import ItemCard from "../item/ItemCard.vue";
import ItemView from "../item/ItemView.vue";

const props = defineProps({
  skellist: { type: Array },
  filter: { type: Boolean, default: true },
  pageHeader: { type: String, default: "Artikel Liste" },
  listHandler: { type: Object, required: true },
});

const route = useRoute();

const cartStore = useCartStore();
const shopStore = useShopStore();

const state = reactive({
  skellist: [],
  loading: true,
  currentCursor: "",
  isLastItem: false,
  itemCount: 99,
  itemType: computed(() => route.params.identifier),
  hasUpSelling: computed(() => shopStore.state.hasUpSelling),
  hasCrossSelling: computed(() => shopStore.state.hasCrossSelling),
  openItemView: {},
});

// const categoryList = ListRequest("categorystore", {
//           module: "variante",
//           params: { type: "dk", limit: 10 },
//         })
const categoryList = props.listHandler;

const isOpen = (item) => {
  if (state.openItemView.key === item) {
    return true;
  }
  return false;
};

const openItemView = (item) => {
  console.log("geht das?");
  state.openItemView = {};
  if (item) {
    state.openItemView = {
      key: item,
      open: true,
    };
  }
};

function listItems() {
  let params = {
    limit: state.itemCount,
    cursor: state.currentCursor,
    type: state.itemType,
  };

  state.loading = true;

  Request.get("/json/variante/list", { dataObj: params }).then(async (resp) => {
    let data = await resp.json();

    console.log("!!!!!!!!!!!!!!!!!", data)

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

shopStore.state.crossSellingFunction = (item) => {
  let url = "/json/variante";
  const keys = [];
  for (let crossSelling of item.matching_items) {
    console.log(crossSelling);
    keys.push(crossSelling.dest.key);
  }
  console.log(url, keys);
  console.log("crossSelling");
  const params = {
    url: url,
    keys: keys,
  };
  return params;
};

function getCrossSellingFunction(item) {
  return () => shopStore.state.crossSellingFunction(item);
}

shopStore.state.upSellingFunction = (item) => {
  let url = "/json/variante";
  const keys = ["ag1oc2stdml1cjMtZGV2chULEgh2YXJpYW50ZRiAgKDSnIHGCww", "ag1oc2stdml1cjMtZGV2chULEgh2YXJpYW50ZRiAgIDg_9StCgw"];
  // for (let crossSelling of item.matching_items) {
  //   console.log(crossSelling);
  //   keys.push(crossSelling.dest.key);
  // }
  // console.log(url, keys);
  // console.log("crossSelling");
  const params = {
    url: url,
    keys: keys,
  };
  return params;
};

function getUpSellingFunction(item) {
  return () => shopStore.state.upSellingFunction(item);
}

onMounted(async () => {
  await cartStore.init();
  await categoryList.fetch(true);
  state.skellist = categoryList.state.skellist;
  state.loading = false;
  if (state.hasCrossSelling) {
    console.log("!!!!", shopStore.state);

    // state.upselling = false;
    // console.log(shopStore, articleKey);
    // let url="/json/variante?type=hk"

    // const keys = []
    // keys.push("ag1oc2stdml1cjMtZGV2chULEgh2YXJpYW50ZRiAgMDZjrGACAw")
    // keys.push("ag1oc2stdml1cjMtZGV2chULEgh2YXJpYW50ZRiAgMDZjrGACAw")

    // state.upselling = shopStore.getUpsellingItems(url, keys)
  }

  // await cartStore.init();
});
</script>

<style scoped>
.viur-shop-category-view-list {
  display: grid;
  width: 100%;
  grid-gap: var(--sl-spacing-medium);
  grid-template-columns: repeat(4, 1fr);
}

.viur-shop-loading-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  sl-spinner {
    font-size: 3.5em;
    --track-width: 4px;
  }
}
</style>
