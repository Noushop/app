import { requestBodyPublic } from '../api';

export const authentication = async (body) => {
  const res = await requestBodyPublic('POST', '/public/auth/login', body);
  return res;
};

export const lock = () => 'lock';
