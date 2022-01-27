import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      username: '',
      token: '',
      id: '',
    },
  },
  mutations: {
    LOGIN(state, userData) {
      state.user.token = userData.token;
      state.user.username = userData.username;
      state.user.id = userData.id;
    },
  },
  actions: {
    login({ commit }, userData) {
      commit('LOGIN', userData);
    },
  },
});
