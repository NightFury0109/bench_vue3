const axios = require('axios').default;
import store from '../store';

export const post = (path, params, success, failure) => {
  return axios
    .post(process.env.VUE_APP_API_URL + `${path}`, params)
    .then(success)
    .catch(failure);
};

export const get = (path, params, success, failure) => {
  return axios
    .get(process.env.VUE_APP_API_URL + `${path}`, {
      params,
      headers: {
        Authorization: 'Bearer ' + store.state.tokens[0],
      },
    })
    .then(success)
    .catch(failure);
};
