import {reactive} from 'vue'
export function useCart() {
    const state = reactive({})

    function fetchCart(key){}
    function updateCart(params){}

    function addItem(params){}
    function removeItem(params){}
    function updateItem(params){}

    return {
        state
    }
}