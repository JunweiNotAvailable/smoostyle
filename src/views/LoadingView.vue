<template>
  <main class="flex-center">
    <Loading :size="size" :color="color"/>
  </main>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'LoadingView',
  components: {
    Loading,
  },
  data() {
    return {
      size: 32,
      color: '#4ca',
    }
  }
}
</script>

<style scoped>

</style>