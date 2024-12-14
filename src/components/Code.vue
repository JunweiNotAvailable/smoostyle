<template>
  <div class="code-container">
    <pre><code :class="language">{{ value }}</code></pre>
    <button @click="copy">
      <v-icon v-if="isCopied" name="bi-check-lg" fill="#4ca" scale="0.8" />
      <v-icon v-else name="io-copy-outline" fill="#4ca" scale="0.8" />
    </button>
  </div>
</template>

<script>
import { IoCopyOutline, BiCheckLg } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';
import { onMounted, ref } from 'vue';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/github.css';

addIcons(IoCopyOutline, BiCheckLg);

export default {
  name: 'Code',
  props: ['value', 'language'],
  setup(props) {
    const isCopied = ref(false);

    const copy = () => {
      navigator.clipboard.writeText(props.value);
      isCopied.value = true;
      setTimeout(() => isCopied.value = false, 2000);
    }

    onMounted(() => highlightjs.highlightAll());

    return { isCopied, copy };
  }
}
</script>

<style scoped>
.code-container {
  position: relative;
  padding: 16px;
  width: auto;
  border-radius: .5rem;
  background: #f0f0f0;
  max-width: 700px;
  margin: 8px 0;
}
.code-container pre {
  margin: 0;
  overflow: auto;
}
.code-container pre::-webkit-scrollbar {
  height: 4px;
  background: transparent;
}
.code-container pre::-webkit-scrollbar-thumb {
  background: #0002;
  border-radius: 1rem;
}
.code-container button {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: .4rem;
  border: none;
  background: #fff8;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  cursor: pointer;
}
</style>