import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'
import { removeUndefinedValues} from '../utils'

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
        return fetchCartRoot().then(()=>{
            if(!shopStore.state.cartRoot?.['key']) return 0
            fetchCartItems(shopStore.state.cartRoot['key']).then(()=>{
                state.isLoading = false
                shopStore.state.cartReady = true
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

    function updateCart({
                    cart_type,
                    name,
                    customer_comment,
                    shipping_address_key,
                    shipping_key,
                    discount_key,
                } = {}){

        let data= {
            cart_type:cart_type?cart_type:shopStore.state.cartRoot['cart_type'],
            name:name?name:shopStore.state.cartRoot['name'],
            customer_comment:customer_comment?customer_comment:shopStore.state.cartRoot['customer_comment'],
            shipping_address_key:shipping_address_key?shipping_address_key:shopStore.state.cartRoot?.['shipping_address']?.['dest']?.['key'],
            shipping_key:shipping_key?shipping_key:shopStore.state.cartRoot?.['shipping']?.['dest']?.['key'],
            discount_key:discount_key?discount_key:shopStore.state.cartRoot?.['discount']?.['dest']?.['key'],
            cart_key:shopStore.state.cartRoot['key']
        }

        return Request.post(`${shopStore.state.shopApiUrl}/cart_update`, {
            dataObj: removeUndefinedValues(data)
        }).then(async (resp)=>{
            fetchCart()
        })
    }

    function addItem(key, quantity=1, cart=null, quantity_mode='replace'){
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
    function removeItem(key, cart=null){
        state.isUpdating = true
        return Request.post(`${shopStore.state.shopApiUrl}/article_remove`, {dataObj:{
            article_key: key,
            parent_cart_key:cart?cart:shopStore.state.cartRoot['key']
        }}).then(async (resp)=>{
            state.isUpdating=false
            fetchCart()
        })
    }

    return {
        state,
        fetchCartRoot,
        fetchCartItems,
        fetchCart,
        updateCart,
        addItem,
        removeItem
    }
}