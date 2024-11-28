<template>

    <form id="payment-form" class="unzerUI form" novalidate
          @submit.prevent="submitFormToUnzer"
    >
        <template v-if="paymentStore.state.paymentSelection[0] === 'unzer-card'">
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

        <template v-if="paymentStore.state.paymentSelection[0] === 'unzer-paypal'">
            <div id="paypal-element" class="field"></div>
        </template>

        <template v-if="paymentStore.state.paymentSelection[0] === 'unzer-ideal'">
            <div id="ideal-element" class="field"></div>
        </template>

        <div id="error-holder" class="field" style="color: #9f3a38">
            <!-- Errors will be inserted here -->
        </div>

        <div class="field">
            <button
                class="unzerUI primary button fluid"
                type="submit">
                Pay
            </button>
        </div>
    </form>

</template>

<script setup>
import {reactive, computed, onBeforeMount,watch} from 'vue'
import {usePaymentStore} from "../../stores/payment"
import {useOrderStore} from '../../stores/order'
import { Request } from '@viur/vue-utils'
const paymentStore = usePaymentStore()
const orderStore = useOrderStore()

const state = reactive({
    unzer: computed(()=>{
        //if (!orderStore.state.checkout) return null

        return new unzer(orderStore.state.checkout.payment.public_key, {locale: 'de-DE'})
    }),
})

function initUnzerForm(){
    //Unzer field definition
    if (paymentStore.state.paymentSelection[0] === 'unzer-card') {
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

        state.handler = card
    } else if (paymentStore.state.paymentSelection[0] === 'unzer-paypal') {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal()
        // Rendering input field
        //paypal.create('email', {
        //     containerId: 'paypal-element',
        //});
        state.handler = paypal;
    } else if (paymentStore.state.paymentSelection[0] === 'unzer-sofort') {
        const sofort = state.unzer.Sofort()
        state.handler= sofort;
    } else if (paymentStore.state.paymentSelection[0] === 'unzer-ideal') {
        const ideal = state.unzer.Ideal()
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        state.handler = ideal;
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


async function initPayment(){
    initUnzerForm()
}

watch(()=>paymentStore.state.paymentSelection, (newVal, oldVal)=>{
    initUnzerForm()
})


onBeforeMount(async ()=>{
    initPayment()
})

</script>
