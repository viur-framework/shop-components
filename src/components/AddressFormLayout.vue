<template>
  <div class="vi-shop-cart-form-wrap" v-if="Object.keys(formState.structure).length > 0">
    <slot
      boneName="salutation"
      :widget="getBoneWidget(formState.structure['salutation']['type'])"
      label="placeholder"
    >
    </slot>

    <slot boneName="firstname"
        :widget="getBoneWidget(formState.structure['firstname']['type'])"
        label="placeholder">
    </slot>

    <slot boneName="lastname"
          :widget="getBoneWidget(formState.structure['lastname']['type'])"
          label="placeholder">
    </slot>

    <slot boneName="street_name"
          :widget="getBoneWidget(formState.structure['street_name']['type'])"
          label="placeholder">
    </slot>

    <slot boneName="street_number"
          :widget="getBoneWidget(formState.structure['street_number']['type'])"
          label="placeholder">
    </slot>

    <slot
        boneName="zip_code"
        :widget="getBoneWidget(formState.structure['zip_code']['type'])"
        placeholder="placeholder"
        label="placeholder"
    >
    </slot>

    <slot boneName="city"
          :widget="getBoneWidget(formState.structure['city']['type'])"
          label="placeholder">
    </slot>


  <slot boneName="country"
        :widget="getBoneWidget(formState.structure['country']['type'])"
        label="placeholder">
  </slot>

  <slot boneName="email"
        :widget="getBoneWidget(formState.structure['email']['type'])"
        label="placeholder">
  </slot>

  <slot boneName="phone"
        :widget="getBoneWidget(formState.structure['phone']['type'])"
        label="placeholder">
  </slot>

  </div>
</template>
<script setup>
import { inject } from "vue";
import { getBoneWidget } from "@viur/vue-utils/bones/edit";

const formState = inject("formState");
const formUpdate = inject("formUpdate");
</script>
<style scoped>

.vi-shop-cart-form-wrap{
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sl-spacing-small);
  margin-bottom: var(--sl-spacing-medium);
}

:deep(.bone-wrapper){
  margin: 0;
}

:deep(.wrapper-bone-firstname){
  grid-column: 1 / span 2;
}

:deep(.wrapper-bone-lastname){
  grid-column: 3 / span 2;
}

:deep(.wrapper-bone-street_name){
  grid-column: 1 / span 3;
}

:deep(.wrapper-bone-street_number){
  grid-column: 4 / span 1;
}

:deep(.wrapper-bone-zip_code){
  grid-column: 1 / span 2;
}

:deep(.wrapper-bone-city){
  grid-column: 3 / span 2;
}

:deep(.wrapper-bone-country){
  grid-column: 1 / span 4;
}

:deep(.wrapper-bone-is_default){
  padding: var(--sl-spacing-x-small) 0;
  grid-column: 1 / span 4;
}




</style>
