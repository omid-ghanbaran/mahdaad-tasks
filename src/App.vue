<template>
  <div class="container mx-auto p-8 bg-gray-900">
    <FlexFixedRow
      v-for="(row, index) in rows"
      :key="index"
      :fixed-width1="row.fixedWidth1"
      :fixed-width2="row.fixedWidth2"
    >
      <template #fixed-1>
        <div class="bg-red-500 text-white p-4 h-full flex items-center justify-center">
          {{ row.fixedContent1 }}
        </div>
      </template>

      <template #fixed-2>
        <div class="bg-blue-500 text-white p-4 h-full flex items-center justify-center">
          {{ row.fixedContent2 }}
        </div>
      </template>

      <template #flexible>
        <div class="bg-green-500 text-white p-4 h-full flex items-center">
          {{ row.flexContent }}
        </div>
      </template>
    </FlexFixedRow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FlexFixedRow from '@/components/FlexFixedRow.vue'

const rows = ref([
  {
    fixedWidth1: '6rem',
    fixedWidth2: '10rem',
    fixedContent1: '1',
    fixedContent2: '2',
    flexContent: '3',
  },
  {
    fixedWidth1: '8rem',
    fixedWidth2: '14rem',
    fixedContent1: '1',
    fixedContent2: '2',
    flexContent: '3',
  },
  {
    fixedWidth1: '6rem',
    fixedWidth2: '10rem',
    fixedContent1: '1',
    fixedContent2: '2',
    flexContent: '3',
  },
])
</script>
