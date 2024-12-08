<template>
  <Navbar/>
  <div class="content">
    <!-- hero section -->
    <section class="hero">
      <h1>Design your website without leaving your browser.</h1>
      <p>Make changes directly on your page and sync them with your project files. Visually edit your website in real-time.</p>
      <button class="primary-button">Get started</button>
    </section>
    <!-- movie section -->
    <!--  -->
  </div>
  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Landing',
  components: { Navbar, Footer },
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
section.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
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
</style>