import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  KitPagination,
  KitTextField,
  KitSpinner,
} from '@my2rela/react-kit';

import './SectionInventoriesList.scss';

import Card from '../../../card/Card';

const SectionInventoriesList = (props) => {
  const {
    loading,
    inventories,
    perPage,
    total,
    totalPage,
    actualPage,
    onChangePage,
    onChangeFilter,
  } = props;

  const [timeoutHandler, setTimeoutHandler] = useState(0);

  const formatNumber = (num) => new Intl.NumberFormat().format(num);

  const formatDate = (d) => {
    const daySTime = d.split('T');
    const timeSMicro = daySTime[1].split('.');

    const day = daySTime[0];
    const time = timeSMicro[0];

    return `${day} ${time}`;
  };

  const handleChangeFilter = (e) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }

    setTimeoutHandler(setTimeout(() => {
      onChangeFilter(e.target.value);
    }, 500));
  };

  const renderItem = () => {
    if (loading) {
      return null;
    }

    return inventories.map((inv) => (
      <Link to={`/inventory/${inv.id}`} key={inv.id} className="items__item">
        <Card>
          <div className="item__name">{inv.name}</div>
          <div className="item__barcode">{inv.barcode}</div>
          <div className="item__pricing">
            <div className="item__pricing-cost">Cost:&nbsp;{formatNumber(inv.cost)}</div>
            <div className="item__pricing-price">Price:&nbsp;{formatNumber(inv.price)}</div>
          </div>
          <div className="item__quantity">Stock:&nbsp;{inv.quantity}</div>
          <div className="item__last-update">Updated at:&nbsp;{formatDate(inv.updated_at)}</div>
        </Card>
      </Link>
    ));
  };

  return (
    <div className="section-inventorie-list">
      <div className="section-inventorie-list__header">
        <div className="section-inventorie-list____header__title">{perPage} inventories / {total}</div>
        <div className="section-inventorie-list__header__tips">
          <div className="section-inventorie-list__header__tips__input">
            <KitTextField placeholder="Search by name or barcode" onChange={handleChangeFilter} />
          </div>
        </div>
      </div>
      <div className="section-inventorie-list__items">
        {renderItem()}
        <div className="items__item" />
      </div>
      <div className="section-inventorie-list__pagination">
        <div className={`section-inventorie-list__pagination--spinner ${!loading ? 'hide--spinner' : ''}`}>
          <KitSpinner show={loading} />
        </div>
        <div className="section-inventorie-list__pagination--">
          <KitPagination total={totalPage} actual={actualPage} onChange={onChangePage} />
        </div>
      </div>
    </div>
  );
};

export default SectionInventoriesList;
