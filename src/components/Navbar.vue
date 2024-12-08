<template>
  <header class="navbar flex-between">
    <div class="logo pointer flex-center" @click="$router.push({ name: 'Home' })">
      <div class="logo-icon"><img src="@/assets/logo.svg" alt="logo"></div>
      <div class="logo-text">{{ constants.appName }}</div>
    </div>
    <nav>

    </nav>
    <button class="border-button">Log in</button>
  </header>
</template>

<script>
import { constants } from '@/utils/helpers';

export default {
  name: 'Navbar',
  setup() {
    return { constants };
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
  font-size: 20px;
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
.navbar .border-button {
  font-size: 16px;
}
@media screen and (max-width: 768px) {
  .navbar .logo .logo-text {
    display: none;
  }
}
</style>