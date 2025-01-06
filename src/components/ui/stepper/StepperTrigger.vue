<template>
  <sl-button type="submit" v-show="index !== 0 && state.showPrev" @click="prevTab()">
    Zurück
    <!-- TODO: $t(i18n referenz) -->
  </sl-button>

  <sl-button type="submit" variant="primary" @click="nextTab()" v-show="state.showNext">
    Weiter
    <!-- TODO: $t(i18n referenz) -->
  </sl-button>

</template>

<script setup>

import {computed, reactive} from "vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  currentTab:{
    type:Object,
    default:undefined
  }
});
const state=reactive({
  showPrev:computed(()=>{
    if(props.currentTab["showPrev"]!==undefined)
    {
      return !!props.currentTab["showPrev"]
    }
    return true;
  }),
  showNext:computed(()=>{
    if(props.currentTab["showNext"]!==undefined)
    {
      return !!props.currentTab["showNext"]
    }
    return true;
  })
})
const emit = defineEmits({prevTab: null, nextTab: null});

function prevTab() {
  emit("prevTab");
}

function nextTab() {
  emit("nextTab");
}
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
