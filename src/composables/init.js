import {reactive} from 'vue'
export function useInit() {
    const state = reactive({})

    function fetchCart(key){}
    function fetchOrder(key){}
    function init(){}


    return {
        state
    }
}