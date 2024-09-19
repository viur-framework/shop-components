<template>
  <sl-card v-if="Object.keys(formState.structure).length > 0">
    <h2 class="headline">Persönliche Angaben</h2>
    <slot
      boneName="salutation"
      :widget="getBoneWidget(formState.structure['salutation']['type'])"
    >
    </slot>
    <div class="wrapper-name">
      <slot boneName="firstname" :widget="CustomStringBone" label="hide">
      </slot>

      <slot boneName="lastname" :widget="CustomStringBone" label="hide"> </slot>
    </div>
    <div class="wrapper-name">
      <slot boneName="street_name" :widget="CustomStringBone" label="hide"> </slot>
      <slot
        boneName="street_number"
        :widget="CustomStringBone"
        label="hide"

      >
      </slot>
    </div>
    <div class="wrapper-name">
      <slot
        boneName="city"
        :widget="CustomStringBone"
        label="hide"
      >
      </slot>

      <slot
        boneName="zip_code"
        :widget="CustomStringBone"
        placeholder="PLZ"
        label="hide"

      >
      </slot>
    </div>
    <slot
      boneName="country"
      :widget="getBoneWidget(formState.structure['country']['type'])"
    >
    </slot>
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
import CustomStringBone from "./CustomStringBone.vue";
const formState = inject("formState");
const formUpdate = inject("formUpdate");
</script>
<style scoped>
.wrapper-name {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  width: 100%;
  justify-content: center;
  & sl-input::part(base) {
    width: 100%;
  }
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
