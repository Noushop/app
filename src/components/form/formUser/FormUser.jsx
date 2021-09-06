import React, { useState } from 'react';
import { KitTextField, KitButton, KitSelectField } from '@my2rela/react-kit';

import { emailValidator, passwordValidator } from '../../../helpers/patterns';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  role: '',
};

const optionsRole = [
  {
    value: 'admin',
    text: 'Admin',
  },
  {
    value: 'lead',
    text: 'Lead',
  },
  {
    value: 'storer',
    text: 'Stocker',
  },
  {
    value: 'cashier',
    text: 'Cashier',
  },
];

const FormUser = (props) => {
  const {
    onSubmit,
    disableSubmit,
  } = props;

  const [values, setValues] = useState({ ...defaultValues });

  const handleSubmitClick = () => {
    onSubmit({ ...values });
  };

  const handleChange = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
  };

  const handleChangeRole = (v) => {
    setValues({ ...values, role: v });
  };

  const isValidName = () => values.name && values.name.length > 3;

  const isValidEmail = () => values.email && emailValidator.test(values.email);

  const isValidPassword = () => values.password && passwordValidator.test(values.password);

  const isValidForm = () => isValidName()
    && isValidEmail()
    && isValidPassword()
    && !disableSubmit;

  return (
    <div className="form-inventorie">
      <div className="form-inventorie__item">
        <KitTextField
          label="Name"
          onChange={handleChange('name')}
          value={values.name}
          error={values.name && !isValidName() ? 'The name is not valid' : ''}
        />
      </div>
      <div className="form-inventorie__item">
        <KitTextField
          label="Name"
          onChange={handleChange('email')}
          value={values.email}
          type="email"
          error={values.email && !isValidEmail() ? 'The email is not valid' : ''}
        />
      </div>
      <div className="form-inventorie__item">
        <KitTextField
          label="Name"
          onChange={handleChange('email')}
          value={values.password}
          type="password"
          error={values.password && !isValidPassword() ? 'Must contain one uppercase and 6 char at least' : ''}
        />
      </div>
      <div className="form-inventorie__item">
        <KitSelectField
          label="Role"
          onChange={handleChangeRole}
          value={values.role}
          options={optionsRole}
        />
      </div>
      <div className="form-inventorie__item-action">
        <KitButton disabled={!isValidForm()} onClick={handleSubmitClick}>Submit</KitButton>
      </div>
    </div>
  );
};

export default FormUser;
