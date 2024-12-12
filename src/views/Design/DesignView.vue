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
          <input id="app-url-input" @keydown="handleEnter" :value="appUrl" placeholder="Your app URL, e.g. http://localhost:8080" type="text">
          <button id="app-url-update-button" @click="updateAppUrl" class="primary-button flex-center">Update</button>
        </div>
        <button v-if="!showSidebar" @click="showSidebar = !showSidebar" class="sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
      </div>
      <div class="design-body flex-1 flex-center">
        <!-- <Canvas v-if="isConnected" :isConnected="isConnected" :src="appUrl" />
        <Loading v-else-if="isLoading" color="#4ca" size="32" />
        <NoConnectionDialog v-else :searchExtensions="wsSearchExtensions" /> -->
        <Canvas :src="appUrl" />
      </div>
    </div>
    <aside :class="{ 'hidden': !showSidebar }">
      <Sidebar :isConnected="isConnected" :toggleSidebar="() => showSidebar = !showSidebar" />
    </aside>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { BiLayoutSidebarReverse } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';
import { useStore } from 'vuex';
import router from '@/router';
import { config } from '@/utils/api';
import NoConnectionDialog from '@/components/Design/NoConnectionDialog.vue';
import Sidebar from '@/components/Design/Sidebar.vue';
import Canvas from '@/components/Design/Canvas.vue';
import Loading from '@/components/Loading.vue';

addIcons(BiLayoutSidebarReverse);

export default {
  name: 'DesignView',
  components: { Canvas, NoConnectionDialog, Sidebar, Loading },
  setup() {
    const store = useStore();
    const isConnected = ref(false); // is connected to the extension
    const isLoading = ref(true);
    const webSocket = ref(null);
    const showSidebar = ref(true);
    const appUrl = ref('http://localhost:8080');

    // update app url
    const updateAppUrl = () => {
      appUrl.value = document.getElementById('app-url-input').value;
    }
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        document.getElementById('app-url-input').blur();
        document.getElementById('app-url-update-button')?.click();
      }
    }

    // initialize web socket
    const initWebsocket = () => {
      webSocket.value = new WebSocket(config.WEB_SOCKET_URL);
      webSocket.value.onopen = () => {
        wsSetClient();
        console.log('Browser connected');
      }
      webSocket.value.onclose = () => {
        console.log('Browser disconnected');
      }
      webSocket.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // no extension returned
        if (data.messageType === 'NO_EXTENSION') {
          isLoading.value = false;
        // if found connected extension client
        } else if (data.messageType === 'EXTENSION_CONNECTED') {
          wsAskForExtensionData(data.extensionClients[0], 'root');
          isLoading.value = false;
          isConnected.value = true;
        // if extension client disconnect
        } else if (data.messageType === 'EXTENSION_DISCONNECTED') {
          isConnected.value = false;
        }
      }
    }

    /// web socket actions
    // set client
    const wsSetClient = () => {
      if (webSocket.value?.readyState !== WebSocket.OPEN) return;
      webSocket.value.send(JSON.stringify({
        action: 'setClient',
        data: {
          userId: store.state.user.secretId,
          clientType: 'browser',
        }
      }))
    }
    // ask for extension data
    const wsAskForExtensionData = (targetId, dataType) => {
      if (webSocket.value?.readyState !== WebSocket.OPEN) return;
      webSocket.value.send(JSON.stringify({
        action: 'requestExtension',
        data: { targetId, dataType }
      }))
    }
    // search for extension clients
    const wsSearchExtensions = () => {
      if (webSocket.value?.readyState !== WebSocket.OPEN) return;
      isLoading.value = true;
      webSocket.value.send(JSON.stringify({
        action: 'searchExtensions',
        data: { userId: store.state.user.secretId }
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

    return { webSocket, isConnected, isLoading, showSidebar, wsSearchExtensions, appUrl, updateAppUrl, handleEnter };
  }
}
</script>