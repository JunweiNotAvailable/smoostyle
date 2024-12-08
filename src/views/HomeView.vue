<template>
  <LoadingView v-if="isLoading"/>
  <LandingView v-else-if="!hasUser"/>
  
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import LoadingView from './LoadingView.vue';
import LandingView from './LandingView.vue';

export default defineComponent({
  name: 'HomeView',
  components: { LoadingView, LandingView },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isUserLoading);
    const hasUser = computed(() => store.getters.hasUser);

    return { isLoading, hasUser };
  }
});
</script>
