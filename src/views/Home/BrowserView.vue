<template>
  <div class="browser-view">
    
  </div>
</template>

<script>
import router from '@/router';
import { nextTick, onMounted } from 'vue';

export default {
  name: 'BrowserView',
  setup() {
    onMounted(() => {
      nextTick(() => {
        router.push({ name: 'Design' });
      })
    })
  }
}
</script>

<style scoped>
.browser-view {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>