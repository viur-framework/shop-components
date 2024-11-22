<template>
  <!-- <pre v-for="item in list">
    {{ item }}
  </pre> -->
  <sl-table-wrapper searchable sortable>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Anzahl</th>
          <th>Preis</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(item, index) in list">
          <tr v-if="index < count">
            <td>
              <img
                :src="Request.downloadUrlFor(item.shop_image)"
                alt=""
                style="width: 50px; height: 50px; object-fit: cover"
                v-if="item?.shop_image"
              />
              <img
                :src="cartStore.state.placeholder"
                alt=""
                style="width: 50px; height: 50px; object-fit: cover"
                v-else
              />
            </td>

            <td>{{ item.shop_name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.shop_price_retail * item.quantity }}</td>
          </tr>
          <div v-else-if="index === list.length - 1">...</div>
        </template>
      </tbody>
    </table>
  </sl-table-wrapper>
  <div v-if="showTrigger">
    <sl-button v-if="!showMore" @click="showMore = !showMore">
      Mehr anzeigen
    </sl-button>
    <sl-button v-else @click="showMore = !showMore">
      Weniger anzeigen
    </sl-button>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { Request } from "@viur/vue-utils";
import { useCartStore } from "../../../stores/cart";

const props = defineProps({
  list: { type: Array, required: true },
  limit: { type: Number, default: 4 },
});

const cartStore = useCartStore();

const showTrigger = computed(() => props.list.length > props.limit);
const showMore = ref(false);
const count = computed(() =>
  showMore.value ? props.list.length : props.limit,
);
</script>
