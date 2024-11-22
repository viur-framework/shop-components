<template>
  <!-- <pre v-for="item in list">
    {{ item }}
  </pre> -->
  <sl-table-wrapper>
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
        <tr v-for="item in list">
          <td>
            <img
              :src="Request.downloadUrlFor(item.shop_image)"
              alt=""
              v-if="item.shop_image"
            />
            <p v-else>KEIN BILD</p>
          </td>

          <td>{{ item.shop_name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.shop_price_retail * item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </sl-table-wrapper>
</template>
<script setup>
import { reactive } from "vue";
import { Request } from "@viur/vue-utils";

const props = defineProps({
  list: { type: Array, required: true },
});
</script>
