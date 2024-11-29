import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'
import { removeUndefinedValues} from '../utils'

import { useViurShopStore } from '../shop'

export function useShipping() {
    const shopStore = useViurShopStore()
    const state = reactive({
        isLoading:false,
        isUpdating:false,
        shippingData:[]
    })

    function fetchShippingData() {
        state.isLoading = true
        Request.get(`${shopStore.state.shopApiUrl}/shipping_list`,{dataObj:{
            cart_key: shopStore.state.cartRoot['key']
        }}).then(async (resp)=>{
            let data = await resp.json()
            state.shippingData = data
            state.isLoading = false
        })
    }


    return {
        state,
        fetchShippingData

    }
}