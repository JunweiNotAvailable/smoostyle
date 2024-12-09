<template>
  <router-view/>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import './assets/global.css';

export default {
  name: 'App',
  components: { Navbar, Footer },
  setup() {
    const store = useStore();
    
    const isLoading = computed(() => store.getters.isUserLoading);
    const hasUser = store.getters.hasUser;

    // load user when app starts 
    onMounted(() => {
      if (isLoading.value) {
        store.dispatch('fetchUser');
      }
    })

    return { isLoading, hasUser };
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100svh;
  overflow: auto;
}
</style>
