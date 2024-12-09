<template>
  <LoadingView v-if="isLoading"/>
  <BrowserView v-else-if="hasUser"/>
  <LandingView v-else/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import LoadingView from '../LoadingView.vue';
import LandingView from './LandingView.vue';
import BrowserView from './BrowserView.vue';

export default defineComponent({
  name: 'HomeView',
  components: { LoadingView, LandingView, BrowserView },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isUserLoading);
    const hasUser = computed(() => store.getters.hasUser);

    return { isLoading, hasUser };
  }
});
</script>
