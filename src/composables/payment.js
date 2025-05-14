import {reactive} from 'vue'
import {Request} from '@viur/vue-utils'
import { removeUndefinedValues} from '../utils'
import { useViurShopStore } from '../shop'
import {defineStore} from "pinia";

export const usePayment = defineStore("usePaymentStore", () => {
    const shopStore = useViurShopStore()

    const iconMap = {
    'prepayment':'currency-euro',
    'unzer-card':'credit-card-2-back-fill',
    'unzer-paypal':'paypal',
    'unzer-ideal':'bank2',
    'unzer-sofort':'cash-coin'
  }

  const simpleProviders = [
    "invoice",
    'prepayment',
    'unzer-paypal',
    'unzer-sofort'
  ]

    const state = reactive({
        isLoading:false,
        isUpdating:false,
        paymentData:[]
    })

    function _convertPayment(paymentProviders){
        paymentProviders = Object.entries(paymentProviders)
        let options = []
        let option = {
          paymenttype:null,
          widget:"default",
          name:null,
          description:null,
          icon:null

        }

        for (const provider of paymentProviders){
          let currentOption = {...option}
          currentOption.paymenttype = provider[0]
          currentOption.name = provider[1]['title']
          currentOption.description = provider[1]['descr']
          currentOption.icon = iconMap[provider[0]]
          currentOption.widget = "simple"
          //if (simpleProviders.includes(provider[0])){
          //  currentOption.widget = "simple"  // payment provider musst be initialized later
          //}

          options.push(currentOption)
        }


        return options
    }

    function fetchPaymentData() {
        state.isLoading = true
        return Request.get(`${shopStore.state.shopUrl}/order/payment_providers_list`).then(async (resp)=>{
            let data = await resp.json()
            state.paymentData = _convertPayment(data)
            state.isLoading = false
        })
    }


    return {
        state,
        fetchPaymentData

    }
})
