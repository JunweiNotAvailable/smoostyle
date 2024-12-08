import { UserModel } from '@/types/User'
import { createStore } from 'vuex'

interface StateProps {
  user: undefined | null | UserModel
}

export default createStore<StateProps>({
  state: {
    user: undefined
  },
  getters: {
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
      
    },
  },
  modules: {
  }
})
