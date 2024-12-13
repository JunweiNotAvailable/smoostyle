<template>
  <div class="sidebar-header">
    <button @click="toggleSidebar" class="sidebar-button sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
  </div>
  <div class="sidebar-body">
    <!-- COLORS -->
    <div class="style-title">COLORS</div>
    <div class="flex-between style-tool"><div>Background</div><ColorInput :color="bgColor" /></div>
    <div class="flex-between style-tool"><div>Text</div><ColorInput :color="textColor" /></div>
    <div class="flex-between style-tool"><div>Border</div><ColorInput :color="borderColor" /></div>
    <!-- SHAPES -->
    <div class="style-title">SHAPES</div>
    <div class="flex-between style-tool"><div>Width</div></div>
    <div class="flex-between style-tool"><div>Height</div></div>
    <div class="flex-between style-tool"><div>Border Radius</div></div>
  </div>

  <!-- block -->
  <!-- <div v-if="!isConnected" class="sidebar-block"></div> -->
</template>

<script lang="ts">
import { addIcons } from 'oh-vue-icons';
import { BiLayoutSidebarReverse } from 'oh-vue-icons/icons';
import ColorInput from './ColorInput.vue';
import { ref } from 'vue';

addIcons(BiLayoutSidebarReverse);

export default {
  name: 'Sidebar',
  props: ['isConnected', 'toggleSidebar'],
  components: { ColorInput },
  setup() {
    const bgColor = ref('#000000');
    const textColor = ref('#000000');
    const borderColor = ref('#000000');

    return { bgColor, textColor, borderColor };
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
.sidebar-body {
  flex: 1;
  overflow: auto;
}
.style-title {
  font-weight: 600;
  padding: 4px 8px;
  margin-top: 8px;
}
.style-tool {
  color: #888;
  font-size: 12px;
  padding: 4px 8px;
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