<template>
  <sl-tab
    class="viur-shop-order-tab"
    slot="nav"
    :panel="tab"
    :disabled="false"
  >
    <div class="viur-shop-order-step">
      <sl-icon
        class="viur-shop-order-step-icon"
        v-if="tabs[tab].icon?.name"
        :name="tabs[tab].icon.name"
        :library="tabs[tab].icon.library ? tabs[tab].icon.library : 'default'"
      >
      </sl-icon>

      <div class="viur-shop-order-status-text">
        {{ tabIdx + 1 }}.
        <span class="viur-shop-order-status-span">{{
          tabs[tab].displayName
        }}</span>
      </div>
    </div>

    <sl-icon
      name="chevron-right"
      class="viur-shop-order-tab-check"
      v-if="tabIdx < stepperLength - 1"
    >
    </sl-icon>
  </sl-tab>
</template>

<script setup>
import { watch, onBeforeMount, inject } from "vue";

const props = defineProps({
  tab: {
    type: String,
    required: true,
  },
  tabIdx: {
    type: Number,
    required: true,
  },
  stepperLength: {
    type: Number,
    required: true,
  },
  tabs: {
    type: Object,
    required: true,
  },
  currentTab: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});

const stepperState = inject("stepperState");

// watch(()=>props.tabs[props.tab]['valid'],(newVal, oldVal)=>{
//   let nextTab = stepperState.tabNames?.[props.tabIdx+1]
//   if (!nextTab) return

//   props.tabs[nextTab]['disabled'] = false //enable nextTab
// })

// onBeforeMount(()=>{
//   props.tabs[props.tab]['disabled'] = true //default all tabs disabled

//   if (props.currentTab === props.tab){
//     props.tabs[props.tab]['disabled'] = false //activate the first one
//   }

// })
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
