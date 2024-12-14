import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { OhVueIcon } from 'oh-vue-icons';
import Navbar from './components/Navbar.vue'
import hljs from 'highlight.js';

createApp(App).use(store).use(router).use(hljs.vuePlugin)
.component('v-icon', OhVueIcon)
.component('Navbar', Navbar)
.mount('#app')
