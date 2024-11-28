import {reactive} from 'vue'
export function useOrder() {
    const state = reactive({})
    function fetchOrder(key){}
    function UpdateOrder(params){}

    return {
        state
    }
}