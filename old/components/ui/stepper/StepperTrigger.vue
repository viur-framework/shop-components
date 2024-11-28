<template>
  <sl-button
    type="submit"
    v-show="index !== 0 && state.showPrev"
    @click="prevTab()"
  >
    Zurück
    <!-- TODO: $t(i18n referenz) -->
  </sl-button>

  <sl-button
    type="submit"
    variant="primary"
    @click="nextTab()"
    v-show="state.showNext"
    :disabled="!tabs[tab].valid"
  >
    Weiter
    <!-- TODO: $t(i18n referenz) -->
  </sl-button>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  tab: {
    type: String,
    required: true,
  },
  tabs: {
    type: Object,
    required: true,
  },
});
const state = reactive({
  showPrev: computed(() => {
    if (props.tabs[props.tab]["showPrev"] !== undefined) {
      return !!props.tabs[props.tab]["showPrev"];
    }
    return true;
  }),
  showNext: computed(() => {
    if (props.tabs[props.tab]["showNext"] !== undefined) {
      return !!props.tabs[props.tab]["showNext"];
    }
    return true;
  }),
});
const emit = defineEmits({ prevTab: null, nextTab: null });

function prevTab() {
  emit("prevTab");
}

function nextTab() {
  emit("nextTab");
}
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
