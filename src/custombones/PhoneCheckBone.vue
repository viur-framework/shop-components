<template>
  <div class="widget-bone-wrapper-string">
  <sl-input
    class="widget-bone widget-bone-string widget-bone-string-default"
    :class="([`widget-bone-string-${name}`])"
    :name="name"
    ref="stringBone"
    :disabled="boneState.readonly"
    :value="value"
    @sl-change="changeEvent"
    :required="boneState.bonestructure.required && !boneState.bonestructure.multiple  && !boneState.bonestructure.languages"
    :placeholder="boneState.label==='placeholder'?boneState?.bonestructure?.descr:undefined"
    :data-user-invalid="boneState.errorMessages.length===0?undefined:true"
    :pattern="state.pattern"
    :maxlength="boneState.maxlength"
    :minlength="boneState.minlength"
  ></sl-input>

  <sl-input
    class="widget-bone widget-bone-string widget-bone-string-repeat"
    :class="([`widget-bone-email-${name}`])"
    ref="stringBone2"
    :disabled="boneState.readonly"

    @sl-change="changeEvent"
    :required="boneState.bonestructure.required && !boneState.bonestructure.multiple  && !boneState.bonestructure.languages"
    :placeholder="boneState.label==='placeholder'?boneState?.bonestructure?.descr:undefined"
    :data-user-invalid="boneState.errorMessages.length===0?undefined:true"
    :pattern="state.pattern"
    :maxlength="boneState.maxlength"
    :minlength="boneState.minlength"
  ></sl-input>

</div>
</template>

<script setup>
import { reactive, onMounted, inject, ref, watchEffect, computed } from "vue"
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
      pattern: computed(() => {
        let pat = boneState.params?.pattern
        if (!pat) return undefined

        if (typeof(pat) === "String"){
          return pat
        }
        return pat?.[boneState.defaultLanguage]
      }),
      pattern_error:computed(()=>{
        let pat = boneState.params?.pattern_error
        if (!pat) return ''

        if (typeof(pat) === "String"){
          return pat
        }
        return pat?.[boneState.defaultLanguage]?pat?.[boneState.defaultLanguage]:''
      })
    })

    const stringBone = ref(null)
    const stringBone2 = ref(null)

    function changeEvent(event) {
      for (const bone of [stringBone, stringBone2]){
        let valid = bone.value.reportValidity()
        let validStates = bone.value.validity
        if(validStates['patternMismatch']){
          bone.value.setCustomValidity(state.pattern_error)
          return
        }else{
          bone.value.setCustomValidity('')
        }
      }
      if(stringBone.value.value!==stringBone2.value.value){
        stringBone.value.setCustomValidity(i18n.t("messages.phone_equal_error"))
        stringBone.value.reportValidity()
        if (!event.target.classList.contains('widget-bone-string-repeat')){
          emit("change", props.name, event.target.value, props.lang, props.index,false)
        }
      }else{
        stringBone.value.setCustomValidity('')
        emit("change", props.name, event.target.value, props.lang, props.index,true)
      }
    }

    watchEffect(() => {
      if (props.autofocus) {
        if (stringBone.value && stringBone.value !== null && stringBone !== null) {
          const { start } = useTimeoutFn(() => {
            stringBone.value.focus()
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

.widget-bone-wrapper-string{
  display:flex;
  gap: var(--sl-spacing-small);
  margin-bottom:var(--sl-spacing-small);
}
</style>
