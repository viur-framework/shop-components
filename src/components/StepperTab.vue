<template>
  <sl-tab
    class="viur-shop-order-tab"
    slot="nav"
    :panel="tab"
    @click="shopStore.navigateToTab(tab)"
  >
    <div class="viur-shop-order-step">
      <sl-icon
        class="viur-shop-order-step-icon"
        v-if="shopStore.state.tabs[tab]?.icon?.name"
        :name="shopStore.state.tabs[tab].icon.name"
        :library="shopStore.state.tabs[tab].icon.library ? shopStore.state.tabs[tab].icon.library : 'default'"
      >
      </sl-icon>

      <div class="viur-shop-order-status-text">
        <template v-if="tab && shopStore.state.tabs[tab]">
          {{ shopStore.state.tabIndexMap[tab] + 1 }}.
          <span class="viur-shop-order-status-span">{{
            shopStore.state.tabs[tab]?.displayName
          }}</span>
        </template>
        <template v-else>
          {{ tab }}
        </template>
      </div>
    </div>

    <sl-icon
      name="chevron-right"
      class="viur-shop-order-tab-check"
      v-if="shopStore.state.tabIndexMap[tab] < shopStore.state.stepperLength - 1"
    >
    </sl-icon>
  </sl-tab>
</template>

<script setup>
import { watch, onBeforeMount, inject } from "vue";
import {useViurShopStore} from '../shop'
const shopStore = useViurShopStore()

const props = defineProps({
  tab: {
    type: String,
    required: true,
    default:"-"
  }
});
</script>

<style scoped>
.viur-shop-order-tab {
  width: 25%;
  position: relative;

  &::part(base) {
    color: var(--shop-tab-color);
    display: flex;
    height: 100%;
  }

  &[aria-selected="true"] {
    --shop-tab-color: var(--shop-tab-color--active);
  }

  @media (max-width: 900px) {
    &::part(base) {
      height: 100%;
      padding: var(--sl-spacing-small) var(--sl-spacing-medium);
    }
  }

  @media (max-width: 600px) {
    &[aria-selected="true"] {
      width: 100%;
    }

    &:not([aria-selected="true"]) {
      .viur-shop-order-status-span {
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

  &:has(sl-icon) {
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

.viur-shop-order-status-text {
  font-size: 1em;
  color: inherit;
  text-align: center;
  white-space: initial;
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
</style>
