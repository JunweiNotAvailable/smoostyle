<template>
  <header class="navbar flex-between">
    <div class="logo pointer flex-center" @click="$router.push({ name: 'Home' })">
      <div class="logo-icon"><img src="@/assets/logo.svg" alt="logo"></div>
    </div>
    <nav></nav>
    <button v-if="!hasUser" @click="toggleLoginForm" class="login-button border-button">Log in</button>
    <div v-else class="menu-button-container">
      <button @click="showMenu = !showMenu" class="menu-button">
        <div v-if="user.username">{{ user.username?.[0] }}</div>
        <div v-else><v-icon scale="0.8" name="hi-menu-alt-4" /></div>
      </button>
      <div class="menu-popup" v-if="showMenu">
        <button @click="() => {$router.push({ name: 'Settings' }); showMenu = false;}">Settings</button>
        <button @click="logout">Log out</button>
      </div>
    </div>
  </header>
</template>

<script>
import router from '@/router';
import { constants } from '@/utils/helpers';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Navbar',
  props: ['toggleLoginForm'],
  setup() {
    const store = useStore();
    const user = ref(store.state.user);
    const showMenu = ref(false);
    const hasUser = computed(() => store.getters.hasUser);

    // handle click events
    const handleClick = (e) => {
      const target = e.target;
      if (!target.closest('.menu-button') && !target.closest('.menu-popup')) showMenu.value = false;
    }

    const logout = () => {
      store.dispatch('setUser', null);
      localStorage.removeItem(constants.appName + '_user_id');
      router.push({ name: 'Home' });
      showMenu.value = false;
    }

    onMounted(() => document.addEventListener('click', handleClick));
    onUnmounted(() => document.removeEventListener('click', handleClick));

    return { user, showMenu, constants, hasUser, logout };
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.navbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  min-height: var(--navbar-height);
  padding: 8px 32px;
}
.navbar .logo {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.navbar .logo .logo-icon {
  width: 32px;
  height: 32px;
}
.navbar .logo .logo-icon img {
  width: 100%;
  height: 100%;
}
.navbar .logo .logo-text {
  color: #000;
}
.navbar .login-button {
  font-size: 14px;
}
@media screen and (max-width: 768px) {
  .navbar .logo .logo-text {
    display: none;
  }
}
</style>