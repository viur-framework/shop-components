<template>
  <template v-if="isLoading">
    <slot name="loading">
      <shop-alert
        duration="Infinity"
        variant="info"
        :closeable="false"
      >
        <template #icon>
          <sl-spinner
            class="spinner-loading"
            slot="icon"
          ></sl-spinner>
        </template>
        <template #alertMsg>
          {{ $t("messages.loading") }}
        </template>
      </shop-alert>
    </slot>
  </template>
  <template v-else-if="isUpdating">
    <slot name="updating">
      <shop-alert
        duration="Infinity"
        variant="info"
        :closeable="false"
      >
        <template #icon>
          <sl-spinner
            class="spinner-loading"
            slot="icon"
          ></sl-spinner>
        </template>
        <template #alertMsg>
          {{ $t("messages.updating") }}
        </template>
      </shop-alert>
    </slot>
  </template>
  <template v-else-if="hasError">
    <slot name="error">
      <shop-alert
        duration="Infinity"
        iconName="x-lg"
        variant="danger"
        :closeable="false"
      >
        <template #alertMsg>
          {{ errorMessage }}
        </template>
      </shop-alert>
    </slot>
  </template>
  <template v-else>
    <slot> </slot>
  </template>
</template>

<script setup>
import ShopAlert from "./ShopAlert.vue"

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true
  },
  isUpdating: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: "Ein Fehler ist aufgetreten."
  }
})
</script>

<style scoped>
.spinner-loading {
  --indicator-color: var(--sl-color-info-500);
}
.spinner-error {
  --indicator-color: var(--sl-color-danger-500);
}
</style>
