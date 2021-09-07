import { requestBodyPublic, requestBodyPrivate, requestQueryPrivate } from '../api';

export const authentication = async (body) => {
  const res = await requestBodyPublic('POST', '/public/auth/login', body);
  return res;
};

export const create = async (body) => {
  const res = await requestBodyPrivate('POST', '/private/admin/user/create', body);
  return res;
};

export const lists = async (query) => {
  const res = await requestQueryPrivate('GET', '/private/admin/users', query);
  return res;
};

export const lock = () => 'lock';
