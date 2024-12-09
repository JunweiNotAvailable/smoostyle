<template>
  <div class="design-view">
    <div class="flex-1">
      <!-- header -->
      <div class="header flex-start">
        <input placeholder="Your app URL, e.g. http://localhost:3000" type="text">
        <button class="primary-button flex-center">Update</button>
      </div>
      <div class="design-body flex-1 flex-center">
        <Canvas v-if="connection" :connection="connection" />
        <NoConnectionDialog v-else="!connection" />
      </div>
    </div>
    <aside>
      <Sidebar :connection="connection" />
    </aside>
  </div>
</template>

<script>
import NoConnectionDialog from '@/components/Design/NoConnectionDialog.vue';
import Sidebar from '@/components/Design/Sidebar.vue';
import Canvas from '@/components/Design/Canvas.vue';
import { ref } from 'vue';

export default {
  name: 'DesignView',
  components: { Canvas, NoConnectionDialog, Sidebar },
  setup() {
    const connection = ref(null);

    return { connection };
  }
}
</script>

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
  padding: 8px 16px;
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
}
</style>