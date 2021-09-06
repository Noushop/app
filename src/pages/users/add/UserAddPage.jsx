import React, { useState } from 'react';
import FormUser from '../../../components/form/formUser/FormUser';

import './UserAddPage.scss';

const UserAddPage = () => {
  const [isProcessing, setIsprocessing] = useState(false);

  const handleSubmit = () => {
    console.log('submit');
    setIsprocessing(false);
  };

  return (
    <div className="page-user-add">
      <FormUser onSubmit={handleSubmit} disableSubmit={isProcessing} />
    </div>
  );
};

export default UserAddPage;
