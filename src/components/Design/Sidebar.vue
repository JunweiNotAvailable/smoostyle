<template>
  <div class="sidebar-header flex-between">
    <button @click="toggleSidebar" class="sidebar-button sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
    <div class="menu-button-container">
      <button @click="showMenu = !showMenu" class="menu-button">
        <div v-if="user.username">{{ user.username?.[0] }}</div>
        <div v-else><v-icon scale="0.8" name="hi-menu-alt-4" /></div>
      </button>
      <div class="menu-popup" v-if="showMenu">
        <button @click="() => {$router.push({ name: 'Settings' }); showMenu = false;}">Settings</button>
        <button @click="logout">Log out</button>
      </div>
    </div>
  </div>
  <div class="sidebar-body">
    <!-- COLORS -->
    <div class="style-title">COLORS</div>
    <div class="flex-between style-tool"><div>Background</div><ColorInput :color="styles.backgroundColor" :updateColor="(color: string) => updateStyle('backgroundColor', color)" /></div>
    <div class="flex-between style-tool"><div>Text</div><ColorInput :color="styles.color" :updateColor="(color: string) => updateStyle('color', color)" /></div>
    <div class="flex-between style-tool"><div>Border</div><ColorInput :color="styles.borderColor" :updateColor="(color: string) => updateStyle('borderColor', color)" /></div>
    <!-- SHAPES -->
    <div class="style-title">SHAPES</div>
    <div class="flex-between style-tool"><div>Width</div><div class="flex-center"><input type="number" :value="styles.width" @change="updateStyle('width', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;" :readonly="styles.widthUnit === 'auto'"><Dropdown :id="'width-unit-dropdown'" :width="'60px'" :options="['auto', 'px', '%', 'vw']" :selected="styles.widthUnit" :onSelect="(value: string) => updateStyle('widthUnit', value)"/></div></div>
    <div class="flex-between style-tool"><div>Height</div><div class="flex-center"><input type="number" :value="styles.height" @change="updateStyle('height', Number(($event.target as HTMLInputElement).value))" style="margin-right: 8px; width: 60px;" :readonly="styles.heightUnit === 'auto'"><Dropdown :id="'height-unit-dropdown'" :width="'60px'" :options="['auto', 'px', '%', 'vh']" :selected="styles.heightUnit" :onSelect="(value: string) => updateStyle('heightUnit', value)"/></div></div>
    <div class="flex-between style-tool"><div>Border width</div><input type="number" :value="styles.borderWidth" @change="updateStyle('borderWidth', Number(($event.target as HTMLInputElement).value))"></div>
    <div class="flex-between style-tool"><div>Border style</div><Dropdown :id="'border-style-dropdown'" :width="'100px'" :options="['solid', 'dashed', 'dotted']" :selected="styles.borderStyle" :onSelect="(value: string) => updateStyle('borderStyle', value)"/></div>
    <div class="flex-between style-tool"><div>Border radius</div><input type="number" :value="styles.borderRadius" @change="updateStyle('borderRadius', Number(($event.target as HTMLInputElement).value))"></div>
    <!-- FONT -->
    <div class="style-title">FONT</div>
    <div class="flex-between style-tool"><div>Style</div><Dropdown :id="'font-style-dropdown'" :width="'100px'" :options="['normal', 'underline', 'line-through', 'overline']" :selected="styles.textDecoration" :onSelect="(value: string) => updateStyle('textDecoration', value)"/></div>
    <div class="flex-between style-tool"><div>Weight</div><Dropdown :id="'font-weight-dropdown'" :width="'100px'" :options="['300', '400', '500', '600', '700', '800']" :selected="styles.fontWeight" :onSelect="(value: string) => updateStyle('fontWeight', value)"/></div>
    <div class="flex-between style-tool"><div>Size</div><input type="number" :value="styles.fontSize" @change="updateStyle('fontSize', Number(($event.target as HTMLInputElement).value))"></div>
    <!-- SPACING -->
    <div class="style-title">SPACING</div>
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
  </div>

  <!-- block -->
  <div v-if="!isConnected" class="sidebar-block"></div>
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
  props: ['styles', 'toggleSidebar', 'isConnected'],
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