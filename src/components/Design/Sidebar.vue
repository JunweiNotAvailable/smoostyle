<template>
  <div class="sidebar-header">
    <button @click="toggleSidebar" class="sidebar-button sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
  </div>
  <div class="sidebar-body">
    <div class="style-title">SELECTED ELEMENT</div>
    <!-- COLORS -->
    <div class="style-title">COLORS</div>
    <div class="flex-between style-tool"><div>Background</div><ColorInput :color="styles.bgColor" /></div>
    <div class="flex-between style-tool"><div>Text</div><ColorInput :color="styles.textColor" /></div>
    <div class="flex-between style-tool"><div>Border</div><ColorInput :color="styles.borderColor" /></div>
    <!-- SHAPES -->
    <div class="style-title">SHAPES</div>
    <div class="flex-between style-tool"><div>Width</div><div class="flex-center"><input type="number" v-model="styles.width" style="margin-right: 8px; width: 80px;"><Dropdown :id="'width-unit-dropdown'" :width="'40px'" :options="['px', '%', 'vw']" :selected="styles.widthUnit" :onSelect="(value: string) => styles.widthUnit = value"/></div></div>
    <div class="flex-between style-tool"><div>Height</div><div class="flex-center"><input type="number" v-model="styles.height" style="margin-right: 8px; width: 80px;"><Dropdown :id="'height-unit-dropdown'" :width="'40px'" :options="['px', '%', 'vh']" :selected="styles.heightUnit" :onSelect="(value: string) => styles.heightUnit = value"/></div></div>
    <div class="flex-between style-tool"><div>Border width</div><input type="number" v-model="styles.borderWidth"></div>
    <div class="flex-between style-tool"><div>Border style</div><Dropdown :id="'border-style-dropdown'" :width="'100px'" :options="['solid', 'dashed', 'dotted']" :selected="styles.borderStyle" :onSelect="(value: string) => styles.borderStyle = value"/></div>
    <div class="flex-between style-tool"><div>Border radius</div><input type="number" v-model="styles.borderRadius"></div>
    <!-- FONT -->
    <div class="style-title">FONT</div>
    <div class="flex-between style-tool"><div>Style</div><Dropdown :id="'font-style-dropdown'" :width="'100px'" :options="['normal', 'underline', 'line-through', 'overline']" :selected="styles.fontStyle" :onSelect="(value: string) => styles.fontStyle = value"/></div>
    <div class="flex-between style-tool"><div>Weight</div><Dropdown :id="'font-weight-dropdown'" :width="'100px'" :options="['lighter', 'normal', 'bold', 'bolder']" :selected="styles.fontWeight" :onSelect="(value: string) => styles.fontWeight = value"/></div>
    <div class="flex-between style-tool"><div>Size</div><input type="number" v-model="styles.fontSize"></div>
  </div>

  <!-- block -->
  <!-- <div v-if="!isConnected" class="sidebar-block"></div> -->
</template>

<script lang="ts">
import { addIcons } from 'oh-vue-icons';
import { ref } from 'vue';
import { BiLayoutSidebarReverse } from 'oh-vue-icons/icons';
import ColorInput from './ColorInput.vue';
import Dropdown from './Dropdown.vue';

addIcons(BiLayoutSidebarReverse);

export default {
  name: 'Sidebar',
  props: ['isConnected', 'toggleSidebar'],
  components: { ColorInput, Dropdown },
  setup() {
    // const 
    const styles = ref({
      bgColor: '#000000',
      textColor: '#000000',
      borderColor: '#000000',
      width: 0,
      height: 0,
      widthUnit: 'px',
      heightUnit: 'px',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14
    });

    return { styles };
  }
}
</script>

<style scoped>
.sidebar-header {
  padding: 8px;
}
.sidebar-button:hover {
  background: var(--style-input-color);
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
  padding: 4px 16px 4px 8px;
  margin-top: 8px;
}
.style-tool {
  color: #888;
  font-size: 12px;
  padding: 4px 16px 4px 8px;
}
.style-tool input {
  background: var(--style-input-color);
  border: none;
  border-radius: .4rem;
  padding: 4px 8px;
  width: 100px;
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