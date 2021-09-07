import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  KitPagination,
  KitButton,
  KitSpinner,
} from '@my2rela/react-kit';
import moment from 'moment';

import './ListsUsers.scss';

import Card from '../../card/Card';

import { lists } from '../../../api/users/users.api';

const defaultFilters = {
  page: 1,
};

const ListsUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      lists(filters),
    ]).then(([res]) => {
      if ((res instanceof Error) === false) {
        setUsers(res.users.data);
        setTotal(res.users.last_page);
      }
      setIsLoading(false);
    });
  }, [JSON.stringify(filters)]);

  const handlePageChange = (e, v) => {
    setFilters({ ...filters, page: v });
  };

  const resetFields = () => {
    setFilters(defaultFilters);
  };

  const renderList = () => users.map((t) => {
    const baseDate = moment(t.created_at).format('DD-MM-YYYY');
    return (
      <Link to={`/user/${t.id}`} key={t.id}>
        <Card className="__content_user-list">
          <span>{`Name: ${t.name}`}</span>
          <span>{`Email: ${t.email}`}</span>
          <span>{`Role: ${t.role}`}</span>
          <span>{baseDate}</span>
        </Card>
      </Link>
    );
  });

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="user-list__spinner">
          <KitSpinner show={isLoading} />
        </div>
      );
    }

    return (
      <>
        {renderList()}
        <div className="__content_user-list" />
        <div className="__content_user-list" />
      </>
    );
  };

  return (
    <div className="user-list">
      <div className="user-list__filter">
        <div className="user-list__filter__button">
          <KitButton onClick={() => resetFields()}>Reset</KitButton>
        </div>
      </div>
      <div className="user-list__content">
        <div className="user-list__content-items">
          {renderMainContent()}
        </div>
        <KitPagination actual={filters.page} total={total} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ListsUsers;
