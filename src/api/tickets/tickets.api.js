import { requestBodyPrivate, requestQueryPrivate } from '../api';

export const createTicket = async (body) => {
  const res = await requestBodyPrivate('POST', '/private/ticket/create', body);
  return res;
};

export const getTickets = async (content) => {
  let params = {
    page: content.page,
  };

  if (content.dateStart.length > 8) {
    params = { ...params, dateStart: content.dateStart };
  }

  if (content.dateEnd.length > 8) {
    params = { ...params, dateEnd: content.dateEnd };
  }

  const res = await requestQueryPrivate('GET', '/private/tickets', params);
  return res;
};

export const getTicket = async (id) => {
  const res = await requestQueryPrivate('GET', `/private/ticket/${id}`, {});

  return res;
};
