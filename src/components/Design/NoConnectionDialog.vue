<template>
  <div class="dialog small">
    <p>No connection between the browser and your project. <br>Read the guidelines to set up a connection.</p>
    <div class="flex">
      <div @click="$router.push({ name: 'Guidelines' })" class="link-button pointer flex-center">Guidelines<v-icon name="pr-arrow-up-right" /></div>
    </div>
  </div>
</template>

<script>
import { addIcons } from 'oh-vue-icons';
import { PrArrowUpRight } from 'oh-vue-icons/icons';

addIcons(PrArrowUpRight);

export default {
  name: 'NoConnectionDialog',
}
</script>

<style scoped>
.dialog {
  border: 1px solid #eee;
}
p {
  font-size: 12px;
  margin: 0;
  line-height: 1.5;
  color: #888;
}
.link-button {
  margin-top: 16px;
  font-size: 14px;
}
</style>