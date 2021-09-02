import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  KitTextField,
  KitPagination,
  KitSpinner,
  KitButton,
} from '@my2rela/react-kit';

import './ListsInventories.scss';

import { inventories } from '../../../api/inventories/inventories.api';
import { priceFormat } from '../../../helpers/transform';

let delayer = null;

const ListsInventories = (props) => {
  const {
    onSelect,
  } = props;

  const [inventoriesList, setInventoriesList] = useState([]);
  const [pageTotal, setPageTotal] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (s, p) => {
    setIsLoading(true);
    Promise.all([
      inventories({ search: s, page: p }),
    ]).then((fetchedInventoriesList) => {
      setInventoriesList(fetchedInventoriesList[0].data);
      setPageTotal(fetchedInventoriesList[0].last_page);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData(searchValue, currentPage);
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);

    clearTimeout(delayer);
    delayer = setTimeout(() => {
      setCurrentPage(1);
      fetchData(e.target.value, 1);
    }, 500);
  };

  const handlePageChange = (_e, pageAimed) => {
    setCurrentPage(pageAimed);
    fetchData(searchValue, pageAimed);
  };

  const renderList = () => inventoriesList.map((il) => (
    <div className="list__item" key={il.barcode}>
      <div className="list__item-value">
        <span className="list__item-value__barcode">{il.barcode}</span>
        <span className="list__item-value_name">{il.name}</span>
      </div>
      <div className="list__item-value">
        <span>
          <span className="list__item-value__label">Cost:</span>
          &nbsp;
          {priceFormat(il.cost)}
        </span>
        <span>
          <span className="list__item-value__label">Price:</span>
          &nbsp;
          {priceFormat(il.price)}
        </span>
      </div>
      <div className="list__item-value">
        <span>
          <span className="list__item-value__label">Quantity:</span>
          &nbsp;
          {il.quantity}
        </span>
      </div>
      <div className="list__item-value footer">
        <KitButton
          className="list__item-button"
          onClick={() => onSelect({ barcode: il.barcode, price: il.price, name: il.name })}
          disabled={il.quantity < 1}
        >
          Add to cart
        </KitButton>
        <Link to={`/inventories/inventorie/${il.barcode}`}>
          <KitButton className="list__item-button details">Details</KitButton>
        </Link>
      </div>
    </div>
  ));

  const renderFilter = () => (
    <div className="filter__input">
      <KitTextField
        value={searchValue}
        label="Search by Barcode or Name"
        onChange={handleSearchChange}
        placeholder="00000000000"
      />
    </div>
  );

  const renderPagination = () => (
    <div className="pagination__navigation">
      <KitPagination total={pageTotal} actual={currentPage} onChange={handlePageChange} />
    </div>
  );

  const renderLoader = () => (
    <div className="list__loader">
      <KitSpinner show={isLoading} />
    </div>
  );

  return (
    <div className="inventories-list">
      <div className="inventories-list__filter">
        {renderFilter()}
      </div>
      <div className="inventories-list__list">
        {isLoading ? renderLoader() : renderList()}
        <div className="list__item-blur" />
      </div>
      <div className="inventories-list__pagination">
        {isLoading ? null : renderPagination()}
      </div>
    </div>
  );
};

export default ListsInventories;
