import { Request } from "@viur/vue-utils"
import { useUrlSearchParams } from "@vueuse/core"
import { computed, reactive } from "vue"
import { useViurShopStore } from "../shop"
import { removeUndefinedValues } from "../utils"

export function useOrder() {
  const state = reactive({
    isLoading: false,
    isUpdating: false
  })
  const shopStore = useViurShopStore()
  function updateOrderState(key, data) {
    shopStore.state.order = data
    shopStore.state.orderKey = key

    const params = useUrlSearchParams("hash")
    params["order"] = shopStore.state.orderKey
  }
  function fetchOrder(key) {
    state.isLoading = true

    return Request.post(shopStore.state.shopApiUrl + "/order_view", {
      dataObj: {
        order_key: key
      }
    })
      .then(async (resp) => {
        let data = await resp.clone().json()
        updateOrderState(data["skel"]["key"], data["skel"])
        shopStore.state.canCheckout = data["can_checkout"]
        shopStore.state.canOrder = data["can_order"]
        state.isLoading = false
        return resp
      })
      .catch((error) => {
        shopStore.state.order = null
        shopStore.state.orderKey = null
        state.isLoading = false
      })
  }

  function addOrUpdateOrder({
    payment_provider,
    billing_address_key,
    customer_key,
    state_ordered,
    state_paid,
    state_rts,
    //TODO: ...additionalData Über alle requests in den components für customized Projekte
    ...additionalData // abfangen von nicht definierten Feldern
  } = {}) {
    state.isUpdating = true
    let url = shopStore.state.shopApiUrl + "/order_add"
    let data = {
      payment_provider: payment_provider ? payment_provider : shopStore.state.order?.["payment_provider"],
      billing_address_key: billing_address_key ? billing_address_key : billingAddressKey.value,
      customer_key: customer_key ? customer_key : shopStore.state.order?.["customer_key"]?.["dest"]?.["key"],
      state_ordered: state_ordered ? state_ordered : shopStore.state.order?.["state_ordered"],
      state_paid: state_paid ? state_paid : shopStore.state.order?.["state_paid"],
      state_rts: state_rts ? state_rts : shopStore.state.order?.["state_rts"],
      ...additionalData
    }
    if (shopStore.state.orderKey) {
      url = shopStore.state.shopApiUrl + "/order_update"
      data["order_key"] = shopStore.state.orderKey
    } else {
      data["cart_key"] = shopStore.state.cartRoot["key"]
    }
    return Request.post(url, { dataObj: removeUndefinedValues(data) })
      .then(async (resp) => {
        let data = await resp.clone().json()
        updateOrderState(data["key"], data)
        state.isUpdating = false
        return resp
      })
      .then(async (resp) => {
        fetchOrder(shopStore.state.orderKey)
        return resp
      })
  }

  const billingAddressKey = computed(() => shopStore.state.order?.["billing_address"]?.["dest"]?.["key"])

  return {
    state,
    fetchOrder,
    addOrUpdateOrder,
    billingAddressKey
  }
}
