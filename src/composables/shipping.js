import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'
import { removeUndefinedValues} from '../utils'

import { useViurShopStore } from '../shop'

export function useShipping() {
    const shopStore = useViurShopStore()
    const defaultErrorMessage = "Eine Fehler ist aufgetreten."
    const state = reactive({
        isLoading:false,
        isUpdating:false,
        hasError:false,
        errorMessage: defaultErrorMessage,
        shippingData:[]
    })

    function fetchShippingData() {
        state.isLoading = true
        Request.get(`${shopStore.state.shopApiUrl}/shipping_list`,{dataObj:{
            cart_key: shopStore.state.cartRoot['key']
        }}).then(async (resp)=>{
            let data = await resp.json()
            state.shippingData = data
            if (state.shippingData.length===0){
                state.hasError = true
                state.errorMessage = "Keine passenden Versandarten gefunden."
            }
            state.isLoading = false
        })
    }


    return {
        state,
        fetchShippingData

    }
}