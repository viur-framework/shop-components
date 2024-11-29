import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'

import { useViurShopStore } from '../shop'

export function useCart() {
    const shopStore = useViurShopStore()
    const state = reactive({
        isLoading:false,
        isUpdating:false
    })

    function fetchCart(){
        //first fetch root then fetchItems for this root
        state.isLoading = true
        fetchCartRoot().then(()=>{
            if(!shopStore.state.cartRoot?.['key']) return 0
            fetchCartItems(shopStore.state.cartRoot['key']).then(()=>{
                state.isLoading = false
            })
        })
    }

    function fetchCartRoot(){
        // fetch list of Rootnodes and saves the first one
        
        return Request.get(`${shopStore.state.shopUrl}/cart/listRootNodes`).then(async (resp)=>{
            let data = await resp.json()
            shopStore.state.cartRoot = data[0]
        })
    }

    function fetchCartItems(key, parentKey=null){
        //fetch cart items
        return Request.get(`${shopStore.state.shopApiUrl}/cart_list`,{dataObj:{
            cart_key:key
        }}).then(async( resp) =>{
            let data = await resp.json()
            shopStore.state.cartList=data
        })
    }

    function updateCart(params){}

    function addItem(key, quantity=1, cart=null, quantity_mode='increase'){
        //add Item to cart
        state.isUpdating = true
        return Request.post(`${shopStore.state.shopApiUrl}/article_add`, {dataObj:{
            article_key: key,
            parent_cart_key:cart?cart:shopStore.state.cartRoot['key'],
            quantity:quantity,
            quantity_mode:quantity_mode
        }}).then(async (resp)=>{
            state.isUpdating=false
            fetchCart()
        })

    }
    function removeItem(params){}
    function updateItem(params){}

    return {
        state,
        fetchCartRoot,
        fetchCartItems,
        fetchCart,
        addItem
    }
}