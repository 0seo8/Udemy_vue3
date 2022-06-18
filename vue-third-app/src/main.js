import { createApp } from 'vue'
import style from '~/scss/main.scss'
import App from './App.vue'

const app = createApp(App)
app.component('BaseStyle', style)
app.mount('#app')
