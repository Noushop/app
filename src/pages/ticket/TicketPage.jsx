import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './TicketPage.scss';

import { getTicket } from '../../api/tickets/tickets.api';
import { priceFormat } from '../../helpers/transform';

const TicketPage = () => {
  const { ticketNumber } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    Promise.all([
      getTicket(ticketNumber),
    ]).then(([res]) => {
      if ((res instanceof Error) === false) {
        setTicket(res.ticket);
      }
    });
  }, []);

  const renderList = (sales) => sales.map((s) => (
    <div className="__list-sales" key={s.product.barcode}>
      <div className="__list-sales__product">{s.product.name}</div>
      <div className="__list-sales__unit-price">{`Unit price: ${s.product.price}`}</div>
      <div className="__list-total-price">{`Total price: ${s.prices}`}</div>
      <div className="__list-quantity">{`Quantity: ${s.quantity}`}</div>
    </div>
  ));

  const renderInfos = () => {
    if (!ticket) {
      return <div>Loading...</div>;
    }

    return (
      <div className="ticket-page__infos">
        <div className="ticket-page__header">
          <div className="ticket-page__header-numticket">
            <span className="ticket-page__header-numticket__key">Ticket num:&nbsp;</span>
            <span className="ticket-page__header-numticket__value">{ticket.id}</span>
          </div>
          <div className="ticket-page__header-price">
            <span className="ticket-page__header-price__key">Total ticket amount:&nbsp;</span>
            <span className="ticket-page__header-price__value">{priceFormat(ticket.prices)}</span>
          </div>
          <div className="ticket-page__header-user">
            <span className="ticket-page__header-user__key">Seller:&nbsp;</span>
            <span className="ticket-page__header-user__value">{ticket.user.name}</span>
          </div>
        </div>
        <div className="ticket-page__list">
          {renderList(ticket.sales)}
        </div>
      </div>
    );
  };

  return (
    <div className="ticket-page">
      {renderInfos()}
    </div>
  );
};

export default TicketPage;
