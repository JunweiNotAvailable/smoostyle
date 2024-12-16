<template>
  <div class="not-found">
    <div class="not-found-message">The page you are looking for does not exist.</div>
    <button @click="$router.push({ name: 'Home' })" class="primary-button">Back to home</button>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
}
</script>

<style scoped>
.not-found {
  width: 100vw;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.not-found-message {
  font-weight: 300;
  margin: 16px 0;
}
</style>