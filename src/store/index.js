import { createStore } from 'vuex';
import * as api from '../api/api';

export default createStore({
  state: {
    accessToken: null,
    firstAuth: false,
    offers: [],
    checkedOffers: [],
    // collections: [
    //   {
    //     tab: t('message.tab1'),
    //     title: t('message.projectsTitle'),
    //     param: 'lookfor',
    //     alert: t('message.lookforAlert'),
    //   },
    //   {
    //     tab: t('message.tab2'),
    //     title: t('message.teamsTitle'),
    //     param: 'available',
    //     alert: t('message.availableAlert'),
    //   },
    // ],
  },
  getters: {
    isEmpty(state) {
      return state.checkedOffers.length == 0 ? true : false;
    },
    getChecked(state) {
      return state.checkedOffers;
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
      state.checkedOffers.push(payload);
    },
    removeCheckbox: (state, checkedOffer) => {
      state.checkedOffers = state.checkedOffers.filter(
        (ch) => ch != checkedOffer
      );
    },
    cleanCheckedOffers: (state) => {
      state.checkedOffers = [];
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
