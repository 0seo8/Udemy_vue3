import { createApp } from 'vue'

import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import App from './App.vue'

const app = createApp(App)

app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)

app.mount('#app')
