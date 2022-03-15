import * as api from '../api/api';

export const getOffersWithPagination = async (params) => {
  try {
    return await api.get('offers', params);
  } catch (e) {
    if (process.env.NODE_ENV != 'production') console.log(e);
  }
};
