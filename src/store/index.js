import { createStore } from 'vuex';
import * as api from '../api/api';

export default createStore({
  state: {
    accessToken: null,
    firstAuth: false,
    offers: [],
    checkedOffers: [],
  },
  getters: {
    isEmpty(state) {
      return state.checkedOffers.length == 0 ? true : false;
    },
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    authenticated: (state, payload) => {
      state.firstAuth = payload;
    },
    updateOffersData: (state, offers) => {
      state.offers.push(...offers);
    },
    cleanOffersData: (state) => {
      state.offers = [];
    },
    updateCheckedOffers: (state, payload) => {
      state.checkedOffers = payload;
    },
  },
  actions: {
    async doLogin({ commit }, loginData) {
      const res = await api.post('user_tokens', { ...loginData });
      if (res) {
        localStorage.setItem('accessToken', res.data['auth_token'].token);
        commit('updateAccessToken', res.data['auth_token'].token);
        commit('authenticated', true);
      }
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logOut({ commit }) {
      localStorage.removeItem('accessToken');
      commit('updateAccessToken', null);
      commit('authenticated', false);
    },
  },
});
