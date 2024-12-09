<template>
  
</template>

<script lang="ts">
export default {
  name: 'Sidebar',
  props: ['connection'],
  setup(props: any) {
    const { connection } = props;

    return { connection };
  }
}
</script>

<style scoped>

</style>