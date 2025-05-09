<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-8">Checkout</h2>

    <div v-if="cartStore.cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg">Your cart is empty</p>
      <router-link
        to="/products"
        class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
          <div
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="flex justify-between py-2 border-b"
          >
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 class="text-xl font-semibold mb-4">Shipping Information</h3>
          <form @submit.prevent="submitOrder">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1">Full Name</label>
                <input type="text" class="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label class="block mb-1">Email</label>
                <input type="email" class="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label class="block mb-1">Address</label>
                <input type="text" class="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label class="block mb-1">City</label>
                <input type="text" class="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label class="block mb-1">Credit Card Number</label>
                <input type="text" class="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label class="block mb-1">Expiry Date</label>
                <input
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  placeholder="MM/YY"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              class="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      <div>
        <div class="bg-white p-6 rounded-lg shadow-md sticky top-4">
          <h3 class="text-xl font-semibold mb-4">Order Details</h3>
          <div v-for="item in cartStore.cartItems" :key="item.id" class="flex justify-between py-2">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="border-t mt-4 pt-4">
            <div class="flex justify-between font-semibold">
              <span>Subtotal:</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>$5.00</span>
            </div>
            <div class="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${{ (cartStore.totalPrice + 5).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const submitOrder = () => {
  alert('Order placed successfully!')
  cartStore.clearCart()
  router.push('/order-confirmation')
}
</script>
