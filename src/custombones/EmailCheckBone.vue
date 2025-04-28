<template>
  <div class="widget-bone-wrapper-email">
  <sl-input
    class="widget-bone widget-bone-email widget-bone-email-default"
    :class="([`widget-bone-email-${name}`])"
    :name="name"
    ref="emailBone"
    :disabled="boneState.readonly"
    type="email"
    :value="value"
    @sl-change="changeEvent"
    :required="boneState.bonestructure.required && !boneState.bonestructure.multiple  && !boneState.bonestructure.languages"
    :placeholder="boneState.label==='placeholder'?boneState?.bonestructure?.descr:undefined"
    :data-user-invalid="boneState.errorMessages.length===0?undefined:true"
  ></sl-input>

  <sl-input
    class="widget-bone widget-bone-email widget-bone-email-repeat"
    :class="([`widget-bone-email-${name}`])"
    ref="emailBone2"
    :disabled="boneState.readonly"
    type="email"
    @sl-change="changeEvent"
    :required="boneState.bonestructure.required && !boneState.bonestructure.multiple  && !boneState.bonestructure.languages"
    :placeholder="boneState.label==='placeholder'?boneState?.bonestructure?.descr:undefined"
    :data-user-invalid="boneState.errorMessages.length===0?undefined:true"
  ></sl-input>

</div>
</template>

<script setup>
import { reactive, onMounted, inject, ref, watchEffect } from "vue"
import { useTimeoutFn } from "@vueuse/core"
import { useI18n } from "vue-i18n"
  defineOptions({
    inheritAttrs: false
  })
  const props = defineProps( {
    name: String,
    value: [Object, String, Number, Boolean, Array],
    index: Number,
    lang: String,
    bone:Object,
    autofocus: Boolean
  })
  const i18n = useI18n()
  const emit = defineEmits( ["change"])

    const boneState = inject("boneState")
    const state = reactive({

    })

    const emailBone = ref(null)
    const emailBone2 = ref(null)

    function changeEvent(event) {
      if(emailBone.value.value!==emailBone2.value.value){
        emailBone.value.setCustomValidity(i18n.t("messages.password_equal_error"))
        emailBone.value.reportValidity()
        if (!event.target.classList.contains('widget-bone-email-repeat')){
          emit("change", props.name, event.target.value, props.lang, props.index,false)
        }
      }else{
        emailBone.value.setCustomValidity('')
        emit("change", props.name, event.target.value, props.lang, props.index,true)
      }
    }

    watchEffect(() => {
      if (props.autofocus) {
        if (emailBone.value && emailBone.value !== null && emailBone !== null) {
          const { start } = useTimeoutFn(() => {
            emailBone.value.focus()
          }, 600)

          start()
        }
      }
    })

    onMounted(() => {
      emit("change", props.name, props.value, props.lang, props.index) //init
    })

</script>

<style scoped>
sl-input {
  width: 100%;

  &::part(base) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  @media (max-width: 900px) {
    &::part(base) {
      border-top-right-radius: 0;
      border-bottom-left-radius: var(--sl-border-radius-medium);
    }
  }
}

.widget-bone-wrapper-email{
  display:flex;
  gap: var(--sl-spacing-small);
}
</style>
