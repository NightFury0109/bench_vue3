import { createStore } from 'vuex';
import * as api from '../api/api';

export default createStore({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null,
  },
  mutations: {
    loginStart: (state) => (state.loggingIn = true),
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      api
        .post('user_tokens', {
          ...loginData,
        })
        .then((response) => {
          localStorage.setItem(
            'accessToken',
            response.data['auth_token'].token
          );
          commit('loginStop', null);
          commit('updateAccessToken', response.data['auth_token'].token);
        })
        .catch((error) => {
          commit('loginStop', error.response.data.error);
          commit('updateAccessToken', null);
        });
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logOut({ commit }) {
      commit('updateAccessToken', localStorage.removeItem('accessToken'));
    },
  },
});
