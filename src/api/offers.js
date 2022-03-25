import * as api from '../api/api';

export const getOffersWithPagination = async (params, page) => {
  try {
    return await api.get('offers', params, page);
  } catch (e) {
    if (process.env.NODE_ENV != 'production') console.error(e);
  }
};
