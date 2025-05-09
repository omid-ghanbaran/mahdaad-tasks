import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/style.css'
import App from './App.vue'
import router from './router/router'
const app = createApp(App)
const link = document.createElement('link')
link.href = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css'
link.rel = 'stylesheet'
document.head.appendChild(link)

app.use(createPinia())
app.use(router)

app.mount('#app')
