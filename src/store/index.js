import { createStore } from 'vuex';

export default createStore({
  state: {
    tokens: [],
  },
  mutations: {
    GET_TOKEN(state, token) {
      state.tokens.push(token);
    },
  },
  actions: {
    getToken({ commit }, token) {
      commit('GET_TOKEN', token);
    },
  },
});
