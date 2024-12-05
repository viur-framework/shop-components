<template>
    <sl-button @click="fetchCart">
        reload
    </sl-button>
    <sl-button @click="addItem('agtha3ZpdXIzdGVzdHIZCxIMZ3JlZW5hcnRpY2xlGICAgMSf-50JDA')">
        add
    </sl-button>
    <loading-handler :isLoading="cartState.isLoading" :isUpdating="cartState.isUpdating">
        <div class="item-wrapper">
            <cart-item v-for="item in shopStore.state.cartList" :item="item"
            :edit="!shopStore.state.order?.['is_checkout_in_progress']"
            >

            </cart-item>
        </div>
    </loading-handler>

    <slot
        nextName="weiter"
        :activefunction="()=>true"
        :nextfunction="()=>true"
    >
    </slot>

</template>

<script setup>
import { useViurShopStore } from '../shop'
import {onBeforeMount, onMounted, reactive, watch} from 'vue'
import { useCart } from '../composables/cart';
import LoadingHandler from '../components/LoadingHandler.vue';
import CartItem from '../components/CartItem.vue';

const shopStore = useViurShopStore()
const {fetchCart,addItem, state:cartState} = useCart()

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