<template>
  <div class="guidelines-content">
    <h1>Set Up a Connection</h1>
    <p></p>
    <!-- Install the VS Code extension -->
    <h2>{{ titles[0] }}</h2>
    <p>

    </p>
    <!-- Sign up for an account -->
    <h2>{{ titles[1] }}</h2>
    <p>

    </p>
    <!-- Run a project -->
    <h2>{{ titles[2] }}</h2>
    <p>

    </p>
    <!-- Start the design -->
    <h2>{{ titles[3] }}</h2>
    <p>

    </p>
  </div>
</template>

<script>
export default {
  name: 'SetUpAConnection',
  setup() {
    const titles = ['Install the VS Code extension', 'Sign up for an account', 'Run a project', 'Start the design'];

    return { titles };
  }
}
</script>