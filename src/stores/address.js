// ! WILL BE USED AT A LATER POINT
// ! HIGHEST PRIO IS TO MAKE IT RUN FIRST

import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useAddressStore = defineStore("shop-address", () => {
  const state = reactive({
    adressList: [],
  });

  watch();

  return {
    state,
  };
});
