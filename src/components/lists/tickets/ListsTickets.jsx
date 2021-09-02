import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  KitTextField,
  KitPagination,
  KitButton,
  KitSpinner,
} from '@my2rela/react-kit';
import moment from 'moment';

import './ListsTickets.scss';

import Card from '../../card/Card';

import { getTickets } from '../../../api/tickets/tickets.api';
import { priceFormat } from '../../../helpers/transform';

const today = moment().format('YYYY-MM-DD');

const defaultFilters = {
  dateStart: today,
  dateEnd: '',
  page: 1,
};

const ListsTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getTickets(filters),
    ]).then(([res]) => {
      if ((res instanceof Error) === false) {
        setTickets(res.ticket.data);
        setTotal(res.ticket.last_page);
      }
      setIsLoading(false);
    });
  }, [JSON.stringify(filters)]);

  const handleFilterChange = (key) => (e) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const handlePageChange = (e, v) => {
    setFilters({ ...filters, page: v });
  };

  const resetFields = () => {
    setFilters(defaultFilters);
  };

  const renderList = () => tickets.map((t) => {
    const baseDate = moment(t.created_at).format('DD-MM-YYYY');
    return (
      <Link to={`/ticket/${t.id}`} key={t.id}>
        <Card className="__content_ticket-list">
          <span>{`Ticket n°${t.id}`}</span>
          <span>{`Total prices: ${priceFormat(t.prices)}`}</span>
          <span>{baseDate}</span>
        </Card>
      </Link>
    );
  });

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="ticket-list__spinner">
          <KitSpinner show={isLoading} />
        </div>
      );
    }

    return (
      <>
        {renderList()}
        <div className="__content_ticket-list" />
        <div className="__content_ticket-list" />
      </>
    );
  };

  return (
    <div className="ticket-list">
      <div className="ticket-list__filter">
        <div className="ticket-list__filter__input">
          <KitTextField label="Start date" type="date" value={filters.dateStart} onChange={handleFilterChange('dateStart')} />
        </div>
        <div className="ticket-list__filter__input">
          <KitTextField label="End date" type="date" value={filters.dateEnd} onChange={handleFilterChange('dateEnd')} />
        </div>
        <div className="ticket-list__filter__button">
          <KitButton onClick={() => resetFields()}>Reset</KitButton>
        </div>
      </div>
      <div className="ticket-list__content">
        <div className="ticket-list__content-items">
          {renderMainContent()}
        </div>
        <KitPagination actual={filters.page} total={total} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ListsTickets;
