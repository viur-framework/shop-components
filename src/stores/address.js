import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { struct2dict } from "../lib/utils";
import { useCartStore } from "./cart";
export const useAddressStore = defineStore("shop-address", () => {
  const cartStore = useCartStore();

  const state = reactive({
    shopClient: null,
    adressList: [],
    activeBillingAddress: {},
    activeShippingAddress: {},
    structure: {},
    cloneBilling: true,
    billingAddressList: [],
    shippingAddressList: [],
  });

  async function getStructure() {
    try {
      const structure = await state.shopClient.address_structure();

      if (structure.structure) {
        state.structure = struct2dict(structure.structure);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function init() {
    return new Promise(async (resolve, reject) => {
      if (!cartStore.state.isLoggedIn) {
        reject("not logged in");
      }
      let addressList = [];
      try {
        addressList = await state.shopClient.address_list();
      } catch (error) {
        reject(error);
      }

      state.billingAddressList = [];
      state.shippingAddressList = [];

      for (const address of addressList) {
        if (address.address_type === "billing") {
          state.billingAddressList.push(address);
        }
        if (address.address_type === "shipping") {
          state.shippingAddressList.push(address);
        }
      }

      getDefault();
      resolve([state.activeBillingAddress, state.activeShippingAddress]);
    });
  }

  function getDefault() {
    if (state.billingAddressList) {
      state.billingAddressList.forEach((address) => {
        if (address.is_default) {
          state.activeBillingAddress = address;
        }
      });
    } else {
      state.activeBillingAddress = setValues("billing");
    }
    if (state.shippingAddressList) {
      state.shippingAddressList.forEach((address) => {
        if (address.is_default && !state.cloneBilling) {
          state.activeShippingAddress = address;
        }
      });
    } else {
      if (state.cloneBilling) {
        state.activeShippingAddress = { ...state.activeBillingAddress };
      } else {
        state.activeShippingAddress = setValues("shipping");
      }
    }
  }

  function setValues(mode) {
    let structure = state.structure.address;
    let skel = {};

    Object.entries(structure).forEach(([boneName, boneValue]) => {
      if (boneName === "customer") {
        skel[boneName] = state.customer.key;
      } else if (boneName === "address_type") {
        skel[boneName] = mode;
      } else {
        skel[boneName] = boneValue.emptyvalue;
      }
    });

    return skel;
  }

  watch(
    () => state.activeBillingAddress,
    (newValue, oldValue) => {
      if (oldValue) {
        const isAddress = (address) => address.key === newValue.key;

        let index = state.billingAddressList.findIndex(isAddress);

        state.billingAddressList[index] = newValue;
      }
      if (state.cloneBilling) {
        state.activeShippingAddress = newValue;
      }
    },
  );

  watch(
    () => state.activeShippingAddress,
    (newValue, oldValue) => {
      if (newValue) {
        const isAddress = (address) => address.key === newValue.key;

        let index = state.shippingAddressList.findIndex(isAddress);

        state.shippingAddressList[index] = newValue;
      } else {
        state.activeShippingAddress = setValues("shipping");
      }
    },
  );

  watch(
    () => state.cloneBilling,
    (newValue, oldValue) => {
      if (newValue) {
        let temp = { ...state.activeBillingAddress };
        temp.address_type = "shipping";
        state.activeShippingAddress = { ...temp };
      }
    },
  );

  return {
    state,
    init,
    setValues,
    getDefault,
    getStructure,
  };
});
