<template>
  <ColorPicker 
    :value="color"
    v-model="color" 
    hidePalette
  />
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import ColorPicker from 'lightvue/color-picker';
import './custom.css';

export default {
  name: 'ColorInput',
  props: ['color'],
  components: { ColorPicker },
  setup(props: any) {
    const color = ref(props.color);
    const showColorPicker = ref(false);

    watch(() => color.value, (value) => {
      props.color = value;
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.color-input-display') && !target.closest('.color-input-popup')) showColorPicker.value = false;
    }
    onMounted(() => {
      document.addEventListener('click', handleClick);
    });
    onUnmounted(() => {
      document.removeEventListener('click', handleClick);
    });

    return { color, showColorPicker };
  }
}
</script>

<style scoped>
.color-input-container {
  display: flex;
  align-items: center;
}
.color-input-display {
  width: 16px;
  height: 16px;
  border-radius: .25rem;
  position: relative;
}
.color-input-popup {
  position: absolute;
  top: 0;
  right: 110%;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 2px 4px 8px 2px #0000000f;
  width: 200px;
  border-radius: .5rem;
  padding: 8px;
}
</style>