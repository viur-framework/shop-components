<template>
  <template v-for="msg in messageStore.state.errors">
    <shop-alert
      v-if="!messageStore.state.blacklist.includes(msg.id)"
      :msg="msg.msg"
      :variant="msg.variant"
      :iconName="msg.iconName"
      :duration="msg?.duration ? msg.duration : 3000"
      :closeable="msg.closeable"
      :key="msg.id"
      @sl-hide="messageStore.state.blacklist.push(msg.id)"
    >
    </shop-alert>
  </template>

  <sl-dialog
    no-header
    ref="freezeCart"
    @sl-hide="
      cartStore.state.freeze ? () => {} : tabGroup.show(state.tabNames[0])
    "
  >
    <p>Wollen sie fortfahren?</p>
    <i>*Der Warenkorb kann nicht mehr verändert werden bei Bestätigung</i>
    <sl-bar>
      <sl-button
        slot="left"
        variant="danger"
        @click="freezeCart.hide()"
        size="medium"
      >
        Abbrechen
      </sl-button>
      <sl-button
        slot="right"
        variant="success"
        @click="onFreezeCart"
        size="medium"
      >
        Bestätigen
      </sl-button>
    </sl-bar>
  </sl-dialog>

  <div class="bind viur-shop-wrap">
    <div
      class="viur-shop-stepper-wrap"
      :class="{ 'full-width': sidebarBottom }"
    >
      <slot name="main">
        <sl-tab-group
          class="viur-shop-order-tabgroup"
          noScrollControls
          @sl-tab-hide="onTabHide"
          @sl-tab-show="onTabChange"
          ref="tabGroup"
        >
          <StepperTab
            v-for="(tab, index) in state.tabNames"
            :key="tab"
            :tab="tab"
            :currentTab="state.currentTab"
            :tabs="state.tabs"
            :tabIdx="index"
            :stepperLength="state.tabNames.length"
            :disabled="
              index === 0 ? false : !state.tabs[state.tabNames[index - 1]].valid
            "
          >
          </StepperTab>

          <template v-for="tab in state.tabNames" :key="tab">
            <StepperItem
              :tab="tab"
              :currentTab="state.currentTab"
              :tabs="state.tabs"
              @valid="stepIsValid"
              @goToStart="goToStart()"
              @editAddress="editAddress"
            >
            </StepperItem>
          </template>
        </sl-tab-group>
      </slot>

      <slot name="trigger" v-if="trigger">
        <div
          class="viur-shop-form-footer"
          :class="{ 'flex-end': state.tabIdx === 0, 'last-row': sidebarBottom }"
          v-if="state.tabIdx !== state.tabNames.length - 1"
        >
          <StepperTrigger
            :index="state.tabIdx"
            :tab="state.currentTab"
            :tabs="state.tabs"
            @prevTab="prevTab"
            @nextTab="nextTab"
          >
          </StepperTrigger>
        </div>
      </slot>
    </div>

    <slot
      name="sidebar"
      v-if="sidebar && state.tabIdx < state.tabNames.length - 1"
    >
      <div class="viur-shop-sidebar-wrap" :class="{ bottom: sidebarBottom }">
        <ShopSummary
          :showDiscount="showDiscount"
          :customShippingComponent="customShippingComponent"
        >
          <template #custom v-if="customComponent">
            <component :is="customComponent"></component>
          </template>
        </ShopSummary>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onBeforeMount, provide } from "vue";
import StepperTab from "./ui/stepper/StepperTab.vue";
import StepperItem from "./ui/stepper/StepperItem.vue";
import StepperTrigger from "./ui/stepper/StepperTrigger.vue";
import ShopSummary from "./ShopSummary.vue";
import ShopAlert from "./ui/generic/alerts/ShopAlert.vue";
import { useMessageStore } from "../stores/message";
import { useOrderStore } from "../stores/order";
import { useCartStore } from "../stores/cart";

const messageStore = useMessageStore();
const orderStore = useOrderStore();
const cartStore = useCartStore();

const props = defineProps({
  tabs: {
    type: Object,
    required: true,
  },
  sidebar: {
    type: Boolean,
    default: true,
    required: false,
  },
  trigger: {
    type: Boolean,
    default: true,
    required: false,
  },
  sidebarBottom: {
    type: Boolean,
    default: false,
    required: false,
  },
  showDiscount: {
    type: Boolean,
    default: true,
  },
  customComponent: { default: undefined },
  customShippingComponent: { default: undefined },
});

const emit = defineEmits(["tabChange"]);

const state = reactive({
  tabNames: computed(() => sortTabs(state.tabs)),
  currentTabObj: computed(() => state.tabs[state.tabNames[state.tabIdx]]), //dont use as prop, cause of multiple rerenderings
  tabIdx: 0,
  currentTab: "",
  tabs: {},
});
provide("stepperState", state);

const tabGroup = ref(null);
const freezeCart = ref(null);

function sortTabs(tabs) {
  const sortedArray = [];
  const outputArray = [];

  for (const tab in tabs) {
    if (tabs[tab].position) {
      sortedArray.push([tab, tabs[tab].position]);
    } else {
      sortedArray.push([tab, 0]);
    }
  }

  sortedArray.sort((a, b) => {
    return a[1] - b[1];
  });

  sortedArray.forEach((tab) => {
    outputArray.push(tab[0]);
  });
  return outputArray;
}

function onTabChange(e) {
  let tab = e?.detail.name;

  state.currentTab = tab;
  state.tabIdx = state.tabNames.indexOf(tab);

  emit("tabChange", e);
}

function onTabHide(e) {
  if (state.tabIdx === 0 && !cartStore.state.freeze) {
    freezeCart.value.show();
  }
}

function onFreezeCart() {
  cartStore.state.freeze = true;
  orderStore.handler();
  freezeCart.value.hide();
}

function prevTab() {
  if (state.tabIdx > 0) {
    tabGroup.value.show(state.tabNames[state.tabIdx - 1]);
  }
}

function nextTab() {
  if (state.tabIdx < state.tabNames.length - 1) {
    tabGroup.value.show(state.tabNames[state.tabIdx + 1]);
  }
}

function goToStart() {
  tabGroup.value.show(state.tabNames[0]);
}

function editAddress(e) {
  tabGroup.value.show(e);
}

function stepIsValid(params = {}) {
  state.tabs[state.currentTab].valid = true;
  if (cartStore.state.freeze) {
    orderStore.handler(params);
  }
}

onBeforeMount(() => {
  state.tabs = { ...props.tabs }; //make reactive so we can save states to tabs

  const tabNames = sortTabs(state.tabs);
  state.currentTab = tabNames[0];
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.viur-shop-wrap {
  --shop-sidebar-background: var(--sl-color-neutral-100);
  --shop-sidebar-columns: 4;
  --shop-main-columns: 8;
  --shop-tab-color: var(--sl-color-neutral-400);
  --shop-tab-color-active: var(--ignt-color-primary);

  --shop-form-headline-size: 1.5em;
  --shop-success-headline-size: var(--shop-form-headline-size);

  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 1fr max-content;
  grid-gap: var(--ignt-spacing-2x-large);

  width: 100%;
  border: 0 white solid;
}

@layer foundation.shop {
  .viur-shop-sidebar-wrap {
    display: flex;
    flex-direction: column;
    background-color: var(--shop-sidebar-background);
    padding: var(--sl-spacing-medium);
    overflow: hidden;
    border-radius: var(--sl-border-radius-medium);
    grid-column: auto / span var(--shop-sidebar-columns);
    /* height has to be set or sidebar grows until infinity... */
    height: min-content;
    @media (min-width: 1024px) {
      position: sticky;
      top: 2rem;
    }
  }

  .viur-shop-stepper-wrap {
    display: flex;
    flex-direction: column;
    grid-column: auto / span var(--shop-main-columns);

    @media (max-width: 1024px) {
      grid-column: auto / span 12;
    }

    @media (max-width: 600px) {
      &::part(active-tab-indicator) {
        display: none;
      }
    }
  }

  .viur-shop-form-footer {
    height: fit-content;

    /* TODO: sticky Trigger yes no? */
    /* position: sticky;
    bottom: 2rem; */
  }

  :deep(.viur-shop-form-footer) {
    display: flex;
    justify-content: space-between;
    margin-top: var(--sl-spacing-large);
  }

  .flex-end {
    justify-content: flex-end;
  }

  .bottom {
    grid-column: auto / span 12;
    grid-row-start: 2;
  }

  .full-width {
    grid-column: auto / span 12;
  }

  .last-row {
    grid-row-start: 3;
  }
}
</style>
