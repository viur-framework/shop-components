<template>
  <sl-radio-group :value="state.selection">
    <sl-details-group>

      <payment-option v-for="option in paymentState.paymentData" :key="option.id"
                      :paymenttype="option.paymenttype"
                      :name="option.name"
                      :icon="option.icon"
                      :widget="option.widget"
                      :description="option.description"
                      @change="optionChanged"

      >
        <template v-if="option.paymenttype.startsWith('unzer-')">
          <form class="unzerUI form" ref="unzerform">
            <template v-if="option.paymenttype === 'unzer-card'">
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

            <template v-else-if="option.paymenttype === 'unzer-paypal'">
                <div id="paypal-element" class="field"></div>
            </template>

            <template v-else-if="option.paymenttype === 'unzer-ideal'">
                <div id="ideal-element" class="field"></div>
            </template>
          </form>
        </template>
      </payment-option>

    </sl-details-group>
  </sl-radio-group>

  <slot
      nextName="weiter"
      :activefunction="()=>shopStore.state.order?.['payment_provider']"
      :nextfunction="()=>true"
  >
  </slot>

</template>
<script setup>
import {computed, reactive} from 'vue'
import PaymentOption from "../components/PaymentOption.vue";
import {useStepper} from "../composables/stepper";
import {usePayment} from "../composables/payment";
import {useOrder} from "../composables/order";
import {Request} from "@viur/vue-utils";
import {useViurShopStore} from "../shop";

const {state:paymentState, fetchPaymentData} = usePayment()
const {state:orderStore, addOrUpdateOrder} = useOrder()
const shopStore = useViurShopStore()

const state = reactive({
    selection:null,
    paymentHandler:{},
    unzer: computed(()=>{
        //if (!orderStore.state.checkout) return null
        //return new unzer(orderStore.state.checkout.payment.public_key, {locale: 'de-DE'})
    }),
})

function init(){
  fetchPaymentData().then(()=>{
    state.selection = shopStore.state.order?.['payment_provider']
  })

}
const tab = 'paymentprovider' //marks component for a step
const stepper = useStepper(tab, init, ()=>{})


function initUnzerForm(){
    //Unzer field definition
    if (state.selection === 'unzer-card' && !state.paymentHandler['unzer-card']) {
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
    } else if (state.selection === 'unzer-paypal' && !state.paymentHandler['unzer-paypal']) {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal()
        // Rendering input field
        //paypal.create('email', {
        //     containerId: 'paypal-element',
        //});
        state.paymentHandler['unzer-paypal']= paypal;
    } else if (state.selection === 'unzer-sofort' && !state.paymentHandler['unzer-sofort']) {
        const sofort = state.unzer.Sofort()
        state.paymentHandler['unzer-sofort'] = sofort;
    } else if (state.selection=== 'unzer-ideal' && !state.paymentHandler['unzer-ideal']) {
        const ideal = state.unzer.Ideal()
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        state.paymentHandler['unzer-ideal'] = ideal;
    }
}

function submitFormToUnzer(){
    let paymenttarget = state.paymentSelection[0].split("-")[1]
    //send to unzer
    state.handler.createResource().then((result)=>{
        Request.post(`/${orderStore.state.shopClient.shop_module}/pp_unzer_${paymenttarget}/save_type`, {dataObj:{
            order_key: orderStore.state.currentOrderkey,
            type_id: result.id,
        }}).then(async (resp)=>{
            let data = await resp.json()
            orderStore.state.currentOrder = data
            await orderStore.startCheckout()
        }).catch(error => {
            console.log(error)
        })
    }).catch((error)=> {
        // handle errors
        console.error(error)
    })
}



function optionChanged(type){
  state.selection=type
  addOrUpdateOrder({payment_provider:type})
}
</script>