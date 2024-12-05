<template>
    <sl-button v-bind="$attrs" @click="state.opened=true">
        <slot>

        </slot>
    </sl-button>
    <sl-dialog :open="state.opened"  @sl-after-hide="state.opened=false" noHeader>
        <slot name="dialog" :close="close">

        </slot>
    </sl-dialog>
</template>

<script setup>
import {reactive} from 'vue'
defineOptions({
  inheritAttrs: false
})

const state = reactive({
    opened:false
})

function close(){
    state.opened=false
}

</script>