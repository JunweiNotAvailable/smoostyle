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
      Import the Smoostyle event handlers and register them in your entry file (e.g., <span class="italic">App.vue</span> for Vue or <span class="italic">App.tsx</span> for React).
      <Code :value="importCode" language="javascript"/>
    </p>
    <!-- title 3 -->
    <h2>{{ titles[2] }}</h2>
    <p>
      Run your project locally to enable live design editing. Use your usual start command, e.g. For Vue:
      <Code value="npm run serve" language="bash"/>
    </p>
    <!-- title 4 -->
    <h2>{{ titles[3] }}</h2>
    <p>
      Run a Smoostyle client to connect your project with the browser:<br>
      <span class="point">1. Start the client by running the following command:<Code value="npx smoostyle start" language="bash"/></span>
      <span class="point">2. Log in to the client with the same account credentials you sign up on Smoostyle.<br></span>
      <span class="point">3. The client will constantly check for updates and apply them to your project files.</span>
    </p>
    <!-- title 5 -->
    <h2>{{ titles[4] }}</h2>
    <p>
      You can start designing directly in the browser:<br>
      <span class="point">1. Type in the URL of your project in the input field. (e.g. http://localhost:8080)<br></span>
      <span class="point">2. Press the reload button if the page doesn't load.</span>

      <br>
      Note:<br>
      If you can't see the project on the screen, it might be a Mixed Content issue.<br>
      Change the "serve" script in your <span class="italic">package.json</span> file to run the project on HTTPS.
      <Code :value="httpsScriptCode" language="javascript"/>
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
    const httpsScriptCode = `// package.json\n...\n"scripts": {\n  "serve": "vue-cli-service serve --https",\n  "build": "vue-cli-service build"\n},`;

    return { titles, importCode, httpsScriptCode };
  }
}
</script>