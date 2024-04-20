<template>
  <div style="max-width: 75%; margin: auto">
    <slot name="form" v-if="mode === 'form'">
      <form @submit.prevent="sendData">
        <div class="user">
          <h2 class="headline">Nutzterdaten</h2>
          <div class="form-wrap">
            <sl-input
              name="email"
              v-model="state.formValues['email']"
              placeholder="E-Mail"
              class="grid-w-4"
            >
              <label slot="label">E-Mail*</label>
            </sl-input>
            <sl-input
              name="name"
              v-model="state.formValues['lastname']"
              placeholder="Name"
              class="grid-w-2"
            >
              <label slot="label">Name*</label>
            </sl-input>
            <sl-input
              name="firstname"
              v-model="state.formValues['firstname']"
              placeholder="Vorname"
              class="grid-w-2"
            >
              <label slot="label">Vorname*</label>
            </sl-input>
          </div>
        </div>
        <div class="adress-wrapper">
          <div class="adress-column">
            <h2 class="headline">Lieferadresse</h2>
            <div class="form-wrap">
              <sl-input
                name="street"
                v-model="state.formValues['street']"
                placeholder="Straße"
                class="grid-w-3"
              >
                <label slot="label">Strasse *</label>
              </sl-input>
              <sl-input
                name="street"
                v-model="state.formValues['streetnumber']"
                placeholder="Hausnummer"
                type="number"
              >
                <label slot="label">Hausnummer *</label>
              </sl-input>
              <sl-input
                name="street"
                v-model="state.formValues['areacode']"
                placeholder="Postleitzahl"
                class="grid-w-2"
                type="number"
              >
                <label slot="label">Postleitzahl *</label>
              </sl-input>
              <sl-input
                name="city"
                v-model="state.formValues['city']"
                placeholder="Stadt"
                class="grid-w-2"
              >
                <label slot="label">Stadt*</label>
              </sl-input>
              <sl-input
                name="province"
                v-model="state.formValues['province']"
                placeholder="Bundesland"
                class="grid-w-2"
              >
                <label slot="label">Bundesland</label>
              </sl-input>
            </div>
          </div>

          <sl-checkbox @sl-change="onCustomAdressChange" checked>
            Rechnungsadresse wie Lieferadresse
          </sl-checkbox>

          <div class="adress-column" v-show="state.isCustomAdress">
            <h2 class="headline">Rechnungsadresse</h2>
            <div class="form-wrap">
              <sl-input
                name="street"
                v-model="state.formValues['billing.street']"
                placeholder="Straße"
                class="grid-w-3"
              >
                <label slot="label">Strasse *</label>
              </sl-input>
              <sl-input
                name="street"
                v-model="state.formValues['billing.streetnumber']"
                placeholder="Hausnummer"
                type="number"
              >
                <label slot="label">Hausnummer *</label>
              </sl-input>
              <sl-input
                name="city"
                v-model="state.formValues['billing.areacode']"
                placeholder="Postleitzahl"
                type="number"
                class="grid-w-2"
              >
                <label slot="label">Postleitzahl *</label>
              </sl-input>
              <sl-input
                name="city"
                v-model="state.formValues['billing.city']"
                placeholder="Stadt"
                class="grid-w-2"
              >
                <label slot="label">Stadt*</label>
              </sl-input>
              <sl-input
                name="province"
                v-model="state.formValues['billing.province']"
                placeholder="Bundesland"
                class="grid-w-2"
              >
                <label slot="label">Bundesland</label>
              </sl-input>
            </div>
          </div>
        </div>
        <div class="form-footer">
          <sl-button

            type="submit"
          >
            Zurück
          </sl-button>
          <sl-button
            :disabled="!state.requiredFieldsFilled"
            type="submit"
            variant="primary"
          >
            Weiter
          </sl-button>
        </div>
      </form>
    </slot>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";

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
});

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
  margin-top: var(--sl-spacing-large);
}

.adress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
}

.adress-column {
  align-self: flex-start;
  flex-grow: 1;
}

.form-wrap{
  display: grid;
  grid-template-columns: repeat(4, minmax(0 , 1fr));
  gap: 0 var(--sl-spacing-medium);
  margin: var(--sl-spacing-large) 0;
}

.grid-w-2{
  grid-column: span 2;
}

.grid-w-3{
  grid-column: span 3;
}

.grid-w-4{
  grid-column: span 4;
}
</style>
