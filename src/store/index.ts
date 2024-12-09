import { UserModel } from '@/types/User'
import { constants } from '@/utils/helpers'
import { getItem } from '@/utils/api'
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
    SET_USER(state, user: StateProps['user']) {
      state.user = user
    },
  },
  actions: {
    // fetch user
    async fetchUser({ commit }) {
      const userId = localStorage.getItem(constants.appName + '_user_id');
      if (!userId) { // no user
        commit('SET_USER', null);
        return;
      }
      // fetch user
      const res = await getItem(constants.databases.users, userId);
      if (res.error) {
        commit('SET_USER', null);
        return;
      }
      commit('SET_USER', res);
      localStorage.setItem(constants.appName + '_user_id', userId);
    },

    // set user
    setUser({ commit }, user: StateProps['user']) {
      commit('SET_USER', user);
    },
  },
  modules: {
  }
})
