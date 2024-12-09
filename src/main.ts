import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { OhVueIcon } from 'oh-vue-icons';

createApp(App).use(store).use(router).component('v-icon', OhVueIcon).mount('#app')
