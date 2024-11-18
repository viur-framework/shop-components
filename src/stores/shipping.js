import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Request } from "@viur/vue-utils";
import {useCartStore} from "./cart";

export const useShippingStore = defineStore("shippingStore", () => {
    const cartStore = useCartStore()
  
    const state = reactive({
        shippingData: [], //shippingoptions
        selectedShippingMethod:null    
    })

    async function getShippingData() {
        /*Fetch possible Shipping types*/
        state.shippingData = await cartStore.state.shopClient.shipping_list({
            cart_key: cartStore.state.basketRootNode.key,
        })
    }

    return {
        state,
        getShippingData
    }
})
