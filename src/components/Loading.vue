<template>
  <div class="spinner" :style="{ width: size + 'px', height: size + 'px', border: '2px solid ' + color, borderTop: '2px solid transparent', borderRight: '2px solid transparent' }"></div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['size', 'color'],
}
</script>

<style scoped>
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #c8c8c8;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>