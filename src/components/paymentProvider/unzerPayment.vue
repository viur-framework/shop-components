<template>

    <form id="payment-form" class="unzerUI form" novalidate
          @submit="submitFormToUnzer"
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
                id="submit-button"
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

const paymentStore = usePaymentStore()
const orderStore = useOrderStore()

const state = reactive({
    unzer: computed(()=>{
        //if (!orderStore.state.checkout) return null
        return new unzer('s-pub-2a109pymjkhrxmNIxPrXwxubWNfH9kPe', {locale: 'de-DE'})
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

        state.unzer['handler'] = card;
    } else if (paymentStore.state.paymentSelection[0] === 'unzer-paypal') {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal()
        // Rendering input field
        // paypal.create('email', {
        //     containerId: 'paypal-element',
        // });
        state.unzer['handler'] = paypal;
    } else if (paymentStore.state.paymentSelection[0] === 'unzer-sofort') {
        const sofort = state.unzer.Sofort()
        state.unzer['handler'] = sofort;
    } else if (paymentStore.state.paymentSelection[0] === 'unzer-ideal') {
        const ideal = state.unzer.Ideal()
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        state.unzer['handler'] = ideal;
    }
}

function submitFormToUnzer(){
    //send to unzer 
    return 0 //WIP
    state.unzer['handler'].createResource().then((result)=>{
        request(`/shop/pp_unzer_card/save_type/`, {
            method: 'POST',
            params: {
                order_key: self.order_key,
                type_id: result.id,
            },
        })
            .then(req => req.json())
            .then(res => {
                // TODO: Show final summary page
            })
            .catch(e => {
                console.log(e)
            })
    }).catch(function (error) {
        // handle errors
        console.error(error)
        document.getElementById('error-holder').innerText = error.customerMessage || error.message || 'Error';
    })
}


async function initPayment(){
    await orderStore.checkout_start()
    initUnzerForm()
}

watch(()=>paymentStore.state.paymentSelection, (newVal, oldVal)=>{
    initUnzerForm()
})


onBeforeMount(async ()=>{
    initPayment()
})

</script>