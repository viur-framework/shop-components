<template>
  <div class="bind viur-shop-wrap">
    <div
      class="viur-shop-stepper-wrap"
      :class="{ 'full-width': sidebarBottom }"
    >
      <slot name="main">
        <sl-tab-group
          class="viur-shop-order-tabgroup"
          noScrollControls
          @sl-tab-show="onTabChange($event)"
          ref="tabGroup"
        >
          <StepperTab
            v-for="(tab, index) in state.tabNames"
            :key="tab"
            :tab="tab"
            :tabs="tabs"
            :tabIdx="index"
            :stepperLength="state.tabNames.length"
          >
          </StepperTab>

          <StepperItem
            v-for="tab in state.tabNames"
            :tab="tab"
            :tabs="tabs"
            :key="tab"
            @goToStart="goToStart()"
            @editAddress="editAddress"
          >
          </StepperItem>
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
        <ShopSummary :showDiscount="showDiscount">
          <template #custom v-if="customComponent">
            <component :is="customComponent"></component>
          </template>
        </ShopSummary>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onBeforeMount } from "vue";
import StepperTab from "./ui/stepper/StepperTab.vue";
import StepperItem from "./ui/stepper/StepperItem.vue";
import StepperTrigger from "./ui/stepper/StepperTrigger.vue";
import ShopSummary from "./ui/ShopSummary.vue";
import { useCartStore } from "../stores/cart";

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
});

const emit = defineEmits(["tabChange"]);

const state = reactive({
  tabNames: computed(() => sortTabs(props.tabs)),
  tabIdx: 0,
  currentTab: "",
});

const tabGroup = ref(null);

function sortTabs(tabs) {
  let sortedArray = [];
  let outputArray = [];

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
  state.currentTab = e?.detail.name;
  state.tabIdx = state.tabNames.indexOf(state.currentTab);

  emit("tabChange", e);
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

onBeforeMount(async () => {
  await cartStore.init();
  console.log("init node ");
  const tabNames = sortTabs(props.tabs);
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
