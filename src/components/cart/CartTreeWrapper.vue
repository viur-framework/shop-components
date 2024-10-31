<template>
  <div v-if="state.loading">keine Einträge im Warenkorb</div>

  <template v-else-if="tree.is_root_node">
    <template v-for="child in tree.children">
      <CartLeafModel
        :modelValue="child"
        v-if="child.skel_type === 'leaf'"
        @update:modelValue="handleChange"
      />

      <CartNode
        :node="child"
        v-else-if="child.children.length && child?.skel_type === 'node'"
      >
        <template v-for="item in child.children">
          <CartLeafModel
            :modelValue="item"
            v-if="item.skel_type === 'leaf'"
            @update:modelValue="handleChange"
          >
          </CartLeafModel>
          <CartTreeWrapper
            :tree="item"
            @update:modelValue="handleChange"
            v-else
          >
          </CartTreeWrapper>
        </template>
      </CartNode>
    </template>
  </template>

  <CartNode :node="tree" v-else-if="tree.skel_type === 'node'">
    <template v-for="item in tree.children">
      <CartLeafModel
        :modelValue="item"
        @update:modelValue="handleChange"
        v-if="item.skel_type === 'leaf'"
      >
      </CartLeafModel>
      <CartTreeWrapper :tree="item" @update:modelValue="handleChange" v-else>
      </CartTreeWrapper>
    </template>
  </CartNode>
</template>

<script setup>
import { reactive, watch, computed } from "vue";
import CartLeafModel from "./CartLeafModel.vue";
import CartNode from "./CartNode.vue";

const props = defineProps({
  tree: { type: Object },
});

const emits = defineEmits(["update:modelValue"]);

const state = reactive({
  loading: computed(() => {
    if (props.tree) {
      return false;
    }
    return true;
  }),
});

function handleChange(e) {
  emits("update:modelValue", e);
}

watch(() => {});
</script>
