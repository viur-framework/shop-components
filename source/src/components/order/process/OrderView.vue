<template>
  <div class="bind viur-shop-wrap">
    <sl-tab-group
      class="viur-shop-order-tab"
      noScrollControls
      @sl-tab-show="onTabChange"
      ref="tabGroup"
    >
      <sl-tab
        slot="nav"
        :panel="tab"
        v-for="(tab, index) in state.tabNames"
        :key="tab"
        :disabled="tabs[tab].disabled"
      >
        <div class="viur-shop-order-step">
          <sl-icon
            :name="tabs[tab].icon.name"
            :library="tabs[tab].icon.library"
          >
          </sl-icon>
          <div class="viur-shop-order-status-text">
            {{ index + 1 }}. {{ tabs[tab].displayName }}
          </div>
        </div>
        <sl-icon
          name="chevron-right"
          class="viur-shop-order-tab-check"
          v-if="index < state.tabNames.length - 1"
        ></sl-icon>
      </sl-tab>

      <sl-tab-panel
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

    <div class="viur-shop-sidebar" id="order_sidebar"></div>
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
.viur-shop-wrap {
  display: flex;
  flex-direction: row;
  gap: var(--sl-spacing-x-large);
  align-items: flex-start;

  @media (--ignt-mq-max-break-small) {
      flex-direction: column;
    }
}

.viur-shop-sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--sl-color-neutral-100);
  width: 100%;
  padding: var(--sl-spacing-medium);
  position: sticky;
  top: 0;
  margin-bottom: var(--sl-spacing-2x-large);


  @media (--ignt-mq-min-break-small) {
      min-width: 300px;
      width: 300px;
    }
}

.viur-shop-order-tab {
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

.viur-shop-order-step {
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

.viur-shop-order-tab-check {
  position: absolute;
  right: -0.5em;

  @media (--ignt-mq-max-break-small) {
    font-size: 0.7em;
    right: -0.35em;
    top: calc(50% - 0.35em);
  }
}

.viur-shop-order-status-text {
  font-size: 0.8em;
  color: inherit;
  text-align: center;
  margin-top: 0.6em;
  white-space: initial;
}

.viur-shop-form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: var(--sl-spacing-large);
}
.flex-end {
  justify-content: flex-end;
}
</style>
