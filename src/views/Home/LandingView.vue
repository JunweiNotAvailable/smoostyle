<template>
  <Navbar :toggleLoginForm="toggleLoginForm"/>
  <div class="content">
    <!-- hero section -->
    <section class="hero">
      <h1>Design your website without leaving your browser.</h1>
      <p>Make changes directly on your page and sync them with your project files. Visually edit your website in real-time.</p>
      <button @click="toggleLoginForm" class="login-button primary-button">Get started</button>
    </section>
    <!-- movie section -->
    <section class="movie">
      <div class="movie-container">
        <video autoplay muted loop>
          <source src="@/assets/demo.mp4" type="video/mp4">
        </video>
      </div>
    </section>
  </div>
  <Footer/>

  <!-- Dialogs -->
  <LoginForm v-if="showLoginForm" :closeLoginForm="closeLoginForm"/>

</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LandingView',
  components: { Navbar, Footer, LoginForm },
  setup() {
    const showLoginForm = ref(false);

    const toggleLoginForm = () => showLoginForm.value = true;
    const closeLoginForm = () => showLoginForm.value = false;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dialog') && !target.closest('.login-button')) showLoginForm.value = false;
    };

    onMounted(() => document.addEventListener('click', handleClick));
    onUnmounted(() => document.removeEventListener('click', handleClick));

    return { showLoginForm, toggleLoginForm, closeLoginForm };
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
section {
  padding: 32px;
}
section.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
section.hero h1 {
  font-size: 64px;
  font-weight: 400;
  max-width: 800px;
  text-align: center;
}
section.hero p {
  padding: 0;
  margin: 0;
  font-size: 24px;
  font-weight: 300;
  max-width: 960px;
  text-align: center;
}
section.hero .primary-button {
  margin-top: 40px;
  font-size: 18px;
  padding: 12px 24px;
}
section .movie-container {
  overflow: hidden;
  box-shadow: 0px 0px 8px 0px #0001;
  border-radius: 1.5rem;
  display: flex;
  align-items: start;
  justify-content: center;
  aspect-ratio: 192/101;
}
section .movie-container video {
  width: 101%;
  height: 101%;
  object-fit: cover;
  object-position: center;
}
@media screen and (max-width: 768px) {
  section {
    padding: 16px;
  }
  section.hero h1 {
    font-size: 48px;
  }
  section.hero p {
    font-size: 20px;
  }
  section.hero .primary-button {
    font-size: 16px;
  }
  section .movie-container {
    aspect-ratio: 160/101;
    justify-content: end;
  }
  section .movie-container video {
    object-position: right;
  }
}
</style>