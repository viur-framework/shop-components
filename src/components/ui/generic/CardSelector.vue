<template>
    <template v-for="(option,i) in options">
        <sl-card selectable @sl-change="changeSelection(i)" :selected="i===state.currentSelection" horizontal>
            <slot :option="option" :index="i">
                {{i}}: {{ option }} 
            </slot>
        </sl-card>
    </template>
</template>

<script setup>
import {reactive} from 'vue'

const selection = defineModel("selection")

const emits = defineEmits(['change'])

const props = defineProps({
    options:{
        type: Array,
        default:[]
    },
})

const state = reactive({
    currentSelection:null
})

function changeSelection(i){
    if (state.currentSelection === i){
        state.currentSelection = null
        selection.value = null
    }else{
        state.currentSelection = i
        selection.value = props.options[i]
    }   
    emits("change", selection.value)
}


</script>

<style scoped>
sl-card{
    width: 100%;
    &[selected]::part(base){
        border:1px solid var(--sl-color-primary-500);
        box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
    }
}

</style>