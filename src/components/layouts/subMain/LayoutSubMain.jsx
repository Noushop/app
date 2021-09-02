import React from 'react';
import { Redirect } from 'react-router-dom';

import SectionHeader from '../../sections/header/SectionHeader';

import { getUser } from '../../../helpers/storage';

const LayoutSubMain = (props) => {
  const {
    children,
  } = props;

  if (!getUser()) {
    return <Redirect to="/" />;
  }

  return (
    <div className="layout-companie">
      <div className="layout-companie__header">
        <SectionHeader />
      </div>
      <div className="layout-companie__body">{children}</div>
    </div>
  );
};

export default LayoutSubMain;
