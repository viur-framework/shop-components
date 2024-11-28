
import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Request } from "@viur/vue-utils";

export const useViurShopStore = defineStore("viurshopStore", () => {
    const state = reactive({
        
    })

    return {
        state,
    }
})
