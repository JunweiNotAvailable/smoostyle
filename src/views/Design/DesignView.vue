<style scoped>
.design-view {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  font-size: 12px;
}
.design-view > div {
  height: 100%; 
  display: flex; 
  flex-direction: column;
}
/* header */
.design-view > div .header {
  height: 48px;
  border-bottom: 1px solid #eee;
  padding: 8px 8px 8px 16px;
}
.design-view > div .header input {
  font-size: 12px;
  padding: 4px;
  border-radius: .25rem;
  flex: 1;
  max-width: 400px;
}
.design-view > div .header .primary-button {
  padding: 6px 12px;
  margin-left: 8px;
  border-radius: .25rem;
}
/* body */
.design-body {
  background: #f3f3f3;
}
/* aside */
.design-view aside {
  width: var(--sidebar-width);
  border-left: 1px solid #eee;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  transition: none;
  position: relative;
}
.design-view aside.hidden {
  width: 0;
  overflow: hidden;
  border: none;
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
.sidebar-toggle-button:hover {
  background: #00000008;
}
</style>

<template>
  <div class="design-view">
    <div class="flex-1">
      <!-- header -->
      <div class="header flex-between">
        <div class="flex-start flex-1">
          <input placeholder="Your app URL, e.g. http://localhost:3000" type="text">
          <button class="primary-button flex-center">Update</button>
        </div>
        <button v-if="!showSidebar" @click="showSidebar = !showSidebar" class="sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
      </div>
      <div class="design-body flex-1 flex-center">
        <Canvas v-if="isConnected" :isConnected="isConnected" />
        <NoConnectionDialog v-else="!isConnected" />
      </div>
    </div>
    <aside :class="{ 'hidden': !showSidebar }">
      <Sidebar :isConnected="isConnected" :toggleSidebar="() => showSidebar = !showSidebar" />
    </aside>
  </div>
</template>

<script>
import NoConnectionDialog from '@/components/Design/NoConnectionDialog.vue';
import Sidebar from '@/components/Design/Sidebar.vue';
import Canvas from '@/components/Design/Canvas.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { BiLayoutSidebarReverse } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';
import { useStore } from 'vuex';
import router from '@/router';
import { config } from '@/utils/api';

addIcons(BiLayoutSidebarReverse);

export default {
  name: 'DesignView',
  components: { Canvas, NoConnectionDialog, Sidebar },
  setup() {
    const store = useStore();
    const isConnected = ref(false);
    const webSocket = ref(null);
    const showSidebar = ref(true);

    // initialize web socket
    const initWebsocket = () => {
      webSocket.value = new WebSocket(config.WEB_SOCKET_URL);
      webSocket.value.onopen = () => {
        setUserId(store.state.user.secretId);
        console.log('Browser connected');
      }
      webSocket.value.onclose = () => {
        console.log('Browser disconnected');
      }
      webSocket.value.onmessage = (event) => {
        console.log(event.data);
      }
    }

    /// web socket actions
    const setUserId = (userId) => {
      if (webSocket.value?.readyState !== WebSocket.OPEN) return;
      webSocket.value.send(JSON.stringify({
        action: 'setClient',
        data: {
          userId: userId,
          clientType: 'browser',
        }
      }))
    }


    // check user
    watch(() => store.state.user, (user) => {
      if (user === null) router.push({ name: 'Home' });
    })

    // handle beforeunload
    const handleBeforeUnload = () => {
      if (webSocket.value) webSocket.value.close();
    }

    // handle onmounted and onunmounted
    onMounted(() => {
      if (store.state.user === null) { // check user
        router.push({ name: 'Home' });
        return;
      }
      initWebsocket();
      window.addEventListener('beforeunload', handleBeforeUnload);
    });
    onUnmounted(() => {
      if (webSocket.value) webSocket.value.close();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    })

    return { webSocket, isConnected, showSidebar };
  }
}
</script>