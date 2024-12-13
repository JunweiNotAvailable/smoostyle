<template>
  <div class="flex-between">
    <div class="flex-center color-input-display" @click="handleClick" :style="{ backgroundColor: color }"></div>
    <ColorPicker 
      :value="color"
      v-model="color"
      hidePalette
    />
  </div>
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

    watch(() => props.color, (newColor) => {
      color.value = newColor;
    });
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const input = (target.nextSibling as HTMLElement);
      input.click();
    }

    return { color, handleClick };
  }
}
</script>

<style scoped>
.color-input-display {
  width: 16px;
  height: 16px;
  border-radius: .25rem;
  margin-right: 8px;
}
</style>