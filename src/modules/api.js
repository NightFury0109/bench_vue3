const axios = require("axios").default;

export const post = (path, params, success, failure) => {
  return axios
    .post(`${process.env.VUE_APP_API_URL}${path}`, params)
    .then(success)
    .catch(failure);
};
