import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Request } from "@viur/vue-utils";
import {useCartStore} from "./cart";
import { useOrderStore } from './order';

export const useShippingStore = defineStore("shop-shipping", () => {
    const cartStore = useCartStore()
    const orderStore = useOrderStore()

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
                cart_key: cartStore.state.currentbasketKey,
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

    async function updateCart(){
        if (!state.selectedShippingMethod) return false
        let result = await cartStore.state.shopClient.cart_update({
            cart_key: orderStore.state.currentOrder.cart.dest.key,
            shipping_key: state.selectedShippingMethod['dest']['key']
        })
        if (!result?.['shipping']){
            return false
        }
        return true
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
        initShipping,
        updateCart
    }
})
