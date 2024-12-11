<template>
  <div class="shadow-background flex-center">
    <!-- login -->
    <div v-if="!isSignup" class="dialog small">
      <div class="dialog-header flex-between">
        <div class="dialog-title">Log in</div>
        <div class="dialog-close flex-center pointer" @click="closeLoginForm"><v-icon name="io-close-outline"/></div>
      </div>
      <div class="dialog-body">
        <div class="error-message" v-if="error">{{ error }}</div>
        <div class="form-field">
          <label>EMAIL</label>
          <input type="text" v-model="email">
        </div>
        <div class="form-field">
          <label>PASSWORD</label>
          <input type="password" v-model="password">
        </div>
        <button class="submit-button primary-button flex-center" @click="login" :disabled="isLoading">
          <Loading v-if="isLoading" color="#fff" size="16" />
          <span v-else>Log in</span>
        </button>
        <div class="flex-center">
          <div @click="toggleSignup" :disabled="isLoading" class="link-button pointer">Don't have an account? Sign up</div>
        </div>
      </div>
    </div>

    <!-- signup -->
    <div v-else class="dialog small">
      <div class="dialog-header flex-between">
        <div class="dialog-title">Sign up</div>
        <div class="dialog-close flex-center pointer" @click="closeLoginForm"><v-icon name="io-close-outline"/></div>
      </div>
      <div class="dialog-body">
        <div class="error-message" v-if="error">{{ error }}</div>
        <div class="form-field">
          <label>EMAIL</label>
          <input type="text" v-model="email">
        </div>
        <div class="form-field">
          <label>PASSWORD</label>
          <input type="password" v-model="password">
        </div>
        <div class="form-field flex-1">
          <label>CONFIRMATION CODE</label>
          <div class="code-input-container flex-center">
            <input type="text" v-model="confirmationCode">
            <button class="send-code-button primary-button flex-center" @click="sendConfirmationCode" :disabled="isCodeSent || isLoading">Send code</button>
          </div>
        </div>
        <button class="submit-button primary-button flex-center" @click="signup" :disabled="isLoading || !isCodeSent || !confirmationCode">
          <Loading v-if="isLoading" color="#fff" size="16" />
          <span v-else>Sign up</span>
        </button>
        <div class="flex-center">
          <div @click="toggleSignup" :disabled="isLoading" class="link-button pointer">Already have an account? Log in</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { addIcons } from 'oh-vue-icons';
import { IoCloseOutline } from "oh-vue-icons/icons";
import Loading from './Loading.vue';
import { constants, getRandomString } from '@/utils/helpers';
import { confirmSignUp, getItem, signIn, signUp, uploadItem } from '@/utils/api';
import store from '@/store';
import { UserModel } from '@/types/User';
import router from '@/router';

addIcons(IoCloseOutline);

export default {
  name: 'LoginForm',
  props: ['closeLoginForm'],
  components: { Loading },
  setup(props: any) {
    const email = ref('');
    const password = ref('');
    const confirmationCode = ref('');
    const error = ref('');
    const isCodeSent = ref(false);
    const isSignup = ref(false);
    const isLoading = ref(false);

    // toggle between login and signup
    const toggleSignup = () => {
      email.value = '';
      password.value = '';
      confirmationCode.value = '';
      isCodeSent.value = false;
      error.value = '';
      isSignup.value = !isSignup.value;
    }

    const login = async () => {
      error.value = '';
      setTimeout(() => isLoading.value = true, 10);
      const res = await signIn(email.value.replace('@', '%40'), password.value);
      if (res.error) {
        error.value = 'Invalid email or password';
        setTimeout(() => isLoading.value = false, 10);
        return;
      }
      await setupUser();
      props.closeLoginForm();
      setTimeout(() => isLoading.value = false, 10);
      router.push({ name: 'Home' });
    }

    const sendConfirmationCode = async() => {
      error.value = '';
      isCodeSent.value = true;
      const res = await signUp(email.value.replace('@', '%40'), password.value, email.value);
      if (res.error) {
        if (res.error.message?.includes('UsernameExistsException')) {
          error.value = 'Email already registered';
        } else if (res.error.message?.includes('InvalidPasswordException')) {
          error.value = 'Password must contain at least 6 characters';
        } else {
          error.value = 'Something went wrong while signing up';
        }
        isCodeSent.value = false;
        return;
      }
    }

    const signup = async () => {
      error.value = '';
      setTimeout(() => isLoading.value = true, 10);
      const res = await confirmSignUp(email.value.replace('@', '%40'), confirmationCode.value);
      if (res.error) {
        error.value = 'Invalid confirmation code';
        setTimeout(() => isLoading.value = false, 10);
        return;
      }
      await createUser();
      props.closeLoginForm();
      setTimeout(() => isLoading.value = false, 10);
      router.push({ name: 'Home' });
    }

    // get user from database
    const setupUser = async () => {
      const userData = await getItem(constants.databases.users, email.value);
      store.dispatch('setUser', userData);
      localStorage.setItem(constants.appName + '_user_id', userData.id);
    }

    // create user
    const createUser = async () => {
      const newUser: UserModel = {
        id: email.value,
        username: '',
        secretId: getRandomString(32),
      }
      await uploadItem(constants.databases.users, newUser);
      store.dispatch('setUser', newUser);
      localStorage.setItem(constants.appName + '_user_id', newUser.id);
    }

    // handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        (document.querySelector('.submit-button') as HTMLButtonElement)?.click();
      }
    }

    onMounted(() => document.addEventListener('keydown', handleKeyDown));
    onUnmounted(() => document.removeEventListener('keydown', handleKeyDown));

    return { isSignup, email, password, error, isCodeSent, confirmationCode, isLoading, login, sendConfirmationCode, signup, toggleSignup };
  }
}
</script>

<style scoped>
.error-message {
  color: #f66;
  font-size: 14px;
  margin: 8px 0;
  font-weight: 300;
}
.password-requirements {
  font-size: 12px;
  margin: 4px;
  color: #ccc;
}
.submit-button {
  width: 100%;
  font-size: 16px;
  padding: 12px;
  margin-top: 32px;
}
.link-button {
  margin-top: 32px;
  font-size: 14px;
  font-weight: 400;
}
.code-input-container {
  width: 100%;
}
.code-input-container input {
  flex: 1;
}
.code-input-container button {
  white-space: nowrap;
  font-size: 14px;
  padding: 13px;
  margin-left: 8px;
}
</style>