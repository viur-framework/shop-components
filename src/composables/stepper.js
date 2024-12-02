import {reactive, watch, onBeforeMount} from 'vue'
import {Request} from '@viur/vue-utils'
import { useViurShopStore } from '../shop'

export function useStepper(tab, initfunction, leavefunction,) {
    const shopStore = useViurShopStore()
    const state = reactive({
    })

    function selectCorrectTab(){
        if (!shopStore.state.orderKey){
            shopStore.navigateToTab("cart")
        }

        if(shopStore.state.checkoutStarted){
            if (shopStore.state.order?.['is_ordered']){
                shopStore.navigateToTab("complete")
            }else{
                shopStore.navigateToTab("confirm")
            }
        }
        
    }


    watch(()=>shopStore.state.currentTab,(newVal,oldVal)=>{
        if (oldVal === tab && newVal !== tab){
            // we leaf this tab now
            leavefunction()
        }
    })

    onBeforeMount(()=>{
        initfunction()
    })

    return {
        state,
    }
}