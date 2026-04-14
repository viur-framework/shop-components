import {computed, reactive, watch} from 'vue';
import {Request} from '@viur/vue-utils'
import { removeUndefinedValues} from '../utils'

import { useViurShopStore } from '../shop'

export function useCart() {
    const shopStore = useViurShopStore()
    const state = reactive({
        isLoading:computed(()=>shopStore.state.cartIsLoading), // not used anymore
        isUpdating:computed(()=>shopStore.state.cartIsUpdating)// not used anymore
    })

    function getValue(value){
        if (value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            Object.keys(value).includes(shopStore.state.language)
        ){
            return value[shopStore.state.language]
        }
        return value
    }

    function createCart(){
        Request.post(shopStore.state.shopApiUrl+'/cart_add',{dataObj:{
            parent_cart_key:shopStore.state.cartRoot['key'],
            cart_type:"wishlist"
        }}).then(async( resp)=>{
            let data = await resp.json()
            console.log(data)
        })


    }


    let _fetchCartPromise = null;
    function fetchCart() {
      // Deduplicate parallel calls - return existing promise if one is in flight
      if (_fetchCartPromise) return _fetchCartPromise;

      shopStore.state.cartIsLoading = true;
      let promise = fetchCartRoot().then(() => {
        if (!shopStore.state.cartRoot?.["key"]) return 0;
        return fetchCartItems(shopStore.state.cartRoot["key"]);
      });

      _fetchCartPromise = promise.then(() => {
        shopStore.state.cartIsLoading = false;
        shopStore.state.cartReady = true;
      }).finally(() => {
        _fetchCartPromise = null;
      });

      return _fetchCartPromise;
    }

    function fetchCartRoot(){
        // fetch list of Rootnodes and saves the first one
        return Request.get(`${shopStore.state.shopUrl}/cart/listRootNodes`).then(async (resp)=>{
            let data = await resp.clone().json()
            shopStore.state.cartRoot = data.filter(i=>i['cart_type']==='basket')?.[0] ? data.filter(i=>i['cart_type']==='basket')[0]:[]
            if (shopStore.state.cartRoot.discount){
              shopStore.state.discounts = {[shopStore.state.cartRoot.discount.dest.key]:shopStore.state.cartRoot.discount}
            } else {
              shopStore.state.discounts = {}
            }
            return resp
        })
    }

    async function _collectCartItems(key, leafs, discounts){
        let resp = await Request.get(`${shopStore.state.shopApiUrl}/cart_list`,{dataObj:{
            cart_key:key
        }})
        let data = await resp.clone().json()
        for (const item of data){
          if (item["skel_type"]==="leaf"){
            leafs.push(item)
          }else{
            if(item.discount){
              discounts[item.discount.dest.key] = item.discount
            }
            await _collectCartItems(item['key'], leafs, discounts)
          }
        }
        return resp
    }

    function fetchCartItems(key){
        let leafs = []
        let discounts = {}
        return _collectCartItems(key, leafs, discounts).then((resp) => {
            shopStore.state.cartList = leafs
            // Include root-level discount alongside node-level discounts
            if (shopStore.state.cartRoot?.discount) {
                discounts[shopStore.state.cartRoot.discount.dest.key] = shopStore.state.cartRoot.discount
            }
            shopStore.state.discounts = discounts

            return resp
        })
    }

    function updateCart({
                    cart_key,
                    cart_type,
                    name,
                    customer_comment,
                    shipping_address_key,
                    shipping_key,
                    discount_key,
                    commission
                } = {}){

        let data= {
            cart_type:cart_type?cart_type:shopStore.state.cartRoot['cart_type'],
            name:name?name:shopStore.state.cartRoot['name'],
            customer_comment:customer_comment?customer_comment:shopStore.state.cartRoot['customer_comment'],
            shipping_address_key:shipping_address_key?shipping_address_key:shippingAddressKey.value,
            shipping_key: shipping_key, // only after explicit user selection
            discount_key:discount_key?discount_key:shopStore.state.cartRoot?.['discount']?.['dest']?.['key'],
            cart_key:cart_key ? cart_key : shopStore.state.cartRoot['key'],
        }

        if (commission) { // TODO: that's not standard, must be more generic!
          data.commission = commission
        }

        return Request.post(`${shopStore.state.shopApiUrl}/cart_update`, {
            dataObj: removeUndefinedValues(data)
        }).then(async (resp)=>{
            await fetchCart()
            return resp
        })
    }

    function addItem(key, quantity=1, cart=null, quantity_mode='replace'){
        //add Item to cart
        shopStore.state.cartIsUpdating = true
        return Request.post(`${shopStore.state.shopApiUrl}/article_add`, {dataObj:{
            article_key: key,
            parent_cart_key:cart?cart:shopStore.state.cartRoot['key'],
            quantity:quantity,
            quantity_mode:quantity_mode
        }}).then(async (resp)=>{
            shopStore.state.cartIsUpdating=false
            await fetchCart()
        })

    }
    function removeItem(key, cart=null){
        shopStore.state.cartIsUpdating = true
        return Request.post(`${shopStore.state.shopApiUrl}/article_remove`, {dataObj:{
            article_key: key,
            parent_cart_key:cart?cart:shopStore.state.cartRoot['key']
        }}).then(async (resp)=>{
            shopStore.state.cartIsUpdating=false
            await fetchCart()
        })
    }

    async function addDiscount(code) {
        let resp = await Request.securePost(`${shopStore.state.shopApiUrl}/discount_add`, {
            dataObj: { code: code },
        })
        let data = await resp.json();
        await fetchCart()
        return data
    }

    async function removeDiscount(key) {
        let resp = await Request.securePost(`${shopStore.state.shopApiUrl}/discount_remove`, {
            dataObj: { discount_key: key },
        })
        let data = await resp.json();
        await fetchCart()
        return data
    }

    const shippingAddressKey = computed(() => shopStore.state.cartRoot?.['shipping_address']?.['dest']?.['key']);

    return {
        state,
        fetchCartRoot,
        fetchCartItems,
        fetchCart,
        updateCart,
        addItem,
        removeItem,
        createCart,
        getValue,
        addDiscount,
        removeDiscount,
        shippingAddressKey,
    }
}
