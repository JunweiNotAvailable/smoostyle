<template>
  <div class="docs-content">
    <h1>Set Up a Connection</h1>
    <p></p>
    <!-- title 1 -->
    <h2>{{ titles[0] }}</h2>
    <p>
      Install the Smoostyle package into your project. This allows your project to communicate between the Smoostyle client and browser interface.<br>
      Run the following command in your project directory:<br>
      <Code value="npm install smoostyle" language="bash"/>
    </p>
    <!-- title 2 -->
    <h2>{{ titles[1] }}</h2>
    <p>
      Import the Smoostyle event handlers and register them in your entry file (e.g., App.vue for Vue or App.tsx for React).
      <Code :value="importCode" language="javascript"/>
    </p>
    <!-- title 3 -->
    <h2>{{ titles[2] }}</h2>
    <p>

    </p>
    <!-- title 4 -->
    <h2>{{ titles[3] }}</h2>
    <p>

    </p>
    <!-- title 5 -->
    <h2>{{ titles[4] }}</h2>
    <p>

    </p>
  </div>
</template>

<script>
import Code from '../Code.vue';

export default {
  name: 'SetUpAConnection',
  components: { Code },
  setup() {
    const titles = ['Install the package', 'Import the handlers', 'Start the project', 'Run a Smoostyle client', 'Design on the browser'];
    const importCode = `// App.vue\n\n<script>\nimport { onMounted, onUnmounted } from 'vue';\nimport { SmHandleMessage, SmHandleMouseMove, SmHandleMouseDown, SmHandleScroll } from 'smoostyle';\n\nexport default {\n  name: 'App',\n  setup() {\n    onMounted(() => {\n      window.addEventListener('message', SmHandleMessage);\n      window.addEventListener('mousemove', SmHandleMouseMove);\n      window.addEventListener('mousedown', SmHandleMouseDown);\n      window.addEventListener('scroll', SmHandleScroll);\n    });\n    onUnmounted(() => {\n      window.removeEventListener('message', SmHandleMessage);\n      window.removeEventListener('mousemove', SmHandleMouseMove);\n      window.removeEventListener('mousedown', SmHandleMouseDown);\n      window.removeEventListener('scroll', SmHandleScroll);\n    });\n  }\n}\n<\/script>`;

    return { titles, importCode };
  }
}
</script>