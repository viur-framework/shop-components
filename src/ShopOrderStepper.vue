<template>
  <sl-tab-group
    ref="stepper"
    class="viur-shop-order-tabgroup"
    no-scroll-controls
    :data-steppervisible="shopStore.state.stepperVisible"
  >
    <template v-for="(tab, name) in shopStore.state.tabs">
      <StepperTab
        v-show="shopStore.state.stepperVisible"
        :tab="name"
      >
      </StepperTab>

      <sl-tab-panel :name="name">
        <template v-if="tab?.['loaded']">
          <!-- Above the step, not next to the navigation errors at its bottom: the shop
               raises these on its own, the customer has to see them without scrolling. -->
          <sl-alert
            v-for="message in cartMessages"
            :key="message.key"
            class="viur-shop-cart-message"
            variant="warning"
            closable
            open
            @sl-after-hide="removeMessage(message.key)"
          >
            <sl-icon
              slot="icon"
              name="exclamation-triangle"
            ></sl-icon>
            {{ $t(message.translation_key, message.translation_variables ?? {}) }}
          </sl-alert>
          <component
            :is="tab['component']"
            :params="tab['params']"
          >
            <template #top_actions="slotProps">
              <sl-bar class="viur-shop-stepper-bar">
                <div
                  v-if="slotProps.left"
                  :id="slotProps.left"
                  slot="left"
                ></div>
                <div slot="right"></div>
              </sl-bar>
            </template>

            <template #[`template_${name}`]>
              <slot :name="`template_${name}`"></slot>
            </template>

            <template #default="slotProps">
              <sl-alert
                v-if="shopStore.state.navigationErrors.length"
                class="viur-shop-navigation-errors"
                variant="danger"
                open
              >
                <sl-icon
                  slot="icon"
                  name="exclamation-octagon"
                ></sl-icon>
                <ul>
                  <li
                    v-for="message in shopStore.state.navigationErrors"
                    :key="message"
                  >
                    {{ message }}
                  </li>
                </ul>
              </sl-alert>
              <sl-bar class="viur-shop-stepper-bar">
                <div
                  v-if="slotProps.left"
                  :id="slotProps.left"
                  slot="left"
                ></div>
                <div slot="right">
                  <component
                    :is="shopStore.state.stepperActionComponent"
                    :conf="slotProps"
                    :tab="tab"
                  ></component>
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
import { computed, reactive, shallowRef, watch, ref, onBeforeMount, onMounted } from 'vue'
import { useViurShopStore } from './shop'
import StepperTab from './components/StepperTab.vue'
import { useCart } from './composables/cart'
import { useTimeoutFn } from '@vueuse/core'

const shopStore = useViurShopStore()
const { removeMessage } = useCart()

// Notes the shop left on the cart, e.g. about a dropped discount. They stay until the
// customer closes them; a placed order's cart is history and shows none.
const cartMessages = computed(() =>
  shopStore.state.cartRoot?.['is_frozen'] ? [] : (shopStore.state.cartRoot?.['messages'] ?? []),
)
const stepper = ref()

// Activate Tab if currentTab changes
watch(
  () => shopStore.state.currentTab,
  (newVal, oldVal) => {
    stepper.value.show(shopStore.state.currentTab)
    shopStore.state.tabs[shopStore.state.currentTab]['loaded'] = true
  },
)

onMounted(() => {
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

.viur-shop-navigation-errors {
  /* Above the action bar and across the full width: the bar is a left/right
     layout, and a reason the customer has to read does not belong beside the
     button that triggered it. */
  margin-top: var(--shop-leaf-gap, var(--ignt-spacing-small));
  &::part(message) {
    padding-block: var(--sl-spacing-small);
  }
  & ul {
    margin: 0;
    padding-left: var(--sl-spacing-large);
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

.viur-shop-order-tabgroup[data-steppervisible='false']::part(nav) {
  visibility: hidden;
}
</style>
