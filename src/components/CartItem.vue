<template>
  <div class="flex items-center border-b py-4">
    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover mr-4" />
    <div class="flex-grow">
      <h4 class="font-medium">{{ item.name }}</h4>
      <p class="text-gray-600">${{ item.price }}</p>
    </div>
    <div class="flex items-center">
      <button
        @click="decreaseQuantity"
        class="px-2 py-1 border rounded-l"
        :disabled="item.quantity <= 1"
      >
        -
      </button>
      <span class="px-4 py-1 border-t border-b">{{ item.quantity }}</span>
      <button @click="increaseQuantity" class="px-2 py-1 border rounded-r">+</button>
      <button @click="removeItem" class="ml-4 text-red-600 hover:text-red-800">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const increaseQuantity = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
  }
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.id)
}
</script>
