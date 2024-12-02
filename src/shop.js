
import { reactive, computed, watch, shallowRef } from "vue";
import {ShopCart, ShopUserDataGuest, ShopShippingMethod, ShopPaymentProvider, ShopOrderComplete, ShopOrderConfirm} from './Steps/index'
import { defineStore } from "pinia";
import { useUrlSearchParams } from '@vueuse/core'

import { Request } from "@viur/vue-utils";

export const useViurShopStore = defineStore("viurshopStore", () => {
    const state = reactive({
        //shop module name
        moduleName:'shop',
        hostUrl: window.location.origin,
        shopUrl:computed(()=>{
            return `${state.hostUrl}/json/${state.moduleName}`
        }),
        shopApiUrl:computed(()=>{
            return `${state.hostUrl}/${state.moduleName}/api`
        }),
        tabState:{
            cart:computed(()=>!state.orderKey || !state.checkoutStarted), //active if no orderkey or checkout not startet
            userdata:computed(()=>!state.checkoutStarted && state.cartList.length>0), //active if checkout not startet and cart is not empty
            shippingmethod:computed(()=>!state.checkoutStarted && state.cartList.length>0),
            paymentprovider:computed(()=>!state.checkoutStarted && state.cartList.length>0),
            confirm:computed(()=>!state.order?.['is_ordered'] && state.canCheckout?.['status']), // active if canCheckout and not already ordererd
            complete:computed(()=>state.order?.['is_ordered']) // active if ordered
        },

        //default Tabs
        tabs:{
            cart: {
                component: shallowRef(ShopCart),
                displayName: "Warenkorb",
                icon: { name: "cart3" },
            },
            userdata: {
                component: shallowRef(ShopUserDataGuest),
                displayName: "Daten Eingeben",
                icon: { name: "card-list" },
            },
            shippingmethod: {
                component: shallowRef(ShopShippingMethod),
                displayName: "Versandart",
                icon: { name: "truck" },
            },
            paymentprovider: {
                component: shallowRef(ShopPaymentProvider),
                displayName: "Zahlungsart auswählen",
                icon: { name: "credit-card" },
            },
            confirm: {
                component: shallowRef(ShopOrderConfirm),
                displayName: "Bestellung prüfen",
                icon: { name: "clipboard-check" },
            },
            complete: {
                component: shallowRef(ShopOrderComplete),
                displayName: "Bestellung Abgeschlossen",
                icon: { name: "bag-check" },
            },
        },
        // active Tab
        currentTab: null,
        // tabname to index mapping
        tabIndexMap: computed(()=>{
            let map = {}
            for (const [index, item] of Object.entries(Object.keys(state.tabs))){
                map[[item]] = parseInt(index)
            }
            return map
        }),
        // index to tabname mapping
        indexTabMap: computed(()=>{
            let map = {}
            for (const [index, item] of Object.entries(Object.keys(state.tabs))){
                map[[index]] = item
            }
            return map
        }),
        // length of stepper
        stepperLength:computed(()=>{
            return Object.keys(state.tabs).length
        }),

        // SHOP DATA
        cartList:[], //articles in cart
        cartRoot:null, //actual cart rootnode entry ( used for shipping etc)
        order:null, // actual order entry ( used for billing etc.)
        orderKey:null, // key of the order, maybe injected from ?order param

        //CART READY
        cartReady:false,
        orderReady:false,
        canCheckout:null,
        canOrder:null,
        checkoutStarted:computed(()=>{
            if (!state.orderKey) return false

            if (state.order?.['cart']?.['dest']?.['key'] !== state.cartRoot?.['key']){
                return true
            }
            return false
        }),


        //Address Structure
        addressStructure:null,
        paymentMeta:null,


        //checkout
        paymentProviderData:null

    })

    function navigateToTab(name){
        // navigate to Tab 
        state.currentTab = name

        const params = useUrlSearchParams('hash')
        params['step'] = state.currentTab
    }

    function navigateToNext(){
        // shorthand for next Tab
        if (state.tabIndexMap[state.currentTab] === state.stepperLength-1) return false
        navigateToTab(state.indexTabMap[state.tabIndexMap[state.currentTab]+1])
    }

    function navigateToPrevious(){
        // shorthand for previous Tab
        if (state.tabIndexMap[state.currentTab] === 0) return false
        navigateToTab(state.indexTabMap[state.tabIndexMap[state.currentTab]-1])
    }

    function fetchAddressStructure(){
        Request.get(`${state.shopUrl}/address/add`).then(async (resp)=>{
            let data = await resp.json()
            state.addressStructure = data['structure']
        })
    }

    function fetchPaymentMeta(){
        Request.get(`${state.shopUrl}/order/payment_providers_list`).then(async (resp)=>{
            let data = await resp.json()
            state.paymentMeta = data
        })
    }
    
    function fetchMetaData(){
        fetchAddressStructure()
        fetchPaymentMeta()
    }

    function checkout(){
        //request Payment
        return Request.post(`${state.shopUrl}/order/checkout_start`,{dataObj:{
            order_key:state.orderKey
        }}).then(async (resp)=>{
            let data = await resp.json()
            state.paymentProviderData = data['payment']

            if (!data['payment']){
                checkoutOrder()
            }
        })
    }

    function checkoutOrder(){
        //payment is finished
        return Request.post(`${state.shopUrl}/order/checkout_order`,{dataObj:{
            order_key:state.orderKey
        }}).then(async (resp)=>{
            let data = await resp.json()
            state.order = data['skel']
            state.paymentProviderData = data['payment']
        })
        
    }

    return {
        state,
        navigateToTab,
        navigateToNext,
        navigateToPrevious,
        fetchMetaData,
        checkout,
        checkoutOrder
    }
})
