<template>
  <sl-spinner v-show="state.isLoading"></sl-spinner>
  <ViForm
    ref="addForm"
    module="shop/address"
    action="add"
    :useCategories="false"
    v-show="state.isLoading === false"
    :layout="layout ? layout : DefaultLayout"
  >
  </ViForm>
  <sl-bar>
    <div slot="right">
      <sl-button variant="success" @click="sendForm" :loading="state.sending">
        <sl-icon name="floppy2" slot="prefix"></sl-icon>
        Senden
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
      state.isLoading = false;
    }, 1000);

    start();
  }
});
</script>

<style scoped></style>
