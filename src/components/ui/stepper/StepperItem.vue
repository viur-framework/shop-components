<template>
  <sl-tab-panel class="viur-shop-order-tab-panel" :name="tab">
    <div v-if="!tabs[tab]?.['loaded']"></div>
    <component
      :is="tabs[tab].component"
      v-bind="tabs[tab].props ? tabs[tab].props : ''"
      @valid="emit('valid',tabs[tab])"
      v-else
    >
    </component>
  </sl-tab-panel>
</template>

<script setup>
import {watch, onBeforeMount} from 'vue'

const props = defineProps({
  tab: {
    type: String,
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
});

const emit = defineEmits(["goToStart", "editAddress", 'valid']);

function goToStart() {
  emit("goToStart");
}

function goToUserData(e) {
  emit("editAddress", e);
}

watch(()=>props.currentTab === props.tab, (newVal,oldVal)=>{
  if (newVal){
    props.tabs[props.tab]['loaded'] = true
  }
})

onBeforeMount(()=>{
  if (props.currentTab === props.tab){
    props.tabs[props.tab]['loaded'] = true
  }
})

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
