<template>
  PAYPAL HERE

  <div class="loading-wrapper" v-if="state.loading">
    <sl-spinner class="loading"></sl-spinner>
  </div>

  <div class="loading-wrapper" v-if="PaymentCheckIsActive">
    <sl-spinner class="loading"></sl-spinner>
    {{ $t('messages.wait_for_payment') }}
  </div>
  <div class="form-wrapper">
    <sl-alert :open="state.hasError" variant="danger">{{ state.errorMessage }}</sl-alert>

    <div id="paypal-button-container"></div>

    <sl-button :disabled="state.loading" variant="danger" @click="cancelPayment">
      {{ $t('actions.cancel') }}
    </sl-button>
  </div>
</template>

<script setup>
import {Request} from '@viur/vue-utils';
import {HTTPError} from '@viur/vue-utils/utils/request.js';
import {useIntervalFn} from '@vueuse/core';
import {onBeforeMount, reactive} from 'vue';
import {useAddress} from '../composables/address.js';
import {useOrder} from '../composables/order';
import {useViurShopStore} from '../shop';

const shopStore = useViurShopStore();
const {fetchOrder} = useOrder();
const {saveBirthdate} = useAddress();

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
  paymentHandler: {},
  loading: false,
  hasError: false,
  errorMessage: null,
  waitPayment: false,
  order_id: null,
});

/**
 * Initialize the payment type creation with Unzer-UI components
 */
function initPaypalForm() {
  if (shopStore.state.order?.['payment_provider'] !== 'paypal_checkout') {
    console.error(`PayPal Checkout does not work with ${shopStore.state.order?.['payment_provider']}.`);
    return null;
  }

  const paypalScriptPromise = new Promise((resolve, reject) => {
    const paypalScript = document.createElement('script');
    const client_id = shopStore.state.paymentProviderData.public_key;
    paypalScript.setAttribute('src', `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=DE&currency=EUR&components=buttons&enable-funding=venmo,paylater,card`);
    paypalScript.onload = () => {
      resolve(paypalScript);
    };
    paypalScript.onerror = reject;
    document.head.appendChild(paypalScript);
  });


  paypalScriptPromise.then(() => {
    console.debug('paypalScriptPromise resolved - READY');
    console.debug(shopStore.state.paymentProviderData);

    const paypalButtons = window.paypal.Buttons({
      style: {
        shape: 'rect',
        layout: 'vertical',
        color: 'gold',
        label: 'paypal',
      },
      message: {
        amount: 100,
      },

      async createOrder() {
        console.debug('createOrder');
        try {
          let resp = await shopStore.checkoutOrder();//.then((resp) => {
          console.debug(resp);

          // const orderData = await resp.json();
          const orderData = await resp.payment;
          // const orderData = await response.json();

          // let orderData = shopStore.state.paymentProviderData;
          console.debug(orderData);

          if (orderData.id) {
            state.order_id = orderData.id;
            return orderData.id;
          }

          const errorDetail = orderData?.details?.[0];
          const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : JSON.stringify(orderData);

          throw new Error(errorMessage);
        } catch (error) {
          console.error(error);
          // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
        }
      },

      async onApprove(data, actions) {
        console.debug('onApprove', data, actions);

        // function saveType(typeId) {
        const paymenttarget = shopStore.state.order?.['payment_provider'].replace(/-/g, '_');
        Request.post(`${shopStore.state.shopUrl}/pp_${paymenttarget}/capture_order`, {
          dataObj: {
            order_key: shopStore.state.orderKey,
            order_id: state.order_id,
          },
        }).then(async (resp) => {
          console.debug('capture_order', resp);
          // shopStore.state. = await resp.json();
          // shopStore.checkoutOrder().then( async(resp) => {
          //   console.debug(resp)

          const orderData = await resp.json();
          // const orderData = (await resp.json()).payment;
          // const orderData = resp.payment;
          console.debug(orderData);

          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per
            // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`,
            );
          } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
              orderData?.purchase_units?.[0]?.payments
                ?.authorizations?.[0];
            console.log(
              'Capture result',
              orderData,
              JSON.stringify(orderData, null, 2),
            );
            resultMessage(
              `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`,
            );

            state.loading = false;
            state.hasError = false;
            state.waitPayment = true;
            PaymentCheckResume();
          }
          // } catch (error) {
          //   console.error(error);
          //   resultMessage(
          //     `Sorry, your transaction could not be processed...<br><br>${error}`,
          //   );
          // }
        }).catch(error => {
          paymentError(error);
        });
        /*
        try {
           // shopStore.checkoutOrder().then((resp) => {


   const response = await fetch(
            `/api/orders/${data.orderID}/capture`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          const orderData = await response.json();
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per
            // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`,
            );
          } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
              orderData?.purchase_units?.[0]?.payments
                ?.authorizations?.[0];
            resultMessage(
              `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`,
            );
            console.log(
              'Capture result',
              orderData,
              JSON.stringify(orderData, null, 2),
            );
          }
        } catch (error) {
          console.error(error);
          resultMessage(
            `Sorry, your transaction could not be processed...<br><br>${error}`,
          );
        }
         */
      },

      onError: (err) => {
        console.error(err);
        paymentError(err);
        // redirect to your specific error page
        // window.location.assign('/your-error-page-here');
      },
    });

    paypalButtons.render('#paypal-button-container');


    // Example function to show a result to the user. Your site's UI library can be used instead.
    function resultMessage(message) {
      alert(message);
      // const container = document.querySelector('#result-message');
      // container.innerHTML = message;
      PaymentCheckPause();
    }

  });
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
  if (error && error.constructor.name === HTTPError.name && error.response.headers.get('x-viur-shop-error')) {
    error.response.json().then(res => {
      console.error(res.errors);
      state.errorMessage = res.errors.map(err => err.customer_message || err.message).join(', ');
    });
  } else {
    state.errorMessage = error.customerMessage || error.message || error || 'Error';
  }
}

/**
 * Create the payment Type (ressource) on behalf of the Unzer-UI components.
 *
 * This function is used by all unzer pyment types, except Google Pay.
 */
function submitFormToUnzer() {
  PaymentCheckPause();
  state.loading = true;
  state.hasError = false;
  state.paymentHandler[shopStore.state.order?.['payment_provider']].createResource()
    .then((result) => {
      saveType(result.id);
    })
    .catch((error) => {
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
  const paymenttarget = shopStore.state.order?.['payment_provider'].split('-').slice(1).join('-');
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
  console.debug('mounting', shopStore.state.paymentProviderData);
  state.loading = true;
  // initPaypalForm();
  if (!shopStore.state.paymentProviderData) {
    shopStore.checkoutStart().then(() => {
      initPaypalForm();
      fetchOrder(shopStore.state.orderKey); // refresh order after checkout_start freeze
    }).catch((error) => {
      console.log(error);
    });
  } else {
    initPaypalForm();
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
