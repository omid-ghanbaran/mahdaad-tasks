<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-8">Your Cart</h2>

    <div v-if="cartStore.cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg">Your cart is empty</p>
      <router-link
        to="/products"
        class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </router-link>
    </div>

    <div v-else>
      <div class="mb-8">
        <CartItem v-for="item in cartStore.cartItems" :key="item.id" :item="item" />
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-semibold">Total Items:</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>
        <div class="flex justify-between items-center mb-6">
          <span class="font-semibold">Total Price:</span>
          <span class="text-xl font-bold">${{ cartStore.totalPrice }}</span>
        </div>

        <div class="flex justify-end space-x-4">
          <router-link
            to="/products"
            class="px-6 py-2 border rounded hover:bg-gray-100 transition-colors"
          >
            Continue Shopping
          </router-link>
          <router-link
            to="/checkout"
            class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/CartItem.vue'

const cartStore = useCartStore()
</script>
