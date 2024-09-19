<template>
  <sl-card v-if="Object.keys(formState.structure).length > 0">
    <h2 class="headline">Persönliche Angaben</h2>
    <slot
        boneName="salutation"
        :widget="getBoneWidget(formState.structure['salutation']['type'])"
        label="top"
      >
      </slot>
    <div class="wrapper-name">
      <slot
        boneName="firstname"
        :widget="getBoneWidget(formState.structure['firstname']['type'])"
      >
      </slot>

      <slot
        boneName="lastname"
        :widget="getBoneWidget(formState.structure['lastname']['type'])"
      >
      </slot>
    </div>

    <slot
      boneName="street_name"
      :widget="getBoneWidget(formState.structure['street_name']['type'])"
    >
    </slot>
    <div class="wrapper-name">
      <slot
        boneName="street_number"
        :widget="getBoneWidget(formState.structure['street_number']['type'])"
      >
      </slot>

      <slot
        boneName="zip_code"
        :widget="getBoneWidget(formState.structure['zip_code']['type'])"
      >
      </slot>

    </div>
    <slot
        boneName="address_type"
        :widget="getBoneWidget(formState.structure['address_type']['type'])"
      >
      </slot>
  </sl-card>
</template>
<script setup>
import { inject } from "vue";
import { getBoneWidget } from "@viur/vue-utils/bones/edit";
// import CustomStringBone from "./CustomStringBone.vue";
const formState = inject("formState");
const formUpdate = inject("formUpdate");
</script>
<style scoped>
.wrapper-name {
  display: flex;
  gap: 20px;
}

:deep(.bone-wrapper) {
  & sl-input::part(base) {
    border-radius: var(--sl-input-border-radius-medium);
  }

  & sl-select::part(combobox) {
    border-radius: var(--sl-input-border-radius-medium);
  }
}

:deep(.bone-wrapper:last-child) {
  margin-bottom: 0;
}
</style>
