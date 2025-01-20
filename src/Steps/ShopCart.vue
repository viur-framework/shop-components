<template>
    <loading-handler :isLoading="cartState.isLoading" :isUpdating="cartState.isUpdating">
        <div class="item-wrapper" v-if="state.items.length>0">
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
        nextName="weiter"
        :activefunction="()=>state.items.length>0"
        :nextfunction="()=>true"
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

const shopStore = useViurShopStore()
const {fetchCart,addItem, state:cartState} = useCart()

const state = reactive({
    items: computed(()=>shopStore.state.cartList.filter(i=>i['skel_type']==='leaf'))
})

onBeforeMount(()=>{
    fetchCart()
})

</script>
<style scoped>
.item-wrapper{
    display:flex;
    flex-direction: column;
    gap: 20px;
}

</style>
