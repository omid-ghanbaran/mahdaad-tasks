<template>
  <div class="mt-8">
    <h3 class="text-xl font-semibold mb-4">
      Recommended For {{ customerName }}
      <span v-if="favoriteCategory" class="text-sm font-normal text-gray-500">
        (based on your interest in {{ favoriteCategory }})
      </span>
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in recommendations.recommendedList"
        :key="'rec-' + product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'
import { computed } from 'vue'

const productStore = useProductStore()
const cartStore = useCartStore()

const recommendations = computed(() => productStore.getRecommendations)
const customerName = computed(() => productStore.currentCustomer?.name || 'You')
const favoriteCategory = computed(() => productStore.favoriteCategory)

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>
