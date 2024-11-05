<template>
  <sl-spinner v-if="state.isLoading"></sl-spinner>
  <ViForm
    ref="addForm"
    module="shop/address"
    action="add"
    :useCategories="false"
    :layout="layout ? layout : DefaultLayout"
    :values="modelValue"
    :skel="
      mode === 'shipping'
        ? cartStore.state.activeShippingAddress
        : cartStore.state.activeBillingAddress
    "
    @change="updateValues"
  >
  </ViForm>

  <sl-bar>
    <div slot="left">
      <!-- BUTTON NUR PLATZHALTER FÜR TESTS -->
      <sl-button
        variant="success"
        @click.stop.prevent="sendForm"
        :loading="state.isSending"
      >
        <sl-icon name="floppy2" slot="prefix"></sl-icon>
        {{
          $t("actions.add").charAt(0).toUpperCase() + $t("actions.add").slice(1)
        }}
      </sl-button>
    </div>
  </sl-bar>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import ViForm from "@viur/vue-utils/forms/ViForm.vue";
import DefaultLayout from "./DefaultLayout.vue";
import { useCartStore } from "../../../stores/cart";

const props = defineProps({
  layout: { required: false },
  customer: { type: Object, required: true },
  mode: { type: String, default: "shipping" },
  modelValue: { type: Object },
});
const emit = defineEmits(["update:modelValue", "addSuccess"]);
const cartStore = useCartStore();
const addForm = ref(null);
const state = reactive({
  isLoading: computed(() => (addForm.value ? addForm.value.loading : true)),
  isSending: false,
  wasSuccess: false,
  user: {},
  skel: computed(() => {
    if (props.mode === "shipping") return cartStore.state.activeShippingAddress;
    else return cartStore.state.activeBillingAddress;
  }),
});

function sendForm() {
  if (props.mode === "shipping") {
    cartStore.state.activeShippingAddress = addForm.value.state.skel;
  } else {
    cartStore.state.activeBillingAddress = addForm.value.state.skel;
  }

  state.isSending = true;
  addForm.value.sendData().then(async (resp) => {
    let data = await resp.json();
    state.isSending = false;
    if (data["action"] === "addSuccess") {
      emit("addSuccess", {
        show: true,
        msg: "Erfolg!",
        variant: "success",
        icon: "check2-circle",
      });
    }
  });
}

function setSkelValues(dict = {}) {
  let structure = cartStore.state.structure.address;
  let skel = {};

  Object.keys(structure).forEach((boneName) => {
    if (boneName === "customer") {
      skel[boneName] = state.user.key;
      return;
    }
    skel[boneName] = null;
  });

  Object.entries(dict).forEach(([boneName, boneValue]) => {
    skel[boneName] = boneValue;
  });

  return skel;
}

function updateValues() {
  emit("update:modelValue", addForm.value.state.skel);
}

// onBeforeMount(() => {
//   cartStore.getAddressStructure();

//   // state.skel = setSkelValues({
//   //   address_type: "shipping",
//   //   customer: props.customer.key,
//   // });
// });
onMounted(() => {
  cartStore.getAddressStructure();
  // updateValues();
  // state.skel = setSkelValues({
  //   address_type: "shipping",
  //   customer: props.customer.key,
  // });
});
</script>

<style scoped></style>
