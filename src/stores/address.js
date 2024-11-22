import { reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { struct2dict } from "../lib/utils";
import { useCartStore } from "./cart";
export const useAddressStore = defineStore("shop-address", () => {
  const cartStore = useCartStore();

  const state = reactive({
    shopClient: null,
    addressList: [],
    active: {
      billing: {},
      shipping: {},
    },
    default: { billing: {}, shipping: {} },
    structure: {},
    clone: true,
  });

  const listByType = (type) => {
    return state.addressList.filter((address) => address.address_type === type);
  };

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
        state.addressList = addressList;
        await getStructure();
        getDefault();
        resolve([state.active.billing, state.active.shipping]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function getDefault(type = "billing") {
    let list = listByType(type);

    list.forEach((address) => {
      if (address.is_default) {
        state.default[type] = address;
        state.active[type] = address;

        if (state.clone) {
          let temp = { ...address };
          temp.address_type = "shipping";
          state.active.shipping = temp;
        }
      }
    });

    if (!Object.keys(state.default[type]).length) {
      state.active[type] = setValues(type);
      if (state.clone) {
        state.active.shipping = setValues("shipping");
      }
    }
  }

  function setValues(type) {
    let structure = state.structure;
    let skel = {};

    Object.entries(structure).forEach(([boneName, boneValue]) => {
      if (boneName === "customer") {
        skel[boneName] = cartStore.state.customer.key;
      } else if (boneName === "address_type") {
        skel[boneName] = type;
      } else {
        skel[boneName] = boneValue.emptyvalue;
      }
    });

    return skel;
  }

  function getList(type = "billing") {
    return listByType(type);
  }

  watch(
    () => state.clone,
    (newValue, oldValue) => {
      if (newValue) {
        let temp = { ...state.active.billing };
        temp.address_type = "shipping";
        state.active.shipping = { ...temp };
      } else {
        getDefault("shipping");
      }
    },
  );

  return {
    state,
    init,
    setValues,
    getDefault,
    getStructure,
    getList,
  };
});
