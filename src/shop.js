
import { reactive, computed, watch, shallowRef } from "vue";
import {ShopCart, ShopUserDataGuest, ShopShippingMethod, ShopPaymentProvider, ShopOrderComplete, ShopOrderConfirm} from './Steps/index'
import { defineStore } from "pinia";
import { useUrlSearchParams,useTimeoutFn } from '@vueuse/core'
import AddressFormLayout from './components/AddressFormLayout.vue';

import { Request } from "@viur/vue-utils";

export const useViurShopStore = defineStore("viurshopStore", () => {
    const state = reactive({
        //shop module name
        showNodes:false,
        locale: 'de-DE',
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
        topActions:false,
        //default Tabs
        tabs:{
            cart: {
                component: shallowRef(ShopCart),
                params:{},
                displayName: "viur.shop.order_step_cart", //Warenkorb
                icon: { name: "cart3" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && !state.order?.['is_ordered']),  //active if no orderkey or checkout not startet
                validating:false,
                valid:false
            },
            userdata: {
                component: shallowRef(ShopUserDataGuest),
                params:{},
                displayName: "viur.shop.order_step_data", //Daten Eingeben
                icon: { name: "card-list" },
                active:computed(()=>state.order && !state.order?.['is_checkout_in_progress'] && !state.order?.['is_ordered'] && state.cartList.length>0), //active if checkout not startet and cart is not empty
                validating:false,
                valid:false
            },
            shippingmethod: {
                component: shallowRef(ShopShippingMethod),
                params:{},
                displayName: "viur.shop.order_step_shipping", // Versandart
                icon: { name: "truck" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && !state.order?.['is_ordered'] && state.cartRoot?.['shipping_address']), // we need a shipping country
                validating:false,
                valid:false
            },
            paymentprovider: {
                component: shallowRef(ShopPaymentProvider),
                params:{},
                displayName: "viur.shop.order_step_payment", //Zahlungsart auswählen
                icon: { name: "credit-card" },
                active:computed(()=>!state.order?.['is_checkout_in_progress'] && state.order && state.cartRoot?.['shipping'] && state.cartRoot?.['shipping_address']), // we need a active order
                validating:false,
                valid:false
            },
            confirm: {
                component: shallowRef(ShopOrderConfirm),
                params:{},
                displayName: "viur.shop.order_step_verify", //Bestellung prüfen
                icon: { name: "clipboard-check" },
                active:computed(()=>!state.order?.['is_paid'] && state.canCheckout?.['status']), // active if canCheckout and not already paid
                validating:false,
                valid:false
            },
            complete: {
                component: shallowRef(ShopOrderComplete),
                params:{},
                displayName: "viur.shop.order_step_complete", //Bestellung Abgeschlossen
                icon: { name: "bag-check" },
                active:computed(()=>state.order?.['is_ordered'] && (state.order?.['is_rts'] || state.order?.['is_paid'])), // active if ordered
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
        paymentProviderData:null,
        UserDataLayout: shallowRef(AddressFormLayout)
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
        if (!state.tabs[name].active) {
          console.warn(`navigateToTab called at ${state.currentTab}, but tab (${name}) not active yet`);
          return false;
        }
        state.currentTab = name

        const params = useUrlSearchParams('hash')
        params['step'] = state.currentTab
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    }

  function navigateToNext() {
    // shorthand for next Tab
    const currentTabIndex0 = state.tabIndexMap[state.currentTab];
    if (currentTabIndex0 === state.stepperLength - 1) {
      console.warn(`Tab end reached`);
      return false;
    }
    const nextTabName = state.indexTabMap[currentTabIndex0 + 1];
    if (!state.tabs[nextTabName].active) {
      console.warn(`navigateToNext called at ${state.currentTab}, but next tab (${nextTabName}) not active yet`);
      return false;
    }
    navigateToTab(nextTabName);
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
                let data = await resp.clone().json()
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
                return resp
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
                let data = await resp.clone().json()
                if (!resp.ok){
                    reject(data)
                } else {
                  state.order = data['skel']
                  state.paymentProviderData = data['payment']

                  if(state.order?.['is_ordered'] && (state.order?.['is_rts'] || state.order?.['is_paid'])){
                      // order is finished
                      useTimeoutFn(() => {
                        navigateToTab('complete')
                      }, 300)

                  }
                  resolve(data)
                }
                return resp
            }).catch(error=>{
                reject(error)
            })
        })
    }

    function tabValidation(nextfunction, navigatefunction){
      state.tabs[state.currentTab]['valid']=false
      state.tabs[state.currentTab]['validating']=true

      //validate step, like send forms or something like this
      Promise.resolve(nextfunction()).then((resp)=>{

        if (resp){
          state.tabs[state.currentTab]['valid']=true
          state.tabs[state.currentTab]['validating']=false
          useTimeoutFn(() => {
            navigatefunction()
          }, 300)

        }else{
          state.tabs[state.currentTab]['valid']=false
          state.tabs[state.currentTab]['validating']=false
        }
      }).catch(error=>{
        console.log(error)
        state.tabs[state.currentTab]['valid']=false
        state.tabs[state.currentTab]['validating']=false
      })
    }


    return {
        state,
        navigateToTab,
        navigateToNext,
        navigateToPrevious,
        tabValidation,
        fetchMetaData,
        checkout,
        checkoutOrder,
        addTab,
        removeTab
    }
})
