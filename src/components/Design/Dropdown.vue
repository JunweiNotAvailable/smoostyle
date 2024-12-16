<template>
  <div class="dropdown" :id="id" :style="{ width }">
    <button @click="showOptions = !showOptions">{{ selected }}<i class="fa-solid fa-angle-down"></i></button>
    <div class="dropdown-options" :class="{ 'top': top }" v-if="showOptions">
      <button v-for="option in options" @click="selectOption(option)" :class="{ 'selected': option === selected }">{{ option }}</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Dropdown',
  props: ['width', 'options', 'selected', 'onSelect', 'id', 'top'],
  emits: ['update:selected'],
  setup(props, { emit }) {
    const showOptions = ref(false);

    const selectOption = (option) => {
      emit('update:selected', option);
      props.onSelect(option);
      showOptions.value = false;
    }

    const handleClick = (e) => {
      if (!e.target.closest(`#${props.id}`)) showOptions.value = false;
    }

    onMounted(() => document.addEventListener('click', handleClick));
    onUnmounted(() => document.removeEventListener('click', handleClick));
    return { showOptions, selectOption };
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
}
.dropdown > button {
  border: 1px solid #f0f0f0;
  background: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: .4rem;
  padding: 4px 8px;
  width: 100%;
}
.dropdown > button i {
  font-size: 8px;
}
.dropdown-options {
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  max-height: 200px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: .4rem;
  box-shadow: 2px 4px 8px 2px #0000000f;
  overflow: hidden;
  padding: 4px 0;
  z-index: 5;
}
.dropdown-options.top {
  top: auto;
  bottom: 105%;
}
.dropdown-options > button {
  padding: 4px 8px;
  border: none;
  width: 100%;
  padding: 4px 8px;
  background: none;
  text-align: start;
}
.dropdown-options > button.selected, .dropdown-options > button:hover {
  background: var(--style-input-color);
}
</style>