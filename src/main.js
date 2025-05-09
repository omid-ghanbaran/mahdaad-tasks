import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'

import ProductCard from '@/components/ProductCard.vue'

import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('ProductCard', ProductCard)

app.mount('#app')
