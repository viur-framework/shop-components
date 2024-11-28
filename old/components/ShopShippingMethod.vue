<template>
  <loading-handler :isLoading="shippingStore.state.isLoading"
                  :isUpdating="shippingStore.state.isUpdating"
                  :hasError="shippingStore.state.hasError"
                  :errorMessage="shippingStore.state.errorMessage">

    <card-selector :options="shippingStore.state.shippingData"
                    v-model:selection="shippingStore.state.selectedShippingMethod"
                    @change="updateShippingMethod"
    >
      <template v-slot="{option, index}">
          <img slot="image">
          {{ option['dest']['name'] }}
          <div slot="footer">
            Lieferzeit: {{ option['dest']['delivery_time_range'] }}
          </div>
      </template>
    </card-selector>
  </loading-handler>
</template>
<script setup>
import {useCartStore} from "../stores/cart";
import {useShippingStore} from "../stores/shipping"
import {onBeforeMount, reactive,computed, watch} from "vue";
import LoadingHandler from "./generic/loadinghandler.vue"
import CardSelector from "./ui/generic/CardSelector.vue"

const cartStore = useCartStore();
const shippingStore = useShippingStore()
const emits = defineEmits(['valid'])
const props = defineProps({
})

const state = reactive({
})

onBeforeMount(async () => {
  await shippingStore.initShipping()
});

async function updateShippingMethod(selection){
  let update = await shippingStore.updateCart()
  if (update){
    emits("valid", true)
  }
}

</script>

<style scoped>

</style>
