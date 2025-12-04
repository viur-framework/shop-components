<template>
    <sl-button v-bind="$attrs" @click="state.opened=true">
        <slot>

        </slot>
    </sl-button>
    <teleport to="#dialogs" v-if="state.opened">
    <sl-dialog :open="state.opened"  @sl-after-hide="state.opened=false" noHeader>
            <slot name="dialog" :close="close">

            </slot>
        </sl-dialog>
    </teleport>
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

<style scoped>

.decent {
    margin: 0;
    transition: all ease .3s;

    &::part(base){
      border: none;
      border-radius: 0;
    }

    &::part(label){
        padding: 0;
        height: var(--sl-input-height-medium);
        width: calc(var(--sl-input-height-medium) / 5 * 4);
    }
}

</style>
