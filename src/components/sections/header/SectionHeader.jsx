import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './SectionHeader.scss';

const linkList = [
  {
    path: '/inventories',
    name: 'Inventories',
  },
  {
    path: '/cashier',
    name: 'Cashier',
  },
  {
    path: '/tickets',
    name: 'Stats',
  },
];

const SectionHeader = (props) => {
  const { hideMenu } = props;

  const renderNavLink = () => linkList.map((l) => (
    <div className="section-header__item__navlink-item" key={l.name}>
      <NavLink to={l.path} activeClassName="section-header__item__navlink-item__active">{l.name}</NavLink>
    </div>
  ));

  const renderMenu = () => {
    if (hideMenu) {
      return null;
    }

    return renderNavLink();
  };

  return (
    <div className="section-header">
      <div className="section-header__item">
        <span className="section-header__item__title">{hideMenu ? '' : 'Noushop'}</span>
      </div>
      <div className="section-header__item">
        <div className="section-header__item__navlink">{renderMenu()}</div>
      </div>
      <div className="section-header__item">
        <div className="section-header__item__link-logout"><Link to="/">log out</Link></div>
      </div>
    </div>
  );
};

export default SectionHeader;
