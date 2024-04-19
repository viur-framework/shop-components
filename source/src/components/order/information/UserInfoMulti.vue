<template>
  <div style="max-width: 75%; margin: auto">
    <slot name="form" v-if="mode === 'form'">
      <form @submit.prevent="sendData">
        <div class="user">
          <h1 style="font-size: 1.5rem">Nutzterdaten</h1>
          <sl-input
            name="email"
            v-model="state.formValues['email']"
            placeholder="E-Mail"
          >
            <label slot="label">E-Mail*</label>
          </sl-input>
          <sl-input
            name="name"
            v-model="state.formValues['lastname']"
            placeholder="Name"
          >
            <label slot="label">Name*</label>
          </sl-input>
          <sl-input
            name="firstname"
            v-model="state.formValues['firstname']"
            placeholder="Vorname"
          >
            <label slot="label">Vorname*</label>
          </sl-input>
        </div>
        <div class="adress-wrapper">
          <div class="adress-column">
            <h1 style="font-size: 1.5rem">Lieferadresse</h1>
            <component
              :is="ShippingAdress"
              v-bind="{ multiAdress: true }"
              v-for="a in state.shippingAdressAmount"
              :key="a"
            ></component>
            <sl-icon-button
              type="button"
              name="plus"
              size="20"
              label="Adresse hinzufügen"
              style="font-size: 2.5rem; color: green"
              @click="increaseAdress"
            ></sl-icon-button>
            <sl-icon-button
              type="button"
              name="dash"
              size="20"
              label="Adresse hinzufügen"
              style="font-size: 2.5rem; color: red"
              @click="decreaseAdress"
            ></sl-icon-button>
            <sl-alert variant="warning" duration="2000" ref="shippingWarning" closable>
              <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
              <strong>Zu Wenig Lieferadressen</strong><br />
              Mindestens eine Lieferadresse muss angegeben werden
            </sl-alert>
          </div>

          <div class="adress-column" v-show="state.isCustomAdress">
            <h1 style="font-size: 1.5rem">Rechnungsadresse</h1>
            <sl-input
              name="street"
              v-model="state.formValues['billing.street']"
              placeholder="Straße"
            >
              <label slot="label">Strasse / Haus Nr.*</label>
            </sl-input>
            <sl-input
              name="province"
              v-model="state.formValues['billing.province']"
              placeholder="Bundesland"
            >
              <label slot="label">Bundesland</label>
            </sl-input>
            <sl-input
              name="city"
              v-model="state.formValues['billing.city']"
              placeholder="Stadt"
            >
              <label slot="label">Stadt*</label>
            </sl-input>
          </div>
        </div>
        <div class="form-footer">
          <sl-button
            :variant="state.requiredFieldsFilled ? 'primary' : 'disabled'"
            :disabled="!state.requiredFieldsFilled"
            type="submit"
          >
            Senden
          </sl-button>
          <sl-checkbox @sl-change="onCustomAdressChange" checked>
            Rechnungsadresse wie Lieferadresse
          </sl-checkbox>
        </div>
      </form>
    </slot>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref } from "vue";
import ShippingAdress from "./adress/ShippingAdress.vue";

const props = defineProps({
  mode: { type: String, default: "form" },
});

const state = reactive({
  formValues: {},
  requiredFieldsFilled: computed(() => {
    if (state.isCustomAdress) {
      return (
        Object.keys(state.formValues).includes("city") &&
        Object.keys(state.formValues).includes("street") &&
        Object.keys(state.formValues).includes("billing.city") &&
        Object.keys(state.formValues).includes("billing.street") &&
        Object.keys(state.formValues).includes("email") &&
        Object.keys(state.formValues).includes("firstname") &&
        Object.keys(state.formValues).includes("lastname")
      );
    }
    if (!state.isCustomAdress) {
      return (
        Object.keys(state.formValues).includes("city") &&
        Object.keys(state.formValues).includes("street") &&
        Object.keys(state.formValues).includes("email") &&
        Object.keys(state.formValues).includes("firstname") &&
        Object.keys(state.formValues).includes("lastname")
      );
    }
  }),
  isCustomAdress: false,
  shippingAdressAmount: 2,
});

const shippingWarning = ref(null);

// function updateFormValues(e){
//   state.formValues[e.target.name] = e.target.value
// }

function sendData(e) {
  console.log("sende daten...", state.formValues);
}

function onCustomAdressChange(e) {
  if (e.target.checked) state.isCustomAdress = false;
  if (!e.target.checked) state.isCustomAdress = true;
}

function increaseAdress() {
  state.shippingAdressAmount += 1;
}

function decreaseAdress() {
  if (state.shippingAdressAmount === 1) {
    shippingWarning.value.show();
    return;
  }
  state.shippingAdressAmount -= 1;
}

watch(state.formValues, (newValues) => {
  Object.entries(newValues).forEach(([k, v]) => {
    if (v === "") {
      delete state.formValues[k];
    }
  });
});
</script>

<style scoped>
.form-footer {
  display: flex;
  justify-content: space-between;
}

.adress-wrapper {
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
}

.adress-column {
  align-self: flex-start;
  flex-grow: 1;
}
</style>
