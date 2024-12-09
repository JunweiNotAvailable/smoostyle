<template>
  <div class="shadow-background flex-center">
    <!-- login -->
    <div class="dialog small">
      <div class="dialog-header flex-between">
        <div class="dialog-title">Log in</div>
        <div class="dialog-close flex-center pointer" @click="closeLoginForm"><v-icon name="io-close-outline"/></div>
      </div>
      <div class="dialog-body">
        
      </div>
    </div>

    <!-- signup -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { addIcons } from 'oh-vue-icons';
import { IoCloseOutline } from "oh-vue-icons/icons";

addIcons(IoCloseOutline);

export default {
  name: 'LoginForm',
  props: ['closeLoginForm'],
  setup() {
    const username = ref('');
    const password = ref('');

    const login = () => {
      // TODO: implement login
    }

    const sendConfirmationCode = () => {
      // TODO: implement send confirmation code
    }

    const signup = () => {
      // TODO: implement signup
    }

    return { username, password, login, sendConfirmationCode, signup };
  }
}
</script>

<style scoped>

</style>