import Config from '../config/config';

import { getToken } from '../helpers/storage';

const baseUrl = Config.baseApiUrl;

export const requestBodyPrivate = (method, path, body) => {
  const url = `${baseUrl}${path}`;
  const content = { method: method.toUpperCase(), body: JSON.stringify(body) };
  const header = { Authorization: `Bearer ${getToken()}` };

  return handleFetch(url, content, header);
};

export const requestBodyPublic = (method, path, body) => {
  const url = `${baseUrl}${path}`;
  const content = { method: method.toUpperCase(), body: JSON.stringify(body) };
  const header = {};

  return handleFetch(url, content, header);
};

export const requestQueryPublic = (method, path, queries) => {
  let queryString = '';
  if (queries) {
    queryString = `?${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`;
  }

  const url = `${baseUrl}${path}${queryString}`;
  const content = { method: method.toUpperCase() };
  const header = {};

  return handleFetch(url, content, header);
};

export const requestQueryPrivate = (method, path, queries) => {
  let queryString = '';
  if (queries) {
    queryString = `?${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`;
  }

  const url = `${baseUrl}${path}${queryString}`;
  const content = { method: method.toUpperCase() };
  const header = { Authorization: `Bearer ${getToken()}` };

  return handleFetch(url, content, header);
};

const handleFetch = (url, content = {}, header = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    mode: '*cors',
  };

  return fetch(url, {
    ...content,
    headers: { ...headers, ...header },
  }).then((res) => handleResponse(res));
};

const handleResponse = (res) => res.json().then((json) => {
  if ((res.status >= 200 && res.status < 400)) {
    return json;
  }

  const error = new Error(json);
  error.success = false;
  error.error = true;
  error.status = res.status;
  error.message = json.error || res.statusText || 'UNKNOWN';

  throw error;
}).catch((err) => {
  if (err.status === 498) {
    return window.location.replace('/');
  }

  return err;
});
