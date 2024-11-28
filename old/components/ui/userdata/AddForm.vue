<template>
  <sl-spinner v-if="state.isLoading"></sl-spinner>
  <ViForm
    ref="addForm"
    :module="`${cartStore.state.shopModuleName}/address`"
    action="add"
    :useCategories="false"
    :layout="layout ? layout : DefaultLayout"
    :values="modelValue"
    :skel="
      type === 'billing'
        ? addressStore.state.active.billing
        : addressStore.state.active.shipping
    "
    @change="updateValues"
  >
  </ViForm>

  <!-- BUTTON NUR PLATZHALTER FÜR TESTS -->
  <sl-bar>
    <div slot="left">
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
import { useAddressStore } from "../../../stores/address";
import { useOrderStore } from "../../../main";

const props = defineProps({
  layout: { required: false },
  customer: { type: Object, required: true },
  type: { type: String, default: "billing" },
  modelValue: { type: Object },
});

const emit = defineEmits(["update:modelValue", "addSuccess", "valid"]);

const cartStore = useCartStore();
const addressStore = useAddressStore();
const orderStore = useOrderStore();

const addForm = ref(null);

const state = reactive({
  isLoading: computed(() => (addForm.value ? addForm.value.loading : true)),
  isSending: false,
  wasSuccess: false,
  user: {},
});

function sendForm() {
  const isValid = validate(addForm.value.state.skel);

  if (isValid) {
    state.isSending = true;

    addForm.value.sendData().then(async (resp) => {
      let data = await resp.json();

      state.isSending = false;

      if (data["action"] === "addSuccess") {
        addForm.value.state.skel = data.values;

        if (props.type === "billing") {
          addressStore.state.active.billing = addForm.value.state.skel;

          orderStore.updateParams({
            billing_address_key: addressStore.state.active.billing.key,
          });

          if (addressStore.state.clone) {
            cartStore.update({
              key: orderStore.state.currentOrder.cart.dest.key,
              shippingAddress: addressStore.state.active.shipping.key,
            });
          }
        } else {
          addressStore.state.active.shipping = addForm.value.state.skel;

          cartStore.update({
            key: orderStore.state.currentOrder.cart.dest.key,
            shippingAddress: addressStore.state.active.shipping.key,
          });
        }

        emit("addSuccess", {
          show: true,
          msg: "Erfolg!",
          variant: "success",
          icon: "check2-circle",
        });

        emit("valid", true);
      } else {
        emit("valid", false);
      }
    });
  }
}

// TODO: needs a real validation solution with logics used in backend configuration
function validate(formData) {
  const structure = addressStore.state.structure;
  let total = 0;
  let valid = 0;

  // TODO: will be deleted when backend address module is set up properly
  structure.firstname.required = true;
  structure.lastname.required = true;
  structure.street_name.required = true;
  structure.street_number.required = true;
  structure.zip_code.required = true;
  structure.city.required = true;
  structure.country.required = true;

  for (let key of Object.keys(structure)) {
    if (structure[key].required) {
      total += 1;
    }
  }

  for (let [key, value] of Object.entries(formData)) {
    if (structure[key].required && value) {
      valid += 1;
    }
  }

  if (valid === total) {
    return true;
  }

  return false;
}

function updateValues() {
  emit("update:modelValue", addForm.value.state.skel);
}

onMounted(() => {
  addressStore.getStructure();
});
</script>

<style scoped></style>
