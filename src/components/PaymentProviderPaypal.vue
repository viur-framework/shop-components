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
import {useOrder} from '../composables/order';
import {useViurShopStore} from '../shop';

const shopStore = useViurShopStore();
const {fetchOrder} = useOrder();

const emits = defineEmits(['cancel']);

// TODO: Duplicate code
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
  debugPaypal: false,
});

/**
 * Initialize the payment type creation with Unzer-UI components
 */
function initPaypalForm() {
  if (shopStore.state.order?.['payment_provider'] !== 'paypal_checkout') {
    console.error(`PayPal Checkout does not work with ${shopStore.state.order?.['payment_provider']}.`);
    return null;
  }

  const scriptConfig = {
    // https://developer.paypal.com/sdk/js/configuration/#configure-and-customize-your-integration
    'client-id': shopStore.state.paymentProviderData.public_key,
    'buyer-country': shopStore.state.order.billing_address.dest['country'].toUpperCase() ?? 'DE',
    'currency': 'EUR',
    'components': 'buttons,applepay',
    'enable-funding': 'venmo,paylater,card,sofort,sepa,giropay',
    'debug': state.debugPaypal,
  };

  const paypalScriptPromise = new Promise((resolve, reject) => {
    const paypalScript = document.createElement('script');
    paypalScript.setAttribute('src', `https://www.paypal.com/sdk/js?${new URLSearchParams(scriptConfig).toString()}`);
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
        state.loading = true;

        if (shopStore.state.order?.['is_ordered'] && shopStore.state.order?.['is_checkout_in_progress'] && !shopStore.state.order?.['is_paid']) {
          // already ordered; needs a re-checkout method to create a new order. But we can try it again with the last order_id
          state.order_id = (shopStore.state.order?.payment?.payments ?? []).at(-1)?.payment_id;
          return state.order_id;
        }

        try {
          const resp = await shopStore.checkoutOrder(); // must be inline awaited to return order_id on success
          // TODO: re-checkout with new attempt or different method
          console.debug('checkoutOrder', resp);
          const orderData = resp.payment;

          if (orderData.id) {
            // SUCCESS; return the order_id to the PayPal instance
            state.order_id = orderData.id;
            return orderData.id;
          } else {
            // ERROR; show error message
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);
            console.error(errorDetail);
            paymentError(`Could not initiate PayPal Checkout...<br><br>${errorMessage}`);
          }
        } catch (error) {
          paymentError(error);
          return null;
        } finally {
          state.loading = false;
        }
      },

      /**
       * Buyer approved the payment, send it to the backend to capture it and mark as paid.
       */
      async onApprove(data, actions) {
        console.debug('onApprove', data, actions);
        state.loading = true;

        const paymenttarget = shopStore.state.order?.['payment_provider'].replace(/-/g, '_');
        Request.post(`${shopStore.state.shopUrl}/pp_${paymenttarget}/capture_order`, {
          dataObj: {
            order_key: shopStore.state.orderKey,
            order_id: state.order_id,
          },
        })
          .then(async (resp) => {
            console.debug('capture_order', resp);
            const data = await resp.json();
            const orderData = data.payment;

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
              paymentError(`${errorDetail.description} (${orderData?.debug_id})`);
            } else if (!orderData.purchase_units) {
              paymentError(`Missing purchase_units`);
            } else {
              // (3) Successful transaction -> Show confirmation or thank you message
              // Or go to another URL:  actions.redirect('thank_you.html');
              state.loading = false;
              state.hasError = false;
              state.waitPayment = true;
              PaymentCheckResume();
            }
          })
          .catch(paymentError);
      },

      onError: paymentError,

      // appSwitchWhenAvailable: true,
    });
    paypalButtons.render('#paypal-button-container');
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

function cancelPayment() {
  PaymentCheckPause();
  emits('cancel');
}

onBeforeMount(() => {
  console.debug('mounting', shopStore.state.paymentProviderData);
  state.loading = true;
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
