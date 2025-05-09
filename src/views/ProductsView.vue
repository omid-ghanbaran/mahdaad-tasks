<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-8">Products</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label for="city-filter" class="block text-sm font-medium text-gray-700">
          Filter by City:
        </label>
        <select
          id="city-filter"
          v-model="selectedCity"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          @change="updateCustomerFilter"
        >
          <option :value="null">All Cities</option>
          <option v-for="city in uniqueCities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div>
        <label for="customer-filter" class="block text-sm font-medium text-gray-700">
          Select Customer:
        </label>
        <select
          v-model="selectedCustomerId"
          @change="updateCustomer"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option v-for="customer in customers" :value="customer.id" :key="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
    <ProductRecommendation />
    <LatestPurchase />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/ProductCard.vue'
import ProductRecommendation from '@/components/ProductRecommendation.vue'
import LatestPurchase from '@/components/LatestPurchase.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const selectedCustomerId = ref(productStore.currentCustomerId)
const updateCustomer = () => {
  productStore.setCurrentCustomer(selectedCustomerId.value)
}
const customers = productStore.customers
const updateCustomerInStore = () => {
  productStore.setCurrentCustomer(selectedCustomerId.value)
}

onMounted(() => {
  if (customers.length > 0) {
    selectedCustomerId.value = customers[0].id
    updateCustomerInStore()
  }
})
const selectedCity = ref(null)

const allProducts = computed(() => productStore.products)

const uniqueCities = computed(() => {
  const cities = new Set(productStore.customers.map((customer) => customer.city))
  return Array.from(cities)
})

const filteredProducts = computed(() => {
  if (!selectedCity.value) return allProducts.value

  return productStore.getProductsByCity(selectedCity.value)
})
const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>
