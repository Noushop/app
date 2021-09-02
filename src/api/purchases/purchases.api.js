import { requestQueryPrivate } from '../api';

export const getPurchases = async (content) => {
  let params = {
    page: content.page,
  };

  if (content.dateStart.length > 8) {
    params = { ...params, dateStart: content.dateStart };
  }

  if (content.dateEnd.length > 8) {
    params = { ...params, dateEnd: content.dateEnd };
  }

  const res = await requestQueryPrivate('GET', '/private/purchases', params);
  return res;
};

export const lock = () => 'lock';
