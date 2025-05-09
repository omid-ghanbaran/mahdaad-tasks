import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  const currentCustomerId = ref(1)
  const customers = ref([
    { id: 1, name: 'Ahmad', city: 'Tehran' },
    { id: 2, name: 'Mehran', city: 'Shiraz' },
    { id: 3, name: 'Ali', city: 'Esfahan' },
  ])

  const products = ref([
    {
      id: 101,
      name: 'Laptop',
      category: 'Electronics',
      price: 1500,
      image: 'https://picsum.photos/id/48/350/190.webp',
    },
    {
      id: 102,
      name: 'Mouse',
      category: 'Electronics',
      price: 50,
      image: 'https://picsum.photos/id/60/350/190.webp',
    },
    {
      id: 103,
      name: 'Monitor',
      category: 'Electronics',
      price: 800,
      image: 'https://picsum.photos/id/6/350/190.webp',
    },
    {
      id: 104,
      name: 'Coffee Maker',
      category: 'Home Appliances',
      price: 350,
      image: 'https://picsum.photos/id/431/350/190.webp',
    },
    {
      id: 105,
      name: 'Blender',
      category: 'Home Appliances',
      price: 200,
      image: 'https://picsum.photos/id/488/350/190.webp',
    },
    {
      id: 106,
      name: 'Headphones',
      category: 'Electronics',
      price: 300,
      image: 'https://picsum.photos/id/160/350/190.webp',
    },
  ])

  const purchases = ref([
    { customerId: 1, productId: 101, date: '2025-03-01' },
    { customerId: 1, productId: 102, date: '2025-02-02' },
    { customerId: 2, productId: 103, date: '2025-02-05' },
    { customerId: 2, productId: 104, date: '2025-02-06' },
    { customerId: 3, productId: 105, date: '2025-02-07' },
    { customerId: 3, productId: 106, date: '2025-02-08' },
    { customerId: 1, productId: 104, date: '2025-02-10' },
  ])

  const setCurrentCustomer = (customerId) => {
    currentCustomerId.value = customerId
  }

  const currentCustomer = computed(() => {
    return customers.value.find((c) => c.id === currentCustomerId.value)
  })

  const getProductById = (productId) => {
    return products.value.find((p) => p.id === productId)
  }

  const getProductsByCustomer = computed(() => {
    return purchases.value
      .filter((p) => p.customerId === currentCustomerId.value)
      .map((p) => getProductById(p.productId))
      .filter(Boolean)
  })

  const getTopCategoryByCustomer = computed(() => {
    const customerProducts = getProductsByCustomer.value
    const categoryCount = customerProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {})

    return Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null
  })

  const getRecommendations = computed(() => {
    if (!currentCustomer.value)
      return {
        recommendedList: [],
        currentCustomer: null,
        favoriteCategory: null,
        hasRecommendations: false,
      }

    const favoriteCategory = getTopCategoryByCustomer.value
    const similarCustomers = customers.value.filter(
      (c) => c.city === currentCustomer.value.city && c.id !== currentCustomerId.value,
    )

    let recommendedProducts = []

    if (similarCustomers.length === 0) {
      recommendedProducts = products.value.filter(
        (p) =>
          p.category === favoriteCategory &&
          !getProductsByCustomer.value.some((cp) => cp.id === p.id),
      )
    } else {
      const purchasedProductIds = getProductsByCustomer.value.map((p) => p.id)

      similarCustomers.forEach((customer) => {
        purchases.value
          .filter((p) => p.customerId === customer.id)
          .forEach((purchase) => {
            const product = getProductById(purchase.productId)
            if (
              product &&
              !purchasedProductIds.includes(product.id) &&
              !recommendedProducts.some((rp) => rp.id === product.id)
            ) {
              recommendedProducts.push(product)
            }
          })
      })

      recommendedProducts = recommendedProducts.sort((a, b) => {
        const aIsFavorite = a.category === favoriteCategory ? 1 : 0
        const bIsFavorite = b.category === favoriteCategory ? 1 : 0
        return bIsFavorite - aIsFavorite
      })
    }

    return {
      recommendedList: recommendedProducts,
      currentCustomer: currentCustomer.value,
      favoriteCategory,
      hasRecommendations: recommendedProducts.length > 0,
    }
  })

  const getProductsByCity = (city) => {
    const cityCustomers = customers.value.filter((c) => c.city === city)
    const cityProducts = cityCustomers.flatMap((customer) =>
      purchases.value
        .filter((p) => p.customerId === customer.id)
        .map((p) => getProductById(p.productId)),
    )
    return [...new Map(cityProducts.map((item) => [item.id, item])).values()]
  }

  const getLatestPurchaseByCustomer = computed(() => {
    const customerPurchases = purchases.value
      .filter((p) => p.customerId === currentCustomerId.value)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    if (customerPurchases.length > 0) {
      return {
        ...customerPurchases[0],
        product: getProductById(customerPurchases[0].productId),
        customer: currentCustomer.value,
      }
    }
    return null
  })

  return {
    customers,
    products,
    purchases,
    currentCustomerId,

    currentCustomer,
    getProductsByCustomer,
    getTopCategoryByCustomer,
    getRecommendations,
    getLatestPurchaseByCustomer,

    setCurrentCustomer,
    getProductsByCity,
    getProductById,
  }
})
