<template>
  <div v-if="purchase" class="mb-8 p-4 bg-gray-50 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">
      <slot name="title">Your Latest Purchase</slot>
    </h3>
    <div class="flex items-center">
      <img
        :src="purchase.product.image || defaultImage"
        :alt="purchase.product.name"
        class="w-16 h-16 object-cover rounded mr-4"
      />
      <div>
        <p class="font-medium">{{ purchase.product.name }}</p>
        <p class="text-sm text-gray-600">Purchased on {{ formatDate(purchase.date) }}</p>
        <p class="text-sm">Price: ${{ purchase.product.price }}</p>
        <slot name="additional-info"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
const purchase = computed(() => productStore.getLatestPurchaseByCustomer)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>
