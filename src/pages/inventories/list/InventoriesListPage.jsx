import React from 'react';
import { KitContainer } from '@my2rela/react-kit';

import './InventoriesListPage.scss';

import ListsInventories from '../../../components/lists/inventories/ListsInventories';

import { addToCart } from '../../../helpers/storage';

const InventoriesListPage = () => {
  const handleListSelect = (barcode) => {
    addToCart(barcode);
  };

  return (
    <KitContainer>
      <div className="inventories-list-page">
        <ListsInventories onSelect={handleListSelect} />
      </div>
    </KitContainer>
  );
};

export default InventoriesListPage;
