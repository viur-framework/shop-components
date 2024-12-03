<template>
    <sl-button @click="fetchCart">
        reload
    </sl-button>
    <sl-button @click="addItem('agtha3ZpdXIzdGVzdHIZCxIMZ3JlZW5hcnRpY2xlGICAgMSf-50JDA')">
        add
    </sl-button>
    <loading-handler :isLoading="cartState.isLoading" :isUpdating="cartState.isUpdating">

        <cart-item v-for="item in shopStore.state.cartList" :item="item">

        </cart-item>
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
import { useOrder } from '../composables/order';
import { useStepper } from '../composables/stepper'
import LoadingHandler from '../components/LoadingHandler.vue';
import CartItem from '../components/CartItem.vue';

const tab = 'cart' //marks component for a step

const shopStore = useViurShopStore()
const {fetchCart,addItem, state:cartState} = useCart()
const { addOrUpdateOrder } = useOrder()


const stepper = useStepper(tab,()=>{}, ()=>{})


</script>