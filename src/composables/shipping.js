import { Request } from "@viur/vue-utils"
import { defineStore } from "pinia"
import { reactive } from "vue"
import { useI18n } from "vue-i18n"
import { useViurShopStore } from "../shop"

/**
 * Store that holds available shipping options
 */
export const useShipping = defineStore("useShippingStore", () => {
  const i18n = useI18n()
  const shopStore = useViurShopStore()
  const defaultErrorMessage = i18n.t("viur.shop.error_message")
  const state = reactive({
    isLoading: false,
    isUpdating: false,
    hasError: false,
    errorMessage: defaultErrorMessage,
    shippingData: []
  })

  /**
   * fetch available shipping options from API
   */
  function fetchShippingData() {
    state.isLoading = true
    return Request.get(`${shopStore.state.shopApiUrl}/shipping_list`, {
      dataObj: {
        cart_key: shopStore.state.cartRoot["key"]
      }
    }).then(async (resp) => {
      state.shippingData = await resp.json()
      if (state.shippingData.length === 0) {
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
})
