<template>
  <sl-tab-group class="order-tab" noScrollControls @sl-tab-show="onTabChange">
    <sl-tab
      slot="nav"
      :panel="tab"
      v-for="(tab, index) in state.tabNames"
      :key="tab"
      :disabled="tabs[tab].disabled"
    >
      <div class="order-step">
        <sl-icon :name="tabs[tab].icon.name" :library="tabs[tab].icon.library">
        </sl-icon>
        <div class="order-status-text">
          {{ index + 1 }}. {{ tabs[tab].displayName }}
        </div>
      </div>
      <sl-icon
        name="chevron-right"
        class="order-tab-check"
        v-if="index < state.tabNames.length - 1"
      ></sl-icon>
    </sl-tab>

    <sl-tab-panel :name="tab" v-for="tab in state.tabNames" :key="tab">
      <component
        :is="tabs[tab].component"
        v-bind="tabs[tab].props ? tabs[tab].props : ''"
      >
      </component>
    </sl-tab-panel>
  </sl-tab-group>
</template>

<script setup>
import { reactive, computed } from "vue";
// import CartView from "../../cart/CartView.vue";
// import ConfirmView from "../../cart/ConfirmView.vue";

const props = defineProps({
  tabs: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["tabChange"]);

const state = reactive({
  tabNames: computed(() => sortTabs(props.tabs)),
});

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
</script>

<style scoped>
.order-tab {
  sl-tab {
    width: 25%;

    &::part(base) {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: var(--sl-color-neutral-400);
    }

    &[aria-selected="true"]::part(base) {
      color: var(--ignt-color-primary) !important;
    }
  }
}

.order-step {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (--ignt-mq-max-break-small) {
    justify-content: center;
  }

  sl-icon {
    font-size: 2.5em;
    margin-bottom: 10px;

    @media (--ignt-mq-max-break-small) {
      display: none;
    }
  }
}

.order-tab-check {
  position: absolute;
  right: -0.5em;

  @media (--ignt-mq-max-break-small) {
    font-size: 0.7em;
    right: -0.35em;
    top: calc(50% - 0.35em);
  }
}

.order-status-text {
  font-size: 0.8em;
  color: inherit;
  text-align: center;
  margin-top: 0.6em;
  white-space: initial;
}
</style>
