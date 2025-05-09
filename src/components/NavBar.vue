<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <router-link to="/" class="text-xl flex items-center gap-2 font-bold"
        ><IconCommunity />Mahdaad Shop
      </router-link>
      <div class="flex items-center space-x-4">
        <router-link to="/products" class="hover:text-blue-600">Products</router-link>
        <router-link to="/cart" class="relative hover:text-blue-600">
          Cart
          <span
            v-if="cartItemsCount > 0"
            class="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartItemsCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import IconCommunity from '@/components/icons/IconCommunity.vue'
const cartStore = useCartStore()
const { totalItems: cartItemsCount } = storeToRefs(cartStore)
</script>
