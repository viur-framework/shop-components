import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("shop-message", () => {
  const state = reactive({
    errors: [],
    blacklist: [],
  });

  const errorCounter = computed(() => state.errors.length);

  function reset() {
    state.errors = [];
  }

  return {
    state,
    reset,
    errorCounter,
  };
});
