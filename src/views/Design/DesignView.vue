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
  border-radius: .4rem;
  flex: 1;
  max-width: 280px;
}
.design-view > div .header .primary-button {
  padding: 6px 12px;
  margin-left: 8px;
  border-radius: .4rem;
}
.update-status {
  margin-left: 16px;
  opacity: 0.5;
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
  background: var(--style-input-color);
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
          <div class="update-status">
            <Loading v-if="isUpdating" color="#4ca" size="16" />
            <v-icon v-else-if="timeoutId !== null" name="bi-cloud-check-fill" color="#4ca" />
          </div>
        </div>
        <button v-if="!showSidebar" @click="showSidebar = !showSidebar" class="sidebar-toggle-button"><v-icon name="bi-layout-sidebar-reverse" /></button>
      </div>
      <div class="design-body flex-1 flex-center">
        <Canvas v-if="isConnected" :src="appUrl" :styles="styles" :updateDesignProps="updateDesignProps" />
        <Loading v-else-if="isLoading" color="#4ca" size="32" />
        <NoConnectionDialog v-else :searchExtensions="wsSearchExtensions" />
      </div>
    </div>
    <aside :class="{ 'hidden': !showSidebar }">
      <Sidebar :isConnected="isConnected" :toggleSidebar="() => showSidebar = !showSidebar" v-model:styles="styles" />
    </aside>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { BiLayoutSidebarReverse, BiCloudCheckFill } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';
import { useStore } from 'vuex';
import router from '@/router';
import { config } from '@/utils/api';
import NoConnectionDialog from '@/components/Design/NoConnectionDialog.vue';
import Sidebar from '@/components/Design/Sidebar.vue';
import Canvas from '@/components/Design/Canvas.vue';
import Loading from '@/components/Loading.vue';
import { toHex, toKebabCase } from '@/utils/helpers';

addIcons(BiLayoutSidebarReverse, BiCloudCheckFill);

export default {
  name: 'DesignView',
  components: { Canvas, NoConnectionDialog, Sidebar, Loading },
  setup() {
    const store = useStore();
    const isConnected = ref(false); // is connected to the extension
    const connections = ref([]);
    const isLoading = ref(true);
    const webSocket = ref(null);
    const showSidebar = ref(true);
    const appUrl = ref('http://localhost:8080');
    const selectedElement = ref(null);
    const styles = ref({
      backgroundColor: '#000000',
      color: '#000000',
      borderColor: '#000000',
      width: 0,
      height: 0,
      widthUnit: 'auto',
      heightUnit: 'auto',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      textDecoration: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      padding: '0px',
      margin: '0px',
    });
    const timeoutId = ref(null);
    const isUpdating = ref(false);

    watch(() => styles.value, () => {
      if (!isConnected.value || !selectedElement.value) return;
      if (timeoutId.value) clearTimeout(timeoutId.value);
      isUpdating.value = true;
      timeoutId.value = setTimeout(() => {
        // send update message to extension
        wsUpdateStyle();
      }, 2000);
    })

    const updateStyle = (newStyles) => {
      styles.value = { ...styles.value, ...newStyles };
    }

    // update style from selected element
    const updateDesignProps = (data) => {
      selectedElement.value = data.element;
      const elementStyle = data.elementStyle;
      styles.value = { ...data.elementStyle, 
        backgroundColor: toHex(elementStyle.backgroundColor),
        color: toHex(elementStyle.color),
        borderColor: toHex(elementStyle.borderColor),
        fontSize: Number(elementStyle.fontSize.replace('px', '')) || 16,
        width: Number(elementStyle.width.replace('px', '').replace('%', '')) || 0, 
        height: Number(elementStyle.height.replace('px', '').replace('%', '')) || 0,
        widthUnit: elementStyle.width.includes('%') ? '%' : elementStyle.width.includes('vw') ? 'vw' : elementStyle.width.includes('px') ? 'px' : 'auto',
        heightUnit: elementStyle.height.includes('%') ? '%' : elementStyle.height.includes('vh') ? 'vh' : elementStyle.height.includes('px') ? 'px' : 'auto',
        borderRadius: Number(elementStyle.borderRadius.replace('px', '')) || 0,
        borderWidth: Number(elementStyle.borderWidth.replace('px', '')) || 0,
      };
    }

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
        } // if found connected extension client
        else if (data.messageType === 'EXTENSION_CONNECTED') {
          isLoading.value = false;
          isConnected.value = true;
          connections.value = data.extensionClients;
        } // if extension client disconnect
        else if (data.messageType === 'EXTENSION_DISCONNECTED') {
          isConnected.value = false;
          connections.value = [];
        } // if extension client update style
        else if (data.messageType === 'RESPONSE') {
          if (data.type === 'update') {
            isUpdating.value = false;
          }
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
    // search for extension clients
    const wsSearchExtensions = () => {
      if (webSocket.value?.readyState !== WebSocket.OPEN) return;
      isLoading.value = true;
      webSocket.value.send(JSON.stringify({
        action: 'searchExtensions',
        data: { userId: store.state.user.secretId }
      }))
    }
    // update style
    const wsUpdateStyle = () => {
      if (webSocket.value?.readyState !== WebSocket.OPEN) return;
      let { widthUnit, heightUnit, width, height, ...parsedStyle } = styles.value;
      parsedStyle = Object.fromEntries(Object.entries(parsedStyle).map(([key, value]) => [toKebabCase(key), typeof value === 'number' ? `${value}px` : value]));
      parsedStyle.width = widthUnit === 'auto' ? 'auto' : `${width}${widthUnit}`;
      parsedStyle.height = heightUnit === 'auto' ? 'auto' : `${height}${heightUnit}`;
      parsedStyle['font-weight'] = Number(parsedStyle['font-weight']);
      webSocket.value.send(JSON.stringify({
        action: 'requestExtension',
        data: { targetId: connections.value[0], type: 'update', userId: store.state.user.secretId, element: selectedElement.value, style: parsedStyle }
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

    return { webSocket, isConnected, isLoading, showSidebar, wsSearchExtensions, appUrl, styles, updateStyle, updateDesignProps, isUpdating, timeoutId, updateAppUrl, handleEnter };
  }
}
</script>