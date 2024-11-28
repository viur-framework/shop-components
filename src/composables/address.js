import {reactive} from 'vue'
export function useAddress() {
    const state = reactive({})
    return {
        state
    }
}