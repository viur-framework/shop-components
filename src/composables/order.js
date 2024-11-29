import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'
import { useViurShopStore } from '../shop'
import { removeUndefinedValues} from '../utils'
import { useUrlSearchParams } from '@vueuse/core'

export function useOrder() {
    const state = reactive({
        isLoading:false,
        isUpdating:false
    })
    const shopStore = useViurShopStore()
    function updateOrderState(key,data){
        shopStore.state.order = data
        shopStore.state.orderKey = key
        
        const params = useUrlSearchParams('hash')
        params['order'] = shopStore.state.orderKey

    }
    function fetchOrder(key){
        state.isLoading = true
        shopStore.orderKey = key
        Request.post(shopStore.state.shopApiUrl+"/order_view",{dataObj:{
            "order_key": key
        }}).then(async (resp)=>{
            let data = await resp.json()
            updateOrderState(data['skel']['key'], data['skel'])
            state.isLoading = false
        }).catch((error)=>{
            shopStore.state.order = null
            shopStore.state.orderKey = null
            state.isLoading = false
        })
    }

    function addOrUpdateOrder({
        payment_provider,
        billing_address_key,
        email,
        customer_key,
        state_ordered,
        state_paid,
        state_rts
    }={}){
        state.isUpdating=true
        let url = shopStore.state.shopApiUrl+"/order_add"
        let data = {
            payment_provider,
            billing_address_key,
            email,
            customer_key,
            state_ordered,
            state_paid,
            state_rts
        }
        if (shopStore.state.orderKey){
            url = shopStore.state.shopApiUrl+"/order_update"
            data["order_key"] = shopStore.state.orderKey
            
        }else{
            data["cart_key"] = shopStore.state.cartRoot['key']
        }
        Request.post(url,{dataObj:removeUndefinedValues(data)}).then(async(resp)=>{
            let data = await resp.json()
            updateOrderState(data['key'], data)
            state.isUpdating=false
        })
    }

    return {
        state,
        fetchOrder,
        addOrUpdateOrder
    }
}