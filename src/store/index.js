import { createStore } from 'vuex';
import * as api from '../api/api';
import { getOffersWithPagination } from '../api/offers';

export default createStore({
  state: {
    accessToken: null,
    isAuthenticated: false,
    offers: [],
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    updateOffersData: (state, offers) => {
      state.offers.push(...offers);
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
    async getOffers({ commit }, collection, page) {
      const res = await getOffersWithPagination(collection, page);
      if (res) {
        commit('updateOffersData', res.data.data);
      }
    },
  },
});
