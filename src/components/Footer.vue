<template>
  <footer class="flex-center">
    <div>© 2024 {{ appName }}</div>
  </footer>
</template>

<script>
import { constants } from '@/utils/helpers';

export default {
  name: 'Footer',
  setup() {
    const appName = constants.appName;
    return { appName };
  }
}
</script>

<style scoped>
footer {
  padding: 16px;
  color: #aaa;
  font-weight: 300;
  font-size: 14px;
}
</style>