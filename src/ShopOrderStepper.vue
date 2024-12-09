<template>
  {{ shopStore.state.currentTab }}
    <sl-tab-group
        class="viur-shop-order-tabgroup"
        noScrollControls
        ref="stepper"
    >
        <template v-for="(tab,name) in shopStore.state.tabs">
            <StepperTab
                :tab="name"
            >
            </StepperTab>

            <sl-tab-panel :name="name">
                <template v-if="tab?.['loaded']">
                    <component :is="tab['component']">
                      <template v-slot="slotProps">
                        <sl-bar>
                          <div slot="right">
                            <sl-button
                                variant="primary"
                                :disabled="active(slotProps)"
                                @click="nextStep(slotProps)"
                            >
                              {{slotProps.nextName}}
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
  //validate step, like send forms or something like this
  Promise.resolve(obj.nextfunction()).then((resp)=>{
    if (resp){
      shopStore.navigateToNext()
    }
  })

}

function active(obj){
  return !obj.activefunction()
}

</script>

<style scoped>


</style>