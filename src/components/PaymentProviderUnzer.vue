<template>
  <div class="loading-wrapper" v-if="state.loading">
    <sl-spinner class="loading"></sl-spinner>
  </div>

  <div class="loading-wrapper" v-if="PaymentCheckIsActive">
    <sl-spinner class="loading"></sl-spinner>
    {{ $t('messages.wait_for_payment') }}
  </div>
  <div class="form-wrapper">
      <sl-alert :open="state.hasError" variant="danger">{{state.errorMessage}}</sl-alert>
      <form class="unzerUI form" novalidate>
          <template v-if="shopStore.state.order?.['payment_provider'] === 'unzer-card'">
              <div class="field">
                  <div id="card-element-id-number" class="unzerInput">
                      <!-- Card number UI Element is inserted here. -->
                  </div>
              </div>
              <div class="two fields">
                  <div class="field ten wide">
                      <div id="card-element-id-expiry" class="unzerInput">
                          <!-- Card expiry date UI Element is inserted here. -->
                      </div>
                  </div>
                  <div class="field six wide">
                      <div id="card-element-id-cvc" class="unzerInput">
                          <!-- Card CVC UI Element is inserted here. -->
                      </div>
                  </div>
              </div>
          </template>

          <template v-else-if="shopStore.state.order?.['payment_provider'] === 'unzer-paypal'">
              <div id="paypal-element" class="field"></div>
          </template>

          <template v-else-if="shopStore.state.order?.['payment_provider'] === 'unzer-ideal'">
              <div id="ideal-element" class="field"></div>
          </template>
      </form>
        <button :disabled="state.loading" class="unzerUI primary button fluid" @click="submitFormToUnzer">{{ $t('shop.pay') }}</button>
        <sl-button :disabled="state.loading" variant="danger" @click="cancelPayment">{{ $t('shop.cancel') }}</sl-button>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, reactive} from 'vue'
import { useViurShopStore } from '../shop';
import { useOrder } from '../composables/order';
import {Request} from '@viur/vue-utils'
import { useIntervalFn } from '@vueuse/core'
const shopStore = useViurShopStore()
const {fetchOrder} = useOrder()

const emits = defineEmits(['cancel'])

const { pause:PaymentCheckPause, resume:PaymentCheckResume, isActive:PaymentCheckIsActive } = useIntervalFn(() => {
  fetchOrder(shopStore.state.orderKey)

  if (shopStore.state.order?.['is_paid']){
    PaymentCheckPause()
  }

}, 2000,{immediate:false})


const state = reactive({
    unzer:computed(()=>{
        if (!shopStore.state.paymentProviderData) return null
        return new unzer(shopStore.state.paymentProviderData["public_key"], {locale: 'de-DE'})
    }),
    paymentHandler:{},
    loading:false,
    hasError:false,
    errorMessage:"Bei der Zahlung ist ein Fehler aufgetreten.",
    waitPayment:false
})


function initUnzerForm(){
    //Unzer field definition
    if (shopStore.state.order?.['payment_provider'] === 'unzer-card') {
        const card = state.unzer.Card();
        // Rendering input field card number
        card.create('number', {
            containerId: 'card-element-id-number',
            onlyIframe: false,
        });
        // Rendering input field card expiry
        card.create('expiry', {
            containerId: 'card-element-id-expiry',
            onlyIframe: false,
        });
        // Rendering input field card cvc
        card.create('cvc', {
            containerId: 'card-element-id-cvc',
            onlyIframe: false,
        });

        state.paymentHandler['unzer-card'] = card
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-paypal') {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal()
        // Rendering input field
        //paypal.create('email', {
        //     containerId: 'paypal-element',
        //});
        state.paymentHandler['unzer-paypal']= paypal;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-sofort') {
        const sofort = state.unzer.Sofort()
        state.paymentHandler['unzer-sofort'] = sofort;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-ideal') {
        const ideal = state.unzer.Ideal()
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        state.paymentHandler['unzer-ideal'] = ideal;
    }
    state.loading = false
}

function paymentError(error){
  state.loading = false
  state.hasError = true
  //reset session id
  //state.paymentHandler[shopStore.state.order?.['payment_provider']].jsessionId = state.paymentHandler[shopStore.state.order?.['payment_provider']].requestJSessionId()
}


function submitFormToUnzer(){
    PaymentCheckPause()
    state.loading = true
    let paymenttarget = shopStore.state.order?.['payment_provider'].split("-")[1]
    console.log(state.paymentHandler)
    //send to unzer
    state.paymentHandler[shopStore.state.order?.['payment_provider']].createResource().then((result)=>{
        Request.post(`${shopStore.state.shopUrl}/pp_unzer_${paymenttarget}/save_type`, {dataObj:{
            order_key: shopStore.state.orderKey,
            type_id: result.id,
        }}).then(async (resp)=>{
            let data = await resp.json()
            shopStore.state.order = data

            shopStore.checkoutOrder().then((resp)=>{
              state.loading = false
              state.hasError = false
              if(shopStore.state.paymentProviderData?.redirectUrl){
                state.waitPayment = true
                window.open(shopStore.state.paymentProviderData.redirectUrl,"_blank","popup")
                PaymentCheckResume()
              }
            }).catch(async (error)=>{
              paymentError(error)
            })

        }).catch(error => {
            paymentError(error)
        })
    }).catch((error)=> {
        paymentError(error)
    })
}


function cancelPayment(){
    PaymentCheckPause()
    emits('cancel')
}

onBeforeMount(()=>{
    state.loading = true
    if (!shopStore.state.paymentProviderData){
        shopStore.checkout().then(()=>{
            initUnzerForm()
        }).catch((error)=>{
            console.log(error)
        })
    }else{
      initUnzerForm()
    }
})

</script>

<style scoped>
.loading-wrapper{
  display:flex;
  flex-direction: column;
  align-items: center;
}

.form-wrapper{
  display:flex;
  flex-direction: column;
  gap:20px;
}

.loading{
  font-size:3rem;
}
</style>