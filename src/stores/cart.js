import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  if (localStorage.getItem('cart')) {
    cartItems.value = JSON.parse(localStorage.getItem('cart'))
  }

  const addToCart = (product) => {
    const existingItem = cartItems.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }

    saveCartToLocalStorage()
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId)
    saveCartToLocalStorage()
  }

  const updateQuantity = (productId, newQuantity) => {
    const item = cartItems.value.find((item) => item.id === productId)
    if (item) {
      item.quantity = newQuantity
      saveCartToLocalStorage()
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCartToLocalStorage()
  }

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
})
