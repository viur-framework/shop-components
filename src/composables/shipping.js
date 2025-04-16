import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'
import { removeUndefinedValues} from '../utils'
import { useI18n } from 'vue-i18n'
import { useViurShopStore } from '../shop'

export function useShipping() {
    const i18n = useI18n()
    const shopStore = useViurShopStore()
    const defaultErrorMessage = i18n.t('viur.shop.error_message')
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
                state.errorMessage = i18n.t("shop.no_valid_shipping_found")
            }
            state.isLoading = false
        })
    }


    return {
        state,
        fetchShippingData

    }
}
