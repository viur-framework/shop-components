import {defineStore} from 'pinia';
import {computed, reactive, ref} from 'vue';
import {useCart} from '../composables/cart';
import {useOrder} from '../composables/order';
import {useViurShopStore} from '../shop';
import {useShipping} from './shipping.js';
import {Request} from '@viur/vue-utils';

export const useAddress = defineStore('useAddressStore', () => {
  const shopStore = useViurShopStore();
  const {fetchShippingData} = useShipping();

  const state = reactive({
    billingIsShipping: true,
    shippingForm: ref(null),
    // for shipping and both mode
    shippingIsLoading: computed(() => {
      if (!state.shippingForm) {
        return true;
      }
      return state.shippingForm.state.loading;
    }),
    shippingIsUpdating: false, // for shipping and both mode
    shippingData: {},
    shippingValid: computed(() => {
      if (shopStore.state.cartRoot?.['shipping_address']) {
        return true;
      }
      return false;
    }),

    billingForm: ref(null),
    billingIsLoading: computed(() => {
      if (!state.billingForm) {
        return true;
      }
      return state.billingForm.state.loading;
    }),
    billingIsUpdating: false,
    billingData: {},
    billingValid: computed(() => {
      if (shopStore.state.order?.['billing_address']) {
        return true;
      }
      return false;
    }),

  });

  function saveForm(type, billingIsShipping = false) {
    state[`${type}IsUpdating`] = true;
    return state[`${type}Form`].sendData().then(async (resp) => {
      let data = await resp.json();

      if (['addSuccess', 'editSuccess'].includes(data['action'])) {
        if (billingIsShipping) {
          state.billingData = state.shippingData = data['values'];
        } else {
          state[`${type}Data`] = data['values'];
        }
        await updateAddresses(type, billingIsShipping);
      }
      state[`${type}IsUpdating`] = undefined;
      return data;
    }).catch(error => {
      state[`${type}Form`].state.loading = false;
      return {'action': 'error'};
    });
  }

  function saveAddresses(billingIsShipping = false) {
    return new Promise((resolve, reject) => {
      if (billingIsShipping) {
        saveForm('billing', billingIsShipping)
          .then(async res => {
            await fetchShippingData(); // different address --> other shipping
            resolve(res);
          })
          .catch(reject);
      } else {
        saveForm('shipping').then(() => {
          saveForm('billing').then(async () => {
            await fetchShippingData(); // different address --> other shipping
            resolve({'action': 'editSuccess'});
          }).catch((e) => reject(e));
        }).catch((e) => reject(e));
      }
    });
  }

  async function updateAddresses(type, billingIsShipping = false) {
    let key = state[`${type}Data`]['key'];
    if (type === 'shipping') {
      const {updateCart, fetchCart, shippingAddressKey} = useCart();
      if (key === shippingAddressKey.value) {
        // The address skel is the same, we just need to reload the relation
        fetchCart();
      } else {
        await updateCart({shipping_address_key: key});
      }
    } else if (type === 'billing') {
      const {addOrUpdateOrder, fetchOrder, billingAddressKey} = useOrder();
      if (key === billingAddressKey.value) { // The address skel is the same, we just need to reload the relation
        fetchOrder(shopStore.state.orderKey);
      } else {
        await addOrUpdateOrder({billing_address_key: key});
      }
      if (billingIsShipping) {
        await updateAddresses('shipping', false);
      }
    }
  }

  function saveBirthdate(addressKey, birthdate) {
    return new Promise((resolve, reject) => {
      Request.securePost(
        `/json/${shopStore.state.moduleName}/address/edit/${addressKey}`, {
          dataObj: {
            '@order': shopStore.state.orderKey,
            birthdate,
          },
        },
      )
        .then(async (res) => {
          const data = await res.json();
          if (data['action'] === 'editSuccess') {
            resolve(data);
          } else {
            reject(`Update failed`);
          }
        })
        .catch(reject);
    });
  }


  return {
    state,
    saveForm,
    updateAddresses,
    saveAddresses,
    saveBirthdate,
  };
});
