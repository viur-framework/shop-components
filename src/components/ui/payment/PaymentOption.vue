<template>
  <sl-details :class="{
    simple:widget==='simple'
  }"
              @sl-show="selection" >
    <div slot="summary" class="payment-selection">
      <div class="start">
        <sl-icon :name="icon"></sl-icon>
        {{ name }}
      </div>
      <sl-radio :value="paymenttype" ></sl-radio>
    </div>
    <slot>
      {{description}}
    </slot>

    <template v-if="widget==='simple'">
        <div slot="expand-icon" style="width:1em"></div>
        <div slot="collapse-icon"  style="width:1em"></div>
    </template>
  </sl-details>
</template>

<script setup>
  const emits = defineEmits(['change'])
  const props = defineProps({
    paymenttype: {
      type: String,
      default: 'prepayment'
    },
    name: {
      type: String,
      default: 'Paymentname'
    },
    icon: {
      type: String,
      default: 'currency-euro'
    },
    description: {
      type: String,
      default: 'Payment description'
    },
    widget:{
      type:String,
      default:'default' //simple
    }
  })

  function selection(){
    console.log("FFF")
    emits('change',props.paymenttype)
  }



</script>

<style scoped>
.payment-selection{
  display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    width: 100%;

    .start{
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap:10px;
    }
}

.simple::part(content){
  display:none;
}
</style>
