<template>
  <sl-radio-group :value="state.selection">
    <sl-details-group>

      <payment-option v-for="option in options" :key="option.id"
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
                <div id="paypal-element" class="field"></div>
            </template>
          </form>
        </template>
      </payment-option>

    </sl-details-group>
  </sl-radio-group>

</template>

<script setup>
import {usePaymentStore} from "../../../stores/payment"
import PaymentOption from "./PaymentOption.vue"
import {computed, reactive, ref} from 'vue'
import {Request} from "@viur/vue-utils";

const paymentStore = usePaymentStore()

const unzerform = ref(null)

  const props = defineProps({
    selection: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  })

  const state = reactive({
    unzer: computed(()=>{
        //if (!orderStore.state.checkout) return null
        return new unzer('s-pub-2a109pymjkhrxmNIxPrXwxubWNfH9kPe', {locale: 'de-DE'})
        return new unzer(orderStore.state.checkout.payment.public_key, {locale: 'de-DE'})
    }),
    selection:null,
    hasError:false
  })

function initUnzerForm(){
    //Unzer field definition
    if (state.selection === 'unzer-card' && !paymentStore.state.paymentHandler['unzer-card']) {
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

        paymentStore.state.paymentHandler['unzer-card'] = card
    } else if (state.selection === 'unzer-paypal' && !paymentStore.state.paymentHandler['unzer-paypal']) {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal()
        // Rendering input field
        //paypal.create('email', {
        //     containerId: 'paypal-element',
        //});
        paymentStore.state.paymentHandler['unzer-paypal']= paypal;
    } else if (state.selection === 'unzer-sofort' && !paymentStore.state.paymentHandler['unzer-sofort']) {
        const sofort = state.unzer.Sofort()
        paymentStore.state.paymentHandler['unzer-sofort'] = sofort;
    } else if (state.selection=== 'unzer-ideal' && !paymentStore.state.paymentHandler['unzer-ideal']) {
        const ideal = state.unzer.Ideal()
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        paymentStore.state.paymentHandler['unzer-ideal'] = ideal;
    }
}


function submitFormToUnzer(){
    let paymenttarget = paymentStore.state.paymentSelection[0].split("-")[1]
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
  console.log(state)
  console.log(paymentStore)
  console.log(unzerform)
  state.selection=type
  initUnzerForm()
  paymentStore.state.paymentSelection = state.selection
}


</script>

<style scoped>

</style>
