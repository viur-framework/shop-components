<template>
  <sl-tab-panel class="viur-shop-order-tab-panel" :name="tab">
    <!-- EXPERIMENTAL
     Render empty div to avoid pre rendering of components
      which are not necessary to be mounted yet-->
    <div v-if="!currentTab === tab"></div>
    <component
      :is="currentTabObj.component"
      v-bind="currentTabObj.props ? currentTabObj.props : ''"
      @goToStart="goToStart()"
      @editAddress="goToUserData"
      v-else
    >
    </component>
  </sl-tab-panel>
</template>

<script setup>
const props = defineProps({
  tab: {
    type: String,
    required: true,
  },
  currentTabObj: {
    type: Object,
    required: true,
  },
  currentTab: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["goToStart", "editAddress"]);

function goToStart() {
  emit("goToStart");
}

function goToUserData(e) {
  emit("editAddress", e);
}
</script>

<style scoped>
.viur-shop-order-tab-panel {
}

.skeleton-overview header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.skeleton-overview header sl-skeleton:last-child {
  flex: 0 0 auto;
  width: 30%;
}

.skeleton-overview sl-skeleton {
  margin-bottom: 1rem;
}

.skeleton-overview sl-skeleton:nth-child(1) {
  float: left;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  vertical-align: middle;
}

.skeleton-overview sl-skeleton:nth-child(3) {
  width: 95%;
}

.skeleton-overview sl-skeleton:nth-child(4) {
  width: 80%;
}
</style>
