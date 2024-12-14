<template>
  <div class="container">
    <iframe id="design-iframe" :src="src" frameborder="0" @mouseleave="handleIframeMouseLeave"></iframe>
    <!-- iframe document reference -->
    <div id="body-content-wrapper"></div>
    <div class="hover-outline">
      <div id="hover-outline-top" :style="{ top: `${hoverOutlineStyle.top}px`, left: `${hoverOutlineStyle.left}px`, width: `${hoverOutlineStyle.width}px`, height: '1.6px' }"></div>
      <div id="hover-outline-left" :style="{ top: `${hoverOutlineStyle.top}px`, left: `${hoverOutlineStyle.left}px`, width: '1.6px', height: `${hoverOutlineStyle.height}px` }"></div>
      <div id="hover-outline-right" :style="{ top: `${hoverOutlineStyle.top}px`, left: `${hoverOutlineStyle.left + hoverOutlineStyle.width}px`, width: '1.6px', height: `${hoverOutlineStyle.height}px` }"></div>
      <div id="hover-outline-bottom" :style="{ top: `${hoverOutlineStyle.top + hoverOutlineStyle.height}px`, left: `${hoverOutlineStyle.left}px`, width: `${hoverOutlineStyle.width + 1.6}px`, height: '1.6px' }"></div>
    </div>
    <div class="selected-outline">
      <div id="selected-outline-top" :style="{ top: `${selectedOutlineStyle.top - (isScrolling ? scrollTop : 0)}px`, left: `${selectedOutlineStyle.left}px`, width: `${selectedOutlineStyle.width}px`, height: '1px' }"></div>
      <div id="selected-outline-left" :style="{ top: `${selectedOutlineStyle.top - (isScrolling ? scrollTop : 0)}px`, left: `${selectedOutlineStyle.left}px`, width: '1px', height: `${selectedOutlineStyle.height}px` }"></div>
      <div id="selected-outline-right" :style="{ top: `${selectedOutlineStyle.top - (isScrolling ? scrollTop : 0)}px`, left: `${selectedOutlineStyle.left + selectedOutlineStyle.width}px`, width: '1px', height: `${selectedOutlineStyle.height}px` }"></div>
      <div id="selected-outline-bottom" :style="{ top: `${selectedOutlineStyle.top - (isScrolling ? scrollTop : 0) + selectedOutlineStyle.height}px`, left: `${selectedOutlineStyle.left}px`, width: `${selectedOutlineStyle.width + 1}px`, height: '1px' }"></div>
    </div>
  </div>

</template>

<script lang="ts">
import { toKebabCase } from '@/utils/helpers';
import { onMounted, onUnmounted, ref, watch } from 'vue';


export default {
  name: 'Canvas',
  props: ['src', 'styles', 'updateDesignProps'],
  setup(props: any) {
    const selectedElement = ref(null);
    const hoverOutlineStyle = ref({ top: -1, left: -1, width: 0, height: 0 });
    const selectedOutlineStyle = ref({ top: -1, left: -1, width: 0, height: 0 });
    const scrollTop = ref(0);
    const isScrolling = ref(false);

    watch(() => props.styles, (newStyles) => {
      let { widthUnit, heightUnit, width, height, ...styles } = newStyles;
      const iframe = document.getElementById('design-iframe') as HTMLIFrameElement;
      styles = Object.fromEntries(Object.entries(styles).map(([key, value]) => [toKebabCase(key), typeof value === 'number' ? `${value}px` : value]));
      styles.width = widthUnit === 'auto' ? 'auto' : `${width}${widthUnit}`;
      styles.height = heightUnit === 'auto' ? 'auto' : `${height}${heightUnit}`;
      styles['font-weight'] = Number(styles['font-weight']);
      const message = {
        action: 'applyStyles',
        element: selectedElement.value,
        styles: styles,
      }
      iframe.contentWindow?.postMessage(message, '*');
    });

    // event methods
    const handleIframeMessage = (e: MessageEvent) => {
      const data = e.data;
      const wrapper = document.getElementById('body-content-wrapper') as HTMLElement;
      wrapper.innerHTML = data.body;
      // hovering
      if (data.event === 'mousemove') {
        const element = wrapper.querySelector(data.element);
        if (element && data.outlineStyle) {
          hoverOutlineStyle.value = data.outlineStyle;
        } else {
          hoverOutlineStyle.value = { top: -1, left: -1, width: 0, height: 0 };
        }
      } // selecting
      else if (data.event === 'mousedown') {
        props.updateDesignProps(data);
        selectedElement.value = data.element;
        selectedOutlineStyle.value = { ...hoverOutlineStyle.value };
        selectedOutlineStyle.value.top += scrollTop.value;
      } // scrolling
      else if (data.event === 'scroll') {
        scrollTop.value = data.scrollTop;
        isScrolling.value = ('html > body:nth-child(2) > ' + selectedElement.value).includes(data.element);        
      } // update style
      else if (data.event === 'updateStyle') {
        selectedOutlineStyle.value = { ...data.outlineStyle };
        selectedOutlineStyle.value.top += scrollTop.value;
      }
    }

    // mouse leave iframe
    const handleIframeMouseLeave = () => {
      hoverOutlineStyle.value = { top: -1, left: -1, width: 0, height: 0 };
    }

    onMounted(() => {
      window.addEventListener('message', handleIframeMessage);
    })
    onUnmounted(() => {
      window.removeEventListener('message', handleIframeMessage);
    })
    return { hoverOutlineStyle, selectedOutlineStyle, isScrolling, scrollTop, handleIframeMouseLeave };
  }
}
</script>

<style scoped>  
.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
#design-iframe {
  width: 100%;
  height: 100%;
}
#body-content-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.hover-outline, .selected-outline {
  width: 0;
  height: 0;
}
.hover-outline > *, .selected-outline > * {
  position: absolute;
  z-index: 5;
  transition: none;
  background: #4ca;
}
</style>