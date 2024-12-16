<template>
  <div class="sidebar-header flex-between">
    <button @click="toggleSidebar" class="sidebar-button sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
    <div class="menu-button-container">
      <button @click="showMenu = !showMenu" class="menu-button">
        <div v-if="user.username">{{ user.username?.[0] }}</div>
        <div v-else><v-icon scale="0.8" name="hi-menu-alt-4" /></div>
      </button>
      <div class="menu-popup" v-if="showMenu">
        <button @click="logout">Log out</button>
      </div>
    </div>
  </div>
  <div class="sidebar-body">
    <!-- SELECTED ELEMENT -->
    <div class="style-title">SELECTED ELEMENT</div>
    <div class="style-tool">{{ selectedElement }}</div>
    <!-- POSITION -->
    <div class="style-title">POSITION</div>
    <div class="flex-between style-tool"><div>Position</div><Dropdown :id="'position-dropdown'" :width="'100px'" :options="['absolute', 'fixed', 'relative', 'static', 'sticky']" v-model:selected="styles.position" :onSelect="(value: string) => updateStyle('position', value)" :key="styles.position"/></div>
    <div class="flex-between style-tool"><div>Top</div><div class="flex-center"><input type="number" :value="styles.top" @change="updateStyle('top', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;"><Dropdown :id="'top-unit-dropdown'" :width="'60px'" :options="['px', '%']" v-model:selected="styles.topUnit" :onSelect="(value: string) => updateStyle('topUnit', value)" :key="styles.topUnit"/></div></div>
    <div class="flex-between style-tool"><div>Right</div><div class="flex-center"><input type="number" :value="styles.right" @change="updateStyle('right', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;"><Dropdown :id="'right-unit-dropdown'" :width="'60px'" :options="['px', '%']" v-model:selected="styles.rightUnit" :onSelect="(value: string) => updateStyle('rightUnit', value)" :key="styles.rightUnit"/></div></div>
    <div class="flex-between style-tool"><div>Bottom</div><div class="flex-center"><input type="number" :value="styles.bottom" @change="updateStyle('bottom', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;"><Dropdown :id="'bottom-unit-dropdown'" :width="'60px'" :options="['px', '%']" v-model:selected="styles.bottomUnit" :onSelect="(value: string) => updateStyle('bottomUnit', value)" :key="styles.bottomUnit"/></div></div>
    <div class="flex-between style-tool"><div>Left</div><div class="flex-center"><input type="number" :value="styles.left" @change="updateStyle('left', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;"><Dropdown :id="'left-unit-dropdown'" :width="'60px'" :options="['px', '%']" v-model:selected="styles.leftUnit" :onSelect="(value: string) => updateStyle('leftUnit', value)" :key="styles.leftUnit"/></div></div>
    <!-- ALIGNMENT -->
    <div class="style-title">ALIGNMENT</div>
    <div class="flex-between style-tool"><div>Display</div><Dropdown :id="'display-dropdown'" :width="'100px'" :options="['block', 'flex', 'none']" v-model:selected="styles.display" :onSelect="(value: string) => updateStyle('display', value)" :key="styles.display"/></div>
    <div class="flex-between style-tool"><div>Flex direction</div><Dropdown :id="'flex-direction-dropdown'" :width="'100px'" :options="['row', 'column']" v-model:selected="styles.flexDirection" :onSelect="(value: string) => updateStyle('flexDirection', value)" :key="styles.flexDirection"/></div>
    <div class="flex-between style-tool"><div></div>
      <div class="flex">
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '90deg' : '0deg' }" @click="updateStyle('justifyContent', 'space-between')" :class="styles.justifyContent === 'space-between' ? 'selected' : ''"><img src="@/assets/justify-between.svg" alt="justify-between"></button>
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '90deg' : '0deg' }" @click="updateStyle('justifyContent', 'start')" :class="styles.justifyContent === 'start' ? 'selected' : ''"><img src="@/assets/justify-start.svg" alt="justify-start"></button>
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '90deg' : '0deg' }" @click="updateStyle('justifyContent', 'center')" :class="styles.justifyContent === 'center' ? 'selected' : ''"><img src="@/assets/justify-center.svg" alt="justify-center"></button>
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '90deg' : '0deg' }" @click="updateStyle('justifyContent', 'end')" :class="styles.justifyContent === 'end' ? 'selected' : ''"><img src="@/assets/justify-end.svg" alt="justify-end"></button>
      </div>
    </div>
    <div class="flex-between style-tool"><div></div>
      <div class="flex">
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '-90deg' : '0deg' }" @click="updateStyle('alignItems', 'start')" :class="styles.alignItems === 'start' ? 'selected' : ''"><img src="@/assets/align-start.svg" alt="align-start"></button>
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '-90deg' : '0deg' }" @click="updateStyle('alignItems', 'center')" :class="styles.alignItems === 'center' ? 'selected' : ''"><img src="@/assets/align-center.svg" alt="align-center"></button>
        <button class="style-tool-button" :style="{ rotate: styles.flexDirection === 'column' ? '-90deg' : '0deg' }" @click="updateStyle('alignItems', 'end')" :class="styles.alignItems === 'end' ? 'selected' : ''"><img src="@/assets/align-end.svg" alt="align-end"></button>
      </div>
    </div>
    <!-- COLOR -->
    <div class="style-title">COLOR</div>
    <div class="flex-between style-tool"><div>Background</div><ColorInput :color="styles.backgroundColor" :updateColor="(color: string) => updateStyle('backgroundColor', color)" /></div>
    <div class="flex-between style-tool"><div>Text</div><ColorInput :color="styles.color" :updateColor="(color: string) => updateStyle('color', color)" /></div>
    <div class="flex-between style-tool"><div>Border</div><ColorInput :color="styles.borderColor" :updateColor="(color: string) => updateStyle('borderColor', color)" /></div>
    <!-- FONT -->
    <div class="style-title">FONT</div>
    <div class="flex-between style-tool"><div>Style</div><Dropdown :id="'font-style-dropdown'" :width="'100px'" :options="['normal', 'underline', 'line-through', 'overline']" v-model:selected="styles.textDecoration" :onSelect="(value: string) => updateStyle('textDecoration', value)" :key="styles.textDecoration"/></div>
    <div class="flex-between style-tool"><div>Weight</div><Dropdown :id="'font-weight-dropdown'" :width="'100px'" :options="['300', '400', '500', '600', '700', '800']" v-model:selected="styles.fontWeight" :onSelect="(value: string) => updateStyle('fontWeight', value)" :key="styles.fontWeight"/></div>
    <div class="flex-between style-tool"><div>Size</div><input type="number" :value="styles.fontSize" @change="updateStyle('fontSize', Number(($event.target as HTMLInputElement).value))"></div>
    <!-- SPACING -->
    <div class="style-title">SPACING</div>
    <div class="flex-between style-tool"><div>Width</div><div class="flex-center"><input type="number" :value="styles.width" @change="updateStyle('width', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;" :readonly="styles.widthUnit === 'auto'"><Dropdown :id="'width-unit-dropdown'" :width="'60px'" :options="['auto', 'px', '%', 'vw']" v-model:selected="styles.widthUnit" :onSelect="(value: string) => updateStyle('widthUnit', value)" :key="styles.widthUnit"/></div></div>
    <div class="flex-between style-tool"><div>Height</div><div class="flex-center"><input type="number" :value="styles.height" @change="updateStyle('height', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;" :readonly="styles.heightUnit === 'auto'"><Dropdown :id="'height-unit-dropdown'" :width="'60px'" :options="['auto', 'px', '%', 'vh']" v-model:selected="styles.heightUnit" :onSelect="(value: string) => updateStyle('heightUnit', value)" :key="styles.heightUnit"/></div></div>
    <div class="flex-between style-tool">
      <div>Padding</div>
      <div class="spacing-tool">
        <div class="flex">
          <div class="flex-center"><div class="side-icon padding left"></div><input class="left" type="number" @change="handlePaddingChange" :value="paddings.left"></div>
          <div class="flex-center"><div class="side-icon padding top"></div><input class="top" type="number" @change="handlePaddingChange" :value="paddings.top"></div>
        </div>
        <div class="flex">
          <div class="flex-center"><div class="side-icon padding right"></div><input class="right" type="number" @change="handlePaddingChange" :value="paddings.right"></div>
          <div class="flex-center"><div class="side-icon padding bottom"></div><input class="bottom" type="number" @change="handlePaddingChange" :value="paddings.bottom"></div>
        </div>
      </div>
    </div>
    <div class="flex-between style-tool">
      <div>Margin</div>
      <div class="spacing-tool">
        <div class="flex">
          <div class="flex-center"><div class="side-icon margin left"></div><input class="left" type="number" @change="handleMarginChange" :value="margins.left"></div>
          <div class="flex-center"><div class="side-icon margin top"></div><input class="top" type="number" @change="handleMarginChange" :value="margins.top"></div>
        </div>
        <div class="flex">
          <div class="flex-center"><div class="side-icon margin right"></div><input class="right" type="number" @change="handleMarginChange" :value="margins.right"></div>
          <div class="flex-center"><div class="side-icon margin bottom"></div><input class="bottom" type="number" @change="handleMarginChange" :value="margins.bottom"></div>
        </div>
      </div>
    </div>
    <!-- SHAPE -->
    <div class="style-title">SHAPE</div>
    <div class="flex-between style-tool"><div>Border width</div><input type="number" :value="styles.borderWidth" @change="updateStyle('borderWidth', Number(($event.target as HTMLInputElement).value))"></div>
    <div class="flex-between style-tool"><div>Border style</div><Dropdown :top="true" :id="'border-style-dropdown'" :width="'100px'" :options="['solid', 'dashed', 'dotted']" v-model:selected="styles.borderStyle" :onSelect="(value: string) => updateStyle('borderStyle', value)" :key="styles.borderStyle"/></div>
    <div class="flex-between style-tool"><div>Border radius</div><input type="number" :value="styles.borderRadius" @change="updateStyle('borderRadius', Number(($event.target as HTMLInputElement).value))"></div>
    <!-- OVERFLOW -->
    <div class="style-title">OVERFLOW</div>
    <div class="flex-between style-tool"><div>Overflow</div><Dropdown :top="true" :id="'overflow-dropdown'" :width="'100px'" :options="['auto', 'visible', 'hidden', 'scroll']" v-model:selected="styles.overflow" :onSelect="(value: string) => updateStyle('overflow', value)" :key="styles.overflow"/></div>
  </div>

  <!-- block -->
  <!-- <div v-if="!isConnected" class="sidebar-block"></div> -->
</template>

<script lang="ts">
import { addIcons } from 'oh-vue-icons';
import { BiLayoutSidebarReverse, HiMenuAlt4 } from 'oh-vue-icons/icons';
import ColorInput from './ColorInput.vue';
import Dropdown from './Dropdown.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { constants } from '@/utils/helpers';

addIcons(BiLayoutSidebarReverse, HiMenuAlt4);

export default {
  name: 'Sidebar',
  components: { ColorInput, Dropdown },
  props: ['styles', 'toggleSidebar', 'isConnected', 'selectedElement'],
  emits: ['update:styles'],
  setup(props: any, { emit }: any) {
    const store = useStore();
    const user = ref(store.state.user);
    const showMenu = ref(false);
    const paddings = ref({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
    const margins = ref({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });

    watch(() => props.styles.padding, (newPadding) => {
      const ps = newPadding.split(' ').map((s: string) => s.replace('px', ''));
      if (ps.length === 1) {
        paddings.value.top = paddings.value.right = paddings.value.bottom = paddings.value.left = parseInt(ps[0]);
      } else if (ps.length === 2) {
        paddings.value.top = paddings.value.bottom = parseInt(ps[0]);
        paddings.value.left = paddings.value.right = parseInt(ps[1]);
      } else if (ps.length === 3) {
        paddings.value.top = parseInt(ps[0]);
        paddings.value.left = paddings.value.right = parseInt(ps[1]);
        paddings.value.bottom = parseInt(ps[2]);
      } else if (ps.length === 4) {
        paddings.value.top = parseInt(ps[0]);
        paddings.value.right = parseInt(ps[1]);
        paddings.value.bottom = parseInt(ps[2]);
        paddings.value.left = parseInt(ps[3]);
      }
    });

    watch(() => props.styles.margin, (newMargin) => {
      const ms = newMargin.split(' ').map((s: string) => s.replace('px', ''));
      if (ms.length === 1) {
        margins.value.top = margins.value.right = margins.value.bottom = margins.value.left = parseInt(ms[0]);
      } else if (ms.length === 2) {
        margins.value.top = margins.value.bottom = parseInt(ms[0]);
        margins.value.left = margins.value.right = parseInt(ms[1]);
      } else if (ms.length === 3) {
        margins.value.top = parseInt(ms[0]);
        margins.value.left = margins.value.right = parseInt(ms[1]);
        margins.value.bottom = parseInt(ms[2]);
      } else if (ms.length === 4) {
        margins.value.top = parseInt(ms[0]);
        margins.value.right = parseInt(ms[1]);
        margins.value.bottom = parseInt(ms[2]);
        margins.value.left = parseInt(ms[3]);
      }
    });

    const handlePaddingChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = Number(target.value) || 0;
      if (target.classList.contains('top')) {
        paddings.value.top = value;
      } else if (target.classList.contains('right')) {
        paddings.value.right = value;
      } else if (target.classList.contains('bottom')) {
        paddings.value.bottom = value;
      } else if (target.classList.contains('left')) {
        paddings.value.left = value;
      }
      const newPadding = `${paddings.value.top}px ${paddings.value.right}px ${paddings.value.bottom}px ${paddings.value.left}px`;
      updateStyle('padding', newPadding);
    }

    const handleMarginChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = Number(target.value) || 0;
      if (target.classList.contains('top')) {
        margins.value.top = value;
      } else if (target.classList.contains('right')) {
        margins.value.right = value;
      } else if (target.classList.contains('bottom')) {
        margins.value.bottom = value;
      } else if (target.classList.contains('left')) {
        margins.value.left = value;
      }
      const newMargin = `${margins.value.top}px ${margins.value.right}px ${margins.value.bottom}px ${margins.value.left}px`;
      updateStyle('margin', newMargin);
    }

    const updateStyle = (key: string, value: string | number) => {
      const updatedStyles = { ...props.styles, [key]: value };
      emit('update:styles', updatedStyles);
    };

    // handle click events
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu-button') && !target.closest('.menu-popup')) showMenu.value = false;
    }

    const logout = () => {
      store.dispatch('setUser', null);
      localStorage.removeItem(constants.appName + '_user_id');
      showMenu.value = false;
    }

    onMounted(() => document.addEventListener('click', handleClick));
    onUnmounted(() => document.removeEventListener('click', handleClick));

    return { user, showMenu, margins, paddings, handlePaddingChange, handleMarginChange, updateStyle, logout };
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
  padding-bottom: 16px;
}
.sidebar-body::-webkit-scrollbar {
  width: 8px;
  background: none;
}
.sidebar-body::-webkit-scrollbar-thumb {
  background: #0003;
  border-radius: 1rem;
  border: 2px solid transparent;
  background-clip: padding-box;
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
.style-tool input[readonly] {
  color: #888;
}
.style-tool-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  border-radius: .4rem;
  margin: 0 4px;
}
.style-tool-button.selected, .style-tool-button:hover {
  background: var(--style-input-color);
}
.style-tool-button img {
  width: 56%;
  height: 56%;
}
.spacing-tool {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.side-icon {
  width: 14px;
  height: 14px;
  border: 1px dotted #aaa;
  border-radius: .1rem;
  border-top: 2px solid #888;
}
.side-icon.left {
  rotate: -90deg;
}
.side-icon.right {
  rotate: 90deg;
}
.side-icon.bottom {
  rotate: 180deg;
}
.spacing-tool input {
  width: 50px;
  margin: 4px;
}
.spacing-tool input::-webkit-outer-spin-button,
.spacing-tool input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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