<template>
    <div class="loading-wrapper" v-if="state.loading">
        <sl-spinner class="loading"></sl-spinner>
    </div>

    <div class="loading-wrapper" v-if="PaymentCheckIsActive">
        <sl-spinner class="loading"></sl-spinner>
        {{ $t('messages.wait_for_payment') }}
    </div>
    <div class="form-wrapper">
        <sl-alert :open="state.hasError" variant="danger">{{ state.errorMessage }}</sl-alert>
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
                <sl-alert open variant="danger">{{ $t('viur.shop.paypal_client_popup_info') }}</sl-alert>
                <div id="paypal-element" class="field"></div>
            </template>

            <template v-else-if="shopStore.state.order?.['payment_provider'] === 'unzer-ideal'">
                <div id="ideal-element" class="field"></div>
            </template>

            <template v-else-if="shopStore.state.order?.['payment_provider'] === 'unzer-googlepay'">
                <div id="googlepay-element" class="field"></div>
            </template>
            <p
                v-if="!!shopStore.state?.paymentProviderData?.redirectUrl"
                v-html="$t('viur.shop.payment_link', {url: shopStore.state.paymentProviderData.redirectUrl})"
            />
        </form>

        <button
            v-if="shopStore.state.order?.['payment_provider'] !== 'unzer-googlepay'"
            :disabled="state.loading"
            class="unzerUI primary button fluid"
            @click="submitFormToUnzer"
        >{{ $t('viur.shop.pay') }}
        </button>
        <sl-button :disabled="state.loading" variant="danger" @click="cancelPayment">
            {{ $t('actions.cancel') }}
        </sl-button>
    </div>
</template>

<script setup>
import {Request} from '@viur/vue-utils';
import {useIntervalFn} from '@vueuse/core';
import {computed, onBeforeMount, reactive} from 'vue';
import {useOrder} from '../composables/order';
import {useViurShopStore} from '../shop';

const shopStore = useViurShopStore();
const {fetchOrder} = useOrder();

const emits = defineEmits(['cancel']);

const {pause: PaymentCheckPause, resume: PaymentCheckResume, isActive: PaymentCheckIsActive} = useIntervalFn(() => {
    console.debug('checking ...');

    fetchOrder(shopStore.state.orderKey).then(() => {
        if (shopStore.state.order?.['is_paid']) {
            console.debug('Order is paid');
            shopStore.navigateToTab('complete');
            PaymentCheckPause();
        }
    });

}, 2000, {immediate: false});


const state = reactive({
    unzer: computed(() => {
        if (!shopStore.state.paymentProviderData) return null;
        return new unzer(shopStore.state.paymentProviderData['public_key'], {locale: shopStore.state.locale});
    }),
    paymentHandler: {},
    loading: false,
    hasError: false,
    errorMessage: null,
    waitPayment: false,
});

/**
 * Initialize the payment type creation with Unzer-UI components
 */
function initUnzerForm() {
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
        state.paymentHandler['unzer-card'] = card;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-paypal') {
        // Creating a PayPal instance
        const paypal = state.unzer.Paypal();
        // Rendering input field
        //paypal.create('email', {
        //     containerId: 'paypal-element',
        //});
        state.paymentHandler['unzer-paypal'] = paypal;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-sofort') {
        const sofort = state.unzer.Sofort();
        state.paymentHandler['unzer-sofort'] = sofort;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-ideal') {
        const ideal = state.unzer.Ideal();
        ideal.create('ideal', {
            containerId: 'ideal-element',
        });
        state.paymentHandler['unzer-ideal'] = ideal;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-bancontact') {
        const bancontact = state.unzer.Bancontact();
        state.paymentHandler['unzer-bancontact'] = bancontact;
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-googlepay') {
        const googlepayScriptPromise = new Promise((resolve, reject) => {
            const googlepayScript = document.createElement('script');
            googlepayScript.setAttribute('src', 'https://pay.google.com/gp/p/js/pay.js');
            googlepayScript.onload = () => {
                resolve(googlepayScript);
            };
            googlepayScript.onerror = reject;
            document.head.appendChild(googlepayScript);
        });
        const googlepay = state.unzer.Googlepay();
        state.paymentHandler['unzer-googlepay'] = googlepay;
        const paymentDataRequestObject = googlepay.initPaymentDataRequestObject({
            gatewayMerchantId: shopStore.state.paymentProviderData.channel,
            merchantInfo: {
                merchantId: shopStore.state.paymentProviderData.merchant_id,
                merchantName: shopStore.state.paymentProviderData.merchant_name,
            },
            transactionInfo: {
                countryCode: shopStore.state.order.billing_address.dest['country'].toUpperCase(),
                currencyCode: 'EUR',
                totalPrice: shopStore.state.order.total.toString(),
                totalPriceStatus: 'ESTIMATED',  // backend should have the last words
                // totalPriceStatus: 'FINAL',
                // checkoutOption: 'COMPLETE_IMMEDIATE_PURCHASE',
            },
            // buttonColor: 'white',
            allowedCardNetworks: shopStore.state.paymentProviderData.brands,
            allowCreditCards: shopStore.state.paymentProviderData.allow_credit_cards,
            allowPrepaidCards: shopStore.state.paymentProviderData.allow_prepaid_cards,

            onPaymentAuthorizedCallback: (paymentData) => {
                PaymentCheckPause();
                state.loading = true;
                state.hasError = false;

                return googlepay.createResource(paymentData)
                    .then(result => {
                        console.debug(result);
                        saveType(result.id);
                        return {status: 'success'};  // Tell Google Pay we could handle it
                    })
                    .catch(function (error) {
                        paymentError(error);
                        return {  // Tell Google Pay we could NOT handle it
                            status: 'error',
                            message: error.customerMessage || error.message || error || 'Unexpected error',
                        };
                    });
            },
        });
        console.debug('unzer-googlepay', googlepay, paymentDataRequestObject);
        // TODO: How can we catch >Uncaught (in promise) AbortError: User closed the Payment Request UI.< ?
        googlepayScriptPromise.then(() => {
            // gpay script has been loaded, we can start the payment
            googlepay.create(
                {containerId: 'googlepay-element'},
                paymentDataRequestObject,
            );
        });
    } else if (shopStore.state.order?.['payment_provider'] === 'unzer-applepay') {
        const applepayScriptPromise = new Promise((resolve, reject) => {
            const applepayScript = document.createElement('script');
            applepayScript.src = 'https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js';
            applepayScript.crossOrigin = 'anonymous';
            applepayScript.onload = () => {
                resolve(applepayScript);
            };
            applepayScript.onerror = reject;
            document.head.appendChild(applepayScript);
        });

        function hasCapability() {
            return window.ApplePaySession && window.ApplePaySession.canMakePayments() && window.ApplePaySession.supportsVersion(6);
        }

        const applepay = state.unzer.ApplePay();
        state.paymentHandler['unzer-applepay'] = applepay;

        const applePayPaymentRequest = {
            countryCode: shopStore.state.order.billing_address.dest['country'].toUpperCase(),
            currencyCode: 'EUR',
            supportedNetworks: shopStore.state.paymentProviderData.brands,
            merchantCapabilities: ['supports3DS'],
            total: {
                label: shopStore.state.paymentProviderData.merchant_name,
                amount: shopStore.state.order.total,
            },
        };

        applepayScriptPromise.then(() => {
            if (!hasCapability()) {
                // TODO: check before ?
                alert('Apple Pay not available (not an Apple Device, ...)');
                return;
            }

            const session = applepay.initApplePaySession(applePayPaymentRequest);

            session.onpaymentauthorized = function (event) {
                console.debug(event);
                PaymentCheckPause();
                state.loading = true;
                state.hasError = false;

                // The event will contain the data you need to pass to our server-side integration to actually charge the customers card
                const paymentData = event.payment.token.paymentData;
                // event.payment also contains contact information if needed.

                // Create the payment method instance at Unzer with your public key
                applepay.createResource(paymentData)
                    .then(result => {
                        console.debug(result);
                        saveType(result.id);
                    })
                    .catch(function (error) {
                        paymentError(error);
                    });
            };

            // start the merchant validation process
            session.begin();
        });

    } else {
        console.warn(`Unknown payment provider: ${shopStore.state.order?.['payment_provider']}`);
    }
    state.loading = false;
}

/**
 * Handle an error
 *
 * @param error The error. In best cases an object from unzer
 *              with a translated (and detailed) description for the customer
 */
function paymentError(error) {
    console.error(error);
    state.loading = false;
    state.hasError = true;
    state.errorMessage = error.customerMessage || error.message || error || 'Error';
}

/**
 * Create the payment Type (ressource) on behalf of the Unzer-UI components.
 *
 * This function is used by all unzer payment types, except Google Pay and Apple Pay.
 */
function submitFormToUnzer() {
    PaymentCheckPause();
    state.loading = true;
    state.hasError = false;
    state.paymentHandler[shopStore.state.order?.['payment_provider']].createResource().then((result) => {
        saveType(result.id);
    }).catch((error) => {
        paymentError(error);
    });
}

/**
 * Save type-id on the order
 *
 * After the Unzer-UI components have collected the customer data and created the payment Type this function
 * has to be called to send the type-id to the viur-shop backend and store it.
 * @param typeId The type-id of the created Type, e.g. ``s-crd-abc123def456``
 */
function saveType(typeId) {
    const paymenttarget = shopStore.state.order?.['payment_provider'].split('-')[1];
    Request.post(`${shopStore.state.shopUrl}/pp_unzer_${paymenttarget}/save_type`, {
        dataObj: {
            order_key: shopStore.state.orderKey,
            type_id: typeId,
        },
    }).then(async (resp) => {
        shopStore.state.order = await resp.json();
        shopStore.checkoutOrder().then((resp) => {
            state.loading = false;
            state.hasError = false;
            if (shopStore.state.paymentProviderData?.redirectUrl) {
                state.waitPayment = true;
                window.open(shopStore.state.paymentProviderData.redirectUrl, '_blank', 'popup');
                PaymentCheckResume();
            }
        }).catch(async (error) => {
            paymentError(error);
        });

    }).catch(error => {
        paymentError(error);
    });
}


function cancelPayment() {
    PaymentCheckPause();
    emits('cancel');
}

onBeforeMount(() => {
    state.loading = true;
    if (!shopStore.state.paymentProviderData) {
        shopStore.checkout().then(() => {
            initUnzerForm();
        }).catch((error) => {
            console.log(error);
        });
    } else {
        initUnzerForm();
    }
});

</script>

<style scoped>
.loading-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.loading {
    font-size: 3rem;
}
</style>

<style>
/* global style to overwrite UnzerCSS */
.unzerUI.primary.button, .unzerUI.primary.buttons .button {
    background-color: var(--ignt-color-primary) !important;
}
</style>
