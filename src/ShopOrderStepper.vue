<template>
    <sl-tab-group
        class="viur-shop-order-tabgroup"
        noScrollControls
        ref="stepper"
    >
        <template v-for="(tab,name) in shopStore.state.tabs">
            <StepperTab v-show="shopStore.state.currentTab!=='complete'"
                :tab="name"
            >
            </StepperTab>

            <sl-tab-panel :name="name">
                <template v-if="tab?.['loaded']">

                    <component :is="tab['component']" :params="tab['params']">
                      <template #top_actions="slotProps">
                        <sl-bar class="viur-shop-stepper-bar">
                          <div v-if="slotProps.left" slot="left" :id="slotProps.left"></div>
                          <div slot="right">
                            <span v-if="slotProps.hint" class="hint">{{ slotProps.hint }}</span>
                            <sl-button
                              :class="{'action-button-hint':slotProps.hint}"
                              variant="success"
                              size="large"
                              :disabled="active(slotProps)"
                              @click="nextStep(slotProps)"
                              :loading="tab['validating']"
                            >
                              {{slotProps.nextName}}
                              <sl-icon slot="suffix" name="chevron-right"></sl-icon>
                            </sl-button>
                          </div>
                        </sl-bar>
                      </template>

                      <template #['template_'+name]>
                        <slot :name="'template_'+name"></slot>
                      </template>

                      <template v-slot="slotProps">
                        <sl-bar class="viur-shop-stepper-bar">
                          <div v-if="slotProps.left" slot="left" :id="slotProps.left"></div>
                          <div slot="right">
                            <span v-if="slotProps.hint" class="hint">{{ slotProps.hint }}</span>
                            <sl-button
                              :class="{'action-button-hint':slotProps.hint}"
                              variant="success"
                              size="large"
                              :disabled="active(slotProps)"
                              @click="nextStep(slotProps)"
                              :loading="tab['validating']"
                            >
                              {{slotProps.nextName}}
                              <sl-icon slot="suffix" name="chevron-right"></sl-icon>
                            </sl-button>
                          </div>
                        </sl-bar>
                      </template>
                    </component>
                </template>
            </sl-tab-panel>
        </template>
    </sl-tab-group>
</template>

<script setup>
import {reactive, shallowRef, watch, ref, onBeforeMount, onMounted} from 'vue'
import {useViurShopStore} from './shop'
import StepperTab from './components/StepperTab.vue'
import { useTimeoutFn  } from '@vueuse/core'

const shopStore = useViurShopStore()
const stepper = ref()


// Activate Tab if currentTab changes
watch(()=>shopStore.state.currentTab, (newVal, oldVal)=>{
    stepper.value.show(shopStore.state.currentTab)
    shopStore.state.tabs[shopStore.state.currentTab]['loaded'] = true
})

onMounted(()=>{
    // wait shoelace component is ready
    stepper.value.updateComplete.then(() => {
        shopStore.state.tabs[shopStore.state.currentTab]['loaded'] = true
        stepper.value.show(shopStore.state.currentTab)
    })
})

function nextStep(obj){
  shopStore.tabValidation(obj.nextfunction, shopStore.navigateToNext)
}

function active(obj){
  return !obj.activefunction()
}

</script>

<style scoped>

sl-tab-group {
  flex-grow: 1;
  &::part(base) {
    height: 100%;
  }
  &::part(body) {
    height: 100%;
  }
}

sl-tap-panel {
  height: 100%;
  &::part(base) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.viur-shop-stepper-bar {
  margin-top: var(--shop-leaf-gap, var(--ignt-spacing-small));
  justify-self: flex-end;
}

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
