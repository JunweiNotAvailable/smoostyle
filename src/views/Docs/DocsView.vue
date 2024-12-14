<template>
  <div class="docs-view">
    <Navbar :toggleLoginForm="toggleLoginForm"/>
    <div class="content">
      <aside>
        <div class="subtitle">Getting started</div>
        <button :class="{ 'selected': !g || g === 'set-up-a-connection' }" @click="$router.push({ name: 'Docs', query: { g: 'set-up-a-connection' } })">Set Up a Connection</button>
      </aside>
      <main>
        <SetUpAConnection v-if="!g || g === 'set-up-a-connection'" />
      </main>
    </div>
    <Footer/>
  </div>

  <!-- Dialogs -->
  <LoginForm v-if="showLoginForm" :closeLoginForm="closeLoginForm"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import SetUpAConnection from '@/components/Docs/SetUpAConnection.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'DocsView',
  components: { Navbar, Footer, SetUpAConnection, LoginForm },
  setup() {
    const route = useRoute();
    const g = computed(() => route.query.g);
    const showLoginForm = ref(false);

    const toggleLoginForm = () => showLoginForm.value = true;
    const closeLoginForm = () => showLoginForm.value = false;

    const handleClick = (e) => {
      const target = e.target;
      if (!target.closest('.dialog') && !target.closest('.login-button')) showLoginForm.value = false;
    };

    onMounted(() => document.addEventListener('click', handleClick));
    onUnmounted(() => document.removeEventListener('click', handleClick));

    return { g, showLoginForm, toggleLoginForm, closeLoginForm };
  }
}
</script>

<style>
.docs-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.docs-view .content {
  flex: 1;
  display: flex;
}
/* sidebar */
.docs-view .content aside {
  width: var(--sidebar-width);
  height: calc(100svh - var(--navbar-height));
  position: sticky;
  top: var(--navbar-height);
  border-right: 1px solid #f0f0f0;
  overflow: auto;
}
.docs-view .content aside .subtitle {
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 8px;
  margin-top: 8px;
}
.docs-view .content aside button {
  width: 100%;
  text-align: left;
  padding: 4px 16px;
  font-size: 13px;
  border: none;
  background: none;
  cursor: pointer;
}
.docs-view .content aside button.selected {
  background: #00000008;
  font-weight: 600;
  color: var(--app-color);
}
.docs-view .content aside button:hover {
  background: #00000008;
  font-weight: 600;
}
/* main */
.docs-view .content main {
  flex: 1;
}
.docs-content {
  padding: 32px;
}
.docs-content h1 {
  margin: 0;
  font-size: 24px;
}
.docs-content h2 {
  margin: 16px 0;
  margin-top: 32px;
  font-weight: 500;
  font-size: 18px;
}
</style>