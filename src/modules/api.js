const axios = require('axios').default;

export const post = (path, params, success, failure) => {
  return axios
    .post(`${process.env.VUE_APP_API_URL}${path}`, params)
    .then(success)
    .catch(failure);
};

export const get = (path, params, success, failure) => {
  return axios
    .get(`${process.env.VUE_APP_API_URL}${path}`, params, {
      headers: {
        Authorization: `${process.env.AUTH_TOKEN}`,
      },
    })
    .then(success)
    .catch(failure);
};
