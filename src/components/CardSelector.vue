<template>
  <sl-radio-group :value="state.currentSelection">
    <template v-for="(option,i) in options">
        <sl-card selectable @sl-change="changeSelection(i)" :selected="i===state.currentSelection" horizontal>
            <slot :option="option" :index="i">
                {{i}}: {{ option }}
            </slot>
          <sl-radio :value="i"></sl-radio>
        </sl-card>
    </template>
  </sl-radio-group>
</template>

<script setup>
import {onMounted, reactive, watch} from 'vue'

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
    emits("change", props.options[i])
}

onMounted(()=>{
  if (selection){
    state.currentSelection = props.options.findIndex((option)=>option['dest']['key']===selection.value?.['dest']?.['key'])
  }

})

</script>

<style scoped>
sl-radio-group {
  margin-top: var(--ignt-spacing-small);
}

sl-card {
  width: calc(100% - 6px);
  margin-left: 3px;
  &[selected]::part(base){
    border:1px solid var(--sl-color-primary-500);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  &::part(body){
    display:flex;
    flex-direction: row;
      justify-content: space-between;
      align-items: center;
  }
}

</style>
