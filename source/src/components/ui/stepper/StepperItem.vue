<template>
  <sl-tab-panel class="viur-shop-order-tab-panel" :name="tab">
    <component
      :is="tabs[tab].component"
      v-bind="tabs[tab].props ? tabs[tab].props : ''"
      @goToStart="goToStart()"
      @editAddress="goToUserData"
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
  tabs: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["goToStart", "editAddress"]);

function goToStart() {
  emit("goToStart");
}

function goToUserData(e) {
  console.log("runde2", e)
  emit("editAddress", e);
}
</script>

<style scoped>
.viur-shop-order-tab-panel {
}
</style>
