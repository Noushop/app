import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { KitContainer } from '@my2rela/react-kit';

import './LayoutMain.scss';

import SectionHeader from '../../sections/header/SectionHeader';

import { getUser } from '../../../helpers/storage';

const LayoutMain = (props) => {
  const {
    children,
    menu,
  } = props;

  if (!getUser()) {
    return <Redirect to="/" />;
  }

  const renderSubMenu = () => menu.map((m) => (
    <NavLink exact key={m.url} to={m.url} activeClassName="sideMenu-card__link-active">
      {m.libelle}
    </NavLink>
  ));

  return (
    <div className="layout-main">
      <div className="layout-main__header">
        <SectionHeader />
      </div>
      <KitContainer>
        <div className="layout-main__body">
          <div className="layout-main__body__sideMenu">
            <KitContainer>
              <div className="layout-main__body__sideMenu-card">
                {renderSubMenu()}
              </div>
            </KitContainer>
          </div>
          <div className="layout-main__body__children">
            {children}
          </div>
        </div>
      </KitContainer>
    </div>
  );
};

export default LayoutMain;
