import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { KitContainer } from '@my2rela/react-kit';

import './Board.scss';

import { inventories } from '../../api/inventories/inventories.api';
import Card from '../../components/card/Card';
import SectionProfile from '../../components/sections/profile/SectionProfile';
import SectionInventoriesList from '../../components/sections/inventories/list/SectionInventoriesList';

const Board = () => {
  const [cookie] = useCookies(['session']);
  const [inventoriesList, setInventoriesList] = useState([]);
  const [inventoriesTotal, setInventoriesTotal] = useState(0);
  const [inventoriesPerPage, setInventoriesPerPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(true);
  const [searchValue, setTextValue] = useState('');

  if (!cookie.session) {
    return <Redirect to="/" />;
  }

  useEffect(async () => {
    setShowSpinner(true);
    const res = await inventories(cookie.guid, {
      from: currentPage,
      search: searchValue,
    });
    setInventoriesList(res.inventories);
    setInventoriesTotal(res.total);
    setInventoriesPerPage(res.perPage);
    setMaxPage(res.totalPage);
    setShowSpinner(false);
  }, [currentPage, searchValue]);

  const handleChangePage = (_e, value) => {
    setCurrentPage(value);
  };

  const handleChangeSearch = (value) => {
    setTextValue(value);
  };

  return (
    <KitContainer className="page-board">
      <div className="page-board__body">
        <div className="page-board__body-left">
          <Card className="page-board__body__item">
            <SectionProfile profile={cookie.session} />
          </Card>
          <Card className="page-board__body__item">
            Test
          </Card>
        </div>
        <div className="page-board__body-right">
          <div className="page-board__body__item">
            <SectionInventoriesList
              loading={showSpinner}
              inventories={inventoriesList}
              total={inventoriesTotal}
              perPage={inventoriesPerPage}
              actualPage={currentPage}
              totalPage={maxPage}
              onChangePage={handleChangePage}
              onChangeFilter={handleChangeSearch}
            />
          </div>
        </div>
      </div>
    </KitContainer>
  );
};

export default Board;
