<template>
  <slot name="form" v-if="mode === 'form'">
    <form @submit.prevent="sendData">
      <h2 class="viur-shop-form-headline headline">Nutzterdaten</h2>
      <div class="viur-shop-form-wrap">
        <sl-input
          name="email"
          v-model="state.formValues['email']"
          placeholder="E-Mail"
          class="viur-shop-form-grid-w-4"
        >
          <label slot="label">E-Mail*</label>
        </sl-input>
        <sl-input
          name="name"
          v-model="state.formValues['lastname']"
          placeholder="Name"
          class="viur-shop-form-grid-w-2"
        >
          <label slot="label">Name*</label>
        </sl-input>
        <sl-input
          name="firstname"
          v-model="state.formValues['firstname']"
          placeholder="Vorname"
          class="viur-shop-form-grid-w-2"
        >
          <label slot="label">Vorname*</label>
        </sl-input>
      </div>
      <div class="viur-shop-form-adress-wrapper">
        <div class="viur-shop-form-adress-column">
          <h2 class="viur-shop-form-headline headline">Lieferadresse</h2>
          <div class="viur-shop-form-wrap">
            <sl-input
              name="street"
              v-model="state.formValues['street']"
              placeholder="Straße"
              class="viur-shop-form-grid-w-3"
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
              class="viur-shop-form-grid-w-2"
              type="number"
            >
              <label slot="label">Postleitzahl *</label>
            </sl-input>
            <sl-input
              name="city"
              v-model="state.formValues['city']"
              placeholder="Stadt"
              class="viur-shop-form-grid-w-2"
            >
              <label slot="label">Stadt*</label>
            </sl-input>
            <sl-input
              name="province"
              v-model="state.formValues['province']"
              placeholder="Bundesland"
              class="viur-shop-form-grid-w-2"
            >
              <label slot="label">Bundesland</label>
            </sl-input>
          </div>
        </div>

        <sl-checkbox @sl-change="onCustomAdressChange" checked>
          Rechnungsadresse wie Lieferadresse
        </sl-checkbox>

        <div class="viur-shop-form-adress-column" v-show="state.isCustomAdress">
          <h2 class="viur-shop-form-headline headline">Rechnungsadresse</h2>
          <div class="viur-shop-form-wrap">
            <sl-input
              name="street"
              v-model="state.formValues['billing.street']"
              placeholder="Straße"
              class="viur-shop-form-grid-w-3"
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
              class="viur-shop-form-grid-w-2"
            >
              <label slot="label">Postleitzahl *</label>
            </sl-input>
            <sl-input
              name="city"
              v-model="state.formValues['billing.city']"
              placeholder="Stadt"
              class="viur-shop-form-grid-w-2"
            >
              <label slot="label">Stadt*</label>
            </sl-input>
            <sl-input
              name="province"
              v-model="state.formValues['billing.province']"
              placeholder="Bundesland"
              class="viur-shop-form-grid-w-2"
            >
              <label slot="label">Bundesland</label>
            </sl-input>
          </div>
        </div>
      </div>
      <div class="viur-shop-form-footer">
        <sl-button type="submit"> Zurück </sl-button>
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
</template>

<script setup>
import { reactive, computed, watch, onBeforeMount } from "vue";
import { useCartStore } from "../../../stores/cart";

const props = defineProps({
  mode: { type: String, default: "form" },
});

const cartStore = useCartStore();

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
  addSkel: null,
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

onBeforeMount(async () => {
  await cartStore.getAdressStructure();
  state.addSkel = cartStore.state.structure.address;
});
</script>

<style scoped>
.viur-shop-form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: var(--sl-spacing-large);
}

.viur-shop-form-adress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
}

.viur-shop-form-adress-column {
  align-self: flex-start;
  flex-grow: 1;
}

.viur-shop-form-wrap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0 var(--sl-spacing-medium);
  margin: var(--sl-spacing-large) 0;
}

.viur-shop-form-grid-w-2 {
  grid-column: span 2;
}

.viur-shop-form-grid-w-3 {
  grid-column: span 3;
}

.viur-shop-form-grid-w-4 {
  grid-column: span 4;
}
</style>
