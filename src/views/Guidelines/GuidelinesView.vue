<template>
  <div class="guidelines-view">
    <Navbar/>
    <div class="content">
      <aside>
        <div class="subtitle">Getting started</div>
        <button :class="{ 'selected': !g || g === 'set-up-a-connection' }" @click="$router.push({ name: 'Guidelines', query: { g: 'set-up-a-connection' } })">Set Up a Connection</button>
      </aside>
      <main>
        <SetUpAConnection v-if="!g || g === 'set-up-a-connection'" />
      </main>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import SetUpAConnection from '@/components/Guidelines/SetUpAConnection.vue';

export default {
  name: 'GuidelinesView',
  components: { Navbar, Footer, SetUpAConnection },
  setup() {
    const route = useRoute();
    const g = computed(() => route.query.g);
    
    return { g };
  }
}
</script>

<style>
.guidelines-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.guidelines-view .content {
  flex: 1;
  display: flex;
}
/* sidebar */
.guidelines-view .content aside {
  width: var(--sidebar-width);
  height: calc(100svh - var(--navbar-height));
  position: sticky;
  top: var(--navbar-height);
  border-right: 1px solid #f0f0f0;
  overflow: auto;
}
.guidelines-view .content aside .subtitle {
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 8px;
  margin-top: 8px;
}
.guidelines-view .content aside button {
  width: 100%;
  text-align: left;
  padding: 4px 16px;
  font-size: 13px;
  border: none;
  background: none;
  cursor: pointer;
}
.guidelines-view .content aside button.selected {
  background: #00000008;
  font-weight: 600;
  color: var(--app-color);
}
.guidelines-view .content aside button:hover {
  background: #00000008;
  font-weight: 600;
}
/* main */
.guidelines-view .content main {
  flex: 1;
}
.guidelines-content {
  padding: 32px;
}
.guidelines-content h1 {
  margin: 0;
  font-size: 28px;
}
.guidelines-content h2 {
  margin: 16px 0;
  font-weight: 500;
  font-size: 20px;
}
</style>