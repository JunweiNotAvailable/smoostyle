<template>
  <div class="browser-view">
    
  </div>
</template>

<script>
export default {
  name: 'BrowserView',
  mounted() {
    this.$router.push({ name: 'Design' });
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