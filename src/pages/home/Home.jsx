import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  KitTextField,
  KitContainer,
  KitButton,
  KitAlert,
} from '@my2rela/react-kit';

import './Home.scss';

import { authentication } from '../../api/users/users.api';

import { clear, setToken, setUser } from '../../helpers/storage';

const Home = () => {
  useEffect(() => {
    clear();
  }, []);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isRequestLocked, setIsRequestLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const handleChange = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
  };

  const isValid = (v) => v.length > 2;

  const handleButtonClick = async () => {
    setIsRequestLocked(true);
    const response = await authentication(values);

    if (response.status && response.data.access_token && response.data.user) {
      setToken(response.data.access_token);
      setUser(response.data.user);
      setIsAuth(true);
      return true;
    }

    setErrorMessage(response.message);
    setIsAlertOpen(true);
    setIsRequestLocked(false);
    return false;
  };

  const handleNotificationClose = () => {
    setIsAlertOpen(false);
  };

  const handleButtonState = () => {
    if (isRequestLocked) {
      return true;
    }

    return (!isValid(values.email) || !isValid(values.password));
  };

  const mainPage = () => (
    <div className="page-home">
      <KitAlert type="error" isOpen={isAlertOpen} onClose={handleNotificationClose}>
        {errorMessage}
      </KitAlert>
      <KitContainer className="page-home__container">
        <div className="page-home__container__card">
          <div className="page-home__container-grid">
            <div className="page-home__container-grid__item">
              <KitTextField
                placeholder="rakoto@mail.mg"
                label="Email"
                onChange={handleChange('email')}
                value={values.email}
              />
            </div>
            <div className="page-home__container-grid__item">
              <KitTextField
                placeholder="*********"
                label="Password"
                type="password"
                onChange={handleChange('password')}
                value={values.password}
              />
            </div>
          </div>
          <div className="page-home__container-grid">
            <KitButton disabled={handleButtonState()} onClick={handleButtonClick}>
              Log in
            </KitButton>
          </div>
        </div>
      </KitContainer>
    </div>
  );

  const redirection = () => <Redirect push to="/inventories" />;

  return isAuth ? redirection() : mainPage();
};

export default Home;
