<template>
  <div class="bind viur-shop-wrap">
    <sl-tab-group
      class="viur-shop-order-tabgroup"
      noScrollControls
      @sl-tab-show="onTabChange"
      ref="tabGroup"
    >
      <sl-tab
        class="viur-shop-order-tab"
        slot="nav"
        :panel="tab"
        v-for="(tab, index) in state.tabNames"
        :key="tab"
        :disabled="tabs[tab].disabled"
      >
        <div class="viur-shop-order-step">
          <sl-icon class="viur-shop-order-step-icon"
            v-if="tabs[tab].icon?.name"
            :name="tabs[tab].icon.name"
            :library="tabs[tab].icon.library"
          >
          </sl-icon>
          <div class="viur-shop-order-status-text">
            {{ index + 1 }}. <span class="viur-shop-order-status-span">{{ tabs[tab].displayName }}</span>
          </div>
        </div>
        <sl-icon
          name="chevron-right"
          class="viur-shop-order-tab-check"
          v-if="index < state.tabNames.length - 1"
        ></sl-icon>
      </sl-tab>

      <sl-tab-panel
        class="viur-shop-order-tab-panel"
        :name="tab"
        v-for="(tab, index) in state.tabNames"
        :key="tab"
      >
        <component
          :is="tabs[tab].component"
          v-bind="tabs[tab].props ? tabs[tab].props : ''"
        >
        </component>
        <div
          class="viur-shop-form-footer"
          :class="{ 'flex-end': state.isFirstTab(index) }"
          v-if="index !== state.tabNames.length - 1"
        >
          <sl-button type="submit" v-show="index !== 0" @click="prevTab(state.tabNames[index-1])">
            Zurück
          </sl-button>
          <!-- :disabled="!state.requiredFieldsFilled" -->
          <sl-button type="submit" variant="primary" @click="nextTab(state.tabNames[index+1])">
            Weiter
          </sl-button>
        </div>
      </sl-tab-panel>
    </sl-tab-group>

    <div class="viur-shop-sidebar-wrap">
      <div class="viur-shop-sidebar" id="order_sidebar"></div>
    </div>
  </div>

</template>

<script setup>
import { reactive, computed, ref } from "vue";

const props = defineProps({
  tabs: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["tabChange"]);

const state = reactive({
  tabNames: computed(() => sortTabs(props.tabs)),
  isFirstTab: (index) => {
    if (index === 0) {
      return true;
    }
    return false;
  },
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
  emit("tabChange", e);
}


function prevTab(tabName) {
  tabGroup.value.show(tabName);
}

function nextTab(tabName) {
  tabGroup.value.show(tabName);
}
</script>

<style scoped>
*{
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
}

.viur-shop-sidebar-wrap {
  grid-column: span var(--shop-sidebar-columns);

  @media (max-width: 1024px){
    grid-column: auto / span 12;
  }
}

.viur-shop-sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--shop-sidebar-background);
  padding: var(--sl-spacing-medium);
  overflow: hidden;
  border-radius: var(--sl-border-radius-medium);

  @media (min-width: 1024px){
    position: sticky;
    top: 0;
    margin-left: var(--sl-spacing-2x-large);
  }
}

.viur-shop-order-tabgroup {
  display: flex;
  flex-direction: column;
  grid-column: auto / span var(--shop-main-columns);

  @media (max-width: 1024px){
    grid-column: auto / span 12;
  }

  @media (max-width: 600px) {
    &::part(active-tab-indicator){
      display: none;
    }
  }
}

.viur-shop-order-tab {
  width: 25%;
  position: relative;

  &::part(base) {
    color: var(--shop-tab-color);
    display: flex;
    height: 100%;
  }

  &[aria-selected="true"] {
    --shop-tab-color: var(--shop-tab-color--active)
  }

  @media (max-width: 900px) {
    &::part(base) {
      height: 100%;
      padding: var(--sl-spacing-small) var(--sl-spacing-medium);
    }
  }

  @media (max-width: 600px) {
    &[aria-selected="true"]{
      width: 100%;
    }

    &:not([aria-selected="true"]) {
      .viur-shop-order-status-span{
        display: none;
      }
    }
  }
}

.viur-shop-order-step {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:has(sl-icon){
    justify-content: flex-start;
  }

  sl-icon {
    font-size: 2.5em;
    margin-bottom: 15px;
  }


  @media (max-width: 900px) {
    justify-content: center;

    sl-icon {
      display: none;
    }
  }
}

.viur-shop-order-tab-check {
  position: absolute;
  right: -0.5em;

  @media (max-width: 900px) {
    font-size: 0.7em;
    right: -0.35em;
    top: calc(50% - 0.35em);
  }
}

.viur-shop-order-tab-panel {
}

.viur-shop-order-status-text {
  font-size: 0.8em;
  color: inherit;
  text-align: center;
  white-space: initial;
}

:deep(.viur-shop-form-footer) {
  display: flex;
  justify-content: space-between;
  margin-top: var(--sl-spacing-large);
}

.flex-end {
  justify-content: flex-end;
}

</style>
