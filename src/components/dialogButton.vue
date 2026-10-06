<template>
  <sl-button
    v-bind="$attrs"
    @click="state.opened = true"
  >
    <slot> </slot>
  </sl-button>
  <teleport
    to="body"
    v-if="state.opened"
  >
    <sl-dialog
      class="dialog-button-confirm"
      :open="state.opened"
      @sl-after-hide="state.opened = false"
      noHeader
    >
      <slot
        name="dialog"
        :close="close"
      >
      </slot>
    </sl-dialog>
  </teleport>
</template>

<script setup>
import { reactive } from 'vue'
defineOptions({
  inheritAttrs: false,
})

const state = reactive({
  opened: false,
})

function close() {
  state.opened = false
}
</script>

<style scoped>
.dialog-button-confirm {
  &::part(base) {
    /* Render above a dialog this button was opened from, such as
       CartAdd.vue's `--ignt-z-index-tooltip + 50` override. */
    z-index: calc(var(--ignt-z-index-tooltip, 500) + 100);
  }
}

.decent {
  margin: 0;
  transition: all ease 0.3s;

  &::part(base) {
    border: none;
    border-radius: 0;
  }

  &::part(label) {
    padding: 0;
    height: var(--sl-input-height-medium);
    width: calc(var(--sl-input-height-medium) / 5 * 4);
  }
}
</style>
