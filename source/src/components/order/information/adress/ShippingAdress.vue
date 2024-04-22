<template>
  <sl-splinner
    v-if="!cartStore.state.carts[cartStore.state.basket]?.items"
  ></sl-splinner>
  <template v-else>
    <div class="form-wrap">
      <sl-select
        v-if="multiAdress"
        multiple
        clearable
        ref="itemSelection"
        @sl-change="onItemSelect"
        @sl-clear="onItemReset"
        :label="'Lieferadresse für: ' + state.selectedItem"
        class="grid-w-4"
      >
        <sl-option
          v-for="item in cartStore.state.carts[cartStore.state.basket]?.items"
          :value="item.key"
        >
          {{ item.shop_name }}</sl-option
        >
      </sl-select>
      <sl-input
        name="street"
        @sl-change="onInput"
        placeholder="Straße"
        class="grid-w-3"
        :disabled="!state.isItemSelected"
      >
        <label slot="label">Strasse *</label>
      </sl-input>
      <sl-input
        name="street"
        @sl-change="onInput"
        placeholder="Hausnummer"
        type="number"
        :disabled="!state.isItemSelected"
      >
        <label slot="label">Hausnummer *</label>
      </sl-input>
      <sl-input
        name="street"
        @sl-change="onInput"
        placeholder="Postleitzahl"
        type="number"
        class="grid-w-2"
        :disabled="!state.isItemSelected"
      >
        <label slot="label">Postleitzahl *</label>
      </sl-input>
      <sl-input
        name="city"
        @sl-change="onInput"
        placeholder="Stadt"
        class="grid-w-2"
        :disabled="!state.isItemSelected"
      >
        <label slot="label">Stadt*</label>
      </sl-input>
      <sl-input
        name="province"
        @sl-change="onInput"
        placeholder="Bundesland"
        class="grid-w-2"
        :disabled="!state.isItemSelected"
      >
        <label slot="label">Bundesland</label>
      </sl-input>
    </div>
  </template>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useCartStore } from "../../../../stores/cart";

const props = defineProps({
  multiAdress: { type: Boolean, default: false },
  items: { type: Array },
});

const emit = defineEmits(["adressInput", "itemSelection"]);

const state = reactive({
  selectedItem: null,
  isItemSelected: false,
  items: {},
});

const itemSelection = ref(null);
const cartStore = useCartStore();

function onInput(e) {
  let key = `${[state.selectedItem]}.${[e.target.name]}`;
  emit("adressInput", {
    [`${[state.selectedItem]}.${[e.target.name]}`]: e.target.value,
  });
}

function onItemSelect(e) {
  console.log(e.target.value);
  if (!e.target.value.length) {
    onItemReset();
    return;
  }
  state.selectedItem = e.target.value;
  state.isItemSelected = true;
}

function onItemReset() {
  console.log("clearing...");
  state.selectedItem = null;
  state.isItemSelected = false;
}

onBeforeMount(() => {
  console.log(props.items);
});
</script>

<style scoped>
.form-wrap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0 var(--sl-spacing-medium);
  margin: var(--sl-spacing-large) 0 var(--sl-spacing-x-large) 0;
  padding-bottom: var(--sl-spacing-medium);
  border-bottom: 1px solid var(--sl-color-neutral-400);
}

.grid-w-2 {
  grid-column: span 2;
}

.grid-w-3 {
  grid-column: span 3;
}

.grid-w-4 {
  grid-column: span 4;
}
</style>
