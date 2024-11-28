<template>
    <span>Gla</span>
</template>

<script setup>
import {reactive} from 'vue'

const state = reactive({
    currentTab:null,
    tabs:{},
    tabIndexMap:{}, //computed
})

</script>

<style scoped>
</style>