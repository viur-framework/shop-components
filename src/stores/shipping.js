import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Request } from "@viur/vue-utils";
import {useCartStore} from "./cart";

export const useShippingStore = defineStore("shop-shipping", () => {
    const cartStore = useCartStore()

    const state = reactive({
        shippingData: [], //shippingoptions
        selectedShippingMethod:null,
        isLoading:false,
        isUpdating:false,
        hasError:false,
        errorMessage:"",
        init:true //fetch onMount or store is ready
    })

    async function getShippingData() {
        state.shippingSelection = null
        state.isLoading = true
        state.isUpdating = false
        state.hasError = false
        try{
            state.shippingData = await cartStore.state.shopClient.shipping_list({
                cart_key: cartStore.state.basket.key,
            })
            state.isLoading = false
            if(state.shippingData.length===0){
                state.hasError = true
                state.errorMessage = "Keine gültige Versandart gefunden."
            }
        } catch (error) {
            state.isLoading = false
            state.hasError = true
            state.errorMessage = "Keine gültige Versandart gefunden."
        }
    }

    async function initShipping(){
        if (! state.init) return false

        await cartStore.init() // ensure store config starts loading
        if (cartStore.state.isReady){
            await getShippingData() // request shipping data based on current cart
        }

        return true
    }

    watch(()=>cartStore.state.isReady, async(newVal, oldVal)=>{
        if (state.init){
            await getShippingData() // auto fetch if shop is ready
        }
    })

    return {
        state,
        getShippingData,
        initShipping
    }
})
