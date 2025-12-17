<template>
  <span v-if="conf.hint" class="hint">{{ conf.hint }}</span>
  <sl-button
    :class="{'action-button-hint':conf.hint}"
    variant="success"
    size="large"
    :disabled="active(conf)"
    :loading="tab['validating']"
    @click="nextStep(conf)"
  >
    {{conf.nextName}}
    <sl-icon slot="suffix" name="chevron-right"></sl-icon>
  </sl-button>

</template>
<script setup>
import {useViurShopStore} from './shop'
const shopStore = useViurShopStore()

const props = defineProps({
 conf:{
  type:Object,
  reuqired:true
 },
 tab:{
  type:Object,
  reuqired:true
 }

})

function nextStep(obj){
  shopStore.tabValidation(obj.nextfunction, shopStore.navigateToNext)
}

function active(obj){
  return !obj.activefunction()
}

</script>

<style scoped>
.hint{
  border:1px solid var(--sl-color-neutral-200);
  border-top-left-radius: var(--sl-input-border-radius-medium);
  border-bottom-left-radius: var(--sl-input-border-radius-medium);
  background-color: var(--sl-color-neutral-100);
  color:var(--sl-color-neutral-800);
  padding: 0 var(--sl-spacing-small);
  height: auto;
  min-height: var(--sl-input-height-large);
  font-size: var(--sl-button-font-size-large);
  line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
}
.action-button-hint::part(base){
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
