<template>
  <sl-tab-panel class="viur-shop-order-tab-panel" :name="tab">
    <component
      :is="tabs[tab].component"
      v-bind="tabs[tab].props ? tabs[tab].props : ''"
      @goToStart="goToStart()"
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

const emit = defineEmits(["tabChange"]);

function goToStart(){
  emit("goToStart");
}

</script>

<style scoped>
.viur-shop-order-tab-panel {
}
</style>
