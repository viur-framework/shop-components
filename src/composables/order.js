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
        return Request.post(shopStore.state.shopApiUrl+"/order_view",{dataObj:{
            "order_key": key
        }}).then(async (resp)=>{
            let data = await resp.json()
            updateOrderState(data['skel']['key'], data['skel'])
            shopStore.state.canCheckout = data["can_checkout"]
            shopStore.state.canOrder = data["can_order"]
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
            payment_provider:payment_provider?payment_provider:shopStore.state.order?.['payment_provider'],
            billing_address_key:billing_address_key?billing_address_key:shopStore.state.order?.['billing_address_key']?.['dest']?.['key'],
            email:email?email:shopStore.state.order?.['email'],
            customer_key:customer_key?customer_key:shopStore.state.order?.['customer_key']?.['dest']?.['key'],
            state_ordered:state_ordered?state_ordered:shopStore.state.order?.['state_ordered'],
            state_paid:state_paid?state_paid:shopStore.state.order?.['state_paid'],
            state_rts:state_rts?state_rts:shopStore.state.order?.['state_rts']
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
        }).then(()=>{
            fetchOrder(shopStore.state.orderKey)
        })
    }

    return {
        state,
        fetchOrder,
        addOrUpdateOrder
    }
}