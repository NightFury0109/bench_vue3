const axios = require("axios").default;

export const post = (path, params, success, failure) => {
  axios({
    method: "POST",
    url: `${process.env.VUE_APP_API_URL}${path}`,
    ...params,
  })
    .then(success)
    .catch(failure);
};
