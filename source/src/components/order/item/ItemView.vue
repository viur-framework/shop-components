<template>
  <img :src="getImage(state.item)" alt="" />
  <div>{{ state.item.shop_name }}</div>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { Request } from "@viur/vue-utils";
import { useRoute } from "vue-router";

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
