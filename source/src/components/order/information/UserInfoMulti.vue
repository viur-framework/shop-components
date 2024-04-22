<template>
    <slot name="form" v-if="mode === 'form'">
      <sl-spinner v-if="!state.isInit"></sl-spinner>
      <form @submit.prevent="sendData" v-else>
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
            <component
              :is="ShippingAdress"
              v-bind="{
                multiAdress: true,
                items: cartStore.state.carts[cartStore.state.basket].items,
              }"
              v-for="a in state.shippingAdressAmount"
              :key="a"
              @adressInput="log"
              @itemSelection="log"
            ></component>

            <div class="btn-wrap">

              <sl-button
                size="medium"
                @click="decreaseAdress"
                title="Lieferadresse entfernen"
              >
                <sl-icon name="x-lg"
                         slot="prefix"></sl-icon>
              </sl-button>
              <sl-button
                size="medium"
                variant="primary"
                @click="increaseAdress"
              >
                <sl-icon name="plus-lg"
                         slot="prefix"></sl-icon>
                Lieferadresse hinzufügen
              </sl-button>

            </div>

            <sl-alert
              variant="warning"
              duration="2000"
              ref="shippingWarning"
              closable
            >
              <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
              <strong>{{ state.amountAlert.title }} </strong><br />
              {{ state.amountAlert.msg }}
            </sl-alert>
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
                name="street"
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
</template>

<script setup>
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import ShippingAdress from "./adress/ShippingAdress.vue";
import { useCartStore } from "../../../stores/cart";

const props = defineProps({
  mode: { type: String, default: "form" },
});

const cartStore = useCartStore();

const state = reactive({
  formValues: {},
  requiredFieldsFilled: computed(() => {
    // TODO: automatisierte logik anhand der required felder aus struktur der bones
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
  shippingAdressAmount: 1,
  maxShippingAdress: computed(
    () => cartStore.state.carts[cartStore.state.basket].items.length,
  ),
  amountAlert: { title: "", msg: "" },
  items: null,
  isInit: computed(() => {
    if (cartStore.state.carts[cartStore.state.basket]) {
      return true;
    } else {
      return false;
    }
  }),
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
  // if (state.shippingAdressAmount === state.maxShippingAdress) {
  //   state.amountAlert.title = "Zu viele Lieferadressen";
  //   state.amountAlert.msg = `Sie können nur maximal: "${state.maxShippingAdress}" Lieferadressen verwenden.`;
  //   shippingWarning.value.show();
  //   return;
  // }
  state.shippingAdressAmount += 1;
}

function decreaseAdress() {
  if (state.shippingAdressAmount === 1) {
    state.amountAlert.title = "Zu wenig Lieferadressen";
    state.amountAlert.msg =
      "Mindestens eine Lieferadresse muss angegeben werden.";
    shippingWarning.value.show();
    return;
  }
  state.shippingAdressAmount -= 1;
}

function log(e) {
  console.log("emit hier", e);
  Object.assign(state.formValues, e);
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

.btn-wrap{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  margin-top: var(--sl-spacing-x-large);
}
</style>
