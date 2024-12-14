<template>
  <div class="flex-between">
    <div class="flex-center color-input-display" :style="{ backgroundColor: color }"></div>
    <ColorPicker 
      :value="color"
      v-model="color"
      @input="updateColor"
      hidePalette
    />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import ColorPicker from 'lightvue/color-picker';
import './custom.css';

export default {
  name: 'ColorInput',
  props: ['color', 'updateColor'],
  components: { ColorPicker },
  setup(props: any) {
    const color = ref(props.color);

    watch(() => props.color, (newColor) => {
      color.value = newColor;
    });

    return { color };
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