<template>
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
    <sl-button @click="submitFormToUnzer">Zahlen</sl-button>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, reactive} from 'vue'
import { useViurShopStore } from '../shop';
import {Request} from '@viur/vue-utils'
const shopStore = useViurShopStore()

const state = reactive({
    unzer:computed(()=>{
        if (!shopStore.state.paymentProviderData) return null
        return new unzer(shopStore.state.paymentProviderData["public_key"], {locale: 'de-DE'})
    }),
    paymentHandler:{}
})


function initUnzerForm(){
    //Unzer field definition
    if (!state.paymentHandler['unzer-card']) {
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
    } else if (!state.paymentHandler['unzer-paypal']) {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal()
        // Rendering input field
        //paypal.create('email', {
        //     containerId: 'paypal-element',
        //});
        state.paymentHandler['unzer-paypal']= paypal;
    } else if (!state.paymentHandler['unzer-sofort']) {
        const sofort = state.unzer.Sofort()
        state.paymentHandler['unzer-sofort'] = sofort;
    } else if (!state.paymentHandler['unzer-ideal']) {
        const ideal = state.unzer.Ideal()
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        state.paymentHandler['unzer-ideal'] = ideal;
    }
}

function submitFormToUnzer(){
    let paymenttarget = shopStore.state.order?.['payment_provider'].split("-")[1]

    //send to unzer
    state.paymentHandler[shopStore.state.order?.['payment_provider']].createResource().then((result)=>{
        Request.post(`${shopStore.state.shopUrl}/pp_unzer_${paymenttarget}/save_type`, {dataObj:{
            order_key: shopStore.state.orderKey,
            type_id: result.id,
        }}).then(async (resp)=>{
            let data = await resp.json()
            console.log(data)
            shopStore.state.order = data
            shopStore.checkoutOrder()


        }).catch(error => {
            console.error(error)
        })
    }).catch((error)=> {
        // handle errors
        console.error(error)
    })
}


onBeforeMount(()=>{
    if (!shopStore.state.paymentProviderData){
        shopStore.checkout().then(()=>{
            initUnzerForm()
        })
    }
})

</script>