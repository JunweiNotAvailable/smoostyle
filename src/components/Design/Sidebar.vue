<template>
  <div class="sidebar-header">
    <button @click="toggleSidebar" class="sidebar-button sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
  </div>

  <!-- block -->
  <div v-if="!isConnected" class="sidebar-block"></div>
</template>

<script lang="ts">
import { addIcons } from 'oh-vue-icons';
import { BiLayoutSidebarReverse } from 'oh-vue-icons/icons';

addIcons(BiLayoutSidebarReverse);

export default {
  name: 'Sidebar',
  props: ['isConnected', 'toggleSidebar'],
  setup(props: any) {
    return { ...props };
  }
}
</script>

<style scoped>
.sidebar-header {
  padding: 8px;
}
.sidebar-button:hover {
  background: #00000008;
}
.sidebar-toggle-button {
  width: 32px;
  height: 32px;
  border-radius: .4rem;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
}

.sidebar-block {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: calc(100% - 48px);
  background: #fffc;
}
</style>