import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  KitContainer,
  KitSpinner,
  KitAlert,
} from '@my2rela/react-kit';

import './InventorieDetailsPage.scss';

import FormInventorie from '../../../components/form/formInventorie/FormInventorie';

import { inventorie, updateInventorie } from '../../../api/inventories/inventories.api';
import { priceFormat } from '../../../helpers/transform';

const InventorieDetailsPage = () => {
  const { barcode } = useParams();
  const [preValue, setPreValue] = useState({});
  const [responseValue, setResponseValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isupdating, setIsUpdating] = useState(false);
  const [isOpenAlert, setIsOpenALert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    message: '',
    type: 'success',
  });
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      inventorie(barcode),
    ]).then(([inventoriesResponse]) => {
      if (inventoriesResponse.status) {
        setPreValue({
          barcode: inventoriesResponse.product.barcode,
          name: inventoriesResponse.product.name,
          cost: inventoriesResponse.product.cost,
          price: inventoriesResponse.product.price,
          quantity: 0,
        });
        setResponseValue(inventoriesResponse.product);
      }
      setIsLoading(false);
    });
  }, [barcode]);

  const handleSubmitForm = (values) => {
    setIsUpdating(true);

    let params = {};

    if (values.barcode !== responseValue.barcode) {
      params = { ...params, barcode: values.barcode };
    }

    if (values.name !== responseValue.name) {
      params = { ...params, name: values.name };
    }

    if (values.cost) {
      params = { ...params, cost: values.cost };
    }

    if (values.price) {
      params = { ...params, price: values.price };
    }

    if (values.quantity) {
      params = { ...params, quantity: values.quantity };
    }

    Promise.all([
      updateInventorie(barcode, params),
    ]).then(([updateResponse]) => {
      setAlertContent({
        message: updateResponse.message,
        type: updateResponse.status ? 'success' : 'error',
      });
      setIsOpenALert(true);
      setIsUpdating(false);
      history.push(`/inventories/inventorie/${values.barcode}`);
    });
  };

  const handleAlertClose = () => {
    setIsOpenALert(false);
  };

  const renderForm = () => (
    <div className="inventorie-details-page__form">
      <h3>Update inventorie: {responseValue.barcode}</h3>
      <div className="inventorie-details-page__form-infos">
        <span>Name: <b>{responseValue.name}</b></span>
        <span>Cost: <b>{priceFormat(responseValue.cost)}</b></span>
        <span>Price: <b>{priceFormat(responseValue.price)}</b></span>
        <span>Current Quantity in stock: <b>{responseValue.quantity}</b></span>
      </div>
      <FormInventorie preValue={preValue} onSubmit={handleSubmitForm} disableSubmit={isupdating} />
    </div>
  );

  const renderLoader = () => (
    <div className="inventorie-details-page__loader">
      <KitSpinner show={isLoading} />
    </div>
  );

  return (
    <div className="inventorie-details-page">
      <KitContainer>
        <KitAlert isOpen={isOpenAlert} onClose={handleAlertClose} type={alertContent.type}>
          {alertContent.message}
        </KitAlert>
        {isLoading ? renderLoader() : renderForm()}
      </KitContainer>
    </div>
  );
};

export default InventorieDetailsPage;
