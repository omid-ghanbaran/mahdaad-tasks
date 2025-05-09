<template>
  <div
    class="flex items-stretch border border-gray-300 rounded-lg overflow-hidden mb-4 p-8 bg-black"
  >
    <div class="flex-shrink-0" :style="{ width: fixedWidth1 }">
      <slot name="fixed-1"></slot>
    </div>

    <div class="flex-shrink-0" :style="{ width: fixedWidth2 }">
      <slot name="fixed-2"></slot>
    </div>

    <div class="flex-grow">
      <slot name="flexible"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fixedWidth1: {
    type: String,
    default: '8rem',
  },
  fixedWidth2: {
    type: String,
    default: '12rem',
  },
})
</script>
