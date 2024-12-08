import { UserModel } from '@/types/User'
import { config, constants } from '@/utils/helpers'
import { createStore } from 'vuex'

interface StateProps {
  user: undefined | null | UserModel
}

export default createStore<StateProps>({
  state: {
    user: undefined
  },
  getters: {
    // user properties
    isUserLoading: (state) => state.user === undefined,
    hasUser: (state) => !!state.user
  },
  mutations: {
    setUser(state, user: StateProps['user']) {
      state.user = user
    },
  },
  actions: {
    async fetchUser({ commit }) {
      const userId = localStorage.getItem(constants.appName + '_user_id');
      if (!userId) { // no user
        commit('setUser', null);
        return;
      }
      // fetch user
      const res = await fetch(`${config.API_URL}/data?tableName=${constants.databases.users}&id=${userId}&key=${config.API_KEY}`);
      if (!res.ok) {
        commit('setUser', null);
        return;
      }
      const user = await res.json();
      commit('setUser', user);
      localStorage.setItem(constants.appName + '_user_id', userId);
    },
  },
  modules: {
  }
})
