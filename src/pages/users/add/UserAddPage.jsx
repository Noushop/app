import React, { useState } from 'react';
import { KitAlert } from '@my2rela/react-kit';
import { create } from '../../../api/users/users.api';
import FormUser from '../../../components/form/formUser/FormUser';

import './UserAddPage.scss';

const UserAddPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    const result = await create(values);

    if (result.status) {
      setTypeAlert('success');
      setMessageAlert(result.message);
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

  const handleCloseAlert = () => {
    setMessageAlert('');
  };

  return (
    <div className="page-user-add">
      <h3>Add a new User</h3>
      <KitAlert isOpen={messageAlert} onClose={handleCloseAlert} type={typeAlert}>
        {messageAlert}
      </KitAlert>
      <FormUser onSubmit={handleSubmit} disableSubmit={isProcessing} />
    </div>
  );
};

export default UserAddPage;
