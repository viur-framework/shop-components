import { reactive } from "vue";
import { Request } from "@viur/vue-utils";
import { defineStore } from "pinia";

export const useShopStore = defineStore("shopstore", () => {
  const state = reactive({
    hasCrossSelling: true,
    crossSellingItems: [],
    crossSellingFunction: "",
    hasUpSelling: true,
    upSellingItems: [],
    upSellingFunction: "",
  });

  async function getCrossSellingItems(url, keys) {
    state.crossSellingItems = [];
    let isCrossSelling = false;

    for (let key of keys) {
      Request.get(`http://localhost:8080${url}?key=${key}`).then(
        async (resp) => {
          let data = await resp.json();
          console.log(data);
          state.crossSellingItems.push(data.skellist[0]);
          isCrossSelling = true;
        },
      );
    }

    return isCrossSelling;
  }

  async function getUpSellingItems(url, keys) {
    state.crossSellingItems = [];
    let isCrossSelling = false;

    for (let key of keys) {
      Request.get(`http://localhost:8080${url}?key=${key}`).then(
        async (resp) => {
          let data = await resp.json();
          console.log(data);
          state.upSellingItems.push(data.skellist[0]);
          isUpSelling = true;
        },
      );
    }

    return isUpSelling;
  }

  return {
    state,
    getCrossSellingItems,
  };
});
