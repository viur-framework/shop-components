
import { reactive, computed, watch, shallowRef } from "vue";
import {ShopCart, ShopUserDataGuest, ShopShippingMethod, ShopPaymentProvider, ShopOrderComplete, ShopOrderStatus} from './Steps/index'
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
            status: {
                component: shallowRef(ShopOrderStatus),
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
        orderKey:null // key of the order, maybe injected from ?order param

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
        console.log("---")
        navigateToTab(state.indexTabMap[state.tabIndexMap[state.currentTab]+1])
    }

    function navigateToPrevious(){
        // shorthand for previous Tab
        if (state.tabIndexMap[state.currentTab] === 0) return false
        navigateToTab(state.indexTabMap[state.tabIndexMap[state.currentTab]-1])
    }

    return {
        state,
        navigateToTab,
        navigateToNext,
        navigateToPrevious
    }
})
