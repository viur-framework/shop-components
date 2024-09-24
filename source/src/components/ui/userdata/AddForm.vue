<template>
  <sl-spinner v-if="state.isLoading"></sl-spinner>
  <ViForm
    ref="addForm"
    module="shop/address"
    action="add"
    :useCategories="false"
    :layout="layout ? layout : DefaultLayout"
    :skel="setSkelValues({ address_type: 'shipping' })"
    :structure="cartStore.state.structure.address"
  >
  </ViForm>
  <sl-bar>
    <div slot="left">
      <!-- BUTTON NUR PLATZHALTER FÜR TESTS -->
      <sl-button variant="success" @click="sendForm" :loading="state.isSending">
        <sl-icon name="floppy2" slot="prefix"></sl-icon>
        {{
          $t("actions.add").charAt(0).toUpperCase() + $t("actions.add").slice(1)
        }}
      </sl-button>
    </div>
  </sl-bar>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
import ViForm from "@viur/vue-utils/forms/ViForm.vue";
import DefaultLayout from "./DefaultLayout.vue";
import { useCartStore } from "../../../stores/cart";
import { useTimeoutFn } from "@vueuse/core";

const props = defineProps({
  layout: { required: false },
});
const cartStore = useCartStore();
const addForm = ref(null);
const state = reactive({
  isLoading: true,
  isSending: false,
  wasSuccess: false,
});

function setSkelValues(dict) {
  let structure = cartStore.state.structure.address;
  let skel = {};

  Object.keys(structure).forEach((boneName) => {
    skel[boneName] = null;
  });

  Object.entries(dict).forEach(([boneName, boneValue]) => {
    console.log("hier", boneName);
    console.log("hier", boneValue);
    skel[boneName] = boneValue;
  });
  console.log("hier", skel);
  return skel;
}

function sendForm() {
  if (addForm.value.state.skel.address_type === "shipping") {
    cartStore.state.shippingAddress = addForm.value.state.skel;
    cartStore.state.billingAddress = addForm.value.state.skel;
  } else {
    cartStore.state.billingAddress = addForm.value.state.skel;
  }
  console.log("se", addForm.value.state.skel);
  state.isSending = true;
  addForm.value.sendData().then(async (resp) => {
    let data = await resp.json();
    state.isSending = false;
    if (data["action"] === "addSuccess") {
      state.wasSuccess = true;
      // addForm.value.state.skel = {} // clears form
      //window.location.href = "/todo/add?style=success"
    }
  });
}

watchEffect(() => {
  if (addForm.value && addForm.value !== null && addForm !== null) {
    const { start } = useTimeoutFn(() => {
      state.isLoading = addForm.value.state.loading;
    }, 1000);

    start();
  }
});
</script>

<style scoped></style>
