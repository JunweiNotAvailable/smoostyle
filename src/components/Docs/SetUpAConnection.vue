<template>
  <div class="docs-content">
    <h1>Set Up a Connection</h1>
    <p></p>
    <!-- title 1 -->
    <h2>{{ titles[0] }}</h2>
    <p>
      
    </p>
    <!-- title 2 -->
    <h2>{{ titles[1] }}</h2>
    <p>

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
    <!-- title 6 -->
    <h2>{{ titles[5] }}</h2>
    <p>

    </p>
  </div>
</template>

<script>
export default {
  name: 'SetUpAConnection',
  setup() {
    const titles = ['Sign up for an account', 'Install the package', 'Import the handlers', 'Start the project', 'Run a Smoostyle client', 'Design on the browser'];

    return { titles };
  }
}
</script>