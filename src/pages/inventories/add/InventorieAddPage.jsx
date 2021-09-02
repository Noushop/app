import React, { useState } from 'react';
import { KitAlert } from '@my2rela/react-kit';

import './InventorieAddPage.scss';

import FormInventorie from '../../../components/form/formInventorie/FormInventorie';

import { addInventorie } from '../../../api/inventories/inventories.api';

const InventorieAddPage = () => {
  const [resetForm, setResetForm] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    const result = await addInventorie(values);

    if (result.status) {
      setTypeAlert('success');
      setMessageAlert(result.message);
      setResetForm(true);
      setIsProcessing(false);
      return true;
    }

    setTypeAlert('error');

    if (result.message) {
      setMessageAlert(result.message);
    }

    setMessageAlert('An error occured while processing');
    setIsProcessing(false);
    return false;
  };

  const handleResetForm = () => {
    setResetForm(false);
  };

  const handleCloseAlert = () => {
    setMessageAlert('');
  };

  return (
    <div className="page-add-inventorie">
      <div className="page-add-inventorie__form">
        <h3>Add a new Inventorie</h3>
        <KitAlert isOpen={messageAlert} onClose={handleCloseAlert} type={typeAlert}>
          {messageAlert}
        </KitAlert>
        <FormInventorie
          onSubmit={handleSubmit}
          preValue
          reset={resetForm}
          onReset={handleResetForm}
          disableSubmit={isProcessing}
        />
      </div>
    </div>
  );
};

export default InventorieAddPage;
