import {reactive,ref, computed} from 'vue'
import { useOrder } from '../composables/order';
import { useCart } from '../composables/cart';
import { useViurShopStore } from '../shop'
import { defineStore } from "pinia";
export const useAddress = defineStore("useAddressStore", () => {
    const shopStore = useViurShopStore()

    const state = reactive({
        billingIsShipping:true,
        shippingForm:ref(null),
         // for shipping and both mode
        shippingIsLoading:computed(()=>{
            if (!state.shippingForm){
              return true
            }
            return state.shippingForm.state.loading
        }),
        shippingIsUpdating:false, // for shipping and both mode
        shippingData:{},
        shippingValid:computed(()=>{
            if(shopStore.state.cartRoot?.['shipping_address']){
                return true
            }
            return false
        }),

        billingForm:ref(null),
        billingIsLoading:computed(()=>{
            if (!state.billingForm){
              return true
            }
            return state.billingForm.state.loading
        }),
        billingIsUpdating:false,
        billingData:{},
        billingValid:computed(()=>{
            if( shopStore.state.order?.['billing_address']){
                return true
            }
            return false
        })

    })

    function saveForm(type,billingIsShipping=false){
      state[`${type}IsUpdating`] = true
      return state[`${type}Form`].sendData().then(async (resp)=>{
        let data = await resp.json()

        if (['addSuccess','editSuccess'].includes(data['action'])){
          state[`${type}Data`] = data['values']
          await updateAddresses(type, billingIsShipping)
        }
        state[`${type}IsUpdating`] = undefined
        return data
      }).catch(error=>{
        state[`${type}Form`].state.loading = false
        return {'action':"error"}
      })
    }

    function saveAddresses(billingIsShipping=false){
        if (billingIsShipping) {
            return saveForm('billing',billingIsShipping)
        }else{
            return new Promise((resolve, reject) => {
                saveForm('shipping').then(()=>{
                    saveForm('billing').then(()=>{
                        resolve({'action':'editSuccess'})
                    }).catch((e)=>reject(e))
                }).catch((e)=>reject(e))
            })
        }
    }

    async function updateAddresses(type, billingIsShipping=false) {
        let key = state[`${type}Data`]['key']
        if (type === 'shipping'){
            const {updateCart} = useCart()
            await updateCart({shipping_address_key:key})
        }else if (type === 'billing'){
            const {addOrUpdateOrder} = useOrder()
            await addOrUpdateOrder({billing_address_key:key})
            if(billingIsShipping){
                const {updateCart} = useCart()
                await updateCart({shipping_address_key:key})
            }
        }
    }

    return {
        state,
        saveForm,
        updateAddresses,
        saveAddresses
    }
})
