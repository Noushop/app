import React, { useState, useEffect } from 'react';
import {
  KitTextField,
  KitPagination,
  KitButton,
  KitSpinner,
} from '@my2rela/react-kit';

import './ListPurchases.scss';

import Card from '../../card/Card';

import { getPurchases } from '../../../api/purchases/purchases.api';
import { priceFormat } from '../../../helpers/transform';

const defaultFilters = {
  dateStart: '',
  dateEnd: '',
  page: 1,
};

const ListPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      getPurchases(filters),
      setIsLoading(true),
    ]).then((res) => {
      if (res[0].status) {
        setPurchases(res[0].purchases.data);
        setTotal(res[0].purchases.last_page);
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

  const renderList = () => purchases.map((t) => {
    const baseDate = new Date(t.created_at);

    return (
      <Card className="__content_purchase-list" key={t.id}>
        <span>{`Purchase n°${t.id}`}</span>
        <span>{`Total costs purchased: ${priceFormat(t.cost)}`}</span>
        <span>{`Quantities purchased: ${t.quantity}`}</span>
        <span>{`By: ${t.user.name}`}</span>
        <span>{`Barcode: ${t.product.barcode}`}</span>
        <span>{`Product: ${t.product.name}`}</span>
        <span>{`Unit cost: ${priceFormat(t.product.cost)}`}</span>
        <span>{`${baseDate.getDate()}/${baseDate.getMonth()}/${baseDate.getFullYear()} ${baseDate.getHours()}:${baseDate.getMinutes()}:${baseDate.getSeconds()}`}</span>
      </Card>
    );
  });

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="purchase-list__spinner">
          <KitSpinner show={isLoading} />
        </div>
      );
    }

    return (
      <>
        {renderList()}
        <div className="__content_purchase-list" />
        <div className="__content_purchase-list" />
      </>
    );
  };

  return (
    <div className="purchase-list">
      <div className="purchase-list__filter">
        <div className="purchase-list__filter__input">
          <KitTextField label="Start date" type="date" value={filters.dateStart} onChange={handleFilterChange('dateStart')} />
        </div>
        <div className="purchase-list__filter__input">
          <KitTextField label="End date" type="date" value={filters.dateEnd} onChange={handleFilterChange('dateEnd')} />
        </div>
        <div className="purchase-list__filter__button">
          <KitButton onClick={() => resetFields()}>Reset</KitButton>
        </div>
      </div>
      <div className="purchase-list__content">
        <div className="purchase-list__content-items">
          {renderMainContent()}
        </div>
        <KitPagination actual={filters.page} total={total} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ListPurchases;
