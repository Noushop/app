import { requestQueryPrivate, requestBodyPrivate } from '../api';

export const inventories = async (query) => {
  const res = await requestQueryPrivate('GET', '/private/products', query);
  return res;
};

export const inventorie = async (barcode) => {
  const res = await requestQueryPrivate('GET', `/private/product/${barcode}`, {});
  return res;
};

export const updateInventorie = async (barcode, body) => {
  const res = await requestBodyPrivate('PUT', `/private/product/update/${barcode}`, body);
  return res;
};

export const addInventorie = async (body) => {
  const res = await requestBodyPrivate('POST', '/private/product/create', body);
  return res;
};

export const lock = () => 'lock';
