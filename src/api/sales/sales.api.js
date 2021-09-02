import { requestBodyPrivate } from '../api';

export const createSales = async (panier, ticket) => {
  const res = await requestBodyPrivate('POST', '/private/sale/create', { pan: panier, ticket });
  return res;
};

export const lock = () => 'lock';
