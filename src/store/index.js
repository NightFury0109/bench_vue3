import { createStore } from 'vuex';
import * as api from '../api/api';

export default createStore({
  state: {
    accessToken: null,
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
  },
  actions: {
    async doLogin({ commit }, loginData) {
      const res = await api.post('user_tokens', { ...loginData });
      if (res) {
        localStorage.setItem('accessToken', res.data['auth_token'].token);
        commit('updateAccessToken', res.data['auth_token'].token);
      }
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logOut({ commit }) {
      localStorage.removeItem('accessToken');
      commit('updateAccessToken', null);
    },
  },
});
