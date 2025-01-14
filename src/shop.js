
import { reactive, computed, watch, shallowRef } from "vue";
import {ShopCart, ShopUserDataGuest, ShopShippingMethod, ShopPaymentProvider, ShopOrderComplete, ShopOrderConfirm} from './Steps/index'
import { defineStore } from "pinia";
import { useUrlSearchParams } from '@vueuse/core'

import { Request } from "@viur/vue-utils";

export const useViurShopStore = defineStore("viurshopStore", () => {
    const state = reactive({
        //shop module name
        showNodes:false,
        language:"de",
        moduleName:'shop',
        hostUrl: computed(()=>(import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : window.location.origin)),
        shopUrl:computed(()=>{
            return `${state.hostUrl}/json/${state.moduleName}`
        }),
        shopApiUrl:computed(()=>{
            return `${state.hostUrl}/json/${state.moduleName}/api`
        }),
        debug:false,
        //default Tabs
        tabs:{
            cart: {
                component: shallowRef(ShopCart),
                displayName: "Warenkorb",
                icon: { name: "cart3" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && !state.order?.['is_ordered']),  //active if no orderkey or checkout not startet
                validating:false,
                valid:false
            },
            userdata: {
                component: shallowRef(ShopUserDataGuest),
                displayName: "Daten Eingeben",
                icon: { name: "card-list" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && !state.order?.['is_ordered'] && state.cartList.length>0), //active if checkout not startet and cart is not empty
                validating:false,
                valid:false
            },
            shippingmethod: {
                component: shallowRef(ShopShippingMethod),
                displayName: "Versandart",
                icon: { name: "truck" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && !state.order?.['is_ordered'] && state.cartRoot?.['shipping_address']), // we need a shipping country
                validating:false,
                valid:false
            },
            paymentprovider: {
                component: shallowRef(ShopPaymentProvider),
                displayName: "Zahlungsart auswählen",
                icon: { name: "credit-card" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && state.order && state.cartRoot?.['shipping']), // we need a active order
                validating:false,
                valid:false
            },
            confirm: {
                component: shallowRef(ShopOrderConfirm),
                displayName: "Bestellung prüfen",
                icon: { name: "clipboard-check" },
                active:computed(()=>!state.order?.['is_paid'] && state.canCheckout?.['status']), // active if canCheckout and not already paid
                validating:false,
                valid:false
            },
            complete: {
                component: shallowRef(ShopOrderComplete),
                displayName: "Bestellung Abgeschlossen",
                icon: { name: "bag-check" },
                active:computed(()=>state.order?.['is_ordered']), // active if ordered
                validating:false,
                valid:false
            },
        },
        // active Tab
        currentTab: "cart",  // set cart as default to avoid console errors
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

        //Address Structure
        addressStructure:null,
        paymentMeta:null,


        //checkout
        paymentProviderData:null

    })

    function addTab({name, component, displayname, iconname, iconlibrary,active})
    {
        if(Object.keys(state.tabs).includes(name)){
            state.tabs[name] = {
                component: component?shallowRef(component):state.tabs[name].component,
                displayName: displayname?displayname:state.tabs[name].displayName,
                icon: {
                    name: iconname?iconname:state.tabs[name].iconname,
                    library:iconlibrary?iconlibrary:state.tabs[name].iconlibrary
                },
                active:active?active:state.tabs[name].active
            }
        }else{
            state.tabs[name] = {
                component: shallowRef(component),
                displayName: displayname,
                icon: { name: iconname, library:iconlibrary},
                active:active
            }
        }


    }

    function removeTab(name){
        delete state.tabs[name]
    }



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
        return new Promise((resolve,reject)=>{
            Request.post(`${state.shopUrl}/order/checkout_start`,{dataObj:{
                order_key:state.orderKey
            }}).then(async (resp)=>{
                let data = await resp.json()
                state.paymentProviderData = data['payment']

                if (!data['payment']){
                    try{
                        await checkoutOrder() // direct Checkout
                        resolve()
                    } catch(error){
                        reject(error)
                    }
                }else{
                    resolve()
                }
            }).catch(error=>{
                reject(error)
            })
        })
    }

    function checkoutOrder(){
        //payment is finished
        return new Promise((resolve,reject)=>{
            Request.post(`${state.shopUrl}/order/checkout_order`,{dataObj:{
                order_key:state.orderKey
            }}).then(async (resp)=>{
                let data = await resp.json()
                if (!resp.ok){
                    reject(data)
                } else {
                    state.order = data['skel']
                    state.paymentProviderData = data['payment']

                    if(state.order?.['is_ordered']){
                        // order is finished
                        navigateToTab('complete')
                    }
                    resolve(data)
                }


            }).catch(error=>{
                reject(error)
            })
        })
    }

    function addDiscount(code) {
      return new Promise((resolve, reject) => {
        Request.securePost(`${state.shopApiUrl}/discount_add`, {
          dataObj: {
            code: code,
          },
        })
          .then(async (resp) => {
            let data = await resp.json();
            console.log("discount debug", data);
            // if (!resp.ok) {
            //   reject(data);
            // } else {
            //   state.order = data["skel"];
            //   state.paymentProviderData = data["payment"];

            //   if (state.order?.["is_ordered"]) {
            //     // order is finished
            //     navigateToTab("complete");
            //   }
            //   resolve(data);
            // }
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    return {
        state,
        navigateToTab,
        navigateToNext,
        navigateToPrevious,
        fetchMetaData,
        checkout,
        checkoutOrder,
        addDiscount,
        addTab,
        removeTab

    }
})
