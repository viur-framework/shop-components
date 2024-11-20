import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Request } from "@viur/vue-utils";
import {useCartStore} from "./cart";

export const usePaymentStore = defineStore("payment-shipping", () => {
    const cartStore = useCartStore()

    const state = reactive({
        paymentProviders: [], //payment options
        paymentSelection:null,
        isLoading:false,
        isUpdating:false,
        hasError:false,
        errorMessage:"",
        init:true //fetch onMount and store is ready
    })

    async function getPaymentProviders() {
        state.paymentSelection = null
        state.isLoading = true
        state.isUpdating = false
        state.hasError = false
        try{
            let providersObject = await cartStore.state.shopClient.payment_providers_list()
            state.paymentProviders = Object.entries(providersObject) // cardselector needs a list
            state.isLoading = false
            if(state.paymentProviders.length===0){
                state.hasError = true
                state.errorMessage = "Keine gültige Bezahlart gefunden."
            }
        } catch (error) {
            console.log(error)
            state.isLoading = false
            state.hasError = true
            state.errorMessage = "Keine gültige Bezahlart gefunden."
        }
    }

    async function initPayment(){
        if (!state.init) return false

        await cartStore.init() // ensure store config starts loading
        if (cartStore.state.isReady){
            await getPaymentProviders() // request Payment data based on current cart
        }

        return true
    }

    watch(()=>cartStore.state.isReady, async(newVal, oldVal)=>{
        if (state.init){
            await getPaymentProviders() // auto fetch if shop is ready
        }
    })

    return {
        state,
        getPaymentProviders,
        initPayment
    }
})
