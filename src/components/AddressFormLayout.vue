<template>
  <div
    class="vi-shop-cart-form-wrap"
    v-if="Object.keys(formState.structure).length > 0"
  >
    <slot
      v-if="formState.structure['customer_type']"
      boneName="customer_type"
      :widget="getBoneWidget(formState.structure['customer_type']['type'])"
      label="placeholder"
    >
    </slot>

    <!-- Shown for a business only (visibleIf of the bones); absent in older viur-shop versions -->
    <slot
      v-if="formState.structure['company_name']"
      boneName="company_name"
      :widget="getBoneWidget(formState.structure['company_name']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      v-if="formState.structure['commercial_register_number']"
      boneName="commercial_register_number"
      :widget="getBoneWidget(formState.structure['commercial_register_number']['type'])"
      :visible="state.isBusiness && !state.noRegisterNumber"
      label="placeholder"
    >
    </slot>

    <!-- Either a register number or this box: without a number the company is reported as unregistered -->
    <sl-checkbox
      v-if="formState.structure['commercial_register_number'] && state.isBusiness"
      class="no-commercial-register-number"
      :checked="state.noRegisterNumber"
      @sl-change="setNoRegisterNumber($event.target.checked)"
    >
      {{ $t('viur.shop.no_commercial_register_number') }}
    </sl-checkbox>

    <slot
      boneName="salutation"
      :widget="getBoneWidget(formState.structure['salutation']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="firstname"
      :widget="getBoneWidget(formState.structure['firstname']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="lastname"
      :widget="getBoneWidget(formState.structure['lastname']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="street_name"
      :widget="getBoneWidget(formState.structure['street_name']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="street_number"
      :widget="getBoneWidget(formState.structure['street_number']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="address_addition"
      :widget="getBoneWidget(formState.structure['address_addition']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="zip_code"
      :widget="getBoneWidget(formState.structure['zip_code']['type'])"
      placeholder="placeholder"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="city"
      :widget="getBoneWidget(formState.structure['city']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="country"
      :widget="getBoneWidget(formState.structure['country']['type'])"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="email"
      :widget="EmailCheckBone"
      label="placeholder"
    >
    </slot>

    <slot
      boneName="phone"
      :widget="PhoneCheckBone"
      label="placeholder"
    >
    </slot>
  </div>
</template>
<script setup>
import { computed, inject, reactive, watchEffect } from 'vue'
import { getBoneWidget } from '@viur/vue-utils/bones/edit'
import EmailCheckBone from '../custombones/EmailCheckBone.vue'
import PhoneCheckBone from '../custombones/PhoneCheckBone.vue'

const formState = inject('formState')
const formUpdate = inject('formUpdate')

const state = reactive({
  isBusiness: computed(() => formState.skel?.['customer_type'] === 'business'),
  // null until the customer ticks or unticks the box. Until then a stored business
  // address without a number counts as ticked, a new one as unticked -- so a new
  // business has to give a number or say it has none.
  noRegisterNumberChoice: null,
  noRegisterNumber: computed(
    () =>
      state.noRegisterNumberChoice ??
      Boolean(formState.skel?.['key'] && !formState.skel?.['commercial_register_number']),
  ),
})

function setNoRegisterNumber(checked) {
  state.noRegisterNumberChoice = checked
  if (checked) {
    formUpdate({ name: 'commercial_register_number', value: '', lang: null, index: null, valid: true })
  }
}

// The number is required unless the box is ticked. The form checks it like any other
// required input (reportValidity), so a hidden field must never stay required.
watchEffect(() => {
  const bone = formState.structure?.['commercial_register_number']
  if (bone) {
    bone['required'] = state.isBusiness && !state.noRegisterNumber
  }
})
</script>
<style scoped>
.vi-shop-cart-form-wrap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sl-spacing-small);
  margin-bottom: var(--sl-spacing-medium);
}

:deep(.bone-wrapper) {
  margin: 0;
}

:deep(.wrapper-bone-customer_type) {
  grid-column: 1 / span 4;
}

:deep(.wrapper-bone-company_name) {
  grid-column: 1 / span 2;
}

:deep(.wrapper-bone-commercial_register_number) {
  grid-column: 3 / span 2;
}

.no-commercial-register-number {
  grid-column: 1 / span 4;
}

:deep(.wrapper-bone-firstname) {
  grid-column: 1 / span 2;
}

:deep(.wrapper-bone-lastname) {
  grid-column: 3 / span 2;
}

:deep(.wrapper-bone-street_name) {
  grid-column: 1 / span 3;
}

:deep(.wrapper-bone-street_number) {
  grid-column: 4 / span 1;
}

:deep(.wrapper-bone-address_addition) {
  grid-column: 1 / span 4;
}

:deep(.wrapper-bone-zip_code) {
  grid-column: 1 / span 2;
}

:deep(.wrapper-bone-city) {
  grid-column: 3 / span 2;
}

:deep(.wrapper-bone-country) {
  grid-column: 1 / span 4;
}
:deep(.wrapper-bone-email) {
  grid-column: 1 / span 4;
}

:deep(.wrapper-bone-phone) {
  grid-column: 1 / span 4;
}

:deep(.wrapper-bone-is_default) {
  padding: var(--sl-spacing-x-small) 0;
  grid-column: 1 / span 4;
}
</style>
