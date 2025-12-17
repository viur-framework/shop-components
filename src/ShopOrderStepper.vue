<template>
    <sl-tab-group
        ref="stepper"
        class="viur-shop-order-tabgroup"
        no-scroll-controls
    >
        <template v-for="(tab,name) in shopStore.state.tabs">
            <StepperTab
v-show="shopStore.state.currentTab!=='complete'"
                :tab="name"
            >
            </StepperTab>

            <sl-tab-panel :name="name">
                <template v-if="tab?.['loaded']">

                    <component :is="tab['component']" :params="tab['params']">
                      <template #top_actions="slotProps">
                        <sl-bar class="viur-shop-stepper-bar">
                          <div v-if="slotProps.left" :id="slotProps.left" slot="left"></div>
                          <div slot="right">

                          </div>
                        </sl-bar>
                      </template>

                      <template #['template_'+name]>
                        <slot :name="'template_'+name"></slot>
                      </template>

                      <template #default="slotProps">
                        <sl-bar class="viur-shop-stepper-bar">
                          <div v-if="slotProps.left" :id="slotProps.left" slot="left"></div>
                          <div slot="right">
                            <component :is="shopStore.state.stepperActionComponent" :conf="slotProps" :tab="tab"></component>
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

sl-tab-panel {
  height: 100%;
  overflow: hidden;
  &::part(base) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.viur-shop-stepper-bar {
  margin-top: var(--shop-leaf-gap, var(--ignt-spacing-small));
  justify-self: flex-end;
  margin-bottom: var(--ignt-spacing-2x-small);
  @media (max-width: 600px) {
    & sl-button {
      width: 100%;
    }
    & sl-button::part(base) {
      min-width: 100%;
    }
  }
}

</style>
