<template>
  <!-- <slot name="form" v-if="mode === 'form'">
      <sl-spinner v-if="!state.isInit"></sl-spinner>
      <form @submit.prevent="sendData" v-else>
        <h2 class="viur-shop-form-input-headline headline">Nutzterdaten</h2>
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
            <h2 class="viur-shop-form-input-headline headline">Lieferadresse</h2>
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

            <div class="viur-shop-form-btn-wrap">

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
                name="street"
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
      </form>
    </slot> -->

  <div>
    <h2 class="viur-shop-form-headline headline">Nutzterdaten</h2>
    <template v-for="item in state.addSkel" :key="item[0]">
      <bone
        :is="getBoneWidget(item[1].type)"
        v-if="item[1].visible && item[1].params.group === 'Customer Info'"
        :name="item[0]"
        :structure="structToDict(state.addSkel)"
        :errors="state.errors[item[0]] ? state.errors[item[0]] : []"
        :skel="state.formValues"
        @change="changeEvent(item[0], $event)"
        class="viur-shop-form-grid-w-2"
      >
      </bone>
    </template>
  </div>

  <h2 class="viur-shop-form-headline headline">Lieferadresse</h2>
  <div v-for="a in state.shippingAdressAmount" :key="a">
    <sl-select
      clearable
      ref="itemSelection"
      @sl-change="onItemSelect($event, a)"
      @sl-clear="onItemReset($event, a)"
      :label="state.selectedItem[a] ? cartStore.state.carts[state.selectedItem[a]].info.name : 'Warenkorb für Adresse wählen.'"
      class="grid-w-4"
    >
      <sl-option v-for="(v, k) in cartStore.state.carts" :value="k">
        {{ v.info.name }}</sl-option
      >
    </sl-select>
    <template v-for="item in state.addSkel" :key="item[0]">
      <bone
        :is="getBoneWidget(item[1].type)"
        v-if="item[1].visible && item[1].params.group === 'Customer Address'"
        :name="item[0]"
        :structure="structToDict(state.addSkel)"
        :errors="state.errors[item[0]] ? state.errors[item[0]] : []"
        :skel="state.formValues"
        @change="changeEvent(item[0], $event)"
      >
      </bone>
    </template>
  </div>

  <div v-if="state.isCustomAdress">
    <h2 class="viur-shop-form-headline headline">Rechnungsadresse</h2>
    <template v-for="item in state.addSkel" :key="item[0]">
      <bone
        :is="getBoneWidget(item[1].type)"
        v-if="item[1].visible && item[1].params.group === 'Customer Address'"
        :name="item[0]"
        :structure="structToDict(state.addSkel)"
        :errors="state.errors[item[0]] ? state.errors[item[0]] : []"
        :skel="state.formValues"
        @change="changeEvent(item[0], $event)"
      >
      </bone>
    </template>
  </div>

  <div class="viur-shop-form-btn-wrap">
    <sl-button
      size="medium"
      @click="decreaseAdress"
      title="Lieferadresse entfernen"
    >
      <sl-icon name="x-lg" slot="prefix"></sl-icon>
    </sl-button>
    <sl-button size="medium" variant="primary" @click="increaseAdress">
      <sl-icon name="plus-lg" slot="prefix"></sl-icon>
      Lieferadresse hinzufügen
    </sl-button>
  </div>

  <sl-alert variant="warning" duration="2000" ref="shippingWarning" closable>
    <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
    <strong>{{ state.amountAlert.title }} </strong><br />
    {{ state.amountAlert.msg }}
  </sl-alert>

  <sl-checkbox @sl-change="onCustomAdressChange" checked>
    Rechnungsadresse wie Lieferadresse
  </sl-checkbox>
</template>

<script setup>

import { reactive, computed, watch, ref, onBeforeMount } from "vue";
// import ShippingAdress from "./adress/ShippingAdress.vue";
import { useCartStore } from "../../../stores/cart";
import Wrapper_nested from "@viur/vue-utils/bones/edit/wrapper_nested.vue";
import bone from "@viur/vue-utils/bones/edit/bone.vue";
import { getBoneWidget } from "@viur/vue-utils/bones/edit/index";

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
    () => Object.keys(cartStore.state.carts).length + 2,
  ),
  amountAlert: { title: "", msg: "" },
  items: null,
  addSkel: null,
  errors: {},
  selectedItem: {},
  isInit: computed(() => {
    if (cartStore.state.carts[cartStore.state.basket]) {
      return true;
    } else {
      return false;
    }
  }),
});

const itemSelection = ref(null);
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
  if (state.shippingAdressAmount === state.maxShippingAdress) {
    state.amountAlert.title = "Zu viele Lieferadressen";
    state.amountAlert.msg = `Sie können nur maximal: "${state.maxShippingAdress}" Lieferadressen verwenden.`;
    shippingWarning.value.show();
    return;
  }
  state.shippingAdressAmount += 1;
}

function changeEvent(boneName, ev) {
  for (const [key, value] of Object.entries(ev.value[0])) {
    state.formValues[key] = value;
  }
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

function onItemSelect(e, a) {
  console.log(e.target.value);
  if (!e.target.value.length) {
    onItemReset();
    return;
  }
  state.selectedItem[a] = e.target.value;
  state.isItemSelected = true;
}

function onItemReset(e, a) {
  console.log("clearing...");
  delete state.selectedItem[a]
  state.isItemSelected = false;
}

function getLabel(cart) {
  console.log("hier", cart)
  if (cart) {
    return "Lieferadresse für: " + cartStore.state.carts[cart].info.name;
  }
  return "Warenkorb für Lieferadresse wählen.";
}

function structToDict(structure) {
  let output = {};

  structure.forEach((bone) => {
    let boneName = bone[0];
    let boneValues = bone[1];

    output[boneName] = boneValues;
  });

  return output;
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

.viur-shop-form-btn-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  margin-top: var(--sl-spacing-x-large);
}
</style>
