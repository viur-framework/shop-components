<template>
    <slot name="top_actions"  v-if="shopStore.state.topActions"
        :nextName="$t('shop.proceed-checkout')"
        :activefunction="()=>state.items.length>0"
        :nextfunction="nextStep"
    >
    </slot>

    <loading-handler :isLoading="cartState.isLoading" :isUpdating="cartState.isUpdating">
        <div class="viur-shop-item-wrapper" v-if="state.items.length>0">
            <cart-item v-for="item in state.items" :item="item"
            :edit="!shopStore.state.order?.['is_checkout_in_progress']"
            >

            </cart-item>
        </div>
        <shop-alert v-else variant="info" duration="Infinity">
            <template #alertMsg>
                {{ $t('shop.cart_empty') }}
            </template>
        </shop-alert>
    </loading-handler>

    <slot name="template_cart">
    </slot>

    <slot
        :nextName="$t('shop.proceed-checkout')"
        :activefunction="()=>state.items.length>0"
        :nextfunction="nextStep"
    >
    </slot>

</template>

<script setup>
import { useViurShopStore } from '../shop'
import {computed, onBeforeMount, onMounted, reactive, watch} from 'vue'
import { useCart } from '../composables/cart';
import LoadingHandler from '../components/LoadingHandler.vue';
import CartItem from '../components/CartItem.vue';
import CartItemSmall from '../components/CartItemSmall.vue';
import ShopAlert from '../components/ShopAlert.vue';
import { useOrder } from '../composables/order';

const shopStore = useViurShopStore()
const {fetchCart,addItem, state:cartState} = useCart()
const {addOrUpdateOrder}  = useOrder()

const props = defineProps({
  params:{
    type:Object,
    default:{}
  }
})

const state = reactive({
    items: computed(()=>shopStore.state.cartList.filter(i=>i['skel_type']==='leaf'))
})

onBeforeMount(()=>{
    fetchCart()
})

async function nextStep(){
    try{
        let resp = await addOrUpdateOrder()
        console.log(resp)
        return true

    } catch(error){
        return false
    }
}

</script>
<style scoped>

.viur-shop-item-wrapper {
  display:flex;
  flex-direction: column;
  gap: var(--shop-leaf-gap, var(--ignt-spacing-small));
}

</style>
